import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, Play, Pause, RotateCcw, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

interface ExamCountdownBarProps {
  totalQuestions: number;
  totalPoints: number;
  earnedPoints: number;
  completedCount: number;
}

export const ExamCountdownBar: React.FC<ExamCountdownBarProps> = ({
  totalQuestions,
  totalPoints,
  earnedPoints,
  completedCount,
}) => {
  // 120 minutes = 7200 seconds
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('Time is up! Please review your final exam answers.');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(120 * 60);
  };

  const isLowTime = timeLeft < 15 * 60;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-4 shadow-xl">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Exam Overview Stats */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2 border border-slate-700/60 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Architecture</span>
            <span className="text-sm font-bold text-white">12 Questions</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-sm font-bold text-cyan-400">50 Points Total</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-cyan-300 font-semibold">Q1–Q10: 4 pts each</span>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-amber-300 font-semibold">Q11–Q12: 5 pts each</span>
          </div>

          {/* Strict Calculator Warning Pill */}
          <button
            onClick={() => setShowWarningModal(true)}
            className="group flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-900/50 hover:border-rose-400"
          >
            <ShieldAlert className="h-4 w-4 text-rose-400 group-hover:scale-110 transition-transform" />
            <span>NO CALCULATORS ALLOWED</span>
            <span className="text-[10px] text-rose-400/80 underline ml-0.5">Rules</span>
          </button>
        </div>

        {/* Right: 120-min Countdown & Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Completion Meter */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Completed</div>
              <div className="text-sm font-bold text-slate-200">
                {completedCount} <span className="text-slate-500 font-normal">/ {totalQuestions} Qs</span>
              </div>
            </div>
            <div className="h-8 w-20 rounded-full bg-slate-800/80 p-1 border border-slate-700 flex items-center">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-1.5 shadow-inner">
            <Timer className={`h-5 w-5 ${isLowTime ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`} />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold leading-none">
                Exam Clock (120 min)
              </span>
              <span className={`font-mono text-xl font-extrabold tracking-wider ${isLowTime ? 'text-rose-400' : 'text-slate-100'}`}>
                {formattedTime}
              </span>
            </div>

            {/* Timer Buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`rounded-lg p-1.5 transition-colors ${
                  isRunning
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                }`}
                title={isRunning ? 'Pause Timer' : 'Start Timer'}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <button
                onClick={resetTimer}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
                title="Reset to 120:00"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="max-w-lg rounded-2xl border border-rose-500/40 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-bold">Academic Regulations & Answer Expectations</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Strict Calculator Policy:</strong> Calculators, smart devices, and symbolic computation engines are strictly disallowed in the official examination room.
              </p>
              <p>
                <strong className="text-white">Exact Mathematical Forms Only:</strong> Never approximate with decimals (e.g. do NOT write 3.1415 or 0.693). Answers must be written in exact closed form:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                <li>Reduced integer fractions: e.g. 4/3, 23/6, 287/2304</li>
                <li>Exact Constants: &pi;, e, &radic;2, &radic;3</li>
                <li>Logarithms: ln(2), (1/2)ln(1 + &radic;2)</li>
                <li>Inverse trigonometric expressions: &pi;/4, arctan(2)</li>
              </ul>
              <p className="text-xs text-amber-300/90 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                <strong>Standard Integration Table Provided:</strong> You will be supplied with the standard table of integral formulas (included in the Formula Vault tab). Statistics applications (probability density functions) are excluded.
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowWarningModal(false)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Understood, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
