import json
import os
from pathlib import Path
import typer
from models import DashboardData, ProjectStatus, Project

app = typer.Typer()

DATA_PATH = Path("../data/projects.json")
PROJECTS_ROOT = Path("..")

def load_data() -> DashboardData:
    if not DATA_PATH.exists():
        typer.echo(f"Erreur : {DATA_PATH} introuvable.")
        raise typer.Exit(code=1)
    
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return DashboardData(**json.load(f))

def save_data(data: DashboardData):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data.model_dump(), f, indent=2, ensure_ascii=False)

@app.callback(invoke_without_command=True)
def main(ctx: typer.Context):
    """Scanne les répertoires locaux et met à jour le dashboard."""
    if ctx.invoked_subcommand is None:
        scan()

@app.command()
def scan():
    """Scanne les répertoires locaux et met à jour le dashboard."""
    data = load_data()
    
    # Simulation de la logique de détection
    # Pour le MVP, on regarde si le dossier Projet_X existe
    for project in data.projects:
        project_dir = PROJECTS_ROOT / f"Projet_{project.id}"
        
        if project_dir.exists():
            # Logique simple : si le dossier existe, il est au moins 'upcoming'
            # On pourrait chercher un fichier spécifique pour marquer 'completed'
            if (project_dir / ".completed").exists():
                project.status = ProjectStatus.COMPLETED
                project.icon = "✅"
            elif project.status == ProjectStatus.UPCOMING:
                # Si le dossier existe mais pas de .completed, on passe en in_progress
                project.status = ProjectStatus.IN_PROGRESS
                project.icon = "🔄"
        
    # Recalcul des stats de formation
    completed_projects = [p for p in data.projects if p.status == ProjectStatus.COMPLETED]
    data.formation.completed_projects_count = len(completed_projects)
    # Simulation d'heures (à affiner avec les réelles données)
    # data.formation.completed_hours = sum(int(p.duration.replace('h', '')) for p in completed_projects)

    save_data(data)
    typer.echo("Scan terminé et data/projects.json mis à jour.")

if __name__ == "__main__":
    app()