/**
 * Newsletters Page
 * Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
 * Lists all Science Team Weekly Newsletters (2025-26) grouped by semester, downloadable as PDF
 */

import { Download, FileText, Calendar } from "lucide-react";

interface Newsletter {
  id: string;
  date: string;
  displayDate: string;
  url: string;
}

const BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

const newsletters: Newsletter[] = [
  // Fall 2025
  { id: "nl-8-29-25",  date: "2025-08-29", displayDate: "August 29, 2025",   url: `${BASE}/ScienceTeamWeeklyNewsletter_8.29.25_f7aed8a3.pdf` },
  { id: "nl-9-5-25",   date: "2025-09-05", displayDate: "September 5, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_9.5.25_07a2448e.pdf` },
  { id: "nl-9-12-25",  date: "2025-09-12", displayDate: "September 12, 2025",url: `${BASE}/ScienceTeamWeeklyNewsletter_9.12.25_e790d284.pdf` },
  { id: "nl-9-19-25",  date: "2025-09-19", displayDate: "September 19, 2025",url: `${BASE}/ScienceTeamWeeklyNewsletter_9.19.25_7a7cb852.pdf` },
  { id: "nl-9-26-25",  date: "2025-09-26", displayDate: "September 26, 2025",url: `${BASE}/ScienceTeamWeeklyNewsletter_9.26.25_a5d24d8d.pdf` },
  { id: "nl-10-3-25",  date: "2025-10-03", displayDate: "October 3, 2025",   url: `${BASE}/ScienceTeamWeeklyNewsletter_10.3.25_3b7e0122.pdf` },
  { id: "nl-10-10-25", date: "2025-10-10", displayDate: "October 10, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_10.10.25_7abbd28b.pdf` },
  { id: "nl-10-17-25", date: "2025-10-17", displayDate: "October 17, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_10.17.25_ed6e52ce.pdf` },
  { id: "nl-10-24-25", date: "2025-10-24", displayDate: "October 24, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_10.24.25_7298f08f.pdf` },
  { id: "nl-10-31-25", date: "2025-10-31", displayDate: "October 31, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_10.31.25_43f0b39f.pdf` },
  { id: "nl-11-7-25",  date: "2025-11-07", displayDate: "November 7, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_11.7.25_442ce8bc.pdf` },
  { id: "nl-11-14-25", date: "2025-11-14", displayDate: "November 14, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_11.14.25_55f68140.pdf` },
  { id: "nl-11-21-25", date: "2025-11-21", displayDate: "November 21, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_11.21.25_969ddbbe.pdf` },
  { id: "nl-11-26-25", date: "2025-11-26", displayDate: "November 26, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_11.26.25_fe67ea5e.pdf` },
  { id: "nl-12-5-25",  date: "2025-12-05", displayDate: "December 5, 2025",  url: `${BASE}/ScienceTeamWeeklyNewsletter_12.5.25_8cf4cbcf.pdf` },
  { id: "nl-12-12-25", date: "2025-12-12", displayDate: "December 12, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_12.12.25_18683e7b.pdf` },
  { id: "nl-12-19-25", date: "2025-12-19", displayDate: "December 19, 2025", url: `${BASE}/ScienceTeamWeeklyNewsletter_12.19.25_ae250bc0.pdf` },
  // Spring 2026
  { id: "nl-1-16-26",  date: "2026-01-16", displayDate: "January 16, 2026",  url: `${BASE}/ScienceTeamWeeklyNewsletter_1.16.26_fdc24432.pdf` },
  { id: "nl-1-23-26",  date: "2026-01-23", displayDate: "January 23, 2026",  url: `${BASE}/ScienceTeamWeeklyNewsletter_1.23.26_7f80efda.pdf` },
  { id: "nl-1-30-26",  date: "2026-01-30", displayDate: "January 30, 2026",  url: `${BASE}/ScienceTeamWeeklyNewsletter_1.30.26_01a2fb01.pdf` },
  { id: "nl-2-6-26",   date: "2026-02-06", displayDate: "February 6, 2026",  url: `${BASE}/ScienceTeamWeeklyNewsletter_2.6.26_29ae62de.pdf` },
  { id: "nl-3-6-26",   date: "2026-03-06", displayDate: "March 6, 2026",     url: `${BASE}/ScienceTeamWeeklyNewsletter_3.6.26_97eb92c6.pdf` },
  { id: "nl-3-13-26",  date: "2026-03-13", displayDate: "March 13, 2026",    url: `${BASE}/ScienceTeamWeeklyNewsletter_3.13.26_e61dd440.pdf` },
  { id: "nl-3-20-26",  date: "2026-03-20", displayDate: "March 20, 2026",     url: `${BASE}/ScienceTeamWeeklyNewsletter_3.20.26_e6b8739f.pdf` },
  { id: "nl-3-27-26",  date: "2026-03-27", displayDate: "March 27, 2026",     url: `${BASE}/ScienceTeamWeeklyNewsletter_3.27.26_b4c7440a.pdf` },
  { id: "nl-4-3-26",   date: "2026-04-03", displayDate: "April 3, 2026",      url: `${BASE}/ScienceTeamWeeklyNewsletter_4.3.26_21c07ebf.pdf` },
  { id: "nl-4-10-26",  date: "2026-04-10", displayDate: "April 10, 2026",     url: `${BASE}/ScienceTeamWeeklyNewsletter_4.10.26_2a1ccc9f.pdf` },
  { id: "nl-4-17-26",  date: "2026-04-17", displayDate: "April 17, 2026",     url: `${BASE}/ScienceTeamWeeklyNewsletter_4.17.26_b0dd871a.pdf` },
  { id: "nl-5-1-26",   date: "2026-05-01", displayDate: "May 1, 2026",        url: `${BASE}/ScienceTeamWeeklyNewsletter_5.1.26_7e5a6e7c.pdf` },
  { id: "nl-5-8-26",   date: "2026-05-08", displayDate: "May 8, 2026",        url: `${BASE}/ScienceTeamWeeklyNewsletter_5.8.26_86e0efad.pdf` },
  { id: "nl-5-15-26",  date: "2026-05-15", displayDate: "May 15, 2026",       url: `${BASE}/ScienceTeamWeeklyNewsletter_5.15.26_1fc69329.pdf` },
];

const fallNewsletters = newsletters.filter((n) => n.date < "2026-01-01");
const springNewsletters = newsletters.filter((n) => n.date >= "2026-01-01");

function NewsletterRow({ newsletter, index }: { newsletter: Newsletter; index: number }) {
  return (
    <a
      href={newsletter.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-5 py-3 transition-all group"
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9F9F9",
        borderBottom: "1px solid #EBEBEB",
        textDecoration: "none",
      }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#B30000" }}
      >
        <FileText size={15} color="#FFFFFF" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[13px] font-bold leading-tight"
          style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
        >
          Week of {newsletter.displayDate}
        </div>
        <div className="text-[11px] mt-0.5" style={{ color: "#888" }}>
          Science Team Weekly Newsletter · PDF
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider flex-shrink-0 transition-all"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
        }}
      >
        <Download size={11} />
        Download
      </div>
    </a>
  );
}

function SemesterSection({ title, items }: { title: string; items: Newsletter[] }) {
  return (
    <div className="mb-8">
      <div
        className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest border-b"
        style={{
          backgroundColor: "#1A1A1A",
          color: "rgba(255,255,255,0.7)",
          borderColor: "#333",
        }}
      >
        {title} · {items.length} issues
      </div>
      <div>
        {[...items].reverse().map((nl, i) => (
          <NewsletterRow key={nl.id} newsletter={nl} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Newsletters() {
  return (
    <div className="flex flex-col bg-white">
      {/* Page Header */}
      <div
        className="px-5 py-5 border-b flex-shrink-0"
        style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
      >
        <div className="flex items-center gap-3 mb-1">
          <Calendar size={18} style={{ color: "#B30000" }} />
          <h1
            className="text-[20px] font-black leading-tight"
            style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
          >
            Science Team Weekly Newsletters
          </h1>
        </div>
        <p className="text-[13px] ml-7" style={{ fontFamily: "'Merriweather', serif", color: "#666" }}>
          2025–26 School Year · {newsletters.length} issues · Click any issue to download as PDF
        </p>
      </div>

      {/* Newsletter List */}
      <div className="flex-1">
        <div className="max-w-2xl pt-4 px-4 md:px-6">
          <SemesterSection title="Spring 2026" items={springNewsletters} />
          <SemesterSection title="Fall 2025" items={fallNewsletters} />
        </div>
      </div>
    </div>
  );
}
