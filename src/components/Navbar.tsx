'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Keyboard, CodeXml, Trophy, UserCircle, Type } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  isActive?: boolean;
  onRestart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isActive, onRestart }) => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between mb-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300" onClick={onRestart}>
          <div className="bg-[#1a1a1a] p-1.5 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors">
            <Keyboard className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </div>
          <span className="text-lg font-medium tracking-tight text-[#f2f2f2]">CodeSpeed</span>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex items-center gap-2 transition-all duration-700",
          isActive && "blur-md opacity-10 pointer-events-none"
        )}>
          <Link 
            href="/coding-test" 
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium",
              pathname === '/coding-test' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <CodeXml className="w-4 h-4" />
            <span>Ngoding</span>
          </Link>
          <Link 
            href="/typing-test" 
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium",
              pathname === '/typing-test' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <Type className="w-4 h-4" />
            <span>Mengetik</span>
          </Link>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <button className="text-gray-500 hover:text-white transition-colors p-1.5"><Trophy className="w-5 h-5" /></button>
        </nav>
      </div>

      {/* User Profile */}
      <div className={cn(
        "flex items-center gap-3 group cursor-pointer transition-all duration-700",
        isActive && "blur-md opacity-10 pointer-events-none"
      )}>
        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">awakdeni</span>
        <div className="p-1 bg-[#1a1a1a] rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors">
          <UserCircle className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </header>
  );
};
