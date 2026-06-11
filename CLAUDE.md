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

# Slash commands (root project)
/tests-run           # run all 8 SPDD tests, write results, revert sample-app
/tests-record N pass|fail [notes]   # record a single test result
```

## Structure
```
angular-conventions/SKILL.md     # Angular patterns (auto-triggered)
init-project/SKILL.md            # CLAUDE.md creation guide (auto-triggered)
spdd-canvas/SKILL.md             # REASONS canvas generator — /spdd-canvas
spdd-canvas/assets/template-reasons.md
spdd-implement/SKILL.md          # canvas-driven implementer — /spdd-implement
.claude/commands/
  tests-run.md                   # /tests-run command
  tests-record.md                # /tests-record command
tests/
  spdd-test-plan.md              # 8 acceptance tests for SPDD skills
  spdd-test-results.md           # auto-generated after each /tests-run
  sample-app/                    # minimal Express+Prisma app used as test target
```

## Gotchas
- `tests/sample-app/` has its own `CLAUDE.md`; treat it as an independent sub-project when running tests.
- `/tests-run` reverts all `sample-app/` changes after completing — do not manually edit `sample-app/` during a test run.
- `.claude/settings.local.json` is gitignored; each developer's permissions accumulate there during test runs.
