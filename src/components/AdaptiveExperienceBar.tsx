import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { UserProfile, HealthcareTrack } from '../types';

interface AdaptiveExperienceBarProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateToView: (view: any) => void;
}

export const AdaptiveExperienceBar: React.FC<AdaptiveExperienceBarProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToView,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [diagStep, setDiagStep] = useState(0);
  const [diagAnswers, setDiagAnswers] = useState<number[]>([]);

  const diagnosticQuestions = [
    {
      question: 'Under the federal Anti-Kickback Statute (AKS), what is the legal standard for providing meals to a prescribing surgeon?',
      options: [
        'A. Any meal under $100 is automatically exempt without conditions.',
        'B. Must be modest, held in an educational/clinical setting, and directly accompanied by scientific presentation.',
        'C. Meals are only compliant if sponsored through a CME third-party grant.',
        'D. Any meal with alcohol is strictly a federal felony regardless of setting.',
      ],
      correctIndex: 1,
    },
    {
      question: 'In hospital supply chain, what is the primary role of the Value Analysis Committee (VAC)?',
      options: [
        'A. To negotiate physician salaries and clinical call schedules.',
        'B. To evaluate clinical efficacy, DRG reimbursement economics, and standardize vendor contracts across the health system.',
        'C. To submit 510(k) clearances directly to the FDA.',
        'D. To schedule elective surgeries in ambulatory surgery centers.',
      ],
      correctIndex: 1,
    },
    {
      question: 'When a surgeon states "I am happy with my current implant vendor and do not want to switch", what is the Shelby Haas / Reverse Discovery reframe?',
      options: [
        'A. Argue that your product is 15% cheaper and offer a free trial tray.',
        'B. Validate their satisfaction, detach from pushing a switch, and ask a diagnostic inquiry: "Dr. Vance, if you could change one thing about your revision case outcomes, what would that be?"',
        'C. Ask to speak to their Department Chief to override their preference.',
        'D. Leave marketing brochures at the nurse station and follow up tomorrow.',
      ],
      correctIndex: 1,
    },
  ];

  const handleTogglePriorExperience = () => {
    const nextVal = !profile.hasPriorSalesExperience;
    const exemptions = nextVal
      ? Array.from(new Set([...(profile.exemptionsGranted || []), 'mod-1', 'mod-2']))
      : (profile.exemptionsGranted || []).filter((id) => id !== 'mod-1' && id !== 'mod-2');

    onUpdateProfile({
      ...profile,
      hasPriorSalesExperience: nextVal,
      skipBeginnerModules: nextVal,
      experienceLevel: nextVal ? 'b2b_experienced' : 'beginner_foundation',
      exemptionsGranted: exemptions,
    });
  };

  const handleSelectPillar = (pillar: UserProfile['primarySkillPillar']) => {
    onUpdateProfile({
      ...profile,
      primarySkillPillar: pillar,
    });
  };

  const handleDiagnosticAnswer = (index: number) => {
    const updated = [...diagAnswers, index];
    setDiagAnswers(updated);

    if (diagStep < diagnosticQuestions.length - 1) {
      setDiagStep(diagStep + 1);
    } else {
      // Calculate score
      let score = 0;
      updated.forEach((ans, qIdx) => {
        if (ans === diagnosticQuestions[qIdx].correctIndex) score += 33.3;
      });
      const finalScore = Math.round(score);

      const passed = finalScore >= 66;
      const exemptions = passed
        ? Array.from(new Set([...(profile.exemptionsGranted || []), 'mod-1', 'mod-2', 'diagnostic_exemption']))
        : profile.exemptionsGranted || [];

      onUpdateProfile({
        ...profile,
        diagnosticScore: finalScore,
        hasPriorSalesExperience: passed,
        skipBeginnerModules: passed,
        experienceLevel: passed ? 'b2b_experienced' : profile.experienceLevel,
        exemptionsGranted: exemptions,
      });

      setShowDiagnosticModal(false);
      setDiagStep(0);
      setDiagAnswers([]);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm transition">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Sliders className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Adaptive Learning Personalization Engine
                </h4>
                {profile.hasPriorSalesExperience && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    Veteran Fast-Track Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {profile.hasPriorSalesExperience
                  ? 'Fundamentals waived · Curriculum tailored for High-Ticket OR Closing, VAC Negotiation & Shelby Haas Reframing'
                  : 'Foundational Ground-Up Path · Comprehensive 5-Year mastery from anatomy & healthcare structures to quota closing'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Toggle Button */}
            <button
              onClick={handleTogglePriorExperience}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                profile.hasPriorSalesExperience
                  ? 'border border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${profile.hasPriorSalesExperience ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>
                {profile.hasPriorSalesExperience
                  ? 'I Have Sales Experience (Skip Basics ON)'
                  : 'I Have Sales Experience (Fast-Track)'}
              </span>
            </button>

            {/* Diagnostic Test-Out Button */}
            <button
              onClick={() => {
                setDiagStep(0);
                setDiagAnswers([]);
                setShowDiagnosticModal(true);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <Award className="h-3.5 w-3.5 text-yellow-400" />
              <span>
                {profile.diagnosticScore !== undefined
                  ? `Diagnostic Score: ${profile.diagnosticScore}%`
                  : '60-Sec Skill Diagnostic'}
              </span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
              title="Expand Adaptive Controls"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Customization Drawer */}
        {isExpanded && (
          <div className="mt-4 border-t border-slate-100 pt-4 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Primary Skill Specialization Focus (Tailors Daily Drills & Case Studies)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    id: 'or_clinical_mastery',
                    title: 'OR & Surgeon Clinical Detailing',
                    desc: 'Operating room sterile field, tactile instrument feedback, and surgeon KOL buy-in.',
                  },
                  {
                    id: 'vac_financial_closing',
                    title: 'Hospital VAC & CFO Economics',
                    desc: 'DRG reimbursement, hospital margin analysis, and bundled payment savings.',
                  },
                  {
                    id: 'shelby_haas_objection_reversal',
                    title: 'Shelby Haas 5-Step Reframing',
                    desc: 'Radical detachment, reverse discovery, and transforming knee-jerk pushbacks into agreements.',
                  },
                  {
                    id: 'enterprise_strategic_accounts',
                    title: 'Enterprise GPO & Multi-Site Deals',
                    desc: 'Vizient / Premier RFP tenders, system-wide standardization, and corporate contracts.',
                  },
                ].map((item) => {
                  const isSelected = (profile.primarySkillPillar || 'or_clinical_mastery') === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectPillar(item.id as any)}
                      className={`rounded-lg border p-3 text-left transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{item.title}</span>
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-blue-50/40 p-3 border border-blue-100 text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>
                  Active Waivers:{' '}
                  <strong>
                    {profile.skipBeginnerModules ? 'Modules 1 & 2 Exempted (Equivalency Verified)' : 'None (Full Journey)'}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToView('titan_lab')}
                  className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Practice Shelby Haas Method</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => onNavigateToView('badges_skills')}
                  className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Earned Badges</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 60-Sec Skill Diagnostic Modal */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-xl border border-blue-200 bg-white p-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                  {diagStep + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Sales Experience Test-Out Diagnostic</h3>
                  <p className="text-[11px] text-slate-500">Question {diagStep + 1} of {diagnosticQuestions.length} · Fast-Track Verification</p>
                </div>
              </div>
              <button
                onClick={() => setShowDiagnosticModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-800 leading-relaxed">
                {diagnosticQuestions[diagStep].question}
              </div>

              <div className="space-y-2">
                {diagnosticQuestions[diagStep].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleDiagnosticAnswer(oIdx)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-left text-xs text-slate-800 hover:border-blue-600 hover:bg-blue-50 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
