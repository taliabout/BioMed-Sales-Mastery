import React, { useState } from 'react';
import { UserProfile, HealthcareTrack } from '../types';
import { HEALTHCARE_TRACKS } from '../data/tracksData';
import { Target, Award, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(profile.name || '');
  const [background, setBackground] = useState(profile.background);
  const [targetTrack, setTargetTrack] = useState<HealthcareTrack>(profile.targetTrack);
  const [incomeGoal, setIncomeGoal] = useState(profile.incomeGoal || '$200,000+');
  const [targetTimeline, setTargetTimeline] = useState(profile.targetTimeline);

  if (!isOpen) return null;

  const handleComplete = () => {
    onSaveProfile({
      ...profile,
      name: name.trim() || 'Future Sales Leader',
      background,
      targetTrack,
      incomeGoal,
      targetTimeline,
    });
    onClose();
  };

  const selectedTrackInfo = HEALTHCARE_TRACKS.find((t) => t.id === targetTrack) || HEALTHCARE_TRACKS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
                <Compass className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  Personalized Healthcare Sales Blueprint
                </h2>
                <p className="text-xs text-slate-400">
                  Step {step} of 3 · Calibrating your customized curriculum & career path
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 text-sm">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Your Full Name / Preferred Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Current Background & Experience Level
                </label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    {
                      id: 'college_grad',
                      label: 'College Graduate / Zero Sales Experience',
                      desc: 'Ready for intensive foundational training on anatomy, hospitals, and sales.',
                    },
                    {
                      id: 'b2b_sales',
                      label: 'B2B Tech / Outside Sales Background',
                      desc: 'Proven quota producer (Cintas, ADP, SaaS) needing healthcare domain adaptation.',
                    },
                    {
                      id: 'clinical_allied_health',
                      label: 'Clinical / Nurse / Scrub Tech / Allied Health',
                      desc: 'Deep anatomical & OR comfort; needing commercial negotiation & closing mastery.',
                    },
                    {
                      id: 'athlete_military',
                      label: 'Collegiate Athlete / Military Veteran',
                      desc: 'Extreme grit & competitive drive; prime profile for high-adrenaline device sales.',
                    },
                    {
                      id: 'pharma_to_device',
                      label: 'Pharma Rep Moving to Med Device / Biotech',
                      desc: 'Experienced in detailing; seeking procedural OR scrub-in & VAC navigation.',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBackground(item.id as any)}
                      className={`flex flex-col rounded-lg border p-3.5 text-left transition-all ${
                        background === item.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-medium text-slate-100">{item.label}</span>
                      <span className="mt-1 text-xs text-slate-400">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Target Healthcare Sales Specialization
                </label>
                <p className="mb-3 text-xs text-slate-400">
                  Select your primary vertical. The academy will tailor all case studies, simulation roleplays, and battlecards to this industry.
                </p>
                <div className="space-y-2.5">
                  {HEALTHCARE_TRACKS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTargetTrack(t.id)}
                      className={`flex w-full items-start justify-between rounded-lg border p-4 text-left transition-all ${
                        targetTrack === t.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-100">{t.title}</span>
                          {targetTrack === t.id && (
                            <span className="text-xs text-emerald-400 font-mono">Selected</span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{t.tagline}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                          <span>Avg Total Comp: <strong className="text-emerald-400">{t.avgTotalComp}</strong></span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>Env: {t.fieldEnvironment.split(',')[0]}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Target Compensation & Year 1 Earning Goal
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: '$130k - $180k', desc: 'Associate Rep (ASR)' },
                    { label: '$200k - $300k', desc: 'Full Territory Manager' },
                    { label: '$350k - $500k+', desc: 'President\'s Club Leader' },
                  ].map((comp) => (
                    <button
                      key={comp.label}
                      type="button"
                      onClick={() => setIncomeGoal(comp.label)}
                      className={`rounded-lg border p-3 text-center transition-all ${
                        incomeGoal === comp.label
                          ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-emerald-400">{comp.label}</div>
                      <div className="text-xs text-slate-400">{comp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Learning Pace & Career Sprint
                </label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    {
                      id: 'urgent_30_days',
                      title: '30-Day Immersion Sprint',
                      desc: 'Interviewing immediately; need rapid mastery of OR protocols & battlecards.',
                    },
                    {
                      id: 'steady_60_days',
                      title: '60-Day Strategic Track',
                      desc: 'Balanced study: complete all 8 modules, roleplays, and build your Brag Book.',
                    },
                    {
                      id: 'flexible_90_days',
                      title: '90-Day Executive Mastery',
                      desc: 'In-depth mastery of health economics, coding, and GPO contracting.',
                    },
                  ].map((pace) => (
                    <button
                      key={pace.id}
                      type="button"
                      onClick={() => setTargetTimeline(pace.id as any)}
                      className={`rounded-lg border p-3 text-left transition-all ${
                        targetTimeline === pace.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-medium text-slate-100">{pace.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{pace.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Assessment summary box */}
              <div className="rounded-lg border border-slate-700 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  Calibrated Track Strategy
                </div>
                <p className="mt-1.5 text-xs text-slate-300">
                  Based on your selection of <strong>{selectedTrackInfo.title}</strong>, your custom roadmap will prioritize Module 1 (Buying Committees & VAC), Module 3 (MEDDPICC), and Module 7 (Objection Playbook) to ensure you can converse with Surgeons and Hospital Executives at a 5-year veteran level.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow hover:bg-emerald-400"
              >
                Next Step
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 shadow-md hover:bg-emerald-400"
              >
                Launch My Custom Academy
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
