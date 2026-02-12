# Tâches : Refonte Système & Dashboard

## Phase 0 : Audit & Standardisation Système (TERMINÉE ✅)
- [x] Analyser la structure de configuration actuelle @ARCHITECT
- [x] Identifier les redondances et conflits de contexte @ARCHITECT
- [x] Proposer une hiérarchie de règles (Global > Catégorie > Projet) @ARCHITECT
- [x] Valider la méthode de duplication/uniformisation des processus @ARCHITECT

## Phase 1 : Cadrage & Docs (TERMINÉE ✅)
- [x] Rédiger specs/01_PRD.md @ANALYST
- [x] Rédiger specs/02_ARCHITECTURE.md @ARCHITECT
- [x] Définir specs/project-context.md @ARCHITECT

## Phase 2 : Développement (TERMINÉE ✅)
- [x] Initialiser l'environnement (Conda, uv, Tailwind v4) @DEV
- [x] Implémenter le Scanner Python (modèles, scan, data JSON) @DEV
- [x] Créer les composants React du Dashboard (Header, Hero, Skills, etc.) @DEV
- [x] Connecter le Frontend au `projects.json` via hook personnalisé @DEV
- [ ] Implémenter le client GitHub et l'intégrer au scanner pour récupérer les URLs des dépôts et les métadonnées @DEV

## Phase 3 : Déploiement & Automation (TERMINÉE ✅)
- [x] Configurer GitHub Actions pour le build et le déploiement @DEV
- [x] Intégrer la génération de rapport de Coverage @DEV
- [x] Déployer le Dashboard et le Coverage en sous-dossier @DEV
- [x] Corriger la Souveraineté CI (Permissions, Auto-merge, Stealth Mode)

## Phase 4 : Améliorations Frontend & Contenu
- [x] Mettre à jour les liens des cartes de projet vers leurs dépôts Git respectifs @DEV
- [ ] Initialiser les dépôts pour les projets 9 à 15 (si nécessaire) @DEV
- [x] Intégrer et évaluer les compétences IA :
    - Lire les fichiers `description_mission.md` à la racine des dépôts de projet.
    - Déduire les compétences abordées et attribuer un pourcentage de progression pour chaque compétence listée dans `skills.ai`.
    - Mettre à jour la section `skills.ai` dans `data/projects.json` en conséquence. @DEV
- [x] Rendre les descriptions des compétences IA dynamiques, synthétisées à partir des `description_mission.md` des projets. @DEV