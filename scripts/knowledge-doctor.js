#!/usr/bin/env node

const { execFileSync } = require("child_process");

function run(command, args) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function safeRun(command, args) {
  try {
    return { ok: true, output: run(command, args) };
  } catch (error) {
    return {
      ok: false,
      output: String(error.stderr || error.stdout || error.message || "").trim(),
    };
  }
}

function listStatus() {
  const output = safeRun("git", ["status", "--porcelain"]);
  if (!output.ok || !output.output) return [];
  return output.output
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const file = line.slice(3).trim().split(" -> ").pop();
      return { status: line.slice(0, 2), file };
    });
}

function check(label, ok, detail) {
  console.log(`${ok ? "[OK]" : "[FAIL]"} ${label}${detail ? `: ${detail}` : ""}`);
}

function main() {
  const status = listStatus();
  const knowledgeChanges = status.filter((item) => item.file.startsWith("knowledge/"));
  const nonKnowledgeChanges = status.filter((item) => !item.file.startsWith("knowledge/"));
  const auth = safeRun("gh", ["auth", "status", "-h", "github.com"]);
  const origin = safeRun("git", ["remote", "get-url", "origin"]);

  console.log("Knowledge Doctor\n");
  check("gh auth", auth.ok, auth.ok ? "authenticated" : "run `gh auth login -h github.com`");
  check("Git remote", origin.ok, origin.ok ? origin.output : "missing origin remote");
  check(
    "Knowledge changes",
    knowledgeChanges.length > 0,
    knowledgeChanges.length ? knowledgeChanges.map((item) => item.file).join(", ") : "no changed knowledge files"
  );
  check(
    "Knowledge-only working tree",
    nonKnowledgeChanges.length === 0,
    nonKnowledgeChanges.length
      ? `blocking files: ${nonKnowledgeChanges.map((item) => item.file).join(", ")}`
      : "ready"
  );

  console.log("\nRecommended publish command:");
  console.log('npm run knowledge:publish -- --title "docs(knowledge): update <module>"');
}

main();
