import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { TerminalEntry } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSidebarProps {
  history: TerminalEntry[];
  onSendMessage: (message: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ history, onSendMessage }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input);
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-ide-panel border-l border-ide-border w-full md:w-[400px] shrink-0">
      {/* Header */}
      <div className="h-9 border-b border-ide-border flex items-center px-4 justify-between bg-ide-bg select-none">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
          AI ASSISTANT
        </span>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {history.length === 0 && (
          <div className="text-center mt-10 opacity-50">
            <div className="text-4xl mb-4 grayscale">🤖</div>
            <p className="text-xs text-text-secondary uppercase tracking-widest">
              System Online. <br/> Ask me to show you projects.
            </p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${entry.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`
                  max-w-[90%] px-3 py-2 rounded text-sm leading-relaxed
                  ${entry.role === 'user' 
                    ? 'bg-ide-border text-white rounded-br-none' 
                    : 'bg-brand-orange/10 text-text-primary border border-brand-orange/20 rounded-bl-none'}
                `}
              >
                {entry.role === 'assistant' && (
                  <div className="text-[10px] font-bold text-brand-orange mb-1 uppercase tracking-widest">
                    Kyle's Agent
                  </div>
                )}
                {entry.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-ide-border bg-ide-bg">
        <div className="relative bg-ide-panel border border-ide-border rounded-md focus-within:border-brand-orange/50 transition-colors">
          <input
            ref={inputRef}
            className="w-full bg-transparent text-sm text-text-primary px-3 py-3 outline-none placeholder-text-secondary/30"
            placeholder="Ask a question or type a command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoFocus
          />
          <div className="absolute right-2 bottom-2 text-[10px] text-text-secondary opacity-50 uppercase tracking-wider pointer-events-none">
            ⏎ Return
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;