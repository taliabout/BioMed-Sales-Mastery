import { Module } from '../types';

export const CURRICULUM_MODULES: Module[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'The Commercial Healthcare Ecosystem & Hospital Buying Committees',
    subtitle: 'Decode how IDNs, GPOs, P&T, and the dreaded Value Analysis Committee (VAC) make buying decisions.',
    durationHours: 6.5,
    experienceLevel: 'Foundation',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'No healthcare rep succeeds by talking solely to doctors anymore. In today’s consolidated healthcare market, hospitals are massive corporate enterprises managed by Integrated Delivery Networks (IDNs) and Group Purchasing Organizations (GPOs). Learn the anatomy of hospital economics, stakeholder power mapping, and how to conquer the Value Analysis Committee.',
    lessons: [
      {
        id: 'les-1-1',
        title: 'The Modern Hospital Economy: IDNs, ASCs, and GPO Dominance',
        durationMinutes: 45,
        executiveSummary: 'Understand the macro shift from physician-driven purchasing to hospital administrative consolidation.',
        coreConcepts: [
          {
            heading: 'The Fall of the Lone Surgeon Decision-Maker',
            body: 'Twenty years ago, if a renowned orthopedic or cardiovascular surgeon wanted a specific screw, stent, or drug, they simply demanded it and the hospital purchased it. Today, over 75% of physicians are employed by hospital systems or private equity conglomerates. Purchasing power has shifted from clinical preference to administrative committees driven by margins, standardization, and quality metrics.',
            proTip: 'Never pitch a doctor without simultaneously discovering their hospital’s Value Analysis Committee cadence and GPO contract tier.'
          },
          {
            heading: 'The Power of Group Purchasing Organizations (GPOs)',
            body: 'GPOs (such as Vizient, Premier, and HealthTrust) negotiate collective purchasing agreements on behalf of thousands of member hospitals. They negotiate tiered rebate structures: Tier 1 (dual-source or multi-source), Tier 2 (committed volume 80%+), and Tier 3 (exclusive sole-source). If your company is off-contract or not on the primary GPO award, your price will face an automatic 15-30% tariff penalty or require an explicit off-contract justification form signed by the Service Line Chair.',
            clinicalExample: 'A surgeon loves your new bipolar electrosurgical energy device, but because your company is not on Vizient Tier 2, the hospital pays a $450 penalty per handpiece unless you supply an off-contract exception dossier.'
          },
          {
            heading: 'Hospital Revenue Streams: IPPS, OPPS & The Shift to ASCs',
            body: 'Hospitals are reimbursed under prospective payment systems. For inpatient stays, hospitals receive a fixed fee per Diagnosis-Related Group (DRG) regardless of what supplies they consume. Therefore, any device or implant cost is an operational deduction against the hospital’s fixed DRG check! In contrast, Ambulatory Surgery Centers (ASCs) operate on razor-thin margins with high volume; here, procedure speed and rapid room turnover are the top financial drivers.',
            proTip: 'In the hospital OR, frame your product as reducing complications and readmission penalties. In the ASC, frame your product as saving 14 minutes of surgical prep and instrument cleanup time.'
          }
        ],
        frameworkConnection: 'MEDDPICC: Economic Buyer & Decision Criteria',
        quiz: [
          {
            id: 'q-1-1-1',
            question: 'Under Medicare\'s Inpatient Prospective Payment System (IPPS), how does a hospital receive reimbursement for a surgical admission?',
            options: [
              'Hospital bills line-by-line for every device and drug used, and Medicare pays full cost plus 10%.',
              'Hospital receives a predetermined, fixed bundled amount based on the patient\'s Diagnosis-Related Group (DRG), making implant costs a direct deduction from hospital margin.',
              'The surgeon negotiates the implant payment directly with the device manufacturer.',
              'The hospital only receives payment if the patient has private commercial insurance.'
            ],
            correctIndex: 1,
            explanation: 'Under DRG bundles, hospital reimbursement is fixed. Every dollar spent on an implant or disposable comes directly out of the hospital\'s net margin, which is why Value Analysis Committees ruthlessly scrutinize device costs.'
          }
        ]
      },
      {
        id: 'les-1-2',
        title: 'Decoding the Value Analysis Committee (VAC) & P&T Committee',
        durationMinutes: 50,
        executiveSummary: 'Step-by-step masterclass on navigating the committee that rejects 80% of new medical technologies.',
        coreConcepts: [
          {
            heading: 'Who Sits on the VAC?',
            body: 'The Value Analysis Committee typically consists of 8 to 14 voting members: Director of Supply Chain (Chair), Chief Medical Officer (CMO), OR Nursing Director, Director of Pharmacy, Infection Control Officer, Risk Management / Legal, Biomedical Engineering, and the Financial Business Analyst. Surgeons rarely attend; they submit a request form and the administrative members review it without the rep present in the room!',
            clinicalExample: 'A spinal surgeon submits your $4,200 expandable interbody cage. The VAC Financial Analyst compares it against the incumbent $2,100 static cage and flags a $2,100 delta with zero proven difference in fusion rates at 12 months.'
          },
          {
            heading: 'The 5 Mandatory Pillars of a Winning VAC Dossier',
            body: 'To win in VAC, your submission packet must present five elements: 1) Clinical Safety & Peer-Reviewed Literature (Level 1 or Level 2 randomized studies), 2) Cross-Reference Crosswalk (matching your catalog numbers to the competitor products you replace), 3) Cost-Impact Financial Model (demonstrating total cost of care reduction through lower infection, shorter length of stay, or faster OR turnover), 4) GPO Alignment & Pricing Tier, and 5) Multi-Surgeon Champion Attestations.',
            proTip: 'Never allow a surgeon to submit a VAC request alone. Pre-fill 90% of the technical, clinical, and financial dossier for them so it cannot be dismissed for incomplete documentation.'
          },
          {
            heading: 'The P&T Committee for Pharmaceutical & Biologics Detailing',
            body: 'The Pharmacy and Therapeutics (P&T) committee oversees the hospital and health system formulary. They categorize therapeutics into: Preferred Formulary (unrestricted access), Restricted Formulary (limited to specific sub-specialties like Medical Oncology or Infectious Disease), Prior Authorization Required, or Non-Formulary. Mastering the P&T pathway requires partnering with Clinical Pharmacy Specialists who prepare the monograph.',
            proTip: 'Identify the Clinical Specialist Pharmacist 6 months before the P&T review date; they write the actual clinical monograph that the committee votes on.'
          }
        ],
        frameworkConnection: 'MEDDPICC: Paper Process & Decision Process',
        quiz: [
          {
            id: 'q-1-2-1',
            question: 'What is the most common reason a new surgical technology is denied by a hospital Value Analysis Committee (VAC)?',
            options: [
              'The surgeon was not licensed in the state.',
              'The technology lacked FDA 510(k) clearance.',
              'The submission failed to provide health economics evidence justifying price delta over the incumbent GPO-contracted product.',
              'The device company did not offer personal gifts to committee members.'
            ],
            correctIndex: 2,
            explanation: 'VAC committees deny products when there is an unexplained cost premium without documented clinical or operational ROI (such as reduced readmissions or infection rates) that offsets the GPO pricing tier.'
          }
        ]
      },
      {
        id: 'les-1-3',
        title: 'Multi-Stakeholder Power Mapping in IDNs',
        durationMinutes: 40,
        executiveSummary: 'How to map Clinical Champions, Economic Buyers, Technical Gatekeepers, and Political Blockers.',
        coreConcepts: [
          {
            heading: 'The 4 Key Roles in Every Healthcare Deal',
            body: '1. Clinical Champion: The Surgeon or Key Opinion Leader (KOL) who has personal experience, high procedure volume, and credibility. 2. Economic Buyer: Hospital CFO, VP of Supply Chain, or Service Line Administrator with P&L sign-off authority. 3. Technical Evaluator: OR Nursing Director, Sterile Processing Manager, or Biomedical Engineer who checks sterilization, trays, and compatibility. 4. Coach: Internal insider (e.g., OR lead tech, clinical coordinator) who leaks timelines and competitor moves.',
            proTip: 'A surgeon is a Champion ONLY if they are willing to expend political capital on your behalf at the committee meeting. If they say "I love your product, just get it approved by purchasing," you do not have a Champion.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-1',
      title: 'Displacing an 11-Year Incumbent at a 900-Bed Academic Medical Center',
      companyContext: 'Leading Medical Device Maker (Orthopedic Joint Reconstruction)',
      scenario: 'Metropolitan Health had been 100% exclusive with Stryker for primary hip and knee arthroplasty under a Tier 3 Premier GPO rebate contract. A challenger rep wanted to introduce a kinematic alignment robotic knee system.',
      challenge: 'The Director of Materials Management barred any outside implant reps from entering the OR sterile core without an approved VAC submission, and the Chief of Orthopedics was loyal to the incumbent design.',
      strategyUsed: [
        'Identified two junior fellowship-trained joint surgeons who trained on kinematic alignment robotics during their fellowships at Mayo Clinic.',
        'Partnered with the hospital\'s Quality & Safety Officer, presenting 3-year registry data demonstrating a 1.2-day reduction in post-operative length of stay.',
        'Engineered a risk-share warranty: The manufacturer guaranteed to credit the hospital $5,000 for any 90-day revision due to component loosening.',
        'Pre-populated the VAC application, securing signatures from 3 surgical champions, and negotiated a pricing schedule matching the GPO Tier 3 tier.'
      ],
      outcomeMetrics: 'VAC approval granted in 60 days. Gained 42% market share within 9 months, generating $2.4M in new annual recurring implant revenue.',
      executiveTakeaway: 'Champions open doors, but health economics close hospital contracts. Match clinical excitement with unshakeable financial de-risking.'
    },
    finalExamQuestions: [
      {
        id: 'fe-1-1',
        question: 'Which stakeholder in an IDN holds the ultimate contractual veto power over capital purchases and implant standardization?',
        options: [
          'The Chief of Surgery exclusively',
          'The scrub nurse in OR 3',
          'The VP of Supply Chain / Hospital Chief Financial Officer',
          'The Medical Device Sales Representative'
        ],
        correctIndex: 2,
        explanation: 'The VP of Supply Chain and CFO hold financial and contractual authority, enforcing GPO compliance and budget caps.'
      },
      {
        id: 'fe-1-2',
        question: 'What defines a true "Champion" according to enterprise healthcare sales frameworks?',
        options: [
          'A doctor who accepts free product samples and smiles during presentations.',
          'A stakeholder with influence who actively sells internally on your behalf and provides access to the economic decision process.',
          'Any physician with more than 10 years of clinical practice.',
          'The hospital purchasing clerk who stamps purchase orders.'
        ],
        correctIndex: 1,
        explanation: 'A Champion has both access and influence, and actively expends political capital to drive your product through the internal approval process.'
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'The 4 Healthcare Sales Specializations: Deep Operating Mechanics',
    subtitle: 'Master the distinct technical, clinical, and operational realities of Device, Biotech, Pharma, and HealthTech.',
    durationHours: 8.0,
    experienceLevel: 'Foundation',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Each healthcare sales vertical operates with completely different rules of engagement, compensation plans, regulatory restrictions, and daily workflows. Learn the granular daily realities of standing scrubbed-in during 7-hour surgeries, analyzing oncologic Kaplan-Meier curves, mastering 90-second pharmaceutical detailing, and closing 7-figure enterprise healthtech contracts.',
    lessons: [
      {
        id: 'les-2-1',
        title: 'Medical Device Sales: OR Etiquette, Sterile Field & Tray Logistics',
        durationMinutes: 60,
        executiveSummary: 'What every rep must know before stepping foot inside the hospital surgical suite.',
        coreConcepts: [
          {
            heading: 'The Sacred Sterile Field & Aseptic Rules',
            body: 'In the Operating Room, unscrubbed reps must stay at least 18 inches away from all sterile tables, draping, and scrubbed personnel. Never reach over a blue sterile field! If scrubbed in to hold bone models or trial instruments, your sterile zone is only from your chest to your waist level, hands kept in front above waist height. Touching your mask, eyeglasses, or back immediately contaminates the field, halting the surgery and risking severe disciplinary ejection.',
            clinicalExample: 'A junior rep accidentally brushed their scrub jacket against the sterile Mayo stand during a total shoulder arthroplasty. The circulating nurse stopped the case, requiring a 25-minute re-sterilization of all surgical instrumentation, costing the hospital $1,800 in OR idle time.'
          },
          {
            heading: 'Instrument Trays, Autoclave Logistics & Consignment Stock',
            body: 'Device reps do not just talk; they manage high-value physical logistics. Surgical trays containing dozens of specialized reamers, trials, drivers, and screw caddies must be delivered to Central Sterile Processing (CSP) 24 hours prior to surgery to undergo steam autoclave sterilization. Reps verify tray completeness, check biological indicator strips, and manage consigned trunk inventory valued at $300,000 to $1,000,000.',
            proTip: 'The sterile processing manager and lead scrub tech are your most vital allies. Treat them with respect; a scrub tech can recommend your tray or complain to the surgeon that your instruments are difficult to assemble.'
          },
          {
            heading: 'Vendor Credentialing: RepTrax, Vendormate & Symplr',
            body: 'You cannot walk into a hospital without active credentialing. Reps must maintain up-to-date immunizations (Hepatitis B, MMR, TB skin tests, annual Flu, COVID), 10-panel drug screens, background checks, and certifications in OR Protocol, Bloodborne Pathogens, and HIPAA. A lapsed certificate means immediate lockout at the hospital security kiosk.',
            proTip: 'Always carry a physical backup badge and digital proof of credentialing on your phone.'
          }
        ],
        frameworkConnection: 'Operational Excellence & Credentialing',
        quiz: [
          {
            id: 'q-2-1-1',
            question: 'What is the minimum distance an unscrubbed medical device representative must maintain from any sterile drape or table in the OR?',
            options: ['6 inches', '18 inches', '3 feet', 'There is no distance requirement if wearing a mask'],
            correctIndex: 1,
            explanation: 'Standard aseptic protocol mandates maintaining at least 18 inches from all sterile fields to prevent inadvertent contamination of surgical instruments or patient draping.'
          }
        ]
      },
      {
        id: 'les-2-2',
        title: 'Biotech & Oncology: Clinical Trials, Buy-and-Bill & Market Access',
        durationMinutes: 55,
        executiveSummary: 'Master scientific literacy, Kaplan-Meier curves, and the high-stakes reimbursement mechanics of infused biologics.',
        coreConcepts: [
          {
            heading: 'Interpreting Oncology Clinical Evidence',
            body: 'Biotech sales reps speak the language of oncologists and hematologists. You must comfortably interpret Phase III randomized trial data: Overall Survival (OS), Progression-Free Survival (PFS), Objective Response Rate (ORR), Hazard Ratios (HR < 0.70 signifies a 30% reduction in risk of progression or death), 95% Confidence Intervals, and p-values (p < 0.05). If you cannot discuss biomarker stratification (e.g. EGFR mutations, PD-L1 TPS scores, HER2 status), you cannot sell oncology drugs.',
            clinicalExample: 'When detailing a thoracic oncologist, the rep highlights that the immunotherapy demonstrated a statistically significant Hazard Ratio for death of 0.68 (95% CI: 0.55-0.84, p=0.0003) in patients with PD-L1 expression >= 50%.'
          },
          {
            heading: 'The Buy-and-Bill Economics: ASP + 6%',
            body: 'In outpatient oncology clinics, infused drugs are purchased by the practice upfront under the "Buy-and-Bill" model. The clinic purchases $30,000 worth of medication per vial, infuses the patient, and bills Medicare or commercial insurers. Medicare reimburses at Average Sales Price (ASP) plus 6% (reduced to ~4.3% under federal sequestration). If a claim is denied due to an improper Prior Authorization (PA), the clinic absorbs a devastating $30,000 bad-debt loss!',
            proTip: 'The #1 objection in biotech is financial risk. Winning reps spend 50% of their time educating practice financial managers and pre-authorizing patient copay assistance.'
          },
          {
            heading: 'The 340B Drug Pricing Program',
            body: 'Section 340B allows qualifying safety-net hospitals to purchase outpatient drugs at 20-50% discounts while receiving standard commercial reimbursement, generating substantial margins for hospital systems. Reps must understand whether an account is 340B-covered to forecast revenue impact accurately.',
            proTip: '340B accounts have high formulary leverage; understand their margin capture incentives.'
          }
        ],
        frameworkConnection: 'Clinical Rigor & Reimbursement Defense'
      },
      {
        id: 'les-2-3',
        title: 'Pharma Detailing: High-Velocity Detailing, Sampling & PDMA',
        durationMinutes: 45,
        executiveSummary: 'The art of the 90-second clinical detail, signature capture, and routing optimization.',
        coreConcepts: [
          {
            heading: 'The 90-Second Hallway Detail Structure',
            body: 'Primary care and specialty physicians see 25-40 patients a day. You rarely get a 30-minute sit-down. The elite pharma detail follows a strict 4-step framework: 1. Hook (Immediate patient archetype identification), 2. Clinical Pivot (New head-to-head endpoint or guidelines update), 3. Overcome Access (Formulary status & digital copay card), 4. Committed Action (Asking the physician to identify their next 2 appropriate patients today).',
            clinicalExample: '"Dr. Chen, for your uncontrolled Type 2 diabetic patients with established ASCVD who are struggling on metformin alone, our cardiovascular outcomes trial demonstrated a 14% MACE risk reduction. It is now Tier 2 preferred on BlueCross with a $15 copay card. Will you trial this on your next two uncontrolled patients this morning?"'
          },
          {
            heading: 'PDMA & Sample Accountability',
            body: 'The Prescription Drug Marketing Act (PDMA) strictly regulates sample distribution. Reps must physically count sample stock, obtain valid state medical license verification, capture secure electronic signatures, and perform bi-annual audits. Loss of even two sample blister packs can trigger mandatory DEA/FDA notifications and termination.',
            proTip: 'Never use drug samples as a casual gift or greeting card. Samples are clinical initiation tools designed to assess patient tolerability before filling a 90-day prescription.'
          }
        ]
      },
      {
        id: 'les-2-4',
        title: 'HealthTech & SaMD: Enterprise SaaS Cycles & EHR Integration',
        durationMinutes: 50,
        executiveSummary: 'Closing 7-figure hospital IT contracts, navigating Epic App Orchard, and clinical workflow adoption.',
        coreConcepts: [
          {
            heading: 'The EHR Moat: Epic, Cerner & FHIR APIs',
            body: 'If a clinical software or AI diagnostic tool requires doctors to log into a separate browser tab, adoption will plunge to zero. Enterprise healthcare technology must integrate directly into the physician workflow via Epic Systems (Community Library / App Orchard) or Cerner / Oracle Millenium using SMART on FHIR and HL7 protocols.',
            proTip: 'Involve the hospital Chief Medical Information Officer (CMIO) early to validate whether the integration will be single-sign-on (SSO) native inside Epic Hyperspace.'
          },
          {
            heading: 'Building the Health Economics ROI Model',
            body: 'Hospital CFOs do not buy software because it has "cool algorithms." They buy software to prevent financial penalties: 1) CMS Hospital Readmissions Reduction Program (HRRP) penalties, 2) Emergency Department boarding hours, 3) Clinician burnout / RN turnover costs, and 4) Missing RVU billing capture.',
            clinicalExample: 'A clinical decision support software costing $350k/year was justified to the CFO by demonstrating a 0.8-day reduction in average length of stay (ALOS) across 1,200 congestive heart failure admissions, unlocking $1.6M in bed capacity.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-2',
      title: 'Accelerating a Novel CAR-T Cell Therapy in Regional Cancer Networks',
      companyContext: 'Clinical-Stage Oncology Biotechnology Firm',
      scenario: 'A groundbreaking autologous CAR-T therapy for relapsed diffuse large B-cell lymphoma was approved by the FDA, priced at $475,000 per single-dose infusion. Community oncology clinics were terrified of prescribing it due to the financial float and fear of non-payment.',
      challenge: 'Commercial insurers took up to 90 days to adjudicate claims, meaning a community clinic risked bankruptcy if two claims were tied up in audits.',
      strategyUsed: [
        'Deployed dedicated Field Access Specialists (FAS) embedded directly inside the clinic billing offices.',
        'Established an electronic Rapid Prior-Authorization Guarantee program providing real-time pre-certification verification within 72 hours.',
        'Connected the clinic financial director to manufacturer-backed zero-interest consignment bridging credit lines.',
        'Trained oncology nurse coordinators on cytokine release syndrome (CRS) grading and rapid tocilizumab administration.'
      ],
      outcomeMetrics: 'Treated 38 patients in the first 6 months with zero billing denials, establishing the territory as the #1 performing region in the country.',
      executiveTakeaway: 'In high-cost biotech, clinical superiority means nothing without seamless financial plumbing and pre-authorization de-risking.'
    },
    finalExamQuestions: [
      {
        id: 'fe-2-1',
        question: 'Under Medicare Part B "Buy-and-Bill", how does an outpatient clinic generate reimbursement for an infused biologic?',
        options: [
          'The patient pays cash directly at the front desk.',
          'The clinic purchases the drug in advance, administers it, and bills Medicare based on Average Sales Price (ASP) + statutory percentage.',
          'The manufacturer donates the drug for free and bills the state governor.',
          'The clinic charges an hourly nursing fee only.'
        ],
        correctIndex: 1,
        explanation: 'Buy-and-bill requires the clinic to purchase and hold drug inventory, administering it and billing Medicare at ASP + statutory margin.'
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Elite Sales Methodologies Adapted for Healthcare (MEDDPICC & SPIN)',
    subtitle: 'Translate Wall Street enterprise sales power tools into clinical hospital environments.',
    durationHours: 7.0,
    experienceLevel: 'Intermediate',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Generic sales tactics fail miserably with physicians and hospital executives. Doctors have spent 12+ years in rigorous scientific training and detect cheesy sales tactics within 5 seconds. Learn how to execute MEDDPICC, SPIN Selling, and The Challenger Sale with surgical clinical precision.',
    lessons: [
      {
        id: 'les-3-1',
        title: 'MEDDPICC Masterclass for Hospital Systems',
        durationMinutes: 55,
        executiveSummary: 'The definitive enterprise qualification framework adapted for healthcare institutions.',
        coreConcepts: [
          {
            heading: 'M - Metrics (Quantified Clinical & Financial Value)',
            body: 'What is the quantified impact? In healthcare: Complication rate reduction, OR turnover minutes saved, post-op length of stay (LOS), surgical site infection (SSI) reduction, readmission penalties avoided, or increased procedural RVUs per surgeon.',
            clinicalExample: '"Dr. Vance, reducing your average revision rate from 4.2% to 1.8% across your 300 annual joint cases saves your hospital system an estimated $360,000 in uncompensated DRG readmission costs."'
          },
          {
            heading: 'E - Economic Buyer (The True Signer)',
            body: 'Surgeons are rarely the Economic Buyer. The Economic Buyer in healthcare is the Hospital CFO, the VP of Supply Chain, the Service Line Administrative Director, or the Health Plan Pharmacy Director. You must establish direct access to this individual or your deal will stall indefinitely.',
            proTip: 'Test whether your contact is the Economic Buyer by asking: "When we reach final agreement, whose signature actually binds the health system on the master purchase agreement?"'
          },
          {
            heading: 'D - Decision Criteria (Clinical vs Economic)',
            body: 'Decision criteria in healthcare are split: 1) Clinical criteria (implant biocompatibility, ease of use, tactile feedback, FDA indication), 2) Financial criteria (acquisition price, GPO rebate compliance, reimbursement crosswalk), 3) Operational criteria (tray weight, sterilization turn time, consignment footprint).',
            proTip: 'If you did not help draft the decision criteria, your competitor did.'
          },
          {
            heading: 'D - Decision Process & P - Paper Process',
            body: 'Decision Process is the timeline and evaluation stages (Surgeon trial -> VAC review -> Clinical consensus -> Price negotiation). Paper Process is the bureaucratic mechanics (Legal redlines -> Business Associate Agreement (BAA) -> Vendor credentialing -> GPO tier verification -> Purchase Order creation). Reps lose months confusing these two!',
            clinicalExample: 'A deal approved by VAC on March 1st can easily take until September 1st if the hospital legal team has a 90-day queue for indemnification clause review.'
          },
          {
            heading: 'I - Identify Pain (Personal & Institutional)',
            body: 'Surgeons feel personal pain: instrument failure mid-surgery, prolonged OR hours keeping them away from family, high complication rates impacting their national reputation. Hospitals feel institutional pain: Leapfrog safety score drops, CMS penalties, staff overtime costs.',
            proTip: 'Connect the personal pain of the clinician to the institutional pain of the executive.'
          },
          {
            heading: 'C - Champion & C - Competition',
            body: 'Your Champion must have a personal stake in your victory. Competition is not just other brands (Stryker, Medtronic, Pfizer); your biggest competitor is status quo and hospital inertia ("doing nothing").',
            proTip: 'Always qualify your Champion by giving them a test task: ask them to send an introductory email to the VAC Chair or request the hospital pricing crosswalk.'
          }
        ],
        frameworkConnection: 'MEDDPICC Healthcare Mastery'
      },
      {
        id: 'les-3-2',
        title: 'SPIN Selling in the Clinical Consultation',
        durationMinutes: 50,
        executiveSummary: 'Formulating Situation, Problem, Implication, and Need-Payoff questions that lead physicians to their own conclusions.',
        coreConcepts: [
          {
            heading: 'S - Situation Questions (Keep to a Minimum)',
            body: 'Doctors hate being interrogated about facts you should already know. Never ask: "How many surgeries do you do?" Look up their case volume on state registry databases or Definitive Healthcare before walking in! Ask only high-context situation questions.',
            clinicalExample: '"Dr. Roberts, looking at your active spine caseload, approximately what percentage of your adult deformity cases involve osteoporotic bone density?"'
          },
          {
            heading: 'P - Problem Questions (Uncovering Sub-optimal Reality)',
            body: 'Probe where the current clinical routine breaks down. Ask about screw stripping, suture fraying, camera fogging, delayed lab turnarounds, or excessive post-op nausea.',
            clinicalExample: '"When you are executing the proximal anchor placement in heavy revisions, how often do you experience cortical breach or screw back-out?"'
          },
          {
            heading: 'I - Implication Questions (Magnifying the Consequence)',
            body: 'Implication questions turn a mild nuisance into an urgent clinical crisis. Connect the technical problem to surgical time, patient outcomes, and surgeon stress.',
            clinicalExample: '"When a screw strips in osteopenic bone, how much does that extend your anesthesia time, and how does that affect your next two scheduled cases waiting in pre-op?"'
          },
          {
            heading: 'N - Need-Payoff Questions (Getting the Doctor to Sell Themselves)',
            body: 'Never tell a doctor your product is better. Ask a question where the only logical answer describes the exact benefits of your solution.',
            clinicalExample: '"If our self-tapping dual-core thread design could guarantee 38% higher pullout strength in cancellous bone without requiring cement augmentation, how would that alter your approach to high-risk deformity revisions?"'
          }
        ]
      },
      {
        id: 'les-3-3',
        title: 'The Healthcare Challenger: Commercial Teaching',
        durationMinutes: 45,
        executiveSummary: 'How to respectfully challenge surgical dogma and hospital administrative misconceptions.',
        coreConcepts: [
          {
            heading: 'Teach, Tailor, Take Control in the Medical Setting',
            body: 'Challenger reps do not cater to every whim of the customer. They bring counter-intuitive insights grounded in clinical studies. They teach hospital executives something new about their own business model, tailor the message to the specific stakeholder, and take control of the commercial conversation without being aggressive.',
            clinicalExample: 'Showing an orthopedic department that by switching to disposable single-use sterile instruments, they eliminate $180,000 in autoclave bioburden reprocessing errors and save 22 minutes between case turnarounds.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-3',
      title: 'Rescuing a Stalled $1.2M Cardiovascular Deal Using Full MEDDPICC Audit',
      companyContext: 'Structural Heart Technology Company',
      scenario: 'A transcatheter mitral valve repair device had verbal approval from the Chief of Cardiology, but 7 months passed without a single purchase order issued.',
      challenge: 'The rep assumed the deal was closed because the doctor was excited. Meanwhile, the hospital Chief Operating Officer was quietly blocking the onboarding due to cardiac cath lab scheduling bottlenecks.',
      strategyUsed: [
        'Conducted a rigorous MEDDPICC gap analysis, discovering there was zero Economic Buyer alignment and no mapped Paper Process.',
        'Met with the Cath Lab Nurse Manager to identify real pain: procedure preparation was consuming 90 minutes of room setup.',
        'Created a tailored procedural workflow protocol that reduced room setup to 35 minutes.',
        'Presented the COO with a cardiac cath lab throughput financial model showing an additional $840k in annual facility fees generated by adding one extra case per week.'
      ],
      outcomeMetrics: 'Paper process cleared in 21 days; first clinical implants scheduled the following month.',
      executiveTakeaway: 'Clinical excitement without administrative operational alignment is a hallucination.'
    },
    finalExamQuestions: [
      {
        id: 'fe-3-1',
        question: 'In SPIN Selling, what is the primary objective of "Implication Questions"?',
        options: [
          'To establish the physician\'s medical school credentials.',
          'To help the customer realize the true operational, financial, and clinical severity of an unresolved problem.',
          'To quote product catalog part numbers.',
          'To ask the doctor for a signed purchase contract immediately.'
        ],
        correctIndex: 1,
        explanation: 'Implication questions magnify the cost of inaction, transforming a known minor inconvenience into an urgent priority that demands budget and attention.'
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Health Economics, Reimbursement, CPT/HCPCS/DRG Coding & Market Access',
    subtitle: 'The #1 reason healthcare reps fail is lack of reimbursement literacy. Master the money trail.',
    durationHours: 6.0,
    experienceLevel: 'Advanced',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'If a doctor loves your device or drug, but the hospital or clinic cannot get reimbursed for it, they will never use it. Learn the architecture of medical billing, Medicare Part A/B/C/D, CPT procedural coding, HCPCS Level II supply codes, ICD-10 diagnostic coding, and how to craft bulletproof Prior Authorization strategies.',
    lessons: [
      {
        id: 'les-4-1',
        title: 'The Triad of Medical Coding: CPT, HCPCS & ICD-10',
        durationMinutes: 50,
        executiveSummary: 'How clinical procedures, devices, and diagnoses are translated into insurance payment.',
        coreConcepts: [
          {
            heading: 'CPT Codes (Current Procedural Terminology)',
            body: 'Maintained by the American Medical Association (AMA). CPT codes describe WHAT the physician did (e.g., CPT 27447: Total Knee Arthroplasty). Category I codes are permanent and reimbursed. Category III codes (ending in T, e.g., 0446T) are temporary tracking codes for emerging technologies and frequently DO NOT have guaranteed reimbursement, creating severe commercial friction!',
            clinicalExample: 'If your new surgical robotic technique requires a Category III code, commercial insurers may consider it "experimental and investigational," refusing physician payment.'
          },
          {
            heading: 'HCPCS Level II Codes (Supplies, Implants & Injectables)',
            body: 'Maintained by CMS. C-codes (pass-through device codes for hospital outpatients), J-codes (non-orally administered medication and chemotherapy injections, e.g., J9271 for pembrolizumab), and Q-codes. Obtaining a permanent, product-specific Q or J code is the holy grail for pharmaceutical and biologic commercialization.',
            proTip: 'When launching a new injectable drug, clinics must use a miscellaneous J-code (J3490/J3590) until a permanent code is assigned. This requires manual invoice submission and delays clinic cash flow by 60-90 days.'
          },
          {
            heading: 'ICD-10-CM (Diagnosis Codes)',
            body: 'Describes WHY the patient required the service (e.g., M17.11: Primary unilateral osteoarthritis, right knee). An improper ICD-10 link results in an immediate medical necessity denial from Medicare or private payers.',
            proTip: 'Always equip clinical staff with a reimbursement coding guide showing compliant ICD-10 and CPT crosswalk pairings.'
          }
        ]
      },
      {
        id: 'les-4-2',
        title: 'Mastering Prior Authorizations (PA) & Step Therapy Overrides',
        durationMinutes: 45,
        executiveSummary: 'How to help practices defeat insurance denials and keep patient treatments moving forward.',
        coreConcepts: [
          {
            heading: 'The Prior Authorization Battlefield',
            body: 'Prior Authorization (PA) is utilized by health plans and Pharmacy Benefit Managers (PBMs) to restrict access to high-cost branded therapies. PAs require clinical charts proving the patient meets strict diagnostic criteria. Incomplete submissions lead to automatic rejections.',
            clinicalExample: 'A specialty biologic requires proof that the patient failed at least two conventional DMARD therapies (such as methotrexate and sulfasalazine) for at least 12 weeks each before coverage is approved.'
          },
          {
            heading: 'Writing Effective Letters of Medical Necessity (LMN)',
            body: 'Commercial reps cannot write medical records for doctors, but they CAN provide peer-reviewed clinical citations, FDA package inserts, and template appeal formats that the clinical team can customize. Overcoming Step Therapy ("fail first" protocols) requires documenting contraindications or severe adverse events with the step-therapy alternative.',
            proTip: 'Establish a working relationship with the clinic\'s lead prior-authorization coordinator. They are the gatekeeper to whether your prescription actually gets filled.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-4',
      title: 'Turning a Reimbursement Crisis into a 300% Territory Expansion',
      companyContext: 'Advanced Wound Care & Regenerative Biologics Company',
      scenario: 'A novel placental tissue graft received a new reimbursement ruling requiring specific surface area wound measurements and 30-day conservative therapy documentation before application.',
      challenge: 'Territory sales plummeted 70% in month one as physicians feared audit clawbacks and claim recoupments from Medicare Administrative Contractors (MACs).',
      strategyUsed: [
        'Conducted territory-wide clinical documentation workshops for wound clinic nurses and billing staff.',
        'Created an easy-to-use Clinical Audit Checklist ensuring medical records documented every mandatory parameter before grafting.',
        'Partnered with clinical leadership to ensure all claims utilized appropriate HCPCS Q-codes and modifier codes.',
        'Educated clinic executives on the margin safety net provided by compliant documentation.'
      ],
      outcomeMetrics: 'Clinic claim denial rate dropped from 44% to under 2%. The territory rebounded to achieve 320% of annual quota.',
      executiveTakeaway: 'The sales rep who solves reimbursement anxiety for their customers earns unbreakable account loyalty.'
    },
    finalExamQuestions: [
      {
        id: 'fe-4-1',
        question: 'What is the primary commercial risk of a new medical technology having only an AMA Category III CPT code?',
        options: [
          'The device is prohibited from being shipped across state lines.',
          'Category III codes are temporary tracking codes that frequently lack established reimbursement values, resulting in non-coverage or case-by-case denial by commercial payers.',
          'Category III codes can only be used by pediatric surgeons.',
          'Category III codes require the sales rep to personally pay the hospital.'
        ],
        correctIndex: 1,
        explanation: 'Category III codes are unvalued tracking codes. Payers often deem them experimental, making reimbursement uncertain and discouraging physician adoption.'
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Healthcare Law, Compliance & Ethics: Protect Your Career & License',
    subtitle: 'Understanding the Anti-Kickback Statute, Stark Law, Sunshine Act, Off-Label Rules, and HIPAA.',
    durationHours: 5.5,
    experienceLevel: 'Mastery',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Healthcare sales has the most stringent federal regulatory enforcement of any commercial industry. Violations do not just lead to getting fired—they can result in multi-million-dollar False Claims Act judgments, federal prison sentences, and exclusion from all federal healthcare programs. Master the compliance boundary lines to sell with absolute confidence and integrity.',
    lessons: [
      {
        id: 'les-5-1',
        title: 'The Federal Anti-Kickback Statute (AKS) & Stark Law',
        durationMinutes: 45,
        executiveSummary: 'Never offer anything of value to induce a referral or purchase of a federally reimbursed healthcare product.',
        coreConcepts: [
          {
            heading: 'The Anti-Kickback Statute (AKS) Explained',
            body: 'The AKS is a criminal statute that prohibits knowingly and willfully offering, paying, soliciting, or receiving any remuneration (directly or indirectly, in cash or in kind) to induce or reward patient referrals or the generation of business reimbursable by federal healthcare programs (Medicare/Medicaid). Remuneration includes lavish dinners, sporting event tickets, hunting trips, inflated consulting agreements, or free medical equipment.',
            clinicalExample: 'A device distributor offered an orthopedic surgeon a paid "consulting agreement" of $5,000/month for minimal work in exchange for using their spinal implants. The DOJ prosecuted both the rep and surgeon under the False Claims Act, resulting in a $9.2M settlement and felony convictions.'
          },
          {
            heading: 'Stark Law (Physician Self-Referral Law)',
            body: 'Stark Law is a civil statute prohibiting a physician from making referrals for designated health services (DHS) payable by Medicare to an entity with which the physician (or an immediate family member) has a financial relationship, unless an exception applies. Stark is a strict liability statute—intent does not need to be proven!',
            proTip: 'Never structure physician investment syndicates or distributorship shares without healthcare regulatory legal review.'
          }
        ]
      },
      {
        id: 'les-5-2',
        title: 'The Sunshine Act, Off-Label Marketing & HIPAA',
        durationMinutes: 45,
        executiveSummary: 'Transparency reporting, staying on-label, and protecting patient data in the field.',
        coreConcepts: [
          {
            heading: 'The Physician Payments Sunshine Act (Open Payments)',
            body: 'Manufacturers of drugs, devices, and biologics must track and report every single transfer of value over $12 to physicians and teaching hospitals to CMS. This public database shows every meal, honorarium, research grant, and travel expense associated with every licensed doctor in America.',
            proTip: 'Many academic medical centers strictly prohibit reps from bringing in any food whatsoever. Always confirm the institution\'s local conflict of interest (COI) policy.'
          },
          {
            heading: 'The Off-Label Promotion Prohibition',
            body: 'Commercial sales reps are legally restricted to promoting products strictly for FDA-approved or cleared indications listed on the package insert. A rep CANNOT suggest, encourage, or recommend an unapproved use. Only Medical Affairs personnel (such as Medical Science Liaisons / MSLs) may respond to unsolicited physician inquiries with objective scientific data.',
            clinicalExample: 'If a surgeon asks: "Can I use your pediatric heart valve in an adult off-label revision?", a commercial rep must state: "Dr. Smith, that indication is outside our FDA-approved labeling. However, I can have our Medical Affairs team send you the published literature."'
          },
          {
            heading: 'HIPAA & Protected Health Information (PHI) in the Field',
            body: 'Never photograph a patient, surgical schedule, or medical chart. In the OR, do not record patient names or identifiers in your notes. Doing so constitutes a severe HIPAA privacy violation.',
            proTip: 'When logging case notes in your CRM, use only case numbers or anonymized anatomy references (e.g. "Left THA case with Dr. V").'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-5',
      title: 'The Whistleblower Lawsuit: Anatomy of an Off-Label Marketing Trap',
      companyContext: 'Major Pharmaceutical Manufacturer',
      scenario: 'A sales director pressured reps to distribute reprints of an off-label clinical trial to primary care doctors to expand drug sales beyond its narrow FDA-approved rare disease indication.',
      challenge: 'A conscientious rep refused to comply, was threatened with quota termination, and contacted compliance.',
      strategyUsed: [
        'The rep maintained rigorous paper trails of all written marketing directives.',
        'The company’s internal compliance board launched an immediate internal audit and self-reported to the Department of Justice.',
        'Retrained the entire national salesforce on the strict demarcation between commercial detailing and MSL scientific exchange.'
      ],
      outcomeMetrics: 'The company resolved the inquiry with a Corporate Integrity Agreement (CIA) and avoided criminal charges. The ethical rep was promoted to Regional Sales Training Director.',
      executiveTakeaway: 'Your reputation and ethics are your only permanent assets in healthcare. Never compromise compliance for quarterly quota.'
    },
    finalExamQuestions: [
      {
        id: 'fe-5-1',
        question: 'Under FDA regulations, how must a commercial sales representative respond if a physician asks how to use a product for an unapproved, off-label surgical indication?',
        options: [
          'Explain the off-label technique in detail, as long as it is done verbally without marketing brochures.',
          'Offer the physician a free sample to test the off-label technique.',
          'State that the use is outside the approved FDA labeling, decline to promote it, and offer to connect the physician to Medical Affairs / Medical Science Liaisons for objective scientific literature.',
          'Tell the doctor to write a fake prescription.'
        ],
        correctIndex: 2,
        explanation: 'Commercial sales reps are strictly prohibited from promoting off-label uses. Unsolicited medical inquiries must be directed to Medical Affairs / MSLs.'
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Tactical Prospecting, Gatekeeper Infiltration & HCP Access',
    subtitle: 'How to gain access to "No-See" physicians, penetrate medical offices, and capture surgeon attention.',
    durationHours: 6.0,
    experienceLevel: 'Intermediate',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Over 60% of physicians now restrict or completely ban pharmaceutical and medical device representatives from their offices. Cold calling clinic phone lines yields a 0% success rate. Learn the advanced tactics of modern healthcare prospecting: winning over Practice Managers, leveraging Surgical Schedulers, attending Academic Grand Rounds, and the 45-Second Scrub Sink Elevator Pitch.',
    lessons: [
      {
        id: 'les-6-1',
        title: 'Penetrating the "No Reps" Clinic & Winning the Gatekeeper',
        durationMinutes: 45,
        executiveSummary: 'How to build trust with Practice Managers, Medical Assistants, and Surgical Schedulers.',
        coreConcepts: [
          {
            heading: 'The Gatekeeper\'s Real Mandate',
            body: 'Practice Managers and front desk coordinators do not hate sales reps; they hate disruption, chaos, and pushy people who disrespect their patient workflow. Their primary mandate is keeping the clinic on schedule and shielding the physician from wasted time.',
            proTip: 'Never look past the front desk staff. Learn their first names, ask about their workflow challenges, and bring real value to their administrative burden (e.g. copay portals, patient education tear-sheets, manufacturer reimbursement hotlines).'
          },
          {
            heading: 'The Breakfast / Lunch Strategy Done Compliantly',
            body: 'If providing a compliant educational in-service meal, coordinate it with the Lead Medical Assistant or Practice Administrator at least two weeks in advance. Provide a clear educational clinical topic on the sign-up sheet, not just "free food."',
            clinicalExample: '"Hi Brenda, I know Dr. Patel is completely booked with diabetic neuropathy patients on Tuesdays. We just released an updated consensus algorithm on reducing foot ulcer amputations that our Medical Director published. Could I schedule a brief 10-minute clinical in-service for the nursing team next Thursday during their lunch break?"'
          }
        ]
      },
      {
        id: 'les-6-2',
        title: 'Hospital Hallway, Scrub Sink & Grand Rounds Prospecting',
        durationMinutes: 45,
        executiveSummary: 'Mastering the 45-second scrub sink encounter and non-traditional access points.',
        coreConcepts: [
          {
            heading: 'The 45-Second Scrub Sink Pitch',
            body: 'Surgeons wash their hands at the scrub sink for 3 to 5 minutes before every case. This is one of the only moments in their day when they are standing still, uninterrupted by phones or pagers. However, their mental focus is on the patient in the room.',
            proTip: 'Do not launch into a pitch while they are scrubbing. Acknowledge their focus: "Dr. Marcus, good luck with this anterior hip revision. I noticed your patient has substantial acetabular bone loss. When you finish this afternoon, I\'d love to show you a 3D CT reconstruction model of how our porous augments lock in Type IIIA defects. Can I leave the model at the nurses\' station for you?"'
          },
          {
            heading: 'Surgical Grand Rounds & Fellowship Programs',
            body: 'Academic departments host weekly Grand Rounds and Morbidity & Mortality (M&M) conferences. Attend these open academic sessions. Listen to the clinical complications the department is discussing. Connecting with Fellows and Chief Residents is high-leverage: within 12 to 24 months, these fellows will graduate into attending positions at new hospital systems where they will establish their own brand loyalties!',
            proTip: 'The rep who supports a surgical fellow becomes their default go-to partner when they become an attending surgeon.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-6',
      title: 'Cracking a "Zero Rep Policy" Orthopedic Mega-Clinic',
      companyContext: 'Surgical Sports Medicine Device Specialist',
      scenario: 'A 24-surgeon orthopedic group practice instituted a strict "Zero Reps Allowed" policy, posting security signage at every entrance.',
      challenge: 'Previous reps tried sneaking in through patient doors and were permanently blacklisted from the facility.',
      strategyUsed: [
        'Researched the clinic\'s high rate of secondary rotator cuff repairs via state outpatient database.',
        'Contacted the Lead Physical Therapist affiliated with the clinic\'s post-op rehabilitation center.',
        'Delivered educational anatomical models to the PT team to help patients understand tendon healing timelines.',
        'The PT Director introduced the rep to the Senior Partner surgeon as a clinical rehabilitation specialist.',
        'The surgeon invited the rep to consult on a complex revision case at the surgery center.'
      ],
      outcomeMetrics: 'Earned full access credentialing; converted 8 surgeons in the group within 6 months, yielding $1.4M in annual sports medicine implants.',
      executiveTakeaway: 'When the front door is barricaded, build clinical value in the patient care continuum until they invite you through the side door.'
    },
    finalExamQuestions: [
      {
        id: 'fe-6-1',
        question: 'When encountering a surgeon at the scrub sink prior to an upcoming procedure, what is the best tactical approach?',
        options: [
          'Hand them a glossy product catalog and demand they read it immediately.',
          'Start talking loudly about pricing discounts.',
          'Respect their procedural focus, mention a relevant anatomical challenge related to the case type, and ask for a brief 2-minute post-case discussion.',
          'Touch their sterile gown to get their physical attention.'
        ],
        correctIndex: 2,
        explanation: 'Surgeons need intense focus during scrub-in. Acknowledge their mental state, demonstrate clinical relevance, and defer detailed discussion to after the procedure.'
      }
    ]
  },
  {
    id: 'mod-7',
    number: 7,
    title: 'The 25+ Healthcare Objection Handling & VAC Defense Playbook',
    subtitle: 'Word-for-word scripts to dismantle incumbent loyalty, price freezes, and formulary barriers.',
    durationHours: 7.5,
    experienceLevel: 'Mastery',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Physicians and hospital executives use the same 6 objections to dismiss 95% of sales reps: "I\'m happy with what I use," "We have an exclusive GPO contract," "Your price is too high," "Our P&T committee meets only twice a year," and "My office doesn\'t see reps." Learn the psychology behind each objection and master the 3-step Disarm, Re-frame, and Clinical Low-Friction Close.',
    lessons: [
      {
        id: 'les-7-1',
        title: 'The Anatomy of Healthcare Objections & The 3-Step Reversal',
        durationMinutes: 50,
        executiveSummary: 'Why arguing with clinicians fails, and how to use constructive tension to re-frame clinical choices.',
        coreConcepts: [
          {
            heading: 'Step 1: Disarm & Validate (Zero Resistance)',
            body: 'When a surgeon says: "I\'ve used Stryker for 10 years and my outcomes are great," never disagree! Disagreeing attacks their clinical judgment and past surgical patients. Validate immediately: "Dr. Vance, Stryker makes an outstanding hip system, and having ten years of reproducible outcomes is exactly what your patients deserve."',
            proTip: 'When you validate their choice, you disarm their defensiveness and earn the psychological right to ask a probing question.'
          },
          {
            heading: 'Step 2: Introduce Constructive Tension (The Clinical Blindspot)',
            body: 'Introduce a specific clinical scenario where the incumbent platform presents known compromises or mechanical limits.',
            clinicalExample: '"However, in patients with severe coxa vara or heavy femoral canal mismatch, do your scrub techs ever find that standard broach geometry compromises your leg-length offset?"'
          },
          {
            heading: 'Step 3: The Micro-Commitment Close (Low-Friction Trial)',
            body: 'Never ask a surgeon to switch their entire practice on day one. Ask only for a low-risk evaluation on a single indicated case.',
            proTip: '"I wouldn\'t ask you to change your routine primary cases. But on your next patient with significant bone deformity, would you be open to trialing our dual-mobility offset in just that single case so you can feel the stability firsthand?"'
          }
        ]
      },
      {
        id: 'les-7-2',
        title: 'Dismantling Financial & Administrative Objections',
        durationMinutes: 45,
        executiveSummary: 'How to overcome "Our GPO contract is exclusive" and "Our VAC has a budget freeze."',
        coreConcepts: [
          {
            heading: 'Overcoming: "We are locked into an exclusive GPO contract"',
            body: 'Health systems have GPO contracts, but every GPO agreement contains an "Unmet Clinical Need" or "Physician Preference Exception" clause (typically allowing 10-20% off-contract purchasing).',
            clinicalExample: '"Mr. Davis, we respect Memorial Health\'s commitment to the Premier contract. That is why we are not asking to displace your commodity implants. However, under section 4B of Premier\'s specialty carve-out, physicians can access breakthrough technologies for complex revisions. If we price this cost-neutral to your existing tier, would that satisfy your supply chain metrics?"'
          },
          {
            heading: 'Overcoming: "Your product is too expensive"',
            body: 'Shift the conversation from Unit Price (Acquisition Cost) to Total Episode Cost of Care. An implant that costs $400 more but prevents a $38,000 deep surgical site infection is an extraordinary bargain for the hospital.',
            proTip: 'Always calculate the cost of complications vs the price delta of the device.'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-7',
      title: 'Overcoming a 100% Formulary Lockout at an Oncology Hospital Network',
      companyContext: 'Biotech Specialty Pharma',
      scenario: 'A state cancer institute placed a competitor\'s checkpoint inhibitor as the sole preferred drug on formulary, rejecting all other PD-1 therapies.',
      challenge: 'Staff oncologists were instructed by pharmacy leadership that writing non-formulary requests would trigger institutional review.',
      strategyUsed: [
        'Identified a high-need patient population: Non-small cell lung cancer patients with high tumor mutational burden (TMB) where our drug held unique FDA breakthrough designation.',
        'Supplied the Pharmacy Director with a comprehensive Budget Impact Model demonstrating that the competitor drug required 3-week infusion visits, whereas our formulation allowed 6-week scheduling.',
        'Demonstrated that 6-week scheduling halved chair-time nursing bottlenecks, expanding the infusion center\'s capacity by 140 new patient visits per quarter.'
      ],
      outcomeMetrics: 'P&T committee voted unanimously to add the drug as co-preferred formulary within 45 days.',
      executiveTakeaway: 'When price and clinical parity are stalemated, win on operational throughput and clinic labor capacity.'
    },
    finalExamQuestions: [
      {
        id: 'fe-7-1',
        question: 'When a surgeon asserts they are 100% satisfied with their current vendor, what is the most effective psychological response?',
        options: [
          'Explain why their current vendor\'s product has outdated technology.',
          'Validate their success with the incumbent, then probe for a specific edge-case or anatomical complexity where the incumbent has known limitations.',
          'Offer to pay for their dinner if they switch.',
          'Complain to the hospital CEO.'
        ],
        correctIndex: 1,
        explanation: 'Validating their experience avoids defensiveness. Probing for specific clinical edge-cases creates curiosity without insulting their clinical judgment.'
      }
    ]
  },
  {
    id: 'mod-8',
    number: 8,
    title: 'The Top 1% Healthcare Sales Career Accelerator & Getting Hired',
    subtitle: 'Build the legendary Brag Book, ace the Gallup Behavioral Interview, and secure your $200k+ offer.',
    durationHours: 6.5,
    experienceLevel: 'Mastery',
    relevantTracks: ['med_device', 'biotech_oncology', 'pharma', 'healthtech_samd'],
    description: 'Breaking into medical device, biotech, or top pharma sales is famously competitive. Companies like Stryker, Medtronic, Intuitive Surgical, and Genentech receive 500+ resumes per open role. Learn how top candidates bypass automated HR filters, construct a championship 30-page "Brag Book", decode the Gallup / Gallagher personality screening, and execute the 30-60-90 Day Territory Plan that secures top offers.',
    lessons: [
      {
        id: 'les-8-1',
        title: 'Anatomy of the Medical Sales "Brag Book" (Portfolio)',
        durationMinutes: 45,
        executiveSummary: 'The physical and digital portfolio that separates the top 1% from generic applicants.',
        coreConcepts: [
          {
            heading: 'What Goes Inside a Championship Brag Book?',
            body: 'A Brag Book is tangible evidence of high performance. It contains: 1) Executive Summary & Professional Mission, 2) Quota Stack Rankings (showing you were #1 out of 80 reps, or top 5%), 3) W-2 / Commission Statements (verifying earnings and President\'s Club trips), 4) Letters of Recommendation from Surgeons / Clinical Leaders, 5) Clinical Certifications & Continuing Education, 6) Sample 30-60-90 Day Territory Business Plan.',
            proTip: 'If transitioning from B2B sales (e.g. ADP, Cintas, Enterprise, Yelp), include ranking tables, quota attainment percentages (e.g. 142% of plan), and trophies/awards. Medical sales hiring managers look for proven competitors.'
          },
          {
            heading: 'The 30-60-90 Day Territory Business Plan for Interviews',
            body: 'Walking into a final interview with a customized 30-60-90 Day Plan tailored to the hiring manager\'s actual open territory proves you are ready to produce revenue from day one. Section 30 Days: Credentialing, product mastery, OR shadowing. Section 60 Days: Top 20 hospital routing, surgeon profiling, VAC pipeline audit. Section 90 Days: First clinical evaluation cases, GPO alignment, initial revenue generation.',
            clinicalExample: 'A candidate presented a 30-60-90 day plan mapping out the exact 12 trauma centers and ASCs in Dallas-Fort Worth, including surgeon volume from state public datasets. The Regional VP hired them on the spot.'
          }
        ]
      },
      {
        id: 'les-8-2',
        title: 'Decoding the Gallup / Predictive Index Assessment & STAR Interviews',
        durationMinutes: 50,
        executiveSummary: 'How to ace the rigorous behavioral screenings used by Stryker, Medtronic, and J&J.',
        coreConcepts: [
          {
            heading: 'The Gallup Interview (The Stryker Screening)',
            body: 'Stryker and other top medical companies use structured telephone Gallup screenings. They test innate personality traits: Achiever (Do you wake up every day needing to accomplish something tangible?), Competition (Do you hate losing more than you love winning?), Relator (Can you forge authentic friendships with scrub techs and surgeons?), Courage (Can you stand up to an intimidating Chief of Surgery?).',
            proTip: 'Gallup questions have no neutral answers. Never give middle-of-the-road responses like "sometimes." Answer with conviction, urgency, and concrete real-world examples of grinding through adversity.'
          },
          {
            heading: 'The STAR Method Adapted for Healthcare Sales',
            body: 'Structure every behavioral interview response: Situation (context & hospital setting), Task (the challenging commercial/clinical objective), Action (the specific, decisive steps YOU took), Result (quantified revenue, market share gain, or clinical outcome).',
            clinicalExample: '"S: In my previous B2B role, our primary territory was down 18% due to a local recession. T: My quota was $850k with zero new inbound leads. A: I executed 45 in-person cold visits weekly, mapped out every competitor account, and built an automated follow-up sequence. R: I closed 32 new enterprise accounts, finished the year at 134% of quota, and was awarded Regional Sales Rep of the Year."'
          }
        ]
      }
    ],
    caseStudy: {
      id: 'cs-8',
      title: 'From B2B Copier Sales to $280k Orthopedic Territory Manager in 14 Months',
      companyContext: 'Career Transition Case Study',
      scenario: 'A 25-year-old copier sales rep with no healthcare or biology background wanted to break into orthopedic trauma sales at Stryker.',
      challenge: 'Automated HR rejected their application three times because they lacked medical device sales experience.',
      strategyUsed: [
        'Shadowed an independent orthopedic distributor on weekend call to understand trauma tray delivery and OR pacing.',
        'Completed rigorous self-study in musculoskeletal anatomy, fractures (AO/OTA classification), and hospital VAC dynamics.',
        'Built a 28-page branded Brag Book showcasing 140% quota attainment and President\'s Club awards in office equipment.',
        'Sent a personalized video and 30-60-90 Day Territory Business Plan directly to the Stryker Trauma Branch Manager via LinkedIn.',
        'Aced the Gallup assessment by emphasizing relentless work ethic and competitive stamina.'
      ],
      outcomeMetrics: 'Hired as an Associate Sales Representative (ASR); promoted to full Territory Manager within 14 months, producing $2.1M in annual volume.',
      executiveTakeaway: 'Hiring managers do not hire resumes; they hire prepared, relentless competitors who have done the research.'
    },
    finalExamQuestions: [
      {
        id: 'fe-8-1',
        question: 'When asked in a medical sales behavioral interview: "Tell me about a time you failed to close an important account," what is the best strategic structure?',
        options: [
          'Blame the company\'s pricing and explain that the customer was unreasonable.',
          'Claim that you have never failed to close any deal.',
          'Use the STAR method: describe the real setback, take full personal accountability, explain the root cause identified, and detail how you adapted your sales process to win subsequent deals.',
          'Change the subject to your college sports achievements.'
        ],
        correctIndex: 2,
        explanation: 'Hiring executives want to see extreme ownership, resilience, emotional maturity, and the cognitive agility to learn from losses.'
      }
    ]
  }
];
