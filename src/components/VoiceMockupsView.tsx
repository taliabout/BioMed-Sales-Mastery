import React, { useState, useEffect, useRef } from 'react';
import { VOICE_MOCKUPS, VoiceMockup } from '../data/voiceMockupsData';
import { VoiceSpeechInput } from './VoiceSpeechInput';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Mic,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';

export const VoiceMockupsView: React.FC = () => {
  const [selectedMockup, setSelectedMockup] = useState<VoiceMockup>(VOICE_MOCKUPS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  const [userRecordedPitch, setUserRecordedPitch] = useState<string>('');
  const [userPracticeEvaluation, setUserPracticeEvaluation] = useState<{
    wordCount: number;
    estimatedWPM: number;
    hasDownToneKeywords: boolean;
    feedback: string;
  } | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech if switching mockups or unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedMockup.audioNarrationText);
    utterance.rate = playbackSpeed;
    utterance.pitch = voiceGender === 'female' ? 1.05 : 0.85;

    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find((v) =>
        voiceGender === 'female'
          ? v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('victoria') ||
            v.name.toLowerCase().includes('zira')
          : v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('alex') ||
            v.name.toLowerCase().includes('daniel')
      );
      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleUserTranscript = (text: string) => {
    setUserRecordedPitch(text);
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const estimatedWPM = Math.round((wordCount / 20) * 60); // assuming ~20s average speech
    const lower = text.toLowerCase();

    const hasDownToneKeywords =
      lower.includes('makes complete sense') ||
      lower.includes('would you be opposed') ||
      lower.includes('brief') ||
      lower.includes('standby') ||
      lower.includes('evaluate');

    let feedback = '';
    if (wordCount < 10) {
      feedback = 'Keep speaking your full detailing reframe to get an accurate rhythm and pacing analysis.';
    } else if (hasDownToneKeywords && wordCount >= 25) {
      feedback =
        'Excellent delivery! You integrated collaborative, low-pressure framing ("makes complete sense", "would you be opposed"). Your pacing aligns with executive peer parity.';
    } else {
      feedback =
        'Good start. Try introducing the 2-second micro-pause after your diagnostic question and finish with a calibrated down-tone ("would you be opposed to evaluating this yourself?").';
    }

    setUserPracticeEvaluation({
      wordCount,
      estimatedWPM,
      hasDownToneKeywords,
      feedback,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-blue-200 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            <Volume2 className="h-3.5 w-3.5 text-blue-300" />
            <span>Interactive Vocal Detailing & Audio Mockup Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Voice Mockups & Vocal Inflection Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Listen to realistic master audio detailing sessions delivered with <strong>Shelby Haas down-tone authority</strong>, <strong>Chris Voss tactical empathy</strong>, and <strong>C-suite hospital poise</strong>. Contrast directly with amateur pushy mistakes, then record your own voice to practice pitch rhythm.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mockup Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Voice Mockup Scenario ({VOICE_MOCKUPS.length})
          </div>
          {VOICE_MOCKUPS.map((mockup) => {
            const isSelected = selectedMockup.id === mockup.id;
            return (
              <button
                key={mockup.id}
                onClick={() => {
                  handleStopAudio();
                  setSelectedMockup(mockup);
                  setUserRecordedPitch('');
                  setUserPracticeEvaluation(null);
                }}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-400'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                    {mockup.category}
                  </span>
                  <Volume2
                    className={`h-4 w-4 ${
                      isSelected && isPlaying ? 'text-blue-600 animate-pulse' : 'text-slate-300'
                    }`}
                  />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">{mockup.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{mockup.stakeholder}</p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Audio Player & Master vs Amateur Studio */}
        <div className="lg:col-span-8 space-y-6">
          {/* Audio Player Control Bar */}
          <div className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-mono font-bold text-blue-800 uppercase">
                  {selectedMockup.category}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                  {selectedMockup.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Stakeholder: <strong>{selectedMockup.stakeholder}</strong>
                </p>
              </div>

              {/* Play / Stop Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={isPlaying ? handleStopAudio : handlePlayAudio}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition shadow-sm ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-700 animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause Audio Detailing</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Listen to Master Audio</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Audio Waveform Animation & Voice Controls */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 flex flex-wrap items-center justify-between gap-4">
              {/* Animated Waveform */}
              <div className="flex items-center gap-1.5">
                <div className="text-xs font-semibold text-slate-600 mr-2 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span>Vocal Frequency:</span>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => (
                  <span
                    key={bar}
                    className={`w-1 rounded-full bg-blue-600 transition-all duration-300 ${
                      isPlaying
                        ? 'animate-pulse'
                        : 'h-2 bg-slate-300'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.sin(bar * 0.8) * 14 + 18}px` : '6px',
                      animationDelay: `${bar * 80}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Voice Speed & Gender Selector */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Voice:</span>
                  <select
                    value={voiceGender}
                    onChange={(e) => {
                      setVoiceGender(e.target.value as 'female' | 'male');
                      if (isPlaying) handleStopAudio();
                    }}
                    className="rounded border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="female">Shelby Haas Style (Female Exec)</option>
                    <option value="male">Commercial VP (Male Exec)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Speed:</span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => {
                      setPlaybackSpeed(parseFloat(e.target.value));
                      if (isPlaying) handleStopAudio();
                    }}
                    className="rounded border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="0.9">0.9x (Deliberate)</option>
                    <option value="1.0">1.0x (Optimal 125 WPM)</option>
                    <option value="1.2">1.2x (Fast)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vocal Coaching Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1">
                <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">
                  Target Pacing
                </div>
                <div className="font-mono font-bold text-blue-700">
                  {selectedMockup.coachingBreakdown.pacingWordsPerMinute}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1">
                <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">
                  Strategic Micro-Pause
                </div>
                <div className="font-mono font-bold text-emerald-700">
                  {selectedMockup.coachingBreakdown.microPauseDuration}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1">
                <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">
                  Psychological Leverage
                </div>
                <div className="font-semibold text-slate-700 line-clamp-2">
                  {selectedMockup.coachingBreakdown.psychologicalImpact}
                </div>
              </div>
            </div>
          </div>

          {/* Master vs Amateur Side-by-Side Transcript Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Master Detailing Version */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {selectedMockup.masterVersion.speakerRole}
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Master Cadence
                </span>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-white p-3.5 font-mono text-xs text-slate-900 leading-relaxed shadow-2xs">
                {selectedMockup.masterVersion.transcript}
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[11px] font-bold text-emerald-900">Elite Vocal Tactics Used:</div>
                <ul className="text-xs text-emerald-950 space-y-1">
                  {selectedMockup.masterVersion.vocalSecrets.map((sec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-emerald-900 bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-200/50">
                <strong>Why It Wins:</strong> {selectedMockup.masterVersion.whyItWins}
              </div>
            </div>

            {/* Amateur Pushy Version */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  {selectedMockup.amateurVersion.speakerRole}
                </span>
                <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                  Avoid This
                </span>
              </div>

              <div className="rounded-lg border border-rose-200 bg-white p-3.5 font-mono text-xs text-rose-950 italic leading-relaxed">
                {selectedMockup.amateurVersion.transcript}
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-[11px] font-bold text-rose-900">Fatal Vocal Flaws:</div>
                <ul className="text-xs text-rose-950 space-y-1">
                  {selectedMockup.amateurVersion.vocalFlaws.map((flaw, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span>{flaw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-rose-900 bg-rose-100/70 p-2.5 rounded-lg border border-rose-200/50">
                <strong>The Fallout:</strong> {selectedMockup.amateurVersion.whatWentWrong}
              </div>
            </div>
          </div>

          {/* Practice Yourself: Microphone Voice Pitch Recorder */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Mic className="h-4 w-4 text-blue-600" />
                  Voice Detailing Practice Studio
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedMockup.speechRecognitionPrompt}
                </p>
              </div>

              {/* Voice Speech Input Component */}
              <VoiceSpeechInput onTranscript={handleUserTranscript} />
            </div>

            {/* User Transcript Display */}
            {userRecordedPitch ? (
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                    Your Transcribed Detailing Pitch:
                  </div>
                  <p className="text-xs font-mono text-slate-900 leading-relaxed">
                    "{userRecordedPitch}"
                  </p>
                </div>

                {userPracticeEvaluation && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <span className="text-slate-500 text-[10px] block">Words Spoken</span>
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        {userPracticeEvaluation.wordCount} words
                      </span>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <span className="text-slate-500 text-[10px] block">Estimated Cadence</span>
                      <span className="font-bold font-mono text-blue-700 text-sm">
                        ~{userPracticeEvaluation.estimatedWPM} WPM
                      </span>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <span className="text-slate-500 text-[10px] block">Collaborative Language</span>
                      <span
                        className={`font-bold font-mono text-sm ${
                          userPracticeEvaluation.hasDownToneKeywords
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {userPracticeEvaluation.hasDownToneKeywords ? 'Detected ✓' : 'Add Reframe Keys'}
                      </span>
                    </div>

                    <div className="col-span-1 sm:col-span-3 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 leading-relaxed">
                      <strong>AI Vocal Coach Feedback: </strong>
                      {userPracticeEvaluation.feedback}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                Click "Voice Pitch" above to record your live detailing rehearsal and receive real-time cadence and framing feedback.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
