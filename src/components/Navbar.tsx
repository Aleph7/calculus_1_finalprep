import React from 'react';
import { BookOpen, CheckCircle2, FileText, Sparkles, Award, Search, Zap } from 'lucide-react';

export type TabType = 'mock-exam' | 'practice' | 'formula-vault' | 'slides-index';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  earnedPoints: number;
  totalPoints: number;
  onOpenFormulaDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  earnedPoints,
  totalPoints,
  onOpenFormulaDrawer,
}) => {
  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Course Details */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-sm">
            <span className="font-serif text-lg font-bold">∫</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-100">
                แคลคูลัส 1 <span className="text-zinc-400 font-medium text-xs sm:text-sm">เตรียมสอบปลายภาค</span>
              </span>
              <span className="rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[11px] font-bold text-zinc-200">
                50 คะแนน
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              คณะวิทยาศาสตร์ / ไอที สจล. (KMITL 06016301) • ข้อสอบ 12 ข้อมาตรฐาน
            </p>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="hidden lg:flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Award className="h-3.5 w-3.5 text-zinc-400" />
            <span>คะแนนสะสม:</span>
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-base font-bold text-zinc-100">{earnedPoints}</span>
            <span className="text-xs text-zinc-500">/ {totalPoints}</span>
          </div>
          <div className="h-3.5 w-px bg-zinc-800" />
          <span className={`text-xs font-mono font-bold ${percentage >= 80 ? 'text-zinc-100' : 'text-zinc-400'}`}>
            {percentage}%
          </span>
        </div>

        {/* Navigation Tabs & Quick Action */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('mock-exam')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'mock-exam'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              title="กดคีย์ 1 เพื่อเปิดข้อสอบจำลอง"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>ข้อสอบจำลอง</span>
              <span className={`rounded px-1 text-[10px] ${activeTab === 'mock-exam' ? 'bg-zinc-300 text-zinc-950 font-mono' : 'bg-zinc-800 text-zinc-400 font-mono'}`}>
                12 ข้อ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              title="กดคีย์ 2 เพื่อเปิดคลังแบบฝึกหัด"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">แบบฝึกหัด</span>
              <span className="sm:hidden">ฝึกหัด</span>
              <span className={`rounded px-1 text-[10px] ${activeTab === 'practice' ? 'bg-zinc-300 text-zinc-950 font-mono' : 'bg-zinc-800 text-zinc-400 font-mono'}`}>
                24
              </span>
            </button>

            <button
              onClick={() => setActiveTab('formula-vault')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'formula-vault'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              title="กดคีย์ 3 เพื่อเปิดคลังสูตร"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">คลังสูตร & จุดดัก</span>
              <span className="sm:hidden">คลังสูตร</span>
            </button>

            <button
              onClick={() => setActiveTab('slides-index')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'slides-index'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              title="กดคีย์ 4 เพื่อเปิดสไลด์และเอกสารเรียน"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">สไลด์ & เลกเชอร์</span>
              <span className="sm:hidden">สไลด์</span>
            </button>
          </nav>

          {/* Quick Formula Search Trigger Button */}
          <button
            onClick={onOpenFormulaDrawer}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition-colors ml-1"
            title="ค้นหาสูตรทันที (คีย์ลัด: กด /)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden md:inline">ค้นหาสูตร</span>
            <kbd className="text-[10px]"> / </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
