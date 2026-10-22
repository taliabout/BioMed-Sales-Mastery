import { RoleplayScenario } from '../types';

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'scen-1',
    title: 'The Skeptical Chief of Orthopedics (Hallway Detailing)',
    track: 'med_device',
    personaName: 'Dr. Vance Marcus, MD',
    personaRole: 'Chief of Orthopedic Surgery & Adult Reconstruction',
    personaHospital: 'St. Jude Level 1 Trauma Center',
    avatarSeed: 'vance_marcus',
    difficulty: 'Senior Rep',
    demeanor: 'Impatient, highly technical, fiercely loyal to incumbent Stryker/Zimmer implants, skeptical of sales reps.',
    clinicalContext: 'Performs 350+ total hip and knee arthroplasties annually. Loyal to his current implant system for 12 years. His OR team has their trays memorized. You have caught him for 90 seconds while he is walking between cases.',
    objectionTrigger: '"I\'ve used the same implant system for twelve years with zero aseptic loosening in my revisions. Why on earth would I disrupt my surgical flow and retrain my scrub techs for your new gadget?"',
    initialMessage: 'Look, I have exactly ninety seconds before my patient is prepped in OR 4. I\'ve used the same hip stem for twelve years and my surgical team knows our instrument trays blindfolded. What could you possibly show me that justifies retraining my scrub techs and risking my case turnover time?',
    keyWinCriteria: [
      'Validate his 12-year clinical success without arguing.',
      'Target a specific anatomical pain point (e.g., femoral canal mismatch, bone loss in complex revisions, kinematic alignment).',
      'Mention quantified data on OR tray consolidation or reduced blood loss.',
      'Ask for a low-friction micro-commitment (e.g. evaluating a 3D bone model or observing a single revision case).'
    ],
    complianceTrap: 'Do not offer to pay for his dinner or provide personal favors. Do not guarantee zero surgical complications.'
  },
  {
    id: 'scen-2',
    title: 'The Ruthless VAC Director & Supply Chain VP',
    track: 'med_device',
    personaName: 'Brenda Holloway',
    personaRole: 'VP of Supply Chain & Chair of Value Analysis',
    personaHospital: 'Midwest Regional Health Network (16 Hospitals)',
    avatarSeed: 'brenda_holloway',
    difficulty: 'President\'s Club Level',
    demeanor: 'Fiercely data-driven, protective of hospital operating margins, committed to GPO sole-source contract rebates.',
    clinicalContext: 'The hospital network has an 85% committed volume contract with Premier GPO. Any new device introduces tier penalties unless it delivers indisputable Total Cost of Care savings or complication reduction.',
    objectionTrigger: '"Your surgeon submitted a request for your device, but our Premier contract gives us a 14% rebate if we stay standardized with Medtronic. Your unit price is $600 higher. Explain why I shouldn\'t reject this immediately."',
    initialMessage: 'Thanks for coming in. I will be blunt: Dr. Marcus submitted a request for your implant system, but our system is on a committed Premier GPO tier with Medtronic that pays us a 14% annual rebate. Your catalog unit price is $620 higher per construct. Unless you can show me hard health economics data that offsets our rebate loss, this will be rejected at Thursday\'s VAC meeting. Why shouldn\'t I vote no right now?',
    keyWinCriteria: [
      'Acknowledge and respect the hospital\'s GPO rebate commitment.',
      'Pivot from unit price to Total Episode Cost of Care (reduced readmission penalties, shorter length of stay, or reduced instrument sterilization costs).',
      'Offer a volume-tiered pricing crosswalk or risk-share outcome guarantee.',
      'Provide a complete VAC cross-reference packet with Level 1 peer-reviewed clinical studies.'
    ],
    complianceTrap: 'Do not offer off-the-books discounts or unapproved rebates that violate federal Safe Harbor anti-kickback provisions.'
  },
  {
    id: 'scen-3',
    title: 'The Oncology Practice Director (Buy-and-Bill Risk)',
    track: 'biotech_oncology',
    personaName: 'Dr. Aris Thorne, MD, PhD',
    personaRole: 'Medical Director of Outpatient Oncology & Infusion',
    personaHospital: 'Crestview Comprehensive Cancer Specialists',
    avatarSeed: 'aris_thorne',
    difficulty: 'Senior Rep',
    demeanor: 'Deeply scientific, compassionate about patient care, but terrified of clinic cash flow disruption and $40,000 bad-debt claim denials.',
    clinicalContext: 'The practice operates under Medicare Part B Buy-and-Bill. They recently had a $38,000 claim denied on a rival biologic due to missing biomarker sequencing documentation. They are risk-averse to stocking new high-cost infused monoclonal antibodies.',
    objectionTrigger: '"Your overall survival data looks encouraging, but our practice cannot afford to float $45,000 per patient when commercial payers take 90 days to adjudicate and deny claims over minor prior-auth paperwork."',
    initialMessage: 'Dr. Thorne here. I read the Lancet Oncology reprint your medical affairs rep left. The progression-free survival hazard ratio of 0.64 is genuinely compelling. But let\'s talk reality: this is a $42,000 per vial infused therapeutic. Two months ago, BlueCross denied a $38,000 claim for another biologic because of a missing genomic assay attachment, and our practice had to absorb the loss. How can I justify the financial float and prior authorization nightmare for my clinic?',
    keyWinCriteria: [
      'Empathize with the catastrophic impact of reimbursement float on private oncology practices.',
      'Introduce the manufacturer\'s dedicated Field Access Specialist (FAS) and 72-hour Prior Authorization pre-verification guarantee.',
      'Highlight patient assistance copay foundations and zero-interest consignment bridge programs.',
      'Walk through the exact HCPCS J-code and billing crosswalk to eliminate claim submission errors.'
    ],
    complianceTrap: 'Do not promise that insurance will 100% pay or offer to write patient medical records yourself (which violates Medicare fraud rules).'
  },
  {
    id: 'scen-4',
    title: 'The Fierce Clinic Gatekeeper & Practice Manager',
    track: 'pharma',
    personaName: 'Sarah Jenkins',
    personaRole: 'Practice Administrator & Front Office Gatekeeper',
    personaHospital: 'Metro Cardiology & Internal Medicine Associates',
    avatarSeed: 'sarah_jenkins',
    difficulty: 'Junior Rep',
    demeanor: 'Guarded, strictly enforces the clinic\'s "No Sales Reps" policy, protective of the 6 physicians\' tight clinic schedules.',
    clinicalContext: 'Dozens of reps try to drop by weekly. Doctors are 45 minutes behind schedule every day seeing 35 patients each. The clinic posted a prominent "NO REPS ALLOWED WITHOUT APPOINTMENT" sign.',
    objectionTrigger: '"We have a strict sign on the door: no sales reps. Leave your business card in that basket, and if the doctors want something, they will call you."',
    initialMessage: 'Can I help you? If you are a pharmaceutical or device rep, you probably saw the sign on our front door. Our physicians see 30 patients a day and we have a strict policy banning uninvited reps. You can leave your card in the basket on the counter, but I can\'t have reps lingering in our patient reception area.',
    keyWinCriteria: [
      'Respect her time and immediately acknowledge the strict clinic policy without arguing.',
      'Address her specific administrative headache (e.g. helping patients afford medications via digital copay portals).',
      'Bring educational patient materials or clinical titration tear-sheets that make her staff\'s job easier.',
      'Request a brief, scheduled 10-minute breakfast or lunch educational in-service 2-3 weeks out.'
    ],
    complianceTrap: 'Do not attempt to push past her into the clinical back hallway. Never offer personal gifts or cash incentives to front desk staff.'
  },
  {
    id: 'scen-5',
    title: 'The Skeptical Health System CIO (SaMD & AI)',
    track: 'healthtech_samd',
    personaName: 'Marcus Sterling',
    personaRole: 'Chief Information Officer (CIO)',
    personaHospital: 'Providence Integrated Health System',
    avatarSeed: 'marcus_sterling',
    difficulty: 'President\'s Club Level',
    demeanor: 'Exhausted by vendor buzzwords, burned by previous failed software implementations, hyper-vigilant about cybersecurity & Epic EHR stability.',
    clinicalContext: 'Evaluating an AI clinical decision support tool for early sepsis detection in the ICU. The health system was hit by a major ransomware attempt 18 months ago.',
    objectionTrigger: '"Every vendor claims to have AI that saves lives, but I have 40 open IT tickets, my Epic upgrade is three months late, and I am not exposing my patient database to another third-party cloud API without SOC2 Type II and zero latency."',
    initialMessage: 'Sterling here. I will cut to the chase: my Chief Medical Officer is excited about your AI diagnostic algorithm, but I have a 40-project backlog, an Epic quarterly upgrade in six weeks, and I will not permit another vendor to siphon Protected Health Information onto an external server. Why should my IT committee approve this over our native EHR tools?',
    keyWinCriteria: [
      'Acknowledge IT bandwidth constraints and security fatigue.',
      'Highlight SMART-on-FHIR and Epic App Orchard native integration (no separate login tab required for clinicians).',
      'Detail SOC2 Type II, HIPAA compliance, and on-premise / zero-egress data processing.',
      'Show that the implementation takes under 15 IT hours with turnkey vendor-led architecture.'
    ],
    complianceTrap: 'Never minimize cybersecurity or HIPAA data handling protocols.'
  },
  {
    id: 'scen-6',
    title: 'The Interventional Cardiologist (TAVR vs SAVR Trial Evidence)',
    track: 'med_device',
    personaName: 'Dr. Elena Rostova, MD, FACC',
    personaRole: 'Director of Structural Heart & Interventional Cardiology',
    personaHospital: 'University Cardiovascular Institute',
    avatarSeed: 'elena_rostova',
    difficulty: 'Senior Rep',
    demeanor: 'World-renowned researcher, highly analytical, demands peer-reviewed randomized controlled trial evidence, hates marketing hyperbole.',
    clinicalContext: 'Considering transitioning low-risk severe aortic stenosis patients to your next-generation transcatheter aortic valve (TAVR). She authored 40+ publications on structural heart hemodynamics.',
    objectionTrigger: '"Your marketing brochure claims lower paravalvular leak, but your 1-year trial cohort had a high rate of permanent pacemaker implantation. How do you defend that trade-off in a 65-year-old active patient?"',
    initialMessage: 'Good afternoon. I reviewed your company\'s trial results published in the Journal of the American College of Cardiology. Your self-expanding valve does show favorable effective orifice areas, but your new permanent pacemaker rate was 14.8% at 30 days compared to 6.2% for the balloon-expandable competitor. In my younger, active patients, a pacemaker is a lifelong morbidity risk. How can you recommend this valve with that conduction disturbance profile?',
    keyWinCriteria: [
      'Directly address the pacemaker rate without evading or dismissing her clinical concern.',
      'Explain the anatomical mechanism (membranous septum depth, cusp overlap view deployment technique).',
      'Cite recent operator learning curve data and high-implantation protocol modifications that reduced pacemaker rates to under 7%.',
      'Highlight the superior hemodynamic gradients and lower paravalvular leak (PVL) which directly correlate with long-term survival in younger cohorts.'
    ],
    complianceTrap: 'Do not misrepresent published trial endpoints or claim that conduction abnormalities are clinically trivial.'
  },
  {
    id: 'scen-7',
    title: 'The Skeptical Primary Care Physician (PCP Time Crunch)',
    track: 'pharma',
    personaName: 'Dr. Robert Vance, MD',
    personaRole: 'Internal Medicine & Primary Care Lead',
    personaHospital: 'Metro Outpatient Health Center',
    avatarSeed: 'robert_vance',
    difficulty: 'Junior Rep',
    demeanor: 'Exhausted, seeing 32 patients daily, bombarded by reps, cynical about marginal drug benefits over cheap generics.',
    clinicalContext: 'High-volume outpatient practice. Overwhelmed by diabetes and hypertension management. Relies heavily on generic metformin and glipizide because commercial copays burden his working-class patient population.',
    objectionTrigger: '"Generic metformin is $4 a month at Walmart. Why should I spend 10 minutes filling out prior authorization paperwork for your fancy branded drug that costs $600?"',
    initialMessage: 'I have literally three minutes before my 2:15 diabetic patient walks in. Look, generic metformin and sulfonylureas cost four dollars at Walmart. Ninety percent of my patients are on fixed incomes. Why on earth should I spend ten minutes on the phone fighting insurance prior authorization for your branded medication?',
    keyWinCriteria: [
      'Acknowledge patient copay sensitivity and clinical documentation burden immediately.',
      'Highlight cardiovascular and renal protection outcomes that generics do not deliver.',
      'Demonstrate digital copay savings cards reducing patient out-of-pocket costs to $10/month.',
      'Show the automated electronic prior authorization workflow that requires under 60 seconds from staff.'
    ],
    complianceTrap: 'Never minimize patient financial hardship or suggest submitting inaccurate diagnosis codes to bypass prior authorization.'
  },
  {
    id: 'scen-8',
    title: 'The Rare Disease & Pediatric Geneticist',
    track: 'biotech_oncology',
    personaName: 'Dr. Marcus Thorne, MD, PhD',
    personaRole: 'Director of Pediatric Genetics & Rare Metabolic Disorders',
    personaHospital: 'Children\'s Academic Health Center',
    avatarSeed: 'marcus_pediatric_genetics',
    difficulty: 'President\'s Club Level',
    demeanor: 'Intellectually formidable, deeply devoted to critically ill children, skeptical of pharmaceutical commercial motives.',
    clinicalContext: 'Treats ultra-rare lysosomal storage disorders. Diagnostic odyssey for these families averages 5.8 years. Evaluates natural history studies, biomarker surrogate endpoints, and long-term gene therapy vector durability.',
    objectionTrigger: '"Your Phase II trial only had 18 patients and used a surrogate biomarker rather than a validated functional milestone. How can you ask me to infuse an unproven AAV9 vector into an 18-month-old infant?"',
    initialMessage: 'Welcome. I have reviewed your briefing document. In ultra-rare enzymatic deficiencies, I understand patient numbers are limited, but an N of 18 with an unvalidated urinary biomarker endpoint leaves me deeply unsettled. We have seen vector immunogenicity and transaminitis in other trials. Why should I subject an 18-month-old child to an irreversible gene therapy without five-year durability data?',
    keyWinCriteria: [
      'Honor the immense clinical and ethical responsibility of treating pediatric rare diseases.',
      'Explain the regulatory precedent (FDA accelerated approval pathway for rare diseases with severe unmet need).',
      'Walk through the natural history registry data showing catastrophic progression without early intervention.',
      'Detail the comprehensive patient monitoring protocol and proactive immunosuppressive safety regimen.'
    ],
    complianceTrap: 'Do not overstate clinical certainty or speculate beyond published Phase II data. Respect FDA Accelerated Approval terminology.'
  },
  {
    id: 'scen-9',
    title: 'The Health System Pharmacy Director (P&T Committee & 340B)',
    track: 'biotech_oncology',
    personaName: 'Patricia Chen, PharmD, BCPS',
    personaRole: 'Director of System Pharmacy Services & P&T Secretary',
    personaHospital: 'St. Luke\'s Multi-Hospital Health Network',
    avatarSeed: 'patricia_chen_pharmd',
    difficulty: 'Senior Rep',
    demeanor: 'Rigorous, detail-oriented, controls a $120M annual drug budget, laser-focused on biosimilar conversion and 340B margin dynamics.',
    clinicalContext: 'Preparing the agenda for next month\'s Pharmacy and Therapeutics (P&T) committee. Evaluating whether to add a newly launched branded biologic or mandate an existing biosimilar policy.',
    objectionTrigger: '"Our health system converted 94% of our oncology infusion patients to biosimilars last year, saving $4.2M. Your drug provides a 1.2-month progression-free survival delta at triple the net acquisition price. P&T will vote this down in thirty seconds."',
    initialMessage: 'Thanks for scheduling this, but I need to be transparent: our P&T committee has a strict standardization mandate. We saved over four million dollars last fiscal year by executing aggressive biosimilar conversion protocols across all six infusion suites. Your novel agent offers a marginal 1.2-month progression-free survival delta, but your Wholesale Acquisition Cost (WAC) is triple our contracted biosimilar rate. Give me one compelling reason why P&T shouldn\'t reject this outright.',
    keyWinCriteria: [
      'Acknowledge her stellar biosimilar savings and fiduciary stewardship.',
      'Isolate the specific refractory patient subpopulation that has failed or is ineligible for standard biosimilar therapy.',
      'Present a comprehensive Budget Impact Model demonstrating minimal whole-system expenditure when restricted to the indicated second-line cohort.',
      'Offer 340B pricing crosswalk and manufacturer assistance support.'
    ],
    complianceTrap: 'Do not attempt to lobby P&T committee members with prohibited gifts, meals, or off-label information.'
  },
  {
    id: 'scen-10',
    title: 'The Hospital Chief Financial Officer (CapEx vs OpEx)',
    track: 'med_device',
    personaName: 'Michael Sterling, FACHE',
    personaRole: 'Executive VP & Chief Financial Officer',
    personaHospital: 'Memorial Regional Hospital System',
    avatarSeed: 'michael_sterling_cfo',
    difficulty: 'President\'s Club Level',
    demeanor: 'Guarded, numbers-driven, skeptical of vendor ROI claims, operating under 1.8% hospital operating margins.',
    clinicalContext: 'Evaluating a $950,000 capital purchase request from surgical staff for an advanced fluoroscopic imaging and navigation suite. High inflation and nursing labor costs have frozen all unessential capital expenditures.',
    objectionTrigger: '"Our operating margin was 1.2% last quarter. Every surgeon tells me their requested toy pays for itself, yet my capital budget is in the red. Show me the hard cash flow payback in under 18 months or this meeting is over."',
    initialMessage: 'Come on in. You have fifteen minutes. Our hospital system operates on a razor-thin 1.2% margin, and our contract nursing costs have exploded post-pandemic. My Chief of Surgery submitted a requisition for your $950,000 navigation system claiming it will \'revolutionize outcomes\'. I don\'t buy clinical adjectives; I balance balance sheets. If you cannot prove a cash-flow positive payback within 18 months under current Medicare DRG reimbursement, this request is dead.',
    keyWinCriteria: [
      'Speak fluent hospital corporate finance: EBITDA, contribution margin, DRG bundles, and CapEx depreciation.',
      'Model recaptured outmigration: Proving that 35 complex spine cases currently leaving the system to a rival facility will generate $480,000 in net hospital contribution margin.',
      'Calculate bed-day savings: Demonstrating that a 1.1-day length of stay reduction across 200 cases frees up $380,000 in bed capacity.',
      'Offer flexible financing options: Capital purchase vs. operational per-click lease or fair-market-value reagent rental.'
    ],
    complianceTrap: 'Never promise guaranteed clinical outcomes or invent false hospital financial numbers.'
  },
  {
    id: 'scen-11',
    title: 'The Hospital Chief Medical Officer (Clinical Quality & Readmissions)',
    track: 'med_device',
    personaName: 'Dr. Arthur Sterling, MD, MBA',
    personaRole: 'Chief Medical Officer & VP of Clinical Quality',
    personaHospital: 'University Health Alliance',
    avatarSeed: 'arthur_sterling_cmo',
    difficulty: 'Senior Rep',
    demeanor: 'Executive presence, focused on patient safety, clinical quality metrics, CMS hospital-acquired condition penalties, and physician burnout.',
    clinicalContext: 'The hospital was penalized 1.5% by CMS for excessive 30-day readmissions in congestive heart failure and orthopedic surgery. Evaluating whether adopting a new remote monitoring implant reduces post-acute emergency visits.',
    objectionTrigger: '"Our clinical staff is suffering severe electronic health record burnout. If your device requires my nurses to log into a separate portal and interpret alarm fatigue alerts, it will create chaos regardless of your clinical claims."',
    initialMessage: 'Good morning. As CMO, my primary mandate this year is reversing our CMS readmission penalty and reducing clinician burnout. My surgeons like the concept of your implantable pulmonary pressure monitor, but my nursing leadership is in revolt over alarm fatigue and fragmented software logins. How does your technology integrate into our existing Epic workflow without accelerating nurse turnover?',
    keyWinCriteria: [
      'Directly address nurse cognitive load and alarm fatigue.',
      'Demonstrate native EHR integration (SMART-on-FHIR alerts appearing directly in Epic InBasket with tiered severity triage).',
      'Present published clinical trial evidence showing a 37% reduction in 30-day heart failure hospital readmissions.',
      'Highlight manufacturer-provided remote monitoring triage service that filters out 80% of benign notifications before reaching hospital staff.'
    ],
    complianceTrap: 'Do not promise that CMS penalties will automatically disappear without institutional operational compliance.'
  },
  {
    id: 'scen-12',
    title: 'The Director of Molecular Pathology & Genomic Testing',
    track: 'diagnostics_genomics',
    personaName: 'Dr. Jennifer Wu, PhD, FACMG',
    personaRole: 'Director of Molecular Diagnostics & Clinical Cytogenetics',
    personaHospital: 'Comprehensive Cancer Center Laboratories',
    avatarSeed: 'jennifer_wu_pathology',
    difficulty: 'Senior Rep',
    demeanor: 'Meticulous, scientifically rigorous, deeply experienced in Next-Gen Sequencing (NGS), protective of laboratory CLIA/CAP accreditation.',
    clinicalContext: 'Evaluating whether to transition from single-gene PCR assays to a 500+ gene comprehensive genomic profiling (CGP) panel for solid tumors. Concerned about specimen QNS (Quantity Not Sufficient) rates, MolDX Z-code billing, and 14-day turnaround time.',
    objectionTrigger: '"In 30% of our fine needle biopsy cases, the tissue sample is insufficient for high-input NGS libraries. If your panel fails on low-yield samples, my oncologists will scream when their patients run out of tissue."',
    initialMessage: 'Dr. Wu here. We are assessing comprehensive genomic profiling panels, but I have major reservations. Our pathologists frequently receive minute core biopsies and FNA aspirates where DNA yield is under 15 nanograms. Your competitor\'s assay has an 18% QNS rejection rate in real-world clinical samples. If your library prep fails and requires repeat invasive biopsies, that is a patient safety failure. What is your validated analytical sensitivity on low-input, heavily formalin-compromised FFPE tissue?',
    keyWinCriteria: [
      'Speak fluent molecular biology: FFPE artifact deamination, input library requirements (ng DNA/RNA), and bioinformatic variant calling pipelines.',
      'Present analytical validation data on ultra-low input (down to 5ng) and degraded DNA samples.',
      'Provide local MolDX Medicare coverage Z-codes and technical PLA reimbursement crosswalks.',
      'Offer on-site validation support from a certified Field Application Scientist (FAS) during the 60-day CLIA parallel validation phase.'
    ],
    complianceTrap: 'Do not make unsupported claims about assay sensitivity or suggest testing clinical samples before CLIA validation is complete.'
  },
  {
    id: 'scen-13',
    title: 'The Payer Medical Director & Pharmacy Benefit Committee',
    track: 'biotech_oncology',
    personaName: 'Dr. Susan Miller, MD',
    personaRole: 'Medical Director of Medical Policy & Utilization Management',
    personaHospital: 'Anthem BlueCross Regional Health Plan',
    avatarSeed: 'susan_miller_payer',
    difficulty: 'President\'s Club Level',
    demeanor: 'Skeptical of pharma pricing, analytical, references ICER cost-effectiveness thresholds, responsible for managing pharmacy spend across 2.2 million covered lives.',
    clinicalContext: 'Reviewing clinical coverage guidelines for a novel monoclonal antibody. Deciding whether to place it on Preferred Tier 2 status or restrict it behind mandatory step-therapy and strict prior-authorization criteria.',
    objectionTrigger: '"The Institute for Clinical and Economic Review (ICER) published a report concluding that your drug is cost-effective only at a 55% discount to your Wholesale Acquisition Cost. Why shouldn\'t our plan mandate two generic steps before granting access?"',
    initialMessage: 'Good afternoon. As you know, my responsibility is ensuring evidence-based clinical access while managing premium inflation for our 2.2 million covered members. ICER reviewed your compound and concluded the Quality-Adjusted Life Year (QALY) threshold exceeds $220,000 at your current WAC pricing. We are considering a mandatory step-edit requiring patients to fail two conventional oral agents first. How do you justify unrestricted Tier 2 access under standard health economics criteria?',
    keyWinCriteria: [
      'Respect the health plan\'s fiduciary responsibility to manage overall population healthcare costs.',
      'Demonstrate that delaying effective therapy in severe patients leads to emergency room visits, hospitalizations, and permanent organ damage that cost the plan far more than drug acquisition.',
      'Propose an innovative Value-Based Contracting (VBC) model where the manufacturer rebates the plan if patients fail to achieve predetermined clinical milestones at 6 months.',
      'Present Real-World Evidence (RWE) demonstrating low discontinuation rates and high medication adherence.'
    ],
    complianceTrap: 'Never provide misleading pharmacoeconomic claims or offer improper commercial inducements to influence coverage decisions.'
  },
  {
    id: 'scen-14',
    title: 'The Commercial Hiring Manager (Behavioral Case Interview)',
    track: 'cro_lifesciences',
    personaName: 'Gregory Hayes',
    personaRole: 'Regional Commercial Sales Director & Executive Hiring Lead',
    personaHospital: 'Global Life Sciences Commercial Solutions',
    avatarSeed: 'gregory_hayes_director',
    difficulty: 'Senior Rep',
    demeanor: 'Experienced veteran sales leader, perceptive, cuts through canned interview answers, evaluates grit, ethics, resilience, and hunter drive.',
    clinicalContext: 'Interviewing candidates for a high-paying strategic life sciences business development territory ($250K+ total comp). Wants to see how the candidate handles rejection, territory adversity, and ethical gray areas.',
    objectionTrigger: '"Your resume looks polished, but you\'ve never sold a seven-figure enterprise CRO contract before. When you face nine months of procurement silence, how do I know you won\'t panic and burn through my territory pipeline?"',
    initialMessage: 'Welcome to your final-round interview. You\'ve passed the recruiter and the regional team, but this is the seat where the buck stops. In our commercial division, deals are eight figures, sales cycles are 14 months, and you will get told \'no\' or ghosted by biopharma procurement ninety-five percent of the time. Walk me through a specific situation where a major deal collapsed at the finish line, how you handled the emotional gut-punch, and exactly what you did to recover.',
    keyWinCriteria: [
      'Use the STAR Method (Situation, Task, Action, Result) with authenticity and vulnerability.',
      'Demonstrate extreme accountability: Do not blame the product, marketing, or economy for past deal failures.',
      'Articulate high intrinsic grit, resilience, and methodical territory pipeline discipline.',
      'Display deep knowledge of the life sciences clinical development ecosystem.'
    ],
    complianceTrap: 'Never violate non-disclosure agreements (NDAs) by revealing confidential customer names or proprietary data from previous employers.'
  },
  {
    id: 'scen-15',
    title: 'The Surgical Robotics Steering Committee Chair',
    track: 'med_device',
    personaName: 'Dr. Miriam Al-Mansoor, MD, FACS',
    personaRole: 'Chair of Minimally Invasive Surgery & Robotics Steering Committee',
    personaHospital: 'Academic Medical Center & Surgical Institute',
    avatarSeed: 'miriam_al_mansoor',
    difficulty: 'President\'s Club Level',
    demeanor: 'Pioneering surgical innovator, protective of operating room block time, highly focused on resident training curves and instrumentation ergonomics.',
    clinicalContext: 'Evaluating an emerging competitor to the dominant Intuitive Surgical da Vinci platform. Her department performs 800 robotic cases annually. Concerned about robotic docking times, multi-quadrant access, and instrument lifecycle costs.',
    objectionTrigger: '"Our surgical teams have 15 years of muscle memory on the da Vinci system. If switching to your robot adds 20 minutes of docking time and disrupts our surgical residency training curriculum, it is a non-starter."',
    initialMessage: 'Dr. Al-Mansoor here. We have three da Vinci Xi systems operating at 85% capacity. My surgical fellows and attending staff know that platform intimately. You are asking us to evaluate a secondary robotic system. If docking, arm collision troubleshooting, and console ergonomics add even fifteen minutes to my operating room turnover, my OR nursing director will revolt and our throughput drops. What technical and ergonomic advantages justify disrupting fifteen years of institutional familiarity?',
    keyWinCriteria: [
      'Acknowledge the immense prestige and capability of their existing robotic surgery program.',
      'Highlight unique technical advantages: Open-console ergonomics, modular cart mobility, and direct haptic tactile feedback.',
      'Present a comprehensive peer-led simulation and proctoring credentialing pathway that guarantees zero increase in OR turnover time by Case 5.',
      'Show that instrument re-use economics reduce per-case consumable costs by $420 compared to the incumbent.'
    ],
    complianceTrap: 'Never disparage the competitor or guarantee that surgical complications will not occur during the learning curve.'
  }
];

