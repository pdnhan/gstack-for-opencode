import { tool } from "@opencode-ai/plugin"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"

type BrowserAdapterConfig = {
  command: string[]
  capabilities?: string[]
  timeoutMs?: number
}

const DEFAULT_CAPABILITIES = [
  "status",
  "goto",
  "reload",
  "back",
  "forward",
  "url",
  "click",
  "fill",
  "select",
  "hover",
  "press",
  "scroll",
  "upload",
  "wait",
  "snapshot",
  "text",
  "html",
  "links",
  "forms",
  "console",
  "network",
  "is",
  "js",
  "screenshot",
  "responsive",
  "cookies",
  "cookie-import",
  "storage",
]

function configPaths(worktree: string) {
  return {
    adapter: path.join(worktree, ".opencode", "browser-adapter.json"),
    example: path.join(worktree, ".opencode", "browser-adapter.example.json"),
  }
}

async function loadConfig(worktree: string): Promise<BrowserAdapterConfig | null> {
  const { adapter } = configPaths(worktree)
  if (!existsSync(adapter)) return null

  const raw = await readFile(adapter, "utf8")
  const parsed = JSON.parse(raw) as BrowserAdapterConfig

  if (!Array.isArray(parsed.command) || parsed.command.length === 0) {
    throw new Error("browser adapter config must define a non-empty command array")
  }

  return parsed
}

function unavailablePayload(worktree: string) {
  const { adapter, example } = configPaths(worktree)
  return {
    available: false,
    mode: "missing-config",
    capabilities: [],
    configPath: adapter,
    exampleConfigPath: example,
    nextStep:
      "Create .opencode/browser-adapter.json with a command array for your browser backend. See docs/browser-adapter-config.md.",
  }
}

async function runBackend(
  worktree: string,
  cfg: BrowserAdapterConfig,
  operation: string,
  opArgs: string[],
  stdin?: string,
) {
  const command = [...cfg.command, operation, ...opArgs]
  const proc = Bun.spawn({
    cmd: command,
    cwd: worktree,
    stdin: stdin ? new TextEncoder().encode(stdin) : undefined,
    stdout: "pipe",
    stderr: "pipe",
  })

  const timeoutMs = cfg.timeoutMs ?? 30000
  const timed = Promise.race([
    proc.exited,
    new Promise<number>((resolve) => {
      setTimeout(() => resolve(-999), timeoutMs)
    }),
  ])

  const exitCode = await timed
  if (exitCode === -999) {
    proc.kill()
    throw new Error(`browser adapter command timed out after ${timeoutMs}ms`)
  }

  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()

  return {
    command,
    timeoutMs,
    exitCode,
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  }
}

export default tool({
  description:
    "Stable browser adapter for QA workflows. Use status first, then browser operations like goto, click, fill, snapshot, console, or screenshot.",
  args: {
    operation: tool.schema
      .string()
      .describe("Browser operation to run, for example status, goto, click, fill, snapshot, or screenshot"),
    arguments: tool.schema
      .array(tool.schema.string())
      .optional()
      .describe("Operation arguments passed to the configured browser backend command"),
    stdin: tool.schema
      .string()
      .optional()
      .describe("Optional stdin payload for backends that accept structured input"),
  },
  async execute(args, context) {
    const operation = args.operation.trim()
    const opArgs = args.arguments ?? []
    const cfg = await loadConfig(context.worktree)

    if (operation === "status") {
      if (!cfg) return unavailablePayload(context.worktree)

      const backend = await runBackend(context.worktree, cfg, operation, opArgs, args.stdin)

      return {
        available: backend.exitCode === 0,
        mode: "configured",
        capabilities: cfg.capabilities ?? DEFAULT_CAPABILITIES,
        command: cfg.command,
        backendCommand: backend.command,
        timeoutMs: backend.timeoutMs,
        exitCode: backend.exitCode,
        stdout: backend.stdout,
        stderr: backend.stderr,
      }
    }

    if (!cfg) {
      return {
        ...unavailablePayload(context.worktree),
        requestedOperation: operation,
      }
    }

    const capabilities = cfg.capabilities ?? DEFAULT_CAPABILITIES
    if (!capabilities.includes(operation)) {
      return {
        available: true,
        mode: "configured",
        capabilities,
        requestedOperation: operation,
        error: `operation '${operation}' is not declared in browser adapter capabilities`,
      }
    }

    const backend = await runBackend(context.worktree, cfg, operation, opArgs, args.stdin)

    return {
      available: true,
      mode: "configured",
      capabilities,
      operation,
      command: backend.command,
      exitCode: backend.exitCode,
      stdout: backend.stdout,
      stderr: backend.stderr,
    }
  },
})
