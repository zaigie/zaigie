#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

output="${1:-dist/zaigie-homepage.zip}"
output_dir="$(dirname "$output")"

if ! command -v zip >/dev/null 2>&1; then
  echo "Error: zip command not found." >&2
  exit 1
fi

mkdir -p "$output_dir"
rm -f "$output"

zip -r "$output" . \
  -x "./design-concepts/*" \
  -x "./assets/concepts/*" \
  -x "./assets/qa/*" \
  -x "./dist/*" \
  -x "./.git/*" \
  -x "./*.zip" \
  -x "./.DS_Store" \
  -x "*/.DS_Store"

echo "Packaged site to $output"
