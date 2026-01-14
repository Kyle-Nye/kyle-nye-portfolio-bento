import React, { useEffect, useState } from 'react';
import { Project, GitHubRepo } from '../types';
import { PROJECTS, SKILLS_TREE } from '../constants';

interface TerminalOutputProps {
  type: 'projects' | 'skills' | 'about' | 'help' | 'error' | 'success' | 'github';
  data?: any;
  onOpenProject?: (projectId: string) => void;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ type, data, onOpenProject }) => {
  
  if (type === 'projects') {
    return (
      <div className="space-y-4 my-4">
        <div className="text-text-secondary italic font-mono text-sm">{'// Loaded content from projects.json'}</div>
        <div className="grid grid-cols-1 gap-4">
          {PROJECTS.map((project) => (
            <div 
                key={project.id} 
                onClick={() => onOpenProject && onOpenProject(project.id)}
                className="border border-ide-border p-4 bg-ide-panel/50 hover:border-brand-orange/50 hover:bg-ide-panel cursor-pointer transition-all group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-brand-orange font-bold text-lg group-hover:text-white transition-colors flex items-center gap-2 font-mono">
                    {project.name}
                    <span className="opacity-0 group-hover:opacity-100 text-xs text-text-secondary font-normal transition-opacity">↗ open</span>
                </h3>
                <span className="text-xs text-brand-dim border border-brand-dim/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  {project.role}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-3 font-sans">{project.description}</p>
              <div className="text-xs font-mono opacity-60">
                <span className="text-syntax-keyword">const</span> <span className="text-text-primary">stack</span> <span className="text-syntax-keyword">=</span> <span className="text-syntax-string">{JSON.stringify(project.stack)}</span>;
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'github') {
    return <div className="text-brand-orange">GitHub integration moved to 'IntroBanner' telemetry.</div>;
  }

  if (type === 'skills') {
    const renderTree = (node: any, depth = 0) => {
      const isDir = node.type === 'directory';
      return (
        <div key={node.name} className="font-mono text-sm">
          <div className="flex items-center py-0.5">
             <span className="text-ide-border mr-2 font-light">{depth === 0 ? '' : '│ '.repeat(depth) + '├─'}</span>
             <span className={isDir ? 'text-brand-orange font-bold flex items-center gap-2' : 'text-text-primary flex items-center gap-2'}>
               <span className="opacity-75">{isDir ? '📁' : '📄'}</span>
               {node.name}
             </span>
          </div>
          {node.children && node.children.map((child: any) => 
            <div key={child.name} className="">
                {renderTree(child, depth + 1)}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="my-4">
        <div className="text-text-secondary italic mb-2">{'// Explorer: /skills'}</div>
        <div className="pl-2 border-l border-ide-border ml-2">
            {SKILLS_TREE.children?.map((child: any) => renderTree(child))}
        </div>
      </div>
    );
  }

  if (type === 'help') {
    return (
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg text-sm bg-ide-panel/20 p-4 border-l-2 border-brand-orange">
        <div className="col-span-2 text-brand-orange font-bold mb-2 uppercase tracking-widest text-xs">Available Commands</div>
        <div className="flex justify-between font-mono"><span className="text-white">ls</span>       <span className="text-text-secondary">List files</span></div>
        <div className="flex justify-between font-mono"><span className="text-white">clear</span>    <span className="text-text-secondary">Clear log</span></div>
        <div className="flex justify-between font-mono"><span className="text-white">whoami</span>   <span className="text-text-secondary">Current user</span></div>
        <div className="col-span-2 text-text-secondary text-xs mt-2 italic">
           Tip: Use the Graphical Interface (Sidebar) for full navigation.
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return <div className="text-red-400 my-1 bg-red-900/10 p-2 border-l-2 border-red-500 font-mono text-sm">Error: {data}</div>;
  }

  return <div>{data}</div>;
};

export default TerminalOutput;