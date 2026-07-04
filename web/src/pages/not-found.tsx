import { useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { skills } from "@/data/skills"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5)
  }, [query])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
      <p className="mb-2 text-6xl font-bold text-primary/20 font-mono">404</p>
      <h1 className="mb-2 text-2xl sm:text-3xl font-semibold font-serif">Page not found</h1>
      <p className="mb-8 text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mx-auto max-w-md mb-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <Input
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        {query && results.length > 0 && (
          <div className="mt-2 rounded-md border bg-card text-left shadow-md overflow-hidden">
            {results.map((skill) => (
              <Link
                key={skill.slug}
                to={`/skills/${skill.slug}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b last:border-b-0"
              >
                <div className="size-2 rounded-full bg-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{skill.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{skill.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            No skills found for "{query}"
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button asChild variant="outline">
          <Link to="/">Browse all skills</Link>
        </Button>
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
