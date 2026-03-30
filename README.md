<p align="center">
  <img src="docs/assets/logo.png" alt="gstack-for-opencode" width="200"/>
</p>

<h1 align="center">gstack-for-opencode</h1>

<p align="center">
  <strong>An OpenCode-native workflow pack inspired by `gstack`</strong>
</p>

<p align="center">
  <a href="https://github.com/anomalyco/opencode/stargazers">
    <img src="https://img.shields.io/github/stars/anomalyco/opencode?style=flat" alt="GitHub Stars"/>
  </a>
  <a href="https://github.com/anomalyco/opencode/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/anomalyco/opencode" alt="License"/>
  </a>
  <a href="https://github.com/anomalyco/opencode/issues">
    <img src="https://img.shields.io/github/issues/anomalyco/opencode" alt="GitHub Issues"/>
  </a>
  <a href="https://github.com/anomalyco/opencode/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/anomalyco/opencode/verify.yml" alt="Build Status"/>
  </a>
  <a href="https://opencode.ai">
    <img src="https://img.shields.io/badge/Powered%20by-OpenCode-blue" alt="Powered by OpenCode"/>
  </a>
</p>

---

> Opinionated planning, review, QA, investigation, and shipping workflows for OpenCode.

## Why gstack-for-opencode?

This pack brings battle-tested DevEx workflows to OpenCode using its native primitives—no compatibility shims, no Claude Code dependencies. Everything runs directly on OpenCode's agent, command, and skill surfaces.

## Quickstart

```sh
# Install into your project
./scripts/quickstart-setup.sh /path/to/your-project
```

Then open your project in OpenCode. Commands, agents, and skills are discovered automatically.

Full setup guide: [`docs/install.md`](docs/install.md)

## Features

- **Code Review** — Findings-first review with bug detection, regression analysis, and test coverage checks
- **Debugging** — Root-cause-first investigation with structured hypothesis testing
- **QA Testing** — Browser-backed testing with visual diffs and bug reporting
- **Planning** — Pre-implementation reviews for engineering, design, and strategy
- **Shipping** — End-to-end release workflow with deploy verification
- **Security** — Infrastructure-first security auditing
- **Retrospective** — Team-aware commit analysis and velocity tracking

## Available Commands

| Command | Description |
|---------|-------------|
| `/review` | Findings-first code review |
| `/investigate` | Root-cause-first debugging |
| `/qa` | Browser-backed testing with fix loop |
| `/qa-only` | Report-only QA testing |
| `/browse` | Direct browser workflow |
| `/plan-eng-review` | Engineering plan review |
| `/plan-ceo-review` | Strategic scope review |
| `/plan-design-review` | Design completeness review |
| `/design-review` | Live UI audit and polish |
| `/design-shotgun` | Visual design exploration |
| `/design-consultation` | Design system creation |
| `/office-hours` | Product brainstorming |
| `/autoplan` | Full review orchestrator |
| `/ship` | Release workflow |
| `/land-and-deploy` | Merge, deploy, verify |
| `/canary` | Post-deploy monitoring |
| `/benchmark` | Performance regression detection |
| `/careful` | Destructive command warnings |
| `/freeze` | Directory-scoped edit boundary |
| `/guard` | Full safety mode |
| `/unfreeze` | Clear edit boundary |
| `/connect-chrome` | Visible browser validation |
| `/setup-browser-cookies` | Authenticated session setup |
| `/setup-deploy` | Deploy configuration |
| `/learn` | Project learning management |
| `/retro` | Weekly engineering retro |
| `/codex` | OpenAI Codex CLI integration |
| `/cso` | Security audit mode |
| `/gstack-upgrade` | Port new gstack workflows |
| `/ogstack-upgrade` | Self-update from remote |

## Project Layout

```
gstack-for-opencode/
├── AGENTS.md              # Repository guidance
├── IMPLEMENTATION_PLAN.md # Project roadmap
├── opencode.json          # Agent & tool registration
├── .opencode/
│   ├── agents/            # Specialist agents
│   ├── commands/          # Slash commands
│   ├── skills/            # Reusable workflows
│   └── tools/             # Browser & deploy adapters
├── docs/                  # Documentation
└── scripts/               # Setup & verification
```

## Documentation

- [Installation Guide](docs/install.md)
- [Quickstart](docs/quickstart.md)
- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Verification

Run the verification script before submitting PRs:

```sh
./scripts/verify-pack.sh
```

## Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for:

- Setup instructions
- Repository conventions
- Workflow development guidelines
- PR scope recommendations

## License

[MIT](LICENSE) — Feel free to use, modify, and distribute.

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/anomalyco/opencode/issues)
- 💬 [Discussions](https://github.com/anomalyco/opencode/discussions)

---

<p align="center">
  Built with ⚡ by the OpenCode community
</p>
