import React, { useState } from 'react';
import { Calendar, Bell, Mail, Download, CheckCircle2, Clock, Share2, Plus } from 'lucide-react';

interface CalendarEventData {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO or YYYYMMDDTHHmmssZ
  endDate: string;
}

export const CalendarNotifier: React.FC = () => {
  const [notificationStatus, setNotificationStatus] = useState<string>('default');
  const [alertSent, setAlertSent] = useState(false);

  // Pre-configured commercial events
  const events: CalendarEventData[] = [
    {
      title: 'OR Case Shadowing: Total Hip Arthroplasty (Dr. Vance Marcus)',
      description: 'Vendor credentialing check-in at 05:45 AM in sterile core. Consignment tray verification in central sterile processing.',
      location: 'St. Jude Level 1 Trauma Center, OR Suite 4',
      startDate: '20261105T060000Z',
      endDate: '20261105T093000Z',
    },
    {
      title: 'Value Analysis Committee (VAC) Docket Presentation (Brenda Holloway)',
      description: 'Review of dual-mobility construct pricing crosswalk, clinical non-inferiority monograph, and GPO Tier 2 alignment.',
      location: 'Midwest Regional Health Network, Boardroom B / Zoom',
      startDate: '20261112T130000Z',
      endDate: '20261112T140000Z',
    },
    {
      title: 'Oncology Clinic In-Service: Buy-and-Bill Prior Authorization Flow (Dr. Thorne)',
      description: 'Educational briefing for oncology practice manager and infusion nursing staff on 72-hour hub pre-authorization.',
      location: 'Crestview Comprehensive Cancer Specialists, Conference Suite 2',
      startDate: '20261118T120000Z',
      endDate: '20261118T130000Z',
    },
  ];

  const handleRequestNotification = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);

    if (permission === 'granted') {
      new Notification('Apex BioMed Academy: Active Case Reminder', {
        body: 'Upcoming OR case with Dr. Marcus scheduled in 45 minutes. Verify sterile instrument trays are autoclaved.',
        icon: '/favicon.ico',
      });
      setAlertSent(true);
      setTimeout(() => setAlertSent(false), 4000);
    }
  };

  const generateGoogleCalendarUrl = (ev: CalendarEventData) => {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
      text: ev.title,
      dates: `${ev.startDate}/${ev.endDate}`,
      details: ev.description,
      location: ev.location,
    });
    return `${base}&${params.toString()}`;
  };

  const downloadICS = (ev: CalendarEventData) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex BioMed Sales Academy//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${ev.title}
DESCRIPTION:${ev.description}
LOCATION:${ev.location}
DTSTART:${ev.startDate}
DTEND:${ev.endDate}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${ev.title.slice(0, 20)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateEmailDraft = (type: 'surgeon' | 'vac') => {
    if (type === 'surgeon') {
      const subject = encodeURIComponent('Follow-up: Clinical Registry Data for Complex Revision Arthroplasty');
      const body = encodeURIComponent(
        `Dear Dr. Marcus,\n\nThank you for the conversation this morning outside OR 4. As discussed, I am attaching the 2-year peer-reviewed multicenter registry study demonstrating a 31% reduction in aseptic loosening in patients with severe osteopenia.\n\nI would welcome the opportunity to support a single indicated evaluation case next month so your team can test the tactile feedback of our dual-mobility offset firsthand.\n\nBest regards,\n[Your Name]\nTerritory Manager`
      );
      window.open(`mailto:vance.marcus.md@stjudehealth.org?subject=${subject}&body=${body}`);
    } else {
      const subject = encodeURIComponent('Value Analysis Submission Packet: Dual-Mobility Orthopedic Construct');
      const body = encodeURIComponent(
        `Dear Ms. Holloway,\n\nFollowing our review of Memorial Health's Premier GPO contract requirements, please find attached the comprehensive VAC dossier for our dual-mobility hip system.\n\nThe packet contains:\n1. Level 1 peer-reviewed multicenter clinical studies\n2. Catalog cross-reference crosswalk matching incumbent part numbers\n3. Cost-neutrality price schedule matching your Tier 2 committed tier\n4. Signed surgeon champion attestations from Dr. Marcus\n\nWe look forward to presenting at the upcoming Value Analysis Committee meeting.\n\nSincerely,\n[Your Name]\nCommercial Account Specialist`
      );
      window.open(`mailto:bholloway@midwesthealth.org?subject=${subject}&body=${body}`);
    }
  };

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Calendar className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Calendar, Notifications & Stakeholder Email Engine
            </h3>
            <p className="text-xs text-slate-500">
              Sync surgical case schedules, trigger browser field notifications, and draft executive follow-ups
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRequestNotification}
            className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Bell className="h-3.5 w-3.5 text-amber-500" />
            <span>Enable Case Push Alerts</span>
          </button>
        </div>
      </div>

      {alertSent && (
        <div className="flex items-center gap-2 text-xs text-emerald-900 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Browser Notification Dispatched: "Active Case Reminder: OR 4 with Dr. Marcus"</span>
        </div>
      )}

      {/* Calendar Events Grid */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Upcoming Clinical Commercial Milestones
        </span>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-xs space-y-3 shadow-2xs hover:border-blue-300 transition"
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{ev.title}</h4>
                <p className="mt-1 text-slate-600 leading-relaxed line-clamp-3">{ev.description}</p>
                <div className="mt-2 text-[11px] text-slate-400 font-medium">{ev.location}</div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <a
                  href={generateGoogleCalendarUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded bg-blue-600 text-white py-1.5 font-semibold text-[11px] hover:bg-blue-700 shadow-2xs transition"
                >
                  Google Cal
                </a>
                <button
                  type="button"
                  onClick={() => downloadICS(ev)}
                  className="rounded border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 shadow-2xs"
                  title="Download .ics file for Outlook / Apple Calendar"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Follow-Up Launcher */}
      <div className="border-t border-slate-100 pt-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Executive Email Dispatch Presets
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => generateEmailDraft('surgeon')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 font-semibold shadow-2xs transition"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            <span>Draft Follow-Up to Chief of Surgery (Dr. Marcus)</span>
          </button>
          <button
            onClick={() => generateEmailDraft('vac')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 font-semibold shadow-2xs transition"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            <span>Draft VAC Submission Packet Cover Email (Brenda Holloway)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
