# edezacas Skills

Shared AI skills for the team. Each skill is a directory with a `SKILL.md` file following the agentskills.io format.

## Stack
- Skills: Markdown (`SKILL.md`) — no build step

## Structure
```
angular-conventions/SKILL.md     # Angular patterns — triggers automatically
init-project/SKILL.md            # CLAUDE.md creation guide — triggers automatically
spdd-canvas/SKILL.md             # REASONS canvas generator — /spdd-canvas
spdd-implement/SKILL.md          # Canvas-driven implementer — /spdd-implement
docs/prompts/                    # Generated SPDD canvases (SPDD-YYYY-MM-DD-slug.md)
docs/features/                   # Generated feature docs (one per implemented canvas)
```

## Conventions
- `SKILL.md` files are pure Markdown — no agent-specific syntax
- Steps marked *(Claude Code only)* use Claude Code hooks — skip them in other agents
- Canvas files follow the naming pattern `SPDD-YYYY-MM-DD-slug.md`
- Unresolved canvas items are marked `⚠️ Confirm:` and must be resolved before implementation

## Gotchas
- `evals/workspace/` is gitignored; eval results stay local
- `docs/prompts/` canvases with `Status: Draft` or `Status: Confirmed` are works in progress
