import { TypingTest } from '@/components/TypingTest';
import { Terminal, Keyboard, Globe, CodeXml, Trophy, Settings, Users, UserCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 selection:bg-blue-500/30">
      {/* Background decoration - subtler */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <header className="flex items-center justify-between mb-24 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
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
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">SmoothNix</span>
            <div className="p-1 bg-[#1a1a1a] rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors">
              <UserCircle className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Main Component - Centered vertically more */}
        <div className="my-auto">
          <TypingTest />
        </div>

      </div>
    </main>
  );
}
