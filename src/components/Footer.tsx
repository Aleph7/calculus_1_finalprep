import React from 'react';
import { GraduationCap, ShieldCheck, BookCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-cyan-400">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-300">
              Calculus 1 (06016301) Final Examination Preparation Platform
            </p>
            <p className="text-[11px] text-slate-500">
              King Mongkut’s Institute of Technology Ladkrabang (KMITL) • Final Exam Standards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Strict Exact-Value Specification</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <BookCheck className="h-3.5 w-3.5 text-cyan-400" />
            <span>50 Total Points Blueprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
