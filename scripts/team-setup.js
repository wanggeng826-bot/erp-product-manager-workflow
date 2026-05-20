#!/usr/bin/env node

const { execFileSync } = require("child_process");

function safeRun(command, args) {
  try {
    return {
      ok: true,
      output: execFileSync(command, args, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }).trim(),
    };
  } catch (error) {
    return {
      ok: false,
      output: String(error.stderr || error.stdout || error.message || "").trim(),
    };
  }
}

function main() {
  const auth = safeRun("gh", ["auth", "status", "-h", "github.com"]);

  console.log("Team Setup\n");

  if (!auth.ok) {
    console.log("1. Authenticate GitHub CLI:");
    console.log("   gh auth login -h github.com");
    console.log("   gh auth status");
  }

  if (!process.env.PROTOTYPE_HOSTING_REPO || !process.env.PROTOTYPE_BASE_URL) {
    console.log("\n2. Configure prototype hosting variables:");
    if (!process.env.PROTOTYPE_HOSTING_REPO) {
      console.log(
        "   echo 'export PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting' >> ~/.zshrc"
      );
    }
    if (!process.env.PROTOTYPE_BASE_URL) {
      console.log(
        "   echo 'export PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting' >> ~/.zshrc"
      );
    }
    console.log("   source ~/.zshrc");
  }

  if (auth.ok && process.env.PROTOTYPE_HOSTING_REPO) {
    const access = safeRun("gh", ["repo", "view", process.env.PROTOTYPE_HOSTING_REPO, "--json", "nameWithOwner"]);
    if (!access.ok) {
      console.log("\n3. Accept the collaborator invitation for the hosting repo, then retry:");
      console.log(`   https://github.com/${process.env.PROTOTYPE_HOSTING_REPO}`);
    }
  }

  console.log("\n4. Run the read-only checks:");
  console.log("   npm run team:doctor");
  console.log("   npm run prototype:doctor -- --source prototype/<name>");
  console.log("   npm run knowledge:doctor");
}

main();
