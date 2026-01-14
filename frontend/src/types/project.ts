export interface Skill {
  title: string;
  description: string;
  level: number;
}

export interface Skills {
  cto: Skill[];
  ai: Skill[];
}

export interface Formation {
  title: string;
  total_hours: number;
  completed_hours: number;
  current_project: number;
  projects_total: number;
  completed_projects_count: number;
}

export type ProjectStatus = 'completed' | 'in_progress' | 'upcoming';

export interface Project {
  id: number;
  title: string;
  status: ProjectStatus;
  progress: number;
  duration: string;
  link?: string;
  icon: string;
  github_url?: string;
}

export interface DashboardData {
  skills: Skills;
  formation: Formation;
  projects: Project[];
}
