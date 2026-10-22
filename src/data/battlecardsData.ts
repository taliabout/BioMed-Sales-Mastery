import { Battlecard } from '../types';

export const BATTLECARDS: Battlecard[] = [
  {
    id: 'bc-1',
    objection: '"I’ve been using Stryker / Medtronic for 10 years and my patient outcomes are great. I have no reason to switch."',
    category: 'Incumbent Loyalty',
    tracks: ['med_device'],
    psychologicalRoot: 'Surgeons are risk-averse. A change in implant design disrupts muscle memory, tray familiarity, and risks surgical complications under their name.',
    amateurMistake: 'Arguing that the competitor\'s design has flaws or sending generic product brochures that question the surgeon\'s past 10 years of patient results.',
    topPerformerScript: '"Dr. Vance, having ten years of reproducible, predictable outcomes with Stryker is testament to your surgical technique, and I certainly would never suggest altering what works seamlessly in your primary routine. Where we’ve seen high-volume joint surgeons find immense value is in those 10% to 15% edge cases—such as severe valgus deformities or heavy bone loss—where traditional broaching compromises leg-length restoration. In those specific complex cases, would you be open to reviewing how our dual-mobility offset restores center of rotation without requiring custom cutting blocks?"',
    powerQuestions: [
      'In your last 50 revisions, what anatomical variation created the most intraoperative hesitation for you?',
      'If you could eliminate one step in your femoral preparation sequence, how would that impact your room turnover time?'
    ],
    requiredEvidence: 'Sub-cohort analysis of complex revision outcomes and instrument tray count comparison (e.g. 2 trays vs 5 trays).'
  },
  {
    id: 'bc-2',
    objection: '"Our hospital is locked into an exclusive Premier / Vizient GPO contract. We cannot buy off-contract."',
    category: 'Price & VAC',
    tracks: ['med_device', 'healthtech_samd', 'biotech_oncology'],
    psychologicalRoot: 'Materials management fear losing their 10-15% annual GPO compliance rebate checks and getting reprimanded by the CFO.',
    amateurMistake: 'Telling the materials manager that their GPO contract is bad, or complaining that the hospital bureaucracy is hurting patients.',
    topPerformerScript: '"Brenda, we completely understand and respect Memorial Health’s commitment to your Premier tier—standardization drives your enterprise rebates, and we would never suggest disrupting your commodity base. However, section 4.2 of Premier’s Master Purchasing Agreement explicitly includes a \'Physician Specialty Carve-Out\' for breakthrough clinical technologies that solve unaddressed clinical complications. If our surgical champions attest to this unmet need, and we tier our construct pricing to be cost-neutral to your existing contracted ceiling, would you support submitting this under the carve-out pathway for Thursday’s review?"',
    powerQuestions: [
      'What is the threshold criteria for your VAC to grant a single-case carve-out when a surgeon requests a non-contracted implant?',
      'If we match your incumbent contracted acquisition cost on day one, what operational metrics would your committee require to evaluate a trial?'
    ],
    requiredEvidence: 'GPO cross-reference crosswalk matching catalog numbers, and formal cost-neutrality schedule.'
  },
  {
    id: 'bc-3',
    objection: '"Your drug is Tier 3 non-preferred on commercial formularies; prior authorizations take 3 weeks and get denied."',
    category: 'Reimbursement & Formularies',
    tracks: ['pharma', 'biotech_oncology'],
    psychologicalRoot: 'Clinic nurses and prior-authorization coordinators are overwhelmed with paperwork. Prescribing a drug that triggers denials creates angry patients and unpaid administrative hours.',
    amateurMistake: 'Telling the doctor to "just write letters of medical necessity" without providing administrative support.',
    topPerformerScript: '"Dr. Chen, your frustration with prior authorization delays is 100% justified; your clinical team should be treating patients, not spending 45 minutes on hold with pharmacy benefit managers. That is why our company established a dedicated Field Reimbursement Specialist team. When you identify an indicated patient, your nurse simply faxes a single-page authorization form into our dedicated hub. We guarantee a 72-hour benefits verification, electronically submit the appeal package citing the phase III NCCN guideline listing, and provide an immediate 30-day bridging supply so your patient never misses a dose while the paperwork processes. Would it help if I walked your clinic coordinator through our 2-minute portal today?"',
    powerQuestions: [
      'How many patients in your practice this past month had their therapy delayed due to PBM step-therapy rejections?',
      'If our hub took 100% of the appeal documentation burden off your nursing staff, which patient in your clinic today would benefit most from this treatment?'
    ],
    requiredEvidence: 'Electronic prior authorization hub portal flyer, copay savings card terms, and NCCN Category 1 recommendation citation.'
  },
  {
    id: 'bc-4',
    objection: '"We have a strict No-Reps policy. Leave your card in the basket."',
    category: 'Gatekeeper / Access',
    tracks: ['pharma', 'med_device', 'biotech_oncology'],
    psychologicalRoot: 'The Practice Administrator is protecting the clinic schedule, preventing waiting room crowding, and avoiding disruptive salespeople.',
    amateurMistake: 'Trying to sneak past the front desk into the clinic back hallways, or showing visible annoyance with the receptionist.',
    topPerformerScript: '"I completely respect that, Sarah. Dr. Patel’s patient schedule is relentless, and the last thing your team needs is an interruption during morning clinic. I’m actually not here to take five minutes of the doctor’s time today. We just published an updated clinical guideline tear-sheet on managing continuous glucose monitors that several local diabetes educators requested for their patients. I’d love to leave two pads for your nursing staff. Could I check back with you in two weeks for 60 seconds just to see if your educators found the patient charts useful?"',
    powerQuestions: [
      'What is the biggest paperwork or administrative headache your front desk staff faces when patients have questions about starting new medications?',
      'When your physicians do request new clinical guidelines, what format does your office prefer to receive them?'
    ],
    requiredEvidence: 'High-value, non-branded patient education tear-sheets and staff workflow guides.'
  },
  {
    id: 'bc-5',
    objection: '"Your capital equipment requires $250,000 upfront. Our hospital CapEx budget is frozen until next fiscal year."',
    category: 'Price & VAC',
    tracks: ['med_device', 'healthtech_samd'],
    psychologicalRoot: 'Hospital CFOs lock capital expenditure (CapEx) during tight operating margin quarters, but often have operational budget (OpEx) flexibility for consumable supplies or cost-per-procedure models.',
    amateurMistake: 'Accepting the delay and telling the sales manager: "We have to wait 10 months until their next budget year opens."',
    topPerformerScript: '"Mr. Henderson, with current hospital operating margins hovering around 1.5%, a CapEx freeze makes complete sense, and waiting until October is standard procedure for traditional purchases. However, our executive team anticipated this constraint across regional IDNs. We have structured a flexible Operating Expense (OpEx) placement program: we install the robotic console with zero capital outlay upfront, bundling the system depreciation directly into a per-procedure consumable agreement over a 36-month term. This converts a frozen capital expenditure into an operational cost that is fully covered by your existing outpatient surgical facility fee. If we structure this as pure OpEx, would you be open to reviewing the pro-forma cash flow model?"',
    powerQuestions: [
      'If this technology could be acquired entirely out of operational procedure revenue without touching your frozen CapEx bucket, who in finance would need to evaluate that structure?',
      'What procedure volume would your surgical service line need to generate to ensure positive monthly cash flow under a placement model?'
    ],
    requiredEvidence: 'Per-procedure OpEx pro-forma financial agreement and facility fee reimbursement crosswalk.'
  },
  {
    id: 'bc-6',
    objection: '"Our P&T Committee only meets twice a year, and the agenda for next month is already closed."',
    category: 'Reimbursement & Formularies',
    tracks: ['pharma', 'biotech_oncology'],
    psychologicalRoot: 'Hospital pharmacy leadership has a heavy administrative backlog and uses meeting schedules to delay reviewing expensive new therapies.',
    amateurMistake: 'Saying "Okay, I\'ll follow up in six months" and abandoning active promotion in the health system.',
    topPerformerScript: '"That is standard for tertiary health systems with rigorous clinical governance, Dr. Alvarez. Given that the formal P&T review will occur in the autumn cycle, our immediate priority is ensuring your clinical staff has an established mechanism for acute patients who fail standard first-line therapies in the interim. Most hospital pharmacy directors utilize an expedited \'Non-Formulary Urgent Medical Need\' approval protocol for sub-specialty attendings. If we prepare the clinical monograph and safety dossier for your Clinical Pharmacy Specialist today, could we establish that interim exception protocol so your high-risk patients aren\'t stranded during the waiting period?"',
    powerQuestions: [
      'Who is the specific Clinical Specialist Pharmacist assigned to draft the monograph for this therapeutic class?',
      'What safety or monitoring parameters would pharmacy require before allowing an interim non-formulary exception?'
    ],
    requiredEvidence: 'Ready-to-submit clinical monograph dossier and published NCCN/AHA clinical consensus guidelines.'
  }
];
