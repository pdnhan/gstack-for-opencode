import { existsSync, mkdtempSync, mkdirSync, rmSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const tempRoot = mkdtempSync(path.join(os.tmpdir(), "gstack-for-opencode-"))
const targetDir = path.join(tempRoot, "target-project")

mkdirSync(targetDir, { recursive: true })

const result = spawnSync("sh", [path.join(root, "scripts", "quickstart-setup.sh"), targetDir], {
  cwd: root,
  encoding: "utf8",
})

if (result.status !== 0) {
  console.error("Clean-install smoke test failed while running quickstart setup.\n")
  if (result.stdout) {
    process.stdout.write(result.stdout)
  }
  if (result.stderr) {
    process.stderr.write(result.stderr)
  }
  rmSync(tempRoot, { recursive: true, force: true })
  process.exit(result.status ?? 1)
}

const requiredInstalledPaths = [
  "AGENTS.md",
  "opencode.json",
  path.join(".opencode", "agents", "review.md"),
  path.join(".opencode", "commands", "review.md"),
  path.join(".opencode", "commands", "ship.md"),
  path.join(".opencode", "skills", "review-workflow", "SKILL.md"),
  path.join(".opencode", "tools", "browser.ts"),
  path.join(".opencode", "browser-adapter.json"),
]

const missing = requiredInstalledPaths.filter((relativePath) => !existsSync(path.join(targetDir, relativePath)))

rmSync(tempRoot, { recursive: true, force: true })

if (missing.length > 0) {
  console.error("Clean-install smoke test failed. Missing installed paths:\n")
  for (const item of missing) {
    console.error(`- ${item}`)
  }
  process.exit(1)
}

console.log("Clean-install smoke test passed.")
console.log(`- installed paths checked: ${requiredInstalledPaths.length}`)
