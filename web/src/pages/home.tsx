import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { skills, getCategories } from "@/data/skills"
import { SkillCard } from "@/components/skills/skill-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/toast-provider"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      onClick={handleCopy}
    >
      {copied ? (
        <span className="text-xs text-primary font-medium">✓</span>
      ) : (
        <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </Button>
  )
}

const categoryColors: Record<string, string> = {
  TypeScript: "border-blue-500/40 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  React: "border-cyan-500/40 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
  Workflow: "border-orange-500/40 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  Security: "border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/20",
}

export function HomePage() {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const categories = useMemo(() => getCategories(), [])

  const filtered = useMemo(() => {
    let result = skills
    if (selectedCategory) {
      result = result.filter((s) => s.category === selectedCategory)
    }
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(q) ||
          skill.description.toLowerCase().includes(q) ||
          skill.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [query, selectedCategory])

  const visibleSkills = showAll ? filtered : filtered.slice(0, 20)
  const hasMore = filtered.length > 20

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl font-serif text-primary">
          bilal-skills
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          A collection of AI agent skills to help humans and agents write
          better code, follow best practices, and ship faster.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-sm font-semibold">How to use</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Ask your agent to run the CLI first so it can choose the right skill
          before making changes.
        </p>
        <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card px-4 py-3 font-mono text-sm">
          <span className="flex-1">
            <span className="text-primary">npx</span>
            <span className="text-foreground"> skills add </span>
            <span className="text-cyan-400">bilals2008/bilal-skills</span>
          </span>
          <CopyButton text="npx skills add bilals2008/bilal-skills" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Or browse the collection below to find the best skills.
        </p>
      </section>

      <Separator className="mb-8" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <Input
            placeholder="Search by name, tag, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
        </span>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all ${
            selectedCategory === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all ${
              selectedCategory === cat
                ? categoryColors[cat] ?? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-2 text-lg font-medium">No skills found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleSkills.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </div>

            {!showAll && hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="transition-all active:scale-[0.96]"
                >
                  Show More ({filtered.length - 20} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
