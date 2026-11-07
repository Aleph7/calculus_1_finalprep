import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  BookmarkCheck,
  Eye,
  EyeOff,
  Filter,
  Check,
  Trophy,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { mockExamQuestions, ExamQuestion } from '../data/calculusData';
import { MathView, FormattedMathText } from './MathView';

interface MockExamArenaProps {
  userScores: Record<number, number>;
  setUserScore: (questionId: number, score: number) => void;
  completedQuestions: Record<number, boolean>;
  toggleCompleted: (questionId: number) => void;
  earnedPoints: number;
  totalPoints: number;
}

export const MockExamArena: React.FC<MockExamArenaProps> = ({
  userScores,
  setUserScore,
  completedQuestions,
  toggleCompleted,
  earnedPoints,
  totalPoints,
}) => {
  // Track open states for hints, solutions, and rubrics per question
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<Record<number, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const toggleSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: number) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRubric = (id: number) => {
    setRevealedRubrics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAllSolutions = () => {
    const all: Record<number, boolean> = {};
    mockExamQuestions.forEach((q) => {
      all[q.id] = true;
    });
    setRevealedSolutions(all);
  };

  const hideAllSolutions = () => {
    setRevealedSolutions({});
  };

  const handleFinishExam = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowSummaryModal(true);
  };

  const categories = ['All', 'Substitution', 'Long Division', 'Parts', 'Trig Sub', 'Partial Fractions', 'Reduction Formulas', 'Geometric Series', 'Ratio Test', 'Power Series', 'Maclaurin', 'Taylor Series', 'Taylor Applications'];

  const filteredQuestions = filterCategory === 'All'
    ? mockExamQuestions
    : mockExamQuestions.filter((q) => q.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="h-4 w-4 text-slate-400 mr-1" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {categories.length > 6 && (
            <select
              value={categories.slice(6).includes(filterCategory) ? filterCategory : ''}
              onChange={(e) => setFilterCategory(e.target.value || 'All')}
              className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300 border border-slate-700 outline-none"
            >
              <option value="">More Topics...</option>
              {categories.slice(6).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={revealAllSolutions}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            <span>Show All Solutions</span>
          </button>
          <button
            onClick={hideAllSolutions}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <EyeOff className="h-3.5 w-3.5 text-slate-400" />
            <span>Hide All</span>
          </button>
          <button
            onClick={handleFinishExam}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-950 hover:from-cyan-500 hover:to-indigo-500 transition-all"
          >
            <Trophy className="h-3.5 w-3.5 text-amber-300" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Jump Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Jump to Question:</span>
        <div className="flex items-center gap-1.5">
          {mockExamQuestions.map((q) => {
            const isCompleted = completedQuestions[q.id];
            const score = userScores[q.id] || 0;
            return (
              <a
                key={q.id}
                href={`#question-${q.id}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : score > 0
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                }`}
                title={`Question ${q.id} (${q.points} pts)`}
              >
                Q{q.id}
              </a>
            );
          })}
        </div>
      </div>

      {/* 12 Exam Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((question) => {
          const isRevealed = revealedSolutions[question.id] || false;
          const isHintOpen = revealedHints[question.id] || false;
          const isRubricOpen = revealedRubrics[question.id] || false;
          const isCompleted = completedQuestions[question.id] || false;
          const currentScore = userScores[question.id] ?? 0;

          return (
            <article
              key={question.id}
              id={`question-${question.id}`}
              className={`rounded-2xl border transition-all duration-300 ${
                isCompleted
                  ? 'border-emerald-500/40 bg-slate-900/90 shadow-lg shadow-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700/80'
              } p-5 sm:p-6`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 font-mono text-sm font-extrabold text-cyan-400 border border-cyan-500/30">
                    Q{question.id}
                  </span>

                  {/* Points Badge (4 PTS or 5 PTS) */}
                  <span
                    className={`rounded-md px-2.5 py-1 font-mono text-xs font-extrabold tracking-wide uppercase ${
                      question.points === 5
                        ? 'border border-amber-500/40 bg-amber-950/50 text-amber-300 shadow-sm'
                        : 'border border-cyan-500/40 bg-cyan-950/50 text-cyan-300 shadow-sm'
                    }`}
                  >
                    {question.points} POINTS
                  </span>

                  {/* Topic Names (EN & TH) */}
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white">
                      {question.topic}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {question.topicTh}
                    </p>
                  </div>
                </div>

                {/* Score & Checkbox Completion */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Partial Credit Selector */}
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1">
                    <span className="text-[11px] font-semibold text-slate-400">My Score:</span>
                    <select
                      value={currentScore}
                      onChange={(e) => setUserScore(question.id, Number(e.target.value))}
                      className="rounded bg-slate-800 font-mono text-xs font-bold text-cyan-400 px-1.5 py-0.5 outline-none cursor-pointer"
                    >
                      {Array.from({ length: question.points + 1 }, (_, i) => (
                        <option key={i} value={i}>
                          {i} / {question.points}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Completed Checkmark Toggle */}
                  <button
                    onClick={() => toggleCompleted(question.id)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Mark as completed / reviewed"
                  >
                    <Check className={`h-3.5 w-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{isCompleted ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="my-5 rounded-xl border border-slate-800/80 bg-slate-950/70 p-4 sm:p-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Problem Statement
                </span>
                <div className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  <FormattedMathText text={question.problemStatement} />
                </div>
              </div>

              {/* Action Toolbar: Hint, Solution, Rubric Toggles */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Hints Toggle */}
                {question.hints && question.hints.length > 0 && (
                  <button
                    onClick={() => toggleHint(question.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition-colors"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                    <span>{isHintOpen ? 'Hide Exam Clues' : 'Exam Clues & Strategy'}</span>
                    {isHintOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                )}

                {/* Rubric Criteria Toggle */}
                <button
                  onClick={() => toggleRubric(question.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-300 transition-colors"
                >
                  <Award className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{isRubricOpen ? 'Hide Scoring Rubric' : `Scoring Rubric (${question.points} pts)`}</span>
                  {isRubricOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {/* Reveal Full Solution Toggle Button */}
                <button
                  onClick={() => toggleSolution(question.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ml-auto ${
                    isRevealed
                      ? 'border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-sm'
                      : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-md shadow-cyan-950'
                  }`}
                >
                  {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{isRevealed ? 'Hide Derivation' : 'Reveal Step-by-Step Solution'}</span>
                </button>
              </div>

              {/* Hints Box */}
              {isHintOpen && (
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold mb-2 text-amber-300">
                    <Sparkles className="h-4 w-4" />
                    <span>Methodological Clues & Guidance</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-amber-200/90 leading-relaxed">
                    {question.hints.map((hint, idx) => (
                      <li key={idx}>
                        <FormattedMathText text={hint} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scoring Rubric Box */}
              {isRubricOpen && (
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <BookmarkCheck className="h-4 w-4 text-cyan-400" />
                      Official Partial Credit Rubric
                    </span>
                    <span className="text-slate-400 font-mono">Total: {question.points} Pts</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-1.5 pr-4 font-semibold">Evaluation Criteria</th>
                          <th className="py-1.5 text-right font-semibold font-mono w-24">Allocation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {question.rubric.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50">
                            <td className="py-2 pr-4 text-slate-300">{item.criteria}</td>
                            <td className="py-2 text-right font-mono font-bold text-cyan-400">
                              +{item.points} pt{item.points > 1 ? 's' : ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Complete Step-by-Step Solution */}
              {isRevealed && (
                <div className="mt-5 space-y-4 rounded-xl border border-cyan-500/30 bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm font-bold text-white">
                        Complete Mathematical Derivation (No Calculator Required)
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Exact Formulation</span>
                  </div>

                  {/* Derivation Steps */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                    {question.stepByStepSolution.map((step, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-slate-900/70 p-3.5 border border-slate-800/80 leading-relaxed"
                      >
                        <FormattedMathText text={step} />
                      </div>
                    ))}
                  </div>

                  {/* Final Answer Highlight Box */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-4 shadow-inner">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Final Exact Value:
                    </span>
                    <div className="text-right">
                      <MathView math={question.finalAnswer} block={false} className="text-base sm:text-lg font-bold text-emerald-200" />
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Exam Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="max-w-lg w-full rounded-2xl border border-cyan-500/50 bg-slate-900 p-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-900/50">
                <Trophy className="h-8 w-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Calculus 1 Mock Exam Results</h3>
              <p className="text-xs text-slate-400">King Mongkut’s Institute of Technology Ladkrabang</p>
            </div>

            <div className="my-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Self-Assessed Score</span>
              <div className="mt-1 flex items-baseline justify-center gap-1 font-mono">
                <span className="text-4xl font-extrabold text-cyan-400">{earnedPoints}</span>
                <span className="text-lg text-slate-500">/ {totalPoints} pts</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-300">
                {earnedPoints >= 40
                  ? '🌟 Outstanding! You are primed for an A grade on the final exam.'
                  : earnedPoints >= 30
                  ? '👍 Solid performance! Review your partial credit rubrics on missed questions.'
                  : '💡 Keep practicing! Focus on polynomial long division, trig sub, and power series.'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Total Questions Completed:</span>
                <span className="font-bold text-white">
                  {Object.values(completedQuestions).filter(Boolean).length} / 12
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">4-Point Questions Score (Q1–Q10):</span>
                <span className="font-bold text-cyan-400">
                  {Array.from({ length: 10 }, (_, i) => userScores[i + 1] || 0).reduce((a, b) => a + b, 0)} / 40 pts
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">5-Point Questions Score (Q11–Q12):</span>
                <span className="font-bold text-amber-400">
                  {(userScores[11] || 0) + (userScores[12] || 0)} / 10 pts
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="w-full rounded-xl bg-cyan-600 py-2.5 text-sm font-bold text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-950"
              >
                Return to Arena
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
