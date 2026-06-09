# sample-app

## Overview
REST API de ejemplo con Express y PostgreSQL. Sirve como app de pruebas para el skill SPDD.

## Stack
- Node.js + TypeScript 5.3
- Express 4.18
- Prisma 5.10 (ORM) + PostgreSQL
- Zod (validación de schemas)
- pnpm 9.15

## Commands
```
pnpm dev          # servidor con hot-reload (ts-node-dev)
pnpm build        # compila a dist/
pnpm start        # ejecuta dist/index.js
pnpm db:generate  # genera Prisma client
pnpm db:push      # sincroniza schema sin migración
pnpm db:migrate   # crea migración y aplica
```

## Structure
```
src/
  index.ts          # entry point, monta Express
  routes/           # routers de Express por recurso
  services/         # lógica de negocio con Prisma
  middleware/       # auth y otros middlewares
prisma/
  schema.prisma     # modelos User, Session, enum Role
```

## Gotchas
- `DATABASE_URL` requerida en `.env` (ver `.env.example`).
- Prisma client debe regenerarse tras cambiar el schema: `pnpm db:generate`.
- No hay test runner configurado.
