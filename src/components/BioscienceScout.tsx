import React, { useState, useEffect } from 'react';
import {
  Dna,
  Search,
  FileText,
  AlertTriangle,
  Activity,
  Layers,
  ExternalLink,
  BookOpen,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Box,
  Eye,
  Microscope
} from 'lucide-react';
import { HealthcareTrack } from '../types';

interface BioscienceScoutProps {
  currentTrack?: HealthcareTrack;
}

type BioSubTab = 'fda_labels' | 'clinical_trials' | 'pubchem_targets' | '3d_structure' | 'literature';

export const BioscienceScout: React.FC<BioscienceScoutProps> = ({ currentTrack = 'biotech_oncology' }) => {
  const [activeTab, setActiveTab] = useState<BioSubTab>('fda_labels');
  const [searchQuery, setSearchQuery] = useState('Keytruda');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // FDA Data State
  const [drugLabel, setDrugLabel] = useState<any>(null);
  // Clinical Trials State
  const [trialsData, setTrialsData] = useState<any[]>([]);
  // PubChem State
  const [pubchemData, setPubchemData] = useState<any>(null);
  // 3D Structure State
  const [selectedPdb, setSelectedPdb] = useState<{ id: string; name: string; description: string }>({
    id: '5DK3',
    name: 'Pembrolizumab (Keytruda) Fab in Complex with Human PD-1',
    description: 'High-resolution crystal structure (2.2 Å) showing the exact epitope binding interface blocking PD-L1/PD-L2 interactions on T-cells.'
  });

  // Fetch FDA Label
  const fetchDrugLabel = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bioscience/drug-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const data = await res.json();
        setDrugLabel(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Clinical Trials
  const fetchClinicalTrials = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bioscience/clinical-trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const data = await res.json();
        setTrialsData(data.studies || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch PubChem
  const fetchPubChem = async (compound: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bioscience/pubchem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ compoundName: compound })
      });
      if (res.ok) {
        const data = await res.json();
        setPubchemData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugLabel('Keytruda');
    fetchClinicalTrials('oncology checkpoint inhibitor');
    fetchPubChem('semaglutide');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (activeTab === 'fda_labels') {
      fetchDrugLabel(searchQuery);
    } else if (activeTab === 'clinical_trials') {
      fetchClinicalTrials(searchQuery);
    } else if (activeTab === 'pubchem_targets') {
      fetchPubChem(searchQuery);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickTherapies = [
    { label: 'Keytruda® (pembrolizumab)', q: 'Keytruda', pdb: { id: '5DK3', name: 'Pembrolizumab Fab - PD-1 Complex', description: 'Crystal structure showing antibody-receptor checkpoint blockade.' } },
    { label: 'Ozempic® (semaglutide)', q: 'Ozempic', pdb: { id: '6X18', name: 'GLP-1R in Complex with Semaglutide', description: 'Cryo-EM structure of human GLP-1 receptor activated by semaglutide peptide.' } },
    { label: 'Dupixent® (dupilumab)', q: 'Dupixent', pdb: { id: '3BPL', name: 'IL-4 Receptor Subunit Alpha Complex', description: 'Mechanism of dual IL-4/IL-13 receptor subunit targeting for Type 2 inflammation.' } },
    { label: 'Humira® (adalimumab)', q: 'Humira', pdb: { id: '3WD5', name: 'TNF-alpha Complexed with Adalimumab Fab', description: 'Structural basis of systemic TNF-alpha neutralization in autoimmune rheumatology.' } }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              <Microscope className="h-3.5 w-3.5" />
              <span>Bioscience & Clinical Research Lab · Scientific Competency Pillar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bioscience Intelligence Scout & 3D Molecular Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Equip your healthcare sales presentations with 100% verified regulatory data directly from openFDA package inserts, ClinicalTrials.gov phase 3 protocol endpoints, PubChem chemical architectures, and interactive 3D receptor-ligand crystallographic models.
            </p>
          </div>

          <div className="rounded-lg border border-indigo-400/30 bg-indigo-950/60 p-3.5 text-xs text-indigo-200 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>FDA Regulatory Adherence</span>
            </div>
            <p className="text-slate-300 text-[11px]">Strict compliance: On-label indications, boxed warnings & verifiable clinical trial endpoints.</p>
          </div>
        </div>

        {/* Quick Therapy Jump Links */}
        <div className="mt-4 pt-4 border-t border-indigo-800/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-indigo-300 font-medium">Quick Clinical Lookups:</span>
          {quickTherapies.map((item) => (
            <button
              key={item.q}
              onClick={() => {
                setSearchQuery(item.q);
                setSelectedPdb(item.pdb);
                fetchDrugLabel(item.q);
                fetchClinicalTrials(item.q);
                fetchPubChem(item.q);
              }}
              className="rounded-md bg-indigo-800/40 hover:bg-indigo-700/60 border border-indigo-500/30 px-2.5 py-1 text-indigo-200 transition text-[11px] font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white p-2 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('fda_labels')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === 'fda_labels'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>FDA Prescribing Labels</span>
          </button>

          <button
            onClick={() => setActiveTab('clinical_trials')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === 'clinical_trials'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>ClinicalTrials.gov Protocol Scout</span>
          </button>

          <button
            onClick={() => setActiveTab('pubchem_targets')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === 'pubchem_targets'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Dna className="h-4 w-4" />
            <span>PubChem Target Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('3d_structure')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === '3d_structure'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Box className="h-4 w-4" />
            <span>3D Molecular Model (RCSB PDB)</span>
          </button>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search therapy, trial, or target..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
          >
            {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
            <span>Query</span>
          </button>
        </form>
      </div>

      {/* Main Tab Views */}
      {/* TAB 1: FDA Labels */}
      {activeTab === 'fda_labels' && (
        <div className="space-y-4">
          {drugLabel ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Core Monograph Header Card */}
              <div className="lg:col-span-2 space-y-5">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {drugLabel.source || 'FDA Official Package Insert'}
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-900">{drugLabel.brandName}</h2>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Generic: {drugLabel.genericName} · Manufacturer: {drugLabel.manufacturer}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(drugLabel, null, 2))}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied Monograph' : 'Copy Monograph'}</span>
                    </button>
                  </div>

                  {/* Indications & Usage */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Approved Indications & Usage (On-Label Scope)</span>
                    </h3>
                    <div className="rounded-lg bg-emerald-50/60 border border-emerald-200/80 p-3.5 text-xs text-emerald-950 leading-relaxed font-sans">
                      {drugLabel.indications}
                    </div>
                  </div>

                  {/* Mechanism of Action */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Dna className="h-4 w-4 text-blue-600" />
                      <span>Mechanism of Action & Clinical Pharmacology</span>
                    </h3>
                    <div className="rounded-lg bg-blue-50/60 border border-blue-200/80 p-3.5 text-xs text-blue-950 leading-relaxed">
                      {drugLabel.mechanismOfAction}
                    </div>
                  </div>

                  {/* Dosage & Administration */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-purple-600" />
                      <span>Dosage & Route of Administration</span>
                    </h3>
                    <div className="rounded-lg bg-purple-50/60 border border-purple-200/80 p-3.5 text-xs text-purple-950 leading-relaxed">
                      <p className="font-semibold mb-1">Route: {drugLabel.route}</p>
                      <p>{drugLabel.dosage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety & Compliance Side Panel */}
              <div className="space-y-4">
                {/* Boxed Warning / Warnings & Cautions */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4 text-amber-600" />
                    <span>FDA Boxed Warnings & Black Box Safety</span>
                  </div>
                  <div className="text-xs text-amber-950 leading-relaxed border-l-2 border-amber-500 pl-3 py-1">
                    {drugLabel.warnings}
                  </div>
                  <div className="text-[11px] text-amber-800 bg-amber-100/60 p-2.5 rounded-lg border border-amber-200/60">
                    <span className="font-semibold">Compliance Note for Sales Reps:</span> Under PhRMA and FDA Fair Balance rules, any presentation of clinical efficacy must be accompanied by prominent presentation of risk information and major contraindications.
                  </div>
                </div>

                {/* Detailing Checklist */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>Detailing Script Best Practices</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Always reference the official FDA package insert when discussing dosing intervals.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Never answer unapproved off-label questions; route them to Medical Information (MSLs).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Highlight biomarker requirements (e.g. PD-L1 TPS, HER2 status) before recommending adoption.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
              Loading official FDA Prescribing Monograph...
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ClinicalTrials.gov Protocol Scout */}
      {activeTab === 'clinical_trials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">ClinicalTrials.gov Landmark Studies</h3>
              <p className="text-xs text-slate-500">Pivotal Phase 3 trials evaluated by Value Analysis Committees and P&T formulary boards.</p>
            </div>
            <span className="rounded-full bg-blue-100 text-blue-700 text-xs px-2.5 py-1 font-semibold">
              {trialsData.length} Studies Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trialsData.map((study, idx) => (
              <div key={study.nctId || idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-blue-300 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] font-bold px-2 py-0.5 mb-1.5">
                      {study.nctId}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{study.title}</h4>
                  </div>
                  <span className={`shrink-0 text-[10px] font-extrabold uppercase px-2 py-1 rounded-full ${
                    study.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {study.phase} · {study.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-semibold text-slate-700">Lead Sponsor:</span>
                    <span>{study.sponsor}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-xs">
                    <span className="font-semibold text-slate-900 block mb-1">Primary Endpoint & Outcomes:</span>
                    {study.primaryOutcome}
                  </div>
                  <div className="text-slate-600 text-[11px] leading-relaxed">
                    {study.briefSummary}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium">
                  <a
                    href={`https://clinicaltrials.gov/study/${study.nctId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View Protocol on ClinicalTrials.gov</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(`NCT ID: ${study.nctId}\nTitle: ${study.title}\nPrimary Endpoint: ${study.primaryOutcome}`)}
                    className="hover:text-blue-800"
                  >
                    Copy Citation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PubChem Compound Explorer */}
      {activeTab === 'pubchem_targets' && (
        <div className="space-y-4">
          {pubchemData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase">PubChem Compound Dossier</span>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{pubchemData.name}</h3>
                    <div className="text-xs text-slate-500 font-mono">CID: {pubchemData.cid}</div>
                  </div>
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-3 py-1 font-semibold">
                    Target Receptor Validated
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                    <span className="font-semibold text-slate-500 block mb-1">Molecular Weight:</span>
                    <span className="font-mono font-bold text-slate-900">{pubchemData.molecularWeight}</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                    <span className="font-semibold text-slate-500 block mb-1">Molecular Formula:</span>
                    <span className="font-mono font-bold text-slate-900">{pubchemData.molecularFormula}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Target Receptors & Pathways:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pubchemData.targetReceptors?.map((target: string) => (
                      <span key={target} className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 text-xs text-blue-800 font-medium">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">IUPAC Systematic Name:</h4>
                  <div className="p-3 rounded-lg bg-slate-50 font-mono text-[11px] text-slate-700 break-all border border-slate-200">
                    {pubchemData.iupacName}
                  </div>
                </div>
              </div>

              {/* 2D Structure Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 text-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 text-left">2D Chemical Architecture</h4>
                {pubchemData.structure2dUrl ? (
                  <div className="rounded-lg border border-slate-200 p-2 bg-slate-50 flex items-center justify-center min-h-[220px]">
                    <img
                      src={pubchemData.structure2dUrl}
                      alt={pubchemData.name}
                      className="max-h-52 max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg bg-slate-100 p-8 text-xs text-slate-500">
                    Large Complex Biomacromolecule
                  </div>
                )}
                <p className="text-[11px] text-slate-500 text-left">
                  Referenced from the National Center for Biotechnology Information (NCBI) PubChem Database.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
              Querying PubChem Chemical Database...
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Interactive 3D Molecular / Target Structure Viewer */}
      {activeTab === '3d_structure' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 text-indigo-800 font-mono text-xs font-bold px-2.5 py-0.5">
                  RCSB PDB ID: {selectedPdb.id}
                </span>
                <span className="text-xs text-slate-500">High-Resolution Cryo-EM / X-ray Crystallography</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedPdb.name}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{selectedPdb.description}</p>
            </div>

            {/* Quick PDB selectors */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPdb({
                  id: '5DK3',
                  name: 'Pembrolizumab (Keytruda) Fab in Complex with Human PD-1',
                  description: 'Structure showing antibody binding to PD-1 receptor, inhibiting PD-L1 engagement.'
                })}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  selectedPdb.id === '5DK3' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Keytruda (5DK3)
              </button>
              <button
                onClick={() => setSelectedPdb({
                  id: '6X18',
                  name: 'Semaglutide (Ozempic) bound to human GLP-1 Receptor',
                  description: 'Cryo-EM model showing receptor conformational activation for metabolic signaling.'
                })}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  selectedPdb.id === '6X18' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Ozempic (6X18)
              </button>
              <button
                onClick={() => setSelectedPdb({
                  id: '1N8Z',
                  name: 'Trastuzumab (Herceptin) Fab - HER2 Extracellular Domain Complex',
                  description: 'Targeted oncologic binding inhibiting HER2 dimerization and kinase signaling.'
                })}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  selectedPdb.id === '1N8Z' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Herceptin (1N8Z)
              </button>
            </div>
          </div>

          {/* 3D Viewer Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 rounded-xl border border-slate-300 bg-slate-950 overflow-hidden relative shadow-inner min-h-[440px] flex flex-col items-center justify-center">
              {/* RCSB 3D Viewer Embed */}
              <iframe
                title="RCSB 3D Molecule Viewer"
                src={`https://www.rcsb.org/3d-view/${selectedPdb.id}?embedded=true`}
                className="w-full h-[460px] border-none"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-slate-300 pointer-events-none">
                💡 Drag with mouse to rotate · Scroll to zoom · Right-click drag to pan
              </div>
            </div>

            {/* Clinical Sales Translation Notes */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Clinical Presentation Angle</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Displaying structural 3D models during key opinion leader (KOL) grand rounds or specialist dinners demonstrates elite scientific literacy:
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Point out the sub-nanomolar binding affinity (Kd) achieved by epitope complementarity.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Explain how Fc engineering reduces off-target complement activation (ADCC).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Contrast binding kinetics with first-generation competitor molecules.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 space-y-2 text-xs text-indigo-950">
                <span className="font-semibold block">Downloadable PDB Asset:</span>
                <p className="text-[11px] text-slate-600">
                  Need coordinates for your medical advisory board slides?
                </p>
                <a
                  href={`https://files.rcsb.org/download/${selectedPdb.id}.pdb`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <span>Download {selectedPdb.id}.pdb Coordinates</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
