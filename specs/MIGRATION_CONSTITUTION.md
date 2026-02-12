# PLAN DE MIGRATION : CONSTITUTION & STANDARDS

## 1. OBJECTIF
Passer d'une configuration 'Tout-en-un' polluante à une architecture modulaire 'Juste-à-temps' pour éliminer les hallucinations techniques.

## 2. ÉTAPE 1 : ÉPURATION DU GLOBAL (~/.gemini/GEMINI.md)
- **À CONSERVER** : Protocoles de vie (Sérénité, Session), Standards Git (Conventional Commits), Rôles des agents, Synchronisation Brain.
- **À SUPPRIMER** : Toute mention de Stack technique (Python, Conda, Docker), Souvenirs de projets spécifiques (surf-and-cats, Projet 8).

## 3. ÉTAPE 2 : MODULARISATION DANS LE BRAIN (~/Dev/Guesdon-Brain/Standards/)
Création de 'Briques de Connaissance' :
- `std-python.md` : Règles Python 3.10, Conda, Ruff.
- `std-web.md` : Règles HTML/CSS/JS, Standards UI/UX.
- `std-mobile.md` : Règles Kotlin, Compose Multiplatform.

## 4. ÉTAPE 3 : RÉFÉRENCEMENT LOCAL (GEMINI.md projet)
Le fichier local devient un simple aiguillage :
```markdown
# CONTEXTE : [Nom Projet]
- Stack : Web (Charger ~/Dev/Guesdon-Brain/Standards/std-web.md)
- Mode : [Perso|Client|Formation]
```

## 5. SÉCURITÉ ET REPLI
- Sauvegarde de l'ancien GEMINI.md global avant modification.
- Test sur le projet 'Dashboard' avant déploiement aux autres projets.
