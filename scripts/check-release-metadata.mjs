import { readFileSync } from "node:fs"
import path from "node:path"

const root = process.cwd()
const version = readFileSync(path.join(root, "VERSION"), "utf8").trim()
const changelog = readFileSync(path.join(root, "CHANGELOG.md"), "utf8")

const errors = []

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  errors.push(`VERSION must be plain semver x.y.z, got '${version || "<empty>"}'`)
}

if (!/^## Unreleased$/m.test(changelog)) {
  errors.push("CHANGELOG.md is missing '## Unreleased'")
}

const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
if (!new RegExp(`^## ${escapedVersion}$`, "m").test(changelog)) {
  errors.push(`CHANGELOG.md is missing '## ${version}'`)
}

if (errors.length > 0) {
  console.error("Release metadata verification failed.\n")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("Release metadata verification passed.")
console.log(`- current version: ${version}`)
