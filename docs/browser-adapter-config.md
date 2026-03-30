# Browser Adapter Config

## Purpose

Provide candidate OpenCode configuration shapes for enabling browser-backed `/qa` workflows.

These are design targets for the repo. They are not all implemented yet.

## Recommended Shape

Prefer a browser backend that is enabled globally at the MCP level but exposed only to the `qa` agent through tool permissions.

That keeps the browser surface narrow and avoids bloating unrelated agent contexts.

## Example: MCP-backed browser adapter

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "browser": {
      "type": "local",
      "command": ["npx", "-y", "your-browser-mcp-server"],
      "enabled": true
    }
  },
  "tools": {
    "browser_*": false
  },
  "agent": {
    "qa": {
      "tools": {
        "browser_*": true
      }
    }
  }
}
```

Use this pattern when the MCP server registers tools with a `browser_` prefix.

## Example: Remote MCP browser backend

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "browser": {
      "type": "remote",
      "url": "https://your-browser-mcp.example.com/mcp",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:BROWSER_MCP_TOKEN}"
      }
    }
  },
  "tools": {
    "browser_*": false
  },
  "agent": {
    "qa": {
      "tools": {
        "browser_*": true
      }
    }
  }
}
```

## Example: Repo-owned custom tool wrapper

If the repo later adds `.opencode/tools/browser.ts`, the preferred surface is still to expose it primarily to the `qa` agent.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "tools": {
    "browser": false
  },
  "agent": {
    "qa": {
      "tools": {
        "browser": true
      }
    }
  }
}
```

## Capability Detection Expectations

Before `/qa` runs in full browser-backed mode, the implementation should verify that the browser surface supports at least:

- navigation
- click and form input
- page structure inspection
- screenshot capture
- console inspection
- element state checks

If these are incomplete, the workflow should downgrade to blocked or limited mode.

## Suggested Future Repo Files

When browser execution is implemented, the repo should likely gain:

- `.opencode/tools/browser.ts`
- `docs/browser-adapter-plan.md`
- `docs/browser-adapter-config.md`
- `docs/qa-execution.md`

## Recommendation

Start with MCP-backed execution for speed.

Wrap it behind a repo-owned adapter surface as soon as the first working `/qa` session exists.
