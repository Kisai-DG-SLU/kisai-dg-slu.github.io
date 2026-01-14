---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ["specs/planning-artifacts/prd.md", "specs/planning-artifacts/product-brief-training-dashboard-2026-01-14.md"]
workflowType: 'architecture'
project_name: 'training-dashboard'
user_name: 'Daminou'
date: '2026-01-14'
lastStep: 8
status: 'complete'
completedAt: '2026-01-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Analyse des 20 FRs répartis sur le cycle de vie de la donnée : du scan initial à la présentation dynamique. L'architecture doit supporter un workflow unidirectionnel (Scan -> Merge -> JSON -> UI).

**Non-Functional Requirements:**
Priorité absolue à la performance (SPA légère) et à la maintenabilité (Code découplé entre le interface et l'interface). La sécurité des tokens API est critique.

**Scale & Complexity:**
Le projet est de taille modérée mais exige une grande rigueur dans l'automatisation pour atteindre l'objectif "Executive Living Proof".

- Primary domain: Full-stack (CLI Utility + Web Frontend)
- Complexity level: Medium
- Estimated architectural components: 3 (Scanner Engine, Data Store JSON, Frontend SPA)

### Technical Constraints & Dependencies

- GitHub API (Rate limits, Authentication)
- Node.js ou Python pour le scanner
- Hébergement statique (GitHub Pages, Vercel, etc.)
- Pas de base de données persistante (JSON as DB)

### Cross-Cutting Concerns Identified

- **Data Sync State**: Assurer la cohérence entre le local et GitHub.
- **Privacy Gate**: Filtrage systématique des projets sensibles.
- **Silent Logging**: Reporting d'erreurs non-intrusif.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack hybride : CLI (Data Acquisition) + Web SPA (Data Visualization).

### Starter Options Considered

1. **Python CLI (Typer/Ruff/uv)** : Pour le moteur de scan. Choisi pour sa robustesse et sa vitesse.
2. **Vite + React + TS** : Pour l'interface utilisateur. Choisi pour les performances (Lighthouse 90+) et le typage.

### Selected Starters: Hybrid Python/React

**Rationale for Selection:**
Cette approche "best of both worlds" démontre une polyvalence technique de haut niveau (Seniority). Python est idéal pour les tâches de scan et d'API, tandis que React/Vite garantit une UX fluide et moderne.

**Initialization Commands:**

```bash
# Pour le Scanner (Python)
uv init scanner --app
uv add typer ruff rich requests

# Pour le Frontend (React/TS)
npm create vite@latest frontend -- --template react-ts
```

**Architectural Decisions Provided by Starters:**

**Language & Runtime:**
- Python 3.10+ pour le backend.
- TypeScript 5.x pour le frontend.

**Styling Solution:**
- Tailwind CSS (recommandé via Vite) pour un design moderne et rapide.

**Build Tooling:**
- `uv` pour la gestion éclair des dépendances Python.
- `Vite` pour le bundling frontend optimisé.

**Code Organization:**
- `/scanner` : Logique d'acquisition et fusion des données.
- `/frontend` : Logique de présentation et SPA.
- `projects.json` : Point de contact entre les deux mondes.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Data Schema**: Utilisation de Pydantic v2 pour un schéma strict avec exclusion des données invalides.
- **Hosting**: GitHub Pages pour une intégration native et un coût nul.
- **Error Handling**: Stratégie de dégradation gracieuse (Graceful Degradation) avec fallback sur données locales.

**Important Decisions (Shape Architecture):**
- **Tech Stack**: Python (Scanner) / React + TS (UI).
- **Communication**: Pivot asynchrone via `projects.json`.

**Deferred Decisions (Post-MVP):**
- **AI Analytics**: Génération de résumés de projets via LLM.
- **Social Feed**: Agrégation de flux RSS/LinkedIn.

### Data Architecture

**Decision: Strict Validation with Silent Exclusion**
- **Version**: Pydantic 2.12.5+
- **Rationale**: Le scanner filtre les projets mal formés. Le Frontend ne reçoit que des données validées, évitant les crashs d'interface et garantissant une qualité "Executive".
- **Affects**: Scanner, Frontend Data Layer.

### Infrastructure & Deployment

**Decision: GitHub Pages for Global Hosting**
- **Rationale**: Alignement total avec l'écosystème de développement. Permet d'automatiser le cycle Scan -> Commit -> Deploy via GitHub Actions sans dépendance tierce.
- **Affects**: CI/CD Pipeline.

### Error Handling & Reliability

**Decision: Local-First Graceful Degradation**
- **Rationale**: Si l'API GitHub est indisponible, le dashboard affiche les données locales mises en cache ou scannées sur le filesystem. Un flag `partial_data: true` est injecté pour informer l'utilisateur.
- **Affects**: Scanner logic, UI Status indicators.

### Frontend Architecture

**Decision: Tailwind CSS v4.x**
- **Version**: 4.1.x
- **Rationale**: Performance maximale avec le nouveau moteur v4 et configuration CSS-first. Idéal pour atteindre les scores Lighthouse visés (90+).
- **Affects**: UI Components.

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Code & Data Conventions:**
- **Python Backend**: PEP8 (snake_case).
- **React Frontend**: Airbnb/Google standard (camelCase for logic, PascalCase for UI).
- **JSON Pivot**: `snake_case` pour toutes les clés de données.

### Structure Patterns

**Organization Rules:**
- **Backend Tests**: Localisés dans `/scanner/tests/`.
- **Frontend Tests**: Co-localisés avec les composants (`*.test.tsx`).
- **Assets**: Images et logos gérés dans `/frontend/public/assets/`.

### Format Patterns

**Data Exchange (projects.json):**
- **Dates**: Format ISO 8601 uniquement.
- **Enums**: Valeurs en string (ex: `status: "published"` et non `status: 1`).
- **Booleans**: Valeurs `true`/`false` natives.

### Process Patterns

**Error Handling:**
- Le Scanner ne doit JAMAIS interrompre le scan global pour une erreur sur un seul projet.
- Chaque erreur doit être loguée dans `scan.log` avec l'ID du projet concerné.
- En cas d'échec API GitHub, le champ `github_data` doit être `null` et non un objet vide.

### Enforcement Guidelines

**All AI Agents MUST:**
- Valider le JSON de sortie par rapport au schéma Pydantic défini.
- Utiliser Tailwind CSS pour TOUT le styling (pas de CSS modules ou inline styles complexes).
- Documenter chaque fonction complexe via des Docstrings (Python) ou JSDoc (TS).

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
training-dashboard/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: Scan -> Build -> Deploy to GH Pages
├── data/
│   └── projects.json           # [GENERATED] Pivot central (Base de données statique)
├── scanner/                    # [PYTHON] Moteur d'acquisition
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py             # Point d'entrée CLI (Typer)
│   │   ├── config.py           # Gestion config (Env vars, Paths)
│   │   ├── models.py           # Schémas Pydantic (Validation stricte)
│   │   ├── scanner.py          # Logique FS (Fichiers locaux)
│   │   └── github_client.py    # Logique API (GitHub)
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_models.py
│   │   └── test_scanner.py
│   ├── pyproject.toml          # Config Ruff/Uv
│   └── requirements.txt        # Dépendances Python
├── frontend/                   # [REACT] Interface Utilisateur
│   ├── public/
│   │   └── assets/             # Images statiques
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Composants atomiques (Card, Button...)
│   │   │   └── Dashboard/      # Composants métier (ProjectList, Stats...)
│   │   ├── types/
│   │   │   └── project.ts      # TypeScript definitions (Mirroir de models.py)
│   │   ├── utils/
│   │   │   └── date.ts         # Helpers de formatage
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── specs/                      # Documentation
│   ├── planning-artifacts/
│   └── ...
├── environment.yml             # Config globale Conda
├── .gitignore
└── README.md
```

### Architectural Boundaries

**Data Boundaries:**
- Le fichier `data/projects.json` agit comme une API statique.
- **Scanner**: Producteur de données (Write).
- **Frontend**: Consommateur de données (Read).

**Component Boundaries:**
- **Scanner**: Isolé dans son environnement Python virtuel (Conda/Uv). Ne partage aucun code avec le frontend.
- **Frontend**: Application SPA autonome buildée par Vite.

### Requirements to Structure Mapping

**Data Discovery (FR1-FR5):**
- Implémenté dans `scanner/src/scanner.py`.
- Tests unitaires dans `scanner/tests/test_scanner.py`.

**External Integration (FR6-FR9):**
- Implémenté dans `scanner/src/github_client.py`.

**Dynamic Presentation (FR13-FR17):**
- Implémenté dans `frontend/src/components/Dashboard/`.
- Types définis dans `frontend/src/types/project.ts`.

## Architecture Validation Results

### Coherence Validation ✅
Toutes les technologies (Python 3.10, React 19, Vite, Tailwind v4) sont compatibles et suivent les standards 2026. L'usage de `uv` et `npm` est cohérent avec une structure monorepo simplifiée.

### Requirements Coverage Validation ✅
Les 20 exigences fonctionnelles (FR1-FR20) ont un emplacement cible identifié dans la structure. Les exigences de performance (Lighthouse 90+) sont au cœur du choix technologique (SPA statique).

### Implementation Readiness Validation ✅
L'architecture est jugée **PRÊTE**. Les agents IA peuvent démarrer l'implémentation en suivant la structure et les patterns définis sans risque de conflit majeur.

### Architecture Completeness Checklist
- [x] Analyse du contexte effectuée
- [x] Stack technique spécifiée (Python/React)
- [x] Schéma de données pivot défini (JSON)
- [x] Patterns de nommage fixés (snake_case/camelCase)
- [x] Structure de fichiers complète définie
- [x] Stratégie de déploiement validée (GitHub Pages)

### Architecture Readiness Assessment
**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** HIGH

**Key Strengths:**
- **Robustesse**: Validation stricte via Pydantic.
- **Performance**: Architecture data-driven statique.
- **Automatisation**: Cycle de vie "Zero-Touch" via GitHub Actions.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialisation des environnements via `uv` (scanner) et `npm` (frontend).

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-14
**Document Location:** specs/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**
- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**
- 10+ architectural decisions made
- 8+ implementation patterns defined
- 3 architectural components specified
- 20 requirements fully supported

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing training-dashboard. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Initialisation des environnements via `uv` (scanner) et `npm` (frontend).

**Architecture Status:** READY FOR IMPLEMENTATION ✅
