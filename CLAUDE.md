# Claude Skills

## Overview
Shared Claude Code skills for the team. Provides automatic and slash-command skills loaded via symlinks into `~/.claude/skills/`.

## Stack
- Skills: Markdown (`SKILL.md`) — no build step, agentskills.io format
- Test app: Node.js · Express · Prisma · SQLite · TypeScript · pnpm

## Commands
```
# In tests/sample-app/
pnpm build           # compile TypeScript
pnpm db:generate     # regenerate Prisma client
```

## Evaluating skills

Each skill has an `evals/evals.json` following the [agentskills.io evaluation format](https://agentskills.io/skill-creation/evaluating-skills). The file defines test cases with prompts, expected outputs, and verifiable assertions.

To run evals, load the `evals.json`, execute each prompt against your project (with and without the skill), grade the assertions, and record results in `evals/workspace/` (gitignored). See the agentskills.io docs for the full workspace structure and grading format.

## Structure
```
angular-conventions/SKILL.md     # Angular patterns (auto-triggered)
init-project/SKILL.md            # CLAUDE.md creation guide (auto-triggered)
spdd-canvas/SKILL.md             # REASONS canvas generator — /spdd-canvas
spdd-canvas/assets/template-reasons.md
spdd-canvas/evals/evals.json     # evals 1–3: guard, generation quality, hook installation
spdd-implement/SKILL.md          # canvas-driven implementer — /spdd-implement
spdd-implement/evals/evals.json  # evals 4–8: unresolved items, proceed, divergence, doc, final state
evals/workspace/                 # gitignored — local eval results go here
```

## Gotchas
- `evals/workspace/` is gitignored; results stay local.
