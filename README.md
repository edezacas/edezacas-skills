# Claude Skills

Skills compartidos del equipo para Claude Code. Se cargan automáticamente cuando Claude detecta que la tarea es relevante.

## Skills disponibles

| Skill | Descripción |
|---|---|
| `angular-conventions` | Convenciones obligatorias de Angular: `inject()`, `FormService`, `@Type`, signals, `takeUntilDestroyed` |
| `init-project` | Guía para crear y editar `CLAUDE.md` en cualquier proyecto |

## Instalación

### 1. Clona el repositorio

```bash
git clone git@github.com:edezacas/claude-skills.git ~/projects/claude-skills
```

### 2. Crea los symlinks

```bash
mkdir -p ~/.claude/skills
ln -s ~/projects/claude-skills/angular-conventions ~/.claude/skills/angular-conventions
ln -s ~/projects/claude-skills/init-project ~/.claude/skills/init-project
```

### 3. Añade la referencia en el `CLAUDE.md` de cada proyecto Angular

```markdown
## Gotchas
- **Angular conventions**: always load and follow the `angular-conventions` skill before writing any Angular code.
```

## Actualizar los skills

Cuando alguien actualice un skill, el resto del equipo solo necesita:

```bash
cd ~/projects/claude-skills && git pull
```

No hace falta recrear los symlinks.

## Añadir un nuevo skill

1. Crea una carpeta con el nombre del skill
2. Añade un `SKILL.md` con el siguiente formato:

```markdown
---
name: nombre-del-skill
description: Descripción de cuándo y cómo usarlo.
---

# Nombre del Skill

Instrucciones para Claude...
```

3. Haz push al repo
4. Cada miembro del equipo crea su symlink:

```bash
ln -s ~/projects/claude-skills/nombre-del-skill ~/.claude/skills/nombre-del-skill
```