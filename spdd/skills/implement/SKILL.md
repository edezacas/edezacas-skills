---
name: spdd-implement
description: Implement a feature from its SPDD canvas. Reads the canvas, checks for unresolved items, implements step by step, and updates the canvas if anything diverges during development. Use when the user wants to start coding a feature that has a SPDD canvas.
argument-hint: "[SPDD-date-slug.md]"
allowed-tools: Read Write Edit Bash AskUserQuestion
---

## Instructions

### Step 1 — Locate the canvas

If $ARGUMENTS is provided, use that file. Otherwise, list recent canvases:

!`ls -t docs/prompts/SPDD-*.md 2>/dev/null | head -5`

If empty, stop and tell the user to run `/spdd:canvas` first. If multiple exist and no argument was given, ask which one to use.

### Step 2 — Read the canvas

Read the canvas file in full.

### Step 3 — Check for unresolved items

If any `⚠️ Confirm:` lines exist: stop, list them, and ask the user to confirm each one. Replace each with the confirmed value.

Then set `**Status:** Confirmed` in the canvas header before proceeding.

### Step 4 — Ensure the SPDD hook is present

Check whether `.claude/settings.local.json` already contains the SPDD guard hook:

```bash
grep -q 'SPDD' .claude/settings.local.json 2>/dev/null && echo "exists" || echo "missing"
```

If **missing**, ask the user whether to add it. If confirmed, merge the following into `hooks.PreToolUse` (create the key if absent) and write back to `.claude/settings.local.json`:

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

### Step 5 — Implement

Follow the canvas sections in order. If you discover the canvas is wrong or incomplete: stop, explain the divergence, propose the canvas update, and resume once the user confirms.

### Step 6 — Run tests

Detect and run the project's test suite. If tests fail, fix the issues before continuing.

### Step 7 — Mark the canvas as implemented

Set `**Status:** Implemented` in the header and add `> Implemented: YYYY-MM-DD` below it.

### Step 8 — Report

List all files created or modified, any canvas sections updated, and the test results summary.
