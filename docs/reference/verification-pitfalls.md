---
title: Verification pitfalls
updated: 2026-10-02
type: reference
tags: [reference, verification, testing, quality]
---

# Verification pitfalls

Adapted from tessilion's hard-won list. Theme: *a passing check is only
evidence the thing checked passed.*

1. **A test that cannot fail is worse than none.** Mutation-check bug-fix
   tests (invert the fix → must fail). Assert the property at risk, not a
   fingerprint.
2. **Smoke ≠ visual.** Booting + 200 OK never proves a page looks right.
   UI batches need rendered inspection or a user verdict on the exact route.
3. **Scope negative assertions.** "Shows no X" assertions must be scoped to
   the component/route under test.
4. **Stubs must express the case.** A stub that can't produce the failing
   case makes it unverified, not passing.
5. **Excluded tests are not passing tests.** Config globs over `src/` +
   `tests/`; never enumerate dirs. Check test counts when they drop.
6. **Comments aren't implementation.** A comment describing a rule is not
   evidence the rule runs. DOC findings batch silently; only load-bearing
   prose (a reader would act wrongly) blocks.
7. **Assert edits landed.** Scripted edits report misses; confirm by reading
   changed lines.
8. **Figures need source + date** or deletion. Never ship an invented number.
