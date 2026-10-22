export interface MEDDPICCChecklistItem {
  letter: string;
  name: string;
  healthcareQuestion: string;
  greenFlag: string;
  redFlag: string;
}

export const MEDDPICC_CHECKLIST: MEDDPICCChecklistItem[] = [
  {
    letter: 'M',
    name: 'Metrics',
    healthcareQuestion: 'What is the quantified financial and clinical ROI for the hospital (e.g. readmission reduction, OR minutes saved, infection prevention, bed-day savings)?',
    greenFlag: 'Hospital CFO/Analyst agrees that saving 18 minutes per case unlocks $1,200 in OR idle time or prevents a $30,000 surgical site infection.',
    redFlag: 'Only generic clinical claims like "it provides better surgeon ergonomics" with zero quantified dollar impact.'
  },
  {
    letter: 'E',
    name: 'Economic Buyer',
    healthcareQuestion: 'Who has final discretionary P&L sign-off on the capital purchase or GPO off-contract agreement?',
    greenFlag: 'Direct meeting or communication channel with the Hospital CFO, VP of Supply Chain, or Service Line Administrative Director.',
    redFlag: 'Assuming the Chief of Surgery has purchasing authority when the hospital CFO holds a total budget freeze.'
  },
  {
    letter: 'D',
    name: 'Decision Criteria',
    healthcareQuestion: 'What are the formal clinical, technical, operational, and financial requirements the hospital uses to evaluate products?',
    greenFlag: 'You helped draft the evaluation matrix (e.g. biocompatibility, tray sterilization turn time, GPO cost neutrality).',
    redFlag: 'The criteria are tailored specifically to the incumbent vendor\'s proprietary patent specifications.'
  },
  {
    letter: 'D',
    name: 'Decision Process',
    healthcareQuestion: 'What is the exact sequence of events, committees, and milestones from initial surgeon trial to formal hospital purchase order?',
    greenFlag: 'Mapped calendar dates: Surgeon trial (Oct 12) -> VAC Submission (Oct 28) -> Committee vote (Nov 14) -> Contract execution.',
    redFlag: 'Vague statements like "The doctor said he will talk to purchasing soon."'
  },
  {
    letter: 'P',
    name: 'Paper Process',
    healthcareQuestion: 'What are the bureaucratic legal, compliance, BAA, vendor credentialing, and procurement steps required to cut a PO?',
    greenFlag: 'Hospital procurement legal counsel has agreed to master terms and standard BAA indemnity language.',
    redFlag: 'Discovering after VAC approval that the hospital legal department has an unbending 4-month contract queue.'
  },
  {
    letter: 'I',
    name: 'Identify Pain',
    healthcareQuestion: 'What is the acute clinical, financial, or operational trauma the institution experiences if they do not change?',
    greenFlag: 'Surgeons are threatening to move their high-margin elective surgical cases to a competing Ambulatory Surgery Center down the street.',
    redFlag: 'The hospital is comfortable with their current outcomes and feels zero urgency to modernize.'
  },
  {
    letter: 'C',
    name: 'Champion',
    healthcareQuestion: 'Which influential, respected clinical leader is actively spending political capital inside the institution to get your product approved?',
    greenFlag: 'Surgeon personally writes and signs the VAC justification letter and calls the Supply Chain Director directly.',
    redFlag: 'A doctor who smiles and says "I love it, just deal with purchasing yourself."'
  },
  {
    letter: 'C',
    name: 'Competition',
    healthcareQuestion: 'Who are you competing against? (Incumbent vendors, standard of care, GPO sole-source contracts, or hospital inertia)?',
    greenFlag: 'A clear battlecard strategy targeting the incumbent\'s high complication rates or excessive instrument tray bulk.',
    redFlag: 'Believing there is no competition when "doing nothing / staying status quo" is beating you.'
  }
];

export const SPIN_QUESTIONS_LIBRARY = [
  {
    phase: 'Situation',
    description: 'Establish factual clinical context without interrogating the physician.',
    questions: [
      'What percentage of your adult spinal revision cases involve severe osteopenia or compromised bone mineral density?',
      'How does your surgical team currently handle instrument tray turnaround between back-to-back arthroplasty cases?'
    ]
  },
  {
    phase: 'Problem',
    description: 'Uncover dissatisfaction with the incumbent technology or clinical workflow.',
    questions: [
      'Where do your scrub techs experience the most friction with your current cannula and trocar sealing caps?',
      'How frequently do you find yourself needing to re-drill or place secondary cement augmentation due to screw stripping?'
    ]
  },
  {
    phase: 'Implication',
    description: 'Explore the emotional, financial, and clinical severity of the unresolved problem.',
    questions: [
      'When you lose pneumoperitoneum mid-dissection due to valve leakage, how does that intraoperative delay impact surgeon fatigue and patient anesthesia time?',
      'If an anchor pulls out post-op and requires a revision surgery within 90 days, how does that affect your hospital’s quality rating and patient trust?'
    ]
  },
  {
    phase: 'Need-Payoff',
    description: 'Guide the clinician to verbalize the exact value and transformation of your solution.',
    questions: [
      'If our self-tapping dual-core anchor could guarantee zero cortical breach and shave 12 minutes off your suturing sequence, how would that alter your approach to complex deformity cases?',
      'If your clinic could automate prior authorizations in 72 hours with zero nursing phone calls, how much clinical time would your staff reclaim every week?'
    ]
  }
];

export const VAC_SUBMISSION_CHECKLIST = [
  {
    item: 'Surgeon Champion Attestation Form',
    requirement: 'Must be physically or electronically signed by at least one high-volume attending physician detailing clinical unmet need.',
    statusDescription: 'Mandatory before the committee will place the item on the docket.'
  },
  {
    item: 'Level 1 or Level 2 Peer-Reviewed Clinical Evidence',
    requirement: 'At least two published peer-reviewed randomized controlled trials or prospective multicenter studies showing non-inferiority or superior clinical outcomes.',
    statusDescription: 'Marketing brochures and internal whitepapers are automatically rejected by clinical analysts.'
  },
  {
    item: 'Cross-Reference Crosswalk & Catalog Comparison',
    requirement: 'Line-by-line itemization comparing your catalog part numbers, descriptions, and list prices against the incumbent competitor products.',
    statusDescription: 'Enables the hospital materials analyst to evaluate construct-by-construct unit pricing parity.'
  },
  {
    item: 'Budget Impact & Total Cost of Care Model',
    requirement: 'Financial calculation showing total episode cost impact: procedure time saved, sterile reprocessing cycle savings, and infection prevention ROI.',
    statusDescription: 'Provides the CFO with economic justification to approve off-contract or premium pricing.'
  },
  {
    item: 'GPO Contract Status & Cross-Tier Schedule',
    requirement: 'Verification of Vizient / Premier / HealthTrust contract tier or formal request for Physician Unmet Need specialty carve-out.',
    statusDescription: 'Ensures the hospital does not lose enterprise compliance rebates.'
  },
  {
    item: 'Central Sterile Processing (CSP) Tray Validation',
    requirement: 'Biomedical engineering and SPD sign-off verifying tray weight (<25 lbs) and autoclave compatibility with standard cycles.',
    statusDescription: 'AORN standards cap tray weights at 25 lbs; heavier trays trigger immediate OSHA/infection control rejection.'
  }
];
