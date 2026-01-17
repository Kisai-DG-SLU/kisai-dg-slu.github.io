---
stepsCompleted: [1, 2, 3, 4, 6, 7, 8, 9, 10]
inputDocuments: 
  - "specs/planning-artifacts/product-brief-training-dashboard-2026-01-14.md"
workflowType: "prd"
lastStep: 1
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
---

# Product Requirements Document - training-dashboard

**Author:** Daminou
**Date:** 2026-01-14

## Executive Summary

Le **Training Dashboard** est une plateforme dynamique conçue pour automatiser le suivi et la valorisation du parcours de formation d'Ingénieur IA de Daminou. Il remplace un portfolio statique obsolète par un système "vivant" qui s'auto-alimente via l'activité réelle (fichiers locaux et GitHub). L'objectif est double : optimiser le pilotage personnel de la formation (804h) et fournir une preuve technologique irréfutable de séniorité pour des postes de Direction Technique ou des missions de conseil stratégique.

### What Makes This Special

Sa valeur unique réside dans le concept de **"Living Proof"** (Preuve Vivante) : au-delà du contenu, c'est le contenant lui-même qui démontre l'expertise. En automatisant totalement la mise à jour des données et en intégrant un filtre de qualité ("Quality Gate"), Daminou prouve sa capacité à industrialiser des solutions logicielles et à piloter des flux de données complexes, ce qui est le cœur de métier d'un Directeur Technique IA moderne.

## Project Classification

**Technical Type:** web_app
**Domain:** scientific (AI/Data focus)
**Complexity:** medium
**Project Context:** Greenfield - nouvelle phase de spécification basée sur le Product Brief.

Ce projet se distingue par son exigence de professionnalisme "Executive" (visant des postes à 125k€+) et son besoin d'automatisation totale pour libérer du temps stratégique.

## Success Criteria

### User Success
- **Daminou :** Atteindre le "Zero-Touch". Une fois le script lancé (ou déclenché par un hook), aucune action manuelle n'est requise pour voir les changements en ligne.
- **Recruteur :** Expérience sans friction. Accès aux preuves techniques (GitHub, démo) en moins de 3 clics depuis la home.

### Business Success
- **Engagement :** Augmentation du nombre de contacts qualifiés via le dashboard.
- **Image de Marque :** Perception de Daminou comme un Expert IA capable de bâtir des systèmes automatisés et performants.

### Technical Success
- **Performance UX :** Score Lighthouse (Performance) ≥ 90/100 sur desktop.
- **Robustesse du Scan :** 100% de tolérance aux erreurs de formatage des dossiers projets. En cas de fichier manquant (ex: README), le système génère un log d'avertissement mais n'interrompt pas la génération du Dashboard.
- **Fraîcheur des Données :** Synchronisation avec GitHub effective en moins de 60 minutes.

### Measurable Outcomes
- **Automation Rate :** 100% des projets listés sont générés via le `projects.json`.
- **Zéro Régression :** Maintien du design actuel tout en rendant le contenu dynamique.

## Product Scope

### MVP - Minimum Viable Product
- **Scanner Local (Node.js/Python) :** Extraction automatique des dossiers `Projet_<x>`.
- **Intégration GitHub :** Récupération de l'activité (commits, langages) via l'API officielle.
- **Frontend Dynamique :** Refactorisation de la section "Projets" pour consommer le JSON.
- **Status Dashboard :** Visualisation des KPI de formation (804h, 15 projets).
- **Quality Gate :** Masquage automatique des projets n'ayant pas le tag "publiable".

### Growth Features (Post-MVP)
- **Dashboard de Veille :** Agrégation de flux RSS ou API sur l'IA pour montrer la veille active.
- **Analyses IA des Projets :** Génération de résumés techniques via un LLM à partir du code source.

### Vision (Future)
- **AI Agent "Daminou-Bot" :** Agent RAG intégré permettant de chatter avec les compétences et l'expérience du candidat.

## User Journeys

### Journey 1: Daminou - La Délégation Totale (Succès)
Daminou vient de finaliser une session de code intense sur le Projet 12. Il a implémenté un système multi-agents complexe. Il effectue son `git commit` et `push` habituel. En tâche de fond, le **Scanner** s'éveille. Il parcourt le répertoire local, valide la structure du projet, interroge l'API GitHub pour récupérer les derniers commits et met à jour le fichier `projects.json`. Le lendemain, sans avoir ouvert un seul éditeur HTML, Daminou constate que sa vitrine affiche ses nouvelles prouesses. Il a gagné 30 minutes de maintenance manuelle, qu'il réinvestit dans sa veille stratégique.

### Journey 2: Sarah - La Chasseuse de Talents Exécutifs (Confiance)
Sarah, consultante en recrutement pour des rôles de Direction Technique, cherche un profil capable de porter une vision IA industrielle. Elle arrive sur le Dashboard de Daminou. En moins de 2 secondes, la page est chargée (Performance 90+). Elle est immédiatement rassurée par la barre de progression globale qui montre un engagement constant. Elle clique sur le dernier projet : elle y trouve une architecture claire, un lien vers un code structuré et des indicateurs de qualité. Elle n'a pas besoin de creuser des heures ; la fluidité et l'automatisation de l'outil lui prouvent la séniorité de Daminou. Elle enregistre le profil pour une mission de transformation à haut budget.

### Journey 3: Daminou - L'Administrateur Discret (Maintenance & Erreur)
Daminou a déplacé un dossier projet par erreur ou oublié de remplir un fichier obligatoire. Le Scanner s'exécute mais rencontre une anomalie. Plutôt que de casser l'affichage public ou de harceler Daminou avec des alertes, le système consigne l'erreur dans un fichier `scan.log`. Plus tard, lors d'une vérification de routine, Daminou ouvre son fichier de log, identifie le projet mal nommé, et corrige son fichier `config.yaml` à la main. Il relance le scan : tout rentre dans l'ordre en 5 secondes. L'image publique est restée impeccable pendant toute l'opération.

### Journey Requirements Summary
Ces récits révèlent des besoins techniques précis :
- **Onboarding/Config :** Système de configuration par fichiers (YAML/JSON) pour définir les chemins et les secrets (tokens API).
- **Core Engine :** Script de scan asynchrone capable de fusionner les données locales et distantes.
- **Error Handling :** Système de logging silencieux et persistant.
- **Frontend :** Architecture "Data-Driven" consommant un flux JSON statique pour une performance maximale.
- **Privacy/Gate :** Logique de filtrage basée sur des drapeaux (flags) dans la configuration ou les métadonnées des projets.

## Innovation & Novel Patterns

### Detected Innovation Areas
- **Self-Documenting Architecture :** Le dashboard ne se contente pas d'afficher des données, il "découvre" son propre contenu en temps réel. C'est un pattern d'automatisation poussé appliqué au branding personnel.
- **Agentic Workflow Foundation :** La structure (Scanner -> JSON -> UI) prépare le terrain pour une V2 où un agent IA pourra analyser le code source pour générer des insights business.

### Market Context & Competitive Landscape
- Contrairement aux portfolios classiques (LinkedIn, Behance, GitHub Pages simples), cette approche démontre une capacité d'ingénierie système. Elle place Daminou dans le top 1% des profils capables d'industrialiser leur propre environnement de travail.

### Validation Approach
- **Visual Validation :** Affichage d'un "System Status" (Dernier scan réussi, Nbr de projets découverts) pour prouver l'automatisation au visiteur.
- **Code Validation :** Accès direct au script de scan pour les recruteurs les plus techniques.

## Web App Specific Requirements

### Project-Type Overview
Le **Training Dashboard** est conçu comme une application web moderne de type **SPA (Single Page Application)**. Elle privilégie la vitesse d'exécution et la fluidité des transitions pour offrir une expérience "Premium" sans rechargement de page inutile.

### Technical Architecture Considerations
- **Architecture :** Utilisation de JavaScript moderne (ES6+) pour la manipulation dynamique du DOM à partir du flux `projects.json`.
- **Performance :** Cible de score Lighthouse > 90. Optimisation du chargement des ressources (images, scripts) pour un rendu quasi-instantané.
- **Data Lifecycle :** Les données sont rafraîchies à chaque chargement de page (via le fichier JSON généré par le scanner). Aucun besoin de flux temps réel (WebSockets) pour le MVP.

### Browser Matrix
- **Support :** Uniquement les navigateurs "Evergreen" (Chrome, Firefox, Safari, Edge dans leurs 2 dernières versions majeures).
- **Technos :** Utilisation des fonctionnalités natives (CSS Grid/Flexbox, Fetch API).

### SEO Strategy
- **Objectif :** Domination des résultats de recherche sur le nom "Damien GUESDON" et les mots-clés "CTO IA", "Directeur Technique Intelligence Artificielle".
- **Implémentation :** Balisage sémantique HTML5 strict, métadonnées OpenGraph/Twitter Cards, et optimisation du `title` / `meta description` pour chaque section dynamique.

### Accessibility Level (WCAG AA)
- **Standard :** Conformité **WCAG 2.1 niveau AA**.
- **Points clés :** Contrastes de couleurs élevés, navigation clavier complète, support des lecteurs d'écran (attributs ARIA) pour les éléments dynamiques (barres de progression, cartes de projets).

### Responsive Design
- **Approche :** Mobile-First. Le dashboard doit être parfaitement lisible sur smartphone (pour un recruteur consultant ton profil en déplacement) tout en exploitant la largeur des écrans desktop pour les graphiques de progression.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach :** Experience MVP (Delivering the key user experience with basic functionality). L'objectif est de prouver la capacité technique par la qualité de l'automatisation plutôt que par la quantité de fonctionnalités.

### MVP Feature Set (Phase 1)
**Core User Journeys Supported :**
- Daminou : Automatisation totale du flux (Délégation).
- Recruteur : Accès rapide aux preuves techniques (Confiance).
- Maintenance : Gestion silencieuse via logs et fichiers de config.

**Must-Have Capabilities :**
- Script de scan local (Node.js/Python) pour dossiers `Projet_<x>`.
- Intégration API GitHub (Commits, Langages, URLs).
- Génération automatisée du fichier `projects.json`.
- Refactorisation du Frontend en SPA Data-Driven.
- Système de configuration par fichier YAML/JSON.
- Journalisation des erreurs de scan (scan.log).

### Post-MVP Features
**Phase 2 (Growth) :**
- Section Veille IA automatisée (RSS/API).
- Badges de qualité technique (Tests/Sonar).
- Tracking Analytics des visites recruteurs.

**Phase 3 (Expansion) :**
- Agent RAG "Daminou-Bot".
- Résumés de projets générés par LLM à partir du code source.

### Risk Mitigation Strategy
- **Technical Risks :** Instabilité des structures de dossiers. *Mitigation :* Pattern matching flexible dans la configuration.
- **Market Risks :** Manque de visibilité de l'innovation. *Mitigation :* Indicateurs visuels "Live Data" explicites.
- **Resource Risks :** Dépendance aux API externes. *Mitigation :* Mise en cache locale des données distantes.

## Functional Requirements

### 1. Data Discovery & Extraction (The Scanner)
- FR1 : Le système peut scanner récursivement les répertoires locaux définis dans la configuration.
- FR2 : Le système peut identifier un "Projet" basé sur des motifs de noms de dossiers (ex: `Projet_<x>`).
- FR3 : Le système peut extraire les métadonnées de base (nom, date de création, date de modification) du système de fichiers.
- FR4 : Le système peut extraire le contenu des fichiers de documentation (ex: `README.md`) pour chaque projet.
- FR5 : Le système peut détecter la présence de fichiers spécifiques (ex: `.publiable`) pour déterminer le statut d'exposition publique.

### 2. External Integration (GitHub)
- FR6 : Le système peut interroger l'API GitHub pour récupérer les métadonnées des dépôts liés.
- FR7 : Le système peut extraire l'historique récent des commits pour chaque projet.
- FR8 : Le système peut identifier les langages de programmation utilisés et leurs proportions.
- FR9 : Le système peut mettre en cache les données GitHub pour limiter les appels API et assurer le fonctionnement hors-ligne/build.

### 3. Data Processing & Management
- FR10 : Le système peut fusionner les données locales et les données GitHub en une source de vérité unique (`projects.json`).
- FR11 : Le système peut calculer des agrégats globaux (heures totales, nombre de projets par statut).
- FR12 : Le système peut filtrer les projets "non-publiables" du flux de sortie final.

### 4. Dynamic Presentation (The Dashboard)
- FR13 : L'utilisateur peut visualiser la progression globale de la formation (KPIs).
- FR14 : L'utilisateur peut parcourir la liste des projets de manière chronologique ou par importance.
- FR15 : L'utilisateur peut consulter les détails d'un projet (Description, Technos, Activité GitHub, Liens) sans rechargement de page.
- FR16 : L'utilisateur peut accéder aux documents de support (README) directement depuis l'interface.
- FR17 : L'utilisateur peut déclencher une prise de contact via des liens d'action directs (LinkedIn, Email).

### 5. Administration & Monitoring
- FR18 : L'administrateur peut configurer les chemins sources et les secrets API via un fichier de configuration.
- FR19 : Le système peut consigner les anomalies de scan (fichiers manquants, erreurs API) dans un journal persistant.
- FR20 : Le système peut visualiser l'état de santé du dernier cycle d'automatisation (succès/échec, nbr de projets traités).

## Non-Functional Requirements

### Performance
- **Temps de chargement :** First Contentful Paint < 1s sur connexion 4G.
- **Fluidité :** Transitions SPA instantanées (< 100ms).
- **Lighthouse :** Score Performance ≥ 90/100.

### Security
- **Protection des Secrets :** Aucun token ou chemin système absolu dans les fichiers publics.
- **Sanitization :** Nettoyage automatique des entrées (XSS protection).
- **Privacy :** Filtrage strict des projets via le flag "publiable".

### Accessibility (WCAG AA)
- **Navigation :** 100% accessible au clavier.
- **Sémantique :** Utilisation exhaustive des rôles ARIA pour les états dynamiques.
- **Contraste :** Respect des ratios de contraste WCAG AA pour la lisibilité.

### Maintainability
- **Scanner Efficiency :** Exécution du scan en < 5s.
- **Simplicité Config :** Configuration centralisée en YAML/JSON.
- **Logging :** Journalisation détaillée des anomalies de scan (scan.log).

### Reliability
- **Résilience :** En cas de panne API GitHub, affichage des données locales en cache.
- **Stabilité :** Build statique garanti sans erreur fatale.
