import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineNode from './TimelineNode';
import type { CareerPhase } from '../types/career';

interface SkillsEvolutionProps {
  phases: CareerPhase[];
}

const SkillsEvolution: React.FC<SkillsEvolutionProps> = ({ phases }) => {
  const [activePhase, setActivePhase] = useState<number>(phases.length - 1); // Default to latest phase

  const sectorColors = {
    marketing: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20' },
    systems: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20' },
    ai: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20' }
  };

  const currentPhase = phases[activePhase];
  const colors = sectorColors[currentPhase.sector];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 text-zinc-400 mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <span className="uppercase tracking-widest text-xs font-bold font-mono">Career_Evolution</span>
      </div>

      {/* Timeline visualization */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Timeline nodes */}
        <div className="relative mb-6">
          {/* Connecting line */}
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-zinc-800" style={{ zIndex: 0 }}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Phase nodes */}
          <div className="relative flex justify-between">
            {phases.map((phase, index) => (
              <TimelineNode
                key={phase.id}
                phase={phase}
                index={index}
                isActive={activePhase === index}
                onHover={() => setActivePhase(index)}
                onLeave={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Phase details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`
              flex-1 p-4 rounded-lg border ${colors.border} ${colors.bg}
              transition-all duration-300
            `}
          >
            {/* Role */}
            <h3 className="text-xl font-bold text-white mb-2">{currentPhase.role}</h3>

            {/* Companies (if applicable) */}
            {currentPhase.companies && (
              <div className="flex gap-2 mb-3">
                {currentPhase.companies.map(company => (
                  <span
                    key={company}
                    className="text-xs font-mono px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-400"
                  >
                    {company}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{currentPhase.description}</p>

            {/* Milestone */}
            <div className="mb-4 p-3 bg-zinc-950/50 rounded border border-zinc-800">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">
                Key Milestone
              </div>
              <p className="text-sm text-white italic">&ldquo;{currentPhase.milestone}&rdquo;</p>
            </div>

            {/* Skills */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-2">
                Skills Acquired
              </div>
              <div className="flex flex-wrap gap-2">
                {currentPhase.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      text-xs font-mono px-2 py-1 rounded
                      ${colors.badge} ${colors.text}
                      border ${colors.border}
                    `}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsEvolution;
