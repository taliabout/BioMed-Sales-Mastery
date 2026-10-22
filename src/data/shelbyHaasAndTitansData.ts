export interface TitanFramework {
  id: string;
  name: string;
  creator: string;
  title: string;
  tagline: string;
  corePhilosophy: string;
  fiveStages: {
    stage: number;
    title: string;
    description: string;
    keyScript: string;
    clinicalTranslation: string;
  }[];
  secretTactics: string[];
  commonMistakes: string[];
}

export interface ObjectionInteractiveScenario {
  id: string;
  objection: string;
  prospectRole: string;
  context: string;
  amateurApproach: {
    label: string;
    response: string;
    whyItFails: string;
  };
  shelbyHaasApproach: {
    label: string;
    fiveStepBreakdown: {
      step1Listen: string;
      step2Validate: string;
      step3Clarify: string;
      step4ValueReframe: string;
      step5ResolutionCheck: string;
    };
    fullDeliveredScript: string;
    whyItWins: string;
  };
}

export const SHELBY_HAAS_METHODOLOGY = {
  creator: 'Shelby Haas (Shelby Haas-Sapp)',
  organization: 'She Sells Academy',
  background: 'Door-to-door sales phenom at 18 who scaled remote high-ticket sales to multi-millions through modern buyer psychology and radical outcome detachment.',
  coreTenets: [
    {
      title: 'The Unstoppable Mindset & Radical Detachment',
      tagline: 'Desperation kills deals; detached confidence commands respect',
      description: 'Amateur reps cling to the commission, causing subtle needy tonality that triggers buyer defensiveness. Master reps detach from the outcome: they are clinical evaluators diagnosing whether a genuine fit exists. When you are willing to walk away, the buyer leans in.',
      ruleOfThumb: 'Never enter a surgeon detail or executive call hoping to make a sale; enter to uncover if they qualify for your solution.',
    },
    {
      title: 'Reverse Selling & The Question-Led Journey',
      tagline: 'Telling is not selling; getting the buyer to articulate their own pain is selling',
      description: 'Traditional sales teaches you to pitch features and overcome objections with canned rebuttals. Reverse selling inverts this: through calibrated diagnostic questions, the customer discovers and speaks their own dissatisfaction out loud. People do not argue with their own conclusions.',
      ruleOfThumb: 'The person asking the questions controls the direction of the conversation; the person speaking provides the leverage.',
    },
    {
      title: 'Tone Calibration & Vocal Inflection',
      tagline: 'What you say is 10%; how your vocal frequency lands is 90%',
      description: 'High-pitched ending inflections (up-tones) signal insecurity, seeking approval, and junior status. Elite reps master the authoritative down-tone (dropping pitch at the end of sentences) combined with a warm, unhurried, calm cadence. It instantly signals executive parity with surgeons and C-suite hospital leaders.',
      ruleOfThumb: 'Use calm down-tones for statements and data; use gentle, curious up-tones only when inviting them to share confidential frustrations.',
    },
  ],
  fiveStepObjectionMethod: [
    {
      step: 1,
      name: 'Exhaust & Deeply Listen',
      directive: 'Never interrupt or jump in with a rebuttal while they are objecting. Let them finish completely, then pause for 2 full seconds.',
      purpose: 'Disarms their anticipation of an aggressive counter-argument. Validates their psychological safety.',
    },
    {
      step: 2,
      name: 'Validate & Mirror Without Agreement',
      directive: 'Acknowledge their concern with complete empathy: "That completely makes sense" or "I hear that from top orthopedic chiefs all the time."',
      purpose: 'Aligns you on their side of the table instead of creating an adversarial debate.',
    },
    {
      step: 3,
      name: 'Clarifying Diagnosis Question (Isolate the Root)',
      directive: 'Uncover what is actually behind the surface objection: "When you say you want to think about it, what specific clinical parameter are you weighing most?"',
      purpose: '90% of initial objections ("we have no budget", "we are happy with competitor") are smoke screens. This finds the real obstacle.',
    },
    {
      step: 4,
      name: 'Honest Value Reframe & The Cost of Inaction',
      directive: 'Reframe the situation around what staying with their current routine costs them in complications, operative delay, or revenue leakage.',
      purpose: 'Proves that doing nothing is the highest-risk decision they can make.',
    },
    {
      step: 5,
      name: 'Resolution Check & Trial Close',
      directive: 'Confirm the hesitation is solved before proposing next steps: "If we can prove that outcome in a single trial case next Tuesday, is there anything else that would hold you back?"',
      purpose: 'Locks in mutual commitment and clears any remaining secondary objections.',
    },
  ],
};

export const TITAN_FRAMEWORKS: TitanFramework[] = [
  {
    id: 'shelby-haas-framework',
    name: 'Intro-to-Close Architecture',
    creator: 'Shelby Haas (She Sells Academy)',
    title: 'The Modern High-Ticket & Enterprise Sales Cycle',
    tagline: 'From Pattern Interrupt to Collaborative Natural Close with Zero Force',
    corePhilosophy: 'Selling is not persuasion; it is facilitating an honest evaluation where the prospect realizes the cost of their current state is intolerable.',
    fiveStages: [
      {
        stage: 1,
        title: 'The Pattern Interrupt Hook (First 7 Seconds)',
        description: 'Shatter the prospect’s default sales resistance by being authentic, concise, and completely devoid of traditional corporate jargon.',
        keyScript: '"Dr. Roberts, I know you’re stepping into the scrub room, so I won’t give you a generic sales pitch. Quick question regarding your revision hip cases..."',
        clinicalTranslation: 'Surgeons and hospital executives receive 20+ pitches a week. Speaking with quiet peer-level confidence breaks their automatic brush-off filter.',
      },
      {
        stage: 2,
        title: 'Diagnostic Discovery & The Gap',
        description: 'Ask multi-layered questions that illuminate the friction between their current procedural routine and their optimal patient outcome.',
        keyScript: '"When you encounter osteoporotic bone with the current stem, what percentage of the time do you find yourself compromising on distal fixation?"',
        clinicalTranslation: 'Forces the clinician to confront the clinical compromise they have normalized with their current vendor.',
      },
      {
        stage: 3,
        title: 'The Tailored Value Bridge',
        description: 'Present ONLY the specific clinical or economic feature that solves the exact friction they just articulated. Do not feature-dump.',
        keyScript: '"Because you mentioned distal subsidence is your primary headache, the reason Dr. Chen switched is our bioactive titanium porous collar..."',
        clinicalTranslation: 'Prevents cognitive overload and keeps the discussion laser-focused on their highest-priority outcome.',
      },
      {
        stage: 4,
        title: '5-Step Objection Reframing',
        description: 'Treat every objection as a request for reassurance and clarity, guiding the prospect to dismantle their own hesitation.',
        keyScript: '"That makes complete sense. If budget wasn’t a factor and the VAC approved it, do you believe this implant would improve that specific joint stability?"',
        clinicalTranslation: 'Separates clinical preference from hospital procurement bureaucracy so you know where to deploy resources.',
      },
      {
        stage: 5,
        title: 'The Collaborative Natural Close (Mutual Action Plan)',
        description: 'Closing is not an arm-wrestling contest; it is agreeing on the next logical operational milestone.',
        keyScript: '"It seems like the logical next step is for me to deliver a sterile trial set for your Thursday revision case. Would that make sense, or are you opposed to that?"',
        clinicalTranslation: 'Uses low-friction trial closes ("Would you be opposed to...?") that make it psychologically easy for the stakeholder to agree.',
      },
    ],
    secretTactics: [
      'The 2-Second Silence: Pausing after asking a diagnostic question prompts the buyer to fill the void with their most honest, vulnerable thought.',
      'Reverse Qualifying: "I’m not entirely sure our instrumentation is the right fit for your practice yet; that’s why I wanted to ask..."',
      'The Consequence Question: "If you don’t address this tray sterilization turnover lag, what does that mean for your OR start times by Q4?"',
    ],
    commonMistakes: [
      'Speaking 80% of the time instead of listening 80% of the time.',
      'Answering an objection immediately without clarifying the underlying cause.',
      'Using enthusiastic up-tones that sound like an infomercial rep rather than a trusted clinical advisor.',
    ],
  },
  {
    id: 'chris-voss-negotiation',
    name: 'Tactical Empathy & Calibrated Negotiation',
    creator: 'Chris Voss (Author of Never Split the Difference)',
    title: 'High-Stakes Behavioral FBI Negotiation for Enterprise Deals',
    tagline: 'Negotiate as if your life depended on it: Tactical Empathy, Labels & Mirrors',
    corePhilosophy: 'Conflict brings truth. People don’t decide based on rational logic; they decide based on emotion, status, and the desire to feel heard.',
    fiveStages: [
      {
        stage: 1,
        title: 'The Late-Night FM DJ Voice',
        description: 'Deep, calm, slow downward inflection. Radiates warmth and absolute authority, lowering the autonomic nervous system arousal of the prospect.',
        keyScript: '"Good afternoon, Dr. Marcus. I know your day in the trauma bay has been intense."',
        clinicalTranslation: 'Surgeons under high sympathetic stress respond instantly to calm, grounded vocal tones.',
      },
      {
        stage: 2,
        title: 'Mirroring (The Magic Three Words)',
        description: 'Repeat the last 1 to 3 words of what the prospect just said with an upward inquisitive inflection.',
        keyScript: 'Prospect: "We simply can’t switch vendors because of VAC bureaucracy." Rep: "...VAC bureaucracy?"',
        clinicalTranslation: 'Forces the stakeholder to elaborate and reveal the specific committee members holding up the trial.',
      },
      {
        stage: 3,
        title: 'Labeling Emotional Reality',
        description: 'Identify and vocalize their unstated fear or frustration using neutral phrases: "It seems like...", "It sounds like..."',
        keyScript: '"It seems like you’re worried that trialing our system will create friction with your sterile processing team."',
        clinicalTranslation: 'Disarms negative emotions by bringing them into the open without being accusatory.',
      },
      {
        stage: 4,
        title: 'The Accusation Audit',
        description: 'List every terrible thing the prospect could possibly think about you or your pitch before they have a chance to say it.',
        keyScript: '"Before we begin, you’re probably thinking I’m just another vendor trying to push an expensive implant that will make your OR day longer..."',
        clinicalTranslation: 'Completely neutralizes their defenses before the presentation even starts.',
      },
      {
        stage: 5,
        title: 'Calibrated "No-Oriented" Questions',
        description: 'People feel protected and in control when they say "No". Ask questions framed so that "No" means agreement to move forward.',
        keyScript: '"Have you given up on optimizing your revision joint outcomes for this quarter?" or "Would it be ridiculous for us to review one trial case?"',
        clinicalTranslation: 'Surgeons hate saying "Yes" to sales reps, but love saying "No, that’s not ridiculous."',
      },
    ],
    secretTactics: [
      'The "How am I supposed to do that?" calibrated response to aggressive hospital price-slashing demands.',
      'Never split the difference: Compromising halfway leaves both parties with a suboptimal outcome.',
      'Beware "Yes" that means "I just want you to leave my office" – seek "That’s right" instead of "You’re right".',
    ],
    commonMistakes: [
      'Saying "I understand how you feel" (condescending and breaks rapport).',
      'Rushing to defend your price when the CFO attacks your margin.',
      'Accepting a counterfeit "Yes" without securing agreed execution steps.',
    ],
  },
  {
    id: 'keenan-gap-selling',
    name: 'Gap Selling Framework',
    creator: 'Keenan (A Sales Guy Inc.)',
    title: 'The Problem-Centric Discovery & Financial Impact Model',
    tagline: 'Customers don’t buy products; they buy a bridge to escape their Current State misery',
    corePhilosophy: 'No problem = No sale. The wider the gap between the Current State and Desired Future State, the more money the customer will gladly pay.',
    fiveStages: [
      {
        stage: 1,
        title: 'Current State Hard Facts',
        description: 'Map their literal physical, technical, and operational baseline metrics.',
        keyScript: '"What is your current average OR turnaround time, and what is your annual infection rate across anterior hip approaches?"',
        clinicalTranslation: 'Establishes the factual benchmark against which all value will be calculated.',
      },
      {
        stage: 2,
        title: 'The Root Cause Problem',
        description: 'Identify the underlying defect in their current equipment or protocol causing that baseline.',
        keyScript: '"Why do you think your trays take 42 minutes to wrap and sterilize compared to the 25-minute regional benchmark?"',
        clinicalTranslation: 'Connects clinical frustration to tangible technical limitations in the incumbent system.',
      },
      {
        stage: 3,
        title: 'Business & Clinical Impact (The Cost of the Problem)',
        description: 'Calculate the cumulative financial, procedural, and clinical cost of letting that problem persist.',
        keyScript: '"At $32 per minute of OR delay across 450 cases a year, that 17-minute lag is costing your facility approximately $244,000 annually in uncaptured revenue."',
        clinicalTranslation: 'Translates a minor surgical inconvenience into an emergency financial leak for hospital leadership.',
      },
      {
        stage: 4,
        title: 'Emotional & Personal Impact',
        description: 'Uncover how the problem affects the clinician or executive personally (stress, reputation, evening chart work).',
        keyScript: '"When cases run over into the evening, how does that impact your staff retention and your own scheduled clinic hours?"',
        clinicalTranslation: 'High-ticket decisions are driven by personal pain wrapped in clinical justification.',
      },
      {
        stage: 5,
        title: 'The Future Desired State Bridge',
        description: 'Position your solution as the direct bridge from their painful baseline to their measurable target state.',
        keyScript: '"Our pre-sterilized single-use kit eliminates tray autoclaving entirely, returning those 17 minutes per case directly to your surgical schedule."',
        clinicalTranslation: 'The value of the device is equal to the size of the gap it closes.',
      },
    ],
    secretTactics: [
      'Never pitch until the customer has admitted the full dollar cost of their current state.',
      'The "So What?" Drilldown: Keep asking what the consequence of each problem is until you hit EBITDA, readmission penalties, or clinical safety.',
      'Qualifying out fast: If the gap is too small, walking away saves months of dead deal chasing.',
    ],
    commonMistakes: [
      'Treating product features as benefits without tying them to a problem.',
      'Rushing into demoing the equipment before establishing the cost of inaction.',
      'Assuming the customer knows the real size of their financial problem.',
    ],
  },
  {
    id: 'challenger-commercial-teaching',
    name: 'The Challenger Sale Model',
    creator: 'Matthew Dixon & Brent Adamson (CEB / Gartner)',
    title: 'Commercial Teaching & Constructive Tension for Hospital C-Suites',
    tagline: 'Relationship builders lose; Challengers who teach, tailor, and take control win',
    corePhilosophy: 'Top performers do not build warm relationships hoping for orders; they challenge customer assumptions with disruptive insights about the customer’s own business.',
    fiveStages: [
      {
        stage: 1,
        title: 'The Warmer (Credibility & Empathy)',
        description: 'Demonstrate deep understanding of the health system’s macro pressures without pitching your product.',
        keyScript: '"Every academic medical center we work with is currently facing CMS bundled reimbursement cuts while surgeon demand for robotic capital increases..."',
        clinicalTranslation: 'Frames you as an industry peer rather than an equipment peddler.',
      },
      {
        stage: 2,
        title: 'The Reframe (The Disruptive Insight)',
        description: 'Introduce an unexpected perspective on a problem they thought they had under control.',
        keyScript: '"Most hospital executives believe implant unit cost is their primary orthopedic margin driver. Our data shows post-op discharge destination variability actually drives 4x higher cost variance..."',
        clinicalTranslation: 'Creates intellectual curiosity and breaks their fixation on simple sticker price.',
      },
      {
        stage: 3,
        title: 'Rational Drowning (Data & Health Economics)',
        description: 'Quantify the problem using rigorous peer-reviewed health economics and clinical trial data.',
        keyScript: '"In a 1,200-patient retrospective cohort, patients treated with conventional stems had a 7.2% 90-day skilled nursing facility admission rate versus 2.1% with our rapid-recovery protocol..."',
        clinicalTranslation: 'Appeals to the analytical mind of the Value Analysis Committee.',
      },
      {
        stage: 4,
        title: 'Emotional Impact (The Pain of the Current Paradigm)',
        description: 'Make the prospect feel the pain of operating under the outdated paradigm.',
        keyScript: '"Every month your hospital continues operating under the legacy implant contract, your facility absorbs an estimated $45,000 in avoidable post-acute care penalties."',
        clinicalTranslation: 'Shifts their mindset from "We don’t need to change" to "We are actively bleeding money today."',
      },
      {
        stage: 5,
        title: 'The Solution (Leading TO Your Differentiator)',
        description: 'Map out the capabilities needed to solve that problem, which uniquely point to your product.',
        keyScript: '"To eliminate that discharge variability, a surgical service line needs three things: pre-op predictive risk stratification, robotic precision placement, and same-day physical therapy protocols..."',
        clinicalTranslation: 'Sells the category and criteria where you are the sole provider.',
      },
    ],
    secretTactics: [
      'Constructive Tension: Do not shy away from disagreeing respectfully with a surgeon or hospital VP when backed by peer-reviewed clinical data.',
      'Commercial Teaching: Never teach the customer about your company; teach the customer about their own operational blindspots.',
      'Tailoring: Frame the exact same technology differently for the Surgeon (ergonomics/speed), the Scrub Tech (tray setup), and the CFO (EBITDA margin).',
    ],
    commonMistakes: [
      'Confusing challenging with being rude or belligerent.',
      'Leading with your product rather than leading to your product.',
      'Falling into the "Relationship Builder" trap of just delivering bagels and waiting for favors.',
    ],
  },
];

export const SHELBY_HAAS_OBJECTION_SCENARIOS: ObjectionInteractiveScenario[] = [
  {
    id: 'obj-incumbent-loyalty',
    objection: '"I’ve been using Stryker / Medtronic for 12 years and my patient outcomes are great. I have zero reason to switch vendors."',
    prospectRole: 'Dr. Arthur Sterling, Chief of Joint Reconstruction',
    context: 'Hallway detailing outside OR 3. The surgeon is fiercely loyal to the incumbent rep and comfortable with current instrumentation.',
    amateurApproach: {
      label: 'The Defensive Feature Counter (Amateur)',
      response: '"Well Dr. Sterling, our implant actually has a 34% higher tensile strength and our polyethylene insert has lower wear debris according to our latest bench test! Can I show you our brochure?"',
      whyItFails: 'Attacks the surgeon’s 12-year clinical judgment. Implies he has been making poor choices for his patients, causing defensive ego shutdown.',
    },
    shelbyHaasApproach: {
      label: 'The Shelby Haas 5-Step Reframe (Mastery)',
      fiveStepBreakdown: {
        step1Listen: 'Wait 2 full seconds in silence. Maintain relaxed eye contact with an open posture.',
        step2Validate: '"Dr. Sterling, that makes complete sense. If you’ve delivered 12 years of great patient outcomes with Stryker, you would be crazy to switch just for the sake of trying a new gadget."',
        step3Clarify: '"If you don’t mind me asking – when you look at your most challenging 10% of revision cases involving severe bone loss, what is the one procedural moment where you still wish you had more intraoperative flexibility?"',
        step4ValueReframe: '"The reason Dr. Marcus across town in revisions began keeping our augment kit on standby wasn’t to replace his primary cases; it was strictly for those Type 3 defects where traditional sleeves require excess bone resection. His average revision time dropped by 22 minutes on those specific salvage cases."',
        step5ResolutionCheck: '"If I provided full clinical coverage and had our specialized revision tray on standby for just one complex revision case next month, would you be opposed to evaluating the tactile feel yourself, strictly as a backup?"',
      },
      fullDeliveredScript: '"Dr. Sterling, that makes complete sense. If you’ve delivered 12 years of great outcomes with Stryker, you’d be crazy to switch just to try a new gadget. Quick question – when you look at your toughest 10% of revision cases with severe bone loss, what’s the one moment where you still wish you had more intra-op flexibility? The reason Dr. Marcus started keeping our augment set on standby wasn’t for his primaries, but strictly for Type 3 defects where traditional sleeves require excess resection. If I had our sterile tray on standby for just one revision case next month, would you be completely opposed to evaluating the tactile feel yourself?"',
      whyItWins: 'Validates his loyalty (zero defensiveness), isolates a specific unsolved pain in complex revisions, and closes with a zero-risk "Would you be opposed to..." trial setup.',
    },
  },
  {
    id: 'obj-budget-vac',
    objection: '"Our hospital Value Analysis Committee is on a strict spending freeze. We are not evaluating any new technologies this fiscal year."',
    prospectRole: 'Brenda Vance, Hospital Supply Chain & VAC Director',
    context: 'Quarterly vendor review meeting. Hospital CFO has mandated a 5% across-the-board supply chain reduction.',
    amateurApproach: {
      label: 'The Desperate Discount Pitch (Amateur)',
      response: '"What if we matched your current vendor’s pricing, or gave you 10% off the first 50 units if you submit our paperwork to the committee today?"',
      whyItFails: 'Devalues the technology, smells of desperation, and fails to solve the CFO’s actual statutory problem (readmissions, DRG losses, standardization).',
    },
    shelbyHaasApproach: {
      label: 'The Shelby Haas 5-Step Reframe (Mastery)',
      fiveStepBreakdown: {
        step1Listen: 'Listen completely without interrupting. Nod calmly with downward vocal posture.',
        step2Validate: '"Brenda, I completely respect that. With Medicare inpatient reimbursement margins tightening, any supply chain director who isn’t freezing discretionary spending isn’t doing their job."',
        step3Clarify: '"Help me understand – when the committee looks at the spending freeze, does that policy also apply to technologies that deliver a documented net decrease in total 90-day episode-of-care cost?"',
        step4ValueReframe: '"Our technology actually carries a negative net acquisition cost under CMS bundled payments because it reduces 30-day post-op wound complications by 41%. For your facility’s 600 annual surgical volume, that prevents an estimated $180,000 in un-reimbursed readmissions under HRRP penalties."',
        step5ResolutionCheck: '"If I gave you a 1-page health economics dossier showing the exact DRG margin model before next Tuesday, would it make sense for you and the Chief of Surgery to review it together, or should we table this until next budget cycle?"',
      },
      fullDeliveredScript: '"Brenda, I completely respect that. With hospital margins where they are, any supply chain director who isn’t freezing discretionary spend isn’t doing their job. Help me understand – does that policy also apply to technologies that deliver a documented net decrease in 90-day episode-of-care cost? Our platform actually reduces post-op complications by 41%, saving an estimated $180,000 in un-reimbursed readmission penalties across your surgical volume. If I provide a 1-page health economics dossier showing that DRG margin model, would it make sense for you and Dr. Sterling to review it together, or are you opposed to that?"',
      whyItWins: 'Elevates her role, reframes spending as an investment that prevents statutory penalties, and puts the choice back in her hands with a no-pressure trial close.',
    },
  },
  {
    id: 'obj-gatekeeper-reception',
    objection: '"Dr. Reynolds doesn’t see sales reps. Leave your brochure in the bin and he’ll call if he’s interested."',
    prospectRole: 'Carla, Clinic Practice Administrator / Executive Gatekeeper',
    context: 'Private oncology clinic front desk. High volume of pharmaceutical and device reps trying to reach the lead oncologist.',
    amateurApproach: {
      label: 'The Sneaky Entitled Rep (Amateur)',
      response: '"Can you just tell him I’m here for 30 seconds? I flew in from headquarters and have some really critical clinical samples he requested last month."',
      whyItFails: 'Lying to the gatekeeper is the #1 way to get permanently banned from a medical clinic. Gatekeepers protect their physicians fiercely.',
    },
    shelbyHaasApproach: {
      label: 'The Shelby Haas 5-Step Reframe (Mastery)',
      fiveStepBreakdown: {
        step1Listen: 'Smile warmly, step back 6 inches to give physical space, never lean over the counter.',
        step2Validate: '"Carla, I completely understand. Dr. Reynolds is seeing 30 patients today and the last thing he needs is a sales rep taking time away from clinical care."',
        step3Clarify: '"You run this front desk so smoothly – how many reps come in here a week dropping off pamphlets that just end up in the recycle bin?" (Acknowledge with humor).',
        step4ValueReframe: '"I don’t want to waste a single sheet of your clinic’s paper. The only reason I stopped by is because Dr. Reynolds’s peer, Dr. Zhang at Memorial, just published a protocol on managing refractory neutropenia that reduced emergency clinic triage calls by 50% for his staff."',
        step5ResolutionCheck: '"Carla, if I leave a sealed clinical reprint addressed specifically to Dr. Reynolds with a note from Dr. Zhang, would you feel comfortable slipping it onto his chart desk when he finishes his afternoon rounds?"',
      },
      fullDeliveredScript: '"Carla, I completely understand. Dr. Reynolds has 30 patients today and the last thing he needs is a sales rep taking time from clinical care. You keep this practice running so smoothly – how many reps drop off brochures that just end up in the recycle bin? I don’t want to waste your clinic’s paper. The only reason I stopped by is because Dr. Zhang at Memorial just shared a protocol on managing refractory neutropenia that cut their staff’s emergency triage calls in half. If I leave this sealed clinical reprint with a note from Dr. Zhang, would you feel comfortable slipping it onto his chart desk when he finishes his afternoon rounds?"',
      whyItWins: 'Treats Carla as the respected clinic executive she is, highlights how the protocol helps clinic staff reduce triage calls, and makes delivering the note an easy, safe favor.',
    },
  },
];
