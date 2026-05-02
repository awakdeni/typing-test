import { TypingTest } from '@/components/TypingTest';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 selection:bg-blue-500/30 pt-4 pb-20 px-4">
      {/* Background decoration - subtler */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <TypingTest />
      </div>
    </main>
  );
}
