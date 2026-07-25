#!/usr/bin/env bash
set -euo pipefail

script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
repo_root="$(CDPATH= cd -- "${script_dir}/.." && pwd)"
cd "${repo_root}"

npm ci
npm run build

test -f dist/index.html || {
  printf 'error: production build did not create dist/index.html\n' >&2
  exit 1
}

printf 'Renderprove preparation complete.\n'
printf 'Next: run the enrolled project through the Renderprove worker.\n'
