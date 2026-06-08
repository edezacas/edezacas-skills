---
name: spdd-canvas
description: Generate a REASONS canvas for a new feature and save it to docs/prompts/. Use BEFORE writing code. Trigger when the user mentions a new feature, wants to implement something, asks for a canvas, or requests a structured prompt before coding.
argument-hint: "<brief feature description>"
allowed-tools: Read Write Edit Bash AskUserQuestion
---

## Today's date

!`date +%Y-%m-%d`

## Project context

!`cat CLAUDE.md 2>/dev/null || echo "(No CLAUDE.md — infer stack from project structure)"`

## Instructions

Generate a REASONS canvas for this feature: $ARGUMENTS

Follow these steps in order:

### Step 1 — Read the base template

Read [template-reasons.md](template-reasons.md).

### Step 2 — Understand the project

If CLAUDE.md does not clarify the stack and conventions, briefly inspect the project structure (package.json, composer.json, src/, app/ dirs, etc.) before generating the canvas.

### Step 3 — Determine layers

If the feature spans clearly separate layers (e.g. backend + frontend, API + CLI, service + worker), ask the user whether they want one canvas per layer or a single unified canvas.

### Step 4 — Generate a filled canvas

Adapt the template to the project stack and fill it with REAL, concrete content based on the feature description. Do not copy the empty template.

Adaptation rules:
- **Entities** — use the actual model layer of the stack (Doctrine, Eloquent, SQLAlchemy, Prisma, TypeScript interfaces, etc.)
- **Structure** — use real paths from the project, not generic placeholders
- **Operations** — adapt to the operation type (REST endpoints, CLI commands, UI actions, async jobs, etc.)
- **Norms** — extract mandatory conventions from the project's CLAUDE.md; if none, use stack defaults
- **Safeguards** — include tests and edge cases relevant to the stack

For any decision that requires user input (exact fields, relationships, non-obvious business rules), mark the line with `⚠️ Confirm:` and propose a sensible default.

### Step 5 — Save the file

1. Create `docs/prompts/` if it does not exist: `mkdir -p docs/prompts`
2. Generate a kebab-case slug from the feature description
3. Save to `docs/prompts/SPDD-YYYY-MM-DD-slug.md` (using today's date)

### Step 6 — Ensure the SPDD hook is present

Check whether the project-level `.claude/settings.local.json` already contains the SPDD guard hook:

```bash
grep -q 'SPDD' .claude/settings.local.json 2>/dev/null && echo "exists" || echo "missing"
```

If **missing**, ask the user:

> "Do you want me to add the SPDD guard hook to `.claude/settings.local.json`? It will block any Edit/Write if unresolved `⚠️ Confirm:` items exist in a canvas."

If the user confirms:
1. Create `.claude/` if it does not exist: `mkdir -p .claude`
2. Read `.claude/settings.local.json` if it exists; otherwise start from `{}`
3. Merge the following hook into the `hooks.PreToolUse` array (create the key if absent):

```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "unresolved=$(grep -rl '⚠️ Confirm:' docs/prompts/SPDD-*.md 2>/dev/null); if [ -n \"$unresolved\" ]; then echo \"SPDD WARNING: unresolved canvas items in: $unresolved — review before editing code.\"; fi"
    }
  ]
}
```

4. Write the updated JSON back to `.claude/settings.local.json`.

If the hook already exists or the user declines, skip silently.

### Step 7 — Report back

Show:
- The path of the saved file
- A 3-bullet summary of the canvas content
- All `⚠️ Confirm:` lines the user must review before passing the canvas to Claude to generate code
