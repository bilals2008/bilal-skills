---
name: react-shadcn-ui-expert
description: Build production-ready React applications using Vite, TypeScript, Tailwind CSS v4, and shadcn/ui. Use when building React apps, creating UI components, designing dashboards, building forms, or creating responsive layouts with shadcn/ui.
---

# React + Shadcn UI Expert

## Purpose

This skill helps AI agents generate modern React applications using the latest best practices.

## Use this skill when

- Building React applications
- Creating UI components
- Designing dashboards
- Building forms
- Creating responsive layouts
- Using shadcn/ui
- Using Tailwind CSS v4
- Working with TypeScript

## Do NOT use this skill when

- Using Vue
- Using Angular
- Using Flutter
- Using React Native

## Rules

Always:

- Use TypeScript
- Use functional components
- Use React hooks
- Use Tailwind CSS v4
- Use shadcn/ui components
- Use accessible HTML
- Keep components reusable
- Avoid unnecessary re-renders
- Follow clean folder structure
- Use semantic design tokens (e.g., `text-foreground`, `bg-muted`, `border-border`, `text-primary`) instead of hardcoded colors (e.g., `text-white`, `bg-black`, `border-gray-200`)
- Use shadcn CLI (`npx shadcn@latest add <component>`) to install components instead of manually creating them
- Prefer shadcn/ui built-in components over custom implementations

Never:

- Use inline CSS
- Use deprecated React APIs
- Create huge components
- Duplicate code
- Hardcode color values like `#000000`, `#ffffff`, `rgb()`, `hsl()` — always use CSS variables / Tailwind tokens
- Use `bg-white`, `text-black`, `bg-gray-*`, `text-gray-*` — use `bg-background`, `text-foreground`, `bg-muted`, `text-muted-foreground` instead

## Folder Structure

src/
components/
hooks/
lib/
pages/
types/
utils/

## Output Requirements

Generated code should:

- Be production ready
- Be typed
- Be readable
- Include comments only when necessary
- Follow React best practices

## Examples

See the examples folder.
