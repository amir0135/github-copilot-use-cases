## Using Copilot Terminal Chat with Custom Agents

This task demonstrates how to use GitHub Copilot's terminal inline chat together with custom agents to generate, run, and analyze CLI commands — all within VS Code.

### Overview

Copilot offers two powerful features that work together:
- **Terminal inline chat** (`Cmd+I` / `Ctrl+I` in the terminal) — ask Copilot to generate and run terminal commands
- **Custom agents** (`.github/agents/`) — domain-specific agents you can select in the chat panel to get expert guidance

By combining them, you can use the agent for analysis and recommendations, then use terminal chat to execute commands instantly.

### Prerequisites

- Azure CLI (`az`) installed and authenticated
- Custom agents configured in `.github/agents/`
- Access to an Azure subscription with deployed resources

---

### Demo Flow: Agent Analyzes → Terminal Executes

---

### Step 1: Use Terminal Chat to Explore Your Environment

Press `Cmd+I` (macOS) or `Ctrl+I` (Windows/Linux) while focused in the terminal.

**Terminal chat prompt:**
```
list all my Azure resource groups in a table
```

Copilot generates and inserts the command (`az group list --output table`) directly into your terminal. Press Enter to run it.

---

### Step 2: Switch to a Custom Agent in the Chat Panel for Analysis

Open the Copilot chat panel and select the **Azure Principal Architect** agent from the agent picker dropdown.

**Prompt:**
```
I have the following resource groups in my subscription: [paste terminal output].
Assess the architecture of the resources in the [ResourceGroupName] resource group against the Well-Architected Framework pillars and recommend improvements.
```

The agent provides expert architectural recommendations with specific changes to make.

---

### Step 3: Use Terminal Chat to Execute the Recommendations

Go back to the terminal, press `Cmd+I` / `Ctrl+I`, and ask Copilot to run the recommended changes.

**Terminal chat prompt:**
```
enable diagnostic settings on my App Service named [AppName] in resource group [RGName]
```

Copilot generates the exact `az` command and inserts it into your terminal — review and press Enter.

---

### Step 4: Validate with Terminal Chat

**Terminal chat prompt:**
```
show me the diagnostic settings for my App Service [AppName] in [RGName]
```

---

### More Terminal Chat Examples

Press `Cmd+I` / `Ctrl+I` in the terminal and try these:

```
show me all VMs in my subscription that are running
```

```
create a new resource group called demo-rg in eastus
```

```
list all Azure DevOps projects in my organization
```

---

### Variation: Use Azure DevOps Expert Agent with Terminal Chat

Pair the **Azure DevOps Expert** agent with terminal chat.

**Terminal chat prompt (`Cmd+I` in terminal):**
```
list all Azure DevOps projects in table format
```

**Switch to Azure DevOps Expert agent in chat panel and prompt:**
```
Based on this project list, show me the active work items in [ProjectName] and suggest a pipeline YAML for the highest-priority item.
```

---

### Key Talking Points

| What They Asked | What You Show |
|-----------------|---------------|
| "Copilot in terminal" | `Cmd+I` generates CLI commands from natural language |
| "Custom agents" | Agent picker in chat panel for domain expertise |
| "End-to-end" | Agent analyzes → terminal chat executes → validate |
| "No memorizing syntax" | Copilot writes the `az` commands for you |

---

### How It Works

1. **Terminal inline chat** (`Cmd+I` / `Ctrl+I`) — describe what you want in plain English, Copilot generates the CLI command directly in your terminal
2. **Custom agents** (agent picker in chat panel) — select a specialist agent for deeper analysis and recommendations
3. **Bounce between them** — agent gives strategy, terminal chat gives execution

---

### Why This Matters

> Terminal chat removes the need to memorize CLI syntax. Custom agents add domain expertise. Together, you go from "what should I do?" to "it's done" — without leaving VS Code.
