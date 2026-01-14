import { Project, FileSystemNode } from './types';
import type { CareerPhase, AVSystemArchitecture, CodeSnippet } from './types/career';
import type { WorkflowStep } from './types/automation';

export const PROFILE = {
  name: "Kyle Nye",
  title: "AI Solutions Architect & Systems Specialist",
  tagline: "Architecting intelligent systems. From Autonomous Vehicles to Autonomous Agents.",
  location: "Houston, TX",
  email: "kyle.j.nye@proton.me",
  socials: {
    github: "github.com/Kyle-Nye",
    linkedin: "linkedin.com/in/kylejnye"
  }
};

export const ABOUT_SUMMARY = `An AI-Native Engineer and Systems Specialist with over 5 years of experience ensuring reliability for autonomous vehicle fleets (Tesla, Zoox, Nuro). Now leveraging that operational expertise to architect self-healing automation pipelines and agentic AI applications. I specialize in high-level system design, utilizing LLMs as force multipliers to accelerate full-stack development.`;

export const SKILLS_TREE: FileSystemNode = {
  name: "root",
  type: "directory",
  children: [
    {
      name: "automation_architect",
      type: "directory",
      children: [
        { name: "n8n_Workflows", type: "file" },
        { name: "Agentic_Orchestration", type: "file" },
        { name: "System_Prompts.md", type: "file" }
      ]
    },
    {
      name: "ai_native_stack",
      type: "directory",
      children: [
        { name: "Cursor_IDE", type: "file" },
        { name: "LLM_Integration", type: "file" },
        { name: "RAG_Pipelines", type: "file" }
      ]
    },
    {
      name: "web_engineering",
      type: "directory",
      children: [
        { name: "Next.js_14", type: "file" },
        { name: "TypeScript", type: "file" },
        { name: "Tailwind_CSS", type: "file" }
      ]
    },
    {
      name: "systems_ops",
      type: "directory",
      children: [
        { name: "Linux_CLI", type: "file" },
        { name: "Bash_Scripting", type: "file" },
        { name: "Telemetry_Analysis", type: "file" }
      ]
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "portfolio_v2",
    name: "Portfolio v2 (This Site)",
    // UPDATED: The "Power Frame" description
    description: "Accelerated Development Strategy: leveraged LLMs to bypass boilerplate and focus purely on System Architecture and Logic. Audited and deployed by a Systems Engineer.",
    stack: ["AI-Native Workflow", "React", "System Architecture"],
    role: "Technical Architect",
    readme: `# Portfolio v2: The "AI-Native" Proof of Concept

## The Philosophy
This entire application was built to demonstrate a core belief: **The future of coding is Architecture, not Syntax.**

## Development Velocity
- **Time to Deploy:** < 12 Hours
- **Code Written Manually:** < 5%
- **Tools Used:** Cursor (IDE), AI Assistant (Logic), v0 (UI Scaffolding)

## The "Technical Architect" Approach
Instead of writing CSS classes by hand, I acted as the Systems Architect, defining:
1.  **Visual Constraints:** "Industrial/Bento, Dark Mode, Amber Accents"
2.  **Data Structures:** "JSON-based Resume schemas"
3.  **Component Logic:** "Recursive file explorer with state management"

This project proves that with the right architectural guidance, a single engineer can output the work of a full frontend team.`
  },
  {
    id: "n8n_autoblog",
    name: "n8n AI Autoblog",
    description: "An autonomous system that researches, drafts, and publishes technical content using AI Agents.",
    stack: ["n8n", "OpenAI API", "Ghost CMS"],
    role: "Automation Architect",
    readme: `# Autonomous Content Engine

## Overview
This project is an end-to-end automated blogging system built entirely within n8n. It uses a multi-agent architecture to research topics, draft content, review for accuracy, and publish to a CMS.

## Workflow Steps
1. **Trigger**: Scheduled timer or manual webhook with a topic.
2. **Research Agent**: Scrapes top search results using Serper API.
3. **Drafting Agent**: Uses GPT-4o to synthesize research into a structured article.
4. **Editor Agent**: Reviews the draft against a style guide and SEO best practices.
5. **Publishing**: Formats HTML and pushes to Ghost CMS via API.`
  },
  {
    id: "geek_tak",
    name: "GeekTak.com",
    description: "A tech publication exploring AI engineering and digital culture.",
    stack: ["Headless CMS", "AI Content Workflows", "Next.js"],
    role: "Founder",
    readme: `# GeekTak.com - Architecture Overview

## Introduction
GeekTak is a modern tech publication designed to bridge the gap between AI engineering and digital culture. The platform serves as both a content hub and a playground for testing automated content workflows.

## Core Features
- **Headless Architecture**: Decoupled CMS using Ghost for content management and Next.js for the frontend.
- **AI Integration**: Custom pipelines that assist in tagging, summarizing, and suggesting related content.`
  }
];

// Changed to Industrial Diagnostics
export const BOOT_LOGS = [
  "BIOS CHECK .......................... OK",
  "ALLOCATING MEMORY (VIRTUAL) ......... 16GB OK",
  "CALIBRATING NEURAL NETWORKS ......... OK",
  "MOUNTING FILE SYSTEM ................ RO/RW OK",
  "SECURITY PROTOCOLS .................. ACTIVE",
  "ESTABLISHING SECURE UPLINK .......... CONNECTED (24ms)",
  "INITIALIZING GUI .................... READY"
];

// Career Evolution Data - UNIFIED NARRATIVE
export const CAREER_PHASES: CareerPhase[] = [
  {
    id: 'marketing',
    period: '2015-Present',
    role: 'Growth & Content Strategy',
    sector: 'marketing',
    skills: ['Amazon Influencer', 'Revenue Ops', 'SEO', 'Analytics', 'Brand Strategy'],
    milestone: 'Built scalable revenue streams via programmatic SEO & Affiliate networks',
    description: 'Continuously operating at the intersection of media and revenue. I build the content engines that drive traffic, while using my engineering skills to automate the distribution.'
  },
  {
    id: 'av-systems',
    period: '2019-Present',
    role: 'Autonomous Systems Operations',
    sector: 'systems',
    companies: ['Tesla', 'Zoox', 'Nuro'],
    skills: ['Linux/Bash', 'Telemetry', 'Incident Response', 'Hardware Diagnostics'],
    milestone: '5+ Years validating Tier-1 Autonomous Fleets',
    description: 'A unified track record of ensuring system reliability for the industry leaders (Tesla, Zoox, Nuro). From validating sensor data integrity to maintaining Linux-based compute environments, I specialize in the "messy reality" of deploying advanced robotics into the real world.'
  },
  {
    id: 'ai-engineering',
    period: '2024-Present',
    role: 'AI Solutions Architect',
    sector: 'ai',
    skills: ['Prompt Engineering', 'n8n', 'Cursor', 'RAG', 'Full-Stack Architecture'],
    milestone: 'Rapid Prototyping with AI-Native Workflows',
    description: 'Synthesizing my systems background with modern AI tools. I act as the "Human-in-the-Loop" Architect, orchestrating LLMs to build full-stack applications and automated agents at 10x speed.'
  }
];

// Automation Workflow Steps
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'trigger',
    type: 'trigger',
    name: 'Webhook: Topic Received',
    duration: 500,
    output: 'Topic: "The Future of Edge Computing in AI"'
  },
  {
    id: 'research',
    type: 'agent',
    name: 'AI Researcher: Analyzing Sources',
    agent: 'Researcher',
    duration: 3000,
    output: 'Found 12 sources, extracted 4,200 tokens of context'
  },
  {
    id: 'draft',
    type: 'agent',
    name: 'AI Writer: Generating Article',
    agent: 'Writer',
    duration: 4000,
    output: 'Generated 1,200-word article with 3 H2 sections'
  },
  {
    id: 'review',
    type: 'agent',
    name: 'AI Editor: Quality Check',
    agent: 'Editor',
    duration: 2000,
    output: 'SEO score: 87/100, Readability: Grade 9, approved for publish'
  },
  {
    id: 'publish',
    type: 'api',
    name: 'Ghost CMS: Publishing',
    duration: 1000,
    output: 'Published: https://geektak.com/edge-computing-future'
  }
];

// AV System Architecture
export const AV_SYSTEM: AVSystemArchitecture = {
  layers: [
    {
      id: 'sensors',
      name: 'Input Layer',
      position: 'left',
      nodes: [
        {
          id: 'lidar',
          label: 'LiDAR Arrays',
          type: 'sensor',
          description: 'High-fidelity point cloud generation',
          technologies: ['Velodyne', 'Luminar']
        },
        {
          id: 'cameras',
          label: 'Vision System',
          type: 'sensor',
          description: '360° coverage',
          technologies: ['Computer Vision']
        }
      ]
    },
    {
      id: 'data-bus',
      name: 'Data Pipeline',
      position: 'center',
      nodes: [
        {
          id: 'can-bus',
          label: 'CAN Bus / Ethernet',
          type: 'bus',
          description: 'Real-time sensor data aggregation',
          technologies: ['CAN', 'Ethernet']
        },
        {
          id: 'logging',
          label: 'Telemetry Ingestion',
          type: 'storage',
          description: 'Multi-TB per-vehicle logs',
          technologies: ['ROS bags', 'HDF5']
        }
      ]
    },
    {
      id: 'processing',
      name: 'Validation',
      position: 'right',
      nodes: [
        {
          id: 'python-scripts',
          label: 'Auto-Triage Scripts',
          type: 'processor',
          description: 'Log parsing & anomaly detection',
          technologies: ['Python', 'Pandas']
        },
        {
          id: 'monitoring',
          label: 'Ops Dashboard',
          type: 'output',
          description: 'Incident response interface',
          technologies: ['Grafana']
        }
      ]
    }
  ],
  dataFlows: [
    { from: 'lidar', to: 'can-bus', animated: true },
    { from: 'cameras', to: 'can-bus', animated: true },
    { from: 'can-bus', to: 'logging', label: 'Raw stream' },
    { from: 'logging', to: 'python-scripts', label: 'Batch analysis' },
    { from: 'python-scripts', to: 'monitoring', label: 'Alerts' }
  ]
};

// Code Snippets - Updated to show "AI Native" skills
export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'system-prompt',
    projectName: 'Portfolio Architect Prompt',
    description: 'The meta-prompt used to generate this entire website.',
    language: 'json',
    fileName: 'architect_prompt.json',
    githubUrl: 'https://github.com/Kyle-Nye/kyle-nye',
    code: `{
  "role": "Senior Frontend Architect",
  "goal": "Build a 'Bento-Grid' portfolio for an AI Engineer.",
  "constraints": {
    "visuals": "Industrial minimal, Dark mode (Zinc-950), Amber-500 accents.",
    "tech_stack": "Next.js 14, Tailwind, Framer Motion",
    "ux": "Prioritize density and information hierarchy over flashy animations."
  },
  "content_strategy": {
    "narrative": "Pivot from AV Systems (Tesla/Zoox) to AI Agents.",
    "differentiators": [
      "Show live telemetry (latency)",
      "Visualize automation (n8n logs)",
      "Prove coding ability via interactive terminal"
    ]
  }
}`
  },
  {
    id: 'sysadmin-automation',
    projectName: 'SysAdmin Automation Suite',
    description: 'Python script analyzing logs via AI API',
    language: 'python',
    fileName: 'log_analyzer.py',
    githubUrl: 'https://github.com/Kyle-Nye/sysadmin-automation-suite',
    code: `import openai
import os

def analyze_logs_with_ai(log_file):
    """
    Ingests raw Linux system logs and uses AI LLM
    to identify root cause of failure.
    """
    client = openai.OpenAI(
        api_key=os.environ["OPENAI_API_KEY"]
    )

    with open(log_file, 'r') as f:
        logs = f.read()

    # Chain of Thought prompting for better analysis
    response = client.chat.completions.create(
        model="gpt-4",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Analyze these system logs.
            First, list any timestamps with high latency.
            Second, check for recurring error codes.
            Finally, suggest a bash command to fix it.

            Logs:
            {logs}"""
        }]
    )

    return response.choices[0].message.content`
  },
  {
    id: 'n8n-workflow',
    projectName: 'n8n AI Autoblog',
    description: 'Agentic workflow configuration',
    language: 'json',
    fileName: 'research_workflow.json',
    githubUrl: 'https://github.com/Kyle-Nye/n8n-autonomous-content-engine',
    code: `{
  "nodes": [
    {
      "type": "n8n-nodes-base.webhook",
      "name": "Topic Webhook",
      "parameters": {
        "path": "autoblog",
        "method": "POST"
      }
    },
    {
      "type": "n8n-nodes-base.openAi",
      "name": "Research Agent",
      "parameters": {
        "model": "gpt-4-turbo",
        "prompt": "Research: {{ $json.topic }}",
        "temperature": 0.3
      }
    }
  ]
}`
  }
];

export const FEATURED_REPOS = [
  'sysadmin-automation-suite',
  'n8n-autonomous-content-engine',
  'geektak-ai-interface'
];
