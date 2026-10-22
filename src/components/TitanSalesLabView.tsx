import React, { useState } from 'react';
import {
  SHELBY_HAAS_METHODOLOGY,
  TITAN_FRAMEWORKS,
  SHELBY_HAAS_OBJECTION_SCENARIOS,
  TitanFramework,
  ObjectionInteractiveScenario,
} from '../data/shelbyHaasAndTitansData';
import {
  Flame,
  Award,
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Zap,
  Target,
  Users,
  Compass,
} from 'lucide-react';

export const TitanSalesLabView: React.FC = () => {
  const [selectedTitan, setSelectedTitan] = useState<TitanFramework>(TITAN_FRAMEWORKS[0]);
  const [activeTab, setActiveTab] = useState<'shelby_method' | 'all_titans' | 'interactive_reframe_sim'>('shelby_method');
  const [selectedScenario, setSelectedScenario] = useState<ObjectionInteractiveScenario>(
    SHELBY_HAAS_OBJECTION_SCENARIOS[0]
  );
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [showFullMasterScript, setShowFullMasterScript] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-xl border border-blue-200 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Titan Sales Lab & Executive Methodology Institute</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Shelby Haas Modern Sales Mastery & Global Corporate Playbooks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Deconstruct the exact closing psychology, reverse selling frameworks, and objection reframes taught by <strong>Shelby Haas (She Sells Academy)</strong>, combined with elite enterprise methodologies from <strong>Chris Voss (Never Split the Difference)</strong>, <strong>Keenan (Gap Selling)</strong>, and <strong>The Challenger Sale</strong>.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveTab('shelby_method')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition shadow-xs ${
              activeTab === 'shelby_method'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Shelby Haas: Intro-to-Close Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('interactive_reframe_sim')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition shadow-xs ${
              activeTab === 'interactive_reframe_sim'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>5-Step Objection Simulator ({SHELBY_HAAS_OBJECTION_SCENARIOS.length} Scenarios)</span>
          </button>
          <button
            onClick={() => setActiveTab('all_titans')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition shadow-xs ${
              activeTab === 'all_titans'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Corporate Titans & Methodologies ({TITAN_FRAMEWORKS.length} Systems)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SHELBY HAAS METHODOLOGY */}
      {activeTab === 'shelby_method' && (
        <div className="space-y-6">
          {/* Shelby Profile & Origin */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600">
                  Featured Master Trainer Profile
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {SHELBY_HAAS_METHODOLOGY.creator} · {SHELBY_HAAS_METHODOLOGY.organization}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {SHELBY_HAAS_METHODOLOGY.background}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 px-3 py-1.5 border border-blue-200 text-xs font-semibold text-blue-800">
                President's Club Standard
              </div>
            </div>

            {/* Core Tenets */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {SHELBY_HAAS_METHODOLOGY.coreTenets.map((tenet, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 hover:bg-white hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{tenet.title}</h3>
                  </div>
                  <p className="text-xs font-semibold text-blue-700 italic">"{tenet.tagline}"</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{tenet.description}</p>
                  <div className="border-t border-slate-200 pt-2 text-[11px] font-medium text-slate-800 bg-white p-2 rounded border">
                    <span className="font-bold text-blue-600">Golden Rule: </span>
                    {tenet.ruleOfThumb}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Objection Method Visual Walkthrough */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
                  Core Tactical Weapon
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-semibold text-slate-600">
                  Applied to Hospital Rejections & Surgeon Hesitation
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                The Shelby Haas 5-Step Objection Reframing Framework
              </h3>
              <p className="text-xs text-slate-500">
                Why 95% of reps lose deals by fighting objections immediately, and how to guide the buyer to dissolve their own hesitation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {SHELBY_HAAS_METHODOLOGY.fiveStepObjectionMethod.map((step) => (
                <div
                  key={step.step}
                  className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700">
                        STEP 0{step.step}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">{step.name}</h4>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed font-mono bg-white p-2 rounded border border-blue-100">
                      {step.directive}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 border-t border-blue-100/60 pt-2 mt-2">
                    <strong>Psychology:</strong> {step.purpose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE 5-STEP OBJECTION SIMULATOR */}
      {activeTab === 'interactive_reframe_sim' && (
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div className="flex flex-wrap gap-2">
            {SHELBY_HAAS_OBJECTION_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  setSelectedScenario(scen);
                  setActiveStepTab(1);
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition shadow-xs text-left ${
                  selectedScenario.id === scen.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>{scen.prospectRole.split(',')[0]}</div>
                <div className="text-[10px] font-normal opacity-85 truncate max-w-[200px]">
                  {scen.objection.slice(0, 35)}...
                </div>
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            {/* Objection Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
                  Target Objection Encountered
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Stakeholder: {selectedScenario.prospectRole}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 italic bg-rose-50/70 p-4 rounded-xl border border-rose-200">
                {selectedScenario.objection}
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                <strong>Setting & Context:</strong> {selectedScenario.context}
              </p>
            </div>

            {/* Side-by-Side: Amateur vs Master Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Amateur Approach */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    {selectedScenario.amateurApproach.label}
                  </span>
                </div>
                <div className="rounded-lg border border-rose-200 bg-white p-3.5 font-mono text-xs text-rose-950 italic leading-relaxed">
                  {selectedScenario.amateurApproach.response}
                </div>
                <div className="text-xs text-rose-900 bg-rose-100/60 p-3 rounded-lg">
                  <strong>Why It Fails:</strong> {selectedScenario.amateurApproach.whyItFails}
                </div>
              </div>

              {/* Shelby Haas Master 5-Step Breakdown */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {selectedScenario.shelbyHaasApproach.label}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowFullMasterScript(!showFullMasterScript)}
                    className="text-[11px] font-bold text-emerald-700 underline"
                  >
                    {showFullMasterScript ? 'View 5-Step Breakdown' : 'View Full Script'}
                  </button>
                </div>

                {showFullMasterScript ? (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-emerald-200 bg-white p-3.5 font-mono text-xs text-slate-900 leading-relaxed shadow-2xs">
                      {selectedScenario.shelbyHaasApproach.fullDeliveredScript}
                    </div>
                    <div className="text-xs text-emerald-950 bg-emerald-100/70 p-3 rounded-lg">
                      <strong>Why It Wins:</strong> {selectedScenario.shelbyHaasApproach.whyItWins}
                    </div>
                  </div>
                ) : (
                  /* Step-by-Step Interactive Tabs */
                  <div className="space-y-3">
                    <div className="flex gap-1 overflow-x-auto pb-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <button
                          key={st}
                          onClick={() => setActiveStepTab(st)}
                          className={`rounded px-2.5 py-1 text-xs font-bold transition ${
                            activeStepTab === st
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          Step {st}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-lg border border-emerald-200 bg-white p-3.5 text-xs text-slate-900 leading-relaxed min-h-[90px]">
                      {activeStepTab === 1 && (
                        <div>
                          <strong className="text-emerald-700 block mb-1">Step 1: Exhaust & Deeply Listen</strong>
                          {selectedScenario.shelbyHaasApproach.fiveStepBreakdown.step1Listen}
                        </div>
                      )}
                      {activeStepTab === 2 && (
                        <div>
                          <strong className="text-emerald-700 block mb-1">Step 2: Validate & Mirror</strong>
                          {selectedScenario.shelbyHaasApproach.fiveStepBreakdown.step2Validate}
                        </div>
                      )}
                      {activeStepTab === 3 && (
                        <div>
                          <strong className="text-emerald-700 block mb-1">Step 3: Clarifying Diagnosis Question</strong>
                          {selectedScenario.shelbyHaasApproach.fiveStepBreakdown.step3Clarify}
                        </div>
                      )}
                      {activeStepTab === 4 && (
                        <div>
                          <strong className="text-emerald-700 block mb-1">Step 4: Honest Value Reframe & Cost of Inaction</strong>
                          {selectedScenario.shelbyHaasApproach.fiveStepBreakdown.step4ValueReframe}
                        </div>
                      )}
                      {activeStepTab === 5 && (
                        <div>
                          <strong className="text-emerald-700 block mb-1">Step 5: Resolution Check & Trial Close</strong>
                          {selectedScenario.shelbyHaasApproach.fiveStepBreakdown.step5ResolutionCheck}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALL CORPORATE TITANS & METHODOLOGIES */}
      {activeTab === 'all_titans' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Framework List */}
          <div className="lg:col-span-4 space-y-2.5">
            {TITAN_FRAMEWORKS.map((fw) => {
              const isSelected = selectedTitan.id === fw.id;
              return (
                <button
                  key={fw.id}
                  onClick={() => setSelectedTitan(fw)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-400'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-blue-700">
                      {fw.creator}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{fw.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{fw.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Titan Framework Detail */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                    Master Commercial System
                  </span>
                  <span className="text-xs text-slate-400">Created by {selectedTitan.creator}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedTitan.name}: {selectedTitan.title}
                </h2>
                <p className="text-xs font-semibold text-blue-700 mt-1 italic">
                  "{selectedTitan.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong>Core Philosophy:</strong> {selectedTitan.corePhilosophy}
                </p>
              </div>

              {/* Five Stages Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-blue-600" />
                  Stage-by-Stage Procedural Execution
                </h3>

                <div className="space-y-2.5">
                  {selectedTitan.fiveStages.map((stage) => (
                    <div
                      key={stage.stage}
                      className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                            {stage.stage}
                          </span>
                          {stage.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{stage.description}</p>
                      <div className="rounded border border-slate-200 bg-white p-2.5 font-mono text-xs text-slate-800">
                        {stage.keyScript}
                      </div>
                      <div className="text-[11px] text-blue-700 bg-blue-50/50 p-2 rounded">
                        <strong>Clinical/Hospital Application:</strong> {stage.clinicalTranslation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret Tactics & Mistakes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    President's Club Secret Tactics
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedTitan.secretTactics.map((tac, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{tac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-rose-500" />
                    Deadly Amateur Mistakes
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedTitan.commonMistakes.map((mis, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">✗</span>
                        <span>{mis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
