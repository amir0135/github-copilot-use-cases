```markdown
## Azure DevOps Integration Demo

This demo showcases GitHub Copilot's integration with Azure DevOps using the Azure DevOps MCP and custom Azure DevOps Expert agent.

### Prerequisites
- Azure DevOps MCP configured in VS Code
- Azure DevOps Expert agent mode available (`.github/agents/azure-devops.agent.md`)
- Access to an Azure DevOps project with work items

---

### Demo Flow: Work Item → Plan → Code → Tests → Link Back

---

### Step 1: Query Work Items (Switch to Azure DevOps Expert agent)

**Prompt:**
```
List all projects in my Azure DevOps organization
```

**Follow-up:**
```
List my active work items assigned to me in the [ProjectName] project
```

---

### Step 2: Fetch Work Item Details & Create Implementation Plan

**Prompt:**
```
Get the details of work item #[WorkItemID] and help me create an implementation plan with:
- Key acceptance criteria
- Edge cases to consider  
- Suggested test scenarios
```

---

### Step 3: Implement Based on Work Item

**Prompt:**
```
Based on work item #[WorkItemID], implement the first acceptance criterion in a new Python file called feature_impl.py
```

---

### Step 4: Quality Gate - Generate Tests

**Prompt:**
```
Generate pytest unit tests for the changes I just made, including edge cases from the work item acceptance criteria
```

---

### Step 5: Self-Review (Governance)

**Prompt:**
```
Review the code you just generated. What could be wrong? What would a senior developer question?
```

---

### Step 6: Create Summary for ADO

**Prompt:**
```
Create a summary of the implementation for work item #[WorkItemID] that I can add as a comment
```

---

### Bonus: Create a Branch and PR (if MCP write access enabled)

**Prompt:**
```
Create a new branch called feature/work-item-[ID] from main in [RepoName] repository
```

**Prompt:**
```
Create a pull request from feature/work-item-[ID] to main with:
- Title linked to work item #[WorkItemID]
- Description summarizing the implementation
- Link to the work item
```

---

### Alternative: Azure Pipeline YAML Generation

**Prompt:**
```
Generate an Azure Pipeline YAML for a Python project with:
- Trigger on main branch
- Run pytest with coverage
- Publish test results to Azure DevOps
- Fail if coverage < 80%
```

---

### Key Talking Points

| What They Asked | What You Show |
|-----------------|---------------|
| "ADO integration" | Live work item queries from IDE |
| "MCP for ADO" | Azure DevOps MCP reading/writing to ADO |
| "Quality/governance" | Test generation + self-review prompts |
| "Hands-on, practical" | Full workflow: work item → code → tests |

---

### Without MCP (Manual Workflow)

If MCP is not enabled, you can still demo the workflow:

1. **Copy** work item description from ADO into Copilot chat
2. **Use 3S principles** to generate implementation plan
3. **Generate code** based on pasted requirements
4. **Generate tests** referencing the requirements
5. **Copy** summary back to ADO as a comment

The value is the same—just with a manual bridging step.

---

### MCP Value Proposition Quote

> "MCP isn't about giving AI more power—it's about giving it *grounded context*. Without MCP, Copilot guesses at your requirements. With MCP, Copilot *knows* your requirements because it reads them directly from ADO."

```
