# bilal-skills


A collection of production-ready AI agent skills for TypeScript, frontend development, and software engineering best practices. Installable with a single command into Claude Code, Cursor, Windsurf, Codex, GitHub Copilot, and 70+ other AI coding agents.

## Features

- **TypeScript Best Practices** — Type-safe code patterns, strict mode configuration, branded types, discriminated unions, and performance optimization
- **React + Shadcn UI Expert** — Build modern React apps with Vite, TypeScript, Tailwind CSS v4, and shadcn/ui
- **Git Leak Prevention** — Scan repositories for sensitive files (.env, secrets, API keys, build artifacts) and auto-fix .gitignore before pushing to GitHub
- **Progressive Disclosure** — Skills follow the three-level loading system (metadata, instructions, bundled resources) to minimize context window usage
- **Cross-Platform Compatible** — Works with every major AI coding agent including Claude Code, Codex, Cursor, Windsurf, GitHub Copilot, OpenCode, and more
- **Well-Tested Patterns** — Based on official team recommendations and community best practices

## Installation

Install all skills:

```bash
npx skills add bilals2008/bilal-skills
```

Install a specific skill:

```bash
npx skills add bilals2008/bilal-skills --skill typescript-best-practices
npx skills add bilals2008/bilal-skills --skill react-shadcn-ui-expert
npx skills add bilals2008/bilal-skills --skill git-leak-prevention
```

Install to a specific agent:

```bash
npx skills add bilals2008/bilal-skills -a claude-code -a cursor
```

Install globally (available across all projects):

```bash
npx skills add bilals2008/bilal-skills -g
```

## Usage

After installation, your AI agent will automatically use these skills when relevant tasks are detected. The skill's description field acts as a trigger — TypeScript-related tasks load the typescript-best-practices skill; React/shadcn tasks load react-shadcn-ui-expert.

To verify installation:

```bash
npx skills list
```

To update to the latest version:

```bash
npx skills update typescript-best-practices
```

## Supported AI Agents

This repository is compatible with all agents supported by the skills.sh ecosystem, including:

| Agent | ID |
|-------|-----|
| Claude Code | `claude-code` |
| Codex | `codex` |
| Cursor | `cursor` |
| Windsurf | `windsurf` |
| GitHub Copilot | `github-copilot` |
| OpenCode | `opencode` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Roo Code | `roo` |
| Antigravity | `antigravity` |

For the full list of 70+ supported agents, see the [skills CLI documentation](https://www.skills.sh/docs/cli).

## Repository Structure

```
bilal-skills/
├── README.md                    # This file
├── LICENSE                      # MIT License
├── .gitignore
├── skills.sh.json               # skills.sh page customization
└── skills/
    ├── typescript-best-practices/
    │   ├── SKILL.md             # Skill definition (name + description frontmatter)
    │   ├── scripts/             # Helper scripts loaded on demand
    │   │   └── validate-config.ts
    │   ├── references/          # Reference docs loaded on demand
    │   │   ├── patterns.md
    │   │   └── performance.md
    │   └── assets/              # Template files
    │       └── tsconfig.base.json
    ├── react-shadcn-ui-expert/
    │   ├── SKILL.md             # React + shadcn/ui skill
    │   └── examples/            # Usage examples
    │       ├── button.md
    │       ├── form.md
    │       └── dashboard.md
    └── git-leak-prevention/
        ├── SKILL.md             # Security leak prevention skill
        └── scripts/
            └── check-leaks.ps1  # PowerShell scanner script
```

### File Descriptions

| File | Purpose |
|------|---------|
| `skills/*/SKILL.md` | Required. Contains YAML frontmatter (`name`, `description`) and Markdown instructions |
| `skills/*/scripts/` | Optional. Executable code for deterministic/repetitive tasks |
| `skills/*/references/` | Optional. Documentation loaded into context as needed |
| `skills/*/assets/` | Optional. Files used in output (templates, icons, configs) |
| `skills.sh.json` | Optional. Customizes the repository page on skills.sh |

## Development

### Creating a New Skill

1. Create a new directory under `skills/` with your skill name
2. Add a `SKILL.md` file with YAML frontmatter (`name` and `description` required)
3. Optionally add `scripts/`, `references/`, and `assets/` subdirectories
4. Update `skills.sh.json` to add the skill to the appropriate grouping
5. Test locally: `npx skills add ./path/to/repo --list`

### SKILL.md Requirements

```markdown
---
name: my-skill
description: What this skill does and when to trigger
---

# My Skill

Instructions for the agent to follow.
```

Required frontmatter: `name` and `description`. Keep SKILL.md under 500 lines.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create a new skill or improve an existing one
3. Ensure the SKILL.md has valid YAML frontmatter with `name` and `description`
4. Test locally with `npx skills add ./bilal-skills --list`
5. Submit a PR

## License

MIT
