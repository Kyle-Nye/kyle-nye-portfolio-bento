import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#1E1E1E]">
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-xs text-zinc-400 font-mono">{fileName}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#1E1E1E',
          fontSize: '0.75rem',
          lineHeight: '1.5'
        }}
        showLineNumbers={true}
        wrapLines={true}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#6A737D',
          textAlign: 'right',
          userSelect: 'none'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
