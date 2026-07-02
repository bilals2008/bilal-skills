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

### Step 3 — Write the commit message

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
- One change = one commit. Don't bundle unrelated changes

### Step 4 — Show user before committing

Print the message and ask: "This commit message OK?" Wait for approval before running `git commit`.

## Examples

### User says in Roman Urdu:
> "yaar ma nay button ka color change kiya ha aur kuch extra space hataya ha"

### You write:
```
style(button): update color and remove extra spacing
```

### User says:
> "commit karo sab kuch"

### You check diff, then:
```
feat(auth): add login form validation
```

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
