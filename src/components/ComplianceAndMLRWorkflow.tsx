import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck,
  Lock,
  ArrowRight,
  Download,
  Search,
  RefreshCw,
  Scale,
  Eye,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  ApprovedDocument,
  ComplianceAuditEntry,
  MLRReviewStatus
} from '../types/enterpriseCurriculum';
import { INITIAL_APPROVED_DOCUMENTS } from '../data/sampleCompanyCurriculum';

interface ComplianceAndMLRWorkflowProps {
  onNavigateToView?: (view: any) => void;
}

const MLR_STAGES: { id: MLRReviewStatus; label: string; description: string; color: string }[] = [
  { id: 'draft', label: '1. Draft', description: 'Curriculum authoring & passage extraction', color: 'bg-slate-100 text-slate-800' },
  { id: 'medical', label: '2. Medical Review', description: 'Scientific validity & clinical trial citation audit', color: 'bg-blue-100 text-blue-800' },
  { id: 'legal', label: '3. Legal Review', description: 'Anti-Kickback, Stark, and Sunshine Act verification', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'regulatory', label: '4. Regulatory Affairs', description: 'FDA indication boundary & Fair Balance balance check', color: 'bg-purple-100 text-purple-800' },
  { id: 'approved', label: '5. Approved', description: 'Final sign-off by Commercial MLR Committee', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'published', label: '6. Published', description: 'Active in field rep training portal', color: 'bg-emerald-600 text-white' },
];

export const ComplianceAndMLRWorkflow: React.FC<ComplianceAndMLRWorkflowProps> = ({
  onNavigateToView
}) => {
  const [documents, setDocuments] = useState<ApprovedDocument[]>(INITIAL_APPROVED_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_APPROVED_DOCUMENTS[0].id);
  const [auditLog, setAuditLog] = useState<ComplianceAuditEntry[]>([]);
  const [isLoadingLog, setIsLoadingLog] = useState(false);

  // Pitch compliance testing simulator state
  const [pitchTranscript, setPitchTranscript] = useState(
    'Dr. Evelyn, in the Phase 3 ARROW trial, OncoVance delivered a 42% reduction in progression or death in second-line KRAS G12C mCRC (HR 0.58). Because of our mechanism, we believe it will also work miracles in your non-small cell lung cancer patients. If you prescribe 5 patients this month, our leadership can invite you to our sponsored consulting weekend in Aspen.'
  );
  const [repName, setRepName] = useState('Jordan Taylor (Associate Rep)');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  // Load audit log on mount
  useEffect(() => {
    fetchAuditLog();
  }, []);

  const fetchAuditLog = async () => {
    setIsLoadingLog(true);
    try {
      const response = await fetch('/api/enterprise/compliance/audit-log');
      if (response.ok) {
        const data = await response.json();
        setAuditLog(data.auditLog || []);
      }
    } catch (e) {
      console.warn('Failed to fetch audit log:', e);
    } finally {
      setIsLoadingLog(false);
    }
  };

  const handleRunComplianceAudit = async () => {
    if (!pitchTranscript.trim() || isAuditing) return;
    setIsAuditing(true);
    setAuditResult(null);

    try {
      const response = await fetch('/api/enterprise/compliance/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: pitchTranscript,
          repName,
          simulationType: 'pitch'
        }),
      });

      if (!response.ok) throw new Error('Audit failed');
      const data = await response.json();
      setAuditResult(data.auditResult);
      if (data.auditRecord) {
        setAuditLog((prev) => [data.auditRecord, ...prev]);
      }
    } catch (err: any) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleAdvanceMLRStage = (docId: string, nextStatus: MLRReviewStatus) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const newHistory = [
            {
              version: `v${(parseFloat(doc.version.replace('v', '')) + 0.1).toFixed(1)}`,
              changedAt: new Date().toISOString(),
              changedBy: 'MLR Committee Chair (Fictional Protocol)',
              changeSummary: `Status advanced from ${doc.status.toUpperCase()} to ${nextStatus.toUpperCase()}`,
              previousStatus: doc.status,
              newStatus: nextStatus,
            },
            ...doc.versionHistory,
          ];
          return {
            ...doc,
            status: nextStatus,
            version: newHistory[0].version,
            lastUpdated: new Date().toISOString(),
            versionHistory: newHistory,
          };
        }
        return doc;
      })
    );
  };

  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const exportAuditLogCSV = () => {
    const headers = ['ID', 'Timestamp', 'Rep Name', 'Simulation Type', 'Overall Score', 'Off-Label Detected', 'Off-Label Reason', 'Missing Fair Balance', 'Fair Balance Reason', 'Improper Inducement', 'Inducement Reason', 'Status'];
    const rows = auditLog.map(e => [
      e.id,
      e.timestamp,
      `"${e.repName}"`,
      e.simulationType,
      e.overallScore,
      e.offLabelClaimsDetected ? 'YES' : 'NO',
      `"${e.offLabelReason || ''}"`,
      e.missingFairBalance ? 'YES' : 'NO',
      `"${e.fairBalanceReason || ''}"`,
      e.improperInducementDetected ? 'YES' : 'NO',
      `"${e.improperInducementReason || ''}"`,
      e.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_audit_log_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Zero PHI Privacy Notice Banner (Phase 2 Requirement) */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 shadow-xs flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <strong className="font-bold text-blue-950 block text-sm mb-0.5">
            Privacy Notice: Zero Protected Health Information (PHI) Collected
          </strong>
          BioMed Sales Mastery is exclusively a commercial skills training and regulatory compliance simulator. In strict adherence to HIPAA (45 CFR § 164.514) and FDA promotional oversight, this application collects <strong>zero</strong> Patient Health Information. Do not input patient identifiers, medical record numbers, or confidential hospital patient charts. All case studies use fictionalized demographic profiles.
        </div>
      </div>

      {/* 1. Header & Live Compliance Scorer */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Scale className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Commercial Detailing Compliance Engine & Automated Auditor
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real-time surveillance scoring rep roleplays and detailing pitches for <strong>off-label claims</strong>, <strong>missing fair balance</strong>, and <strong>improper inducements</strong> under federal statutes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-50 text-amber-800 text-[11px] font-semibold px-2.5 py-1 border border-amber-200">
              Active Legal Rules: 21 U.S.C. § 352 · 42 U.S.C. § 1320a-7b · PhRMA/AdvaMed Codes
            </span>
          </div>
        </div>

        {/* Live Audio / Pitch Transcript Auditing Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Pitch / Roleplay Transcript to Audit</label>
              <div className="flex gap-1.5 text-[10px]">
                <button
                  onClick={() => setPitchTranscript('In the Phase 3 ARROW trial, OncoVance demonstrated a 42% reduction in progression or death (HR 0.58; p < 0.001) in second-line KRAS G12C mCRC. Please note that neutropenia occurred in 18% of patients, requiring routine CBC monitoring before each infusion.')}
                  className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 font-semibold"
                >
                  Load Compliant Script
                </button>
                <button
                  onClick={() => setPitchTranscript('Dr. Evans, OncoVance cut disease progression by 42%. We also see strong responses in off-label non-small cell lung cancer, and if you evaluate 5 cases this month, our company will cover your flight and lodging for our advisory retreat in Vail.')}
                  className="text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded border border-rose-200 font-semibold"
                >
                  Load Violation Sample
                </button>
              </div>
            </div>

            <textarea
              value={pitchTranscript}
              onChange={(e) => setPitchTranscript(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              placeholder="Enter or paste rep verbal detailing script..."
            />

            <div className="flex items-center justify-between">
              <input
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                placeholder="Rep Name / ID"
                className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700 w-60"
              />
              <button
                onClick={handleRunComplianceAudit}
                disabled={isAuditing || !pitchTranscript.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-xs font-bold shadow-xs transition disabled:opacity-40"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{isAuditing ? 'Auditing Regulatory Rules...' : 'Audit Transcript'}</span>
              </button>
            </div>
          </div>

          {/* Audit Result Display */}
          <div className="lg:col-span-6 rounded-lg border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-3">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Automated Compliance Scorecard & Violations Breakdown
            </span>

            {auditResult ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="font-semibold text-slate-700">Overall Regulatory Score:</span>
                  <span
                    className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${
                      auditResult.overallScore >= 80
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {auditResult.overallScore}/100 ({auditResult.overallScore >= 80 ? 'PASSED' : 'FLAGGED'})
                  </span>
                </div>

                {/* 1. Off-Label Check */}
                <div className={`p-2.5 rounded border ${auditResult.offLabelClaimsDetected ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1">
                      {auditResult.offLabelClaimsDetected ? <XCircle className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      <span>1. Off-Label Claim Verification (FDA 21 U.S.C. § 352)</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase">
                      {auditResult.offLabelClaimsDetected ? 'VIOLATION DETECTED' : 'CLEAR'}
                    </span>
                  </div>
                  {auditResult.offLabelReason && (
                    <p className="mt-1 text-[11px] text-rose-800 leading-snug">
                      <strong>Reason:</strong> {auditResult.offLabelReason}
                    </p>
                  )}
                </div>

                {/* 2. Missing Fair Balance Check */}
                <div className={`p-2.5 rounded border ${auditResult.missingFairBalance ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1">
                      {auditResult.missingFairBalance ? <AlertTriangle className="h-4 w-4 text-amber-600" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      <span>2. Fair Balance & Risk Disclosure (21 CFR § 202.1)</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase">
                      {auditResult.missingFairBalance ? 'WARNING' : 'CLEAR'}
                    </span>
                  </div>
                  {auditResult.fairBalanceReason && (
                    <p className="mt-1 text-[11px] text-amber-800 leading-snug">
                      <strong>Reason:</strong> {auditResult.fairBalanceReason}
                    </p>
                  )}
                </div>

                {/* 3. Improper Inducement Check */}
                <div className={`p-2.5 rounded border ${auditResult.improperInducementDetected ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1">
                      {auditResult.improperInducementDetected ? <XCircle className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      <span>3. Improper Inducement & AKS Audit (42 U.S.C. § 1320a-7b)</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase">
                      {auditResult.improperInducementDetected ? 'ILLEGAL REMUNERATION' : 'CLEAR'}
                    </span>
                  </div>
                  {auditResult.improperInducementReason && (
                    <p className="mt-1 text-[11px] text-rose-800 leading-snug">
                      <strong>Reason:</strong> {auditResult.improperInducementReason}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <ShieldAlert className="h-8 w-8 mx-auto text-slate-300 mb-1" />
                <p>Run audit on the pitch transcript to see instant regulatory checks and citations.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Medical, Legal, and Regulatory (MLR) Content Review Workflow */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Content Review Workflow (MLR Lifecycle & Audit Log)
            </h3>
            <p className="text-xs text-slate-500">
              Formal life-sciences approval gates: Draft &rarr; Medical &rarr; Legal &rarr; Regulatory &rarr; Approved &rarr; Published.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Active Document:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 font-medium"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.version})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 6-Stage Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {MLR_STAGES.map((st, idx) => {
            const isCurrent = activeDoc.status === st.id;
            const isPast =
              MLR_STAGES.findIndex((s) => s.id === activeDoc.status) >= idx;
            return (
              <div
                key={st.id}
                className={`rounded-lg border p-2.5 text-xs transition ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : isPast
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-[11px]">{st.label}</span>
                  {isPast && !isCurrent && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                  {isCurrent && <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />}
                </div>
                <p className="mt-1 text-[10px] text-slate-500 leading-tight">{st.description}</p>
              </div>
            );
          })}
        </div>

        {/* Advancement Controls */}
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500">Current Status:</span>{' '}
            <strong className="text-slate-900 uppercase font-mono">{activeDoc.status}</strong> · Version:{' '}
            <strong className="text-slate-900 font-mono">{activeDoc.version}</strong>
          </div>

          <div className="flex items-center gap-2">
            {activeDoc.status === 'draft' && (
              <button
                onClick={() => handleAdvanceMLRStage(activeDoc.id, 'medical')}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 font-bold transition shadow-xs"
              >
                Submit to Medical Review &rarr;
              </button>
            )}
            {activeDoc.status === 'medical' && (
              <button
                onClick={() => handleAdvanceMLRStage(activeDoc.id, 'legal')}
                className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 font-bold transition shadow-xs"
              >
                Sign Off & Advance to Legal &rarr;
              </button>
            )}
            {activeDoc.status === 'legal' && (
              <button
                onClick={() => handleAdvanceMLRStage(activeDoc.id, 'regulatory')}
                className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 font-bold transition shadow-xs"
              >
                Legal Approved &rarr; Advance to Regulatory &rarr;
              </button>
            )}
            {activeDoc.status === 'regulatory' && (
              <button
                onClick={() => handleAdvanceMLRStage(activeDoc.id, 'approved')}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 font-bold transition shadow-xs"
              >
                Grant Full MLR Approval &rarr;
              </button>
            )}
            {activeDoc.status === 'approved' && (
              <button
                onClick={() => handleAdvanceMLRStage(activeDoc.id, 'published')}
                className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 font-bold transition shadow-xs"
              >
                Publish to Field Rep Portal &rarr;
              </button>
            )}
            {activeDoc.status === 'published' && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Published & Live for Field Reps
              </span>
            )}
          </div>
        </div>

        {/* Version History Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-800">Document Version History & Attestation Trail</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 font-bold text-slate-700 text-[11px]">
                <tr>
                  <th className="py-2 px-3 text-left">Version</th>
                  <th className="py-2 px-3 text-left">Timestamp</th>
                  <th className="py-2 px-3 text-left">Reviewer</th>
                  <th className="py-2 px-3 text-left">Change Summary</th>
                  <th className="py-2 px-3 text-left">Gate Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {activeDoc.versionHistory.map((vh, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-bold text-blue-700">{vh.version}</td>
                    <td className="py-2 px-3 text-slate-500 font-mono text-[10px]">
                      {new Date(vh.changedAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-slate-800 font-medium">{vh.changedBy}</td>
                    <td className="py-2 px-3 text-slate-600">{vh.changeSummary}</td>
                    <td className="py-2 px-3">
                      <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 uppercase">
                        {vh.previousStatus} &rarr; {vh.newStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Compliance Audit Log */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <span>Enterprise Commercial Surveillance Audit Log ({auditLog.length} Records)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Audit log capturing every evaluated sales interaction, detected off-label triggers, and fair balance compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAuditLogCSV}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export Audit Log (CSV)</span>
            </button>
            <button
              onClick={fetchAuditLog}
              title="Refresh log"
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoadingLog ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 font-bold text-slate-700 text-[11px]">
              <tr>
                <th className="py-2 px-3 text-left">Record ID</th>
                <th className="py-2 px-3 text-left">Timestamp</th>
                <th className="py-2 px-3 text-left">Representative</th>
                <th className="py-2 px-3 text-left">Score</th>
                <th className="py-2 px-3 text-left">Off-Label</th>
                <th className="py-2 px-3 text-left">Fair Balance</th>
                <th className="py-2 px-3 text-left">Inducements</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {auditLog.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono text-[10px] text-slate-500">{log.id}</td>
                  <td className="py-2 px-3 font-mono text-[10px] text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-800">{log.repName}</td>
                  <td className="py-2 px-3 font-mono font-bold">
                    <span className={log.overallScore >= 80 ? 'text-emerald-700' : 'text-rose-700'}>
                      {log.overallScore}%
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {log.offLabelClaimsDetected ? (
                      <span className="text-rose-700 font-bold text-[10px] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        DETECTED
                      </span>
                    ) : (
                      <span className="text-emerald-700 text-[10px]">Passed</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    {log.missingFairBalance ? (
                      <span className="text-amber-700 font-bold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        MISSING
                      </span>
                    ) : (
                      <span className="text-emerald-700 text-[10px]">Passed</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    {log.improperInducementDetected ? (
                      <span className="text-rose-700 font-bold text-[10px] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        FLAGGED
                      </span>
                    ) : (
                      <span className="text-emerald-700 text-[10px]">Passed</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        log.status === 'COMPLIANT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
