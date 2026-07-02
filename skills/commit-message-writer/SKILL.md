---
name: commit-message-writer
description: "Write short, accurate Git commit messages in English. Use when the user says: commit karo, commit likho, changes commit karo, message likho, push karo, PR banao, ya koi bhi commit-related kaam ho. ALWAYS check the actual git diff first. ALWAYS write in English, even if the user speaks in Roman Urdu or any other language."
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

### Step 3 — If many files changed, split into logical groups

Check `git diff --name-only` or `git diff --staged --name-only`. If 5+ files changed across different concerns, group them:

| Group | Example files | Type |
|-------|--------------|------|
| New feature files | `feat-*.ts`, `api/*.ts` | `feat` |
| Bug fixes | `fix-*.ts` | `fix` |
| Styling/CSS | `*.css`, `*.scss`, tailwind classes | `style` |
| Refactoring | files where only structure changed | `refactor` |
| Config/build | `package.json`, `.gitignore`, configs | `chore` |
| Docs | `*.md`, `README`, comments | `docs` |

**How to split:**
1. Show user the groups you identified
2. For each group, `git add <files-in-group>` then `git commit` separately
3. If user says "sab ek saath karo", then one commit is fine

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
- **ALWAYS write in English** — even if user speaks in Roman Urdu, Hindi, or any other language
- One logical change = one commit. Don't bundle unrelated changes together

### Step 5 — Show user before committing

Show the plan (splits + messages) and ask: "Ye plan theek hai?" Wait for approval before running `git commit`.

## Examples

### User says in Roman Urdu:
> "yaar ma nay button ka color change kiya ha aur kuch extra space hataya ha"

### You write:
```
style(button): update color and remove extra spacing
```

### User says:
> "commit karo sab kuch"

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
Then ask: "Ye plan theek hai? Sab ek saath commit karein ya alag?"

### User says:
> "jo bhi changes hain commit kar do"

### You check diff, then:
```
refactor(api): clean up unused endpoints
```

## What NOT to do

- ❌ Long commit messages like "This commit adds a new feature for the login functionality which includes..."
- ❌ Fabricating changes you didn't see in the diff
- ❌ Writing commit messages in Roman Urdu ("button ka color change kiya")
- ❌ Writing "fix: fix some issues" — be specific about what was fixed
- ❌ Writing commit for files that haven't changed

## Expected Output

```
type(scope): short description (max 10 words)

Optional body (max 2 lines)
```

Always English. Always accurate. Always short.
