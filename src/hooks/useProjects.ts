import type { Project, PortfolioData } from '../data/types';

let projectsPromise: Promise<Project[]> | null = null;

export const fetchProjects = (): Promise<Project[]> => {
  if (!projectsPromise) {
    projectsPromise = fetch('/src/data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching projects');
        return res.json();
      })
      .then((data: PortfolioData) => data.projects);
  }
  return projectsPromise;
};
