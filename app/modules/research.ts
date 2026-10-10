export const researchHighlightTerms = [
  "AI systems",
  "human understanding",
  "creativity",
  "sensemaking",
  "interactive systems design",
  "think, explore, and create",
] as const;

export const researchInterestCards = [
  "Human-Computer Interaction",
  "Human-Agent Collaboration",
  "Visualization",
  "AI-mediated Decision-making",
] as const;

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  venueUrl?: string;
  underReview?: boolean;
  accept?: boolean;
  year?: number;
  keywords: string[];
  url?: string;
  doi?: string;
  pdf?: string;
  image: string;
  cofirst?: string[];
  bold?: string[];
};

export type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
};

import publicationsData from "./publications.json";
import projectsData from "./projects.json";

export const publications: Publication[] = publicationsData;
export const projects: Project[] = projectsData;

export type ResearchBlockId = "interests" | "publications" | "projects";

export type ResearchBlock = {
  id: ResearchBlockId;
  label: string;
  kicker: string;
  title: string;
  content: string;
};

export const researchModule = {
  id: "research",
  index: "02",
  title: "Research",
  blocks: [
    {
      id: "publications",
      label: "Publications",
      kicker: "Selected Work",
      title: "Publications",
      content:
        "Use this area for featured papers, conference output, and publication highlights.",
    },
    {
      id: "projects",
      label: "Projects",
      kicker: "Active Tracks",
      title: "Projects",
      content:
        "To be completed.",
    },
    {
      id: "interests",
      label: "Interests",
      kicker: "Current Focus",
      title: "Interests",
      content:
        "My research explores how AI systems can support human understanding, creativity, and sensemaking. I am especially interested in the interactive design that helps people think, explore, and create more effectively and smoothly. Currently, I am working on AI-mediated Decision-making. ",
    },
  ] satisfies readonly ResearchBlock[],
} as const;
