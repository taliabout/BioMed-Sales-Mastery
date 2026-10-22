import React, { useState } from 'react';
import { MASTER_ACADEMIES } from '../data/masterCurriculumData';
import { AcademyModule } from '../types';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Award,
  AlertTriangle,
  Lightbulb,
  Check,
  Search,
  Filter,
  ArrowRight,
  Star,
  Brain,
} from 'lucide-react';

interface MasterAcademiesViewProps {
  onSelectPracticeLab?: () => void;
}

export const MasterAcademiesView: React.FC<MasterAcademiesViewProps> = ({ onSelectPracticeLab }) => {
  const [selectedAcademy, setSelectedAcademy] = useState<AcademyModule>(MASTER_ACADEMIES[0]);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filteredAcademies = MASTER_ACADEMIES.filter((acad) => {
    const matchesLevel = filterLevel === 'All' || acad.targetLevel === filterLevel;
    const matchesQuery =
      acad.academyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acad.academySubtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  const currentLesson = selectedAcademy.lessons[selectedLessonIndex] || selectedAcademy.lessons[0];

  const handleToggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleSelectAcademy = (acad: AcademyModule) => {
    setSelectedAcademy(acad);
    setSelectedLessonIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    selectedAcademy.knowledgeCheck.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: selectedAcademy.knowledgeCheck.length,
      percentage: Math.round((correct / selectedAcademy.knowledgeCheck.length) * 100),
    };
  };

  const totalCompletedInCurrentAcademy = selectedAcademy.lessons.filter(
    (l) => completedLessons[l.id]
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Banner */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-2xs">
                The 12 Master Academies
              </span>
              <span className="text-xs text-slate-500">
                Total Curriculum: 88 Hours of Commercial & Clinical Mastery
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Healthcare & Life Sciences Commercial Academy
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              From absolute foundations through graduate-level commercial strategy, market access, clinical trial statistics, PhRMA/AdvaMed compliance, and sales leadership.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-right shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Total Lessons Completed
              </span>
              <span className="text-base font-extrabold text-blue-700">
                {Object.keys(completedLessons).filter((k) => completedLessons[k]).length} of{' '}
                {MASTER_ACADEMIES.reduce((acc, a) => acc + a.lessons.length, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Foundational', 'Professional', 'Executive / Strategic'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filterLevel === lvl
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 12 academies & lessons..."
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Academy Navigation List + Active Academy Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: 12 Academy Selector */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[850px] overflow-y-auto pr-1">
          {filteredAcademies.map((academy) => {
            const isSelected = selectedAcademy.id === academy.id;
            const completedCount = academy.lessons.filter((l) => completedLessons[l.id]).length;
            const isAllComplete = completedCount === academy.lessons.length;

            return (
              <div
                key={academy.id}
                onClick={() => handleSelectAcademy(academy)}
                className={`group cursor-pointer rounded-xl border p-3.5 transition ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/80 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      academy.targetLevel === 'Foundational'
                        ? 'bg-emerald-100 text-emerald-800'
                        : academy.targetLevel === 'Professional'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {academy.targetLevel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{academy.estimatedHours}h</span>
                  </div>
                </div>

                <h3 className="mt-2 text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  {academy.academyName}
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                  {academy.academySubtitle}
                </p>

                {/* Progress Mini Bar */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Progress: {completedCount}/{academy.lessons.length}</span>
                  {isAllComplete && (
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> Certified
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(completedCount / academy.lessons.length) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Academy Detailed Lessons & Case Study */}
        <div className="lg:col-span-8 space-y-6">
          {/* Academy Overview Banner */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {selectedAcademy.targetLevel} Curriculum • {selectedAcademy.estimatedHours} Hours
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedAcademy.academyName}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  {selectedAcademy.academySubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 border border-blue-200">
                  {totalCompletedInCurrentAcademy}/{selectedAcademy.lessons.length} Completed
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {selectedAcademy.description}
            </p>

            {/* Learning Objectives Grid */}
            <div className="mt-4 rounded-lg bg-slate-50 p-3.5 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Award className="h-3.5 w-3.5 text-blue-600" />
                Key Competency Learning Objectives
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {selectedAcademy.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Tabs */}
            <div className="mt-6 border-b border-slate-200">
              <div className="flex overflow-x-auto gap-2 pb-2">
                {selectedAcademy.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`flex items-center gap-2 shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      selectedLessonIndex === idx
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Lesson {idx + 1}</span>
                    {completedLessons[lesson.id] && <Check className="h-3 w-3 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Lesson Content */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  {currentLesson.title}
                </h3>
                <button
                  onClick={() => handleToggleLessonComplete(currentLesson.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    completedLessons[currentLesson.id]
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 ${completedLessons[currentLesson.id] ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{completedLessons[currentLesson.id] ? 'Completed ✓' : 'Mark as Complete'}</span>
                </button>
              </div>

              <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100 text-xs text-slate-700 leading-relaxed">
                <strong className="text-blue-900 block mb-1">Executive Summary:</strong>
                {currentLesson.summary}
              </div>

              {/* Core Key Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Core Instructional Principles & Concepts
                </h4>
                {currentLesson.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs text-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Clinical / Commercial Real-World Example */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  Field Scenario & Clinical Reality
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentLesson.clinicalOrCommercialExample}
                </p>
              </div>

              {/* Practical Exercise Prompt */}
              {currentLesson.practicalExercisePrompt ? (
                <div className="rounded-lg border border-slate-200 bg-slate-900 p-4 text-slate-100">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1">
                    Actionable Practical Exercise
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLesson.practicalExercisePrompt}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-900 p-4 text-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-0.5">
                      Applied Commercial Practice
                    </h4>
                    <p className="text-xs text-slate-300">
                      Apply the principles from this lesson in the 20-exercise Commercial Practice Lab.
                    </p>
                  </div>
                  {onSelectPracticeLab && (
                    <button
                      onClick={onSelectPracticeLab}
                      className="rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Open Lab →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Worked Case Study Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Brain className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Worked Clinical-Commercial Case Study: {selectedAcademy.workedCaseStudy.title}
              </h3>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-0.5">Institutional Context:</span>
                  <p className="text-slate-600">{selectedAcademy.workedCaseStudy.context}</p>
                </div>
                <div className="rounded-lg bg-rose-50/60 p-3 border border-rose-100">
                  <span className="font-bold text-rose-900 block mb-0.5">Commercial Challenge:</span>
                  <p className="text-rose-800">{selectedAcademy.workedCaseStudy.challenge}</p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <span className="font-bold text-slate-700 block mb-0.5">Strategy & Tactical Execution:</span>
                <p className="text-slate-600 leading-relaxed">{selectedAcademy.workedCaseStudy.strategyAndSolution}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-50/60 p-3 border border-emerald-100">
                  <span className="font-bold text-emerald-900 block mb-0.5">Commercial Outcome:</span>
                  <p className="text-emerald-800 font-medium">{selectedAcademy.workedCaseStudy.commercialOutcome}</p>
                </div>
                <div className="rounded-lg bg-blue-50/60 p-3 border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-0.5">Executive Takeaway:</span>
                  <p className="text-blue-800">{selectedAcademy.workedCaseStudy.executiveTakeaway}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Check Quiz */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Academy Knowledge Check & Retrieval Practice
                </h3>
              </div>
              {quizSubmitted && (
                <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
                  Score: {calculateQuizScore().percentage}% ({calculateQuizScore().correct}/{calculateQuizScore().total})
                </span>
              )}
            </div>

            <div className="mt-4 space-y-5">
              {selectedAcademy.knowledgeCheck.map((q, qIdx) => (
                <div key={qIdx} className="rounded-lg border border-slate-100 bg-slate-50/60 p-4 text-xs">
                  <p className="font-bold text-slate-900 mb-2.5">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let optionClasses = 'border-slate-200 bg-white text-slate-700 hover:border-blue-400';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionClasses = 'border-rose-400 bg-rose-50 text-rose-900';
                        } else {
                          optionClasses = 'border-slate-200 bg-white text-slate-400';
                        }
                      } else if (isSelected) {
                        optionClasses = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-2.5 transition ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-3 rounded border border-blue-100 bg-blue-50/80 p-2 text-[11px] text-blue-800">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} of {selectedAcademy.knowledgeCheck.length} answered
                </span>
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={quizSubmitted || Object.keys(quizAnswers).length < selectedAcademy.knowledgeCheck.length}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
                >
                  {quizSubmitted ? 'Assessment Submitted' : 'Submit Knowledge Check'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
