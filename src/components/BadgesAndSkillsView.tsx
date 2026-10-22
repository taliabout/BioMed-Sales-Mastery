import React, { useState } from 'react';
import { SALES_BADGES, ELITE_SALES_SKILLS, SalesBadge, EliteSalesSkill } from '../data/badgesData';
import {
  Award,
  ShieldCheck,
  Sparkles,
  Lock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Layers,
  FileText,
} from 'lucide-react';

interface BadgesAndSkillsViewProps {
  certifiedModules: string[];
}

export const BadgesAndSkillsView: React.FC<BadgesAndSkillsViewProps> = ({ certifiedModules }) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'elite_skills'>('badges');
  const [selectedSkill, setSelectedSkill] = useState<EliteSalesSkill>(ELITE_SALES_SKILLS[0]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Award className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Commercial Skills Portfolio: Badges Inspired by Industry Credentials
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Educational badges inspired by industry credentials and standards, demonstrating competency in hospital procurement, sterile protocol, and consultative selling. (Platform-issued learning portfolio; not an official accredited certification).
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setActiveTab('badges')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'badges'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial Badges ({SALES_BADGES.length})
          </button>
          <button
            onClick={() => setActiveTab('elite_skills')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'elite_skills'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unspoken Field Skills ({ELITE_SALES_SKILLS.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: INDUSTRY BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SALES_BADGES.map((b) => {
              const isUnlocked = b.unlockedByDefault || certifiedModules.length >= 2;
              return (
                <div
                  key={b.id}
                  className={`flex flex-col justify-between rounded-xl border p-5 transition shadow-sm ${
                    isUnlocked
                      ? 'border-blue-200 bg-white hover:border-blue-400'
                      : 'border-slate-200 bg-slate-50/80 opacity-80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-blue-100">
                        {b.code}
                      </span>
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Earned
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Lock className="h-3 w-3" />
                          Locked
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{b.name}</h4>
                      <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">{b.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-400 space-y-1">
                      <div>
                        <strong className="text-slate-600">Issuer:</strong> {b.issuer}
                      </div>
                      <div>
                        <strong className="text-slate-600">Tier:</strong>{' '}
                        <span className="text-blue-600 font-semibold">{b.industryWeight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Verification Criteria:
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-slate-600">
                      {b.criteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: UNSPOKEN ELITE SALES SKILLS */}
      {activeTab === 'elite_skills' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Skill Selector Sidebar */}
          <div className="space-y-2 lg:col-span-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              High-Leverage Field Tactics
            </h3>
            {ELITE_SALES_SKILLS.map((sk) => {
              const isSelected = sk.id === selectedSkill.id;
              return (
                <button
                  key={sk.id}
                  onClick={() => setSelectedSkill(sk)}
                  className={`flex w-full flex-col rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-blue-600">
                      {sk.rarity}
                    </span>
                  </div>
                  <h4 className="mt-1 font-bold text-slate-900 text-sm">{sk.title}</h4>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{sk.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Skill Tactical Playbook Breakdown */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="font-mono text-xs font-bold text-blue-600 uppercase">
                  {selectedSkill.rarity} Playbook
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedSkill.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {selectedSkill.summary}
                </p>
              </div>

              {/* Step-by-Step Playbook */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step-by-Step Execution Protocol
                </h4>
                {selectedSkill.tacticalPlaybook.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 text-xs space-y-1.5"
                  >
                    <div className="font-bold text-blue-700">{step.phase}</div>
                    <p className="text-slate-700">{step.action}</p>
                    <div className="rounded bg-white p-2.5 border border-slate-200 text-slate-800 italic">
                      <strong className="text-slate-900 not-italic">Tactical Line:</strong> {step.scriptOrTactic}
                    </div>
                  </div>
                ))}
              </div>

              {/* Insider Secret */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-800 mb-1">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  Vice President of Sales Insider Secret:
                </div>
                <p className="leading-relaxed font-medium">{selectedSkill.insiderSecret}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
