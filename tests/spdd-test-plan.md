# SPDD Test Plan

Pick a real project with a small feature to implement. Run each check and note the result.

---

## 1. canvas — guard

```
/spdd:canvas
```

- [ ] Stops and asks for a feature description before continuing

---

## 2. canvas — generation quality

```
/spdd:canvas login con magic link
```

- [ ] Generates real project paths, not generic placeholders like `src/...`
- [ ] Uses the actual stack (entities, ORM, framework)
- [ ] Marks with `⚠️ Confirm:` only decisions it genuinely cannot take alone
- [ ] File saved at `docs/prompts/SPDD-YYYY-MM-DD-magic-link-login.md`
- [ ] Status is `Draft` in the header

---

## 3. canvas — hook installation

Run `/spdd:canvas` on a project where `.claude/settings.local.json` does not have the SPDD hook yet.

- [ ] Asks for permission before modifying the file
- [ ] Adds the hook correctly (open the file and verify the JSON is valid)
- [ ] Running canvas again does not add a duplicate hook

---

## 4. implement — unresolved items

Open the canvas and leave at least one `⚠️ Confirm:` line unresolved. Then run:

```
/spdd:implement
```

- [ ] Stops before writing any code
- [ ] Lists every `⚠️ Confirm:` line clearly
- [ ] Resolves them one by one and updates the canvas
- [ ] Sets `Status: Confirmed` before proceeding

---

## 5. implement — no unresolved items

Resolve all `⚠️ Confirm:` items manually in the canvas. Then run `/spdd:implement`.

- [ ] Does not ask for confirmations (there are none)
- [ ] Still sets `Status: Confirmed` before proceeding
- [ ] Follows the canvas sections in order (Entities → Structure → Operations → Norms → Safeguards)

---

## 6. implement — divergence handling

During implementation, the canvas will likely have something slightly off (a field name, a path, a relationship). Observe:

- [ ] Stops when it finds a discrepancy instead of silently continuing
- [ ] Explains the divergence clearly
- [ ] Proposes a concrete canvas update
- [ ] Resumes after confirmation

---

## 7. implement — feature documentation

After implementation completes, open `docs/features/SLUG.md` and evaluate:

- [ ] File exists at the correct path
- [ ] **What it does** — is it readable by a non-developer?
- [ ] **Business rules** — are the actual rules of the feature captured, or is it vague?
- [ ] **Flows** — does it describe what happens step by step?
- [ ] **How it connects** — does it mention the right related features/entities?
- [ ] **Technical notes** — are the key files listed correctly?

**Critical test**: give the doc to someone on the team who didn't participate in the development. Ask them if they understand what the feature does and what its business rules are. If they don't, the doc is not good enough.

---

## 8. implement — final state

- [ ] Canvas status is `Implemented`
- [ ] `> Implemented: YYYY-MM-DD` line is present in the canvas
- [ ] Tests ran and passed (or failures were fixed before completing)

---

## Notes

Write down anything unexpected that happened during the tests — steps that were skipped, wrong output, confusing behavior. These will be useful to improve the skill.
