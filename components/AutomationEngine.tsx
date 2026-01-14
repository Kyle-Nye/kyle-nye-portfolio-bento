import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, Pause, RotateCcw, WifiOff, FileText } from 'lucide-react';
import type { WorkflowStep } from '../types/automation';

interface AutomationEngineProps {
  steps: WorkflowStep[];
}

// 1. ADDED "contentSnippet" TO SCENARIOS
const SCENARIOS = [
  {
    topic: "The Future of Edge Computing in AI",
    sources: 12,
    tokens: 4200,
    words: 1200,
    seo: 87,
    grade: 9,
    contentSnippet: "Edge computing represents a paradigm shift from centralized cloud processing to decentralized data handling. By processing data closer to the source—IoT devices, local servers, and gateways—latency is reduced from hundreds of milliseconds to single digits..."
  },
  {
    topic: "Optimizing Next.js Middleware for Latency",
    sources: 8,
    tokens: 2100,
    words: 850,
    seo: 92,
    grade: 11,
    contentSnippet: "Middleware in Next.js 14 allows you to run code before a request is completed. To optimize for latency, avoid heavy computations. Instead, use lightweight edge runtime APIs. By caching pre-computed responses in Redis, we can reduce TTFB by nearly 40%..."
  },
  {
    topic: "Ethical Implications of Autonomous Agents",
    sources: 24,
    tokens: 8500,
    words: 2400,
    seo: 89,
    grade: 12,
    contentSnippet: "As autonomous agents become ubiquitous, the question of moral responsibility shifts. If an Agentic Workflow hallucinates and deletes a production database, who is liable? The Architect, the Prompter, or the Model provider? We must implement 'Human-in-the-Loop' safeguards..."
  }
];

const AutomationEngine: React.FC<AutomationEngineProps> = ({ steps }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  // 2. NEW STATE FOR STREAMING TEXT
  const [streamedText, setStreamedText] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);

  // Auto-start
  useEffect(() => {
    const timer = setTimeout(() => {
       if (!isRunning && completedSteps.size === 0) executeWorkflow();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const executeWorkflow = async () => {
    if (isRunning) return;

    const randomScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    setActiveScenario(randomScenario);

    setIsRunning(true);
    setCurrentStep(-1);
    setLogs([]);
    setStreamedText("");
    setIsDrafting(false);
    setCompletedSteps(new Set());

    setLogs(prev => [...prev, `> INITIALIZING AGENT SWARM...`, `> TARGET: "${randomScenario.topic}"`]);
    await new Promise(resolve => setTimeout(resolve, 800));

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const step = steps[i];

      // SPECIAL HANDLING FOR "DRAFT" STEP
      if (step.id === 'draft') {
          setIsDrafting(true);
          setLogs(prev => [...prev, `▸ Starting ${step.name}...`]);

          // Stream the text character by character
          const chars = randomScenario.contentSnippet.split("");
          for (let c = 0; c < chars.length; c++) {
              setStreamedText(prev => prev + chars[c]);
              // Variable typing speed for realism
              await new Promise(r => setTimeout(r, Math.random() * 30 + 10));
          }

          await new Promise(r => setTimeout(r, 500)); // Pause at end of thought
          setIsDrafting(false);
          setLogs(prev => [...prev, `✓ Draft Generated (${randomScenario.words} words)`]);
      } else {
          // NORMAL STEP HANDLING
          setLogs(prev => [...prev, `▸ Starting ${step.name}...`]);
          await new Promise(resolve => setTimeout(resolve, step.duration));

          let outputMessage = "";
          switch(step.id) {
            case 'trigger': outputMessage = `Webhook Received`; break;
            case 'research': outputMessage = `Scraped ${randomScenario.sources} sources.`; break;
            case 'review': outputMessage = `SEO: ${randomScenario.seo}/100. Grade ${randomScenario.grade}.`; break;
            case 'publish': outputMessage = `[SIMULATION] Push to Ghost CMS skipped.`; break;
            default: outputMessage = step.output;
          }
          setLogs(prev => [...prev, `✓ ${outputMessage}`]);
      }

      setCompletedSteps(prev => new Set([...prev, i]));
    }

    setLogs(prev => [...prev, `> WORKFLOW COMPLETE.`]);
    setIsRunning(false);
    setCurrentStep(-1);
  };

  const resetWorkflow = () => {
    setIsRunning(false);
    setCurrentStep(-1);
    setLogs([]);
    setStreamedText("");
    setIsDrafting(false);
    setCompletedSteps(new Set());
  };

  const getStepColor = (index: number) => {
    if (currentStep === index) return 'text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]';
    if (completedSteps.has(index)) return 'text-emerald-500 border-emerald-500/50';
    return 'text-zinc-600 border-zinc-800';
  };

  const getStepBg = (index: number) => {
    if (currentStep === index) return 'bg-amber-500';
    if (completedSteps.has(index)) return 'bg-emerald-500/10';
    return 'bg-zinc-950';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-amber-500">
          <Terminal size={20} />
          <span className="uppercase tracking-widest text-xs font-bold font-mono">Automation_Engine</span>
        </div>
        <div className="flex gap-2">
           <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-zinc-500 text-[10px] font-mono mr-2">
              <WifiOff size={10} />
              <span>OFFLINE_MODE</span>
           </div>
          {!isRunning ? (
            <button onClick={executeWorkflow} className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-amber-500 hover:bg-amber-500/30 transition-colors text-xs font-mono">
              <Play size={12} /> <span>RUN</span>
            </button>
          ) : (
            <button onClick={() => setIsRunning(false)} className="flex items-center gap-1 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 hover:bg-zinc-700 transition-colors text-xs font-mono">
              <Pause size={12} /> <span>PAUSE</span>
            </button>
          )}
          <button onClick={resetWorkflow} className="flex items-center gap-1 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 hover:bg-zinc-700 transition-colors text-xs font-mono">
            <RotateCcw size={12} /> <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="mb-4 flex flex-col gap-2 overflow-y-auto max-h-[160px] min-h-[160px] pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 p-1.5 rounded border transition-all duration-300 ${getStepBg(index)} ${getStepColor(index)}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-mono font-bold shrink-0 ${getStepColor(index)}`}>
                {completedSteps.has(index) ? '✓' : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-bold truncate">{step.name}</div>
                {step.agent && <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">Agent: {step.agent}</div>}
              </div>
            </motion.div>
            {index < steps.length - 1 && (
              <div className="ml-3 h-2 w-0.5 bg-zinc-800 relative overflow-hidden my-0.5">
                {currentStep > index && <motion.div className="absolute inset-0 bg-emerald-500" initial={{ height: '0%' }} animate={{ height: '100%' }} transition={{ duration: 0.3 }} />}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. DUAL-MODE DISPLAY (Logs vs. Drafting) */}
      <div className="flex-1 min-h-[140px] bg-[#0a0a0a] rounded border border-zinc-800 p-3 overflow-hidden flex flex-col shadow-inner relative">

        {/* Header Bar */}
        <div className="flex justify-between items-center mb-2 border-b border-zinc-900 pb-1">
           <div className={`text-[9px] uppercase tracking-widest font-mono flex items-center gap-2 transition-colors ${isDrafting ? 'text-cyan-400' : 'text-zinc-500'}`}>
             {isDrafting ? (
                 <>
                    <FileText size={10} className="animate-pulse" />
                    LIVE_DRAFT_PREVIEW
                 </>
             ) : (
                 'LIVE_EXECUTION_LOG'
             )}
           </div>
           <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/20"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/20"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/20"></span>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 relative">

          {/* THE "DRAFTING" VIEW */}
          {isDrafting && (
             <div className="absolute inset-0 bg-[#0a0a0a] z-10 text-cyan-500/90 leading-relaxed p-1">
                <span className="text-zinc-600 mr-2">$ cat draft_v1.md</span>
                <br/><br/>
                {streamedText}
                <span className="w-2 h-4 bg-cyan-500 inline-block ml-1 animate-pulse align-middle"/>
             </div>
          )}

          {/* THE STANDARD LOGS VIEW */}
          <AnimatePresence mode='popLayout'>
            {logs.length === 0 ? (
              <div className="text-zinc-800 italic text-[10px] mt-4 text-center">// System Idle...</div>
            ) : (
              logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border-l-2 pl-2 py-0.5 break-all ${log.includes('Starting') ? 'border-amber-500/50 text-amber-500/80' : ''} ${log.includes('✓') ? 'border-emerald-500/50 text-emerald-400 font-bold' : ''} ${!log.includes('Starting') && !log.includes('✓') ? 'border-zinc-800 text-zinc-500' : ''}`}
                >
                  {log}
                </motion.div>
              ))
            )}
            <div className="h-0 w-full" ref={(el) => el?.scrollIntoView({ behavior: "smooth" })} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AutomationEngine;
