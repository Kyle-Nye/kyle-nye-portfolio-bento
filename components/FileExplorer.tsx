import React, { useState } from 'react';
import { FileSystemNode } from '../types';

interface FileExplorerProps {
  nodes: FileSystemNode; // Root node
  onFileClick: (node: FileSystemNode) => void;
  activeFileId: string | null;
}

const FileNode: React.FC<{ 
  node: FileSystemNode; 
  depth: number; 
  onFileClick: (n: FileSystemNode) => void;
  activeFileId: string | null;
}> = ({ node, depth, onFileClick, activeFileId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDir = node.type === 'directory';
  const isActive = activeFileId === node.name; // Simple ID matching

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDir) {
      setIsOpen(!isOpen);
    } else {
      onFileClick(node);
    }
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.tsx') || filename.endsWith('.ts')) return 'TS';
    if (filename.endsWith('.css')) return '#';
    if (filename.endsWith('.json')) return '{}';
    if (filename.endsWith('.md')) return 'MD';
    return '📄';
  };

  const getIconColor = (filename: string) => {
      if (filename.endsWith('.tsx') || filename.endsWith('.ts')) return 'text-brand-orange';
      if (filename.endsWith('.json')) return 'text-yellow-400';
      if (filename.endsWith('.md')) return 'text-brand-dim';
      return 'text-text-secondary';
  }

  return (
    <div className="select-none cursor-pointer text-xs font-sans tracking-wide">
      <div 
        className={`flex items-center py-1 hover:bg-ide-border/30 transition-colors ${isActive ? 'bg-ide-border/50 text-white' : 'text-text-secondary'}`}
        style={{ paddingLeft: `${depth * 12 + 10}px` }}
        onClick={handleClick}
      >
        <span className="mr-1.5 opacity-70 w-3 text-center text-[10px]">
           {isDir ? (isOpen ? '▼' : '▶') : ''} 
        </span>
        <span className={`mr-1.5 opacity-80 font-mono text-[10px] ${isDir ? 'text-brand-orange' : getIconColor(node.name)}`}>
          {isDir ? (isOpen ? '📂' : '📁') : getFileIcon(node.name)}
        </span>
        <span className={isActive ? 'font-medium' : ''}>{node.name}</span>
      </div>
      
      {isDir && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileNode 
                key={child.name} 
                node={child} 
                depth={depth + 1} 
                onFileClick={onFileClick}
                activeFileId={activeFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
  return (
    <div className="w-64 border-r border-ide-border bg-ide-bg flex flex-col h-full hidden md:flex select-none">
      <div className="text-[10px] font-bold tracking-widest text-text-secondary uppercase p-3 border-b border-ide-border flex justify-between bg-ide-panel">
        <span>Explorer</span>
        <span>...</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <FileNode node={props.nodes} depth={0} onFileClick={props.onFileClick} activeFileId={props.activeFileId} />
      </div>
    </div>
  );
};

export default FileExplorer;