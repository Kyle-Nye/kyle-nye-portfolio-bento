import React from 'react';
import { useDebug } from '../context/DebugContext';

interface DebugWrapperProps {
  children: React.ReactNode;
  data: any;
  className?: string;
}

const DebugWrapper: React.FC<DebugWrapperProps> = ({ children, data, className = "" }) => {
  const { isDebug } = useDebug();

  if (!isDebug) {
    // In GUI mode, we render the children directly. 
    // The className is applied to a wrapper div to maintain grid positioning.
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`bg-black border border-green-900/40 p-4 font-mono text-xs text-green-500 overflow-hidden relative flex flex-col ${className}`}>
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]" />

        <div className="flex justify-between items-center border-b border-green-900/50 pb-2 mb-2 opacity-70 select-none">
            <span>DEBUG_VIEW_V1.0</span>
            <span>ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
        </div>

        <div className="h-full overflow-auto scrollbar-hide relative z-0">
            <pre className="whitespace-pre-wrap break-all leading-tight">
                <span className="text-pink-500">const</span> <span className="text-blue-400">nodeData</span> <span className="text-white">=</span> {JSON.stringify(data, null, 2)}
            </pre>
            
            <div className="mt-4 border-t border-green-900/50 pt-2 opacity-50 select-none text-[10px]">
                // MEM_ALLOC: {Math.floor(Math.random() * 512 + 128)}KB <br/>
                // RENDER_TIME: {(Math.random() * 2).toFixed(4)}ms <br/>
                // STATUS: MOUNTED
            </div>
        </div>
    </div>
  );
};

export default DebugWrapper;