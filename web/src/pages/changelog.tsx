import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const changes = [
  {
    date: "2026-07-03",
    version: "1.0.0",
    items: [
      { type: "feature", text: "Initial release with 4 skills" },
      { type: "feature", text: "TypeScript Best Practices skill" },
      { type: "feature", text: "React + Shadcn UI Expert skill" },
      { type: "feature", text: "Commit Message Writer skill" },
      { type: "feature", text: "Git Leak Prevention skill" },
      { type: "feature", text: "Docs website with search and skill cards" },
    ],
  },
]

const typeColors: Record<string, string> = {
  feature: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  fix: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  improvement: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export function ChangelogPage() {
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
          Changelog
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          All notable changes to bilal-skills.
        </p>
      </header>

      <Separator className="mb-8" />

      <div className="space-y-10">
        {changes.map((change) => (
          <section key={change.version}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xl font-semibold font-serif">v{change.version}</h2>
              <span className="text-sm text-muted-foreground">{change.date}</span>
            </div>
            <ul className="space-y-2">
              {change.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Badge
                    variant="secondary"
                    className={`mt-0.5 flex-none text-xs ${typeColors[item.type] ?? ""}`}
                  >
                    {item.type}
                  </Badge>
                  <span className="text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
