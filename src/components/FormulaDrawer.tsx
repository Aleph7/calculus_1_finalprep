import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Copy, Check } from 'lucide-react';
import { formulaSheet, FormulaItem } from '../data/calculusData';
import { MathView } from './MathView';

interface FormulaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaDrawer: React.FC<FormulaDrawerProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return formulaSheet;
    return formulaSheet.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.nameEn.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.latex.toLowerCase().includes(q)
    );
  }, [search]);

  const copyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="flex h-full w-full max-w-xl flex-col border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">เปิดดูสูตรด่วน (Instant Formula Vault)</h3>
              <p className="text-xs text-zinc-400">ค้นหาตารางสูตรที่อนุญาตในห้องสอบได้ทันที</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block">ESC</kbd>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative my-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="พิมพ์ค้นหา เช่น แทนค่า, secant, อัตราส่วน, arctan..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 font-sans"
          />
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-zinc-200">{item.name}</span>
                <button
                  onClick={() => copyLatex(item.latex, item.id)}
                  className="rounded p-1 text-zinc-500 hover:text-zinc-300"
                  title="คัดลอก LaTeX"
                >
                  {copiedId === item.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="my-2 rounded-lg bg-zinc-950 p-2.5 border border-zinc-800/60 overflow-x-auto text-center">
                <MathView math={item.latex} block />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-500">
              ไม่พบสูตรที่ตรงกับคำค้นหา "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 pt-3 text-right">
          <span className="text-[11px] text-zinc-500">
            กด <kbd>ESC</kbd> หรือคลิกภายนอกเพื่อปิดหน้านี้
          </span>
        </div>
      </div>
    </div>
  );
};
