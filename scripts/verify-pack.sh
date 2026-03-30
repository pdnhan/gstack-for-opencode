#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PACK_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

cd "$PACK_ROOT"

node ./scripts/verify-pack.mjs
sh -n ./scripts/quickstart-setup.sh
