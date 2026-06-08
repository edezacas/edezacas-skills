# Claude Skills

Team shared skills for Claude Code. Loaded automatically when Claude detects the task is relevant.

## Available skills

| Skill | Commands | Description |
|---|---|---|
| `angular-conventions` | automatic | Mandatory Angular conventions: `inject()`, `FormService`, `@Type`, signals, `takeUntilDestroyed` |
| `init-project` | automatic | Guide for creating and editing `CLAUDE.md` in any project |
| `spdd` | `/spdd:canvas`, `/spdd:implement` | Structured Prompt-Driven Development: generates and executes REASONS canvas before writing code |

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:edezacas/claude-skills.git ~/projects/claude-skills
```

### 2. Create symlinks

```bash
mkdir -p ~/.claude/skills

ln -s ~/projects/claude-skills/angular-conventions ~/.claude/skills/angular-conventions
ln -s ~/projects/claude-skills/init-project ~/.claude/skills/init-project
ln -s ~/projects/claude-skills/spdd ~/.claude/skills/spdd
```

### 3. Restart Claude Code

Plugins (`spdd`) require a restart to load the first time. Simple skills are detected on the fly.

## Using the SPDD skill

> Based on [Structured Prompt-Driven Development](https://martinfowler.com/articles/structured-prompt-driven/) by Martin Fowler.


Before implementing any new feature:

```
/spdd:canvas magic link authentication
```

Claude generates a REASONS canvas at `docs/prompts/SPDD-YYYY-MM-DD-slug.md` with the feature design adapted to the project stack.

Once the canvas is reviewed:

```
/spdd:implement
```

Claude reads the canvas, checks for unresolved decisions (`⚠️ Confirm:`), implements step by step, and updates the canvas if anything diverges during development.

## Updating skills

When someone updates a skill, the rest of the team only needs:

```bash
cd ~/projects/claude-skills && git pull
```

No need to recreate the symlinks.

## Adding a new skill

### Simple skill

1. Create a folder with the skill name
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
ln -s ~/projects/claude-skills/skill-name ~/.claude/skills/skill-name
```

### Plugin (multiple commands with namespace)

1. Create a folder with the plugin name
2. Add `.claude-plugin/plugin.json`:

```json
{
  "name": "plugin-name",
  "displayName": "Plugin Name",
  "description": "Brief description."
}
```

3. Create skills in `skills/<name>/SKILL.md` — commands will be available as `/plugin-name:name`
4. Push and create the symlink:

```bash
ln -s ~/projects/claude-skills/plugin-name ~/.claude/skills/plugin-name
```
