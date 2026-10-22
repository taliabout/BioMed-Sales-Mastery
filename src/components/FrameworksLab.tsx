import React, { useState } from 'react';
import {
  MEDDPICC_CHECKLIST,
  SPIN_QUESTIONS_LIBRARY,
  VAC_SUBMISSION_CHECKLIST,
} from '../data/frameworksData';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  FileCheck,
  Award,
} from 'lucide-react';

export const FrameworksLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meddpicc' | 'spin' | 'vac'>('meddpicc');

  // MEDDPICC state
  const [meddpiccScores, setMeddpiccScores] = useState<Record<string, number>>({
    M: 80,
    E: 40,
    D1: 75,
    D2: 60,
    P: 30,
    I: 90,
    C1: 85,
    C2: 50,
  });

  // VAC state
  const [vacChecked, setVacChecked] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: true,
    4: false,
    5: false,
  });

  const calculateMEDDPICCTotal = () => {
    const values = Object.values(meddpiccScores);
    const sum = values.reduce((acc, v) => acc + v, 0);
    return Math.round(sum / values.length);
  };

  const meddpiccHealth = calculateMEDDPICCTotal();

  return (
    <div className="space-y-6">
      {/* Framework Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Elite Healthcare Sales Frameworks & Deal Auditor
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Audit your hospital deals with institutional rigor. Eliminate pipeline blindspots before the end of the quarter.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {[
            { id: 'meddpicc', label: 'MEDDPICC Deal Auditor' },
            { id: 'spin', label: 'Clinical SPIN Question Engine' },
            { id: 'vac', label: 'VAC Submission Readiness' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: MEDDPICC AUDITOR */}
      {activeTab === 'meddpicc' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Scoring Grid */}
          <div className="space-y-4 lg:col-span-8">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Interactive Healthcare MEDDPICC Checklist
                </h3>
                <span className="text-xs text-slate-400">
                  Rate each dimension based on customer evidence
                </span>
              </div>

              <div className="space-y-4">
                {MEDDPICC_CHECKLIST.map((item, idx) => {
                  const key = idx === 2 ? 'D1' : idx === 3 ? 'D2' : idx === 6 ? 'C1' : idx === 7 ? 'C2' : item.letter;
                  const currentScore = meddpiccScores[key] || 50;

                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 font-mono text-xs font-bold text-blue-700">
                            {item.letter}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-blue-700">
                            {currentScore}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.healthcareQuestion}
                      </p>

                      {/* Slider */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={currentScore}
                        onChange={(e) =>
                          setMeddpiccScores((prev) => ({
                            ...prev,
                            [key]: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full accent-blue-600 cursor-pointer"
                      />

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[11px] pt-1">
                        <div className="text-emerald-900 bg-emerald-50 p-2 rounded border border-emerald-200">
                          <strong>Green Flag:</strong> {item.greenFlag}
                        </div>
                        <div className="text-rose-900 bg-rose-50 p-2 rounded border border-rose-200">
                          <strong>Red Flag:</strong> {item.redFlag}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Overall Score & Risk Analysis */}
          <div className="space-y-4 lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Deal Health & Close Probability
              </h4>
              <div className="text-4xl font-extrabold font-mono text-blue-600">
                {meddpiccHealth}%
              </div>
              <p className="mt-1 text-xs text-slate-700 font-medium">
                {meddpiccHealth >= 80
                  ? 'High Probability Forecast (Safe to commit)'
                  : meddpiccHealth >= 60
                  ? 'Moderate Risk: Economic Buyer or Paper Process gap'
                  : 'Critical Slippage Risk: Deal relies on clinical wishful thinking'}
              </p>

              <div className="mt-4 border-t border-slate-100 pt-3 text-left space-y-2 text-xs">
                <span className="font-bold text-slate-600 uppercase tracking-wider block">
                  Automated Risk Diagnoses:
                </span>
                {meddpiccScores['E'] < 60 && (
                  <div className="text-rose-900 bg-rose-50 p-2.5 rounded border border-rose-200">
                    ⚠ <strong>Economic Buyer Unqualified:</strong> You have not engaged the hospital CFO or Supply Chain VP. The deal cannot close on surgeon enthusiasm alone.
                  </div>
                )}
                {meddpiccScores['P'] < 60 && (
                  <div className="text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200">
                    ⚠ <strong>Paper Process Blindspot:</strong> Hospital procurement and BAA review often take 60-90 days. Map out the master agreement terms today.
                  </div>
                )}
                {meddpiccScores['M'] >= 80 && meddpiccScores['C1'] >= 80 && (
                  <div className="text-emerald-900 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    ✓ <strong>Strong Champion & ROI Metrics:</strong> Your clinical leader is prepared to defend the total cost of care model.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SPIN SELLING QUESTION ENGINE */}
      {activeTab === 'spin' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Surgical & Clinical SPIN Question Generator
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Never lecture a physician on why your product is superior. Use this structured question sequence so the surgeon vocalizes their own dissatisfaction with current clinical tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SPIN_QUESTIONS_LIBRARY.map((spin, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 font-mono text-sm font-bold text-blue-700">
                      {spin.phase[0]}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{spin.phase} Phase</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">{spin.description}</p>
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  {spin.questions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="rounded border border-slate-200 bg-white p-2.5 text-xs text-slate-800"
                    >
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: VAC SUBMISSION READINESS */}
      {activeTab === 'vac' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Value Analysis Committee (VAC) Submission Packet Checklist
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Hospital VAC committees reject 80% of submissions for incomplete clinical documentation. Verify all 6 mandatory pillars.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Readiness Score:</span>
              <span className="font-mono font-bold text-blue-700 text-sm">
                {Math.round(
                  (Object.values(vacChecked).filter(Boolean).length / VAC_SUBMISSION_CHECKLIST.length) * 100
                )}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {VAC_SUBMISSION_CHECKLIST.map((item, idx) => {
              const isChecked = Boolean(vacChecked[idx]);
              return (
                <div
                  key={idx}
                  onClick={() =>
                    setVacChecked((prev) => ({
                      ...prev,
                      [idx]: !isChecked,
                    }))
                  }
                  className={`flex cursor-pointer items-start justify-between rounded-lg border p-4 transition ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50/70'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="pr-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.item}</span>
                      <span className="text-[11px] text-slate-500">· {item.statusDescription}</span>
                    </div>
                    <p className="text-xs text-slate-600">{item.requirement}</p>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
