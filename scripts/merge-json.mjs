import { existsSync, readFileSync, writeFileSync } from "node:fs"
import readline from "node:readline"
import path from "node:path"

const targetPath = process.argv[2]
const sourcePath = process.argv[3]

if (!targetPath || !sourcePath) {
  console.error("Usage: node merge-json.mjs <target-json> <source-json>")
  process.exit(1)
}

if (!existsSync(sourcePath)) {
  console.error(`Source not found: ${sourcePath}`)
  process.exit(1)
}

if (!existsSync(targetPath)) {
  // If target doesn't exist, we can just copy it directly, but setup.sh handles this already.
  process.exit(0)
}

const sourceJson = JSON.parse(readFileSync(sourcePath, "utf8"))
const targetJson = JSON.parse(readFileSync(targetPath, "utf8"))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function promptUser(question) {
  return new Promise((resolve) => {
    // Auto-skip (no overwrite) if not running in TTY to avoid hanging in CI environments
    if (!process.stdin.isTTY) {
      console.log(`\n${question} [auto-answered: no]`)
      resolve(false)
      return
    }

    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase() === "y" || answer.trim().toLowerCase() === "yes")
    })
  })
}

async function mergeKeys(targetGroup, sourceGroup, groupName) {
  if (!targetJson[groupName]) {
    targetJson[groupName] = {}
  }
  
  if (!sourceGroup) return

  for (const [key, sourceValue] of Object.entries(sourceGroup)) {
    const targetValue = targetJson[groupName][key]
    
    if (targetValue) {
      if (JSON.stringify(targetValue) !== JSON.stringify(sourceValue)) {
        const overwrite = await promptUser(`[Conflict] ${groupName} '${key}' already exists explicitly in target. Overwrite with gstack's version? (y/N): `)
        if (overwrite) {
          targetJson[groupName][key] = sourceValue
          console.log(`- Overwrote ${groupName}.${key}`)
        } else {
          console.log(`- Kept existing ${groupName}.${key}`)
        }
      } else {
        // they are identical
        console.log(`- Skipped ${groupName}.${key} (identical)`)
      }
    } else {
      // safe to insert
      targetJson[groupName][key] = sourceValue
      console.log(`- Merged ${groupName}.${key}`)
    }
  }
}

async function run() {
  console.log(`merge ${targetPath}`)
  
  await mergeKeys(targetJson.tools, sourceJson.tools, "tools")
  await mergeKeys(targetJson.agent, sourceJson.agent, "agent")

  writeFileSync(targetPath, JSON.stringify(targetJson, null, 2) + "\n", "utf8")
  rl.close()
}

run().catch(err => {
  console.error("Error merging json:", err)
  process.exit(1)
})
