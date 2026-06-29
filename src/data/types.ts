export interface Project {
  id: string;
  title: string;
  description: string;
  details?: string;
  thumbnail?: string;
  image?: string;
  screenshots?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  priority?: 'high' | 'medium' | 'low';
}

export interface Skill {
  category: string;
  items: {
    name: string;
    logo: string;
    link: string;
    color: string;
  }[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
  image?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  location: string;
  technologies?: string[];
  achievements?: string[];
  projects?: string[];
  responsibilities?: string[];
  skills?: string[];
  tools?: string[];
  certifications?: string[];
  awards?: string[];
  languages?: string[];
}

export interface Certifications {
  title: string;
  issuer: string;
  date: string;
  location?: string;
  description: string[];
  skills?: string[];
  link?: string;
  image?: string;
  category: 'competition' | 'other';
}
