import React, { useState } from 'react';
import { Sparkles, HelpCircle, Eye, EyeOff, CheckCircle2, Zap } from 'lucide-react';
import { practiceBank, PracticeProblem } from '../data/calculusData';
import { MathView, FormattedMathText } from './MathView';

export const TargetedPracticeDrills: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('ทั้งหมด');
  const [selectedLevel, setSelectedLevel] = useState<string>('ทั้งหมด');
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openHacks, setOpenHacks] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>({});

  const topics = [
    'ทั้งหมด',
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

  const levels = ['ทั้งหมด', 'ระดับง่าย', 'ระดับปานกลาง', 'ข้อสอบลวง'];

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHack = (id: string) => {
    setOpenHacks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id: string) => {
    setCompletedDrills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProblems = practiceBank.filter((p) => {
    const matchesTopic = selectedTopic === 'ทั้งหมด' || p.topicId === selectedTopic;
    const matchesLevel = selectedLevel === 'ทั้งหมด' || p.level === selectedLevel;
    return matchesTopic && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-zinc-300" />
              คลังโจทย์ฝึกทักษะเจาะลึก 24 ข้อ (Targeted Practice Drills)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              โจทย์ฝึกซ้อมตรงตามเนื้อหาข้อสอบจริง 12 หัวข้อ พร้อมแนวทางลัด (Speed Hack) และเฉลยละเอียดทุกข้อ
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>ทำเสร็จแล้ว:</span>
            <span className="font-bold text-zinc-100 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              {Object.values(completedDrills).filter(Boolean).length} / {practiceBank.length} ข้อ
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 space-y-3">
          {/* Topic Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mr-1">เทคนิค:</span>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedTopic === t
                    ? 'bg-zinc-100 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Difficulty Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mr-1">ระดับ:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-zinc-100 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
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
          const isHack = openHacks[problem.id] || false;
          const isSolution = openSolutions[problem.id] || false;
          const isDone = completedDrills[problem.id] || false;

          return (
            <div
              key={problem.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                isDone
                  ? 'border-zinc-700 bg-zinc-900/80'
                  : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">{problem.topic}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">{problem.topicId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-zinc-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300 border border-zinc-800">
                      {problem.level}
                    </span>

                    <button
                      onClick={() => toggleComplete(problem.id)}
                      className={`rounded p-1 transition-colors ${
                        isDone ? 'text-zinc-100 bg-zinc-800' : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                      title="ทำเสร็จแล้ว"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="my-4 rounded-lg bg-zinc-950 p-3.5 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono block mb-1">
                    โจทย์ข้อฝึกซ้อม
                  </span>
                  <div className="text-zinc-100 text-sm">
                    <FormattedMathText text={problem.problemStatement} />
                  </div>
                </div>

                {/* Speed Hack Area */}
                {isHack && (
                  <div className="mb-3 rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-xs text-zinc-300 animate-fade-in">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-zinc-100">
                      <Zap className="h-3.5 w-3.5" />
                      <span>แนวทางลัด (Speed Hack)</span>
                    </div>
                    <FormattedMathText text={problem.speedHack} />
                  </div>
                )}

                {/* Hint Area */}
                {isHint && (
                  <div className="mb-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400 animate-fade-in">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-zinc-300">
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>คำใบ้ & กลยุทธ์</span>
                    </div>
                    <FormattedMathText text={problem.hint} />
                  </div>
                )}

                {/* Solution Area */}
                {isSolution && (
                  <div className="mb-3 space-y-2 rounded-lg border border-zinc-700 bg-zinc-950 p-3.5 text-xs text-zinc-300 animate-fade-in">
                    <div className="font-bold text-zinc-100 text-xs border-b border-zinc-800 pb-1.5 flex items-center justify-between">
                      <span>ขั้นตอนการแสดงวิธีทำ</span>
                      <span className="text-[10px] text-zinc-500 font-mono">วิธีทำเต็ม</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      {problem.stepByStepSolution.map((s, idx) => (
                        <div key={idx} className="bg-zinc-900/60 p-2 rounded border border-zinc-800">
                          <FormattedMathText text={s} />
                        </div>
                      ))}
                    </div>
                    {/* Final Answer */}
                    <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-zinc-400 font-mono">คำตอบแม่นยำ:</span>
                      <MathView math={problem.finalAnswer} block={false} className="text-zinc-100 font-bold" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHack(problem.id)}
                    className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    <Zap className="h-3 w-3" />
                    <span>{isHack ? 'ซ่อนทริค' : 'ทริคลัด'}</span>
                  </button>

                  <button
                    onClick={() => toggleHint(problem.id)}
                    className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <HelpCircle className="h-3 w-3" />
                    <span>{isHint ? 'ซ่อนคำใบ้' : 'คำใบ้'}</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleSolution(problem.id)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSolution
                      ? 'bg-zinc-800 text-zinc-200'
                      : 'bg-zinc-100 text-zinc-950 font-bold hover:bg-white'
                  }`}
                >
                  {isSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{isSolution ? 'ซ่อนวิธีทำ' : 'ดูเฉลยละเอียด'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500 text-xs sm:text-sm">
          ไม่พบข้อสอบฝึกหัดในเงื่อนไขการกรองนี้
        </div>
      )}
    </div>
  );
};
