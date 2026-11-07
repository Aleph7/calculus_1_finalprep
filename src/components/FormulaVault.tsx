import React, { useState, useMemo } from 'react';
import { Search, BookOpen, AlertOctagon, HelpCircle, Layers, Check, Copy } from 'lucide-react';
import { formulaSheet, FormulaItem } from '../data/calculusData';
import { MathView, FormattedMathText } from './MathView';

export const FormulaVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Formulas (19)' },
    { id: 'standard_integrals', label: 'Standard Integration Table (Allowed in Exam)' },
    { id: 'reduction', label: 'Reduction Formulas' },
    { id: 'trig_sub', label: 'Trig Sub & Reference Triangles' },
    { id: 'series_tests', label: 'Series Convergence Tests' },
    { id: 'maclaurin_taylor', label: 'Maclaurin & Taylor Expansions' },
    { id: 'pitfalls', label: '⚠️ Common Traps & Pitfalls' },
  ];

  const filteredFormulas = useMemo(() => {
    return formulaSheet.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.latex.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas, theorems (e.g. secant, ratio, taylor, arctan, trap)..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-cyan-400 font-mono">{filteredFormulas.length}</strong> formula reference{filteredFormulas.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? cat.id === 'pitfalls'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Official Allowed Exam Notice Banner */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-xs text-cyan-200 flex items-start gap-3">
        <BookOpen className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">
            Official Exam Information Sheet Guidelines (KMITL Calculus 1)
          </p>
          <p className="text-slate-300 leading-relaxed">
            The standard integration table below (formulas 1 through 10) and reduction formulas are formally provided on the exam paper. Students are expected to memorize all series convergence tests (especially Geometric and Ratio tests) as well as the standard Maclaurin series expansions.
          </p>
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((item) => {
          const isPitfall = item.category === 'pitfalls';

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all ${
                isPitfall
                  ? 'border-rose-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isPitfall ? (
                      <AlertOctagon className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    ) : (
                      <Layers className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    )}
                    <h3 className={`text-sm font-bold ${isPitfall ? 'text-rose-300' : 'text-white'}`}>
                      {item.name}
                    </h3>
                  </div>

                  {/* Copy LaTeX button */}
                  <button
                    onClick={() => copyToClipboard(item.latex, item.id)}
                    className="rounded p-1 text-slate-500 hover:text-slate-300 transition-colors"
                    title="Copy LaTeX"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Mathematical Formula Render */}
                <div className={`my-3 overflow-x-auto rounded-lg p-3 text-center ${
                  isPitfall ? 'bg-rose-950/40 border border-rose-800/40' : 'bg-slate-950 border border-slate-800/80'
                }`}>
                  <MathView math={item.latex} block />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Notes or Conditions if available */}
                {item.notes && (
                  <p className="mt-2 text-[11px] text-amber-300/80 bg-amber-950/30 px-2 py-1 rounded border border-amber-900/40">
                    💡 <strong>Note:</strong> {item.notes}
                  </p>
                )}
                {item.conditions && (
                  <p className="mt-2 text-[11px] text-slate-400 font-mono">
                    Condition: {item.conditions}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-sm">
          No formulas matched your search query "{searchQuery}". Try searching for "ratio", "secant", or "parts".
        </div>
      )}
    </div>
  );
};
