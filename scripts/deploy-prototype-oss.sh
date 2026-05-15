#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/deploy-prototype-oss.sh <local_prototype_dir> <oss_prefix>

Required environment:
  OSS_BUCKET  Target OSS bucket name. Example: erp-prototypes

Optional environment:
  OSS_DOMAIN  Public static site domain. Example: https://prototype.example.com

Example:
  OSS_BUCKET=erp-prototypes OSS_DOMAIN=https://prototype.example.com \
    scripts/deploy-prototype-oss.sh prototype/oms-system prototypes/oms-system
EOF
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

if [ -z "${OSS_BUCKET:-}" ]; then
  echo "Missing OSS_BUCKET." >&2
  exit 1
fi

if ! command -v ossutil >/dev/null 2>&1; then
  echo "ossutil is not installed or not in PATH." >&2
  echo "Install and configure ossutil before running this script." >&2
  exit 1
fi

LOCAL_DIR="${1%/}"
OSS_PREFIX="${2#/}"
OSS_PREFIX="${OSS_PREFIX%/}"

if [ ! -d "$LOCAL_DIR" ]; then
  echo "Local prototype directory does not exist: $LOCAL_DIR" >&2
  exit 1
fi

if [ ! -f "$LOCAL_DIR/index.html" ]; then
  echo "Prototype directory must contain index.html: $LOCAL_DIR" >&2
  exit 1
fi

TARGET="oss://${OSS_BUCKET}/${OSS_PREFIX}/"

echo "Uploading prototype:"
echo "  local: $LOCAL_DIR/"
echo "  target: $TARGET"

ossutil cp -r "$LOCAL_DIR/" "$TARGET" --update

if [ -f "ops/oss-static-site/error.html" ]; then
  ossutil cp "ops/oss-static-site/error.html" "oss://${OSS_BUCKET}/error.html" --update
fi

if [ -n "${OSS_DOMAIN:-}" ]; then
  PUBLIC_URL="${OSS_DOMAIN%/}/${OSS_PREFIX}/"
else
  PUBLIC_URL="oss://${OSS_BUCKET}/${OSS_PREFIX}/"
fi

cat <<EOF

Deploy completed.

Yunxiao prototype link:
${PUBLIC_URL}

Yunxiao note:
- 原型地址：${PUBLIC_URL}
- 设计基线：Ant Design ERP UI Library v0.2.1
EOF
