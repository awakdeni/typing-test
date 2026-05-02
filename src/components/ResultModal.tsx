'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypingStats } from '@/hooks/useTypingTest';
import { RotateCcw, Trophy, Target, Zap, MousePointer2 } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  stats: TypingStats;
  onReset: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, stats, onReset }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-[#0d0d0d] border border-white/10 rounded-3xl shadow-2xl"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-yellow-500/10 rounded-full">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
            
            <h2 className="text-3xl font-medium text-white">Test Selesai!</h2>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-center gap-2 mb-1 text-gray-500 text-xs uppercase font-medium tracking-tighter">
                  <Zap className="w-3 h-3" />
                  <span>WPM</span>
                </div>
                <div className="text-3xl font-bold text-blue-400">{stats.wpm}</div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-center gap-2 mb-1 text-gray-500 text-xs uppercase font-medium tracking-tighter">
                  <Target className="w-3 h-3" />
                  <span>Accuracy</span>
                </div>
                <div className="text-3xl font-bold text-green-400">{stats.accuracy}%</div>
              </div>
 
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-center gap-2 mb-1 text-gray-500 text-xs uppercase font-medium tracking-tighter">
                  <MousePointer2 className="w-3 h-3" />
                  <span>CPM</span>
                </div>
                <div className="text-3xl font-bold text-purple-400">{stats.cpm}</div>
              </div>
 
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-center gap-2 mb-1 text-gray-500 text-xs uppercase font-medium tracking-tighter">
                  <Target className="w-3 h-3" />
                  <span>Correct</span>
                </div>
                <div className="text-3xl font-bold text-emerald-400">{stats.correctChars}</div>
              </div>
            </div>
 
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  const text = `🚀 CodeSpeed Test Results:\n📈 WPM: ${stats.wpm}\n🎯 Accuracy: ${stats.accuracy}%\n⌨️ CPM: ${stats.cpm}\n✅ Correct: ${stats.correctChars}\n\nUji kecepatan kodemu di CodeSpeed!`;
                  navigator.clipboard.writeText(text);
                  alert('Hasil berhasil disalin!');
                }}
                className="group flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 font-medium rounded-2xl transition-all active:scale-95"
              >
                Salin Hasil
              </button>

              <button
                onClick={onReset}
                className="group flex items-center justify-center gap-2 w-full py-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 font-medium rounded-2xl transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Coba Lagi
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
