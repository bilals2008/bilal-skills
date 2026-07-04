import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const categoryDot: Record<string, string> = {
  TypeScript: "bg-blue-500",
  React: "bg-cyan-500",
  Workflow: "bg-orange-500",
  Security: "bg-red-500",
}

const categoryLabel: Record<string, string> = {
  TypeScript: "typescript",
  React: "react",
  Workflow: "git",
  Security: "security",
}

export function SkillCard({ skill }: { skill: { slug: string; name: string; description: string; category: string; author: string } }) {
  return (
    <Link to={`/skills/${skill.slug}`} className="group block">
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
        <CardHeader className="gap-3">
          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors font-serif">
            {skill.name}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {skill.description}
          </CardDescription>
          <div className="rounded-md bg-muted/50 px-3 py-2 font-mono text-xs">
            <span className="text-primary">npx</span>
            <span className="text-foreground"> skills add </span>
            <span className="text-cyan-500 dark:text-cyan-400">bilals2008/bilal-skills</span>
            <span className="text-muted-foreground"> --skill </span>
            <span className="text-amber-500 dark:text-amber-400">{skill.slug}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${categoryDot[skill.category] ?? "bg-muted-foreground"}`} />
              {categoryLabel[skill.category] ?? skill.category.toLowerCase()}
            </div>
            <span className="text-muted-foreground/70">@{skill.author}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
