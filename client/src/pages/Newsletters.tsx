/**
 * Science Team Weekly Newsletters
 * Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
 * Separates the active 2026–27 newsletter record from the preserved 2025–26 archive.
 */

import { Download, FileText, Calendar } from "lucide-react";

export type NewsletterSchoolYear = "2026-27" | "2025-26";

interface Newsletter {
  id: string;
  date: string;
  displayDate: string;
  filename: string;
  url: string;
  available?: boolean;
}

const ARCHIVE_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

// GitHub Pages serves the current newsletter PDFs directly from the existing
// assets folder, while the managed dashboard uses permanent storage paths.
const newsletterDownloadAsset = (filename: string, storagePath: string) =>
  import.meta.env.BASE_URL === "/nbhs-science/" ? `assets/${filename}` : storagePath;

const currentYearNewsletters: Newsletter[] = [
  {
    id: "nl-9-25-26",
    date: "2026-09-25",
    displayDate: "September 25, 2026",
    filename: "ScienceTeamWeeklyNewsletter_9.25.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_9.25.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_9.25.26_40f05abe.pdf"),
  },
  {
    id: "nl-10-02-26",
    date: "2026-10-02",
    displayDate: "October 2, 2026",
    filename: "ScienceTeamWeeklyNewsletter_10.02.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_10.02.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_10.02.26_6343c55c.pdf"),
  },
  {
    id: "nl-10-09-26",
    date: "2026-10-09",
    displayDate: "October 9, 2026",
    filename: "ScienceTeamWeeklyNewsletter_10.09.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_10.09.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_10.09.26_d5124855.pdf"),
  },
  {
    id: "nl-10-16-26",
    date: "2026-10-16",
    displayDate: "October 16, 2026",
    filename: "ScienceTeamWeeklyNewsletter_10.16.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_10.16.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_10.16.26_e1780b08.pdf"),
  },
  {
    id: "nl-10-23-26",
    date: "2026-10-23",
    displayDate: "October 23, 2026",
    filename: "ScienceTeamWeeklyNewsletter_10.23.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_10.23.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_10.23.26_9c6473f1.pdf"),
  },
  {
    id: "nl-10-30-26",
    date: "2026-10-30",
    displayDate: "October 30, 2026",
    filename: "ScienceTeamWeeklyNewsletter_10.30.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_10.30.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_10.30.26_a7ea7324.pdf"),
  },
  {
    id: "nl-11-06-26",
    date: "2026-11-06",
    displayDate: "November 6, 2026",
    filename: "ScienceTeamWeeklyNewsletter_11.06.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_11.06.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_11.06.26_6feb54b7.pdf"),
  },
  {
    id: "nl-11-13-26",
    date: "2026-11-13",
    displayDate: "November 13, 2026",
    filename: "ScienceTeamWeeklyNewsletter_11.13.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_11.13.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_11.13.26_5b9e0d62.pdf"),
  },
  {
    id: "nl-11-20-26",
    date: "2026-11-20",
    displayDate: "November 20, 2026",
    filename: "ScienceTeamWeeklyNewsletter_11.20.26.pdf",
    url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_11.20.26.pdf", "/manus-storage/ScienceTeamWeeklyNewsletter_11.20.26_377a1b52.pdf"),
  },
];

const archiveNewsletters: Newsletter[] = [
  // Fall 2025
  { id: "nl-8-29-25",  date: "2025-08-29", displayDate: "August 29, 2025",    filename: "ScienceTeamWeeklyNewsletter_8.29.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_8.29.25_f7aed8a3.pdf` },
  { id: "nl-9-5-25",   date: "2025-09-05", displayDate: "September 5, 2025", filename: "ScienceTeamWeeklyNewsletter_9.5.25.pdf",   url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_9.5.25_07a2448e.pdf` },
  { id: "nl-9-12-25",  date: "2025-09-12", displayDate: "September 12, 2025",filename: "ScienceTeamWeeklyNewsletter_9.12.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_9.12.25_e790d284.pdf` },
  { id: "nl-9-19-25",  date: "2025-09-19", displayDate: "September 19, 2025",filename: "ScienceTeamWeeklyNewsletter_9.19.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_9.19.25_7a7cb852.pdf` },
  { id: "nl-9-26-25",  date: "2025-09-26", displayDate: "September 26, 2025",filename: "ScienceTeamWeeklyNewsletter_9.26.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_9.26.25_a5d24d8d.pdf` },
  { id: "nl-10-3-25",  date: "2025-10-03", displayDate: "October 3, 2025",   filename: "ScienceTeamWeeklyNewsletter_10.3.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_10.3.25_3b7e0122.pdf` },
  { id: "nl-10-10-25", date: "2025-10-10", displayDate: "October 10, 2025",  filename: "ScienceTeamWeeklyNewsletter_10.10.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_10.10.25_7abbd28b.pdf` },
  { id: "nl-10-17-25", date: "2025-10-17", displayDate: "October 17, 2025",  filename: "ScienceTeamWeeklyNewsletter_10.17.25.pdf", url: "", available: false },
  { id: "nl-10-24-25", date: "2025-10-24", displayDate: "October 24, 2025",  filename: "ScienceTeamWeeklyNewsletter_10.24.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_10.24.25_7298f08f.pdf` },
  { id: "nl-10-31-25", date: "2025-10-31", displayDate: "October 31, 2025",  filename: "ScienceTeamWeeklyNewsletter_10.31.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_10.31.25_43f0b39f.pdf` },
  { id: "nl-11-7-25",  date: "2025-11-07", displayDate: "November 7, 2025",  filename: "ScienceTeamWeeklyNewsletter_11.7.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_11.7.25_442ce8bc.pdf` },
  { id: "nl-11-14-25", date: "2025-11-14", displayDate: "November 14, 2025", filename: "ScienceTeamWeeklyNewsletter_11.14.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_11.14.25_55f68140.pdf` },
  { id: "nl-11-21-25", date: "2025-11-21", displayDate: "November 21, 2025", filename: "ScienceTeamWeeklyNewsletter_11.21.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_11.21.25_969ddbbe.pdf` },
  { id: "nl-11-26-25", date: "2025-11-26", displayDate: "November 26, 2025", filename: "ScienceTeamWeeklyNewsletter_11.26.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_11.26.25_fe67ea5e.pdf` },
  { id: "nl-12-5-25",  date: "2025-12-05", displayDate: "December 5, 2025",  filename: "ScienceTeamWeeklyNewsletter_12.5.25.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_12.5.25_8cf4cbcf.pdf` },
  { id: "nl-12-12-25", date: "2025-12-12", displayDate: "December 12, 2025", filename: "ScienceTeamWeeklyNewsletter_12.12.25.pdf", url: "", available: false },
  { id: "nl-12-19-25", date: "2025-12-19", displayDate: "December 19, 2025", filename: "ScienceTeamWeeklyNewsletter_12.19.25.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_12.19.25_ae250bc0.pdf` },
  // Spring 2026
  { id: "nl-1-16-26",  date: "2026-01-16", displayDate: "January 16, 2026",  filename: "ScienceTeamWeeklyNewsletter_1.16.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_1.16.26_fdc24432.pdf` },
  { id: "nl-1-23-26",  date: "2026-01-23", displayDate: "January 23, 2026",  filename: "ScienceTeamWeeklyNewsletter_1.23.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_1.23.26_7f80efda.pdf` },
  { id: "nl-1-30-26",  date: "2026-01-30", displayDate: "January 30, 2026",  filename: "ScienceTeamWeeklyNewsletter_1.30.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_1.30.26_01a2fb01.pdf` },
  { id: "nl-2-6-26",   date: "2026-02-06", displayDate: "February 6, 2026",   filename: "ScienceTeamWeeklyNewsletter_2.6.26.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_2.6.26_29ae62de.pdf` },
  { id: "nl-3-6-26",   date: "2026-03-06", displayDate: "March 6, 2026",      filename: "ScienceTeamWeeklyNewsletter_3.6.26.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_3.6.26_97eb92c6.pdf` },
  { id: "nl-3-13-26",  date: "2026-03-13", displayDate: "March 13, 2026",     filename: "ScienceTeamWeeklyNewsletter_3.13.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_3.13.26_e61dd440.pdf` },
  { id: "nl-3-20-26",  date: "2026-03-20", displayDate: "March 20, 2026",     filename: "ScienceTeamWeeklyNewsletter_3.20.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_3.20.26_e6b8739f.pdf` },
  { id: "nl-3-27-26",  date: "2026-03-27", displayDate: "March 27, 2026",     filename: "ScienceTeamWeeklyNewsletter_3.27.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_3.27.26_b4c7440a.pdf` },
  { id: "nl-4-3-26",   date: "2026-04-03", displayDate: "April 3, 2026",      filename: "ScienceTeamWeeklyNewsletter_4.3.26.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_4.3.26_21c07ebf.pdf` },
  { id: "nl-4-10-26",  date: "2026-04-10", displayDate: "April 10, 2026",     filename: "ScienceTeamWeeklyNewsletter_4.10.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_4.10.26_2a1ccc9f.pdf` },
  { id: "nl-4-17-26",  date: "2026-04-17", displayDate: "April 17, 2026",     filename: "ScienceTeamWeeklyNewsletter_4.17.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_4.17.26_b0dd871a.pdf` },
  { id: "nl-5-1-26",   date: "2026-05-01", displayDate: "May 1, 2026",        filename: "ScienceTeamWeeklyNewsletter_5.1.26.pdf",  url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_5.1.26_7e5a6e7c.pdf` },
  { id: "nl-5-8-26",   date: "2026-05-08", displayDate: "May 8, 2026",        filename: "ScienceTeamWeeklyNewsletter_5.8.26.pdf",  url: newsletterDownloadAsset("ScienceTeamWeeklyNewsletter_5.8.26.pdf", `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_5.8.26_86df57f7.pdf`) },
  { id: "nl-5-15-26",  date: "2026-05-15", displayDate: "May 15, 2026",       filename: "ScienceTeamWeeklyNewsletter_5.15.26.pdf", url: `${ARCHIVE_BASE}/ScienceTeamWeeklyNewsletter_5.15.26_1fc69329.pdf` },
];

function NewsletterRow({ newsletter, index }: { newsletter: Newsletter; index: number }) {
  const unavailable = newsletter.available === false;
  const content = <>
    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: unavailable ? "#8A8A8A" : "#B30000" }}>
      <FileText size={15} color="#FFFFFF" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-bold leading-tight" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>
        Week of {newsletter.displayDate}
      </div>
      <div className="text-[11px] mt-0.5" style={{ color: "#888" }}>{unavailable ? "Archived PDF currently unavailable" : "Science Team Weekly Newsletter · PDF"}</div>
    </div>
    <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider flex-shrink-0" style={{ backgroundColor: unavailable ? "#777" : "#1A1A1A", color: "#FFFFFF" }}>
      {unavailable ? "Unavailable" : <><Download size={11} /> Download</>}
    </div>
  </>;

  if (unavailable) {
    return (
      <div
        aria-disabled="true"
        className="flex items-center gap-4 px-5 py-3"
        style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9F9F9", borderBottom: "1px solid #EBEBEB" }}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={newsletter.url}
      download={newsletter.filename}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-5 py-3 transition-all group hover:bg-[#FFF5F5]"
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9F9F9",
        borderBottom: "1px solid #EBEBEB",
        textDecoration: "none",
      }}
    >
      {content}
    </a>
  );
}

function SemesterSection({ title, items }: { title: string; items: Newsletter[] }) {
  return (
    <section className="mb-8 border" style={{ borderColor: "#E0E0E0" }}>
      <div className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: "#1A1A1A", color: "rgba(255,255,255,0.78)" }}>
        {title} · {items.length} {items.length === 1 ? "issue" : "issues"}
      </div>
      <div>{[...items].reverse().map((newsletter, index) => <NewsletterRow key={newsletter.id} newsletter={newsletter} index={index} />)}</div>
    </section>
  );
}

export default function Newsletters({ schoolYear }: { schoolYear: NewsletterSchoolYear }) {
  const isCurrentYear = schoolYear === "2026-27";
  const newsletters = isCurrentYear ? currentYearNewsletters : archiveNewsletters;
  const archiveFall = archiveNewsletters.filter((newsletter) => newsletter.date < "2026-01-01");
  const archiveSpring = archiveNewsletters.filter((newsletter) => newsletter.date >= "2026-01-01");

  return (
    <div className="flex flex-col bg-white min-h-full">
      <div className="px-5 md:px-8 py-6 md:py-8 border-b" style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div className="flex items-center gap-3"><Calendar size={18} style={{ color: "#B30000" }} /><h1 className="text-[22px] md:text-[26px] font-black leading-tight" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>Science Team Weekly Newsletters</h1></div>
          <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] border" style={{ backgroundColor: isCurrentYear ? "#FFF5F5" : "#F4F4F4", color: isCurrentYear ? "#B30000" : "#555", borderColor: isCurrentYear ? "#F0CACA" : "#D8D8D8" }}>{isCurrentYear ? "Current School Year" : "Preserved Archive"}</span>
        </div>
        <p className="max-w-3xl text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#666" }}>
          {isCurrentYear
            ? `2026–27 School Year · ${newsletters.length} issues · Open any issue to view or download the PDF.`
            : `2025–26 School Year · ${newsletters.length} preserved issues · 29 PDFs are available; two original files are not currently available.`}
        </p>
      </div>

      <div className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-4xl">
        {isCurrentYear ? (
          <>
            <div className="mb-5 p-4 border-l-4" style={{ borderColor: "#B30000", backgroundColor: "#FFF8F8" }}>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] mb-1" style={{ color: "#B30000" }}>2026–27 Department Record</div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>Current issues capture feedback-focused PLC learning, classroom and curriculum practice, and Science Corner features throughout the school year.</p>
            </div>
            <SemesterSection title="Fall 2026" items={currentYearNewsletters} />
          </>
        ) : (
          <>
            <div className="mb-5 p-4 border-l-4" style={{ borderColor: "#666", backgroundColor: "#F4F4F4" }}>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] mb-1" style={{ color: "#555" }}>2025–26 Reference Archive</div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>These original weekly newsletter PDFs are preserved for reference and remain separate from the active 2026–27 record.</p>
            </div>
            <SemesterSection title="Spring 2026" items={archiveSpring} />
            <SemesterSection title="Fall 2025" items={archiveFall} />
          </>
        )}
      </div>
    </div>
  );
}
