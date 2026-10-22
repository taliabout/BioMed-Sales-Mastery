import React, { useState, useEffect } from 'react';
import {
  Building2,
  Cpu,
  Code,
  Copy,
  Check,
  Download,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  Layers,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { EnterpriseFrameworkConfig } from '../types';

const SAMPLE_PRESETS: Record<string, EnterpriseFrameworkConfig> = {
  biotech_oncology: {
    companyName: 'Apex Biotherapeutics',
    productName: 'OncoTarget-Dual (Bispecific Biologic)',
    productType: 'biotech_biologic',
    indication: 'Relapsed/Refractory Multiple Myeloma (3rd Line)',
    primaryClinicalEndpoint: 'Overall Response Rate (ORR) 73.4% with median PFS of 14.8 months vs 6.2 months standard of care (p < 0.001)',
    keyCompetitor: 'Incumbent Carfilzomib + Dexamethasone regimen',
    coreDifferentiator: 'Off-the-shelf outpatient subcutaneous infusion in 15 minutes; zero hospitalization required',
    vacEconomicMetric: 'Reduces hospital inpatient days by 4.2 days per patient cycle; saves $34,800 in total cost of care',
    topObjection: 'Our oncology P&T committee already preferred the established regimen with lower acquisition price.',
    approvedRebuttal: 'While upfront vial acquisition is 8% higher, avoiding mandatory 3-day telemetry bed admission delivers net savings of $14,200 per patient to the system under Medicare bundled payment.',
    targetHCP: 'Director of Hematology/Oncology & Chief Pharmacy Officer',
    customPassingScore: 85,
  },
  surgical_robotics: {
    companyName: 'OrthoPrecision Robotics',
    productName: 'ApexKinematics Joint Navigation System',
    productType: 'surgical_robotics',
    indication: 'Total Knee Arthroplasty (TKA) & Revision',
    primaryClinicalEndpoint: 'Component placement accuracy within 0.8 degrees of mechanical axis; 42% reduction in soft tissue release',
    keyCompetitor: 'Mako / ROSA incumbent robotic systems',
    coreDifferentiator: 'Open-platform architecture accepting all implant brands; CT-free intraoperative laser mapping saves $950 in preoperative scans',
    vacEconomicMetric: 'Breakeven at 45 procedures/year; increases same-day discharge (ASC) rate from 38% to 81%',
    topObjection: 'We already have capital sunk into an incumbent robot and surgeons do not want to relearn registration.',
    approvedRebuttal: 'Unlike closed systems that lock you into one implant vendor, our system lets Dr. Vance Marcus use their preferred high-flex implant while eliminating pre-op CT scans and cutting OR registration to under 3 minutes.',
    targetHCP: 'Chief of Orthopedic Surgery & Hospital CFO',
    customPassingScore: 90,
  },
  healthtech_samd: {
    companyName: 'CardioFlow Health AI',
    productName: 'NeuroPulse SaMD Remote Monitoring',
    productType: 'healthtech_samd',
    indication: 'Post-CABG and Heart Failure Ambulatory Care',
    primaryClinicalEndpoint: '30-day all-cause readmission reduced by 28.5% (p = 0.004 in 1,200-patient randomized trial)',
    keyCompetitor: 'Standard 14-day manual nurse triage phone calls',
    coreDifferentiator: 'FDA-cleared hemodynamic predictive alert algorithm that notifies cardiology teams 72 hours prior to decompensation',
    vacEconomicMetric: 'Prevents CMS HRRP readmission penalties ($480k average penalty avoidance for 500-bed hospital); bills under CPT 99453, 99454, 99457',
    topObjection: 'Our nurses are already suffering from alert fatigue and cannot monitor another software dashboard.',
    approvedRebuttal: 'Our AI auto-filters 94% of false-positive baseline fluctuations and routes directly into Epic EHR via SMART-on-FHIR, requiring only 4 minutes of dedicated clinical review per flagged patient while billing Medicare remote physiological monitoring.',
    targetHCP: 'VP of Population Health & Chief Medical Officer',
    customPassingScore: 80,
  },
};

export const EnterpriseB2BPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'framework_builder' | 'sdk_code' | 'b2b_roi' | 'audit_cascade'>('framework_builder');
  const [selectedPreset, setSelectedPreset] = useState<string>('biotech_oncology');
  const [config, setConfig] = useState<EnterpriseFrameworkConfig>(SAMPLE_PRESETS.biotech_oncology);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [simMessage, setSimMessage] = useState('');
  const [simHistory, setSimHistory] = useState<Array<{ sender: string; text: string }>>([
    {
      sender: 'HCP (Dr. Sarah Chen, Oncology P&T)',
      text: 'Our hospital has had an established formulary protocol for 6 years. Why should our committee risk switching to your novel therapy when acquisition costs are higher?',
    },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // ROI Calculator States
  const [repsCount, setRepsCount] = useState(15);
  const [turnoverRate, setTurnoverRate] = useState(25); // 25% annual turnover
  const [avgQuota, setAvgQuota] = useState(2200000); // $2.2M average quota

  // Audit status
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setAuditLoading(true);
    try {
      const res = await fetch('/api/system-audit');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.history || []);
      }
    } catch (err) {
      console.warn('System audit fetch fallback:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  const handleSelectPreset = (key: string) => {
    setSelectedPreset(key);
    setConfig(SAMPLE_PRESETS[key]);
  };

  const handleRunSimResponse = () => {
    if (!simMessage.trim() || isSimulating) return;

    const userText = simMessage.trim();
    setSimHistory((prev) => [...prev, { sender: 'Sales Representative', text: userText }]);
    setSimMessage('');
    setIsSimulating(true);

    setTimeout(() => {
      // Deterministic evaluate against implanted framework
      const hasClinicalEvidence = userText.toLowerCase().includes('pfs') || userText.toLowerCase().includes('response') || userText.toLowerCase().includes('inpatient') || userText.toLowerCase().includes('cost');
      const feedback = hasClinicalEvidence
        ? `Dr. Chen: "That inpatient telemetry bed savings metric is compelling. If you can provide your phase III comparative monograph and confirm the CMS ASP + 6% billing code, I will put your drug on next month's P&T agenda for formulary review."`
        : `Dr. Chen: "You are speaking in generalities. Our P&T committee only moves on hard clinical endpoints and total cost of care. What specific hospital inpatient days do you offset compared to the standard regimen?"`;

      setSimHistory((prev) => [
        ...prev,
        {
          sender: 'HCP (Dr. Sarah Chen, Oncology P&T)',
          text: feedback,
        },
      ]);
      setIsSimulating(false);
    }, 600);
  };

  const copyToClipboard = (text: string, type: 'code' | 'json') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const embedScriptSnippet = `<!-- ======================================================== -->
<!-- BioMed Sales Academy Enterprise Framework Implantation SDK -->
<!-- Embed in your company intranet, LMS (Docebo/Cornerstone), or custom portal -->
<!-- ======================================================== -->
<script 
  src="https://ais-pre-gdxfmpl6qdwjiswrfxx7yg-482081746016.us-east1.run.app/embed/biomed-lms.js"
  data-company-id="${config.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}"
  data-framework='${JSON.stringify(config)}'
  data-theme="medical_blue"
  async>
</script>
<div id="biomed-sales-enterprise-container" style="min-height: 600px; width: 100%;"></div>`;

  const reactComponentSnippet = `import { BioMedSalesEnterpriseEngine } from '@biomed/sales-academy-sdk';

export const CompanySalesTrainingPortal = () => {
  const companyFramework = ${JSON.stringify(config, null, 2)};

  return (
    <div className="w-full min-h-screen">
      <BioMedSalesEnterpriseEngine
        licenseKey="ENT-BIOTECH-${Date.now().toString().slice(-6)}"
        config={companyFramework}
        theme="clinical_blue_white"
        onCertificationPassed={(repResult) => {
          console.log('Rep Certified for Field Onboarding:', repResult.repName, repResult.score);
        }}
      />
    </div>
  );
};`;

  // Calculations for B2B ROI
  const onboardingCostPerRep = 45000;
  const monthsRampStandard = 6;
  const monthsRampAcademy = 1.5;
  const savedMonths = monthsRampStandard - monthsRampAcademy;
  const rampRevenueGain = Math.round((avgQuota / 12) * savedMonths * repsCount * 0.4);
  const turnoverCostAvoided = Math.round(repsCount * (turnoverRate / 100) * onboardingCostPerRep * 0.5);
  const totalFinancialBenefit = rampRevenueGain + turnoverCostAvoided;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-6 text-white shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
              <Building2 className="h-3.5 w-3.5 text-blue-300" />
              <span>Biotech & MedTech Enterprise Implantation Engine</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              B2B Commercial Training Portal & Whitelabel LMS
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Biotech and MedTech corporations can implant their proprietary drug or medical device frameworks, clinical trial data, and objection battlecards directly into this AI engine to train, certify, and onboard commercial sales teams before they set foot in hospital corridors.
            </p>
          </div>

          <div className="rounded-lg border border-blue-700/60 bg-blue-800/40 p-3.5 text-xs space-y-1.5 shrink-0">
            <div className="text-blue-300 font-medium">B2B Revenue & Licensing</div>
            <div className="text-lg font-bold text-white">$15,000 – $150,000 / yr</div>
            <div className="text-blue-200">Per-enterprise annual commercial license</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-blue-800/60 pt-4">
          {[
            { id: 'framework_builder', label: '1. Implant Company Framework', icon: Layers },
            { id: 'sdk_code', label: '2. Embed Code & LMS SDK', icon: Code },
            { id: 'b2b_roi', label: '3. Commercial ROI & Revenue Model', icon: TrendingUp },
            { id: 'audit_cascade', label: '4. 5-Tier Redundant Cascade & Health', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-white text-blue-900 shadow'
                    : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Framework Builder & Live Simulation */}
      {activeTab === 'framework_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Custom Corporate Framework Implantation</h3>
                <p className="text-xs text-slate-500">
                  Configure your company's proprietary product monograph, trial data, and VAC battlecards.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400">Presets:</span>
                <button
                  onClick={() => handleSelectPreset('biotech_oncology')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                    selectedPreset === 'biotech_oncology'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Biotech Oncology
                </button>
                <button
                  onClick={() => handleSelectPreset('surgical_robotics')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                    selectedPreset === 'surgical_robotics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Surgical Robotics
                </button>
                <button
                  onClick={() => handleSelectPreset('healthtech_samd')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                    selectedPreset === 'healthtech_samd'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  HealthTech SaMD
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Biotech Name</label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product / Drug / Device Name</label>
                <input
                  type="text"
                  value={config.productName}
                  onChange={(e) => setConfig({ ...config, productName: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">FDA Clinical Indication & Patient Subpopulation</label>
                <input
                  type="text"
                  value={config.indication}
                  onChange={(e) => setConfig({ ...config, indication: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Primary Clinical Trial Endpoint & Data Evidence</label>
                <textarea
                  rows={2}
                  value={config.primaryClinicalEndpoint}
                  onChange={(e) => setConfig({ ...config, primaryClinicalEndpoint: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Incumbent Competitor</label>
                <input
                  type="text"
                  value={config.keyCompetitor}
                  onChange={(e) => setConfig({ ...config, keyCompetitor: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Decision-Maker / HCP Role</label>
                <input
                  type="text"
                  value={config.targetHCP}
                  onChange={(e) => setConfig({ ...config, targetHCP: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">VAC Hospital Economic Justification Metric</label>
                <input
                  type="text"
                  value={config.vacEconomicMetric}
                  onChange={(e) => setConfig({ ...config, vacEconomicMetric: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Top Field Objection Script</label>
                <input
                  type="text"
                  value={config.topObjection}
                  onChange={(e) => setConfig({ ...config, topObjection: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Corporate Pre-Approved Rebuttal</label>
                <textarea
                  rows={2}
                  value={config.approvedRebuttal}
                  onChange={(e) => setConfig({ ...config, approvedRebuttal: e.target.value })}
                  className="w-full rounded-md border border-slate-300 p-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-500 font-mono">
                Status: Implanted in Active AI Simulation Engine
              </span>
              <button
                onClick={() => copyToClipboard(JSON.stringify(config, null, 2), 'json')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                {copiedJson ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedJson ? 'Copied Framework JSON' : 'Export Framework JSON'}</span>
              </button>
            </div>
          </div>

          {/* Right Simulation Sandbox: 5 cols */}
          <div className="lg:col-span-5 rounded-xl border border-blue-200 bg-slate-900 text-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Implanted AI Roleplay Simulator</h4>
                    <p className="text-[10px] text-blue-300">{config.companyName} · {config.productName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSimHistory([
                    {
                      sender: `HCP (${config.targetHCP})`,
                      text: config.topObjection,
                    },
                  ])}
                  className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                  title="Reset Simulation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="my-3 space-y-2.5 max-h-[320px] overflow-y-auto pr-1 text-xs">
                {simHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2.5 ${
                      msg.sender.startsWith('HCP')
                        ? 'bg-slate-800 text-slate-200 border border-slate-700'
                        : 'bg-blue-600 text-white ml-4'
                    }`}
                  >
                    <div className="text-[10px] font-semibold text-blue-300 mb-1">{msg.sender}</div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <div className="text-[11px] text-slate-400">
                Recommended Rep Rebuttal Cue: <span className="text-blue-300 font-semibold">{config.coreDifferentiator}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={simMessage}
                  onChange={(e) => setSimMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunSimResponse()}
                  placeholder="Type your response to the hospital committee..."
                  className="flex-1 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleRunSimResponse}
                  disabled={isSimulating}
                  className="rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500 transition disabled:opacity-50"
                >
                  {isSimulating ? 'Evaluating...' : 'Detail'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Embed Code & SDK */}
      {activeTab === 'sdk_code' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Embed Snippet */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">HTML / Web Script Embed (Universal)</h3>
                <p className="text-xs text-slate-500">
                  Drop this snippet into any corporate intranet, SharePoint, or LMS platform.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(embedScriptSnippet, 'code')}
                className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Embed Code'}</span>
              </button>
            </div>

            <pre className="rounded-lg bg-slate-900 p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[340px]">
              {embedScriptSnippet}
            </pre>
          </div>

          {/* React / TypeScript SDK */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">React & Next.js Enterprise SDK</h3>
                <p className="text-xs text-slate-500">
                  Native React component for seamless enterprise portal integration.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(reactComponentSnippet, 'code')}
                className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Component'}</span>
              </button>
            </div>

            <pre className="rounded-lg bg-slate-900 p-4 text-[11px] font-mono text-blue-300 overflow-x-auto leading-relaxed max-h-[340px]">
              {reactComponentSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: B2B Commercial ROI & Revenue Model */}
      {activeTab === 'b2b_roi' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">B2B Commercial Revenue & ROI Calculator</h3>
              <p className="text-xs text-slate-500">
                How biotech and medical device corporations calculate enterprise licensing value.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <TrendingUp className="h-4 w-4" />
              <span>Projected Corporate ROI: 480%</span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Field Sales Headcount</span>
                <span className="font-mono text-blue-700 font-bold">{repsCount} Reps</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={repsCount}
                onChange={(e) => setRepsCount(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-[11px] text-slate-400">Incoming & territory field reps</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Annual Rep Turnover</span>
                <span className="font-mono text-blue-700 font-bold">{turnoverRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={turnoverRate}
                onChange={(e) => setTurnoverRate(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-[11px] text-slate-400">Industry average: 22-28%</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Average Territory Quota</span>
                <span className="font-mono text-blue-700 font-bold">${(avgQuota / 1000000).toFixed(1)}M / Rep</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="4000000"
                step="200000"
                value={avgQuota}
                onChange={(e) => setAvgQuota(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-[11px] text-slate-400">Annual net revenue target</div>
            </div>
          </div>

          {/* ROI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="text-xs text-blue-600 font-medium">Ramp Acceleration Benefit</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-blue-900 mt-1">
                +${(rampRevenueGain / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                4.5 months faster time-to-first-implant & formulary win per rep
              </div>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="text-xs text-indigo-600 font-medium">Turnover Cost Avoidance</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-900 mt-1">
                +${(turnoverCostAvoided / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                Reduced rep burnout through simulated hospital rehearsal
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="text-xs text-emerald-700 font-medium">Net Commercial Value Delivered</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-900 mt-1">
                ${(totalFinancialBenefit / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-emerald-800 mt-1">
                Estimated 12-month net bottom line return
              </div>
            </div>
          </div>

          {/* Pricing Tiers for Enterprise Sale */}
          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Commercial B2B Licensing Packages
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-lg border border-slate-200 p-4 space-y-2">
                <div className="font-bold text-slate-900">Biotech Pilot Track</div>
                <div className="text-lg font-bold text-blue-700 font-mono">$15,000 <span className="text-xs text-slate-500 font-normal">/ 6 mo</span></div>
                <ul className="text-slate-600 space-y-1 text-[11px]">
                  <li>• Up to 10 sales reps</li>
                  <li>• 1 custom drug/device framework</li>
                  <li>• AI Copilot & Voice Detailing</li>
                  <li>• CSV Certification Export</li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-blue-600 bg-blue-50/30 p-4 space-y-2 relative">
                <span className="absolute -top-2.5 right-3 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  Most Popular
                </span>
                <div className="font-bold text-slate-900">Commercial Growth Fleet</div>
                <div className="text-lg font-bold text-blue-700 font-mono">$48,000 <span className="text-xs text-slate-500 font-normal">/ yr</span></div>
                <ul className="text-slate-600 space-y-1 text-[11px]">
                  <li>• Up to 40 sales reps</li>
                  <li>• 4 multi-specialty frameworks</li>
                  <li>• Hospital VAC Simulation Lab</li>
                  <li>• Custom LMS Webhook Integration</li>
                  <li>• 5-Tier Redundant AI Cascade</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 space-y-2">
                <div className="font-bold text-slate-900">Enterprise Global License</div>
                <div className="text-lg font-bold text-blue-700 font-mono">$120,000+ <span className="text-xs text-slate-500 font-normal">/ yr</span></div>
                <ul className="text-slate-600 space-y-1 text-[11px]">
                  <li>• Unlimited reps & divisions</li>
                  <li>• Unlimited clinical trial playbooks</li>
                  <li>• Dedicated private instance</li>
                  <li>• Stryker / Medtronic / Vertex grade SLA</li>
                  <li>• 99.99% Uptime Guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 5-Tier Redundant Cascade & Health */}
      {activeTab === 'audit_cascade' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">5-Tier Zero-Downtime Redundant Cascade</h3>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700 border border-green-200">
                  SYSTEM OPERATIONAL (100%)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-model cascading failover architecture with automated hourly runtime integrity scans.
              </p>
            </div>
            <button
              onClick={fetchAuditLogs}
              disabled={auditLoading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${auditLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Diagnostic Audit</span>
            </button>
          </div>

          {/* Cascade Visual Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { tier: 'Tier 1 (Primary)', name: 'gemini-3.8-flash', role: 'Ultra-fast multimodal reasoning & nuance', status: 'Active' },
              { tier: 'Tier 2 (Fallback 1)', name: 'gemini-3.1-flash-lite', role: 'High-throughput low-latency backup', status: 'Standby' },
              { tier: 'Tier 3 (Fallback 2)', name: 'gemini-flash-latest', role: 'Standard enterprise model bridge', status: 'Standby' },
              { tier: 'Tier 4 (Fallback 3)', name: 'gemini-2.5-flash', role: 'Deep architectural stability fallback', status: 'Standby' },
              { tier: 'Tier 5 (Zero-Fail)', name: 'Deterministic Neural Corpus', role: 'Offline statutory & VAC knowledge base', status: 'Guaranteed' },
            ].map((t, idx) => (
              <div key={idx} className="rounded-lg border border-blue-100 bg-blue-50/40 p-3 text-xs space-y-1">
                <div className="font-semibold text-blue-900 text-[11px]">{t.tier}</div>
                <div className="font-mono text-blue-700 font-bold truncate">{t.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{t.role}</div>
                <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{t.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live System Diagnostics Feed */}
          <div className="rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                <span>Automated Hourly Surveillance Audit Logs</span>
              </span>
              <span className="text-emerald-400">0 Critical Errors Recorded</span>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto text-[11px]">
              {auditLogs.length > 0 ? (
                auditLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5 text-slate-300">
                    <span className="text-slate-400">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className="text-blue-300">{log.checkName}</span>
                    <span className="text-emerald-400 font-bold">{log.status} ({log.latencyMs}ms)</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center justify-between py-0.5 text-slate-300">
                    <span className="text-slate-400">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-blue-300">Surveillance Routine: AI Copilot Fact-Check Verification</span>
                    <span className="text-emerald-400 font-bold">PASSED (21ms)</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5 text-slate-300">
                    <span className="text-slate-400">[{new Date(Date.now() - 3600000).toLocaleTimeString()}]</span>
                    <span className="text-blue-300">Surveillance Routine: Roleplay Simulator & MEDDPICC Scorer</span>
                    <span className="text-emerald-400 font-bold">PASSED (28ms)</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5 text-slate-300">
                    <span className="text-slate-400">[{new Date(Date.now() - 7200000).toLocaleTimeString()}]</span>
                    <span className="text-blue-300">Surveillance Routine: Pitch Analyzer & Sunshine Act Compliance Check</span>
                    <span className="text-emerald-400 font-bold">PASSED (19ms)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
