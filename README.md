# GitHub Copilot Use Cases

A hands-on catalogue of **28 GitHub Copilot capabilities**, each backed by a runnable file or a short walkthrough. Open a numbered file, follow the prompt at the top, and watch the capability in action.

Built as demo material for workshops and enablement sessions — the files are deliberately small so a room can follow along live.

> Looking for a structured, multi-hour format instead? See the [Hands-on Copilot Workshop](https://github.com/amir0135/Hands-on-workshop-GH-Copilot).

---

## Core coding capabilities

| # | Use case | File | What it shows |
|---|---|---|---|
| 01 | Code explanation | [`01-code-explanation.py`](01-code-explanation.py) | Explaining unfamiliar code in place |
| 02 | Code generation | [`02-code-generation.md`](02-code-generation.md) | Natural-language comments → implementation |
| 03 | Code refactoring | [`03-code-refactoring.ts`](03-code-refactoring.ts) | Cleaning up and restructuring existing code |
| 04 | Bug fixing | [`04-bug-fixing.py`](04-bug-fixing.py) | Locating and repairing defects |
| 05 | Documentation generation | [`05-document-generation.py`](05-document-generation.py) | Docstrings and comments from code |
| 06 | Test generation | [`06-test-generation.py`](06-test-generation.py) | Unit tests for existing functions |
| 07 | Code translation | [`07-code-translation.rs`](07-code-translation.rs) | Porting logic between languages |
| 08 | Security vulnerability detection | [`08-security-vulnerability-detection.py`](08-security-vulnerability-detection.py) | Spotting and fixing insecure patterns |
| 09 | Performance optimization | [`09-performance-optimization.py`](09-performance-optimization.py) | Algorithmic and data-structure improvements |
| 10 | Code formatting | [`10-code-formatting.html`](10-code-formatting.html) | Applying style conventions automatically |
| 11 | Code navigation | [`11-code-nagivation.md`](11-code-nagivation.md) | Finding your way around a large codebase |

## Automation & infrastructure

| # | Use case | File | What it shows |
|---|---|---|---|
| 12 | Workflow generation | [`12-workflow-generation.md`](12-workflow-generation.md) | Generating CI/CD workflows |
| 13 | Infrastructure as code | [`13-infrastructure-generation.tf`](13-infrastructure-generation.tf) | Terraform, Bicep, and ARM generation |
| 16 | Terminal chat | [`16-terminal-chat.md`](16-terminal-chat.md) | Context-aware shell command suggestions |
| 27 | Azure DevOps integration | [`27-azure-devops-integration.md`](27-azure-devops-integration.md) | Work items, branches, and PRs from the IDE |

## Agent mode & extensibility

| # | Use case | File | What it shows |
|---|---|---|---|
| 14 | Copilot Edit | [`14-copilot-edit.md`](14-copilot-edit.md) | Multi-file edits from a single instruction |
| 15 | Copilot Extensions | [`15-copilot-extension.md`](15-copilot-extension.md) | Invoking extensions with `@` |
| 17 | Fetch URL | [`17-fetch-url.md`](17-fetch-url.md) | Pulling external context into a conversation |
| 18 | Copilot Agent | [`18-copilot-agent.md`](18-copilot-agent.md) | Self-healing iteration on its own output |
| 19 | MCP | [`19-mcp.md`](19-mcp.md) | Model Context Protocol fundamentals |
| 20 | Interactive agent development | [`20-interactive-agent-development.md`](20-interactive-agent-development.md) | Building alongside an agent |
| 24 | Plan mode | [`24-plan-mode.md`](24-plan-mode.md) | EPIC and user-story breakdown before coding |
| 26 | Copilot SDK | [`26-copilot-sdk.py`](26-copilot-sdk.py) | Embedding Copilot in your own applications |
| 28 | CLI with custom agents | [`28-cli-with-custom-agents.md`](28-cli-with-custom-agents.md) | Driving agents from the terminal |

## Customisation

| # | Use case | File | What it shows |
|---|---|---|---|
| 21 | Custom instructions | [`21-custom-instructions.md`](21-custom-instructions.md) | Team-wide behavioural defaults |
| 22 | Custom agents | [`22-custom-agents.md`](22-custom-agents.md) | Specialised agents per scenario |
| 23 | Custom prompts | [`23-custom-prompts.md`](23-custom-prompts.md) | Reusable prompt files |
| 25 | Agent skills | [`25-agent-skills.md`](25-agent-skills.md) | Extending agents with packaged capabilities |

## Reference material

- [`copilot-model-comparison.md`](copilot-model-comparison.md) — choosing between the available models
- [`enterprise-mcp-servers.md`](enterprise-mcp-servers.md) — MCP servers worth adopting in an enterprise setting
- [`.github/prompts/`](.github/prompts/) — ready-made prompt files (DRY-violation check, onboarding plan)
- [`StockPriceChecker/`](StockPriceChecker/) — .NET sample used by several demos (`github-copilot-dotnet-demo.sln`)
- [`api-endpoints.http`](api-endpoints.http) — REST Client requests for the API demos

---

## Getting started

**Prerequisites**

- VS Code with the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and Copilot Chat extensions
- An active GitHub Copilot subscription
- Python 3.9+ for the `.py` samples; .NET SDK 8.0+ for `StockPriceChecker`

```bash
git clone https://github.com/amir0135/github-copilot-use-cases.git
cd github-copilot-use-cases
pip install -r requirements.txt
```

Then open any numbered file and follow the instructions in its header comment.

## Working effectively with Copilot

**Know your surfaces**

| Surface | Shortcut |
|---|---|
| Chat window | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>i</kbd> |
| Inline chat | <kbd>Ctrl</kbd> + <kbd>i</kbd> |
| Voice input | VS Code Speech extension |

**The 3S principle** — keep prompts **Simple**, **Specific**, and **Short**.

**Habits that help**

- Start a new chat when you change topic; stale context degrades suggestions
- Type `/` for built-in commands, `#` to add context, `@` to call an extension
- Keep relevant files open in tabs — Copilot reads them as context
- Give thumbs up/down feedback; it tunes future suggestions
- Trim irrelevant turns from a long conversation rather than fighting them

## License

MIT — see [LICENSE](LICENSE).
