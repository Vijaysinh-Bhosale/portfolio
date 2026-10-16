export interface Profile {
  name: string;
  brandTitle: string;
  primaryHeadline: string;
  professionalTitle: string;
  shortIntro: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    coursework: string[];
  };
  location: string;
  availability: string;
  targetRoles: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
  };
  principles: {
    number: string;
    title: string;
    description: string;
  }[];
}

export interface SkillItem {
  name: string;
  description?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectContribution {
  area: string;
  detail: string;
}

export interface ProjectTechChoice {
  technology: string;
  rationale: string;
}

export interface ProjectArchitecture {
  overview: string;
  dataProcessing: string;
  modelMethodology: string;
  techChoices: ProjectTechChoice[];
  evaluationAndLimitations: string;
  flowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  featured: boolean;
  category: 'Machine Learning' | 'Predictive Analytics' | 'Generative AI';
  technologies: string[];
  contributions: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  architecture: ProjectArchitecture;
  demoType: 'crop2market' | 'predictive-maintenance' | 'chat-pdf';
}
