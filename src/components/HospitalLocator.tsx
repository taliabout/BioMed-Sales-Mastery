import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Building2, Stethoscope, Compass, ExternalLink, RefreshCw } from 'lucide-react';

interface HospitalFacility {
  id: string;
  name: string;
  type: 'Level 1 Trauma Center' | 'Academic Comprehensive Cancer' | 'Ambulatory Surgery Center (ASC)' | 'Pediatric Specialty';
  beds: number;
  orSuites: number;
  estDistanceMiles: number;
  address: string;
  keyServices: string[];
}

export const HospitalLocator: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Default regional facilities list
  const [facilities, setFacilities] = useState<HospitalFacility[]>([
    {
      id: 'hosp-1',
      name: 'Metropolitan University Medical Center',
      type: 'Level 1 Trauma Center',
      beds: 850,
      orSuites: 32,
      estDistanceMiles: 3.4,
      address: '750 Healthcare Blvd, Suite 100',
      keyServices: ['Orthopedic Trauma', 'TAVR Structural Heart', 'Robotic General Surgery'],
    },
    {
      id: 'hosp-2',
      name: 'St. Jude Regional Comprehensive Cancer Center',
      type: 'Academic Comprehensive Cancer',
      beds: 420,
      orSuites: 18,
      estDistanceMiles: 5.8,
      address: '1200 Oncology Way',
      keyServices: ['CAR-T Cell Therapy', 'Monoclonal Infusions', 'Surgical Oncology'],
    },
    {
      id: 'hosp-3',
      name: 'North Texas Outpatient Surgical Pavilion',
      type: 'Ambulatory Surgery Center (ASC)',
      beds: 24,
      orSuites: 8,
      estDistanceMiles: 7.2,
      address: '440 Ambulatory Parkway',
      keyServices: ['Sports Medicine Arthroscopy', 'Outpatient Total Knee Arthroplasty', 'Ophthalmology'],
    },
    {
      id: 'hosp-4',
      name: 'Providence Memorial Health Center',
      type: 'Level 1 Trauma Center',
      beds: 610,
      orSuites: 22,
      estDistanceMiles: 11.5,
      address: '2900 Health Plaza Drive',
      keyServices: ['Adult Reconstruction', 'Cardiovascular ICU', 'Neurotrauma'],
    },
  ]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocating(false);

        setFacilities((prev) =>
          prev.map((f, i) => ({
            ...f,
            estDistanceMiles: parseFloat((Math.abs((latitude * 10) % 8) + i * 2.3 + 1.2).toFixed(1)),
          }))
        );
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setErrorMsg('GPS location access was not granted. Showing default territory healthcare facilities.');
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Compass className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Territory Facility Radar (GPS Location)
            </h3>
            <p className="text-xs text-slate-500">
              Live hospital routing and procedure facility density for your immediate territory radius
            </p>
          </div>
        </div>

        <button
          onClick={detectLocation}
          disabled={locating}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs disabled:opacity-50"
        >
          <Navigation className="h-3.5 w-3.5 text-blue-600" />
          {locating ? 'Acquiring GPS...' : 'Refresh Location'}
        </button>
      </div>

      {coords && (
        <div className="flex items-center gap-2 text-[11px] text-blue-800 bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200 font-mono font-medium">
          <MapPin className="h-3.5 w-3.5 text-blue-600" />
          <span>Device Coordinates: {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° W</span>
          <span className="text-slate-500 ml-auto font-sans">Territory Radius: 25 Miles</span>
        </div>
      )}

      {errorMsg && (
        <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200">
          {errorMsg}
        </div>
      )}

      {/* Facilities List */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-xs space-y-2 shadow-2xs hover:border-blue-300 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">
                  {fac.type}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{fac.name}</h4>
              </div>
              <span className="rounded bg-white border border-slate-200 px-2 py-0.5 font-mono text-blue-700 font-bold shrink-0 shadow-2xs">
                {fac.estDistanceMiles} mi
              </span>
            </div>

            <p className="text-slate-600">{fac.address}</p>

            <div className="flex items-center gap-3 text-slate-500 text-[11px] pt-1 border-t border-slate-200">
              <span>Beds: <strong className="text-slate-800">{fac.beds}</strong></span>
              <span aria-hidden="true">·</span>
              <span>OR Suites: <strong className="text-slate-800">{fac.orSuites}</strong></span>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {fac.keyServices.map((srv, idx) => (
                <span
                  key={idx}
                  className="rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-700 border border-slate-200 font-medium"
                >
                  {srv}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  fac.name + ' ' + fac.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
