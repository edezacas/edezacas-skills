---
name: init-project
description: Guidelines for creating or editing a CLAUDE.md file for a project or subdirectory. Use when running /init, creating a new CLAUDE.md, or when asked to update an existing one.
---

# Project CLAUDE.md Guidelines

Answers WHY, WHAT and HOW. Only instructions applicable to **all** tasks in the project.
Task-specific content goes in `agent_docs/`.

**Structure** (no empty sections):
1. `## Overview` — 1-2 lines: what it is and what it does
2. `## Stack` — key technologies and versions
3. `## Commands` — build, dev, test, lint
4. `## Structure` — map of relevant directories
5. `## Agent Docs` — list of `agent_docs/*.md` with one-line description each
6. `## Gotchas` — only what Claude cannot infer from the code

**Limits:** max 80 lines. No snippets. No style guides. No personal preferences.

**agent_docs/** for topic-specific instructions — Claude decides what to read per task:
`building.md` · `testing.md` · `architecture.md` · `deployment.md`
