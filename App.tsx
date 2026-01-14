import React from 'react';
import {
  Github,
  Linkedin,
  ArrowUpRight,
  Code,
  Eye,
  Command
} from "lucide-react";
import BentoCard from './components/BentoCard';
import { DebugProvider, useDebug } from './context/DebugContext';
import DebugWrapper from './components/DebugWrapper';
import CommandPalette from './components/CommandPalette';
import SkillsEvolution from './components/SkillsEvolution';
import AutomationEngine from './components/AutomationEngine';
import GitHubActivityCard from './components/GitHubActivityCard';
import TechnicalSystemsDiagram from './components/TechnicalSystemsDiagram';
import ProjectCodeViewer from './components/ProjectCodeViewer';
import { CAREER_PHASES, WORKFLOW_STEPS, CODE_SNIPPETS, AV_SYSTEM } from './constants';

// Toggle Switch Component
const DebugToggle = () => {
  const { isDebug, setIsDebug } = useDebug();
  return (
    <button
      onClick={() => setIsDebug(!isDebug)}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all
        ${isDebug
          ? 'bg-green-900/20 border-green-500 text-green-500 hover:bg-green-900/30'
          : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'}
      `}
    >
      {isDebug ? <Code size={14} /> : <Eye size={14} />}
      {isDebug ? 'DEBUG: ON' : 'GUI_MODE'}
    </button>
  );
};

// Main Content Component
const PortfolioContent: React.FC = () => {
  // Real ping calculation
  const [ping, setPing] = React.useState<number | null>(null);

  React.useEffect(() => {
    const checkPing = async () => {
      const start = Date.now();
      try {
        // Fetches the headers of the current page to measure round-trip time
        await fetch(window.location.href, { method: 'HEAD' });
        const latency = Date.now() - start;
        setPing(latency);
      } catch (e) {
        setPing(null);
      }
    };

    // Check immediately and then every 5 seconds
    checkPing();
    const timer = setInterval(checkPing, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans selection:bg-amber-500/30 selection:text-black">
      <CommandPalette />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO SECTION */}
        <header className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
               </span>
               <span className="text-zinc-500 text-xs md:text-sm font-mono tracking-wider uppercase">Online // Houston, TX</span>
               <div className="hidden md:flex items-center gap-2 text-zinc-600 text-[10px] font-mono ml-4 border border-zinc-800 px-2 py-1 rounded">
                  <Command size={10} /> <span>CMD+K</span>
               </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Kyle Nye
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
              Architecting intelligent systems.
              <br className="hidden md:block"/>
              From <span className="text-zinc-100 font-medium">Autonomous Vehicles</span> to <span className="text-amber-500 font-medium">Autonomous Agents</span>.
            </p>
          </div>

          <div className="self-start md:self-center mb-2 md:mb-12">
            <DebugToggle />
          </div>
        </header>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(280px,auto)]">

          {/* TILE 1: SKILLS EVOLUTION (2x2) */}
          <DebugWrapper
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[500px] lg:min-h-auto"
            data={{
              id: "career_evolution",
              phases: CAREER_PHASES.length,
              currentSector: "ai"
            }}
          >
            <BentoCard className="flex flex-col h-full" delay={0.1}>
              <SkillsEvolution phases={CAREER_PHASES} />
            </BentoCard>
          </DebugWrapper>

          {/* TILE 3: GITHUB LIVE ACTIVITY (1x1) */}
          <DebugWrapper
            className="md:col-span-1 lg:col-span-1"
            data={{
              service: "github_api",
              username: "Kyle-Nye",
              cache_ttl: "5min"
            }}
          >
            <BentoCard className="flex flex-col h-full" delay={0.2}>
              <GitHubActivityCard />
            </BentoCard>
          </DebugWrapper>

          {/* TILE 4: QUICK CONNECT (1x1) */}
          <DebugWrapper
            className="md:col-span-1 lg:col-span-1"
            data={{
                links: ["github.com/Kyle-Nye", "linkedin.com/in/kylejnye"]
            }}
          >
            <BentoCard className="flex flex-col justify-center gap-3 h-full" delay={0.3}>
               <div className="uppercase tracking-widest text-xs font-bold font-mono text-zinc-600 mb-1">Connect</div>
               <a href="https://github.com/Kyle-Nye" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 p-2 -mx-2 rounded transition-all group/social z-20 relative">
                  <Github size={20} className="group-hover/social:text-amber-500 transition-colors" />
                  <span className="font-mono text-sm">GitHub</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover/social:opacity-100 transition-opacity" />
               </a>
               <a href="https://linkedin.com/in/kylejnye" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 p-2 -mx-2 rounded transition-all group/social z-20 relative">
                  <Linkedin size={20} className="group-hover/social:text-blue-500 transition-colors" />
                  <span className="font-mono text-sm">LinkedIn</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover/social:opacity-100 transition-opacity" />
               </a>
            </BentoCard>
          </DebugWrapper>

          {/* TILE 5: TECHNICAL SYSTEMS DIAGRAM (2x1) */}
          <DebugWrapper
            className="md:col-span-2 lg:col-span-2"
            data={{
              system: "av_architecture",
              layers: AV_SYSTEM.layers.length,
              nodes: AV_SYSTEM.layers.reduce((sum, layer) => sum + layer.nodes.length, 0)
            }}
          >
            <BentoCard className="flex flex-col h-full" delay={0.4}>
              <TechnicalSystemsDiagram architecture={AV_SYSTEM} />
            </BentoCard>
          </DebugWrapper>

          {/* TILE 2: AUTOMATION ENGINE (2x1) */}
          <DebugWrapper
            className="md:col-span-2 lg:col-span-2"
            data={{
              system: "n8n_autoblog",
              agents: ["Researcher", "Writer", "Editor"],
              trigger: "Webhook"
            }}
          >
            <BentoCard className="flex flex-col h-full" delay={0.5}>
              <AutomationEngine steps={WORKFLOW_STEPS} />
            </BentoCard>
          </DebugWrapper>

          {/* TILE 6: PROJECT CODE VIEWER (2x1) */}
          <DebugWrapper
            className="md:col-span-2 lg:col-span-2"
            data={{
              snippets: CODE_SNIPPETS.length,
              languages: ["Python", "TypeScript", "JSON"]
            }}
          >
            <BentoCard className="flex flex-col h-full" delay={0.6}>
              <ProjectCodeViewer snippets={CODE_SNIPPETS} />
            </BentoCard>
          </DebugWrapper>

        </div>

        {/* FOOTER */}
        <footer className="pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs font-mono uppercase tracking-widest border-t border-zinc-900 mt-8">
            <div className="flex items-center gap-2">
              {/* BRANDING FIX: Removed 'Systems' */}
              <span>© {new Date().getFullYear()} Kyle Nye.</span>

              {/* PING FIX: Real Data */}
              <span className="hidden md:inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full ml-4 animate-pulse"></span>
              <span className="hidden md:inline-block text-emerald-500/80">
                Latency: {ping ? `${ping}ms` : '--'}
              </span>
            </div>

            <div className="flex gap-4 mt-4 md:mt-0 opacity-60 hover:opacity-100 transition-opacity">
                <span title="UI Library">React 18</span>
                <span title="CSS Framework">Tailwind</span>
                <span title="Build Tool">Vite</span>
            </div>
        </footer>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <DebugProvider>
      <PortfolioContent />
    </DebugProvider>
  );
}

export default App;
