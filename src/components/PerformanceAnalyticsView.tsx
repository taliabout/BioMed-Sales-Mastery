import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  TrendingUp,
  Award,
  Target,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Layers,
  Sparkles,
  ChevronRight,
  BookOpen,
  Filter,
  ShieldAlert,
  Flame,
  Dna,
  Sliders,
  RefreshCw,
} from 'lucide-react';
import { UserProfile, HealthcareTrack } from '../types';
import { dbStore } from '../services/dbStore';

interface PerformanceAnalyticsViewProps {
  profile: UserProfile;
  onNavigateToView?: (view: any) => void;
}

interface CompetencyDimension {
  id: string;
  name: string;
  category: string;
  userScore: number;
  medianBenchmark: number;
  presClubBenchmark: number;
  description: string;
  recommendedLab: string;
  labExerciseId: string;
}

export const PerformanceAnalyticsView: React.FC<PerformanceAnalyticsViewProps> = ({
  profile,
  onNavigateToView,
}) => {
  const [selectedSector, setSelectedSector] = useState<'biotech' | 'med_device'>('med_device');
  const [benchmarkCohort, setBenchmarkCohort] = useState<'median' | 'pres_club'>('pres_club');
  const [hoveredDimension, setHoveredDimension] = useState<CompetencyDimension | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Derive dynamic scores based on profile progress & completed lessons
  const totalLessons = profile.completedLessons.length;
  const certifiedCount = profile.certifiedModules.length;
  const progressRatio = Math.min(1, (totalLessons * 12 + certifiedCount * 25) / 100);

  // Base dynamic baseline with progress scaling
  const baseScore = Math.min(95, Math.max(45, Math.round(52 + progressRatio * 42)));

  // Med-Device Competencies
  const medDeviceDimensions: CompetencyDimension[] = [
    {
      id: 'or_etiquette',
      name: 'OR & Sterile Protocol',
      category: 'Clinical Mastery',
      userScore: Math.min(98, baseScore + 6),
      medianBenchmark: 62,
      presClubBenchmark: 94,
      description: 'Sterile field boundary awareness, scrub-in timing, tray placement, and surgeon communication.',
      recommendedLab: 'Exercise 8: Mock Discovery Meeting with Surgical Chief',
      labExerciseId: 'lab-8',
    },
    {
      id: 'vac_economics',
      name: 'VAC & Hospital Economics',
      category: 'Procurement',
      userScore: Math.min(96, baseScore - 4),
      medianBenchmark: 48,
      presClubBenchmark: 92,
      description: 'C-suite ROI financial modeling, GPO tier alignment, and Value Analysis Committee dossiers.',
      recommendedLab: 'Exercise 17: Medical Device VAC Procurement Justification',
      labExerciseId: 'lab-17',
    },
    {
      id: 'surgeon_reframe',
      name: 'Objection Reframing',
      category: 'Psychological Influence',
      userScore: Math.min(98, baseScore + 8),
      medianBenchmark: 55,
      presClubBenchmark: 96,
      description: 'Shelby Haas radical detachment, downward vocal inflection, and Chris Voss tactical labeling.',
      recommendedLab: 'Exercise 9: 20 Escalating Objections Reversal Drill',
      labExerciseId: 'lab-9',
    },
    {
      id: 'meddpicc_rigor',
      name: 'MEDDPICC Qualification',
      category: 'Deal Architecture',
      userScore: Math.min(95, baseScore + 2),
      medianBenchmark: 52,
      presClubBenchmark: 90,
      description: 'Identifying Economic Buyers, Decision Criteria, Decision Process, and Implicate Pain.',
      recommendedLab: 'Exercise 7: Strategic Hospital Account Plan (MEDDPICC)',
      labExerciseId: 'lab-7',
    },
    {
      id: 'aks_compliance',
      name: 'AKS & AdvaMed Ethics',
      category: 'Compliance',
      userScore: Math.min(100, baseScore + 12),
      medianBenchmark: 68,
      presClubBenchmark: 98,
      description: 'Anti-Kickback Statute safe harbors, Sunshine Act reporting, and modest educational meal rules.',
      recommendedLab: 'Exercise 18: Compliance Risk Identification in Detailing',
      labExerciseId: 'lab-18',
    },
    {
      id: 'asc_migration',
      name: 'ASC & Territory Growth',
      category: 'Strategy',
      userScore: Math.min(94, baseScore - 2),
      medianBenchmark: 50,
      presClubBenchmark: 91,
      description: 'Capitalizing on ambulatory surgery center volume shift and physician-owner profit margins.',
      recommendedLab: 'Exercise 1: Healthcare Sales Territory Business Plan',
      labExerciseId: 'lab-1',
    },
  ];

  // Biotech & Specialty Oncology Competencies
  const biotechDimensions: CompetencyDimension[] = [
    {
      id: 'clinical_trial_literacy',
      name: 'Clinical Trial Literacy',
      category: 'Scientific Rigor',
      userScore: Math.min(98, baseScore + 5),
      medianBenchmark: 58,
      presClubBenchmark: 95,
      description: 'Interpreting hazard ratios, Kaplan-Meier curves, RECIST criteria, and primary endpoints.',
      recommendedLab: 'Exercise 5: Clinical Trial Interpretation & Statistical Analysis',
      labExerciseId: 'lab-5',
    },
    {
      id: 'buy_and_bill',
      name: 'Buy-and-Bill & 340B',
      category: 'Reimbursement',
      userScore: Math.min(95, baseScore - 6),
      medianBenchmark: 44,
      presClubBenchmark: 91,
      description: 'Medicare Part B ASP+6% spread, community clinic drug purchasing, and 340B ceiling prices.',
      recommendedLab: 'Exercise 14: Formulary Access & Buy-and-Bill Navigation',
      labExerciseId: 'lab-14',
    },
    {
      id: 'specialist_referral',
      name: 'KOL & Referral Networks',
      category: 'Account Strategy',
      userScore: Math.min(96, baseScore + 4),
      medianBenchmark: 54,
      presClubBenchmark: 93,
      description: 'Mapping academic center specialists to community oncologists for timely patient access.',
      recommendedLab: 'Exercise 6: Hospital System Stakeholder & Influencer Mapping',
      labExerciseId: 'lab-6',
    },
    {
      id: 'prior_auth_pt',
      name: 'Prior Auth & P&T Formularies',
      category: 'Market Access',
      userScore: Math.min(95, baseScore),
      medianBenchmark: 49,
      presClubBenchmark: 89,
      description: 'Overcoming step therapy mandates, specialty pharmacy appeals, and formulary tier positioning.',
      recommendedLab: 'Exercise 10: 30-Day Customer Engagement & Access Plan',
      labExerciseId: 'lab-10',
    },
    {
      id: 'phrma_fair_balance',
      name: 'PhRMA & Fair Balance',
      category: 'Compliance',
      userScore: Math.min(100, baseScore + 10),
      medianBenchmark: 65,
      presClubBenchmark: 97,
      description: 'FDA labeled indications, boxed warning fair balance, and PDMA drug sampling protocols.',
      recommendedLab: 'Exercise 18: Compliance Risk Identification in Detailing',
      labExerciseId: 'lab-18',
    },
    {
      id: 'medical_affairs_boundary',
      name: 'Medical Affairs Boundary',
      category: 'Governance',
      userScore: Math.min(97, baseScore + 3),
      medianBenchmark: 56,
      presClubBenchmark: 94,
      description: 'Appropriate handling of off-label inquiries and compliant referral to Medical Science Liaisons (MSLs).',
      recommendedLab: 'Exercise 3: Target Product Profile (TPP) Analysis',
      labExerciseId: 'lab-3',
    },
  ];

  const activeDimensions = selectedSector === 'med_device' ? medDeviceDimensions : biotechDimensions;

  // D3 Radar Chart Rendering
  useEffect(() => {
    if (!svgRef.current) return;

    const width = 480;
    const height = 440;
    const margin = 55;
    const radius = Math.min(width, height) / 2 - margin;
    const angleSlice = (Math.PI * 2) / activeDimensions.length;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Radius scale (0 to 100)
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100]);

    // Concentric Circular Grid Lines
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelFactor = radius * (i / levels);
      svg
        .append('circle')
        .attr('r', levelFactor)
        .attr('fill', 'none')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', i === levels ? 'none' : '3,3');

      // Grid level percentage label
      svg
        .append('text')
        .attr('x', 4)
        .attr('y', -levelFactor + 11)
        .attr('font-size', '9px')
        .attr('font-family', 'sans-serif')
        .attr('fill', '#94a3b8')
        .text(`${i * 20}%`);
    }

    // Radial Axis Lines & Labels
    activeDimensions.forEach((dim, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(100) * Math.cos(angle);
      const y = rScale(100) * Math.sin(angle);

      // Line
      svg
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1.2);

      // Axis Label
      const labelDistance = radius + 22;
      const labelX = labelDistance * Math.cos(angle);
      const labelY = labelDistance * Math.sin(angle);

      svg
        .append('text')
        .attr('x', labelX)
        .attr('y', labelY + 4)
        .attr('text-anchor', Math.abs(labelX) < 10 ? 'middle' : labelX > 0 ? 'start' : 'end')
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .attr('font-family', 'sans-serif')
        .attr('fill', '#1e293b')
        .text(dim.name);
    });

    // Radar Line Generator
    const radarLine = d3
      .lineRadial<number>()
      .radius((d) => rScale(d))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // 1. Draw Benchmark Polygon Layer
    const benchmarkData = activeDimensions.map((d) =>
      benchmarkCohort === 'pres_club' ? d.presClubBenchmark : d.medianBenchmark
    );

    svg
      .append('path')
      .datum(benchmarkData)
      .attr('d', radarLine)
      .attr('fill', benchmarkCohort === 'pres_club' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(148, 163, 184, 0.1)')
      .attr('stroke', benchmarkCohort === 'pres_club' ? '#f59e0b' : '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', benchmarkCohort === 'pres_club' ? 'none' : '4,4');

    // Benchmark vertex dots
    activeDimensions.forEach((dim, i) => {
      const score = benchmarkCohort === 'pres_club' ? dim.presClubBenchmark : dim.medianBenchmark;
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(score) * Math.cos(angle);
      const y = rScale(score) * Math.sin(angle);

      svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 3.5)
        .attr('fill', benchmarkCohort === 'pres_club' ? '#f59e0b' : '#94a3b8');
    });

    // 2. Draw User Skill Polygon Layer
    const userData = activeDimensions.map((d) => d.userScore);

    svg
      .append('path')
      .datum(userData)
      .attr('d', radarLine)
      .attr('fill', 'rgba(79, 70, 229, 0.22)')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2.5);

    // User vertex interactive dots
    activeDimensions.forEach((dim, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(dim.userScore) * Math.cos(angle);
      const y = rScale(dim.userScore) * Math.sin(angle);

      const circle = svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5.5)
        .attr('fill', '#4f46e5')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');

      circle
        .on('mouseenter', () => setHoveredDimension(dim))
        .on('mouseleave', () => setHoveredDimension(null));
    });
  }, [selectedSector, benchmarkCohort, activeDimensions]);

  // Overall Score Calculation
  const averageUserScore = Math.round(
    activeDimensions.reduce((acc, d) => acc + d.userScore, 0) / activeDimensions.length
  );
  const averageBenchmarkScore = Math.round(
    activeDimensions.reduce(
      (acc, d) => acc + (benchmarkCohort === 'pres_club' ? d.presClubBenchmark : d.medianBenchmark),
      0
    ) / activeDimensions.length
  );
  const competencyGap = averageBenchmarkScore - averageUserScore;

  // Identify Top 2 Growth Opportunities (largest gaps)
  const sortedGaps = [...activeDimensions].sort((a, b) => {
    const gapA = (benchmarkCohort === 'pres_club' ? a.presClubBenchmark : a.medianBenchmark) - a.userScore;
    const gapB = (benchmarkCohort === 'pres_club' ? b.presClubBenchmark : b.medianBenchmark) - b.userScore;
    return gapB - gapA;
  });
  const priorityGaps = sortedGaps.slice(0, 2);

  const exportScorecard = () => {
    const text = `BIOMED SALES MASTERY SCORECARD
Candidate: ${profile.name}
Track: ${profile.targetTrack}
Sector Analyzed: ${selectedSector.toUpperCase()}
Comparison Cohort: ${benchmarkCohort === 'pres_club' ? "Top 10% President's Club Leaders" : "Industry Median Associate"}

OVERALL COMPETENCY PERCENTILE: ${averageUserScore}%
BENCHMARK TARGET: ${averageBenchmarkScore}%
NET GAP: ${competencyGap > 0 ? `-${competencyGap}%` : `+${Math.abs(competencyGap)}%`}

DIMENSION BREAKDOWN:
${activeDimensions.map(d => `- ${d.name} (${d.category}): ${d.userScore}% vs Target ${benchmarkCohort === 'pres_club' ? d.presClubBenchmark : d.medianBenchmark}%`).join('\n')}

RECOMMENDED IMMEDIATE ACTION:
${priorityGaps.map((g, i) => `${i + 1}. ${g.recommendedLab} (Focus: ${g.name})`).join('\n')}

Generated by Apex BioMed Performance Analytics Engine · ${new Date().toLocaleDateString()}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_competency_scorecard_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <BarChart2 className="h-4 w-4" />
            <span>D3.js Sales Performance Analytics Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Commercial Competency Radar & Benchmark Matrix
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Objective, multi-dimensional skill evaluation comparing clinical mastery, VAC financial acumen, and negotiation resilience against illustrative industry cohorts. (Demo benchmark data).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportScorecard}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Scorecard</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Overall Mastery</div>
          <div className="text-2xl font-extrabold text-indigo-600 tabular-nums mt-1 font-mono">
            {averageUserScore}%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {averageUserScore >= 85 ? 'President Club Ready' : 'Quota Hunter Benchmark'}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Benchmark Gap</div>
          <div className={`text-2xl font-extrabold tabular-nums mt-1 font-mono ${competencyGap <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {competencyGap <= 0 ? `+${Math.abs(competencyGap)}%` : `-${competencyGap}%`}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Compared to {benchmarkCohort === 'pres_club' ? 'Top 10%' : 'Median'}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Completed Modules</div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums mt-1 font-mono">
            {totalLessons} Lessons
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Across 12 Master Academies
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Completed Pillars</div>
          <div className="text-2xl font-extrabold text-emerald-600 tabular-nums mt-1 font-mono">
            {certifiedCount} Verified
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Platform Portfolio Badges
          </div>
        </div>
      </div>

      {/* Main Interactive Radar & Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: D3.js Radar Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            {/* Sector Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setSelectedSector('med_device')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                  selectedSector === 'med_device'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>Medical Device & Capital</span>
              </button>
              <button
                onClick={() => setSelectedSector('biotech')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                  selectedSector === 'biotech'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Dna className="h-3.5 w-3.5 text-indigo-600" />
                <span>Biotech & Specialty Pharma</span>
              </button>
            </div>

            {/* Benchmark Cohort Toggle */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Benchmark:</span>
              <button
                onClick={() => setBenchmarkCohort('pres_club')}
                className={`px-2.5 py-1 rounded font-semibold text-[11px] transition ${
                  benchmarkCohort === 'pres_club'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                President's Club (Top 10%)
              </button>
              <button
                onClick={() => setBenchmarkCohort('median')}
                className={`px-2.5 py-1 rounded font-semibold text-[11px] transition ${
                  benchmarkCohort === 'median'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Associate Median
              </button>
            </div>
          </div>

          {/* D3 Render Container */}
          <div className="relative flex items-center justify-center min-h-[420px] w-full">
            <svg ref={svgRef} className="overflow-visible" />

            {/* Legend Overlay */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 text-[11px] space-y-1 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                <span className="font-semibold text-slate-800">Your Competency Profile</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${benchmarkCohort === 'pres_club' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                <span className="text-slate-600">
                  {benchmarkCohort === 'pres_club' ? "President's Club Baseline (90th %ile)" : 'Industry Associate Median (50th %ile)'}
                </span>
              </div>
            </div>

            {/* Tooltip on Hover */}
            {hoveredDimension && (
              <div className="absolute bottom-2 right-2 bg-slate-900 text-white p-3 rounded-lg text-xs shadow-xl max-w-xs space-y-1 border border-slate-700 animate-in fade-in duration-150">
                <div className="font-bold text-indigo-300">{hoveredDimension.name}</div>
                <div className="text-[11px] text-slate-300">{hoveredDimension.description}</div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800 font-mono text-[11px]">
                  <span>Your Score: <strong className="text-white">{hoveredDimension.userScore}%</strong></span>
                  <span>Target: <strong className="text-amber-400">{benchmarkCohort === 'pres_club' ? hoveredDimension.presClubBenchmark : hoveredDimension.medianBenchmark}%</strong></span>
                </div>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            💡 Hover over vertices on the radar chart to inspect specific skill descriptions and benchmark targets.
          </p>
        </div>

        {/* Right Column: Dimensional Breakdown & Target Closing (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dimension Progress Bars */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Dimensional Proficiency Breakdown
            </h3>
            <div className="space-y-3 text-xs">
              {activeDimensions.map((dim) => {
                const targetScore = benchmarkCohort === 'pres_club' ? dim.presClubBenchmark : dim.medianBenchmark;
                const isSurplus = dim.userScore >= targetScore;
                return (
                  <div key={dim.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">{dim.name}</span>
                      <div className="font-mono text-slate-600">
                        <span className="font-bold text-indigo-600">{dim.userScore}%</span>
                        <span className="text-slate-400"> / {targetScore}%</span>
                      </div>
                    </div>
                    {/* Progress Bar with Target Marker */}
                    <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSurplus ? 'bg-indigo-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${dim.userScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actionable Gap Closing Plan */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Prioritized Skill Acceleration Plan</span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              Based on your detected proficiency gaps compared to the {benchmarkCohort === 'pres_club' ? "President's Club" : 'Industry Median'} cohort:
            </p>

            <div className="space-y-2">
              {priorityGaps.map((gap, idx) => (
                <div
                  key={gap.id}
                  className="rounded-lg bg-white border border-indigo-200 p-3 space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      #{idx + 1} Growth Focus: {gap.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                      {(benchmarkCohort === 'pres_club' ? gap.presClubBenchmark : gap.medianBenchmark) - gap.userScore}% Gap
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{gap.description}</p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-indigo-600 font-semibold text-[11px]">{gap.recommendedLab}</span>
                    {onNavigateToView && (
                      <button
                        onClick={() => onNavigateToView('practice_lab')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900"
                      >
                        <span>Start Lab</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
