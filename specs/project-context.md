---
project_name: 'training-dashboard'
user_name: 'Daminou'
date: '2026-01-14'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 15
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Backend**: Python 3.10+ (Typer, Pydantic v2.12.5, Ruff, uv)
- **Frontend**: React 19+ (TypeScript 5.x, Vite 6+, Tailwind CSS v4.1)
- **Data**: Static JSON pivot (`data/projects.json`)
- **CI/CD**: GitHub Actions + GitHub Pages

## Critical Implementation Rules

### Language-Specific Rules (Python)
- **Validation**: Use Pydantic models for ALL data extraction.
- **Resilience**: Loop over projects must be "Best Effort" (catch exceptions, log to `scan.log`, continue).
- **Naming**: Strict `snake_case` for all variables and functions (PEP8).

### Framework-Specific Rules (React/TS)
- **Type Safety**: Mirror Python Pydantic models in `frontend/src/types/project.ts`. No `any`.
- **Styling**: Tailwind CSS v4 only. No CSS Modules.
- **Performance**: SPA architecture optimized for Lighthouse 90+.

### Code Quality & Style Rules
- **Formatting**: Ruff for Python, Prettier for TypeScript.
- **Naming**: `snake_case` for JSON keys and Python, `camelCase` for TypeScript logic.
- **Structure**: Monorepo split (`/scanner` and `/frontend`). No code sharing between them.

### Critical Don't-Miss Rules
- **Zero-Touch**: Automation must work without manual intervention after setup.
- **Secrets**: `GITHUB_TOKEN` must NEVER be logged or included in `projects.json`.
- **Fallback**: If GitHub API fails, use local filesystem data as fallback.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**
- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review quarterly for outdated rules.
- Remove rules that become obvious over time.

Last Updated: 2026-01-14
