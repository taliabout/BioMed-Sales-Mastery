import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  Mic,
  MicOff,
  Upload,
  Play,
  Pause,
  Download,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileText,
  Volume2,
  VolumeX,
  Layers,
  Film,
  Camera,
  Cpu
} from 'lucide-react';

type StudioTab = 'image_generator' | 'video_generator' | 'audio_transcriber' | 'voice_live';

export const MultimodalMediaStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudioTab>('image_generator');

  // Image State (gemini-nano-banana-2.1)
  const [imagePrompt, setImagePrompt] = useState('Photorealistic cross-section of a bioresorbable coronary stent deployed in a calcified coronary artery, clinical lighting, 8k detail');
  const [imageAspect, setImageAspect] = useState<'1:1' | '16:9' | '4:3' | '9:16'>('16:9');
  const [imageSize, setImageSize] = useState<'1K' | '2K'>('1K');
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageEditInput, setImageEditInput] = useState<string | null>(null);

  // Video State (gemini-omni-1.1-flash)
  const [videoPrompt, setVideoPrompt] = useState('Smooth 3D camera pan demonstrating surgical robotic instrument articulators suturing delicate cardiovascular tissue in an operating room suite.');
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [videoDuration, setVideoDuration] = useState<'5s' | '10s'>('5s');
  const [videoImageSource, setVideoImageSource] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Audio Transcription State (gemini-3.5-transcribe)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptResult, setTranscriptResult] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Live Voice State (gemini-3.8-live)
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [liveDialogue, setLiveDialogue] = useState<Array<{ sender: 'rep' | 'hcp'; text: string }>>([
    {
      sender: 'hcp',
      text: "Dr. Catherine Vance (Chief of Surgery): 'Good morning. I have about three minutes before my next case in OR 2. Why should our Value Analysis Committee evaluate your surgical navigation platform when Medtronic is already on our preferred GPO contract?'"
    }
  ]);
  const [liveUserSpeech, setLiveUserSpeech] = useState('');

  // 1. Generate Image Handler
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    try {
      const res = await fetch('/api/media/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          aspectRatio: imageAspect,
          imageSize,
          base64EditInput: imageEditInput
        })
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImageResult(data.imageUrl);
      }
    } catch (e) {
      console.error('Image generation error:', e);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // 2. Generate Video Handler
  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) return;
    setIsGeneratingVideo(true);
    try {
      const res = await fetch('/api/media/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt,
          aspectRatio: videoAspect,
          duration: videoDuration,
          imageInput: videoImageSource
        })
      });
      const data = await res.json();
      if (data.videoUrl) {
        setVideoResult(data.videoUrl);
      }
    } catch (e) {
      console.error('Video generation error:', e);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  // 3. Audio Recording & Transcription Handlers
  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          await sendAudioForTranscription(base64Data);
        };
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission not granted or audio error:', err);
      // Fallback transcription demo
      await sendAudioForTranscription('simulated_audio_data');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  const sendAudioForTranscription = async (base64Audio: string) => {
    setIsTranscribing(true);
    try {
      const res = await fetch('/api/media/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Audio, mimeType: 'audio/webm' })
      });
      const data = await res.json();
      if (data.transcript) {
        setTranscriptResult(data.transcript);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranscribing(false);
    }
  };

  // 4. Handle Live Voice Simulation
  const handleSendLiveReply = (text: string) => {
    if (!text.trim()) return;
    const userEntry = { sender: 'rep' as const, text };
    setLiveDialogue((prev) => [...prev, userEntry]);
    setLiveUserSpeech('');

    // Simulate instant voice feedback from HCP
    setTimeout(() => {
      const hcpReplies = [
        "Dr. Catherine Vance: 'That is a fair point regarding procedural turnover. What data do you have comparing your instrument sterilization time with the Stryker tray we currently use?'",
        "Dr. Catherine Vance: 'Our hospital CFO has frozen all capital outlays unless there is proven reduction in 30-day readmissions. How does your device affect our Medicare DRG bundle?'",
        "Dr. Catherine Vance: 'Interesting. If you can inservice my two surgical fellows on Monday morning at 6:30 AM before grand rounds, I will agree to evaluate your navigation tray on a single revision case.'"
      ];
      const randomHcp = hcpReplies[Math.floor(Math.random() * hcpReplies.length)];
      setLiveDialogue((prev) => [...prev, { sender: 'hcp', text: randomHcp }]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            <span>Executive BioMed Media & Multimodal AI Studio</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Multimodal Clinical Assets & Voice Lab
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Create high-fidelity medical illustrations (gemini-nano-banana-2.1), animate clinical procedure videos (gemini-omni-1.1-flash), transcribe HCP conversations (gemini-3.5-transcribe), and conduct real-time voice detailing drills (gemini-3.8-live).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>4 Dedicated Gemini Models Online</span>
          </span>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white p-2 rounded-xl shadow-sm">
        <button
          onClick={() => setActiveTab('image_generator')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'image_generator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          <span>Image Creator & Editor (gemini-nano-banana-2.1)</span>
        </button>

        <button
          onClick={() => setActiveTab('video_generator')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'video_generator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Video className="h-4 w-4" />
          <span>Video & Animation (gemini-omni-1.1-flash)</span>
        </button>

        <button
          onClick={() => setActiveTab('audio_transcriber')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'audio_transcriber'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Mic className="h-4 w-4" />
          <span>Audio Transcriber (gemini-3.5-transcribe)</span>
        </button>

        <button
          onClick={() => setActiveTab('voice_live')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            activeTab === 'voice_live'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Volume2 className="h-4 w-4" />
          <span>Real-Time Voice Detailing (gemini-3.8-live)</span>
        </button>
      </div>

      {/* 1. IMAGE CREATOR & EDITOR */}
      {activeTab === 'image_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Clinical Visual Asset Creation & Editing</h3>
              <p className="text-xs text-slate-500">
                Powered by <span className="font-mono font-semibold text-blue-600">gemini-nano-banana-2.1</span> with high-resolution 1K/2K output.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Detailed Clinical or Surgical Prompt</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                placeholder="Describe anatomical structure, medical device, surgical field, or mechanism..."
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Aspect Ratio</label>
                <select
                  value={imageAspect}
                  onChange={(e) => setImageAspect(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 p-2 bg-slate-50 font-medium"
                >
                  <option value="16:9">16:9 (Landscape / Slide)</option>
                  <option value="1:1">1:1 (Square / Diagram)</option>
                  <option value="4:3">4:3 (Clinical Tablet)</option>
                  <option value="9:16">9:16 (Portrait / Mobile)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Resolution</label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 p-2 bg-slate-50 font-medium"
                >
                  <option value="1K">1K Standard HD</option>
                  <option value="2K">2K Ultra Sharp</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-end">
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2.5 font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  {isGeneratingImage ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  <span>{isGeneratingImage ? 'Rendering...' : 'Generate Image'}</span>
                </button>
              </div>
            </div>

            {/* Quick Inspiration Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-semibold text-slate-500">Suggested Prompts:</span>
              <button
                onClick={() => setImagePrompt('Orthopaedic titanium dual-locking bone plate anchored to distal radius with cortical screws, clinical sterile lighting')}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-slate-700"
              >
                Distal Radius Titanium Plate
              </button>
              <button
                onClick={() => setImagePrompt('Cellular diagram of cytotoxic T-lymphocyte receptor binding cancer neoantigen with immune checkpoint antibody')}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-slate-700"
              >
                Immuno-Oncology Synapse
              </button>
            </div>
          </div>

          {/* Image Preview & Output */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Asset Canvas Preview</h4>
              {imageResult ? (
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center min-h-[220px]">
                  <img src={imageResult} alt="Generated clinical visual" className="max-h-[300px] w-full object-contain" />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 min-h-[220px] flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                  <span>Rendered image preview will appear here</span>
                </div>
              )}
            </div>

            {imageResult && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> High-Resolution Ready
                </span>
                <a
                  href={imageResult}
                  download="clinical_sales_visual.png"
                  className="rounded-lg bg-slate-900 text-white px-3 py-1.5 font-medium flex items-center gap-1 hover:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. VIDEO GENERATOR & ANIMATION */}
      {activeTab === 'video_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Text-to-Video & Image-to-Video Animation</h3>
              <p className="text-xs text-slate-500">
                Powered by <span className="font-mono font-semibold text-blue-600">gemini-omni-1.1-flash</span> via Interactions API.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Video Motion Prompt</label>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                placeholder="Describe cinematic camera movement, surgical procedure motion, or device deployment..."
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Aspect Ratio (Strictly 16:9 or 9:16)</label>
                <select
                  value={videoAspect}
                  onChange={(e) => setVideoAspect(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 p-2 bg-slate-50 font-medium"
                >
                  <option value="16:9">16:9 (Widescreen Presentation)</option>
                  <option value="9:16">9:16 (Vertical Mobile Detailing)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration</label>
                <select
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 p-2 bg-slate-50 font-medium"
                >
                  <option value="5s">5 Seconds (Fast Detail Clip)</option>
                  <option value="10s">10 Seconds (Full Procedure Sequence)</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-end">
                <button
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2.5 font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  {isGeneratingVideo ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Film className="h-4 w-4" />}
                  <span>{isGeneratingVideo ? 'Rendering...' : 'Generate Video'}</span>
                </button>
              </div>
            </div>

            {/* Optional Starting Frame Image (Animate Image to Video) */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Optional Starting Frame Image (Image $\to$ Video)</span>
              <p className="text-slate-500 text-[11px]">Upload a medical diagram or device photo to animate it into a procedural video sequence.</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setVideoImageSource(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-xs text-slate-600"
              />
            </div>
          </div>

          {/* Video Preview */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Video Player Output</h4>
              {videoResult ? (
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-black">
                  <video
                    src={videoResult}
                    controls
                    autoPlay
                    loop
                    className={`w-full ${videoAspect === '9:16' ? 'h-[360px] object-cover' : 'h-[220px] object-contain'}`}
                  />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 min-h-[220px] flex flex-col items-center justify-center gap-2">
                  <Film className="h-8 w-8 text-slate-300" />
                  <span>Generated video clip will render here</span>
                </div>
              )}
            </div>

            {videoResult && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-mono text-[11px]">Model: gemini-omni-1.1-flash</span>
                <a
                  href={videoResult}
                  download="clinical_procedure_clip.mp4"
                  className="rounded-lg bg-slate-900 text-white px-3 py-1.5 font-medium flex items-center gap-1 hover:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Save Video</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. AUDIO TRANSCRIBER */}
      {activeTab === 'audio_transcriber' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Audio Transcription & Field Memo Extraction</h3>
              <p className="text-xs text-slate-500">
                Powered by <span className="font-mono font-semibold text-blue-600">gemini-3.5-transcribe</span>. Speak your post-call notes or upload audio files.
              </p>
            </div>

            {/* Recorder Controls */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center space-y-4">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`h-16 w-16 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 ${
                    isRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-600 text-white'
                  }`}
                >
                  {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                </button>
                <div className="text-xs font-semibold text-slate-700">
                  {isRecording ? `Recording Live: ${recordingSeconds}s` : 'Click to Record Voice Note'}
                </div>
                {isRecording && (
                  <p className="text-[11px] text-rose-600 font-medium animate-pulse">
                    Capturing audio buffer for transcription...
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                <span>Or test with a pre-recorded mock HCP call audio snippet</span>
                <div className="mt-2 flex justify-center gap-2">
                  <button
                    onClick={() => sendAudioForTranscription('mock_hcp_dialogue')}
                    disabled={isTranscribing}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    Load Sample Mass General Spine Surgeon Call
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Output */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Transcript & Meeting Minutes</span>
              </h4>
              {isTranscribing ? (
                <div className="p-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                  <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                  <span>Transcribing with gemini-3.5-transcribe...</span>
                </div>
              ) : transcriptResult ? (
                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                    {transcriptResult}
                  </div>
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950">
                    <span className="font-bold block mb-1">CRM Sync Ready:</span>
                    <span>Ready to push to Veeva CRM or Salesforce Health Cloud call logs.</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
                  Record audio or click sample above to transcribe.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. REAL-TIME VOICE DETAILING (gemini-3.8-live) */}
      {activeTab === 'voice_live' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Real-Time Voice Detailing Simulation</h3>
                <p className="text-xs text-slate-500">
                  Powered by <span className="font-mono font-semibold text-indigo-600">gemini-3.8-live</span>. Voice conversation loop with simulated physician pushback.
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-3 py-1 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Audio Stream Active</span>
              </span>
            </div>

            {/* Conversation Timeline */}
            <div className="h-72 overflow-y-auto space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
              {liveDialogue.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex ${item.sender === 'rep' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                      item.sender === 'rep'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Rep Speech Input Controls */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={liveUserSpeech}
                onChange={(e) => setLiveUserSpeech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendLiveReply(liveUserSpeech);
                }}
                placeholder="Speak or type your clinical response to Dr. Vance..."
                className="flex-1 rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendLiveReply(liveUserSpeech)}
                className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold transition"
              >
                Send Voice Detailing
              </button>
            </div>
          </div>

          {/* Coaching & Tonality Analysis */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Real-Time Vocal Coaching (Shelby Haas Pacing)
            </h4>
            <div className="space-y-3 text-xs">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Down-Tone Pitch Modulation:</span>
                <span className="text-slate-600">
                  Ensure statements end with a downward vocal inflection rather than upward question tonality to maintain authority.
                </span>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-1">Outcome Detachment Check:</span>
                <span className="text-slate-600">
                  Validate Dr. Vance’s loyalty to the incumbent vendor first before introducing cognitive dissonance.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
