import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BOOT_LOGS } from '../constants';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let delay = 0;
    
    // Animate logs
    BOOT_LOGS.forEach((log, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, delay);
    });

    // Animate progress bar independent of logs
    const interval = setInterval(() => {
      setProgress(old => {
        const next = old + Math.random() * 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="font-mono text-xs md:text-sm text-text-secondary p-8 flex flex-col justify-between h-full min-h-[400px]">
      <div className="space-y-1">
        <div className="border-b border-brand-orange/30 pb-2 mb-4 text-brand-orange font-bold tracking-widest uppercase">
          System Diagnostics v2.4.0
        </div>
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between w-full max-w-lg"
          >
            <span>{log.split('.')[0]}</span>
            <span className="text-brand-orange">{log.split('.').pop()}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-between mb-1 text-xs uppercase tracking-widest text-text-secondary">
          <span>Loading Modules</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-ide-border overflow-hidden">
          <motion.div 
            className="h-full bg-brand-orange"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootSequence;