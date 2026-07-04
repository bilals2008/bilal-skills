import { useParams, Link } from "react-router-dom"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getSkillsByAuthor } from "@/data/skills"
import { useDebounce } from "@/lib/use-debounce"

const categoryDot: Record<string, string> = {
  TypeScript: "bg-blue-500",
  React: "bg-cyan-500",
  Workflow: "bg-orange-500",
  Security: "bg-red-500",
}

function AuthorSkillSkeleton() {
  return (
    <div className="rounded-md border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="h-5 w-1/2 rounded bg-primary/10 animate-pulse" />
        <div className="h-5 w-16 rounded bg-primary/10 animate-pulse" />
      </div>
      <div className="space-y-1.5">
        <div className="h-4 w-full rounded bg-primary/10 animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-primary/10 animate-pulse" />
      </div>
    </div>
  )
}

export function AuthorPage() {
  const { author } = useParams<{ author: string }>()
  const authorSkills = author ? getSkillsByAuthor(author) : []

  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)

  const filtered = useMemo(() => {
    let result = authorSkills
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase()
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(q) ||
          skill.description.toLowerCase().includes(q) ||
          skill.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [debouncedQuery, authorSkills])

  const isSearching = query !== debouncedQuery

  if (!author || authorSkills.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h1 className="mb-3 text-2xl font-semibold">Author not found</h1>
        <p className="mb-6 text-muted-foreground">No skills found for this author.</p>
        <Button asChild>
          <Link to="/">Back to all skills</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to skills
        </Link>
      </div>

      <header className="mb-6 sm:mb-8 flex items-center gap-4">
        <img
          src={`https://github.com/${author}.png`}
          alt={author}
          className="size-16 rounded-full border-2 border-border"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight font-serif">@{author}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {authorSkills.length} skill{authorSkills.length !== 1 ? "s" : ""} contributed
          </p>
        </div>
      </header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <Input
            placeholder="Search skills by name, tag, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isSearching && (
            <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
          <span className="text-sm text-muted-foreground tabular-nums">
            {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
          </span>
        </div>
      </div>

      {isSearching ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: Math.min(authorSkills.length, 4) }).map((_, i) => (
            <AuthorSkillSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-muted">
            <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <p className="mb-2 text-lg font-medium">No skills found</p>
          <p className="mb-4 text-sm text-muted-foreground">
            {query
              ? `No results for "${query}". Try a different search term.`
              : "No skills in this category yet."}
          </p>
          {(query) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuery("")}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((skill, i) => (
            <Link
              key={skill.slug}
              to={`/skills/${skill.slug}`}
              className="group rounded-md border bg-card p-4 sm:p-5 transition-all hover:border-primary/40 hover:shadow-md animate-in"
              style={{ animationDelay: `${i * 30}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-medium group-hover:text-primary transition-colors font-serif">
                  {skill.name}
                </h2>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  <span className={`size-1.5 rounded-full mr-1.5 ${categoryDot[skill.category] ?? "bg-muted-foreground"}`} />
                  {skill.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
