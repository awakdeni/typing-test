'use client';

import React, { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { CodeDisplay } from './CodeDisplay';
import { ResultModal } from './ResultModal';
import { Navbar } from './Navbar';
import { useTypingTest } from '@/hooks/useTypingTest';
import javascriptSnippets from '@/data/javascript.json';
import pythonSnippets from '@/data/python.json';
import htmlSnippets from '@/data/html.json';
import cssSnippets from '@/data/css.json';
import typescriptSnippets from '@/data/typescript.json';
import phpSnippets from '@/data/php.json';
import javaSnippets from '@/data/java.json';
import cppSnippets from '@/data/cpp.json';
import goSnippets from '@/data/go.json';
import rustSnippets from '@/data/rust.json';
import { Timer, RefreshCw, ChevronDown } from 'lucide-react';

const codeSnippets = [
  ...javascriptSnippets,
  ...pythonSnippets,
  ...htmlSnippets,
  ...cssSnippets,
  ...typescriptSnippets,
  ...phpSnippets,
  ...javaSnippets,
  ...cppSnippets,
  ...goSnippets,
  ...rustSnippets
];

export const TypingTest = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [currentSnippet, setCurrentSnippet] = useState(codeSnippets[0]);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    userInput,
    handleInput,
    timeLeft,
    isActive,
    isFinished,
    stats,
    resetTest,
  } = useTypingTest(currentSnippet.code);

  const getRandomSnippet = () => {
    let filtered = codeSnippets.filter(
      s => s.language === selectedLanguage && s.difficulty === selectedDifficulty
    );
    
    // Cegah kemunculan snippet yang sama dua kali berturut-turut jika ada opsi lain
    if (filtered.length > 1 && currentSnippet) {
      filtered = filtered.filter(s => s.id !== currentSnippet.id);
    }
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex] || codeSnippets[0];
  };

  const handleRestart = () => {
    const newSnippet = getRandomSnippet();
    setCurrentSnippet(newSnippet);
    resetTest();
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRestart]);

  useEffect(() => {
    // Re-select snippet when filters change
    handleRestart();
  }, [selectedLanguage, selectedDifficulty]);

  return (
    <div className="w-full">
      <Navbar isActive={isActive} onRestart={handleRestart} />

      <div className="max-w-6xl mx-auto w-full space-y-8 mt-8">
        {/* Config Bar & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 min-h-[40px]">
          {/* Selectors - Blurs on type */}
          <div className={cn(
            "flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase transition-all duration-700",
            isActive && "blur-md opacity-10 pointer-events-none"
          )}>
            {/* Language Selector */}
            <div className="relative group/select">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase">
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-2 py-2 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/select:opacity-100 group-hover/select:visible transition-all z-50">
                {['javascript', 'typescript', 'python', 'php', 'html', 'css', 'java', 'cpp', 'go', 'rust'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`w-full text-left px-4 py-1.5 hover:bg-white/5 transition-colors ${selectedLanguage === lang ? 'text-blue-400' : 'text-gray-400'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="relative group/diff">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase">
                <span>{selectedDifficulty}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-2 py-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/diff:opacity-100 group-hover/diff:visible transition-all z-50">
                {['easy', 'medium', 'hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`w-full text-left px-4 py-1.5 hover:bg-white/5 transition-colors ${selectedDifficulty === diff ? 'text-blue-400' : 'text-gray-400'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRestart}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white pointer-events-auto"
              title="Reset Test"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Stats & Timer - Always Sharp */}
          <div className="flex items-center gap-8">
            {isActive && (
              <div className="flex items-center gap-8 border-l border-white/10 pl-8 ml-2 animate-in fade-in zoom-in duration-500">
                 <div className="flex flex-col items-start leading-none">
                   <span className="text-[9px] text-gray-500 mb-1">WPM</span>
                   <span className="text-sm font-bold text-blue-400">{stats.wpm}</span>
                 </div>
                 <div className="flex flex-col items-start leading-none">
                   <span className="text-[9px] text-gray-500 mb-1">ACC</span>
                   <span className="text-sm font-bold text-green-400">{stats.accuracy}%</span>
                 </div>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-lg transition-all",
                isActive ? "text-blue-400 scale-110" : "text-gray-500"
              )}>
                <Timer className={cn("w-4 h-4", isActive && "animate-pulse")} />
                <span className="font-mono font-medium">{timeLeft}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Typing Area */}
        <div 
          className="relative cursor-text group"
          onClick={() => inputRef.current?.focus()}
        >
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInput}
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            autoFocus
          />
          
          <CodeDisplay
            code={currentSnippet.code}
            userInput={userInput}
            language={currentSnippet.language}
            activeCharIndex={userInput.length}
          />
        </div>

        <ResultModal
          isOpen={isFinished}
          stats={stats}
          onReset={handleRestart}
        />

        <div className={cn(
          "text-center text-gray-500 text-sm transition-all duration-700",
          isActive && "blur-md opacity-10 pointer-events-none"
        )}>
          <p>Tips: Gunakan <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20">Escape</kbd> untuk mengulang cepat.</p>
        </div>
      </div>
    </div>
  );
};
