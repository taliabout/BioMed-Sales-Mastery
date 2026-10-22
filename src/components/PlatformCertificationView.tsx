import React, { useRef } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  Lock,
  Sparkles,
  ExternalLink,
  Layers,
  FileCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface PlatformCertificationViewProps {
  profile: UserProfile;
}

export const PlatformCertificationView: React.FC<PlatformCertificationViewProps> = ({ profile }) => {
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const verificationHash = 'APX-2026-BMSM-' + Math.abs(
    profile.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1042)
  ).toString(16).toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = `BIOMED SALES MASTERY PLATFORM CERTIFICATE OF COMPLETION
Verification Hash: ${verificationHash}
Candidate Name: ${profile.name}
Curriculum: Commercial Healthcare & Biotech Sales Readiness
Issued By: BioMed Sales Mastery Learning Platform
Date: ${new Date().toLocaleDateString()}

CURRICULUM SPECIFICATIONS:
- 12 Master Commercial Academies Completed
- Hospital Value Analysis Committee (VAC) Defense Simulated
- AdvaMed & PhRMA Federal Compliance Standards Passed (AKS, Stark, Sunshine Act)
- MEDDPICC, Challenger, and SPIN Account Qualification Practiced

PLATFORM ATTRIBUTION & DISCLAIMER:
This certificate is issued exclusively by the BioMed Sales Mastery learning platform as verification of simulation curriculum completion. It is not an accredited state medical license, hospital credentialing badge, or third-party corporate certification.`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biomed_platform_certificate_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Award className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Platform-Issued Certificate of Commercial Readiness
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified simulation certificate issued directly by the BioMed Sales Mastery platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Download Record</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Certificate Frame (Classic Blue & White High-Res) */}
      <div
        ref={certificateRef}
        className="rounded-2xl border-4 border-double border-blue-900 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden"
      >
        {/* Subtle Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <span className="text-9xl font-extrabold text-blue-900 uppercase tracking-widest">
            BIOMED
          </span>
        </div>

        <div className="relative z-10 text-center space-y-6">
          {/* Top Emblem */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white shadow-md">
              <Award className="h-8 w-8 text-blue-200" />
            </div>
            <span className="font-mono text-[11px] font-bold text-blue-900 tracking-widest uppercase">
              BioMed Sales Mastery Platform
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900 tracking-tight">
              Certificate of Commercial Readiness
            </h1>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              This verification is awarded to
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-950 border-b-2 border-blue-100 pb-2 inline-block px-8">
              {profile.name}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
            for successfully completing the comprehensive life-sciences commercial sales simulation curriculum, demonstrating rigorous fluency in <strong>Operating Room sterile protocols</strong>, <strong>Hospital Value Analysis Committee (VAC) dossiers</strong>, <strong>Anti-Kickback Statute compliance</strong>, and <strong>MEDDPICC deal architecture</strong>.
          </p>

          {/* Pillars Verified Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left max-w-2xl mx-auto text-xs">
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Mastery Track</span>
              <strong className="text-slate-900 text-[11px]">{profile.targetTrack.replace(/_/g, ' ')}</strong>
            </div>
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Compliance Gate</span>
              <strong className="text-emerald-700 text-[11px]">Passed (100% Rigor)</strong>
            </div>
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Methodologies</span>
              <strong className="text-slate-900 text-[11px]">MEDDPICC & SPIN</strong>
            </div>
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Simulation Hours</span>
              <strong className="text-indigo-700 text-[11px]">40+ Guided Lab Hrs</strong>
            </div>
          </div>

          {/* Footer Attestation & Explicit Platform Disclaimer */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end text-left text-xs">
            <div>
              <span className="font-mono text-[10px] text-slate-500 block">
                Verification Hash: <strong className="text-slate-800">{verificationHash}</strong>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Issue Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <div className="text-right sm:text-right">
              <span className="font-serif italic font-bold text-slate-900 text-sm block">
                BioMed Sales Mastery Academic Council
              </span>
              <span className="text-[10px] text-slate-500 block">
                Commercial Training & Clinical Evaluation Division
              </span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="pt-2 text-[10px] text-slate-400 text-center leading-snug border-t border-slate-100">
            <strong>Platform Notice:</strong> This certificate is issued exclusively by the BioMed Sales Mastery educational software platform to certify completion of interactive simulations. It is not an accredited third-party certification, state licensure, or official pharmaceutical/medical device manufacturer endorsement.
          </div>
        </div>
      </div>
    </div>
  );
};
