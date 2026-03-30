#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PACK_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

cd "$PACK_ROOT"

node ./scripts/verify-pack.mjs
node ./scripts/check-release-metadata.mjs
sh -n ./scripts/quickstart-setup.sh
node ./scripts/smoke-install.mjs
