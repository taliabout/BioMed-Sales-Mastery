export type DocumentType =
  | 'prescribing_info'
  | 'ifu_device'
  | 'clinical_trial_summary'
  | 'approved_messaging'
  | 'objection_responses';

export type MLRReviewStatus =
  | 'draft'
  | 'medical'
  | 'legal'
  | 'regulatory'
  | 'approved'
  | 'published';

export interface DocumentPassage {
  id: string;
  sectionName: string;
  text: string;
  citationCode: string; // e.g. "PI-SEC-4.1" or "TRIAL-ENDPT-Table2"
}

export interface ApprovedDocument {
  id: string;
  title: string;
  docType: DocumentType;
  version: string;
  status: MLRReviewStatus;
  passages: DocumentPassage[];
  lastUpdated: string;
  reviewerNotes?: string;
  versionHistory: {
    version: string;
    changedAt: string;
    changedBy: string;
    changeSummary: string;
    previousStatus: MLRReviewStatus;
    newStatus: MLRReviewStatus;
  }[];
}

export interface CompanyBrandingConfig {
  companyName: string;
  customTrackTitle: string;
  brandColor: string; // e.g., '#1e40af'
  accentColor: string; // e.g., '#0284c7'
  fictionalDisclaimer: string;
}

export interface GeneratedLesson {
  id: string;
  title: string;
  learningObjective: string;
  content: string;
  sourcePassages: {
    passageId: string;
    citationCode: string;
    snippet: string;
  }[];
}

export interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mandatoryCitation: string;
  passageSnippet: string;
}

export interface GeneratedRoleplayScenario {
  id: string;
  personaName: string;
  specialty: string;
  institution: string;
  clinicalAttitude: string;
  openingObjection: string;
  approvedResolutionPassages: string[];
  unacceptableOffLabelTopics: string[];
}

export interface ComplianceAuditEntry {
  id: string;
  timestamp: string;
  repName: string;
  simulationType: 'roleplay' | 'pitch' | 'curriculum_quiz';
  overallScore: number;
  offLabelClaimsDetected: boolean;
  offLabelReason?: string;
  missingFairBalance: boolean;
  fairBalanceReason?: string;
  improperInducementDetected: boolean;
  improperInducementReason?: string;
  transcriptSample: string;
  status: 'COMPLIANT' | 'FLAGGED_FOR_REVIEW';
}
