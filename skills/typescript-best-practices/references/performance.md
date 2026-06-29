# TypeScript Compilation Performance Guide

Read this reference when optimizing TypeScript build performance, dealing with slow compilation, or configuring `tsconfig.json` for large projects.

## Project References

For large monorepos, use TypeScript project references to enable incremental builds.

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../utils" }
  ]
}
```

```json
// root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/utils" },
    { "path": "packages/api" }
  ]
}
```

## Incremental Compilation

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

## Skip Lib Check

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

This skips type checking of declaration files (`.d.ts`), which significantly improves compilation speed without affecting your code's type safety.

## TypeScript Performance Checklist

| Technique | Impact | Configuration |
|-----------|--------|---------------|
| Project references | High | Use in monorepos |
| `skipLibCheck: true` | High | Always enable |
| `incremental: true` | Medium | Always enable |
| Avoid large unions | Medium | Prefer interfaces |
| Avoid deep conditional types | High | Use mapped types |
| Use `isolatedModules: true` | Medium | Faster per-file emit |
| Prefer `interface` over `type` | Low-medium | Object types only |

## When to Use `isolatedModules`

Enable `isolatedModules` when using transpilers like Babel, esbuild, or SWR that process files individually. It ensures each file can be compiled independently and prevents cross-file type features.

```json
{
  "compilerOptions": {
    "isolatedModules": true
  }
}
```
