import React, { useState, useMemo } from 'react';
import { FileText, Download, Search, BookOpen, X, FileCode, FolderArchive, Layers } from 'lucide-react';
import { courseManifest, SlideResource } from '../data/slidesIndex';
import { FormattedMathText } from './MathView';

export const SlidesViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [activeModalFile, setActiveModalFile] = useState<SlideResource | null>(null);

  const categories = [
    'ทั้งหมด',
    'คู่มือสรุปบทเรียน & ประมวลรายวิชา',
    'สไลด์การสอนประจำสัปดาห์',
    'เฉลยการบ้าน & แบบฝึกหัด',
    'ตำราเรียนอ้างอิง',
  ];

  const categoryMap: Record<string, string> = {
    'Study Guides & Syllabus': 'คู่มือสรุปบทเรียน & ประมวลรายวิชา',
    'Lecture Notes & Slides': 'สไลด์การสอนประจำสัปดาห์',
    'Homework & Solutions': 'เฉลยการบ้าน & แบบฝึกหัด',
    'Reference Textbooks': 'ตำราเรียนอ้างอิง',
    'Other': 'อื่น ๆ',
  };

  const filteredFiles = useMemo(() => {
    return courseManifest.files.filter((file) => {
      const thCategory = categoryMap[file.category] || file.category;
      const matchesCategory = selectedCategory === 'ทั้งหมด' || thCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        file.filename.toLowerCase().includes(q) ||
        file.title.toLowerCase().includes(q) ||
        thCategory.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header and Ingestion Details */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FolderArchive className="h-5 w-5 text-zinc-300" />
              <h2 className="text-base sm:text-lg font-bold text-zinc-100">
                คลังเอกสารและสไลด์การสอน (Course Slides & Repository)
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              แหล่งที่มา: {courseManifest.source} • สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-1.5 border border-zinc-800 text-xs">
            <span className="h-2 w-2 rounded-full bg-zinc-100" />
            <span className="text-zinc-400 font-medium">เอกสารในระบบ:</span>
            <span className="font-mono font-bold text-zinc-100">{courseManifest.totalFiles} ไฟล์</span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเอกสารตามสัปดาห์ หัวข้อ หรือชื่อไฟล์ (เช่น Week 11, เฉลย, Substitution, Homework)..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2 pl-10 pr-4 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? 'bg-zinc-100 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => {
          const isMarkdown = file.extension === '.md';
          const thCategory = categoryMap[file.category] || file.category;

          return (
            <div
              key={file.filename}
              className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isMarkdown ? (
                      <FileCode className="h-4 w-4 text-zinc-300 flex-shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    )}
                    <span className="rounded bg-zinc-950 px-1.5 py-0.5 text-[10px] font-bold text-zinc-300 border border-zinc-800">
                      {thCategory}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">{file.size}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-zinc-200 line-clamp-2 leading-snug">
                  {file.filename}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 uppercase font-mono">
                  {file.extension.toUpperCase()}
                </span>

                {isMarkdown ? (
                  <button
                    onClick={() => setActiveModalFile(file)}
                    className="flex items-center gap-1 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>เปิดอ่านสรุป</span>
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                    <Download className="h-3.5 w-3.5 text-zinc-500" />
                    <span>โฟลเดอร์ raw_slides</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500 text-xs sm:text-sm">
          ไม่พบเอกสารที่ตรงกับคำค้นหา "{searchQuery}"
        </div>
      )}

      {/* Markdown Document Reader Modal */}
      {activeModalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="max-w-3xl w-full max-h-[85vh] flex flex-col rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <FileCode className="h-5 w-5 text-zinc-300" />
                <div>
                  <h3 className="text-base font-bold text-zinc-100">{activeModalFile.filename}</h3>
                  <span className="text-xs text-zinc-400">{categoryMap[activeModalFile.category] || activeModalFile.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalFile(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-zinc-200 text-sm leading-relaxed">
              {activeModalFile.content ? (
                <div className="prose prose-invert max-w-none space-y-3">
                  <FormattedMathText text={activeModalFile.content} />
                </div>
              ) : (
                <div className="text-zinc-400 text-center py-10 font-mono text-xs">
                  ไฟล์เอกสารต้นฉบับอยู่ที่: ./raw_slides/{activeModalFile.filename}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-3 bg-zinc-900/60 rounded-b-2xl">
              <span className="text-xs text-zinc-500">เอกสารประกอบการสอนวิชาแคลคูลัส 1 สจล.</span>
              <button
                onClick={() => setActiveModalFile(null)}
                className="rounded-xl bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-700 transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
