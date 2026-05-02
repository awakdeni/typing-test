'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CornerDownLeft } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CodeDisplayProps {
  code: string;
  userInput: string;
  language: string;
  activeCharIndex: number;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  userInput,
  language,
}) => {
  // Logic to handle scrolling
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const activeElement = containerRef.current?.querySelector('.active-char');
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [userInput]);

  const syntaxColors = useMemo(() => {
    const colors = new Array(code.length).fill('text-gray-500');
    
    // Simple regex to find keywords, strings, and numbers
    const keywordRegex = /\b(function|def|if|else|return|class|const|let|var|while|for|async|await|try|catch|import|export|from|this|interface|type|public|private|protected)\b/g;
    const stringRegex = /(['"`])(.*?)\1/g;
    const numberRegex = /\b\d+(\.\d+)?\b/g;
    const commentRegex = /\/\/.*/g;

    let match;
    while ((match = keywordRegex.exec(code)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        colors[i] = 'text-blue-400';
      }
    }
    while ((match = stringRegex.exec(code)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        colors[i] = 'text-amber-300';
      }
    }
    while ((match = numberRegex.exec(code)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        colors[i] = 'text-purple-400';
      }
    }
    while ((match = commentRegex.exec(code)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        colors[i] = 'text-gray-600';
      }
    }
    return colors;
  }, [code]);

  const getCharColor = (char: string, index: number, state: string) => {
    if (state === 'incorrect') return 'text-rose-500 bg-rose-500/10 rounded-sm';
    if (state === 'active') return 'text-white';
    if (state === 'correct') return 'text-[#ffffff]';
    
    return syntaxColors[index];
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Window Frame */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-t-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-gray-500 font-mono italic">
          {language}/snippets/{language}-test.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'html'}
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      <div 
        ref={containerRef}
        className="relative font-mono text-lg leading-[1.7] bg-[#0d0d0d] p-12 rounded-b-2xl border-x border-b border-white/5 shadow-2xl overflow-y-auto max-h-[480px] scrollbar-hide"
      >
        <div className="whitespace-pre-wrap break-words">
          {code.split('').map((char, index) => {
            let state = 'neutral';
            if (index < userInput.length) {
              state = userInput[index] === char ? 'correct' : 'incorrect';
            } else if (index === userInput.length) {
              state = 'active';
            }

            return (
              <span
                key={index}
                className={cn(
                  'relative transition-all duration-75 px-[1px] rounded',
                  getCharColor(char, index, state),
                  state === 'active' && 'active-char bg-white/20 text-white'
                )}
              >
                {char === '\n' ? (
                  state === 'active' ? (
                    <span className="inline-flex items-center justify-center bg-white/20 rounded px-1.5 py-0.5 ml-1">
                      <CornerDownLeft className="w-3 h-3 text-blue-400" />
                    </span>
                  ) : null
                ) : char}
                {char === '\n' ? '\n' : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
