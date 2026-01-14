import React, { useEffect, useState } from 'react';
import { Project } from '../types';

interface ProjectReadmeProps {
  project: Project;
}

const TypewriterText: React.FC<{ text: string, speed?: number, delay?: number, className?: string }> = ({ text, speed = 5, delay = 0, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    const startTimeout = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return <div className={className}>{displayedText}</div>;
};

const FadeInWrapper: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
   <div className="animate-in fade-in slide-in-from-bottom-1 duration-500 fill-mode-backwards" style={{ animationDelay: `${delay}ms` }}>
       {children}
   </div>
);

const ProjectReadme: React.FC<ProjectReadmeProps> = ({ project }) => {
  // Key forces re-render of typewriter effects when project changes
  return (
    <div key={project.id} className="h-full overflow-y-auto bg-ide-bg text-text-primary p-6 md:p-10 font-sans selection:bg-brand-orange/30">
       <div className="max-w-4xl mx-auto">
         {/* Title / Header */}
         <div className="border-b border-ide-border pb-6 mb-8">
            <div className="flex items-center gap-3 text-text-secondary text-xs font-mono mb-4 opacity-60 uppercase tracking-widest">
                <span>src</span>
                <span>/</span>
                <span>{project.id}.tsx</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500">
                {project.name}
            </h1>
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
                <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 text-xs font-mono border border-brand-orange/20 uppercase tracking-wide">v1.0.0</span>
                <span className="bg-ide-panel text-text-secondary px-3 py-1 text-xs font-mono border border-ide-border">{project.role}</span>
            </div>
         </div>

         {/* Content - Simulating Markdown Rendering */}
         <div className="prose prose-invert max-w-none">
            {/* Description */}
            <p className="text-lg text-text-primary leading-relaxed mb-8 font-light min-h-[60px]">
                <TypewriterText text={project.description} speed={10} />
            </p>

            {/* Tech Stack Grid */}
            <div className="mb-10 bg-ide-panel/30 p-6 border border-ide-border animate-in fade-in duration-1000 delay-300 fill-mode-backwards">
                <h3 className="text-xs font-bold mb-4 text-brand-orange uppercase tracking-widest flex items-center gap-2">
                   Stack Configuration
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.stack.map((tech, idx) => (
                        <div key={tech} className="bg-ide-bg border border-ide-border px-3 py-2 flex items-center gap-2 text-sm hover:border-brand-orange/40 transition-colors cursor-default group">
                            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full opacity-50 group-hover:opacity-100"></span>
                            {tech}
                        </div>
                    ))}
                </div>
            </div>

            {/* Readme Content */}
            {project.readme && (
                <div className="space-y-6 font-mono text-sm text-text-secondary">
                   {project.readme.split('\n').map((line, i) => {
                       const delay = 500 + (i * 30); // Staggered reveal

                       if (line.startsWith('# ')) return <FadeInWrapper key={i} delay={delay}><h1 className="text-xl font-bold text-white mt-8 mb-4 pb-2 border-b border-ide-border font-sans">{line.replace('# ', '')}</h1></FadeInWrapper>;
                       if (line.startsWith('## ')) return <FadeInWrapper key={i} delay={delay}><h2 className="text-lg font-bold text-brand-orange mt-6 mb-3 uppercase tracking-wider font-sans">{line.replace('## ', '')}</h2></FadeInWrapper>;
                       if (line.startsWith('### ')) return <FadeInWrapper key={i} delay={delay}><h3 className="text-base font-bold text-text-primary mt-4 mb-2 font-sans">{line.replace('### ', '')}</h3></FadeInWrapper>;
                       if (line.startsWith('- ')) return <FadeInWrapper key={i} delay={delay}><div className="flex gap-2 ml-4"><span className="text-brand-orange">•</span>{line.replace('- ', '')}</div></FadeInWrapper>;
                       if (line.match(/^\d\./)) return <FadeInWrapper key={i} delay={delay}><div className="flex gap-2 ml-4"><span className="text-brand-orange">{line.split('.')[0]}.</span>{line.substring(line.indexOf('.') + 1)}</div></FadeInWrapper>;
                       if (line.trim() === '') return <div key={i} className="h-2"></div>;
                       return <FadeInWrapper key={i} delay={delay}><p className="leading-relaxed">{line}</p></FadeInWrapper>;
                   })}
                </div>
            )}
         </div>
       </div>
    </div>
  );
};

export default ProjectReadme;