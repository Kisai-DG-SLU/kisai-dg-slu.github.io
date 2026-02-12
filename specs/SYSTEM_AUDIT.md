# AUDIT SYSTÈME : ARCHITECTURE DE L'INFORMATION

## 1. CONSTAT DE L'EXISTANT
- **Fragmentation** : Présence de fichiers GEMINI.md dans chaque projet avec des instructions parfois contradictoires (ex: stack Python imposée vs HTML/JS réel).
- **Redondance** : Les protocoles de sécurité (Sérénité) sont répétés dans chaque agent et chaque GEMINI.md.
- **Dette Technique Contextuelle** : Le modèle est submergé par des instructions globales injectées au niveau projet, réduisant sa 'fenêtre d'attention' pour les tâches réelles.

## 2. HIÉRARCHIE PROPOSÉE (The Pyramid of Truth)
### Niveau 0 : CONSTITUTION (Global)
- Emplacement : `~/Documents/GEMINI_GLOBAL.md` (ou similaire).
- Contenu : Règles de sécurité, Git, Langues, Protocoles de base (Sérénité).
- *Interdiction de duplication dans les projets.*

### Niveau 1 : CATEGORY_POLICY (Perso, Formation, Client)
- Emplacement : Dossier parent de la catégorie.
- Contenu : Licensing, standards spécifiques (ex: MIT pour Formation).

### Niveau 2 : PROJECT_CONTEXT (Spécifique)
- Emplacement : `GEMINI.md` du projet.
- Contenu : Stack technique, objectifs métier, variables locales.

## 3. UNIFORMISATION DES MÉTHODES
- Création d'une 'Bibliothèque de Procédures' (`_bmad/common/procedural_library.md`).
- Toute méthode validée (ex: workflow de commit) y est stockée et référencée par son ID.

### Incident 2026-01-14-02 : Échec de la Souveraineté CI
- **Cause** : Permissions GITHUB_TOKEN insuffisantes (read-only) et Auto-merge désactivé sur le dépôt.
- **Résolution** : Passage du token en 'write', activation de 'can_create_pr' via API gh, et activation globale de l'Auto-merge.
- **Statut** : Corrigé. Standard du Projet 8 appliqué.
