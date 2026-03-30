import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

const root = process.cwd()

const requiredTopLevelFiles = [
  "AGENTS.md",
  "README.md",
  "IMPLEMENTATION_PLAN.md",
  "ARCHITECTURE.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "VERSION",
  "opencode.json",
]

const requiredDocs = [
  path.join("docs", "install.md"),
  path.join("docs", "quickstart.md"),
  path.join("docs", "verification.md"),
  path.join("docs", "troubleshooting.md"),
]

const requiredCoreCommands = [
  "review",
  "investigate",
  "qa",
  "qa-only",
  "plan-eng-review",
  "ship",
]

const requiredCoreAgents = [
  "review",
  "investigate",
  "qa",
  "qa-only",
  "plan-eng-review",
  "ship",
]

const requiredCoreSkills = [
  "review-workflow",
  "investigate-workflow",
  "qa-playbook",
  "qa-report-only",
  "planning-rubric",
  "release-checks",
]

const errors = []
const notes = []

function fail(message) {
  errors.push(message)
}

function note(message) {
  notes.push(message)
}

function assertExists(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!existsSync(fullPath)) {
    fail(`missing required path: ${relativePath}`)
  }
}

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8")
}

function listMarkdownBasenames(relativeDir) {
  const fullDir = path.join(root, relativeDir)
  if (!existsSync(fullDir)) return []

  return readdirSync(fullDir)
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => entry.slice(0, -3))
}

function extractFrontmatterBlock(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/)
  return match ? match[1] : ""
}

function extractAgentReference(markdown) {
  const block = extractFrontmatterBlock(markdown)
  const match = block.match(/^agent:\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function extractSkillNamesFromYamlLikeBlock(markdown) {
  const block = extractFrontmatterBlock(markdown)
  const match = block.match(/permission:\n(?:.*\n)*?\s+skill:\n([\s\S]*?)(?:\n\S|$)/)
  if (!match) return []

  return [...match[1].matchAll(/^\s+([A-Za-z0-9._/-]+):\s+allow$/gm)].map((item) => item[1])
}

function extractBrowserEnabled(markdown) {
  const block = extractFrontmatterBlock(markdown)
  return /^tools:\n(?:.*\n)*?\s+browser:\s+true$/m.test(block)
}

function extractSkillDisplayName(markdown) {
  const block = extractFrontmatterBlock(markdown)
  const match = block.match(/^name:\s+(.+)$/m)
  return match ? match[1].trim() : null
}

for (const file of requiredTopLevelFiles) {
  assertExists(file)
}

for (const file of requiredDocs) {
  assertExists(file)
}

for (const name of requiredCoreCommands) {
  assertExists(path.join(".opencode", "commands", `${name}.md`))
}

for (const name of requiredCoreAgents) {
  assertExists(path.join(".opencode", "agents", `${name}.md`))
}

for (const name of requiredCoreSkills) {
  assertExists(path.join(".opencode", "skills", name, "SKILL.md"))
}

assertExists(path.join(".opencode", "tools", "browser.ts"))

const commandNames = listMarkdownBasenames(path.join(".opencode", "commands"))
const agentNames = new Set(listMarkdownBasenames(path.join(".opencode", "agents")))
const skillNames = new Set()
for (const entry of readdirSync(path.join(root, ".opencode", "skills"), { withFileTypes: true }).filter((item) => item.isDirectory())) {
  const skillPath = path.join(root, ".opencode", "skills", entry.name, "SKILL.md")
  if (!existsSync(skillPath)) {
    fail(`.opencode/skills/${entry.name} is missing SKILL.md`)
    continue
  }

  skillNames.add(entry.name)

  const displayName = extractSkillDisplayName(read(path.join(".opencode", "skills", entry.name, "SKILL.md")))
  if (displayName) {
    skillNames.add(displayName)
  }
}

for (const commandName of commandNames) {
  const commandPath = path.join(".opencode", "commands", `${commandName}.md`)
  const agentRef = extractAgentReference(read(commandPath))
  if (!agentRef) {
    fail(`${commandPath} is missing frontmatter agent reference`)
    continue
  }
  if (!agentNames.has(agentRef)) {
    fail(`${commandPath} references missing agent '${agentRef}'`)
  }
}

for (const agentName of agentNames) {
  const agentPath = path.join(".opencode", "agents", `${agentName}.md`)
  const agentMarkdown = read(agentPath)
  const grantedSkills = extractSkillNamesFromYamlLikeBlock(agentMarkdown)
  for (const skill of grantedSkills) {
    if (!skillNames.has(skill)) {
      fail(`${agentPath} grants missing skill '${skill}'`)
    }
  }

  if (extractBrowserEnabled(agentMarkdown) && !existsSync(path.join(root, ".opencode", "tools", "browser.ts"))) {
    fail(`${agentPath} enables browser tool but .opencode/tools/browser.ts is missing`)
  }
}

let opencode
try {
  opencode = JSON.parse(read("opencode.json"))
} catch (error) {
  fail(`opencode.json failed to parse: ${error.message}`)
}

if (opencode?.agent && typeof opencode.agent === "object") {
  for (const [agentName, agentConfig] of Object.entries(opencode.agent)) {
    if (!agentNames.has(agentName)) {
      fail(`opencode.json registers agent '${agentName}' without .opencode/agents/${agentName}.md`)
    }

    const grantedSkills = Object.keys(agentConfig?.permission?.skill ?? {})
    for (const skill of grantedSkills) {
      if (!skillNames.has(skill)) {
        fail(`opencode.json agent '${agentName}' grants missing skill '${skill}'`)
      }
    }

    if (agentConfig?.tools?.browser === true && !existsSync(path.join(root, ".opencode", "tools", "browser.ts"))) {
      fail(`opencode.json agent '${agentName}' enables browser tool but .opencode/tools/browser.ts is missing`)
    }
  }
} else {
  fail("opencode.json is missing an agent object")
}

const quickstartScript = path.join(root, "scripts", "quickstart-setup.sh")
if (existsSync(quickstartScript)) {
  const mode = statSync(quickstartScript).mode
  if ((mode & 0o111) === 0) {
    note("scripts/quickstart-setup.sh is not executable")
  }
}

if (errors.length > 0) {
  console.error("Verification failed.\n")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  if (notes.length > 0) {
    console.error("\nNotes:")
    for (const item of notes) {
      console.error(`- ${item}`)
    }
  }
  process.exit(1)
}

console.log("Verification passed.")
console.log(`- checked top-level docs: ${requiredTopLevelFiles.length}`)
console.log(`- checked required support docs: ${requiredDocs.length}`)
console.log(`- checked commands: ${commandNames.length}`)
console.log(`- checked agents: ${agentNames.size}`)
console.log(`- checked skills: ${skillNames.size}`)

if (notes.length > 0) {
  console.log("Notes:")
  for (const item of notes) {
    console.log(`- ${item}`)
  }
}
