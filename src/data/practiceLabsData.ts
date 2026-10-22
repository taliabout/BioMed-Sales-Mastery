import { PracticeLabExercise } from '../types';

export const PRACTICE_LAB_EXERCISES: PracticeLabExercise[] = [
  {
    id: 'lab_1_territory_plan',
    number: 1,
    title: 'Construct an Annual Healthcare Territory Plan',
    category: 'Strategy & Planning',
    summary: 'Build a data-driven territory business plan balancing high-decile prescribers, hospital systems, and travel efficiency.',
    objective: 'Segment 150 accounts into Tier 1 (Deciles 8-10), Tier 2 (Deciles 5-7), and Tier 3, allocating routing frequency to hit a $3.2M quota.',
    deliverableType: 'Executive Territory Business Plan & Routing Schedule',
    timeEstimateMinutes: 45,
    industryContext: 'Specialty biopharma territory covering 3 metropolitan zones and 14 academic/community hospital networks.',
    scenarioData: {
      annualQuota: '$3,200,000',
      totalAccounts: 150,
      tier1Count: 28,
      tier2Count: 54,
      tier3Count: 68,
      baselineTRx: '1,420 bottles/year',
      growthTarget: '+22% YoY'
    },
    promptInstructions: [
      'Allocate target monthly call frequencies for Tier 1 (2-3 calls/mo), Tier 2 (1 call/mo), and Tier 3 (digital/remote).',
      'Calculate required daily call velocity assuming 20 field days per month.',
      'Identify 3 key hospital systems requiring strategic institutional alignment to unlock outpatient prescription pull-through.'
    ],
    evaluationRubric: [
      { criterion: 'Targeting Rigor & Decile Alignment', weightPercent: 35, guideline: 'Over 70% of rep time allocated to top 20% high-volume accounts.' },
      { criterion: 'Routing Geographic Efficiency', weightPercent: 35, guideline: 'Cluster-based routing minimizing windshield travel time.' },
      { criterion: 'Revenue & Quota Math Realism', weightPercent: 30, guideline: 'Realistic conversion assumptions backed by leading indicators.' }
    ]
  },
  {
    id: 'lab_2_pharma_presentation',
    number: 2,
    title: 'Develop a Compliant 2-Minute Clinical Detailing Script',
    category: 'Clinical & Medical Affairs',
    summary: 'Draft and refine a high-density, on-label clinical presentation for a time-constrained specialist.',
    objective: 'Structure a 90-to-120-second clinical detail incorporating unmet need, Phase III trial efficacy, safety profile, and a low-friction call-to-action.',
    deliverableType: 'Verbal Detailing Script & Visual Slide Flow',
    timeEstimateMinutes: 30,
    industryContext: 'Cardiology outpatient practice where physicians allow 90 seconds between patient appointments.',
    scenarioData: {
      drugName: 'CardioVasq (hypothetical SGLT2i/GLP1 combination)',
      indication: 'Reduction of cardiovascular death and heart failure hospitalization in adult patients with Type 2 diabetes.',
      trialName: 'PROVECTUS-CV (N=6,420)',
      endpoints: '24% Relative Risk Reduction in MACE (HR 0.76; 95% CI 0.65-0.89; p=0.001); Absolute Risk Reduction 3.2%; NNT = 31.'
    },
    promptInstructions: [
      'Write a 15-second opening hook referencing a specific patient profile.',
      'State the primary endpoint using both Relative and Absolute Risk metrics.',
      'Proactively state the most common adverse reaction (mycotic infections 4.1% vs 1.2% placebo).',
      'Close with a concrete, low-friction next step for tomorrow’s clinic.'
    ],
    evaluationRubric: [
      { criterion: 'FDA On-Label Compliance', weightPercent: 40, guideline: 'Zero off-label claims, fair balance included.' },
      { criterion: 'Biostatistical Clarity', weightPercent: 30, guideline: 'ARR and NNT stated alongside RRR.' },
      { criterion: 'Conciseness & Flow', weightPercent: 30, guideline: 'Pacing under 120 seconds with crisp closing ask.' }
    ]
  },
  {
    id: 'lab_3_package_insert',
    number: 3,
    title: 'Audit an FDA Prescribing Information (Package Insert)',
    category: 'Compliance & Ethics',
    summary: 'Extract critical commercial boundaries and safety data from an official FDA Drug Label.',
    objective: 'Analyze Sections 1 (Indications), 4 (Contraindications), 5 (Warnings), and 14 (Clinical Studies) to identify promotional boundaries.',
    deliverableType: 'Regulatory Boundary Matrix & Red-Flag Audit',
    timeEstimateMinutes: 40,
    industryContext: 'Oncology biologic with an accelerated approval for refractory metastatic non-small cell lung cancer (NSCLC).',
    scenarioData: {
      boxedWarning: 'Immune-mediated adverse reactions including pneumonitis, colitis, and hepatitis.',
      indicationRestriction: 'Adult patients with metastatic NSCLC whose tumors express PD-L1 (TPS >= 50%) with no EGFR or ALK genomic tumor aberrations.',
      clinicalStudiesSection: 'Study KEY-99: Median OS 20.0 months vs 12.2 months chemotherapy.'
    },
    promptInstructions: [
      'Define the exact patient eligibility criteria that must be confirmed prior to prescription.',
      'Identify 3 patient cohorts where the product is strictly contraindicated or unapproved.',
      'Draft a compliant response when a doctor asks: "Can I use this in EGFR-positive patients who failed osimertinib?"'
    ],
    evaluationRubric: [
      { criterion: 'Regulatory Precision', weightPercent: 40, guideline: 'Correctly identifies strict biomarker and line-of-therapy boundaries.' },
      { criterion: 'Fair Balance Representation', weightPercent: 30, guideline: 'Accurately articulates Boxed Warning monitoring requirements.' },
      { criterion: 'Unsolicited Medical Referral Protocol', weightPercent: 30, guideline: 'Appropriately refers off-label questions to Medical Affairs.' }
    ]
  },
  {
    id: 'lab_4_competitor_comparison',
    number: 4,
    title: 'Head-to-Head Evidence Comparison Matrix',
    category: 'Clinical & Medical Affairs',
    summary: 'Evaluate competitor trial endpoints side-by-side using substantiated clinical literature without misleading claims.',
    objective: 'Build an objective clinical comparison table highlighting study design differences, patient populations, and primary endpoints.',
    deliverableType: 'Clinical Differentiation Battlecard',
    timeEstimateMinutes: 35,
    industryContext: 'Immunology market with 3 competing anti-IL-23 therapies for severe plaque psoriasis.',
    scenarioData: {
      productA: 'PASI 90 at Week 16: 74%; Dosing: Every 12 weeks; Injection volume: 1.0 mL',
      productB: 'PASI 90 at Week 16: 68%; Dosing: Every 8 weeks; Injection volume: 2.0 mL',
      keyPitfall: 'No head-to-head randomized trial exists between Product A and Product B; only cross-trial comparisons are available.'
    },
    promptInstructions: [
      'Explain why cross-trial comparisons cannot be presented as definitive statistical superiority.',
      'Highlight legitimate on-label differentiators (dosing interval, injection volume, patient administration device).',
      'Formulate compliant language acknowledging the competitor\'s established clinical track record.'
    ],
    evaluationRubric: [
      { criterion: 'Scientific Honesty & Cross-Trial Caution', weightPercent: 40, guideline: 'Explicitly notes cross-trial limitations and lack of direct head-to-head data.' },
      { criterion: 'Value Articulation', weightPercent: 30, guideline: 'Focuses on validated administration and dosing advantages.' },
      { criterion: 'Professionalism', weightPercent: 30, guideline: 'Respectful, non-disparaging competitor positioning.' }
    ]
  },
  {
    id: 'lab_5_clinical_trial',
    number: 5,
    title: 'Deconstruct a Phase III Clinical Trial Publication',
    category: 'Clinical & Medical Affairs',
    summary: 'Analyze a New England Journal of Medicine trial reprint to evaluate statistical power, endpoints, and Forest Plot sub-analyses.',
    objective: 'Dissect primary vs. secondary endpoints, Kaplan-Meier separation, p-values, and subgroup confidence intervals.',
    deliverableType: 'Evidence Appraisal Summary & Physician Discussion Guide',
    timeEstimateMinutes: 45,
    industryContext: 'Phase III cardiovascular outcomes trial in 8,200 randomized patients with chronic kidney disease.',
    scenarioData: {
      trialDesign: 'Double-blind, placebo-controlled, multi-center, event-driven trial.',
      primaryCompositeEndpoint: 'Sustained eGFR decline >= 50%, end-stage kidney disease, or renal/CV death.',
      hrAndPValue: 'HR 0.61; 95% CI 0.51-0.72; p < 0.0001',
      subgroupAnalysis: 'Diabetic cohort HR 0.64 (CI 0.52-0.79); Non-diabetic cohort HR 0.50 (CI 0.35-0.72).'
    },
    promptInstructions: [
      'Interpret the clinical and statistical significance of the 0.61 Hazard Ratio.',
      'Explain what the 95% Confidence Interval tells the clinician about effect precision.',
      'Prepare a response for a nephrologist asking whether the benefit holds true in non-diabetic patients.'
    ],
    evaluationRubric: [
      { criterion: 'Biostatistical Mastery', weightPercent: 40, guideline: 'Flawless interpretation of HR, CI, and p-value metrics.' },
      { criterion: 'Subgroup Rigor', weightPercent: 30, guideline: 'Correctly interprets pre-specified subgroup interaction tests.' },
      { criterion: 'Clinical Relevance', weightPercent: 30, guideline: 'Translates numbers into actionable patient outcomes.' }
    ]
  },
  {
    id: 'lab_6_hospital_stakeholders',
    number: 6,
    title: 'Hospital System Stakeholder Power Grid & Influence Mapping',
    category: 'Account & Hospital Procurement',
    summary: 'Map the political and economic landscape of a 500-bed regional medical center to orchestrate consensus for a new surgical implant.',
    objective: 'Categorize 8 key hospital personnel into Champions, Economic Buyers, Operational Blockers, and Clinical Users.',
    deliverableType: 'Stakeholder Influence Matrix & Engagement Cadence',
    timeEstimateMinutes: 40,
    industryContext: 'Health system evaluating a migration from traditional stainless-steel spine implants to 3D-printed porous titanium.',
    scenarioData: {
      personnel: [
        'Dr. Marcus Vance (Spine Surgery Division Chief) - Enthusiastic champion',
        'Sarah Miller (VP Supply Chain & VAC Chair) - Strict cost-reduction mandate',
        'Craig Wilson (Director of Sterile Processing) - Frustrated with tray turnaround times',
        'Dr. Rachel Adams (Chief Medical Officer) - Focused on surgical site infections and 30-day readmissions',
        'Tom Higgins (Operating Room Materials Manager) - Loyal to 10-year incumbent vendor'
      ]
    },
    promptInstructions: [
      'Assign each individual to their MEDDPICC stakeholder role.',
      'Identify the specific value proposition needed for each individual (Clinical, Financial, Operational).',
      'Outline an action plan to neutralize Tom Higgins’ loyalty to the incumbent vendor.'
    ],
    evaluationRubric: [
      { criterion: 'Organizational Empathy', weightPercent: 35, guideline: 'Addresses individual stakeholder motivations and departmental pressures.' },
      { criterion: 'Consensus Building Strategy', weightPercent: 35, guideline: 'Creates multi-stakeholder coalition rather than relying solely on surgeons.' },
      { criterion: 'Risk Mitigation', weightPercent: 30, guideline: 'Proactively identifies and neutralizes supply chain blockers.' }
    ]
  },
  {
    id: 'lab_7_strategic_account_plan',
    number: 7,
    title: 'Build a Multi-Facility IDN Strategic Account Plan',
    category: 'Strategy & Planning',
    summary: 'Develop a 12-month commercial roadmap for a 12-hospital Integrated Delivery Network (IDN) with $8M potential.',
    objective: 'Synthesize health system annual priorities, clinical service line goals, GPO alignment, and cross-facility expansion milestones.',
    deliverableType: 'Annual Strategic Key Account Dossier',
    timeEstimateMinutes: 50,
    industryContext: 'Integrated Delivery Network with centralized procurement and 14 Ambulatory Surgery Centers.',
    scenarioData: {
      idnName: 'TriState Health Partners',
      annualSpendInClass: '$6,400,000',
      currentVendorShare: 'Incumbent A 65%, Incumbent B 35%, Our Company 0%',
      centralGPO: 'Premier Healthcare Alliance (Tier 3 contracted)'
    },
    promptInstructions: [
      'Identify 2 pilot facilities within the network to initiate clinical evaluations.',
      'Formulate a standardized contract proposal leveraging their Premier GPO affiliation.',
      'Establish a quarterly review milestone schedule leading to network-wide formulary expansion.'
    ],
    evaluationRubric: [
      { criterion: 'Enterprise Scope', weightPercent: 40, guideline: 'Demonstrates understanding of centralized vs. decentralized hospital governance.' },
      { criterion: 'Contract Alignment', weightPercent: 30, guideline: 'Seamlessly weaves GPO contract tiers into commercial proposal.' },
      { criterion: 'Phased Expansion Logic', weightPercent: 30, guideline: 'Sensible crawl-walk-run deployment across network facilities.' }
    ]
  },
  {
    id: 'lab_8_discovery_meeting',
    number: 8,
    title: 'Orchestrate a Complex Clinical Discovery Meeting',
    category: 'Clinical & Medical Affairs',
    summary: 'Conduct an in-depth diagnostic discovery interview with a clinical department head using SPIN questioning.',
    objective: 'Uncover hidden operational inefficiencies, clinical complications, and staff frustrations without pitching prematurely.',
    deliverableType: 'Discovery Question Protocol & Meeting Transcript',
    timeEstimateMinutes: 35,
    industryContext: 'Meeting with the Chief of Cardiology regarding coronary intravascular imaging and stent thrombosis rates.',
    scenarioData: {
      targetHCP: 'Dr. Sanjay Patel, Chief of Interventional Cardiology',
      departmentProfile: '1,200 PCI procedures annually; current intravascular imaging utilization is only 14% (national average 28%).',
      hiddenPain: 'Junior fellows take 25 minutes to set up imaging consoles, leading operators to skip imaging to maintain catheterization lab schedule.'
    },
    promptInstructions: [
      'Draft 2 Situation Questions, 3 Problem Questions, 3 Implication Questions, and 2 Need-Payoff Questions.',
      'Ensure no product features are mentioned until the clinician explicitly articulates the cost of delayed imaging.',
      'Formulate a bridge statement summarizing their pain and inviting an evaluation.'
    ],
    evaluationRubric: [
      { criterion: 'Question Sequencing (SPIN)', weightPercent: 40, guideline: 'Proper progression from Situation to deep Implication questions.' },
      { criterion: 'Pain Amplification', weightPercent: 35, guideline: 'Guides customer to quantify the financial and clinical cost of the status quo.' },
      { criterion: 'Active Listening & Restraint', weightPercent: 25, guideline: 'Zero premature pitching or feature dumping.' }
    ]
  },
  {
    id: 'lab_9_objection_matrix',
    number: 9,
    title: 'The 20 Escalating Objections Defense Matrix',
    category: 'Strategy & Planning',
    summary: 'Craft calibrated responses, clarifying inquiries, and proof points for the 20 most frequent healthcare sales objections.',
    objective: 'Build an exhaustive objection response guide covering clinical doubt, pricing resistance, VAC freezes, and competitor entrenchment.',
    deliverableType: 'Master Objection Defense Playbook',
    timeEstimateMinutes: 60,
    industryContext: 'Commercial life sciences cross-sector sales operations.',
    scenarioData: {
      objectionCategories: ['Price & Economics', 'Clinical Evidence & Safety', 'Operational & Workflow', 'Contracting & GPO']
    },
    promptInstructions: [
      'For the objection "Our hospital is in a budget freeze": Provide root psychological cause, clarifying question, and reframe.',
      'For the objection "We already tried a competitor product and it failed": Address emotional baggage and clinical distinction.',
      'For the objection "Our physicians refuse to change instruments": Provide surgeon peer-to-peer transition plan.'
    ],
    evaluationRubric: [
      { criterion: 'Psychological Insight', weightPercent: 35, guideline: 'Accurately diagnoses the underlying institutional fear.' },
      { criterion: 'Non-Defensive Framing', weightPercent: 35, guideline: 'Uses validation and curiosity instead of aggressive argument.' },
      { criterion: 'Substantiated Evidence', weightPercent: 30, guideline: 'Anchors solutions in peer-reviewed data and operational realities.' }
    ]
  },
  {
    id: 'lab_10_customer_sprint',
    number: 10,
    title: 'Formulate a 30-Day Customer Engagement Sprint',
    category: 'Strategy & Planning',
    summary: 'Design a disciplined omnichannel 30-day touchpoint cadence to convert a stalled target account into an active prescriber.',
    objective: 'Structure compliant outreach across email, clinical drop-bys, medical education events, and staff support.',
    deliverableType: '30-Day Omnichannel Engagement Calendar',
    timeEstimateMinutes: 30,
    industryContext: 'Outpatient oncology clinic with 4 medical oncologists treating high volumes of colorectal cancer.',
    scenarioData: {
      accountStatus: 'Zero prescriptions written in past 180 days despite Tier 2 formulary coverage.',
      keyStaff: 'Practice Manager, Lead Infusion Nurse, 4 Oncologists'
    },
    promptInstructions: [
      'Map 6 distinct touchpoints across 30 days adhering to frequency guidelines.',
      'Design touchpoints for both clinical prescribers and the practice financial counselor.',
      'Integrate an educational lunch-and-learn complying with PhRMA Code meal caps.'
    ],
    evaluationRubric: [
      { criterion: 'Value-Add Consistency', weightPercent: 40, guideline: 'Every touchpoint provides distinct clinical or operational utility.' },
      { criterion: 'Staff Inclusivity', weightPercent: 30, guideline: 'Engages nurses and practice managers, not just physicians.' },
      { criterion: 'Compliance Integrity', weightPercent: 30, guideline: 'Strict adherence to PhRMA Code on meals and gifts.' }
    ]
  },
  {
    id: 'lab_11_crm_workflow',
    number: 11,
    title: 'Simulate a Veeva CRM & PDMA Compliance Workflow',
    category: 'Sales Operations & Leadership',
    summary: 'Log field call documentation, sample accountability records, and follow-up tasks in a simulated enterprise CRM.',
    objective: 'Practice compliant call documentation adhering strictly to the Prescription Drug Marketing Act (PDMA).',
    deliverableType: 'Completed CRM Call Audit & Reconciliation Report',
    timeEstimateMinutes: 30,
    industryContext: 'Outpatient primary care territory detailing diabetes therapies with physical drug samples.',
    scenarioData: {
      hcp: 'Dr. Arthur Sterling, Internal Medicine',
      samplesProvided: '4 boxes of 10mg tablets (Lot #88412, Expiration 12/2027)',
      discussionTopics: 'HbA1c reduction endpoints, hypoglycemia risk, copay assistance cards'
    },
    promptInstructions: [
      'Write a professional, compliant call summary suitable for internal legal audit.',
      'Highlight 3 statements that MUST NEVER be entered into CRM call notes.',
      'Record physical drug sample disbursement with physician license validation verification.'
    ],
    evaluationRubric: [
      { criterion: 'Audit-Proof Documentation', weightPercent: 40, guideline: 'Completely devoid of inappropriate commercial promises or subjective commentary.' },
      { criterion: 'PDMA Sample Rigor', weightPercent: 35, guideline: 'Accurate lot tracking, expiration recording, and license verification.' },
      { criterion: 'Actionable Next Steps', weightPercent: 25, guideline: 'Specific follow-up milestones documented with clear deadlines.' }
    ]
  },
  {
    id: 'lab_12_dashboard_analysis',
    number: 12,
    title: 'Analyze a Territory Sales Performance Dashboard',
    category: 'Sales Operations & Leadership',
    summary: 'Diagnose revenue leaks, market share decay, and conversion bottlenecks from a simulated business intelligence report.',
    objective: 'Interpret TRx trends, prescriber decile shifts, quota run rates, and competitor displacement patterns.',
    deliverableType: 'Territory Diagnostic Brief & Corrective Action Plan',
    timeEstimateMinutes: 40,
    industryContext: 'End-of-Q2 performance review for a surgical device territory operating at 84% quota attainment.',
    scenarioData: {
      quota: '$1,800,000 / year ($450,000 / quarter)',
      q2Actual: '$378,000 (84% attainment)',
      topAccountTrend: 'Account #1 down 32% YoY; Accounts #2-5 up 14%; ASC accounts up 45%',
      competitorMove: 'Competitor B launched a bundled pricing discount across hospital energy generators'
    },
    promptInstructions: [
      'Identify the root cause of the $72,000 quarterly quota deficit.',
      'Calculate the required weekly run rate for Q3 and Q4 to achieve 100% full-year quota ($1,800,000).',
      'Formulate a 3-point corrective strategy shifting focus toward high-margin ASC accounts.'
    ],
    evaluationRubric: [
      { criterion: 'Quantitative Analytical Accuracy', weightPercent: 40, guideline: 'Flawless calculation of run rates, variances, and growth percentages.' },
      { criterion: 'Root-Cause Identification', weightPercent: 35, guideline: 'Identifies account-specific churn rather than making broad excuses.' },
      { criterion: 'Strategic Realism', weightPercent: 25, guideline: 'Pragmatic, high-leverage corrective action plan.' }
    ]
  },
  {
    id: 'lab_13_qbr_deck',
    number: 13,
    title: 'Prepare an Executive Quarterly Business Review (QBR)',
    category: 'Sales Operations & Leadership',
    summary: 'Build a 5-slide executive presentation summarizing territory performance, market headwinds, and forward forecast.',
    objective: 'Present territory metrics to the VP of Commercial Operations using structured business communication.',
    deliverableType: 'Executive QBR Presentation Deck (Outline & Slides)',
    timeEstimateMinutes: 45,
    industryContext: 'Biotechnology commercial division quarterly business review.',
    scenarioData: {
      territoryRank: '#12 out of 88 nationwide',
      keyWin: 'Formulary approval at University Cancer Center ($620K annual run rate)',
      keyVulnerability: 'Upcoming patent expiration and generic biosimilar entry in Q4'
    },
    promptInstructions: [
      'Structure Slide 1: Financial Performance & Quota Attainment Dashboard.',
      'Structure Slide 2: Top Wins & Account Case Studies.',
      'Structure Slide 3: Territory Risk Analysis (Biosimilar Defense Strategy).',
      'Structure Slide 4: Pipeline Health & Forecasted Revenue for Next Quarter.'
    ],
    evaluationRubric: [
      { criterion: 'Executive Presence & Brevity', weightPercent: 35, guideline: 'Direct, bottom-line-first communication without defensive rambling.' },
      { criterion: 'Commercial Forecasting Rigor', weightPercent: 35, guideline: 'Realistic weighted pipeline probabilities applied to open deals.' },
      { criterion: 'Proactive Risk Defense', weightPercent: 30, guideline: 'Concrete strategy to defend against generic erosion.' }
    ]
  },
  {
    id: 'lab_14_formulary_appeal',
    number: 14,
    title: 'Navigate a Restrictive Formulary & Prior Auth Denial',
    category: 'Economics & Market Access',
    summary: 'Develop a clinical-economic appeal package to overturn an insurance denial for a rare disease patient.',
    objective: 'Draft a Letter of Medical Necessity and compile supporting clinical trial documentation for an insurance medical director.',
    deliverableType: 'Letter of Medical Necessity & Payer Appeal Dossier',
    timeEstimateMinutes: 45,
    industryContext: 'Specialty neurology clinic where a patient with spinal muscular atrophy was denied therapy due to step-therapy mandates.',
    scenarioData: {
      patientProfile: '4-year-old child with progressive motor neuron loss; intolerant to first-line oral therapy due to hepatic toxicity.',
      payerPolicy: 'Requires documentation of permanent treatment failure on 2 prior generic agents before biologic coverage.'
    },
    promptInstructions: [
      'Draft the core argument demonstrating why requiring step therapy in a rapidly progressing neurodegenerative disease causes irreversible harm.',
      'Cite Phase III motor milestone preservation data from peer-reviewed literature.',
      'Provide clear instructions for the clinic nurse coordinator on submitting expedited Level 1 external review.'
    ],
    evaluationRubric: [
      { criterion: 'Clinical Urgency & Evidence', weightPercent: 40, guideline: 'Compelling demonstration of progressive irreversible loss of function.' },
      { criterion: 'Payer Criteria Alignment', weightPercent: 35, guideline: 'Directly addresses and satisfies every exception clause in the payer bulletin.' },
      { criterion: 'Actionable Workflow', weightPercent: 25, guideline: 'Clear, step-by-step guidance for clinic staff.' }
    ]
  },
  {
    id: 'lab_15_capital_equipment_roi',
    number: 15,
    title: 'Model a Capital Equipment ROI & Payback Business Case',
    category: 'Economics & Market Access',
    summary: 'Construct an interactive financial model demonstrating how a $1.2M surgical robotic system achieves break-even in 18 months.',
    objective: 'Model hospital revenue gains from increased case volume, reduced length of stay (LOS), and lower surgical site infection costs.',
    deliverableType: 'Hospital CFO Financial ROI Dossier & Payback Calculator',
    timeEstimateMinutes: 50,
    industryContext: '450-bed community hospital losing high-margin prostate and colorectal surgical cases to a competing academic center.',
    scenarioData: {
      capitalPurchasePrice: '$1,200,000',
      annualServiceContract: '$140,000 (starting Year 2)',
      perProcedureDisposableCost: '$1,800',
      projectedAnnualCases: '220 procedures (120 Urology, 100 Colorectal)',
      hospitalContributionMarginPerCase: '$7,200',
      losReduction: '1.4 days per patient (hospital cost per bed day = $1,900)'
    },
    promptInstructions: [
      'Calculate the annual incremental contribution margin from recaptured surgical cases.',
      'Calculate annual hospital savings from reduced patient length of stay.',
      'Determine the net cash flow and payback period in months.'
    ],
    evaluationRubric: [
      { criterion: 'Financial Engineering Rigor', weightPercent: 40, guideline: 'Accurate net present value (NPV), contribution margin, and payback math.' },
      { criterion: 'CFO Language Alignment', weightPercent: 35, guideline: 'Focuses on hospital balance sheet, CapEx depreciation, and contribution margin.' },
      { criterion: 'Sensitivity Analysis', weightPercent: 25, guideline: 'Tests conservative, expected, and aggressive case volume scenarios.' }
    ]
  },
  {
    id: 'lab_16_healthtech_strategy',
    number: 16,
    title: 'Enterprise Healthcare Software & EHR Integration Strategy',
    category: 'Account & Hospital Procurement',
    summary: 'Architect a C-suite sales strategy for enterprise clinical AI software, addressing cybersecurity, Epic EHR integration, and physician burnout.',
    objective: 'Create a comprehensive enterprise pitch deck and procurement checklist for the Chief Information Officer (CIO) and Chief Medical Officer (CMO).',
    deliverableType: 'HealthTech Enterprise Proposal & Integration Architecture',
    timeEstimateMinutes: 45,
    industryContext: 'Enterprise ambient clinical AI documentation solution selling into a 22-hospital health system.',
    scenarioData: {
      dealSize: '$2,800,000 (3-year SaaS contract)',
      ehrSystem: 'Epic Systems (EHR App Orchard / FHIR APIs)',
      stakeholders: 'CIO (focused on SOC2 Type II, HL7), CMO (focused on physician burnout and documentation time), CFO (focused on billing capture)'
    },
    promptInstructions: [
      'Detail the security and HIPAA compliance architecture to satisfy the Chief Information Security Officer (CISO).',
      'Articulate the clinical productivity ROI: 2 hours of documentation saved per physician per day.',
      'Draft a proposed 60-day pilot deployment for 30 high-volume ambulatory physicians.'
    ],
    evaluationRubric: [
      { criterion: 'Healthcare IT Credibility', weightPercent: 40, guideline: 'Fluent use of FHIR, HL7, Epic integration, and cybersecurity standards.' },
      { criterion: 'Multi-Stakeholder Value', weightPercent: 35, guideline: 'Distinct value propositions for CIO, CMO, and CFO.' },
      { criterion: 'Pilot-to-Enterprise Ramp', weightPercent: 25, guideline: 'Measurable pilot success criteria leading to contract execution.' }
    ]
  },
  {
    id: 'lab_17_vac_dossier',
    number: 17,
    title: 'Prepare a Hospital Value Analysis Committee (VAC) Submission',
    category: 'Account & Hospital Procurement',
    summary: 'Assemble an airtight clinical and economic dossier for hospital Value Analysis Committee approval.',
    objective: 'Compile clinical trial validation, safety certifications, sterilization validation, reimbursement crosswalk (CPT/HCPCS), and supply chain pricing.',
    deliverableType: 'Complete Hospital VAC Submission Dossier',
    timeEstimateMinutes: 55,
    industryContext: 'Hospital value analysis committee reviewing an advanced bipolar vessel sealing device.',
    scenarioData: {
      hospitalSystem: 'Memorial Health System (6 hospital campuses)',
      currentStandard: 'Monopolar electrocautery + mechanical clips',
      proposedProduct: 'Advanced ultrasonic/bipolar combination sealer',
      clinicalData: '32% reduction in intraoperative blood loss; 18-minute reduction in OR procedure duration'
    },
    promptInstructions: [
      'Complete the Executive Summary section of the hospital\'s standard VAC form.',
      'Provide reimbursement crosswalk showing applicable DRG codes and outpatient APC schedules.',
      'Draft a formal letter of clinical endorsement from the hospital Chief of Surgery.'
    ],
    evaluationRubric: [
      { criterion: 'Institutional Procurement Alignment', weightPercent: 40, guideline: 'Fulfills all requirements of rigorous hospital value analysis templates.' },
      { criterion: 'Economic Justification', weightPercent: 35, guideline: 'Demonstrates OR minute cost savings ($85/min) offsetting instrument price.' },
      { criterion: 'Surgical Champion Validation', weightPercent: 25, guideline: 'Effective, authentic clinical sponsor letter.' }
    ]
  },
  {
    id: 'lab_18_compliance_audit',
    number: 18,
    title: 'Commercial Compliance Audit: Spotting 8 Hidden Violations',
    category: 'Compliance & Ethics',
    summary: 'Audit a sales team\'s emails, marketing flyers, and expense reports to identify illegal kickbacks, off-label promotion, and Sunshine Act breaches.',
    objective: 'Detect subtle and overt compliance traps in field communications before federal regulatory scrutiny.',
    deliverableType: 'Formal Compliance Audit Findings & Corrective Action Memo',
    timeEstimateMinutes: 40,
    industryContext: 'Internal compliance audit of a regional sales district in the Pacific Northwest.',
    scenarioData: {
      flaggedItems: [
        'Rep email: "Dr. Smith, if you can switch your next 5 joint patients to our hip system, I will ensure our company funds your fellowship department\'s summer golf tournament."',
        'Rep detailing slide: Presenting animal model data claiming our oncology drug shrinks glioblastoma tumors (unapproved indication).',
        'Expense report: $480 dinner receipt for 1 physician and 1 sales rep at a sushi restaurant with no educational agenda.',
        'Text message: Rep sharing an unredacted patient operative report with a product engineer to discuss implant sizing.'
      ]
    },
    promptInstructions: [
      'Identify the exact federal statute or industry code violated by each of the 4 items (AKS, False Claims Act, PhRMA Code, HIPAA).',
      'Explain the legal and financial exposure for both the sales representative and the corporation.',
      'Formulate mandatory remediation steps and re-training protocols.'
    ],
    evaluationRubric: [
      { criterion: 'Legal Diagnostic Precision', weightPercent: 40, guideline: 'Correctly cites AKS, HIPAA, Sunshine Act, and FDA off-label standards.' },
      { criterion: 'Risk Analysis Rigor', weightPercent: 35, guideline: 'Articulates civil and criminal liabilities under federal statutes.' },
      { criterion: 'Remediation Quality', weightPercent: 25, guideline: 'Actionable corrective policies to prevent recurrence.' }
    ]
  },
  {
    id: 'lab_19_manager_coaching',
    number: 19,
    title: 'Manager-to-Representative Field Ride-Along Coaching',
    category: 'Sales Operations & Leadership',
    summary: 'Conduct an objective coaching debrief with an underperforming sales representative following a disastrous physician meeting.',
    objective: 'Diagnose whether the sales deficiency is rooted in Will vs. Skill, using non-directive questioning to build representative ownership.',
    deliverableType: 'Field Coaching Debrief Guide & 30-Day PIP Template',
    timeEstimateMinutes: 35,
    industryContext: 'Post-call car debrief following a meeting where the rep talked for 85% of the time, argued with the doctor, and got thrown out.',
    scenarioData: {
      repName: 'Jason Cole, 2nd-year Territory Representative',
      behaviorObserved: 'Interrupted the physician 4 times, showed 14 complex slides in 4 minutes, reacted defensively when the doctor asked about side effects.',
      repAttitude: 'Frustrated, defensive: "That doctor was completely unreasonable and biased toward the competitor."'
    },
    promptInstructions: [
      'Script the opening 3 coaching questions to help Jason reflect on his own behavior without triggering resentment.',
      'Diagnose the root deficiency using the Will vs. Skill framework.',
      'Design a structured 2-week deliberate practice regimen focusing on active listening and the LAER objection framework.'
    ],
    evaluationRubric: [
      { criterion: 'Non-Directive Coaching Skill', weightPercent: 40, guideline: 'Guides rep to self-discovery rather than lecturing or criticizing.' },
      { criterion: 'Behavioral Diagnosis', weightPercent: 35, guideline: 'Accurately isolates conversation dominance and defensive posture.' },
      { criterion: 'Actionable Development Plan', weightPercent: 25, guideline: 'Structured deliberate practice with measurable milestones.' }
    ]
  },
  {
    id: 'lab_20_launch_simulation',
    number: 20,
    title: 'Capstone: Commercial Launch War-Room Simulation',
    category: 'Strategy & Planning',
    summary: 'Lead a comprehensive 180-day new product commercial launch across 3 competitive territories under aggressive market conditions.',
    objective: 'Synthesize clinical messaging, territory targeting, VAC filings, payer pull-through, and competitive counter-tactics.',
    deliverableType: 'Comprehensive Capstone Commercial Launch Master Plan',
    timeEstimateMinutes: 75,
    industryContext: 'Commercial launch of a first-in-class monoclonal antibody for severe eosinophilic asthma.',
    scenarioData: {
      launchDate: 'Day 0 (FDA Approval received)',
      competitorStatus: 'Incumbent has 78% market share with 8 years of physician familiarity.',
      marketAccessGoal: 'Achieve Tier 2 formulary status across 85% of commercial lives within 180 days.',
      salesTarget: '$6,800,000 first-year gross revenue across region.'
    },
    promptInstructions: [
      'Develop Day 0 to 30: Target account blitz, KOL advisory activation, and sample seeding.',
      'Develop Day 31 to 90: Prior authorization assistance rollout and hospital P&T formulary dossier submissions.',
      'Develop Day 91 to 180: Competitive displacement battlecards, patient pull-through tracking, and QBR review.',
      'Formulate a risk contingency plan for a 60-day delay in commercial payer formulary coverage.'
    ],
    evaluationRubric: [
      { criterion: 'Strategic Synthesis & Scope', weightPercent: 35, guideline: 'Seamlessly unites clinical, economic, operational, and leadership dimensions.' },
      { criterion: 'Commercial Reality & Depth', weightPercent: 35, guideline: 'Demonstrates deep fluency in launch dynamics, pull-through, and access hurdles.' },
      { criterion: 'Contingency Resilience', weightPercent: 30, guideline: 'Realistic, agile response to regulatory and payer friction.' }
    ]
  }
];
