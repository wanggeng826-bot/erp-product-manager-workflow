#!/usr/bin/env node

const { execFileSync } = require("child_process");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
  }).trim();
}

function safeRun(command, args, options = {}) {
  try {
    return { ok: true, output: run(command, args, options) };
  } catch (error) {
    return {
      ok: false,
      output: String(error.stderr || error.stdout || error.message || "").trim(),
    };
  }
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === "-h" || arg === "--help") {
      args.help = true;
    } else if (arg === "--title") {
      if (!value || value.startsWith("--")) {
        throw new Error("Missing value for --title");
      }
      args.title = value;
      index += 1;
    } else if (arg === "--branch") {
      if (!value || value.startsWith("--")) {
        throw new Error("Missing value for --branch");
      }
      args.branch = value;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return args;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function timestamp() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}${map.month}${map.day}-${map.hour}${map.minute}${map.second}`;
}

function workingTree() {
  const output = safeRun("git", ["status", "--porcelain"]);
  if (!output.ok || !output.output) return [];
  return output.output
    .split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3).trim().split(" -> ").pop());
}

function printUsage() {
  console.log('Usage: npm run knowledge:publish -- --title "docs(knowledge): update <module>" [--branch knowledge/<slug>]');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }
  if (!args.title) {
    throw new Error("Missing required --title");
  }

  const auth = safeRun("gh", ["auth", "status", "-h", "github.com"]);
  if (!auth.ok) {
    throw new Error("GitHub CLI is not authenticated. Run `gh auth login -h github.com` first.");
  }

  const files = workingTree();
  const knowledgeFiles = files.filter((file) => file.startsWith("knowledge/"));
  const blockedFiles = files.filter((file) => !file.startsWith("knowledge/"));

  if (!knowledgeFiles.length) {
    throw new Error("No changed knowledge files found. Draft the knowledge update first.");
  }
  if (blockedFiles.length) {
    throw new Error(
      `Knowledge publish must run from a knowledge-only working tree.\n${blockedFiles
        .map((file) => `- ${file}`)
        .join("\n")}`
    );
  }

  const branch = args.branch || `knowledge/${slugify(args.title) || "update"}-${timestamp()}`;
  const prBody = [
    "## What Changed",
    "- Update confirmed knowledge draft from PRD / prototype acceptance.",
    "",
    "## Why",
    "- Capture stable business rules into the shared knowledge base.",
    "",
    "## Scope",
    "- [x] This PR only changes `knowledge/**`.",
    "- [x] No private data, credentials, or unrelated prototype files are included.",
    `- [x] Source files: ${knowledgeFiles.map((file) => `\`${file}\``).join(", ")}`,
    "",
    "## Notes For Maintainer",
    "- Generated after user confirmation of the knowledge draft.",
  ].join("\n");

  run("git", ["switch", "-c", branch], { stdio: "inherit" });
  run("git", ["add", "--", "knowledge"], { stdio: "inherit" });
  run("git", ["commit", "-m", args.title], { stdio: "inherit" });
  run("git", ["push", "-u", "origin", branch], { stdio: "inherit" });
  const prUrl = run(
    "gh",
    ["pr", "create", "--base", "main", "--head", branch, "--title", args.title, "--body", prBody],
    { stdio: ["ignore", "pipe", "inherit"] }
  );

  console.log("\nKnowledge PR created:");
  console.log(`Branch: ${branch}`);
  console.log(`PR: ${prUrl}`);
}

try {
  main();
} catch (error) {
  console.error(`\nKnowledge publish failed: ${error.message}`);
  process.exit(1);
}
