#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const IGNORE_NAMES = new Set([
  ".DS_Store",
  ".git",
  "node_modules",
  "backups",
]);

function requireConfig() {
  const repo = process.env.PROTOTYPE_HOSTING_REPO;
  if (!repo || !/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    throw new Error(
      "Missing PROTOTYPE_HOSTING_REPO. Example: PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting"
    );
  }

  return {
    repo,
    branch: process.env.PROTOTYPE_HOSTING_BRANCH || "main",
    baseUrl: process.env.PROTOTYPE_BASE_URL || "https://wanggeng826-bot.github.io/seabost-prototype-hosting",
    publishRoot: stripSlashes(process.env.PROTOTYPE_PUBLISH_ROOT || "prototypes"),
  };
}

function run(command, args, options = {}) {
  const result = execFileSync(command, args, {
    stdio: options.stdio || "pipe",
    encoding: "utf8",
    ...options,
  });
  return result == null ? "" : String(result).trim();
}

function requireGhUser() {
  try {
    run("gh", ["auth", "status"], { stdio: "pipe" });
    const login = run("gh", ["api", "user", "--jq", ".login"]);
    if (!login) {
      throw new Error("Cannot detect GitHub login.");
    }
    return login;
  } catch (error) {
    throw new Error(
      "GitHub CLI is not authorized. Run `gh auth login` with the company GitHub account first."
    );
  }
}

function hostingCacheDir(repo) {
  const safeName = repo.replace(/[^\w.-]+/g, "-");
  return path.join(os.tmpdir(), "prototype-hosting-cache", safeName);
}

function ensureHostingRepo(config) {
  const targetDir = hostingCacheDir(config.repo);
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });

  if (!fs.existsSync(path.join(targetDir, ".git"))) {
    run("gh", ["repo", "clone", config.repo, targetDir], { stdio: "inherit" });
  }

  run("git", ["-C", targetDir, "fetch", "origin", config.branch], { stdio: "inherit" });
  run("git", ["-C", targetDir, "checkout", config.branch], { stdio: "inherit" });
  run("git", ["-C", targetDir, "pull", "--ff-only", "origin", config.branch], { stdio: "inherit" });
  fs.writeFileSync(path.join(targetDir, ".nojekyll"), "");

  return targetDir;
}

function findPrototypeDirs(rootDir) {
  const roots = ["prototype", "cases"]
    .map((name) => path.join(rootDir, name))
    .filter((dir) => fs.existsSync(dir));
  const results = [];

  for (const root of roots) {
    walk(root, (dir) => {
      if (fs.existsSync(path.join(dir, "index.html"))) {
        results.push({
          absPath: dir,
          relPath: path.relative(rootDir, dir),
        });
        return false;
      }
      return true;
    });
  }

  return results.sort((a, b) => a.relPath.localeCompare(b.relPath));
}

function walk(dir, visit) {
  const shouldContinue = visit(dir);
  if (!shouldContinue) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || IGNORE_NAMES.has(entry.name)) continue;
    walk(path.join(dir, entry.name), visit);
  }
}

function copyPrototype(sourceDir, targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  copyDir(sourceDir, targetDir);
}

function copyDir(sourceDir, targetDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (IGNORE_NAMES.has(entry.name)) continue;
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function readHostedPrototypes(hostingDir, publishRoot) {
  const root = path.join(hostingDir, publishRoot);
  if (!fs.existsSync(root)) return [];

  const results = [];
  walk(root, (dir) => {
    const manifestPath = path.join(dir, "manifest.json");
    if (!fs.existsSync(manifestPath)) return true;

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      results.push({
        dir,
        relDir: path.relative(hostingDir, dir),
        manifest,
      });
    } catch {
      // Ignore malformed manifests so one bad upload does not block deletion.
    }
    return false;
  });

  return results.sort((a, b) => a.relDir.localeCompare(b.relDir));
}

function writeHostedPrototypeIndex(hostingDir, config) {
  const prototypes = readHostedPrototypes(hostingDir, config.publishRoot).map((item) => ({
    ...item.manifest,
    path: item.relDir.split(path.sep).join("/"),
    url: publicUrl(config.baseUrl, item.relDir.split(path.sep).join("/")),
  }));
  const indexPath = path.join(hostingDir, config.publishRoot, "index.json");
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        generatedAt: shanghaiTimestamp().iso,
        count: prototypes.length,
        prototypes,
      },
      null,
      2
    ) + "\n"
  );
}

function commitAndPush(hostingDir, branch, message) {
  run("git", ["-C", hostingDir, "add", "-A"], { stdio: "inherit" });

  const status = run("git", ["-C", hostingDir, "status", "--porcelain"]);
  if (!status) {
    throw new Error("No hosting repository changes to publish.");
  }

  run("git", ["-C", hostingDir, "commit", "-m", message], { stdio: "inherit" });
  run("git", ["-C", hostingDir, "push", "origin", branch], { stdio: "inherit" });
}

function slugify(value, fallback) {
  const slug = String(value || "")
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function shanghaiTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    compact: `${map.year}${map.month}${map.day}-${map.hour}${map.minute}${map.second}`,
    iso: `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}+08:00`,
  };
}

function stripSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function publicUrl(baseUrl, relDir) {
  return `${baseUrl.replace(/\/+$/g, "")}/${stripSlashes(relDir)}/`;
}

module.exports = {
  commitAndPush,
  copyPrototype,
  ensureHostingRepo,
  findPrototypeDirs,
  publicUrl,
  readHostedPrototypes,
  requireConfig,
  requireGhUser,
  run,
  shanghaiTimestamp,
  slugify,
  writeHostedPrototypeIndex,
};
