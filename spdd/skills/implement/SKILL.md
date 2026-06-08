---
name: spdd-implement
description: Implement a feature from its SPDD canvas. Reads the canvas, checks for unresolved items, implements step by step, and updates the canvas if anything diverges during development. Use when the user wants to start coding a feature that has a SPDD canvas.
argument-hint: "[SPDD-date-slug.md]"
allowed-tools: Read Write Edit Bash AskUserQuestion
---

## Instructions

### Step 1 — Locate the canvas

If $ARGUMENTS is provided, use that file. Otherwise, find the most recent canvas:

!`ls -t docs/prompts/SPDD-*.md 2>/dev/null | head -5`

If the list is empty, stop and tell the user to run `/spdd` first.
If multiple canvases exist and no argument was given, ask the user which one to use.

### Step 2 — Read the canvas

Read the canvas file in full.

### Step 3 — Check for unresolved items

Search the canvas for any `⚠️ Confirm:` lines.

If any exist: **STOP**. List every unresolved item clearly and ask the user to confirm each one. Once confirmed, update the canvas replacing each `⚠️ Confirm:` line with the confirmed value, then continue.

### Step 4 — Implement section by section

Follow the canvas in this order:
1. **Entities** — create models, migrations, interfaces
2. **Structure** — create the listed files/directories
3. **Operations** — implement endpoints, commands, or UI actions
4. **Norms** — apply every checked convention
5. **Safeguards** — write the listed tests

### Step 5 — Handle divergences

If during implementation you discover the canvas is wrong, incomplete, or needs to change:
1. **Stop coding immediately**
2. Explain the divergence to the user in plain terms
3. Propose the exact canvas update
4. Update the canvas once the user confirms
5. Resume implementation from where you stopped

### Step 6 — Report

When done:
- List all files created or modified
- Note any canvas sections updated during implementation
- Remind the user to run the test suite
