import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", delay = 0, href }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={`
        bg-zinc-900/50 
        border border-zinc-800 
        rounded-xl 
        p-6 
        hover:border-amber-500/50 
        hover:bg-zinc-900/80
        transition-all duration-300 
        relative 
        overflow-hidden 
        group
        ${className}
      `}
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 h-full pointer-events-none">
        {/* We use pointer-events-none on the content wrapper so clicks pass through to the link, 
            but we need to re-enable pointer events on interactive children if necessary. 
            However, for a card link, usually the whole card is the trigger. 
            If specific buttons are needed inside, they should be z-20. */}
        <div className="pointer-events-auto h-full">
            {children}
        </div>
      </div>

      {/* Stretched Link Overlay */}
      {href && (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl cursor-pointer"
          aria-label="View Project"
        />
      )}
    </motion.div>
  );
};

export default BentoCard;