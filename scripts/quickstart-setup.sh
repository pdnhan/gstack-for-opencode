#!/bin/sh
set -eu

usage() {
  printf '%s\n' "Usage: ./scripts/quickstart-setup.sh /path/to/target-project"
}

if [ "$#" -ne 1 ]; then
  usage >&2
  exit 1
fi

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PACK_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
TARGET_DIR=$1

if [ ! -d "$TARGET_DIR" ]; then
  printf '%s\n' "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

copy_if_missing() {
  src=$1
  dst=$2

  if [ -e "$dst" ]; then
    printf '%s\n' "skip  $dst already exists"
    return 0
  fi

  mkdir -p "$(dirname -- "$dst")"
  cp -R "$src" "$dst"
  printf '%s\n' "copy  $dst"
}

merge_dir_without_overwrite() {
  src=$1
  dst=$2

  mkdir -p "$dst"
  cp -R -n "$src/." "$dst/"
  printf '%s\n' "merge $dst"
}

merge_agents() {
  src=$1
  dst=$2
  
  if [ -e "$dst" ]; then
    if ! grep -q "gstack-for-opencode" "$dst"; then
      cp "$dst" "$dst.backup"
      printf '%s\n' "backup $dst.backup"
      printf '\n\n---\n\n<!-- gstack-for-opencode -->\n' >> "$dst"
      cat "$src" >> "$dst"
      printf '%s\n' "merge $dst"
    else
      printf '%s\n' "skip  $dst already merged"
    fi
  else
    mkdir -p "$(dirname -- "$dst")"
    cp "$src" "$dst"
    printf '%s\n' "copy  $dst"
  fi
}

merge_opencode_json() {
  src=$1
  dst=$2

  if [ -e "$dst" ]; then
    cp "$dst" "$dst.backup"
    printf '%s\n' "backup $dst.backup"
    node "$SCRIPT_DIR/merge-json.mjs" "$dst" "$src"
  else
    mkdir -p "$(dirname -- "$dst")"
    cp "$src" "$dst"
    printf '%s\n' "copy  $dst"
  fi
}

merge_agents "$PACK_ROOT/AGENTS.md" "$TARGET_DIR/AGENTS.md"
merge_opencode_json "$PACK_ROOT/opencode.json" "$TARGET_DIR/opencode.json"

mkdir -p "$TARGET_DIR/.opencode"
merge_dir_without_overwrite "$PACK_ROOT/.opencode/agents" "$TARGET_DIR/.opencode/agents"
merge_dir_without_overwrite "$PACK_ROOT/.opencode/commands" "$TARGET_DIR/.opencode/commands"
merge_dir_without_overwrite "$PACK_ROOT/.opencode/skills" "$TARGET_DIR/.opencode/skills"
merge_dir_without_overwrite "$PACK_ROOT/.opencode/tools" "$TARGET_DIR/.opencode/tools"
merge_dir_without_overwrite "$PACK_ROOT/bin" "$TARGET_DIR/bin"

copy_if_missing "$PACK_ROOT/browser-adapter.example.json" "$TARGET_DIR/browser-adapter.example.json"
copy_if_missing "$PACK_ROOT/browser-adapter.json" "$TARGET_DIR/browser-adapter.json"

printf '\n'
printf '%s\n' "Quickstart setup complete."
printf '%s\n' ""
printf '%s\n' "Next steps:"
printf '%s\n' "1. Open $TARGET_DIR in OpenCode."
printf '%s\n' "2. Try /review, /investigate, /qa, or /ship."
printf '%s\n' "3. If browser commands are blocked, edit .opencode/browser-adapter.json or start from .opencode/browser-adapter.example.json."
printf '%s\n' ""
printf '%s\n' "This script never overwrites existing files. Review AGENTS.md and opencode.json if your target project already has custom OpenCode setup."
