# Performance Analytics Dashboard with D3.js

An executive-grade performance analytics suite that visualizes learner competencies across the sales mastery program, featuring dual-radar overlays comparing Biotech and Medical Device skill proficiencies directly against industry benchmarks.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your responses, the following architectural choices have been established:

- **Visualization Strategy**: Dual-radar chart overlay comparing the user's active skill profile directly against comparative benchmarks on a unified coordinate plane, with sector tabs for Biotech and Medical Device.
- **Proficiency Scoring Model**: Dynamic calculation derived from completed lessons in the 12 Master Academies, practice lab exercise evaluations, and scenario simulation scores, with offline fallback via `dbStore`.
- **Benchmark Cohort Toggle**: Interactive switcher between **Industry Median (Associate Average)** and **Top 10% President's Club Commercial Leaders** to illuminate specific competency gaps.

---

## 1. Overview & Core Concept

### What It Does
The Performance Analytics dashboard provides commercial sales reps, associates, and candidates with granular, quantitative visibility into their sales proficiency across six critical commercial dimensions:
1. **Clinical & Scientific Literacy** (trial interpretation, pharmacology, MOA)
2. **Hospital Procurement & VAC Navigation** (GPO contracts, DRG economics, C-suite ROI)
3. **Objection Reframing & Tactical Empathy** (Shelby Haas detachment, Chris Voss labeling)
4. **Deal Qualification & MEDDPICC** (metrics, economic buyer, decision criteria)
5. **Regulatory Compliance & Ethics** (AKS, Stark Law, Sunshine Act, PhRMA/AdvaMed)
6. **Outbound Pipeline & Territory Strategy** (surgeon targeting, ASC migration, call planning)

### Target Audience
- Sales candidates interviewing for medical device and biotech associate positions who need an objective competency scorecard for their brag books.
- Experienced territory reps identifying skill blindspots to accelerate transition into President's Club performance brackets.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Top-Level KPI Strip**: Scannable metrics displaying overall mastery percentile, completed practice lab submissions, certified modules, and estimated time-to-quota readiness.
2. **Dual-Radar Visualization (D3.js)**:
   - Centered SVG radar chart with animated polygon morphing between Biotech and Med-Device dimensions.
   - Interactive hover points on each radial axis displaying exact user score, benchmark baseline, gap percentage, and recommended practice lab exercise to close the gap.
3. **Cohort Comparison Switcher**:
   - Clean segmented toggle to compare against **Industry Baseline (50th percentile)** vs. **President's Club (90th percentile)**.
4. **Competency Gap Action Plan**:
   - Prioritized recommendation list mapping detected deficiencies directly to exercises in the Commercial Practice Lab (e.g. Exercise 17: Medical Device VAC Procurement or Exercise 5: Clinical Trial Interpretation).
5. **Scorecard Export**:
   - One-click export of an executive PDF/printable competency dossier for interview presentation.

### Visual Identity & Theme
- **Aesthetic**: Executive scientific data dashboard adhering to clean neutral surfaces and high-contrast clinical accents.
- **Color Palette**:
  - User Skill Polygon: Indigo-600 (`#4f46e5`) with translucent fill (`rgba(79, 70, 229, 0.25)`) and sharp vertex dots.
  - Benchmark Polygon: Slate-400 (`#94a3b8`) dashed stroke for Industry Median; Amber-500 (`#f59e0b`) stroke for President's Club.
  - Background & Cards: Pure white cards with hairline borders (`border-slate-200`) on slate-50 canvas.
- **Typography**: Clean display sans (`Plus Jakarta Sans`), tabular figures (`tabular-nums font-mono`) for all scores and percentiles.

---

## 3. Key Product Decisions & Trade-Offs

- **D3.js Direct Integration vs. Third-Party Wrappers**:
  - *Chosen*: Direct D3.js mathematical scale generators (`d3-scale`, `d3-shape`, `d3-selection`) wrapped cleanly in React `useRef`/`useEffect`.
  - *Why*: Unrestricted control over radial grid lines, axis labeling geometry, multi-layer polygon blending, and custom hover tooltips without heavyweight charting bloat.
- **Real-Time Data Synthesis**:
  - *Chosen*: Compute scores directly from the active user profile (`profile.completedLessons`, `profile.certifiedModules`, `dbStore` lab submissions).
  - *Why*: Immediate reactivity whenever the user completes a quiz, certifies a module, or submits a practice lab, while maintaining 100% offline functionality.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    User Learning State                      │
│   (UserProfile, Completed Academies, Practice Submissions) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Competency Calculation Engine                 │
│         - 6 Core Commercial Competency Dimensions           │
│         - Biotech Specific vs Med-Device Specific Weighting │
│         - Dynamic Gap Analysis against Benchmark Cohorts     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             PerformanceAnalyticsView (D3.js)                │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │ D3 SVG Radar Overlay  │       │ Benchmark Tier Toggle │  │
│  │ (User vs Benchmark)   │       │ (Median vs Pres Club) │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Competency Breakdown & Practice Links         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Proposed Changes
1. **Package Installation**: Install `d3` and `@types/d3`.
2. **Component Creation**:
   - `src/components/PerformanceAnalyticsView.tsx`: Full D3.js radar chart visualization, KPI strip, competency breakdown bars, and gap recommendations.
3. **Navigation Integration**:
   - Add `analytics` to `ActiveView` in `src/components/Navbar.tsx` and route in `src/App.tsx`.
