---
description: Record the result of a SPDD test from tests/spdd-test-plan.md. Usage: /tests-record <N> <pass|fail> [notes]
---

## Date and time

!`date '+%Y-%m-%d %H:%M'`

## Instructions

Record the result of a SPDD test. Arguments: $ARGUMENTS

### Step 1 — Guard

Parse `$ARGUMENTS` as: `<number> <pass|fail> [notes...]`

- `number`: integer 1–8
- `pass|fail`: literal "pass" or "fail" (case-insensitive)
- `notes`: everything after pass/fail, optional

If `number` or `pass|fail` is missing or invalid, stop and ask the user before continuing.

### Step 2 — Read the test plan

Read `tests/spdd-test-plan.md`. Find the section heading for test N (e.g. `## 1.`, `## 2.`, etc.) and extract its title (the text after the number and dash).

### Step 3 — Read or create the results file

Try to read `tests/spdd-test-results.md`.

If it does not exist, create it with this exact content:

```
# SPDD Test Results

```

### Step 4 — Locate or create today's session block

Look for a line `## Sesión YYYY-MM-DD` matching today's date.

If none exists, append a new session block at the end of the file:

```
---

## Sesión YYYY-MM-DD

```

### Step 5 — Write the test result

Within today's session block, look for an existing entry `### Test N —`. If found, replace the entire entry. If not, append it inside the session block.

Use this format:

For PASS:
```
### Test N — <title>
**Resultado:** ✅ PASS — YYYY-MM-DD HH:MM
> <notes, or "sin notas" if none provided>
```

For FAIL:
```
### Test N — <title>
**Resultado:** ❌ FAIL — YYYY-MM-DD HH:MM
> <notes, or "sin notas" if none provided>
```

### Step 6 — Print summary

After saving, read the full results file and print a compact status table for all 8 tests:

| # | Test | Estado |
|---|------|--------|
| 1 | canvas — guard | ✅ / ❌ / ⏳ |
| … | … | … |

Use ⏳ for tests with no result in any session. Use the most recent session's result for tests that appear in multiple sessions.
