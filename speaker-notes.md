# GitHub Copilot Demo - Speaker Notes

> **Duration:** ~45-60 minutes (adjustable based on audience)  
> **Audience:** Developers, Tech Leads, Engineering Managers  
> **Goal:** Showcase GitHub Copilot's capabilities and teach best practices

---

## Opening (2-3 minutes)

### Key Message
GitHub Copilot is not just autocomplete—it's an AI pair programmer that can explain, generate, refactor, debug, test, and even autonomously build features.

### Hook Question
> "How many of you have spent hours debugging code that could have been caught with better tooling? Or written boilerplate code that felt like a waste of time?"

### What We'll Cover
- Core interaction modes (Ask, Edit, Agent)
- 26 practical use cases across the development lifecycle
- Best practices for effective prompting
- Customization for teams and projects

---

## Part 1: Fundamentals (5 minutes)

### The 3S Principles - MEMORIZE THESE

| Principle | Meaning | Example |
|-----------|---------|---------|
| **Simple** | One task at a time | "Add error handling to this function" (not "Add error handling, logging, and tests") |
| **Specific** | Clear requirements | "Use pytest with fixtures" (not "write tests") |
| **Short** | Concise prompts | Remove unnecessary context |

### Interaction Environments

| Mode | Shortcut | When to Use |
|------|----------|-------------|
| **Chat Window** | `Ctrl+Alt+I` | Questions, exploration, planning |
| **Inline Chat** | `Ctrl+I` | Quick edits in current file |
| **Edit Mode** | Via chat | Multi-file controlled changes |
| **Agent Mode** | Via chat | Autonomous multi-step tasks |

### Pro Tips to Mention
- Start a **new chat** for each distinct task (prevents context pollution)
- Use **`/` commands** for built-in operations (`/explain`, `/fix`, `/tests`)
- Add **context with `#`** or keep relevant files open in tabs
- **Provide feedback** (thumbs up/down) to improve suggestions

---

## Part 2: Core Use Cases (25-30 minutes)

### Demo 1: Code Explanation (01-code-explanation.py)

**Setup:** Open the file with cryptic function names (`abc`, `xyz`, `rst`)

**Demo Steps:**
1. Select the code
2. Use `/explain` command in chat

**Key Points:**
- Copilot explains web scraping, data processing, and ML training
- Identifies libraries: BeautifulSoup, pandas, sklearn
- Perfect for **onboarding** and **legacy code understanding**

**Speaker Note:**
> "Notice how Copilot not only explains *what* the code does but also *why* certain patterns are used. This is invaluable when joining a new team or dealing with undocumented code."

---

### Demo 2: Code Generation (02-code-generation.md)

**Prompt:**
```
Create a C# console app in the Program.cs file under the StockPriceChecker folder with the following features:
- Fetch and show the MSFT stock price from the Yahoo Finance API
- Add comments to the code
```

**Key Points:**
- Use **Agent mode** for multi-step generation
- Be specific about location, features, and style
- Copilot creates the file, adds dependencies, handles API calls

**Speaker Note:**
> "The more context you provide upfront, the better the result. Notice we specified the folder, the API source, and even requested comments."

---

### Demo 3: Code Refactoring (03-code-refactoring.ts)

**Show the "Before":** Deeply nested if-statements (unreadable)

**Prompt:** "Refactor the code to make it more readable and effective."

**Expected Output:** Clean filter-reduce pattern or similar

**Key Points:**
- Copilot applies idiomatic patterns for the language
- Reduces cognitive complexity
- Maintains functionality while improving readability

**Speaker Note:**
> "This nested if-else nightmare is common in legacy code. Watch how Copilot transforms it into functional, expressive code in seconds."

---

### Demo 4: Bug Fixing (04-bug-fixing.py)

**Show the Bug:** Function accepts mixed types causing unexpected behavior

**Prompt:** `/fix`

**Key Points:**
- Copilot identifies type coercion issues
- Suggests type guards or validation
- Can explain *why* the bug occurs

**Speaker Note:**
> "Copilot doesn't just fix the symptom—it understands the root cause. This is especially useful for subtle bugs that pass tests but fail in production."

---

### Demo 5: Documentation Generation (05-document-generation.py)

**Show:** Legacy Python 2 code without documentation

**Prompt:** "Document and explain the Python 2 code in preparation to modernize it into Python 3 code."

**Key Points:**
- Generates docstrings and comments
- Identifies deprecated patterns
- Prepares migration path

**Speaker Note:**
> "Documentation is often neglected. Copilot can retroactively document entire codebases, making maintenance and knowledge transfer much easier."

---

### Demo 6: Test Generation (06-test-generation.py)

**Show:** Simple function `calculate_unit_price`

**Prompt:** "Write unit tests for the function using pytest"

**Key Points:**
- Generates happy path tests
- Includes edge cases (zero quantity, negative values)
- Uses proper fixtures and assertions

**Speaker Note:**
> "Notice Copilot tests the error case too—division by zero. It thinks about edge cases you might forget."

---

### Demo 7: Code Translation (07-code-translation.rs)

**Show:** Rust function for sum of evens

**Prompt:** "Translate the code into Python, TypeScript, and C#"

**Key Points:**
- Maintains idiomatic patterns per language
- Handles type differences appropriately
- Great for polyglot teams or migrations

**Speaker Note:**
> "If you're migrating between languages or working with multiple stacks, this saves enormous time. The translations are idiomatic, not just literal."

---

### Demo 8: Security Vulnerability Detection (08-security-vulnerability-detection.py)

**Show:** API code with hardcoded empty API key, potential issues

**Prompt:** "Perform a security check"

**Key Points:**
- Identifies missing API key handling
- Catches potential injection vulnerabilities
- Suggests secure alternatives

**Speaker Note:**
> "Security is everyone's responsibility. Copilot can be your first line of defense, catching issues before code review."

---

### Demo 9: Performance Optimization (09-performance-optimization.py)

**Show:** O(n) loop for sum of squares

**Prompts:**
1. "What's the big-O notation of the function?"
2. "Optimize the function"

**Key Points:**
- Identifies complexity: O(n)
- Suggests mathematical formula: O(1)
- Explains the optimization reasoning

**Speaker Note:**
> "This is a great example of algorithmic thinking. Copilot knows the closed-form formula and can dramatically improve performance."

---

### Demo 10: Code Formatting/UI Generation (10-code-formatting.html)

**Prompt:**
```
Create an HTML page listing 12 random European countries with their population size and flag as Bootstrap cards.
Place 4 countries in each row with proper paddings and margins.
```

**Key Points:**
- Generates complete, self-contained HTML
- Uses Bootstrap grid system correctly
- Adds realistic data

**Speaker Note:**
> "For quick prototypes or mockups, this is incredibly fast. You can have a working UI in under a minute."

---

### Demo 11: Code Navigation (11-code-nagivation.md)

**Prompt:** `@workspace: Where is the method that calculates the price of an item?`

**Key Points:**
- `@workspace` searches entire codebase
- Finds relevant functions across files
- Great for large, unfamiliar codebases

**Speaker Note:**
> "Instead of grep or find-in-files, use natural language. Copilot understands intent, not just keywords."

---

### Demo 12: Workflow Generation (12-workflow-generation.md)

**Prompt:** "Generate a default CI workflow for a Python 3 project under .github/workflows/ci-py.yml"

**Key Points:**
- Creates proper YAML structure
- Includes common steps (checkout, setup, install, test)
- Follows GitHub Actions best practices

**Speaker Note:**
> "CI/CD configuration is often copy-pasted and poorly understood. Copilot generates it correctly and can explain each step."

---

### Demo 13: Infrastructure Generation (13-infrastructure-generation.tf)

**Prompt:**
```
Generate an Azure resource group in the Sweden Central region
and a storage account with:
- tier: Standard
- replication: Local Redundant
```

**Key Points:**
- Generates valid Terraform
- Uses correct provider syntax
- Handles resource dependencies

**Speaker Note:**
> "Infrastructure as Code can be intimidating. Copilot makes it accessible and ensures correct syntax."

---

## Part 3: Advanced Features (15 minutes)

### Demo 14-15: Copilot Edit & Extensions

**Edit Mode:**
- Multi-file coordinated changes
- Review before applying
- Great for refactoring across files

**Extensions (`@`):**
- `@azure` - Azure resource management
- `@docker` - Container operations
- `@terminal` - Command suggestions

**Speaker Note:**
> "Extensions connect Copilot to external services. Your Azure resources, Docker containers, and more—all accessible via chat."

---

### Demo 16-17: Terminal Chat & Fetch URL

**Terminal:** "@terminal list all files starting with a number"

**Fetch:** "#fetch https://learn.microsoft.com/... What does Agent Framework offer?"

**Key Points:**
- Learn command-line operations interactively
- Pull live documentation into context
- No more switching between browser and IDE

---

### Demo 18: Agent Mode - 3D Rubik's Cube

**Show the prompt** (comprehensive requirements)

**Key Points:**
- Agent plans, implements, tests, fixes
- Self-healing: detects and fixes errors automatically
- Can run terminal commands (with permission)

**Speaker Note:**
> "This is the future of coding. You describe *what* you want, and the agent figures out *how*. Notice it even handles bugs it creates."

---

### Demo 19: MCP (Model Context Protocol)

**Examples:**
- List commits from a GitHub repo
- Query Azure regions for model availability
- Fetch and summarize documentation

**Key Points:**
- MCP servers extend Copilot's capabilities
- Connect to external data sources
- Enterprise-grade integrations available

**Speaker Note:**
> "MCP is like giving Copilot hands to interact with the world. It can query APIs, databases, and services directly."

---

### Demo 20: Interactive Agent Development

**Show:** Fetching GitHub issue #1 and implementing it

**Key Points:**
- Agent reads real GitHub issues
- Implements requirements step by step
- Creates FastAPI apps, tests, runs servers

**Speaker Note:**
> "Imagine: you assign an issue, and Copilot drafts the implementation. Review, refine, merge. This is pair programming at scale."

---

### Demo 21-23: Customization (Instructions, Agents, Prompts)

**Custom Instructions:**
- `.github/copilot-instructions.md` - Repository-wide rules
- `.github/instructions/*.instructions.md` - Path-specific rules
- `AGENTS.md` - Agent behavior configuration

**Custom Agents:**
- Define specialized agents for workflows
- "Azure Principal Architect" mode for cloud design
- "Azure DevOps" mode for pipeline operations

**Custom Prompts:**
- Reusable prompt templates
- Available via slash commands
- Can include MCP tool calls

**Speaker Note:**
> "This is how you scale Copilot across your organization. Codify your patterns, standards, and workflows."

---

### Demo 24: Plan Mode

**Prompt:**
```
I'm planning to create a shopping website in React and Node.js...
```

**Key Points:**
- Creates EPICs and user stories
- Breaks down complex projects
- Jump-starts project planning

**Speaker Note:**
> "Before writing code, plan. Copilot can help you think through architecture and requirements systematically."

---

### Demo 25: Agent Skills

**Prompt:** "Test the webpage running on http://127.0.0.1:5500/..."

**Key Points:**
- Specialized capabilities (Playwright testing, etc.)
- Extends agent functionality
- Domain-specific tools

---

### Demo 26: Copilot SDK

**Show the Python code:**
```python
client = CopilotClient()
session = await client.create_session({...})
response = await session.send_and_wait({...})
```

**Key Points:**
- Embed Copilot in your applications
- Available for Python, .NET, Go, Node.js
- Build AI-powered CLI tools, chatbots, assistants

**Speaker Note:**
> "You can build your own Copilot-powered tools. Internal assistants, customer support bots, or developer productivity tools."

---

## Part 4: Model Selection (5 minutes)

### Quick Reference

| Need | Model |
|------|-------|
| Fast, reliable default | **GPT-4o** |
| Cleanest code & refactors | **Claude Sonnet 4** |
| Complex reasoning | **Claude Opus 4** |
| Algorithms & math | **o4-mini** |
| Massive codebases | **Gemini 2.5 Pro** |
| Fastest response | **Gemini 2.0 Flash** |

### When to Switch Models

- **Stuck on a bug?** Try Claude Opus 4 or o4-mini
- **Need speed?** Switch to Gemini 2.0 Flash
- **Large refactor?** Use GPT-4.1 or Gemini 2.5 Pro

**Speaker Note:**
> "Think of models like tools in a toolbox. You wouldn't use a hammer for every job. Match the model to the task."

---

---

## Part 5: Azure DevOps Integration Demo (8-10 minutes)

> **Demo File:** [27-azure-devops-integration.md](27-azure-devops-integration.md)
>
> **This section directly addresses Grundfos's explicit requests:**
> - ADO integration demonstration
> - MCP for Azure DevOps
> - Quality/governance in restricted environments

---

### Pre-Demo Setup

**Before the demo:**
1. Ensure Azure DevOps MCP is configured in VS Code
2. Have a sample work item ready in your ADO project
3. Switch to the **Azure DevOps Expert** custom agent mode
4. Have a simple codebase open (e.g., a Python or C# project)

---

### Demo Flow: Work Item → Implementation → Quality Gate

#### Step 1: Query ADO Work Items Live (2 minutes)

**Action:** Switch to Azure DevOps Expert agent mode, then query a work item

**Prompt:**
```
List my active work items assigned to me in the [ProjectName] project
```

**Word-for-Word Narration:**
> "Let me show you something that many of you have been asking for—using Copilot directly with Azure DevOps.
>
> I'm switching to our custom Azure DevOps agent. This agent is configured with the Azure DevOps MCP, which means it can *actually talk to ADO*—not just pretend.
>
> Watch what happens when I ask for my work items..."

*[Wait for results]*

> "See that? Live data from Azure DevOps. No copy-pasting. No browser switching. The work item IDs, titles, states—all pulled directly into my IDE."

---

#### Step 2: Fetch a Specific Work Item for Planning (2 minutes)

**Prompt:**
```
Get the details of work item #[WorkItemID] and help me create an implementation plan with:
- Key acceptance criteria
- Edge cases to consider
- Suggested test scenarios
```

**Word-for-Word Narration:**
> "Now let's take a real user story and turn it into action. I'll ask Copilot to fetch work item [number] and help me plan the implementation.
>
> Notice I'm not typing the requirements myself—they come straight from ADO. This is what you asked for when you said 'let Copilot interact with ADO items from the IDE.'
>
> And look at what it gives me back: an implementation plan grounded in *your actual requirements*, not hallucinated ones. It even suggests edge cases I might have missed."

**Key Points to Emphasize:**
- ADO is the "source of truth"
- No context is lost between tools
- Implementation plan is traceable to the work item

---

#### Step 3: Implement a Small Change (2 minutes)

**Action:** Based on the work item, implement a small code change

**Prompt:**
```
Based on work item #[WorkItemID], implement the first acceptance criterion in [filename.py/cs]
```

**Word-for-Word Narration:**
> "Now I'll ask Copilot to implement the first criterion. Watch how it references the work item context we just loaded.
>
> This is the flow: ADO tells us *what* to build. Copilot helps us build it *correctly*. And we maintain that link all the way through."

*[After code is generated]*

> "The code is generated. But here's the critical part that your survey responses emphasized: **we don't just vibe-code and ship**. Let's do a quality check."

---

#### Step 4: Quality Gate - Tests & Review (2 minutes)

**Prompt:**
```
Generate pytest unit tests for the changes I just made, including edge cases from the work item acceptance criteria
```

**Word-for-Word Narration:**
> "This is the governance layer. Copilot accelerates, but quality remains *your* responsibility.
>
> I'm asking it to generate tests that trace back to the acceptance criteria. This means when a test fails, you know exactly which requirement isn't being met.
>
> Let me also ask it to review its own work..."

**Follow-up Prompt:**
```
Review the code you just generated. What could be wrong? What would a senior developer question?
```

> "See that? It's critiquing itself. This is how you use Copilot safely—make it your code review partner, not just your code writer."

**Key Points:**
- Trust but verify
- Tests trace to requirements
- Self-review prompts catch issues early

---

#### Step 5: Link Back to ADO (1 minute)

**Prompt:**
```
Create a summary of the implementation for work item #[WorkItemID] that I can add as a comment
```

**Word-for-Word Narration:**
> "And now we close the loop. This summary can go right back into the ADO work item as a comment. Complete traceability: requirement to implementation to test to documentation.
>
> If your organization enables MCP fully, you could even have Copilot create the PR and link it automatically. But even without that, look how much faster this workflow is."

---

### The MCP Value Proposition (1 minute)

**Slide/Talking Point:**

> "Let me address something many of you asked in the surveys: 'Please enable MCP for Azure DevOps.'
>
> What you just saw is what becomes possible. MCP isn't about giving AI more power—it's about giving it *grounded context*.
>
> Without MCP: Copilot guesses at your requirements.
> With MCP: Copilot *knows* your requirements because it reads them from ADO.
>
> This is the difference between a helpful tool and a trusted teammate."

---

### Addressing Restrictions (30 seconds)

**Narration for restricted environments:**

> "I know that certain Copilot features may be unavailable due to your environment restrictions. Here's what works regardless:
>
> - **Today, without MCP:** Copy work item details into chat, use the 3S principles, generate code, tests, and docs
> - **With MCP enabled:** Everything you just saw—live ADO queries, contextual planning, automatic linking
> - **Either way:** The quality gate workflow applies. Never skip the review step."

---

### ADO Demo Summary Slide

| What They Asked For | What You Showed |
|---------------------|-----------------|
| "ADO integration" | Live work item queries from IDE |
| "MCP for ADO" | Azure DevOps MCP in action |
| "Quality/governance" | Test generation + self-review prompts |
| "Practical, hands-on" | Real workflow: work item → code → tests |

---

### Backup: Azure Pipeline YAML Demo (Optional - 2 minutes)

**Use if audience is DevOps-heavy:**

**Prompt:**
```
Generate an Azure Pipeline YAML for a Python project with:
- Trigger on main branch
- Run pytest with coverage
- Publish test results
- Fail if coverage < 80%
```

**Narration:**
> "And if you work with pipelines, Copilot understands Azure Pipeline YAML syntax too. Watch it generate a complete CI pipeline with coverage gates..."

---

## Closing (3-5 minutes)

### The Transformation

| Before Copilot | After Copilot |
|----------------|---------------|
| Write boilerplate manually | Generate instantly |
| Debug by print statements | AI-assisted diagnosis |
| Read docs in browser | Fetch docs into context |
| Manual code review | AI pre-review |
| Fear legacy code | Explain and refactor with confidence |

### Call to Action

1. **Start small:** Use `/explain` on confusing code tomorrow
2. **Build habits:** New chat for each task, provide context
3. **Customize:** Add `.github/copilot-instructions.md` to your repos
4. **Level up:** Try Agent mode for your next feature

### Final Words

> "GitHub Copilot won't replace developers—but developers using Copilot will outperform those who don't. It's not about the AI writing code for you; it's about you and the AI writing better code together."

---

## Q&A Preparation

### Common Questions & Answers

**Q: Is the code Copilot generates secure?**
A: Copilot follows security best practices, but always review generated code. Use the security check prompts demonstrated, and combine with traditional security tools.

**Q: Does it work offline?**
A: No, Copilot requires internet connectivity to access the AI models.

**Q: What about intellectual property?**
A: Copilot generates original code based on patterns. GitHub offers IP indemnity for Enterprise customers. Code is not stored or used to train models (for Enterprise/Business).

**Q: How do I get my team started?**
A: Start with repository-wide custom instructions, establish team prompts, and share successful patterns via custom agents.

**Q: Which model should I default to?**
A: GPT-4o or Claude Sonnet 4 for most tasks. Use specialized models when needed.

### Azure DevOps Specific Questions

**Q: How do I enable the Azure DevOps MCP?**
A: The Azure DevOps MCP server needs to be configured in your VS Code settings. It requires authentication via Azure DevOps PAT (Personal Access Token). Your IT team needs to approve MCP usage in your environment.

**Q: Can Copilot create PRs and work items automatically?**
A: Yes, if MCP is enabled and properly configured. The Azure DevOps MCP supports creating work items, pull requests, branches, and even pipeline runs. Without MCP, you'd need to manually copy Copilot's output into ADO.

**Q: What if MCP isn't approved in our environment?**
A: You can still use Copilot effectively by manually providing context—copy work item descriptions into chat, paste code back into ADO. The workflow is the same, just with a manual bridging step. Document your prompts so the team can reuse them.

**Q: Does this replace our existing ADO workflows?**
A: No, it enhances them. ADO remains your source of truth for work items, pipelines, and governance. Copilot just makes developers faster at executing against that source of truth.

**Q: Is the ADO integration read-only or can it make changes?**
A: The Azure DevOps MCP supports both read and write operations. You can query work items (read), but also create branches, PRs, and update work items (write). Your organization can configure which operations are allowed.

---

## Demo Environment Checklist

- [ ] VS Code with GitHub Copilot extension installed
- [ ] All demo files in workspace
- [ ] Terminal ready
- [ ] Internet connection stable
- [ ] Backup screenshots/recordings in case of API issues
- [ ] Custom instructions configured
- [ ] MCP servers set up (for MCP demo)
- [ ] **Azure DevOps MCP configured and authenticated**
- [ ] **Azure DevOps Expert agent mode available**
- [ ] **Sample ADO work item prepared (note the ID)**
- [ ] **ADO project name confirmed**

---

## Timing Guide

| Section | Duration |
|---------|----------|
| Opening | 2-3 min |
| Fundamentals | 5 min |
| Core Use Cases (1-13) | 25-30 min |
| Advanced Features (14-26) | 15 min |
| **Azure DevOps Integration Demo** | **8-10 min** |
| Model Selection | 5 min |
| Closing & Q&A | 10-15 min |
| **Total** | **~70 min** |

---

*Good luck with your demo! Remember: enthusiasm is contagious, and live coding is always more engaging than slides.*
