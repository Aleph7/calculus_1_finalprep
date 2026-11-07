#!/usr/bin/env python3
"""
Slide Ingestion Script for Calculus 1 Final Exam Preparation Platform.
Fetches lecture slides and course documents from KMITL Moodle LMS.
Gracefully falls back to creating synthetic curriculum documents if the network
or session cookie is unreachable/expired.
"""

import os
import sys
import re
import json
import urllib.parse
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    requests = None
    BeautifulSoup = None

COURSE_URL = "https://onlearn.it.kmitl.ac.th/course/view.php?id=1813"
SESSION_COOKIE = "8vff9q9u066lbiu3n5mhov2b94"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "raw_slides"

# Curriculum modules for syllabus reference and exam preparation
CURRICULUM_MODULES = [
    {
        "filename": "01_integration_by_substitution.md",
        "title": "Module 1: Advanced Integration by Substitution & Boundary Shifts",
        "topic": "Integration by Substitution",
        "topicTh": "การอินทิเกรตโดยการแทนค่า u",
        "week": "Week 9-10",
        "content": """# Module 1: Integration by Substitution (U-Substitution)
## Calculus 1 - Final Examination Preparation

### 1. Fundamental Principle
If $u = g(x)$ is a differentiable function whose range is an interval $I$, and $f$ is continuous on $I$:
$$\\int f(g(x)) g'(x) \\, dx = \\int f(u) \\, du$$

### 2. Definite Integrals and Boundary Shifts
When evaluating definite integrals:
$$\\int_{a}^{b} f(g(x)) g'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du$$
*Critical Exam Rule*: Never forget to transform the integration bounds $x = a \\to u = g(a)$ and $x = b \\to u = g(b)$.

### 3. Canonical Exam Patterns
1. Integrals involving $\\frac{f'(x)}{f(x)} \\to \\ln|f(x)| + C$
2. Exponential substitutions: $\\int e^{x} f(e^x) \\, dx$
3. Radical adjustments: letting $u = \\sqrt{ax+b} \\implies u^2 = ax+b \\implies 2u\\,du = a\\,dx$.
"""
    },
    {
        "filename": "02_polynomial_long_division_and_rational_functions.md",
        "title": "Module 2: Rational Integrands & Polynomial Long Division",
        "topic": "Long Division of Polynomials",
        "topicTh": "การหารยาวพหุนามและฟังก์ชันตรรกยะ",
        "week": "Week 10",
        "content": """# Module 2: Polynomial Long Division & Rational Integrands
## Calculus 1 - Final Examination Preparation

### 1. Degree Analysis
For a rational function $\\frac{P(x)}{Q(x)}$:
- If $\\deg(P) \\ge \\deg(Q)$, the fraction is improper.
- You MUST perform polynomial long division prior to any integration or partial fraction decomposition:
$$\\frac{P(x)}{Q(x)} = S(x) + \\frac{R(x)}{Q(x)}, \\quad \\text{where } \\deg(R) < \\deg(Q)$$

### 2. Standard Integration Forms
$$\\int \\frac{1}{x^2 + a^2} \\, dx = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C$$
$$\\int \\frac{x}{x^2 + a^2} \\, dx = \\frac{1}{2} \\ln(x^2 + a^2) + C$$
"""
    },
    {
        "filename": "03_integration_by_parts.md",
        "title": "Module 3: Integration by Parts (Tabular & Looping Integrals)",
        "topic": "Integration by Parts",
        "topicTh": "การอินทิเกรตทีละส่วน",
        "week": "Week 10-11",
        "content": """# Module 3: Integration by Parts
## Calculus 1 - Final Examination Preparation

### 1. Standard Formula
$$\\int u \\, dv = u v - \\int v \\, du$$

### 2. Choice of $u$ (LIATE Rule)
- **L**: Logarithmic functions ($\\ln x$)
- **I**: Inverse trigonometric functions ($\\arctan x, \\arcsin x$)
- **A**: Algebraic / Polynomial functions ($x^n$)
- **T**: Trigonometric functions ($\\sin x, \\cos x$)
- **E**: Exponential functions ($e^x$)

### 3. Looping Integrals (Solving for the Unknown Integral)
Integrals such as $\\int e^{ax} \\cos(bx) \\, dx$ require applying parts twice, identifying the original integral $I$, and solving algebraically for $I$.

### 4. Tabular Integration (DI Method)
For $\\int P(x) g(x) \\, dx$ where $P(x)$ is a polynomial:
Alternate signs $+ - + -$, differentiate $P(x)$ down to 0, and repeatedly integrate $g(x)$.
"""
    },
    {
        "filename": "04_trigonometric_substitution.md",
        "title": "Module 4: Trigonometric Substitution & Reference Triangles",
        "topic": "Trigonometric Substitution",
        "topicTh": "การแทนค่าด้วยฟังก์ชันตรีโกณมิติ",
        "week": "Week 11",
        "content": """# Module 4: Trigonometric Substitution
## Calculus 1 - Final Examination Preparation

### 1. Three Canonical Radicals
| Radical Form | Substitution | Differential | Identity Simplification | Reference Triangle |
|---|---|---|---|---|
| $\\sqrt{a^2 - x^2}$ | $x = a\\sin\\theta$ | $dx = a\\cos\\theta\\,d\\theta$ | $a^2 - a^2\\sin^2\\theta = a^2\\cos^2\\theta$ | $\\sin\\theta = \\frac{x}{a}, \\text{adj} = \\sqrt{a^2 - x^2}$ |
| $\\sqrt{a^2 + x^2}$ | $x = a\\tan\\theta$ | $dx = a\\sec^2\\theta\\,d\\theta$ | $a^2 + a^2\\tan^2\\theta = a^2\\sec^2\\theta$ | $\\tan\\theta = \\frac{x}{a}, \\text{hyp} = \\sqrt{a^2 + x^2}$ |
| $\\sqrt{x^2 - a^2}$ | $x = a\\sec\\theta$ | $dx = a\\sec\\theta\\tan\\theta\\,d\\theta$ | $a^2\\sec^2\\theta - a^2 = a^2\\tan^2\\theta$ | $\\sec\\theta = \\frac{x}{a}, \\text{opp} = \\sqrt{x^2 - a^2}$ |

### 2. Back-Substitution
Always convert $\\theta$ expressions back to $x$ using geometric relations from the right triangle.
"""
    },
    {
        "filename": "05_partial_fraction_decomposition.md",
        "title": "Module 5: Partial Fraction Decomposition",
        "topic": "Partial Fractions",
        "topicTh": "การแยกเศษส่วนย่อย",
        "week": "Week 11",
        "content": """# Module 5: Partial Fraction Decomposition
## Calculus 1 - Final Examination Preparation

### 1. Setup by Factor Types
- Distinct linear factors $(x - r)$: $\\frac{A}{x - r}$
- Repeated linear factors $(x - r)^k$: $\\frac{A_1}{x - r} + \\frac{A_2}{(x - r)^2} + \\cdots + \\frac{A_k}{(x - r)^k}$
- Irreducible quadratic factors $(x^2 + bx + c)$: $\\frac{Ax + B}{x^2 + bx + c}$

### 2. Integration Techniques for Resulting Terms
- Linear denominators yield logarithms: $\\int \\frac{1}{x - r}\\,dx = \\ln|x - r| + C$.
- Quadratic denominators split into log + arctan forms:
$$\\int \\frac{2x+3}{x^2+1}\\,dx = \\ln(x^2+1) + 3\\arctan(x) + C$$
"""
    },
    {
        "filename": "06_reduction_formulas_and_tables.md",
        "title": "Module 6: Integration by Table & Reduction Formulas",
        "topic": "Reduction Formulas & Tables",
        "topicTh": "สูตรลดทอนและการใช้นิพจน์สำเร็จรูป",
        "week": "Week 11",
        "content": """# Module 6: Reduction Formulas & Table Integration
## Calculus 1 - Final Examination Preparation

### 1. Standard Reduction Formulas
- Powers of secant:
$$\\int \\sec^n(x) \\, dx = \\frac{\\sec^{n-2}(x) \\tan(x)}{n - 1} + \\frac{n - 2}{n - 1} \\int \\sec^{n-2}(x) \\, dx$$
- Powers of sine:
$$\\int \\sin^n(x) \\, dx = -\\frac{\\sin^{n-1}(x) \\cos(x)}{n} + \\frac{n - 1}{n} \\int \\sin^{n-2}(x) \\, dx$$
- Powers of cosine:
$$\\int \\cos^n(x) \\, dx = \\frac{\\cos^{n-1}(x) \\sin(x)}{n} + \\frac{n - 1}{n} \\int \\cos^{n-2}(x) \\, dx$$
"""
    },
    {
        "filename": "07_sequences_and_infinite_series.md",
        "title": "Module 7: Geometric Series & Divergence Tests",
        "topic": "Geometric Sequences & Series",
        "topicTh": "ลำดับและอนุกรมเรขาคณิต",
        "week": "Week 13",
        "content": """# Module 7: Sequences and Infinite Series
## Calculus 1 - Final Examination Preparation

### 1. Geometric Series Test
A geometric series with initial term $a$ and common ratio $r$:
$$\\sum_{n=0}^{\\infty} a r^n = a + ar + ar^2 + \\cdots$$
- **Convergence**: Converges if and only if $|r| < 1$.
- **Sum**: When $|r| < 1$, the sum is $S = \\frac{a}{1 - r}$.
- **Divergence**: Diverges if $|r| \\ge 1$.

### 2. Divergence Test (nth-Term Test)
If $\\lim_{n \\to \\infty} a_n \\neq 0$ (or does not exist), then $\\sum a_n$ diverges.
*Note*: If $\\lim_{n \\to \\infty} a_n = 0$, the test is inconclusive!
"""
    },
    {
        "filename": "08_ratio_test_and_convergence.md",
        "title": "Module 8: The Ratio Test for Convergence",
        "topic": "Ratio Test",
        "topicTh": "การทดสอบอัตราส่วน",
        "week": "Week 13-14",
        "content": """# Module 8: The Ratio Test
## Calculus 1 - Final Examination Preparation

### 1. The Ratio Test Statement
Let $\\sum a_n$ be a series with nonzero terms. Compute:
$$L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|$$
1. If $L < 1$: The series converges absolutely (and therefore converges).
2. If $L > 1$ or $L = \\infty$: The series diverges.
3. If $L = 1$: The test is **inconclusive** (must use another test, e.g., p-series or comparison).

### 2. Best Candidates for Ratio Test
Factorials ($n!$), exponential bases ($c^n$), products like $(2n)!$ and $n^n$.
"""
    },
    {
        "filename": "09_power_series_radius_and_interval.md",
        "title": "Module 9: Power Series, Radius & Interval of Convergence",
        "topic": "Power Series & IOC",
        "topicTh": "อนุกรมกำลัง รัศมี และช่วงแห่งการลู่เข้า",
        "week": "Week 14",
        "content": """# Module 9: Power Series
## Calculus 1 - Final Examination Preparation

### 1. General Form
A power series centered at $x = c$:
$$\\sum_{n=0}^{\\infty} c_n (x - c)^n$$

### 2. Radius of Convergence $R$
Found using the Ratio Test:
$$L = \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}(x-c)^{n+1}}{c_n(x-c)^n} \\right| = |x - c| \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}}{c_n} \\right| < 1$$
Thus $R = \\frac{1}{\\lim |c_{n+1}/c_n|}$.

### 3. Interval of Convergence (IOC)
- Open interval: $(c - R, c + R)$.
- **Crucial Step**: You MUST independently test both endpoints $x = c - R$ and $x = c + R$ using alternating series, p-series, or direct comparison tests.
"""
    },
    {
        "filename": "10_taylor_and_maclaurin_series.md",
        "title": "Module 10: Taylor and Maclaurin Series Expansions",
        "topic": "Taylor & Maclaurin Series",
        "topicTh": "อนุกรมเทย์เลอร์และแมคลอริน",
        "week": "Week 15",
        "content": """# Module 10: Taylor and Maclaurin Series
## Calculus 1 - Final Examination Preparation

### 1. Definitions
- **Taylor Series** of $f(x)$ centered at $x = a$:
$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots$$
- **Maclaurin Series**: Taylor series centered at $a = 0$:
$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n$$

### 2. Essential Maclaurin Series to Memorize
| Function | Maclaurin Series $\\sum$ | Expanded Terms | IOC |
|---|---|---|---|
| $\\frac{1}{1-x}$ | $\\sum_{n=0}^\\infty x^n$ | $1 + x + x^2 + x^3 + \\cdots$ | $(-1, 1)$ |
| $e^x$ | $\\sum_{n=0}^\\infty \\frac{x^n}{n!}$ | $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ | $(-\\infty, \\infty)$ |
| $\\sin(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}$ | $x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$ | $(-\\infty, \\infty)$ |
| $\\cos(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}$ | $1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$ | $(-\\infty, \\infty)$ |
| $\\ln(1+x)$ | $\\sum_{n=1}^\\infty (-1)^{n-1} \\frac{x^n}{n}$ | $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$ | $(-1, 1]$ |
| $\\arctan(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n+1}$ | $x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots$ | $[-1, 1]$ |

### 3. Applications
- Evaluating non-elementary integrals: e.g., $\\int e^{-x^2} \\, dx$, $\\int \\frac{\\sin x}{x} \\, dx$.
- Evaluating indeterminate limits without l'Hôpital's Rule.
"""
    },
    {
        "filename": "11_course_syllabus_and_rules.md",
        "title": "Course Syllabus & Examination Regulations",
        "topic": "Exam Regulations",
        "topicTh": "ข้อกำหนดและระเบียบการสอบ",
        "week": "All Weeks",
        "content": """# KMITL Calculus 1 - Final Examination Blueprint & Regulations

### Examination Architecture
- Total Points: 50 points
- Question Count: 12 Questions
  - Q1 - Q10: 4 points each (40 pts)
  - Q11 - Q12: 5 points each (10 pts)
- Time Allocated: 120 minutes (2 hours)
- Calculator Policy: **STRICTLY PROHIBITED**. All answers must be exact analytical expressions.
- Provided Material: Standard Integration Table.
- Disallowed Topics: Statistical applications of integration (no PDF or expected value problems).
"""
    }
]


def clean_mojibake_name(raw_name: str) -> str:
    """Decodes ISO-8859-1/mojibake Thai characters to proper UTF-8 strings."""
    try:
        # Check if contains the telltale byte sequences from UTF-8 interpreted as Latin-1
        b = bytes([ord(c) for c in raw_name if ord(c) < 256])
        decoded = b.decode("utf-8")
        if decoded and len(decoded) > 0:
            return decoded
    except Exception:
        pass
    return raw_name


def populate_curriculum_modules():
    """Generates synthetic curriculum markdown files in raw_slides."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for item in CURRICULUM_MODULES:
        filepath = OUTPUT_DIR / item["filename"]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"# {item['title']}\n\n{item['content'].strip()}\n")


def generate_index_manifest():
    """Builds raw_slides/index.json indexing all PDFs and syllabus modules."""
    files_list = []
    
    # Categorize all files in raw_slides
    for path in sorted(OUTPUT_DIR.iterdir()):
        if path.name.startswith(".") or path.name == "index.json":
            continue

        size_bytes = path.stat().st_size
        size_display = (
            f"{size_bytes / (1024 * 1024):.1f} MB"
            if size_bytes >= 1024 * 1024
            else f"{size_bytes / 1024:.1f} KB"
        )

        ext = path.suffix.lower()
        category = "Other"
        title = path.stem

        if "เฉลย" in path.name or "Homework" in path.name or "Exercise" in path.name:
            category = "Homework & Solutions"
        elif "Week" in path.name or "Module" in path.name or "Function" in path.name:
            category = "Lecture Notes & Slides"
        elif "Single_and_Multivariable" in path.name:
            category = "Reference Textbooks"
        elif ext == ".md":
            category = "Study Guides & Syllabus"

        files_list.append({
            "filename": path.name,
            "path": f"raw_slides/{path.name}",
            "size": size_display,
            "sizeBytes": size_bytes,
            "extension": ext,
            "category": category,
            "title": title
        })

    manifest = {
        "course": "Calculus 1",
        "courseCode": "06016301",
        "institution": "KMITL (King Mongkut's Institute of Technology Ladkrabang)",
        "source": "https://onlearn.it.kmitl.ac.th/course/view.php?id=1813",
        "totalFiles": len(files_list),
        "files": files_list
    }

    manifest_path = OUTPUT_DIR / "index.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"Generated manifest {manifest_path} with {len(files_list)} items.")


def run():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. First, rename existing files with mojibake
    for p in list(OUTPUT_DIR.glob("*.pdf")):
        clean_name = clean_mojibake_name(p.name)
        if clean_name != p.name:
            new_p = OUTPUT_DIR / clean_name
            p.rename(new_p)
            print(f"Cleaned filename: {p.name} -> {clean_name}")

    # 2. Check if we need to fetch from Moodle
    pdf_count = len(list(OUTPUT_DIR.glob("*.pdf")))
    if pdf_count < 5 and requests and BeautifulSoup:
        print(f"Fetching from Moodle LMS {COURSE_URL}...")
        headers = {"User-Agent": USER_AGENT}
        cookies = {"MoodleSession": SESSION_COOKIE}
        try:
            session = requests.Session()
            session.headers.update(headers)
            session.cookies.update(cookies)
            res = session.get(COURSE_URL, timeout=12)
            if res.status_code == 200 and "login" not in res.url:
                soup = BeautifulSoup(res.text, "html.parser")
                for a in soup.find_all("a", href=True):
                    href = a["href"]
                    if any(k in href for k in ["/mod/resource/view.php", "/pluginfile.php", ".pdf"]):
                        text = a.get_text(strip=True) or "resource"
                        try:
                            fres = session.get(href, stream=True, timeout=10)
                            if fres.status_code == 200:
                                cd = fres.headers.get("content-disposition", "")
                                fname = None
                                if "filename=" in cd:
                                    m = re.search(r'filename=["\']?([^"\';]+)["\']?', cd)
                                    if m:
                                        fname = m.group(1)
                                if not fname:
                                    fname = f"{text}.pdf"
                                fname = clean_mojibake_name(fname)
                                with open(OUTPUT_DIR / fname, "wb") as f_out:
                                    for c in fres.iter_content(8192):
                                        if c:
                                            f_out.write(c)
                                print(f"Fetched: {fname}")
                        except Exception as e:
                            print(f"Error fetching {href}: {e}")
        except Exception as e:
            print(f"Moodle fetch error: {e}")

    # 3. Populate syllabus & reference modules
    populate_curriculum_modules()

    # 4. Generate manifest index.json
    generate_index_manifest()
    print("Slide ingestion and syllabus indexing completed successfully.")


if __name__ == "__main__":
    run()
