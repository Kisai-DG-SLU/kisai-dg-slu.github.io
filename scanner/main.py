import json
import re
from pathlib import Path
import typer
from models import DashboardData, ProjectStatus, Project

app = typer.Typer()

DATA_PATH = Path("../data/projects.json")
PROJECTS_ROOT = Path("/Users/daminou/Documents/Formation_IA")

def calculate_progress_from_tasks(project_dir: Path) -> int:
    # On cherche current_tasks.md de manière récursive dans le projet
    tasks_files = list(project_dir.rglob("current_tasks.md"))
    if not tasks_files:
        return 0
    
    # On prend le premier trouvé (généralement le plus proche de la racine)
    tasks_file = tasks_files[0]
    
    try:
        content = tasks_file.read_text(encoding="utf-8")
        tasks = re.findall(r"- \[([x ])\]", content)
        if not tasks:
            return 0
        completed = tasks.count("x")
        return int((completed / len(tasks)) * 100)
    except:
        return 0

def get_project_intel(project_id: int) -> tuple[ProjectStatus, int]:
    if project_id <= 7:
        return ProjectStatus.COMPLETED, 100
    
    project_dir = PROJECTS_ROOT / f"Projet_{project_id}"
    if not project_dir.exists():
        return ProjectStatus.UPCOMING, 0
    
    progress = calculate_progress_from_tasks(project_dir)
    
    if progress == 100 or (project_dir / ".completed").exists():
        return ProjectStatus.COMPLETED, 100
    
    return ProjectStatus.IN_PROGRESS, progress

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
    
    for project in data.projects:
        status, progress = get_project_intel(project.id)
        project.status = status
        project.progress = progress
        project.icon = "✅" if status == ProjectStatus.COMPLETED else ("🔄" if status == ProjectStatus.IN_PROGRESS else "📅")
        
        if status == ProjectStatus.COMPLETED:
            completed_count += 1
            try:
                total_hours_done += int(project.duration.replace('h', ''))
            except: pass
        elif status == ProjectStatus.IN_PROGRESS:
            data.formation.current_project = project.id

    data.formation.completed_projects_count = completed_count
    data.formation.completed_hours = total_hours_done
    
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data.model_dump(), f, indent=2, ensure_ascii=False)
    
    typer.echo(f"✅ Dashboard Intelligence (Recursive) : {completed_count} projets finis.")

if __name__ == "__main__":
    app()
