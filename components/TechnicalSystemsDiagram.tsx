import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowDown } from 'lucide-react';
import type { AVSystemArchitecture } from '../types/career';

interface TechnicalSystemsDiagramProps {
  architecture: AVSystemArchitecture;
}

const nodeTypeColors: Record<string, string> = {
  sensor: 'border-emerald-800/60 bg-emerald-950/20',
  bus: 'border-blue-800/60 bg-blue-950/20',
  storage: 'border-purple-800/60 bg-purple-950/20',
  processor: 'border-amber-800/60 bg-amber-950/20',
  output: 'border-red-800/60 bg-red-950/20',
};

const nodeTypeDots: Record<string, string> = {
  sensor: 'bg-emerald-500',
  bus: 'bg-blue-500',
  storage: 'bg-purple-500',
  processor: 'bg-amber-500',
  output: 'bg-red-500',
};

const TechnicalSystemsDiagram: React.FC<TechnicalSystemsDiagramProps> = ({ architecture }) => {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background Flow Animation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
      </div>

      <div className="flex items-center gap-2 text-zinc-400 mb-4 relative z-10">
        <Cpu size={18} />
        <span className="uppercase tracking-widest text-xs font-bold font-mono">AV_Data_Pipeline</span>
      </div>

      <div className="flex-1 flex flex-col gap-2 relative z-10">
        {architecture.layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            {/* Connecting Arrow */}
            {i > 0 && (
               <div className="flex justify-center -mt-1 mb-1">
                  <ArrowDown size={12} className="text-zinc-700" />
               </div>
            )}

            <div className="bg-zinc-900/40 border border-zinc-800/50 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-mono border-b border-zinc-800/50 pb-1">
                   {layer.name}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {layer.nodes.map(node => (
                        <div
                          key={node.id}
                          className={`px-2.5 py-2 rounded border ${nodeTypeColors[node.type] || 'border-zinc-800 bg-zinc-950'}`}
                        >
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${nodeTypeDots[node.type] || 'bg-zinc-500'}`} />
                              <span className="text-[11px] font-medium text-zinc-200 leading-tight">{node.label}</span>
                            </div>
                            <p className="text-[9px] text-zinc-500 leading-snug mb-1.5">{node.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {node.technologies.map(tech => (
                                <span key={tech} className="text-[8px] px-1.5 py-0.5 bg-zinc-950/80 border border-zinc-800/50 text-zinc-400 rounded font-mono">
                                  {tech}
                                </span>
                              ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSystemsDiagram;
