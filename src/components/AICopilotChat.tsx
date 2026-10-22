import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Globe,
  MapPin,
  Cpu,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { HealthcareTrack } from '../types';
import { dbStore } from '../services/dbStore';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  framework?: string;
  tacticalAction?: string;
  modelUsed?: string;
  groundingUsed?: string;
  timestamp: string;
}

interface AICopilotChatProps {
  currentTrack: HealthcareTrack;
}

export const AICopilotChat: React.FC<AICopilotChatProps> = ({ currentTrack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-4-argon' | 'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-4-argon');
  const [groundingMode, setGroundingMode] = useState<'search' | 'maps' | 'none'>('search');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<CopilotMessage[]>(() => {
    return dbStore.get<CopilotMessage[]>('copilot_chat_history', [
      {
        role: 'assistant',
        content:
          'Welcome. I am your Apex Healthcare Commercial Copilot. Powered by Gemini 4 Argon, Gemini 3.8 Flash, and Gemini 3.1 Flash Lite with real-time Google Search and Maps Grounding. Ask any question regarding hospital buying committees, objection reversals, clinical monographs, or reimbursement codes.',
        citations: [
          '42 U.S.C. § 1320a-7b (Anti-Kickback Statute)',
          '42 CFR § 403.900 (Physician Payments Sunshine Act)',
          'AdvaMed Code of Ethics on HCP Interactions',
        ],
        framework: 'Regulatory & Commercial Governance Standard',
        tacticalAction: 'Select your preferred Gemini reasoning tier and grounding source above.',
        modelUsed: 'gemini-4-argon',
        groundingUsed: 'search',
        timestamp: 'Just now',
      },
    ]);
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dbStore.set('copilot_chat_history', messages);
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot/advanced-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          model: selectedModel,
          grounding: groundingMode,
          track: currentTrack,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('Copilot endpoint error');
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          citations: data.statutoryCitations,
          framework: 'Multi-Tier Commercial Standard',
          tacticalAction: 'Verify hospital VAC dates and prepare comparative clinical monograph.',
          modelUsed: data.modelUsed || selectedModel,
          groundingUsed: data.groundingUsed || groundingMode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Under hospital prospective payment systems (DRGs), supply acquisition costs are scrutinized by the Value Analysis Committee (VAC). Always prepare a comparative clinical monograph and a cost-of-care financial model demonstrating reduction in complications or length of stay.',
          citations: ['42 U.S.C. § 1320a-7b (Anti-Kickback Statute)', 'AdvaMed Code of Ethics Section 3'],
          framework: 'MEDDPICC: Economic Buyer & Decision Criteria',
          tacticalAction: 'Verify incumbent GPO tier status with materials management.',
          modelUsed: `${selectedModel} (Deterministic Backup)`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const exportChatHistory = () => {
    const text = messages.map(m => `[${m.timestamp}] ${m.role.toUpperCase()} (${m.modelUsed || 'Copilot'}):\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_copilot_chat_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-xl transition hover:bg-blue-700 hover:scale-105"
        >
          <Sparkles className="h-4 w-4" />
          <span>Ask Fact-Checked Sales AI</span>
        </button>
      ) : (
        <div
          className={`flex flex-col rounded-xl border border-slate-200 bg-white shadow-2xl transition-all ${
            isMinimized ? 'h-14 w-80' : 'h-[620px] w-full sm:w-[480px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-900 bg-blue-900 px-4 py-3 rounded-t-xl text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-800 text-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div>
                <h3 className="text-xs font-bold leading-tight">Apex Healthcare Commercial Copilot</h3>
                <span className="text-[10px] text-blue-200">Multi-Model Tiering · Search & Maps Grounded</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-blue-300">
              <button
                onClick={exportChatHistory}
                title="Download conversation backup"
                className="hover:text-white p-1"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-white p-1"
              >
                {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white p-1"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Controls Toolbar: Model Selection & Grounding Mode */}
              <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                {/* Model Tier Selector */}
                <div className="flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-slate-500" />
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value as any)}
                    className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="gemini-4-argon">Gemini 4 Argon (C-Suite & Strategy)</option>
                    <option value="gemini-3.8-flash">Gemini 3.8 Flash (General Detailer)</option>
                    <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (Fast Q&A)</option>
                  </select>
                </div>

                {/* Grounding Source Selector */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setGroundingMode(groundingMode === 'search' ? 'none' : 'search')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
                      groundingMode === 'search'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                    title="Google Search Grounding"
                  >
                    <Globe className="h-3 w-3" />
                    <span>Search</span>
                  </button>

                  <button
                    onClick={() => setGroundingMode(groundingMode === 'maps' ? 'none' : 'maps')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
                      groundingMode === 'maps'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                    title="Google Maps Facility Grounding"
                  >
                    <MapPin className="h-3 w-3" />
                    <span>Maps</span>
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50/40">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl p-3 leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {/* Assistant Details */}
                      {msg.role === 'assistant' && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5 text-[10px]">
                          {msg.modelUsed && (
                            <div className="flex items-center gap-1 text-slate-400 font-mono">
                              <Cpu className="h-3 w-3" />
                              <span>Model: {msg.modelUsed}</span>
                              {msg.groundingUsed && msg.groundingUsed !== 'none' && (
                                <span className="text-blue-600 font-semibold uppercase">
                                  · Grounding: {msg.groundingUsed}
                                </span>
                              )}
                            </div>
                          )}

                          {msg.citations && msg.citations.length > 0 && (
                            <div className="text-slate-500">
                              <span className="font-semibold text-slate-700 block">Regulatory & Statutory Citations:</span>
                              <ul className="list-disc list-inside">
                                {msg.citations.map((c, i) => (
                                  <li key={i}>{c}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 w-fit">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-spin" />
                    <span>Consulting {selectedModel} with {groundingMode} grounding...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="border-t border-slate-200 p-3 bg-white rounded-b-xl space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder={`Ask ${selectedModel}...`}
                    className="flex-1 rounded-lg border border-slate-300 p-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2 text-xs font-bold transition disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
