import { profileData, skillCategories, experiences, projects } from "@/data/profile";
import type { Node } from "@xyflow/react";

export type CanvasNodeData = {
  profile?: typeof profileData;
  skills?: typeof skillCategories;
  experiences?: typeof experiences;
  project?: (typeof projects)[number];
  contact?: { email: string; linkedin: string; github: string; location: string };
};

export const canvasNodes: Node<CanvasNodeData>[] = [
  {
    id: "bio",
    type: "bioNode",
    position: { x: 0, y: 0 },
    data: { profile: profileData },
  },
  {
    id: "skills",
    type: "skillsNode",
    position: { x: -650, y: -200 },
    data: { skills: skillCategories },
  },
  {
    id: "experience",
    type: "experienceNode",
    position: { x: -650, y: 300 },
    data: { experiences },
  },
  {
    id: "contact",
    type: "contactNode",
    position: { x: 0, y: 700 },
    data: {
      contact: {
        email: profileData.email,
        linkedin: profileData.linkedin,
        github: profileData.github,
        location: profileData.location,
      },
    },
  },
  ...projects.map((project, i) => ({
    id: `project-${project.id}`,
    type: "projectNode",
    position: { x: 700, y: -300 + i * 200 },
    data: { project },
  })),
];

export const canvasEdges = [
  { id: "bio-skills", source: "bio", target: "skills" },
  { id: "bio-experience", source: "bio", target: "experience" },
  { id: "bio-contact", source: "bio", target: "contact" },
  ...projects.map((project) => ({
    id: `bio-project-${project.id}`,
    source: "bio",
    target: `project-${project.id}`,
  })),
];
