---
description: Chief Security Officer audit — scan for secrets, supply chain risks, CI/CD vulnerabilities, OWASP Top 10, and LLM-specific attack vectors
agent: cso
subtask: true
---
Run a Chief Security Officer security audit on this repository.

Default: full audit, all phases, 8/10 confidence gate (zero noise).

Scope flags (mutually exclusive):

- `/cso --comprehensive` — monthly deep scan, 2/10 bar, surfaces more findings (marked TENTATIVE)
- `/cso --infra` — infrastructure only (CI/CD, Docker, IaC, secrets)
- `/cso --code` — code only (OWASP, LLM security, injection, auth)
- `/cso --skills` — AI skill supply chain only
- `/cso --supply-chain` — dependency audit only
- `/cso --owasp` — OWASP Top 10 only
- `/cso --scope <domain>` — focused audit on a specific area (e.g. `auth`, `payments`)

Combinable flag:

- `--diff` — constrain scanning to current branch changes only

Phases covered: secrets archaeology, dependency supply chain, CI/CD pipeline, infrastructure, webhooks, LLM/AI security, skill supply chain, OWASP Top 10, STRIDE threat model, data classification. Findings include severity, confidence score, exploit scenario, and remediation plan.
