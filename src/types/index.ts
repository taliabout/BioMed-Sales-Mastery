export type HealthcareTrack =
  | 'med_device'
  | 'biotech_oncology'
  | 'pharma'
  | 'healthtech_samd'
  | 'diagnostics_genomics'
  | 'cro_lifesciences';

export interface AcademyModule {
  id: string;
  academyNumber: number; // 1 - 12
  academyName: string;
  academySubtitle: string;
  iconName: string;
  description: string;
  targetLevel: 'Foundational' | 'Professional' | 'Executive / Strategic';
  estimatedHours: number;
  learningObjectives: string[];
  prerequisites: string[];
  lessons: {
    id: string;
    title: string;
    durationMinutes: number;
    summary: string;
    keyPoints: string[];
    clinicalOrCommercialExample: string;
    practicalExercisePrompt?: string;
    complianceWarning?: string;
  }[];
  workedCaseStudy: {
    title: string;
    context: string;
    challenge: string;
    strategyAndSolution: string;
    commercialOutcome: string;
    executiveTakeaway: string;
  };
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  relatedFrameworks: string[];
}

export interface PracticeLabExercise {
  id: string;
  number: number;
  title: string;
  category: 'Strategy & Planning' | 'Clinical & Medical Affairs' | 'Account & Hospital Procurement' | 'Economics & Market Access' | 'Compliance & Ethics' | 'Sales Operations & Leadership';
  summary: string;
  objective: string;
  deliverableType: string;
  timeEstimateMinutes: number;
  industryContext: string;
  scenarioData: Record<string, any>;
  promptInstructions: string[];
  evaluationRubric: {
    criterion: string;
    weightPercent: number;
    guideline: string;
  }[];
}

export interface TrackInfo {
  id: HealthcareTrack;
  title: string;
  tagline: string;
  avgBaseComp: string;
  avgTotalComp: string;
  quotaExpectation: string;
  fieldEnvironment: string;
  topCompanies: string[];
  dayInTheLife: string[];
  hiringCriteria: string[];
  overview: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  executiveSummary: string;
  coreConcepts: {
    heading: string;
    body: string;
    clinicalExample?: string;
    proTip?: string;
  }[];
  frameworkConnection?: string;
  quiz?: QuizQuestion[];
}

export interface CaseStudy {
  id: string;
  title: string;
  companyContext: string;
  scenario: string;
  challenge: string;
  strategyUsed: string[];
  outcomeMetrics: string;
  executiveTakeaway: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  durationHours: number;
  experienceLevel: 'Foundation' | 'Intermediate' | 'Advanced' | 'Mastery';
  relevantTracks: HealthcareTrack[];
  description: string;
  lessons: Lesson[];
  caseStudy: CaseStudy;
  finalExamQuestions: QuizQuestion[];
}

export interface RoleplayScenario {
  id: string;
  title: string;
  track: HealthcareTrack;
  personaName: string;
  personaRole: string;
  personaHospital: string;
  avatarSeed: string;
  difficulty: 'Junior Rep' | 'Senior Rep' | 'President\'s Club Level';
  demeanor: string;
  clinicalContext: string;
  objectionTrigger: string;
  initialMessage: string;
  keyWinCriteria: string[];
  complianceTrap: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: 'OR & Surgical' | 'Reimbursement & Coding' | 'Regulatory & Legal' | 'Hospital Admin & Supply Chain' | 'Biotech & Pharma';
  definition: string;
  commercialApplication: string;
  exampleSentence: string;
}

export interface Battlecard {
  id: string;
  objection: string;
  category: 'Price & VAC' | 'Incumbent Loyalty' | 'Clinical Skepticism' | 'Gatekeeper / Access' | 'Reimbursement & Formularies';
  tracks: HealthcareTrack[];
  psychologicalRoot: string;
  amateurMistake: string;
  topPerformerScript: string;
  powerQuestions: string[];
  requiredEvidence: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  targetCompetency: 'Hunter Drive & Grit' | 'Clinical Acumen' | 'VAC & Economic Savvy' | 'Integrity & Ethics' | 'Gallup Strengths';
  askedBy: string[];
  interviewerIntent: string;
  starModelAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  fatalRedFlags: string[];
}

export interface EnterpriseFrameworkConfig {
  companyName: string;
  productName: string;
  productType: 'biotech_biologic' | 'med_device_implant' | 'surgical_robotics' | 'healthtech_samd';
  indication: string;
  primaryClinicalEndpoint: string;
  keyCompetitor: string;
  coreDifferentiator: string;
  vacEconomicMetric: string;
  topObjection: string;
  approvedRebuttal: string;
  targetHCP: string;
  customPassingScore: number;
}

export interface UserProfile {
  name: string;
  background: 'college_grad' | 'b2b_sales' | 'clinical_allied_health' | 'athlete_military' | 'pharma_to_device' | 'other';
  experienceLevel: 'beginner_foundation' | 'b2b_experienced' | 'senior_veteran' | 'clinical_to_commercial';
  hasPriorSalesExperience: boolean;
  skipBeginnerModules: boolean;
  exemptionsGranted: string[];
  primarySkillPillar: 'or_clinical_mastery' | 'vac_financial_closing' | 'shelby_haas_objection_reversal' | 'enterprise_strategic_accounts';
  targetTrack: HealthcareTrack;
  incomeGoal: string;
  targetTimeline: 'urgent_30_days' | 'steady_60_days' | 'flexible_90_days';
  currentConfidenceLevel: number;
  completedLessons: string[];
  completedQuizzes: Record<string, number>;
  certifiedModules: string[];
  diagnosticScore?: number;
}

export type ReachoutStatus =
  | 'identified'
  | 'drafted'
  | 'sent'
  | 'responded'
  | 'call_scheduled'
  | 'interviewing'
  | 'offer_extended'
  | 'archived';

export interface NetworkContact {
  id: string;
  name: string;
  title: string;
  company: string;
  track: HealthcareTrack;
  location: string;
  linkedInUrl?: string;
  email?: string;
  type: 'recruiter' | 'hiring_manager' | 'territory_rep' | 'kol_physician';
  status: ReachoutStatus;
  notes: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  strategicAngle?: string;
  draftedSubject?: string;
  draftedBody?: string;
  addedDate: string;
}

export interface SuggestedConnection {
  id: string;
  name: string;
  title: string;
  company: string;
  track: HealthcareTrack;
  location: string;
  type: 'recruiter' | 'hiring_manager' | 'territory_rep';
  strategicReason: string;
  conversationHooks: string[];
  recommendedApproach: string;
}

export type OutreachTone =
  | 'shelby_haas_detachment'
  | 'recruiter_direct_hook'
  | 'sales_manager_value'
  | 'surgeon_referral'
  | 'followup_soft'
  | 'followup_breakup';

export interface EmailDraftRequest {
  contactName: string;
  contactTitle: string;
  company: string;
  track: HealthcareTrack;
  tone: OutreachTone;
  userBackgroundHook?: string;
  territory?: string;
}

export interface EmailDraftResponse {
  subjectLines: string[];
  emailBody: string;
  inMailBody: string;
  followUpCadence: { step: number; timing: string; message: string }[];
  strategicRationale: string;
  industryProTip: string;
}

// Sales Intelligence Insights Types
export interface HospitalSystemPenetration {
  id: string;
  hospitalName: string;
  systemAffiliation: string; // e.g. 'Mass General Brigham', 'HCA Healthcare', 'Kaiser Permanente'
  city: string;
  state: string;
  distanceMiles: number;
  beds: number;
  annualOpProcedures: number;
  penetrationRate: number; // 0-100%
  dominantVendors: {
    vendor: string;
    share: number;
    status: 'incumbent' | 'vulnerable' | 'dominant' | 'emerging';
  }[];
  primaryGPO: 'Vizient' | 'Premier' | 'HealthTrust' | 'Capstone' | 'Direct';
  vacStatus: 'Open for Review' | 'Sole Source Contracted' | 'RFP Scheduled' | 'Dual Source Approved' | 'Off-Contract Trial';
  repAccessPolicy: 'Strict Symplr' | 'Vendormate / GHX' | 'Pre-appointment Only' | 'Open Surgeon Invitation';
  opportunityScore: number; // 1-100
  keySurgeonInfluencers: string[];
}

export interface RegionalCompetitorActivity {
  id: string;
  competitorName: string;
  marketShare: number; // percentage
  activityLevel: 'Aggressive Displacement' | 'High Defense' | 'Moderate' | 'Vulnerable / Rep Turnover';
  recentMovements: string[];
  vulnerabilities: string[];
  displacementTactics: string;
}

export interface TerritoryActionPlanItem {
  priority: 'Immediate (Week 1)' | 'Tactical (Week 2-4)' | 'Strategic (Month 2-3)';
  targetAccount: string;
  action: string;
  championCallPoint: string;
  rationale: string;
}

export interface SalesIntelligenceReport {
  regionName: string;
  coordinates: { lat: number; lng: number };
  isGpsDerived: boolean;
  accuracyRadiusMeters?: number;
  lastUpdated: string;
  overallMarketSummary: string;
  totalHospitalSystems: number;
  ascPenetrationTrend: string;
  avgVacApprovalCycleMonths: number;
  regionalGpoDominance: { gpo: string; percentage: number }[];
  hospitalPenetration: HospitalSystemPenetration[];
  competitorActivity: RegionalCompetitorActivity[];
  territoryActionPlan: TerritoryActionPlanItem[];
  shelbyHaasFieldTactic: string;
}
