import React, { useEffect } from 'react';
import { X, ZoomIn, ExternalLink, BookOpen, AlertCircle, Zap } from 'lucide-react';
import { SlideReference } from '../data/calculusData';

interface SlideLightboxProps {
  slide: SlideReference | null;
  questionNumber: number;
  onClose: () => void;
}

export const SlideLightbox: React.FC<SlideLightboxProps> = ({
  slide,
  questionNumber,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!slide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fade-in">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 font-mono text-xs font-bold text-zinc-100 border border-zinc-700">
              Q{questionNumber}
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-100 line-clamp-1">{slide.slideTitle}</h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                สไลด์เลกเชอร์ Week {slide.lectureNumber} • หน้า {slide.pageNumber} (KMITL OnLearn Moodle)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block">ESC</kbd>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body: High-Res Image + Academic Notes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Slide Preview Container */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center min-h-[320px]">
            <img
              src={slide.imagePath}
              alt={slide.slideTitle}
              className="max-h-[58vh] w-auto object-contain rounded-lg shadow-lg"
              onError={(e) => {
                // If png fails, fallback to svg
                const target = e.currentTarget;
                if (!target.src.endsWith('.svg')) {
                  target.src = slide.imagePath.replace('.png', '.svg');
                }
              }}
            />
          </div>

          {/* Professor's Examination Focus Note */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
              <AlertCircle className="h-4 w-4 text-zinc-400" />
              <span>ประเด็นเน้นย้ำและข้อสังเกตจากอาจารย์ผู้สอน (Professor's Note)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6">
              {slide.professorNote}
            </p>
          </div>

          {/* Speed Hack Summary */}
          <div className="rounded-xl border border-zinc-800 bg-black p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
              <Zap className="h-4 w-4 text-zinc-300" />
              <span>แนวทางลัด & หัวใจสำคัญประจำหัวข้อ (Core Speed Hack)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">
              {slide.shortcutTip}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-3 bg-zinc-900/50 text-xs text-zinc-500">
          <span>ระบบเชื่อมโยงสไลด์อ้างอิงอัตโนมัติ (Automated Slide Reference Pipeline)</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-3.5 py-1.5 font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
