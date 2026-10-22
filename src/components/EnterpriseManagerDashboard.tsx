import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Award,
  Calendar,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
  Send,
  ShieldCheck,
  FileText,
  DollarSign,
  Calculator,
  Sliders,
  ExternalLink,
  ChevronRight,
  Lock,
  Eye,
  Key
} from 'lucide-react';

interface CohortSummary {
  id: string;
  name: string;
  repCount: number;
  launchDate: string;
  completionRate: number; // percentage
  avgAssessmentScore: number;
  roleplayTrend: number[]; // weekly scores
  avgTimeToCertDays: number;
  weakestSkills: { name: string; score: number }[];
}

const SAMPLE_COHORTS: CohortSummary[] = [
  {
    id: 'coh-alpha',
    name: 'Q4 Oncology Launch Cohort (Northeast)',
    repCount: 18,
    launchDate: '2026-09-15',
    completionRate: 88,
    avgAssessmentScore: 91,
    roleplayTrend: [65, 74, 84, 91],
    avgTimeToCertDays: 22,
    weakestSkills: [
      { name: 'VAC Total-Cost-of-Care Modeling', score: 62 },
      { name: 'Unsolicited Off-Label MIR Handoff', score: 68 },
    ],
  },
  {
    id: 'coh-beta',
    name: 'Q1 MedTech Robotic Specialists (Midwest & Texas)',
    repCount: 14,
    launchDate: '2026-10-01',
    completionRate: 72,
    avgAssessmentScore: 84,
    roleplayTrend: [58, 69, 78, 85],
    avgTimeToCertDays: 26,
    weakestSkills: [
      { name: 'GPO Contract Tier Alignment', score: 55 },
      { name: 'Shelby Haas Outcome Detachment', score: 64 },
    ],
  },
  {
    id: 'coh-gamma',
    name: 'Specialty Biopharma Key Account Managers',
    repCount: 12,
    launchDate: '2026-10-10',
    completionRate: 64,
    avgAssessmentScore: 88,
    roleplayTrend: [62, 73, 82, 88],
    avgTimeToCertDays: 24,
    weakestSkills: [
      { name: '340B Hospital Pricing Mechanics', score: 58 },
      { name: 'Medicare Part B ASP+6% Spread', score: 66 },
    ],
  },
];

interface AssignmentItem {
  id: string;
  title: string;
  cohort: string;
  deadline: string;
  completedReps: number;
  totalReps: number;
  status: 'active' | 'completed' | 'overdue';
}

const SAMPLE_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asg-1',
    title: 'Pivotal ARROW-COLON Indication & Biomarker Certification',
    cohort: 'Q4 Oncology Launch Cohort (Northeast)',
    deadline: '2026-11-01',
    completedReps: 16,
    totalReps: 18,
    status: 'active',
  },
  {
    id: 'asg-2',
    title: 'Hospital VAC 5-Pillar Budget Impact Defense Simulation',
    cohort: 'Q1 MedTech Robotic Specialists (Midwest & Texas)',
    deadline: '2026-11-05',
    completedReps: 9,
    totalReps: 14,
    status: 'active',
  },
  {
    id: 'asg-3',
    title: 'Federal Anti-Kickback Statute & Modest Meal Compliance Audit',
    cohort: 'Specialty Biopharma Key Account Managers',
    deadline: '2026-10-28',
    completedReps: 12,
    totalReps: 12,
    status: 'completed',
  },
];

interface LeaderboardEntry {
  rank: number;
  name: string;
  cohort: string;
  score: number;
  roleplaysDone: number;
  isOptedIn: boolean;
}

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Rep Candidate #104 (Fictional Profile)', cohort: 'Q4 Oncology', score: 98, roleplaysDone: 14, isOptedIn: true },
  { rank: 2, name: 'Rep Candidate #112 (Fictional Profile)', cohort: 'Q1 MedTech', score: 95, roleplaysDone: 12, isOptedIn: true },
  { rank: 3, name: 'Rep Candidate #108 (Fictional Profile)', cohort: 'Q4 Oncology', score: 93, roleplaysDone: 11, isOptedIn: true },
  { rank: 4, name: 'Rep Candidate #121 (Fictional Profile)', cohort: 'Biopharma KAM', score: 90, roleplaysDone: 10, isOptedIn: true },
  { rank: 5, name: 'Anonymous Rep #130 (Opted Out)', cohort: 'Q1 MedTech', score: 89, roleplaysDone: 9, isOptedIn: false },
];

export const EnterpriseManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cohorts' | 'kirkpatrick' | 'roi' | 'assignments' | 'scorm_sso'>('cohorts');
  const [selectedCohortId, setSelectedCohortId] = useState<string>(SAMPLE_COHORTS[0].id);

  // Editable ROI Assumptions (clearly labeled)
  const [repsInCohort, setRepsInCohort] = useState<number>(20);
  const [annualQuota, setAnnualQuota] = useState<number>(2500000);
  const [standardRampDays, setStandardRampDays] = useState<number>(120);
  const [rampDaysSaved, setRampDaysSaved] = useState<number>(25);
  const [repTurnoverRate, setRepTurnoverRate] = useState<number>(15);

  // Reminder alert state
  const [reminderSentFor, setReminderSentFor] = useState<string | null>(null);

  // Opt-in Leaderboard Toggle state
  const [userOptIn, setUserOptIn] = useState<boolean>(true);

  const activeCohort = SAMPLE_COHORTS.find((c) => c.id === selectedCohortId) || SAMPLE_COHORTS[0];

  // ROI Calculations
  const dailyQuotaProductivity = annualQuota / 250;
  const addedRevenuePerRep = dailyQuotaProductivity * rampDaysSaved;
  const totalRevenueAcceleration = addedRevenuePerRep * repsInCohort;
  const estimatedPlatformCost = repsInCohort * 3500; // illustrative enterprise seat rate
  const netRoi = totalRevenueAcceleration - estimatedPlatformCost;
  const roiMultiple = (totalRevenueAcceleration / estimatedPlatformCost).toFixed(1);

  const handleSendReminder = (assignmentTitle: string) => {
    setReminderSentFor(assignmentTitle);
    setTimeout(() => setReminderSentFor(null), 3500);
  };

  const exportCohortCSV = () => {
    const headers = ['Cohort Name', 'Total Reps', 'Completion Rate (%)', 'Avg Assessment (%)', 'Avg Days to Cert', 'Weakest Skill 1', 'Weakest Skill 2'];
    const rows = SAMPLE_COHORTS.map(c => [
      `"${c.name}"`,
      c.repCount,
      c.completionRate,
      c.avgAssessmentScore,
      c.avgTimeToCertDays,
      `"${c.weakestSkills[0]?.name || ''}"`,
      `"${c.weakestSkills[1]?.name || ''}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cohort_performance_analytics_${Date.now()}.csv`;
    a.click();
  };

  const exportSCORMPackage = () => {
    const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="BioMed_Sales_Mastery_Enterprise" version="1.3"
  xmlns="http://www.imsglobal.org/xsd/imscp_v1p1">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
    <title>BioMed Sales Mastery Enterprise Pilot Package (Prototype)</title>
  </metadata>
  <organizations default="org_biomed">
    <organization identifier="org_biomed">
      <title>BioMed Commercial Academy</title>
      <item identifier="item_1" identifierref="res_1">
        <title>Module 1: Approved Indication &amp; Regulatory Compliance</title>
      </item>
      <item identifier="item_2" identifierref="res_2">
        <title>Module 2: Hospital Value Analysis Committee (VAC) Defense</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent" adlcp:scormType="sco" href="index.html" />
    <resource identifier="res_2" type="webcontent" adlcp:scormType="sco" href="vac.html" />
  </resources>
</manifest>`;
    const blob = new Blob([manifestXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imsmanifest_scorm2004_prototype.xml`;
    a.click();
  };

  const exportXAPIStatements = () => {
    const xapiData = [
      {
        actor: { name: "Associate Rep #104", mbox: "mailto:rep104@biomed.internal" },
        verb: { id: "http://adlnet.gov/expapi/verbs/completed", display: { "en-US": "completed" } },
        object: { id: "http://biomed-sales.internal/activities/arrow-colon-quiz", definition: { name: { "en-US": "ARROW-COLON Verification Exam" } } },
        result: { score: { scaled: 0.95, raw: 95 }, success: true, duration: "PT14M32S" },
        timestamp: new Date().toISOString()
      },
      {
        actor: { name: "Associate Rep #112", mbox: "mailto:rep112@biomed.internal" },
        verb: { id: "http://adlnet.gov/expapi/verbs/passed", display: { "en-US": "passed" } },
        object: { id: "http://biomed-sales.internal/activities/vac-simulation", definition: { name: { "en-US": "Value Analysis Committee Live Roleplay" } } },
        result: { score: { scaled: 0.92, raw: 92 }, success: true },
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    const blob = new Blob([JSON.stringify(xapiData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xapi_statements_export_prototype.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Navigation Tabs */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <BarChart3 className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Commercial Sales Leadership & Manager Dashboard
            </h2>
            <span className="rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 border border-indigo-200 uppercase">
              Phase 3 Pilot Prototype
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Measurable rep ramp velocity, Kirkpatrick 4-level evaluation, editable ROI model, and cohort learning management. (Sample data labeled illustrative).
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === 'cohorts' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cohorts & Ramp
          </button>
          <button
            onClick={() => setActiveTab('kirkpatrick')}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === 'kirkpatrick' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kirkpatrick L1-L4
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === 'roi' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ROI Estimator
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === 'assignments' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assignments & Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('scorm_sso')}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === 'scorm_sso' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SCORM / SSO Prototype
          </button>
        </div>
      </div>

      {/* VIEW 1: COHORTS & RAMP VELOCITY */}
      {activeTab === 'cohorts' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <span>Commercial Cohort Tracking & Time-to-Certification</span>
            </h3>
            <button
              onClick={exportCohortCSV}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export Cohort CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_COHORTS.map((c) => {
              const isSelected = c.id === activeCohort.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCohortId(c.id)}
                  className={`rounded-xl border p-5 cursor-pointer transition shadow-xs ${
                    isSelected ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded font-semibold">
                      {c.repCount} Reps
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded bg-white p-2 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Curriculum Completion</span>
                      <strong className="text-slate-900 text-sm font-mono">{c.completionRate}%</strong>
                    </div>
                    <div className="rounded bg-white p-2 border border-slate-100">
                      <span className="text-slate-500 block text-[10px]">Avg Days to Cert</span>
                      <strong className="text-emerald-700 text-sm font-mono">{c.avgTimeToCertDays} days</strong>
                    </div>
                  </div>

                  {/* Roleplay Trend Sparkline */}
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px]">
                    <span className="text-slate-500 block mb-1 font-semibold">
                      Roleplay Mastery Trend (Weeks 1-4):
                    </span>
                    <div className="flex items-center gap-2 font-mono text-slate-700">
                      {c.roleplayTrend.map((score, i) => (
                        <div key={i} className="flex-1 text-center bg-slate-100 py-1 rounded">
                          <span className="block text-[8px] text-slate-400">W{i + 1}</span>
                          <strong className={score >= 80 ? 'text-emerald-700' : 'text-slate-700'}>{score}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Weakest Skills & Interventions for Selected Cohort */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900">
                Targeted Interventions: Weakest Competencies in "{activeCohort.name}"
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Illustrative Sample Data</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeCohort.weakestSkills.map((sk, idx) => (
                <div key={idx} className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{sk.name}</span>
                    <span className="font-mono text-amber-900 font-bold bg-amber-200/60 px-1.5 py-0.5 rounded text-[10px]">
                      Average: {sk.score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Recommended Manager Action: Assign focused practice drill in Commercial Practice Lab with targeted feedback on objection reframing.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: KIRKPATRICK 4-LEVEL EVALUATION */}
      {activeTab === 'kirkpatrick' && (
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-4 w-4 text-indigo-600" />
              <span>Kirkpatrick 4-Level Training Evaluation Framework (Pilot Matrix)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Gold-standard learning science methodology measuring Reaction, Learning, Behavior, and Business Results. (Illustrative sample outcomes).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Level 1: Reaction */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 text-xs uppercase tracking-wide">
                  Level 1: Reaction & Satisfaction
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">
                  4.8 / 5.0 Rating
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures whether commercial sales representatives find the simulations, objection playbooks, and clinical dossiers engaging and relevant to field encounters.
              </p>
              <div className="rounded bg-slate-50 p-2 text-[11px] text-slate-700 font-medium">
                "94% of reps reported feeling significantly more confident navigating surgical chair and procurement objections."
              </div>
            </div>

            {/* Level 2: Learning */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 text-xs uppercase tracking-wide">
                  Level 2: Knowledge Retention & Mastery
                </span>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs border border-indigo-200">
                  +38% Pre-to-Post Gain
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective scoring across clinical endpoints, prescribing indications, black box neutropenia warnings, and Anti-Kickback Statute safe harbor compliance.
              </p>
              <div className="rounded bg-slate-50 p-2 text-[11px] text-slate-700 font-medium">
                Baseline assessment average: 53% &rarr; Post-curriculum certified average: 91%.
              </div>
            </div>

            {/* Level 3: Behavior */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 text-xs uppercase tracking-wide">
                  Level 3: Field Behavioral Transfer
                </span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs border border-blue-200">
                  89% Adherence
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analyzed via simulated voice roleplay: adherence to Shelby Haas outcome detachment, reverse discovery questioning, and mandatory Fair Balance disclosures.
              </p>
              <div className="rounded bg-slate-50 p-2 text-[11px] text-slate-700 font-medium">
                Talk-to-listen ratio improved from 72:28 (product lecturing) to 38:62 (consultative inquiry).
              </div>
            </div>

            {/* Level 4: Results */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 text-xs uppercase tracking-wide">
                  Level 4: Business Results & Ramp Velocity
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">
                  -25 Days to Full Quota
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial bottom line: territory ramp accelerated by 25 days, reducing the time required for new hires to achieve first hospital VAC submission.
              </p>
              <div className="rounded bg-slate-50 p-2 text-[11px] text-slate-700 font-medium">
                Estimated incremental territory revenue gained: $250,000 per rep during initial launch quarter.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ROI ESTIMATOR WITH EDITABLE LABELED ASSUMPTIONS */}
      {activeTab === 'roi' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-emerald-600" />
                <span>Commercial Training Pilot ROI Estimator</span>
              </h3>
              <p className="text-xs text-slate-500">
                Transparent financial model demonstrating rep ramp acceleration. All input variables are editable assumptions clearly labeled.
              </p>
            </div>
            <span className="rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-200">
              Interactive Financial Model
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Editable Assumptions (6 cols) */}
            <div className="lg:col-span-6 space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Model Assumptions (Editable)
              </span>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Number of Commercial Reps in Cohort</span>
                  <span className="font-mono text-indigo-700">{repsInCohort} Reps</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={repsInCohort}
                  onChange={(e) => setRepsInCohort(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Average Annual Quota per Rep ($)</span>
                  <span className="font-mono text-indigo-700">${annualQuota.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="5000000"
                  step="250000"
                  value={annualQuota}
                  onChange={(e) => setAnnualQuota(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Standard Historical Ramp Time (Days)</span>
                  <span className="font-mono text-slate-700">{standardRampDays} Days</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={standardRampDays}
                  onChange={(e) => setStandardRampDays(parseInt(e.target.value, 10))}
                  className="w-full accent-slate-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Ramp Velocity Acceleration Saved (Days)</span>
                  <span className="font-mono text-emerald-700">{rampDaysSaved} Days Saved</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={rampDaysSaved}
                  onChange={(e) => setRampDaysSaved(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            {/* Right: Calculated Financial Outputs (6 cols) */}
            <div className="lg:col-span-6 rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                  Projected Financial Impact Summary
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Based on ${dailyQuotaProductivity.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day quota productivity per rep.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg bg-white p-3 border border-emerald-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Total Revenue Acceleration Gained</span>
                  <div className="text-2xl font-extrabold text-emerald-700 font-mono">
                    ${totalRevenueAcceleration.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    (${addedRevenuePerRep.toLocaleString()} per rep &times; {repsInCohort} reps)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Estimated Pilot Cost</span>
                    <strong className="text-slate-800 font-mono text-sm">${estimatedPlatformCost.toLocaleString()}</strong>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Projected Pilot ROI Multiple</span>
                    <strong className="text-indigo-700 font-mono text-sm">{roiMultiple}x ROI</strong>
                  </div>
                </div>
              </div>

              <div className="rounded bg-emerald-100/70 p-2 text-[10px] text-emerald-900 border border-emerald-200">
                <strong>Disclaimer:</strong> Financial calculations are model projections for enterprise pilot planning. Actual quota attainment varies with market conditions, formulary tier access, and field execution.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: ASSIGNMENTS, DEADLINES & OPT-IN LEADERBOARD */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          {/* Assignments Strip */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Active Commercial Assignments & Deadlines</span>
              </h3>
              {reminderSentFor && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 animate-fade-in">
                  &check; Reminder dispatched to uncompleted reps!
                </span>
              )}
            </div>

            <div className="space-y-2">
              {SAMPLE_ASSIGNMENTS.map((asg) => (
                <div
                  key={asg.id}
                  className="rounded-lg border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/50 hover:bg-slate-50 transition"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-xs block">{asg.title}</span>
                    <span className="text-[11px] text-slate-500">{asg.cohort}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Deadline</span>
                      <span className="font-semibold text-slate-700">{asg.deadline}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Progress</span>
                      <span className="font-semibold text-indigo-700">{asg.completedReps}/{asg.totalReps} completed</span>
                    </div>

                    <button
                      onClick={() => handleSendReminder(asg.title)}
                      className="rounded bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-[11px] font-bold transition shadow-2xs flex items-center gap-1 font-sans"
                    >
                      <Send className="h-3 w-3" />
                      <span>Send Reminder</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opt-In Leaderboard */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  <span>Opt-In Commercial Learning Leaderboard</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Rep participation is strictly opt-in to promote healthy motivation without public shaming.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600 font-medium">My Leaderboard Visibility:</span>
                <button
                  onClick={() => setUserOptIn(!userOptIn)}
                  className={`rounded px-2.5 py-1 text-[11px] font-bold border transition ${
                    userOptIn ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {userOptIn ? 'Opted In (Visible)' : 'Opted Out (Anonymous)'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2 px-3 text-left">Rank</th>
                    <th className="py-2 px-3 text-left">Representative Name</th>
                    <th className="py-2 px-3 text-left">Cohort</th>
                    <th className="py-2 px-3 text-left">Assessment Score</th>
                    <th className="py-2 px-3 text-left">Roleplays Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {INITIAL_LEADERBOARD.map((lb) => (
                    <tr key={lb.rank} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold font-mono text-indigo-700">#{lb.rank}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{lb.name}</td>
                      <td className="py-2 px-3 text-slate-500">{lb.cohort}</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-700">{lb.score}%</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{lb.roleplaysDone} drills</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: SCORM / xAPI EXPORT & ENTERPRISE SSO PROTOTYPE */}
      {activeTab === 'scorm_sso' && (
        <div className="space-y-5">
          {/* Export Packages Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Export Content & Results as SCORM 2004 / xAPI Packages</span>
              </h3>
              <p className="text-xs text-slate-500">
                Integrate directly with Veeva Vault, Cornerstone OnDemand, Workday Learning, or SAP SuccessFactors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="rounded-lg border border-slate-200 p-4 space-y-2 bg-slate-50/50">
                <h4 className="font-bold text-slate-900 text-xs">SCORM 2004 4th Edition XML Manifest</h4>
                <p className="text-[11px] text-slate-600">
                  Standardized Learning Management System package containing course structure, SCO resource links, and mastery thresholds.
                </p>
                <button
                  onClick={exportSCORMPackage}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download SCORM Manifest XML (Prototype)</span>
                </button>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 space-y-2 bg-slate-50/50">
                <h4 className="font-bold text-slate-900 text-xs">xAPI (Experience API / Tin Can) JSON Log</h4>
                <p className="text-[11px] text-slate-600">
                  Granular statement streams capturing actor, verb, clinical object, scaled score, and simulation duration for LRS ingestion.
                </p>
                <button
                  onClick={exportXAPIStatements}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download xAPI Statement Stream (JSON)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SSO Architecture Note (Explicitly Marked Prototype) */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-indigo-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                  Enterprise SSO Architecture Note (SAML 2.0 & OIDC Prototype)
                </h3>
              </div>
              <span className="rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 border border-indigo-200">
                Architecture Prototype
              </span>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>
                In an enterprise life-sciences deployment, BioMed Sales Mastery interfaces with corporate Identity Providers (IdP) via <strong>SAML 2.0 Web Browser SSO Profile</strong> or <strong>OpenID Connect (OIDC)</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 ml-1">
                <li><strong>Supported Identity Providers:</strong> Okta, Microsoft Azure AD / Entra ID, PingFederate, and PingOne.</li>
                <li><strong>Just-In-Time (JIT) Provisioning:</strong> New commercial hires are provisioned directly upon authenticating with corporate credentials, with automatic assignment to their regional sales cohort.</li>
                <li><strong>SCIM 2.0 User Lifecycle Management:</strong> Automatic de-provisioning and role assignment (Sales Representative, District Manager, Compliance Auditor) mapped via Active Directory security groups.</li>
                <li><strong>Data Encryption & Security:</strong> AES-256 at rest, TLS 1.3 in transit, and multi-tenant isolation adhering to SOC 2 Type II and ISO 27001 standards.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
