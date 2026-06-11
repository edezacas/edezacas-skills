# edezacas Skills

Team shared skills for Claude Code. Loaded automatically when Claude detects the task is relevant.

## Available skills

| Skill | Commands | Description |
|---|---|---|
| `angular-conventions` | automatic | Mandatory Angular conventions: `inject()`, `FormService`, `@Type`, signals, `takeUntilDestroyed` |
| `init-project` | automatic | Guide for creating and editing `CLAUDE.md` in any project |
| `spdd-canvas` | `/spdd-canvas` | Structured Prompt-Driven Development: generates a REASONS canvas before writing code |
| `spdd-implement` | `/spdd-implement` | Implements a feature from its SPDD canvas |

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:edezacas/edezacas-skills.git ~/projects/edezacas-skills
```

### 2. Create symlinks

```bash
mkdir -p ~/.claude/skills

ln -s ~/projects/edezacas-skills/angular-conventions ~/.claude/skills/angular-conventions
ln -s ~/projects/edezacas-skills/init-project ~/.claude/skills/init-project
ln -s ~/projects/edezacas-skills/spdd-canvas ~/.claude/skills/spdd-canvas
ln -s ~/projects/edezacas-skills/spdd-implement ~/.claude/skills/spdd-implement
```

### 3. Restart Claude Code

Skills are detected on the fly, but a restart ensures all symlinks are picked up.

## Using the SPDD skill

> Based on [Structured Prompt-Driven Development](https://martinfowler.com/articles/structured-prompt-driven/) by Martin Fowler.


Before implementing any new feature:

```
/spdd-canvas magic link authentication
```

Claude generates a REASONS canvas at `docs/prompts/SPDD-YYYY-MM-DD-slug.md` with the feature design adapted to the project stack.

Once the canvas is reviewed:

```
/spdd-implement
```

Claude reads the canvas, checks for unresolved decisions (`⚠️ Confirm:`), implements step by step, and updates the canvas if anything diverges during development.

## Tests

The `tests/` folder contains an automated test suite for the SPDD skills.

```
tests/
  spdd-test-plan.md       # 8 test definitions with criteria
  spdd-test-results.md    # results written after each run
  sample-app/             # minimal Express + Prisma app used as test target
```

### Running the tests

```
/tests-run
```

Executes all 8 tests against `tests/sample-app/`, writes results to `tests/spdd-test-results.md`, and reverts any changes to `sample-app/` on completion.

### What the tests cover

| # | Test | What it checks |
|---|------|----------------|
| 1 | canvas — guard | Stops and asks for a description when called with no arguments |
| 2 | canvas — generation quality | Uses real paths, stack entities, minimal `⚠️ Confirm:` lines, correct path and Draft status |
| 3 | canvas — hook installation | Installs the SPDD pre-tool-use hook; no duplicate on re-run |
| 4 | implement — unresolved items | Stops before writing code when `⚠️ Confirm:` lines remain |
| 5 | implement — proceeds | Sets `Status: Confirmed`, follows canvas order, writes code without interruptions |
| 6 | implement — divergence handling | Stops, explains the discrepancy, and proposes a canvas update |
| 7 | implement — feature doc | Generates a readable `docs/features/SLUG.md` with all required sections |
| 8 | implement — final state | Canvas marked `Implemented`, `pnpm build` passes |

## Updating skills

When someone updates a skill, the rest of the team only needs:

```bash
cd ~/projects/edezacas-skills && git pull
```

No need to recreate the symlinks.

## Adding a new skill

1. Create a folder with the skill name (lowercase, hyphens only — matches the agentskills.io spec)
2. Add a `SKILL.md`:

```markdown
---
name: skill-name
description: Description of when and how to use it.
---

Instructions for Claude...
```

3. Push and create the symlink:

```bash
ln -s ~/projects/edezacas-skills/skill-name ~/.claude/skills/skill-name
```
