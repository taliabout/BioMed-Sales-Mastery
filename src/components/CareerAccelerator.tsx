import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS, GALLUP_TRAIT_GUIDE } from '../data/interviewPrepData';
import { Award, Briefcase, FileCheck, CheckCircle2, AlertTriangle, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

export const CareerAccelerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brag_book' | 'gallup' | 'star_interview'>('brag_book');
  const [selectedQuestion, setSelectedQuestion] = useState(INTERVIEW_QUESTIONS[0]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-white">
              The Top 1% Healthcare Sales Career Accelerator
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            The exact blueprints used by top reps to bypass automated HR screenings, dominate the Stryker Gallup interview, and land $200k+ roles.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 p-1">
          {[
            { id: 'brag_book', label: 'The Championship "Brag Book"' },
            { id: 'gallup', label: 'Gallup Assessment Decoder' },
            { id: 'star_interview', label: 'Executive STAR Questions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: BRAG BOOK ARCHITECT */}
      {activeTab === 'brag_book' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              Anatomy of a Championship Medical Sales "Brag Book"
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Hiring managers at Stryker, Medtronic, and Genentech do not trust generic bullet points on resumes. They require physical, tangible proof of past competitive dominance and clinical preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: 'Tab 1: Professional Executive Summary',
                purpose: 'Establishes your identity, relentless work ethic, and why you are chosen for high-pressure healthcare environments.',
                elements: ['1-page professional bio', 'Philosophy on patient care & surgeon reliability', 'Personal awards (collegiate athletics, military commendations, President\'s Club)'],
              },
              {
                section: 'Tab 2: Verifiable Stack Rankings & Quota Attainment',
                purpose: 'Proves you are a hunter who finishes in the top 5% of whatever sales or academic environment you have been in.',
                elements: ['Official company stack rank tables (#1 out of 64 reps)', 'W-2 or commission percentage growth proof', 'President\'s Club travel trip plaques / certificates'],
              },
              {
                section: 'Tab 3: Letters of Recommendation & Endorsements',
                purpose: 'Surgeons and sales directors vouching for your character, coachability, and cool head under surgical pressure.',
                elements: ['Letters from attending orthopedic/cardiac surgeons', 'Letter from previous Vice President of Sales', 'Testimonials from hospital sterile processing or OR nurse managers'],
              },
              {
                section: 'Tab 4: Clinical Certifications & Continuing Education',
                purpose: 'Signals that you have done the deep homework and will not waste 6 months in basic training.',
                elements: ['Certified Healthcare Commercial Specialist (CHCS) badge', 'AORN OR Protocol & Aseptic Field Certification', 'Anatomy & Musculoskeletal biomechanics transcripts'],
              },
              {
                section: 'Tab 5: Custom 30-60-90 Day Territory Business Plan',
                purpose: 'Shows you have already researched the hiring manager\'s actual territory and know how to produce revenue on day one.',
                elements: ['Territory hospital segmentation (AMCs vs ASCs)', 'Target surgeon case volume estimates', 'First 30 days credentialing & CSP tray timeline'],
              },
              {
                section: 'Tab 6: Product Battlecards & Clinical Dossiers',
                purpose: 'Demonstrates scientific fluency, MEDDPICC qualification, and handling the incumbent competitor.',
                elements: ['Head-to-head implant crosswalk comparison', 'Peer-reviewed clinical trial summary tear-sheet', 'Sample VAC committee submission package'],
              },
            ].map((tab, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400">
                    {idx + 1}
                  </span>
                  <h4 className="font-semibold text-white text-xs">{tab.section}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{tab.purpose}</p>
                <div className="border-t border-slate-800/80 pt-2 space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Mandatory Artifacts:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {tab.elements.map((el, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">✓</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: GALLUP ASSESSMENT DECODER */}
      {activeTab === 'gallup' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              The Stryker & Medtronic Gallup Screening Assessment Guide
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Top device companies use phone-based behavioral psychology tests developed by Gallup or Predictive Index. 70% of candidates fail this automated screening. Learn how to speak the Gallup language.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GALLUP_TRAIT_GUIDE.map((g, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <h4 className="font-bold text-white text-sm">{g.trait} Dimension</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{g.whatItMeans}</p>
                <div className="rounded bg-slate-900 p-3 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400">How to Frame Responses:</strong>{' '}
                  {g.howToDemonstrateInInterview}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90">
            <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              The #1 Fatal Gallup Mistake: Moderate / Balanced Answers
            </div>
            <p className="leading-relaxed">
              Gallup algorithms screen for extreme statistical outliers in drive and competitiveness. If the interviewer asks: "Do you prefer a comfortable work-life balance or would you work through the weekend to win?", saying "I try to maintain balance" is an immediate disqualification. Top performers answer with unwavering passion, urgency, and concrete examples of pushing their physical and mental stamina to finish first.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: STAR INTERVIEW PRACTICE */}
      {activeTab === 'star_interview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Question List */}
          <div className="space-y-2 lg:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              High-Stakes Behavioral Questions
            </h4>
            {INTERVIEW_QUESTIONS.map((q) => {
              const isSelected = q.id === selectedQuestion.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`flex w-full flex-col rounded-lg border p-3.5 text-left transition ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono font-semibold uppercase text-emerald-400">
                    {q.targetCompetency}
                  </span>
                  <p className="mt-1 font-medium text-xs text-slate-100 line-clamp-2">
                    {q.question}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Asked by: {q.askedBy.join(', ')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Question Breakdown */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">
                  Target Competency: {selectedQuestion.targetCompetency}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  "{selectedQuestion.question}"
                </h3>
                <div className="mt-2 rounded bg-slate-950 p-3 text-xs text-slate-400 border border-slate-800">
                  <strong className="text-slate-300">Interviewer\'s Hidden Agenda:</strong>{' '}
                  {selectedQuestion.interviewerIntent}
                </div>
              </div>

              {/* STAR Model Answer */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Masterclass STAR Response Architecture:
                </h4>
                {[
                  { letter: 'S', label: 'Situation', text: selectedQuestion.starModelAnswer.situation },
                  { letter: 'T', label: 'Task', text: selectedQuestion.starModelAnswer.task },
                  { letter: 'A', label: 'Action', text: selectedQuestion.starModelAnswer.action },
                  { letter: 'R', label: 'Result', text: selectedQuestion.starModelAnswer.result },
                ].map((step) => (
                  <div key={step.letter} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs space-y-1">
                    <span className="font-mono font-bold text-emerald-400 mr-2">[{step.letter}] {step.label}:</span>
                    <span className="text-slate-200 leading-relaxed">{step.text}</span>
                  </div>
                ))}
              </div>

              {/* Fatal Red Flags */}
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4 text-xs">
                <span className="font-semibold uppercase tracking-wider text-rose-400 block mb-1.5">
                  Fatal Interview Red Flags to Avoid:
                </span>
                <ul className="space-y-1 text-rose-200/90">
                  {selectedQuestion.fatalRedFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-400">✗</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
