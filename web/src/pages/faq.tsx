import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What are skills?",
    answer:
      "Skills are reusable instruction sets that AI agents use to understand your project's conventions. They help generate code that matches your style without explaining preferences every time.",
  },
  {
    question: "How do I install a skill?",
    answer:
      "Run the install command shown on each skill page. It uses the skills.sh CLI: npx skills add bilals2008/bilal-skills. You can also install a specific skill with --skill <name>.",
  },
  {
    question: "Which AI agents support skills?",
    answer:
      "Skills work with any agent that supports the skills.sh format, including Cursor, GitHub Copilot, Claude Code, and others.",
  },
  {
    question: "Can I create my own skills?",
    answer:
      "Yes! Check the Contributing page for instructions on how to create and submit your own skills to the collection.",
  },
  {
    question: "Are skills free?",
    answer:
      "Yes, all skills in this collection are open source and free to use under the MIT license.",
  },
  {
    question: "How do skills differ from prompts?",
    answer:
      "Skills are structured, versioned, and shareable. Unlike raw prompts, they follow a standard format, can be installed via CLI, and are designed to be reused across projects.",
  },
]

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground transition-colors hover:text-primary"
      >
        {item.question}
        <svg
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-muted-foreground leading-relaxed">{item.answer}</p>
      )}
    </div>
  )
}

export function FAQPage() {
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
          FAQ
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Frequently asked questions about bilal-skills.
        </p>
      </header>

      <Separator className="mb-8" />

      <div>
        {faqs.map((faq, i) => (
          <FAQAccordion key={i} item={faq} />
        ))}
      </div>
    </div>
  )
}
