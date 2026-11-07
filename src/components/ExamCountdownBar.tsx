import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, Play, Pause, RotateCcw, ShieldAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';

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
      alert('หมดเวลา 120 นาทีสำหรับการทำข้อสอบปลายภาค! กรุณาตรวจสอบคำตอบและการให้คะแนน');
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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Exam Overview Stats */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2 border border-zinc-800">
            <span className="flex h-2 w-2 rounded-full bg-zinc-100" />
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">โครงสร้างข้อสอบ</span>
            <span className="text-sm font-bold text-zinc-100">12 ข้อ</span>
            <span className="text-xs text-zinc-600">•</span>
            <span className="text-sm font-bold text-zinc-100">รวม 50 คะแนน</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 font-mono text-zinc-200">
              ข้อ 1–10: ข้อละ 4 คะแนน
            </span>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 font-mono text-zinc-200">
              ข้อ 11–12: ข้อละ 5 คะแนน
            </span>
          </div>

          {/* Calculator Ban Rule Button */}
          <button
            onClick={() => setShowWarningModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <ShieldAlert className="h-4 w-4 text-zinc-400" />
            <span>ห้ามใช้เครื่องคิดเลขเด็ดขาด</span>
            <span className="text-[10px] text-zinc-400 underline ml-0.5">ระเบียบ</span>
          </button>
        </div>

        {/* Right: Timer & Completion */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-zinc-400 font-medium">ความคืบหน้า</div>
              <div className="text-xs font-bold text-zinc-200 font-mono">
                {completedCount} <span className="text-zinc-500 font-normal">/ {totalQuestions} ข้อ ({progressPercent}%)</span>
              </div>
            </div>
            <div className="h-6 w-24 rounded-full bg-zinc-900 p-0.5 border border-zinc-800 flex items-center">
              <div
                className="h-full rounded-full bg-zinc-200 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

          {/* 120-min Countdown Clock */}
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 shadow-inner">
            <Timer className={`h-4 w-4 ${isLowTime ? 'text-zinc-100 animate-pulse' : 'text-zinc-400'}`} />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold leading-none">
                เวลาสอบ (120 นาที)
              </span>
              <span className="font-mono text-lg font-bold text-zinc-100">
                {formattedTime}
              </span>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-1 ml-1.5">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="rounded-lg p-1.5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
                title={isRunning ? 'หยุดชั่วคราว' : 'เริ่มจับเวลาสอบ'}
              >
                {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              </button>
              <button
                onClick={resetTimer}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                title="รีเซ็ตเวลาเป็น 120:00"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rules & Calculator Policy Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="max-w-lg w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5 text-zinc-100">
                <AlertTriangle className="h-5 w-5 text-zinc-400" />
                <h3 className="text-base font-bold">ระเบียบและข้อกำหนดการสอบปลายภาค (Calculus 1)</h3>
              </div>
              <button
                onClick={() => setShowWarningModal(false)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <strong className="text-zinc-100 block mb-1">1. นโยบายห้ามใช้เครื่องคิดเลขเด็ดขาด:</strong>
                ห้ามนำเครื่องคิดเลข อุปกรณ์อิเล็กทรอนิกส์ หรือนาฬิกาอัจฉริยะเข้าห้องสอบ คำนวณด้วยมือเท่านั้น
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <strong className="text-zinc-100 block mb-1">2. รูปแบบคำตอบที่แม่นยำ (Exact Closed Forms Only):</strong>
                ห้ามตอบเป็นทศนิยมประมาณค่า (เช่น ห้ามเขียน 3.14 หรือ 0.693) คำตอบต้องอยู่ในรูป:
                <ul className="list-disc pl-5 mt-1.5 space-y-1 text-zinc-400 text-xs">
                  <li>เศษส่วนอย่างต่ำ เช่น 4/3, 23/6, 287/2304</li>
                  <li>ค่าคงที่อตรรกยะ เช่น &pi;, e, &radic;2, &radic;3</li>
                  <li>ลอการิทึมธรรมชาติ เช่น ln(2), (1/2)ln(1 + &radic;2)</li>
                  <li>ฟังก์ชันตรีโกณมิติผกผัน เช่น &pi;/4, arctan(2)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <strong className="text-zinc-100 block mb-1">3. ตารางสูตรอินทิเกรตที่จัดเตรียมให้:</strong>
                ในใบข้อสอบจะมีตารางสูตรอินทิเกรตพื้นฐานและสูตรลดทอนกำลังให้ (ดูได้ที่แท็บ "คลังสูตร") ส่วนการทดสอบการลู่เข้าและอนุกรมแมคลอรินนักศึกษาต้องจำเข้าห้องสอบ
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-zinc-400 text-xs">
                <strong className="text-zinc-200">4. ขอบเขตเนื้อหา:</strong> ตัดเนื้อหาการประยุกต์ใช้อินทิเกรตทางสถิติ (Probability Density Function / ค่าคาดหวัง) ออก 100% ไม่ออกสอบ
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowWarningModal(false)}
                className="w-full rounded-xl bg-zinc-100 py-2.5 text-xs sm:text-sm font-bold text-zinc-950 hover:bg-white transition-colors"
              >
                รับทราบข้อกำหนด เข้าสู่สนามสอบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
