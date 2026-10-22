export interface SalesBadge {
  id: string;
  name: string;
  code: string;
  category: 'Commercial Excellence' | 'Clinical Governance' | 'Regulatory & Ethics' | 'Executive Negotiation';
  issuer: string;
  industryWeight: 'Required for Tier-1 Reps' | 'Gold Standard' | 'P-Club Elite';
  description: string;
  criteria: string[];
  unlockedByDefault: boolean;
}

export interface EliteSalesSkill {
  id: string;
  title: string;
  subtitle: string;
  rarity: 'Mastery (Top 5%)' | 'Executive Secret' | 'President\'s Club Only';
  summary: string;
  tacticalPlaybook: {
    phase: string;
    action: string;
    scriptOrTactic: string;
  }[];
  insiderSecret: string;
}

export const SALES_BADGES: SalesBadge[] = [
  {
    id: 'badge-1',
    name: 'President’s Club Benchmark Badge (Inspired by Top 5% Performance)',
    code: 'P-CLUB',
    category: 'Commercial Excellence',
    issuer: 'Apex Sales Academy (Inspired by Industry Benchmarks)',
    industryWeight: 'P-Club Elite',
    description: 'Platform badge inspired by the top-tier benchmark in medical sales, awarded for mastering quota planning and account displacement simulations.',
    criteria: [
      'Attain 120%+ of simulated territory quota plan (Illustrative benchmark)',
      'Demonstrate net new competitive market share displacement in practice labs',
      'Complete fully compliant documentation with zero Sunshine Act or AKS flags'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-2',
    name: 'Healthcare Commercial Specialist Badge (Inspired by CHCS)',
    code: 'CHCS',
    category: 'Commercial Excellence',
    issuer: 'Apex Sales Academy (Inspired by Commercial Institute Curricula)',
    industryWeight: 'Gold Standard',
    description: 'Platform badge inspired by hospital Integrated Delivery Network (IDN) and GPO cross-functional commercial training programs.',
    criteria: [
      'Complete all 8 core academy modules',
      'Pass the Comprehensive Healthcare Commercial Exam with 80%+',
      'Formulate an approved 30-60-90 Day Territory Plan'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-3',
    name: 'OR Sterile Protocol Badge (Inspired by AORN Principles)',
    code: 'AORN-OR',
    category: 'Clinical Governance',
    issuer: 'Apex Sales Academy (Inspired by AORN Operating Room Guidelines)',
    industryWeight: 'Required for Tier-1 Reps',
    description: 'Platform badge inspired by hospital operating room vendor credentialing standards for circulating and sterile-field awareness.',
    criteria: [
      'Master the 18-inch unscrubbed boundary rule',
      'Aseptic hand scrub and gowning technique verification',
      'Vendor credentialing compliance checklist (RepTrax, Vendormate, Symplr simulated)'
    ],
    unlockedByDefault: true,
  },
  {
    id: 'badge-4',
    name: 'MEDDPICC Deal Architect Badge (Inspired by MEDDPICC Methodology)',
    code: 'MEDDPICC',
    category: 'Executive Negotiation',
    issuer: 'Apex Sales Academy (Inspired by MEDDPICC Deal Qualification)',
    industryWeight: 'Gold Standard',
    description: 'Platform badge inspired by the enterprise qualification methodology for identifying Economic Buyers and navigating hospital procurement processes.',
    criteria: [
      'Audit 5 complex hospital deals using 8-point MEDDPICC metrics',
      'Achieve 85%+ score on Decision Process and Economic Buyer alignment',
      'Defeat the status-quo competition bias'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-5',
    name: 'Hospital Value Analysis Badge (Inspired by VAC Standards)',
    code: 'VAC-PRO',
    category: 'Executive Negotiation',
    issuer: 'Apex Sales Academy (Inspired by Hospital VAC Best Practices)',
    industryWeight: 'Gold Standard',
    description: 'Platform badge inspired by hospital Value Analysis Committee submission guidelines and total cost of care modeling.',
    criteria: [
      'Draft a total cost of care financial budget impact model',
      'Align catalog crosswalk to Vizient / Premier GPO tiers',
      'Secure signed multi-surgeon champion clinical attestations'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-6',
    name: 'Healthcare Compliance Badge (Inspired by PhRMA & AdvaMed Codes)',
    code: 'COMPLIANCE',
    category: 'Regulatory & Ethics',
    issuer: 'Apex Sales Academy (Inspired by PhRMA and AdvaMed Ethics Codes)',
    industryWeight: 'Required for Tier-1 Reps',
    description: 'Platform ethics badge covering federal Anti-Kickback Statute, Stark Law, Sunshine Act, and strict promotional boundaries.',
    criteria: [
      'Pass federal Anti-Kickback Statute (42 U.S.C. § 1320a-7b) assessment',
      'Understand strict boundaries between Commercial Detailing and MSL Medical Affairs',
      'Audit educational meals under CMS Open Payments Sunshine Act regulations'
    ],
    unlockedByDefault: true,
  },
  {
    id: 'badge-7',
    name: 'SPIN Clinical In-Service Badge (Inspired by SPIN Methodology)',
    code: 'SPIN-CLINICAL',
    category: 'Commercial Excellence',
    issuer: 'Apex Sales Academy (Inspired by Consultative Questioning Frameworks)',
    industryWeight: 'Gold Standard',
    description: 'Platform badge inspired by Neil Rackham\'s Situation, Problem, Implication, and Need-Payoff consultative questioning framework.',
    criteria: [
      'Formulate 20 surgical implication questions',
      'Conduct a 3-minute consultative detail without product lecturing',
      'Secure micro-commitments on clinical case evaluations'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-8',
    name: 'High-Stamina Hunter Badge (Inspired by Behavioral Strengths Profiles)',
    code: 'GALLUP-ELITE',
    category: 'Commercial Excellence',
    issuer: 'Apex Sales Academy (Inspired by Commercial Talent Profiles)',
    industryWeight: 'P-Club Elite',
    description: 'Platform badge inspired by high-performer behavioral profiles: daily call stamina, resilience, and surgical composure.',
    criteria: [
      'Demonstrate high Achiever and Competition traits in simulations',
      'Deliver structured STAR responses to high-pressure rejection scenarios',
      'Demonstrate emotional composure during surgical emergency simulations'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-9',
    name: 'Shelby Haas Objection Reframing Badge (Inspired by She Sells Methodology)',
    code: 'SHELBY-REFRAME',
    category: 'Executive Negotiation',
    issuer: 'Apex Sales Academy (Inspired by She Sells Academy Architecture)',
    industryWeight: 'P-Club Elite',
    description: 'Platform badge inspired by Shelby Haas\'s radical detachment and 5-step objection reframing framework.',
    criteria: [
      'Execute complete 5-step reframe: Listen, Validate/Mirror, Clarifying Diagnosis, Honest Reframe, Resolution Check',
      'Eliminate high-pressure urgency and maintain neutral consultative tonality',
      'Guide prospect to self-diagnose dissatisfaction with incumbent solution'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-10',
    name: 'B2B Sales Experience Badge (Inspired by Commercial Equivalencies)',
    code: 'SALES-EXP-EQ',
    category: 'Commercial Excellence',
    issuer: 'Apex Sales Academy (Portfolio Recognition)',
    industryWeight: 'Gold Standard',
    description: 'Platform badge acknowledging prior quota-carrying B2B sales experience and fast-tracking directly to advanced hospital closing modules.',
    criteria: [
      'Verify prior quota achievement in B2B or allied health commercial role',
      'Pass the 60-second diagnostic assessment with 66%+ score',
      'Immediate placement into Advanced Modules 3–8'
    ],
    unlockedByDefault: true,
  },
  {
    id: 'badge-11',
    name: 'Biotech Enterprise Framework Architect',
    code: 'BIOTECH-ARCH',
    category: 'Commercial Excellence',
    issuer: 'Biotech & MedTech Executive Commercial Institute',
    industryWeight: 'P-Club Elite',
    description: 'Validates ability to implant and structure proprietary clinical trial monographs, C-Suite VAC models, and pre-hire sales certification programs for life science corporations.',
    criteria: [
      'Implant custom drug/device monograph in the Enterprise Portal',
      'Align clinical trial endpoints with hospital DRG bundled payment savings',
      'Deploy embeddable corporate onboarding SDK for incoming commercial reps'
    ],
    unlockedByDefault: false,
  },
  {
    id: 'badge-12',
    name: 'Chris Voss Tactical Empathy & Calibrated Inquiries',
    code: 'VOSS-EMPATHY',
    category: 'Executive Negotiation',
    issuer: 'Black Swan Method Commercial Alliance',
    industryWeight: 'Gold Standard',
    description: 'Certifies advanced capability in labeling hidden objections, executing accusation audits, and asking calibrated "How" and "What" questions in healthcare purchasing standoffs.',
    criteria: [
      'Conduct an accusation audit neutralizing clinician vendor fatigue',
      'Label emotional tension without provoking defensiveness',
      'Frame "No"-oriented questions that protect buyer autonomy'
    ],
    unlockedByDefault: false,
  },
];

export const ELITE_SALES_SKILLS: EliteSalesSkill[] = [
  {
    id: 'skill-1',
    title: 'Surgeon Preference Card Auditing & Tray Espionage',
    subtitle: 'The secret blueprint to what the surgeon uses, discards, and complains about before you say a word.',
    rarity: 'Executive Secret',
    summary: 'Every hospital OR maintains electronic "Preference Cards" for every surgeon detailing glove size, suture types, instrument trays, positioning aids, and energy devices. Top 1% reps audit these cards to know the surgeon\'s exact consumable footprint.',
    tacticalPlaybook: [
      {
        phase: '1. Accessing the Preference Card',
        action: 'Partner with the lead OR surgical scheduler or circulating nurse during quiet afternoon turnover.',
        scriptOrTactic: '"Sarah, I know Dr. Marcus is doing three anterior hips on Thursday. Could we pull his current preference card so I can verify our trial tray doesn\'t duplicate any of his standard retractors?"',
      },
      {
        phase: '2. Spotting High-Cost Waste',
        action: 'Review items that are opened onto the sterile field but routinely thrown away unused at case end.',
        scriptOrTactic: 'If a surgeon opens a $400 bipolar sealer but only uses monopolar cautery, highlight this $400 waste reduction to the VAC committee.',
      },
      {
        phase: '3. Pre-empting Muscle Memory',
        action: 'Arrange your trial instrumentation in the exact sequence of the surgeon’s favorite incumbent tray.',
        scriptOrTactic: 'When instruments appear where the surgeon expects them instinctively, surgical anxiety drops to zero.',
      },
    ],
    insiderSecret: 'Surgeons do not switch implants because of brochures; they switch when the new system does not disrupt their scrub tech\'s physical muscle memory.',
  },
  {
    id: 'skill-2',
    title: 'The 45-Second Scrub-Sink Pattern Interrupt',
    subtitle: 'How to break clinician autopilot during the only 3 minutes they stand still all day.',
    rarity: 'Mastery (Top 5%)',
    summary: 'Surgeons scrub their hands for 3 to 5 minutes before surgery. Their minds are occupied by patient anatomy. Amateur reps pitch features; elite reps use an anatomical pattern interrupt that invites curiosity.',
    tacticalPlaybook: [
      {
        phase: '1. The Respectful Approach',
        action: 'Stand at the adjacent sink without crowding their sterile water stream.',
        scriptOrTactic: '"Dr. Roberts, good morning. Good luck with this revision acetabular case in OR 2."',
      },
      {
        phase: '2. The Anatomical Pattern Interrupt',
        action: 'Mention a specific mechanical or anatomical complexity related to that exact patient type.',
        scriptOrTactic: '"In these Paprosky Type IIIA bone loss cases, do your reamers ever struggle to achieve initial press-fit stability without supplemental augments?"',
      },
      {
        phase: '3. The Zero-Pressure Exit',
        action: 'Do not ask for a meeting immediately; leave an anatomical curiosity hook for after the case.',
        scriptOrTactic: '"I won\'t distract you before scrub-in. I left a 3D porous titanium trial model with the circulator. If you have 30 seconds between cases, I\'d value your perspective on the coefficient of friction."',
      },
    ],
    insiderSecret: 'Never try to close a deal at the scrub sink. The sole goal is securing permission to converse after the procedure is finished.',
  },
  {
    id: 'skill-3',
    title: 'Deciphering the OR Unspoken Power Hierarchy',
    subtitle: 'Why winning the scrub tech and circulator matters more than winning the Chief of Surgery.',
    rarity: 'President\'s Club Only',
    summary: 'Surgeons rely entirely on their scrub tech and circulating nurse to keep cases moving smoothly. If a scrub tech complains that your instruments are awkward or sharp, the surgeon will drop your product in one week.',
    tacticalPlaybook: [
      {
        phase: '1. The Scrub Tech In-Service',
        action: 'Conduct hands-on tray assembly drills with the surgical techs before the doctor arrives.',
        scriptOrTactic: 'Show the tech the color-coded modular trays, single-click ratchets, and how to disassemble the handles in 5 seconds for fast cleaning.',
      },
      {
        phase: '2. Protecting the Circulator',
        action: 'Never create paperwork or delays for the circulating nurse.',
        scriptOrTactic: 'Pre-print peel packs, supply accurate barcode stickers for their Epic chart documentation, and keep the sub-sterile room spotless.',
      },
      {
        phase: '3. The Tech Endorsement',
        action: 'When the tech tells the surgeon "This tray is so much easier to set up," your deal is 90% closed.',
        scriptOrTactic: 'Surgeons value their team\'s morale. An enthusiastic scrub tech is your greatest internal champion.',
      },
    ],
    insiderSecret: 'The most dangerous person in the hospital is an unhappy scrub tech. Treat everyone in the sterile core with executive-level dignity.',
  },
  {
    id: 'skill-4',
    title: 'Buy-and-Bill Margin Arbitrage & 340B Hospital Economics',
    subtitle: 'Mastering the financial mechanics that dictate pharmaceutical and biologic adoption.',
    rarity: 'Executive Secret',
    summary: 'Understanding Average Sales Price (ASP), Part B vs Part D, and 340B safety-net hospital pricing allows reps to speak the financial language of clinic CFOs and practice administrators.',
    tacticalPlaybook: [
      {
        phase: '1. Identifying 340B Eligibility',
        action: 'Audit whether the hospital qualifies as a 340B covered entity based on Disproportionate Share Hospital (DSH) percentages.',
        scriptOrTactic: '340B institutions purchase outpatient drugs at 20-50% statutory discounts while billing commercial insurers at standard rates, generating vital margins.',
      },
      {
        phase: '2. De-Risking the Cash-Flow Float',
        action: 'Introduce zero-interest consignment bridging and 72-hour prior-authorization guarantees.',
        scriptOrTactic: 'Private oncology clinics operate on cash flow. Eliminating the 60-day billing float unlocks prescription volume.',
      },
    ],
    insiderSecret: 'In specialty oncology and biologics, clinical efficacy is only 50% of the sale. The other 50% is insurance reimbursement plumbing.',
  },
];
