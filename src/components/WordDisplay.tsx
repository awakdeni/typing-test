'use client';

import React, { useEffect, useState, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WordDisplayProps {
  text: string;
  userInput: string;
  activeCharIndex: number;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  text,
  userInput,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [caretPos, setCaretPos] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    const activeElement = containerRef.current?.querySelector('.active-char') as HTMLElement;
    if (activeElement && containerRef.current) {
      // Update caret position
      setCaretPos({
        top: activeElement.offsetTop,
        left: activeElement.offsetLeft,
      });

      // Calculate discrete scroll: 
      // When moving to a new line, shift the view so the current line is always at the top
      // We ignore the very first line (top 0) to avoid unnecessary shift at the start
      const lineOffset = activeElement.offsetTop;
      if (lineOffset > 20) {
        setTranslateY(-lineOffset);
      } else {
        setTranslateY(0);
      }
    }
  }, [userInput]);

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-700">
      {/* Window Frame Header */}
      <div className="bg-[#0f0f0f] border border-white/5 rounded-t-3xl px-8 py-5 flex items-center justify-between">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="text-[10px] text-gray-500 font-mono tracking-[0.2em] opacity-40 uppercase font-bold">
          Typing / Professional_Session
        </div>
        <div className="w-12" />
      </div>

      <div 
        ref={containerRef}
        className="relative font-sans text-3xl bg-[#0a0a0a] px-16 rounded-b-3xl border-x border-b border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden h-[160px] flex items-start pt-16 scrollbar-hide"
      >
        <div 
          ref={textRef}
          className="w-full transition-transform duration-400 ease-in-out will-change-transform relative"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {/* Animated Caret */}
          <div 
            className="absolute w-[2.5px] h-[36px] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-100 z-10 animate-pulse rounded-full"
            style={{ 
              top: caretPos.top + 22,
              left: caretPos.left,
              transform: 'translateY(-50%)'
            }}
          />
          <div className="whitespace-pre-wrap break-words tracking-tight leading-[1.6] font-medium">
            {text.split('').map((char, index) => {
              let colorClass = 'text-white/30';
              let isCurrent = index === userInput.length;
              
              if (index < userInput.length) {
                const isCorrect = userInput[index] === char;
                colorClass = isCorrect ? 'text-gray-200' : 'text-red-500 bg-red-500/10 border-b-2 border-red-500';
              }

              return (
                <span
                  key={index}
                  className={cn(
                    'relative transition-colors duration-200 px-[0.5px]',
                    colorClass,
                    isCurrent && 'active-char text-white/50'
                  )}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
