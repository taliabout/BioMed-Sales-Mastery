import React, { useState, useEffect } from 'react';
import { HealthcareTrack, SalesIntelligenceReport, HospitalSystemPenetration, RegionalCompetitorActivity } from '../types';
import {
  Crosshair,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Building2,
  Users,
  Compass,
  RefreshCw,
  Download,
  Copy,
  Check,
  ChevronRight,
  AlertTriangle,
  Award,
  Sparkles,
  Search,
  Sliders,
  Flame,
  ArrowRight
} from 'lucide-react';

interface SalesIntelligenceInsightsProps {
  currentTrack: HealthcareTrack;
  onNavigateToView?: (view: any) => void;
}

const PRESET_METROS = [
  { name: 'Boston Life Sciences & MedTech Corridor', lat: 42.3601, lng: -71.0589, state: 'MA' },
  { name: 'Texas Medical Center & Houston Metro', lat: 29.7099, lng: -95.3986, state: 'TX' },
  { name: 'Atlanta Southeast Healthcare IDN Hub', lat: 33.7490, lng: -84.3880, state: 'GA' },
  { name: 'Greater Chicago & Midwest Academic Belt', lat: 41.8781, lng: -87.6298, state: 'IL' },
  { name: 'San Francisco Bay Area & Silicon Valley', lat: 37.7749, lng: -122.4194, state: 'CA' },
  { name: 'NYC & NJ Bio-Pharma Alley', lat: 40.7128, lng: -74.0060, state: 'NY/NJ' },
  { name: 'Research Triangle Park (RTP)', lat: 35.7796, lng: -78.6382, state: 'NC' }
];

export const SalesIntelligenceInsights: React.FC<SalesIntelligenceInsightsProps> = ({
  currentTrack,
  onNavigateToView
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(25);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<'prompt' | 'granted' | 'denied' | 'locating' | 'manual'>('locating');
  const [selectedMetro, setSelectedMetro] = useState<string>(PRESET_METROS[0].name);
  const [loading, setLoading] = useState<boolean>(true);
  const [report, setReport] = useState<SalesIntelligenceReport | null>(null);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'hospitals' | 'competitors' | 'playbook'>('hospitals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<HospitalSystemPenetration | null>(null);

  // Auto-detect browser geolocation on mount
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      fetchIntelligence(PRESET_METROS[0].lat, PRESET_METROS[0].lng, PRESET_METROS[0].name, false);
      return;
    }

    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoCoords({ lat: latitude, lng: longitude });
        setGeoStatus('granted');
        fetchIntelligence(latitude, longitude, undefined, true);
      },
      (error) => {
        console.warn('Geolocation denied or timed out:', error.message);
        setGeoStatus('denied');
        // Fallback to Boston default
        fetchIntelligence(PRESET_METROS[0].lat, PRESET_METROS[0].lng, PRESET_METROS[0].name, false);
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
    );
  };

  const handleSelectMetro = (metroName: string) => {
    setSelectedMetro(metroName);
    setGeoStatus('manual');
    const metro = PRESET_METROS.find((m) => m.name === metroName);
    if (metro) {
      setGeoCoords({ lat: metro.lat, lng: metro.lng });
      fetchIntelligence(metro.lat, metro.lng, metro.name, false);
    }
  };

  const fetchIntelligence = async (lat: number, lng: number, regionName?: string, isGps = false) => {
    setLoading(true);
    try {
      const response = await fetch('/api/sales-intelligence/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat,
          lng,
          regionName,
          track: currentTrack,
          radiusMiles: selectedRadius
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: SalesIntelligenceReport = await response.json();
      setReport(data);
      if (data.hospitalPenetration && data.hospitalPenetration.length > 0) {
        setSelectedHospital(data.hospitalPenetration[0]);
      }
    } catch (err: any) {
      console.error('Failed to load sales intelligence:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTerritoryBrief = () => {
    if (!report) return;
    const briefText = `========================================================
EXECUTIVE TERRITORY SALES INTELLIGENCE BRIEF
Region: ${report.regionName}
Coordinates: ${report.coordinates.lat.toFixed(4)}, ${report.coordinates.lng.toFixed(4)} (GPS Derived: ${report.isGpsDerived ? 'YES' : 'NO - Metro Selected'})
Track: ${currentTrack} | Radius: ${selectedRadius} miles
Generated: ${new Date(report.lastUpdated).toLocaleDateString()}
========================================================

1. REGIONAL EXECUTIVE SUMMARY
${report.overallMarketSummary}
- ASC Outpatient Migration: ${report.ascPenetrationTrend}
- Average VAC Approval Cycle: ${report.avgVacApprovalCycleMonths} months
- Dominant GPOs: ${report.regionalGpoDominance.map((g) => `${g.gpo} (${g.percentage}%)`).join(', ')}

2. LOCAL HOSPITAL SYSTEM PENETRATION
${report.hospitalPenetration
  .map(
    (h) => `
* ${h.hospitalName} (${h.systemAffiliation}) - ${h.city}, ${h.state} [${h.distanceMiles} mi]
  - Beds: ${h.beds} | Annual OR Cases: ${h.annualOpProcedures.toLocaleString()}
  - Current Account Penetration: ${h.penetrationRate}% | Opportunity Score: ${h.opportunityScore}/100
  - GPO: ${h.primaryGPO} | VAC Status: ${h.vacStatus} | Rep Access: ${h.repAccessPolicy}
  - Market Share: ${h.dominantVendors.map((v) => `${v.vendor} (${v.share}% - ${v.status})`).join(' | ')}
  - Key Influencers: ${h.keySurgeonInfluencers.join('; ')}`
  )
  .join('\n')}

3. COMPETITOR MOVEMENTS & DISPLACEMENT STRATEGY
${report.competitorActivity
  .map(
    (c) => `
* ${c.competitorName} (Market Share: ${c.marketShare}%) - Threat Level: ${c.activityLevel}
  - Recent Moves: ${c.recentMovements.join('; ')}
  - Key Vulnerabilities: ${c.vulnerabilities.join('; ')}
  - Counter-Strategy: ${c.displacementTactics}`
  )
  .join('\n')}

4. IMMEDIATE TERRITORY ACTION PLAN
${report.territoryActionPlan
  .map(
    (a) => `
[${a.priority}] Target: ${a.targetAccount}
- Champion Call Point: ${a.championCallPoint}
- Action: ${a.action}
- Rationale: ${a.rationale}`
  )
  .join('\n')}

5. SHELBY HAAS FIELD TACTIC
${report.shelbyHaasFieldTactic}
========================================================`;

    navigator.clipboard.writeText(briefText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  const filteredHospitals = report?.hospitalPenetration.filter((h) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.hospitalName.toLowerCase().includes(q) ||
      h.systemAffiliation.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q)
    );
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Crosshair className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                Live Geolocation Context Radar
              </span>
              {geoStatus === 'granted' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  GPS Live Locked
                </span>
              )}
              {geoStatus === 'manual' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">
                  Metro Territory Selected
                </span>
              )}
              {geoStatus === 'denied' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200">
                  GPS Permission Inactive
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sales Intelligence Insights & Market Penetration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Real-time regional intelligence using device GPS coordinates. Evaluates hospital system market penetration, competitor displacement campaigns, dominant GPOs, and Value Analysis Committee (VAC) cycles in your immediate vicinity.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={detectLocation}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-blue-400 shadow-2xs"
              title="Detect device GPS coordinates"
            >
              <Compass className={`h-3.5 w-3.5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
              <span>Detect My GPS</span>
            </button>

            <button
              onClick={handleCopyTerritoryBrief}
              disabled={!report}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {copiedBrief ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Dossier Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Territory Brief</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Territory & Radius Selector Controls */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Active Metro Hub / Territory
            </label>
            <select
              value={selectedMetro}
              onChange={(e) => handleSelectMetro(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            >
              {PRESET_METROS.map((metro) => (
                <option key={metro.name} value={metro.name}>
                  {metro.name} ({metro.state})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Vicinity Radius
            </label>
            <div className="flex items-center gap-1">
              {[15, 25, 50, 100].map((radius) => (
                <button
                  key={radius}
                  onClick={() => {
                    setSelectedRadius(radius);
                    if (geoCoords) {
                      fetchIntelligence(geoCoords.lat, geoCoords.lng, selectedMetro, geoStatus === 'granted');
                    }
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md border transition ${
                    selectedRadius === radius
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {radius} mi
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Device Coordinates
            </label>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-mono text-slate-700">
              <span className="truncate">
                {geoCoords
                  ? `${geoCoords.lat.toFixed(4)}°, ${geoCoords.lng.toFixed(4)}°`
                  : '42.3601°, -71.0589°'}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase">
                {geoStatus === 'granted' ? 'Live' : 'Simulated'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Specialization Sector
            </label>
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-1.5 text-xs font-semibold text-blue-900 truncate">
              {currentTrack.replace(/_/g, ' ').toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-3">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            Synthesizing Vicinity Hospital Penetration & Competitor Radar...
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Cross-referencing regional health systems, GPO formulary ties, VAC buying cycles, and competitor accounts within {selectedRadius} miles.
          </p>
        </div>
      )}

      {/* Main Content Area */}
      {!loading && report && (
        <>
          {/* Executive KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Health Systems in Radius</span>
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                {report.totalHospitalSystems} IDNs
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Academic & Community Flagships
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">ASC Outpatient Shift</span>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-emerald-700">
                {report.ascPenetrationTrend.split(' ')[0]}
              </div>
              <div className="mt-1 text-[11px] text-slate-500 truncate" title={report.ascPenetrationTrend}>
                {report.ascPenetrationTrend}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Avg VAC Approval Cycle</span>
                <Compass className="h-4 w-4 text-amber-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                {report.avgVacApprovalCycleMonths} Mo.
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Dossier submission to clinical PO
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Primary Regional GPO</span>
                <Award className="h-4 w-4 text-purple-600" />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-purple-800">
                {report.regionalGpoDominance[0]?.gpo || 'Vizient'}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                {report.regionalGpoDominance[0]?.percentage || 52}% contract control in territory
              </div>
            </div>
          </div>

          {/* Regional Summary Bar */}
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 font-semibold">Territory Market Brief: </strong>
              {report.overallMarketSummary}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('hospitals')}
                className={`py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'hospitals'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Hospital Penetration & Accounts ({report.hospitalPenetration.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('competitors')}
                className={`py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'competitors'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Competitor Activity & Displacement ({report.competitorActivity.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('playbook')}
                className={`py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'playbook'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Flame className="h-4 w-4" />
                <span>Territory Attack Playbook & Shelby Haas Tactic</span>
              </button>
            </nav>
          </div>

          {/* TAB 1: Hospital System Penetration */}
          {activeTab === 'hospitals' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Hospital List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter accounts by hospital or system..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Showing {filteredHospitals.length} systems in {selectedRadius} mi
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredHospitals.map((hosp) => (
                    <div
                      key={hosp.id}
                      onClick={() => setSelectedHospital(hosp)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        selectedHospital?.id === hosp.id
                          ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{hosp.hospitalName}</h4>
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                              {hosp.distanceMiles} mi away
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-medium text-blue-700">{hosp.systemAffiliation}</span>
                            <span>•</span>
                            <span>{hosp.city}, {hosp.state}</span>
                            <span>•</span>
                            <span>{hosp.beds} beds</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              hosp.vacStatus === 'Open for Review'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : hosp.vacStatus === 'RFP Scheduled'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            VAC: {hosp.vacStatus}
                          </span>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Opportunity</span>
                            <span className="text-sm font-bold font-mono text-blue-700">{hosp.opportunityScore}/100</span>
                          </div>
                        </div>
                      </div>

                      {/* Penetration Share Bar */}
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] font-medium text-slate-600">
                            Our Target Platform Share: <strong className="text-blue-700">{hosp.penetrationRate}%</strong>
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Annual OR Cases: {hosp.annualOpProcedures.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
                          {hosp.dominantVendors.map((vendor, vIdx) => {
                            const colors = ['bg-slate-400', 'bg-blue-400', 'bg-amber-400', 'bg-emerald-500'];
                            return (
                              <div
                                key={vendor.vendor}
                                style={{ width: `${vendor.share}%` }}
                                className={`h-full ${colors[vIdx % colors.length]}`}
                                title={`${vendor.vendor}: ${vendor.share}%`}
                              />
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                          {hosp.dominantVendors.map((v) => (
                            <span key={v.vendor} className="flex items-center gap-1">
                              <span className="font-medium text-slate-700">{v.vendor}</span>
                              <span className="font-mono">({v.share}%)</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Account Deep-Dive Card */}
              <div className="lg:col-span-1">
                {selectedHospital ? (
                  <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Account Dossier
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">
                        {selectedHospital.hospitalName}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {selectedHospital.systemAffiliation}
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                          <span className="text-slate-400 block font-medium">Primary GPO</span>
                          <strong className="text-slate-800 text-xs font-semibold">{selectedHospital.primaryGPO}</strong>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                          <span className="text-slate-400 block font-medium">Rep Credentialing</span>
                          <strong className="text-slate-800 text-xs font-semibold">{selectedHospital.repAccessPolicy}</strong>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">
                          Key Surgeon & Clinical Champions:
                        </span>
                        <ul className="space-y-1">
                          {selectedHospital.keySurgeonInfluencers.map((doc, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-600">
                              <Users className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <span className="font-semibold text-slate-700 block mb-1">
                          Vendor Account Status:
                        </span>
                        <div className="space-y-1.5">
                          {selectedHospital.dominantVendors.map((v) => (
                            <div key={v.vendor} className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-700">{v.vendor}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  v.status === 'incumbent'
                                    ? 'bg-slate-100 text-slate-700'
                                    : v.status === 'vulnerable'
                                    ? 'bg-amber-100 text-amber-800'
                                    : v.status === 'dominant'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {v.status.toUpperCase()} ({v.share}%)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3 space-y-2">
                        {onNavigateToView && (
                          <button
                            onClick={() => onNavigateToView('network_accelerator')}
                            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                          >
                            <span>Scout Recruiters & Key Contacts</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onNavigateToView && (
                          <button
                            onClick={() => onNavigateToView('battlecards')}
                            className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <span>View Competitor Battlecards</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                    Select a hospital system to view deep clinical commercial telemetry.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Competitor Activity Radar */}
          {activeTab === 'competitors' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed">
                Regional competitor movements, contract defenses, supply-chain vulnerabilities, and clinical displacement plays inside this territory.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.competitorActivity.map((comp) => (
                  <div key={comp.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{comp.competitorName}</h4>
                        <span className="text-xs font-mono font-bold text-blue-700">
                          {comp.marketShare}% Share
                        </span>
                      </div>

                      <div className="mt-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            comp.activityLevel === 'Aggressive Displacement'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : comp.activityLevel === 'Vulnerable / Rep Turnover'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {comp.activityLevel}
                        </span>
                      </div>

                      {/* Recent Moves */}
                      <div className="mt-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Recent Movements:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {comp.recentMovements.map((move, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold shrink-0">•</span>
                              <span>{move}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Vulnerabilities */}
                      <div className="mt-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-amber-600" />
                          Exploitable Vulnerabilities:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {comp.vulnerabilities.map((vuln, vIdx) => (
                            <li key={vIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold shrink-0">•</span>
                              <span>{vuln}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Displacement Tactic */}
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-lg">
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                        Displacement Playbook:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{comp.displacementTactics}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Territory Attack Playbook */}
          {activeTab === 'playbook' && (
            <div className="space-y-6">
              {/* Shelby Haas Field Philosophy Banner */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <Flame className="h-4 w-4 text-amber-600" />
                  <span>Shelby Haas Regional Consultative Detachment Play</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {report.shelbyHaasFieldTactic}
                </p>
              </div>

              {/* Action Plan Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Prioritized Field Execution Roadmap (Next 90 Days)
                  </h3>
                  <span className="text-xs text-slate-500">
                    Based on local VAC cycles & competitor openings
                  </span>
                </div>

                <div className="space-y-3">
                  {report.territoryActionPlan.map((plan, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              plan.priority.includes('Week 1')
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : plan.priority.includes('Week 2-4')
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {plan.priority}
                          </span>
                          <strong className="text-xs font-bold text-slate-900">
                            Target: {plan.targetAccount}
                          </strong>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">
                          {plan.action}
                        </p>
                        <div className="text-[11px] text-slate-500">
                          <strong className="text-slate-700">Champion Call Point:</strong> {plan.championCallPoint}
                        </div>
                        <div className="text-[11px] text-slate-500 italic">
                          "{plan.rationale}"
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {onNavigateToView && (
                          <button
                            onClick={() => onNavigateToView('territory_plan')}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Add to 30-60-90 Plan
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
