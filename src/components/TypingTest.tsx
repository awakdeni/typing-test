'use client';

import React, { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { CodeDisplay } from './CodeDisplay';
import { ResultModal } from './ResultModal';
import { useTypingTest } from '@/hooks/useTypingTest';
import codeSnippets from '@/data/codeSnippets.json';
import { Timer, RefreshCw, ChevronDown, Keyboard, CodeXml, Trophy, Settings, Users, UserCircle } from 'lucide-react';

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
    const filtered = codeSnippets.filter(
      s => s.language === selectedLanguage && s.difficulty === selectedDifficulty
    );
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
      {/* Main App Header - Blurs on type */}
      <header className={cn(
        "flex items-center justify-between mb-4 max-w-6xl mx-auto w-full transition-all duration-700",
        isActive && "blur-md opacity-10 pointer-events-none"
      )}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={handleRestart}>
            <div className="bg-[#1a1a1a] p-1.5 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors">
              <Keyboard className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
            </div>
            <span className="text-lg font-medium tracking-tight text-[#f2f2f2]">CodeSpeed</span>
          </div>

          <nav className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-white transition-colors"><CodeXml className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-white transition-colors"><Trophy className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-gray-400">
              <Users className="w-3 h-3" />
              <span>87</span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3 group cursor-pointer">
          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">awakdeni</span>
          <div className="p-1 bg-[#1a1a1a] rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors">
            <UserCircle className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </header>

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
              <div className="absolute top-full left-0 mt-2 py-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/select:opacity-100 group-hover/select:visible transition-all z-50">
                {['javascript', 'python', 'html'].map((lang) => (
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
              <button
                onClick={handleRestart}
                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"
                title="Reset Test"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
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
