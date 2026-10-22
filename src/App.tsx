import React, { useState, useEffect } from 'react';
import { UserProfile, HealthcareTrack } from './types';
import { HEALTHCARE_TRACKS } from './data/tracksData';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { Navbar, ActiveView } from './components/Navbar';
import { OnboardingModal } from './components/OnboardingModal';
import { CurriculumView } from './components/CurriculumView';
import { RoleplaySimulator } from './components/RoleplaySimulator';
import { PitchAnalyzer } from './components/PitchAnalyzer';
import { FrameworksLab } from './components/FrameworksLab';
import { TerritoryPlanBuilder } from './components/TerritoryPlanBuilder';
import { BattlecardPlaybook } from './components/BattlecardPlaybook';
import { GlossaryView } from './components/GlossaryView';
import { CareerAccelerator } from './components/CareerAccelerator';
import { HospitalLocator } from './components/HospitalLocator';
import { CalendarNotifier } from './components/CalendarNotifier';
import { DeviceScanner } from './components/DeviceScanner';
import { AICopilotChat } from './components/AICopilotChat';
import { DailyGoalTracker } from './components/DailyGoalTracker';
import { BadgesAndSkillsView } from './components/BadgesAndSkillsView';
import { SubmissionHelper } from './components/SubmissionHelper';
import { NetworkingMapView } from './components/NetworkingMapView';
import { NetworkAccelerator } from './components/NetworkAccelerator';
import { TitanSalesLabView } from './components/TitanSalesLabView';
import { VoiceMockupsView } from './components/VoiceMockupsView';
import { EnterpriseB2BPortal } from './components/EnterpriseB2BPortal';
import { AdaptiveExperienceBar } from './components/AdaptiveExperienceBar';
import { SalesIntelligenceInsights } from './components/SalesIntelligenceInsights';
import { MasterAcademiesView } from './components/MasterAcademiesView';
import { CommercialPracticeLab } from './components/CommercialPracticeLab';
import { BioscienceScout } from './components/BioscienceScout';
import { MultimodalMediaStudio } from './components/MultimodalMediaStudio';
import { PerformanceAnalyticsView } from './components/PerformanceAnalyticsView';
import {
  TrendingUp,
  Building,
  Target,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Camera,
  Navigation,
  Calendar,
  FileCheck,
} from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Candidate / Associate',
  background: 'college_grad',
  experienceLevel: 'beginner_foundation',
  hasPriorSalesExperience: false,
  skipBeginnerModules: false,
  exemptionsGranted: [],
  primarySkillPillar: 'or_clinical_mastery',
  targetTrack: 'med_device',
  incomeGoal: '$200,000+',
  targetTimeline: 'steady_60_days',
  currentConfidenceLevel: 50,
  completedLessons: ['les-1-1'],
  completedQuizzes: {},
  certifiedModules: ['mod-1'],
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('biomed_sales_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('academies');

  useEffect(() => {
    try {
      localStorage.setItem('biomed_sales_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  const currentTrackData =
    HEALTHCARE_TRACKS.find((t) => t.id === profile.targetTrack) || HEALTHCARE_TRACKS[0];

  const totalLessonsCount = CURRICULUM_MODULES.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );

  const handleToggleCompleteLesson = (lessonId: string) => {
    setProfile((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const handleCertifyModule = (moduleId: string) => {
    setProfile((prev) => {
      if (prev.certifiedModules.includes(moduleId)) return prev;
      return { ...prev, certifiedModules: [...prev.certifiedModules, moduleId] };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentTrack={profile.targetTrack}
        setCurrentTrack={(track) => setProfile((p) => ({ ...p, targetTrack: track }))}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenCameraScanner={() => setIsScannerOpen(true)}
        profile={profile}
        totalLessons={totalLessonsCount}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Executive Medical Hero Banner in Clean Blues & Whites */}
        <section className="rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-6 -mr-6 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-start justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-blue-600 uppercase tracking-wider">
                  Active Specialization Track
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500">Target Goal: {profile.incomeGoal} Year 1</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {currentTrackData.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentTrackData.tagline}
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 text-xs shrink-0 w-full sm:w-auto">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-slate-500 text-[11px]">Avg Total Compensation</div>
                <div className="text-sm font-bold font-mono text-blue-700 mt-0.5">
                  {currentTrackData.avgTotalComp}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-slate-500 text-[11px]">Territory Quota Target</div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5">
                  {currentTrackData.quotaExpectation.split('(')[0]}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-slate-500 text-[11px]">Top Employers</div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5 truncate max-w-[160px]">
                  {currentTrackData.topCompanies.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Track Context Bar */}
          <div className="mt-4 sm:mt-5 border-t border-slate-100 pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>
                Field Setting: <strong className="text-slate-800">{currentTrackData.fieldEnvironment.split(',')[0]}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span>
                Completed Units: <strong className="text-blue-700">{profile.completedLessons.length}</strong> / {totalLessonsCount}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>
                Certifications: <strong className="text-blue-700">{profile.certifiedModules.length}</strong> / 8
              </span>
            </div>
          </div>
        </section>

        {/* Adaptive Experience & Skill Customization Engine */}
        <AdaptiveExperienceBar
          profile={profile}
          onUpdateProfile={setProfile}
          onNavigateToView={(view) => setActiveView(view)}
        />

        {/* Daily Goal Tracker Component */}
        <DailyGoalTracker
          currentTrack={profile.targetTrack}
          onNavigateToView={(view) => setActiveView(view)}
        />

        {/* Dynamic View Router */}
        {activeView === 'academies' && (
          <MasterAcademiesView onSelectPracticeLab={() => setActiveView('practice_lab')} />
        )}

        {activeView === 'practice_lab' && <CommercialPracticeLab />}

        {activeView === 'analytics' && (
          <PerformanceAnalyticsView
            profile={profile}
            onNavigateToView={(view) => setActiveView(view)}
          />
        )}

        {activeView === 'bioscience_scout' && (
          <BioscienceScout currentTrack={profile.targetTrack} />
        )}

        {activeView === 'media_studio' && <MultimodalMediaStudio />}

        {activeView === 'curriculum' && (
          <CurriculumView
            currentTrack={profile.targetTrack}
            completedLessons={profile.completedLessons}
            onToggleCompleteLesson={handleToggleCompleteLesson}
            certifiedModules={profile.certifiedModules}
            onCertifyModule={handleCertifyModule}
            exemptionsGranted={profile.exemptionsGranted}
            skipBeginnerModules={profile.skipBeginnerModules}
          />
        )}

        {activeView === 'enterprise_portal' && <EnterpriseB2BPortal />}

        {activeView === 'voice_mockups' && <VoiceMockupsView />}

        {activeView === 'titan_lab' && <TitanSalesLabView />}

        {activeView === 'networking_map' && <NetworkingMapView />}

        {activeView === 'network_accelerator' && (
          <NetworkAccelerator currentTrack={profile.targetTrack} />
        )}

        {activeView === 'sales_intelligence' && (
          <SalesIntelligenceInsights
            currentTrack={profile.targetTrack}
            onNavigateToView={(view) => setActiveView(view)}
          />
        )}

        {activeView === 'roleplay' && (
          <RoleplaySimulator currentTrack={profile.targetTrack} />
        )}

        {activeView === 'pitch_lab' && <PitchAnalyzer />}

        {activeView === 'badges_skills' && (
          <BadgesAndSkillsView certifiedModules={profile.certifiedModules} />
        )}

        {activeView === 'frameworks' && <FrameworksLab />}

        {activeView === 'territory_plan' && (
          <TerritoryPlanBuilder
            currentTrack={profile.targetTrack}
            userName={profile.name}
          />
        )}

        {activeView === 'hospital_radar' && <HospitalLocator />}

        {activeView === 'calendar_alerts' && <CalendarNotifier />}

        {activeView === 'battlecards' && (
          <BattlecardPlaybook currentTrack={profile.targetTrack} />
        )}

        {activeView === 'glossary' && <GlossaryView />}

        {activeView === 'career' && <CareerAccelerator />}

        {activeView === 'submission_helper' && <SubmissionHelper />}
      </main>

      {/* Floating 100% Fact-Checked AI Copilot Chatbot */}
      <AICopilotChat currentTrack={profile.targetTrack} />

      {/* Device Camera Badge Scanner Modal */}
      <DeviceScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-slate-800">BioMed Sales Mastery Academy</span> · Comprehensive Professional Commercial Training
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 font-medium">Multi-Tier Fallback AI Engine</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>AdvaMed & PhRMA Compliance Standard</span>
          </div>
        </div>
      </footer>

      {/* Onboarding / Assessment Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
      />
    </div>
  );
}
