import type { Skill } from "@/types/skill"

export const skills: Skill[] = [
  {
    slug: "typescript-best-practices",
    name: "TypeScript Best Practices",
    description: "Type-safe code patterns, strict mode configuration, branded types, discriminated unions, and performance optimization.",
    category: "TypeScript",
    tags: ["typescript", "type-safety", "strict-mode", "branded-types"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill typescript-best-practices",
    author: "bilals2008",
    skillContent: `# TypeScript Best Practices

Act as a TypeScript expert advisor. Provide guidance on writing type-safe, performant, and maintainable TypeScript code following community best practices and the official TypeScript team recommendations.

## Purpose

This skill helps AI agents produce high-quality TypeScript code that leverages the type system effectively while avoiding common pitfalls. It covers type system design, configuration optimization, performance patterns, and project structure.

## When to Use

- Writing new TypeScript files or modules
- Reviewing existing TypeScript code for type safety issues
- Refactoring JavaScript to TypeScript
- Configuring \`tsconfig.json\` for a project
- Designing type definitions or generic APIs
- Optimizing TypeScript build and compilation performance
- Debugging complex type errors
- Setting up strict mode and linting integration
- Working with union/discriminated union types
- Implementing advanced patterns (branded types, type guards, assertion functions)

## When NOT to Use

- Writing pure JavaScript code that will not be migrated to TypeScript
- Projects using a different type system (Flow, ReasonML)
- Simple type annotations that are obvious (the agent should already handle these)
- When the user explicitly asks for non-TypeScript solutions

## Instructions

### 1. Configuration First

Before writing code, ensure:

- \`strict: true\` is enabled in \`tsconfig.json\`. Without it, the type system is significantly weaker.
- \`noUncheckedIndexedAccess: true\` for safer object access.
- \`exactOptionalPropertyTypes: true\` for stricter optional property handling.
- \`verbatimModuleSyntax: true\` for consistent module syntax.

### 2. Type System Design

#### Prefer interfaces over type aliases for object shapes

Interfaces are more extensible and produce clearer error messages. Use \`type\` for unions, intersections, mapped types, and utility patterns.

\`\`\`typescript
// Prefer
interface User {
  id: string;
  name: string;
}

// Use type for
type Status = 'active' | 'inactive' | 'pending';
type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
\`\`\`

#### Use branded types for domain primitives

Prevent mixing up values that share the same underlying type but represent different concepts.

\`\`\`typescript
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function getUser(id: UserId): User { /* ... */ }
function getOrder(id: OrderId): Order { /* ... */ }

// TypeScript prevents: getUser(orderId)
\`\`\`

#### Leverage discriminated unions for state management

Model states explicitly so invalid states are unrepresentable.

\`\`\`typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function renderState(state: RequestState<User>) {
  switch (state.status) {
    case 'idle': return null;
    case 'loading': return <Spinner />;
    case 'success': return <UserProfile user={state.data} />;
    case 'error': return <ErrorMessage error={state.error} />;
  }
}
\`\`\`

#### Prefer type inference over explicit annotations

Let TypeScript infer types when the type is obvious from context. Add explicit annotations at module boundaries (function signatures, exported API surface).

\`\`\`typescript
// Good: inferred
const items = [1, 2, 3];

// Good: explicit at boundary
export function processItems(items: number[]): Result[] { /* ... */ }

// Unnecessary
const name: string = 'hello';
\`\`\`

### 3. Generics and Utility Types

#### Constrain generics with the minimal required shape

\`\`\`typescript
// Instead of
function clone<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }

// Prefer
function clone<T extends Record<string, unknown>>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }
\`\`\`

#### Use \`satisfies\` for type validation without widening

\`\`\`typescript
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;

// palette.red is number[] (not string | number[])
// palette.green is string (not string | number[])
\`\`\`

### 4. Strictness Patterns

#### Use \`as const\` for literal types and readonly tuples

\`\`\`typescript
const COLORS = ['red', 'green', 'blue'] as const;
type Color = (typeof COLORS)[number]; // 'red' | 'green' | 'blue'
\`\`\`

#### Prefer \`unknown\` over \`any\`

\`unknown\` forces type checking before use. Reserve \`any\` for migration scenarios only.

\`\`\`typescript
// Prefer
function parseJSON(input: string): unknown {
  return JSON.parse(input);
}

// Avoid
function parseJSON(input: string): any {
  return JSON.parse(input);
}
\`\`\`

#### Use type guards and assertion functions

\`\`\`typescript
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError('Expected string');
  }
}
\`\`\`

### 5. Performance Optimization

#### Prefer interfaces for object types

Interfaces are faster for the compiler to check than type aliases due to caching.

#### Avoid large union types

Break large unions (100+ members) into smaller, composable types. Consider using branded types or enums for finite sets.

#### Avoid excessive conditional types

Deeply nested conditional types slow down compilation. Prefer mapped types or lookup types when possible.

### 6. Error Handling

#### Use Result types for expected failures

\`\`\`typescript
type Result<T, E = Error> = { success: true; value: T } | { success: false; error: E };

function divide(a: number, b: number): Result<number> {
  if (b === 0) return { success: false, error: new Error('Division by zero') };
  return { success: true, value: a / b };
}
\`\`\`

#### Use typed \`try/catch\` with error handling

\`\`\`typescript
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof ApiError) {
    handleApiError(error);
  } else if (error instanceof NetworkError) {
    retry();
  } else {
    throw error;
  }
}
\`\`\`

## Examples

### Before (untyped)
\`\`\`typescript
function process(data) {
  return data.map(item => item.value);
}
\`\`\`

### After (type-safe)
\`\`\`typescript
interface DataItem {
  id: string;
  value: number;
}

function process(data: DataItem[]): number[] {
  return data.map(item => item.value);
}
\`\`\`

### API Response Handling
\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  timestamp: string;
  version: number;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  if (!response.ok) throw new ApiError(response.status, await response.text());
  return response.json();
}
\`\`\`

## Best Practices

- Enable \`strict: true\` in every project. This catches the majority of type errors.
- Use \`@ts-expect-error\` instead of \`@ts-ignore\` when you must suppress an error. \`@ts-expect-error\` will warn you if the error is no longer relevant, while \`@ts-ignore\` silently suppresses forever.
- Keep functions small and focused. TypeScript's type inference works best with small, pure functions.
- Prefer \`interface\` over \`type\` for public API shapes. Interfaces are more extensible and produce better editor tooling.
- Use \`const\` assertions for constant tuples and configurations.
- Export types that consumers of your library or module need.
- Write unit tests for your type definitions using \`expectTypeOf\` from \`vitest\` or \`ts-expect\`.

## Common Mistakes

- **Using \`any\` instead of \`unknown\`**: \`any\` disables type checking entirely. Always prefer \`unknown\` and narrow the type before use.
- **Over-using type assertions (\`as\`)**: Type assertions hide type errors. Prefer type guards and constructor functions.
- **Missing \`strict: true\`**: Without strict mode, TypeScript misses null checks, implicit any, and other common errors.
- **Complex generic signatures**: If a generic type signature is hard to read, it is probably too complex. Break it down or use simpler patterns.
- **Ignoring \`noUncheckedIndexedAccess\`**: Accessing object properties without checking for \`undefined\` leads to runtime errors.
- **Defining types in the same file as implementation**: Keep type definitions in separate \`.types.ts\` files for better organization.

## Expected Output

When this skill is triggered, the agent should produce:

1. Type-safe code with proper annotations at module boundaries
2. Fully configured \`tsconfig.json\` with strict mode enabled
3. Discriminated unions for state management where applicable
4. Branded types for domain primitives to prevent type confusion
5. Proper error handling with typed error variants
6. Clean, readable generics constrained to the minimum required shape
7. Inline documentation only where the type signature is non-obvious

## Limitations

- This skill does not cover runtime validation libraries like Zod or Yup (consider installing a separate skill for those).
- This skill does not cover framework-specific TypeScript patterns for React, Next.js, or Angular.
- TypeScript compilation performance depends on project size; this skill provides general guidance but cannot fix inherent scalability limits of the TypeScript compiler.
- Some pattern recommendations may conflict with existing codebase conventions; always respect the project's established style.`,
  },
  {
    slug: "react-shadcn-ui-expert",
    name: "React + Shadcn UI Expert",
    description: "Build modern React applications with Vite, TypeScript, Tailwind CSS v4, and shadcn/ui components.",
    category: "React",
    tags: ["react", "shadcn-ui", "tailwind", "vite"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill react-shadcn-ui-expert",
    author: "bilals2008",
    skillContent: `# React + Shadcn UI Expert

## Purpose

This skill helps AI agents generate modern React applications using the latest best practices.

## Use this skill when

- Building React applications
- Creating UI components
- Designing dashboards
- Building forms
- Creating responsive layouts
- Using shadcn/ui
- Using Tailwind CSS v4
- Working with TypeScript

## Do NOT use this skill when

- Using Vue
- Using Angular
- Using Flutter
- Using React Native

## Rules

Always:

- Use TypeScript
- Use functional components
- Use React hooks
- Use Tailwind CSS v4
- Use shadcn/ui components
- Use accessible HTML
- Keep components reusable
- Avoid unnecessary re-renders
- Follow clean folder structure

Never:

- Use inline CSS
- Use deprecated React APIs
- Create huge components
- Duplicate code

## Folder Structure

src/
components/
hooks/
lib/
pages/
types/
utils/

## Output Requirements

Generated code should:

- Be production ready
- Be typed
- Be readable
- Include comments only when necessary
- Follow React best practices`,
  },
  {
    slug: "commit-message-writer",
    name: "Commit Message Writer",
    description: "Write short, accurate Git commit messages in English following Conventional Commits format.",
    category: "Workflow",
    tags: ["git", "commits", "conventional-commits", "workflow"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill commit-message-writer",
    author: "bilals2008",
    skillContent: `# Commit Message Writer

## Purpose

Write concise, accurate Git commit messages based on real file changes. Never fabricate. Never write long paragraphs.

## Instructions

### Step 1 — Read actual changes FIRST

Run this command immediately:

\`\`\`bash
git diff --staged
\`\`\`

If nothing is staged:
\`\`\`bash
git diff
\`\`\`

If still nothing:
\`\`\`bash
git log --oneline -5
\`\`\`

### Step 2 — Analyze changes

Look at:
- Which files changed
- What actually changed (added, removed, modified)
- The real diff content

**NEVER guess or fabricate changes.** Only write what you actually see in the diff.

### Step 3 — Group changes wisely (1-2 commits preferred)

Check \`git diff --name-only\` or \`git diff --staged --name-only\`.

**First try to fit into 1-2 commits.** If all changes are related (e.g., all in the same feature or all are small fixes), one commit is better than 4 unnecessary splits.

Split **only** when changes are clearly unrelated:
- A new feature AND a docs update AND a dependency change → 2-3 commits max
- All files in same component/feature → 1 commit

| Group | Example files | Type |
|-------|--------------|------|
| New feature files | \`feat-*.ts\`, \`api/*.ts\` | \`feat\` |
| Bug fixes | \`fix-*.ts\` | \`fix\` |
| Styling/CSS | \`*.css\`, \`*.scss\`, tailwind classes | \`style\` |
| Refactoring | files where only structure changed | \`refactor\` |
| Config/build | \`package.json\`, \`.gitignore\`, configs | \`chore\` |
| Docs | \`*.md\`, \`README\`, comments | \`docs\` |

**Decision guide:**
- Sab files ek hi feature/component mein hain? → **1 commit**
- Ek feature + kuch styling? → **1 commit** (feat: add feature and update styles)
- Feature + docs + package change? → **2-3 commits max**
- Sirf 2-4 files hain? → **1 commit** usually enough
- Zayada files hain aur clearly different concerns? → **2-3 commits max**

**How to execute:**
1. Decide groups (aim for 1-2, max 3)
2. Show plan to user: "Ye plan theek hai?"
3. Wait for approval
4. If user says "sab ek saath karo", one commit for everything

### Step 4 — Write each commit message

Use this format (Conventional Commits):

\`\`\`
<type>(<scope>): <short description>
\`\`\`

| Type | When to use |
|------|-------------|
| \`feat\` | New feature |
| \`fix\` | Bug fix |
| \`refactor\` | Code change without fix/feature |
| \`style\` | Formatting, CSS |
| \`docs\` | Documentation |
| \`chore\` | Build, deps, config |
| \`perf\` | Performance improvement |

Rules:
- **Short description: max 10 words, no period at end**
- Body (optional): max 2 lines, each line under 72 chars
- **ALWAYS write the commit message in English** — regardless of what language the user speaks (Urdu, Hindi, Chinese, Spanish, Arabic, etc.)
- One logical change = one commit. Don't bundle unrelated changes together

### Step 5 — Show user before committing

Show the plan (splits + messages) and ask: "Ye plan theek hai?" Wait for approval before running \`git commit\`.

## Examples

### User says in Roman Urdu:
> "yaar ma nay button ka color change kiya ha aur kuch extra space hataya ha"

### You write:
\`\`\`
style(button): update color and remove extra spacing
\`\`\`

### User says:
> "commit karo sab kuch"

### You check diff, find files:
\`\`\`
src/auth/login.ts
src/auth/register.ts
src/styles/button.css
README.md
\`\`\`

### Propose:
\`\`\`
1. feat(auth): add login and register pages
2. style: update button styling
3. docs: update readme
\`\`\`
Then ask: "Ye plan theek hai? Sab ek saath commit karein ya alag?"

## What NOT to do

- ❌ Long commit messages like "This commit adds a new feature for the login functionality which includes..."
- ❌ Fabricating changes you didn't see in the diff
- ❌ Writing commit messages in Roman Urdu ("button ka color change kiya")
- ❌ Writing "fix: fix some issues" — be specific about what was fixed
- ❌ Writing commit for files that haven't changed

## Expected Output

\`\`\`
type(scope): short description (max 10 words)

Optional body (max 2 lines)
\`\`\`

Always English. Always accurate. Always short.`,
  },
  {
    slug: "git-leak-prevention",
    name: "Git Leak Prevention",
    description: "Scan repositories for sensitive files (.env, secrets, API keys, build artifacts) and auto-fix .gitignore.",
    category: "Security",
    tags: ["security", "git", "secrets", "gitignore"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill git-leak-prevention",
    author: "bilals2008",
    skillContent: `# Git Leak Prevention

## Purpose

Prevent sensitive files, secrets, and build artifacts from being pushed to GitHub. Scan, detect, and auto-fix .gitignore.

## Instructions

### Step 1 — Scan for sensitive files

Run this command to find files that should NOT be on GitHub:

\`\`\`bash
git ls-files | findstr /i ".env .env.local .env.production .env.staging node_modules dist build releases *.key *.pem *.p12 secrets"
\`\`\`

On PowerShell:
\`\`\`powershell
git ls-files | Select-String -Pattern "\\.env|node_modules|dist|build|releases|\\.key$|\\.pem$|\\.p12$|secrets|\\.log$|\\.cache$"
\`\`\`

Also check for untracked sensitive files:
\`\`\`bash
git status --porcelain
\`\`\`

### Step 2 — Check common sensitive patterns

Look for these patterns in tracked files:

| Pattern | Risk | Action |
|---------|------|--------|
| \`.env\` / \`.env.*\` | API keys, DB passwords | Remove from git + add to .gitignore |
| \`node_modules/\` | Dependencies (huge, not needed) | Remove + .gitignore |
| \`dist/\` / \`build/\` | Compiled output | Remove + .gitignore |
| \`releases/\` | Binary releases | Remove + .gitignore |
| \`*.key\` / \`*.pem\` | Private keys | Remove + .gitignore |
| \`*.p12\` / \`*.pfx\` | Certificates | Remove + .gitignore |
| \`.DS_Store\` | macOS metadata | .gitignore |
| \`Thumbs.db\` | Windows metadata | .gitignore |
| \`*.log\` | Log files | .gitignore |
| \`.cache/\` | Cache folders | .gitignore |
| \`coverage/\` | Test coverage | .gitignore |
| \`.turbo/\` / \`.next/\` | Build caches | .gitignore |

### Step 3 — Check for secrets in code

Search for hardcoded secrets in tracked files:

\`\`\`powershell
rg -i "(api[_-]?key|secret|password|token|private[_-]?key)\\s*[:=]\\s*['\\x22]" --type-add 'code:*.{ts,tsx,js,jsx,json,yaml,yml,env,config}' -t code
\`\`\`

Look for patterns like:
- \`API_KEY=sk-...\`
- \`SECRET=...\`
- \`PASSWORD=...\`
- \`PRIVATE_KEY-----BEGIN\`
- \`token: "eyJ..."\`

### Step 4 — Auto-fix .gitignore

If sensitive files are found, automatically update \`.gitignore\`. Standard .gitignore for web projects:

\`\`\`gitignore
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
\`\`\`

### Step 5 — Remove sensitive files from git tracking (if already tracked)

If sensitive files are already tracked:

\`\`\`bash
# Remove from tracking but keep locally
git rm --cached .env
git rm --cached -r node_modules/
git rm --cached -r dist/
git rm --cached -r build/

# Then add to .gitignore
\`\`\`

**WARNING:** If secrets were pushed to GitHub, they are compromised. The user should:
1. Rotate all exposed keys/secrets immediately
2. Never use the same secrets again

### Step 6 — Show report to user

Present findings clearly:

\`\`\`
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
\`\`\`

### Step 7 — Commit the fix

\`\`\`bash
git add .gitignore
git commit -m "chore(security): update gitignore to prevent secret leaks"
\`\`\`

## What NOT to do

- ❌ Never show actual secret values in the report (mask them: \`sk-****...****\`)
- ❌ Never commit .env or secrets even for "temporary" reasons
- ❌ Never ignore the warning if secrets were already pushed
- ❌ Never skip checking \`git ls-files\` — untracked files are fine, tracked ones are the risk

## Expected Output

A clean security report showing:
1. What was found at risk
2. What was fixed automatically
3. What the user needs to do manually (rotate keys)`,
  }
]

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug)
}

export function getSkillsByCategory(): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )
}

export function getCategories(): string[] {
  return [...new Set(skills.map((s) => s.category))]
}
