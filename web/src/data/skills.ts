import type { Skill } from "@/types/skill"
import typescriptBestPractices from "../../../skills/typescript-best-practices/SKILL.md?raw"
import reactShadcnUiExpert from "../../../skills/react-shadcn-ui-expert/SKILL.md?raw"
import commitMessageWriter from "../../../skills/commit-message-writer/SKILL.md?raw"
import gitLeakPrevention from "../../../skills/git-leak-prevention/SKILL.md?raw"

export const skills: Skill[] = [
  {
    slug: "typescript-best-practices",
    name: "TypeScript Best Practices",
    description: "Type-safe code patterns, strict mode configuration, branded types, discriminated unions, and performance optimization.",
    category: "TypeScript",
    tags: ["typescript", "type-safety", "strict-mode", "branded-types"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill typescript-best-practices",
    author: "bilals2008",
    skillContent: typescriptBestPractices,
    examples: [
      {
        title: "Branded Types for IDs",
        description: "Create type-safe IDs that can't be accidentally swapped.",
        code: `type UserId = string & { readonly __brand: unique symbol }
type OrderId = string & { readonly __brand: unique symbol }

function createUserId(id: string): UserId {
  return id as UserId
}

function getUser(id: UserId) { /* ... */ }

const userId = createUserId("usr_123")
const orderId = createUserId("ord_456") // Type error: wrong brand

getUser(userId)   // ✅ Works
getUser(orderId)  // ❌ Type error`,
        language: "typescript",
      },
      {
        title: "Discriminated Unions",
        description: "Use union types with a common discriminant for exhaustive pattern matching.",
        code: `type Result<T> =
  | { status: "ok"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" }

function handleResult(result: Result<User>) {
  switch (result.status) {
    case "ok":
      console.log(result.data.name)   // ✅ data exists
      break
    case "error":
      console.error(result.error)     // ✅ error exists
      break
    case "loading":
      showSpinner()                   // ✅ no payload
      break
  }
}`,
        language: "typescript",
      },
    ],
  },
  {
    slug: "react-shadcn-ui-expert",
    name: "React + Shadcn UI Expert",
    description: "Build modern React applications with Vite, TypeScript, Tailwind CSS v4, and shadcn/ui components.",
    category: "React",
    tags: ["react", "shadcn-ui", "tailwind", "vite"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill react-shadcn-ui-expert",
    author: "bilals2008",
    skillContent: reactShadcnUiExpert,
    examples: [
      {
        title: "Reusable Dialog Component",
        description: "Create a confirmation dialog with shadcn/ui primitives.",
        code: `import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
        language: "tsx",
      },
      {
        title: "Form with Validation",
        description: "Build a validated form using react-hook-form and zod.",
        code: `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name too short"),
})

export function SignupForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register("name")} placeholder="Name" />
      <Input {...form.register("email")} placeholder="Email" />
      <Button type="submit">Sign up</Button>
    </form>
  )
}`,
        language: "tsx",
      },
    ],
  },
  {
    slug: "commit-message-writer",
    name: "Commit Message Writer",
    description: "Write short, accurate Git commit messages in English following Conventional Commits format.",
    category: "Workflow",
    tags: ["git", "commits", "conventional-commits", "workflow"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill commit-message-writer",
    author: "bilals2008",
    skillContent: commitMessageWriter,
    examples: [
      {
        title: "Feature Commit",
        description: "Adding a new feature with proper format.",
        code: `feat(auth): add OAuth2 login with Google

Implements Google OAuth2 flow using passport.js.
Includes token refresh and session management.`,
        language: "text",
      },
      {
        title: "Bug Fix Commit",
        description: "Fixing a bug with context about what was wrong.",
        fix: `fix(api): prevent race condition in user creation

Use database transaction to ensure email uniqueness check
and insert happen atomically. Previously, two concurrent
requests could both pass the uniqueness check.`,
        language: "text",
      },
    ],
  },
  {
    slug: "git-leak-prevention",
    name: "Git Leak Prevention",
    description: "Scan repositories for sensitive files (.env, secrets, API keys, build artifacts) and auto-fix .gitignore.",
    category: "Security",
    tags: ["security", "git", "secrets", "gitignore"],
    installCmd: "npx skills add bilals2008/bilal-skills --skill git-leak-prevention",
    author: "bilals2008",
    skillContent: gitLeakPrevention,
    examples: [
      {
        title: "Auto-fix .gitignore",
        description: "Scan and automatically add missing patterns to .gitignore.",
        code: `# The skill scans your repo and suggests additions:

Scanning: 3 sensitive files found
  - .env (secrets)
  - dist/ (build artifacts)
  - *.log (logs)

Suggested .gitignore additions:
  .env
  .env.*
  dist/
  *.log
  node_modules/

Apply changes? [Y/n]`,
        language: "text",
      },
      {
        title: "Pre-commit Hook",
        description: "Block commits containing secrets.",
        code: `#!/bin/bash
# .git/hooks/pre-commit

# Scan staged files for secrets
if git secrets --scan --cached 2>/dev/null; then
  echo "❌ Secrets detected in staged files!"
  echo "Use 'git secrets --remove' to unstage secrets."
  exit 1
fi

echo "✅ No secrets found"`
        language: "bash",
      },
    ],
  },
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

export function getSkillsByAuthor(author: string): Skill[] {
  return skills.filter((s) => s.author === author)
}

export function getAuthors(): string[] {
  return [...new Set(skills.map((s) => s.author))]
}
