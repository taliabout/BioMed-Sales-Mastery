import React, { useState, useEffect } from 'react';
import {
  NetworkContact,
  ReachoutStatus,
  SuggestedConnection,
  HealthcareTrack,
  OutreachTone,
  EmailDraftResponse,
} from '../types';
import { HEALTHCARE_TRACKS } from '../data/tracksData';
import {
  Send,
  UserPlus,
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  Building,
  Mail,
  Copy,
  Check,
  ChevronRight,
  Filter,
  Download,
  Flame,
  ArrowUpRight,
  RefreshCw,
  Trash2,
  FileText,
  AlertCircle,
  ExternalLink,
  PhoneCall,
  Award,
  Shield,
  Layers,
} from 'lucide-react';

interface NetworkAcceleratorProps {
  currentTrack?: HealthcareTrack;
}

const DEFAULT_CONTACTS: NetworkContact[] = [
  {
    id: 'cnt-1',
    name: 'Marcus Vance',
    title: 'Regional Sales Director - Orthopaedics & Trauma',
    company: 'Stryker',
    track: 'med_device',
    location: 'Southeast (Atlanta / Charlotte)',
    type: 'hiring_manager',
    status: 'sent',
    notes: 'Reached out via Shelby Haas low-pressure email. Highlighted D1 college athlete background and 60+ daily cold calls.',
    lastContactDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    nextFollowUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    strategicAngle: 'Needs hungry associate reps to take 24/7 weekend trauma call off senior reps.',
    addedDate: '2025-02-10',
  },
  {
    id: 'cnt-2',
    name: 'Sarah Lindqvist',
    title: 'Senior Executive Talent Acquisition Partner - Interventional',
    company: 'Boston Scientific',
    track: 'med_device',
    location: 'Northeast (Boston / NYC / NJ)',
    type: 'recruiter',
    status: 'call_scheduled',
    notes: 'Responded in 3 hours! Phone screen booked for Thursday 9:00 AM EST. Preparing 1-page Brag Book.',
    lastContactDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    nextFollowUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    strategicAngle: 'Sourcing associate reps for WATCHMAN structural heart expansion cohort.',
    addedDate: '2025-02-12',
  },
  {
    id: 'cnt-3',
    name: 'David K. O\'Connor',
    title: 'Area VP of Commercial Sales - da Vinci Robotics',
    company: 'Intuitive Surgical',
    track: 'med_device',
    location: 'Texas / Central Region',
    type: 'hiring_manager',
    status: 'identified',
    notes: 'Researched recent hospital capital budget approvals in Dallas. Planning outreach with VAC economic focus.',
    strategicAngle: 'Values reps who understand hospital capital committee procedures and surgeon block utilization.',
    addedDate: '2025-02-14',
  },
  {
    id: 'cnt-4',
    name: 'Dr. Rachel Chen, PharmD',
    title: 'Associate Director - Oncology Key Accounts',
    company: 'Genentech',
    track: 'biotech_oncology',
    location: 'Mid-Atlantic (DC / MD / VA)',
    type: 'hiring_manager',
    status: 'responded',
    notes: 'Requested copy of territory business plan and clarification on buy-and-bill reimbursement knowledge.',
    lastContactDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    nextFollowUpDate: new Date().toISOString().split('T')[0],
    strategicAngle: 'Seeking commercial reps who can digest complex phase III Kaplan-Meier curves and 340B pricing.',
    addedDate: '2025-02-08',
  },
  {
    id: 'cnt-5',
    name: 'Elena Rostova',
    title: 'Territory Sales Leader - Cranial & Spine',
    company: 'Medtronic',
    track: 'med_device',
    location: 'West Coast (Pacific NW / NorCal)',
    type: 'territory_rep',
    status: 'interviewing',
    notes: 'Completed 1st round recruiter screen; currently scheduling ride-along with local senior spine sales rep.',
    lastContactDate: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    nextFollowUpDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    strategicAngle: 'Direct line to District Manager; strong internal champion for motivated candidates.',
    addedDate: '2025-02-05',
  },
];

const STORAGE_KEY = 'biomed_network_accelerator_contacts_v1';

export const NetworkAccelerator: React.FC<NetworkAcceleratorProps> = ({ currentTrack = 'med_device' }) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'tracker' | 'drafter' | 'scout'>('tracker');

  // Contacts state with localStorage persistence
  const [contacts, setContacts] = useState<NetworkContact[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse saved network contacts:', e);
    }
    return DEFAULT_CONTACTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      console.warn('Failed to save network contacts:', e);
    }
  }, [contacts]);

  // Tracker Filters & Search
  const [statusFilter, setStatusFilter] = useState<ReachoutStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactForDetail, setSelectedContactForDetail] = useState<NetworkContact | null>(null);

  // New Contact Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContactForm, setNewContactForm] = useState<Partial<NetworkContact>>({
    name: '',
    title: '',
    company: '',
    track: currentTrack,
    location: '',
    type: 'recruiter',
    status: 'identified',
    notes: '',
    strategicAngle: '',
  });

  // AI Connection Scout State
  const [scoutTrack, setScoutTrack] = useState<HealthcareTrack>(currentTrack);
  const [scoutTerritory, setScoutTerritory] = useState('Northeast / Mid-Atlantic');
  const [scoutRoleType, setScoutRoleType] = useState('all');
  const [scoutProfileHook, setScoutProfileHook] = useState(
    'Hunter B2B sales track record (120% quota, 60+ daily touches) + competitive athletics background'
  );
  const [isScouting, setIsScouting] = useState(false);
  const [suggestedConnections, setSuggestedConnections] = useState<SuggestedConnection[]>([]);
  const [scoutSuccessNotice, setScoutSuccessNotice] = useState<string | null>(null);

  // AI Email Drafter State
  const [draftRecipientId, setDraftRecipientId] = useState<string>(contacts[0]?.id || '');
  const [customRecipientName, setCustomRecipientName] = useState('');
  const [customRecipientTitle, setCustomRecipientTitle] = useState('');
  const [customRecipientCompany, setCustomRecipientCompany] = useState('');
  const [draftTone, setDraftTone] = useState<OutreachTone>('shelby_haas_detachment');
  const [draftBackgroundHook, setDraftBackgroundHook] = useState(
    'Top 10% B2B quota earner with collegiate athlete work ethic, rigorously trained in hospital VAC economics and OR sterile field protocols.'
  );
  const [draftTerritory, setDraftTerritory] = useState('Regional / National');
  const [isDrafting, setIsDrafting] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<EmailDraftResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Trigger Scout generation
  const handleGenerateSuggestions = async () => {
    setIsScouting(true);
    setScoutSuccessNotice(null);
    try {
      const response = await fetch('/api/network-accelerator/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track: scoutTrack,
          territory: scoutTerritory,
          roleType: scoutRoleType,
          candidateProfile: scoutProfileHook,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestedConnections(data.suggestions);
        setScoutSuccessNotice(`Generated ${data.suggestions.length} high-yield recruiter & leader connections.`);
      }
    } catch (err: any) {
      console.warn('AI scout error, falling back:', err);
    } finally {
      setIsScouting(false);
    }
  };

  // Add suggestion to CRM
  const handleAddSuggestionToCRM = (sug: SuggestedConnection) => {
    const exists = contacts.some((c) => c.name.toLowerCase() === sug.name.toLowerCase() && c.company.toLowerCase() === sug.company.toLowerCase());
    if (exists) {
      alert(`${sug.name} at ${sug.company} is already in your CRM pipeline.`);
      return;
    }

    const newContact: NetworkContact = {
      id: `cnt-${Date.now()}`,
      name: sug.name,
      title: sug.title,
      company: sug.company,
      track: sug.track,
      location: sug.location,
      type: sug.type,
      status: 'identified',
      notes: sug.strategicReason,
      strategicAngle: sug.recommendedApproach,
      addedDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    };

    setContacts([newContact, ...contacts]);
    setScoutSuccessNotice(`Added ${sug.name} (${sug.company}) to your Reach-Out CRM!`);
    setTimeout(() => setScoutSuccessNotice(null), 4000);
  };

  // Trigger Email Draft generation
  const handleGenerateDraft = async () => {
    setIsDrafting(true);

    let contactName = customRecipientName || 'Hiring Leader';
    let contactTitle = customRecipientTitle || 'Regional Sales Manager';
    let company = customRecipientCompany || 'Medical Device Co.';
    let track = currentTrack;

    if (draftRecipientId && draftRecipientId !== 'custom') {
      const found = contacts.find((c) => c.id === draftRecipientId);
      if (found) {
        contactName = found.name;
        contactTitle = found.title;
        company = found.company;
        track = found.track;
        if (found.location) setDraftTerritory(found.location);
      }
    }

    try {
      const response = await fetch('/api/network-accelerator/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName,
          contactTitle,
          company,
          track,
          tone: draftTone,
          userBackgroundHook: draftBackgroundHook,
          territory: draftTerritory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setGeneratedDraft(data);

      // If tied to a contact, update contact's draftedSubject and body
      if (draftRecipientId && draftRecipientId !== 'custom') {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === draftRecipientId
              ? {
                  ...c,
                  status: c.status === 'identified' ? 'drafted' : c.status,
                  draftedSubject: data.subjectLines?.[0] || '',
                  draftedBody: data.emailBody || '',
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error('Error generating email draft:', err);
    } finally {
      setIsDrafting(false);
    }
  };

  // Update contact status
  const handleUpdateStatus = (contactId: string, newStatus: ReachoutStatus) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          const updated: NetworkContact = {
            ...c,
            status: newStatus,
          };
          if (newStatus === 'sent') {
            updated.lastContactDate = new Date().toISOString().split('T')[0];
            updated.nextFollowUpDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
          }
          return updated;
        }
        return c;
      })
    );
  };

  // Inline note save
  const handleUpdateNotes = (contactId: string, notes: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, notes } : c))
    );
  };

  // Delete contact
  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to remove this contact from your reach-out pipeline?')) {
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      if (selectedContactForDetail?.id === contactId) {
        setSelectedContactForDetail(null);
      }
    }
  };

  // Add custom contact
  const handleSaveNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactForm.name || !newContactForm.company) {
      alert('Please provide at least a Name and Company.');
      return;
    }

    const contact: NetworkContact = {
      id: `cnt-${Date.now()}`,
      name: newContactForm.name,
      title: newContactForm.title || 'Sales Leader',
      company: newContactForm.company,
      track: newContactForm.track || currentTrack,
      location: newContactForm.location || 'Regional',
      type: newContactForm.type || 'recruiter',
      status: newContactForm.status || 'identified',
      notes: newContactForm.notes || '',
      strategicAngle: newContactForm.strategicAngle || '',
      addedDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: newContactForm.nextFollowUpDate,
    };

    setContacts([contact, ...contacts]);
    setIsAddModalOpen(false);
    setNewContactForm({
      name: '',
      title: '',
      company: '',
      track: currentTrack,
      location: '',
      type: 'recruiter',
      status: 'identified',
      notes: '',
      strategicAngle: '',
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Title', 'Company', 'Track', 'Type', 'Status', 'Location', 'Last Contact', 'Next Follow-Up', 'Notes'];
    const rows = contacts.map((c) => [
      `"${c.name}"`,
      `"${c.title}"`,
      `"${c.company}"`,
      `"${c.track}"`,
      `"${c.type}"`,
      `"${c.status}"`,
      `"${c.location}"`,
      `"${c.lastContactDate || ''}"`,
      `"${c.nextFollowUpDate || ''}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BioMed_Sales_Reachout_Pipeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Calculations for KPI Cards
  const totalContacts = contacts.length;
  const sentCount = contacts.filter((c) => ['sent', 'responded', 'call_scheduled', 'interviewing', 'offer_extended'].includes(c.status)).length;
  const respondedCount = contacts.filter((c) => ['responded', 'call_scheduled', 'interviewing', 'offer_extended'].includes(c.status)).length;
  const callsBookedCount = contacts.filter((c) => ['call_scheduled', 'interviewing', 'offer_extended'].includes(c.status)).length;
  const responseRate = sentCount > 0 ? Math.round((respondedCount / sentCount) * 100) : 0;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const dueFollowUps = contacts.filter(
    (c) => c.nextFollowUpDate && c.nextFollowUpDate <= todayStr && !['offer_extended', 'archived'].includes(c.status)
  ).length;

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: ReachoutStatus) => {
    const config: Record<ReachoutStatus, { label: string; bg: string; text: string; border: string }> = {
      identified: { label: 'Identified', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
      drafted: { label: 'Drafted', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      sent: { label: 'Sent', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      responded: { label: 'Responded', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      call_scheduled: { label: 'Call Booked', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
      interviewing: { label: 'Interviewing', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      offer_extended: { label: 'Offer / Won', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
      archived: { label: 'Archived', bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-200' },
    };
    const s = config[status] || config.identified;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${s.bg} ${s.text} ${s.border}`}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded bg-blue-500/30 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-200 border border-blue-400/30">
                AI Career Engine
              </span>
              <span className="flex items-center gap-1 text-xs text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Multi-Tier Model Intelligence
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Network Accelerator
            </h1>
            <p className="mt-1 text-sm text-blue-100 max-w-2xl">
              Discover verified MedTech & Biotech recruiters and sales directors, draft tailored cold outreach powered by Shelby Haas reverse-selling and recruiter hook psychology, and manage your pipeline to signed offers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('scout')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              AI Connection Scout
            </button>
            <button
              onClick={() => setActiveTab('drafter')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-900 px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors"
            >
              <Send className="h-4 w-4 text-blue-600" />
              Draft Personalized Outreach
            </button>
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-blue-600/60 pt-5">
          <div className="bg-blue-950/40 rounded-lg p-3 border border-blue-500/30">
            <div className="text-[11px] text-blue-200 font-medium">Network Targets</div>
            <div className="text-xl font-bold text-white mt-0.5">{totalContacts}</div>
          </div>
          <div className="bg-blue-950/40 rounded-lg p-3 border border-blue-500/30">
            <div className="text-[11px] text-blue-200 font-medium">Outreaches Sent</div>
            <div className="text-xl font-bold text-white mt-0.5">{sentCount}</div>
          </div>
          <div className="bg-blue-950/40 rounded-lg p-3 border border-blue-500/30">
            <div className="text-[11px] text-blue-200 font-medium">Response Rate</div>
            <div className="text-xl font-bold text-emerald-300 mt-0.5">{responseRate}%</div>
          </div>
          <div className="bg-blue-950/40 rounded-lg p-3 border border-blue-500/30">
            <div className="text-[11px] text-blue-200 font-medium">Screens & Calls Booked</div>
            <div className="text-xl font-bold text-amber-300 mt-0.5">{callsBookedCount}</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-blue-950/40 rounded-lg p-3 border border-blue-500/30">
            <div className="text-[11px] text-blue-200 font-medium flex items-center justify-between">
              <span>Follow-Ups Due</span>
              {dueFollowUps > 0 && (
                <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
              )}
            </div>
            <div className={`text-xl font-bold mt-0.5 ${dueFollowUps > 0 ? 'text-rose-300' : 'text-white'}`}>
              {dueFollowUps}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'tracker'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          Reach-Out CRM & Pipeline Tracker ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab('scout')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'scout'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          AI Connection Scout (Recruiters & Leaders)
        </button>
        <button
          onClick={() => setActiveTab('drafter')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'drafter'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="h-4 w-4 text-blue-600" />
          AI Email & InMail Drafter
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: Reach-Out CRM & Status Tracker                     */}
      {/* ======================================================== */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          {/* Controls Bar: Search, Status Filter, Add Contact, Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by recruiter, company, or note..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-1.5 pl-9 pr-3 text-xs focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="all">All Stages ({contacts.length})</option>
                  <option value="identified">Identified</option>
                  <option value="drafted">Drafted</option>
                  <option value="sent">Sent</option>
                  <option value="responded">Responded</option>
                  <option value="call_scheduled">Call Booked</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer_extended">Offer Extended</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Add Contact
              </button>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Export Reach-Out Pipeline to CSV"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Contacts List / Table */}
          {filteredContacts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Users className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-3 text-sm font-semibold text-slate-800">No contacts match your filter</h3>
              <p className="mt-1 text-xs text-slate-500">
                Try switching the status filter, clearing your search, or generating new targets with the AI Scout.
              </p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-lg bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => {
                const isOverdue =
                  contact.nextFollowUpDate &&
                  contact.nextFollowUpDate <= todayStr &&
                  !['offer_extended', 'archived'].includes(contact.status);

                return (
                  <div
                    key={contact.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-blue-300 transition-all"
                  >
                    <div>
                      {/* Top Row: Name, Company, Status Dropdown */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900">{contact.name}</h3>
                            <span className="text-[10px] text-slate-400 capitalize">
                              ({contact.type.replace('_', ' ')})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-blue-700 font-semibold">
                            <Building className="h-3.5 w-3.5" />
                            {contact.company}
                          </div>
                        </div>

                        {/* Interactive Status Selector */}
                        <select
                          value={contact.status}
                          onChange={(e) => handleUpdateStatus(contact.id, e.target.value as ReachoutStatus)}
                          className="rounded border border-slate-200 bg-slate-50 py-0.5 px-2 text-[11px] font-semibold text-slate-700 focus:border-blue-500 focus:outline-hidden"
                        >
                          <option value="identified">Identified</option>
                          <option value="drafted">Drafted</option>
                          <option value="sent">Sent</option>
                          <option value="responded">Responded</option>
                          <option value="call_scheduled">Call Booked</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer_extended">Offer / Won</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <p className="mt-1 text-xs text-slate-600 line-clamp-2">{contact.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{contact.location}</span>
                        <span>·</span>
                        <span className="capitalize">{contact.track.replace('_', ' ')}</span>
                      </div>

                      {/* Strategic Angle / Notes Box */}
                      {contact.strategicAngle && (
                        <div className="mt-2.5 rounded bg-blue-50/60 p-2 text-[11px] text-blue-900 border border-blue-100">
                          <span className="font-semibold text-blue-800">Angle: </span>
                          {contact.strategicAngle}
                        </div>
                      )}

                      {/* Notes Section with Inline Editing */}
                      <div className="mt-3">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          CRM Activity Notes
                        </label>
                        <textarea
                          rows={2}
                          defaultValue={contact.notes}
                          onBlur={(e) => handleUpdateNotes(contact.id, e.target.value)}
                          placeholder="Log conversation notes, next steps, or objections..."
                          className="mt-1 w-full rounded border border-slate-200 p-1.5 text-xs text-slate-700 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                      {/* Date tracker pills */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                        {contact.lastContactDate && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>Last: {contact.lastContactDate}</span>
                          </div>
                        )}
                        {contact.nextFollowUpDate && (
                          <div
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-medium ${
                              isOverdue
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Calendar className="h-3 w-3" />
                            <span>
                              Follow-Up: {contact.nextFollowUpDate} {isOverdue && '(Overdue)'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setDraftRecipientId(contact.id);
                          setDraftTerritory(contact.location || 'Regional');
                          setActiveTab('drafter');
                        }}
                        className="inline-flex items-center gap-1 rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <Send className="h-3 w-3" />
                        Draft Outreach
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            const newDate = prompt(
                              'Set next follow-up date (YYYY-MM-DD):',
                              new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
                            );
                            if (newDate) {
                              setContacts((prev) =>
                                prev.map((c) => (c.id === contact.id ? { ...c, nextFollowUpDate: newDate } : c))
                              );
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Schedule Follow-Up Date"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete Contact"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: AI Connection Scout (Recruiter & Leader Discovery) */}
      {/* ======================================================== */}
      {activeTab === 'scout' && (
        <div className="space-y-6">
          {/* Scout Form Controls */}
          <div className="rounded-xl border border-blue-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">
                AI Professional Connection Scout
              </h2>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Our multi-tier AI searches top medical device, surgical robotics, and biotech organizations (Stryker, Boston Scientific, Intuitive, Medtronic, Genentech) to identify high-yield talent gatekeepers, hiring directors, and territory mentors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Healthcare Track Focus
                </label>
                <select
                  value={scoutTrack}
                  onChange={(e) => setScoutTrack(e.target.value as HealthcareTrack)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="med_device">Medical Device (Stryker, Boston Sci, Intuitive)</option>
                  <option value="biotech_oncology">Biotech & Oncology (Genentech, AstraZeneca)</option>
                  <option value="pharma">Specialty Pharma (AbbVie, Novartis)</option>
                  <option value="healthtech_samd">HealthTech & SaMD (AI Imaging, HeartFlow)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Territory / Geography
                </label>
                <select
                  value={scoutTerritory}
                  onChange={(e) => setScoutTerritory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="Northeast (Boston / NYC / NJ / Philly)">Northeast (Boston / NYC / NJ / Philly)</option>
                  <option value="Southeast (Atlanta / Charlotte / Florida)">Southeast (Atlanta / Charlotte / Florida)</option>
                  <option value="Midwest & Central (Chicago / Minneapolis / Ohio)">Midwest & Central (Chicago / Minneapolis / Ohio)</option>
                  <option value="Texas & Southwest (Dallas / Houston / Austin)">Texas & Southwest (Dallas / Houston / Austin)</option>
                  <option value="West Coast (California / Pacific NW / Seattle)">West Coast (California / Pacific NW / Seattle)</option>
                  <option value="National US / Multiple Territories">National US / Multiple Territories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Type
                </label>
                <select
                  value={scoutRoleType}
                  onChange={(e) => setScoutRoleType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="all">All High-Yield Gatekeepers</option>
                  <option value="recruiter">Corporate Talent Acquisition / Recruiters</option>
                  <option value="hiring_manager">Regional Sales Directors & District Managers</option>
                  <option value="territory_rep">President's Club Territory Reps & Mentors</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Candidate Differentiation Hook
              </label>
              <input
                type="text"
                value={scoutProfileHook}
                onChange={(e) => setScoutProfileHook(e.target.value)}
                placeholder="e.g., Top 10% B2B quota earner at ADP, collegiate athlete, or former ICU nurse..."
                className="w-full rounded-lg border border-slate-200 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Backed by 5-Tier AI Cascade & Deterministic MedTech Benchmarks
              </span>
              <button
                onClick={handleGenerateSuggestions}
                disabled={isScouting}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isScouting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Scouting Connections...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Targeted Connections
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {scoutSuccessNotice && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{scoutSuccessNotice}</span>
            </div>
          )}

          {/* Generated Suggestions Grid */}
          {suggestedConnections.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  Recommended Gatekeepers ({suggestedConnections.length})
                </h3>
                <span className="text-xs text-slate-500">1-click addition to your CRM pipeline</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedConnections.map((sug) => {
                  const alreadyInCRM = contacts.some(
                    (c) => c.name.toLowerCase() === sug.name.toLowerCase() && c.company.toLowerCase() === sug.company.toLowerCase()
                  );

                  return (
                    <div
                      key={sug.id}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="inline-block rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1">
                              {sug.company}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{sug.name}</h4>
                            <p className="text-xs text-slate-600">{sug.title}</p>
                          </div>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 capitalize">
                            {sug.type.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="mt-2 text-[11px] text-slate-400">
                          <span>{sug.location}</span>
                        </div>

                        <div className="mt-3 rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs text-slate-700">
                          <strong className="text-slate-900">Why Connect: </strong>
                          {sug.strategicReason}
                        </div>

                        {/* Conversation Hooks */}
                        <div className="mt-3">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            High-Yield Conversation Angles
                          </div>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {sug.conversationHooks.map((hook, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-blue-600 font-bold shrink-0">·</span>
                                <span>{hook}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommended Approach */}
                        <div className="mt-3 text-[11px] text-indigo-900 bg-indigo-50/70 p-2 rounded border border-indigo-100">
                          <strong>Recommended Strategy: </strong>
                          {sug.recommendedApproach}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            handleAddSuggestionToCRM(sug);
                            setCustomRecipientName(sug.name);
                            setCustomRecipientTitle(sug.title);
                            setCustomRecipientCompany(sug.company);
                            setDraftTerritory(sug.location);
                            setActiveTab('drafter');
                          }}
                          className="inline-flex items-center gap-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Draft Outreach
                        </button>

                        <button
                          onClick={() => handleAddSuggestionToCRM(sug)}
                          disabled={alreadyInCRM}
                          className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${
                            alreadyInCRM
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {alreadyInCRM ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              Added to CRM
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3.5 w-3.5" />
                              Add to CRM
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: AI Recruiter Email & InMail Drafter                */}
      {/* ======================================================== */}
      {activeTab === 'drafter' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Draft Form Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Send className="h-5 w-5 text-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">
                    AI Cold Outreach Drafter
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Generates emails, mobile InMails, and follow-up sequences engineered for 40%+ reply rates from medical sales executives.
                </p>

                {/* Recipient Source */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Choose Recipient
                    </label>
                    <select
                      value={draftRecipientId}
                      onChange={(e) => {
                        setDraftRecipientId(e.target.value);
                        if (e.target.value !== 'custom') {
                          const c = contacts.find((item) => item.id === e.target.value);
                          if (c) {
                            setCustomRecipientName(c.name);
                            setCustomRecipientTitle(c.title);
                            setCustomRecipientCompany(c.company);
                            setDraftTerritory(c.location);
                          }
                        }
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                    >
                      {contacts.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.title} ({c.company})
                        </option>
                      ))}
                      <option value="custom">+ Custom Recipient (Enter details below)</option>
                    </select>
                  </div>

                  {draftRecipientId === 'custom' && (
                    <div className="space-y-2 rounded-lg bg-slate-50 p-3 border border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Full Name</label>
                        <input
                          type="text"
                          value={customRecipientName}
                          onChange={(e) => setCustomRecipientName(e.target.value)}
                          placeholder="e.g. John Henderson"
                          className="mt-0.5 w-full rounded border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Title</label>
                        <input
                          type="text"
                          value={customRecipientTitle}
                          onChange={(e) => setCustomRecipientTitle(e.target.value)}
                          placeholder="e.g. Regional Sales Director"
                          className="mt-0.5 w-full rounded border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Company</label>
                        <input
                          type="text"
                          value={customRecipientCompany}
                          onChange={(e) => setCustomRecipientCompany(e.target.value)}
                          placeholder="e.g. Stryker Orthopaedics"
                          className="mt-0.5 w-full rounded border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {/* Outreach Philosophy / Tone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Outreach Methodology & Tone
                    </label>
                    <select
                      value={draftTone}
                      onChange={(e) => setDraftTone(e.target.value as OutreachTone)}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                    >
                      <option value="shelby_haas_detachment">
                        Shelby Haas Radical Detachment (Zero Commission Breath)
                      </option>
                      <option value="recruiter_direct_hook">
                        Direct Recruiter Hunter Hook (Metrics & 60+ Calls/Day)
                      </option>
                      <option value="sales_manager_value">
                        Sales Manager Capacity (OR Case Coverage, Zero Ego)
                      </option>
                      <option value="followup_soft">
                        Soft Value-Add Follow-Up (Day 3 Clinical Check-In)
                      </option>
                      <option value="followup_breakup">
                        Graceful Breakup / Takeaway Close (Day 14 Reversal)
                      </option>
                    </select>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {draftTone === 'shelby_haas_detachment' &&
                        'Removes buyer defensiveness, acknowledges busy schedule, gives them permission to say no.'}
                      {draftTone === 'recruiter_direct_hook' &&
                        'Crisp bullet points tailored for corporate talent recruiters who skim in 6 seconds.'}
                      {draftTone === 'sales_manager_value' &&
                        'Positions you as an associate rep ready to shoulder 5:00 AM tray drops and weekend trauma.'}
                      {draftTone === 'followup_breakup' &&
                        'Leverages loss aversion; releases pressure and often triggers immediate polite replies.'}
                    </p>
                  </div>

                  {/* Background Hook */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Unique Differentiation Hook
                    </label>
                    <textarea
                      rows={3}
                      value={draftBackgroundHook}
                      onChange={(e) => setDraftBackgroundHook(e.target.value)}
                      placeholder="e.g. ADP top performer, NCAA athlete with 60 calls/day motor, pre-med with high clinical acumen..."
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Territory */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Territory
                    </label>
                    <input
                      type="text"
                      value={draftTerritory}
                      onChange={(e) => setDraftTerritory(e.target.value)}
                      placeholder="e.g. Northeast / Mid-Atlantic / Atlanta"
                      className="w-full rounded-lg border border-slate-200 py-1.5 px-3 text-xs text-slate-800"
                    />
                  </div>

                  <button
                    onClick={handleGenerateDraft}
                    disabled={isDrafting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isDrafting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Tailored Outreach...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Cold Outreach & Follow-Ups
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Generated Outreach Presentation */}
            <div className="lg:col-span-7 space-y-4">
              {!generatedDraft ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center h-full flex flex-col items-center justify-center">
                  <Send className="h-10 w-10 text-slate-300" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-800">
                    Ready to Draft Cold Outreach
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-sm">
                    Select a contact, customize your candidate hook and tone, and generate high-open subject lines, full email body, and follow-up sequence.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Subject Lines Card */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Flame className="h-4 w-4 text-amber-500" />
                        Tested High-Open Subject Lines (Click to Copy)
                      </div>
                      <span className="text-[10px] text-slate-400">70%+ Industry Open Rate</span>
                    </div>

                    <div className="space-y-1.5">
                      {generatedDraft.subjectLines.map((subj, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCopy(subj, `subj-${idx}`)}
                          className="w-full flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-left text-xs text-slate-800 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                        >
                          <span className="font-mono text-blue-700 text-[11px] font-semibold">
                            Option {idx + 1}:
                          </span>
                          <span className="flex-1 font-medium">{subj}</span>
                          {copiedKey === `subj-${idx}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Cold Email */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Mail className="h-4 w-4 text-blue-600" />
                        Cold Email Message (Under 160 Words)
                      </div>
                      <button
                        onClick={() => handleCopy(generatedDraft.emailBody, 'email_body')}
                        className="inline-flex items-center gap-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 text-[11px] font-semibold transition-colors"
                      >
                        {copiedKey === 'email_body' ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy Email
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3.5 text-xs font-sans text-slate-800 whitespace-pre-line border border-slate-200 leading-relaxed">
                      {generatedDraft.emailBody}
                    </div>
                  </div>

                  {/* LinkedIn InMail Card */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Send className="h-4 w-4 text-blue-600" />
                        LinkedIn InMail Version (Mobile-Optimized)
                      </div>
                      <button
                        onClick={() => handleCopy(generatedDraft.inMailBody, 'inmail_body')}
                        className="inline-flex items-center gap-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 text-[11px] font-semibold transition-colors"
                      >
                        {copiedKey === 'inmail_body' ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy InMail
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-lg bg-blue-50/40 p-3 text-xs text-slate-800 whitespace-pre-line border border-blue-100">
                      {generatedDraft.inMailBody}
                    </div>
                  </div>

                  {/* 3-Step Follow-Up Sequence */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        3-Touch Follow-Up Cadence
                      </div>
                      <span className="text-[10px] text-slate-400">Yields 60% of Total Responses</span>
                    </div>

                    <div className="space-y-2">
                      {generatedDraft.followUpCadence.map((fu, idx) => (
                        <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-indigo-900">
                              Touch {fu.step} — {fu.timing}
                            </span>
                            <button
                              onClick={() => handleCopy(fu.message, `fu-${idx}`)}
                              className="text-slate-400 hover:text-slate-700"
                              title="Copy Follow-Up"
                            >
                              {copiedKey === `fu-${idx}` ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-slate-700">{fu.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Rationale & Pro Tip */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-900 space-y-2">
                    <div>
                      <strong className="text-blue-950">Strategic Rationale: </strong>
                      {generatedDraft.strategicRationale}
                    </div>
                    <div className="pt-2 border-t border-blue-200 text-blue-950 font-medium">
                      <span className="text-amber-700 font-bold">💡 Recruiter Pro Tip: </span>
                      {generatedDraft.industryProTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Modal: Add New Contact to Pipeline                       */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Outreach Target</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewContact} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newContactForm.name || ''}
                    onChange={(e) => setNewContactForm({ ...newContactForm, name: e.target.value })}
                    placeholder="e.g. Jason Miller"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Company *</label>
                  <input
                    type="text"
                    required
                    value={newContactForm.company || ''}
                    onChange={(e) => setNewContactForm({ ...newContactForm, company: e.target.value })}
                    placeholder="e.g. Stryker"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Title</label>
                  <input
                    type="text"
                    value={newContactForm.title || ''}
                    onChange={(e) => setNewContactForm({ ...newContactForm, title: e.target.value })}
                    placeholder="e.g. Regional Sales Director"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Location / Territory</label>
                  <input
                    type="text"
                    value={newContactForm.location || ''}
                    onChange={(e) => setNewContactForm({ ...newContactForm, location: e.target.value })}
                    placeholder="e.g. Atlanta, GA"
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Track</label>
                  <select
                    value={newContactForm.track || currentTrack}
                    onChange={(e) => setNewContactForm({ ...newContactForm, track: e.target.value as any })}
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  >
                    <option value="med_device">Med Device</option>
                    <option value="biotech_oncology">Biotech</option>
                    <option value="pharma">Pharma</option>
                    <option value="healthtech_samd">HealthTech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Role Type</label>
                  <select
                    value={newContactForm.type || 'recruiter'}
                    onChange={(e) => setNewContactForm({ ...newContactForm, type: e.target.value as any })}
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  >
                    <option value="recruiter">Recruiter</option>
                    <option value="hiring_manager">Hiring Manager</option>
                    <option value="territory_rep">Territory Rep</option>
                    <option value="kol_physician">Surgeon / KOL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Status</label>
                  <select
                    value={newContactForm.status || 'identified'}
                    onChange={(e) => setNewContactForm({ ...newContactForm, status: e.target.value as any })}
                    className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                  >
                    <option value="identified">Identified</option>
                    <option value="drafted">Drafted</option>
                    <option value="sent">Sent</option>
                    <option value="responded">Responded</option>
                    <option value="call_scheduled">Call Booked</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer_extended">Offer Extended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Strategic Angle / Mutual Hook</label>
                <input
                  type="text"
                  value={newContactForm.strategicAngle || ''}
                  onChange={(e) => setNewContactForm({ ...newContactForm, strategicAngle: e.target.value })}
                  placeholder="e.g. Ex-collegiate athlete connection, recent ASC territory expansion..."
                  className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Initial Notes</label>
                <textarea
                  rows={2}
                  value={newContactForm.notes || ''}
                  onChange={(e) => setNewContactForm({ ...newContactForm, notes: e.target.value })}
                  placeholder="e.g. Connected on LinkedIn, agreed to send business plan..."
                  className="mt-1 w-full rounded border border-slate-200 p-2 text-xs text-slate-800"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
