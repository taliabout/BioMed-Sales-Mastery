import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Building,
  Target,
  Shield,
  Download,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Compass,
  FileText
} from 'lucide-react';

interface AccountPlanMethodology {
  id: string;
  name: string;
  attribution: string;
  corePrinciple: string;
  hospitalApplication: string;
  planningPrompts: {
    label: string;
    description: string;
    placeholder: string;
  }[];
}

const METHODOLOGY_SUITE: AccountPlanMethodology[] = [
  {
    id: 'meddpicc',
    name: 'MEDDPICC Enterprise Deal Qualification',
    attribution: 'Pioneered by Jack Napoli, Dick Dunkel, and John McMahon at PTC',
    corePrinciple: 'Rigorous 8-dimension deal architecture verifying measurable outcomes and access to real power.',
    hospitalApplication: 'Essential for hospital capital device placements and hospital system formulary review where buying consensus spans surgery, procurement, and C-suite finance.',
    planningPrompts: [
      { label: 'Metrics (M)', description: 'Quantifiable clinical and financial ROI metrics (e.g. readmission penalties, OR turnaround minutes saved).', placeholder: 'e.g. Saves 12 minutes per surgical case, totaling $180,000 annual OR time savings.' },
      { label: 'Economic Buyer (EB)', description: 'The individual with discretionary budget authority to release funds (e.g. Chief Medical Officer, VP of Surgery).', placeholder: 'e.g. Dr. Arthur Bell, Chief Medical Officer & Chair of Hospital Capital Committee.' },
      { label: 'Decision Criteria (DC)', description: 'Formal clinical, economic, and technical standards evaluated by the Value Analysis Committee.', placeholder: 'e.g. (1) Clinical non-inferiority in peer-reviewed trials, (2) Vizient GPO contract alignment.' },
      { label: 'Decision Process (DP)', description: 'Step-by-step chronology of committee approvals from department sponsorship to clinical trials.', placeholder: 'e.g. Dept sign-off (Month 1) -> VAC dossier submission (Month 2) -> 30-day trial evaluation.' },
      { label: 'Paper Process (PP)', description: 'Legal, regulatory, and purchasing mechanics required to execute contracts.', placeholder: 'e.g. Business Associate Agreement (BAA) and hospital purchasing terms redlining.' },
      { label: 'Implicate Pain (I)', description: 'The acute organizational or clinical risk caused by continuing with the incumbent status quo.', placeholder: 'e.g. 14% anchor pullout revision rate resulting in patient readmission penalties.' },
      { label: 'Champion (C)', description: 'Internal clinical powerholder who actively sells on your behalf when you are not in the room.', placeholder: 'e.g. Dr. Evelyn Vance, Chief of Orthopaedic Surgery.' },
      { label: 'Competition (C)', description: 'Incumbent hardware vendor, alternative therapies, or the inertia of doing nothing.', placeholder: 'e.g. Incumbent vendor preferred tier contract with 5-year established surgeon habits.' },
    ],
  },
  {
    id: 'challenger',
    name: 'The Challenger Sale Model',
    attribution: 'Formulated by Matthew Dixon and Brent Adamson (Corporate Executive Board / Gartner)',
    corePrinciple: 'Top sales performers do not just build relationships; they teach for differentiation, tailor for resonance, and take control of the economic dialogue.',
    hospitalApplication: 'Used to reframe surgical habits by presenting unexpected clinical insights that challenge conventional procedural assumptions.',
    planningPrompts: [
      { label: 'Commercial Teaching (The Warmer & Reframe)', description: 'What counter-intuitive research or clinical data will disrupt the physician’s comfort with their routine?', placeholder: 'e.g. Show peer-reviewed registry data demonstrating that standard manual instrumentation creates a 28% alignment outlier rate.' },
      { label: 'Rational Drowning & Emotional Impact', description: 'Quantify the compounding costs, clinical complications, and hospital liability of current practices.', placeholder: 'e.g. Every revision arthroscopy costs the hospital an average of $24,000 in unreimbursed bed days.' },
      { label: 'Taking Control of the Commercial Discussion', description: 'Firmly navigating pricing and trial terms without conceding margins.', placeholder: 'e.g. Agreeing to trial support only in exchange for scheduled case commitments.' },
    ],
  },
  {
    id: 'spin',
    name: 'SPIN Consultative Selling Framework',
    attribution: 'Developed by Neil Rackham through extensive empirical research at Huthwaite International',
    corePrinciple: 'Asking high-context questions across Situation, Problem, Implication, and Need-Payoff to guide buyers into self-discovering their need to change.',
    hospitalApplication: 'Ideal for brief 2-minute hallway conversations where asking the right diagnostic question uncovers surgical frustration.',
    planningPrompts: [
      { label: 'Situation Questions (S)', description: 'Establish current clinical baseline and caseload volume.', placeholder: 'e.g. How many complex revision joint procedures does your department manage per month?' },
      { label: 'Problem Questions (P)', description: 'Identify clinical pain points or procedural friction.', placeholder: 'e.g. Where in the suture-passing sequence does your surgical team encounter instrument jamming?' },
      { label: 'Implication Questions (I)', description: 'Explore the downstream consequences of leaving the problem unresolved.', placeholder: 'e.g. When secondary re-anchoring is required, how does that impact your subsequent OR block schedule turnover?' },
      { label: 'Need-Payoff Questions (N)', description: 'Have the clinician articulate the clinical value of resolving the challenge.', placeholder: 'e.g. If you had a dual-locking mechanism that eliminated secondary suture breakage, how would that affect your post-op recovery times?' },
    ],
  },
  {
    id: 'gap_selling',
    name: 'Gap Selling Architecture',
    attribution: 'Created by Keenan (A Sales Growth Company)',
    corePrinciple: 'Sales is not about pitching features; it is about diagnosing the distance between Current State and Desired Future State, and calculating the Cost of Inaction.',
    hospitalApplication: 'Constructing compelling economic proposals for hospital Chief Financial Officers by demonstrating the financial cost of status-quo inertia.',
    planningPrompts: [
      { label: 'Current State Diagnosis', description: 'Literal operational and clinical reality today (volume, costs, complication rates).', placeholder: 'e.g. Hospital loses $340k annually due to prolonged surgical turnovers and instrument trays missing sterility.' },
      { label: 'Desired Future State', description: 'The measurable ideal state the health system requires to hit its strategic goals.', placeholder: 'e.g. Sub-45 minute case turnovers and zero vendor-related surgical cancellations.' },
      { label: 'The Gap & Cost of Inaction (COI)', description: 'The quantifiable financial and clinical cost of remaining with incumbent systems.', placeholder: 'e.g. Delaying adoption by 6 months costs the hospital $170,000 in unnecessary staffing overtime.' },
    ],
  },
  {
    id: 'sandler',
    name: 'The Sandler Selling System',
    attribution: 'Founded by David H. Sandler (Sandler Systems, Inc.)',
    corePrinciple: 'Systematic consultative disqualification, upfront contracts, and the Pain Funnel to remove mutual sales pressure.',
    hospitalApplication: 'Eliminating mutual defensiveness with busy Department Chairs by setting explicit time boundaries and mutual expectations.',
    planningPrompts: [
      { label: 'Upfront Contract (UFC)', description: 'Establishing mutual agreement on purpose, time limits, and outcome before the conversation begins.', placeholder: 'e.g. "Dr. Marcus, we have 5 minutes before your case. If this clinical data doesn\'t align with your technique, tell me directly and we\'ll stop."' },
      { label: 'Uncovering Root Pain (Pain Funnel)', description: 'Moving past surface complaints to personal and professional impact on the clinician.', placeholder: 'e.g. "What happens to your surgical privileges if case complication outliers trigger a morbidity audit?"' },
      { label: 'Post-Sell & Preventing Buyer Remorse', description: 'Testing commitment before committee review to ensure surgeon does not retreat under peer pressure.', placeholder: 'e.g. "When your colleagues question switching hardware vendors at next week\'s meeting, how will you defend the change?"' },
    ],
  },
  {
    id: 'laer',
    name: 'LAER Bonding & Resistance Resolution',
    attribution: 'Originating from Carew International',
    corePrinciple: 'A 4-step sequence (Listen, Acknowledge, Explore, Respond) for defusing customer skepticism and building collaborative partnerships.',
    hospitalApplication: 'Overcoming procurement pushback from Materials Managers regarding hospital supply chain disruptions.',
    planningPrompts: [
      { label: 'Listen (L)', description: 'Active, uninterrupted listening to validate procurement anxiety.', placeholder: 'e.g. Let the materials manager exhaust their frustration regarding consignment tray delays.' },
      { label: 'Acknowledge (A)', description: 'Neutral emotional validation demonstrating empathy without conceding pricing.', placeholder: 'e.g. "I understand completely why adding a new supplier tray feels risky right now."' },
      { label: 'Explore (E)', description: 'Calibrated diagnostic questions to uncover the exact root of hesitation.', placeholder: 'e.g. "Is your concern focused on delivery logistics or sterile processing autoclave capacity?"' },
      { label: 'Respond (R)', description: 'Presenting a tailored solution that directly resolves the explored concern.', placeholder: 'e.g. "We provide dedicated on-site inventory specialists who manage tray replenishment 24/7 at no cost."' },
    ],
  },
  {
    id: 'command_of_message',
    name: 'Command of the Message',
    attribution: 'Developed by Force Management (John Kaplan)',
    corePrinciple: 'Connecting customer value drivers directly to required product capabilities and unique "How We Do It" differentiators.',
    hospitalApplication: 'Structuring hospital C-suite presentations comparing capital acquisition costs against multi-year operational savings.',
    planningPrompts: [
      { label: 'Customer Value Drivers (Why Change?)', description: 'The urgent business priorities of hospital leadership.', placeholder: 'e.g. Reducing Medicare 30-day readmission penalties and expanding outpatient ASC market share.' },
      { label: 'Required Capabilities (Why Now?)', description: 'The specific technical or clinical requirements needed to achieve those drivers.', placeholder: 'e.g. Sub-millimeter intraoperative bone resection accuracy with real-time stereotactic feedback.' },
      { label: 'How We Do It / Differentiators (Why Us?)', description: 'Proprietary capabilities that competitors cannot replicate.', placeholder: 'e.g. Patented haptic robotic boundaries combined with pre-operative CT-free AI registration.' },
    ],
  },
];

export const StrategicAccountPlanningLab: React.FC = () => {
  const [selectedMethodologyId, setSelectedMethodologyId] = useState<string>('meddpicc');
  const [targetAccountName, setTargetAccountName] = useState('Highland Academic Medical Center (Demo Account)');
  const [targetProduct, setTargetProduct] = useState('DualLock Spinal Interbody Navigation System');

  // Form input answers mapped by methodology ID and prompt index
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({
    meddpicc: {
      'Metrics (M)': 'Reduces surgical revision rates by 31% and cuts knot-tying time by 8 minutes per case, saving $140,000 annually in OR turnover.',
      'Economic Buyer (EB)': 'Dr. Arthur Bell, Chief Medical Officer and Chair of Hospital Value Analysis Committee.',
      'Decision Criteria (DC)': 'Clinical non-inferiority demonstrated in 2-year trial data; GPO Vizient Tier 2 price parity.',
      'Decision Process (DP)': 'Surgical sponsor sign-off (Oct) -> VAC dossier submission (Nov) -> 60-day sterile tray evaluation.',
      'Paper Process (PP)': 'Hospital standard consignment stock agreement and vendor credentialing compliance (RepTrax).',
      'Implicate Pain (I)': '18% rate of secondary implant loosening resulting in patient readmissions and hospital quality penalty hits.',
      'Champion (C)': 'Dr. Evelyn Vance, Chief of Orthopaedic Surgery.',
      'Competition (C)': 'Legacy incumbent hardware vendor holding a 7-year sole-source agreement.',
    },
  });

  const activeMethodology =
    METHODOLOGY_SUITE.find((m) => m.id === selectedMethodologyId) || METHODOLOGY_SUITE[0];

  const handleUpdateAnswer = (methodologyId: string, promptLabel: string, val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [methodologyId]: {
        ...(prev[methodologyId] || {}),
        [promptLabel]: val,
      },
    }));
  };

  const exportAccountPlan = () => {
    const activeAnswers = answers[activeMethodology.id] || {};
    const text = `STRATEGIC HEALTHCARE ACCOUNT PLAN
Account Name: ${targetAccountName}
Commercial Solution: ${targetProduct}
Methodology: ${activeMethodology.name}
Attribution: ${activeMethodology.attribution}
Date Generated: ${new Date().toLocaleDateString()}

METHODOLOGY CORE PRINCIPLE:
${activeMethodology.corePrinciple}

HOSPITAL APPLICATION CONTEXT:
${activeMethodology.hospitalApplication}

STRATEGIC ACCOUNT QUALIFICATION MATRIX:
${activeMethodology.planningPrompts
  .map(
    (p) =>
      `\n[${p.label.toUpperCase()}] - ${p.description}\n${
        activeAnswers[p.label] || '(No strategy entered yet)'
      }\n`
  )
  .join('\n')}

Generated via BioMed Sales Mastery · Strategic Account Planning Lab
(Educational framework template with original author attribution; no copyrighted text reproduced).`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `account_plan_${targetAccountName.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Compass className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Strategic Healthcare Account Planning Lab (7 Methodologies)
            </h2>
            <span className="rounded bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 border border-blue-200 uppercase">
              Phase 4 Skill Depth
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build complex hospital territory account plans combining MEDDPICC, Challenger, SPIN, Gap Selling, Sandler, LAER, and Command of the Message with strict author attribution.
          </p>
        </div>

        <button
          onClick={exportAccountPlan}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Strategy Brief</span>
        </button>
      </div>

      {/* Target Account Metadata Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Healthcare Account / IDN</label>
          <input
            type="text"
            value={targetAccountName}
            onChange={(e) => setTargetAccountName(e.target.value)}
            className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-medium"
            placeholder="e.g. Memorial Hospital Health System"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Commercial Therapeutic / Device Solution</label>
          <input
            type="text"
            value={targetProduct}
            onChange={(e) => setTargetProduct(e.target.value)}
            className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-medium"
            placeholder="e.g. DualLock Spinal Interbody Navigation System"
          />
        </div>
      </div>

      {/* 7 Methodology Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {METHODOLOGY_SUITE.map((m) => {
          const isSelected = m.id === activeMethodology.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMethodologyId(m.id)}
              className={`shrink-0 rounded-lg px-3.5 py-2 font-semibold transition border ${
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Active Methodology Overview Banner */}
      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">{activeMethodology.name}</h3>
          <span className="font-mono text-[10px] text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
            {activeMethodology.attribution}
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          <strong>Core Concept:</strong> {activeMethodology.corePrinciple}
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Hospital Commercial Context:</strong> {activeMethodology.hospitalApplication}
        </p>
      </div>

      {/* Interactive Account Planning Form Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Qualification & Account Strategy Worksheets
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMethodology.planningPrompts.map((prompt, idx) => {
            const currentVal = (answers[activeMethodology.id] || {})[prompt.label] || '';
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-2 hover:border-blue-300 transition"
              >
                <div>
                  <span className="font-bold text-xs text-slate-900 block">{prompt.label}</span>
                  <span className="text-[10px] text-slate-500 leading-snug block mt-0.5">
                    {prompt.description}
                  </span>
                </div>

                <textarea
                  value={currentVal}
                  onChange={(e) =>
                    handleUpdateAnswer(activeMethodology.id, prompt.label, e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  placeholder={prompt.placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
