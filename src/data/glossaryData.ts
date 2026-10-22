import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-1',
    term: 'Value Analysis Committee (VAC)',
    acronym: 'VAC',
    category: 'Hospital Admin & Supply Chain',
    definition: 'A multidisciplinary hospital committee composed of supply chain leaders, clinicians, financial analysts, and nursing leadership that evaluates, approves, or rejects all new medical devices, technologies, and clinical supplies.',
    commercialApplication: 'Even if a surgeon demands your implant, you cannot sell a single screw to a hospital until the VAC formally reviews clinical evidence, pricing crosswalks, and GPO contract tier alignment.',
    exampleSentence: 'Before we can schedule Dr. Marcus\'s first clinical evaluation case, we must submit our complete VAC dossier by the first Tuesday of next month.'
  },
  {
    id: 'term-2',
    term: 'Diagnosis-Related Group (DRG)',
    acronym: 'DRG',
    category: 'Reimbursement & Coding',
    definition: 'A Medicare patient classification system that bundles hospital inpatient operational payments into fixed prospective amounts based on the principal diagnosis and surgical procedure.',
    commercialApplication: 'Because the hospital receives a fixed DRG payout (e.g. $14,000 for a total joint replacement), every dollar spent on your implant is a direct operational cost deduction against hospital gross margin.',
    exampleSentence: 'We justified our premium implant pricing to the CFO by showing it reduces post-discharge infection readmissions, protecting the hospital from severe CMS DRG penalties.'
  },
  {
    id: 'term-3',
    term: 'Anti-Kickback Statute (AKS)',
    acronym: 'AKS',
    category: 'Regulatory & Legal',
    definition: 'A federal criminal statute prohibiting the knowing and willful exchange of remuneration (cash, gifts, lavish meals, consulting contracts) to induce or reward healthcare business payable by Medicare or Medicaid.',
    commercialApplication: 'Never offer personal gifts, sporting tickets, or lavish consulting fees to physicians. Violations carry felony convictions, False Claims Act treble damages, and prison time.',
    exampleSentence: 'Offering to sponsor a surgeon’s personal vacation under the guise of an advisory meeting is a blatant violation of the federal Anti-Kickback Statute.'
  },
  {
    id: 'term-4',
    term: 'Buy-and-Bill',
    category: 'Biotech & Pharma',
    definition: 'A healthcare delivery reimbursement model in which a physician practice purchases, stores, and administers high-cost infused medications, billing insurance companies post-infusion for drug cost plus margin.',
    commercialApplication: 'In community oncology, practices float tens of thousands of dollars per patient vial under Buy-and-Bill. Reps must ensure prior authorizations are airtight to avoid catastrophic clinic bad-debt denials.',
    exampleSentence: 'The oncology clinic was hesitant to adopt the new monoclonal antibody under buy-and-bill because of the 60-day reimbursement float.'
  },
  {
    id: 'term-5',
    term: 'Group Purchasing Organization (GPO)',
    acronym: 'GPO',
    category: 'Hospital Admin & Supply Chain',
    definition: 'An entity (such as Vizient, Premier, or HealthTrust) that leverages the collective purchasing power of thousands of hospitals to negotiate volume-discounted contracts with manufacturers.',
    commercialApplication: 'If your product is off-contract or your company lacks a primary GPO tier, hospital purchasing departments will impose automated pricing penalties or block product onboarding.',
    exampleSentence: 'Because Stryker held the Premier Tier 3 sole-source award, we had to use the Physician Unmet Need carve-out exception to get our device approved.'
  },
  {
    id: 'term-6',
    term: 'Physician Payments Sunshine Act (Open Payments)',
    acronym: 'Sunshine Act',
    category: 'Regulatory & Legal',
    definition: 'A federal law requiring medical device and drug manufacturers to publicly report all transfers of value over $12 made to physicians and teaching hospitals to CMS.',
    commercialApplication: 'Every lunch, coffee, textbook, or consulting honorarium you provide to a doctor is published publicly on CMS Open Payments for patients, employers, and journalists to see.',
    exampleSentence: 'We tracked the exact catering cost of the grand rounds presentation to report it compliantly under the federal Sunshine Act.'
  },
  {
    id: 'term-7',
    term: 'Current Procedural Terminology (CPT)',
    acronym: 'CPT',
    category: 'Reimbursement & Coding',
    definition: 'A standardized medical code set maintained by the AMA that describes specific medical, surgical, and diagnostic services performed by healthcare professionals.',
    commercialApplication: 'Doctors are paid professional fees based on CPT codes. If a new surgical procedure lacks a permanent Category I CPT code, physicians may not get paid for performing it, creating an adoption roadblock.',
    exampleSentence: 'Until the AMA created a permanent Category I CPT code for minimally invasive sacroiliac joint fusion, surgeon adoption was severely restricted.'
  },
  {
    id: 'term-8',
    term: 'Healthcare Common Procedure Coding System (HCPCS)',
    acronym: 'HCPCS',
    category: 'Reimbursement & Coding',
    definition: 'CMS standardized coding system that includes Level II codes for medical equipment, injectable drugs (J-codes), outpatient device pass-throughs (C-codes), and prosthetics.',
    commercialApplication: 'Securing a permanent, product-specific HCPCS J-code or Q-code accelerates commercial pharmaceutical billing from 90 days of manual review down to instantaneous adjudication.',
    exampleSentence: 'The biotech rep provided the infusion suite with the exact HCPCS J-code and dosage unit modifier to prevent electronic claim rejections.'
  },
  {
    id: 'term-9',
    term: 'Aseptic Technique & The Sterile Field',
    category: 'OR & Surgical',
    definition: 'Strict clinical protocols designed to prevent the introduction of pathogens into the surgical operating room, maintaining sterility across draped tables, instruments, and scrubbed personnel.',
    commercialApplication: 'A device rep must never cross or lean over a sterile blue drape, must maintain 18 inches of distance when unscrubbed, and must know exact scrub-in etiquette to avoid contaminating surgical instrumentation.',
    exampleSentence: 'The junior rep was reprimanded by the circulating nurse for reaching across the sterile Mayo stand to point at an instrument.'
  },
  {
    id: 'term-10',
    term: 'Off-Label Promotion Prohibition',
    category: 'Regulatory & Legal',
    definition: 'FDA statutory prohibition forbidding commercial pharmaceutical and medical device representatives from marketing or encouraging uses of approved products for indications not explicitly cleared on the FDA label.',
    commercialApplication: 'Commercial sales reps are legally required to promote products strictly on-label. Inquiries regarding off-label clinical applications must be deferred to Medical Science Liaisons (MSLs).',
    exampleSentence: 'When the surgeon asked if the coronary stent could be deployed in carotid arteries off-label, the rep compliantly initiated an unsolicited medical request to Medical Affairs.'
  },
  {
    id: 'term-11',
    term: 'Average Sales Price (ASP)',
    acronym: 'ASP',
    category: 'Reimbursement & Coding',
    definition: 'The average price paid to a manufacturer by all commercial purchasers (net of volume discounts and prompt-pay rebates), published quarterly by CMS to determine Medicare Part B drug reimbursement (ASP + 6%).',
    commercialApplication: 'Understanding a drug’s ASP trend is crucial: if a manufacturer discounts too heavily, the ASP drops, lowering future clinic margins under Buy-and-Bill.',
    exampleSentence: 'Clinics receive reimbursement for oncology infusions at ASP plus 6%, which covers drug acquisition and specialized handling overhead.'
  },
  {
    id: 'term-12',
    term: '340B Drug Pricing Program',
    acronym: '340B',
    category: 'Hospital Admin & Supply Chain',
    definition: 'A federal program that requires drug manufacturers to provide outpatient pharmaceuticals to eligible safety-net hospitals at substantial discounts (typically 20% to 50%).',
    commercialApplication: 'Because 340B hospitals receive standard commercial insurance reimbursement while purchasing at steep government discounts, high-cost therapeutics represent enormous margin drivers for 340B institutions.',
    exampleSentence: 'The hospital pharmacy director prioritized the new specialty drug because their 340B status captured an additional $1,200 margin per patient cycle.'
  },
  {
    id: 'term-13',
    term: 'Integrated Delivery Network (IDN)',
    acronym: 'IDN',
    category: 'Hospital Admin & Supply Chain',
    definition: 'A formal healthcare enterprise that consolidates hospitals, outpatient surgery centers, physician clinics, and sometimes health plans under unified executive leadership.',
    commercialApplication: 'Reps in consolidated markets deal with IDN corporate headquarters rather than individual hospital administrators. A single IDN system formulary decision can unlock or lock out 20 hospitals simultaneously.',
    exampleSentence: 'Winning the preferred vendor award across the entire 18-hospital IDN instantly elevated the rep to President’s Club standing.'
  },
  {
    id: 'term-14',
    term: 'RepTrax / Vendormate / Symplr',
    category: 'OR & Surgical',
    definition: 'Commercial vendor credentialing platforms utilized by hospitals to verify that sales representatives have current immunizations, background checks, drug screenings, and product liability insurance.',
    commercialApplication: 'Without an active green badge printed at the hospital credentialing kiosk, security will refuse entry, and reps can be permanently barred from the facility.',
    exampleSentence: 'The rep arrived at 05:45 AM to scan their RepTrax mobile barcode and print their daily surgical access visitor badge.'
  },
  {
    id: 'term-15',
    term: 'Key Opinion Leader (KOL)',
    acronym: 'KOL',
    category: 'Biotech & Pharma',
    definition: 'A respected academic physician, department chair, or clinical researcher whose clinical trials, journal publications, and podium lectures shape standard of care within their medical specialty.',
    commercialApplication: 'Partnering with KOLs at academic medical centers establishes peer-to-peer scientific credibility that trickles down to community physicians across the entire regional territory.',
    exampleSentence: 'The biotech sales director engaged Dr. Rostova as a KOL to present the 3-year hemodynamic registry data at the national cardiology symposium.'
  },
  {
    id: 'term-16',
    term: 'Progression-Free Survival (PFS) & Overall Survival (OS)',
    acronym: 'PFS / OS',
    category: 'Biotech & Pharma',
    definition: 'Gold standard clinical endpoints in oncology clinical trials. OS measures the time from randomization until death from any cause; PFS measures the time until disease progression or death.',
    commercialApplication: 'Oncology reps must speak fluently about Hazard Ratios (HR) for PFS and OS. A statistically significant OS advantage (e.g. HR 0.72, p=0.002) is the ultimate commercial argument for first-line adoption.',
    exampleSentence: 'When detailing the thoracic oncologist, the rep emphasized the 4.8-month median progression-free survival benefit demonstrated in the Phase III trial.'
  },
  {
    id: 'term-17',
    term: 'Relative Value Unit (RVU) & Work RVU (wRVU)',
    acronym: 'RVU',
    category: 'Reimbursement & Coding',
    definition: 'The standard measure used by Medicare and hospital employers to quantify the value, clinical time, and technical skill of medical services, directly determining physician compensation.',
    commercialApplication: 'Many employed surgeons are paid strictly on wRVU production bonuses. If your surgical device or robotic workflow enables a surgeon to safely perform 3 cases per day instead of 2, you directly increase their take-home compensation.',
    exampleSentence: 'We demonstrated that our streamlined anterior hip approach helped Dr. Vance generate an additional 18 wRVUs weekly by eliminating intraoperative fluoroscopy delays.'
  },
  {
    id: 'term-18',
    term: 'Central Sterile Processing (CSP / SPD)',
    acronym: 'SPD',
    category: 'OR & Surgical',
    definition: 'The hospital department responsible for decontaminating, inspecting, assembling, and steam autoclaving all reusable surgical instrument trays prior to operating room procedures.',
    commercialApplication: 'Device reps spend hours in SPD verifying that consigned implant loaner trays are dropped off 24 hours before surgery and inspected for bioburden or missing drill bits.',
    exampleSentence: 'A great device rep always brings coffee to the SPD techs, because they are the ones who inspect your loaner trays and ensure they are autoclaved on time.'
  },
  {
    id: 'term-19',
    term: 'Prior Authorization (PA)',
    acronym: 'PA',
    category: 'Reimbursement & Coding',
    definition: 'A health plan cost-control process requiring physicians to obtain advance approval before a prescription drug or surgical procedure will be covered for payment.',
    commercialApplication: 'Top pharmaceutical reps do not just sell to the doctor; they train the clinic\'s PA coordinators on diagnostic criteria, clinical chart notes, and appeal pathways to eliminate denial backlogs.',
    exampleSentence: 'The practice coordinator praised the specialty rep for providing an easy-to-use checklist that cut their prior authorization turnaround from 14 days to 48 hours.'
  },
  {
    id: 'term-20',
    term: 'Hospital-Acquired Condition (HAC) & HRRP Penalties',
    category: 'Hospital Admin & Supply Chain',
    definition: 'Federal CMS penalty programs that dock up to 3% of a hospital’s entire annual Medicare reimbursement if they have excessive 30-day readmissions or surgical site infections (SSIs).',
    commercialApplication: 'Hospital CFOs care deeply about preventing HACs. Framing your sterile packaging, antimicrobial coating, or closed-suction device as an insurance policy against HAC penalties wins administrative budget.',
    exampleSentence: 'Our commercial pitch highlighted that our single-use disposable scopes eliminate the risk of cross-contamination, directly protecting the hospital from CMS HRRP infection penalties.'
  },
  {
    id: 'term-21',
    term: '340B Drug Pricing Program',
    acronym: '340B',
    category: 'Hospital Admin & Supply Chain',
    definition: 'A federal statutory program requiring pharmaceutical manufacturers to provide outpatient drugs to eligible safety-net healthcare organizations (covered entities) at 25% to 50% discounts.',
    commercialApplication: 'Hospitals purchase drugs at the discounted 340B price and bill commercial insurers at full reimbursement rates, creating vital operating margin that subsidizes safety-net community care.',
    exampleSentence: 'Understanding the hospital’s 340B covered entity status allowed the oncology account manager to model the pharmacy’s exact net revenue spread.'
  },
  {
    id: 'term-22',
    term: 'Average Sales Price (ASP) + 6%',
    acronym: 'ASP+6%',
    category: 'Reimbursement & Coding',
    definition: 'The statutory Medicare Part B reimbursement formula for physician-administered injectables and biologics, calculated from manufacturer volume-weighted net sales prices across all commercial customers.',
    commercialApplication: 'Physician practices receive ASP + 4.3% (after sequester), meaning price erosion or sudden manufacturer price increases can directly impact a specialty clinic\'s infusion profitability.',
    exampleSentence: 'The rheumatology clinic monitored the CMS quarterly ASP files to ensure the reimbursement delta covered their drug storage and nursing infusion labor.'
  },
  {
    id: 'term-23',
    term: 'Pharmacy and Therapeutics Committee (P&T)',
    acronym: 'P&T',
    category: 'Hospital Admin & Supply Chain',
    definition: 'The formal medical staff committee within hospitals and health plans responsible for evaluating clinical evidence, safety, and cost to decide which drugs are included on the institutional formulary.',
    commercialApplication: 'A pharmaceutical representative cannot have their product administered in an inpatient hospital setting until the P&T committee officially reviews and approves the formulary dossier.',
    exampleSentence: 'The medical team submitted the Phase III clinical trial dossier to the hospital P&T committee for consideration at their quarterly review.'
  },
  {
    id: 'term-24',
    term: 'MolDX Program & Z-Codes',
    acronym: 'MolDX',
    category: 'Reimbursement & Coding',
    definition: 'A Medicare administrative program operated by Palmetto GBA that establishes coverage, coding, and pricing for molecular diagnostic and genomic tests using unique 5-character Z-Code identifiers.',
    commercialApplication: 'Diagnostic lab reps cannot secure Medicare reimbursement for next-generation sequencing assays without obtaining formal MolDX technical validation and an active Z-Code.',
    exampleSentence: 'The molecular lab director confirmed that their liquid biopsy assay had completed MolDX dossier submission and received its Z-Code for clinical billing.'
  },
  {
    id: 'term-25',
    term: 'Prescription Drug Marketing Act (PDMA)',
    acronym: 'PDMA',
    category: 'Regulatory & Legal',
    definition: 'A 1987 federal statute establishing strict regulations for the distribution of prescription drug samples, including written physician requests, digital signature capture, and annual inventory audits.',
    commercialApplication: 'Reps must physically count and reconcile every sample box in their vehicle trunk; a single lost or unaccounted sample box triggers mandatory corporate compliance investigations.',
    exampleSentence: 'Before leaving the complimentary medication samples, the pharma rep captured Dr. Vance\'s digital signature in compliance with the PDMA.'
  },
  {
    id: 'term-26',
    term: 'Stark Law (Physician Self-Referral Law)',
    acronym: 'Stark Law',
    category: 'Regulatory & Legal',
    definition: 'A strict liability civil federal statute prohibiting physicians from referring Medicare or Medicaid patients for designated health services (DHS) to entities with which the physician or immediate family has a financial relationship.',
    commercialApplication: 'Prevents medical device manufacturers from offering physician-owned distributorships (PODs) or joint venture kickbacks where doctors profit directly from their own implant referrals.',
    exampleSentence: 'Hospital legal counsel audited the surgeon\'s consulting agreement to ensure fair market value and strict Stark Law compliance.'
  },
  {
    id: 'term-27',
    term: 'Health Economics and Outcomes Research (HEOR)',
    acronym: 'HEOR',
    category: 'Biotech & Pharma',
    definition: 'A multidisciplinary life sciences field that evaluates the economic value, clinical utility, and patient-reported outcomes of healthcare interventions to assist payers and health systems with formulary decisions.',
    commercialApplication: 'Commercial reps partner with internal HEOR teams to present budget impact models and cost-effectiveness data to P&T committees and commercial insurance medical directors.',
    exampleSentence: 'The HEOR analysis demonstrated that the drug paid for itself by eliminating an average of 2.4 hospital emergency visits per patient per year.'
  },
  {
    id: 'term-28',
    term: 'SMART-on-FHIR & EHR App Orchard',
    category: 'Hospital Admin & Supply Chain',
    definition: 'An open healthcare IT standard that allows third-party digital health applications and AI clinical decision support algorithms to integrate natively inside electronic health records (Epic, Cerner).',
    commercialApplication: 'Selling healthcare software that requires doctors to log into a separate browser tab has a 90% abandonment rate; SMART-on-FHIR integration inside Epic guarantees clinical adoption.',
    exampleSentence: 'The enterprise healthtech sales lead closed the deal by demonstrating seamless SMART-on-FHIR integration with the health system’s Epic EHR.'
  },
  {
    id: 'term-29',
    term: 'Medical Science Liaison (MSL) vs Promotional Boundaries',
    acronym: 'MSL',
    category: 'Regulatory & Legal',
    definition: 'The strict legal separation between commercial sales representatives (who engage in on-label promotional selling) and non-promotional medical affairs MSLs (who provide peer-to-peer scientific exchange and discuss off-label research).',
    commercialApplication: 'If a doctor asks a commercial sales rep an unsolicited question about an unapproved indication, the rep is legally forbidden from answering and must submit an unsolicited medical inquiry to an MSL.',
    exampleSentence: 'When the oncologist asked about pediatric applications, the sales rep compliantly initiated an MSL referral rather than discussing off-label data.'
  },
  {
    id: 'term-30',
    term: 'National Prescription Audit (IQVIA NPA & Xponent)',
    acronym: 'IQVIA',
    category: 'Hospital Admin & Supply Chain',
    definition: 'The pharmaceutical industry\'s gold-standard commercial data service, tracking retail and specialty pharmacy prescription dispense volumes at the national, regional, and individual prescriber level.',
    commercialApplication: 'Commercial sales reps use IQVIA Xponent data to identify high-decile prescribers, evaluate territory market share, and measure the weekly impact of detailing calls on New-to-Brand Prescriptions (NBRx).',
    exampleSentence: 'The quarterly territory rankings were updated following IQVIA’s end-of-month national prescription audit readout.'
  }
];

