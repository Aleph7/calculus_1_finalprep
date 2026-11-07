import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  BookmarkCheck,
  Eye,
  EyeOff,
  Filter,
  Check,
  Trophy,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockExamQuestions, ExamQuestion, SlideReference } from '../data/calculusData';
import { MathView, FormattedMathText } from './MathView';
import { SlideLightbox } from './SlideLightbox';

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
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [revealedHacks, setRevealedHacks] = useState<Record<number, boolean>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<Record<number, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>('ทั้งหมด');
  const [activeSlide, setActiveSlide] = useState<{ slide: SlideReference; qNum: number } | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});

  // Keyboard navigation listener (J/K, S, H, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 's' || e.key === 'S') {
        // Toggle all solutions
        setRevealedSolutions((prev) => {
          const hasAny = Object.values(prev).some(Boolean);
          if (hasAny) return {};
          const all: Record<number, boolean> = {};
          mockExamQuestions.forEach((q) => (all[q.id] = true));
          return all;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHack = (id: number) => {
    setRevealedHacks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRubric = (id: number) => {
    setRevealedRubrics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCriteriaCheck = (questionId: number, criteriaIdx: number, points: number, maxPoints: number) => {
    const key = `${questionId}-${criteriaIdx}`;
    const nextState = !checkedCriteria[key];
    const newChecked = { ...checkedCriteria, [key]: nextState };
    setCheckedCriteria(newChecked);

    // Recalculate score for this question based on checked criteria
    const q = mockExamQuestions.find((item) => item.id === questionId);
    if (q) {
      const qScore = q.rubric.reduce((sum, item, idx) => {
        return sum + (newChecked[`${questionId}-${idx}`] ? item.points : 0);
      }, 0);
      setUserScore(questionId, Math.min(maxPoints, qScore));
    }
  };

  const revealAllSolutions = () => {
    const all: Record<number, boolean> = {};
    mockExamQuestions.forEach((q) => (all[q.id] = true));
    setRevealedSolutions(all);
  };

  const hideAllSolutions = () => {
    setRevealedSolutions({});
  };

  const handleFinishExam = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
    });
    setShowSummaryModal(true);
  };

  const categories = [
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

  const filteredQuestions = filterCategory === 'ทั้งหมด'
    ? mockExamQuestions
    : mockExamQuestions.filter((q) => q.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="h-4 w-4 text-zinc-500 mr-1" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mr-1">กรองหัวข้อ:</span>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat === 'ทั้งหมด' ? 'ทั้งหมด (12 ข้อ)' : cat}
            </button>
          ))}
          {categories.length > 6 && (
            <select
              value={categories.slice(6).includes(filterCategory) ? filterCategory : ''}
              onChange={(e) => setFilterCategory(e.target.value || 'ทั้งหมด')}
              className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 border border-zinc-800 outline-none cursor-pointer"
            >
              <option value="">หัวข้ออื่น ๆ...</option>
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
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            title="แสดงเฉลยวิธีทำทุกข้อพร้อมกัน"
          >
            <Eye className="h-3.5 w-3.5 text-zinc-400" />
            <span>แสดงเฉลยทั้งหมด</span>
          </button>
          <button
            onClick={hideAllSolutions}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <EyeOff className="h-3.5 w-3.5" />
            <span>ซ่อนทั้งหมด</span>
          </button>
          <button
            onClick={handleFinishExam}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-1.5 text-xs font-bold text-zinc-950 shadow-sm hover:bg-white transition-colors"
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>ส่งและสรุปคะแนน</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Jump Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-zinc-500 whitespace-nowrap">ไปยังข้อ:</span>
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
                    ? 'bg-zinc-100 text-zinc-950 font-extrabold'
                    : score > 0
                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
                title={`ข้อที่ ${q.id} (${q.points} คะแนน)`}
              >
                {q.id}
              </a>
            );
          })}
        </div>
      </div>

      {/* 12 Exam Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((question) => {
          const isRevealed = revealedSolutions[question.id] || false;
          const isHackOpen = revealedHacks[question.id] || false;
          const isRubricOpen = revealedRubrics[question.id] || false;
          const isCompleted = completedQuestions[question.id] || false;
          const currentScore = userScores[question.id] ?? 0;

          return (
            <article
              key={question.id}
              id={`question-${question.id}`}
              className={`rounded-2xl border transition-all duration-200 ${
                isCompleted
                  ? 'border-zinc-600 bg-zinc-900/90 shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              } p-5 sm:p-6`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 font-mono text-sm font-extrabold text-zinc-100 border border-zinc-700">
                    {question.id}
                  </span>

                  {/* Points Badge */}
                  <span className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 font-mono text-xs font-bold text-zinc-200">
                    {question.points} คะแนน
                  </span>

                  {/* Topic Title */}
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-zinc-100">
                      {question.topic}
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono">
                      {question.topicEn}
                    </p>
                  </div>
                </div>

                {/* Score & Completion Action */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Interactive Grader Select */}
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1">
                    <span className="text-[11px] font-semibold text-zinc-400">คะแนนที่ได้:</span>
                    <select
                      value={currentScore}
                      onChange={(e) => setUserScore(question.id, Number(e.target.value))}
                      className="rounded bg-zinc-900 font-mono text-xs font-bold text-zinc-100 px-1.5 py-0.5 outline-none cursor-pointer border border-zinc-800"
                    >
                      {Array.from({ length: question.points + 1 }, (_, i) => (
                        <option key={i} value={i}>
                          {i} / {question.points}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mark as Done Button */}
                  <button
                    onClick={() => toggleCompleted(question.id)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{isCompleted ? 'ทำแล้ว' : 'ทำเสร็จ'}</span>
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="my-5 rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 sm:p-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
                  โจทย์ข้อสอบปลายภาค (Problem Statement)
                </span>
                <div className="text-zinc-100 text-sm sm:text-base leading-relaxed">
                  <FormattedMathText text={question.problemStatement} />
                </div>
              </div>

              {/* Slide Reference Bar & Lightbox Trigger */}
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-xs">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-zinc-200">สไลด์เลกเชอร์ที่เกี่ยวข้อง:</span>{' '}
                    <span className="text-zinc-400">
                      Week {question.slideReference.lectureNumber} หน้า {question.slideReference.pageNumber} ({question.slideReference.slideTitle})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSlide({ slide: question.slideReference, qNum: question.id })}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  <Eye className="h-3 w-3" />
                  <span>ดูภาพสไลด์อาจารย์</span>
                </button>
              </div>

              {/* Action Toolbar: Speed Hack, Rubric, Solution */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Speed Hack Toggle */}
                <button
                  onClick={() => toggleHack(question.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isHackOpen
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>{isHackOpen ? 'ซ่อนแนวทางลัด' : '⚡ แนวทางลัด & Speed Hack'}</span>
                  {isHackOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {/* Scoring Rubric Toggle */}
                <button
                  onClick={() => toggleRubric(question.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                >
                  <BookmarkCheck className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{isRubricOpen ? 'ซ่อนเกณฑ์การให้คะแนน' : `เกณฑ์ให้คะแนน (${question.points} คะแนน)`}</span>
                  {isRubricOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {/* Solution Reveal Button */}
                <button
                  onClick={() => toggleSolution(question.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ml-auto ${
                    isRevealed
                      ? 'border border-zinc-700 bg-zinc-800 text-zinc-200'
                      : 'bg-zinc-100 text-zinc-950 hover:bg-white'
                  }`}
                >
                  {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{isRevealed ? 'ซ่อนวิธีทำแบบเต็ม' : 'เปิดวิธีทำอย่างละเอียด'}</span>
                </button>
              </div>

              {/* Speed Hack Detail Box */}
              {isHackOpen && (
                <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-xs space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2 font-bold text-zinc-100">
                      <Zap className="h-4 w-4" />
                      <span>{question.speedHack.title}</span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {question.speedHack.timeSaved}
                    </span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {question.speedHack.description}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                      ขั้นตอนการคิดแบบตัดเวลา:
                    </span>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      {question.speedHack.steps.map((st, sIdx) => (
                        <li key={sIdx}>
                          <FormattedMathText text={st} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Interactive Scoring Rubric Grader */}
              {isRubricOpen && (
                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                    <span className="font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5 font-mono">
                      <BookmarkCheck className="h-4 w-4 text-zinc-400" />
                      เกณฑ์การให้คะแนนย่อย (Rubric Grader - ติ๊กเพื่อจำลองคะแนน)
                    </span>
                    <span className="text-zinc-400 font-mono">เต็ม {question.points} คะแนน</span>
                  </div>

                  <div className="space-y-2">
                    {question.rubric.map((item, idx) => {
                      const isChecked = checkedCriteria[`${question.id}-${idx}`] || false;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleCriteriaCheck(question.id, idx, item.points, question.points)}
                          className={`flex items-start justify-between gap-3 rounded-lg p-2.5 border cursor-pointer transition-colors ${
                            isChecked
                              ? 'border-zinc-600 bg-zinc-900/90 text-zinc-100'
                              : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-zinc-100 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Square className="h-4 w-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                            )}
                            <span className="leading-snug">{item.criteria}</span>
                          </div>
                          <span className="font-mono font-bold text-zinc-200 whitespace-nowrap pl-2">
                            +{item.points} คะแนน
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step-by-Step Full Solution */}
              {isRevealed && (
                <div className="mt-5 space-y-4 rounded-xl border border-zinc-700 bg-zinc-950 p-5 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-zinc-100" />
                      <span className="text-sm font-bold text-zinc-100">
                        ขั้นตอนการพิสูจน์และคำนวณอย่างละเอียด (โดยไม่ใช้เครื่องคิดเลข)
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">แสดงวิธีทำเต็ม</span>
                  </div>

                  {/* Derivation Steps */}
                  <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                    {question.stepByStepSolution.map((step, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-zinc-900/60 p-3.5 border border-zinc-800 leading-relaxed"
                      >
                        <FormattedMathText text={step} />
                      </div>
                    ))}
                  </div>

                  {/* Exact Final Answer */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                      คำตอบสุดท้ายที่แม่นยำ (Exact Closed Form):
                    </span>
                    <div className="text-right">
                      <MathView math={question.finalAnswer} block={false} className="text-base sm:text-lg font-bold text-zinc-100" />
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Slide Lightbox Modal */}
      {activeSlide && (
        <SlideLightbox
          slide={activeSlide.slide}
          questionNumber={activeSlide.qNum}
          onClose={() => setActiveSlide(null)}
        />
      )}

      {/* Exam Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">สรุปผลการประเมินคะแนนสอบปลายภาค</h3>
              <p className="text-xs text-zinc-400">แคลคูลัส 1 • คณะวิทยาศาสตร์ / ไอที สจล.</p>
            </div>

            <div className="my-5 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">คะแนนที่ประเมินได้</span>
              <div className="mt-1 flex items-baseline justify-center gap-1 font-mono">
                <span className="text-4xl font-extrabold text-zinc-100">{earnedPoints}</span>
                <span className="text-base text-zinc-500">/ {totalPoints} คะแนน</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-zinc-300">
                {earnedPoints >= 40
                  ? '🌟 ยอดเยี่ยมมาก! ระดับคะแนนอยู่ในเกณฑ์เกรด A สำหรับการสอบปลายภาค'
                  : earnedPoints >= 30
                  ? '👍 ทำได้ดี! ทบทวนจุดดักและเกณฑ์ย่อยในข้อที่เสียคะแนนเพื่อความแม่นยำ'
                  : '💡 ฝึกฝนเพิ่มเติมในหัวข้อหารยาวพหุนาม, Trig Sub และการทดสอบจุดขอบเขตของอนุกรมกำลัง'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">จำนวนข้อที่ตรวจแล้ว:</span>
                <span className="font-bold text-zinc-100 font-mono">
                  {Object.values(completedQuestions).filter(Boolean).length} / 12 ข้อ
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">คะแนนส่วนที่ 1 (ข้อ 1–10: เต็ม 40):</span>
                <span className="font-bold text-zinc-200 font-mono">
                  {Array.from({ length: 10 }, (_, i) => userScores[i + 1] || 0).reduce((a, b) => a + b, 0)} คะแนน
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">คะแนนส่วนที่ 2 (ข้อ 11–12: เต็ม 10):</span>
                <span className="font-bold text-zinc-200 font-mono">
                  {(userScores[11] || 0) + (userScores[12] || 0)} คะแนน
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="w-full rounded-xl bg-zinc-100 py-2.5 text-xs sm:text-sm font-bold text-zinc-950 hover:bg-white transition-colors"
              >
                กลับสู่สนามสอบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
