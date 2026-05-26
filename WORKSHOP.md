# GitHub Copilot Workshop – 3 Hours (Online)

**Audience:** 15–20 developers + consultants (NKT)
**Format:** Online, demo-driven, coaching-oriented — live examples and presentation from Microsoft, with open group discussion
**Stack focus:** Legacy C#, .NET, Vue, renovation of existing software

---

## Purpose

Enable developers to *safely and effectively* use GitHub Copilot in real projects to
**reduce development effort without reducing maintainability or quality**.

**This is NOT:** a product presentation, AI hype, or a generic demo.
**This IS:** practical workflows demonstrated live by Microsoft, with open discussion and clear guardrails on *when to trust Copilot and when not to*. Participants follow along, question, and decide — guided by live examples throughout.

---

## Framing line to keep visible all session

> Copilot works best as a **junior developer + reviewer**, not as an autonomous engineer.

Say this *out loud* at least three times during the workshop:
- once in the opening,
- once when agents come up,
- once during wrap-up.

Repetition is the point. People will quote it back later.

---

## Voice from the field — a peer team's retrospective

A partner development team recently shared the findings from their retrospective after a project where they used Copilot end-to-end on one service. We'll cite their words throughout the day — they line up almost perfectly with the topics in this agenda, and "another dev team said it" lands harder than "Microsoft said it."

**Where it helped them**
- Frontend: *"speeds up and gives a good base of FE — no need to find all the divs."*
- Backend: refactoring and some new functions/forms — *but only when the existing section was already tested and reviewed.*
- Asking for advice and optimization.
- *"Finds mistakes that may take longer to find without Copilot."*

**Where it added little or no value**
- Questions that are too big add complexity instead of removing it.
- Non-deterministic — sometimes you need to prompt twice to get a usable answer.
- Time spent crafting the prompt can outweigh the saving.
- The backend output was *not* in a "production state" by the time they were done.

**What hurt them most (quality, maintainability, review)**
- Missing structure in both frontend and backend code.
- Unused code added in both layers.
- *All* code had to be re-reviewed; significant refactoring was needed.
- *"Not in a state where you can just go into maintenance."*
- Review and refactoring effort went **up**, not down, over time.

**What worked for them in practice**
- Review the code **before** committing. Always.
- Point to specific files; keep context as small as possible.
- Keep context in **one thread / one chat**.
- Use it for **smaller tasks** while learning how to phrase questions.
- Put repository / service **structure in place first** — especially on the backend.
- *"Never push pure AI code into main branches"* — zero trust until reviewed.
- Trying **different agents** for the same task can produce a better result.

> Anchor quote for the day: *"Never push pure AI code into main branches without reviewing it yourself."*

---

## Agenda at a glance

| # | Block | Time | Demo files in this repo |
|---|---|---|---|
| 0 | Welcome & Context | 10 min | — |
| 1 | How Copilot Actually Works (Trust & Limits) | 35 min | [README.md](README.md), [copilot-model-comparison.md](copilot-model-comparison.md) |
| 2 | High-Value Developer Workflows | 45 min | [01](01-code-explanation.py), [02](02-code-navigation.md), [03](03-code-refactoring.ts), [05](05-bug-fixing.py), [07](07-test-generation.py) |
| 3 | Prompting for Maintainable Code | 30 min | [15-custom-instructions.md](15-custom-instructions.md), [16-custom-prompts.md](16-custom-prompts.md) |
| 4 | Agents, Permissions & Automation | 30 min | [17-copilot-agent.md](17-copilot-agent.md), [18-custom-agents.md](18-custom-agents.md), [19-agent-skills.md](19-agent-skills.md), [20-mcp.md](20-mcp.md), [enterprise-mcp-servers.md](enterprise-mcp-servers.md) |
| 5 | Deep-Dive Demo on a Realistic Codebase | 45 min | [StockPriceChecker/](StockPriceChecker/) |
| 6 | Embedding Copilot in Daily Work | 15 min | [24-plan-mode.md](24-plan-mode.md), [25-workflow-generation.md](25-workflow-generation.md), [27-azure-devops-integration.md](27-azure-devops-integration.md) |
| 7 | Wrap-Up & Next Steps | 10 min | — |

Total: **3 hours**

> 📒 **Per-file cheat-sheets:** Every demo file referenced below has a tight 5-bullet playbook (Setup / Prompt / Point at / Gotcha / Bridge) in **[Appendix A — Demo Playbook](#appendix-a--demo-playbook-per-file-cheat-sheets)** at the bottom of this document. Keep that section open on a second screen during the workshop.

---

## 0. Welcome & Context — 10 min

**Goal:** Set expectations and ground the session in NKT's reality.

### What to say (opening script)

> "Welcome. Before we start — this is not a product demo. I'm not going to spend three hours telling you how amazing AI is. You already know it exists. You've probably already tried it and been disappointed at least once.
>
> What we're going to do instead is look at *your* reality — the renovation of legacy C# software, the Cologne onboarding, the code you already have to maintain — and figure out where Copilot actually helps, and just as importantly, where it gets in the way.
>
> By the end of today, you should leave with two things: a handful of concrete workflows you can use on Monday, and a clear sense of when to **not** trust Copilot. Both matter equally."

### Talking points (to riff on)

- **Why now?** The renovation project is a real forcing function. Legacy code + team ramp-up + deadline pressure is exactly the situation where an AI assistant either saves you a week or costs you a week. We want to make sure it's the first one.
- **What success looks like today:**
  - Less time spent writing the boring parts (DTOs, tests, boilerplate).
  - Better, faster *reviews* of unfamiliar code.
  - **Not** blind acceptance of generated code.
- **Honest framing about where Copilot is mature today:** the peer team we'll quote got real value on the frontend and lost time on the backend — they ended up with unused code, missing structure, and more review effort, not less. That's not a Copilot failure; it's a signal about **where the tool is mature and where you still have to drive.** This workshop is built around that asymmetry: green-light patterns where it pays off, and explicit guardrails for the places it bites.
- **How we'll work:** short input from me (5–10 min) → I show it live in my IDE → we discuss what you just saw. You don't need to have anything open — just watch carefully and challenge what I do. Interrupt freely. This is a coaching session, not a keynote.
- **Survey callout:** "Most of you said in the survey that your biggest concerns are *trust*, *prompting*, *agents*, and *maintainability*. The agenda is literally organized around those four."

✅ **Outcome:** Shared understanding that *Copilot is a tool, not a shortcut*.

---

## 1. How Copilot Actually Works — Trust & Limits — 35 min

**Goal:** Address trust issues upfront (clear signal from the survey).

### What to say (core narrative)

> "The single biggest reason Copilot 'lies' to you is simple: it doesn't see what you think it sees. It's not reading your whole repository, your database schema, your teammate's PR from last week, or the ticket in Azure DevOps — unless you *give* it those things. So when it confidently invents a method that doesn't exist, it's not being dishonest. It's doing pattern matching on the limited slice you showed it. Once you understand that, most of the 'magic' and most of the 'danger' becomes predictable."

### A 5-minute UI tour (do this first, before anything else)

> "Before we talk about *how* Copilot works, let's make sure we're all looking at the same screen. I'll click through every surface you'll see me use today, in the order I'll use them. If something on my screen looks different from yours, flag it now — not in Block 5."

Walk through, live, in this order:

1. **The Copilot sidebar / chat panel.** Where it docks, how to open it (`Ctrl+Alt+I` / `⌃⌘I`). Point out the **mode toggle** at the top: **Ask · Edit · Agent**. Say out loud: *"Three modes, three blast radii. We'll come back to this."*
2. **The model picker** (bottom of the chat input). Open the dropdown. Show that **Claude Sonnet 4.5**, **GPT-5**, **Claude Opus 4.7**, etc. are all selectable. Don't pick yet — flag that we'll talk billing in a minute.
3. **Context icons in the chat input.**
   - `#` → attach a file, folder, symbol, `#codebase`, `#selection`, problem, terminal output. *"This is how you stop Copilot guessing."*
   - `/` → slash commands: `/explain`, `/fix`, `/tests`, `/new`. *"Pre-baked prompts. Use them for the boring stuff."*
   - `@` → participants and extensions: `@terminal`, `@github`, `@azure`, plus any installed extensions. *"These change *who* answers the question. (Note: the old `@workspace` participant has been replaced by the `#codebase` context reference — see `#` above.)"*
    ### example: @terminal #terminal output This test failed. Explain the root cause and give me the next command to verify it.
4. **Inline chat / Copilot Edits.** Press `Ctrl+I` / `⌘I` in the editor — show the in-line prompt box. Then open **Copilot Edits** (multi-file diff view) and point at the per-hunk accept/reject buttons. *"This is a draft PR that hasn't been raised yet."*
5. **Inline completions (ghost text).** Type a comment in any file, pause, and let the ghost text appear. Tab to accept, Esc to dismiss, `Alt+]` / `Alt+[` to cycle alternatives. *"This is the only surface that writes code without you asking. Treat it accordingly."*
6. **Agent surface (preview).** Toggle to **Agent** mode. Don't run it yet — just point at the **"Allow / Allow once / Deny"** approval prompts that will appear when it wants to run a command or edit a file. *"Every dangerous action stops and asks. That's the safety net. We'll exercise it in Block 4."*
7. **The "Continue In" handoff menu.** Open the chat session menu (the `+ New Chat Session` dropdown at the top of the chat panel). Point at the **Continue In** group: **Local · Copilot CLI · Cloud**. Say out loud: *"Same conversation, three execution surfaces. You start a task here in the IDE, then hand it off without retyping the prompt."*
   - **Local (IDE)** → keeps the session in VS Code with you driving every step. Default for interactive work.
   - **Copilot CLI** → continues the same task in the terminal — useful for long-running shell-heavy work, scripts, or when you want to pipe results into other tools. Same agent config (`AGENTS.md`, custom agents) follows you.
   - **Cloud (coding agent)** → ships the task off to a sandboxed GitHub-hosted runner that works asynchronously on a branch and opens a PR. Right for "go fix this issue while I'm in a meeting" tasks; **not** right for anything you need to supervise step-by-step.
   - **What travels with the handoff:** the prompt, the conversation so far, and the repo context. **What doesn't:** your local unsaved buffers (commit or stash first), local-only files (`.env`, secrets), and any tools that only exist on your machine. *"Cloud handoff = code goes to GitHub's runner — same data-handling commitments as the rest of Copilot Business/Enterprise, but **not** your laptop anymore. Don't hand off sensitive uncommitted work."*
   - **Cost note:** Cloud and Agent handoffs typically trigger **multiple model calls per task** and burn AI credits faster than a single chat turn. Pick the surface that matches the job, not the one that looks coolest.
8. **The status bar Copilot icon.** Click it. Show **enable/disable per language**, **proxy settings**, and the link to your **quota / usage page**. *"If Copilot ever goes quiet, this is the first place to check."*

> 🎯 **One-liner to land here:** *"Three modes (Ask / Edit / Agent), three context prefixes (`#` / `/` / `@`), one approval gate. That's the whole UI. Everything else is preference."*

### Topics with detail

**What Copilot sees vs. what it doesn't**
- **Sees by default:** the active file, open tabs, selected text, and — in Agent mode — files it explicitly reads.
- **Doesn't see:** anything you didn't open or attach, private runtime behavior, your org's internal conventions, your database state.
- **Concrete example to walk through:** "Open a C# file that calls a helper defined in another file that isn't open. Ask Copilot to refactor it. Watch it invent a plausible-looking signature for the helper. Now open the helper file and ask again. Completely different answer."
- **Tie back to survey:** "This is *exactly* why it 'looks right but is wrong' — people are asking hard questions with half the context attached."

**The context window — what actually fits, and why your chat gets dumber over time**
- **What "context window" means in one sentence:** it's the total amount of text (your prompt + attached files + the chat history so far + Copilot's own answer) that the model can hold in its head for a single response. Measured in **tokens** (~4 chars ≈ 1 token in English; code is denser).
- **Rough sizes today (orders of magnitude, not exact):** standard chat models ~128K tokens; large-context models (Claude Opus 4.7 1M, GPT-5 long-context) up to ~1M. *"A million tokens sounds infinite. It isn't — a mid-size C# repo blows past it."*
- **What auto-attaches (and silently eats your budget):** the active file, selected text, recently opened tabs, and — in Agent mode — anything Copilot reads during its loop. Plus every previous turn of the chat. *"The chat panel looks empty. The context window isn't."*
- **Why long chats degrade:** as history grows, older turns get truncated or summarised. The model starts "forgetting" your earlier constraints. Symptoms: it re-introduces patterns you told it to avoid, re-suggests code you already rejected, drifts in style.
- **Concrete demo (30 sec):** open a long-running chat from earlier today, scroll up, then ask: *"What were the first three rules I gave you in this thread?"* Watch it miss one. *"This is why the peer team said 'keep context in one thread' — but also why you sometimes have to start a fresh one."*
- **Rules of thumb to give the room:**
  1. **Attach explicitly with `#`.** Don't rely on "open tabs" — it's invisible and unpredictable.
  2. **Smaller is better.** Attach the *one* file or symbol you mean, not the whole folder.
  3. **New task → new chat.** When the subject changes, open a fresh thread. Old context isn't free.
  4. **Long chat going off the rails? Summarise and restart.** Ask Copilot: *"Summarise the decisions we've made in this thread as bullet points."* Copy that into a new chat. Continue.
  5. **Big-context models for big-context tasks only.** Don't waste an Opus 1M request on a 20-line refactor — see billing, next.

**Chat vs inline vs Agent (the three modes that matter)**
- **Inline (Tab-complete):** fast, low-stakes, great for finishing a line or a small block. You're always in control — you approve character by character.
- **Chat:** a conversation. Great for "explain this", "suggest options", "what would break if I…". You review before anything lands in the file.
- **Agent:** Copilot runs a loop — reads files, edits them, runs tools, iterates. Much more powerful, much higher blast radius. "This is the mode that feels scary and *should* feel scary the first few times. That's a healthy reaction, not a bug."

**Common failure modes (name them so people feel seen)**
- **Over-engineering:** adds three layers of abstraction for a 5-line change. Mitigation: say "minimum change, no new abstractions" in your prompt.
- **Hallucinated APIs:** invents methods, NuGet packages, or config keys that don't exist. Mitigation: always verify against real docs or run it.
- **Hidden complexity:** silently rewrites working code "while it's in there". Mitigation: ask for diffs, review them line by line, reject scope creep.
- **Confident tone for uncertain answers:** it sounds equally sure when it's right and when it's wrong. "Tone is not a signal. Code that compiles and tests that pass are signals."

**Billing & where it runs — what procurement and security will ask about on Monday**

> "Two questions come up the moment Copilot leaves the demo and hits a real team: *what does it cost per developer per month?* and *where does our code go when we hit Enter?* Let's answer both before the procurement email arrives."

*Usage-based billing — AI credits, not "premium requests"*
- **The new model:** every paid Copilot plan (Business, Enterprise, Pro, Pro+) includes **unlimited inline code completions** plus a **pool of AI credits (token-based)** shared across chat, edits, and agent mode. The old "premium requests per month" framing is gone — **all usage now draws from a credit pool**, priced on the **underlying model cost (pass-through to provider token pricing)**.
- **Lightweight vs frontier models (the new "standard vs premium"):**
  - **Lightweight / standard models** (default chat models, Haiku/Sonnet/GPT mini class): consume **fewer credits per request** — fine for day-to-day chat, edits, and simple assistance.
  - **Frontier / heavy models** (Claude Opus, GPT long-context, Gemini Pro, multi-agent flows): consume **significantly more credits**, and the exact burn varies by model provider pricing and token volume.
  - 👉 **Key shift:** there's **no fixed "1× vs 10× multiplier" anymore** — consumption depends on **actual tokens used × model cost**.
- **Included entitlement:** seat price stays the same (e.g. $19 / $39 tiers); what changes is the **included credit entitlement**, and the exact number is **subject to change**. *"Don't memorise numbers — point people at the latest GitHub billing page."*
- **What happens when you run out:**
  - Usage **does not silently continue.** It draws down remaining credits, then moves to **paid overage (if enabled)** or stops based on configured limits.
  - Admins can allow **pay-as-you-go overage** or enforce **hard caps (recommended initially)** to avoid surprise invoices. **Default for most enterprises should be hard-cap until you have usage data.**
- **How to check usage:** dashboards (rolling out) show consumption trends, model usage, and cost projections — treat them as **directional estimates, not exact billing**. Status-bar Copilot icon → *"Manage Copilot"* → opens the github.com usage page. Show this live.
- **Cost guardrails to give the room:**
  1. **Default to efficient models.** Use lightweight models for most work; only escalate when needed.
  2. **Treat credits as a budget, not requests.** Every call draws from a **shared credit pool** — expensive models and long context burn faster.
  3. **Be careful with agents.** Agent workflows trigger multiple model calls and can consume significantly more credits per task.
  4. **Optimise usage patterns.** Avoid repeated prompts and trial-and-error loops; watch heavy users and model selection trends.
  5. **Admin controls are critical.** Set user-level limits and org-level budgets to prevent a few users draining the shared pool.
- **The message to land:** this is a shift from ❌ *"fixed requests / abstract PRUs"* to ✅ *"pay for actual AI consumption (industry standard)"* — aligned with OpenAI / Anthropic pricing, with better transparency into cost drivers and more flexibility across models.

*Local vs cloud — where the inference actually happens*
- **Default reality today:** **all GitHub Copilot inference runs in the cloud** — on Microsoft / GitHub / model-provider infrastructure (Azure OpenAI, Anthropic, Google). Your prompt + attached context leaves your machine over TLS, gets a response, comes back.
- **What gets sent:** the prompt, attached files (`#`), selected text, recent chat turns, and — in Agent mode — anything the agent reads. **Not** your whole repo, **not** files you didn't attach.
- **What does *not* happen on Business/Enterprise plans:** prompts and suggestions are **not used to train the public foundation models**. There's a separate contractual data-handling commitment — point people at GitHub's Trust Center, don't paraphrase it on stage.
- **Data residency:** GitHub Copilot Enterprise offers **EU data residency** for prompt/response handling — relevant for NKT. Confirm the current state in your tenant settings; don't promise it on stage if you haven't verified.


- **Decision guide to give the room:**
  - *"Normal day-to-day work on non-secret code?"* → Cloud Copilot, standard model. Done.
  - *"Sensitive snippet you'd rather not send anywhere?"* → Don't paste it. Either rewrite it generically first, or use a local model via AI Toolkit for that one task.
  - *"Need a frontier model for a hard problem?"* → Cloud Copilot, premium model, mind the quota.
  - *"Air-gapped environment?"* → Copilot isn't the right tool today. Local-only stack.

> 🎯 **One-liner to land here:** *"All usage draws from a shared AI-credit pool — lightweight models burn slowly, frontier models burn fast, agents burn fastest; everything runs in the cloud unless you deliberately chose otherwise. Procurement will ask all three — now you can answer."*

### Demo moment (5 min)

Open [README.md](README.md) and walk through the **3S principles** (Simple, Specific, Short) and the best-practices list. Then flip to [copilot-model-comparison.md](copilot-model-comparison.md) to show that *which model you pick also changes trust* — some are faster and shallower, some are slower and more thorough. **Tie it back to billing:** point at which models in the table are lightweight vs frontier, and say out loud *"this is also a cost decision — frontier models burn far more AI credits per call, not just a capability one."*

### One-liner to land

> "Skepticism isn't anti-AI. Skepticism is how you use AI *professionally*."

✅ **Outcome:** Participants know **why skepticism is healthy** and how to apply it.

---

## 2. High-Value Developer Workflows — 45 min

**Goal:** Focus on where Copilot already delivers value for NKT teams.

### What to say (framing)

> "We're going to stop talking about Copilot in the abstract and look at the five workflows where teams consistently get real value — and crucially, where the risk is low enough that you can start using them this week. I'll show each one live. You won't code along — your job is to watch what I do, push back when something looks wrong, and take notes on the prompts you want to try later."

> 💬 **From a peer team:** *"Mostly on the frontend — speeds up and gives a good base, no need to find all the divs. On the backend, it speeds up refactoring and some new functions, **but only if the section is already tested and reviewed.**"* That qualifier is the whole game. Trust scales with the quality of what's already there.

### Live walkthroughs (stack-aligned)

| Workflow | Demo file | What to show | What to say while showing it |
|---|---|---|---|
| Understand & refactor legacy code | [01-code-explanation.py](01-code-explanation.py), [03-code-refactoring.ts](03-code-refactoring.ts) | "Explain this code → suggest safer refactor → review together" | *"This is the #1 use case for the renovation project. You're going to inherit code written by people who aren't in this call. Copilot is a free junior engineer who has already read it. Ask it to explain first, propose second, refactor last — in that order."* |
| Boilerplate-heavy work | [04-code-generation.md](04-code-generation.md), [26-infrastructure-generation.tf](26-infrastructure-generation.tf) | APIs, DTOs, Vue components, IaC | *"Nobody got into this job to write the 47th DTO. This is where Copilot pays for itself on day one. The key: give it one example of your team's style, and it will match the rest."* |
| Testing & code review | [07-test-generation.py](07-test-generation.py), [08-security-vulnerability-detection.py](08-security-vulnerability-detection.py) | Generate tests; ask Copilot to **critique** code instead of writing it | *"Here's the mindset flip most people miss: Copilot is often more useful as a reviewer than as a writer. Paste your own code and ask 'what's wrong with this?' — you'll be surprised."* |
| Debugging | [05-bug-fixing.py](05-bug-fixing.py), [06-terminal-chat.md](06-terminal-chat.md) | Feed stack traces; ask for **hypotheses, not fixes** | *"Don't say 'fix this bug'. Say 'give me three possible causes, ranked by likelihood, with what I'd check for each'. You stay the engineer. It's the rubber duck that can actually read."* |
| Code navigation | [02-code-navigation.md](02-code-navigation.md) | Orient fast in unfamiliar areas with `#codebase` | *"First day on a new codebase, you normally lose half a week reading. With Copilot, you lose half a day. The file shows the pattern: `#codebase Where is the method that calculates the price of an item?` Same shape for: 'Where does authentication happen?', 'Which files handle payment?', 'What calls this method?'"* |

### Transitions to use between demos

- "Okay, that was the easy one. Now let's do one where it's easy to go wrong…"
- "Notice I didn't accept the first answer. Watch what I do instead."
- "This is where most people stop. But the *second* prompt is where the value is."

### Anti-patterns to call out on stage

- Accepting inline suggestions without reading them → "Tab-tab-tab coding is how bugs ship."
- Using Chat as Google → fine, but you lose the context advantage; ask it about *your* code, not about C# in general.
- Generating tests that only cover the happy path → always prompt for "edge cases, null inputs, and error conditions."

✅ **Outcome:** Clear, repeatable workflows teams can apply immediately.

---

## 3. Prompting That Produces Maintainable Code — 30 min

**Goal:** Directly address the #1 pain point: complexity and maintainability.

### What to say (the setup)

> "Prompting is not magic words. Prompting is requirements engineering, compressed into two sentences. If you wouldn't accept a vague ticket from a product manager, don't send a vague prompt to Copilot. Same garbage in, same garbage out — just faster."

> 💬 **From a peer team — what actually worked for them:** *"Point to specific files. Keep context as small as possible. Keep context in one thread."* Three rules, no theory. We'll demo all three live in this block.

### Prompt patterns that reduce risk (with concrete examples)

- **"Suggest options" vs "implement":**
  - ❌ *"Refactor this to use a repository pattern."* → you get one opinionated answer and lose the chance to push back.
  - ✅ *"Give me three approaches to decouple this from the database, with trade-offs for each. Don't write code yet."* → you get a design conversation, not a fait accompli.
- **"Assume this is production code":**
  - *"Treat this as production code for a cable manufacturer. No TODOs, no placeholders, explicit error handling, and no new dependencies without calling them out."*
  - This single sentence kills 80% of the "toy example" tone Copilot falls into.
- **"Minimum diff — no scope creep" (the anti-rot prompt):**
  - *"Make only the change I asked for. Do not refactor unrelated code, do not add helpers I didn't request, do not introduce new abstractions, imports, or files. If you think something else should change, list it separately at the end and wait for me to approve."*
  - This is the single most important pattern for **maintainability over time.** It's the direct counter to the peer team's finding of *"unused code added in both layers"* and *"missing structure."*
- **"Match what's already here" (the anti-drift prompt):**
  - *"Follow the patterns already used in this file and the files I've attached. Do not introduce a new style, naming convention, or framework idiom. If the existing code is inconsistent, copy the most recent pattern."*
  - Stops Copilot from pulling the codebase in five different stylistic directions over time.
- **"Optimize for readability, not cleverness":**
  - *"Prefer explicit over clever. If a senior dev joining next month would need a comment to understand it, write the simpler version instead."*
- **Review-first prompting:**
  - *"Before changing anything, tell me what this code does, what you'd change, and why. I'll approve the plan before you touch the file."*
- **Behavioral constraints (custom rules):**
  - Put the rules in [.github/copilot-instructions.md](.github/copilot-instructions.md) *once*. Every teammate benefits. Every prompt inherits them. **Bake the "minimum diff" and "match what's here" rules in there — don't rely on every developer remembering to type them.**
- **When to stop Copilot and code manually:**
  - Business logic you haven't fully specified yet.
  - Anything touching money, safety, or customer data where you can't easily test.
  - Any moment you notice yourself typing "just make it work" — that's the signal to close the chat and think.
  - **When you've prompted twice and still don't have what you want.** The peer team flagged this: a third prompt usually costs more than just writing it. Set yourself a two-prompt budget.

### Mini-exercises (live, no heavy hands-on)

> 🗂️ **Files to have open before this section:**
> - [09-performance-optimization.py](09-performance-optimization.py) — for Exercises A & B
> - [05-bug-fixing.py](05-bug-fixing.py) — for Exercise C

**Exercise A — Bad prompt → risky output**
> **Open:** [09-performance-optimization.py](09-performance-optimization.py) · Chat panel · new chat
> **Prompt to show on screen:** *"Make this faster."*
> Expected result: Copilot rewrites the loop, possibly introduces a closed-form formula or numpy. Discuss: *"What did it assume? What did it break? How would we notice in review?"*

**Exercise B — Improved prompt → safer output**
> **Open:** [09-performance-optimization.py](09-performance-optimization.py) · same file, new chat
> **Prompt:** *"This method is called ~100 times per request and shows up in our profiler. Suggest up to three targeted optimizations. Do not change the public signature, do not add dependencies, and explain the trade-offs. I'll pick one before you write code."*
> Discuss: *"Same goal. Completely different conversation. Which one would you want a junior dev to send?"*

**Exercise C — Catching scope creep live (the anti-rot drill)**
> **Open:** [05-bug-fixing.py](05-bug-fixing.py) · Inline Chat (`Cmd+I` / `Ctrl+I`) on `buggy_function`
> **Loose prompt:** *"Improve this method."*
> Expected result: Copilot adds type checks, renames things, maybe adds an overload or docstring. **All of it works. None of it was asked for.**
> **Then:** new chat, same file → *"Add a type check so this raises TypeError when either argument is not a number. Minimum diff — no scope creep, no other changes."*
> Show the two diffs side by side.
> Discuss: *"In a six-month codebase, which of these compounds into the 'unused code / missing structure' problem? Which one can the next developer maintain?"*

### Demo assets

- [15-custom-instructions.md](15-custom-instructions.md) — repo-wide behavioral constraints.
- [16-custom-prompts.md](16-custom-prompts.md) — reusable prompt templates.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — live example in *this* repo.
- [.github/instructions/security-and-owasp.instructions.md](.github/instructions/security-and-owasp.instructions.md) — security guardrails as code. Show that OWASP rules are auto-applied to every prompt touching `*`.

### One-liner to land

> "A good prompt is a short design review, not a wish."

✅ **Outcome:** Better prompts, fewer surprises.

---

## 4. Agents, Permissions & Automation — When (Not) to Use Them — 30 min

**Goal:** Demystify agents and calm the concern around autonomy.

### What to say (the honest framing)

> "Agents are the part that makes people most nervous, and honestly — they should. This is the mode where Copilot stops suggesting and starts *doing*. It reads files you didn't point at, edits them, runs commands, iterates. That's incredibly useful for the right task. It's incredibly dangerous for the wrong one. Today we're going to draw the line."

> 💬 **From a peer team:** *"Prompting with different agents can give you a better result."* Worth knowing — but the same team also said their backend wasn't in a "production state" by the end. Different agents help; they don't replace the review gate.

### Topics with detail

**What Copilot agents can and cannot do today**
- **Can:** read and edit multiple files, run terminal commands (with approval), run tests, call MCP tools, iterate until a goal is met.
- **Cannot:** deploy to production on its own (without an MCP / tool that allows it), understand business intent that isn't written down, know when to stop.

**Why agents feel powerful AND dangerous**
- The loop is the feature *and* the risk. One bad assumption early in the loop compounds across 20 edits.
- "It's the difference between asking an intern to draft a method and handing the intern your laptop and leaving for lunch."

**Safe use cases (green-light list)**
- Documentation generation and updates.
- Repetitive refactors that have a clear shape (rename, extract, migrate one pattern to another).
- Review assistance — "read these 6 files and tell me what's inconsistent".
- Scaffolding a new module from an existing one.

**Unsafe use cases (red-light list, for now)**
- Large architectural changes — ownership, module boundaries, data flow.
- Business-critical logic where the spec lives in someone's head.
- Any change where "I'll review it later" is the plan. Agents produce a *lot* of code fast. "Later" never comes.

**Permissions, identity, audit — high level**
- Agents act with *your* credentials. Anything they do looks like you did it in the git log. Treat that seriously.
- MCP tools extend what an agent can reach. Enterprise MCP servers (see [enterprise-mcp-servers.md](enterprise-mcp-servers.md)) are how you say *"yes to these systems, no to everything else."*
- Audit trails: rely on PRs, not on trust. Agent output goes through the same review gate as human output. No exceptions, even when it's tempting.

### Demo assets

- [17-copilot-agent.md](17-copilot-agent.md) — agent mode fundamentals. Walk through *one* loop live and narrate what it's doing.
- [18-custom-agents.md](18-custom-agents.md) — scoping agents to a specific task (e.g., "test-writing agent only").
- [19-agent-skills.md](19-agent-skills.md) — skills as tested, reusable workflows. "This is how you turn a prompt that worked once into a pattern the whole team can use."
- [20-mcp.md](20-mcp.md), [enterprise-mcp-servers.md](enterprise-mcp-servers.md) — tool access and enterprise boundaries.

### One-liner to land

> "An agent is a loop with your credentials. Scope it, review it, log it."

✅ **Outcome:** Clear boundaries → safer experimentation.

---

## 5. Deep-Dive Demo on a Realistic Codebase — 45 min

**Goal:** Make it real — by running everything we've discussed against a representative codebase, live.

### What to say (the switch)

> "So far we've looked at each workflow in isolation. For the next 45 minutes I'm going to chain them together on a realistic codebase — generate, explain, refactor, test, review — in the order you'd actually do it on a Monday morning. Your job is to challenge me. Ask 'why that prompt?', 'why did you accept that?', 'why didn't you just write it yourself?' That's where the learning is."

### Setup (do this before the block starts)

- Open the solution [github-copilot-dotnet-demo.sln](github-copilot-dotnet-demo.sln) in VS Code.
- Have the [StockPriceChecker/](StockPriceChecker/) folder visible in the Explorer.
- **Check:** does `StockPriceChecker/Program.cs` exist?
  - **If yes** (Block 2 already generated it): skip Part 1, start at Part 2.
  - **If no**: Part 1 generates it live. This is the recommended path — it makes the demo feel real.
- Chat panel open, **Agent mode**, model = Claude Sonnet. New chat.

### The demo — one continuous story (45 min)

This is a **single, narrated session**. Don't break the flow to explain features — point at decisions as they happen.

---

**Part 1 — Generate the starting point (8 min)** · *Agent mode*

> Frame it: *"Imagine a ticket landed in your queue: 'we need a quick CLI that prints the current MSFT price.' Let's see what Copilot does with zero context."*

- **Prompt:**
  > *"Create a C# console app in the `Program.cs` file under the `StockPriceChecker` folder. Fetch and show the MSFT stock price from the Yahoo Finance API. Add comments to the code."*
- **What to point at while it runs:**
  - It creates the file (didn't exist before) — that's the agent doing file I/O.
  - The User-Agent header on `HttpClient` (Yahoo blocks default UA). *"Did it know that, or did it learn from a failed run?"*
  - Exception handling for `HttpRequestException`, `JsonException`. *"Would a junior dev have remembered all three?"*
- **Decision to model out loud:** accept the file, but **read it line-by-line** before accepting. *"This is the bar. Not 'does it compile' — 'do I understand every line?'"*

---

**Part 2 — Understand the code you just accepted (10 min)** · *Ask mode*

> Frame it: *"Pretend you didn't see Part 1. A colleague handed you this file. You have 10 minutes before standup."*

- Open `StockPriceChecker/Program.cs`. Switch to **Ask mode**.
- **Prompt 1:** *"#codebase Explain the architecture of this project in 5 bullets."*
- **Prompt 2:** *"Walk me through `Program.cs` line by line. What does each block do, and what could fail at runtime?"*
- **What to point at:**
  - Read the explanation **aloud** with the file open. Don't skim.
  - Find **one thing Copilot got subtly wrong or oversimplified** (e.g., it claims the JSON path is guaranteed; it isn't). Call it out.
- **Group question:** *"What did it get right? What did it smooth over?"*

---

**Part 3 — Refactor without scope creep (12 min)** · *Edit mode or Inline Chat*

> Frame it: *"The whole thing is in `Main`. That's fine for a demo, painful for a real codebase. Let's clean it up — without letting Copilot redesign the world."*

- In `Program.cs`, select the contents of `Main`. Open **Inline Chat** (`Cmd+I` / `Ctrl+I`).
- **Prompt:** *"Refactor this for readability by extracting the HTTP call and the JSON parsing into separate private methods. Keep the public behavior identical. No new classes. No new NuGet packages. Minimum diff."*
- **What to point at:**
  - Accept the diff hunk-by-hunk, **out loud**.
  - Reject anything you didn't ask for: a new `record`, a renamed variable, a new exception type, a `// TODO` it invented. *"All of it works. None of it was asked for. This is the rot."*
- **Group question:** *"Is this actually simpler, or just differently complicated? Would you merge it?"*

---

**Part 4 — Generate tests (8 min)** · *Agent mode*

> Frame it: *"There are no tests. There should be. Watch how fast this part is — and where the danger is."*

- **Prompt:** *"Generate xUnit tests for the methods in `StockPriceChecker/Program.cs`. Include edge cases (empty response, malformed JSON, network error) and happy path. Add a new test project if needed."*
- **What to point at:**
  - It may scaffold a whole new `.csproj`. *"Do we want that? Yes — but in a real repo, check `.sln` and folder conventions first."*
  - The mocking strategy it picks for `HttpClient`. *"Is this how the rest of our codebase mocks HTTP? If not, that's drift."*
- **Decision to model:** accept the tests, but **only** after asking the next prompt.

---

**Part 5 — Self-audit (the anti-rot drill, 7 min)** · *Ask mode*

> Frame it: *"This is the prompt the peer team wishes they'd used from day one."*

- **Prompt:** *"Review the changes you produced in this session. List anything you added that I didn't explicitly ask for — new files, new dependencies, renamed symbols, helper methods, comments, TODOs. Be ruthless."*
- **What to point at:**
  - Copilot is **surprisingly honest** about its own scope creep when asked directly.
  - For each item it confesses to, ask the group: *accept, revert, or defer?*
- **Group question:** *"If we hadn't asked this, how much of that cruft would have ended up in `main`?"*

### Facilitator questions to put to the group after each change

- *"What did Copilot **assume** that it shouldn't have?"*
- *"Would you merge this in a PR today? Why / why not?"*
- *"Is this more or less maintainable than what we had?"*
- *"If this broke at 2am, would the person on call be able to debug it?"*
- *"Did Copilot add anything we didn't ask for? An unused helper, a new import, a renamed variable? In six months, that's the rot the peer team warned us about."*
- *"If we accepted this, does the file still match the patterns in the rest of the project — or did Copilot just introduce a new style we now have to maintain?"*

### If things go sideways (they will — and that's the best teaching moment)

- Copilot invents an API → *"This is exactly the failure mode from Block 1. What context was missing?"*
- Copilot refactors too aggressively → *"Which prompt pattern from Block 3 would have prevented this?"*
- A demo goes off the rails → narrate it honestly. The audience learns more from a recovered mistake than from a polished demo.

✅ **Outcome:** The group has seen a full Copilot-assisted workflow end-to-end on realistic code and has critiqued every decision along the way.

---

## 6. Embedding Copilot in Daily Work — 15 min

**Goal:** Connect workshop → real adoption.

### What to say (the pivot)

> "Most training dies on the flight home. The goal of the next 15 minutes is to make sure *this one* doesn't. We'll look at four things that separate teams who actually adopt Copilot from teams who stop using it after a month."

> 💬 **From a peer team — the hardest-won lesson:** *"Have a structure in place in the beginning — repository, services — especially on the backend. Never push pure AI code into main branches. Zero trust in just adding the code; it still needs to be reviewed and confirmed before committing."* If you take **one** thing home from today, take that.

#### Extended talking points (pick the 3–4 that fit your audience)

**Why adoption stalls — name it before they feel it**
> "There are three failure modes I see over and over. **One:** people try it for a week, hit two bad answers, and quietly stop. **Two:** people use it enthusiastically for a month, ship a pile of subtly-wrong code, get burned in a review, and swing to never using it again. **Three** — and this is the dangerous one — people keep using it but stop reading the diffs. That's how 'Copilot debt' enters your codebase. Today's job is to design *against* all three."

**Make it part of the workflow, not a side trip**
> "Copilot doesn't stick when it's a separate activity — 'let me go ask Copilot.' It sticks when it's *inside* the things you already do: writing the commit message, drafting the PR description, explaining a failing test, writing the first draft of a doc. Pick three moments in your week where you'll *always* reach for it. Inline-complete while coding. `/explain` before reviewing a PR. Chat to draft your standup notes. Three reflexes — that's the bar."

**The "two-prompt budget" — the single best anti-frustration habit**
> "If you haven't gotten something useful out of Copilot in two prompts, stop. Write it yourself, or step back and rewrite the question from scratch with proper context — the right `#file`, the right selection, the right model. The third prompt is almost always you arguing with the model instead of fixing the input. That's the moment people decide 'Copilot is dumb' — when really, the prompt was."

**Context is a workflow, not a setting**
> "The single biggest difference between teams who love Copilot and teams who hate it is whether they attach context. `#file`, `#selection`, `#codebase`, `#problems`, `.github/copilot-instructions.md`. None of this is optional. Make it a team habit: *no context, no complaint*. If someone says 'Copilot gave me garbage,' the first question is 'what did you attach?'"

**Normalize saying no to Copilot — out loud, in front of juniors**
> "The most important thing a senior engineer can model is **rejecting** a Copilot suggestion. Out loud. In a pairing session. *'No, that's wrong because…'*, *'No, that's more than I asked for,'*, *'No, that helper already exists — look.'* Juniors learn what 'good' looks like by watching seniors push back. If your seniors accept everything, your juniors will too — and that's how the codebase rots."

**Treat it as a junior teammate, not an oracle**
> "Mental model that works: Copilot is a fast, eager, slightly overconfident junior who's read every open-source repo but has been on your team for zero days. You wouldn't merge a junior's PR without reading it. You wouldn't let a junior touch prod auth code unsupervised. Same rules. The output quality is *senior-ish*; the judgment behind it is *intern-level*. You supply the judgment."

**Where to start on Monday — concrete, small, reversible**
> "Don't try to 'roll out Copilot' as a program. Pick **one repo**, **one workflow**, **one week**. Examples: 'this sprint, every PR gets a Copilot review pass before a human review.' Or: 'this week, every new test file starts from a Copilot draft.' Measure it — even informally — and decide at the retro whether to keep it. That's how adoption compounds: small wins that survive a sprint, not big initiatives that survive a slide deck."

**Tell people it's OK to *not* use it**
> "Permission matters. If the team culture is 'real engineers use Copilot for everything,' you'll get people pretending. There are tasks where Copilot is slower than just typing — short scripts, tiny fixes, anything where you already know the answer. Saying 'I didn't use Copilot for this, it was faster without' should be a totally normal sentence in a PR."

**The review bar goes *up*, not down**
> "Counter-intuitive but critical: when Copilot writes more of the code, the *human* reviewer's job gets harder, not easier. You can no longer assume the author understood every line — because there's a real chance they didn't. So reviewers should ask more 'why' questions, not fewer. If 'why did you write it this way?' gets answered with 'Copilot suggested it,' that's a failed review on both sides."

### Topics with detail

**Team-level guardrails**
- Commit `.github/copilot-instructions.md` to the renovation repo *this week*. Even a 10-line version is better than nothing. **Include the "minimum diff / no scope creep" and "match what's here" rules from Block 3 — those two lines alone counter most of the maintainability decay the peer team reported.**
- Add language-specific instructions under `.github/instructions/` (see the C# and Python examples in this repo).
- Agree on a **structure first** rule for the backend: folder layout, layering (controller / service / repo), naming, where new tests go. The peer team learned this the hard way — *"have a structure in place in the beginning, especially on the backend."* Copilot will happily fill any vacuum you leave.
- Treat prompts like code: the good ones get shared, versioned, and reviewed. [16-custom-prompts.md](16-custom-prompts.md) shows how.

**Anti-rot habits (direct counters to the peer team's findings)**
- **Two-prompt budget:** if you haven't gotten what you want in two prompts, stop and write it yourself. Time spent on the third prompt almost never pays back.
- **Diff discipline:** review every Copilot diff for *unrequested* changes — new helpers, renamed variables, new imports. Reject scope creep even when the code is fine. *Especially* when the code is fine.
- **Dead-code sweep:** before committing, ask Copilot in a fresh chat: *"In this diff, list anything that isn't actually used by the change I asked for."* It's surprisingly good at finding the cruft it just added.
- **Structural drift check:** once a sprint, ask Copilot to compare two similar files (e.g., two services) and report inconsistencies. Catches the slow drift before it becomes a refactor.

**PR review practices with Copilot**
- New rule of thumb: *"If Copilot wrote it, a human reviews it with extra attention — not less."*
- Ask Copilot to **review** the PR before you open it. Paste the diff, ask for risks, edge cases, missing tests. Fix those privately.
- Don't let "Copilot wrote it" become an excuse in PR discussions. It either meets the bar or it doesn't.

**Measuring success (time AND quality, never just one)**
- Track both. Time saved is easy; quality is the one you have to protect.
- Leading indicators: PR review churn, time-to-first-review, defect escape rate, test coverage trend.
- Lagging indicators: on-call incidents, rework tickets, onboarding time for new joiners (that's the Cologne metric).

**How to gradually increase trust**
- Week 1: inline + chat only. No agents.
- Week 2–3: chat for review and test generation.
- Week 4+: agents for *documented, reversible* tasks only.
- Revisit at 3 months. Expand the green-light list based on evidence, not excitement.

### Demo assets

- [27-azure-devops-integration.md](27-azure-devops-integration.md) — traceability from requirement to PR. Crucial for a regulated/industrial context.
- [24-plan-mode.md](24-plan-mode.md) — plan before letting Copilot act. "This is the single highest-leverage habit. Plan first, execute second."
- [25-workflow-generation.md](25-workflow-generation.md) — CI guardrails. The CI pipeline is the backstop for anything the reviewer misses.

### Hand out the cheatsheet

> 📄 **Drop [PARTICIPANT-HANDOUT.md](PARTICIPANT-HANDOUT.md) in the chat now.** It's the one-page Monday-morning version of everything in this block — the one rule, the three reflexes, the two-prompt budget, the diff-discipline checklist, and a fillable "my experiment" block. Tell them: *"This is what you keep open next week. Everything else in the repo is reference; this is the wallet card."*

✅ **Outcome:** Teams leave knowing **what to try next week** — and with a single link they'll actually re-open.

---

## 7. Wrap-Up & Next Steps — 10 min

### What to say (the close)

> "Three things before we wrap. First: what actually worked for you today? I want real answers, not polite ones. Second: what do you still not trust? That's the list I take back to shape the next session. Third: every team here commits to *one* experiment before we meet again — one repo, one workflow, one week. Not a program. An experiment."

> 📄 **Re-share [PARTICIPANT-HANDOUT.md](PARTICIPANT-HANDOUT.md)** as you start the round-robin. Ask each team to fill in the *Repo / Workflow / Date* block at the bottom while they wait their turn — that's the "experiment" you're asking them to commit to.

### Structure the 10 minutes

- **3 min — What worked / what didn't.** Round-robin, one sentence each.
- **3 min — What needs follow-up.** Capture in chat, assign an owner.
- **2 min — Support models.** Continued coaching, partner / ISD options. Make the path to asking for help obvious.
- **2 min — Commit to one experiment per team.** Name, repo, date. Written down publicly.

### Closing line

> "Copilot won't replace your judgment. But it will absolutely expose whether you had any. Use it accordingly — and I'll see you at the follow-up."

✅ **Outcome:** Workshop doesn't die after the call.

---

## Facilitator checklist (before the session)

- [ ] Confirm the Block 5 demo is ready with [StockPriceChecker/](StockPriceChecker/).
- [ ] Verify **your own** Copilot setup is working — participants won't be coding, so only the facilitator's environment matters.
- [ ] Pre-load 2–3 "bad prompt → better prompt" examples relevant to the audience's stack.
- [ ] Prepare 1 legacy C# snippet + 1 Vue snippet for the refactor demo.
- [ ] Open [.github/copilot-instructions.md](.github/copilot-instructions.md) and [.github/instructions/security-and-owasp.instructions.md](.github/instructions/security-and-owasp.instructions.md) in tabs so they're one click away.
- [ ] Increase font size in VS Code and the terminal so Chat panels are readable over a screen share.
- [ ] Disable desktop notifications; close sensitive tabs and email clients.
- [ ] Decide who captures the "one concrete next experiment" per team.
- [ ] Have a fallback plan if live demos fail — screenshots or a short recorded clip of each workflow saved locally.

## Appendix A — Demo Playbook (per-file cheat-sheets)

> **How to use this appendix:** Keep it open on a second screen during the session. For every demo file there are five short bullets — **Setup / Prompt / Point at / Gotcha / Bridge** — designed to fit on one glance. Use them as a safety net, not a script.
>
> **Pattern for every demo:**
> 1. **Setup** — what's open, which surface (Inline / Chat / Edits / Agent), which model.
> 2. **Prompt** — the *exact* line to paste. Don't improvise live.
> 3. **Point at** — what to draw the audience's eyes to as Copilot streams.
> 4. **Gotcha** — the deliberate thing to push back on, so the audience sees you challenging Copilot.
> 5. **Bridge** — the one-sentence transition into the next demo.

---

### Block 1 — Trust & Limits

#### [README.md](README.md)
- **Setup:** README open in preview; Chat panel docked right.
- **Prompt:** *(none — you're talking, not prompting)*. Walk the **Environment → 3S → Best Practices → Features** sections.
- **Point at:** The 🟢🔵🟡 3S block, then the `/` and `#` icons in the chat input.
- **Gotcha:** Say *"Half the 'bad answers' people complain about come from skipping the `#`-context step. Watch how often I'll do it today."*
- **Bridge:** *"Same toolbox, different models — which one matters? Let's look."*

#### [copilot-model-comparison.md](copilot-model-comparison.md)
- **Setup:** File open in preview. Model dropdown visible in the Chat panel.
- **Prompt:** *(walk-through)*. Highlight the Standard vs Premium table and the TL;DR.
- **Point at:** Switch the model live (e.g., Claude Sonnet 4.5 → Claude Opus 4.7) to show the dropdown actually changes behaviour.
- **Gotcha:** *"Premium isn't free — your quota is shared. Default to standard, escalate when stuck."*
- **Bridge:** *"Now let's stop talking about Copilot and start using it."*

---

### Block 2 — High-Value Workflows

#### [01-code-explanation.py](01-code-explanation.py)
- **Setup:** File open. Chat panel. Claude Sonnet 4.5. No other tabs open.
- **Prompt:** Select the whole file → `/explain`.
- **Point at:** That function names are `abc`, `xyz`, `rst` — yet Copilot still infers intent from the *bodies*.
- **Gotcha:** *"It says this 'scrapes a table'. Does it really? What happens if the page has two tables? Copilot smoothed that over."*
- **Bridge:** *"Explaining one file is easy. Finding things across a repo is the next level."*

#### [02-code-navigation.md](02-code-navigation.md)
- **Setup:** Chat panel. Use `#codebase` so Copilot can search beyond the open files.
- **Prompt:** the one in the file → *"#codebase Where is the method that calculates the price of an item?"*
- **Point at:** Copilot returning **file paths and symbol names**, not just prose — that's the navigation win.
- **Gotcha:** Ask a follow-up about a file or symbol that doesn't exist. Watch it stay confident. *"Tone is not a signal."*
- **Bridge:** *"Once you can find code, you can improve it — carefully."*

#### [03-code-refactoring.ts](03-code-refactoring.ts)
- **Setup:** File open. Inline Chat (Ctrl+i) on the function. *(The file already shows a post-refactor version with two implementations — revert mentally to the original three-positional-parameter form, or just narrate the diff.)*
- **Prompt:** the one in the file → *"Refactor the code to make it more readable and effective."* Then layer the maintainability constraint: *"Keep the public signature. No new dependencies. Explain the trade-off in two lines."*
- **Point at:** The **diff view** — accept/reject hunk by hunk. Note how Copilot replaced three positional params with a variadic `...numbers: number[]`.
- **Gotcha:** If Copilot adds a helper you didn't ask for (the file shows `sumPositiveNumbersThree` alongside the main function — a perfect example of unrequested scope creep), reject that hunk on stage. *"This is the scope creep from the peer team's findings."*
- **Bridge:** *"That was reading and reshaping existing code. Now let's generate new code."*

#### [04-code-generation.md](04-code-generation.md)
- **Setup:** Agent mode. Claude Sonnet. `StockPriceChecker/` folder visible (currently only `.csproj` — `Program.cs` will be created by the agent).
- **Prompt:** the one in the file → *"Create a C# console app in the Program.cs file under the StockPriceChecker folder… Fetch and show the MSFT stock price from the Yahoo Finance API. Add comments to the code."*
- **Point at:** Copilot creating `Program.cs`, picking an HTTP approach, and running the build — that's the agent loop in action. **This also seeds the codebase Block 5 will use.**
- **Gotcha:** *"Notice it asked permission before running `dotnet build` / `dotnet run`. Always read the command before you approve."*
- **Bridge:** *"Generated code shipped with a bug? Let's fix one."*

#### [05-bug-fixing.py](05-bug-fixing.py)
- **Setup:** File open. Inline Chat on the buggy function.
- **Prompt:** Don't use `/fix` first. Instead: *"Give me three possible causes of this bug, ranked by likelihood. Don't write code yet."*
- **Point at:** You picking *which* hypothesis to act on — that's the engineer staying in the loop.
- **Gotcha:** Then run `/fix` and compare. *"Notice `/fix` jumped straight to code. The 'three causes' prompt made you the decider."*
- **Bridge:** *"Bugs aren't only in code — they're also in the commands we run."*

#### [06-terminal-chat.md](06-terminal-chat.md)
- **Setup:** VS Code terminal. Ctrl+i in the terminal pane.
- **Prompt:** the one in the file → *"@terminal list all the files in the current folder that start with a number"*
- **Point at:** Copilot proposing the command (e.g., `ls [0-9]*`) **before** it runs — you approve.
- **Gotcha:** Then ask for `rm -rf` something. *"Watch how confidently it'd type that. Read before you run."* (Do not actually run it.)
- **Bridge:** *"Good. Now the safety net every change needs — tests."*

#### [07-test-generation.py](07-test-generation.py)
- **Setup:** File open (`calculate_unit_price`). Chat panel. Claude Sonnet.
- **Prompt:** start with the file's own prompt → *"Write unit tests for the function using pytest"*. Then re-run with the stricter version: *"…cover edge cases, null inputs, and error paths — not just the happy path."* Compare the two outputs.
- **Point at:** Whether the first version covers the `ValueError` for `quantity == 0` and whether the second adds negative numbers, floats, and type errors.
- **Gotcha:** *"If I'd just said 'write tests', I'd have got three happy-path cases and a green CI lying to me."*
- **Bridge:** *"Tests guard correctness. The next demo guards safety."*

#### [08-security-vulnerability-detection.py](08-security-vulnerability-detection.py)
- **Setup:** File open. `.github/instructions/security-and-owasp.instructions.md` open in another tab.
- **Prompt:** the one in the file → *"Perform a security check"*. Reinforce: *"Reference OWASP Top 10. For each finding: risk, line number, suggested fix."*
- **Point at:** Findings that should land — empty `API-Key` header, hard-coded URL, typo (`weahter`) that masks intent, missing TLS verification check, no timeout, no error handling. That the security instructions file is **auto-applied** (see `applyTo: "*"`).
- **Gotcha:** *"Copilot isn't a SAST tool. It's a second pair of eyes. Use both."*
- **Bridge:** *"Security covered. What about speed?"*

#### [09-performance-optimization.py](09-performance-optimization.py)
- **Setup:** File open (`sum_of_squares_not_optimized`). Chat panel.
- **Prompt 1 (from the file):** *"What's the big-O notation of the function?"* → **Prompt 2 (from the file):** *"Optimize the function."* Then strengthen it: *"Suggest up to three targeted optimizations. No new dependencies. Explain trade-offs. I'll pick before you write code."*
- **Point at:** That Copilot should spot the closed-form `n*(n+1)*(2n+1)/6` — O(n) → O(1). Split the analysis from the change — the engineer-in-the-loop pattern again.
- **Gotcha:** Reject any answer that changes the public signature. *"Speed is never worth a breaking change you didn't ask for."*
- **Bridge:** *"Faster code is good. Documented code is what survives the team."*

#### [10-document-generation.py](10-document-generation.py)
- **Setup:** Agent mode for the whole-file pass, or Inline for a single function.
- **Prompt:** the one in the file → *"Document and explain the Python 2 code in preparation to modernize it into Python 3 code."*
- **Point at:** Copilot calling out the Python 2 → 3 migration points (`urllib2` → `urllib.request`, `cStringIO` → `io`, `ConfigParser` → `configparser`, `print` statement → function). Documentation is the **safest** agent task — reversible, no behaviour change.
- **Gotcha:** *"This is where I tell teams to start their agent journey. Doc generation. Low blast radius."*
- **Bridge:** *"Documentation done. Now let's generate some front-end markup."*

#### [11-code-formatting.html](11-code-formatting.html)
- **Setup:** Empty HTML file (or scratch). Inline Chat or Chat panel. The committed file shows the *expected* output — keep it open in a Live Preview / browser tab so the audience sees the result render.
- **Prompt:** the one at the top of the file → *"Create an html page listing 12 random european countries with their population size and flag as bootstrap cards. It should be a self-contained file with a proper header. Place 4 countries in each row. Don't forget to add proper paddings and margins."*
- **Point at:** Bootstrap CDN inclusion, 4-per-row grid (`col-md-3`), and that Copilot picks real flag URLs. Then ask it to *re-format* the result (2-space indent, no inline styles) to show the **formatting** angle — the original prompt is generation; the reformat is the formatting demo.
- **Gotcha:** *"Your real formatter (Prettier, dotnet format, Black) is still the source of truth. Copilot is the assistant, not the authority."*
- **Bridge:** *"Same code, different language — let's translate."*

#### [12-code-translation.rs](12-code-translation.rs)
- **Setup:** File open (`sum_of_evens`). Chat panel.
- **Prompt:** the one in the file → *"Translate the code into python, typescript, and C#"*. Then add the rigor: *"Preserve semantics. Flag any place where the translation isn't 1:1 (integer overflow, default int width, iteration style)."*
- **Point at:** Whether Copilot uses idiomatic forms in each target (Python `sum(n for n in numbers if n % 2 == 0)`, TS `.filter().reduce()`, C# LINQ `.Where().Sum()`) and whether it calls out the integer-type difference (Rust `i32` vs Python's arbitrary precision).
- **Gotcha:** *"Translation is never free. The function is trivial, but ask it to translate a Rust function with `Result<T, E>` or borrows and the lossy bits multiply. Always test the translated version against the original."*
- **Bridge:** *"That's a code-level translation. Let's see one that talks to a real API."*

#### [api-endpoints.http](api-endpoints.http)
- **Setup:** REST Client extension active. File open.
- **Prompt:** *"Generate a typed client in C# for the endpoints in this file. Include error handling and retries with exponential backoff."*
- **Point at:** That Copilot can read the request/response shapes directly from the `.http` file — context wins again.
- **Gotcha:** *"Verify the endpoint paths against the real docs. Copilot will invent a 'plausible' route if you let it."*
- **Bridge:** *"That's the closing of Block 2. Twelve workflows. Now — how do we make Copilot behave consistently across the team?"*

---

### Block 3 — Prompting for Maintainable Code

#### [15-custom-instructions.md](15-custom-instructions.md)
- **Setup:** Open the file plus [.github/copilot-instructions.md](.github/copilot-instructions.md) side by side.
- **Prompt:** *(walk-through)*. Show the `applyTo:` frontmatter on the security/csharp/python instruction files.
- **Point at:** That these rules are **inherited by every prompt** — no one has to remember.
- **Gotcha:** *"Add 'minimum diff, no scope creep' here once and you save your team from a year of unrequested refactors."*
- **Bridge:** *"Repo-wide rules are baseline. Reusable prompts are leverage."*

#### [16-custom-prompts.md](16-custom-prompts.md)
- **Setup:** File open. `.github/prompts/` folder visible.
- **Prompt:** Run a saved prompt via `/` — show the autocomplete.
- **Point at:** Prompts under version control = prompts in code review.
- **Gotcha:** *"Treat prompts like code. The good ones get shared, versioned, reviewed. Bad ones get deleted."*
- **Bridge:** *"Same idea, but applied to changes across **multiple files** at once."*

#### [13-copilot-edit.md](13-copilot-edit.md)
- **Setup:** Copilot Edits panel. Empty working folder (or a scratch one) — the prompt **creates** two new related files.
- **Prompt:** the one in the file → *"Create copilot-chat.html and copilot-chat.css files. Create a layout with a header, a footer, a content area and a side nav bar using the bootstrap grid system. Fill each section with random content."*
- **Point at:** The **unified diff across both files** appearing in the Edits panel — accept/reject per hunk, per file. This is multi-file generation, not single-file autocomplete.
- **Gotcha:** *"This is a draft PR that hasn't been raised yet. Review like you would a PR — not like autocomplete."*
- **Bridge:** *"Now the part that makes people nervous — agents."*

---

### Block 4 — Agents, Permissions & Automation

#### [17-copilot-agent.md](17-copilot-agent.md)
- **Setup:** Agent mode. Claude Sonnet for speed (or Claude Opus if demoing depth).
- **Prompt:** the multi-line one in the file → *"Create a self-contained HTML file that displays and animates a 3D Rubik's cube…"* (Three.js, drag-to-rotate, shuffle, arrow-key face rotation, save as `rubiks-cube-3d.html`).
- **Point at:** The **loop** — plan → create file → propose edits → preview/run → fix bugs (black faces, controls) → iterate. Narrate each step.
- **Gotcha:** *"One bad assumption early in the loop compounds across 20 edits. Stop it the moment it starts guessing in circles — e.g. when faces turn black and it 'fixes' by adding more materials instead of debugging the rotation."*
- **Bridge:** *"General agents are powerful. Scoped agents are safer."*

#### [18-custom-agents.md](18-custom-agents.md)
- **Setup:** Open the file. Switch the agent in the dropdown (Azure Principal Architect, or Azure DevOps Expert).
- **Prompt:** one of the prompts in the file → *"How to build a resilient AKS cluster?"* (Azure Principal Architect) **or** *"List all projects under my organization"* (Azure DevOps).
- **Point at:** That the agent has a *narrower job description* — fewer tools, clearer behaviour. The architect answers with WAF pillars; the DevOps agent calls MCP tools and returns a real list.
- **Gotcha:** *"Smaller scope = safer behaviour = better output. The opposite of 'one model for everything'."*
- **Bridge:** *"Custom agents call **skills** — let's see those next."*

#### [19-agent-skills.md](19-agent-skills.md)
- **Setup:** Agent mode with the `webapp-testing` skill available. A local server running the page (Live Preview / Live Server on port 5500).
- **Prompt:** the one in the file → *"Test the webpage running on http://127.0.0.1:5500/random-countries.html"*
- **Point at:** The agent picking up the `webapp-testing` skill and driving Playwright — skills as **tested, reusable workflows**, not freeform prompts.
- **Gotcha:** *"A skill is how you turn a prompt that worked once into something the whole team can rely on twice."*
- **Bridge:** *"Skills extend the agent inward. MCP extends it outward — to your systems."*

#### [20-mcp.md](20-mcp.md)
- **Setup:** MCP servers configured (GitHub MCP + Azure MCP + Microsoft Learn MCP). Show a tool call in the agent log.
- **Prompt:** one of the Ask prompts in the file → *"In which Azure regions is gpt-5.2 available?"* or *"@azure Generate a table listing all my resource groups along with their corresponding regions."*
- **Point at:** A real tool call hitting a real Azure / Learn endpoint, with a real result coming back.
- **Gotcha:** *"MCP gives Copilot keys to your systems. Read the tool list before you enable a server."*
- **Bridge:** *"And on the enterprise side — what's safe to connect, and what isn't?"*

#### [enterprise-mcp-servers.md](enterprise-mcp-servers.md)
- **Setup:** Open the file.
- **Prompt:** *(walk-through)*. Talk through what's in the green-light list vs the watch-list.
- **Point at:** That MCP is an **allow-list**, not a free-for-all.
- **Gotcha:** *"Anything the agent can reach via MCP, it can reach with **your** credentials. Treat it like granting prod access."*
- **Bridge:** *"Interactive development — what happens when the agent asks you to course-correct?"*

#### [21-interactive-agent-development.md](21-interactive-agent-development.md)
- **Setup:** Agent mode. A GitHub issue prepared in advance (the file references `issues/1` in your repo). Prepare to interrupt mid-loop.
- **Prompt:** the one in the file → *"github issue #1 <YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>"*
- **Point at:** The agent reading the issue, planning the work, and how you can **interrupt and redirect** without restarting the whole task.
- **Gotcha:** *"Don't let the agent run unattended for 10 minutes. Course-correct in real time."*
- **Bridge:** *"Custom extensions are the next layer — domain knowledge baked in."*

#### [22-copilot-extension.md](22-copilot-extension.md)
- **Setup:** Azure extension installed and signed in. Type `@` to show the picker.
- **Prompt:** the two in the file → *"@azure list all resource groups"* then *"@azure list all resources under <YOUR_RESOURCE_GROUP_NAME>"*.
- **Point at:** The `@` prefix changes which model + tools handle the request. Real Azure data comes back, not generic prose.
- **Gotcha:** *"Pick one or two extensions that match your stack. Don't install everything — context bloat is real."*
- **Bridge:** *"And for the people who want this in the terminal too…"*

#### [28-cli-with-custom-agents.md](28-cli-with-custom-agents.md)
- **Setup:** Terminal open. Azure CLI signed in. Custom agents under `.github/agents/`. Use the terminal inline chat (`Cmd+I` / `Ctrl+I` in the terminal pane) **plus** the chat panel for the agent step.
- **Prompt sequence (from the file):**
  1. Terminal chat: *"list all my Azure resource groups in a table"* → Copilot proposes `az group list --output table`.
  2. Switch to **Azure Principal Architect** agent in the chat panel: *"…assess the architecture of the resources in the [RG] resource group against the Well-Architected Framework pillars and recommend improvements."*
  3. Back to terminal chat to execute one recommendation (e.g. *"enable diagnostic settings on my App Service…"*).
- **Point at:** Same agent definition, different surface — terminal inline chat **plus** chat-panel agent working together; IDE and CLI share config.
- **Gotcha:** *"CI/CD jobs can invoke agents too. Powerful — and exactly where unreviewed AI code most often slips in. Gate it."*
- **Bridge:** *"Enough theory. Let's run all of this on a real codebase."*

---

### Block 5 — Deep-Dive Demo

#### [StockPriceChecker/](StockPriceChecker/)
- **Setup:** Open the solution (`github-copilot-dotnet-demo.sln`) in VS Code. `StockPriceChecker.csproj` is committed; `Program.cs` is **generated during the Block 2 demo of [04-code-generation.md](04-code-generation.md)** — make sure that step has run before Block 5, or run it now as the opener.
- **Prompt sequence (45 min, in order):**
  1. *"#codebase Explain the architecture of this project in 5 bullets."*
  2. *"In `StockPriceChecker/Program.cs`, identify any method doing more than one thing. Don't change code yet."*
  3. *"Refactor that method for readability. Keep the public signature. No new classes. No new packages."*
  4. *"Generate xUnit tests for the refactored method. Include edge cases and error paths."*
  5. *"Review the diff you produced. List anything you added that I didn't ask for."*
- **Point at:** Every accept/reject decision. The audience should see you say *no* at least twice.
- **Gotcha:** Step 5 is the **anti-rot drill** — Copilot is surprisingly good at auditing its own scope creep.
- **Bridge:** *"That's the whole loop. Now — how do you make this stick on Monday morning?"*

---

### Block 6 — Embedding Copilot in Daily Work

#### [24-plan-mode.md](24-plan-mode.md)
- **Setup:** Plan Mode enabled. New chat.
- **Prompt:** the one in the file → *"I'm planning to create a shopping website in React and Node.js… browse by category, search, cart, checkout. Please help me plan the project by creating issues and breaking it down into epics, features, and tasks."*
- **Point at:** EPICs / features / tasks generated **before** any code change — and the option to push them to GitHub Issues.
- **Gotcha:** *"Plan first, execute second. This single habit prevents more incidents than any code-review checklist."*
- **Bridge:** *"And once a plan ships, CI is your backstop."*

#### [25-workflow-generation.md](25-workflow-generation.md)
- **Setup:** Copilot Edits (the file note says *"Use copilot edits"*). `.github/workflows/` folder visible.
- **Prompt:** the one in the file → *"Generate a default CI workflow for a Python 3 project under .github/workflows/ci-py.yml"*
- **Point at:** That CI is generated **alongside** the code, not as an afterthought; Edits creates the new YAML file in the right path.
- **Gotcha:** *"Generated YAML still needs a human review pass. Indentation errors don't fail loudly — they fail silently."*
- **Bridge:** *"Same idea, but for infrastructure."*

#### [26-infrastructure-generation.tf](26-infrastructure-generation.tf)
- **Setup:** File open. Terraform extension active. `terraform plan` ready to run.
- **Prompt:** the editor prompt in the file → *"Generate an azure resource group in the Sweden Central region and a storage account with the following properties: tier: Standard, replication: Local Redundant."*
- **Point at:** Run `terraform plan` after generation. Read the plan **aloud** — verify region (`swedencentral`), `account_tier = "Standard"`, `account_replication_type = "LRS"`.
- **Gotcha:** *"Never apply a template you can't explain. IaC is code — review it like code."*
- **Bridge:** *"Now tie code → PR → pipeline together."*

#### [27-azure-devops-integration.md](27-azure-devops-integration.md)
- **Setup:** Azure DevOps MCP server configured; Azure DevOps Expert agent available (`.github/agents/azure-devops.agent.md`); a real work item ID ready.
- **Prompt sequence (from the file):**
  1. *"List all projects in my Azure DevOps organization"* → *"List my active work items assigned to me in the [Project] project"*
  2. *"Get the details of work item #[ID] and help me create an implementation plan with acceptance criteria, edge cases, and test scenarios."*
  3. *"Based on work item #[ID], implement the first acceptance criterion in a new Python file called feature_impl.py"*
  4. *"Generate pytest unit tests…"* → *"Review the code you just generated. What could be wrong?"* → *"Create a summary of the implementation for work item #[ID] that I can add as a comment"*
- **Point at:** The traceability chain: **requirement → plan → code → tests → review → PR** — all driven from one agent.
- **Gotcha:** *"In a regulated/industrial context this isn't optional. Every change links back to a work item."*
- **Bridge:** *"And finally — Copilot inside your own product, not just your IDE."*

#### [23-copilot-sdk.py](23-copilot-sdk.py)
- **Setup:** Python venv activated. `github-copilot-sdk` installed and Copilot CLI authenticated (see comments at the top of the file).
- **Prompt:** Walk the code — `CopilotClient` → `create_session` (system message + model + `azure-docs` MCP server) → `send_and_wait({"prompt": "In which Azure regions is GPT-4.1 available?"})`. Run `py 23-copilot-sdk.py` live if time allows.
- **Point at:** Same capability you've been demoing all day — model + MCP tools + a prompt — surfaced inside an application, not the IDE.
- **Gotcha:** *"When you ship Copilot capability in your own product, the review-gate responsibility moves to **you**. Your users won't read the diff."*
- **Bridge:** *"That's the workshop. Last 10 minutes — what do you take home?"*

---

## Why this agenda works

- ✅ Anchored in **real-world patterns**, not abstract demos.
- ✅ Directly addresses **trust, complexity, agents, permissions**.
- ✅ Balanced: speed **and** quality.
- ✅ Leaves room for follow-up coaching.
