import React, { useState } from 'react';
import { Module, Lesson, HealthcareTrack } from '../types';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  FileText,
  HelpCircle,
  Sparkles,
  ArrowRight,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface CurriculumViewProps {
  currentTrack: HealthcareTrack;
  completedLessons: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
  certifiedModules: string[];
  onCertifyModule: (moduleId: string) => void;
  exemptionsGranted?: string[];
  skipBeginnerModules?: boolean;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  currentTrack,
  completedLessons,
  onToggleCompleteLesson,
  certifiedModules,
  onCertifyModule,
  exemptionsGranted = [],
  skipBeginnerModules = false,
}) => {
  const [selectedModule, setSelectedModule] = useState<Module>(CURRICULUM_MODULES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<'lesson' | 'case_study' | 'exam'>('lesson');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleSelectModule = (mod: Module) => {
    setSelectedModule(mod);
    setSelectedLesson(mod.lessons[0]);
    setActiveTab('lesson');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleGradeQuiz = () => {
    const questions = activeTab === 'exam' ? selectedModule.finalExamQuestions : (selectedLesson.quiz || []);
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedPercentage = Math.round((correctCount / questions.length) * 100);
    setQuizScore(calculatedPercentage);
    setQuizSubmitted(true);

    if (activeTab === 'exam' && calculatedPercentage >= 80) {
      onCertifyModule(selectedModule.id);
    }
  };

  const isCurrentLessonCompleted = completedLessons.includes(selectedLesson.id);
  const isModuleCertified = certifiedModules.includes(selectedModule.id);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Modules & Lessons Navigation */}
      <div className="space-y-4 lg:col-span-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Executive Curriculum Modules
            </h3>
            <span className="text-xs text-blue-600 font-mono font-bold">
              {CURRICULUM_MODULES.length} Comprehensive Modules
            </span>
          </div>

          {skipBeginnerModules && (
            <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50/70 p-2.5 text-xs text-blue-900">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Prior Experience Fast-Track Active</span>
              </div>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Foundational basics waived. Direct focus on OR Protocol, VAC Finance & Shelby Haas Reframes!
              </p>
            </div>
          )}

          <div className="space-y-2">
            {CURRICULUM_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModule.id;
              const isExempted = exemptionsGranted.includes(mod.id) || (skipBeginnerModules && (mod.id === 'mod-1' || mod.id === 'mod-2'));
              const isCertified = certifiedModules.includes(mod.id) || isExempted;
              const lessonsDone = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`flex w-full flex-col rounded-lg border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 text-slate-900 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-700 font-bold">
                      Module {mod.number}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span>{mod.experienceLevel}</span>
                      {isExempted ? (
                        <span className="text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded text-[10px]">· Prior Exp Waived</span>
                      ) : isCertified ? (
                        <span className="text-emerald-600 font-bold">· Certified</span>
                      ) : null}
                    </div>
                  </div>
                  <h4 className="mt-1 font-bold text-slate-900 text-sm">{mod.title}</h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {mod.durationHours} hrs
                    </span>
                    <span>
                      {isExempted ? 'Waived (Experienced Rep)' : `${lessonsDone} / ${mod.lessons.length} Completed`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Module Lesson Selector */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Module {selectedModule.number} Learning Units
          </h4>
          <div className="space-y-1.5">
            {selectedModule.lessons.map((les, idx) => {
              const isCurrent = les.id === selectedLesson.id && activeTab === 'lesson';
              const isDone = completedLessons.includes(les.id);

              return (
                <button
                  key={les.id}
                  onClick={() => {
                    setSelectedLesson(les);
                    setActiveTab('lesson');
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                    setQuizScore(null);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                      {idx + 1}.
                    </span>
                    <span className="line-clamp-1">{les.title}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className={`h-4 w-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                  ) : (
                    <span className={`shrink-0 ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                      {les.durationMinutes}m
                    </span>
                  )}
                </button>
              );
            })}

            {/* Case Study tab button */}
            <button
              onClick={() => {
                setActiveTab('case_study');
                setQuizSubmitted(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                activeTab === 'case_study'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className={`h-4 w-4 ${activeTab === 'case_study' ? 'text-white' : 'text-blue-600'}`} />
                <span className="font-medium">Module Case Study</span>
              </div>
              <span className={`text-[11px] ${activeTab === 'case_study' ? 'text-blue-100' : 'text-slate-400'}`}>
                Deep Field Analysis
              </span>
            </button>

            {/* Final Exam tab button */}
            <button
              onClick={() => {
                setActiveTab('exam');
                setQuizSubmitted(false);
                setQuizAnswers({});
                setQuizScore(null);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                activeTab === 'exam'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className={`h-4 w-4 ${activeTab === 'exam' ? 'text-white' : 'text-amber-500'}`} />
                <span className="font-medium">Certification Exam</span>
              </div>
              <span className={`text-[11px] font-mono font-bold ${activeTab === 'exam' ? 'text-blue-100' : 'text-amber-600'}`}>
                {isModuleCertified ? 'Passed' : 'Unlock Credential'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Active Content Viewer */}
      <div className="space-y-4 lg:col-span-8">
        {/* Content Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono text-blue-700 font-bold">
                  Module {selectedModule.number}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedModule.title}</span>
              </div>

              {activeTab === 'lesson' && (
                <button
                  type="button"
                  onClick={() => onToggleCompleteLesson(selectedLesson.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    isCurrentLessonCompleted
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {isCurrentLessonCompleted ? 'Completed' : 'Mark Complete'}
                </button>
              )}
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
              {activeTab === 'lesson' && selectedLesson.title}
              {activeTab === 'case_study' && selectedModule.caseStudy.title}
              {activeTab === 'exam' && `Module ${selectedModule.number} Competency Certification Exam`}
            </h2>

            {activeTab === 'lesson' && (
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {selectedLesson.executiveSummary}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="p-6">
            {/* VIEW 1: LESSON CONTENT */}
            {activeTab === 'lesson' && (
              <div className="space-y-6">
                {/* Core Concepts */}
                {selectedLesson.coreConcepts.map((concept, idx) => (
                  <div key={idx} className="space-y-2 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-base font-bold text-slate-900">
                      {concept.heading}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {concept.body}
                    </p>

                    {concept.clinicalExample && (
                      <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-blue-950">
                        <span className="font-bold text-blue-700">Clinical Case In Point:</span>{' '}
                        {concept.clinicalExample}
                      </div>
                    )}

                    {concept.proTip && (
                      <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
                        <Sparkles className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <strong className="text-amber-800 uppercase tracking-wider">VP Sales Pro Tip:</strong>{' '}
                          {concept.proTip}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Lesson-Level Quick Quiz if available */}
                {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                  <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                        Immediate Knowledge Check
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {selectedLesson.quiz.map((q) => (
                        <div key={q.id} className="space-y-2.5">
                          <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                          <div className="space-y-1.5">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = quizAnswers[q.id] === optIdx;
                              const isCorrect = q.correctIndex === optIdx;

                              let optClass = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300';
                              if (quizSubmitted) {
                                if (isCorrect) {
                                  optClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold';
                                } else if (isSelected && !isCorrect) {
                                  optClass = 'border-rose-300 bg-rose-50 text-rose-900';
                                }
                              } else if (isSelected) {
                                optClass = 'border-blue-600 bg-blue-50/70 text-slate-900 font-semibold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, optIdx)}
                                  className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-xs transition ${optClass}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && isCorrect && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <p className="text-xs text-slate-700 mt-2 bg-white p-3 rounded-lg border border-slate-200">
                              <strong className="text-blue-700">Explanation:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}

                      {!quizSubmitted ? (
                        <button
                          type="button"
                          onClick={handleGradeQuiz}
                          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs"
                        >
                          Check Answer
                        </button>
                      ) : (
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-700">
                            Knowledge Check Complete!
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setQuizSubmitted(false);
                              setQuizAnswers({});
                            }}
                            className="text-xs text-slate-500 hover:text-slate-900"
                          >
                            Retake Question
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: CASE STUDY */}
            {activeTab === 'case_study' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                  <span className="text-slate-500 uppercase tracking-wider font-bold">Corporate Context:</span>{' '}
                  <span className="text-slate-900 font-bold">{selectedModule.caseStudy.companyContext}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                    The Situation & Clinical Setting
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedModule.caseStudy.scenario}
                  </p>
                </div>

                <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-4">
                  <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
                    <AlertCircle className="h-4 w-4" />
                    The Institutional Barrier
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    {selectedModule.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Executive Strategy Executed
                  </h3>
                  <ul className="space-y-2">
                    {selectedModule.caseStudy.strategyUsed.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-700 font-mono font-bold">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      Measurable Business Outcome
                    </div>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {selectedModule.caseStudy.outcomeMetrics}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Executive Leadership Lesson
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{selectedModule.caseStudy.executiveTakeaway}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: MODULE CERTIFICATION EXAM */}
            {activeTab === 'exam' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-800 mb-1">
                    <Award className="h-4 w-4" />
                    Module {selectedModule.number} Competency Verification
                  </div>
                  <p>
                    Pass this rigorous competency exam with a score of 80% or higher to earn the official{' '}
                    <strong>Certified Healthcare Commercial Specialist (CHCS)</strong> module badge for your resume and Brag Book.
                  </p>
                </div>

                <div className="space-y-6">
                  {selectedModule.finalExamQuestions.map((q, qIndex) => (
                    <div key={q.id} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-blue-700 text-xs font-bold">
                          Q{qIndex + 1}.
                        </span>
                        <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[q.id] === optIdx;
                          const isCorrect = q.correctIndex === optIdx;

                          let optClass = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300';
                          if (quizSubmitted) {
                            if (isCorrect) {
                              optClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optClass = 'border-rose-300 bg-rose-50 text-rose-900';
                            }
                          } else if (isSelected) {
                            optClass = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-xs transition ${optClass}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                          <strong className="text-blue-700">Analysis:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={handleGradeQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedModule.finalExamQuestions.length}
                    className="w-full rounded-lg bg-blue-600 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-blue-700 shadow-sm disabled:opacity-50 transition"
                  >
                    Submit Exam for Grading
                  </button>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                    <div className="text-3xl font-extrabold font-mono text-blue-600">
                      {quizScore}%
                    </div>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {quizScore !== null && quizScore >= 80 ? 'Exam Passed! Credential Issued.' : 'Score below 80%. Review lessons and retake.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                        setQuizScore(null);
                      }}
                      className="mt-3 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Retake Exam
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
