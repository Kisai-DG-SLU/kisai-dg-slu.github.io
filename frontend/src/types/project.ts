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

export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  UPCOMING = 'upcoming',
}

export interface Project {
  id: number;
  title: string;
  status: ProjectStatus;
  progress: number;
  duration: string;
  link?: string;
  icon: string;
  github_url?: string;
  category: string;
  short_description: string;
}

export interface ExpertiseCategory {
  title: string;
  subtitle?: string;
  items: ExpertiseItem[];
}

export interface ExpertiseItem {
  name: string;
  tags: string;
}

export interface ExpertiseMatrix {
  columns: ExpertiseCategory[];
}

export interface DashboardData {
  skills: Skills;
  formation: Formation;
  projects: Project[];
  expertise_matrix: ExpertiseMatrix;
}
