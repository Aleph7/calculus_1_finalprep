import React from 'react';
import { ShieldCheck, BookCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-zinc-900 bg-zinc-950/80 py-8 text-xs text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-serif font-bold">
            ∫
          </div>
          <div>
            <p className="font-semibold text-zinc-300">
              ระบบเตรียมความพร้อมสอบปลายภาค วิชาแคลคูลัส 1 (รหัสวิชา 06016301)
            </p>
            <p className="text-[11px] text-zinc-500">
              สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL) • มาตรฐานการประเมิน 50 คะแนนเต็ม
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            <span>คำตอบค่าแม่นยำ ไม่พึ่งเครื่องคิดเลข</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <BookCheck className="h-3.5 w-3.5 text-zinc-400" />
            <span>โครงสร้าง 12 ข้อ 50 คะแนน</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
