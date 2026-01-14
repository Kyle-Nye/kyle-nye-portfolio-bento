import React, { useEffect, useState } from 'react';
import { 
  Command, 
  Search, 
  Mail, 
  Github, 
  FileText, 
  Terminal, 
  X,
  ArrowRight
} from 'lucide-react';
import { useDebug } from '../context/DebugContext';
import { PROFILE } from '../constants';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { isDebug, setIsDebug } = useDebug();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Toggle function
  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Keyboard shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Actions definition
  const actions = [
    {
      id: 'email',
      label: 'Copy Email',
      icon: <Mail size={16} />,
      shortcut: '↵',
      perform: () => {
        navigator.clipboard.writeText(PROFILE.email);
        alert('Email copied to clipboard!');
        setIsOpen(false);
      }
    },
    {
      id: 'github',
      label: 'Go to GitHub',
      icon: <Github size={16} />,
      shortcut: '↵',
      perform: () => {
        window.open(`https://${PROFILE.socials.github}`, '_blank');
        setIsOpen(false);
      }
    },
    {
      id: 'debug',
      label: isDebug ? 'Disable Debug Mode' : 'Enable Debug Mode',
      icon: <Terminal size={16} />,
      shortcut: 'Cmd+D',
      perform: () => {
        setIsDebug(!isDebug);
        setIsOpen(false);
      }
    },
    {
      id: 'resume',
      label: 'View Resume (PDF)',
      icon: <FileText size={16} />,
      shortcut: '↵',
      perform: () => {
        // Placeholder for resume link
        window.open('#', '_blank');
        setIsOpen(false);
      }
    }
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  // Handle keyboard navigation inside the list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredActions[selectedIndex]?.perform();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar */}
        <div className="flex items-center border-b border-zinc-800 px-4 py-3">
          <Search className="text-zinc-500 mr-3" size={18} />
          <input 
            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none font-sans text-sm"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
            }}
            autoFocus
          />
          <div className="flex gap-2">
             <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
               ESC
             </kbd>
          </div>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-[300px] overflow-y-auto">
            {filteredActions.length === 0 ? (
                <div className="py-6 text-center text-sm text-zinc-500">No results found.</div>
            ) : (
                filteredActions.map((action, index) => (
                    <button
                        key={action.id}
                        onClick={action.perform}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            index === selectedIndex 
                            ? 'bg-amber-500 text-black' 
                            : 'text-zinc-300 hover:bg-zinc-800'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {action.icon}
                            <span>{action.label}</span>
                        </div>
                        <span className={`text-[10px] font-mono opacity-60 ${index === selectedIndex ? 'text-black' : 'text-zinc-500'}`}>
                            {action.shortcut}
                        </span>
                    </button>
                ))
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>COMMAND PALETTE</span>
            <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;