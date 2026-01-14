import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowDown } from 'lucide-react';
import type { AVSystemArchitecture } from '../types/career';

interface TechnicalSystemsDiagramProps {
  architecture: AVSystemArchitecture;
}

const TechnicalSystemsDiagram: React.FC<TechnicalSystemsDiagramProps> = ({ architecture }) => {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background Flow Animation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
      </div>

      <div className="flex items-center gap-2 text-zinc-400 mb-6 relative z-10">
        <Cpu size={18} />
        <span className="uppercase tracking-widest text-xs font-bold font-mono">AV_Data_Pipeline</span>
      </div>

      <div className="flex-1 flex flex-col justify-between relative z-10">
        {architecture.layers.map((layer, i) => (
          <div key={layer.id} className="relative">
            {/* Connecting Arrow (except first item) */}
            {i > 0 && (
               <div className="flex justify-center -mt-3 mb-1">
                  <ArrowDown size={14} className="text-zinc-600" />
               </div>
            )}

            <div className="bg-zinc-900/40 border border-zinc-800/50 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-mono text-center border-b border-zinc-800/50 pb-1">
                   {layer.name}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {layer.nodes.map(node => (
                        <span key={node.id} className="text-[10px] px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 rounded shadow-sm">
                            {node.label}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSystemsDiagram;
