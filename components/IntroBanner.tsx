import React from 'react';
import { PROFILE } from '../constants';
import { useGitHub } from '../hooks/useGitHub';

const IntroBanner: React.FC = () => {
  const { stats, isLoading } = useGitHub();

  return (
    <div className="border border-brand-orange/30 bg-ide-panel/30 mb-8 font-mono relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-brand-orange"></div>
      <div className="absolute top-0 right-0 w-1 h-1 bg-brand-orange"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-brand-orange"></div>
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-brand-orange"></div>

      {/* Header Bar */}
      <div className="bg-ide-panel border-b border-brand-orange/20 px-4 py-1 flex justify-between items-center text-[10px] uppercase tracking-widest text-text-secondary">
         <span>SYS.IDENTITY.V2</span>
         <span className="flex items-center gap-2">
            STATUS: <span className="text-brand-orange">ONLINE</span>
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></span>
         </span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-3">
           <div>
              <h1 className="text-3xl font-bold text-white tracking-tighter uppercase font-sans">{PROFILE.name}</h1>
              <h2 className="text-brand-orange font-mono text-xs uppercase tracking-widest mt-1">{PROFILE.title}</h2>
           </div>
           <p className="text-text-secondary text-sm leading-relaxed max-w-lg border-l-2 border-ide-border pl-3">
              {PROFILE.tagline}
           </p>
        </div>

        {/* Telemetry / Stats */}
        <div className="border-l border-ide-border pl-6 flex flex-col justify-center gap-4">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <div className="text-[10px] text-text-secondary uppercase tracking-widest">REPOSITORIES</div>
                 <div className="text-xl text-brand-orange font-bold font-sans">
                    {isLoading || !stats ? '...' : stats.totalRepos}
                 </div>
              </div>
              <div>
                 <div className="text-[10px] text-text-secondary uppercase tracking-widest">NODES</div>
                 <div className="text-xl text-brand-orange font-bold font-sans">
                    {isLoading || !stats ? '...' : stats.followers}
                 </div>
              </div>
              <div>
                 <div className="text-[10px] text-text-secondary uppercase tracking-widest">LATENCY</div>
                 <div className="text-xl text-text-primary font-sans">24ms</div>
              </div>
              <div>
                 <div className="text-[10px] text-text-secondary uppercase tracking-widest">UPTIME</div>
                 <div className="text-xl text-text-primary font-sans">99.9%</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBanner;