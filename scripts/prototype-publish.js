#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const {
  commitAndPush,
  copyPrototype,
  ensureHostingRepo,
  findPrototypeDirs,
  publicUrl,
  requireConfig,
  requireGhUser,
  shanghaiTimestamp,
  slugify,
  writeHostedPrototypeIndex,
} = require("./prototype-hosting-utils");

async function main() {
  const rootDir = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }
  const config = requireConfig();
  const owner = requireGhUser();
  const candidates = findPrototypeDirs(rootDir);

  if (candidates.length === 0) {
    throw new Error("No prototype directory found. Expected a directory with index.html under prototype/ or cases/.");
  }

  const rl = readline.createInterface({ input, output });
  try {
    const source = args.source
      ? findSourceByPath(candidates, args.source)
      : await askSource(rl, candidates);
    const defaultTitle = path.basename(source.absPath);
    const title = args.title || (await askText(rl, `Prototype title [${defaultTitle}]: `)) || defaultTitle;
    const businessSystem = args.businessSystem || (await askText(rl, "Business system [业务系统]: ")) || "业务系统";

    const stamp = shanghaiTimestamp();
    const businessSlug = slugify(businessSystem, "business-system");
    const titleSlug = slugify(title, "prototype");
    const prototypeId = `${titleSlug}-${stamp.compact}`;
    const relDir = path.posix.join(config.publishRoot, businessSlug, prototypeId);

    const hostingDir = ensureHostingRepo(config);
    const targetDir = path.join(hostingDir, ...relDir.split("/"));

    copyPrototype(source.absPath, targetDir);
    fs.writeFileSync(
      path.join(targetDir, "manifest.json"),
      JSON.stringify(
        {
          prototypeId,
          title,
          businessSystem,
          owner,
          sourcePath: source.relPath,
          createdAt: stamp.iso,
          updatedAt: stamp.iso,
        },
        null,
        2
      ) + "\n"
    );
    writeHostedPrototypeIndex(hostingDir, config);

    commitAndPush(hostingDir, config.branch, `publish prototype: ${title}`);

    console.log("\nPrototype published:");
    console.log(publicUrl(config.baseUrl, relDir));
  } finally {
    rl.close();
  }
}

async function askText(rl, question) {
  const answer = await rl.question(question);
  return String(answer || "").trim();
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

async function askSource(rl, candidates) {
  console.log("\nAvailable prototypes:");
  candidates.forEach((candidate, index) => {
    console.log(`  ${index + 1}. ${candidate.relPath}`);
  });

  const selected = await askNumber(rl, "\nSelect prototype number: ", 1, candidates.length);
  return candidates[selected - 1];
}

function findSourceByPath(candidates, requestedPath) {
  const normalized = requestedPath.replace(/\/+$/g, "");
  const source = candidates.find((candidate) => candidate.relPath === normalized);
  if (!source) {
    throw new Error(`Prototype source not found or missing index.html: ${requestedPath}`);
  }
  return source;
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === "-h" || arg === "--help") {
      args.help = true;
    } else if (arg === "--source") {
      args.source = requireValue(arg, value);
      index += 1;
    } else if (arg === "--title") {
      args.title = requireValue(arg, value);
      index += 1;
    } else if (arg === "--business-system") {
      args.businessSystem = requireValue(arg, value);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return args;
}

function printUsage() {
  console.log(`Usage:
  npm run prototype:publish -- --source prototype/<name> --title <title> --business-system <system>

Required environment:
  PROTOTYPE_HOSTING_REPO  Example: seabost/seabost-prototype-hosting

Optional environment:
  PROTOTYPE_HOSTING_BRANCH  Default: main
  PROTOTYPE_BASE_URL        Default: https://prototype.seabost.com
  PROTOTYPE_PUBLISH_ROOT    Default: prototypes

Notes:
  Use this only when the user says 分享原型 or explicitly asks for an online link.
  Normal prototype generation should return the local HTML path only.`);
}

function requireValue(option, value) {
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}`);
  }
  return value;
}

main().catch((error) => {
  console.error(`\nPublish failed: ${error.message}`);
  process.exit(1);
});
