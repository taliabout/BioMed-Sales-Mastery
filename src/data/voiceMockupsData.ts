export interface VoiceMockup {
  id: string;
  title: string;
  category: 'Surgeon Hallway Detail' | 'Objection Reframe' | 'Hospital VAC CFO' | 'Gatekeeper Bypass' | 'Closing & MAP';
  stakeholder: string;
  context: string;
  amateurVersion: {
    speakerRole: string;
    transcript: string;
    toneStyle: string;
    vocalFlaws: string[];
    whatWentWrong: string;
  };
  masterVersion: {
    speakerRole: string;
    transcript: string;
    toneStyle: string;
    vocalSecrets: string[];
    whyItWins: string;
  };
  audioNarrationText: string; // The speech synthesis text played
  coachingBreakdown: {
    pacingWordsPerMinute: string;
    downToneCheckpoints: string[];
    microPauseDuration: string;
    psychologicalImpact: string;
  };
  speechRecognitionPrompt: string; // Exercise prompt for the student to record themselves
}

export const VOICE_MOCKUPS: VoiceMockup[] = [
  {
    id: 'vm-surgeon-hallway',
    title: '60-Second Hallway Detail with Chief of Orthopedics',
    category: 'Surgeon Hallway Detail',
    stakeholder: 'Dr. Arthur Sterling, Chief of Joint Reconstruction',
    context: 'Outside OR 4 between cases. The surgeon has 90 seconds before scrub-in. The amateur rep speaks too fast and pushes features; the master rep uses calm down-tones and pattern interrupts.',
    amateurVersion: {
      speakerRole: 'Amateur Sales Rep (Pushy & Insecure)',
      transcript: '"Dr. Sterling! Hi! Sorry to bother you, I know you’re super busy, but do you have two seconds? Our new porous knee implant just launched and it has an amazing titanium coating that reduces polyethylene wear by 40% and our tray layout is really easy to use! Can I drop off some brochures in your office and maybe get a trial on one of your cases next week?"',
      toneStyle: 'Fast, breathy, nervous up-tones at the end of every sentence (seeking approval)',
      vocalFlaws: [
        'Starting with an apology ("Sorry to bother you")',
        'Talking at 190+ words per minute without breathing',
        'Feature dumping without asking a single clinical question',
        'Premature closing ask without establishing pain',
      ],
      whatWentWrong: 'The surgeon senses insecurity and immediately raises his defense shield with a quick "Talk to my secretary."',
    },
    masterVersion: {
      speakerRole: 'President\'s Club Senior Rep (Executive Parity)',
      transcript: '"Dr. Sterling. I know you’re heading into OR 4, so I’ll be brief. On your revision knees this month, what percentage of the time are you encountering distal bone loss where traditional augments require extra bone resection? ... The reason Dr. Marcus began keeping our revision tray on standby is our porous bioactive cone preserves an extra 4 millimeters of host bone. If I have a sterile tray available for your scheduled revision next Tuesday, would you be opposed to evaluating the tactile feel yourself?"',
      toneStyle: 'Low pitch, measured 125 WPM cadence, definitive downward ending inflection',
      vocalSecrets: [
        'Zero apology: Treats own time as equal in value to surgeon’s time',
        'Calculated 1.5-second pause after the diagnostic question',
        'Calibrated "No-Oriented" close ("Would you be opposed to...")',
        'Down-tone finish that projects unflappable authority',
      ],
      whyItWins: 'Gives the clinician complete control while pinpointing a real surgical problem.',
    },
    audioNarrationText: 'Dr. Sterling. I know you are heading into OR 4, so I will be brief. On your revision knees this month, what percentage of the time are you encountering distal bone loss where traditional augments require extra bone resection? ... The reason Dr. Marcus began keeping our revision tray on standby is our porous bioactive cone preserves an extra 4 millimeters of host bone. If I have a sterile tray available for your scheduled revision next Tuesday, would you be opposed to evaluating the tactile feel yourself?',
    coachingBreakdown: {
      pacingWordsPerMinute: '120 - 130 WPM (Unrushed, calm authority)',
      downToneCheckpoints: [
        'Drop pitch on "...so I will be brief."',
        'Drop pitch firmly on "...extra bone resection."',
        'Final downward cadence on "...evaluating the tactile feel yourself."',
      ],
      microPauseDuration: '2.0 seconds after asking the bone loss question to force surgeon cognitive reflection.',
      psychologicalImpact: 'Instantly breaks the "pest vendor" stereotype and commands surgeon respect as an elite clinical collaborator.',
    },
    speechRecognitionPrompt: 'Practice this master hallway hook into your microphone: focus on pausing 2 seconds after the diagnostic question and dropping your pitch at the end of every sentence.',
  },
  {
    id: 'vm-shelby-objection',
    title: 'Shelby Haas 5-Step Reframe: "We Have Used Stryker for 10 Years"',
    category: 'Objection Reframe',
    stakeholder: 'Dr. Vance Marcus, Attending Orthopedic Spine Surgeon',
    context: 'Surgeon pushes back aggressively citing a decade of loyalty to competitor. Master rep executes Shelby Haas\'s 5-step reverse selling framework with radical detachment.',
    amateurVersion: {
      speakerRole: 'Amateur Sales Rep (Defensive & Combative)',
      transcript: '"Well Dr. Marcus, Stryker’s technology is actually over six years old, and their screws have a higher incidence of stripping compared to our dual-lead thread. If you look at our clinical study, our pullout strength is way better than Stryker. Don’t you want the best for your patients?"',
      toneStyle: 'Defensive, combative, argumentative cadence with sharp up-tones',
      vocalFlaws: [
        'Attacking the competitor and indirectly attacking the surgeon\'s past choices',
        'Condescending guilt trip ("Don\'t you want the best for your patients?")',
        'Zero validation or active listening',
      ],
      whatWentWrong: 'The surgeon digs his heels in deeper to defend his 10-year reputation. The rep is blacklisted from the OR.',
    },
    masterVersion: {
      speakerRole: 'Shelby Haas Certified Master Rep',
      transcript: '"Dr. Marcus, that makes complete sense. If you have delivered ten years of great patient outcomes with Stryker, you would be crazy to switch just to try a new gadget. Quick question – when you look at your toughest revision cases involving osteopenic bone, what is the one procedural moment where you still find yourself wishing you had more tactile feedback? ... The reason Dr. Sterling started keeping our specialized revision sleeves on standby wasn’t to replace his primary cases; it was strictly for those complex salvage cases. If I provide full sterile tray coverage for just one case next month, would you be completely opposed to feeling the difference yourself?"',
      toneStyle: 'Warm validation, relaxed tonality, zero defensiveness, strategic 2-second silence',
      vocalSecrets: [
        'Step 1 & 2: Instant emotional validation ("you would be crazy to switch")',
        'Step 3: Diagnosing the 10% edge-case where the competitor falls short',
        'Step 4: Social proof without disparaging the incumbent',
        'Step 5: Zero-risk trial close with low psychological friction',
      ],
      whyItWins: 'Removes all pressure, honors the surgeon’s past success, and creates curiosity for complex cases.',
    },
    audioNarrationText: 'Dr. Marcus, that makes complete sense. If you have delivered ten years of great patient outcomes with Stryker, you would be crazy to switch just to try a new gadget. Quick question: when you look at your toughest revision cases involving osteopenic bone, what is the one procedural moment where you still find yourself wishing you had more tactile feedback? ... The reason Dr. Sterling started keeping our specialized revision sleeves on standby was not to replace his primary cases; it was strictly for those complex salvage cases. If I provide full sterile tray coverage for just one case next month, would you be completely opposed to feeling the difference yourself?',
    coachingBreakdown: {
      pacingWordsPerMinute: '125 WPM with warm, smiling vocal resonance',
      downToneCheckpoints: [
        'Drop pitch on "...crazy to switch just to try a new gadget."',
        'Gentle downward inflection on "...more tactile feedback."',
        'Clear, grounded down-tone on "...feeling the difference yourself."',
      ],
      microPauseDuration: '1.8 seconds after "tactile feedback" to let the pain settle.',
      psychologicalImpact: 'Because you validated his loyalty instead of fighting it, his guard drops completely.',
    },
    speechRecognitionPrompt: 'Record your own version of the Shelby Haas 5-Step Reframe: start with "that makes complete sense" and deliver the edge-case clarifying question.',
  },
  {
    id: 'vm-vac-cfo',
    title: 'Executive VAC Defense: Neutralizing Hospital Spending Freeze',
    category: 'Hospital VAC CFO',
    stakeholder: 'Brenda Vance, Hospital Supply Chain & VAC Chair',
    context: 'Hospital CFO has frozen all new technology trials. Master rep uses Keenan Gap Selling and Challenger Commercial Teaching to prove the cost of doing nothing exceeds the cost of acquisition.',
    amateurVersion: {
      speakerRole: 'Amateur Sales Rep (Discount Beggar)',
      transcript: '"Ms. Vance, please! What if we give the hospital a 15% discount on the first 100 units? Or what if we do consignment where you don’t pay until the surgeon uses it? We really need this VAC approval this month to hit our quarterly quota!"',
      toneStyle: 'High-pitched whine, pleading, transactional focus',
      vocalFlaws: [
        'Mentioning own quota (the hospital CFO does not care about your quota)',
        'Slashing prices instantly, signaling the product was overpriced to begin with',
        'Ignoring hospital statutory penalties and clinical outcomes',
      ],
      whatWentWrong: 'The CFO categorizes the rep as a commodity vendor and denies the submission with zero appeal.',
    },
    masterVersion: {
      speakerRole: 'Strategic Enterprise Healthcare Executive',
      transcript: '"Brenda, I completely respect that. In today’s operating environment with Medicare margin compression, any supply chain director who isn’t freezing discretionary spend isn’t doing their job. Help me understand – does that freeze also apply to technologies that deliver a documented net reduction in 90-day total episode-of-care cost? ... Our clinical data demonstrates a 41% decrease in post-operative wound complications, which saves an estimated $180,000 annually in un-reimbursed readmissions under CMS penalties for your surgical volume. If I provide a 1-page health economics dossier showing that exact DRG margin model, would it make sense for you and the Chief of Surgery to review it together, or are you opposed to that?"',
      toneStyle: 'Sober, C-Suite executive gravity, steady 115 WPM cadence',
      vocalSecrets: [
        'Validating her fiduciary duty as CFO/Supply Chain leader',
        'Reframing the discussion from unit price to total episode-of-care savings',
        'Citing specific statutory CMS readmission penalties (HRRP)',
        'Framing inaction as a $180,000 annual leak',
      ],
      whyItWins: 'Aligns directly with the CFO’s bonus and hospital EBITDA metrics.',
    },
    audioNarrationText: 'Brenda, I completely respect that. In today’s operating environment with Medicare margin compression, any supply chain director who isn’t freezing discretionary spend isn’t doing their job. Help me understand: does that freeze also apply to technologies that deliver a documented net reduction in 90-day total episode-of-care cost? ... Our clinical data demonstrates a 41% decrease in post-operative wound complications, which saves an estimated $180,000 annually in un-reimbursed readmissions under CMS penalties for your surgical volume. If I provide a 1-page health economics dossier showing that exact DRG margin model, would it make sense for you and the Chief of Surgery to review it together, or are you opposed to that?',
    coachingBreakdown: {
      pacingWordsPerMinute: '115 WPM (Deliberate, weighty, authoritative)',
      downToneCheckpoints: [
        'Firm downward drop on "...isn’t doing their job."',
        'Downward cadence on "...total episode-of-care cost."',
        'Decisive finish on "...or are you opposed to that."',
      ],
      microPauseDuration: '2.5 seconds after "episode-of-care cost" to allow the CFO to reconsider policy limits.',
      psychologicalImpact: 'Transforms the rep from an expense line-item into an operational cost-saving partner.',
    },
    speechRecognitionPrompt: 'Record your C-Suite VAC pitch into the microphone: focus on saying "does that freeze also apply to technologies that deliver a net reduction in 90-day cost?" with firm downward inflection.',
  },
  {
    id: 'vm-closing-map',
    title: 'The Natural Collaborative Close & Mutual Action Plan (MAP)',
    category: 'Closing & MAP',
    stakeholder: 'Dr. Sarah Lin, Interventional Cardiology Lead',
    context: 'After a successful trial case. The clinician expressed positive clinical feedback. Master rep transitions effortlessly to a concrete administrative closing sequence with zero high-pressure tactics.',
    amateurVersion: {
      speakerRole: 'Amateur Sales Rep (Awkward Closing Stall)',
      transcript: '"So... Dr. Lin... did you like it? Are you ready to sign the contract today? Can we get your hospital to buy 50 units this week so we can get you onboarded?"',
      toneStyle: 'Awkward hesitation followed by an aggressive, premature jump to contract signing',
      vocalFlaws: [
        'Asking a weak yes/no question ("did you like it?")',
        'Skipping hospital procurement, VAC, and logistics steps',
        'Creating sudden high pressure after a calm clinical trial',
      ],
      whatWentWrong: 'The doctor feels ambushed and retreats: "Send an email to purchasing."',
    },
    masterVersion: {
      speakerRole: 'Enterprise Closer (Mutual Action Plan Leader)',
      transcript: '"Dr. Lin, based on today’s case where we achieved arterial hemostasis in four minutes without manual compression, it seems like the clinical objective was met. To ensure your surgical team has seamless access to this device without administrative delays, typically the next milestone is submitting the clinical evaluation form to the VAC and setting up consignment trays in sterile processing. I already drafted the 1-page clinical summary based on your notes today. If I deliver that to Brenda in supply chain this afternoon, would that keep everything moving smoothly for your Thursday cases?"',
      toneStyle: 'Smooth, collaborative, administrative ease, unhurried down-tone',
      vocalSecrets: [
        'Reflecting the agreed clinical win with specificity (4 minutes vs manual compression)',
        'Taking 100% of the administrative paperwork off the physician’s plate',
        'Framing the close as operational momentum rather than a sales contract',
      ],
      whyItWins: 'Physicians love reps who eliminate hospital paperwork and protect their surgical schedule.',
    },
    audioNarrationText: 'Dr. Lin, based on today’s case where we achieved arterial hemostasis in four minutes without manual compression, it seems like the clinical objective was met. To ensure your surgical team has seamless access to this device without administrative delays, typically the next milestone is submitting the clinical evaluation form to the Value Analysis Committee and setting up consignment trays in sterile processing. I already drafted the 1-page clinical summary based on your notes today. If I deliver that to Brenda in supply chain this afternoon, would that keep everything moving smoothly for your Thursday cases?',
    coachingBreakdown: {
      pacingWordsPerMinute: '130 WPM (Professional, organized, proactive)',
      downToneCheckpoints: [
        'Downward inflection on "...clinical objective was met."',
        'Downward drop on "...consignment trays in sterile processing."',
        'Warm, definitive close on "...Thursday cases."',
      ],
      microPauseDuration: '1.2 seconds between the clinical recap and the next operational step.',
      psychologicalImpact: 'The sale closes automatically because the rep acts as an elite project manager executing a mutual plan.',
    },
    speechRecognitionPrompt: 'Deliver this closing sequence into your microphone: emphasize "I already drafted the 1-page clinical summary based on your notes today."',
  },
];
