import React from 'react';
import { BookOpen, GraduationCap, Calculator, FileText, CheckCircle2, Award, Sparkles } from 'lucide-react';

export type TabType = 'mock-exam' | 'practice' | 'formula-vault' | 'slides-index';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  earnedPoints: number;
  totalPoints: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  earnedPoints,
  totalPoints,
}) => {
  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Course Title */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-lg shadow-cyan-900/40">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                CALCULUS 1 <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">FINAL MASTERY</span>
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                50 PTS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              KMITL Faculty of Science / IT • 12 Questions Final Blueprint
            </p>
          </div>
        </div>

        {/* Live Score Tracker Pill */}
        <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Score:</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-base font-bold text-cyan-400">{earnedPoints}</span>
            <span className="text-xs text-slate-500">/ {totalPoints} pts</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`font-semibold ${percentage >= 80 ? 'text-emerald-400' : percentage >= 50 ? 'text-cyan-400' : 'text-amber-400'}`}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('mock-exam')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'mock-exam'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Mock Exam</span>
            <span className="hidden sm:inline-block rounded-full bg-cyan-500/20 px-1.5 py-0.2 text-[10px] text-cyan-300">
              12 Qs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'practice'
                ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/40 shadow-sm shadow-indigo-950'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Practice Drills</span>
            <span className="hidden sm:inline-block rounded-full bg-indigo-500/20 px-1.5 py-0.2 text-[10px] text-indigo-300">
              24
            </span>
          </button>

          <button
            onClick={() => setActiveTab('formula-vault')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'formula-vault'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-950'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Formula Vault</span>
            <span className="sm:hidden">Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('slides-index')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'slides-index'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-950'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Slides & Notes</span>
            <span className="sm:hidden">Slides</span>
            <span className="hidden md:inline-block rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-300">
              37
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
