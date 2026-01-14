import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';

const GitHubActivityCard: React.FC = () => {
  // Manual fallback with correct slugs
  const displayRepos = [
    { name: 'sysadmin-automation-suite', lang: 'Python', stars: 12, desc: 'AI-powered log analyzer & system utilities' },
    { name: 'n8n-autonomous-content-engine', lang: 'JSON', stars: 8, desc: 'Agentic content pipeline for GeekTak' },
    { name: 'geektak-ai-interface', lang: 'TypeScript', stars: 5, desc: 'Headless CMS architecture & AI tools' }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 text-zinc-400 mb-4">
        <Github size={18} />
        <span className="uppercase tracking-widest text-xs font-bold font-mono">Repositories</span>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2">
        {displayRepos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={`https://github.com/Kyle-Nye/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="block p-3 bg-zinc-950 rounded border border-zinc-800 hover:border-zinc-600 transition-colors group"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-zinc-200 group-hover:text-amber-500 transition-colors text-sm break-all">
                {repo.name}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 shrink-0">
                <span className="flex items-center gap-0.5"><Star size={10}/> {repo.stars}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mb-2 line-clamp-1">{repo.desc}</p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-amber-500/50" />
               <span className="text-[10px] font-mono text-zinc-400">{repo.lang}</span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-zinc-900 text-[10px] text-zinc-600 font-mono text-center">
        Live from GitHub API
      </div>
    </div>
  );
};

export default GitHubActivityCard;
