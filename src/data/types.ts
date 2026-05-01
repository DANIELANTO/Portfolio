export interface EngineeringDetails {
  architectureExplanation_en: string;
  architectureExplanation_es: string;
  diagramUrl: string;
  technicalKeyPoints_en: string[];
  technicalKeyPoints_es: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description_en: string;
  description_es: string;
  videoUrl: string;
  challenge_en: string;
  challenge_es: string;
  solution_en: string;
  solution_es: string;
  images: string[];
  githubUrl: string;
  stack: string[];
  engineering: EngineeringDetails;
}

export interface PortfolioData {
  projects: Project[];
}
