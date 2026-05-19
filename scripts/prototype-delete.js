#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const {
  commitAndPush,
  ensureHostingRepo,
  publicUrl,
  readHostedPrototypes,
  requireConfig,
  requireGhUser,
  writeHostedPrototypeIndex,
} = require("./prototype-hosting-utils");

async function main() {
  const config = requireConfig();
  const owner = requireGhUser();
  const hostingDir = ensureHostingRepo(config);
  const prototypes = readHostedPrototypes(hostingDir, config.publishRoot).filter(
    (item) => item.manifest && item.manifest.owner === owner
  );

  if (prototypes.length === 0) {
    console.log("No hosted prototypes owned by the current GitHub user.");
    return;
  }

  const rl = readline.createInterface({ input, output });
  try {
    console.log("\nYour hosted prototypes:");
    prototypes.forEach((item, index) => {
      const title = item.manifest.title || item.manifest.prototypeId || item.relDir;
      console.log(`  ${index + 1}. ${title}`);
      console.log(`     ${publicUrl(config.baseUrl, item.relDir)}`);
    });

    const selected = await askNumber(rl, "\nSelect prototype to delete: ", 1, prototypes.length);
    const target = prototypes[selected - 1];
    const confirm = (await rl.question(`Type DELETE to remove "${target.manifest.title || target.relDir}": `)).trim();
    if (confirm !== "DELETE") {
      console.log("Delete cancelled.");
      return;
    }

    if (target.manifest.owner !== owner) {
      throw new Error("Permission denied. You can only delete prototypes you published.");
    }

    fs.rmSync(target.dir, { recursive: true, force: true });
    writeHostedPrototypeIndex(hostingDir, config);
    commitAndPush(hostingDir, config.branch, `delete prototype: ${target.manifest.title || target.manifest.prototypeId}`);

    console.log("\nPrototype deleted:");
    console.log(publicUrl(config.baseUrl, target.relDir));
  } finally {
    rl.close();
  }
}

async function askNumber(rl, question, min, max) {
  while (true) {
    const answer = Number((await rl.question(question)).trim());
    if (Number.isInteger(answer) && answer >= min && answer <= max) {
      return answer;
    }
    console.log(`Enter a number from ${min} to ${max}.`);
  }
}

main().catch((error) => {
  console.error(`\nDelete failed: ${error.message}`);
  process.exit(1);
});
