import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getSkillBySlug, skills } from "@/data/skills"
import { useState } from "react"
import { useToast } from "@/components/toast-provider"

const tagColors: Record<string, string> = {
  typescript: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  react: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "shadcn-ui": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  tailwind: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  vite: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  git: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  commits: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "conventional-commits": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  workflow: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  security: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  secrets: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  gitignore: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "type-safety": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "strict-mode": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "branded-types": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
}

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

function renderMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent = ""
  let codeLanguage = ""

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-4 rounded-md border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-1.5">
              <span className="text-xs font-mono text-muted-foreground">{codeLanguage || "code"}</span>
              <CopyButton text={codeContent.trim()} />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm">
              <code className="text-foreground">{codeContent.trim()}</code>
            </pre>
          </div>
        )
        codeContent = ""
        codeLanguage = ""
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
      }
      return
    }

    if (inCodeBlock) {
      codeContent += line + "\n"
      return
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="mb-4 text-3xl font-bold tracking-tight font-serif text-primary">
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mb-3 mt-8 text-xl font-semibold font-serif">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mb-2 mt-6 text-lg font-semibold">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={i} className="mb-2 mt-4 text-base font-semibold">
          {line.slice(5)}
        </h4>
      )
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 text-muted-foreground leading-relaxed">
          {renderInlineCode(line.slice(2))}
        </li>
      )
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={i} className="ml-4 text-muted-foreground leading-relaxed list-decimal">
          {renderInlineCode(line.replace(/^\d+\. /, ""))}
        </li>
      )
    } else if (line.startsWith("| ")) {
      elements.push(
        <div key={i} className="font-mono text-sm text-muted-foreground">
          {line}
        </div>
      )
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="my-2 border-l-2 border-primary pl-4 text-muted-foreground italic">
          {renderInlineCode(line.slice(2))}
        </blockquote>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />)
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed">
          {renderInlineCode(line)}
        </p>
      )
    }
  })

  return elements
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
          {part.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function SkillDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const skill = slug ? getSkillBySlug(slug) : undefined

  if (!skill) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="mb-3 text-2xl font-semibold">Skill not found</h1>
        <p className="mb-6 text-muted-foreground">No skill matches that slug.</p>
        <Button asChild>
          <Link to="/">Back to all skills</Link>
        </Button>
      </div>
    )
  }

  const relatedSkills = skills.filter((s) => s.category === skill.category && s.slug !== skill.slug).slice(0, 2)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to skills
        </Link>
        <div className="flex items-center gap-2">
          <img
            src={`https://github.com/${skill.author}.png`}
            alt={skill.author}
            className="size-5 rounded-full border border-border"
          />
          <span className="text-sm text-muted-foreground">{skill.author}</span>
        </div>
      </div>

      <header className="mb-8">
        <div className="mb-3">
          <Badge variant="secondary">{skill.category}</Badge>
        </div>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight font-serif">{skill.name}</h1>
        <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
      </header>

      <Separator className="mb-8" />

      <div className="mb-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Installation
        </h2>
        <div className="flex items-center gap-2 rounded-md border bg-card px-4 py-3 font-mono text-sm shadow-sm">
          <span className="flex-1 text-foreground">{skill.installCmd}</span>
          <CopyButton text={skill.installCmd} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                tagColors[tag] ?? "bg-muted text-muted-foreground"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {renderMarkdown(skill.skillContent)}
      </article>

      {relatedSkills.length > 0 && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="mb-4 text-xl font-semibold font-serif">Related Skills</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedSkills.map((rs) => (
                <Link
                  key={rs.slug}
                  to={`/skills/${rs.slug}`}
                  className="group rounded-md border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <h3 className="font-medium group-hover:text-primary transition-colors">{rs.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{rs.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}


    </div>
  )
}
