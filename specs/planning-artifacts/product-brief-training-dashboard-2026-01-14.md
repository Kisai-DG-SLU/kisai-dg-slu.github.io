---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: 
  - "https://github.com/Kisai-DG-SLU/kisai-dg-slu.github.io"
  - "https://kisai-dg-slu.github.io/"
date: "2026-01-14"
author: "Daminou"
---

# Product Brief: training-dashboard

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

Le **Training Dashboard** est une plateforme duale : outil de pilotage personnel pour Daminou et vitrine technologique dynamique pour les recruteurs/prospects. Il résout le problème critique de l'obsolescence du portfolio statique actuel en automatisant la collecte de données depuis l'environnement de développement local et GitHub. Plus qu'un CV, c'est une preuve de concept vivante des compétences de Daminou en tant que CTO IA, démontrant sa capacité à industrialiser, automatiser et valoriser la donnée en temps réel.

---

## Core Vision

### Problem Statement
Actuellement, le suivi de la formation (804h, 15 projets) et la mise à jour du portfolio nécessitent une intervention manuelle dans le code HTML, entraînant un retard chronique des informations. Ce décalage décrédibilise le profil technique en présentant une vitrine figée, alors que le rôle visé (Directeur Technique IA) exige dynamisme, automatisation et rigueur.

### Problem Impact
- **Personnel :** Perte de temps en maintenance manuelle, visibilité floue sur l'avancement réel.
- **Professionnel :** Opportunités manquées car le portfolio ne reflète pas le niveau de compétence réel ni la capacité à créer des systèmes automatisés.

### Why Existing Solutions Fall Short
- **Portfolio statique :** Beau mais inerte. Ne montre pas "le moteur sous le capot".
- **Outils externes (Trello/Jira) :** Déconnectés de la vitrine publique, ils ne servent qu'à l'organisation interne sans valoriser le travail accompli aux yeux des tiers.

### Proposed Solution
Un **Dashboard Dynamique** qui :
1.  **S'auto-alimente** en scannant les répertoires locaux `~/Documents/Formation_IA/Projet_<x>/` et les dépôts GitHub.
2.  **Visualise** la progression (heures, projets validés) via des graphiques interactifs.
3.  **Sert de démonstrateur** technique : l'outil lui-même prouve les compétences en développement, automatisation et data.

### Key Differentiators
- **"Living Proof" :** Le dashboard n'est pas une brochure, c'est une application vivante.
- **Automatisation Totale :** Zéro saisie manuelle pour la mise à jour des statuts.
- **Transparence Technique :** Affiche non seulement le résultat, mais la vélocité et la qualité du travail en temps réel.

## Target Users

### Primary Users

#### 1. Daminou (Le Stratège IA & Chef d'Orchestre)
- **Profil :** Directeur Technique Senior (ex-125k€, management 15p) en transition vers l'Expertise IA Stratégique.
- **Ambition :** Postes de Direction Technique ou Prestations Haut Niveau (Transformation IA, RAG/CAG sécurisé).
- **Philosophie :** "Faire faire" et déléguer (aux équipes ou aux machines). Le code est un moyen, pas une fin.
- **Pain Point Majeur :** Le temps perdu en tâches manuelles (mise à jour portfolio) qui ne créent pas de valeur stratégique.
- **Exigence Système :** Un filtre "Qualité Publiable". Seul ce qui est abouti et valorisant doit être visible.

#### 2. Le "Décideur Haut de Gamme" (Recruteur Exécutif / Client Grand Compte)
- **Profil :** DG, DRH Groupe ou Client cherchant à sécuriser un virage IA.
- **Critères de Choix :** Sécurité, Vision Industrielle, ROI, Capacité à fédérer.
- **Ce qu'il cherche dans le Dashboard :**
    - **Maturité :** Pas de "bricolage". Un produit fini, stable.
    - **Sécurité :** Une approche "Privacy by Design" (reflétant ta préoccupation sur la fuite de données).
    - **Architecture :** Une structure claire qui prouve la capacité à gérer la complexité.

### Secondary Users
- **Mentors :** Accès fonctionnel pour validation ponctuelle.

### User Journey (Le Décideur)
1.  **Arrivée :** Perçoit instantanément un "Produit Professionnel" (Design épuré, KPI business).
2.  **Réassurance :** Voit des indicateurs de qualité (Tests, Documentation) et non juste du code brut.
3.  **Projection :** Se dit "Cette personne sait construire des outils qui augmentent la productivité sans risque."
4.  **Action :** Contacte pour une mission de conseil ou un poste de direction.

### Key Interactions
- **Automated Publishing :** Le système détecte un projet "Terminé & Validé" -> Le publie.
- **Quality Gate :** Le système bloque la publication si les standards (Docs, Tests) ne sont pas atteints -> Protège l'image de marque.

## Success Metrics

### User Success Metrics
- **Pour Daminou :** "Zero-Touch Maintenance". Réduction du temps de maintenance manuelle du portfolio de 100%. Le succès est atteint quand une mise à jour ne nécessite aucun clic sur le dashboard lui-même.
- **Pour le Décideur :** "Time to Trust". Réduction du temps nécessaire pour valider la séniorité de Daminou. Le succès est atteint quand un prospect engage la conversation technique directement au niveau "Expert".

### Business Objectives
- **Conversion :** Transformer les visiteurs passifs en prospects qualifiés (demandes de contact directes).
- **Positionnement :** Établir Daminou comme un expert IA capable d'industrialiser des solutions (Preuve par l'exemple).
- **Liberté :** Permettre à Daminou de se concentrer sur son apprentissage et ses missions plutôt que sur sa propre infra.

### Key Performance Indicators
- **Automation Rate :** 100% (Aucune modification de fichier HTML/JS pour mettre à jour les projets).
- **Data Freshness :** < 1 heure entre un commit GitHub/Local et l'affichage sur le Dashboard.
- **Engagement :** Taux de clics sur le bouton "Contact / LinkedIn" supérieur à 5% des visiteurs uniques.
- **Quality Standard :** 0 projet "en échec" ou non-documenté visible sur la vitrine publique (Quality Gate automatique).

## MVP Scope

### Core Features
- **Local Project Scanner :** Script automatisé scannant les répertoires `Projet_<x>` pour extraire les métadonnées et alimenter un `projects.json`.
- **GitHub Integration :** Synchronisation automatique avec l'API GitHub pour récupérer l'activité réelle (commits, langages, liens).
- **Dynamic Frontend Refactoring :** Transformation du portfolio actuel en application dynamique pilotée par les données (JSON).
- **Progress Tracking KPI :** Affichage en temps réel de l'avancement (Heures/804, Projets/15).
- **Quality Filter :** Mécanisme simple pour masquer les projets non-aboutis de la vue publique.

### Out of Scope for MVP
- **Intégration IA Complexe :** Pas d'agent conversationnel ou d'analyse IA automatique du code pour le moment.
- **Backend Database :** Utilisation de fichiers JSON plats pour plus de simplicité et de performance (Static Site Generation approach).
- **Multi-utilisateur :** Dashboard strictement réservé au profil de Daminou.

### MVP Success Criteria
- **Validation Technique :** Le dashboard se met à jour en moins de 10 secondes après lancement du scanner.
- **Validation Usage :** Daminou ne modifie plus aucun fichier `.html` pour ajouter un projet.
- **Validation Visuelle :** Pas de régression de design par rapport au portfolio actuel.

### Future Vision
- **"Chat with my Skills" :** Interface RAG permettant aux recruteurs de poser des questions sur l'expérience de Daminou.
- **Social Automation :** Publication automatique des étapes de formation franchies sur LinkedIn.
- **Advanced Tech Badges :** Intégration de scores de qualité de code et de couverture de tests en temps réel.
