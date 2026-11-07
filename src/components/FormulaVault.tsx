import React, { useState, useMemo } from 'react';
import { Search, BookOpen, AlertOctagon, Layers, Check, Copy, ShieldAlert } from 'lucide-react';
import { formulaSheet, FormulaItem } from '../data/calculusData';
import { MathView } from './MathView';

export const FormulaVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'สูตรทั้งหมด (19 รายการ)' },
    { id: 'standard_integrals', label: 'ตารางสูตรอินทิเกรตมาตรฐาน (มีให้ในห้องสอบ)' },
    { id: 'reduction', label: 'สูตรลดทอนกำลัง (Reduction Formulas)' },
    { id: 'trig_sub', label: 'การแทนค่าตรีโกณ & สามเหลี่ยมอ้างอิง' },
    { id: 'series_tests', label: 'การทดสอบการลู่เข้าของอนุกรม' },
    { id: 'maclaurin_taylor', label: 'อนุกรมแมคลอริน & เทย์เลอร์' },
    { id: 'pitfalls', label: '⚠️ จุดดัก & ข้อผิดพลาดยอดฮิต' },
  ];

  const filteredFormulas = useMemo(() => {
    return formulaSheet.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.latex.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Controls */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาสูตร ทฤษฎีบท หรือนิพจน์ (เช่น secant, แทนค่า, อัตราส่วน, arctan, จุดดัก)..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            แสดง <strong className="text-zinc-100">{filteredFormulas.length}</strong> รายการสูตร
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Official Allowed Exam Notice Banner */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-xs text-zinc-300 flex items-start gap-3">
        <BookOpen className="h-4 w-4 text-zinc-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-zinc-100">
            ระเบียบเอกสารประกอบการสอบวิชาแคลคูลัส 1 (KMITL 06016301)
          </p>
          <p className="text-zinc-400 leading-relaxed">
            ตารางสูตรอินทิเกรตมาตรฐาน (ข้อ 1 ถึง 10) และสูตรลดทอนกำลัง จะมีพิมพ์มาให้ในใบข้อสอบปลายภาค ส่วนการทดสอบการลู่เข้าของอนุกรม (โดยเฉพาะอนุกรมเรขาคณิตและ Ratio Test) และอนุกรมแมคลอรินมาตรฐาน นักศึกษาต้องจำเข้าห้องสอบด้วยตนเอง
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
                  ? 'border-zinc-700 bg-zinc-900/80'
                  : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isPitfall ? (
                      <AlertOctagon className="h-4 w-4 text-zinc-300 flex-shrink-0" />
                    ) : (
                      <Layers className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-100">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        {item.nameEn}
                      </span>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(item.latex, item.id)}
                    className="rounded p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                    title="คัดลอก LaTeX"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-zinc-100" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Mathematical Formula Render Box */}
                <div className="my-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-center border border-zinc-800">
                  <MathView math={item.latex} block />
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Notes or Conditions */}
                {item.notes && (
                  <p className="mt-2 text-[11px] text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                    💡 <strong>หมายเหตุสำคัญ:</strong> {item.notes}
                  </p>
                )}
                {item.conditions && (
                  <p className="mt-2 text-[11px] text-zinc-500 font-mono">
                    เงื่อนไข: {item.conditions}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500 text-xs sm:text-sm">
          ไม่พบสูตรที่ตรงกับคำค้นหา "{searchQuery}" ลองค้นหาด้วยคำว่า "แทนค่า", "อัตราส่วน" หรือ "secant"
        </div>
      )}
    </div>
  );
};
