export interface EngineeringDetails {
  architectureExplanation: string;
  diagramUrl: string;
  technicalKeyPoints: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  challenge: string;
  solution: string;
  images: string[];
  githubUrl: string;
  stack: string[];
  engineering: EngineeringDetails;
}

export interface PortfolioData {
  projects: Project[];
}
