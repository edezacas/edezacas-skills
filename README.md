# edezacas Skills

Team shared AI skills in the [agentskills.io](https://agentskills.io) format. Work with Claude Code, OpenAI Codex, VS Code Copilot, and any compatible agent.

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

## Using with other agents

Skills use the agentskills.io format — a directory with a `SKILL.md` file and standard frontmatter (`name`, `description`). Any agent that supports this format can load them directly.

The agentskills.io standard directory is `.agents/skills/`. Place (or symlink) the skill folders there and any compatible agent will discover them automatically.

```bash
mkdir -p .agents/skills
ln -s ~/projects/edezacas-skills/spdd-canvas .agents/skills/spdd-canvas
ln -s ~/projects/edezacas-skills/spdd-implement .agents/skills/spdd-implement
# etc.
```

### OpenAI Codex

Codex activates skills implicitly when the task matches the skill's `description`, or explicitly via `/skills`.

### VS Code (GitHub Copilot agent mode)

Skills in `.agents/skills/` are discovered automatically. Type `/skills` in the Copilot Chat panel to confirm they appear, then ask anything that matches a skill's description.

### Cursor / Windsurf / other agents without native skill support

Paste the contents of the relevant `SKILL.md` into the agent's system prompt or rules file (`.cursorrules`, `.windsurfrules`, etc.).

Steps marked *(Claude Code only)* in any skill can be skipped.

## Evals

Each skill has an `evals/evals.json` following the [agentskills.io evaluation format](https://agentskills.io/skill-creation/evaluating-skills). Each eval defines a prompt, expected outputs, and verifiable assertions — run with and without the skill to measure its impact.

```
spdd-canvas/evals/evals.json
spdd-implement/evals/evals.json
evals/workspace/             # gitignored — local results go here
```

See the [agentskills.io docs](https://agentskills.io/skill-creation/evaluating-skills) for the full workspace structure and grading format.

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

Instructions for the agent...
```

3. Push and create the symlink for your agent:

```bash
# Claude Code
ln -s ~/projects/edezacas-skills/skill-name ~/.claude/skills/skill-name

# Other agents (agentskills.io standard)
ln -s ~/projects/edezacas-skills/skill-name .agents/skills/skill-name
```
