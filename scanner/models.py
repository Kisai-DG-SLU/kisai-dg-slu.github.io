from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class ProjectStatus(str, Enum):
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"
    UPCOMING = "upcoming"

class Project(BaseModel):
    id: int
    title: str
    status: ProjectStatus
    duration: str
    link: Optional[str] = None
    icon: str
    github_url: Optional[str] = None

class Skill(BaseModel):
    title: str
    description: str
    level: int

class Skills(BaseModel):
    cto: List[Skill]
    ai: List[Skill]

class Formation(BaseModel):
    title: str
    total_hours: int
    completed_hours: int
    current_project: int
    projects_total: int
    completed_projects_count: int

class DashboardData(BaseModel):
    skills: Skills
    formation: Formation
    projects: List[Project]
