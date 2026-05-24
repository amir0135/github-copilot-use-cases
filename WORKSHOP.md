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
   - `@` → participants and extensions: `@workspace`, `@terminal`, `@github`, plus any installed extensions. *"These change *who* answers the question."*
4. **Inline chat / Copilot Edits.** Press `Ctrl+I` / `⌘I` in the editor — show the in-line prompt box. Then open **Copilot Edits** (multi-file diff view) and point at the per-hunk accept/reject buttons. *"This is a draft PR that hasn't been raised yet."*
5. **Inline completions (ghost text).** Type a comment in any file, pause, and let the ghost text appear. Tab to accept, Esc to dismiss, `Alt+]` / `Alt+[` to cycle alternatives. *"This is the only surface that writes code without you asking. Treat it accordingly."*
6. **Agent surface (preview).** Toggle to **Agent** mode. Don't run it yet — just point at the **"Allow / Allow once / Deny"** approval prompts that will appear when it wants to run a command or edit a file. *"Every dangerous action stops and asks. That's the safety net. We'll exercise it in Block 4."*
7. **The status bar Copilot icon.** Click it. Show **enable/disable per language**, **proxy settings**, and the link to your **quota / usage page**. *"If Copilot ever goes quiet, this is the first place to check."*

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

*Usage-based billing — the standard vs premium distinction*
- **The model:** every paid Copilot plan (Business, Enterprise, Pro, Pro+) includes **unlimited inline code completions** plus a **monthly allowance of "premium requests"** for chat, edits, and agent mode.
- **Standard vs premium requests:**
  - **Standard requests** (default chat model, today's lightweight Sonnet/GPT class): typically counted as **1× per request** against your allowance — for most teams effectively unlimited in normal use.
  - **Premium requests** (large/frontier models — Claude Opus 4.7, GPT-5 long-context, Gemini 2.5 Pro, etc.): counted at a **higher multiplier** (often 1×–10× depending on the model). Agent mode and `#codebase` calls also burn more because they read more.
- **Monthly allowances (orders of magnitude — verify in your tenant):** Business ~300 premium req/user/mo, Enterprise ~1000, Pro ~300, Pro+ ~1500. *"Numbers shift — point people at the GitHub billing page, don't memorise."*
- **What happens when you run out:**
  - Default: requests are **throttled or fall back to a standard model** — they don't fail silently.
  - Admins can **enable paid overage** (per-request billing) or **cap it at zero** to guarantee no surprise invoice. **Default for most enterprises should be cap-at-zero until you have usage data.**
- **How to check your own balance:** status-bar Copilot icon → *"Manage Copilot"* → opens github.com usage page. Show this live.
- **Cost guardrails to give the room:**
  1. **Default to the standard model.** Only escalate to Opus / GPT-5 long-context when a standard model has already failed.
  2. **Two-prompt budget applies to premium requests too.** Don't burn 5× Opus calls re-asking the same question.
  3. **Agents are expensive *per task*.** A single agent loop can spend 10–50 requests. Worth it for the right job; ruinous as a default.
  4. **Admins: set the overage cap explicitly.** Don't leave it on "unlimited" by accident.

*Local vs cloud — where the inference actually happens*
- **Default reality today:** **all GitHub Copilot inference runs in the cloud** — on Microsoft / GitHub / model-provider infrastructure (Azure OpenAI, Anthropic, Google). Your prompt + attached context leaves your machine over TLS, gets a response, comes back.
- **What gets sent:** the prompt, attached files (`#`), selected text, recent chat turns, and — in Agent mode — anything the agent reads. **Not** your whole repo, **not** files you didn't attach.
- **What does *not* happen on Business/Enterprise plans:** prompts and suggestions are **not used to train the public foundation models**. There's a separate contractual data-handling commitment — point people at GitHub's Trust Center, don't paraphrase it on stage.
- **Data residency:** GitHub Copilot Enterprise offers **EU data residency** for prompt/response handling — relevant for NKT. Confirm the current state in your tenant settings; don't promise it on stage if you haven't verified.
- **Where local *does* enter the picture (and where it doesn't):**
  - ✅ **AI Toolkit for VS Code / Ollama / LM Studio** let you run open models (Llama, Phi, Mistral, etc.) **fully on your laptop** — useful for offline work, highly sensitive snippets, or experimenting with a model before paying for it.
  - ✅ These are **separate products** from GitHub Copilot. They don't reduce your Copilot bill; they're a parallel option.
  - ❌ **GitHub Copilot itself does not run locally today.** There is no "offline mode" for Copilot chat or agent. If the network is down, Copilot is down.
  - ⚠️ **Bring-your-own-key / self-hosted endpoints** exist in some enterprise configurations (Azure OpenAI proxied through your tenant). Treat as an advanced topic — flag it exists, don't demo it.
- **Decision guide to give the room:**
  - *"Normal day-to-day work on non-secret code?"* → Cloud Copilot, standard model. Done.
  - *"Sensitive snippet you'd rather not send anywhere?"* → Don't paste it. Either rewrite it generically first, or use a local model via AI Toolkit for that one task.
  - *"Need a frontier model for a hard problem?"* → Cloud Copilot, premium model, mind the quota.
  - *"Air-gapped environment?"* → Copilot isn't the right tool today. Local-only stack.

> 🎯 **One-liner to land here:** *"Standard requests are effectively free; premium requests are metered; everything runs in the cloud unless you deliberately chose otherwise. Procurement will ask all three — now you can answer."*

### Demo moment (5 min)

Open [README.md](README.md) and walk through the **3S principles** (Simple, Specific, Short) and the best-practices list. Then flip to [copilot-model-comparison.md](copilot-model-comparison.md) to show that *which model you pick also changes trust* — some are faster and shallower, some are slower and more thorough. **Tie it back to billing:** point at which models in the table are premium-multiplier and which aren't, and say out loud *"this is also a cost decision, not just a capability one."*

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
| Code navigation | [02-code-navigation.md](02-code-navigation.md) | Orient fast in unfamiliar areas | *"First day on a new codebase, you normally lose half a week reading. With Copilot, you lose half a day. Ask: 'Where does authentication happen?', 'Which files handle payment?', 'What calls this method?'"* |

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

**Exercise A — Bad prompt → risky output**
> Prompt to show on screen: *"Make this faster."*
> Expected result: Copilot rewrites loops, changes data structures, maybe introduces parallelism. Discuss: "What did it assume? What did it break? How would we notice in review?"

**Exercise B — Improved prompt → safer output**
> Prompt: *"This method is called ~100 times per request and shows up in our profiler. Suggest up to three targeted optimizations. Do not change the public signature, do not add dependencies, and explain the trade-offs. I'll pick one before you write code."*
> Discuss: "Same goal. Completely different conversation. Which one would you want a junior dev to send?"

**Exercise C — Catching scope creep live (the anti-rot drill)**
> Take a small, well-scoped change (e.g., "add null check to this method") and run it with a deliberately loose prompt: *"Improve this method."*
> Expected result: Copilot adds an extra helper, renames a variable, maybe introduces a new exception type. **All of it works. None of it was asked for.**
> Now re-run with the *"minimum diff — no scope creep"* pattern. Show the two diffs side by side.
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

> "So far we've looked at each workflow in isolation. For the next 45 minutes I'm going to chain them together on a realistic codebase — explain, refactor, test, review — in the order you'd actually do it on a Monday morning. Your job is to challenge me. Ask 'why that prompt?', 'why did you accept that?', 'why didn't you just write it yourself?' That's where the learning is."

### Setup

The demo uses [StockPriceChecker/](StockPriceChecker/) (C# / .NET) from this repo — a realistic, stack-aligned example that mirrors common enterprise patterns.

### Demo walkthrough (run as one continuous narrative)

**Part 1 — Understand an unfamiliar area (15 min)**
- Open a file nobody in the room has seen before.
- Ask Copilot to explain it. Read the explanation *aloud* with the file open.
- Call out at least one thing Copilot got *subtly* wrong or oversimplified — and say why you noticed.
- Group question: *"What did it get right? What did it smooth over?"*

**Part 2 — Improve without increasing complexity (15 min)**
- Pick a method that's doing too much.
- Use the prompt pattern from Block 3: *"Refactor for readability. No new classes, no new dependencies, same public behavior."*
- Show the diff on screen. Compare before/after side-by-side.
- Group question: *"Is this actually simpler, or just differently complicated? Would you merge it?"*

**Part 3 — Review as a group (15 min)**
- Let Copilot propose changes to a file.
- Review each hunk live, **out loud**, with the group voting accept / reject / reshape.
- After each hunk, ask the facilitator questions below.

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

✅ **Outcome:** Teams leave knowing **what to try next week**.

---

## 7. Wrap-Up & Next Steps — 10 min

### What to say (the close)

> "Three things before we wrap. First: what actually worked for you today? I want real answers, not polite ones. Second: what do you still not trust? That's the list I take back to shape the next session. Third: every team here commits to *one* experiment before we meet again — one repo, one workflow, one week. Not a program. An experiment."

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
- **Setup:** Chat panel. Use `#codebase` and `@workspace`.
- **Prompt:** *"#codebase Where does authentication happen in this project? List the files and the entry point."*
- **Point at:** Copilot returning **file paths**, not just prose — that's the navigation win.
- **Gotcha:** Ask a follow-up about a file that doesn't exist. Watch it stay confident. *"Tone is not a signal."*
- **Bridge:** *"Once you can find code, you can improve it — carefully."*

#### [03-code-refactoring.ts](03-code-refactoring.ts)
- **Setup:** File open. Inline Chat (Ctrl+i) on the function.
- **Prompt:** *"Refactor for readability. Keep the public signature. No new dependencies. Explain the trade-off in two lines."*
- **Point at:** The **diff view** — accept/reject hunk by hunk.
- **Gotcha:** If Copilot adds a helper you didn't ask for, reject that hunk on stage. *"This is the scope creep from the peer team's findings."*
- **Bridge:** *"That was reading and reshaping existing code. Now let's generate new code."*

#### [04-code-generation.md](04-code-generation.md)
- **Setup:** Agent mode. Claude Sonnet 4.5.
- **Prompt:** Use the prompt at the top of the file (it's already there).
- **Point at:** Copilot reading multiple files before writing — that's the agent loop in action.
- **Gotcha:** *"Notice it asked permission before running the terminal command. Always read the command before you approve."*
- **Bridge:** *"Generated code shipped with a bug? Let's fix one."*

#### [05-bug-fixing.py](05-bug-fixing.py)
- **Setup:** File open. Inline Chat on the buggy function.
- **Prompt:** Don't use `/fix` first. Instead: *"Give me three possible causes of this bug, ranked by likelihood. Don't write code yet."*
- **Point at:** You picking *which* hypothesis to act on — that's the engineer staying in the loop.
- **Gotcha:** Then run `/fix` and compare. *"Notice `/fix` jumped straight to code. The 'three causes' prompt made you the decider."*
- **Bridge:** *"Bugs aren't only in code — they're also in the commands we run."*

#### [06-terminal-chat.md](06-terminal-chat.md)
- **Setup:** VS Code terminal. Ctrl+i in the terminal pane.
- **Prompt:** *"Show me git log entries from the last 24 hours by author, oneline."*
- **Point at:** Copilot proposing the command **before** it runs — you approve.
- **Gotcha:** Ask for `rm -rf` something. *"Watch how confidently it'd type that. Read before you run."* (Do not actually run it.)
- **Bridge:** *"Good. Now the safety net every change needs — tests."*

#### [07-test-generation.py](07-test-generation.py)
- **Setup:** File open. Chat panel. Sonnet 4.5.
- **Prompt:** *"Write pytest unit tests for the function in #file. Cover edge cases, null inputs, and error paths — not just the happy path."*
- **Point at:** Whether it generates the **negative** cases or quietly skips them.
- **Gotcha:** *"If I'd just said 'write tests', I'd have got three happy-path cases and a green CI lying to me."*
- **Bridge:** *"Tests guard correctness. The next demo guards safety."*

#### [08-security-vulnerability-detection.py](08-security-vulnerability-detection.py)
- **Setup:** File open. `.github/instructions/security-and-owasp.instructions.md` open in another tab.
- **Prompt:** *"Perform a security check on this file. Reference OWASP Top 10. For each finding: risk, line number, suggested fix."*
- **Point at:** That the security instructions file is **auto-applied** (see `applyTo: "*"`).
- **Gotcha:** *"Copilot isn't a SAST tool. It's a second pair of eyes. Use both."*
- **Bridge:** *"Security covered. What about speed?"*

#### [09-performance-optimization.py](09-performance-optimization.py)
- **Setup:** File open. Chat panel.
- **Prompt 1:** *"What's the Big-O of this function?"* → **Prompt 2:** *"Suggest up to three targeted optimizations. No new dependencies. Explain trade-offs. I'll pick before you write code."*
- **Point at:** That you split the analysis from the change — the engineer-in-the-loop pattern again.
- **Gotcha:** Reject any answer that changes the public signature. *"Speed is never worth a breaking change you didn't ask for."*
- **Bridge:** *"Faster code is good. Documented code is what survives the team."*

#### [10-document-generation.py](10-document-generation.py)
- **Setup:** Agent mode for the whole-file pass, or Inline for a single function.
- **Prompt:** Use the one in the file (Python 2 → 3 documentation prep).
- **Point at:** That documentation is the **safest** agent task — reversible, no behaviour change.
- **Gotcha:** *"This is where I tell teams to start their agent journey. Doc generation. Low blast radius."*
- **Bridge:** *"Documentation done. Now let's format the front-end mess."*

#### [11-code-formatting.html](11-code-formatting.html)
- **Setup:** File open. Inline Chat.
- **Prompt:** *"Format this HTML: 2-space indent, semantic tags where possible, no inline styles. Don't change content."*
- **Point at:** The diff — verify content is untouched.
- **Gotcha:** *"Your real formatter (Prettier, dotnet format, Black) is still the source of truth. Copilot is the assistant, not the authority."*
- **Bridge:** *"Same code, different language — let's translate."*

#### [12-code-translation.rs](12-code-translation.rs)
- **Setup:** File open. Chat panel.
- **Prompt:** *"Translate this Rust function to idiomatic C#. Preserve semantics. Flag any place where the translation isn't 1:1."*
- **Point at:** Whether Copilot **flags the lossy bits** (ownership, lifetimes, error types).
- **Gotcha:** *"Translation is never free. Always test the translated version against the original's behaviour."*
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
- **Setup:** Copilot Edits panel. 2–3 related files attached.
- **Prompt:** Use the editor prompt in the file.
- **Point at:** The **unified diff** across files — accept/reject per hunk.
- **Gotcha:** *"This is a draft PR that hasn't been raised yet. Review like you would a PR — not like autocomplete."*
- **Bridge:** *"Now the part that makes people nervous — agents."*

---

### Block 4 — Agents, Permissions & Automation

#### [17-copilot-agent.md](17-copilot-agent.md)
- **Setup:** Agent mode. Sonnet 4.5 for speed (or Opus 4.7 if demoing depth).
- **Prompt:** Use the one in the file.
- **Point at:** The **loop** — read → propose edit → run command → observe → iterate. Narrate each step.
- **Gotcha:** *"One bad assumption early in the loop compounds across 20 edits. Stop it the moment it starts guessing in circles."*
- **Bridge:** *"General agents are powerful. Scoped agents are safer."*

#### [18-custom-agents.md](18-custom-agents.md)
- **Setup:** Open the file. Switch the agent in the dropdown.
- **Prompt:** Use one of the agent-mode prompts in the file (Azure Principal Architect or Azure DevOps).
- **Point at:** That the agent has a *narrower job description* — fewer tools, clearer behaviour.
- **Gotcha:** *"Smaller scope = safer behaviour = better output. The opposite of 'one model for everything'."*
- **Bridge:** *"Custom agents call **skills** — let's see those next."*

#### [19-agent-skills.md](19-agent-skills.md)
- **Setup:** Agent mode. A skill triggered explicitly.
- **Prompt:** Use the one in the file.
- **Point at:** Skills as **tested, reusable workflows** — not freeform prompts.
- **Gotcha:** *"A skill is how you turn a prompt that worked once into something the whole team can rely on twice."*
- **Bridge:** *"Skills extend the agent inward. MCP extends it outward — to your systems."*

#### [20-mcp.md](20-mcp.md)
- **Setup:** MCP servers configured. Show a tool call in the agent log.
- **Prompt:** Use the Ask prompt in the file (Azure region lookup).
- **Point at:** A real tool call hitting a real Azure endpoint, with a real result coming back.
- **Gotcha:** *"MCP gives Copilot keys to your systems. Read the tool list before you enable a server."*
- **Bridge:** *"And on the enterprise side — what's safe to connect, and what isn't?"*

#### [enterprise-mcp-servers.md](enterprise-mcp-servers.md)
- **Setup:** Open the file.
- **Prompt:** *(walk-through)*. Talk through what's in the green-light list vs the watch-list.
- **Point at:** That MCP is an **allow-list**, not a free-for-all.
- **Gotcha:** *"Anything the agent can reach via MCP, it can reach with **your** credentials. Treat it like granting prod access."*
- **Bridge:** *"Interactive development — what happens when the agent asks you to course-correct?"*

#### [21-interactive-agent-development.md](21-interactive-agent-development.md)
- **Setup:** Agent mode. Prepare to interrupt mid-loop.
- **Prompt:** Use the agent-mode prompt in the file.
- **Point at:** That you can **interrupt and redirect** without restarting the whole task.
- **Gotcha:** *"Don't let the agent run unattended for 10 minutes. Course-correct in real time."*
- **Bridge:** *"Custom extensions are the next layer — domain knowledge baked in."*

#### [22-copilot-extension.md](22-copilot-extension.md)
- **Setup:** Extensions installed. Type `@` to show the picker.
- **Prompt:** Use the two prompts in the file.
- **Point at:** The `@` prefix changes which model + tools handle the request.
- **Gotcha:** *"Pick one or two extensions that match your stack. Don't install everything — context bloat is real."*
- **Bridge:** *"And for the people who want this in the terminal too…"*

#### [28-cli-with-custom-agents.md](28-cli-with-custom-agents.md)
- **Setup:** Terminal open. Copilot CLI installed.
- **Prompt:** Use the CLI command in the file.
- **Point at:** Same agent definition, different surface — IDE and CLI share config.
- **Gotcha:** *"CI/CD jobs can invoke agents too. Powerful — and exactly where unreviewed AI code most often slips in. Gate it."*
- **Bridge:** *"Enough theory. Let's run all of this on a real codebase."*

---

### Block 5 — Deep-Dive Demo

#### [StockPriceChecker/](StockPriceChecker/)
- **Setup:** Open the solution in VS Code. `.cs` files visible. Tests project ready to run.
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
- **Prompt:** Use the one in the file.
- **Point at:** EPICs/stories generated **before** any code change.
- **Gotcha:** *"Plan first, execute second. This single habit prevents more incidents than any code-review checklist."*
- **Bridge:** *"And once a plan ships, CI is your backstop."*

#### [25-workflow-generation.md](25-workflow-generation.md)
- **Setup:** Editor prompt in the file. `.github/workflows/` folder visible.
- **Prompt:** Use the editor prompt in the file.
- **Point at:** That CI is generated **alongside** the code, not as an afterthought.
- **Gotcha:** *"Generated YAML still needs a human review pass. Indentation errors don't fail loudly — they fail silently."*
- **Bridge:** *"Same idea, but for infrastructure."*

#### [26-infrastructure-generation.tf](26-infrastructure-generation.tf)
- **Setup:** File open. Terraform extension active. `terraform plan` ready to run.
- **Prompt:** Use the editor prompt in the file.
- **Point at:** Run `terraform plan` after generation. Read the plan **aloud**.
- **Gotcha:** *"Never apply a template you can't explain. IaC is code — review it like code."*
- **Bridge:** *"Now tie code → PR → pipeline together."*

#### [27-azure-devops-integration.md](27-azure-devops-integration.md)
- **Setup:** Azure DevOps MCP server configured. A work item ID ready.
- **Prompt:** *"Fetch work item #1234, create a branch from main named after it, and open a draft PR linking back to the item."*
- **Point at:** The traceability chain: **requirement → branch → PR → pipeline** — all from one prompt.
- **Gotcha:** *"In a regulated/industrial context this isn't optional. Every change links back to a work item."*
- **Bridge:** *"And finally — Copilot inside your own product, not just your IDE."*

#### [23-copilot-sdk.py](23-copilot-sdk.py)
- **Setup:** Python venv activated. Dependencies installed.
- **Prompt:** Walk the code; run a `CopilotClient` session live if time allows.
- **Point at:** Same capability you've been demoing all day — surfaced inside an application.
- **Gotcha:** *"When you ship Copilot capability in your own product, the review-gate responsibility moves to **you**. Your users won't read the diff."*
- **Bridge:** *"That's the workshop. Last 10 minutes — what do you take home?"*

---

## Why this agenda works

- ✅ Anchored in **real-world patterns**, not abstract demos.
- ✅ Directly addresses **trust, complexity, agents, permissions**.
- ✅ Balanced: speed **and** quality.
- ✅ Leaves room for follow-up coaching.
