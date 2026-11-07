#!/usr/bin/env python3
"""
Slide Reference Extraction Pipeline
Extracts high-resolution reference slide screenshots from KMITL Calculus 1 PDF lecture notes
and saves them to public/slides_img/ for each of the 12 exam questions.
Includes automatic fallback generation of clean Monochrome SVG/PNG reference cards.
"""

import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_SLIDES_DIR = BASE_DIR / "raw_slides"
OUTPUT_DIR = BASE_DIR / "public" / "slides_img"

# Question-to-Slide mapping table
QUESTION_SLIDE_MAPPING = [
    {
        "id": 1,
        "filename": "q1_substitution.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 10,  # 1-indexed
        "slide_title": "7.1 Integration by Substitution: Definite Integrals & Boundary Shifts",
        "lecture": 11,
        "topic_th": "การอินทิเกรตโดยการเปลี่ยนตัวแปร u และการเปลี่ยนขอบเขต",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 10: อาจารย์เน้นว่าเมื่อเปลี่ยนเป็นตัวแปร u ต้องเปลี่ยนขอบเขตบน-ล่างทันที ห้ามนำขอบเขตเดิมของ x มาแทนในรูป u",
        "shortcut_tip": "ทริคลัด: มองหาอนุพันธ์ของฟังก์ชันย่อย เช่น ถ้าเห็น x^3 ให้แยกเป็น x^2 * x dx แล้วแทน u = x^2+1 จะได้ x dx = du/2 ในพริบตา"
    },
    {
        "id": 2,
        "filename": "q2_long_division.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 55,
        "slide_title": "7.4 Algebraic Identities: Long Division of Rational Functions",
        "lecture": 11,
        "topic_th": "การหารยาวพหุนามและฟังก์ชันตรรกยะเกิน",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 55: ถ้ากำลังเศษมากกว่าหรือเท่ากับส่วน ต้องตั้งหารยาวก่อนเสมอ มิฉะนั้นจะแยกเศษส่วนย่อยผิดทันที",
        "shortcut_tip": "ทริคลัด: ใช้วิธีบวกเข้า-หักออก หรือจับกลุ่มเศษส่วนเพื่อหลีกเลี่ยงการตั้งหารยาวหลายบรรทัด แล้วแยกเป็นรูป ln และ arctan"
    },
    {
        "id": 3,
        "filename": "q3_parts.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 15,
        "slide_title": "7.2 Integration by Parts: LIATE Rule & Looping Integrals",
        "lecture": 11,
        "topic_th": "การอินทิเกรตทีละส่วน (ตาราง DI Method & Looping)",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 15: กรณีวนลูป (Looping e^(ax) cos(bx)) ต้องเลือก u ให้คงรูปแบบเดิมในการทำรอบที่สอง แล้วย้ายข้างกลับมาบวกกับ I ตัวเดิม",
        "shortcut_tip": "ทริคลัด: ใช้วิธีตาราง Tabular DI Method ใส่เครื่องหมาย + - + - สลับกัน ช่วยลดข้อผิดพลาดเรื่องเครื่องหมายลบซ้อนลบได้ 100%"
    },
    {
        "id": 4,
        "filename": "q4_trig_sub.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 57,
        "slide_title": "7.4 Trigonometric Substitutions: Right Triangle Reference",
        "lecture": 11,
        "topic_th": "การแทนค่าด้วยตรีโกณมิติและสามเหลี่ยมอ้างอิง",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 57: ห้ามลืมวาดรูปสามเหลี่ยมมุมฉากอ้างอิงเพื่อแปลงฟังก์ชันตรีโกณมิติกลับเป็นตัวแปร x ตอนจบ",
        "shortcut_tip": "ทริคลัด: ท่องจำรูปแบบ sqrt(a^2 - x^2) -> x = a sin(theta), sqrt(a^2 + x^2) -> x = a tan(theta), sqrt(x^2 - a^2) -> x = a sec(theta)"
    },
    {
        "id": 5,
        "filename": "q5_partial_fractions.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 52,
        "slide_title": "7.4 Partial Fractions: Irreducible Quadratic Factors",
        "lecture": 11,
        "topic_th": "การแยกเศษส่วนย่อยที่มีตัวประกอบกำลังสองแยกไม่ได้",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 52: สำหรับตัวส่วน (x^2 + a^2) ตัวเศษต้องสมมุติเป็น Bx + C จากนั้นแยกเทอม Bx เป็น ln และ C เป็น arctan",
        "shortcut_tip": "ทริคลัด: ใช้ Heaviside Cover-up Method หาเศษส่วนเชิงเส้นตรง A ได้ทันทีโดยเอามือปิดวงเล็บนั้นแล้วแทนค่าราก"
    },
    {
        "id": 6,
        "filename": "q6_reduction.png",
        "pdf_file": "Week 11 (3).pdf",
        "page_num": 21,
        "slide_title": "7.3 Tables of Integrals & Standard Reduction Formulas",
        "lecture": 11,
        "topic_th": "ตารางสูตรอินทิเกรตสำเร็จและสูตรลดทอนกำลัง",
        "professor_note": "ตรงกับสไลด์ Week 11 หน้า 21: ข้อสอบจะมีสูตรลดทอนมาให้ในโจทย์ ต้องแทนค่า n ให้ถูกต้องและระวังการอินทิเกรต sec(x) = ln|sec(x) + tan(x)|",
        "shortcut_tip": "ทริคลัด: สำหรับ sec^3(x) แทน n = 3 ลงในสูตรลดทอนรอบเดียว จะหลงเหลือเพียงอินทิเกรต sec(x) ซึ่งเปิดดูจากตารางสูตรในห้องสอบได้ทันที"
    },
    {
        "id": 7,
        "filename": "q7_geometric_series.png",
        "pdf_file": "Week 14.pdf",
        "page_num": 10,
        "slide_title": "9.2 Geometric Series: Convergence Criterion |r| < 1 & Sum Formula",
        "lecture": 14,
        "topic_th": "อนุกรมเรขาคณิตอนันต์และการหาผลบวก",
        "professor_note": "ตรงกับสไลด์ Week 14 หน้า 10: อนุกรมเรขาคณิตเป็นอนุกรมเดียวที่ข้อสอบสั่งให้หา 'ค่าผลบวก (Sum)' ต้องเช็กเงื่อนไข |r| < 1 เสมอก่อนใช้สูตร S = a/(1-r)",
        "shortcut_tip": "ทริคลัด: พจน์แรก 'a' คือค่าที่ได้เมื่อแทนค่า n ตัวเริ่มต้นลงไปจริง ๆ (ไม่จำเป็นต้องเป็น n=0 เสมอไป) จะช่วยป้องกันการจำสูตรสับสน"
    },
    {
        "id": 8,
        "filename": "q8_ratio_test.png",
        "pdf_file": "Week 14.pdf",
        "page_num": 24,
        "slide_title": "9.4 Tests for Convergence: The Ratio Test (d'Alembert)",
        "lecture": 14,
        "topic_th": "การทดสอบอัตราส่วนสำหรับการลู่เข้าของอนุกรมอนันต์",
        "professor_note": "ตรงกับสไลด์ Week 14 หน้า 24: เมื่อเจอฟังก์ชันแฟกทอเรียล (n!) หรือเลขชี้กำลัง (c^n) ให้พุ่งเป้าไปที่ Ratio Test ทันที",
        "shortcut_tip": "ทริคลัด: ใช้ Dominant Term Analysis แยกตัดกลุ่มพจน์ (n+1)^k / n^k -> 1 ทิ้งได้เลย แล้วโฟกัสเฉพาะตัวคูณส่วนเกินของแฟกทอเรียล"
    },
    {
        "id": 9,
        "filename": "q9_power_series.png",
        "pdf_file": "Week 14.pdf",
        "page_num": 34,
        "slide_title": "9.5 Power Series & Interval of Convergence (Endpoint Testing)",
        "lecture": 14,
        "topic_th": "อนุกรมกำลัง รัศมี และช่วงแห่งการลู่เข้า (ตรวจจุดขอบเขต)",
        "professor_note": "ตรงกับสไลด์ Week 14 หน้า 34-35: จุดตัดเกรดคือการเช็กจุดขอบเขต Endpoint ทั้งสองฝั่ง ห้ามเดาวงเล็บเปิดปิดเด็ดขาด ต้องแทนค่าทดสอบด้วย p-series หรือ Alternating Series",
        "shortcut_tip": "ทริคลัด: เมื่อแทนจุดขอบแล้วกลายเป็น 1/n คืออนุกรมฮาร์มอนิก (ลู่ออก วงเล็บโค้ง '(') ถ้าเป็น (-1)^n/n คืออนุกรมสลับ (ลู่เข้า วงเล็บเหลี่ยม ']') ท่องไว้ใช้ได้ทันที"
    },
    {
        "id": 10,
        "filename": "q10_maclaurin.png",
        "pdf_file": "Week 15.pdf",
        "page_num": 7,
        "slide_title": "10.1 Taylor Polynomials & Maclaurin Series for Limits",
        "lecture": 15,
        "topic_th": "อนุกรมแมคลอรินและการหาลิมิตในรูปแบบยังไม่กำหนด",
        "professor_note": "ตรงกับสไลด์ Week 15 หน้า 7: การหาลิมิตที่กำลังสูง (เช่น ส่วน x^4) การใช้อนุกรมแมคลอรินตัดพจน์จะเร็วกว่า L'Hôpital 4 รอบอย่างมหาศาล",
        "shortcut_tip": "ทริคลัด: แทนค่าฟังก์ชันประกอบลงในอนุกรมมาตรฐานของ cos(x) และ e^u โดยตรง พจน์ต่ำกว่า x^4 จะหักล้างกันหมดจนเหลือสัมประสิทธิ์ตอบได้ทันที"
    },
    {
        "id": 11,
        "filename": "q11_taylor_series.png",
        "pdf_file": "Week 15.pdf",
        "page_num": 9,
        "slide_title": "10.2 Taylor Series about x = a & General Sigma Notation",
        "lecture": 15,
        "topic_th": "อนุกรมเทย์เลอร์รอบจุด a ≠ 0 ในรูปสัญลักษณ์ซิกมา (5 คะแนน)",
        "professor_note": "ตรงกับสไลด์ Week 15 หน้า 9: ข้อสอบ 5 คะแนนเต็มจะเน้นการหาสูตรอนุพันธ์อันดับ n f^(n)(a) และเขียนรูปย่อซิกมา พร้อมระบุรัศมี R",
        "shortcut_tip": "ทริคลัด: หารัศมีการลู่เข้า R ได้อย่างรวดเร็วจากระยะทางบนแกนจริง จากจุดศูนย์กลาง a ไปยังจุดที่ฟังก์ชันหาค่าไม่ได้ (Singularity) เช่น 1/x^2 มีปัญหาที่ x=0 เมื่อศูนย์กลาง a=1 ดังนั้น R = |1 - 0| = 1"
    },
    {
        "id": 12,
        "filename": "q12_taylor_approx.png",
        "pdf_file": "Week 15.pdf",
        "page_num": 27,
        "slide_title": "10.3 Finding & Using Taylor Series: Non-Elementary Integrals",
        "lecture": 15,
        "topic_th": "การประมาณค่าอินทิกรัลที่ไม่มีปฏิยานุพันธ์และขอบเขตความคลาดเคลื่อน (5 คะแนน)",
        "professor_note": "ตรงกับสไลด์ Week 15 หน้า 27: การประมาณค่าอินทิกรัล sin(x^2)/x ให้อินทิเกรตทีละพจน์ และใช้ทฤษฎีบทอนุกรมสลับ (AST Error Bound) หาขอบเขตความคลาดเคลื่อน",
        "shortcut_tip": "ทริคลัด: ค่าความคลาดเคลื่อนสูงสุดของอนุกรมสลับจะเท่ากับขนาดของพจน์แรกที่ถูกตัดทิ้ง (|Error| <= |b_{n+1}|) เสมอ นำพจน์ถัดไปมาคิดเลขได้ทันที"
    }
]


def generate_fallback_svg(item, output_path):
    """Generates an ultra-crisp monochrome SVG reference slide card."""
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#18181b" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.8" opacity="0.4"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bg)" />
  <rect width="1200" height="675" fill="url(#grid)" />

  <!-- Outer Border -->
  <rect x="24" y="24" width="1152" height="627" rx="16" fill="none" stroke="#3f3f46" stroke-width="2" />

  <!-- Header Bar -->
  <rect x="40" y="40" width="1120" height="70" rx="10" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="82" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="20" font-weight="700" fill="#fafafa" letter-spacing="1">KMITL CALCULUS 1 • OFFICIAL LECTURE SLIDE REFERENCE</text>
  <text x="1080" y="82" font-family="monospace" font-size="16" font-weight="600" fill="#a1a1aa">LEC {item['lecture']:02d} / P.{item['page_num']}</text>

  <!-- Title Section -->
  <text x="64" y="165" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="28" font-weight="800" fill="#ffffff">{item['slide_title']}</text>
  <text x="64" y="205" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="19" font-weight="500" fill="#a1a1aa">{item['topic_th']}</text>

  <!-- Professor Exam Focus Box -->
  <rect x="64" y="240" width="1072" height="175" rx="12" fill="#18181b" stroke="#52525b" stroke-width="1.5" />
  <rect x="64" y="240" width="1072" height="40" rx="12" fill="#27272a" />
  <text x="88" y="266" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="15" font-weight="700" fill="#ffffff" letter-spacing="0.5">📌 PROFESSOR'S EXAM NOTE & CRITICAL EMPHASIS (บันทึกอาจารย์ประจำวิชา)</text>
  <foreignObject x="88" y="295" width="1024" height="110">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; font-size: 17px; line-height: 1.6; color: #e4e4e7;">
      {item['professor_note']}
    </div>
  </foreignObject>

  <!-- Speed Hack Box -->
  <rect x="64" y="435" width="1072" height="165" rx="12" fill="#09090b" stroke="#71717a" stroke-width="1.5" />
  <rect x="64" y="435" width="1072" height="40" rx="12" fill="#27272a" />
  <text x="88" y="461" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="15" font-weight="700" fill="#fafafa" letter-spacing="0.5">⚡ SPEED HACK & EXAM SHORTCUT (แนวทางลัดทำโจทย์เร็ว)</text>
  <foreignObject x="88" y="490" width="1024" height="100">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; font-size: 16px; line-height: 1.6; color: #d4d4d8;">
      {item['shortcut_tip']}
    </div>
  </foreignObject>

  <!-- Footer Tag -->
  <text x="64" y="628" font-family="monospace" font-size="13" fill="#71717a">Faculty of Science / Information Technology • Exam Question {item['id']} Reference Guide</text>
</svg>"""
    svg_path = output_path.with_suffix(".svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    return svg_path


def extract_or_generate_slides():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Extracting slide references into {OUTPUT_DIR}...")

    try:
        import pymupdf
        pymupdf_available = True
    except ImportError:
        try:
            import fitz as pymupdf
            pymupdf_available = True
        except ImportError:
            pymupdf_available = False

    rendered_count = 0
    fallback_count = 0

    for item in QUESTION_SLIDE_MAPPING:
        pdf_path = RAW_SLIDES_DIR / item["pdf_file"]
        target_png = OUTPUT_DIR / item["filename"]
        success = False

        if pymupdf_available and pdf_path.exists():
            try:
                doc = pymupdf.open(pdf_path)
                target_page = item["page_num"] - 1
                if 0 <= target_page < len(doc):
                    page = doc[target_page]
                    # Render at 2.0 scale for crisp, retina typography
                    mat = pymupdf.Matrix(2.0, 2.0)
                    pix = page.get_pixmap(matrix=mat, alpha=False)
                    pix.save(str(target_png))
                    print(f" -> Q{item['id']:02d}: Extracted {item['pdf_file']} (P.{item['page_num']}) -> {target_png.name}")
                    success = True
                    rendered_count += 1
            except Exception as e:
                print(f" -> Q{item['id']:02d}: Error extracting PDF page: {e}")

        if not success:
            # Generate the pristine SVG fallback
            svg_file = generate_fallback_svg(item, target_png)
            print(f" -> Q{item['id']:02d}: Generated Monochrome Reference Card -> {svg_file.name}")
            fallback_count += 1

    print(f"Completed: {rendered_count} extracted from actual PDFs, {fallback_count} generated as clean reference cards.")


if __name__ == "__main__":
    extract_or_generate_slides()
