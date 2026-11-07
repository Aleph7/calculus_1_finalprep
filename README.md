# Calculus 1 Final Exam Preparation Platform (KMITL 06016301)

An end-to-end, high-performance academic web application designed to prepare university engineering students for the **Calculus 1 Final Examination**. Built from scratch in strict compliance with university curriculum guidelines, official course lecture notes, and examination blueprints.

---

## 🎯 Final Examination Architecture & Rules

- **Target Course**: Calculus 1 (KMITL Course Code: 06016301 / LMS Course ID: 1813)
- **Exam Format**: Exactly 12 Questions, 50 Total Points
  - **Questions 1 to 10**: 4 points each (Total 40 points)
  - **Questions 11 to 12**: 5 points each (Total 10 points)
- **Time Allocated**: 120 Minutes (2 hours)
- **Calculator Policy**: **STRICTLY PROHIBITED**. All calculations and final answers simplify to elegant exact closed forms:
  - Reduced fractions: e.g. $\frac{4}{3}, \frac{23}{6}, \frac{287}{2304}$
  - Constants: $\pi, e, \sqrt{2}, \sqrt{3}$
  - Natural logarithms: $\ln(2), \frac{1}{2}\ln(1 + \sqrt{2})$
  - Exact inverse trigonometric expressions: $\frac{\pi}{4}, \arctan(2)$
- **Provided Materials**: Standard Integration Table and Reduction Formulas (included in the **Formula Vault**).
- **Scope Exclusion**: Applications of integration to statistics (probability density functions, expected values) are strictly excluded.

---

## 📚 Core Topics Covered

1. **Integration Techniques**:
   - **Substitution (u-sub)**: Complex rational/radical substitution with rigorous integration bound transformations.
   - **Polynomial Long Division**: Improper rational integrands where $\deg(P) \ge \deg(Q)$ decomposed into polynomial quotient, log, and arctan components.
   - **Integration by Parts**: Tabular DI method and looping integrals with algebraic unknown isolation.
   - **Trigonometric Substitution**: Radicals $\sqrt{a^2 - x^2}$, $\sqrt{a^2 + x^2}$, and $\sqrt{x^2 - a^2}$ with right triangle back-substitution.
   - **Partial Fractions**: Distinct linear, repeated linear, and irreducible quadratic factors.
   - **Integration by Table / Reduction Formulas**: Application of powers of secant, cosine, and sine reduction.
2. **Sequences & Infinite Series**:
   - **Geometric Sequences & Series**: Ratio convergence condition $|r| < 1$ and exact sum formula $S = \frac{a}{1 - r}$.
   - **Ratio Test**: Limit computation of $|a_{n+1}/a_n| = L$, testing factorials and exponential terms.
   - **Power Series**: Center, radius of convergence $R$, and interval of convergence (IOC) with manual boundary testing.
   - **Maclaurin Series**: Expansions of $\frac{1}{1-x}, e^x, \sin(x), \cos(x), \ln(1+x), \arctan(x)$ and evaluating indeterminate limits.
   - **Taylor Series**: Expansions around $x = a$ ($a \neq 0$) formulated in compact sigma ($\sum$) notation.
   - **Taylor Applications**: Non-elementary integral approximation and error bounds using the Alternating Series Estimation Theorem.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Engineered Dark / Deep Navy theme with ambient lighting)
- **Mathematical Typography**: KaTeX (Fast, zero-latency LaTeX parsing and math rendering)
- **Interactive Features**: 
  - 120-minute exam countdown clock with play/pause/reset
  - Interactive self-scoring rubric evaluator (0 to max points per question)
  - Expandable step-by-step mathematical derivations
  - Multi-criteria filtering by topic, technique, and difficulty
  - Confetti celebration effects via `canvas-confetti`
- **Data Ingestion**: Python 3 (`requests`, `beautifulsoup4`) with KMITL Moodle LMS connector and fallback curriculum synthesis
- **CI/CD**: GitHub Actions workflow for zero-config automated deployment to GitHub Pages (`base: './'`)

---

## 📁 Project Structure

```
calculus_1_finalprep/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment workflow
├── public/                       # Static public assets
├── raw_slides/                   # Downloaded lecture PDFs and Markdown study guides
│   ├── index.json                # Structured manifest of all 37 course files
│   ├── 01_integration_by_substitution.md
│   ├── 02_polynomial_long_division_and_rational_functions.md
│   ├── ...
│   ├── Single_and_Multivariable_6th_Edition.pdf
│   └── เฉลย Homework*.pdf
├── scripts/
│   └── fetch_slides.py           # Slide ingestion and Moodle scraping script
├── src/
│   ├── components/
│   │   ├── ExamCountdownBar.tsx  # 120-min clock, points breakdown & calculator rule modal
│   │   ├── Footer.tsx            # Academic copyright and accreditation
│   │   ├── FormulaVault.tsx      # Searchable formula sheet and pitfall vault
│   │   ├── MathView.tsx          # Crash-proof KaTeX renderer for inline & block math
│   │   ├── MockExamArena.tsx     # 12 Mock Exam questions with rubrics & solution reveals
│   │   ├── Navbar.tsx            # Navigation tabs, live score counter & branding
│   │   ├── SlidesViewer.tsx      # Course materials browser & markdown reader
│   │   └── TargetedPracticeDrills.tsx # 24 technique practice drills with step-by-step reveals
│   ├── data/
│   │   ├── calculusData.ts       # Mock exam (50 pts), formula sheets, and practice drills
│   │   └── slidesIndex.ts        # Ingested slides manifest and embedded curriculum notes
│   ├── App.tsx                   # Main application container and score persistence
│   ├── index.css                 # Tailwind CSS & KaTeX styling definitions
│   ├── main.tsx                  # React DOM root entry point
│   └── vite-env.d.ts             # Vite client TypeScript ambient typings
├── index.html                    # HTML5 application shell
├── package.json                  # NPM dependencies and scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite bundler configuration with base './' and chunking
```

---

## 🚀 Getting Started & Commands

### 1. Development Server
Run the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Production Build
Verify TypeScript types and build the production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### 3. Slide Ingestion & Ingestion Script
To fetch or re-index lecture slides from KMITL Moodle LMS:
```bash
# Using the local Python virtual environment
source .venv/bin/activate
python scripts/fetch_slides.py
```
*Note*: If the network or Moodle session expires, the script automatically synthesizes all 11 curriculum reference modules into `./raw_slides/` so the pipeline never breaks.

---

## 🌐 GitHub Pages Deployment

The repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Push this repository to GitHub on branch `main`.
2. Under **Settings** -> **Pages** in your GitHub repository:
   - Select **Source**: `GitHub Actions`.
3. Every commit to `main` will automatically build and publish the site with relative assets (`base: './'`).

---

## 🎓 Academic Credit & Accreditation

- **Institution**: King Mongkut's Institute of Technology Ladkrabang (KMITL)
- **Curriculum**: Calculus 1 (Faculty of Science & IT)
- Designed with rigorous mathematical accuracy for engineering students.
