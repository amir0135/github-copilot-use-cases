# Copilot in Daily Work — Participant Handout

> A one-page take-home from the workshop. Pin this. Open it Monday morning.

---

## The one rule

> **Never push pure AI code into main. Zero trust in just adding the code — it still needs to be reviewed and confirmed before committing.**

If you remember nothing else from the workshop, remember this.

---

## Three reflexes to build this week

Pick three moments in your existing workflow where you'll *always* reach for Copilot. Suggested defaults:

1. **Inline complete** while coding — accept, reject, or rewrite. Never just Tab through.
2. **`/explain`** before reviewing a PR — get the summary, then read the code.
3. **Chat** to draft commit messages, PR descriptions, and standup notes.

Three reflexes. Not ten. Make them automatic before adding more.

---

## The two-prompt budget

If you haven't gotten what you want in **two prompts**, stop.

- Either write it yourself, or
- Step back and rewrite the question from scratch with proper context.

The third prompt is almost always you arguing with the model instead of fixing the input.

---

## No context, no complaint

The #1 difference between teams who love Copilot and teams who hate it is **context**.

Always attach what's relevant:

| Symbol | What it does |
|--------|--------------|
| `#file` | Pin a specific file |
| `#selection` | Use the currently selected code |
| `#codebase` | Let Copilot search the repo |
| `#problems` | Pass in current errors/warnings |
| `#changes` | Pass in the staged/unstaged diff |

If a teammate says *"Copilot gave me garbage,"* the first question is: **what did you attach?**

---

## Diff discipline — read every line

Before accepting a Copilot suggestion, scan for:

- [ ] **Unrequested helpers, new files, new imports** — reject scope creep even if the code is fine.
- [ ] **Renamed variables / reformatted lines** you didn't ask about.
- [ ] **Silent dependency additions** (`package.json`, `requirements.txt`, `csproj`).
- [ ] **"Almost-right" logic** — looks plausible, subtly wrong (off-by-one, wrong null handling, swapped args).
- [ ] **Made-up APIs / hallucinated method names** — if you don't recognize it, look it up.

A useful follow-up prompt:

> *"In this diff, list anything that isn't actually used by the change I asked for."*

---

## Mental model

Copilot is a **fast, eager, slightly overconfident junior** who's read every open-source repo but has been on your team for zero days.

- Output quality: *senior-ish*.
- Judgment behind it: *intern-level*.
- **You supply the judgment.**

You wouldn't merge a junior's PR unread. Same rule applies here.

---

## When *not* to use Copilot

It's OK — and often faster — to skip Copilot for:

- Tiny fixes where you already know the answer.
- Anything touching auth, crypto, secrets, or access control without careful review.
- One-line shell commands.
- Code you're using to learn something new (let yourself struggle a bit).

Saying *"I didn't use Copilot for this, it was faster without"* is a perfectly normal PR comment.

---

## When you *do* review Copilot-generated code

The review bar goes **up**, not down.

- Ask more "why" questions, not fewer.
- *"Copilot suggested it"* is **not** a valid answer to "why did you write it this way?"
- If the author can't defend a line, it doesn't ship.

---

## Your Monday experiment

Don't try to "roll out Copilot." Pick:

- **One repo.**
- **One workflow.** (e.g., "every PR gets a Copilot review pass before human review.")
- **One week.**

Measure informally. Decide at the next retro whether to keep it.

My commitment:

```
Repo:     _________________________________
Workflow: _________________________________
Date:     _________________________________
```

---

## Files worth bookmarking from the workshop repo

| File | When you need it |
|------|------------------|
| [README.md](README.md) | Environment, the 3S model, feature overview |
| [copilot-model-comparison.md](copilot-model-comparison.md) | Which model to pick |
| [15-custom-instructions.md](15-custom-instructions.md) | Setting up `.github/copilot-instructions.md` |
| [16-custom-prompts.md](16-custom-prompts.md) | Versioning prompts like code |
| [24-plan-mode.md](24-plan-mode.md) | Plan before letting Copilot act |
| [27-azure-devops-integration.md](27-azure-devops-integration.md) | Requirement → PR traceability |
| [.github/instructions/security-and-owasp.instructions.md](.github/instructions/security-and-owasp.instructions.md) | Secure-by-default guardrails |

---

## Red flags — stop and ask for help

- Copilot is suggesting code that touches **authentication, authorization, crypto, or secrets** and you don't fully understand it.
- You're about to accept a diff that **adds a dependency** you've never heard of.
- The change spans **more than ~3 files** and you haven't planned it.
- You're on prompt **#4 or #5** and still negotiating.
- A test passes but you can't explain *why*.

In any of these: pause, get a human review, or rewrite by hand.

---

*Questions, war stories, prompts that worked → bring them to the follow-up session.*
