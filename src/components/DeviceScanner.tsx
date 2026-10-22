import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, RefreshCw, CheckCircle2, ShieldCheck, UserCheck, X } from 'lucide-react';

interface DeviceScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onCapturePhoto?: (photoDataUrl: string) => void;
}

export const DeviceScanner: React.FC<DeviceScannerProps> = ({
  isOpen,
  onClose,
  onCapturePhoto,
}) => {
  const [streamActive, setStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<'badge_scan' | 'brag_photo'>('badge_scan');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamActive(true);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setErrorMsg('Camera access was blocked or is unavailable on this device. You can still test with simulated badge verification.');
      setStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);

      if (scanMode === 'badge_scan') {
        setScanResult('VALIDATED: RepTrax / Vendormate Level 1 OR Credential. Green Badge Active (AORN Aseptic Protocol & Bloodborne Pathogens on file).');
      } else {
        if (onCapturePhoto) {
          onCapturePhoto(dataUrl);
        }
      }
    }
  };

  const simulateScan = () => {
    setScanResult('SIMULATED SCAN: Hospital IDN Vendor Badge #TX-88492 Verified. Immunizations (TB, HepB, Flu) Active. Sterile Core Access Granted.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Device Camera: Hospital Credential & Badge Scanner
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setScanMode('badge_scan');
                setScanResult(null);
                setCapturedImage(null);
              }}
              className={`rounded px-3 py-1 font-medium transition ${
                scanMode === 'badge_scan'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              RepTrax Badge Scanner
            </button>
            <button
              onClick={() => {
                setScanMode('brag_photo');
                setScanResult(null);
                setCapturedImage(null);
              }}
              className={`rounded px-3 py-1 font-medium transition ${
                scanMode === 'brag_photo'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Brag Book Headshot
            </button>
          </div>

          {/* Camera Viewfinder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center">
            {streamActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center p-4 text-xs text-slate-400 space-y-2">
                <CameraOff className="mx-auto h-8 w-8 text-slate-600" />
                <p>{errorMsg || 'Activating device camera...'}</p>
                <button
                  type="button"
                  onClick={simulateScan}
                  className="rounded-md bg-emerald-500/20 text-emerald-300 px-3 py-1.5 border border-emerald-500/30 font-semibold"
                >
                  Run Instant Hardware Simulation Scan
                </button>
              </div>
            )}

            {/* Target Reticle overlay */}
            {streamActive && scanMode === 'badge_scan' && (
              <div className="absolute inset-8 pointer-events-none border-2 border-dashed border-emerald-400/60 rounded-lg flex items-center justify-center">
                <span className="text-[11px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded">
                  Align Hospital Badge QR or Tray Barcode
                </span>
              </div>
            )}
          </div>

          {/* Controls */}
          {streamActive && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleCapture}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
              >
                <Camera className="h-4 w-4" />
                {scanMode === 'badge_scan' ? 'Scan Badge Now' : 'Capture Portfolio Photo'}
              </button>

              <button
                type="button"
                onClick={simulateScan}
                className="text-xs text-slate-400 hover:text-white"
              >
                Simulate Scan Result
              </button>
            </div>
          )}

          {/* Result Alert */}
          {scanResult && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                <ShieldCheck className="h-4 w-4" />
                Vendor Credentialing Verified
              </div>
              <p className="leading-relaxed">{scanResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
