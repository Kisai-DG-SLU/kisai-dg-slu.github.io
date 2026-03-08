import json
import re
from pathlib import Path
import typer
import subprocess # Nouvelle importation
from typing import Optional # Nouvelle importation
from collections import Counter # Nouvelle importation
from models import DashboardData, ProjectStatus, Project

app = typer.Typer()

DATA_PATH = Path(__file__).parent.parent / "data" / "projects.json"
PROJECTS_ROOT = Path("/Users/daminou/Documents/Formation_IA")
SPECS_ROOT = Path("/Users/daminou/Dev/Guesdon-Brain/Formation_IA")

def run_local_git_command(command: list[str], cwd: Path) -> Optional[str]:
    try:
        result = subprocess.run(command, cwd=cwd, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        # typer.echo(f"Warning: Git command failed in {cwd}: {e}", err=True)
        return None

def is_git_repo(path: Path) -> bool:
    return (path / ".git").is_dir()

def find_current_tasks_file(project_id: int, repo_path: Optional[Path]) -> Optional[Path]:
    """
    Cherche le fichier current_tasks.md dans plusieurs emplacements :
    1. Dans le dépôt Git (repo_path) récursivement
    2. Dans SPECS_ROOT/Projet_{project_id}/**/specs/current_tasks.md
    3. Dans SPECS_ROOT/Projet_{project_id}/**/current_tasks.md
    Retourne le premier fichier trouvé.
    """
    # Chercher dans le dépôt Git
    if repo_path and repo_path.exists():
        tasks_files = list(repo_path.rglob("current_tasks.md"))
        if tasks_files:
            return tasks_files[0]
    
    # Chercher dans SPECS_ROOT
    specs_project_dir = SPECS_ROOT / f"Projet_{project_id}"
    if specs_project_dir.exists():
        # Chercher récursivement dans specs/current_tasks.md
        specs_tasks = list(specs_project_dir.rglob("specs/current_tasks.md"))
        if specs_tasks:
            return specs_tasks[0]
        # Chercher récursivement directement current_tasks.md
        tasks_files = list(specs_project_dir.rglob("current_tasks.md"))
        if tasks_files:
            return tasks_files[0]
    
    return None

def calculate_progress_from_tasks(project_id: int, repo_path: Optional[Path]) -> int:
    """
    Calcule la progression à partir du fichier current_tasks.md.
    Cherche dans les deux racines (PRODUCTION et SPECS).
    """
    tasks_file = find_current_tasks_file(project_id, repo_path)
    if not tasks_file:
        return 0
    
    try:
        content = tasks_file.read_text(encoding="utf-8")
        tasks = re.findall(r"- \[([x ])\]", content)
        if not tasks:
            return 0
        completed = tasks.count("x")
        return int((completed / len(tasks)) * 100)
    except:
        return 0

def convert_ssh_to_https_url(ssh_url: str) -> str:
    if ssh_url.startswith("git@github.com:"):
        # Convert git@github.com:owner/repo.git to https://github.com/owner/repo
        return "https://github.com/" + ssh_url[len("git@github.com:"):].replace(".git", "")
    return ssh_url


def find_mission_description_file(project_id: int, repo_path: Optional[Path]) -> Optional[Path]:
    """
    Cherche le fichier description_mission.md dans plusieurs emplacements :
    1. Dans le dépôt Git (repo_path) récursivement dans specs/description_mission.md
    2. Dans le dépôt Git (repo_path) récursivement dans description_mission.md
    3. Dans SPECS_ROOT/Projet_{project_id}/**/specs/description_mission.md
    4. Dans SPECS_ROOT/Projet_{project_id}/**/description_mission.md
    Retourne le premier fichier trouvé.
    """
    # Chercher dans le dépôt Git
    if repo_path and repo_path.exists():
        # Chercher récursivement dans specs/description_mission.md
        mission_files_specs = list(repo_path.rglob("specs/description_mission.md"))
        if mission_files_specs:
            return mission_files_specs[0]
        # Chercher récursivement directement description_mission.md
        mission_files_root = list(repo_path.rglob("description_mission.md"))
        if mission_files_root:
            return mission_files_root[0]
    
    # Chercher dans SPECS_ROOT
    specs_project_dir = SPECS_ROOT / f"Projet_{project_id}"
    if specs_project_dir.exists():
        # Chercher récursivement dans specs/description_mission.md
        specs_mission_specs = list(specs_project_dir.rglob("specs/description_mission.md"))
        if specs_mission_specs:
            return specs_mission_specs[0]
        # Chercher récursivement directement description_mission.md
        specs_mission_root = list(specs_project_dir.rglob("description_mission.md"))
        if specs_mission_root:
            return specs_mission_root[0]
    
    return None


def read_mission_description(project_id: int, repo_path: Optional[Path]) -> Optional[str]:
    mission_file = find_mission_description_file(project_id, repo_path)
    if mission_file:
        typer.echo(f"DEBUG: Found mission description file at: {mission_file}")
        try:
            return mission_file.read_text(encoding="utf-8")
        except Exception as e:
            typer.echo(f"Warning: Could not read mission description for {mission_file}: {e}", err=True)
            return None
    else:
        typer.echo(f"DEBUG: No mission description file found for project {project_id}")
    return None

# Définition des mots-clés pour chaque compétence AI
SKILL_KEYWORDS = {
    "Python": ["script", "automatisation", "flask", "fastapi", "django", "backend dev"], # 6 mots-clés
    "Git & GitHub": ["version control", "workflow", "ci/cd", "repository management", "branching strategies"], # 5 mots-clés
    "Machine Learning": ["modèle prédictif", "apprentissage automatique", "régression", "classification", "clustering", "scikit-learn", "feature engineering"], # 7 mots-clés
    "MLOps": ["déploiement ml", "pipeline ml", "orchestration", "docker", "kubernetes", "ci/cd ml", "model monitoring", "model serving", "data versioning"], # 9 mots-clés
    "Deep Learning": ["réseaux neuronaux", "tensorflow", "pytorch", "keras", "vision par ordinateur", "nlp", "convolutionnel", "récurrent"], # 8 mots-clés
    "RAG": ["retrieval augmented generation", "langchain", "llamaindex", "embedding", "vector database", "information retrieval", "contextual generation", "knowledge retrieval"], # 8 mots-clés
    "LLM": ["traitement du langage naturel", "transformer", "generative ai", "prompt engineering", "fine-tuning", "language models"], # 6 mots-clés
}

# Poids pour la contribution des compétences (à ajuster)
# Un projet terminé contribue 1x, un projet en cours 0.5x (exemple)
COMPLETED_PROJECT_WEIGHT = 1.0
IN_PROGRESS_PROJECT_WEIGHT = 0.5

def analyze_project_skills(mission_content: str, project_status: ProjectStatus) -> tuple[dict[str, float], dict[str, list[str]]]:
    detected_skills_contribution = {skill_name: 0.0 for skill_name in SKILL_KEYWORDS.keys()}
    found_keywords_per_skill = {skill_name: [] for skill_name in SKILL_KEYWORDS.keys()}
    content_lower = mission_content.lower()

    project_weight = COMPLETED_PROJECT_WEIGHT if project_status == ProjectStatus.COMPLETED else \
                     (IN_PROGRESS_PROJECT_WEIGHT if project_status == ProjectStatus.IN_PROGRESS else 0.0)

    for skill_name, keywords in SKILL_KEYWORDS.items():
        current_skill_keywords_found = []
        for keyword in keywords:
            if keyword in content_lower:
                current_skill_keywords_found.append(keyword)
                detected_skills_contribution[skill_name] += 1.0 
        
        # La pondération par project_weight est supprimée d'ici et sera appliquée dans scan()
        # if detected_skills_contribution[skill_name] > 0:
        #     detected_skills_contribution[skill_name] *= project_weight
        
        found_keywords_per_skill[skill_name] = current_skill_keywords_found

    return detected_skills_contribution, found_keywords_per_skill

def get_project_intel(project_id: int) -> tuple[ProjectStatus, int, Optional[Path]]:
    project_base_dir = PROJECTS_ROOT / f"Projet_{project_id}"
    if not project_base_dir.exists():
        return ProjectStatus.UPCOMING, 0, None

    actual_project_repo_path: Optional[Path] = None
    # Chercher le sous-dossier qui est le vrai dépôt Git
    for sub_dir in project_base_dir.iterdir():
        if sub_dir.is_dir() and is_git_repo(sub_dir):
            actual_project_repo_path = sub_dir
            break

    # Règle métier : Les projets 1 à 7 sont terminés, même si leur état Git est différent localement
    if project_id <= 7:
        status = ProjectStatus.COMPLETED
        progress = 100
        # S'il y a un dépôt Git pour ces projets, on le retourne pour récupérer l'URL
        return status, progress, actual_project_repo_path

    progress = calculate_progress_from_tasks(project_id, actual_project_repo_path)
    
    if progress == 100:
        return ProjectStatus.COMPLETED, 100, actual_project_repo_path
    
    if progress > 0:
        return ProjectStatus.IN_PROGRESS, progress, actual_project_repo_path
    
    # Si pas de progression et pas de dépôt Git, considérer comme à venir
    if not actual_project_repo_path:
        return ProjectStatus.UPCOMING, 0, None
    
    # Sinon, dépôt Git existe mais progression 0 => en cours avec 0%
    return ProjectStatus.IN_PROGRESS, 0, actual_project_repo_path

@app.callback(invoke_without_command=True)
def main(ctx: typer.Context):
    if ctx.invoked_subcommand is None:
        scan()

@app.command()
def scan():
    """Scanne les répertoires et calcule l'avancement réel (Recursive)."""
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = DashboardData(**json.load(f))
    
    completed_count = 0
    total_hours_done = 0
    first_in_progress_project_id = None
    overall_skills_contribution: dict[str, float] = {skill_name: 0.0 for skill_name in SKILL_KEYWORDS.keys()}
    skill_descriptions_collector: dict[str, list[str]] = {skill_name: [] for skill_name in SKILL_KEYWORDS.keys()}
    # Pour stocker la contribution brute maximale que chaque compétence pourrait obtenir (pour la normalisation individuelle)
    max_raw_contribution_per_skill: dict[str, float] = {skill_name: 0.0 for skill_name in SKILL_KEYWORDS.keys()}
    
    for project in data.projects:
        status, progress, actual_project_repo_path = get_project_intel(project.id)
        typer.echo(f"DEBUG: Project {project.id} - Path: {actual_project_repo_path}, Status: {status}")
        project.status = status
        project.progress = progress
        project.icon = "✅" if status == ProjectStatus.COMPLETED else ("🔄" if status == ProjectStatus.IN_PROGRESS else "📅")

        # --- Git Local Integration Logic ---
        if actual_project_repo_path and actual_project_repo_path.exists() and is_git_repo(actual_project_repo_path):
            repo_url = run_local_git_command(["git", "config", "--get", "remote.origin.url"], actual_project_repo_path)
            if repo_url:
                http_repo_url = convert_ssh_to_https_url(repo_url)
                project.github_url = http_repo_url
                project.link = http_repo_url # Utiliser l'URL HTTPS comme lien principal
            else:
                project.github_url = None
                if project.status != ProjectStatus.UPCOMING and not project.link:
                    project.link = "#"
        else:
            project.github_url = None
            if project.status != ProjectStatus.UPCOMING and not project.link:
                project.link = "#"

        # --- Skills Analysis Logic ---
        if actual_project_repo_path and project.status != ProjectStatus.UPCOMING:
            mission_content = read_mission_description(project.id, actual_project_repo_path)
            if mission_content:
                typer.echo(f"DEBUG: Project {project.id} - Mission content read: {mission_content[:100]}...")
                # analyze_project_skills retourne maintenant la contribution brute (non pondérée)
                raw_project_skills_contribution, found_keywords_per_skill = analyze_project_skills(mission_content, project.status)
                typer.echo(f"DEBUG: Project {project.id} - Raw project skills contribution: {raw_project_skills_contribution}")

                # Appliquer le poids du projet ici pour overall_skills_contribution
                project_weight = COMPLETED_PROJECT_WEIGHT if project.status == ProjectStatus.COMPLETED else \
                                 (IN_PROGRESS_PROJECT_WEIGHT if project.status == ProjectStatus.IN_PROGRESS else 0.0)

                for skill_name, raw_contribution in raw_project_skills_contribution.items():
                    weighted_contribution = raw_contribution * project_weight
                    overall_skills_contribution[skill_name] += weighted_contribution
                    # Pour la contribution maximale potentielle, on prend la contribution brute maximale sans poids
                    max_raw_contribution_per_skill[skill_name] += raw_contribution # Accumuler la contribution brute pour chaque skill

                typer.echo(f"DEBUG:   Keywords found: {found_keywords_per_skill}")
                for skill_name, keywords_found in found_keywords_per_skill.items():
                    if keywords_found:
                        skill_descriptions_collector[skill_name].extend(keywords_found) # Collecter les mots-clés
                
                typer.echo(f"DEBUG: Overall skills contribution after Project {project.id}: {overall_skills_contribution}")
                typer.echo(f"DEBUG: Max raw contribution per skill after Project {project.id}: {max_raw_contribution_per_skill}")

        duration_in_hours = 0
        try:
            duration_in_hours = int(project.duration.replace('h', ''))
        except ValueError:
            # Handle cases where duration might not be a valid integer, e.g., log error
            pass # For now, silently ignore invalid durations
            
        if status == ProjectStatus.COMPLETED:
            completed_count += 1
            total_hours_done += duration_in_hours
        elif status == ProjectStatus.IN_PROGRESS:
            total_hours_done += (duration_in_hours * project.progress / 100)
            if first_in_progress_project_id is None:
                first_in_progress_project_id = project.id

    data.formation.current_project = first_in_progress_project_id

    data.formation.completed_projects_count = completed_count
    data.formation.completed_hours = int(total_hours_done)

    typer.echo(f"DEBUG: Overall skills contribution before final calc: {overall_skills_contribution}")
    typer.echo(f"DEBUG: Max raw contribution per skill (total): {max_raw_contribution_per_skill}")

    # --- Verrou de sécurité : Tous les projets terminés à 100% => toutes les compétences à 100% ---
    all_projects_completed_at_100_percent = (
        data.formation.completed_projects_count == data.formation.projects_total
        and all(p.status == ProjectStatus.COMPLETED and p.progress == 100 for p in data.projects)
    )

    if all_projects_completed_at_100_percent:
        typer.echo("INFO: All projects are completed at 100%. Setting all AI skills to 100%.")
        for skill_data in data.skills.ai:
            skill_data.level = 100
            # Mettre à jour la description dynamiquement même si le niveau est 100%
            skill_name = skill_data.title
            collected_keywords = skill_descriptions_collector.get(skill_name, [])
            if collected_keywords:
                keyword_counts = Counter(collected_keywords)
                most_common_keywords = [keyword for keyword, count in keyword_counts.most_common(5)] # Les 5 plus fréquents
                # Formatage : UPPER pour les acronymes courts, Capitalize pour le reste
                formatted_keywords = [k.upper() if len(k) <= 3 else k.capitalize() for k in most_common_keywords]
                skill_data.description = ", ".join(formatted_keywords) + "."
            else:
                skill_data.description = "Maîtrise complète acquise." # Description par défaut si pas de mots-clés
    else:
        # --- Final Skills Level Calculation and Normalization (logique par compétence) ---
        for skill_data in data.skills.ai:
            skill_name = skill_data.title
            contribution = overall_skills_contribution.get(skill_name, 0.0)
            
            # Calcul du score de référence maximal pour CETTE compétence, basé sur sa contribution potentielle
            # On vise un max de 110% pour avoir une marge avant de plafonner à 100%
            # La somme des raw_contributions pour cette skill donne son max_possible_brut
            max_potential_raw_contribution = max_raw_contribution_per_skill.get(skill_name, 0.0)
            
            if max_potential_raw_contribution == 0:
                max_ref_score_for_100_percent = 1.0 # Éviter la division par zéro, ou laisser à 0% si pas de contribution
            else:
                max_ref_score_for_100_percent = max_potential_raw_contribution / 1.1 # Vise 110% du max pour être 100% après normalisation
            
            if max_ref_score_for_100_percent == 0: max_ref_score_for_100_percent = 1.0 # Double check pour éviter division par zéro

            # Normaliser à un niveau entre 0 et 100
            normalized_level = int((contribution / max_ref_score_for_100_percent) * 100)
            typer.echo(f"DEBUG: Skill '{skill_name}' - Contribution: {contribution}, Max Potential Raw: {max_potential_raw_contribution}, Ref Score (100%): {max_ref_score_for_100_percent}, Normalized Level: {normalized_level}")
            skill_data.level = min(normalized_level, 100) # Assurer que le niveau ne dépasse pas 100

            # Mettre à jour la description dynamiquement
            collected_keywords = skill_descriptions_collector.get(skill_name, [])
            if collected_keywords:
                keyword_counts = Counter(collected_keywords)
                most_common_keywords = [keyword for keyword, count in keyword_counts.most_common(5)] # Les 5 plus fréquents
                # Formatage : UPPER pour les acronymes courts, Capitalize pour le reste
                formatted_keywords = [k.upper() if len(k) <= 3 else k.capitalize() for k in most_common_keywords]
                skill_data.description = ", ".join(formatted_keywords) + "."
            else:
                skill_data.description = "À venir." # Description par défaut si pas de mots-clés
    
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data.model_dump(), f, indent=2, ensure_ascii=False)
    
    typer.echo(f"✅ Dashboard Intelligence (Recursive) : {completed_count} projets finis.")

    # Temporary Debugging for Hook Deployment Paths
    typer.echo("DEBUG: Project repositories paths for hooks deployment:")
    for project_id in range(8, 16):
        _status, _progress, repo_path = get_project_intel(project_id)
        if repo_path and repo_path.exists() and is_git_repo(repo_path):
            typer.echo(f"DEBUG:   Projet {project_id}: {repo_path}")
        else:
            typer.echo(f"DEBUG:   Projet {project_id}: Not found or not a Git repo locally.")

if __name__ == "__main__":
    app()
