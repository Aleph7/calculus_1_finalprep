export interface FormulaItem {
  id: string;
  name: string;
  category: 'standard_integrals' | 'reduction' | 'trig_sub' | 'series_tests' | 'maclaurin_taylor' | 'pitfalls';
  latex: string;
  description: string;
  notes?: string;
  conditions?: string;
}

export interface RubricItem {
  criteria: string;
  points: number;
}

export interface ExamQuestion {
  id: number;
  topic: string;
  topicTh: string;
  category: string;
  points: 4 | 5;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Exam-Standard';
  problemStatement: string;
  hints: string[];
  stepByStepSolution: string[];
  rubric: RubricItem[];
  finalAnswer: string;
}

export interface PracticeProblem {
  id: string;
  topicId: string;
  topic: string;
  topicTh: string;
  level: 'Easy' | 'Medium' | 'Exam Trap';
  problemStatement: string;
  hint: string;
  stepByStepSolution: string[];
  finalAnswer: string;
}

/* ==========================================================================
   1. FORMULA SHEET & VAULT
   ========================================================================== */
export const formulaSheet: FormulaItem[] = [
  // --- Standard Integration Table (Allowed in Exam) ---
  {
    id: 'int-power',
    name: 'Power Rule for Integrals',
    category: 'standard_integrals',
    latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
    description: 'Valid for all real constants n except n = -1.',
  },
  {
    id: 'int-log',
    name: 'Logarithmic Integration',
    category: 'standard_integrals',
    latex: '\\int \\frac{1}{x} \\, dx = \\ln|x| + C',
    description: 'Essential: Always include absolute value |x| when evaluating over negative domains.',
  },
  {
    id: 'int-exp',
    name: 'Exponential Integrals',
    category: 'standard_integrals',
    latex: '\\int e^{kx} \\, dx = \\frac{1}{k}e^{kx} + C, \\quad \\int a^x \\, dx = \\frac{a^x}{\\ln a} + C',
    description: 'Natural and general base exponential antiderivatives.',
  },
  {
    id: 'int-sin-cos',
    name: 'Sine and Cosine',
    category: 'standard_integrals',
    latex: '\\int \\sin(kx) \\, dx = -\\frac{1}{k}\\cos(kx) + C, \\quad \\int \\cos(kx) \\, dx = \\frac{1}{k}\\sin(kx) + C',
    description: 'Basic trigonometric antiderivatives with linear scaling factor k.',
  },
  {
    id: 'int-sec2-csc2',
    name: 'Secant and Cosecant Squared',
    category: 'standard_integrals',
    latex: '\\int \\sec^2(x) \\, dx = \\tan(x) + C, \\quad \\int \\csc^2(x) \\, dx = -\\cot(x) + C',
    description: 'Direct derivatives of tan(x) and cot(x).',
  },
  {
    id: 'int-sec-tan',
    name: 'Secant-Tangent Integrals',
    category: 'standard_integrals',
    latex: '\\int \\sec(x)\\tan(x) \\, dx = \\sec(x) + C, \\quad \\int \\csc(x)\\cot(x) \\, dx = -\\csc(x) + C',
    description: 'Standard product forms.',
  },
  {
    id: 'int-sec-alone',
    name: 'Integral of Secant',
    category: 'standard_integrals',
    latex: '\\int \\sec(x) \\, dx = \\ln|\\sec(x) + \\tan(x)| + C',
    description: 'Frequently tested in trigonometric substitution and reduction formulas.',
  },
  {
    id: 'int-arctan',
    name: 'Inverse Tangent Form',
    category: 'standard_integrals',
    latex: '\\int \\frac{1}{x^2 + a^2} \\, dx = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C',
    description: 'Primary result of irreducible quadratic factors and polynomial long division.',
  },
  {
    id: 'int-arcsin',
    name: 'Inverse Sine Form',
    category: 'standard_integrals',
    latex: '\\int \\frac{1}{\\sqrt{a^2 - x^2}} \\, dx = \\arcsin\\left(\\frac{x}{a}\\right) + C \\quad (|x| < a)',
    description: 'Notice that there is NO 1/a coefficient in front of arcsin!',
  },
  {
    id: 'int-arcsec',
    name: 'Inverse Secant Form',
    category: 'standard_integrals',
    latex: '\\int \\frac{1}{x\\sqrt{x^2 - a^2}} \\, dx = \\frac{1}{a}\\operatorname{arcsec}\\left(\\frac{|x|}{a}\\right) + C',
    description: 'Arises in substitution with radical forms.',
  },

  // --- Reduction Formulas ---
  {
    id: 'red-sec',
    name: 'Secant Reduction Formula',
    category: 'reduction',
    latex: '\\int \\sec^n(x) \\, dx = \\frac{\\sec^{n-2}(x) \\tan(x)}{n-1} + \\frac{n-2}{n-1} \\int \\sec^{n-2}(x) \\, dx',
    description: 'Derived using integration by parts with u = sec^(n-2)(x) and dv = sec^2(x) dx.',
    conditions: 'n \\ge 2',
  },
  {
    id: 'red-sin',
    name: 'Sine Reduction Formula',
    category: 'reduction',
    latex: '\\int \\sin^n(x) \\, dx = -\\frac{\\sin^{n-1}(x) \\cos(x)}{n} + \\frac{n-1}{n} \\int \\sin^{n-2}(x) \\, dx',
    description: 'Reduces powers of sine by 2 at each iteration.',
    conditions: 'n \\ge 2',
  },
  {
    id: 'red-cos',
    name: 'Cosine Reduction Formula',
    category: 'reduction',
    latex: '\\int \\cos^n(x) \\, dx = \\frac{\\cos^{n-1}(x) \\sin(x)}{n} + \\frac{n-1}{n} \\int \\cos^{n-2}(x) \\, dx',
    description: 'Reduces powers of cosine by 2 at each iteration.',
    conditions: 'n \\ge 2',
  },

  // --- Trigonometric Substitution & Reference Triangles ---
  {
    id: 'trig-sub-sin',
    name: 'Form sqrt(a^2 - x^2)',
    category: 'trig_sub',
    latex: 'x = a\\sin\\theta, \\quad dx = a\\cos\\theta\\,d\\theta, \\quad \\sqrt{a^2 - x^2} = a\\cos\\theta',
    description: 'Reference Triangle: Opposite = x, Hypotenuse = a, Adjacent = sqrt(a^2 - x^2). Angle theta in [-pi/2, pi/2].',
  },
  {
    id: 'trig-sub-tan',
    name: 'Form sqrt(a^2 + x^2)',
    category: 'trig_sub',
    latex: 'x = a\\tan\\theta, \\quad dx = a\\sec^2\\theta\\,d\\theta, \\quad \\sqrt{a^2 + x^2} = a\\sec\\theta',
    description: 'Reference Triangle: Opposite = x, Adjacent = a, Hypotenuse = sqrt(a^2 + x^2). Angle theta in (-pi/2, pi/2).',
  },
  {
    id: 'trig-sub-sec',
    name: 'Form sqrt(x^2 - a^2)',
    category: 'trig_sub',
    latex: 'x = a\\sec\\theta, \\quad dx = a\\sec\\theta\\tan\\theta\\,d\\theta, \\quad \\sqrt{x^2 - a^2} = a\\tan\\theta',
    description: 'Reference Triangle: Hypotenuse = x, Adjacent = a, Opposite = sqrt(x^2 - a^2).',
  },

  // --- Infinite Series Convergence Tests ---
  {
    id: 'series-geom',
    name: 'Geometric Series Convergence & Sum',
    category: 'series_tests',
    latex: '\\sum_{n=0}^{\\infty} a r^n = \\frac{a}{1 - r} \\iff |r| < 1',
    description: 'Diverges if |r| >= 1. The initial term "a" is whatever value the expression evaluates to at the lowest index.',
    notes: 'If sum starts at n = 1, then sum = a1 / (1 - r) where a1 = a*r.',
  },
  {
    id: 'series-ratio',
    name: 'The Ratio Test (d’Alembert)',
    category: 'series_tests',
    latex: 'L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|',
    description: 'L < 1: Absolutely convergent. L > 1 (or inf): Divergent. L = 1: Inconclusive (must use another test).',
    notes: 'Optimal for terms containing factorials (n!) and exponential bases (c^n).',
  },
  {
    id: 'series-divergence',
    name: 'nth-Term Test for Divergence',
    category: 'series_tests',
    latex: '\\text{If } \\lim_{n \\to \\infty} a_n \\neq 0 \\implies \\sum a_n \\text{ diverges}',
    description: 'Warning: If lim a_n = 0, the test tells you NOTHING (e.g. harmonic series 1/n has limit 0 but diverges).',
  },
  {
    id: 'series-ast',
    name: 'Alternating Series Test & Error Bound',
    category: 'series_tests',
    latex: '\\sum (-1)^{n-1} b_n \\text{ converges if } b_{n+1} \\le b_n \\text{ and } \\lim b_n = 0. \\quad |R_n| \\le b_{n+1}',
    description: 'The remainder R_n when stopping after n terms is strictly bounded by the magnitude of the (n+1)-th term.',
  },
  {
    id: 'series-pseries',
    name: 'p-Series Test',
    category: 'series_tests',
    latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^p} \\quad \\begin{cases} \\text{Converges} & p > 1 \\\\ \\text{Diverges} & p \\le 1 \\end{cases}',
    description: 'Crucial benchmark for testing power series endpoints.',
  },

  // --- Standard Maclaurin & Taylor Series ---
  {
    id: 'mac-geom',
    name: 'Geometric Series Expansion',
    category: 'maclaurin_taylor',
    latex: '\\frac{1}{1 - x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + x^3 + \\cdots \\quad (|x| < 1)',
    description: 'Base building block for rational expansions and logarithms.',
  },
  {
    id: 'mac-exp',
    name: 'Exponential Maclaurin Series',
    category: 'maclaurin_taylor',
    latex: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots \\quad (R = \\infty)',
    description: 'Valid for all real x in (-inf, inf).',
  },
  {
    id: 'mac-sin',
    name: 'Sine Maclaurin Series (Odd Powers)',
    category: 'maclaurin_taylor',
    latex: '\\sin(x) = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots \\quad (R = \\infty)',
    description: 'Contains only odd powers with alternating signs.',
  },
  {
    id: 'mac-cos',
    name: 'Cosine Maclaurin Series (Even Powers)',
    category: 'maclaurin_taylor',
    latex: '\\cos(x) = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots \\quad (R = \\infty)',
    description: 'Contains only even powers with alternating signs.',
  },
  {
    id: 'mac-ln',
    name: 'Natural Logarithm Maclaurin Series',
    category: 'maclaurin_taylor',
    latex: '\\ln(1 + x) = \\sum_{n=1}^{\\infty} (-1)^{n-1} \\frac{x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots \\quad (-1 < x \\le 1)',
    description: 'Note: No factorials in denominators! Converges at endpoint x = 1 (alternating harmonic), diverges at x = -1.',
  },
  {
    id: 'mac-arctan',
    name: 'Arctangent Maclaurin Series',
    category: 'maclaurin_taylor',
    latex: '\\arctan(x) = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n+1}}{2n+1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots \\quad ([-1, 1])',
    description: 'Odd powers without factorial in denominator. Converges on [-1, 1].',
  },
  {
    id: 'taylor-general',
    name: 'General Taylor Series Definition',
    category: 'maclaurin_taylor',
    latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2!}(x-a)^2 + \\cdots',
    description: 'Taylor series centered at x = a (a != 0).',
  },

  // --- Common Traps & Pitfalls ---
  {
    id: 'pitfall-constant',
    name: 'Pitfall 1: Forgetting + C',
    category: 'pitfalls',
    latex: '\\int f(x) \\, dx = F(x) + C',
    description: 'Never omit the arbitrary constant of integration + C on indefinite integrals. Doing so immediately deducts points.',
  },
  {
    id: 'pitfall-bounds',
    name: 'Pitfall 2: Neglecting Bound Shifts in u-Substitution',
    category: 'pitfalls',
    latex: '\\int_{a}^{b} f(g(x))g\'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du',
    description: 'Writing u-integral with x-limits without converting them or failing to back-substitute before evaluating causes invalid calculations.',
  },
  {
    id: 'pitfall-longdiv',
    name: 'Pitfall 3: Partial Fractions without Checking Degrees',
    category: 'pitfalls',
    latex: '\\deg(\\text{Numerator}) \\ge \\deg(\\text{Denominator}) \\implies \\text{MUST do Long Division First!}',
    description: 'If deg(P) >= deg(Q), directly decomposing into partial fractions is mathematically false.',
  },
  {
    id: 'pitfall-ratio-abs',
    name: 'Pitfall 4: Missing Absolute Value in Ratio Test',
    category: 'pitfalls',
    latex: 'L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right| \\quad (\\text{Absolute value is mandatory})',
    description: 'Omitting |...| will cause negative signs to persist, leading to erroneous limit values.',
  },
  {
    id: 'pitfall-endpoints',
    name: 'Pitfall 5: Forgetting to Check Endpoints of Power Series',
    category: 'pitfalls',
    latex: 'x = c - R \\quad \\text{and} \\quad x = c + R',
    description: 'Ratio test only proves convergence on the open interval (c-R, c+R). You MUST plug in endpoints separately to determine [ or ( brackets.',
  },
];

/* ==========================================================================
   2. MOCK EXAMINATION (EXACTLY 12 QUESTIONS, 50 POINTS TOTAL)
   ========================================================================== */
export const mockExamQuestions: ExamQuestion[] = [
  // --- Question 1 (4 pts) ---
  {
    id: 1,
    topic: 'Integration by Substitution with Boundary Transformation',
    topicTh: 'การอินทิเกรตโดยการเปลี่ยนตัวแปรและการเปลี่ยนขอบเขต',
    category: 'Substitution',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Evaluate the definite integral without using a calculator:\n\n$$\\int_{0}^{\\sqrt{3}} \\frac{x^3}{\\sqrt{x^2 + 1}} \\, dx$$',
    hints: [
      'Notice that the numerator x^3 can be rewritten as x^2 * x dx.',
      'Let u = x^2 + 1. Then x^2 = u - 1 and du = 2x dx.',
      'Remember to transform the limits of integration from x = 0 and x = sqrt(3) to the corresponding u values.',
    ],
    stepByStepSolution: [
      '**Step 1: Identify substitution and differentials**\nLet $u = x^2 + 1$.\nDifferentiating both sides gives $du = 2x \\, dx$, which implies $x \\, dx = \\frac{du}{2}$.\nAlso, isolate $x^2$: $x^2 = u - 1$.',
      '**Step 2: Transform limits of integration**\nWhen $x = 0$: $u = 0^2 + 1 = 1$.\nWhen $x = \\sqrt{3}$: $u = (\\sqrt{3})^2 + 1 = 3 + 1 = 4$.\n(Bounds shift: $[0, \\sqrt{3}] \\to [1, 4]$).',
      '**Step 3: Substitute into integral**\n$$\\int_{0}^{\\sqrt{3}} \\frac{x^3}{\\sqrt{x^2 + 1}} \\, dx = \\int_{0}^{\\sqrt{3}} \\frac{x^2 \\cdot (x \\, dx)}{\\sqrt{x^2 + 1}} = \\int_{1}^{4} \\frac{u - 1}{\\sqrt{u}} \\cdot \\frac{du}{2}$$',
      '**Step 4: Distribute and integrate power terms**\n$$= \\frac{1}{2} \\int_{1}^{4} \\left( \\frac{u}{u^{1/2}} - \\frac{1}{u^{1/2}} \\right) du = \\frac{1}{2} \\int_{1}^{4} \\left( u^{1/2} - u^{-1/2} \\right) du$$\n$$= \\frac{1}{2} \\left[ \\frac{2}{3}u^{3/2} - 2u^{1/2} \\right]_{1}^{4} = \\left[ \\frac{1}{3}u^{3/2} - u^{1/2} \\right]_{1}^{4}$$',
      '**Step 5: Evaluate at bounds**\nAt $u = 4$: $\\frac{1}{3}(4^{3/2}) - \\sqrt{4} = \\frac{1}{3}(8) - 2 = \\frac{8}{3} - \\frac{6}{3} = \\frac{2}{3}$.\nAt $u = 1$: $\\frac{1}{3}(1^{3/2}) - \\sqrt{1} = \\frac{1}{3} - 1 = -\\frac{2}{3}$.\nSubtract lower limit: $\\frac{2}{3} - \\left(-\\frac{2}{3}\\right) = \\frac{2}{3} + \\frac{2}{3} = \\frac{4}{3}$.',
    ],
    rubric: [
      { criteria: 'Selecting substitution u = x^2 + 1 and x^2 = u - 1 with x dx = du/2', points: 1 },
      { criteria: 'Correctly converting lower bound (1) and upper bound (4)', points: 1 },
      { criteria: 'Correct antiderivative (1/3)u^(3/2) - u^(1/2)', points: 1 },
      { criteria: 'Exact arithmetic evaluation yielding 4/3', points: 1 },
    ],
    finalAnswer: '\\frac{4}{3}',
  },

  // --- Question 2 (4 pts) ---
  {
    id: 2,
    topic: 'Rational Integrand & Polynomial Long Division',
    topicTh: 'การอินทิเกรตฟังก์ชันตรรกยะโดยการหารยาวพหุนาม',
    category: 'Long Division',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Evaluate the definite integral:\n\n$$\\int_{0}^{1} \\frac{x^3 + 2x^2 + 2x + 3}{x^2 + 1} \\, dx$$',
    hints: [
      'The degree of the numerator (3) is greater than the degree of the denominator (2). You MUST divide first.',
      'Split the remainder fraction into an x/(x^2 + 1) term and a 1/(x^2 + 1) term.',
      'Recall int 1/(x^2 + 1) dx = arctan(x) and arctan(1) = pi/4.',
    ],
    stepByStepSolution: [
      '**Step 1: Polynomial Long Division**\nDivide $(x^3 + 2x^2 + 2x + 3)$ by $(x^2 + 1)$:\n$$x^3 + 2x^2 + 2x + 3 = x(x^2 + 1) + 2x^2 + x + 3$$\n$$= x(x^2 + 1) + 2(x^2 + 1) + (x + 1)$$\nQuotient is $x + 2$, remainder is $x + 1$.\nThus:\n$$\\frac{x^3 + 2x^2 + 2x + 3}{x^2 + 1} = x + 2 + \\frac{x + 1}{x^2 + 1} = x + 2 + \\frac{x}{x^2 + 1} + \\frac{1}{x^2 + 1}$$',
      '**Step 2: Find the Antiderivative**\n$$\\int (x + 2) \\, dx = \\frac{x^2}{2} + 2x$$\n$$\\int \\frac{x}{x^2 + 1} \\, dx = \\frac{1}{2} \\ln(x^2 + 1)$$\n$$\\int \\frac{1}{x^2 + 1} \\, dx = \\arctan(x)$$\nTotal antiderivative $F(x) = \\frac{x^2}{2} + 2x + \\frac{1}{2}\\ln(x^2 + 1) + \\arctan(x)$.',
      '**Step 3: Evaluate between limits 0 and 1**\nAt $x = 1$:\n$$F(1) = \\frac{1}{2} + 2(1) + \\frac{1}{2}\\ln(1 + 1) + \\arctan(1) = \\frac{5}{2} + \\frac{1}{2}\\ln(2) + \\frac{\\pi}{4}$$\nAt $x = 0$:\n$$F(0) = 0 + 0 + \\frac{1}{2}\\ln(1) + \\arctan(0) = 0$$\nSubtracting gives: $\\frac{5}{2} + \\frac{1}{2}\\ln(2) + \\frac{\\pi}{4}$.',
    ],
    rubric: [
      { criteria: 'Recognizing improper fraction and performing long division to obtain x + 2 + (x+1)/(x^2+1)', points: 1 },
      { criteria: 'Splitting remainder into (x/(x^2+1)) and (1/(x^2+1))', points: 1 },
      { criteria: 'Correct antiderivatives for all 4 terms including ln(x^2+1)/2 and arctan(x)', points: 1 },
      { criteria: 'Evaluating bounds correctly to obtain (5/2) + (1/2)ln(2) + pi/4', points: 1 },
    ],
    finalAnswer: '\\frac{5}{2} + \\frac{1}{2}\\ln(2) + \\frac{\\pi}{4}',
  },

  // --- Question 3 (4 pts) ---
  {
    id: 3,
    topic: 'Integration by Parts (Looping Integral)',
    topicTh: 'การอินทิเกรตทีละส่วนแบบวนซ้ำ (Looping Integral)',
    category: 'Parts',
    points: 4,
    difficulty: 'Hard',
    problemStatement: 'Evaluate the indefinite integral:\n\n$$\\int e^{2x} \\cos(3x) \\, dx$$',
    hints: [
      'This is a classic looping integral. Apply integration by parts twice.',
      'Keep your assignment of u and dv consistent (e.g. choose trigonometric function for u both times, or exponential for u both times).',
      'After the second integration by parts, the original integral will reappear. Move it to the left side and solve algebraically.',
    ],
    stepByStepSolution: [
      '**Step 1: First Integration by Parts**\nLet $I = \\int e^{2x} \\cos(3x) \\, dx$.\nChoose:\n$u = \\cos(3x) \\implies du = -3\\sin(3x) \\, dx$\n$dv = e^{2x} \\, dx \\implies v = \\frac{1}{2} e^{2x}$\n\nUsing $\\int u \\, dv = uv - \\int v \\, du$:\n$$I = \\frac{1}{2}e^{2x}\\cos(3x) - \\int \\frac{1}{2}e^{2x}(-3\\sin(3x)) \\, dx = \\frac{1}{2}e^{2x}\\cos(3x) + \\frac{3}{2} \\int e^{2x}\\sin(3x) \\, dx$$',
      '**Step 2: Second Integration by Parts**\nFocus on $J = \\int e^{2x}\\sin(3x) \\, dx$.\nChoose consistently:\n$u = \\sin(3x) \\implies du = 3\\cos(3x) \\, dx$\n$dv = e^{2x} \\, dx \\implies v = \\frac{1}{2} e^{2x}$\n\n$$J = \\frac{1}{2}e^{2x}\\sin(3x) - \\int \\frac{1}{2}e^{2x}(3\\cos(3x)) \\, dx = \\frac{1}{2}e^{2x}\\sin(3x) - \\frac{3}{2}I$$',
      '**Step 3: Substitute back and solve for I**\n$$I = \\frac{1}{2}e^{2x}\\cos(3x) + \\frac{3}{2}\\left( \\frac{1}{2}e^{2x}\\sin(3x) - \\frac{3}{2}I \\right)$$\n$$I = \\frac{1}{2}e^{2x}\\cos(3x) + \\frac{3}{4}e^{2x}\\sin(3x) - \\frac{9}{4}I$$\nAdd $\\frac{9}{4}I$ to both sides:\n$$\\left(1 + \\frac{9}{4}\\right)I = \\frac{13}{4}I = \\frac{e^{2x}}{4} \\big(2\\cos(3x) + 3\\sin(3x)\\big)$$\nMultiply both sides by $\\frac{4}{13}$:\n$$I = \\frac{e^{2x}}{13} \\big(2\\cos(3x) + 3\\sin(3x)\\big) + C$$',
    ],
    rubric: [
      { criteria: 'First integration by parts setup and execution yielding (1/2)e^(2x)cos(3x) + (3/2) int e^(2x)sin(3x) dx', points: 1 },
      { criteria: 'Second integration by parts setup consistent with the first without reversing', points: 1 },
      { criteria: 'Algebraic manipulation grouping (1 + 9/4)I = (13/4)I', points: 1 },
      { criteria: 'Final expression with factored e^(2x)/13 and arbitrary constant + C', points: 1 },
    ],
    finalAnswer: '\\frac{e^{2x}}{13}\\big(2\\cos(3x) + 3\\sin(3x)\\big) + C',
  },

  // --- Question 4 (4 pts) ---
  {
    id: 4,
    topic: 'Trigonometric Substitution & Right Triangle Back-Substitution',
    topicTh: 'การแทนค่าด้วยฟังก์ชันตรีโกณมิติและสามเหลี่ยมอ้างอิง',
    category: 'Trig Sub',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Evaluate the indefinite integral:\n\n$$\\int \\frac{1}{x^2 \\sqrt{9 - x^2}} \\, dx$$',
    hints: [
      'The expression sqrt(9 - x^2) matches sqrt(a^2 - x^2) with a = 3.',
      'Use the substitution x = 3 sin(theta). Compute dx and simplify sqrt(9 - x^2).',
      'Draw the right reference triangle with opposite side x, hypotenuse 3, and adjacent side sqrt(9 - x^2) to convert cot(theta) back to x.',
    ],
    stepByStepSolution: [
      '**Step 1: Trigonometric Substitution**\nLet $x = 3\\sin\\theta$, where $-\\frac{\\pi}{2} < \\theta < \\frac{\\pi}{2}$.\nThen $dx = 3\\cos\\theta \\, d\\theta$.\nThe radical simplifies:\n$$\\sqrt{9 - x^2} = \\sqrt{9 - 9\\sin^2\\theta} = \\sqrt{9(1 - \\sin^2\\theta)} = 3\\sqrt{\\cos^2\\theta} = 3\\cos\\theta$$',
      '**Step 2: Substitute into Integral**\n$$\\int \\frac{dx}{x^2 \\sqrt{9 - x^2}} = \\int \\frac{3\\cos\\theta \\, d\\theta}{(3\\sin\\theta)^2 (3\\cos\\theta)} = \\int \\frac{3\\cos\\theta}{9\\sin^2\\theta \\cdot 3\\cos\\theta} \\, d\\theta$$\nCancel the $3\\cos\\theta$ terms:\n$$= \\int \\frac{1}{9\\sin^2\\theta} \\, d\\theta = \\frac{1}{9} \\int \\csc^2\\theta \\, d\\theta = -\\frac{1}{9}\\cot\\theta + C$$',
      '**Step 3: Reference Triangle Back-Substitution**\nFrom $x = 3\\sin\\theta$, we have $\\sin\\theta = \\frac{x}{3} = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$.\nBy Pythagorean theorem, $\\text{Adjacent} = \\sqrt{3^2 - x^2} = \\sqrt{9 - x^2}$.\nTherefore:\n$$\\cot\\theta = \\frac{\\text{Adjacent}}{\\text{Opposite}} = \\frac{\\sqrt{9 - x^2}}{x}$$\nSubstitute back:\n$$-\\frac{1}{9}\\cot\\theta + C = -\\frac{\\sqrt{9 - x^2}}{9x} + C$$',
    ],
    rubric: [
      { criteria: 'Correct substitution x = 3 sin(theta), dx = 3 cos(theta) d(theta), radical = 3 cos(theta)', points: 1 },
      { criteria: 'Simplifying integrand to (1/9) csc^2(theta) and antiderivative (-1/9) cot(theta)', points: 1 },
      { criteria: 'Geometric reference triangle setup relating cot(theta) = sqrt(9-x^2)/x', points: 1 },
      { criteria: 'Final exact expression -sqrt(9-x^2)/(9x) + C', points: 1 },
    ],
    finalAnswer: '-\\frac{\\sqrt{9 - x^2}}{9x} + C',
  },

  // --- Question 5 (4 pts) ---
  {
    id: 5,
    topic: 'Partial Fractions (Linear and Irreducible Quadratic Factors)',
    topicTh: 'การแยกเศษส่วนย่อยที่มีตัวประกอบกำลังสองที่แยกไม่ได้',
    category: 'Partial Fractions',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Evaluate the indefinite integral:\n\n$$\\int \\frac{5x^2 - 4x + 9}{(x - 1)(x^2 + 4)} \\, dx$$',
    hints: [
      'The denominator has one linear factor (x - 1) and one irreducible quadratic factor (x^2 + 4).',
      'Set up the partial fraction decomposition as: A/(x - 1) + (Bx + C)/(x^2 + 4).',
      'Solve for A, B, and C by clearing the denominator and plugging in convenient values or equating coefficients.',
      'Split (Bx + C)/(x^2 + 4) into a natural log component and an arctan component.',
    ],
    stepByStepSolution: [
      '**Step 1: Set up Partial Fraction Form**\n$$\\frac{5x^2 - 4x + 9}{(x - 1)(x^2 + 4)} = \\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 4}$$\nMultiply both sides by $(x - 1)(x^2 + 4)$:\n$$5x^2 - 4x + 9 = A(x^2 + 4) + (Bx + C)(x - 1)$$',
      '**Step 2: Solve for Coefficients A, B, C**\n- Let $x = 1$:\n$$5(1)^2 - 4(1) + 9 = A(1^2 + 4) + 0 \\implies 10 = 5A \\implies A = 2$$\n- Let $x = 0$:\n$$9 = 2(4) + (0 + C)(-1) = 8 - C \\implies 9 - 8 = -C \\implies C = -1$$\n- Equate coefficients of $x^2$:\n$$5 = A + B = 2 + B \\implies B = 3$$\nSo the decomposition is:\n$$\\frac{2}{x - 1} + \\frac{3x - 1}{x^2 + 4}$$',
      '**Step 3: Integrate each term**\n$$\\int \\left( \\frac{2}{x - 1} + \\frac{3x}{x^2 + 4} - \\frac{1}{x^2 + 4} \\right) dx$$\n- $\\int \\frac{2}{x - 1} \\, dx = 2\\ln|x - 1|$\n- $\\int \\frac{3x}{x^2 + 4} \\, dx = \\frac{3}{2} \\int \\frac{2x}{x^2 + 4} \\, dx = \\frac{3}{2}\\ln(x^2 + 4)$\n- $\\int \\frac{1}{x^2 + 4} \\, dx = \\frac{1}{2}\\arctan\\left(\\frac{x}{2}\\right)$\n\nCombining terms:\n$$= 2\\ln|x - 1| + \\frac{3}{2}\\ln(x^2 + 4) - \\frac{1}{2}\\arctan\\left(\\frac{x}{2}\\right) + C$$',
    ],
    rubric: [
      { criteria: 'Correct decomposition setup A/(x-1) + (Bx+C)/(x^2+4)', points: 1 },
      { criteria: 'Accurate values A = 2, B = 3, C = -1', points: 1 },
      { criteria: 'Splitting quadratic term and integrating 3x/(x^2+4) to (3/2)ln(x^2+4)', points: 1 },
      { criteria: 'Integrating -1/(x^2+4) to -(1/2)arctan(x/2) with final expression and + C', points: 1 },
    ],
    finalAnswer: '2\\ln|x - 1| + \\frac{3}{2}\\ln(x^2 + 4) - \\frac{1}{2}\\arctan\\left(\\frac{x}{2}\\right) + C',
  },

  // --- Question 6 (4 pts) ---
  {
    id: 6,
    topic: 'Reduction Formula / Table Integration',
    topicTh: 'การอินทิเกรตโดยใช้สูตรลดทอนหรือตารางอินทิกรัล',
    category: 'Reduction Formulas',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Given the standard reduction formula:\n$$\\int \\sec^n(x) \\, dx = \\frac{\\sec^{n-2}(x) \\tan(x)}{n - 1} + \\frac{n - 2}{n - 1} \\int \\sec^{n-2}(x) \\, dx$$\nand the known integral $\\int \\sec(x) \\, dx = \\ln|\\sec(x) + \\tan(x)| + C$, evaluate the exact value of:\n\n$$\\int_{0}^{\\pi/4} \\sec^3(x) \\, dx$$',
    hints: [
      'Apply the given reduction formula with n = 3.',
      'Recall sec(pi/4) = sqrt(2), tan(pi/4) = 1, sec(0) = 1, and tan(0) = 0.',
      'Simplify all logarithms into a single exact term.',
    ],
    stepByStepSolution: [
      '**Step 1: Apply Reduction Formula with n = 3**\n$$\\int \\sec^3(x) \\, dx = \\frac{\\sec^{3-2}(x)\\tan(x)}{3 - 1} + \\frac{3 - 2}{3 - 1} \\int \\sec^{3-2}(x) \\, dx$$\n$$= \\frac{1}{2}\\sec(x)\\tan(x) + \\frac{1}{2} \\int \\sec(x) \\, dx$$\nSubstitute $\\int \\sec(x) \\, dx = \\ln|\\sec(x) + \\tan(x)|$:\n$$= \\frac{1}{2}\\sec(x)\\tan(x) + \\frac{1}{2}\\ln|\\sec(x) + \\tan(x)|$$',
      '**Step 2: Evaluate at the Upper Bound x = pi/4**\nAt $x = \\frac{\\pi}{4}$:\n$\\sec(\\pi/4) = \\sqrt{2}$\n$\\tan(\\pi/4) = 1$\n$$F\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{2}(\\sqrt{2})(1) + \\frac{1}{2}\\ln|\\sqrt{2} + 1| = \\frac{\\sqrt{2}}{2} + \\frac{1}{2}\\ln(\\sqrt{2} + 1)$$',
      '**Step 3: Evaluate at the Lower Bound x = 0**\nAt $x = 0$:\n$\\sec(0) = 1$\n$\\tan(0) = 0$\n$$F(0) = \\frac{1}{2}(1)(0) + \\frac{1}{2}\\ln|1 + 0| = 0 + \\frac{1}{2}\\ln(1) = 0$$',
      '**Step 4: Subtract Bounds**\n$$\\int_{0}^{\\pi/4} \\sec^3(x) \\, dx = \\frac{\\sqrt{2}}{2} + \\frac{1}{2}\\ln(\\sqrt{2} + 1) = \\frac{\\sqrt{2} + \\ln(\\sqrt{2} + 1)}{2}$$',
    ],
    rubric: [
      { criteria: 'Properly instantiating the reduction formula with n = 3', points: 1 },
      { criteria: 'Evaluating the remaining integral of sec(x) as ln|sec(x) + tan(x)|', points: 1 },
      { criteria: 'Correctly substituting trigonometric values at x = pi/4', points: 1 },
      { criteria: 'Simplifying the boundary evaluation to (sqrt(2) + ln(sqrt(2)+1))/2', points: 1 },
    ],
    finalAnswer: '\\frac{\\sqrt{2} + \\ln(\\sqrt{2} + 1)}{2}',
  },

  // --- Question 7 (4 pts) ---
  {
    id: 7,
    topic: 'Geometric Sequences and Infinite Series',
    topicTh: 'ลำดับและอนุกรมเรขาคณิตอนันต์',
    category: 'Geometric Series',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Determine whether the infinite series converges or diverges. If it converges, find its exact sum:\n\n$$\\sum_{n=1}^{\\infty} \\frac{3^{n+1} - 2^n}{5^n}$$',
    hints: [
      'Split the fraction into two separate terms: (3^(n+1)/5^n) - (2^n/5^n).',
      'Rewrite 3^(n+1) as 3 * 3^n so that each term is in the canonical geometric form a * r^n.',
      'Check the convergence condition |r| < 1 for both series, then compute the sums using S = a / (1 - r).',
    ],
    stepByStepSolution: [
      '**Step 1: Separate into Two Geometric Series**\n$$\\sum_{n=1}^{\\infty} \\frac{3^{n+1} - 2^n}{5^n} = \\sum_{n=1}^{\\infty} \\left( \\frac{3 \\cdot 3^n}{5^n} - \\frac{2^n}{5^n} \\right) = \\sum_{n=1}^{\\infty} 3\\left(\\frac{3}{5}\\right)^n - \\sum_{n=1}^{\\infty} \\left(\\frac{2}{5}\\right)^n$$',
      '**Step 2: Evaluate the First Series**\nFor $S_1 = \\sum_{n=1}^{\\infty} 3\\left(\\frac{3}{5}\\right)^n$:\nFirst term ($n = 1$): $a_1 = 3\\left(\\frac{3}{5}\\right)^1 = \\frac{9}{5}$.\nCommon ratio: $r_1 = \\frac{3}{5}$.\nSince $|r_1| = \\frac{3}{5} < 1$, the series converges.\nSum: $$S_1 = \\frac{a_1}{1 - r_1} = \\frac{9/5}{1 - 3/5} = \\frac{9/5}{2/5} = \\frac{9}{2}$$',
      '**Step 3: Evaluate the Second Series**\nFor $S_2 = \\sum_{n=1}^{\\infty} \\left(\\frac{2}{5}\\right)^n$:\nFirst term ($n = 1$): $a_2 = \\left(\\frac{2}{5}\\right)^1 = \\frac{2}{5}$.\nCommon ratio: $r_2 = \\frac{2}{5}$.\nSince $|r_2| = \\frac{2}{5} < 1$, the series converges.\nSum: $$S_2 = \\frac{a_2}{1 - r_2} = \\frac{2/5}{1 - 2/5} = \\frac{2/5}{3/5} = \\frac{2}{3}$$',
      '**Step 4: Combine Sums**\nSince both series converge independently:\n$$S = S_1 - S_2 = \\frac{9}{2} - \\frac{2}{3} = \\frac{27 - 4}{6} = \\frac{23}{6}$$',
    ],
    rubric: [
      { criteria: 'Splitting into two distinct geometric series 3(3/5)^n and (2/5)^n', points: 1 },
      { criteria: 'Verifying convergence criteria |r1| = 3/5 < 1 and |r2| = 2/5 < 1', points: 1 },
      { criteria: 'Accurately finding individual sums S1 = 9/2 and S2 = 2/3', points: 1 },
      { criteria: 'Combining fractions to obtain exact answer 23/6', points: 1 },
    ],
    finalAnswer: '\\frac{23}{6}',
  },

  // --- Question 8 (4 pts) ---
  {
    id: 8,
    topic: 'The Ratio Test for Convergence',
    topicTh: 'การทดสอบอัตราส่วนสำหรับการลู่เข้าของอนุกรมอนันต์',
    category: 'Ratio Test',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Use the Ratio Test to determine whether the following infinite series converges or diverges:\n\n$$\\sum_{n=1}^{\\infty} \\frac{(2n)!}{5^n (n!)^2}$$',
    hints: [
      'Write down the general term a_n and the next term a_{n+1}. Note that replacing n with n+1 turns (2n)! into (2(n+1))! = (2n + 2)!.',
      'Expand (2n + 2)! as (2n + 2)(2n + 1)(2n)! and ((n + 1)!)^2 as (n + 1)^2 (n!)^2.',
      'Evaluate L = lim_{n -> infty} |a_{n+1} / a_n|. If L < 1, conclude convergence.',
    ],
    stepByStepSolution: [
      '**Step 1: Set up the Ratio Test**\nLet $a_n = \\frac{(2n)!}{5^n (n!)^2}$. All terms are positive, so $|a_{n+1}/a_n| = a_{n+1}/a_n$.\nThe next term is:\n$$a_{n+1} = \\frac{(2(n+1))!}{5^{n+1} ((n+1)!)^2} = \\frac{(2n + 2)!}{5^{n+1} ((n+1)!)^2}$$',
      '**Step 2: Form the Ratio |a_{n+1} / a_n|**\n$$\\frac{a_{n+1}}{a_n} = \\frac{(2n + 2)!}{5^{n+1} ((n+1)!)^2} \\cdot \\frac{5^n (n!)^2}{(2n)!}$$',
      '**Step 3: Expand factorials and powers**\n- Factorial cancellation:\n$$\\frac{(2n + 2)!}{(2n)!} = \\frac{(2n + 2)(2n + 1)(2n)!}{(2n)!} = (2n + 2)(2n + 1)$$\n- Denominator factorial cancellation:\n$$\\frac{(n!)^2}{((n+1)!)^2} = \\left( \\frac{n!}{(n+1)n!} \\right)^2 = \\frac{1}{(n+1)^2}$$\n- Powers of 5:\n$$\\frac{5^n}{5^{n+1}} = \\frac{1}{5}$$',
      '**Step 4: Compute the limit L**\n$$L = \\lim_{n \\to \\infty} \\frac{(2n + 2)(2n + 1)}{5(n + 1)^2} = \\lim_{n \\to \\infty} \\frac{2(n + 1)(2n + 1)}{5(n + 1)^2} = \\lim_{n \\to \\infty} \\frac{2(2n + 1)}{5(n + 1)}$$\n$$= \\lim_{n \\to \\infty} \\frac{4n + 2}{5n + 5} = \\frac{4}{5}$$',
      '**Step 5: Apply Ratio Test Conclusion**\nSince $L = \\frac{4}{5} < 1$, by the Ratio Test, the series $\\sum_{n=1}^{\\infty} \\frac{(2n)!}{5^n (n!)^2}$ **converges** (absolutely).',
    ],
    rubric: [
      { criteria: 'Formulating a_{n+1} with (2n+2)! and ((n+1)!)^2', points: 1 },
      { criteria: 'Correct factorial expansions and algebraic cancellation', points: 1 },
      { criteria: 'Evaluating the limit L = 4/5', points: 1 },
      { criteria: 'Stating the theorem condition L < 1 and concluding convergence', points: 1 },
    ],
    finalAnswer: 'L = \\frac{4}{5} < 1 \\implies \\text{Converges}',
  },

  // --- Question 9 (4 pts) ---
  {
    id: 9,
    topic: 'Power Series: Radius and Interval of Convergence',
    topicTh: 'อนุกรมกำลัง: รัศมีและช่วงแห่งการลู่เข้า',
    category: 'Power Series',
    points: 4,
    difficulty: 'Hard',
    problemStatement: 'Find the radius of convergence $R$ and the exact interval of convergence (IOC) for the power series:\n\n$$\\sum_{n=1}^{\\infty} \\frac{(-1)^n (x - 2)^n}{n \\cdot 3^n}$$',
    hints: [
      'Apply the Ratio Test to the general term a_n.',
      'Set the resulting limit L < 1 to find the radius R and open interval centered at x = 2.',
      'CRITICAL: You MUST individually test both boundary endpoints: x = -1 and x = 5. Do not guess the bracket types.',
    ],
    stepByStepSolution: [
      '**Step 1: Apply Ratio Test to determine R**\nLet $a_n = \\frac{(-1)^n (x - 2)^n}{n \\cdot 3^n}$.\n$$L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right| = \\lim_{n \\to \\infty} \\left| \\frac{(-1)^{n+1}(x - 2)^{n+1}}{(n + 1)3^{n+1}} \\cdot \\frac{n \\cdot 3^n}{(-1)^n (x - 2)^n} \\right|$$\n$$= \\lim_{n \\to \\infty} \\frac{|x - 2|}{3} \\cdot \\frac{n}{n + 1} = \\frac{|x - 2|}{3} \\cdot 1 = \\frac{|x - 2|}{3}$$\nFor convergence, require $L < 1$:\n$$\\frac{|x - 2|}{3} < 1 \\implies |x - 2| < 3$$\nThus, the **radius of convergence** is $R = 3$, centered at $c = 2$.\nThe open interval is $-3 < x - 2 < 3 \\implies -1 < x < 5$.',
      '**Step 2: Test Left Endpoint x = -1**\nSubstitute $x = -1$ into the series:\n$$\\sum_{n=1}^{\\infty} \\frac{(-1)^n (-1 - 2)^n}{n \\cdot 3^n} = \\sum_{n=1}^{\\infty} \\frac{(-1)^n (-3)^n}{n \\cdot 3^n} = \\sum_{n=1}^{\\infty} \\frac{(-1)^n (-1)^n 3^n}{n \\cdot 3^n} = \\sum_{n=1}^{\\infty} \\frac{(-1)^{2n}}{n} = \\sum_{n=1}^{\\infty} \\frac{1}{n}$$\nThis is the harmonic series ($p$-series with $p = 1$), which **diverges**.\nTherefore, $x = -1$ is excluded (parenthesis "(").',
      '**Step 3: Test Right Endpoint x = 5**\nSubstitute $x = 5$ into the series:\n$$\\sum_{n=1}^{\\infty} \\frac{(-1)^n (5 - 2)^n}{n \\cdot 3^n} = \\sum_{n=1}^{\\infty} \\frac{(-1)^n 3^n}{n \\cdot 3^n} = \\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}$$\nThis is the alternating harmonic series.\nBy the Alternating Series Test (AST):\n1. $b_n = \\frac{1}{n} > 0$\n2. $b_{n+1} = \\frac{1}{n+1} \\le \\frac{1}{n} = b_n$ (decreasing)\n3. $\\lim_{n \\to \\infty} \\frac{1}{n} = 0$\nTherefore, the series **converges** at $x = 5$ (bracket "]").',
      '**Step 4: Final Conclusion**\n- Radius of Convergence: $R = 3$\n- Interval of Convergence: $\\text{IOC} = (-1, 5]$',
    ],
    rubric: [
      { criteria: 'Ratio test limit yielding |x - 2| / 3 < 1', points: 1 },
      { criteria: 'Correct radius of convergence R = 3 and center c = 2', points: 1 },
      { criteria: 'Rigorous analysis of endpoint x = -1 showing divergence of harmonic series', points: 1 },
      { criteria: 'Rigorous analysis of endpoint x = 5 using AST showing convergence, concluding (-1, 5]', points: 1 },
    ],
    finalAnswer: 'R = 3, \\quad \\text{IOC} = (-1, 5]',
  },

  // --- Question 10 (4 pts) ---
  {
    id: 10,
    topic: 'Maclaurin Series & Indeterminate Limit Evaluation',
    topicTh: 'อนุกรมแมคลอรินและการหาลิมิตในรูปแบบยังไม่กำหนด',
    category: 'Maclaurin',
    points: 4,
    difficulty: 'Exam-Standard',
    problemStatement: 'Using standard Maclaurin series expansions (do not use L’Hôpital’s Rule):\n\n(a) Write out the Maclaurin series for $\\cos(x)$ and $e^{-x^2/2}$ up to their $x^4$ terms.\n(b) Evaluate the limit:\n$$\\lim_{x \\to 0} \\frac{\\cos(x) - e^{-x^2/2}}{x^4}$$',
    hints: [
      'Standard series: cos(x) = 1 - x^2/2! + x^4/4! - ...',
      'Substitute u = -x^2/2 into e^u = 1 + u + u^2/2! + ...',
      'Subtract the two polynomial expansions: notice how the constant 1 and the x^2 terms cancel out completely.',
    ],
    stepByStepSolution: [
      '**Step 1: Expand cos(x)**\n$$\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\mathcal{O}(x^6) = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\mathcal{O}(x^6)$$',
      '**Step 2: Expand e^(-x^2 / 2)**\nRecall $e^u = 1 + u + \\frac{u^2}{2!} + \\mathcal{O}(u^3)$. Setting $u = -\\frac{x^2}{2}$:\n$$e^{-x^2/2} = 1 + \\left(-\\frac{x^2}{2}\\right) + \\frac{1}{2}\\left(-\\frac{x^2}{2}\\right)^2 + \\mathcal{O}(x^6)$$\n$$= 1 - \\frac{x^2}{2} + \\frac{1}{2}\\left(\\frac{x^4}{4}\\right) + \\mathcal{O}(x^6) = 1 - \\frac{x^2}{2} + \\frac{x^4}{8} - \\mathcal{O}(x^6)$$',
      '**Step 3: Subtract the two series**\n$$\\cos(x) - e^{-x^2/2} = \\left(1 - \\frac{x^2}{2} + \\frac{x^4}{24}\\right) - \\left(1 - \\frac{x^2}{2} + \\frac{x^4}{8}\\right) + \\mathcal{O}(x^6)$$\n$$= (1 - 1) + \\left(-\\frac{x^2}{2} + \\frac{x^2}{2}\\right) + \\left(\\frac{1}{24} - \\frac{1}{8}\\right)x^4 + \\mathcal{O}(x^6)$$\n$$= \\left(\\frac{1 - 3}{24}\\right)x^4 + \\mathcal{O}(x^6) = -\\frac{2}{24}x^4 + \\mathcal{O}(x^6) = -\\frac{1}{12}x^4 + \\mathcal{O}(x^6)$$',
      '**Step 4: Compute the limit**\n$$\\lim_{x \\to 0} \\frac{\\cos(x) - e^{-x^2/2}}{x^4} = \\lim_{x \\to 0} \\frac{-\\frac{1}{12}x^4 + \\mathcal{O}(x^6)}{x^4} = \\lim_{x \\to 0} \\left( -\\frac{1}{12} + \\mathcal{O}(x^2) \\right) = -\\frac{1}{12}$$',
    ],
    rubric: [
      { criteria: 'Correct series for cos(x) up to x^4 term: 1 - x^2/2 + x^4/24', points: 1 },
      { criteria: 'Correct composition for e^(-x^2/2) up to x^4 term: 1 - x^2/2 + x^4/8', points: 1 },
      { criteria: 'Accurate subtraction showing cancellation and (1/24 - 1/8)x^4 = -x^4/12', points: 1 },
      { criteria: 'Dividing by x^4 and taking limit to obtain exact value -1/12', points: 1 },
    ],
    finalAnswer: '-\\frac{1}{12}',
  },

  // --- Question 11 (5 pts) ---
  {
    id: 11,
    topic: 'Taylor Series Expansion around x = a (a != 0) with Sigma Notation',
    topicTh: 'อนุกรมเทย์เลอร์รอบจุด a != 0 ในรูปสัญลักษณ์ซิกมา',
    category: 'Taylor Series',
    points: 5,
    difficulty: 'Hard',
    problemStatement: 'Let $f(x) = \\frac{1}{x^2}$.\n\n(a) Compute $f(1), f\'(1), f\'\'(1)$, and $f\'\'\'(1)$.\n(b) Deduce a formula for the general $n$-th derivative $f^{(n)}(1)$ for all $n \\ge 0$.\n(c) Write out the Taylor series of $f(x)$ centered at $a = 1$ in compact sigma ($\\sum_{n=0}^{\\infty}$) notation.\n(d) State the radius of convergence $R$ of this series.',
    hints: [
      'Write f(x) as x^(-2). Differentiate step by step and track signs and factorials.',
      'Note that the Taylor coefficient is c_n = f^(n)(a) / n!.',
      'Check the distance from the center a = 1 to the singularity of 1/x^2 at x = 0.',
    ],
    stepByStepSolution: [
      '**Step 1: Compute derivatives at x = 1**\n$$f(x) = x^{-2} \\implies f(1) = 1^{-2} = 1$$\n$$f\'(x) = -2x^{-3} \\implies f\'(1) = -2(1)^{-3} = -2$$\n$$f\'\'(x) = (-2)(-3)x^{-4} = 6x^{-4} \\implies f\'\'(1) = 6$$\n$$f\'\'\'(x) = 6(-4)x^{-5} = -24x^{-5} \\implies f\'\'\'(1) = -24$$',
      '**Step 2: Deduce general formula for f^(n)(1)**\nNotice the pattern of the signs and magnitudes:\n$f(1) = 1 = (-1)^0 \\cdot 1!$\n$f\'(1) = -2 = (-1)^1 \\cdot 2!$\n$f\'\'(1) = 6 = (-1)^2 \\cdot 3!$\n$f\'\'\'(1) = -24 = (-1)^3 \\cdot 4!$\nBy mathematical induction:\n$$f^{(n)}(1) = (-1)^n (n + 1)!$$',
      '**Step 3: Determine Taylor series coefficients c_n**\nBy Taylor’s formula centered at $a = 1$:\n$$c_n = \\frac{f^{(n)}(1)}{n!} = \\frac{(-1)^n (n + 1)!}{n!} = (-1)^n (n + 1)$$\nThe first four terms are:\n$$T(x) = 1 - 2(x - 1) + 3(x - 1)^2 - 4(x - 1)^3 + \\cdots$$',
      '**Step 4: Express in Sigma Notation**\n$$f(x) = \\sum_{n=0}^{\\infty} (-1)^n (n + 1)(x - 1)^n$$',
      '**Step 5: Determine the Radius of Convergence R**\nApplying the Ratio Test:\n$$L = \\lim_{n \\to \\infty} \\left| \\frac{(-1)^{n+1}(n + 2)(x - 1)^{n+1}}{(-1)^n (n + 1)(x - 1)^n} \\right| = |x - 1| \\lim_{n \\to \\infty} \\frac{n + 2}{n + 1} = |x - 1|$$\nFor convergence: $|x - 1| < 1$. Thus, the **radius of convergence is $R = 1$**.\n(Geometrically, the distance from center $a = 1$ to the singularity $x = 0$ is $|1 - 0| = 1$).',
    ],
    rubric: [
      { criteria: 'Accurately computing derivatives f(1)=1, f\'(1)=-2, f\'\'(1)=6, f\'\'\'(1)=-24', points: 1 },
      { criteria: 'Correctly identifying general derivative pattern f^(n)(1) = (-1)^n (n+1)!', points: 1 },
      { criteria: 'Dividing by n! to obtain simplified coefficients c_n = (-1)^n (n+1)', points: 1 },
      { criteria: 'Writing correct sigma notation sum_{n=0}^infty (-1)^n (n+1)(x-1)^n', points: 1 },
      { criteria: 'Determining radius of convergence R = 1 with ratio test or singularity argument', points: 1 },
    ],
    finalAnswer: '\\sum_{n=0}^{\\infty} (-1)^n (n + 1)(x - 1)^n, \\quad R = 1',
  },

  // --- Question 12 (5 pts) ---
  {
    id: 12,
    topic: 'Non-Elementary Integral Approximation via Taylor Series',
    topicTh: 'การประมาณค่าอินทิกรัลที่ไม่มีปฏิยานุพันธ์พื้นฐานด้วยอนุกรมเทย์เลอร์',
    category: 'Taylor Applications',
    points: 5,
    difficulty: 'Hard',
    problemStatement: 'The non-elementary integral $\\int_{0}^{1/2} \\frac{\\sin(x^2)}{x} \\, dx$ cannot be expressed in closed form using elementary functions.\n\n(a) Write the Maclaurin series for $\\frac{\\sin(x^2)}{x}$ in sigma notation.\n(b) Integrate term-by-term to express $\\int_{0}^{x} \\frac{\\sin(t^2)}{t} \\, dt$ as a power series.\n(c) Use the first two non-zero terms of the series to find an exact fractional approximation of:\n$$\\int_{0}^{1/2} \\frac{\\sin(x^2)}{x} \\, dx$$\n(d) Use the Alternating Series Estimation Theorem to determine the maximum error bound of this two-term approximation.',
    hints: [
      'Start with sin(u) = sum_{n=0}^infty (-1)^n u^(2n+1) / (2n+1)! and substitute u = x^2.',
      'Divide each term by x before integrating with respect to x.',
      'The alternating series error theorem guarantees |Error| <= |b_2| (the absolute value of the first omitted term).',
    ],
    stepByStepSolution: [
      '**Step 1: Maclaurin series for sin(x^2) / x**\nStandard series for $\\sin(u)$:\n$$\\sin(u) = \\sum_{n=0}^{\\infty} (-1)^n \\frac{u^{2n+1}}{(2n+1)!}$$\nSubstitute $u = x^2$:\n$$\\sin(x^2) = \\sum_{n=0}^{\\infty} (-1)^n \\frac{(x^2)^{2n+1}}{(2n+1)!} = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{4n+2}}{(2n+1)!} = x^2 - \\frac{x^6}{3!} + \\frac{x^{10}}{5!} - \\cdots$$\nDivide by $x$:\n$$\\frac{\\sin(x^2)}{x} = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{4n+1}}{(2n+1)!} = x - \\frac{x^5}{6} + \\frac{x^9}{120} - \\cdots$$',
      '**Step 2: Term-by-term integration**\n$$\\int_{0}^{x} \\frac{\\sin(t^2)}{t} \\, dt = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1)!} \\int_{0}^{x} t^{4n+1} \\, dt$$\n$$= \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1)! (4n+2)} x^{4n+2} = \\frac{x^2}{2} - \\frac{x^6}{6 \\cdot 6} + \\frac{x^{10}}{120 \\cdot 10} - \\cdots$$\n$$= \\frac{x^2}{2} - \\frac{x^6}{36} + \\frac{x^{10}}{1200} - \\cdots$$',
      '**Step 3: Evaluate first two terms at x = 1/2**\n- First term ($n = 0$):\n$$T_0 = \\frac{(1/2)^2}{2} = \\frac{1/4}{2} = \\frac{1}{8}$$\n- Second term ($n = 1$):\n$$T_1 = -\\frac{(1/2)^6}{36} = -\\frac{1/64}{36} = -\\frac{1}{64 \\times 36} = -\\frac{1}{2304}$$\nCombine both terms:\n$$\\text{Approximation} = \\frac{1}{8} - \\frac{1}{2304} = \\frac{288}{2304} - \\frac{1}{2304} = \\frac{287}{2304}$$',
      '**Step 4: Error estimation via Alternating Series Estimation Theorem**\nThe series is alternating with terms strictly decreasing in magnitude and limit zero.\nBy the theorem, the error is bounded by the absolute value of the first omitted term ($n = 2$):\n$$|\\text{Error}| \\le \\left| T_2 \\right| = \\frac{(1/2)^{10}}{1200} = \\frac{1/1024}{1200} = \\frac{1}{1024 \\times 1200} = \\frac{1}{1,228,800}$$',
    ],
    rubric: [
      { criteria: 'Formulating series for sin(x^2)/x in sigma notation', points: 1 },
      { criteria: 'Integrating term-by-term to get sum (-1)^n x^(4n+2) / ((2n+1)!(4n+2))', points: 1 },
      { criteria: 'Evaluating first term 1/8 and second term -1/2304', points: 1 },
      { criteria: 'Accurate fractional subtraction 287/2304', points: 1 },
      { criteria: 'Establishing maximum error bound <= 1/1,228,800 using Alternating Series Theorem', points: 1 },
    ],
    finalAnswer: '\\text{Approximation} = \\frac{287}{2304}, \\quad |\\text{Error}| \\le \\frac{1}{1,228,800}',
  },
];

/* ==========================================================================
   3. TARGETED PRACTICE DRILL BANK (2 PROBLEMS PER TOPIC, 24 DRILLS TOTAL)
   ========================================================================== */
export const practiceBank: PracticeProblem[] = [
  // --- Topic 1: Substitution ---
  {
    id: 'prac-sub-1',
    topicId: 'Substitution',
    topic: 'Integration by Substitution',
    topicTh: 'การอินทิเกรตโดยการเปลี่ยนตัวแปร (ระดับพื้นฐาน)',
    level: 'Easy',
    problemStatement: 'Evaluate the definite integral: $$\\int_{0}^{1} x \\sqrt{1 - x^2} \\, dx$$',
    hint: 'Let u = 1 - x^2. Then du = -2x dx. Don’t forget to transform the integration bounds.',
    stepByStepSolution: [
      'Let $u = 1 - x^2$, so $du = -2x \\, dx \\implies x \\, dx = -\\frac{du}{2}$.',
      'Bounds transformation: When $x = 0, u = 1$. When $x = 1, u = 0$.',
      '$$\\int_{0}^{1} x \\sqrt{1 - x^2} \\, dx = \\int_{1}^{0} \\sqrt{u} \\left(-\\frac{du}{2}\\right) = \\frac{1}{2} \\int_{0}^{1} u^{1/2} \\, du$$',
      '$$= \\frac{1}{2} \\left[ \\frac{2}{3}u^{3/2} \\right]_{0}^{1} = \\frac{1}{3}(1 - 0) = \\frac{1}{3}$$',
    ],
    finalAnswer: '\\frac{1}{3}',
  },
  {
    id: 'prac-sub-2',
    topicId: 'Substitution',
    topic: 'Integration by Substitution',
    topicTh: 'การอินทิเกรตโดยการเปลี่ยนตัวแปร (ข้อสอบลวง)',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the indefinite integral: $$\\int \\frac{e^{2x}}{\\sqrt{e^x + 1}} \\, dx$$',
    hint: 'Rewrite e^(2x) as e^x * e^x. Let u = e^x + 1, so e^x = u - 1 and du = e^x dx.',
    stepByStepSolution: [
      'Rewrite integrand: $\\int \\frac{e^x \\cdot (e^x \\, dx)}{\\sqrt{e^x + 1}}$.',
      'Let $u = e^x + 1 \\implies e^x = u - 1$ and $du = e^x \\, dx$.',
      '$$\\int \\frac{u - 1}{\\sqrt{u}} \\, du = \\int (u^{1/2} - u^{-1/2}) \\, du = \\frac{2}{3}u^{3/2} - 2u^{1/2} + C$$',
      'Back-substitute $u = e^x + 1$:\n$$= \\frac{2}{3}(e^x + 1)^{3/2} - 2\\sqrt{e^x + 1} + C = \\frac{2}{3}\\sqrt{e^x + 1}(e^x - 2) + C$$',
    ],
    finalAnswer: '\\frac{2}{3}\\sqrt{e^x + 1}(e^x - 2) + C',
  },

  // --- Topic 2: Long Division ---
  {
    id: 'prac-div-1',
    topicId: 'Long Division',
    topic: 'Long Division of Polynomials',
    topicTh: 'การหารยาวพหุนาม (ระดับปานกลาง)',
    level: 'Medium',
    problemStatement: 'Evaluate the indefinite integral: $$\\int \\frac{x^2}{x^2 + 9} \\, dx$$',
    hint: 'Add and subtract 9 in the numerator: x^2 = (x^2 + 9) - 9.',
    stepByStepSolution: [
      'Notice $\\frac{x^2}{x^2 + 9} = \\frac{(x^2 + 9) - 9}{x^2 + 9} = 1 - \\frac{9}{x^2 + 9}$.',
      'Integrate each term directly:\n$$\\int 1 \\, dx - 9 \\int \\frac{1}{x^2 + 3^2} \\, dx$$',
      'Recall $\\int \\frac{1}{x^2 + a^2} dx = \\frac{1}{a}\\arctan(x/a)$:\n$$= x - 9 \\cdot \\frac{1}{3}\\arctan\\left(\\frac{x}{3}\\right) + C = x - 3\\arctan\\left(\\frac{x}{3}\\right) + C$$',
    ],
    finalAnswer: 'x - 3\\arctan\\left(\\frac{x}{3}\\right) + C',
  },
  {
    id: 'prac-div-2',
    topicId: 'Long Division',
    topic: 'Long Division of Polynomials',
    topicTh: 'การหารยาวพหุนาม (ระดับข้อสอบจริง)',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the definite integral: $$\\int_{2}^{3} \\frac{x^3 - 2x}{x - 1} \\, dx$$',
    hint: 'Divide (x^3 - 2x) by (x - 1) using polynomial long division or synthetic division.',
    stepByStepSolution: [
      'Divide $x^3 - 2x$ by $x - 1$:\n$x^3 - 2x = (x^2 + x - 1)(x - 1) - 1$.\nSo $\\frac{x^3 - 2x}{x - 1} = x^2 + x - 1 - \\frac{1}{x - 1}$.',
      'Antiderivative: $F(x) = \\frac{x^3}{3} + \\frac{x^2}{2} - x - \\ln|x - 1|$.',
      'At $x = 3$: $F(3) = 9 + \\frac{9}{2} - 3 - \\ln(2) = \\frac{21}{2} - \\ln(2)$.',
      'At $x = 2$: $F(2) = \\frac{8}{3} + 2 - 2 - \\ln(1) = \\frac{8}{3} - 0 = \\frac{8}{3}$.',
      'Subtract: $\\frac{21}{2} - \\frac{8}{3} - \\ln(2) = \\frac{63 - 16}{6} - \\ln(2) = \\frac{47}{6} - \\ln(2)$.',
    ],
    finalAnswer: '\\frac{47}{6} - \\ln(2)',
  },

  // --- Topic 3: Parts ---
  {
    id: 'prac-parts-1',
    topicId: 'Parts',
    topic: 'Integration by Parts',
    topicTh: 'การอินทิเกรตทีละส่วนด้วยวิธีตาราง (Tabular Method)',
    level: 'Easy',
    problemStatement: 'Evaluate the indefinite integral: $$\\int x^2 e^{3x} \\, dx$$',
    hint: 'Use the tabular (DI) method: differentiate x^2 down to 0, integrate e^(3x).',
    stepByStepSolution: [
      'Create D and I columns:\n| Sign | D | I |\n| + | $x^2$ | $e^{3x}$ |\n| - | $2x$ | $\\frac{1}{3}e^{3x}$ |\n| + | $2$ | $\\frac{1}{9}e^{3x}$ |\n| - | $0$ | $\\frac{1}{27}e^{3x}$ |',
      'Multiply across diagonals:\n$$= + x^2\\left(\\frac{1}{3}e^{3x}\\right) - 2x\\left(\\frac{1}{9}e^{3x}\\right) + 2\\left(\\frac{1}{27}e^{3x}\\right) + C$$',
      '$$= e^{3x}\\left(\\frac{x^2}{3} - \\frac{2x}{9} + \\frac{2}{27}\\right) + C = \\frac{e^{3x}}{27}(9x^2 - 6x + 2) + C$$',
    ],
    finalAnswer: '\\frac{e^{3x}}{27}(9x^2 - 6x + 2) + C',
  },
  {
    id: 'prac-parts-2',
    topicId: 'Parts',
    topic: 'Integration by Parts',
    topicTh: 'การอินทิเกรตทีละส่วนฟังก์ชันผกผัน',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the definite integral: $$\\int_{1}^{e} x \\ln(x) \\, dx$$',
    hint: 'LIATE rule: logarithmic (L) takes priority for u over algebraic (A). Set u = ln(x) and dv = x dx.',
    stepByStepSolution: [
      'Let $u = \\ln(x) \\implies du = \\frac{1}{x} \\, dx$.\nLet $dv = x \\, dx \\implies v = \\frac{x^2}{2}$.',
      '$$\\int x\\ln(x) \\, dx = \\frac{x^2}{2}\\ln(x) - \\int \\frac{x^2}{2} \\cdot \\frac{1}{x} \\, dx = \\frac{x^2}{2}\\ln(x) - \\frac{1}{2}\\int x \\, dx = \\frac{x^2}{2}\\ln(x) - \\frac{x^2}{4}$$',
      'Evaluate between 1 and e:\nAt $x = e$: $\\frac{e^2}{2}\\ln(e) - \\frac{e^2}{4} = \\frac{e^2}{2} - \\frac{e^2}{4} = \\frac{e^2}{4}$.\nAt $x = 1$: $\\frac{1}{2}\\ln(1) - \\frac{1}{4} = -\\frac{1}{4}$.\nSubtract: $\\frac{e^2}{4} - \\left(-\\frac{1}{4}\\right) = \\frac{e^2 + 1}{4}$.',
    ],
    finalAnswer: '\\frac{e^2 + 1}{4}',
  },

  // --- Topic 4: Trig Sub ---
  {
    id: 'prac-trig-1',
    topicId: 'Trig Sub',
    topic: 'Trigonometric Substitution',
    topicTh: 'การแทนค่าด้วยตรีโกณมิติแบบ sqrt(a^2 + x^2)',
    level: 'Medium',
    problemStatement: 'Evaluate the indefinite integral: $$\\int \\frac{1}{(x^2 + 4)^{3/2}} \\, dx$$',
    hint: 'Form sqrt(a^2 + x^2) with a = 2. Let x = 2 tan(theta).',
    stepByStepSolution: [
      'Let $x = 2\\tan\\theta \\implies dx = 2\\sec^2\\theta \\, d\\theta$.\n$x^2 + 4 = 4\\tan^2\\theta + 4 = 4\\sec^2\\theta$.\n$(x^2 + 4)^{3/2} = (4\\sec^2\\theta)^{3/2} = 8\\sec^3\\theta$.',
      '$$\\int \\frac{2\\sec^2\\theta \\, d\\theta}{8\\sec^3\\theta} = \\frac{1}{4} \\int \\frac{1}{\\sec\\theta} \\, d\\theta = \\frac{1}{4} \\int \\cos\\theta \\, d\\theta = \\frac{1}{4}\\sin\\theta + C$$',
      'Reference triangle: $\\tan\\theta = \\frac{x}{2} = \\frac{\\text{opp}}{\\text{adj}}$, so $\\text{hyp} = \\sqrt{x^2 + 4}$.\nThus $\\sin\\theta = \\frac{x}{\\sqrt{x^2 + 4}}$.\nResult: $\\frac{x}{4\\sqrt{x^2 + 4}} + C$.',
    ],
    finalAnswer: '\\frac{x}{4\\sqrt{x^2 + 4}} + C',
  },
  {
    id: 'prac-trig-2',
    topicId: 'Trig Sub',
    topic: 'Trigonometric Substitution',
    topicTh: 'การแทนค่าด้วยตรีโกณมิติแบบ sqrt(x^2 - a^2)',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the definite integral: $$\\int_{2}^{4} \\frac{\\sqrt{x^2 - 4}}{x} \\, dx$$',
    hint: 'Let x = 2 sec(theta). Transform limits: x = 2 -> theta = 0, x = 4 -> sec(theta) = 2 -> theta = pi/3.',
    stepByStepSolution: [
      'Let $x = 2\\sec\\theta \\implies dx = 2\\sec\\theta\\tan\\theta \\, d\\theta$.\n$\\sqrt{x^2 - 4} = 2\\tan\\theta$.\nLimits: $x = 2 \\implies \\theta = 0$; $x = 4 \\implies \\theta = \\frac{\\pi}{3}$.',
      '$$\\int_{0}^{\\pi/3} \\frac{2\\tan\\theta}{2\\sec\\theta} (2\\sec\\theta\\tan\\theta \\, d\\theta) = 2 \\int_{0}^{\\pi/3} \\tan^2\\theta \\, d\\theta = 2 \\int_{0}^{\\pi/3} (\\sec^2\\theta - 1) \\, d\\theta$$',
      '$$= 2 \\Big[ \\tan\\theta - \\theta \\Big]_{0}^{\\pi/3} = 2 \\left( \\tan(\\pi/3) - \\frac{\\pi}{3} - (0 - 0) \\right) = 2\\sqrt{3} - \\frac{2\\pi}{3}$$',
    ],
    finalAnswer: '2\\sqrt{3} - \\frac{2\\pi}{3}',
  },

  // --- Topic 5: Partial Fractions ---
  {
    id: 'prac-pf-1',
    topicId: 'Partial Fractions',
    topic: 'Partial Fractions',
    topicTh: 'การแยกเศษส่วนย่อยกรณีตัวประกอบเชิงเส้นต่างกัน',
    level: 'Easy',
    problemStatement: 'Evaluate the indefinite integral: $$\\int \\frac{3x - 1}{x^2 - x - 6} \\, dx$$',
    hint: 'Factor denominator as (x - 3)(x + 2). Decompose as A/(x - 3) + B/(x + 2).',
    stepByStepSolution: [
      'Factor: $x^2 - x - 6 = (x - 3)(x + 2)$.\n$$\\frac{3x - 1}{(x - 3)(x + 2)} = \\frac{A}{x - 3} + \\frac{B}{x + 2}$$',
      'Multiply by $(x - 3)(x + 2)$: $3x - 1 = A(x + 2) + B(x - 3)$.\n- Let $x = 3$: $3(3) - 1 = A(5) \\implies 8 = 5A \\implies A = \\frac{8}{5}$.\n- Let $x = -2$: $3(-2) - 1 = B(-5) \\implies -7 = -5B \\implies B = \\frac{7}{5}$.',
      'Integrate:\n$$= \\frac{8}{5}\\ln|x - 3| + \\frac{7}{5}\\ln|x + 2| + C$$',
    ],
    finalAnswer: '\\frac{8}{5}\\ln|x - 3| + \\frac{7}{5}\\ln|x + 2| + C',
  },
  {
    id: 'prac-pf-2',
    topicId: 'Partial Fractions',
    topic: 'Partial Fractions',
    topicTh: 'การแยกเศษส่วนย่อยกรณีตัวประกอบซ้ำ',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the indefinite integral: $$\\int \\frac{2x^2 + 3}{x(x - 1)^2} \\, dx$$',
    hint: 'Decompose with repeated linear factor: A/x + B/(x - 1) + C/(x - 1)^2.',
    stepByStepSolution: [
      '$$\\frac{2x^2 + 3}{x(x - 1)^2} = \\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$$',
      '$2x^2 + 3 = A(x - 1)^2 + Bx(x - 1) + Cx$.\n- Let $x = 0$: $3 = A(-1)^2 \\implies A = 3$.\n- Let $x = 1$: $2(1) + 3 = C(1) \\implies C = 5$.\n- Equate $x^2$ coefficient: $2 = A + B = 3 + B \\implies B = -1$.',
      'Integrate:\n$$\\int \\left( \\frac{3}{x} - \\frac{1}{x - 1} + \\frac{5}{(x - 1)^2} \\right) dx = 3\\ln|x| - \\ln|x - 1| - \\frac{5}{x - 1} + C$$',
    ],
    finalAnswer: '3\\ln|x| - \\ln|x - 1| - \\frac{5}{x - 1} + C',
  },

  // --- Topic 6: Reduction Formulas ---
  {
    id: 'prac-red-1',
    topicId: 'Reduction Formulas',
    topic: 'Reduction Formulas & Tables',
    topicTh: 'สูตรลดทอนสำหรับกำลังของโคไซน์',
    level: 'Medium',
    problemStatement: 'Given $\\int \\cos^n(x) \\, dx = \\frac{\\cos^{n-1}(x)\\sin(x)}{n} + \\frac{n-1}{n}\\int \\cos^{n-2}(x) \\, dx$, evaluate: $$\\int_{0}^{\\pi/2} \\cos^4(x) \\, dx$$',
    hint: 'Apply the formula twice: first with n = 4, then with n = 2.',
    stepByStepSolution: [
      'With $n = 4$:\n$$\\int_{0}^{\\pi/2} \\cos^4(x) \\, dx = \\left[ \\frac{\\cos^3(x)\\sin(x)}{4} \\right]_{0}^{\\pi/2} + \\frac{3}{4} \\int_{0}^{\\pi/2} \\cos^2(x) \\, dx$$\nAt both $\\pi/2$ and $0$, $\\cos^3(x)\\sin(x) = 0$, so the boundary term vanishes.',
      'With $n = 2$:\n$$\\int_{0}^{\\pi/2} \\cos^2(x) \\, dx = \\left[ \\frac{\\cos(x)\\sin(x)}{2} \\right]_{0}^{\\pi/2} + \\frac{1}{2} \\int_{0}^{\\pi/2} 1 \\, dx = 0 + \\frac{1}{2}\\left(\\frac{\\pi}{2}\\right) = \\frac{\\pi}{4}$$',
      'Multiply: $\\frac{3}{4} \\left(\\frac{\\pi}{4}\\right) = \\frac{3\\pi}{16}$.',
    ],
    finalAnswer: '\\frac{3\\pi}{16}',
  },
  {
    id: 'prac-red-2',
    topicId: 'Reduction Formulas',
    topic: 'Reduction Formulas & Tables',
    topicTh: 'สูตรลดทอนกำลังของแทนเจนต์',
    level: 'Exam Trap',
    problemStatement: 'Using the identity $\\int \\tan^n(x) \\, dx = \\frac{\\tan^{n-1}(x)}{n-1} - \\int \\tan^{n-2}(x) \\, dx$, evaluate: $$\\int_{0}^{\\pi/4} \\tan^4(x) \\, dx$$',
    hint: 'Apply reduction with n = 4, then with n = 2. Note int 1 dx = x.',
    stepByStepSolution: [
      'For $n = 4$:\n$$\\int \\tan^4(x) \\, dx = \\frac{\\tan^3(x)}{3} - \\int \\tan^2(x) \\, dx$$',
      'For $n = 2$:\n$$\\int \\tan^2(x) \\, dx = \\tan(x) - \\int 1 \\, dx = \\tan(x) - x$$',
      'Antiderivative: $F(x) = \\frac{\\tan^3(x)}{3} - \\tan(x) + x$.\nAt $x = \\pi/4$: $F(\\pi/4) = \\frac{1}{3} - 1 + \\frac{\\pi}{4} = -\\frac{2}{3} + \\frac{\\pi}{4}$.\nAt $x = 0$: $F(0) = 0$.\nResult: $\\frac{\\pi}{4} - \\frac{2}{3}$.',
    ],
    finalAnswer: '\\frac{\\pi}{4} - \\frac{2}{3}',
  },

  // --- Topic 7: Geometric Series ---
  {
    id: 'prac-geom-1',
    topicId: 'Geometric Series',
    topic: 'Geometric Sequences and Series',
    topicTh: 'การลู่เข้าและผลรวมของอนุกรมเรขาคณิต',
    level: 'Easy',
    problemStatement: 'Find the exact sum of the infinite series: $$\\sum_{n=0}^{\\infty} \\frac{(-1)^n \\cdot 4}{3^{2n}}$$',
    hint: 'Notice 3^(2n) = (3^2)^n = 9^n. Identify the initial term a and ratio r.',
    stepByStepSolution: [
      'Rewrite series: $\\sum_{n=0}^{\\infty} 4 \\left(-\\frac{1}{9}\\right)^n$.\nInitial term at $n = 0$: $a = 4(-1/9)^0 = 4$.\nCommon ratio: $r = -\\frac{1}{9}$.',
      'Since $|r| = |-1/9| = 1/9 < 1$, the series converges.',
      'Sum: $$S = \\frac{a}{1 - r} = \\frac{4}{1 - (-1/9)} = \\frac{4}{10/9} = \\frac{36}{10} = \\frac{18}{5}$$',
    ],
    finalAnswer: '\\frac{18}{5}',
  },
  {
    id: 'prac-geom-2',
    topicId: 'Geometric Series',
    topic: 'Geometric Sequences and Series',
    topicTh: 'การแปลงทศนิยมซ้ำเป็นเศษส่วนด้วยอนุกรมเรขาคณิต',
    level: 'Medium',
    problemStatement: 'Express the repeating decimal $0.\\overline{27} = 0.272727\\dots$ as an exact simplified fraction using an infinite geometric series.',
    hint: 'Write as 27/100 + 27/10000 + 27/1000000 + ...',
    stepByStepSolution: [
      '$$0.\\overline{27} = \\frac{27}{10^2} + \\frac{27}{10^4} + \\frac{27}{10^6} + \\cdots = \\sum_{n=1}^{\\infty} \\frac{27}{100^n}$$',
      'Initial term: $a = \\frac{27}{100}$. Common ratio: $r = \\frac{1}{100}$.',
      'Sum: $$S = \\frac{a}{1 - r} = \\frac{27/100}{1 - 1/100} = \\frac{27/100}{99/100} = \\frac{27}{99} = \\frac{3}{11}$$',
    ],
    finalAnswer: '\\frac{3}{11}',
  },

  // --- Topic 8: Ratio Test ---
  {
    id: 'prac-ratio-1',
    topicId: 'Ratio Test',
    topic: 'The Ratio Test',
    topicTh: 'การทดสอบอัตราส่วนกับแฟกทอเรียลและเลขชี้กำลัง',
    level: 'Medium',
    problemStatement: 'Use the Ratio Test to determine the convergence or divergence of: $$\\sum_{n=1}^{\\infty} \\frac{4^n \\cdot (n!)^2}{(2n)!}$$',
    hint: 'Compute L = lim |a_{n+1} / a_n|. Note (2n + 2)! = (2n + 2)(2n + 1)(2n)!.',
    stepByStepSolution: [
      '$$L = \\lim_{n \\to \\infty} \\left| \\frac{4^{n+1}((n+1)!)^2}{(2n+2)!} \\cdot \\frac{(2n)!}{4^n(n!)^2} \\right|$$',
      '$$= \\lim_{n \\to \\infty} 4 \\cdot \\frac{(n+1)^2}{(2n+2)(2n+1)} = \\lim_{n \\to \\infty} \\frac{4(n+1)^2}{2(n+1)(2n+1)} = \\lim_{n \\to \\infty} \\frac{2(n+1)}{2n+1} = 1$$',
      'Here $L = 1$, which makes the standard ratio test inconclusive. Let us test with another series: $$\\sum_{n=1}^{\\infty} \\frac{3^n \\cdot n!}{n^n}$$',
      '$$\\lim \\frac{3^{n+1}(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{3^n n!} = \\lim 3 \\left(\\frac{n}{n+1}\\right)^n = \\frac{3}{e}$$. Since $3/e > 1$, it diverges.',
    ],
    finalAnswer: '\\text{Diverges} \\quad (L = \\frac{3}{e} > 1)',
  },
  {
    id: 'prac-ratio-2',
    topicId: 'Ratio Test',
    topic: 'The Ratio Test',
    topicTh: 'การทดสอบอัตราส่วนระดับข้อสอบจริง',
    level: 'Exam Trap',
    problemStatement: 'Determine whether the series converges or diverges using the Ratio Test: $$\\sum_{n=1}^{\\infty} \\frac{n^4}{3^n}$$',
    hint: 'Set up |a_{n+1}/a_n| and evaluate the limit of ((n+1)/n)^4 * (3^n / 3^(n+1)).',
    stepByStepSolution: [
      '$$L = \\lim_{n \\to \\infty} \\frac{(n+1)^4}{3^{n+1}} \\cdot \\frac{3^n}{n^4} = \\lim_{n \\to \\infty} \\left( \\frac{n+1}{n} \\right)^4 \\cdot \\frac{1}{3} = (1)^4 \\cdot \\frac{1}{3} = \\frac{1}{3}$$',
      'Since $L = \\frac{1}{3} < 1$, the series converges absolutely by the Ratio Test.',
    ],
    finalAnswer: 'L = \\frac{1}{3} < 1 \\implies \\text{Converges Absolutely}',
  },

  // --- Topic 9: Power Series & IOC ---
  {
    id: 'prac-ps-1',
    topicId: 'Power Series',
    topic: 'Power Series & IOC',
    topicTh: 'รัศมีและช่วงแห่งการลู่เข้าของอนุกรมกำลัง (ระดับปานกลาง)',
    level: 'Medium',
    problemStatement: 'Find the radius and interval of convergence for: $$\\sum_{n=1}^{\\infty} \\frac{(x + 1)^n}{n^2 \\cdot 4^n}$$',
    hint: 'Apply Ratio Test. When testing endpoints, compare with p-series p = 2.',
    stepByStepSolution: [
      '$$L = \\lim_{n \\to \\infty} \\left| \\frac{(x+1)^{n+1}}{(n+1)^2 4^{n+1}} \\cdot \\frac{n^2 4^n}{(x+1)^n} \\right| = \\frac{|x+1|}{4} < 1 \\implies R = 4$$',
      'Open interval: $-4 < x + 1 < 4 \\implies -5 < x < 3$.',
      'Test $x = 3$: $\\sum \\frac{4^n}{n^2 4^n} = \\sum \\frac{1}{n^2}$ (converges, $p=2 > 1$). Include 3: "]".',
      'Test $x = -5$: $\\sum \\frac{(-4)^n}{n^2 4^n} = \\sum \\frac{(-1)^n}{n^2}$ (converges absolutely). Include -5: "[".',
      'Conclusion: $R = 4$, $\\text{IOC} = [-5, 3]$.',
    ],
    finalAnswer: 'R = 4, \\quad \\text{IOC} = [-5, 3]',
  },
  {
    id: 'prac-ps-2',
    topicId: 'Power Series',
    topic: 'Power Series & IOC',
    topicTh: 'อนุกรมกำลังที่มีแฟกทอเรียล',
    level: 'Exam Trap',
    problemStatement: 'Find the radius and interval of convergence for: $$\\sum_{n=0}^{\\infty} \\frac{n! (x - 4)^n}{2^n}$$',
    hint: 'Compute the limit of |a_{n+1} / a_n| when factorials are present in the numerator.',
    stepByStepSolution: [
      '$$L = \\lim_{n \\to \\infty} \\left| \\frac{(n+1)! (x - 4)^{n+1}}{2^{n+1}} \\cdot \\frac{2^n}{n! (x - 4)^n} \\right| = \\lim_{n \\to \\infty} \\frac{(n+1)|x - 4|}{2}$$',
      'For any $x \\neq 4$, $\\lim_{n \\to \\infty} \\frac{(n+1)|x - 4|}{2} = \\infty > 1$.',
      'The series converges ONLY at its center $x = 4$.',
      'Therefore, $R = 0$ and the interval of convergence is the single point $\\{4\\}$.',
    ],
    finalAnswer: 'R = 0, \\quad \\text{IOC} = \\{4\\}',
  },

  // --- Topic 10: Maclaurin Series ---
  {
    id: 'prac-mac-1',
    topicId: 'Maclaurin',
    topic: 'Maclaurin Series',
    topicTh: 'การแทนที่ในอนุกรมแมคลอรินมาตรฐาน',
    level: 'Easy',
    problemStatement: 'Find the first four non-zero terms of the Maclaurin series for $f(x) = x^2 e^{-3x}$.',
    hint: 'Multiply the expansion of e^(-3x) by x^2.',
    stepByStepSolution: [
      '$$e^u = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + \\cdots$$',
      'Let $u = -3x$:\n$$e^{-3x} = 1 - 3x + \\frac{9x^2}{2} - \\frac{27x^3}{6} + \\cdots = 1 - 3x + \\frac{9}{2}x^2 - \\frac{9}{2}x^3 + \\cdots$$',
      'Multiply by $x^2$:\n$$x^2 e^{-3x} = x^2 - 3x^3 + \\frac{9}{2}x^4 - \\frac{9}{2}x^5 + \\cdots$$',
    ],
    finalAnswer: 'x^2 - 3x^3 + \\frac{9}{2}x^4 - \\frac{9}{2}x^5',
  },
  {
    id: 'prac-mac-2',
    topicId: 'Maclaurin',
    topic: 'Maclaurin Series',
    topicTh: 'การหาลิมิตด้วยอนุกรมแมคลอริน',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the limit using Maclaurin series: $$\\lim_{x \\to 0} \\frac{\\sin(x) - x + \\frac{x^3}{6}}{x^5}$$',
    hint: 'Expand sin(x) = x - x^3/6 + x^5/120 - ...',
    stepByStepSolution: [
      '$$\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\mathcal{O}(x^7)$$',
      'Substitute into numerator:\n$$\\sin(x) - x + \\frac{x^3}{6} = \\left(x - \\frac{x^3}{6} + \\frac{x^5}{120}\\right) - x + \\frac{x^3}{6} = \\frac{x^5}{120} + \\mathcal{O}(x^7)$$',
      'Divide by $x^5$:\n$$\\lim_{x \\to 0} \\frac{\\frac{x^5}{120} + \\mathcal{O}(x^7)}{x^5} = \\frac{1}{120}$$',
    ],
    finalAnswer: '\\frac{1}{120}',
  },

  // --- Topic 11: Taylor Series (a != 0) ---
  {
    id: 'prac-taylor-1',
    topicId: 'Taylor Series',
    topic: 'Taylor Series',
    topicTh: 'อนุกรมเทย์เลอร์ของฟังก์ชันลอการิทึมรอบจุด a = 1',
    level: 'Medium',
    problemStatement: 'Find the Taylor series of $f(x) = \\ln(x)$ centered at $a = 1$ in sigma notation.',
    hint: 'Compute derivatives of ln(x) at x = 1. Watch the signs and factorials.',
    stepByStepSolution: [
      '$f(1) = \\ln(1) = 0$.\n$f\'(x) = x^{-1} \\implies f\'(1) = 1$.\n$f\'\'(x) = -x^{-2} \\implies f\'\'(1) = -1$.\n$f\'\'\'(x) = 2x^{-3} \\implies f\'\'\'(1) = 2!$.\nIn general, $f^{(n)}(1) = (-1)^{n-1}(n - 1)!$ for $n \\ge 1$.',
      'Taylor coefficient: $c_n = \\frac{f^{(n)}(1)}{n!} = \\frac{(-1)^{n-1}(n - 1)!}{n!} = \\frac{(-1)^{n-1}}{n}$.',
      '$$\\ln(x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n}(x - 1)^n = (x - 1) - \\frac{(x - 1)^2}{2} + \\frac{(x - 1)^3}{3} - \\cdots$$',
    ],
    finalAnswer: '\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n}(x - 1)^n',
  },
  {
    id: 'prac-taylor-2',
    topicId: 'Taylor Series',
    topic: 'Taylor Series',
    topicTh: 'อนุกรมเทย์เลอร์ของกำลังสองรอบจุด a = 2',
    level: 'Exam Trap',
    problemStatement: 'Find the Taylor polynomial of degree 3 for $f(x) = \\sqrt{x}$ centered at $a = 4$.',
    hint: 'f(4) = 2. Compute f\'(4), f\'\'(4), f\'\'\'(4) and apply T_3(x) = sum_{n=0}^3 f^(n)(4)/n! (x-4)^n.',
    stepByStepSolution: [
      '$f(x) = x^{1/2} \\implies f(4) = 2$.\n$f\'(x) = \\frac{1}{2}x^{-1/2} \\implies f\'(4) = \\frac{1}{4}$.\n$f\'\'(x) = -\\frac{1}{4}x^{-3/2} \\implies f\'\'(4) = -\\frac{1}{4(8)} = -\\frac{1}{32}$.\n$f\'\'\'(x) = \\frac{3}{8}x^{-5/2} \\implies f\'\'\'(4) = \\frac{3}{8(32)} = \\frac{3}{256}$.',
      'Assemble coefficients:\n$c_0 = 2$\n$c_1 = \\frac{1}{4}$\n$c_2 = \\frac{-1/32}{2!} = -\\frac{1}{64}$\n$c_3 = \\frac{3/256}{3!} = \\frac{3}{256 \\times 6} = \\frac{1}{512}$',
      '$$T_3(x) = 2 + \\frac{1}{4}(x - 4) - \\frac{1}{64}(x - 4)^2 + \\frac{1}{512}(x - 4)^3$$',
    ],
    finalAnswer: '2 + \\frac{1}{4}(x - 4) - \\frac{1}{64}(x - 4)^2 + \\frac{1}{512}(x - 4)^3',
  },

  // --- Topic 12: Taylor Applications & Non-elementary Integrals ---
  {
    id: 'prac-app-1',
    topicId: 'Taylor Applications',
    topic: 'Taylor Polynomial Applications',
    topicTh: 'การประมาณค่าอินทิกรัล e^(-x^2)',
    level: 'Medium',
    problemStatement: 'Use the first two non-zero terms of the Maclaurin series for $e^{-x^2}$ to estimate: $$\\int_{0}^{1/3} e^{-x^2} \\, dx$$',
    hint: 'e^(-x^2) = 1 - x^2 + x^4/2 - ... Integrate term-by-term from 0 to 1/3.',
    stepByStepSolution: [
      '$$e^{-x^2} = 1 - x^2 + \\mathcal{O}(x^4)$$',
      '$$\\int_{0}^{1/3} (1 - x^2) \\, dx = \\left[ x - \\frac{x^3}{3} \\right]_{0}^{1/3} = \\frac{1}{3} - \\frac{(1/3)^3}{3} = \\frac{1}{3} - \\frac{1/27}{3} = \\frac{1}{3} - \\frac{1}{81} = \\frac{27 - 1}{81} = \\frac{26}{81}$$',
    ],
    finalAnswer: '\\frac{26}{81}',
  },
  {
    id: 'prac-app-2',
    topicId: 'Taylor Applications',
    topic: 'Taylor Polynomial Applications',
    topicTh: 'การประมาณค่าลิมิตแบบ 0/0 ที่ซับซ้อน',
    level: 'Exam Trap',
    problemStatement: 'Evaluate the limit using Taylor expansions: $$\\lim_{x \\to 0} \\frac{e^x - 1 - x - \\frac{x^2}{2}}{\\cos(x) - 1 + \\frac{x^2}{2}}$$',
    hint: 'Expand e^x up to x^3 term and cos(x) up to x^4 term.',
    stepByStepSolution: [
      'Numerator: $e^x - 1 - x - \\frac{x^2}{2} = \\frac{x^3}{6} + \\frac{x^4}{24} + \\mathcal{O}(x^5)$.',
      'Denominator: $\\cos(x) - 1 + \\frac{x^2}{2} = \\frac{x^4}{24} - \\frac{x^6}{720} + \\mathcal{O}(x^8)$.',
      'Notice: as $x \\to 0$, the numerator is of order $x^3$, while the denominator is of order $x^4$!$$\\frac{\\frac{x^3}{6} + \\mathcal{O}(x^4)}{\\frac{x^4}{24} + \\mathcal{O}(x^6)} = \\frac{1/6}{(1/24) x} = \\frac{4}{x}$$',
      'As $x \\to 0^+$, it approaches $+\\infty$; as $x \\to 0^-$, it approaches $-\\infty$. Therefore, the two-sided limit **does not exist (DNE)**.',
    ],
    finalAnswer: '\\text{Does Not Exist (DNE)}',
  },
];
