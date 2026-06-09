---
description: Run all SPDD tests against tests/sample-app and record results in tests/spdd-test-results.md. No arguments needed.
---

## Date and time

!`date '+%Y-%m-%d %H:%M'`

## Instructions

You are a test runner for the SPDD skills. Execute all 8 tests from `tests/spdd-test-plan.md` against `tests/sample-app/`, evaluate each criterion, and write the results to `tests/spdd-test-results.md`.

Work through every test in order. Do not skip any. Announce each test before running it.

---

### SETUP

1. Read `tests/spdd-test-plan.md` to internalize all criteria.
2. Read `spdd/skills/canvas/SKILL.md`, `spdd/skills/canvas/template-reasons.md`, and `spdd/skills/implement/SKILL.md`.
3. Read the full source of `tests/sample-app/`: `CLAUDE.md`, `prisma/schema.prisma`, `src/index.ts`, `src/routes/users.ts`, `src/services/userService.ts`, `src/middleware/auth.ts`.
4. Clean state: remove `tests/sample-app/docs/` and `tests/sample-app/.claude/` if they exist.

---

### TEST 1 — canvas: guard

**Goal**: verify the skill stops and asks for a description when called with no arguments.

**How**: read `spdd/skills/canvas/SKILL.md`. Locate Step 1 (Guard). Verify it explicitly handles the case where `$ARGUMENTS` is empty and requires user input before proceeding.

**Criteria**:
- Does Step 1 check for empty arguments and stop? ✅/❌

Record result as PASS or FAIL with a one-line note quoting the exact guard logic you found (or its absence).

---

### TEST 2 — canvas: generation quality

**Goal**: verify the canvas generated for `login con magic link` uses real project paths and entities.

**How**: follow the instructions in `spdd/skills/canvas/SKILL.md` with:
- `$ARGUMENTS` = "login con magic link"
- Base directory = `tests/sample-app/`
- Save the canvas to `tests/sample-app/docs/prompts/SPDD-YYYY-MM-DD-magic-link-login.md`

Generate the canvas fully. Then evaluate each criterion:

1. **Real paths**: does the canvas use concrete file names (`prisma/schema.prisma`, `src/services/userService.ts`, `src/routes/users.ts`) instead of generic placeholders like `src/...`?
2. **Real stack**: does it reference actual entities (`User`, `Session`), ORM (Prisma), and framework (Express)?
3. **Minimal ⚠️ Confirm**: are `⚠️ Confirm:` lines used only for decisions that genuinely cannot be made without user input?
4. **Correct path**: is the file saved to `tests/sample-app/docs/prompts/SPDD-YYYY-MM-DD-magic-link-login.md`?
5. **Draft status**: does the canvas header say `**Status:** Draft`?

Record PASS if all 5 criteria pass. FAIL with a note for each criterion that failed.

---

### TEST 3 — canvas: hook installation

**Goal**: verify the hook is installed correctly and not duplicated.

**How**:
1. Verify `tests/sample-app/.claude/settings.local.json` does NOT exist or does not contain "SPDD" before installing.
2. Follow Step 7 of `spdd/skills/canvas/SKILL.md`: install the SPDD guard hook into `tests/sample-app/.claude/settings.local.json`.
3. Read the file and verify the JSON is valid and contains the hook command.
4. Run the installation step again and verify no duplicate hook is added.

**Criteria**:
1. Hook was installed (file exists, JSON is valid, contains the SPDD guard command)?
2. Running installation again does NOT produce a duplicate entry?

Record PASS if both criteria pass.

---

### TEST 4 — implement: stops on unresolved items

**Goal**: verify that `/spdd:implement` stops before writing code when the canvas has `⚠️ Confirm:` lines.

**How**:
1. Read the canvas generated in Test 2.
2. Ensure it has at least one `⚠️ Confirm:` line. If not, add one (e.g., `⚠️ Confirm: token expiry duration — default 15 minutes`).
3. Follow Step 1–3 of `spdd/skills/implement/SKILL.md` against the canvas.
4. Stop when you reach the `⚠️ Confirm:` check. Do NOT resolve or proceed past it. Do NOT write any code.

**Criteria**:
1. Does the skill logic stop at Step 3 when `⚠️ Confirm:` lines are present?
2. Does it list all unresolved items before asking the user?
3. Does it NOT set `Status: Confirmed` until they are resolved?

Record PASS/FAIL with specific observations.

---

### TEST 5 — implement: proceeds when all items are resolved

**Goal**: verify that `/spdd:implement` proceeds correctly when no `⚠️ Confirm:` lines remain.

**How**:
1. Edit the canvas from Test 2 to replace all `⚠️ Confirm:` lines with concrete resolved values.
2. Follow the full `spdd/skills/implement/SKILL.md` against `tests/sample-app/` — implement the magic link login feature completely (Prisma schema changes if needed, service, route, middleware).

**Criteria**:
1. Did the skill set `**Status:** Confirmed` before writing any code?
2. Did it follow sections in order (Entities → Structure → Operations → Norms → Safeguards)?
3. Did it write code without asking for confirmations?

Record PASS/FAIL with specific observations.

---

### TEST 6 — implement: divergence handling

**Goal**: verify the skill stops and explains when it discovers a discrepancy between the canvas and the actual code.

**How**: During the implementation in Test 5, look for any moment where the canvas description does not match reality in `tests/sample-app/` (e.g., a field name, a path, a missing model). If no natural divergence occurred, introduce one: temporarily edit the canvas to reference a field `magicToken` while the schema uses `token`, then observe the skill's behavior.

**Criteria**:
1. Did the skill stop when it found the discrepancy?
2. Did it explain the divergence clearly (what the canvas says vs. what the code has)?
3. Did it propose a concrete canvas update before resuming?

Record PASS/FAIL with what divergence was found and how it was handled.

---

### TEST 7 — feature documentation

**Goal**: verify the generated feature doc is readable and complete.

**How**: after Test 5 implementation, read `tests/sample-app/docs/features/magic-link-login.md`.

**Criteria** (evaluate each):
1. **File exists** at `tests/sample-app/docs/features/magic-link-login.md`?
2. **What it does** — readable by a non-developer? No technical jargon?
3. **Business rules** — are real constraints captured (e.g., token expiry, single-use, rate limiting) or is it vague?
4. **Flows** — does it describe step-by-step what happens when a user requests / uses a magic link?
5. **How it connects** — does it mention `User` and `Session` entities?
6. **Technical notes** — does it list the real files created/modified?

Record PASS if criteria 1, 2, 5, 6 pass. Note any gaps in 3 and 4 as warnings rather than failures (they require subjective judgment).

---

### TEST 8 — final state

**Goal**: verify the canvas is marked as implemented.

**How**: read the canvas at `tests/sample-app/docs/prompts/SPDD-YYYY-MM-DD-magic-link-login.md`.

**Criteria**:
1. Does the header say `**Status:** Implemented`?
2. Is there a `> Implemented: YYYY-MM-DD` line?
3. Run `cd tests/sample-app && pnpm build 2>&1 | tail -5` — does it compile without errors? (Mark as N/A if DB is unavailable, not FAIL.)

---

### RECORD RESULTS

After all 8 tests, write `tests/spdd-test-results.md`.

Initialize or append a new session block using this structure:

```
# SPDD Test Results

---

## Sesión YYYY-MM-DD HH:MM

### Test 1 — canvas: guard
**Resultado:** ✅ PASS / ❌ FAIL
> <specific observation>

### Test 2 — canvas: generation quality
**Resultado:** ✅ PASS / ❌ FAIL
> <list any failed criteria>

...
```

Then print a summary table:

| # | Test | Estado |
|---|------|--------|
| 1 | canvas — guard | ✅/❌ |
| 2 | canvas — generation quality | ✅/❌ |
| 3 | canvas — hook installation | ✅/❌ |
| 4 | implement — unresolved items | ✅/❌ |
| 5 | implement — no unresolved items | ✅/❌ |
| 6 | implement — divergence handling | ✅/❌ |
| 7 | implement — feature documentation | ✅/❌ |
| 8 | implement — final state | ✅/❌ |

End with a one-line verdict: overall PASS (all ✅) or FAIL (any ❌) with a count.
