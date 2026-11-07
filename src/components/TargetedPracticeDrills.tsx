import React, { useState } from 'react';
import { Sparkles, HelpCircle, Eye, EyeOff, Filter, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { practiceBank, PracticeProblem } from '../data/calculusData';
import { MathView, FormattedMathText } from './MathView';

export const TargetedPracticeDrills: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>({});

  const topics = [
    'All',
    'Substitution',
    'Long Division',
    'Parts',
    'Trig Sub',
    'Partial Fractions',
    'Reduction Formulas',
    'Geometric Series',
    'Ratio Test',
    'Power Series',
    'Maclaurin',
    'Taylor Series',
    'Taylor Applications',
  ];

  const levels = ['All', 'Easy', 'Medium', 'Exam Trap'];

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id: string) => {
    setCompletedDrills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProblems = practiceBank.filter((p) => {
    const matchesTopic = selectedTopic === 'All' || p.topicId === selectedTopic;
    const matchesLevel = selectedLevel === 'All' || p.level === selectedLevel;
    return matchesTopic && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              Targeted Technique Practice Drills
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              24 curated exam-level drills spanning all 12 core final exam topics with full step-by-step solutions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Completed:</span>
            <span className="font-mono font-bold text-emerald-400">
              {Object.values(completedDrills).filter(Boolean).length} / {practiceBank.length}
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 space-y-3">
          {/* Topic Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">Technique:</span>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedTopic === t
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Difficulty Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">Difficulty:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Drill Problems Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProblems.map((problem) => {
          const isHint = openHints[problem.id] || false;
          const isSolution = openSolutions[problem.id] || false;
          const isDone = completedDrills[problem.id] || false;

          return (
            <div
              key={problem.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                isDone
                  ? 'border-emerald-500/40 bg-slate-900/90 shadow-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header: Topic & Level Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">{problem.topic}</span>
                    <span className="text-[11px] text-slate-500">{problem.topicTh}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        problem.level === 'Easy'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : problem.level === 'Medium'
                          ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {problem.level}
                    </span>

                    <button
                      onClick={() => toggleComplete(problem.id)}
                      className={`rounded p-1 transition-colors ${
                        isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title="Mark as completed"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="my-4 rounded-lg bg-slate-950/80 p-3.5 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Drill Problem</span>
                  <div className="text-slate-100 text-sm">
                    <FormattedMathText text={problem.problemStatement} />
                  </div>
                </div>

                {/* Hint Area */}
                {isHint && (
                  <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-300">
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>Technique Hint</span>
                    </div>
                    <FormattedMathText text={problem.hint} />
                  </div>
                )}

                {/* Solution Area */}
                {isSolution && (
                  <div className="mb-3 space-y-2 rounded-lg border border-cyan-500/30 bg-slate-950 p-3.5 text-xs text-slate-300">
                    <div className="font-bold text-white text-xs border-b border-slate-800 pb-1.5 flex items-center justify-between">
                      <span>Step-by-Step Derivation</span>
                      <span className="text-[10px] text-cyan-400 font-mono">Exact Formulation</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      {problem.stepByStepSolution.map((s, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
                          <FormattedMathText text={s} />
                        </div>
                      ))}
                    </div>
                    {/* Final Answer */}
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-400">Exact Answer:</span>
                      <MathView math={problem.finalAnswer} block={false} className="text-emerald-300 font-bold" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => toggleHint(problem.id)}
                  className="flex items-center gap-1 text-xs text-amber-400/90 hover:text-amber-300 transition-colors"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>{isHint ? 'Hide Clue' : 'Hint'}</span>
                </button>

                <button
                  onClick={() => toggleSolution(problem.id)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSolution
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-indigo-600/80 text-white hover:bg-indigo-500'
                  }`}
                >
                  {isSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{isSolution ? 'Hide Solution' : 'View Solution'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-sm">
          No practice problems match your selected filters.
        </div>
      )}
    </div>
  );
};
