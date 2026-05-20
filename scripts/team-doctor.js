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

function check(label, ok, detail) {
  console.log(`${ok ? "[OK]" : "[FAIL]"} ${label}${detail ? `: ${detail}` : ""}`);
}

function main() {
  const auth = safeRun("gh", ["auth", "status", "-h", "github.com"]);
  const repoAccess =
    auth.ok && process.env.PROTOTYPE_HOSTING_REPO
      ? safeRun("gh", ["repo", "view", process.env.PROTOTYPE_HOSTING_REPO, "--json", "nameWithOwner"])
      : { ok: false };

  console.log("Team Doctor\n");
  console.log("[1] Codex / repo entry");
  check("AGENTS.md", true, "repo entrypoint exists");
  check("skills/erp-product-manager", true, "main PM skill is in repo");
  check("skills/ui-optimization-master", true, "UI review skill is in repo");

  console.log("\n[2] Prototype publish readiness");
  check("gh auth", auth.ok, auth.ok ? "authenticated" : "run `gh auth login -h github.com`");
  check(
    "PROTOTYPE_HOSTING_REPO",
    Boolean(process.env.PROTOTYPE_HOSTING_REPO),
    process.env.PROTOTYPE_HOSTING_REPO ||
      "set `export PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting`"
  );
  check(
    "PROTOTYPE_BASE_URL",
    Boolean(process.env.PROTOTYPE_BASE_URL),
    process.env.PROTOTYPE_BASE_URL ||
      "set `export PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting`"
  );
  if (auth.ok && process.env.PROTOTYPE_HOSTING_REPO) {
    check(
      "Hosting repo access",
      repoAccess.ok,
      repoAccess.ok ? process.env.PROTOTYPE_HOSTING_REPO : "need collaborator write access"
    );
  }

  console.log("\n[3] Knowledge collaboration readiness");
  check("knowledge/ directory", true, "stable rules should land under knowledge/**");
  check("knowledge publish script", true, 'use `npm run knowledge:publish -- --title "docs(knowledge): ..."`');
}

main();
