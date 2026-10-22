import React, { useState } from 'react';
import { Battlecard, HealthcareTrack } from '../types';
import { BATTLECARDS } from '../data/battlecardsData';
import { Shield, Search, Copy, Check, AlertCircle, HelpCircle, Sparkles } from 'lucide-react';

interface BattlecardPlaybookProps {
  currentTrack: HealthcareTrack;
}

export const BattlecardPlaybook: React.FC<BattlecardPlaybookProps> = ({ currentTrack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Incumbent Loyalty', 'Price & VAC', 'Gatekeeper / Access', 'Reimbursement & Formularies'];

  const filteredBattlecards = BATTLECARDS.filter((bc) => {
    const matchesCategory = selectedCategory === 'All' || bc.category === selectedCategory;
    const matchesSearch =
      bc.objection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bc.topPerformerScript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bc.psychologicalRoot.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Shield className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Healthcare Objection Handling & Competitor Battlecards
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Word-for-word scripts and cognitive psychology behind dismantling the most stubborn physician and hospital objections.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search objections, scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
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

      {/* Battlecards Grid */}
      <div className="space-y-4">
        {filteredBattlecards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
          >
            {/* Objection Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                  {card.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {card.objection}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(card.id, card.topPerformerScript)}
                className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                {copiedId === card.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Psychological Root Cause:
                </span>
                <p className="text-slate-600 leading-relaxed">{card.psychologicalRoot}</p>
              </div>

              <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3.5">
                <span className="font-bold text-rose-800 uppercase tracking-wider block mb-1">
                  The Amateur Rookie Mistake:
                </span>
                <p className="text-rose-950 leading-relaxed">{card.amateurMistake}</p>
              </div>
            </div>

            {/* The Top Performer Script */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">
                <Sparkles className="h-4 w-4 text-blue-600" />
                President's Club Word-for-Word Reversal Script
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed italic">
                {card.topPerformerScript}
              </p>
            </div>

            {/* Follow-up Probing Questions */}
            <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                <span className="font-bold text-slate-700">Probing Power Question:</span>{' '}
                <span className="italic text-slate-800">"{card.powerQuestions[0]}"</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Required Dossier:</span>{' '}
                <span className="text-blue-700 font-semibold">{card.requiredEvidence}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredBattlecards.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-xs">
            No battlecards found matching "{searchQuery}". Try searching for VAC, incumbent, or reimbursement.
          </div>
        )}
      </div>
    </div>
  );
};
