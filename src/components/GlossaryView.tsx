import React, { useState } from 'react';
import { GlossaryTerm } from '../types';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { BookOpen, Search, RotateCw, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = [
    'All',
    'OR & Surgical',
    'Reimbursement & Coding',
    'Regulatory & Legal',
    'Hospital Admin & Supply Chain',
    'Biotech & Pharma',
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.acronym && t.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentCard = filteredTerms[currentFlashcardIndex] || filteredTerms[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % filteredTerms.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Healthcare Clinical & Commercial Vocabulary Index
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Master the clinical, hospital administrative, coding, and regulatory terminology required to command respect in the OR and C-Suite.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsFlashcardMode(!isFlashcardMode);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition ${
              isFlashcardMode
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCw className="h-3.5 w-3.5" />
            {isFlashcardMode ? 'Exit Flashcard Mode' : 'Flashcard Study Mode'}
          </button>
        </div>
      </div>

      {!isFlashcardMode ? (
        <>
          {/* Controls: Categories & Search */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search acronyms, definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredTerms.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-600">
                      {t.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{t.term}</h3>
                  </div>
                  {t.acronym && (
                    <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-blue-700 border border-blue-100">
                      {t.acronym}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{t.definition}</p>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs space-y-1.5">
                  <div>
                    <span className="font-bold text-blue-700">Commercial Relevance:</span>{' '}
                    <span className="text-slate-800">{t.commercialApplication}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-200/80 text-slate-500 italic">
                    "{t.exampleSentence}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* FLASHCARD STUDY MODE */
        <div className="mx-auto max-w-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Card {currentFlashcardIndex + 1} of {filteredTerms.length}
            </span>
            <span>Category: {currentCard?.category}</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex min-h-[300px] cursor-pointer flex-col justify-between rounded-xl border border-blue-200 bg-white p-8 text-center shadow-md transition hover:border-blue-400"
          >
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-blue-600">
              {isFlipped ? 'Definition & Field Context' : 'Clinical / Commercial Term'}
            </div>

            <div className="my-auto">
              {!isFlipped ? (
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">{currentCard?.term}</h3>
                  {currentCard?.acronym && (
                    <div className="text-sm font-mono font-semibold text-blue-700">
                      Acronym: {currentCard?.acronym}
                    </div>
                  )}
                  <p className="text-xs text-slate-400 mt-4">(Click anywhere to flip card)</p>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">{currentCard?.definition}</p>
                  <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-xs">
                    <span className="font-bold text-blue-700">Why It Matters in Sales:</span>{' '}
                    <span className="text-slate-800">{currentCard?.commercialApplication}</span>
                  </div>
                  <div className="text-xs text-slate-500 italic">"{currentCard?.exampleSentence}"</div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              {isFlipped ? 'Click to flip back' : 'Click card to reveal definition'}
            </div>
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Card
            </button>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
            >
              Next Card
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
