import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

interface VoiceSpeechInputProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
}

export const VoiceSpeechInput: React.FC<VoiceSpeechInputProps> = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      setErrorMessage(null);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        setErrorMessage(`Microphone error: ${event.error}`);
      }
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };
  }, [onTranscript]);

  const toggleListen = () => {
    if (!supported) {
      setErrorMessage('Speech recognition is not supported on this browser. Try Chrome/Edge or type manually.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err: any) {
        console.warn(err);
        setErrorMessage('Could not activate microphone. Check browser permissions.');
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListen}
        title={listening ? 'Stop recording voice' : 'Tap to speak your pitch out loud'}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition ${
          listening
            ? 'bg-rose-500 text-white animate-pulse shadow-md ring-2 ring-rose-400'
            : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {listening ? (
          <>
            <MicOff className="h-4 w-4" />
            <span className="hidden sm:inline">Listening...</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">Voice Pitch</span>
          </>
        )}
      </button>

      {listening && (
        <div className="ml-2 hidden md:flex items-center gap-1 text-[11px] text-emerald-400">
          <span className="h-2 w-1 bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-3.5 w-1 bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-1 bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="ml-1 font-mono">Speak clearly</span>
        </div>
      )}

      {errorMessage && (
        <div className="absolute bottom-full mb-1 left-0 z-20 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] text-amber-300 border border-slate-700 shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
