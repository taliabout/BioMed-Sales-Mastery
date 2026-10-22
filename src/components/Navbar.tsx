import React, { useState, useEffect } from 'react';
import { HealthcareTrack, UserProfile } from '../types';
import { HEALTHCARE_TRACKS } from '../data/tracksData';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { dbStore } from '../services/dbStore';
import {
  GraduationCap,
  MessageSquare,
  Sparkles,
  Layers,
  MapPin,
  Shield,
  BookOpen,
  Briefcase,
  SlidersHorizontal,
  Award,
  Camera,
  Navigation,
  Calendar,
  Menu,
  X,
  FileCheck,
  CheckCircle2,
  Network,
  Flame,
  Volume2,
  Building2,
  Send,
  UserPlus,
  Crosshair,
  Dna,
  Film,
  LogIn,
  LogOut,
  Cloud,
  Check,
  BarChart2,
} from 'lucide-react';

export type ActiveView =
  | 'academies'
  | 'practice_lab'
  | 'analytics'
  | 'bioscience_scout'
  | 'media_studio'
  | 'roleplay'
  | 'pitch_lab'
  | 'sales_intelligence'
  | 'network_accelerator'
  | 'titan_lab'
  | 'curriculum'
  | 'voice_mockups'
  | 'enterprise_portal'
  | 'badges_skills'
  | 'frameworks'
  | 'territory_plan'
  | 'hospital_radar'
  | 'calendar_alerts'
  | 'battlecards'
  | 'glossary'
  | 'career'
  | 'networking_map'
  | 'submission_helper';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentTrack: HealthcareTrack;
  setCurrentTrack: (track: HealthcareTrack) => void;
  onOpenOnboarding: () => void;
  onOpenCameraScanner: () => void;
  profile: UserProfile;
  totalLessons: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currentTrack,
  setCurrentTrack,
  onOpenOnboarding,
  onOpenCameraScanner,
  profile,
  totalLessons,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'synced'>('idle');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        dbStore.setActiveUser(user.uid);
        try {
          await dbStore.syncUserProfileToFirestore(user.uid, profile);
          setSyncStatus('synced');
        } catch (e) {
          console.warn('Sync to firestore:', e);
        }
      } else {
        dbStore.setActiveUser(null);
      }
    });
    return () => unsubscribe();
  }, [profile]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await dbStore.syncUserProfileToFirestore(result.user.uid, profile);
        setSyncStatus('synced');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSyncStatus('idle');
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const navLinks: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'academies', label: '12 Master Academies', icon: <BookOpen className="h-4 w-4 text-blue-600" /> },
    { id: 'practice_lab', label: 'Commercial Practice Lab (20)', icon: <Layers className="h-4 w-4 text-emerald-600" /> },
    { id: 'analytics', label: 'Performance Analytics (D3)', icon: <BarChart2 className="h-4 w-4 text-indigo-600" /> },
    { id: 'bioscience_scout', label: 'Bioscience Scout & 3D Lab', icon: <Dna className="h-4 w-4 text-indigo-600" /> },
    { id: 'media_studio', label: 'Multimodal Media Studio', icon: <Film className="h-4 w-4 text-violet-600" /> },
    { id: 'roleplay', label: 'HCP Roleplay (15 Personas)', icon: <MessageSquare className="h-4 w-4 text-purple-600" /> },
    { id: 'sales_intelligence', label: 'Sales Intelligence GPS', icon: <Crosshair className="h-4 w-4 text-indigo-600" /> },
    { id: 'network_accelerator', label: 'AI Network Accelerator', icon: <Send className="h-4 w-4 text-cyan-600" /> },
    { id: 'titan_lab', label: 'Shelby Haas & Titans', icon: <Flame className="h-4 w-4 text-amber-600" /> },
    { id: 'curriculum', label: 'Foundational Curriculum', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'voice_mockups', label: 'Voice Audio Mockups', icon: <Volume2 className="h-4 w-4" /> },
    { id: 'enterprise_portal', label: 'Biotech Enterprise Portal', icon: <Building2 className="h-4 w-4" /> },
    { id: 'pitch_lab', label: 'Voice Pitch Lab', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'frameworks', label: 'MEDDPICC & VAC Lab', icon: <Layers className="h-4 w-4" /> },
    { id: 'territory_plan', label: '30-60-90 Day Plan', icon: <MapPin className="h-4 w-4" /> },
    { id: 'hospital_radar', label: 'Territory Radar', icon: <Navigation className="h-4 w-4" /> },
    { id: 'battlecards', label: 'Objection Battlecards', icon: <Shield className="h-4 w-4" /> },
    { id: 'glossary', label: 'Clinical-Commercial Index', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'career', label: 'Career Tracks & Gallup', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'badges_skills', label: 'Badges & Elite Skills', icon: <Award className="h-4 w-4" /> },
    { id: 'networking_map', label: 'Networking & Org Map', icon: <Network className="h-4 w-4" /> },
    { id: 'calendar_alerts', label: 'Calendar & Alerts', icon: <Calendar className="h-4 w-4" /> },
    { id: 'submission_helper', label: 'Canvas Rubric & Demo', icon: <FileCheck className="h-4 w-4" /> },
  ];

  const handleSelectNav = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Bar: Brand, Track Selector, and User Progress */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
            APEX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-slate-900">
                BioMed Sales Mastery
              </span>
              <span className="hidden sm:inline-block rounded bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700 border border-blue-200">
                Executive Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Healthcare & Biotech Commercial Academy
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Badge Camera Scanner */}
          <button
            onClick={onOpenCameraScanner}
            title="Scan Hospital Vendor Credential / QR Badge"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50 shadow-2xs"
          >
            <Camera className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden md:inline">Scan Badge</span>
          </button>

          {/* Track Selector */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
            <span className="text-slate-500 font-medium">Track:</span>
            <select
              value={currentTrack}
              onChange={(e) => setCurrentTrack(e.target.value as HealthcareTrack)}
              className="bg-transparent font-semibold text-blue-700 focus:outline-none cursor-pointer"
            >
              {HEALTHCARE_TRACKS.map((t) => (
                <option key={t.id} value={t.id} className="bg-white text-slate-900">
                  {t.title.split('(')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Personalize Button */}
          <button
            onClick={onOpenOnboarding}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50 shadow-2xs"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
            <span>Customize</span>
          </button>

          {/* Firebase Authentication & Cloud Sync */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-1 text-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white uppercase">
                {currentUser.displayName ? currentUser.displayName[0] : 'U'}
              </span>
              <div className="hidden sm:block text-left">
                <span className="block font-bold text-emerald-950 text-[11px] leading-tight truncate max-w-[100px]">
                  {currentUser.displayName?.split(' ')[0] || 'User'}
                </span>
                <span className="flex items-center gap-0.5 text-[9px] text-emerald-700 font-medium">
                  <Cloud className="h-2.5 w-2.5" />
                  <span>Cloud Synced</span>
                </span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign out of Firebase"
                className="text-slate-400 hover:text-slate-700 p-0.5 ml-1"
              >
                <LogOut className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition disabled:opacity-50"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 shadow-2xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Horizontal Sub-Navigation Bar */}
      <div className="hidden lg:flex mx-auto max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 text-xs sm:px-6 no-scrollbar border-t border-slate-100 bg-slate-50/70">
        {navLinks.map((link) => {
          const isActive = activeView === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleSelectNav(link.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 transition-all font-medium ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          {/* Mobile Track Switcher */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs mb-2">
            <span className="text-slate-500 font-medium block mb-1">Target Healthcare Track:</span>
            <select
              value={currentTrack}
              onChange={(e) => {
                setCurrentTrack(e.target.value as HealthcareTrack);
                setMobileMenuOpen(false);
              }}
              className="w-full rounded bg-white p-2 text-xs font-semibold text-blue-700 border border-slate-200"
            >
              {HEALTHCARE_TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleSelectNav(link.id)}
                  className={`flex items-center gap-2 rounded-lg p-2.5 text-left text-xs transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onOpenOnboarding();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            <span>Customize Track Blueprint</span>
          </button>
        </div>
      )}
    </header>
  );
};
