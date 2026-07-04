import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { skills } from "@/data/skills"

const categories = [...new Set(skills.map((s) => s.category))]

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to skills
      </Link>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight font-serif text-primary">About</h1>
        <p className="text-muted-foreground leading-relaxed">
          bilal-skills is a collection of AI agent skills designed to help developers
          write better code, follow best practices, and ship faster.
        </p>
      </header>

      <Separator className="mb-8" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">What are Skills?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Skills are reusable instruction sets that AI agents can use to understand your
          project's conventions and generate code that matches your style. They act as
          shared knowledge between you and your AI coding assistant.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Instead of explaining your preferences every time, you install a skill once and
          your agent automatically picks it up.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length
            return (
              <span
                key={cat}
                className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm"
              >
                <span className="font-medium">{cat}</span>
                <span className="text-muted-foreground">({count})</span>
              </span>
            )
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">How it Works</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">1.</span>
            <span>Install skills using the CLI command in your project directory.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">2.</span>
            <span>Skills are stored in your project and automatically detected by your AI agent.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">3.</span>
            <span>Your agent reads the skill instructions before generating code.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-none font-medium text-primary">4.</span>
            <span>Code is generated following your project's conventions and best practices.</span>
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold font-serif">Supported Agents</h2>
        <p className="text-muted-foreground leading-relaxed">
          Skills work with any AI coding agent that supports the skills.sh format,
          including Cursor, GitHub Copilot, Claude Code, and others.
        </p>
      </section>

      <div className="flex gap-3">
        <Button asChild>
          <Link to="/">Browse Skills</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contributing">Contribute</Link>
        </Button>
      </div>
    </div>
  )
}
