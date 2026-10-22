import React, { useState } from 'react';
import { RoleplayScenario, HealthcareTrack } from '../types';
import { ROLEPLAY_SCENARIOS } from '../data/simulationsData';
import {
  Send,
  AlertTriangle,
  Award,
  Sparkles,
  RefreshCw,
  User,
  ShieldAlert,
  Lightbulb,
  Building2,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { VoiceSpeechInput } from './VoiceSpeechInput';

interface RoleplaySimulatorProps {
  currentTrack: HealthcareTrack;
}

interface Message {
  sender: 'user' | 'hcp' | 'system';
  text: string;
  timestamp: string;
}

interface Evaluation {
  meddpiccScore: number;
  clinicalCredibilityScore: number;
  complianceAlert: string | null;
  executiveFeedback: string;
  recommendedPivot: string;
}

export const RoleplaySimulator: React.FC<RoleplaySimulatorProps> = ({ currentTrack }) => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(
    ROLEPLAY_SCENARIOS.find((s) => s.track === currentTrack) || ROLEPLAY_SCENARIOS[0]
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'hcp',
      text: selectedScenario.initialMessage,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastEval, setLastEval] = useState<Evaluation | null>({
    meddpiccScore: 78,
    clinicalCredibilityScore: 82,
    complianceAlert: null,
    executiveFeedback: 'Good initial engagement. Always validate the clinician\'s current routine before introducing cognitive dissonance regarding procedural friction.',
    recommendedPivot: 'Acknowledge their allegiance, then ask a high-context problem question about complex edge-case revisions.',
  });

  const handleScenarioChange = (scenario: RoleplayScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        sender: 'hcp',
        text: scenario.initialMessage,
        timestamp: 'Just now',
      },
    ]);
    setLastEval(null);
    setInputMessage('');
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          scenarioTitle: selectedScenario.title,
          personaName: selectedScenario.personaName,
          personaRole: selectedScenario.personaRole,
          personaDemeanor: selectedScenario.demeanor,
          personaHospital: selectedScenario.personaHospital,
          clinicalContext: selectedScenario.clinicalContext,
          objectionTrigger: selectedScenario.objectionTrigger,
          userMessage: textToSend,
          history: newHistory.map((m) => ({
            sender: m.sender === 'user' ? 'Sales Rep' : selectedScenario.personaName,
            text: m.text,
          })),
          targetTrack: currentTrack,
        }),
      });

      if (!response.ok) {
        throw new Error('Simulation endpoint error');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'hcp',
          text: data.hcpReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      if (data.coachEvaluation) {
        setLastEval(data.coachEvaluation);
      }
    } catch (err) {
      console.error(err);
      // Client-side fallback if server had an issue
      setMessages((prev) => [
        ...prev,
        {
          sender: 'hcp',
          text: `"We have seen multiple companies propose similar technologies. Before our Value Analysis Committee will even schedule an in-service, I need to see your head-to-head complication rate and GPO crosswalk."`,
          timestamp: 'Just now',
        },
      ]);
      setLastEval({
        meddpiccScore: 74,
        clinicalCredibilityScore: 80,
        complianceAlert: null,
        executiveFeedback: 'Solid push, but tighten your economic justification. State the exact cost-of-care delta to de-risk the committee decision.',
        recommendedPivot: 'Ask: "If we provide a zero-cost clinical evaluation consignment tray for your next two scheduled cases, would that give your team the data needed for the committee?"',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetRoleplay = () => {
    setMessages([
      {
        sender: 'hcp',
        text: selectedScenario.initialMessage,
        timestamp: 'Just now',
      },
    ]);
    setLastEval(null);
    setInputMessage('');
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Sidebar: Scenario Selector */}
      <div className="space-y-4 lg:col-span-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Stakeholder Scenario
            </h3>
            <span className="text-xs text-blue-600 font-mono font-bold">
              {ROLEPLAY_SCENARIOS.length} Field Scenarios
            </span>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {ROLEPLAY_SCENARIOS.map((scen) => {
              const isSelected = scen.id === selectedScenario.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => handleScenarioChange(scen)}
                  className={`flex w-full flex-col rounded-lg border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 text-slate-900 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 font-mono">
                      {scen.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">{scen.track.replace('_', ' ')}</span>
                  </div>
                  <h4 className="mt-1 font-bold text-slate-900 text-sm">{scen.personaName}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{scen.personaRole}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stakeholder Dossier */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Building2 className="h-4 w-4 text-blue-600" />
            Institutional Context Dossier
          </h4>
          <div className="mt-3 space-y-2.5 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 font-semibold">Facility:</span>{' '}
              <span className="font-bold text-slate-900">{selectedScenario.personaHospital}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Demeanor:</span>{' '}
              <span className="text-slate-700">{selectedScenario.demeanor}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Clinical Focus:</span>{' '}
              <p className="mt-0.5 text-slate-700">{selectedScenario.clinicalContext}</p>
            </div>
            <div className="border-t border-slate-100 pt-2">
              <span className="text-slate-500 font-bold">Core Win Criteria:</span>
              <ul className="mt-1 space-y-1">
                {selectedScenario.keyWinCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Roleplay Terminal & Live Coach */}
      <div className="flex flex-col space-y-4 lg:col-span-8">
        {/* Chat Card */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{selectedScenario.personaName}</h3>
                  <span className="text-xs text-slate-500">· {selectedScenario.personaRole}</span>
                </div>
                <p className="text-xs text-blue-700 font-medium">{selectedScenario.personaHospital}</p>
              </div>
            </div>

            <button
              onClick={resetRoleplay}
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              Reset Scenario
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5 max-h-[380px] bg-slate-50/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-600">
                    {msg.sender === 'user' ? 'You (Sales Rep)' : selectedScenario.personaName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-800 shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                <span>{selectedScenario.personaName} is evaluating clinical response...</span>
              </div>
            )}
          </div>

          {/* Quick Detailing Rebuttals */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2">
              Quick Power Openers:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {[
                `"Dr. Marcus, having 12 years of reliable outcomes is why your patients trust you. Where our dual-mobility offset solves a gap is specifically in high-risk coxa vara revisions."`,
                `"Brenda, we respect Memorial Health\'s GPO tier commitment. We engineered our construct pricing to be cost-neutral to your existing tier while reducing sterilization tray weight by 35%."`,
                `"If our clinical team provides a 72-hour prior authorization pre-certification guarantee with zero nursing paperwork, would that satisfy your clinic\'s financial criteria?"`,
              ].map((phrase, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInputMessage(phrase)}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700 hover:border-blue-300 hover:text-blue-700 truncate max-w-[280px] shadow-2xs"
                  title={phrase}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box with Microphone Voice Speech Integration */}
          <div className="border-t border-slate-100 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type or speak your clinical response or MEDDPICC probe..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
              <VoiceSpeechInput
                onTranscript={(text) => setInputMessage((prev) => (prev ? `${prev} ${text}` : text))}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
              >
                <span>Send</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Real-time VP Sales Coaching Evaluation Box */}
        {lastEval && (
          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  President's Club Executive Sales Coach Audit
                </h4>
              </div>

              {/* Scores */}
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500">MEDDPICC Rigor:</span>{' '}
                  <span className="font-mono font-bold text-blue-700">{lastEval.meddpiccScore}%</span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <div>
                  <span className="text-slate-500">Clinical Credibility:</span>{' '}
                  <span className="font-mono font-bold text-blue-700">{lastEval.clinicalCredibilityScore}%</span>
                </div>
              </div>
            </div>

            {/* Compliance Warning if triggered */}
            {lastEval.complianceAlert && (
              <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
                <div>
                  <span className="font-bold uppercase tracking-wider">Regulatory Compliance Violation Flag:</span>
                  <p className="mt-0.5">{lastEval.complianceAlert}</p>
                </div>
              </div>
            )}

            {/* Executive Feedback & Suggested Pivot */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <Award className="h-3.5 w-3.5 text-blue-600" />
                  Executive Commercial Feedback
                </div>
                <p className="text-slate-600 leading-relaxed">{lastEval.executiveFeedback}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                  Recommended Re-frame / Power Question
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{lastEval.recommendedPivot}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
