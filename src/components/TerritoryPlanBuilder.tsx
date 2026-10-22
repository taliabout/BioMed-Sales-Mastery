import React, { useState } from 'react';
import { HealthcareTrack } from '../types';
import {
  MapPin,
  Calendar,
  Building,
  Target,
  FileDown,
  Printer,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface TerritoryPlanBuilderProps {
  currentTrack: HealthcareTrack;
  userName: string;
}

export const TerritoryPlanBuilder: React.FC<TerritoryPlanBuilderProps> = ({ currentTrack, userName }) => {
  const [territoryName, setTerritoryName] = useState('Dallas-Fort Worth Metroplex');
  const [targetSpecialty, setTargetSpecialty] = useState('Total Joint Arthroplasty & Robotic Orthopedics');
  const [primaryIDN, setPrimaryIDN] = useState('Baylor Scott & White Health / Texas Health Resources');
  const [quotaTarget, setQuotaTarget] = useState('$2,400,000 Annual Revenue');
  const [gpoFocus, setGpoFocus] = useState('Premier / Vizient');
  const [selectedTab, setSelectedTab] = useState<'30_days' | '60_days' | '90_days' | 'full_overview'>('30_days');

  // Quick preset loader
  const loadPreset = (preset: 'stryker' | 'genentech' | 'intuitive') => {
    if (preset === 'stryker') {
      setTerritoryName('Greater Chicago Metropolitan Area');
      setTargetSpecialty('Orthopedic Trauma & Extremity Reconstructions');
      setPrimaryIDN('Northwestern Medicine / Rush University Health');
      setQuotaTarget('$2,850,000 Annual Quota');
      setGpoFocus('Vizient Tier 2 Committed');
    } else if (preset === 'genentech') {
      setTerritoryName('New York Metro / Long Island Oncology');
      setTargetSpecialty('Thoracic Oncology & Immunotherapy Biologics');
      setPrimaryIDN('Memorial Sloan Kettering / Northwell Health');
      setQuotaTarget('$6,200,000 Territory Volume');
      setGpoFocus('NCCN Guideline Co-Preferred');
    } else if (preset === 'intuitive') {
      setTerritoryName('Southern California Surgical District');
      setTargetSpecialty('Multi-Port Robotic General Surgery & Urology');
      setPrimaryIDN('Cedars-Sinai / UCLA Health / Providence');
      setQuotaTarget('4 Capital Consoles ($4.8M) + $1.8M Consumables');
      setGpoFocus('HealthTrust Direct Capital Placement');
    }
  };

  const planData = {
    first30: {
      theme: 'Phase 1: Territory Intelligence, Credentialing & Clinical Mastery',
      focus: 'Zero commercial mistakes; 100% operational credibility before pitching a single surgeon.',
      milestones: [
        {
          category: 'Hospital Credentialing & Compliance',
          action: 'Complete 100% vendor credentialing (RepTrax, Vendormate, Symplr) across all 14 target IDN hospitals with zero lapse.',
          deliverable: 'Active green surgical badges for every operating facility in territory.',
        },
        {
          category: 'Product & Tray Layout Mastery',
          action: 'Spend 40 hours in central sterile processing (CSP) learning every reamer, trial stem, and screw caddy in the surgical tray.',
          deliverable: 'Pass corporate instrument layout blind test with 100% accuracy.',
        },
        {
          category: 'Account Segmentation & Routing',
          action: 'Audit public state health discharge databases to segment the territory: 4 Tier-1 AMCs, 6 Tier-2 Community Hospitals, and 8 Ambulatory Surgery Centers.',
          deliverable: 'Geographic weekly call routing plan prioritizing top 20% procedure volume accounts.',
        },
        {
          category: 'Scrub Nurse & Tech Relationship Building',
          action: 'Meet with Lead OR Scrub Techs and Sterile Processing Supervisors across top 5 accounts to understand pain points with current competitor trays.',
          deliverable: 'Sterilization bottleneck map across all target facilities.',
        },
      ],
    },
    days60: {
      theme: 'Phase 2: Champion Cultivation, VAC Infiltration & Clinical Trials',
      focus: 'Converting surgeon curiosity into hospital Value Analysis Committee submissions.',
      milestones: [
        {
          category: 'Surgeon Champion Alignment',
          action: 'Conduct 20 focused scrub-sink or hallway detailing conversations with fellowship-trained attending surgeons.',
          deliverable: 'Secure minimum 3 signed Surgeon VAC Champion attestation letters.',
        },
        {
          category: 'Value Analysis Committee (VAC) Submissions',
          action: 'Pre-populate and submit comprehensive VAC dossier packets to Supply Chain Directors at 2 flagship IDN hospitals.',
          deliverable: 'Products placed on official monthly VAC voting dockets.',
        },
        {
          category: 'First Clinical Evaluation Cases',
          action: 'Support and stand scrubbed-in for first 5 clinical evaluation cases under single-case carve-out authorizations.',
          deliverable: 'Flawless surgical executions with zero intraoperative instrument errors.',
        },
        {
          category: 'Economic Buyer Engagement',
          action: 'Present Total Cost of Care budget impact model to Service Line Executive Directors, highlighting 1.2-day shorter length of stay.',
          deliverable: 'Hospital CFO initial approval on GPO price parity schedule.',
        },
      ],
    },
    days90: {
      theme: 'Phase 3: Contract Execution, Consignment & Quota Ramp',
      focus: 'Institutional standardization, recurring purchase orders, and territory dominance.',
      milestones: [
        {
          category: 'Paper Process & PO Issuance',
          action: 'Shepherd hospital legal procurement through Business Associate Agreements (BAA) and execute master purchasing schedules.',
          deliverable: 'First official recurring hospital Purchase Orders (POs) generated.',
        },
        {
          category: 'Consignment Trunk Stock Placement',
          action: 'Establish par-level consignment inventory ($250k) inside hospital core storage, eliminating loaner freight costs.',
          deliverable: 'Consignment agreements signed by hospital materials managers.',
        },
        {
          category: 'Staff In-Service & OR Education',
          action: 'Host 4 accredited sterile in-service training breakfasts for night and day shift scrub nurses and surgical techs.',
          deliverable: 'Entire OR nursing staff certified on system assembly and cleaning.',
        },
        {
          category: 'Revenue Acceleration & Pipeline Expansion',
          action: 'Scale weekly case volume from 2 cases/week to 8 cases/week across converted surgeons, reaching 115% of pro-rated quota.',
          deliverable: 'On track for President\'s Club territory ranking.',
        },
      ],
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <MapPin className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-white">
              Executive 30-60-90 Day Territory Business Plan Builder
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Generate a customized, recruiter-grade territory business plan to present in final-round medical sales interviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Load Template:</span>
          <button
            onClick={() => loadPreset('stryker')}
            className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
          >
            Stryker Trauma
          </button>
          <button
            onClick={() => loadPreset('genentech')}
            className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
          >
            Genentech Oncology
          </button>
          <button
            onClick={() => loadPreset('intuitive')}
            className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
          >
            Intuitive Surgical
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Plan
          </button>
        </div>
      </div>

      {/* Inputs Configuration Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs">
        <div>
          <label className="block text-slate-400 font-medium uppercase tracking-wider mb-1">
            Territory Geography
          </label>
          <input
            type="text"
            value={territoryName}
            onChange={(e) => setTerritoryName(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium uppercase tracking-wider mb-1">
            Target Clinical Line
          </label>
          <input
            type="text"
            value={targetSpecialty}
            onChange={(e) => setTargetSpecialty(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium uppercase tracking-wider mb-1">
            Primary Target IDNs
          </label>
          <input
            type="text"
            value={primaryIDN}
            onChange={(e) => setPrimaryIDN(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium uppercase tracking-wider mb-1">
            Annual Quota Target
          </label>
          <input
            type="text"
            value={quotaTarget}
            onChange={(e) => setQuotaTarget(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium uppercase tracking-wider mb-1">
            Primary GPO Alignment
          </label>
          <input
            type="text"
            value={gpoFocus}
            onChange={(e) => setGpoFocus(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Plan Document Preview Container */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Document Header */}
        <div className="border-b border-slate-800 bg-slate-950/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Confidential Territory Business Proposal
              </span>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
                30-60-90 Day Strategic Territory Execution Plan
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Prepared by: <strong className="text-slate-200">{userName || 'Candidate / Territory Manager'}</strong> · Focus: {targetSpecialty} · Territory: {territoryName}
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 p-1">
              {[
                { id: '30_days', label: 'First 30 Days' },
                { id: '60_days', label: 'Days 31-60' },
                { id: '90_days', label: 'Days 61-90' },
                { id: 'full_overview', label: 'Executive Synthesis' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    selectedTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6">
          {(selectedTab === '30_days' || selectedTab === 'full_overview') && (
            <div className="mb-8 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Phase 1 (Days 1 - 30)
                </span>
                <h3 className="text-lg font-bold text-white">{planData.first30.theme}</h3>
                <p className="text-xs text-slate-400">{planData.first30.focus}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {planData.first30.milestones.map((m, i) => (
                  <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                      {m.category}
                    </span>
                    <p className="mt-1.5 text-slate-200 leading-relaxed">{m.action}</p>
                    <div className="mt-2.5 border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong className="text-slate-300">Deliverable:</strong> {m.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(selectedTab === '60_days' || selectedTab === 'full_overview') && (
            <div className="mb-8 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Phase 2 (Days 31 - 60)
                </span>
                <h3 className="text-lg font-bold text-white">{planData.days60.theme}</h3>
                <p className="text-xs text-slate-400">{planData.days60.focus}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {planData.days60.milestones.map((m, i) => (
                  <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                      {m.category}
                    </span>
                    <p className="mt-1.5 text-slate-200 leading-relaxed">{m.action}</p>
                    <div className="mt-2.5 border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong className="text-slate-300">Deliverable:</strong> {m.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(selectedTab === '90_days' || selectedTab === 'full_overview') && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Phase 3 (Days 61 - 90)
                </span>
                <h3 className="text-lg font-bold text-white">{planData.days90.theme}</h3>
                <p className="text-xs text-slate-400">{planData.days90.focus}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {planData.days90.milestones.map((m, i) => (
                  <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                      {m.category}
                    </span>
                    <p className="mt-1.5 text-slate-200 leading-relaxed">{m.action}</p>
                    <div className="mt-2.5 border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong className="text-slate-300">Deliverable:</strong> {m.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
