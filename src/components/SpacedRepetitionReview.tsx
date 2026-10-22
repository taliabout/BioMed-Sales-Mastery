import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Award
} from 'lucide-react';

interface SpacedQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceCitation: string;
  intervalDays: number;
  repetitionCount: number;
  nextReviewDate: string;
  status: 'due' | 'learning' | 'mastered';
}

const SAMPLE_MISSED_QUESTIONS: SpacedQuestion[] = [
  {
    id: 'sr-1',
    question: 'Under FDA 21 U.S.C. § 352, how must a commercial sales rep respond when a physician asks about an unapproved off-label tumor type?',
    options: [
      'Provide an informal summary of Phase 2 preclinical trial data off-the-record',
      'Explain that the product is FDA-cleared only for approved indications and offer to submit an unsolicited MIR to Medical Affairs',
      'Tell the physician that doctors have prescribing freedom and encourage billing under general codes',
      'Promise to bring copies of international trial articles at the next lunch meeting'
    ],
    correctIndex: 1,
    explanation: 'Commercial sales reps are strictly prohibited from discussing or promoting off-label uses. The only compliant pathway is referring unsolicited requests to Medical Affairs via formal MIR.',
    sourceCitation: 'FDA 21 U.S.C. § 352 & PhRMA Code Section 4',
    intervalDays: 1,
    repetitionCount: 1,
    nextReviewDate: 'Today (Due)',
    status: 'due',
  },
  {
    id: 'sr-2',
    question: 'What is the complete blood count (CBC) monitoring requirement specified in the Black Box Warning for OncoVance?',
    options: [
      'Routine annual CBC checks during physical exam',
      'CBC monitoring prior to each infusion cycle due to 18% Grade 3-4 severe neutropenia',
      'Monitoring is only required if the patient presents with a fever over 101°F',
      'Platelet count only; white blood cell counts are not affected'
    ],
    correctIndex: 1,
    explanation: 'PI Section 4.0 Black Box Warning specifies severe neutropenia (18%) and mandates CBC monitoring prior to each cycle.',
    sourceCitation: 'PI-SEC-4.0-BBW',
    intervalDays: 3,
    repetitionCount: 2,
    nextReviewDate: 'Tomorrow',
    status: 'learning',
  },
  {
    id: 'sr-3',
    question: 'In the ARROW-COLON Phase 3 trial, what was the Hazard Ratio (HR) for Progression-Free Survival in second-line KRAS G12C mCRC?',
    options: [
      'HR 0.88 (not statistically significant)',
      'HR 0.58 (95% CI: 0.44-0.77; p < 0.001), representing a 42% risk reduction',
      'HR 0.22 (p < 0.0001)',
      'HR 1.05 (non-inferiority margin only)'
    ],
    correctIndex: 1,
    explanation: 'Trial summary documents 6.9 months vs 4.1 months with an HR of 0.58 (p < 0.001).',
    sourceCitation: 'TRIAL-ARROW-PFS',
    intervalDays: 7,
    repetitionCount: 3,
    nextReviewDate: 'In 4 days',
    status: 'learning',
  },
  {
    id: 'sr-4',
    question: 'Which of the following transfers of value to an HCP is permissible under the federal Anti-Kickback Statute (42 U.S.C. § 1320a-7b)?',
    options: [
      'An invitation to a resort golf weekend for achieving 10 surgical cases with company implants',
      'Modest educational meals held in clinical/educational settings accompanied by a scientific presentation',
      'An honorarium paid for attending an advisory board dinner where no formal advisory report was produced',
      'Tickets to an NFL football game provided as a relationship-building token'
    ],
    correctIndex: 1,
    explanation: 'Educational meals must be modest, held in conjunction with genuine scientific presentations, and accurately logged for Sunshine Act Open Payments reporting.',
    sourceCitation: '42 U.S.C. § 1320a-7b & 42 CFR § 403.900',
    intervalDays: 14,
    repetitionCount: 4,
    nextReviewDate: 'In 11 days',
    status: 'mastered',
  },
];

export const SpacedRepetitionReview: React.FC = () => {
  const [questions, setQuestions] = useState<SpacedQuestion[]>(SAMPLE_MISSED_QUESTIONS);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const activeQuestion = questions[activeQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);
  };

  const handleRateRecall = (quality: 'difficult' | 'good' | 'easy') => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === activeQuestionIndex) {
          let nextInterval = q.intervalDays;
          let nextStatus = q.status;
          if (quality === 'difficult') {
            nextInterval = 1;
            nextStatus = 'learning';
          } else if (quality === 'good') {
            nextInterval = Math.round(q.intervalDays * 2.2);
            nextStatus = nextInterval > 10 ? 'mastered' : 'learning';
          } else {
            nextInterval = Math.round(q.intervalDays * 3.0);
            nextStatus = 'mastered';
          }

          return {
            ...q,
            intervalDays: nextInterval,
            repetitionCount: q.repetitionCount + 1,
            nextReviewDate: `In ${nextInterval} days`,
            status: nextStatus,
          };
        }
        return q;
      })
    );

    // Advance to next question
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      // Loop or finish
      setActiveQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    }
  };

  const dueCount = questions.filter((q) => q.status === 'due').length;
  const learningCount = questions.filter((q) => q.status === 'learning').length;
  const masteredCount = questions.filter((q) => q.status === 'mastered').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Brain className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Spaced-Repetition Review Queue (SM-2 Algorithm)
            </h2>
            <span className="rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 border border-indigo-200 uppercase">
              Phase 4 Skill Depth
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Strengthen long-term retention of missed compliance rules, trial hazard ratios, and prescribing boundaries using spaced memory intervals.
          </p>
        </div>

        {/* Queue Metrics */}
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded bg-rose-50 text-rose-800 font-bold px-2.5 py-1 border border-rose-200">
            {dueCount} Due Today
          </span>
          <span className="rounded bg-amber-50 text-amber-800 font-bold px-2.5 py-1 border border-amber-200">
            {learningCount} In Learning
          </span>
          <span className="rounded bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 border border-emerald-200">
            {masteredCount} Mastered
          </span>
        </div>
      </div>

      {/* Main Review Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 font-mono">
              Card {activeQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-[10px] text-slate-400">· Interval: {activeQuestion.intervalDays}d</span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {activeQuestion.sourceCitation}
          </span>
        </div>

        {/* Question Prompt */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {activeQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-2 pt-1 text-xs">
          {activeQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === activeQuestion.correctIndex;
            let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
            if (isAnswerRevealed) {
              if (isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnClass = 'border-rose-400 bg-rose-50 text-rose-950';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerRevealed}
                className={`w-full text-left rounded-lg border p-3 transition flex items-start gap-3 ${btnClass}`}
              >
                <span className="font-mono font-bold text-slate-400 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Revealed Rationale & Spaced Recall Feedback */}
        {isAnswerRevealed && (
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-3 pt-3 animate-fade-in text-xs">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Clinical & Regulatory Explanation:</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">{activeQuestion.explanation}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-slate-600 text-[11px]">Rate your recall difficulty:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRateRecall('difficult')}
                  className="rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 px-3 py-1 font-semibold text-[11px] transition"
                >
                  Hard (Reset to 1d)
                </button>
                <button
                  onClick={() => handleRateRecall('good')}
                  className="rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1 font-semibold text-[11px] transition"
                >
                  Good ({Math.round(activeQuestion.intervalDays * 2.2)}d)
                </button>
                <button
                  onClick={() => handleRateRecall('easy')}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 font-bold text-[11px] transition shadow-2xs"
                >
                  Easy ({Math.round(activeQuestion.intervalDays * 3.0)}d)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
