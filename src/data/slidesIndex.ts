export interface SlideResource {
  filename: string;
  path: string;
  size: string;
  sizeBytes: number;
  extension: string;
  category: string;
  title: string;
  content?: string | null;
}

export interface CourseManifest {
  course: string;
  courseCode: string;
  institution: string;
  source: string;
  totalFiles: number;
  files: SlideResource[];
}

export const courseManifest: CourseManifest = {
  "course": "Calculus 1",
  "courseCode": "06016301",
  "institution": "KMITL (King Mongkut's Institute of Technology Ladkrabang)",
  "source": "https://onlearn.it.kmitl.ac.th/course/view.php?id=1813",
  "totalFiles": 37,
  "files": [
    {
      "filename": "01_integration_by_substitution.md",
      "path": "raw_slides/01_integration_by_substitution.md",
      "size": "0.8 KB",
      "sizeBytes": 868,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "01_integration_by_substitution",
      "content": "# Module 1: Advanced Integration by Substitution & Boundary Shifts\n\n# Module 1: Integration by Substitution (U-Substitution)\n## Calculus 1 - Final Examination Preparation\n\n### 1. Fundamental Principle\nIf $u = g(x)$ is a differentiable function whose range is an interval $I$, and $f$ is continuous on $I$:\n$$\\int f(g(x)) g'(x) \\, dx = \\int f(u) \\, du$$\n\n### 2. Definite Integrals and Boundary Shifts\nWhen evaluating definite integrals:\n$$\\int_{a}^{b} f(g(x)) g'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du$$\n*Critical Exam Rule*: Never forget to transform the integration bounds $x = a \\to u = g(a)$ and $x = b \\to u = g(b)$.\n\n### 3. Canonical Exam Patterns\n1. Integrals involving $\\frac{f'(x)}{f(x)} \\to \\ln|f(x)| + C$\n2. Exponential substitutions: $\\int e^{x} f(e^x) \\, dx$\n3. Radical adjustments: letting $u = \\sqrt{ax+b} \\implies u^2 = ax+b \\implies 2u\\,du = a\\,dx$.\n"
    },
    {
      "filename": "02_polynomial_long_division_and_rational_functions.md",
      "path": "raw_slides/02_polynomial_long_division_and_rational_functions.md",
      "size": "0.7 KB",
      "sizeBytes": 668,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "02_polynomial_long_division_and_rational_functions",
      "content": "# Module 2: Rational Integrands & Polynomial Long Division\n\n# Module 2: Polynomial Long Division & Rational Integrands\n## Calculus 1 - Final Examination Preparation\n\n### 1. Degree Analysis\nFor a rational function $\\frac{P(x)}{Q(x)}$:\n- If $\\deg(P) \\ge \\deg(Q)$, the fraction is improper.\n- You MUST perform polynomial long division prior to any integration or partial fraction decomposition:\n$$\\frac{P(x)}{Q(x)} = S(x) + \\frac{R(x)}{Q(x)}, \\quad \\text{where } \\deg(R) < \\deg(Q)$$\n\n### 2. Standard Integration Forms\n$$\\int \\frac{1}{x^2 + a^2} \\, dx = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C$$\n$$\\int \\frac{x}{x^2 + a^2} \\, dx = \\frac{1}{2} \\ln(x^2 + a^2) + C$$\n"
    },
    {
      "filename": "03_integration_by_parts.md",
      "path": "raw_slides/03_integration_by_parts.md",
      "size": "0.9 KB",
      "sizeBytes": 890,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "03_integration_by_parts",
      "content": "# Module 3: Integration by Parts (Tabular & Looping Integrals)\n\n# Module 3: Integration by Parts\n## Calculus 1 - Final Examination Preparation\n\n### 1. Standard Formula\n$$\\int u \\, dv = u v - \\int v \\, du$$\n\n### 2. Choice of $u$ (LIATE Rule)\n- **L**: Logarithmic functions ($\\ln x$)\n- **I**: Inverse trigonometric functions ($\\arctan x, \\arcsin x$)\n- **A**: Algebraic / Polynomial functions ($x^n$)\n- **T**: Trigonometric functions ($\\sin x, \\cos x$)\n- **E**: Exponential functions ($e^x$)\n\n### 3. Looping Integrals (Solving for the Unknown Integral)\nIntegrals such as $\\int e^{ax} \\cos(bx) \\, dx$ require applying parts twice, identifying the original integral $I$, and solving algebraically for $I$.\n\n### 4. Tabular Integration (DI Method)\nFor $\\int P(x) g(x) \\, dx$ where $P(x)$ is a polynomial:\nAlternate signs $+ - + -$, differentiate $P(x)$ down to 0, and repeatedly integrate $g(x)$.\n"
    },
    {
      "filename": "04_trigonometric_substitution.md",
      "path": "raw_slides/04_trigonometric_substitution.md",
      "size": "0.9 KB",
      "sizeBytes": 964,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "04_trigonometric_substitution",
      "content": "# Module 4: Trigonometric Substitution & Reference Triangles\n\n# Module 4: Trigonometric Substitution\n## Calculus 1 - Final Examination Preparation\n\n### 1. Three Canonical Radicals\n| Radical Form | Substitution | Differential | Identity Simplification | Reference Triangle |\n|---|---|---|---|---|\n| $\\sqrt{a^2 - x^2}$ | $x = a\\sin\\theta$ | $dx = a\\cos\\theta\\,d\\theta$ | $a^2 - a^2\\sin^2\\theta = a^2\\cos^2\\theta$ | $\\sin\\theta = \\frac{x}{a}, \\text{adj} = \\sqrt{a^2 - x^2}$ |\n| $\\sqrt{a^2 + x^2}$ | $x = a\\tan\\theta$ | $dx = a\\sec^2\\theta\\,d\\theta$ | $a^2 + a^2\\tan^2\\theta = a^2\\sec^2\\theta$ | $\\tan\\theta = \\frac{x}{a}, \\text{hyp} = \\sqrt{a^2 + x^2}$ |\n| $\\sqrt{x^2 - a^2}$ | $x = a\\sec\\theta$ | $dx = a\\sec\\theta\\tan\\theta\\,d\\theta$ | $a^2\\sec^2\\theta - a^2 = a^2\\tan^2\\theta$ | $\\sec\\theta = \\frac{x}{a}, \\text{opp} = \\sqrt{x^2 - a^2}$ |\n\n### 2. Back-Substitution\nAlways convert $\\theta$ expressions back to $x$ using geometric relations from the right triangle.\n"
    },
    {
      "filename": "05_partial_fraction_decomposition.md",
      "path": "raw_slides/05_partial_fraction_decomposition.md",
      "size": "0.7 KB",
      "sizeBytes": 669,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "05_partial_fraction_decomposition",
      "content": "# Module 5: Partial Fraction Decomposition\n\n# Module 5: Partial Fraction Decomposition\n## Calculus 1 - Final Examination Preparation\n\n### 1. Setup by Factor Types\n- Distinct linear factors $(x - r)$: $\\frac{A}{x - r}$\n- Repeated linear factors $(x - r)^k$: $\\frac{A_1}{x - r} + \\frac{A_2}{(x - r)^2} + \\cdots + \\frac{A_k}{(x - r)^k}$\n- Irreducible quadratic factors $(x^2 + bx + c)$: $\\frac{Ax + B}{x^2 + bx + c}$\n\n### 2. Integration Techniques for Resulting Terms\n- Linear denominators yield logarithms: $\\int \\frac{1}{x - r}\\,dx = \\ln|x - r| + C$.\n- Quadratic denominators split into log + arctan forms:\n$$\\int \\frac{2x+3}{x^2+1}\\,dx = \\ln(x^2+1) + 3\\arctan(x) + C$$\n"
    },
    {
      "filename": "06_reduction_formulas_and_tables.md",
      "path": "raw_slides/06_reduction_formulas_and_tables.md",
      "size": "0.5 KB",
      "sizeBytes": 561,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "06_reduction_formulas_and_tables",
      "content": "# Module 6: Integration by Table & Reduction Formulas\n\n# Module 6: Reduction Formulas & Table Integration\n## Calculus 1 - Final Examination Preparation\n\n### 1. Standard Reduction Formulas\n- Powers of secant:\n$$\\int \\sec^n(x) \\, dx = \\frac{\\sec^{n-2}(x) \\tan(x)}{n - 1} + \\frac{n - 2}{n - 1} \\int \\sec^{n-2}(x) \\, dx$$\n- Powers of sine:\n$$\\int \\sin^n(x) \\, dx = -\\frac{\\sin^{n-1}(x) \\cos(x)}{n} + \\frac{n - 1}{n} \\int \\sin^{n-2}(x) \\, dx$$\n- Powers of cosine:\n$$\\int \\cos^n(x) \\, dx = \\frac{\\cos^{n-1}(x) \\sin(x)}{n} + \\frac{n - 1}{n} \\int \\cos^{n-2}(x) \\, dx$$\n"
    },
    {
      "filename": "07_sequences_and_infinite_series.md",
      "path": "raw_slides/07_sequences_and_infinite_series.md",
      "size": "0.6 KB",
      "sizeBytes": 635,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "07_sequences_and_infinite_series",
      "content": "# Module 7: Geometric Series & Divergence Tests\n\n# Module 7: Sequences and Infinite Series\n## Calculus 1 - Final Examination Preparation\n\n### 1. Geometric Series Test\nA geometric series with initial term $a$ and common ratio $r$:\n$$\\sum_{n=0}^{\\infty} a r^n = a + ar + ar^2 + \\cdots$$\n- **Convergence**: Converges if and only if $|r| < 1$.\n- **Sum**: When $|r| < 1$, the sum is $S = \\frac{a}{1 - r}$.\n- **Divergence**: Diverges if $|r| \\ge 1$.\n\n### 2. Divergence Test (nth-Term Test)\nIf $\\lim_{n \\to \\infty} a_n \\neq 0$ (or does not exist), then $\\sum a_n$ diverges.\n*Note*: If $\\lim_{n \\to \\infty} a_n = 0$, the test is inconclusive!\n"
    },
    {
      "filename": "08_ratio_test_and_convergence.md",
      "path": "raw_slides/08_ratio_test_and_convergence.md",
      "size": "0.6 KB",
      "sizeBytes": 612,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "08_ratio_test_and_convergence",
      "content": "# Module 8: The Ratio Test for Convergence\n\n# Module 8: The Ratio Test\n## Calculus 1 - Final Examination Preparation\n\n### 1. The Ratio Test Statement\nLet $\\sum a_n$ be a series with nonzero terms. Compute:\n$$L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|$$\n1. If $L < 1$: The series converges absolutely (and therefore converges).\n2. If $L > 1$ or $L = \\infty$: The series diverges.\n3. If $L = 1$: The test is **inconclusive** (must use another test, e.g., p-series or comparison).\n\n### 2. Best Candidates for Ratio Test\nFactorials ($n!$), exponential bases ($c^n$), products like $(2n)!$ and $n^n$.\n"
    },
    {
      "filename": "09_power_series_radius_and_interval.md",
      "path": "raw_slides/09_power_series_radius_and_interval.md",
      "size": "0.7 KB",
      "sizeBytes": 707,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "09_power_series_radius_and_interval",
      "content": "# Module 9: Power Series, Radius & Interval of Convergence\n\n# Module 9: Power Series\n## Calculus 1 - Final Examination Preparation\n\n### 1. General Form\nA power series centered at $x = c$:\n$$\\sum_{n=0}^{\\infty} c_n (x - c)^n$$\n\n### 2. Radius of Convergence $R$\nFound using the Ratio Test:\n$$L = \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}(x-c)^{n+1}}{c_n(x-c)^n} \\right| = |x - c| \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}}{c_n} \\right| < 1$$\nThus $R = \\frac{1}{\\lim |c_{n+1}/c_n|}$.\n\n### 3. Interval of Convergence (IOC)\n- Open interval: $(c - R, c + R)$.\n- **Crucial Step**: You MUST independently test both endpoints $x = c - R$ and $x = c + R$ using alternating series, p-series, or direct comparison tests.\n"
    },
    {
      "filename": "10_taylor_and_maclaurin_series.md",
      "path": "raw_slides/10_taylor_and_maclaurin_series.md",
      "size": "1.5 KB",
      "sizeBytes": 1487,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "10_taylor_and_maclaurin_series",
      "content": "# Module 10: Taylor and Maclaurin Series Expansions\n\n# Module 10: Taylor and Maclaurin Series\n## Calculus 1 - Final Examination Preparation\n\n### 1. Definitions\n- **Taylor Series** of $f(x)$ centered at $x = a$:\n$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots$$\n- **Maclaurin Series**: Taylor series centered at $a = 0$:\n$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n$$\n\n### 2. Essential Maclaurin Series to Memorize\n| Function | Maclaurin Series $\\sum$ | Expanded Terms | IOC |\n|---|---|---|---|\n| $\\frac{1}{1-x}$ | $\\sum_{n=0}^\\infty x^n$ | $1 + x + x^2 + x^3 + \\cdots$ | $(-1, 1)$ |\n| $e^x$ | $\\sum_{n=0}^\\infty \\frac{x^n}{n!}$ | $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ | $(-\\infty, \\infty)$ |\n| $\\sin(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}$ | $x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$ | $(-\\infty, \\infty)$ |\n| $\\cos(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}$ | $1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$ | $(-\\infty, \\infty)$ |\n| $\\ln(1+x)$ | $\\sum_{n=1}^\\infty (-1)^{n-1} \\frac{x^n}{n}$ | $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$ | $(-1, 1]$ |\n| $\\arctan(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n+1}$ | $x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots$ | $[-1, 1]$ |\n\n### 3. Applications\n- Evaluating non-elementary integrals: e.g., $\\int e^{-x^2} \\, dx$, $\\int \\frac{\\sin x}{x} \\, dx$.\n- Evaluating indeterminate limits without l'Hôpital's Rule.\n"
    },
    {
      "filename": "11_course_syllabus_and_rules.md",
      "path": "raw_slides/11_course_syllabus_and_rules.md",
      "size": "0.5 KB",
      "sizeBytes": 553,
      "extension": ".md",
      "category": "Study Guides & Syllabus",
      "title": "11_course_syllabus_and_rules",
      "content": "# Course Syllabus & Examination Regulations\n\n# KMITL Calculus 1 - Final Examination Blueprint & Regulations\n\n### Examination Architecture\n- Total Points: 50 points\n- Question Count: 12 Questions\n  - Q1 - Q10: 4 points each (40 pts)\n  - Q11 - Q12: 5 points each (10 pts)\n- Time Allocated: 120 minutes (2 hours)\n- Calculator Policy: **STRICTLY PROHIBITED**. All answers must be exact analytical expressions.\n- Provided Material: Standard Integration Table.\n- Disallowed Topics: Statistical applications of integration (no PDF or expected value problems).\n"
    },
    {
      "filename": "Exercise_limit_เฉลย.pdf",
      "path": "raw_slides/Exercise_limit_เฉลย.pdf",
      "size": "681.2 KB",
      "sizeBytes": 697569,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "Exercise_limit_เฉลย",
      "content": null
    },
    {
      "filename": "Single_and_Multivariable_6th_Edition.pdf",
      "path": "raw_slides/Single_and_Multivariable_6th_Edition.pdf",
      "size": "31.1 MB",
      "sizeBytes": 32579964,
      "extension": ".pdf",
      "category": "Reference Textbooks",
      "title": "Single_and_Multivariable_6th_Edition",
      "content": null
    },
    {
      "filename": "Week 10 (1).pdf",
      "path": "raw_slides/Week 10 (1).pdf",
      "size": "3.4 MB",
      "sizeBytes": 3552874,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 10 (1)",
      "content": null
    },
    {
      "filename": "Week 11 (1).pdf",
      "path": "raw_slides/Week 11 (1).pdf",
      "size": "3.5 MB",
      "sizeBytes": 3662419,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 11 (1)",
      "content": null
    },
    {
      "filename": "Week 11 (3).pdf",
      "path": "raw_slides/Week 11 (3).pdf",
      "size": "4.0 MB",
      "sizeBytes": 4179930,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 11 (3)",
      "content": null
    },
    {
      "filename": "Week 13.pdf",
      "path": "raw_slides/Week 13.pdf",
      "size": "3.1 MB",
      "sizeBytes": 3270749,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 13",
      "content": null
    },
    {
      "filename": "Week 14.pdf",
      "path": "raw_slides/Week 14.pdf",
      "size": "5.7 MB",
      "sizeBytes": 6024094,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 14",
      "content": null
    },
    {
      "filename": "Week 15.pdf",
      "path": "raw_slides/Week 15.pdf",
      "size": "3.3 MB",
      "sizeBytes": 3411578,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 15",
      "content": null
    },
    {
      "filename": "Week 2 (2).pdf",
      "path": "raw_slides/Week 2 (2).pdf",
      "size": "3.9 MB",
      "sizeBytes": 4097763,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 2 (2)",
      "content": null
    },
    {
      "filename": "Week 3 (1).pdf",
      "path": "raw_slides/Week 3 (1).pdf",
      "size": "3.9 MB",
      "sizeBytes": 4040028,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 3 (1)",
      "content": null
    },
    {
      "filename": "Week 4 (1).pdf",
      "path": "raw_slides/Week 4 (1).pdf",
      "size": "2.3 MB",
      "sizeBytes": 2365446,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 4 (1)",
      "content": null
    },
    {
      "filename": "Week 5 (1).pdf",
      "path": "raw_slides/Week 5 (1).pdf",
      "size": "2.0 MB",
      "sizeBytes": 2099151,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 5 (1)",
      "content": null
    },
    {
      "filename": "Week 6 (2).pdf",
      "path": "raw_slides/Week 6 (2).pdf",
      "size": "2.2 MB",
      "sizeBytes": 2308787,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 6 (2)",
      "content": null
    },
    {
      "filename": "Week 7 (1).pdf",
      "path": "raw_slides/Week 7 (1).pdf",
      "size": "3.7 MB",
      "sizeBytes": 3920652,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 7 (1)",
      "content": null
    },
    {
      "filename": "Week 8 (1).pdf",
      "path": "raw_slides/Week 8 (1).pdf",
      "size": "3.0 MB",
      "sizeBytes": 3144006,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week 8 (1)",
      "content": null
    },
    {
      "filename": "Week1 Function (1).pdf",
      "path": "raw_slides/Week1 Function (1).pdf",
      "size": "13.4 MB",
      "sizeBytes": 14079258,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week1 Function (1)",
      "content": null
    },
    {
      "filename": "Week9  (2).pdf",
      "path": "raw_slides/Week9  (2).pdf",
      "size": "2.9 MB",
      "sizeBytes": 3039268,
      "extension": ".pdf",
      "category": "Lecture Notes & Slides",
      "title": "Week9  (2)",
      "content": null
    },
    {
      "filename": "เฉลย Homework11 (1).pdf",
      "path": "raw_slides/เฉลย Homework11 (1).pdf",
      "size": "345.1 KB",
      "sizeBytes": 353403,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework11 (1)",
      "content": null
    },
    {
      "filename": "เฉลย Homework2.pdf",
      "path": "raw_slides/เฉลย Homework2.pdf",
      "size": "112.0 KB",
      "sizeBytes": 114649,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework2",
      "content": null
    },
    {
      "filename": "เฉลย Homework3.pdf",
      "path": "raw_slides/เฉลย Homework3.pdf",
      "size": "530.7 KB",
      "sizeBytes": 543445,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework3",
      "content": null
    },
    {
      "filename": "เฉลย Homework5.pdf",
      "path": "raw_slides/เฉลย Homework5.pdf",
      "size": "728.2 KB",
      "sizeBytes": 745639,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework5",
      "content": null
    },
    {
      "filename": "เฉลย Homework6.pdf",
      "path": "raw_slides/เฉลย Homework6.pdf",
      "size": "488.4 KB",
      "sizeBytes": 500151,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework6",
      "content": null
    },
    {
      "filename": "เฉลย Homework7.pdf",
      "path": "raw_slides/เฉลย Homework7.pdf",
      "size": "285.2 KB",
      "sizeBytes": 292011,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework7",
      "content": null
    },
    {
      "filename": "เฉลย Homework9.pdf",
      "path": "raw_slides/เฉลย Homework9.pdf",
      "size": "392.1 KB",
      "sizeBytes": 401537,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย Homework9",
      "content": null
    },
    {
      "filename": "เฉลย homework10.pdf",
      "path": "raw_slides/เฉลย homework10.pdf",
      "size": "1.4 MB",
      "sizeBytes": 1483797,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลย homework10",
      "content": null
    },
    {
      "filename": "เฉลยHomework4.pdf",
      "path": "raw_slides/เฉลยHomework4.pdf",
      "size": "705.6 KB",
      "sizeBytes": 722541,
      "extension": ".pdf",
      "category": "Homework & Solutions",
      "title": "เฉลยHomework4",
      "content": null
    }
  ]
};
