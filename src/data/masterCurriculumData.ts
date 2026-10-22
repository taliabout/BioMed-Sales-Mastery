import { AcademyModule } from '../types';

export const MASTER_ACADEMIES: AcademyModule[] = [
  {
    id: 'academy_1_foundations',
    academyNumber: 1,
    academyName: 'Academy I: Foundations of Healthcare Sales',
    academySubtitle: 'Core Principles, Commercial Mechanics & Customer Buying Journeys',
    iconName: 'GraduationCap',
    description: 'Master how healthcare organizations generate revenue, the fundamental differences between B2B and consumer sales, transactional vs. consultative selling, and the unique multi-stakeholder dynamics of medical commerce.',
    targetLevel: 'Foundational',
    estimatedHours: 6,
    learningObjectives: [
      'Define commercial sales mechanics in healthcare and how revenue flows between manufacturers, distributors, providers, and payers.',
      'Differentiate transactional, consultative, strategic, and enterprise selling in clinical settings.',
      'Map the non-linear healthcare customer buying journey across clinical, economic, and operational stakeholders.',
      'Understand quota attainment, territory management, pipeline velocity, and customer lifetime value (LTV).'
    ],
    prerequisites: ['Basic business literacy', 'Willingness to learn medical terminology'],
    lessons: [
      {
        id: 'acad1_les1',
        title: 'What Healthcare Sales Actually Is: Demystifying Commercial Life Sciences',
        durationMinutes: 30,
        summary: 'Healthcare sales is not high-pressure pitching; it is high-trust consultative problem solving in a heavily regulated environment where patient safety and economic viability intersect.',
        keyPoints: [
          'In healthcare, the person who chooses the product (physician) is almost never the person who pays for it (payer/insurer) or the person who receives it (patient). This triangle of agency is unique to healthcare.',
          'Revenue generation in life sciences relies on clinical validation, regulatory approval (FDA 510(k), PMA, NDA, BLA), and reimbursement coding (CPT, HCPCS, DRG).',
          'Selling models range from transactional consumable restocking to consultative specialty drug detailing and enterprise hospital capital systems.'
        ],
        clinicalOrCommercialExample: 'A surgical rep selling antimicrobial sutures is not just convincing the surgeon of knot security; they must also demonstrate to the hospital infection control officer that reducing surgical site infections (SSIs) by 18% saves the hospital $420,000 in uncompensated Medicare readmission penalties.',
        practicalExercisePrompt: 'Identify a medical product in your household (e.g., blood glucose meter) and map the 4 distinct stakeholders involved in its selection, purchase, reimbursement, and usage.'
      },
      {
        id: 'acad1_les2',
        title: 'The Multi-Stakeholder Customer Buying Journey',
        durationMinutes: 45,
        summary: 'Deconstruct how health systems and physician practices evaluate, approve, and adopt new technologies—from clinical champion identification to Value Analysis Committee (VAC) sign-off.',
        keyPoints: [
          'The 6 phases of medical adoption: Problem Recognition, Clinical Champion Engagement, Value Analysis / Formulary Review, Economic Impact Modeling, Contract / GPO Alignment, and Clinical Implementation.',
          'Understanding gatekeepers: Practice managers, medical assistants, operating room schedulers, and procurement officers control access.',
          'Pipeline health: Tracking stages from Initial Discovery, Clinical Champion Identified, VAC Submission, Clinical Trial/Evaluation, Contract Negotiation, to Closed-Won Adoption.'
        ],
        clinicalOrCommercialExample: 'In an academic cancer center, an oncologist may be eager to prescribe a new targeted therapy, but the hospital Pharmacy and Therapeutics (P&T) committee must first review clinical trial toxicity data, while the hospital revenue cycle team confirms that commercial payers have established prior-authorization criteria.',
        practicalExercisePrompt: 'Draft an email requesting a 10-minute discovery conversation with a clinical practice manager without sounding like a pushy vendor.'
      },
      {
        id: 'acad1_les3',
        title: 'Territory Metrics, Quotas, and Pipeline Mathematics',
        durationMinutes: 35,
        summary: 'Learn the quantitative mathematics of territory management: calculating run rates, quota attainment, average contract value, and pipeline coverage ratios.',
        keyPoints: [
          'Quota Coverage Rule: Elite reps maintain 3x to 4x pipeline coverage over their quarterly quota to absorb long hospital procurement delays.',
          'Total Prescriptions (TRx) vs. New Prescriptions (NRx): NRx reflects immediate rep impact and clinical adoption velocity, while TRx measures territory annuity value.',
          'Customer Lifetime Value (LTV) in hospitals: A single surgeon adopting an orthopedic knee system represents $250,000 to $600,000 in annual recurring revenue for 5-10 years.'
        ],
        clinicalOrCommercialExample: 'A medical device rep with an annual quota of $2.4M needs $600K per quarter. With an average deal size of $60K and a historical win rate of 33%, the rep must maintain at least 30 qualified opportunities ($1.8M active pipeline) at all times.',
        practicalExercisePrompt: 'Calculate how many initial surgeon discovery calls are required to achieve 4 annual conversions if your funnel metrics are 20% discovery-to-trial and 50% trial-to-adoption.'
      }
    ],
    workedCaseStudy: {
      title: 'Displacing an Entrenched Orthopedic Incumbent at MetroHealth System',
      context: 'MetroHealth was a 600-bed regional hospital using an incumbent total knee arthroplasty system for 12 years with 85% market share.',
      challenge: 'The Department Chair was personally loyal to the incumbent rep and refused to grant access to the new rep.',
      strategyAndSolution: 'The new rep partnered with a newly hired fellowship-trained sports medicine surgeon, provided customized cadaver lab training, and built a comprehensive VAC dossier demonstrating a 22-minute reduction in OR tourniquet time and $340 savings per case in instrument sterilization costs.',
      commercialOutcome: 'The VAC approved dual-source status. Within 9 months, the new rep converted 3 junior surgeons, generating $1.1M in first-year territory revenue.',
      executiveTakeaway: 'In healthcare, you rarely displace an incumbent by attacking their clinical efficacy directly; you win by identifying emerging champions and solving institutional operational bottlenecks.'
    },
    knowledgeCheck: [
      {
        question: 'Why is the healthcare buying journey fundamentally different from traditional B2B sales?',
        options: [
          'Hospitals have unlimited budgets and make decisions instantly.',
          'The decision maker (physician) is separated from the payer (insurer/health plan) and the end consumer (patient).',
          'Medical sales does not require regulatory compliance or approved indications.',
          'Physicians always purchase products directly using their personal credit cards.'
        ],
        correctIndex: 1,
        explanation: 'Healthcare features a unique tripartite structure: the physician selects the therapy, the third-party payer reimburses it, and the patient consumes it. Reps must address both clinical efficacy for the doctor and economic reimbursement for the payer.'
      },
      {
        question: 'What does a 3x pipeline coverage ratio mean for a representative with a $500,000 quarterly quota?',
        options: [
          'The rep has already billed $1,500,000 in cash.',
          'The rep has $1,500,000 in qualified active sales opportunities in the pipeline.',
          'The rep only needs to make 3 phone calls this quarter.',
          'The rep will automatically be placed on a performance improvement plan.'
        ],
        correctIndex: 1,
        explanation: 'A 3x coverage ratio means the rep maintains $1.5M in qualified sales opportunities to achieve their $500K quota, accounting for a standard 33% conversion close rate in complex enterprise medical environments.'
      }
    ],
    relatedFrameworks: ['MEDDPICC', 'Value-Based Selling', 'Customer Buying Journey']
  },
  {
    id: 'academy_2_psychology',
    academyNumber: 2,
    academyName: 'Academy II: Sales Psychology & Physician Human Behavior',
    academySubtitle: 'Cognitive Biases, Decision Architecture & Ethical Persuasion',
    iconName: 'Brain',
    description: 'Explore cognitive science, behavioral economics, loss aversion, status quo bias, and decision fatigue in high-stress clinical environments to communicate with ethical clarity and professional influence.',
    targetLevel: 'Professional',
    estimatedHours: 7,
    learningObjectives: [
      'Analyze the cognitive load and decision fatigue experienced by surgeons, oncologists, and hospital administrators.',
      'Leverage behavioral economics principles (Loss Aversion, Framing, Status Quo Bias) ethically in clinical dialogue.',
      'Build immediate professional credibility and psychological safety without resorting to manipulative pressure.',
      'Identify and neutralize unspoken clinician fears regarding patient risk, reputation, and operational disruption.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad2_les1',
        title: 'Status Quo Bias and the Endowment Effect in Medicine',
        durationMinutes: 40,
        summary: 'Why clinicians cling to familiar medications and surgical techniques even when newer clinical evidence demonstrates superior efficacy.',
        keyPoints: [
          'Status Quo Bias: Clinicians have treated hundreds of patients with their current protocol without catastrophic failure. Adopting your new therapy introduces perceived personal and professional risk.',
          'Omission vs. Commission Bias: Clinicians feel far more guilt over an adverse event caused by a NEW product they chose to try (action) than an adverse event resulting from their standard existing therapy (omission).',
          'To overcome status quo bias, you must demonstrate that continuing the current protocol carries greater patient or institutional risk than carefully transitioning.'
        ],
        clinicalOrCommercialExample: 'An interventional cardiologist using a legacy coronary stent remarks: "My clinical outcomes are acceptable, why should I risk switching?" The top rep reframes: "Dr. Miller, your outcomes are solid. However, in diabetic patients with bifurcated lesions, registry data shows the legacy stent carries a 4.2% higher 1-year target lesion revascularization rate. Would you be open to examining how our bioresorbable polymer addresses that specific diabetic cohort?"',
        practicalExercisePrompt: 'Write a 3-sentence reframing statement for an oncologist hesitant to switch from an established chemotherapy doublet to a new immuno-oncology combination.'
      },
      {
        id: 'acad2_les2',
        title: 'Decision Fatigue, Cognitive Load, and the 90-Second Micro-Meeting',
        durationMinutes: 35,
        summary: 'Understanding the cognitive limits of physicians seeing 25 patients a day, and how to structure high-density clinical value in seconds.',
        keyPoints: [
          'By 2:00 PM, an outpatient physician has made over 150 high-stakes diagnostic decisions. Complex, rambling sales pitches trigger instinctive rejection.',
          'Cognitive ease principle: Clear visual graphs, simple relative risk metrics, and precise patient profiles reduce cognitive friction.',
          'The Rule of Three: In hallway detailing, present exactly three points: Specific Patient Indication, Clinical Endpoint Delta, and Coverage / Access Simplicity.'
        ],
        clinicalOrCommercialExample: 'Instead of handing a physician a 40-page reprint, an elite rep points directly to the Forest Plot on page 4: "Dr. Martinez, for your COPD patients with eosinophils over 300 who had two exacerbations last year, this trial showed a 29% reduction in hospitalizations. Here is the exact patient phenotype."',
        practicalExercisePrompt: 'Summarize a complex clinical trial result into a 45-second spoken verbal brief that requires zero mental effort for a hurried physician to comprehend.'
      },
      {
        id: 'acad2_les3',
        title: 'Ethical Persuasion vs. Manipulative Tactics',
        durationMinutes: 30,
        summary: 'Establishing unwavering integrity in healthcare: how transparent truth-telling creates long-term commercial dominance.',
        keyPoints: [
          'Never conceal contraindications or adverse event rates; proactive transparency about product limitations builds unshakeable physician trust.',
          'The Prall-Silverman paradox: Sales reps who honestly tell a doctor "Our drug is NOT the best choice for this specific patient subgroup" see overall territory prescribing increase by 35% because their recommendations are deemed clinically objective.',
          'Psychological reactance: High-pressure closing techniques ("If you don\'t buy today...") cause immediate clinician alienation and permanent loss of account access.'
        ],
        clinicalOrCommercialExample: 'A pediatric neurologist asks if a new anticonvulsant can be used in patients with severe hepatic impairment. An unethical rep hedges; an elite rep immediately clarifies: "No, Dr. Vance. In patients with Child-Pugh Class B or C impairment, our drug is contraindicated due to delayed clearance. Let us reserve it strictly for your normal-hepatic refractory focal onset cases."',
        practicalExercisePrompt: 'Roleplay acknowledging a known product drawback (e.g., higher incidence of mild nausea) while positioning appropriate patient counseling.'
      }
    ],
    workedCaseStudy: {
      title: 'Neutralizing Risk Aversion in a High-Volume Spine Surgery Center',
      context: 'Dr. Katherine Bradley, a world-renowned scoliosis surgeon, had performed 1,200 procedures using titanium pedicle screws and resisted transitioning to 3D-printed porous titanium cages.',
      challenge: 'She perceived any instrument or cage change as an unacceptable risk to her stellar surgical infection and fusion rates.',
      strategyAndSolution: 'The rep did not challenge her technique. Instead, the rep invited Dr. Bradley to an academic biomechanics peer-to-peer discussion with her former fellowship mentor and offered a single-case evaluation on an anatomically complex revision patient who had already failed traditional grafting.',
      commercialOutcome: 'The revision procedure demonstrated superior osteointegration at 6-month CT follow-up. Dr. Bradley subsequently adopted the system across 100% of her deformity cases, generating $850K annually.',
      executiveTakeaway: 'When facing intense clinician risk aversion, do not push for full conversion. Create a low-risk, high-credibility micro-trial on an unmet clinical need where their current approach is weakest.'
    },
    knowledgeCheck: [
      {
        question: 'What is "Omission Bias" in clinical prescribing behavior?',
        options: [
          'Physicians forgetting to write prescriptions for their patients.',
          'The tendency of clinicians to feel greater guilt over an adverse event caused by trying a new therapy than from an adverse outcome resulting from their familiar standard of care.',
          'Sales reps failing to leave marketing brochures at medical clinics.',
          'Pharmacists rejecting prior authorizations due to missing patient insurance cards.'
        ],
        correctIndex: 1,
        explanation: 'Omission bias leads clinicians to prefer inaction or standard care over adopting a new product, because an adverse event caused by an active change feels personally blameworthy.'
      }
    ],
    relatedFrameworks: ['Challenger Sale', 'Ethical Persuasion', 'Choice Architecture']
  },
  {
    id: 'academy_3_methodologies',
    academyNumber: 3,
    academyName: 'Academy III: Professional Sales Methodologies',
    academySubtitle: 'SPIN, Challenger, MEDDPICC, Sandler & Value-Based Selling',
    iconName: 'Layers',
    description: 'Master the world’s leading professional selling frameworks tailored specifically for medical devices, pharmaceuticals, biotech, and healthcare SaaS environments.',
    targetLevel: 'Professional',
    estimatedHours: 8,
    learningObjectives: [
      'Apply SPIN Selling (Situation, Problem, Implication, Need-Payoff) to diagnose clinical and operational inefficiencies.',
      'Deploy The Challenger Sale commercial teaching methodology without violating FDA promotional boundaries.',
      'Execute MEDDPICC qualification (Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Implication of Pain, Champion, Competition) for hospital capital equipment and healthtech.',
      'Utilize the Sandler Selling System up-front contract and pain funnel to prevent premature feature dumping.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad3_les1',
        title: 'MEDDPICC Masterclass for Hospital & Medical Device Sales',
        durationMinutes: 45,
        summary: 'The gold standard qualification and deal orchestration framework for multi-million dollar hospital contracts, surgical robotics, and enterprise software.',
        keyPoints: [
          'Metrics: Quantifiable economic and clinical KPIs (e.g., $180/case reduction in disposable waste, 1.4-day length of stay reduction).',
          'Economic Buyer: The sole executive who controls hospital capital allocation (CFO, COO, or VP of Surgical Services).',
          'Decision Criteria vs. Decision Process: Criteria are the clinical/technical specifications; Process is the timeline, committee votes, and legal redlines.',
          'Paper Process: The hidden bottleneck in healthcare—security audits, BAA agreements, vendor credentialing, and GPO contract tiers.',
          'Identify Pain vs. Implication of Pain: A $20K problem ignored vs. a $1.2M annual liability that compels hospital C-suite action.',
          'Champion vs. Coach: A coach gives you information; a Champion has internal political power, actively sells for you when you are not in the room, and has personal stake in your success.'
        ],
        clinicalOrCommercialExample: 'A rep selling a $1.5M surgical robotic system qualifies the account: The Champion is the Chief of Urology; the Economic Buyer is the Hospital CFO; the Decision Criteria requires a 3-year warranty and Epic EHR scheduling integration; the Implication of Pain is losing 45 robotic prostatectomies per year ($1.8M contribution margin) to a competing health system across town.',
        practicalExercisePrompt: 'Audit an active healthcare opportunity against the 8 letters of MEDDPICC and identify which letter represents your single highest deal vulnerability.'
      },
      {
        id: 'acad3_les2',
        title: 'SPIN Selling in Clinical Discovery',
        durationMinutes: 40,
        summary: 'How to ask diagnostic questions that guide physicians and clinical directors to articulate their own urgent need for change.',
        keyPoints: [
          'Situation Questions: Establish operational facts without annoying the customer with easily researchable questions (Keep to <15% of conversation).',
          'Problem Questions: Uncover clinical frustrations, workflow bottlenecks, and patient dissatisfaction points.',
          'Implication Questions: Explore the cascading consequences of leaving the problem unaddressed (financial loss, clinician burnout, malpractice risk).',
          'Need-Payoff Questions: Encourage the clinician to describe how their department will improve once the solution is implemented.'
        ],
        clinicalOrCommercialExample: 'Problem: "How often do you encounter difficult airway intubations in emergency trauma?" Implication: "When an intubation is delayed past 90 seconds, what impact does that have on ICU transfer times and anoxia risk?" Need-Payoff: "If your team had video laryngoscopy with real-time continuous oxygenation, how would that affect your first-pass success rate and overall emergency department throughput?"',
        practicalExercisePrompt: 'Draft 2 Implication Questions and 2 Need-Payoff Questions for a hospital laboratory director dealing with a 72-hour send-out test turnaround time.'
      },
      {
        id: 'acad3_les3',
        title: 'The Challenger Sale: Commercial Teaching in Life Sciences',
        durationMinutes: 40,
        summary: 'Teaching healthcare leaders new perspectives on market forces, regulatory pressures, and clinical pathways.',
        keyPoints: [
          'The 5 Rep Profiles: Hard Worker, Relationship Builder, Lone Wolf, Reactive Problem Solver, and Challenger (Challengers represent 54% of top performers in complex sales).',
          'Teach, Tailor, Take Control: Deliver unique commercial insights that challenge customer assumptions about their clinical cost structure.',
          'Crucial Compliance Rule: In pharmaceutical and device sales, Challenger teaching MUST remain strictly within FDA-approved indications and substantiated clinical data.'
        ],
        clinicalOrCommercialExample: 'Challenger Hook: "Most cardiology directors believe drug-eluting balloons increase procedural cost. Our health economics analysis of 4,000 peripheral artery disease cases showed that avoiding re-stenosis stents reduced repeat revascularization admissions by 38%, yielding a net $1,400 positive margin per patient under CMS bundled payments."',
        practicalExercisePrompt: 'Construct a 2-minute "Commercial Teaching Insight" regarding outpatient surgical migration trends for an Ambulatory Surgery Center administrator.'
      }
    ],
    workedCaseStudy: {
      title: 'Rescuing a Stalled $2.2M Health System AI Software Deployment',
      context: 'An enterprise SaaS rep had spent 8 months pitching clinical decision support software to hospital radiologists. The deal had completely stalled in the hospital IT procurement committee.',
      challenge: 'The rep realized they had a Coach (a staff radiologist) but no Economic Champion and had never mapped the "Paper Process" for cybersecurity review.',
      strategyAndSolution: 'The rep pivoted using MEDDPICC. They secured a meeting with the Chief Medical Officer and VP of Revenue Cycle by demonstrating how delayed radiology reads cost the hospital $3.1M in emergency room boarding penalties. The CMO became the executive Champion, bypassed the committee gridlock, and accelerated the security review.',
      commercialOutcome: 'The 3-year enterprise contract was executed within 45 days for $2.2M ACV.',
      executiveTakeaway: 'Deals do not stall because of product features; deals stall because reps confuse friendly users with true economic Champions who possess the authority to navigate hospital procurement bureaucracy.'
    },
    knowledgeCheck: [
      {
        question: 'In the MEDDPICC framework, what is the critical difference between a "Coach" and a "Champion"?',
        options: [
          'A Coach is a physician and a Champion is always a nurse.',
          'A Coach provides information and access, whereas a Champion has internal influence, personal credibility, and actively advocates for your solution when you are not in the room.',
          'A Coach signs the contract and a Champion writes the check.',
          'There is no difference; they are interchangeable terms.'
        ],
        correctIndex: 1,
        explanation: 'A Coach is willing to share intel and advice, but lacks the organizational power or willingness to risk their reputation. A Champion has political capital and actively fights for your deal behind closed doors.'
      }
    ],
    relatedFrameworks: ['MEDDPICC', 'SPIN Selling', 'Challenger Sale', 'Sandler Selling System']
  },
  {
    id: 'academy_4_communication',
    academyNumber: 4,
    academyName: 'Academy IV: Elite Clinical & Executive Communication',
    academySubtitle: 'Scientific Storytelling, Executive Briefings & Physician Detailing',
    iconName: 'MessageSquare',
    description: 'Master the art of high-impact medical dialogue: communicating complex clinical trial statistics clearly, conducting rapid elevator detailing, and presenting compelling business cases to hospital C-suites.',
    targetLevel: 'Professional',
    estimatedHours: 6,
    learningObjectives: [
      'Translate dense biostatistical data (Hazard Ratios, Absolute vs. Relative Risk Reduction, NNT) into compelling clinical narratives.',
      'Deliver a high-impact, compliant 90-second pharmaceutical detailing interaction.',
      'Present executive financial business cases to hospital CFOs and Supply Chain VPs using structured pyramidal communication (Minto Pyramid).',
      'Handle physician skepticism with active listening, non-defensive inquiry, and peer-reviewed clinical validation.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad4_les1',
        title: 'Scientific Storytelling: Turning Data into Clinical Conviction',
        durationMinutes: 40,
        summary: 'How to present clinical trial data ethically and vividly without overwhelming clinicians with raw statistical noise.',
        keyPoints: [
          'The Narrative Arc of a Clinical Trial: The Patient Population (Inclusion Criteria) $\\to$ The Unmet Clinical Need $\\to$ The Intervention vs. Standard of Care $\\to$ Primary Endpoint Clinical Impact $\\to$ Safety & Tolerability Profile.',
          'Relative Risk Reduction (RRR) vs. Absolute Risk Reduction (ARR): Always clarify both metrics to maintain scientific integrity and credibility.',
          'Number Needed to Treat (NNT): One of the most persuasive clinical metrics. "You only need to treat 8 patients with this regimen to prevent one fatal cardiovascular event."'
        ],
        clinicalOrCommercialExample: 'Amateur rep: "Our trial showed a 40% reduction in mortality!" Elite rep: "In the Phase III EMPEROR trial of 3,730 patients with heart failure and reduced ejection fraction, our therapy achieved a 5.2% absolute risk reduction in cardiovascular death or hospitalization over 16 months, resulting in an NNT of 19, with renal adverse events comparable to placebo."',
        practicalExercisePrompt: 'Take a sample clinical trial abstract and script a 60-second explanation highlighting the primary endpoint, ARR, and patient safety profile.'
      },
      {
        id: 'acad4_les2',
        title: 'The 90-Second Hallway Detail: Micro-Pitch Architecture',
        durationMinutes: 35,
        summary: 'Structuring impactful hallway, nurse station, and elevator conversations when a specialist grants you under 2 minutes.',
        keyPoints: [
          'The 4-Part Detailing Formula: 1. Hook & Unmet Need (15s) $\\to$ 2. Clinical Data Anchor (30s) $\\to$ 3. Patient Profile Specification (30s) $\\to$ 4. Specific Low-Friction Commitment (15s).',
          'Avoid open-ended small talk when time is constrained; lead immediately with a high-relevance clinical observation.',
          'Close with a tangible, specific clinical commitment: "Doctor, for your next patient who presents with refractory hypertension despite two medications, would you consider evaluating this option?"'
        ],
        clinicalOrCommercialExample: 'Hook: "Dr. Evans, following up on your severe eczema patients who failed topical steroids..." Anchor: "In the LIBERTY trial, 48% of patients achieved clear or almost-clear skin at Week 16 with significant pruritus relief within 48 hours." Profile: "This is specifically for your adult moderate-to-severe patients." Commitment: "May I provide the digital prior-authorization copay card so your medical assistant has immediate access when you see your next refractory patient tomorrow?"',
        practicalExercisePrompt: 'Record a 90-second voice memo delivering a structured clinical detail for an oncology or cardiovascular medication.'
      },
      {
        id: 'acad4_les3',
        title: 'Executive C-Suite Communication (The Minto Pyramid Principle)',
        durationMinutes: 35,
        summary: 'How to communicate with hospital CFOs, Chief Medical Officers, and IDN executives who demand the bottom line first.',
        keyPoints: [
          'The Minto Pyramid Principle: State the conclusion and financial recommendation first; support with 3 logical business pillars; provide supporting operational data last.',
          'Executives do not care about product features; they care about Margin Improvement, Risk Mitigation, Regulatory Compliance, and Patient Satisfaction (HCAHPS).',
          'Never use jargon; speak in terms of Contribution Margin, Length of Stay (LOS), Operating Room Utilization, and CMS Readmission Penalties.'
        ],
        clinicalOrCommercialExample: 'Executive Opening: "We recommend implementing our automated medication dispensing system across your 4 surgical towers to recover $820,000 in unbilled pharmacy charges and reduce nursing medication prep time by 42 minutes per shift. Here are the three financial validations supporting this ROI..."',
        practicalExercisePrompt: 'Structure a 1-page executive briefing memo for a hospital CFO proposing a capital investment in surgical navigation equipment.'
      }
    ],
    workedCaseStudy: {
      title: 'Turning Around a Hostile Academic Department Chair',
      context: 'Dr. Gregory Vance, Chair of Hematology at an elite Ivy League medical center, was notoriously dismissive of commercial sales reps, having kicked three previous reps out of his clinic.',
      challenge: 'The institution was treating 200 high-risk multiple myeloma patients annually with a competitor product.',
      strategyAndSolution: 'The rep did not request a promotional detail. Instead, the rep sent a concise, personalized 4-sentence email citing Dr. Vance\'s recent peer-reviewed publication on cytogenetic abnormalities, highlighting how the subgroup analysis in their newly published Phase III trial directly answered a question Dr. Vance posed in his paper. The rep requested 5 minutes to share the unblinded subgroup data tables.',
      commercialOutcome: 'Dr. Vance granted a 20-minute meeting, engaged in a deep scientific discussion, and subsequently added the therapy to the institution\'s first-line treatment algorithm for high-risk deletion 17p patients.',
      executiveTakeaway: 'Top academic physicians respect intellectual peers. When you anchor commercial discussions in rigorous science and honor their published contributions, hostility transforms into professional collaboration.'
    },
    knowledgeCheck: [
      {
        question: 'Why is Absolute Risk Reduction (ARR) considered more clinically meaningful than Relative Risk Reduction (RRR)?',
        options: [
          'Because ARR is always a bigger number and sounds more impressive.',
          'Because RRR can make a minuscule clinical benefit (e.g. from 2 in 10,000 to 1 in 10,000) sound like a massive 50% reduction, whereas ARR reveals the true magnitude of effect in the patient population.',
          'ARR is only used in animal studies, not human clinical trials.',
          'The FDA strictly forbids mentioning Relative Risk Reduction in any commercial conversation.'
        ],
        correctIndex: 1,
        explanation: 'Relative Risk Reduction often exaggerates small effects. Clinicians require Absolute Risk Reduction and Number Needed to Treat (NNT) to understand the real-world clinical impact on their patients.'
      }
    ],
    relatedFrameworks: ['Minto Pyramid Principle', 'Active Listening', 'Scientific Storytelling']
  },
  {
    id: 'academy_5_ecosystem',
    academyNumber: 5,
    academyName: 'Academy V: The Healthcare Ecosystem & Market Access',
    academySubtitle: 'Payers, PBMs, GPOs, Buy-and-Bill, 340B & Hospital Reimbursement',
    iconName: 'Network',
    description: 'Master the intricate economic architecture of modern healthcare: Medicare Parts B vs. D, commercial formularies, step therapy, Group Purchasing Organizations (GPOs), buy-and-bill mechanics, and value-based payment models.',
    targetLevel: 'Executive / Strategic',
    estimatedHours: 9,
    learningObjectives: [
      'Deconstruct the financial flows between drug/device manufacturers, wholesalers (AmerisourceBergen, Cardinal Health, McKesson), PBMs, and providers.',
      'Differentiate Medicare Part A (Inpatient DRGs), Part B (Physician-administered drugs & ASP+6%), Part C (Medicare Advantage), and Part D (Retail/Specialty pharmacy).',
      'Explain the operational mechanics and financial carrying costs of the "Buy-and-Bill" model for specialty oncology practices.',
      'Analyze the impact of the 340B Drug Pricing Program, GPO contracted tiers (Vizient, Premier, HealthTrust), and Value Analysis Committees.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad5_les1',
        title: 'Medicare Decoded: Parts A, B, C, and D for Commercial Reps',
        durationMinutes: 45,
        summary: 'Understanding which bucket of healthcare reimbursement pays for your product is the single most critical commercial competency in life sciences.',
        keyPoints: [
          'Part A (Hospital Inpatient): Reimbursed via Diagnosis-Related Groups (DRGs). Hospital receives a fixed lump-sum payment per admission regardless of what devices or drugs are used. Cost reduction is paramount.',
          'Part B (Outpatient Medical Benefit): Covers physician-administered injectables, infusions, and outpatient surgical procedures. Reimbursed at Average Sales Price (ASP) + 6% (or 4.3% under statutory sequester).',
          'Part D (Prescription Drug Benefit): Self-administered outpatient medications managed by Pharmacy Benefit Managers (PBMs) with tiered formularies, prior authorization, and step therapy.',
          'Part C (Medicare Advantage): Private insurance plans managing Medicare benefits under risk-capitation contracts.'
        ],
        clinicalOrCommercialExample: 'If an orthopedic implant is used in an inpatient total knee replacement (Part A), the hospital bears 100% of the implant cost out of their fixed DRG payment. If that same procedure migrates to an Ambulatory Surgery Center (ASC) under outpatient Part B, it is reimbursed under a separate Ambulatory Payment Classification (APC) fee schedule.',
        practicalExercisePrompt: 'Determine whether a newly launched subcutaneous biologic self-injected by patients at home is reimbursed under Part B or Part D, and list the 3 primary access hurdles it will face.'
      },
      {
        id: 'acad5_les2',
        title: 'The Buy-and-Bill Model & Specialty Practice Cash Flow',
        durationMinutes: 40,
        summary: 'How oncology, rheumatology, and ophthalmology clinics purchase million-dollar inventories and navigate reimbursement float risk.',
        keyPoints: [
          'Mechanics: The physician practice purchases the specialty biologic directly from an authorized distributor, stores it in their inventory, administers it to the patient via IV infusion, and subsequently bills the patient\'s insurer.',
          'Financial Risk & Float: If a practice purchases $50,000 worth of drug for a patient whose prior authorization is subsequently denied or appealed, the clinic can face catastrophic financial loss.',
          'Prompt Pay Discounts: Wholesalers offer 1-2% prompt-pay cash discounts for payment within 15 days, which represent a significant portion of a specialty practice\'s operating margin.'
        ],
        clinicalOrCommercialExample: 'A community oncology clinic treats 10 patients per month with an immunotherapy costing $12,000 per vial. The clinic must float $120,000 in working capital. If Medicare takes 45 days to adjudicate claims, the clinic carries $180,000 in unpaid accounts receivable. A rep who provides robust reimbursement copay and patient assistance support removes this crippling cash-flow barrier.',
        practicalExercisePrompt: 'Calculate the total working capital requirement for a rheumatology clinic administering 25 monthly infusions at $4,500 acquisition cost with a 60-day average claims reimbursement cycle.'
      },
      {
        id: 'acad5_les3',
        title: 'GPOs, IDNs, and the 340B Drug Pricing Landscape',
        durationMinutes: 45,
        summary: 'Navigating Group Purchasing Organizations, integrated delivery systems, and statutory safety-net drug discounts.',
        keyPoints: [
          'Group Purchasing Organizations (GPOs): Vizient, Premier, HealthTrust negotiate volume purchase contracts on behalf of thousands of member hospitals in exchange for vendor administrative fees (typically 1-3%).',
          'Contract Tiers: Sole Source (90%+ compliance required), Dual Source, or Multi-Tier. Selling "off-contract" without GPO alignment is nearly impossible in large IDNs.',
          '340B Drug Pricing Program: Federal program requiring drug manufacturers to provide outpatient drugs to eligible safety-net hospitals at discounts of 25% to 50%, significantly altering hospital pharmacy margin dynamics.'
        ],
        clinicalOrCommercialExample: 'A hospital procurement director tells a surgical sales rep: "We cannot trial your new ultrasonic scalpel because our Vizient GPO contract mandates 85% compliance with the incumbent vendor. If we drop below 85%, we lose our $600,000 annual rebate tier across all surgical consumables."',
        practicalExercisePrompt: 'Formulate a commercial rebuttal demonstrating how a premium product\'s clinical reduction in complications can economically offset the hospital\'s potential GPO rebate loss.'
      }
    ],
    workedCaseStudy: {
      title: 'Overcoming a Restrictive Step-Therapy Blockade for a Novel Biologic',
      context: 'A newly approved biologic for severe ulcerative colitis had received formulary Tier 4 placement with a mandatory 2-step therapy failure requirement (requiring patients to fail both infliximab and adalimumab).',
      challenge: 'Gastroenterologists were unwilling to prescribe the therapy because prior authorizations were routinely rejected, requiring 6 weeks of staff appeals.',
      strategyAndSolution: 'The territory team deployed a dedicated Field Reimbursement Manager (FRM) to train clinic practice managers on the exact clinical documentation criteria required for "contraindication exemptions." They also integrated a digital prior authorization portal that pre-populated required endoscopic scoring metrics.',
      commercialOutcome: 'Prior authorization approval turnaround dropped from 42 days to 72 hours, resulting in a 410% increase in patient starts across the territory within 6 months.',
      executiveTakeaway: 'Clinical efficacy means nothing if patients cannot access the therapy. The most successful commercial teams invest heavily in removing operational friction from the prior authorization workflow.'
    },
    knowledgeCheck: [
      {
        question: 'Under Medicare Part A Inpatient Prospective Payment System (IPPS), how does a hospital receive payment for surgical procedures?',
        options: [
          'The hospital bills Medicare for every single suture, implant, and minute of surgeon time.',
          'The hospital receives a predetermined, fixed bundled payment based on the patient\'s Diagnosis-Related Group (DRG), regardless of the actual cost incurred.',
          'The surgeon pays the hospital out of their personal salary.',
          'Patients pay the entire bill in cash at discharge.'
        ],
        correctIndex: 1,
        explanation: 'Under DRGs, the hospital receives a fixed lump sum for the admission. If the cost of implants and surgical care exceeds the DRG reimbursement, the hospital loses money on that patient.'
      }
    ],
    relatedFrameworks: ['Buy-and-Bill Economics', 'GPO Contract Tiers', '340B Pricing Strategy']
  },
  {
    id: 'academy_6_scientific',
    academyNumber: 6,
    academyName: 'Academy VI: Scientific & Clinical Literacy for Sales Reps',
    academySubtitle: 'Biostatistics, Study Designs, Clinical Endpoints & Medical Literature',
    iconName: 'BookOpen',
    description: 'Develop rigorous clinical fluency: interpret Kaplan-Meier survival curves, evaluate Forest Plots, calculate statistical significance (p-values & 95% CIs), understand FDA prescribing information, and discuss clinical literature with peer-level credibility.',
    targetLevel: 'Professional',
    estimatedHours: 8,
    learningObjectives: [
      'Interpret Phase I, II, III, and IV clinical trial designs (double-blind, randomized controlled trials, crossover, open-label).',
      'Analyze survival endpoints: Progression-Free Survival (PFS), Overall Survival (OS), Disease-Free Survival (DFS), and Objective Response Rate (ORR).',
      'Evaluate biostatistical metrics: Hazard Ratios (HR), Odds Ratios (OR), p-values (<0.05), and 95% Confidence Intervals.',
      'Navigate FDA Prescribing Information (PI): Indications, Boxed Warnings, Contraindications, Drug Interactions, and Dosage Adjustments.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad6_les1',
        title: 'Mastering Kaplan-Meier Curves & Hazard Ratios',
        durationMinutes: 45,
        summary: 'How to read, analyze, and present time-to-event survival data like a seasoned oncology or cardiovascular specialist.',
        keyPoints: [
          'Kaplan-Meier Curve: Visual plot estimating the fraction of patients living or remaining event-free over time. Tick marks represent censored patients.',
          'Hazard Ratio (HR): The relative likelihood of an event occurring in the treatment group compared to the control group at any specific point in time. HR < 1.0 indicates therapeutic benefit.',
          'Confidence Interval (95% CI): If the 95% CI spans across 1.0 (e.g., HR 0.78, 95% CI: 0.58 - 1.05), the trial failed to demonstrate statistical significance (p $\\ge$ 0.05).'
        ],
        clinicalOrCommercialExample: 'Trial result: "Median Overall Survival was 24.6 months in the investigational arm vs. 17.2 months in standard-of-care (HR = 0.68; 95% CI: 0.54-0.85; p < 0.001)." This represents a statistically significant 32% reduction in the risk of death over the study period.',
        practicalExercisePrompt: 'Explain to a physician colleague why a drug with an impressive Hazard Ratio of 0.62 is NOT statistically significant if its 95% CI is 0.38 to 1.12.'
      },
      {
        id: 'acad6_les2',
        title: 'Clinical Trial Architecture & The Hierarchy of Evidence',
        durationMinutes: 40,
        summary: 'Understanding study design quality from systematic reviews down to observational case reports.',
        keyPoints: [
          'Hierarchy of Evidence: Systematic Reviews & Meta-Analyses $\\to$ Randomized Controlled Trials (RCTs) $\\to$ Cohort Studies $\\to$ Case-Control Studies $\\to$ Expert Opinion.',
          'Blinding: Single-blind vs. Double-blind (neither investigator nor patient knows assignment) vs. Open-label. Placebo control vs. Active comparator.',
          'Intention-to-Treat (ITT) vs. Per-Protocol Analysis: ITT preserves randomization by analyzing all patients assigned to a group, regardless of non-compliance or dropouts, reflecting real-world clinical effectiveness.'
        ],
        clinicalOrCommercialExample: 'A competitor claims their device reduced infection rates by 60% based on a 25-patient single-center retrospective observational case series. An elite rep respectfully contextualizes: "While retrospective case series provide interesting initial observations, our multi-center randomized controlled trial evaluated 1,200 patients across 18 centers under strict double-blind conditions."',
        practicalExercisePrompt: 'Define "Non-Inferiority Trial" and explain why a manufacturer would choose to run a non-inferiority study instead of a superiority trial.'
      },
      {
        id: 'acad6_les3',
        title: 'Deconstructing the FDA Prescribing Information (PI)',
        durationMinutes: 35,
        summary: 'How to examine the legal and regulatory blueprint of an approved pharmaceutical or medical device.',
        keyPoints: [
          'Section 1: Indications and Usage (The strict legal boundary of on-label promotion).',
          'Section 4 & 5: Contraindications, Warnings, and Boxed Warnings (Black Box Warnings).',
          'Section 6: Adverse Reactions (Clinical trial incidence vs. post-marketing surveillance).',
          'Section 14: Clinical Studies (The exact clinical trial tables and Kaplan-Meier curves approved by the FDA for promotional presentation).'
        ],
        clinicalOrCommercialExample: 'A representative cannot claim their drug is "superior in elderly patients" unless Section 14 specifically contains an FDA-approved geriatric subgroup analysis demonstrating statistically significant clinical benefit.',
        practicalExercisePrompt: 'Open an FDA package insert for a commonly known biologic (e.g., Keytruda or Humira) and locate the exact primary endpoint in Section 14.'
      }
    ],
    workedCaseStudy: {
      title: 'Dissecting a Competitor\'s Misleading Relative Risk Claim',
      context: 'A competitor launched an aggressive marketing campaign claiming their new oral anticoagulant reduced major bleeding by 50% compared to our therapy.',
      challenge: 'Community cardiologists were beginning to switch patients based on this catchy "50% safer" headline.',
      strategyAndSolution: 'Our territory team retrieved the original New England Journal of Medicine publication. In the trial, the major bleeding rate was 2.0% in the control arm and 1.0% in the experimental arm. While the Relative Risk Reduction was indeed 50%, the Absolute Risk Reduction was only 1.0% (NNT = 100). Crucially, the competitor\'s drug also demonstrated a statistically significant 18% increase in ischemic strokes (HR = 1.18, p = 0.03).',
      commercialOutcome: 'Reps equipped cardiologists with the complete balanced data table. Prescribers realized the 1% bleeding gain came at the cost of catastrophic ischemic strokes, reversing the competitor\'s momentum.',
      executiveTakeaway: 'When competitors manipulate relative risk statistics, master reps win by calmly bringing prescribers back to the full clinical trial data table: Absolute Risk Reduction, Number Needed to Treat, and hard clinical trade-offs.'
    },
    knowledgeCheck: [
      {
        question: 'If a clinical trial reports a Hazard Ratio of 0.72 with a 95% Confidence Interval of 0.51 to 1.08, what is the correct scientific interpretation?',
        options: [
          'The drug is 28% superior and definitively proven to save lives.',
          'The trial failed to achieve statistical significance because the 95% confidence interval crosses 1.0 (no effect), meaning the observed difference could be due to chance.',
          'The drug killed 28% of the patients in the trial.',
          'The FDA will automatically approve the drug with a breakthrough designation.'
        ],
        correctIndex: 1,
        explanation: 'Whenever a 95% Confidence Interval for a Hazard Ratio or Odds Ratio spans 1.0, the p-value is greater than or equal to 0.05, which means the result is not statistically significant.'
      }
    ],
    relatedFrameworks: ['Biostatistics Interpretation', 'FDA Labeling Rules', 'Evidence-Based Selling']
  },
  {
    id: 'academy_7_workflow',
    academyNumber: 7,
    academyName: 'Academy VII: The Real-World Sales Process & Field Workflow',
    academySubtitle: 'Territory Planning, Routing, CRM Hygiene, Call Execution & QBRs',
    iconName: 'MapPin',
    description: 'Learn the rigorous day-to-day discipline of top-tier commercial performers: strategic territory segmentation, high-efficiency routing, pre-call planning, compliant Veeva CRM logging, and Quarterly Business Review (QBR) execution.',
    targetLevel: 'Professional',
    estimatedHours: 7,
    learningObjectives: [
      'Segment territory prescribers and hospital accounts using decile analytics (IQVIA prescriber data, Definitive Healthcare hospital metrics).',
      'Execute disciplined daily call routing to maximize face-to-face physician contact while minimizing windshield travel time.',
      'Master the 5-step Pre-Call Planning discipline before stepping into any clinic or hospital.',
      'Maintain pristine CRM documentation (Veeva CRM / Salesforce Health Cloud) complying with PDMA and company compliance standards.',
      'Prepare and present an executive Quarterly Business Review (QBR) analyzing territory market share, run rates, and risk mitigation plans.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad7_les1',
        title: 'Territory Segmentation: Deciles, Targets, and Opportunity Scoring',
        durationMinutes: 40,
        summary: 'How to avoid wasting time on low-volume prescribers and focus 80% of your energy on high-decile commercial drivers.',
        keyPoints: [
          'IQVIA Deciles (1 to 10): Decile 10 represents the top 10% highest-volume prescribers in the therapeutic class; Deciles 1-3 prescribe negligible volume.',
          'Target Frequency: Decile 8-10 physicians require 2-3 visits per month; Decile 5-7 require 1 visit per month; Deciles 1-4 should not receive in-person field detailing.',
          'Account Potential vs. Rep Accessibility: The sweet spot is high-potential prescribers with open access or strong existing referral relationships.'
        ],
        clinicalOrCommercialExample: 'A representative with 240 target physicians analyzes prescribing volume: 32 physicians (Deciles 8-10) account for 74% of all territory prescriptions. By restructuring their weekly route to see those 32 prescribers twice a month instead of spreading visits equally, territory revenue increases 28% in 2 quarters.',
        practicalExercisePrompt: 'Construct a weekly routing schedule for a territory containing 4 metropolitan hospital systems and 18 outpatient clinics.'
      },
      {
        id: 'acad7_les2',
        title: 'The 5-Step Pre-Call Planning Discipline',
        durationMinutes: 35,
        summary: 'Never step foot inside a medical practice without a clearly defined call objective and specific clinical ask.',
        keyPoints: [
          'Step 1: Account Context & Prescribing History (What did they prescribe last month? What did we discuss on the last call?).',
          'Step 2: Single Primary Call Objective (e.g., Secure commitment to evaluate on next newly diagnosed diabetic neuropathy patient).',
          'Step 3: Clinical Evidence Anchor (Which specific study, reprint, or dosing calculator will be featured?).',
          'Step 4: Anticipated Objection & Prepared Response (Anticipate prior-auth pushback and have copay cards ready).',
          'Step 5: Specific Next Step Ask (Do not leave with "Think about it"; secure a concrete follow-up milestone).'
        ],
        clinicalOrCommercialExample: 'Weak Pre-Call Objective: "Check in with Dr. Miller and drop off some sample bottles." Elite Pre-Call Objective: "Detail Dr. Miller on the Phase III renal preservation data, confirm his practice has onboarded the digital prior-authorization portal, and secure an agreement to initiate 2 suitable patients before our follow-up on the 14th."',
        practicalExercisePrompt: 'Fill out a complete Pre-Call Planning Sheet for an upcoming meeting with a busy interventional pulmonologist.'
      },
      {
        id: 'acad7_les3',
        title: 'Quarterly Business Reviews (QBR) & Executive Performance Analysis',
        durationMinutes: 35,
        summary: 'How top performers analyze their own territory business like an owner and present strategic plans to senior sales leadership.',
        keyPoints: [
          'The 4 Elements of an Elite QBR: 1. Quota Attainment & Revenue Growth $\\to$ 2. Win/Loss Analysis by Account $\\to$ 3. Leading vs. Lagging Indicators $\\to$ 4. Strategic 90-Day Corrective Action Plan.',
          'Leading Indicators: VAC dossier submissions, speaker dinner physician attendance, sample requests, clinical trials scheduled.',
          'Lagging Indicators: Billed revenue, net collected sales, TRx market share percentage.'
        ],
        clinicalOrCommercialExample: 'In an executive QBR, a rep whose territory is at 88% quota does not make excuses about the economy; they present: "Territory attainment is lagging by 12% due to a 60-day delay in Memorial Hospital\'s VAC review. To bridge this $80K gap, I have accelerated 6 Ambulatory Surgery Center conversions which operate outside the hospital GPO, yielding $95K in new revenue next quarter."',
        practicalExercisePrompt: 'Draft an executive summary slide for your territory\'s QBR addressing a 10% market share loss to a generic competitor.'
      }
    ],
    workedCaseStudy: {
      title: 'Restructuring a Failing Midwest Territory from #94 to #4 Nationally',
      context: 'A newly appointed specialty sales representative inherited a demoralized cardiovascular territory in Ohio ranked #94 out of 105 territories.',
      challenge: 'The prior rep spent 60% of their time driving across rural counties visiting low-decile, friendly physicians who rarely prescribed the drug.',
      strategyAndSolution: 'The new rep purged the target list of 180 low-volume doctors, concentrated on 42 high-volume hospital-affiliated cardiologists, mapped geographic cluster days (Monday/Wednesday in Cleveland core, Tuesday/Thursday in Akron), and introduced weekly breakfast clinical briefings with clinic nurse practitioners.',
      commercialOutcome: 'Within 9 months, territory TRx grew 185%, pushing the territory to #4 in the United States and earning President\'s Club honors.',
      executiveTakeaway: 'Hard work in the wrong zip code is worthless. High sales performance is fundamentally a function of disciplined customer targeting and geographic call density.'
    },
    knowledgeCheck: [
      {
        question: 'Which of the following is considered a "Leading Indicator" of commercial healthcare sales success?',
        options: [
          'Monthly collected revenue and commission check amount.',
          'Number of scheduled surgeon evaluations, VAC dossier submissions, and clinical champion meetings.',
          'Annual quota attainment reported by corporate finance.',
          'Historical market share from two quarters ago.'
        ],
        correctIndex: 1,
        explanation: 'Leading indicators measure forward-looking activities (clinical trials scheduled, VAC submissions, champion meetings) that predict future revenue. Revenue itself is a lagging indicator.'
      }
    ],
    relatedFrameworks: ['Territory Routing Optimization', 'Pre-Call Planning', 'QBR Executive Reporting']
  },
  {
    id: 'academy_8_objections',
    academyNumber: 8,
    academyName: 'Academy VIII: Objection Handling & High-Stakes Conversations',
    academySubtitle: 'The LAER Framework, De-escalation & High-Value Reversals',
    iconName: 'Shield',
    description: 'Master the psychological deconstruction and compliant resolution of healthcare’s 13 toughest objections: incumbent loyalty, pricing pushback, formulary exclusion, clinical skepticism, and gatekeeper blocks.',
    targetLevel: 'Professional',
    estimatedHours: 7,
    learningObjectives: [
      'Apply the LAER Framework (Listen, Acknowledge, Explore, Respond) to avoid defensive reactions during intense physician pushback.',
      'Deconstruct the underlying clinical or economic anxiety behind common objections ("Your drug is too expensive", "We already use a competitor").',
      'Deliver compliant, substantiated responses without overpromising or disparaging competitors.',
      'Know when to stop selling, acknowledge legitimate product boundaries, and escalate to Medical Information or clinical specialists.'
    ],
    prerequisites: ['Academy II: Sales Psychology', 'Academy IV: Elite Clinical Communication'],
    lessons: [
      {
        id: 'acad8_les1',
        title: 'The LAER Framework: The Science of Non-Defensive Dialogue',
        durationMinutes: 40,
        summary: 'Why amateur reps jump into immediate defensive rebuttals, and how elite reps use tactical pauses and probing questions to uncover the real concern.',
        keyPoints: [
          'Listen: Allow the clinician or administrator to speak uninterrupted; resist the urge to correct them immediately.',
          'Acknowledge: Validate their perspective to disarm psychological resistance ("I completely understand why that prior trial result caused concern...").',
          'Explore: Ask probing diagnostic questions to uncover the true root cause ("Doctor, when you mention reimbursement risk, are you seeing delays with Medicare Part B or specific commercial HMOs?").',
          'Respond: Deliver a targeted, evidence-based solution focused solely on their clarified concern.'
        ],
        clinicalOrCommercialExample: 'Doctor: "I am happy with my current anticoagulant; I don\'t need another drug." Amateur Rep: "But our drug has a 20% lower bleeding rate!" Elite Rep (LAER): "I hear you, Dr. Vance. The current standard of care has been a trusted workhorse for years (Acknowledge). Just so I understand, when you treat your older patients with mild renal insufficiency, are you finding that dosing adjustments remain straightforward, or do they require frequent blood level monitoring? (Explore)"',
        practicalExercisePrompt: 'Script a LAER response to a hospital pharmacist who states: "We don\'t have room on our formulary for another biosimilar."'
      },
      {
        id: 'acad8_les2',
        title: 'Deconstructing the Top 6 Healthcare Sales Objections',
        durationMinutes: 45,
        summary: 'Deep-dive battlecard playbooks for the most frequent objections encountered across pharma, medical devices, and healthtech.',
        keyPoints: [
          'Objection 1: "Your product is too expensive." $\\to$ Reframe from acquisition price to Total Cost of Care, complication avoidance, and bed-day reduction.',
          'Objection 2: "Our physicians do not want to change." $\\to$ Address status quo bias by proposing a low-risk trial on a specific refractory sub-population.',
          'Objection 3: "We cannot get prior authorization approval." $\\to$ Present dedicated field reimbursement support, automated portal integration, and sample copay programs.',
          'Objection 4: "Our hospital has a strict preferred vendor contract." $\\to$ Identify whether off-contract carve-outs exist for clinical necessity or surgeon request.'
        ],
        clinicalOrCommercialExample: 'Surgeon: "Your robotic stapler costs $120 more per reload than our incumbent." Elite Rep: "You are right, Dr. Santos; upfront acquisition is $120 higher. However, in the 500-patient randomized trial published in the Journal of Thoracic Surgery, the smart-sensor articulation reduced staple line micro-leaks by 68%. In a lung resection, a single post-op leak costs this hospital $48,000 in ICU stay. Is spending $120 on the reload worth avoiding that catastrophic complication?"',
        practicalExercisePrompt: 'Write a rebuttal to: "We tried a similar AI software tool last year and our radiologists hated the workflow."'
      },
      {
        id: 'acad8_les3',
        title: 'When to Disengage: Ethical Boundaries and Non-Promotion',
        durationMinutes: 30,
        summary: 'Understanding the professional strength of walking away when a product is clinically inappropriate or outside FDA labeling.',
        keyPoints: [
          'Never force an ill-fitting product into a patient population where it is clinically unproven or unsafe.',
          'Off-label inquiry protocol: If a physician asks about using your product for an unapproved indication, you MUST NOT promote it; refer them immediately to the Medical Information Department.',
          'Professional disengagement preserves territory reputation: Doctors remember reps who protected patient safety far longer than reps who tried to make quota at all costs.'
        ],
        clinicalOrCommercialExample: 'An oncologist asks: "Can I use your melanoma drug in pediatric glioblastoma patients?" Rep: "Dr. Kelly, our approved indication is strictly for adult unresectable or metastatic melanoma with BRAF V600 mutations. I cannot discuss or recommend use in pediatric CNS tumors. However, I can submit an unsolicited medical request to our Medical Science Liaison (MSL) team to provide you with the published research."',
        practicalExercisePrompt: 'Practice declining an off-label question from an influential department chair while maintaining an exceptional professional relationship.'
      }
    ],
    workedCaseStudy: {
      title: 'Neutralizing a P&T Committee "Cost-Per-Dose" Exclusion',
      context: 'The Pharmacy & Therapeutics (P&T) committee at St. Jude Health System voted to exclude a novel intravenous antibiotic from formulary because acquisition was $450/day vs. $35/day for generic vancomycin.',
      challenge: 'Infectious disease physicians were barred from prescribing the drug inside the hospital.',
      strategyAndSolution: 'The commercial rep partnered with Health Economics and Outcomes Research (HEOR). They built a budget impact model demonstrating that vancomycin required mandatory therapeutic drug monitoring (peak/trough blood draws), nephrology consults for acute kidney injury (AKI) in 14% of patients, and an average 3.2-day extended stay. The novel antibiotic required once-daily dosing with zero nephrotoxicity, generating a net savings of $2,100 per patient episode.',
      commercialOutcome: 'The P&T Committee reversed its ruling and granted restricted-use formulary approval for high-risk renal and diabetic patients.',
      executiveTakeaway: 'The acquisition price objection is an optical illusion. When you reveal the hidden downstream operational and clinical costs of the "cheap" incumbent, the more expensive drug becomes the institution\'s most cost-effective choice.'
    },
    knowledgeCheck: [
      {
        question: 'When a healthcare provider asks a sales representative an unsolicited question regarding an unapproved (off-label) indication, what is the mandatory compliant response?',
        options: [
          'Answer the question fully if you have read about it in a medical journal.',
          'Advise the doctor to prescribe it anyway because off-label prescribing is common.',
          'Explain that as a commercial representative you can only discuss approved on-label indications, and offer to connect them to Medical Information / Medical Affairs for an independent scientific response.',
          'Offer them free promotional samples to try on their patients.'
        ],
        correctIndex: 2,
        explanation: 'Under FDA regulations and company compliance policies, commercial sales representatives are strictly prohibited from discussing or promoting off-label uses. They must refer unsolicited requests to Medical Affairs.'
      }
    ],
    relatedFrameworks: ['LAER Framework', 'Budget Impact Modeling', 'PhRMA/FDA Compliance Boundaries']
  },
  {
    id: 'academy_9_strategy',
    academyNumber: 9,
    academyName: 'Academy IX: Advanced Commercial Strategy & Key Accounts',
    academySubtitle: 'Buying Committee Mapping, Total Cost of Ownership & Enterprise Deals',
    iconName: 'Building2',
    description: 'Master graduate-level commercial healthcare strategy: multi-facility health system key account management, buying committee consensus building, stakeholder power grids, and Total Cost of Ownership (TCO) financial modeling.',
    targetLevel: 'Executive / Strategic',
    estimatedHours: 8,
    learningObjectives: [
      'Construct a comprehensive Stakeholder Influence Grid (Champions, Economic Buyers, Blockers, Clinical Users) across a 10-hospital Integrated Delivery Network (IDN).',
      'Model Total Cost of Ownership (TCO) and Return on Investment (ROI) comparing capital acquisition vs. subscription and per-click operating models.',
      'Execute multi-threaded enterprise relationship management to protect large contracts against single-point-of-failure leadership turnover.',
      'Formulate a 180-day new product commercial launch roadmap integrating clinical trial readouts, market access timing, and key account blitzes.'
    ],
    prerequisites: ['Academy III: Professional Sales Methodologies', 'Academy V: The Healthcare Ecosystem'],
    lessons: [
      {
        id: 'acad9_les1',
        title: 'IDN Stakeholder Mapping & The Power Grid',
        durationMinutes: 45,
        summary: 'How to navigate the complex web of hospital politics where clinical champions and supply chain executives frequently clash.',
        keyPoints: [
          'The 4 Stakeholder Personas: 1. Economic Buyer (Signs the check) $\\to$ 2. Clinical Champion (Demands the clinical value) $\\to$ 3. Operational Implementer (IT, Nursing, Pharmacy) $\\to$ 4. Institutional Blocker (Incumbent loyalty or budget guardian).',
          'Multi-Threading Principle: A deal with only 1 contact in an IDN is 80% likely to fail if that contact leaves or gets promoted. You need minimum 4 active executive relationships.',
          'Aligning the Triad: Successful healthcare adoption requires simultaneous alignment across the Clinical Triad: Chief of Service (Physician), Nurse Manager (Operations), and Service Line Director (Finance).'
        ],
        clinicalOrCommercialExample: 'In a surgical robotics deal, the Chief of Surgery loved the system (Champion), but the VP of Materials Management (Blocker) refused to schedule a VAC review because of budget freezes. The rep aligned with the Chief Nursing Officer by showing how robotic ergonomics reduced OR scrub nurse turnover, creating joint C-suite pressure on Materials Management.',
        practicalExercisePrompt: 'Map an organogram of an 8-hospital regional health system identifying the key titles for a cardiology service line technology review.'
      },
      {
        id: 'acad9_les2',
        title: 'Total Cost of Ownership (TCO) & Budget Impact Modeling',
        durationMinutes: 45,
        summary: 'How to construct rigorous financial models that prove a premium medical technology saves the hospital system money.',
        keyPoints: [
          'Direct vs. Indirect Costs: Direct costs include acquisition, service contracts, disposables; Indirect costs include complication management, length of stay, sterilization labor, and operating room minute fees ($60 - $120/minute).',
          'The CapEx vs. OpEx Tradeoff: Understanding when a hospital prefers an upfront Capital Expenditure (depreciated over 5-7 years) vs. an Operational Expense (per-procedure subscription or lease).',
          'Contribution Margin Analysis: Modeling how increasing surgical volume by 2 cases per week enhances overall hospital net revenue by $350K.'
        ],
        clinicalOrCommercialExample: 'Capital Equipment Model: A hospital evaluates a $450,000 orthopedic navigation station. The rep calculates: Navigation reduces implant revision surgery from 3.8% to 1.1% over 400 annual procedures. Avoiding 11 revision surgeries (at an average uncompensated loss of $24,000 per revision) saves the hospital $264,000 annually, yielding a full financial payback in 20.4 months.',
        practicalExercisePrompt: 'Build a 3-year TCO comparison between a reusable surgical instrument requiring $42 per cycle in autoclave processing vs. a single-use disposable instrument priced at $68.'
      },
      {
        id: 'acad9_les3',
        title: 'Commercial Launch Excellence: Day 0 to Day 180',
        durationMinutes: 40,
        summary: 'Executing a flawless pharmaceutical or medical device commercial launch in a competitive therapeutic category.',
        keyPoints: [
          'Pre-Launch Readiness (Day -180 to 0): Disease awareness campaigns, advisory boards, clinical trial publication timing, and early reimbursement coding filings (PLA, CPT).',
          'Launch Acceleration (Day 0 to 90): Fast-mover prescriber blitz, KOL symposium activations, patient assistance program onboarding, and target account VAC submissions.',
          'Maturity & Pull-Through (Day 90 to 180): Formulary tier pull-through, conversion of trial users to primary prescribers, and competitive defense battlecards.'
        ],
        clinicalOrCommercialExample: 'During a oncology launch, the territory team identified that 60% of target prescribers wrote their first prescription within 45 days, but pharmacy prior authorizations were taking 28 days to clear. By introducing dedicated field reimbursement managers on Day 60, prescription fulfillment surged from 42% to 89%.'
      }
    ],
    workedCaseStudy: {
      title: 'Executing a Multi-Hospital System Standardization Agreement',
      context: 'Banner Health Systems was evaluating vendor standardization across their 14 operating suites for advanced energy surgical instruments.',
      challenge: 'Two incumbent manufacturers held 50/50 market share across different campuses; surgical departments had deep emotional attachment to their respective brands.',
      strategyAndSolution: 'Our Strategic Account Director proposed an Enterprise Value Partnership: rather than forcing an immediate mandate, we offered a unified pricing tier across all 14 hospitals, guaranteed a 12% overall supply chain savings, bundled an educational grant for surgical tech simulation training, and provided clinical specialists for 60 days on-site across all campuses during the transition.',
      commercialOutcome: 'Banner awarded a 3-year, $14.5M exclusive sole-source contract.',
      executiveTakeaway: 'At the health system enterprise level, contracts are not won on product specs alone; they are won by demonstrating operational execution, clinical transition support, and risk-guaranteed economic value.'
    },
    knowledgeCheck: [
      {
        question: 'Why is it dangerous in enterprise healthcare sales to rely on a single clinical champion within a hospital system?',
        options: [
          'Because clinical champions always ask for illegal kickbacks.',
          'Because if that single champion relocates, changes institutions, or loses institutional political capital, the deal has zero executive resilience and will likely collapse.',
          'Hospitals strictly forbid physicians from talking to sales reps.',
          'Because clinical champions never understand clinical trial data.'
        ],
        correctIndex: 1,
        explanation: 'Single-threaded deals carry massive risk in healthcare due to high executive turnover and administrative reorganization. Multi-threading across Clinical, Financial, and Operational leaders protects deal continuity.'
      }
    ],
    relatedFrameworks: ['Total Cost of Ownership (TCO)', 'Stakeholder Power Grid', 'Multi-Threading Strategy']
  },
  {
    id: 'academy_10_compliance',
    academyNumber: 10,
    academyName: 'Academy X: Healthcare Sales Compliance, Ethics & Law',
    academySubtitle: 'FDA Regulations, PhRMA & AdvaMed Codes, AKS, Stark & Sunshine Act',
    iconName: 'FileCheck',
    description: 'Master the non-negotiable legal and regulatory foundation of life sciences commerce: Federal Anti-Kickback Statute, Stark Law, Physician Payments Sunshine Act (Open Payments), HIPAA, and promotional compliance.',
    targetLevel: 'Executive / Strategic',
    estimatedHours: 8,
    learningObjectives: [
      'Navigate the boundaries of on-label promotion vs. illegal off-label marketing under FDA and False Claims Act enforcement.',
      'Master the Federal Anti-Kickback Statute (AKS) and understand safe harbors governing discounts, rebates, and commercial meals.',
      'Comply with the Physician Payments Sunshine Act (CMS Open Payments) and reportable transfers of value.',
      'Differentiate PhRMA Code on Interactions with Healthcare Professionals and AdvaMed Code of Ethics governing medical devices.'
    ],
    prerequisites: ['Academy I: Foundations of Healthcare Sales'],
    lessons: [
      {
        id: 'acad10_les1',
        title: 'The Anti-Kickback Statute (AKS) & Stark Law Fundamentals',
        durationMinutes: 45,
        summary: 'Understanding the federal laws that carry felony criminal penalties and multi-million dollar False Claims Act liability for improper inducements.',
        keyPoints: [
          'Anti-Kickback Statute (42 U.S.C. § 1320a-7b): Makes it a criminal offense to knowingly offer, pay, solicit, or receive any remuneration (anything of value) to induce referrals or purchases reimbursable under federal healthcare programs (Medicare/Medicaid).',
          'One Purpose Rule: Even if an interaction has 99% legitimate educational value, if even "one purpose" of a payment or gift is to induce prescribing, it violates the AKS.',
          'Stark Law (Physician Self-Referral Law): Strict liability civil statute prohibiting physicians from referring Medicare/Medicaid patients for Designated Health Services (DHS) to entities with which the physician has a financial relationship.',
          'Statutory Safe Harbors: Specific protected categories including bona fide employee compensation, properly disclosed GPO vendor fees, and documented volume discounts passed directly to payers.'
        ],
        clinicalOrCommercialExample: 'A representative invites an orthopedic surgeon to an upscale ski resort, pays for their lodging, and pays them a $5,000 "honorarium" to give a 15-minute informal talk to three junior residents. This is an egregious AKS violation: the payment is a disguised kickback intended to reward the surgeon for using the rep\'s joint implants in Medicare patients.',
        practicalExercisePrompt: 'Evaluate a hypothetical speaker program scenario and identify 3 compliance red flags that would trigger Department of Justice investigation.'
      },
      {
        id: 'acad10_les2',
        title: 'PhRMA Code, AdvaMed Code & The Sunshine Act (Open Payments)',
        durationMinutes: 40,
        summary: 'The voluntary codes and federal transparency mandates governing interactions with healthcare professionals.',
        keyPoints: [
          'PhRMA & AdvaMed Codes: Strict prohibition on entertainment (golf, sporting events, concerts), luxury meals, branded promotional items (pens, mugs, pads), and spousal travel.',
          'Compliant Business Meals: Must be modest by local standards, strictly occasional, provided in a venue conducive to scientific discussion, and accompanied by substantive educational content.',
          'Physician Payments Sunshine Act (Section 6002 of ACA): Mandates that all medical manufacturers report any transfer of value over $10 (meals, consulting fees, travel, research grants) made to physicians, podiatrists, optometrists, and advanced practice providers (NPs/PAs). Published publicly on the CMS Open Payments website.'
        ],
        clinicalOrCommercialExample: 'A physician asks a device sales rep: "Can you take me and my family out to a nice steakhouse dinner to celebrate our 100th robotic surgery case?" Compliant Rep Response: "Dr. Alvarez, congratulations on this incredible milestone for your patients. Under federal compliance guidelines and our company policy, I cannot provide meals for family members or in celebratory social settings. However, I would be thrilled to sponsor a modest in-hospital clinical lunch for your entire surgical team to review clinical outcomes data."'
      },
      {
        id: 'acad10_les3',
        title: 'HIPAA & Protected Health Information (PHI) in the Field',
        durationMinutes: 30,
        summary: 'Protecting patient privacy while scrubbing into operating rooms or reviewing clinic prior authorizations.',
        keyPoints: [
          'Protected Health Information (PHI): Any identifiable health information (names, dates of birth, medical record numbers, surgical videos showing faces).',
          'Sales Rep Boundaries: Reps must NEVER take photos of patients, look at open computer screens showing patient lists, or retain clinical notes containing patient identifiers.',
          'Business Associate Agreements (BAAs): When healthcare software or clinical specialist support requires handling data, formal legal BAAs must govern privacy protocols.'
        ],
        clinicalOrCommercialExample: 'A device rep scrubbed into an OR case notices an unusual anatomical variant and takes a photo on their personal iPhone to show their engineering team. This is a severe HIPAA violation that can result in immediate termination, loss of hospital credentialing, and federal civil fines.'
      }
    ],
    workedCaseStudy: {
      title: 'Auditing and Rectifying a High-Risk Speaker Bureau Program',
      context: 'An internal compliance audit at a mid-sized biopharma company reviewed 40 speaker programs conducted by a regional sales team.',
      challenge: 'Audit findings revealed that one high-prescribing oncologist was paid $45,000 for 15 speaker dinners where the average audience was 1 attendee, and 3 dinners took place at a Michelin-starred resort without documented slide presentations.',
      strategyAndSolution: 'The compliance and legal leadership took immediate decisive action: suspended the speaker program, placed the regional manager on administrative leave, re-trained the entire commercial field force on bona fide Fair Market Value (FMV) standards, and self-disclosed the procedural irregularities to the HHS Office of Inspector General (OIG).',
      commercialOutcome: 'The proactive self-disclosure and remediation avoided Department of Justice criminal prosecution and corporate integrity agreement (CIA) monitor imposition.',
      executiveTakeaway: 'Compliance is not an impediment to sales; it is the ultimate protector of commercial longevity. A single rogue representative or compliant-blind manager can expose an entire corporation to tens of millions of dollars in federal fines.'
    },
    knowledgeCheck: [
      {
        question: 'Under the Physician Payments Sunshine Act (CMS Open Payments), what information is publicly disclosed?',
        options: [
          'Physicians\' personal tax returns and net worth.',
          'All transfers of value (meals, consulting fees, travel, honoraria) provided to physicians by pharmaceutical and medical device manufacturers.',
          'The private medical records of patients treated by the physician.',
          'The internal salary and commission payments of sales representatives.'
        ],
        correctIndex: 1,
        explanation: 'The Sunshine Act requires life sciences manufacturers to report all payments and transfers of value to physicians and advanced practice providers, which are searchable by anyone on the CMS Open Payments database.'
      }
    ],
    relatedFrameworks: ['Anti-Kickback Statute Safe Harbors', 'PhRMA Code Standards', 'CMS Open Payments Transparency']
  },
  {
    id: 'academy_11_technology',
    academyNumber: 11,
    academyName: 'Academy XI: Technology, Analytics & Commercial AI',
    academySubtitle: 'Veeva CRM, Salesforce Health Cloud, IQVIA Data & AI Detailing',
    iconName: 'Cpu',
    description: 'Master the modern digital sales tech stack: Veeva CRM / Vault, Salesforce Health Cloud, IQVIA / Symphony prescriber analytics, spreadsheet modeling, and AI-assisted pre-call preparation.',
    targetLevel: 'Professional',
    estimatedHours: 6,
    learningObjectives: [
      'Operate Veeva CRM for compliant call documentation, sample tracking, and digital CLM detailing.',
      'Analyze IQVIA NPA (National Prescription Audit) and Xponent prescriber-level market share reports.',
      'Build Excel financial forecasting models tracking territory run-rates, ASP variance, and quota pacing.',
      'Leverage generative AI ethically for pre-call roleplay, clinical trial summarization, and customized executive value propositions.'
    ],
    prerequisites: ['Academy VII: The Real-World Sales Process'],
    lessons: [
      {
        id: 'acad11_les1',
        title: 'Veeva CRM & Closed Loop Marketing (CLM) Navigation',
        durationMinutes: 40,
        summary: 'Mastering the industry standard CRM platform utilized by 85% of top pharmaceutical and biotech companies worldwide.',
        keyPoints: [
          'Veeva Vault Integration: Ensures that all digital detailing slides and clinical reprints presented to physicians are MLR (Medical, Legal, Regulatory) approved and compliant.',
          'Sample Accountability & PDMA: Logging physical drug samples with digital physician signature capture, lot number tracking, and physical inventory reconciliation.',
          'Call Notes Hygiene: Never write subjective, promotional claims in CRM call notes (e.g. "Doctor promised to write 10 scripts"). Record objective clinical facts and planned follow-ups.'
        ],
        clinicalOrCommercialExample: 'Compliant Veeva Call Note: "Detailed Dr. Smith on Phase III trial primary endpoint and safety profile. Left 2 sample boxes of 50mg (Lot #48291, digital signature captured). Next step: Follow up on March 18 regarding clinical tolerance in newly initiated patients."'
      },
      {
        id: 'acad11_les2',
        title: 'Commercial Analytics: Decoding IQVIA & Claims Data',
        durationMinutes: 35,
        summary: 'How to interpret weekly and monthly prescriber data to spot emerging prescribing trends and competitive displacement.',
        keyPoints: [
          'TRx vs. NRx vs. RRx: Total Prescriptions, New Prescriptions, and Refill Prescriptions. A spike in NRx precedes a future increase in TRx.',
          'Prescriber Deciles & Source of Business: Analyzing whether new prescriptions are coming from newly diagnosed naive patients or switching from a specific competitor.',
          'Market Share Velocity: Measuring the change in territory market share percentage point gain or loss relative to regional and national benchmarks.'
        ],
        clinicalOrCommercialExample: 'An IQVIA report reveals that while total prescriptions (TRx) are flat, NRx has grown 35% among the top 5 high-decile prescribers over the past 4 weeks. This leading indicator proves that the rep\'s recent clinical detail is generating new patient starts which will dramatically accelerate TRx over the next 90 days.'
      },
      {
        id: 'acad11_les3',
        title: 'AI-Powered Field Preparation & Workflow Acceleration',
        durationMinutes: 30,
        summary: 'Using modern AI models safely to accelerate account research, analyze hospital annual reports, and practice tough objection roleplay.',
        keyPoints: [
          'AI-assisted pre-call simulation: Practicing customized objections for specific specialist personas before walking into the clinic.',
          'Never enter Protected Health Information (PHI) or confidential proprietary company pricing into external public AI tools.',
          'Synthesizing hospital 990 tax filings and community health needs assessments (CHNA) to identify strategic institutional priorities in minutes.'
        ],
        clinicalOrCommercialExample: 'A rep uses AI to summarize a hospital\'s 85-page Community Health Needs Assessment, discovering that the health system has committed $4M to reducing diabetic foot amputations. The rep anchors their wound care biologic pitch directly in that published hospital priority.'
      }
    ],
    workedCaseStudy: {
      title: 'Leveraging Claims Analytics to Uncover Hidden Rare Disease Patients',
      context: 'A specialty biotech representative was launching a therapy for a rare genetic amyloidosis disease with an estimated prevalence of only 1 in 50,000.',
      challenge: 'General cardiologists rarely diagnosed the condition, misattributing symptoms to common heart failure with preserved ejection fraction (HFpEF).',
      strategyAndSolution: 'The representative utilized claims analytics (Komodo Health / Symphony) to identify cardiologists ordering uncharacteristically high volumes of cardiac MRI and technetium pyrophosphate (PYP) scans. The rep conducted educational clinical programs for those specific high-suspicion clinics on recognizing red-flag amyloidosis markers.',
      commercialOutcome: 'Diagnosed patient starts in the territory increased from 2 to 19 within 8 months, generating $4.2M in annual recurring therapy revenue.',
      executiveTakeaway: 'In rare disease commercialization, reps do not sell pills; they illuminate diagnostic pathways. Utilizing healthcare analytics to identify diagnosing physicians transforms the commercial trajectory of specialty therapies.'
    },
    knowledgeCheck: [
      {
        question: 'In pharmaceutical commercial analytics, what does a rising New Prescriptions (NRx) trend indicate if Total Prescriptions (TRx) appears flat?',
        options: [
          'The drug is failing and will be withdrawn from the market.',
          'Physicians are actively adopting the therapy in new patients, which is a leading indicator that will drive future long-term growth in Total Prescriptions as refills accumulate.',
          'The territory representative has stopped calling on doctors.',
          'Patients are abandoning their prescriptions at the retail pharmacy.'
        ],
        correctIndex: 1,
        explanation: 'NRx represents fresh patient initiations. Because chronic medications accumulate refills over time, a strong surge in NRx is the definitive leading indicator of future TRx market share growth.'
      }
    ],
    relatedFrameworks: ['Veeva CRM Standards', 'IQVIA Prescriber Analytics', 'AI Pre-Call Preparation']
  },
  {
    id: 'academy_12_leadership',
    academyNumber: 12,
    academyName: 'Academy XII: Commercial Leadership & Sales Management',
    academySubtitle: 'Field Coaching, Performance Management, Talent Development & Territory Design',
    iconName: 'Flame',
    description: 'Transition from elite individual contributor to commercial leader: conduct high-impact field ride-alongs, diagnose root-cause sales deficiencies, construct incentive compensation plans, lead product launches, and develop President’s Club talent.',
    targetLevel: 'Executive / Strategic',
    estimatedHours: 8,
    learningObjectives: [
      'Conduct effective field coaching ride-alongs using non-directive questioning and objective behavioral rubrics.',
      'Differentiate between "Will" vs. "Skill" performance issues and construct targeted Performance Improvement Plans (PIPs).',
      'Design motivational and compliant Incentive Compensation (IC) plans balancing baseline quotas, market potential, and growth accelerators.',
      'Lead cross-functional commercial alignments across Marketing, Medical Affairs, Market Access, and Commercial Operations.'
    ],
    prerequisites: ['Academy I - XI Complete'],
    lessons: [
      {
        id: 'acad12_les1',
        title: 'The Art of the Field Coaching Ride-Along',
        durationMinutes: 45,
        summary: 'How commercial sales managers coach representatives in the field without taking over customer meetings or micromanaging.',
        keyPoints: [
          'The Golden Rule of Ride-Alongs: The manager must never step in and rescue a struggling rep during a physician detail unless patient safety or compliance is breached.',
          'The 3-Phase Coaching Model: 1. Pre-Call Alignment (Rep outlines objective) $\\to$ 2. Silent Observation (Manager takes behavioral notes) $\\to$ 3. Post-Call Reflection (Rep self-assesses first before manager feedback).',
          'Ask, Don\'t Tell: "How do you feel that meeting went?" "What did you observe in the surgeon\'s body language when we reached the pricing slide?"'
        ],
        clinicalOrCommercialExample: 'An amateur manager interrupts the rep 60 seconds into the doctor\'s office to show off their own knowledge, disempowering the rep in front of the customer. An elite manager remains quiet, observes that the rep missed a buying signal on safety, and coaches the rep in the car afterward to recognize that signal on future calls.'
      },
      {
        id: 'acad12_les2',
        title: 'Diagnosing Performance Gaps: Will vs. Skill Matrix',
        durationMinutes: 40,
        summary: 'How to diagnose why a territory is missing quota and apply the appropriate managerial intervention.',
        keyPoints: [
          'High Skill, Low Will: Seasoned veteran resting on laurels $\\to$ Re-engage with leadership opportunities, specialized projects, or clear performance boundaries.',
          'Low Skill, High Will: Eager new hire running fast in the wrong direction $\\to$ Direct instruction, clinical shadowing, and structured pre-call planning templates.',
          'Low Skill, Low Will: Wrong hire or demoralized rep $\\to$ Objective 30-day corrective action plan or transition out of commercial role.',
          'High Skill, High Will: Top performer (President\'s Club) $\\to$ Autonomy, strategic account delegation, and executive sponsorship.'
        ],
        clinicalOrCommercialExample: 'A manager analyzes a struggling rep in Chicago: Call volume is high (10 calls/day), but close rate is near zero. The issue is purely Skill (inability to handle the reimbursement objection), not Will. The manager institutes intensive objection roleplay rather than threatening the rep with disciplinary action.'
      },
      {
        id: 'acad12_les3',
        title: 'Incentive Compensation Design & Territory Equity',
        durationMinutes: 35,
        summary: 'Designing sales compensation plans that reward true incremental growth while maintaining absolute compliance integrity.',
        keyPoints: [
          'Pay-for-Performance: Balancing base salary (typically 50-70% of total comp) with uncapped quarterly commission.',
          'Goal Setting Equity: Normalizing quotas across mature territories with high existing volume vs. greenfield expansion territories.',
          'Compliance Guardrails: Incentive compensation plans must never reward off-label promotion or incentivize improper clinical prescribing habits.'
        ],
        clinicalOrCommercialExample: 'A biopharma company establishes an IC plan: 50% weighted on territory TRx quota attainment, 30% on territory NRx growth velocity, and 20% on strategic account formulary approvals, with an accelerating kicker for attainment exceeding 110% of quota.'
      }
    ],
    workedCaseStudy: {
      title: 'Rehabilitating a Toxic Region and Rebuilding Team Culture',
      context: 'A newly appointed Regional Sales Director took over the Southeast region with 4 vacant territories, 50% annualized rep turnover, and bottom-quartile quota attainment.',
      challenge: 'Reps felt unsupported, micromanaged by former leadership, and disillusioned by unrealistic quota targets.',
      strategyAndSolution: 'The Director instituted transparent, two-way weekly strategy forums, re-allocated territory boundaries based on actual IQVIA prescriber density, actively promoted 2 top senior reps to Field Trainers, and spent 3 days per week coaching in the field side-by-side with struggling reps.',
      commercialOutcome: 'Within 12 months, voluntary turnover dropped to zero, all 10 territories achieved >100% of quota, and the Southeast region won Region of the Year.',
      executiveTakeaway: 'Commercial excellence is an outcome of leadership culture. When sales leaders prioritize developing their people, providing psychological safety, and removing administrative friction, elite sales performance naturally follows.'
    },
    knowledgeCheck: [
      {
        question: 'During a field coaching ride-along with a sales representative, what should the sales manager do if the representative is struggling with a customer\'s question?',
        options: [
          'Immediately interrupt the rep, tell them they are wrong, and take over the conversation.',
          'Allow the representative to work through the interaction unless patient safety or compliance is compromised, and facilitate a reflective coaching dialogue in the car afterward.',
          'Start texting on their phone to ignore the awkwardness.',
          'Tell the customer that the rep is new and apologize for their lack of training.'
        ],
        correctIndex: 1,
        explanation: 'Effective coaching requires managers to observe quietly without undermining the representative\'s credibility in front of the customer. Constructive feedback is delivered during the post-call debrief.'
      }
    ],
    relatedFrameworks: ['Will vs. Skill Matrix', 'Non-Directive Field Coaching', 'Incentive Compensation Design']
  }
];
