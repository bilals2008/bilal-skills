---
name: git-leak-prevention
description: "Scan repositories for sensitive files (.env, secrets, API keys, build artifacts, node_modules, dist, releases) before pushing to GitHub. Automatically fix .gitignore to prevent leaks. Use when the user asks to check for secrets, scan for leaks, fix gitignore, or perform any security-related task."
---

# Git Leak Prevention

## Purpose

Prevent sensitive files, secrets, and build artifacts from being pushed to GitHub. Scan, detect, and auto-fix .gitignore.

## Instructions

### Step 1 — Scan for sensitive files

Run this command to find files that should NOT be on GitHub:

```bash
git ls-files | findstr /i ".env .env.local .env.production .env.staging node_modules dist build releases *.key *.pem *.p12 secrets"
```

On PowerShell:
```powershell
git ls-files | Select-String -Pattern "\.env|node_modules|dist|build|releases|\.key$|\.pem$|\.p12$|secrets|\.log$|\.cache$"
```

Also check for untracked sensitive files:
```bash
git status --porcelain
```

### Step 2 — Check common sensitive patterns

Look for these patterns in tracked files:

| Pattern | Risk | Action |
|---------|------|--------|
| `.env` / `.env.*` | API keys, DB passwords | Remove from git + add to .gitignore |
| `node_modules/` | Dependencies (huge, not needed) | Remove + .gitignore |
| `dist/` / `build/` | Compiled output | Remove + .gitignore |
| `releases/` | Binary releases | Remove + .gitignore |
| `*.key` / `*.pem` | Private keys | Remove + .gitignore |
| `*.p12` / `*.pfx` | Certificates | Remove + .gitignore |
| `.DS_Store` | macOS metadata | .gitignore |
| `Thumbs.db` | Windows metadata | .gitignore |
| `*.log` | Log files | .gitignore |
| `.cache/` | Cache folders | .gitignore |
| `coverage/` | Test coverage | .gitignore |
| `.turbo/` / `.next/` | Build caches | .gitignore |
| `*.sql` | Database dumps (sometimes secrets) | Check content |

### Step 3 — Check for secrets in code

Search for hardcoded secrets in tracked files:

```powershell
rg -i "(api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]\s*['\x22]" --type-add 'code:*.{ts,tsx,js,jsx,json,yaml,yml,env,config}' -t code
```

Look for patterns like:
- `API_KEY=sk-...`
- `SECRET=...`
- `PASSWORD=...`
- `PRIVATE_KEY-----BEGIN`
- `token: "eyJ..."`

### Step 4 — Auto-fix .gitignore

If sensitive files are found, automatically update `.gitignore`:

```bash
# Check current .gitignore
cat .gitignore
```

Add missing entries. Standard .gitignore for web projects:

```gitignore
# Environment files
.env
.env.local
.env.production
.env.staging
.env.development

# Dependencies
node_modules/

# Build output
dist/
build/
release/
releases/

# Secrets
*.key
*.pem
*.p12
*.pfx

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Cache
.cache/
.turbo/
.next/
.nuxt/

# Coverage
coverage/

# Misc
*.swp
*.swo
```

### Step 5 — Remove sensitive files from git tracking (if already tracked)

If sensitive files are already tracked:

```bash
# Remove from tracking but keep locally
git rm --cached .env
git rm --cached -r node_modules/
git rm --cached -r dist/
git rm --cached -r build/

# Then add to .gitignore
```

**WARNING:** If secrets were pushed to GitHub, they are compromised. The user should:
1. Rotate all exposed keys/secrets immediately
2. Never use the same secrets again

### Step 6 — Show report to user

Present findings clearly:

```
🔍 Security Scan Report

Files at risk:
  ❌ .env — tracked (contains secrets)
  ❌ node_modules/ — tracked (should be ignored)
  ⚠️ dist/ — tracked (build output)

Actions taken:
  ✅ Added .env to .gitignore
  ✅ Added node_modules/ to .gitignore
  ✅ Added dist/ to .gitignore
  ✅ Removed .env from git tracking (kept locally)

⚠️ If .env had real secrets, ROTATE them now.
   GitHub history still has the old version.
```

### Step 7 — Commit the fix

```bash
git add .gitignore
git commit -m "chore(security): update gitignore to prevent secret leaks"
```

## What NOT to do

- ❌ Never show actual secret values in the report (mask them: `sk-****...****`)
- ❌ Never commit .env or secrets even for "temporary" reasons
- ❌ Never ignore the warning if secrets were already pushed
- ❌ Never skip checking `git ls-files` — untracked files are fine, tracked ones are the risk

## Expected Output

A clean security report showing:
1. What was found at risk
2. What was fixed automatically
3. What the user needs to do manually (rotate keys)
