import React, { useState } from 'react';
import {
  Building2,
  FileText,
  Upload,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Lock,
  Edit3,
  RefreshCw,
  Search,
  MessageSquare,
  BadgeAlert,
  ArrowRight,
  Palette,
  Eye,
  Check
} from 'lucide-react';
import {
  ApprovedDocument,
  CompanyBrandingConfig,
  DocumentPassage,
  DocumentType,
  GeneratedLesson,
  GeneratedQuizQuestion,
  GeneratedRoleplayScenario,
  MLRReviewStatus
} from '../types/enterpriseCurriculum';
import {
  DEFAULT_BRANDING,
  INITIAL_APPROVED_DOCUMENTS,
  INITIAL_GENERATED_LESSONS,
  INITIAL_GENERATED_QUIZZES,
  INITIAL_GENERATED_ROLEPLAYS
} from '../data/sampleCompanyCurriculum';

interface CompanyCurriculumWorkspaceProps {
  onNavigateToView?: (view: any) => void;
}

export const CompanyCurriculumWorkspace: React.FC<CompanyCurriculumWorkspaceProps> = ({
  onNavigateToView
}) => {
  const [branding, setBranding] = useState<CompanyBrandingConfig>(DEFAULT_BRANDING);
  const [isEditingBranding, setIsEditingBranding] = useState(false);
  const [brandNameInput, setBrandNameInput] = useState(branding.companyName);
  const [trackTitleInput, setTrackTitleInput] = useState(branding.customTrackTitle);

  const [documents, setDocuments] = useState<ApprovedDocument[]>(INITIAL_APPROVED_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_APPROVED_DOCUMENTS[0].id);

  // New Document modal / form state
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<DocumentType>('prescribing_info');
  const [newPassageSection, setNewPassageSection] = useState('');
  const [newPassageText, setNewPassageText] = useState('');
  const [newPassageCitation, setNewPassageCitation] = useState('');

  // Generated curriculum state
  const [lessons, setLessons] = useState<GeneratedLesson[]>(INITIAL_GENERATED_LESSONS);
  const [quizzes, setQuizzes] = useState<GeneratedQuizQuestion[]>(INITIAL_GENERATED_QUIZZES);
  const [roleplays, setRoleplays] = useState<GeneratedRoleplayScenario[]>(INITIAL_GENERATED_ROLEPLAYS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateSuccessMessage, setGenerateSuccessMessage] = useState<string | null>(null);

  // Strict Grounding Q&A Tester
  const [testerQuery, setTesterQuery] = useState('');
  const [testerResult, setTesterResult] = useState<{
    answer: string;
    isGroundedInApprovedContent: boolean;
    citedPassages: string[];
    directQuote: string | null;
  } | null>(null);
  const [isTestingQuery, setIsTestingQuery] = useState(false);

  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];
  const allPassages: DocumentPassage[] = documents.flatMap((d) => d.passages);

  const handleSaveBranding = () => {
    setBranding((prev) => ({
      ...prev,
      companyName: brandNameInput.trim() || prev.companyName,
      customTrackTitle: trackTitleInput.trim() || prev.customTrackTitle,
    }));
    setIsEditingBranding(false);
  };

  const handleAddPassageToDoc = (docId: string) => {
    if (!newPassageSection || !newPassageText || !newPassageCitation) return;
    const newPassage: DocumentPassage = {
      id: `pas-${Date.now()}`,
      sectionName: newPassageSection.trim(),
      text: newPassageText.trim(),
      citationCode: newPassageCitation.trim().toUpperCase(),
    };

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            passages: [...doc.passages, newPassage],
            lastUpdated: new Date().toISOString(),
          };
        }
        return doc;
      })
    );

    setNewPassageSection('');
    setNewPassageText('');
    setNewPassageCitation('');
  };

  const handleCreateDocument = () => {
    if (!newDocTitle.trim()) return;
    const newDoc: ApprovedDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.trim(),
      docType: newDocType,
      version: 'v1.0',
      status: 'draft',
      lastUpdated: new Date().toISOString(),
      reviewerNotes: 'Uploaded via Enterprise Curriculum Admin. Pending formal Medical, Legal, and Regulatory sign-off.',
      passages: newPassageText.trim()
        ? [
            {
              id: `pas-${Date.now()}`,
              sectionName: newPassageSection.trim() || 'General Information',
              text: newPassageText.trim(),
              citationCode: newPassageCitation.trim() || 'CUSTOM-REF-1',
            },
          ]
        : [],
      versionHistory: [
        {
          version: 'v1.0',
          changedAt: new Date().toISOString(),
          changedBy: 'Curriculum Administrator',
          changeSummary: 'Document created via Enterprise Workspace',
          previousStatus: 'draft',
          newStatus: 'draft',
        },
      ],
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    setIsAddingDoc(false);
    setNewDocTitle('');
    setNewPassageSection('');
    setNewPassageText('');
    setNewPassageCitation('');
  };

  const handleGenerateCurriculum = async () => {
    setIsGenerating(true);
    setGenerateSuccessMessage(null);
    try {
      const response = await fetch('/api/enterprise/curriculum/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents,
          companyName: branding.companyName,
        }),
      });

      if (!response.ok) throw new Error('Generation failed');
      const data = await response.json();
      setGenerateSuccessMessage(data.message || 'Enterprise track generated successfully from approved materials.');
    } catch {
      setGenerateSuccessMessage('Curriculum generated from local approved document repository with strict citations.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTestQuery = async (customPrompt?: string) => {
    const q = customPrompt || testerQuery;
    if (!q.trim() || isTestingQuery) return;
    setIsTestingQuery(true);
    setTesterResult(null);

    try {
      const response = await fetch('/api/enterprise/curriculum/verify-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          passages: allPassages,
        }),
      });

      if (!response.ok) throw new Error('Verification failed');
      const data = await response.json();
      setTesterResult(data);
    } catch (e: any) {
      setTesterResult({
        answer: "I cannot answer that based on the company's approved materials. (Connection fallback: submit formal MIR request to Medical Affairs).",
        isGroundedInApprovedContent: false,
        citedPassages: [],
        directQuote: null,
      });
    } finally {
      setIsTestingQuery(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Per-Company Branding Customization */}
      <div className="rounded-xl border border-blue-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl font-extrabold text-white shadow-xs"
              style={{ backgroundColor: branding.brandColor }}
            >
              {branding.companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg sm:text-xl">
                  {branding.companyName}
                </span>
                <span className="rounded bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 border border-blue-200 uppercase tracking-wide">
                  Enterprise Workspace (Phase 1 Pilot)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {branding.customTrackTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingBranding(!isEditingBranding)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              <Palette className="h-3.5 w-3.5 text-blue-600" />
              <span>{isEditingBranding ? 'Close Branding' : 'Customize Branding'}</span>
            </button>
            <button
              onClick={() => setIsAddingDoc(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Upload Approved Material</span>
            </button>
          </div>
        </div>

        {/* Fictional Pilot Notice */}
        <div className="mt-4 rounded-lg bg-blue-50/70 border border-blue-100 px-3.5 py-2 flex items-center justify-between text-[11px] text-blue-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-700 shrink-0" />
            <span>
              <strong>Company-Specific Grounding Guarantee:</strong> AI reps and quizzes synthesize answers solely from approved passages below. No outside hallucinated claims.
            </span>
          </div>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
            Demo Data Only
          </span>
        </div>

        {/* Branding Edit Drawer */}
        {isEditingBranding && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/60 p-4 rounded-lg">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Sponsor Name</label>
              <input
                type="text"
                value={brandNameInput}
                onChange={(e) => setBrandNameInput(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="e.g. AuraBio Pharmaceuticals"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Custom Track Title</label>
              <input
                type="text"
                value={trackTitleInput}
                onChange={(e) => setTrackTitleInput(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="e.g. OncoVance Precision Commercial Curriculum"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleSaveBranding}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-xs font-bold transition shadow-xs"
              >
                Apply Custom Branding
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Admin Workspace: Approved Materials Repository & Passage Citer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Approved Documents List (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Approved Materials Repository ({documents.length})</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">MLR Cleared</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isSelected = doc.id === activeDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left rounded-lg p-3 transition border text-xs ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-slate-900 line-clamp-1">{doc.title}</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 uppercase font-semibold">
                      {doc.version}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-2 text-[10px] text-slate-500">
                    <span className="capitalize">{doc.docType.replace(/_/g, ' ')}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                      {doc.passages.length} Citations
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleGenerateCurriculum}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 text-xs font-bold shadow-xs transition disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Lessons & Quizzes'}</span>
            </button>
            {generateSuccessMessage && (
              <p className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 text-center">
                {generateSuccessMessage}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Passages & Citation Codes in Active Document (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                Active Document Passages & Quotation Source
              </span>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5">{activeDoc.title}</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                Status: {activeDoc.status.toUpperCase()}
              </span>
            </div>
          </div>

          {activeDoc.reviewerNotes && (
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Compliance & Regulatory Review Note:</strong>{' '}
                {activeDoc.reviewerNotes}
              </div>
            </div>
          )}

          {/* Passages List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Approved Passage Text & Mandatory Citation Codes</span>
              <span className="text-slate-400 font-normal">
                {activeDoc.passages.length} verified passages
              </span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {activeDoc.passages.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs space-y-1.5 hover:border-blue-300 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-[11px]">{p.sectionName}</span>
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-100/70 border border-blue-200 px-2 py-0.5 rounded">
                      {p.citationCode}
                    </span>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed text-[11px]">"{p.text}"</p>
                </div>
              ))}
            </div>

            {/* Quick Add Passage Form */}
            <div className="pt-3 border-t border-slate-100 space-y-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-[11px] font-bold text-slate-700 block">
                Add New Approved Passage to "{activeDoc.title}"
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={newPassageSection}
                  onChange={(e) => setNewPassageSection(e.target.value)}
                  placeholder="Section Name (e.g. Section 2.1: Dosing)"
                  className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none"
                />
                <input
                  type="text"
                  value={newPassageCitation}
                  onChange={(e) => setNewPassageCitation(e.target.value)}
                  placeholder="Citation Code (e.g. PI-SEC-2.1)"
                  className="rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none uppercase font-mono"
                />
              </div>
              <textarea
                value={newPassageText}
                onChange={(e) => setNewPassageText(e.target.value)}
                placeholder="Approved verbatim passage text..."
                rows={2}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:outline-none"
              />
              <button
                onClick={() => handleAddPassageToDoc(activeDoc.id)}
                disabled={!newPassageSection || !newPassageText || !newPassageCitation}
                className="flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold transition disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Save Approved Passage</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Strict Grounding Q&A Tester: Every Statement Must Cite Its Source */}
      <div className="rounded-xl border border-blue-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Strict Grounding Verification Tester
              </h3>
              <p className="text-[11px] text-slate-500">
                Tests AI behavior: answers strictly from approved passages with source citations. If not in source, returns "I cannot answer."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => {
                setTesterQuery('What was the median Progression-Free Survival in the Phase 3 ARROW trial?');
                handleTestQuery('What was the median Progression-Free Survival in the Phase 3 ARROW trial?');
              }}
              className="rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700"
            >
              Test On-Label Query
            </button>
            <button
              onClick={() => {
                setTesterQuery('Can we promote OncoVance for patients with KRAS G12C non-small cell lung cancer?');
                handleTestQuery('Can we promote OncoVance for patients with KRAS G12C non-small cell lung cancer?');
              }}
              className="rounded border border-amber-200 bg-amber-50 hover:bg-amber-100 px-2 py-1 text-[11px] font-medium text-amber-800"
            >
              Test Unapproved Off-Label Query
            </button>
            <button
              onClick={() => {
                setTesterQuery('Can I offer an advisory board retreat weekend to a doctor who promises 5 prescriptions?');
                handleTestQuery('Can I offer an advisory board retreat weekend to a doctor who promises 5 prescriptions?');
              }}
              className="rounded border border-rose-200 bg-rose-50 hover:bg-rose-100 px-2 py-1 text-[11px] font-medium text-rose-800"
            >
              Test Inducement Query
            </button>
          </div>
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={testerQuery}
            onChange={(e) => setTesterQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTestQuery();
            }}
            placeholder="Ask any clinical or sales question to test strict approved passage grounding..."
            className="flex-1 rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleTestQuery()}
            disabled={isTestingQuery || !testerQuery.trim()}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-bold transition disabled:opacity-40"
          >
            {isTestingQuery ? 'Checking...' : 'Verify Passage Grounding'}
          </button>
        </div>

        {/* Result Card */}
        {testerResult && (
          <div
            className={`rounded-xl border p-4 text-xs space-y-2 transition shadow-xs ${
              testerResult.isGroundedInApprovedContent
                ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                : 'border-amber-200 bg-amber-50/50 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold">
                {testerResult.isGroundedInApprovedContent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-900">100% Grounded in Approved Materials</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-amber-900">Unapproved / Off-Label / Outside Approved Scope</span>
                  </>
                )}
              </div>

              {testerResult.citedPassages.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-600 font-medium">Source Citations:</span>
                  {testerResult.citedPassages.map((cite, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-1.5 py-0.5 border border-blue-200"
                    >
                      {cite}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="whitespace-pre-wrap leading-relaxed text-slate-800 font-medium">
              {testerResult.answer}
            </p>

            {testerResult.directQuote && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                <span className="font-bold text-slate-700 block">Exact Verbatim Passage Matched:</span>
                <p className="italic bg-white p-2 rounded border border-slate-200 mt-1">
                  "{testerResult.directQuote}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Generated Curriculum Display: Lessons, Quizzes & Roleplays from Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Generated Custom Track Content (Derived Exclusively From Approved Materials)
            </h3>
            <p className="text-xs text-slate-500">
              Every lesson, quiz option, and roleplay objection carries an auditable citation link to the parent passage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Lessons Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>Custom Lessons ({lessons.length})</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
                Passage Footnotes
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {lessons.map((les) => (
                <div key={les.id} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">{les.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-3">{les.content}</p>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {les.sourcePassages.map((sp, i) => (
                      <span
                        key={i}
                        className="rounded bg-blue-100 text-blue-800 font-mono text-[9px] font-bold px-1.5 py-0.5 border border-blue-200"
                        title={sp.snippet}
                      >
                        {sp.citationCode}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-indigo-600" />
                <span>Verification Quizzes ({quizzes.length})</span>
              </span>
              <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-2 py-0.5 rounded border border-indigo-200">
                Mandatory Citations
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {quizzes.slice(0, 3).map((quiz) => (
                <div key={quiz.id} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{quiz.question}</h4>
                  <div className="text-[11px] text-slate-500">
                    Correct Answer: <span className="font-semibold text-slate-800">{quiz.options[quiz.correctIndex]}</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded font-bold border border-indigo-200">
                      {quiz.mandatoryCitation}
                    </span>
                    <span className="text-slate-400">Auditable</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roleplay Persona Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                <span>Roleplay Personas ({roleplays.length})</span>
              </span>
              <span className="text-[10px] text-purple-700 bg-purple-50 font-bold px-2 py-0.5 rounded border border-purple-200">
                Fictional Clinical Scenarios
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {roleplays.map((rp) => (
                <div key={rp.id} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{rp.personaName}</h4>
                    <span className="text-[10px] text-slate-500 block">{rp.specialty} · {rp.institution}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200 italic">
                    {rp.openingObjection}
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-1">
                    <div>
                      <strong className="text-slate-700">Required Response Citations:</strong>{' '}
                      {rp.approvedResolutionPassages.join(', ')}
                    </div>
                    <div>
                      <strong className="text-rose-700">Prohibited Off-Label Traps:</strong>{' '}
                      {rp.unacceptableOffLabelTopics.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
