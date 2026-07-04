import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ContributingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to skills
      </Link>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight font-serif text-primary">
          Contributing
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Want to add your own skills to the collection? Here's how.
        </p>
      </header>

      <Separator className="mb-8" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">Skill Structure</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Each skill is a folder inside <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono">skills/</code> with
          a <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono">SKILL.md</code> file
          containing YAML frontmatter and instructions.
        </p>
        <div className="rounded-md border bg-card px-4 py-3 font-mono text-sm">
          <pre className="text-foreground">{`skills/
  my-skill/
    SKILL.md`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">SKILL.md Format</h2>
        <div className="rounded-md border bg-card px-4 py-3 font-mono text-sm">
          <pre className="text-foreground">{`---
name: My Skill
description: What this skill does.
---

# Instructions

Your skill instructions go here...
`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">Steps</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">1.</span>
            <span>Fork bilal-skills from GitHub to your account.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">2.</span>
            <span>Add a new folder under <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-mono">skills/</code> with your SKILL.md file.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">3.</span>
            <span>Add your skill to the groups array in <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-mono">skills.sh.json</code>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">4.</span>
            <span>Push your changes and create a pull request. We'll review it quickly.</span>
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">Guidelines</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Keep instructions clear and concise</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Use the latest skills.sh specification</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Include a descriptive name and description in YAML frontmatter</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>One skill per folder</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>No secrets, API keys, or sensitive data in skill files</span>
          </li>
        </ul>
      </section>

      <Button asChild>
        <a href="https://github.com/bilals2008/bilal-skills" target="_blank" rel="noreferrer">
          View on GitHub →
        </a>
      </Button>
    </div>
  )
}
