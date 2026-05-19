#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { findPrototypeDirs } = require("./prototype-hosting-utils");

function main() {
  const rootDir = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  const candidates = findPrototypeDirs(rootDir);
  const requestedSource = args.source || sourceFromUrl(args.url);

  console.log("Prototype doctor\n");
  checkGitPointer(rootDir);
  checkCandidates(candidates);

  if (requestedSource) {
    checkSource(rootDir, candidates, requestedSource);
    checkGhPages(rootDir, requestedSource);
  } else {
    console.log("\nNo --source or --url provided. Pass one to check a specific 404 path.");
  }
}

function checkGitPointer(rootDir) {
  const gitPath = path.join(rootDir, ".git");
  if (!fs.existsSync(gitPath) || fs.statSync(gitPath).isDirectory()) {
    return;
  }

  const content = fs.readFileSync(gitPath, "utf8").trim();
  const match = content.match(/^gitdir:\s*(.+)$/i);
  if (!match) return;

  const gitDir = match[1];
  const isWindowsPath = /^[A-Za-z]:[\\/]/.test(gitDir);
  const resolved = path.isAbsolute(gitDir) ? gitDir : path.resolve(rootDir, gitDir);
  if (isWindowsPath || !fs.existsSync(resolved)) {
    console.log("Git checkout: broken");
    console.log(`  .git points to: ${gitDir}`);
    console.log("  Fix: clone the repository normally instead of copying a worktree folder.");
    return;
  }

  console.log("Git checkout: ok");
}

function checkCandidates(candidates) {
  console.log(`Local prototypes with index.html: ${candidates.length}`);
  for (const candidate of candidates) {
    console.log(`  - ${candidate.relPath}`);
  }
}

function checkSource(rootDir, candidates, requestedSource) {
  const normalized = stripSlashes(requestedSource);
  const source = candidates.find((candidate) => candidate.relPath === normalized);

  console.log(`\nRequested source: ${normalized}`);
  if (source) {
    console.log("Local source: ok");
    return;
  }

  const indexPath = path.join(rootDir, normalized, "index.html");
  console.log("Local source: missing");
  console.log(`  Expected file: ${indexPath}`);
}

function checkGhPages(rootDir, requestedSource) {
  const normalized = stripSlashes(requestedSource);
  console.log("\nGitHub Pages branch:");

  if (!hasGit(rootDir)) {
    console.log("  Skipped: this folder is not a valid git checkout.");
    return;
  }

  const hasBranch = git(rootDir, ["rev-parse", "--verify", "--quiet", "gh-pages"]);
  const hasRemoteBranch = git(rootDir, ["rev-parse", "--verify", "--quiet", "origin/gh-pages"]);
  if (!hasBranch && !hasRemoteBranch) {
    console.log("  Missing: no local gh-pages or origin/gh-pages branch found.");
    return;
  }

  const branch = hasRemoteBranch ? "origin/gh-pages" : "gh-pages";
  const indexPath = `${normalized}/index.html`;
  const exists = git(rootDir, ["cat-file", "-e", `${branch}:${indexPath}`]);
  if (exists) {
    console.log(`  Found: ${branch}:${indexPath}`);
  } else {
    console.log(`  Missing: ${branch}:${indexPath}`);
    console.log("  Fix: publish this prototype before sharing the GitHub Pages URL.");
  }
}

function sourceFromUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const parts = stripSlashes(url.pathname).split("/");
    const prototypeIndex = parts.indexOf("prototype");
    if (prototypeIndex === -1 || prototypeIndex === parts.length - 1) return "";
    return parts.slice(prototypeIndex).join("/");
  } catch {
    return value;
  }
}

function hasGit(rootDir) {
  return Boolean(git(rootDir, ["rev-parse", "--git-dir"]));
}

function git(rootDir, args) {
  try {
    return execFileSync("git", ["-C", rootDir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || "ok";
  } catch {
    return "";
  }
}

function stripSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === "--source") {
      args.source = requireValue(arg, value);
      index += 1;
    } else if (arg === "--url") {
      args.url = requireValue(arg, value);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return args;
}

function requireValue(option, value) {
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}`);
  }
  return value;
}

main();
