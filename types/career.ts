// Career evolution and skills types

export type SectorType = 'marketing' | 'systems' | 'ai';

export interface CareerPhase {
  id: string;
  period: string; // e.g., "2015-2019"
  role: string;
  sector: SectorType;
  skills: string[];
  milestone: string;
  description: string;
  companies?: string[];
}

export interface SkillBadge {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SystemNode {
  id: string;
  label: string;
  type: 'sensor' | 'bus' | 'processor' | 'storage' | 'output';
  description: string;
  technologies: string[];
}

export interface SystemLayer {
  id: string;
  name: string;
  position: 'left' | 'center' | 'right';
  nodes: SystemNode[];
}

export interface DataFlow {
  from: string; // node id
  to: string; // node id
  label?: string;
  animated?: boolean;
}

export interface AVSystemArchitecture {
  layers: SystemLayer[];
  dataFlows: DataFlow[];
}

export interface CodeSnippet {
  id: string;
  projectName: string;
  description: string;
  language: 'python' | 'typescript' | 'javascript' | 'json' | 'bash';
  code: string;
  githubUrl?: string;
  fileName: string;
}
