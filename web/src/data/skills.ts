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
