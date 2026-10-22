import React, { useState } from 'react';
import {
  NETWORKING_STAKEHOLDERS,
  TARGET_HEALTHCARE_COMPANIES,
  StakeholderNode,
  HealthcareCompanyProfile,
} from '../data/networkingMapData';
import {
  Network,
  Users,
  Building2,
  Copy,
  Check,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Award,
  Zap,
} from 'lucide-react';

export const NetworkingMapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stakeholder_map' | 'company_ladders'>('stakeholder_map');
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderNode>(NETWORKING_STAKEHOLDERS[0]);
  const [selectedCompany, setSelectedCompany] = useState<HealthcareCompanyProfile>(TARGET_HEALTHCARE_COMPANIES[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'hospital_committee' | 'corporate_sales_ladder' | 'clinical_user'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const filteredStakeholders = NETWORKING_STAKEHOLDERS.filter((s) => {
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.typicalTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-blue-200 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            <Network className="h-3.5 w-3.5 text-blue-300" />
            <span>Interactive Industry Networking & Stakeholder Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Healthcare Commercial Stakeholder Matrix & Career Org Charts
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Navigate the hospital buying matrix (VAC, Surgeons, SPD, CFO) and the medical device/biotech corporate hierarchy (ASR &rarr; TM &rarr; RSD &rarr; VP). Access real high-converting LinkedIn InMail scripts, 15-minute phone interview templates, and company-specific Gallup hiring playbooks for Stryker, Medtronic, Genentech, and Intuitive.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveTab('stakeholder_map')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition shadow-xs ${
              activeTab === 'stakeholder_map'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Hospital & Sales Stakeholder Network ({NETWORKING_STAKEHOLDERS.length} Roles)</span>
          </button>
          <button
            onClick={() => setActiveTab('company_ladders')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition shadow-xs ${
              activeTab === 'company_ladders'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Top Employer Career Ladders & Hiring Secrets ({TARGET_HEALTHCARE_COMPANIES.length} Companies)</span>
          </button>
        </div>
      </div>

      {activeTab === 'stakeholder_map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filterable Stakeholder Grid / Map */}
          <div className="lg:col-span-5 space-y-4">
            {/* Filter and Search Bar */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search roles, titles, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    filterCategory === 'all'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({NETWORKING_STAKEHOLDERS.length})
                </button>
                <button
                  onClick={() => setFilterCategory('hospital_committee')}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    filterCategory === 'hospital_committee'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hospital VAC & Leadership
                </button>
                <button
                  onClick={() => setFilterCategory('corporate_sales_ladder')}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    filterCategory === 'corporate_sales_ladder'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Corporate Sales Ladder
                </button>
                <button
                  onClick={() => setFilterCategory('clinical_user')}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    filterCategory === 'clinical_user'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  OR Staff & Users
                </button>
              </div>
            </div>

            {/* Stakeholder Node Cards */}
            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredStakeholders.map((s) => {
                const isSelected = selectedStakeholder.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStakeholder(s)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-400'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              s.category === 'hospital_committee'
                                ? 'bg-amber-100 text-amber-800'
                                : s.category === 'corporate_sales_ladder'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {s.influenceLevel}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Receptivity: {s.receptivityScore}%
                          </span>
                        </div>
                        <h3 className="mt-1 font-bold text-sm text-slate-900">{s.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{s.typicalTitle}</p>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                        }`}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                      <span className="font-mono font-medium text-blue-700">{s.avgCompOrBudget}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 font-medium text-[10px]">
                        Channel: {s.bestChannel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Stakeholder Intel Dossier */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 sticky top-20">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-800">
                      {selectedStakeholder.influenceLevel}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-600">
                      Typical Compensation / Budget: {selectedStakeholder.avgCompOrBudget}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    {selectedStakeholder.name}
                  </h2>
                  <p className="text-xs text-slate-500">{selectedStakeholder.typicalTitle}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Preferred Channel</div>
                  <div className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200/60 mt-0.5">
                    {selectedStakeholder.bestChannel}
                  </div>
                </div>
              </div>

              {/* Psychology: Motivators vs Fears */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>Top Motivators & Career Wins</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {selectedStakeholder.topMotivators[0]}
                  </p>
                </div>

                <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                    <span>Biggest Fears & Deal Killers</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    {selectedStakeholder.biggestFears[0]}
                  </p>
                </div>
              </div>

              {/* High-Converting LinkedIn Script */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-blue-600" />
                    High-Converting LinkedIn InMail Script (0% Cheese)
                  </span>
                  <button
                    onClick={() => handleCopy(selectedStakeholder.linkedinScript, 'linkedin')}
                    className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-100"
                  >
                    {copiedKey === 'linkedin' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-slate-500" />
                        <span>Copy InMail</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded border border-slate-200 bg-white p-3 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedStakeholder.linkedinScript}
                </div>
              </div>

              {/* Hallway Detailing / Phone Script */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    OR Hallway / Rapid Phone Detailing Script
                  </span>
                  <button
                    onClick={() => handleCopy(selectedStakeholder.phoneOrHallwayScript, 'phone')}
                    className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-100"
                  >
                    {copiedKey === 'phone' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-slate-500" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded border border-slate-200 bg-white p-3 font-mono text-xs text-slate-800 italic leading-relaxed">
                  {selectedStakeholder.phoneOrHallwayScript}
                </div>
              </div>

              {/* Strategic Secrets: How to Win Champion Status & Interview Question */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800">
                    How to Turn Them Into Your Internal Champion
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedStakeholder.howToWinChampionStatus}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800">
                    Interview Question They Will Ask You
                  </h4>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{selectedStakeholder.interviewPrepQuestion}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Top Healthcare Companies & Career Ladders View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            {TARGET_HEALTHCARE_COMPANIES.map((company) => {
              const isSelected = selectedCompany.id === company.id;
              return (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-400'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-blue-700">
                      {company.sector.split('&')[0]}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {company.marketCapOrRevenue.split('(')[0]}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{company.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {company.cultureProfile}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Company Deep Dive Dossier */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                    {selectedCompany.sector}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Financial Scale: {selectedCompany.marketCapOrRevenue}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedCompany.name} Commercial Career Blueprint
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {selectedCompany.cultureProfile}
                </p>
              </div>

              {/* 4-Tier Commercial Sales Career Ladder */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Commercial Sales Progression Ladder & Compensation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Level 1: Entry Gate
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedCompany.salesStructure.entryLevelRole}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Case coverage, sterile tray logistics, shadowing senior TM.
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Level 2: Quota Carrier
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedCompany.salesStructure.midLevelRole}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Direct surgeon relationship ownership, hospital VAC conversions.
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Level 3: Strategic Senior Rep
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedCompany.salesStructure.seniorLevelRole}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      President's Club winner, IDN system-wide standardization deals.
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Level 4: Leadership & P&L
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedCompany.salesStructure.leadershipRole}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Regional hiring, P&L responsibility, territory quota allocation.
                    </div>
                  </div>
                </div>
              </div>

              {/* Interview Style & Insider Hiring Secrets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-500" />
                    Interview Style & Screening Process
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {selectedCompany.interviewStyle}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    Hiring Manager Insider Secret
                  </h4>
                  <p className="text-xs text-emerald-950 leading-relaxed bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                    {selectedCompany.hiringInsiderTip}
                  </p>
                </div>
              </div>

              {/* What They Look For & Top Products */}
              <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-800">Flagship Portfolio Technologies: </span>
                  <span className="text-slate-600">{selectedCompany.topProducts.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
