import React, { useState, useMemo } from 'react';
import { FileText, Download, Search, BookOpen, ExternalLink, X, FileCode, CheckCircle, FolderArchive } from 'lucide-react';
import { courseManifest, SlideResource } from '../data/slidesIndex';
import { FormattedMathText } from './MathView';

export const SlidesViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalFile, setActiveModalFile] = useState<SlideResource | null>(null);

  const categories = [
    'All',
    'Study Guides & Syllabus',
    'Lecture Notes & Slides',
    'Homework & Solutions',
    'Reference Textbooks',
  ];

  const filteredFiles = useMemo(() => {
    return courseManifest.files.filter((file) => {
      const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        file.filename.toLowerCase().includes(q) ||
        file.title.toLowerCase().includes(q) ||
        file.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header and Ingestion Status */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FolderArchive className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Course Materials & Slide Repository</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Source: {courseManifest.source} • {courseManifest.institution}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-950/80 px-3 py-1.5 border border-slate-800 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-medium">Ingested Files:</span>
            <span className="font-mono font-bold text-emerald-400">{courseManifest.totalFiles} Documents</span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by week, topic, or filename (e.g. Week 11, เฉลย, Substitution)..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
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

          return (
            <div
              key={file.filename}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/90"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isMarkdown ? (
                      <FileCode className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                    ) : (
                      <FileText className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    )}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isMarkdown
                          ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/30'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {file.category}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">{file.size}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
                  {file.filename}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 uppercase font-mono">
                  {file.extension.toUpperCase()}
                </span>

                {isMarkdown ? (
                  <button
                    onClick={() => setActiveModalFile(file)}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Open Guide</span>
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Download className="h-3.5 w-3.5 text-slate-500" />
                    <span>Local /raw_slides</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-sm">
          No files found matching "{searchQuery}".
        </div>
      )}

      {/* Markdown Document Reader Modal */}
      {activeModalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="max-w-3xl w-full max-h-[85vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <FileCode className="h-5 w-5 text-indigo-400" />
                <div>
                  <h3 className="text-base font-bold text-white">{activeModalFile.filename}</h3>
                  <span className="text-xs text-slate-400">{activeModalFile.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalFile(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-200 text-sm leading-relaxed">
              {activeModalFile.content ? (
                <div className="prose prose-invert max-w-none space-y-3">
                  <FormattedMathText text={activeModalFile.content} />
                </div>
              ) : (
                <div className="text-slate-400 text-center py-10">
                  Binary document located at <code className="text-cyan-400">./raw_slides/{activeModalFile.filename}</code>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-800 px-6 py-3 bg-slate-950/60 rounded-b-2xl">
              <span className="text-xs text-slate-500">KMITL Calculus 1 Course Curriculum</span>
              <button
                onClick={() => setActiveModalFile(null)}
                className="rounded-xl bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
