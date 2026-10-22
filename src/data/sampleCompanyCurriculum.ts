import { ApprovedDocument, CompanyBrandingConfig, GeneratedLesson, GeneratedQuizQuestion, GeneratedRoleplayScenario } from '../types/enterpriseCurriculum';

export const DEFAULT_BRANDING: CompanyBrandingConfig = {
  companyName: 'AuraBio Pharmaceuticals (Demo Fictional Co.)',
  customTrackTitle: 'OncoVance™ Precision Monoclonal Antibody Launch Curriculum',
  brandColor: '#1e40af', // Accessible dark blue
  accentColor: '#0284c7', // Sky blue
  fictionalDisclaimer: 'Fictional demo company and product for enterprise training pilot simulation. No real endorsement or trademark implied.',
};

export const INITIAL_APPROVED_DOCUMENTS: ApprovedDocument[] = [
  {
    id: 'doc-pi-1',
    title: 'OncoVance (vedotin-alfa 100mg) Full Prescribing Information [Demo Approved Copy]',
    docType: 'prescribing_info',
    version: 'v2.1',
    status: 'published',
    lastUpdated: '2026-10-14T09:00:00Z',
    reviewerNotes: 'Approved by Medical, Legal, and Regulatory Review Committee (MLR-2026-0891). Strict limitation to second-line metastatic colorectal cancer with confirmed KRAS G12C mutation.',
    passages: [
      {
        id: 'pas-1',
        sectionName: 'Section 1: Indications and Usage',
        text: 'OncoVance is indicated for the treatment of adult patients with metastatic colorectal cancer (mCRC) harboring a documented KRAS G12C mutation who have received prior fluoropyrimidine-, oxaliplatin-, and irinotecan-based chemotherapy. (FDA Cleared Indication).',
        citationCode: 'PI-SEC-1.1'
      },
      {
        id: 'pas-2',
        sectionName: 'Section 4: Contraindications & Black Box Warnings',
        text: 'WARNING: EMBRYO-FETAL TOXICITY and SEVERE NEUTROPENIA. OncoVance can cause fetal harm when administered to a pregnant female. Severe neutropenia (Grade 3-4) occurred in 18% of patients. Monitor complete blood count prior to each cycle.',
        citationCode: 'PI-SEC-4.0-BBW'
      },
      {
        id: 'pas-3',
        sectionName: 'Section 6: Adverse Reactions & Fair Balance',
        text: 'The most common adverse reactions (>=20%) observed in clinical trials were fatigue (41%), diarrhea (38%), peripheral neuropathy (31%), nausea (29%), and elevated ALT/AST (24%). Permanent discontinuation due to an adverse event was required in 6.2% of patients.',
        citationCode: 'PI-SEC-6.1'
      },
      {
        id: 'pas-4',
        sectionName: 'Section 8: Use in Specific Populations',
        text: 'No dose adjustment is required in patients with mild hepatic impairment (total bilirubin <= ULN and AST > ULN). Safety and efficacy have not been established in pediatric patients (<18 years of age).',
        citationCode: 'PI-SEC-8.6'
      }
    ],
    versionHistory: [
      {
        version: 'v1.0',
        changedAt: '2026-09-01T12:00:00Z',
        changedBy: 'Regulatory Affairs Manager (Fictional)',
        changeSummary: 'Initial draft import from clinical dossier',
        previousStatus: 'draft',
        newStatus: 'medical'
      },
      {
        version: 'v2.0',
        changedAt: '2026-09-20T14:30:00Z',
        changedBy: 'Chief Compliance Counsel (Fictional)',
        changeSummary: 'Added Black Box warning text and mandatory fair balance section',
        previousStatus: 'medical',
        newStatus: 'approved'
      },
      {
        version: 'v2.1',
        changedAt: '2026-10-14T09:00:00Z',
        changedBy: 'VP Commercial Training (Fictional)',
        changeSummary: 'Published to active field rep training portal',
        previousStatus: 'approved',
        newStatus: 'published'
      }
    ]
  },
  {
    id: 'doc-trial-1',
    title: 'PHASE-3 ARROW-COLON Pivotal Clinical Trial Summary [Demo Study Data]',
    docType: 'clinical_trial_summary',
    version: 'v1.4',
    status: 'published',
    lastUpdated: '2026-10-10T16:00:00Z',
    reviewerNotes: 'Published in New England Journal of Medicine (NEJM fictional reference). All rep statements regarding progression-free survival must cite Table 2.',
    passages: [
      {
        id: 'pas-5',
        sectionName: 'Primary Endpoint: Progression-Free Survival (PFS)',
        text: 'Median Progression-Free Survival (PFS) was 6.9 months (95% CI: 5.8-7.9) in the OncoVance plus cetuximab cohort compared with 4.1 months (95% CI: 3.3-4.8) with standard of care chemotherapy (Hazard Ratio: 0.58; 95% CI: 0.44-0.77; p < 0.001).',
        citationCode: 'TRIAL-ARROW-PFS'
      },
      {
        id: 'pas-6',
        sectionName: 'Secondary Endpoint: Overall Response Rate (ORR)',
        text: 'Confirmed objective response rate was 32.4% (95% CI: 26.1-39.2) in the OncoVance cohort vs 9.8% in the standard-of-care control arm by independent central radiological review (BICR).',
        citationCode: 'TRIAL-ARROW-ORR'
      },
      {
        id: 'pas-7',
        sectionName: 'Quality of Life & Hospital Length of Stay',
        text: 'EORTC QLQ-C30 physical functioning score showed a median 3.2-month delay in meaningful clinical deterioration in the treatment arm compared to control.',
        citationCode: 'TRIAL-ARROW-QOL'
      }
    ],
    versionHistory: [
      {
        version: 'v1.4',
        changedAt: '2026-10-10T16:00:00Z',
        changedBy: 'Senior Medical Director (Fictional)',
        changeSummary: 'Verified hazard ratio confidence intervals and Kaplan-Meier curves',
        previousStatus: 'regulatory',
        newStatus: 'published'
      }
    ]
  },
  {
    id: 'doc-messaging-1',
    title: 'Core Commercial Detailing Messaging & Fair Balance Guidelines [Demo Playbook]',
    docType: 'approved_messaging',
    version: 'v1.1',
    status: 'published',
    lastUpdated: '2026-10-12T11:00:00Z',
    reviewerNotes: 'Commercial sales reps MUST present Fair Balance immediately following any efficacy claim. Zero promotional statements for non-small cell lung cancer (NSCLC) permitted (NSCLC is an unapproved investigational indication).',
    passages: [
      {
        id: 'pas-8',
        sectionName: 'Approved Message 1: Clinical Efficacy Framing',
        text: 'When speaking with medical oncologists, highlight: "In the Phase 3 ARROW trial, OncoVance demonstrated a 42% reduction in the risk of disease progression or death (HR 0.58; p < 0.001) in second-line KRAS G12C mCRC." Immediately follow with safety notice: "Please note that neutropenia occurred in 18% of patients, requiring routine CBC monitoring prior to each infusion."',
        citationCode: 'MSG-PILLAR-1'
      },
      {
        id: 'pas-9',
        sectionName: 'Approved Message 2: Buy-and-Bill & Prior Auth Assistance',
        text: 'For oncology practice managers and financial navigators: AuraBio Patient First Foundation offers rapid 24-hour benefit verification and co-pay assistance for commercially insured eligible patients. OncoVance has an assigned permanent J-code (J9991) with Medicare Part B ASP+6% reimbursement.',
        citationCode: 'MSG-REIMBURSE-JCODE'
      }
    ],
    versionHistory: [
      {
        version: 'v1.1',
        changedAt: '2026-10-12T11:00:00Z',
        changedBy: 'Chief Compliance Officer (Fictional)',
        changeSummary: 'Mandated immediate juxtaposition of adverse events with efficacy claims (Fair Balance rule).',
        previousStatus: 'approved',
        newStatus: 'published'
      }
    ]
  },
  {
    id: 'doc-objections-1',
    title: 'Approved Field Objection Playbook & Regulatory Boundaries [Demo Playbook]',
    docType: 'objection_responses',
    version: 'v1.0',
    status: 'published',
    lastUpdated: '2026-10-15T08:30:00Z',
    reviewerNotes: 'Pre-cleared objection reversals for field representatives. Deviation from approved responses or promising speaker fees or consulting gifts constitutes a compliance violation.',
    passages: [
      {
        id: 'pas-10',
        sectionName: 'Objection 1: "My patients cannot tolerate another toxic line of therapy after FOLFOX/FOLFIRI."',
        text: 'Approved Response: "I completely understand your concern regarding cumulative neuropathy and fatigue, Dr. [Name]. In our Phase 3 trial, only 6.2% of patients discontinued treatment due to adverse events, and median physical functioning was maintained 3.2 months longer than conventional salvage chemotherapy (PI Section 6.1 & Trial Table 4). We also provide a dose reduction algorithm in Section 2.2 of the PI if Grade 2 diarrhea arises."',
        citationCode: 'OBJ-TOLERABILITY-6.2'
      },
      {
        id: 'pas-11',
        sectionName: 'Objection 2: Unsolicited Inquiries Regarding Off-Label Lung Cancer Use',
        text: 'Mandatory Compliance Protocol: If an oncologist asks if OncoVance works in lung cancer: Rep MUST state: "Dr. [Name], OncoVance is FDA-approved only for second-line metastatic colorectal cancer with a KRAS G12C mutation. I cannot discuss unapproved indications. If you have an unsolicited scientific question regarding investigational tumor types, I can submit an electronic Medical Information Request (MIR) to our Medical Affairs team."',
        citationCode: 'OBJ-OFFLABEL-PROTOCOL'
      },
      {
        id: 'pas-12',
        sectionName: 'Objection 3: Requests for Advisory Board Inducements or Honoraria',
        text: 'Mandatory Anti-Kickback Rule: Representatives may NEVER offer or imply that prescribing volume or formulary support will qualify a physician for paid speaking or advisory boards. Any offer of value to induce prescriptions violates the federal Anti-Kickback Statute (42 U.S.C. § 1320a-7b).',
        citationCode: 'OBJ-AKS-COMPLIANCE'
      }
    ],
    versionHistory: [
      {
        version: 'v1.0',
        changedAt: '2026-10-15T08:30:00Z',
        changedBy: 'Commercial Training & Legal (Fictional)',
        changeSummary: 'Published pre-cleared field objections with strict MIR referral protocols.',
        previousStatus: 'regulatory',
        newStatus: 'published'
      }
    ]
  }
];

export const INITIAL_GENERATED_LESSONS: GeneratedLesson[] = [
  {
    id: 'gen-les-1',
    title: 'Lesson 1: Indication & Biomarker Selection Criteria',
    learningObjective: 'Master the FDA-cleared second-line mCRC indication and patient eligibility requirements without venturing into unapproved tumor types.',
    content: 'OncoVance is specifically approved for adult patients with metastatic colorectal cancer harboring the KRAS G12C mutation following progression on fluoropyrimidine, oxaliplatin, and irinotecan regimens. Next-generation sequencing (NGS) or PCR tissue testing must confirm the G12C variant. Commercial reps must never suggest testing or treatment for other KRAS mutations (such as G12D or G12V) or other cancer types.',
    sourcePassages: [
      {
        passageId: 'pas-1',
        citationCode: 'PI-SEC-1.1',
        snippet: 'Indicated for adult patients with metastatic colorectal cancer (mCRC) harboring a documented KRAS G12C mutation...'
      }
    ]
  },
  {
    id: 'gen-les-2',
    title: 'Lesson 2: ARROW-COLON Trial Evidence & Efficacy Claims',
    learningObjective: 'Communicate the 6.9-month median PFS and 42% risk reduction with verbatim statistical precision and mandatory fair balance.',
    content: 'In the pivotal Phase 3 ARROW trial, patients randomized to OncoVance achieved a statistically significant 6.9 months median PFS compared to 4.1 months in the control group (HR 0.58; p < 0.001). The confirmed overall response rate was 32.4% vs 9.8%. Whenever presenting these numbers, representatives must simultaneously disclose the 18% incidence of Grade 3-4 neutropenia and outline the routine complete blood count monitoring protocol.',
    sourcePassages: [
      {
        passageId: 'pas-5',
        citationCode: 'TRIAL-ARROW-PFS',
        snippet: 'Median Progression-Free Survival (PFS) was 6.9 months (HR 0.58; 95% CI: 0.44-0.77; p < 0.001)...'
      },
      {
        passageId: 'pas-2',
        citationCode: 'PI-SEC-4.0-BBW',
        snippet: 'WARNING: EMBRYO-FETAL TOXICITY and SEVERE NEUTROPENIA (18%). Monitor complete blood count...'
      }
    ]
  },
  {
    id: 'gen-les-3',
    title: 'Lesson 3: Tolerability Defense & Medical Affairs Handoff',
    learningObjective: 'Respond to physician tolerability concerns using trial discontinuation data and execute proper Medical Information Request (MIR) handoffs.',
    content: 'When clinicians express hesitation regarding patient frailty, reps cite the low 6.2% treatment discontinuation rate due to adverse events and the 3.2-month delay in quality of life deterioration. Crucially, if the physician asks about unapproved combination regimens or non-colorectal indications, the representative must adhere strictly to compliance protocol and initiate an electronic Medical Information Request rather than providing oral opinions.',
    sourcePassages: [
      {
        passageId: 'pas-10',
        citationCode: 'OBJ-TOLERABILITY-6.2',
        snippet: 'In our Phase 3 trial, only 6.2% of patients discontinued treatment due to adverse events...'
      },
      {
        passageId: 'pas-11',
        citationCode: 'OBJ-OFFLABEL-PROTOCOL',
        snippet: 'I cannot discuss unapproved indications. If you have an unsolicited scientific question... I can submit an electronic MIR.'
      }
    ]
  }
];

export const INITIAL_GENERATED_QUIZZES: GeneratedQuizQuestion[] = [
  {
    id: 'gen-quiz-1',
    question: 'According to Section 1.1 of the approved Prescribing Information, which patient population is indicated for OncoVance?',
    options: [
      'First-line metastatic colorectal cancer regardless of KRAS mutation status',
      'Adult patients with mCRC harboring documented KRAS G12C mutation following prior chemotherapy',
      'Advanced non-small cell lung cancer with any KRAS alteration',
      'Any solid tumor refractory to standard immunotherapy'
    ],
    correctIndex: 1,
    explanation: 'Section 1.1 explicitly limits OncoVance to adult patients with mCRC with a documented KRAS G12C mutation who received prior fluoropyrimidine-, oxaliplatin-, and irinotecan-based therapy.',
    mandatoryCitation: 'PI-SEC-1.1',
    passageSnippet: 'OncoVance is indicated for adult patients with metastatic colorectal cancer harboring a documented KRAS G12C mutation...'
  },
  {
    id: 'gen-quiz-2',
    question: 'What is the black box warning safety monitoring requirement outlined in Section 4.0?',
    options: [
      'Daily liver biopsies for the first 30 days',
      'Complete blood count (CBC) monitoring prior to each infusion due to 18% Grade 3-4 neutropenia',
      'Continuous 24-hour cardiac telemetry during infusion',
      'Mandatory overnight hospitalization for all cycles'
    ],
    correctIndex: 1,
    explanation: 'Section 4.0 contains a Black Box Warning for Embryo-Fetal Toxicity and Severe Neutropenia (18%), requiring CBC monitoring prior to each cycle.',
    mandatoryCitation: 'PI-SEC-4.0-BBW',
    passageSnippet: 'WARNING: EMBRYO-FETAL TOXICITY and SEVERE NEUTROPENIA. Severe neutropenia occurred in 18% of patients. Monitor complete blood count prior to each cycle.'
  },
  {
    id: 'gen-quiz-3',
    question: 'In the ARROW-COLON Phase 3 trial, what was the Hazard Ratio (HR) for Progression-Free Survival?',
    options: [
      'HR 0.92 (p = 0.45)',
      'HR 0.58 (95% CI: 0.44-0.77; p < 0.001)',
      'HR 0.12 (p < 0.0001)',
      'HR 0.79 (not statistically significant)'
    ],
    correctIndex: 1,
    explanation: 'The trial summary documents a median PFS of 6.9 vs 4.1 months with an HR of 0.58, representing a 42% reduction in risk of progression or death.',
    mandatoryCitation: 'TRIAL-ARROW-PFS',
    passageSnippet: 'Hazard Ratio: 0.58; 95% CI: 0.44-0.77; p < 0.001 compared with standard of care chemotherapy.'
  },
  {
    id: 'gen-quiz-4',
    question: 'If a medical oncologist asks you whether OncoVance can be prescribed for a KRAS G12C non-small cell lung cancer patient, what is the only compliant response?',
    options: [
      'Confirm off-the-record that mechanistic data suggests it will work in lung cancer',
      'Explain that OncoVance is FDA-cleared only for mCRC and offer to submit an electronic Medical Information Request (MIR) to Medical Affairs',
      'Provide a reprint of an animal lung cancer study without Medical Affairs approval',
      'Encourage the doctor to bill the hospital under general oncology codes'
    ],
    correctIndex: 1,
    explanation: 'Promoting unapproved indications violates 21 U.S.C. § 352. Commercial representatives must state the approved indication and refer unsolicited inquiries to Medical Affairs via an MIR.',
    mandatoryCitation: 'OBJ-OFFLABEL-PROTOCOL',
    passageSnippet: 'I cannot discuss unapproved indications. If you have an unsolicited scientific question... I can submit an electronic MIR to our Medical Affairs team.'
  },
  {
    id: 'gen-quiz-5',
    question: 'A high-volume oncologist offers to switch all eligible patients to OncoVance if your company sponsors their private practice weekend retreat. How must you respond under federal law?',
    options: [
      'Accept immediately because it guarantees territory quota attainment',
      'Decline unequivocally: providing remuneration or personal inducements to drive referrals is a federal felony under the Anti-Kickback Statute (42 U.S.C. § 1320a-7b)',
      'Offer to reimburse the retreat as an educational consulting fee without a formal contract',
      'Agree to cover the catering expenses under your personal credit card'
    ],
    correctIndex: 1,
    explanation: 'Providing any transfer of value to induce prescriptions violates the Anti-Kickback Statute. Representatives must refuse and report improper inducement attempts.',
    mandatoryCitation: 'OBJ-AKS-COMPLIANCE',
    passageSnippet: 'Any offer of value to induce prescriptions violates the federal Anti-Kickback Statute (42 U.S.C. § 1320a-7b).'
  }
];

export const INITIAL_GENERATED_ROLEPLAYS: GeneratedRoleplayScenario[] = [
  {
    id: 'scen-aura-1',
    personaName: 'Dr. Evelyn Vance, MD (Fictional Character)',
    specialty: 'Director of Gastrointestinal Oncology',
    institution: 'Highland Academic Cancer Pavilion (Fictional IDN)',
    clinicalAttitude: 'Skeptical, evidence-driven academic researcher with high concern for therapy fatigue in refractory patients.',
    openingObjection: '"I have seen too many targeted therapies fail in colorectal cancer due to feedback EGFR activation. Why should I put a heavily pretreated patient through more toxicity with OncoVance?"',
    approvedResolutionPassages: ['TRIAL-ARROW-PFS', 'OBJ-TOLERABILITY-6.2', 'PI-SEC-4.0-BBW'],
    unacceptableOffLabelTopics: ['Non-small cell lung cancer', 'First-line combination therapy', 'KRAS G12D mutations']
  }
];
