// Automation and workflow types

export type WorkflowNodeType = 'trigger' | 'agent' | 'api' | 'condition' | 'output';
export type AgentType = 'Researcher' | 'Writer' | 'Editor' | 'Analyst';

export interface WorkflowStep {
  id: string;
  type: WorkflowNodeType;
  name: string;
  agent?: AgentType;
  duration: number; // Milliseconds for simulation timing
  output: string; // What this step produces
}

export interface WorkflowExecution {
  isRunning: boolean;
  currentStep: number;
  logs: string[];
  startTime?: number;
  endTime?: number;
}

export interface WorkflowMetrics {
  totalDuration: number;
  apiCalls: number;
  tokensUsed: number;
  successRate: number;
}
