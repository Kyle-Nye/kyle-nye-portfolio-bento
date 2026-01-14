import { ReactNode } from 'react';

export interface JobRole {
  company: string;
  role: string;
  year: string;
  description?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface SkillSet {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  role: string;
  readme?: string;
}

export interface FileSystemNode {
  name: string;
  type: 'directory' | 'file';
  children?: FileSystemNode[];
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

export interface TerminalEntry {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: ReactNode;
}