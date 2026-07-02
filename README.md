# bilal-skills

[![skills.sh](https://skills.sh/b/bilals2008/bilal-skills)](https://skills.sh/bilals2008/bilal-skills)

AI agent skills collection for web systems and app development. Installable into Claude Code, Cursor, Windsurf, Codex, GitHub Copilot, and 70+ other AI coding agents.

## Installation

```bash
npx skills add bilals2008/bilal-skills
```

Install a specific skill:

```bash
npx skills add bilals2008/bilal-skills --skill <skill-name>
```

Install to a specific agent:

```bash
npx skills add bilals2008/bilal-skills -a claude-code -a cursor
```

List available skills:

```bash
npx skills add bilals2008/bilal-skills --list
```

## Usage

After installation, your AI agent automatically loads the relevant skill when a matching task is detected. To see installed skills:

```bash
npx skills list
```

To update:

```bash
npx skills update
```

## Repository Structure

```
bilal-skills/
├── README.md
├── LICENSE
├── .gitignore
├── skills.sh.json
└── skills/
    └── <skill-name>/
        ├── SKILL.md
        ├── scripts/
        ├── references/
        └── assets/
```

## Creating Skills

See [skills.sh documentation](https://www.skills.sh/docs) for the full specification.

## License

MIT
