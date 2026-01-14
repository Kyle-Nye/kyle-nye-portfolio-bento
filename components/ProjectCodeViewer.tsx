import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, ExternalLink } from 'lucide-react';
import CodeBlock from './CodeBlock';
import type { CodeSnippet } from '../types/career';

interface ProjectCodeViewerProps {
  snippets: CodeSnippet[];
  autoRotate?: boolean;
  rotationInterval?: number;
}

const ProjectCodeViewer: React.FC<ProjectCodeViewerProps> = ({
  snippets,
  autoRotate = true,
  rotationInterval = 15000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSnippet = snippets[currentIndex];

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % snippets.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, isPaused, snippets.length, rotationInterval]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + snippets.length) % snippets.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % snippets.length);
  };

  return (
    <div
      className="flex flex-col h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Code size={18} />
          <span className="uppercase tracking-widest text-xs font-bold font-mono">Code_Snippets</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            className="p-1 bg-zinc-900 border border-zinc-800 rounded hover:border-amber-500/50 transition-colors"
            aria-label="Previous snippet"
          >
            <ChevronLeft size={14} className="text-zinc-400" />
          </button>
          <div className="text-xs font-mono text-zinc-600">
            {currentIndex + 1} / {snippets.length}
          </div>
          <button
            onClick={goToNext}
            className="p-1 bg-zinc-900 border border-zinc-800 rounded hover:border-amber-500/50 transition-colors"
            aria-label="Next snippet"
          >
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Snippet info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSnippet.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="mb-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-1">{currentSnippet.projectName}</h3>
              <p className="text-xs text-zinc-400">{currentSnippet.description}</p>
            </div>
            {currentSnippet.githubUrl && (
              <a
                href={currentSnippet.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded hover:border-amber-500/50 transition-colors group"
                aria-label="View on GitHub"
              >
                <ExternalLink size={12} className="text-zinc-400 group-hover:text-amber-500" />
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Code display */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSnippet.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full overflow-auto"
          >
            <CodeBlock
              code={currentSnippet.code}
              language={currentSnippet.language}
              fileName={currentSnippet.fileName}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {snippets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${index === currentIndex ? 'bg-amber-500 w-4' : 'bg-zinc-700 hover:bg-zinc-600'}
            `}
            aria-label={`Go to snippet ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCodeViewer;
