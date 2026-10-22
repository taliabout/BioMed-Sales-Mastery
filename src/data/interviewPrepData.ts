import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    question: 'Why do you want to get into medical device / healthcare sales? Tell me why you want to carry a bag in the OR at 5:30 AM.',
    targetCompetency: 'Hunter Drive & Grit',
    askedBy: ['Stryker', 'Medtronic', 'Boston Scientific', 'Zimmer Biomet'],
    interviewerIntent: 'They want to weed out candidates who just want a high salary or prestige without understanding the brutal reality of 60-hour weeks, sterile core standing, and weekend emergency trauma call.',
    starModelAnswer: {
      situation: 'In my college athletics / B2B sales career, I thrived on high-stakes accountability where my personal preparation directly dictated the outcome under intense pressure.',
      task: 'I realized that while closing commercial contracts was satisfying, I wanted my work to have profound, tangible human consequences where clinical precision matters.',
      action: 'I spent the past six months preparing specifically for medical device sales: shadowing independent distributors on 05:30 AM trauma cases, reading orthopedic surgical atlas texts on fracture classifications, and mastering hospital VAC economics.',
      result: 'I know this isn\'t a comfortable 9-to-5 job. I know it means standing for seven hours on your feet, managing sterile loaner trays in SPD, and earning the trust of demanding surgeons case-by-case. I have the grit, work ethic, and coachability to become your #1 territory producer.'
    },
    fatalRedFlags: [
      'Saying: "I heard you make $300k and I like working with doctors."',
      'Showing hesitation when asked about weekend emergency call or early 5:30 AM case coverage.',
      'Lacking knowledge of what actually happens inside an Operating Room or sterile processing department.'
    ]
  },
  {
    id: 'iq-2',
    question: 'Tell me about a time you had a 100% loss or faced an impenetrable gatekeeper who refused to speak with you. How did you handle it?',
    targetCompetency: 'Hunter Drive & Grit',
    askedBy: ['Intuitive Surgical', 'Stryker', 'Pfizer', 'Ethicon / J&J'],
    interviewerIntent: 'Testing rejection tolerance and tactical ingenuity. They want to know: do you give up after one "no", or do you find creative, compliant backdoor strategies?',
    starModelAnswer: {
      situation: 'In my previous territory, the largest regional account had a strict "No Sales Reps" policy posted, and the Practice Administrator threw out every visitor brochure.',
      task: 'The account represented $400k in potential annual revenue, but direct phone calls and front-desk walk-ins were immediately shut down.',
      action: 'Rather than bothering the receptionist repeatedly, I identified an operational bottleneck: their clinical staff was overwhelmed by diabetic patient compliance questions. I partnered with their affiliated outpatient education center, delivering non-branded anatomical foot ulcer training charts. The Lead Clinical Nurse was so impressed by the educational value that she introduced me directly to the Senior Partner surgeon during their Tuesday grand rounds.',
      result: 'That surgeon granted me a 10-minute trial presentation, leading to a pilot program that ultimately converted 6 physicians in the practice and generated $310k in new contract revenue within 9 months.'
    },
    fatalRedFlags: [
      'Blaming the customer: "The receptionist was just rude and impossible."',
      'Admitting that you gave up after two attempts.',
      'Describing an illegal or non-compliant shortcut (like sneaking through employee-only fire exits).'
    ]
  },
  {
    id: 'iq-3',
    question: 'How do you handle a surgeon who aggressively screams at you in the Operating Room because an instrument trial was delayed?',
    targetCompetency: 'Gallup Strengths',
    askedBy: ['Stryker', 'Medtronic', 'Smith+Nephew'],
    interviewerIntent: 'Testing emotional resilience, composure under extreme adrenaline, and ability to keep patient safety first.',
    starModelAnswer: {
      situation: 'During a high-stress revision procedure, a scrub tech accidentally dropped a reamer handle off the sterile field, and the surgeon turned to the rep in intense frustration with the patient under open anesthesia.',
      task: 'The primary imperative was patient safety and rapid surgical resolution without matching emotional volatility or escalating conflict.',
      action: 'I kept my tone calm, steady, and focused exclusively on the solution: "Dr. Marcus, our backup sterile instrument tray is autoclaved and ready in the sub-sterile hallway right now. Circulator, let\'s bring tray B onto the back table immediately." Within 90 seconds, the new sterile handle was in the surgeon\'s hands.',
      result: 'The surgery proceeded smoothly with zero complication. After the case while changing scrubs, the surgeon pulled me aside to thank me for staying calm under pressure, and from that day forward, I became his primary go-to rep for all complex cases.'
    },
    fatalRedFlags: [
      'Getting defensive or arguing with the surgeon in front of the patient and OR staff.',
      'Taking clinical frustration personally and freezing up.',
      'Blaming the circulating nurse or hospital sterile processing staff.'
    ]
  },
  {
    id: 'iq-4',
    question: 'Walk me through how you build and execute a 30-60-90 Day Territory Business Plan when entering a brand-new hospital territory.',
    targetCompetency: 'VAC & Economic Savvy',
    askedBy: ['Genentech', 'Boston Scientific', 'Abbott', 'Intuitive Surgical'],
    interviewerIntent: 'Testing strategic business acumen, territory planning discipline, and understanding of the healthcare purchasing cycle.',
    starModelAnswer: {
      situation: 'Taking over a cold territory requires immediate structured prioritization rather than random account visits.',
      task: 'My goal is to achieve cash-flow positive territory revenue within the first 90 days while establishing deep clinical-administrative relationships.',
      action: 'In the first 30 Days (Learn & Map): Complete 100% vendor credentialing (RepTrax/Vendormate), master all tray configurations, and audit the top 20 regional hospital systems by procedure volume using state registry data. In Days 31-60 (Target & Champion): Map the key service line chiefs, identify 3 high-volume fellowship-trained surgical champions, meet with the VAC coordinator to obtain the hospital pricing crosswalk, and secure 2 clinical evaluation case requests. In Days 61-90 (Convert & Scale): Execute flawless clinical trial cases in the OR, submit complete VAC submission packets with health economics data, and establish par-level consignment inventory.',
      result: 'This structured playbook de-risks the launch, transforms cold accounts into verified clinical pipeline, and accelerates quota achievement.'
    },
    fatalRedFlags: [
      'Giving vague generalities like "I will just work hard and visit as many doctors as possible."',
      'Failing to mention vendor credentialing, VAC committees, or sterile processing.',
      'Not knowing who the Economic Buyer or Supply Chain Director is.'
    ]
  }
];

export const GALLUP_TRAIT_GUIDE = [
  {
    trait: 'Achiever',
    whatItMeans: 'You have a constant, innate stamina and hunger to accomplish tangible goals every single day. Yesterday\'s victory doesn\'t count; the score starts at zero every morning.',
    howToDemonstrateInInterview: 'Talk about tracking daily metrics: number of OR cases covered, number of surgeon contacts, and waking up early to inspect sterile trays before 06:00 AM.'
  },
  {
    trait: 'Competition',
    whatItMeans: 'You measure your progress against others. You have an intense drive to be #1 and hate losing even more than you enjoy winning.',
    howToDemonstrateInInterview: 'Give concrete examples of stack rankings: being #1 out of 60 reps in your region, or transforming a territory from 42nd place to top 3 nationally.'
  },
  {
    trait: 'Relator',
    whatItMeans: 'You build genuine, authentic, long-term bonds of trust with people rather than transactional superficial connections.',
    howToDemonstrateInInterview: 'Explain how you build trust with scrub techs, sterile processing techs, and circulators—treating everyone in the hospital with equal respect.'
  },
  {
    trait: 'Command / Courage',
    whatItMeans: 'You are comfortable taking charge in uncertain, high-stakes environments and are not intimidated by demanding authority figures.',
    howToDemonstrateInInterview: 'Show that you can look a world-renowned Department Chair in the eye, stand your ground respectfully with clinical evidence, and ask for the business.'
  }
];
