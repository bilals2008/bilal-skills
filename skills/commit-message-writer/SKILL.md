---
name: commit-message-writer
description: "Write short, accurate Git commit messages in English. Use when the user asks to commit, create a PR, or write a commit message. ALWAYS check the actual git diff first. ALWAYS write the commit message in English regardless of what language the user speaks."
---

# Commit Message Writer

## Purpose

Write concise, accurate Git commit messages based on real file changes. Never fabricate. Never write long paragraphs.

## Instructions

### Step 1 — Read actual changes FIRST

Run this command immediately:

```bash
git diff --staged
```

If nothing is staged:
```bash
git diff
```

If still nothing:
```bash
git log --oneline -5
```

### Step 2 — Analyze changes

Look at:
- Which files changed
- What actually changed (added, removed, modified)
- The real diff content

**NEVER guess or fabricate changes.** Only write what you actually see in the diff.

### Step 3 — Group changes wisely (1-2 commits preferred)

Check `git diff --name-only` or `git diff --staged --name-only`.

**First try to fit into 1-2 commits.** If all changes are related (e.g., all in the same feature or all are small fixes), one commit is better than 4 unnecessary splits.

Split **only** when changes are clearly unrelated:
- A new feature AND a docs update AND a dependency change → 2-3 commits max
- All files in same component/feature → 1 commit

| Group | Example files | Type |
|-------|--------------|------|
| New feature files | `feat-*.ts`, `api/*.ts` | `feat` |
| Bug fixes | `fix-*.ts` | `fix` |
| Styling/CSS | `*.css`, `*.scss`, tailwind classes | `style` |
| Refactoring | files where only structure changed | `refactor` |
| Config/build | `package.json`, `.gitignore`, configs | `chore` |
| Docs | `*.md`, `README`, comments | `docs` |

**Decision guide:**
- All files in same feature/component? → **1 commit**
- One feature + some styling? → **1 commit** (feat: add feature and update styles)
- Feature + docs + package change? → **2-3 commits max**
- Only 2-4 files? → **1 commit** usually enough
- Many files with clearly different concerns? → **2-3 commits max**

**How to execute:**
1. Decide groups (aim for 1-2, max 3)
2. Show plan to user
3. Wait for approval
4. If user says "commit everything together", one commit for everything

**Example:** If `git diff --name-only` shows:
```
src/api/login.ts
src/api/logout.ts
src/styles/button.css
src/styles/form.css
README.md
package.json
```

Then propose 4 commits:
```
feat(api): add login and logout endpoints
style: update button and form styling
docs: update readme
chore: update package.json
```

### Step 4 — Write each commit message

Use this format (Conventional Commits):

```
<type>(<scope>): <short description>
```

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change without fix/feature |
| `style` | Formatting, CSS |
| `docs` | Documentation |
| `chore` | Build, deps, config |
| `perf` | Performance improvement |

Rules:
- **Short description: max 10 words, no period at end**
- Body (optional): max 2 lines, each line under 72 chars
- **ALWAYS write the commit message in English** — regardless of what language the user speaks (Urdu, Hindi, Chinese, Spanish, Arabic, etc.)
- One logical change = one commit. Don't bundle unrelated changes together

### Step 5 — Show user before committing

Show the plan (splits + messages) and wait for approval before running `git commit`.

## Examples

### User says:
> "I changed the button color and removed extra spacing"

### You write:
```
style(button): update color and remove extra spacing
```

### User says:
> "commit everything"

### You check diff, find files:
```
src/auth/login.ts
src/auth/register.ts
src/styles/button.css
README.md
```

### Propose:
```
1. feat(auth): add login and register pages
2. style: update button styling
3. docs: update readme
```

### User says:
> "commit all changes"

### You check diff, then:
```
refactor(api): clean up unused endpoints
```

## What NOT to do

- Long commit messages like "This commit adds a new feature for the login functionality which include..."
- Fabricating changes you didn't see in the diff
- Writing commit messages in any language other than English
- Writing "fix: fix some issues" — be specific about what was fixed
- Writing commit for files that haven't changed

## Expected Output

```
type(scope): short description (max 10 words)

Optional body (max 2 lines)
```

Always English. Always accurate. Always short.
