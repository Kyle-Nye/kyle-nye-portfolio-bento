import React from 'react';
import { motion } from 'framer-motion';
import type { CareerPhase } from '../types/career';

interface TimelineNodeProps {
  phase: CareerPhase;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ phase, index, isActive, onHover, onLeave }) => {
  const sectorColors = {
    marketing: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-500', dot: 'bg-blue-500' },
    systems: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-500', dot: 'bg-purple-500' },
    ai: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-500', dot: 'bg-amber-500' }
  };

  const colors = sectorColors[phase.sector];

  return (
    <div className="relative flex flex-col items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.2, duration: 0.4 }}
        className="relative z-10"
      >
        <div className={`
          w-6 h-6 rounded-full border-2 transition-all duration-300
          ${isActive ? `${colors.border} ${colors.dot} shadow-lg shadow-${phase.sector === 'ai' ? 'amber' : phase.sector === 'marketing' ? 'blue' : 'purple'}-500/50` : 'border-zinc-700 bg-zinc-800'}
        `}>
          {isActive && (
            <motion.div
              className={`absolute inset-0 rounded-full ${colors.dot}`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* Period label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 + 0.2 }}
        className={`
          mt-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-300
          ${isActive ? colors.text : 'text-zinc-500'}
        `}
      >
        {phase.period}
      </motion.div>

      {/* Sector label */}
      <div className={`
        mt-1 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300
        ${isActive ? colors.text : 'text-zinc-600'}
      `}>
        {phase.sector.replace('-', ' ')}
      </div>
    </div>
  );
};

export default TimelineNode;
