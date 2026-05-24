## GitHub Copilot Use Cases

> 🎓 **Running the NKT 3-hour workshop?** Start with [WORKSHOP.md](WORKSHOP.md) — it maps every file below to an agenda block (trust & limits, workflows, prompting, agents, hands-on, adoption).

> 🎤 **Facilitator note:** This README is the script you walk through in **Block 1 — Trust & Limits**. Each section below has a one-line bullet *plus* a short "say this aloud" elaboration you can use live. Don't read it word-for-word — pick the lines that match your audience and the questions you've already heard.

### Environment

💬 **Chat Window (Ctrl + Alt + i)** — The conversational surface. Use it when you want a discussion, a plan, or an explanation *before* code changes anything. Say: *"This is where I think out loud with Copilot — nothing in my file changes until I decide."*

✍️ **Inline Chat (Ctrl + i)** — Ask Copilot for a change exactly where your cursor is. Say: *"This is the surgical tool — one method, one block, one edit. You see the diff before you accept."*

🧠 **Models** — You can switch between Claude, GPT, Gemini, and reasoning models per chat. Say: *"Different models behave differently. We'll come back to this in [copilot-model-comparison.md](copilot-model-comparison.md) — picking the right model is part of using Copilot professionally."*

🗣️ **Speak (VS Code Speech Extension)** — Dictate prompts instead of typing. Useful for long context-setting prompts when your hands are off the keyboard. Say: *"Optional, but a real productivity win for the people who try it."*

✏️ **Edit** — Copilot Edits lets you propose changes across **multiple files at once** and review them as a single diff. Say: *"Think of it as a pull request that hasn't been created yet — you review and pick what survives."*

🤖 **Agent** — Copilot drives the loop: reads files, edits them, runs commands, iterates. Say: *"This is the powerful and scary one. We dedicate a whole block to it later — for now just know it exists."*

### 3S Principles

🟢 **Simple** — One concept per prompt. If you find yourself writing "and also…", split it into two prompts. Say: *"Compound prompts are how you get compound mistakes."*

🔵 **Specific** — Name the file, the function, the constraint, the goal. *"Refactor this"* is a wish. *"Refactor `CalculateTax` in `PricingService.cs` to remove the nested `if` blocks, keep the public signature, and don't add new dependencies"* is a request. Say: *"Specificity is the cheapest accuracy upgrade you'll ever get."*

🟡 **Short** — A focused 2-sentence prompt beats a paragraph almost every time. Say: *"If your prompt is longer than the change you want, you're probably describing the wrong thing."*

### Best Practices

🆕 **New chat!** — Start fresh whenever you switch tasks. Old context bleeds into new answers. Say: *"Every long chat eventually drifts. When in doubt, new chat."*

🛠️ **Use built-in commands by typing /** — `/explain`, `/fix`, `/tests`, `/doc`, `/new`, `/help`. Say: *"These aren't shortcuts — they're prompt templates the Copilot team tuned for you. Use them before writing your own version."*

📝 **Add context by typing # or attach files / keep them open** — `#file`, `#selection`, `#editor`, `#codebase`, `#problems`. Say: *"Copilot can't read your mind, but it can read what you point at. Most 'bad answers' are missing-context answers."*

👍 **Provide feedback** — Thumbs up/down on responses. Say: *"This is one of the few places where the feedback button actually moves the model over time. Use it."*

### Showcasing GitHub Copilot Features

📝 **Code Explanation** — Highlight a block, run `/explain`, get a plain-language walkthrough. Say: *"This is the #1 onboarding accelerator. New joiner on a legacy module? They get a free senior engineer who already read the file. Demo file: [01-code-explanation.py](01-code-explanation.py)."*

✍️ **Code Completion** — As you type, Copilot proposes the next line or block via greyed-out "ghost text". Say: *"Low-stakes, high-frequency. You're in control character by character — but resist tab-tab-tab coding. Read what you accept."*

🛠️ **Code Generation** — Write a comment describing what you want; Copilot drafts the code. Say: *"This is where Copilot pays for itself on day one — DTOs, mappers, form scaffolds, the 47th repository class. Show one example of your team's style and it matches the rest. Demo: [04-code-generation.md](04-code-generation.md)."*

🔄 **Code Refactoring** — Ask for cleaner, safer, or more idiomatic versions of existing code. Say: *"The trick is to refactor in small, reviewable steps — not 'make this better' in one shot. Demo: [03-code-refactoring.ts](03-code-refactoring.ts)."*

🐞 **Bug Fixing** — Paste a stack trace or failing test; ask Copilot for likely causes and fixes. Say: *"Don't ask 'fix this'. Ask 'give me three possible causes ranked by likelihood, and what I'd check for each'. You stay the engineer. Demo: [05-bug-fixing.py](05-bug-fixing.py)."*

📄 **Documentation Generation** — Generate XML docs, JSDoc, docstrings, or READMEs from existing code. Say: *"This is the easiest place to start with agents — it's reversible, low-risk, and the team feels the value immediately. Demo: [10-document-generation.py](10-document-generation.py)."*

🧪 **Test Case Generation** — Generate unit tests covering happy path *and* edge cases. Say: *"Always prompt explicitly for edge cases, null inputs, and error conditions — otherwise you get happy-path-only tests that pass and prove nothing. Demo: [07-test-generation.py](07-test-generation.py)."*

🌐 **Code Translation** — Port code between languages (e.g., C# ↔ TypeScript ↔ Python ↔ Rust). Say: *"Useful for legacy migration scenarios and for understanding code in a language you don't speak. Don't blindly trust the result — translate, then test. Demo: [12-code-translation.rs](12-code-translation.rs)."*

🔌 **API Integration** — Generate clients, request/response models, and error handling for third-party APIs. Say: *"Pair this with the official docs open in a tab — Copilot will sometimes invent endpoints. Verify against the source of truth. Demo: [api-endpoints.http](api-endpoints.http)."*

🔒 **Security Vulnerability Detection** — Ask Copilot to review code for OWASP-style issues. Say: *"Most useful as a second pair of eyes, not as a replacement for SAST/DAST tools. Combine with the security instructions in [.github/instructions/security-and-owasp.instructions.md](.github/instructions/security-and-owasp.instructions.md). Demo: [08-security-vulnerability-detection.py](08-security-vulnerability-detection.py)."*

⚡ **Performance Optimization** — Targeted suggestions for hot paths, allocations, query patterns, async usage. Say: *"Always ask for a specific number of options with trade-offs — never just 'make it faster', or Copilot will rewrite half the file. Demo: [09-performance-optimization.py](09-performance-optimization.py)."*

🖊️ **Code Formatting** — Reformat HTML, CSS, JSON, and source code to match a style guide. Say: *"Nice to have, but your formatter (Prettier, dotnet format, Black) should still be the source of truth. Demo: [11-code-formatting.html](11-code-formatting.html)."*

🧭 **Code Navigation** — Use Copilot Chat to answer questions like *"where does authentication happen?"* or *"what calls this method?"* Say: *"First day on an unfamiliar codebase: you lose half a week reading. With Copilot you lose half a day. Demo: [02-code-navigation.md](02-code-navigation.md)."*

🔄 **Workflow Generation** — Generate GitHub Actions / pipelines / scripts that automate repetitive steps. Say: *"CI is the backstop that catches what reviewers miss. Generating it with Copilot is one of the highest-leverage uses. Demo: [25-workflow-generation.md](25-workflow-generation.md)."*

☁️ **Infrastructure Generation** — Produce Terraform, Bicep, and ARM from a plain-language description. Say: *"Treat IaC like any other code — review the plan, run `what-if`, and never accept a template you can't explain. Demo: [26-infrastructure-generation.tf](26-infrastructure-generation.tf)."*

🛠️ **Self-Healing Capabilities** — In agent mode, Copilot reads error output, hypothesises a fix, applies it, re-runs. Say: *"Very powerful for known-shape problems (build errors, missing imports, failing tests). Stop it the moment it starts guessing in circles — that's the signal to step in."*

🗑️ **Reducing Chat History** — Trim or restart conversations when context gets noisy. Say: *"More context isn't always better context. If Copilot keeps quoting an early wrong assumption, start a new chat."*

🕵️ **Code Review Assistance** — Paste a diff or PR; ask Copilot for risks, missing tests, and edge cases *before* you open the PR. Say: *"Mindset flip — Copilot is often more useful as a **reviewer** than as a writer. Use it to critique your own code."*

💻 **Terminal Command Suggestions** — Copilot suggests shell, git, docker, dotnet, npm commands based on what you're doing. Say: *"Especially useful when you're context-switching between stacks. Always read the command before you press enter. Demo: [06-terminal-chat.md](06-terminal-chat.md)."*

### 📝 Copilot Edit

Propose changes across **multiple files** as one reviewable diff. Say: *"Think of Copilot Edits as a draft pull request that hasn't been created yet — you see every changed file in one place and accept or reject hunk by hunk. This is where you graduate from single-line autocomplete to coordinated, multi-file changes. Demo: [13-copilot-edit.md](13-copilot-edit.md)."*

### 🤖 Copilot Agent

Agent mode runs a loop: it reads files, edits them, runs commands, observes results, and iterates. Say: *"This is the mode where Copilot stops suggesting and starts **doing**. It's incredibly useful for the right task and incredibly dangerous for the wrong one. We'll spend a whole block on when to use it and — just as importantly — when not to. Demo: [17-copilot-agent.md](17-copilot-agent.md)."*

### 📃 Custom Instructions

Repo-wide behavioural rules in `.github/copilot-instructions.md` and language-specific rules under `.github/instructions/`. Say: *"This is how you bake your team's conventions into every prompt. Write the rules once, and every developer — and every prompt — inherits them. The two rules that pay back fastest are 'minimum diff, no scope creep' and 'match the patterns already in this file'. Demo: [15-custom-instructions.md](15-custom-instructions.md)."*

### 💢 Custom Agents

Define specialised agents (e.g., *test-writing agent*, *security-review agent*, *migration agent*) with their own scope, tools, and prompts. Say: *"Instead of one general-purpose assistant, you give Copilot a job description. Smaller scope = safer behaviour = better output. Demo: [18-custom-agents.md](18-custom-agents.md)."*

### 💬 Custom Prompts

Reusable prompt templates that anyone on the team can invoke with `/`. Say: *"Treat prompts like code — the good ones get shared, versioned, and reviewed. When the same five-line prompt keeps working, promote it to a saved prompt and stop retyping it. Demo: [16-custom-prompts.md](16-custom-prompts.md)."*

### 📃 Plan Mode

Copilot drafts a project plan — EPICs, user stories, acceptance criteria — *before* touching any code. Say: *"Plan first, execute second. This is the single highest-leverage habit when you start a new piece of work. It also gives the reviewer something concrete to push back on before the code exists. Demo: [24-plan-mode.md](24-plan-mode.md)."*

### 💪 Agent Skills

Skills are tested, reusable workflows an agent can call (think: 'recipe with guardrails'). Say: *"This is how a prompt that worked once becomes a pattern the whole team can use. Skills make agent behaviour predictable instead of magical. Demo: [19-agent-skills.md](19-agent-skills.md)."*

### ✨ GitHub Copilot SDK

Embed Copilot capabilities into your own apps (.NET, Python, Go, Node/TypeScript). Say: *"This is for when you stop **using** Copilot and start **building with** it — internal tools, custom assistants, automation. Same underlying capability, your product surface. Demo: [23-copilot-sdk.py](23-copilot-sdk.py)."*

### 🔗 Azure DevOps Integration

Use the Azure DevOps MCP to query work items, create branches, open PRs, and trigger pipelines directly from your IDE. Say: *"This is what closes the loop from **requirement → code → PR → pipeline → release** without ever leaving the editor. The traceability matters in regulated and industrial contexts — every change links back to a work item. Demo: [27-azure-devops-integration.md](27-azure-devops-integration.md)."*

### Extensions

🛠️ **Use extensions by typing @** — `@azure`, `@github`, `@docker`, `@terraform`, and many others. Say: *"Extensions give Copilot domain-specific knowledge and tools. Start with the ones that match your stack — for NKT that's Azure, GitHub, and the MCP servers in [enterprise-mcp-servers.md](enterprise-mcp-servers.md)."*

☁️ **Azure, Docker, GitHub, and many others!** Each extension comes with its own slash commands and context awareness.

💡 [**Explore all extensions**](https://github.com/marketplace?type=apps&copilot_app=true) — The marketplace is the source of truth; new extensions ship weekly.