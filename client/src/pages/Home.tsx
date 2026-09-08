/**
 * NBHS Science Department PLC Dashboard
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Typography: Work Sans (headings/UI) + Merriweather (body/notes)
 * Colors: Sidebar #1A1A1A, Accent #B30000, Background #FFFFFF, Gray #F4F4F4
 * Information architecture: 2026–27 current-year workspace is intentionally separate from the preserved 2025–26 archive.
 */

import { useState } from "react";
import { plcSessions, departmentPDs, getSessionStatus, type PLCSession, type SessionStatus, type SlideDownload } from "@/lib/plcData";
import Newsletters from "./Newsletters";
import Curriculum from "./Curriculum";
import { Calendar, Clock, Users, BookOpen, Download, ExternalLink, ChevronRight, ChevronLeft, FileText, Presentation, ClipboardList, FolderOpen, GraduationCap, BookMarked, Layers, Shield, FlaskConical, Network } from "lucide-react";
import LabSafety from "./LabSafety";
import TeacherDirectory from "./TeacherDirectory";
import CoursePathway from "./CoursePathway";
import DepartmentPDPage from "./DepartmentPD";
import OurDepartment from "./OurDepartment";
import MCASPrep from "./MCASPrep";
import Internship from "./Internship";
import BioConnect from "./BioConnect";

// Mobile PLC drill-down step
type MobilePLCStep = "dates" | "sessions" | "detail";

type SchoolYear = "2026-27" | "2025-26";
type MainView = "current-year" | "archive-overview" | "plc" | "teachers" | "pathway" | "dept-pd" | "newsletters" | "curriculum" | "our-dept" | "lab-safety" | "mcas-prep" | "internship" | "bioconnect";

type TabType = "agenda" | "facilitator" | "slides" | "resources";

function sessionsForSchoolYear(year: SchoolYear) {
  const [start, end] = year === "2026-27"
    ? ["2026-08-01", "2027-07-31"]
    : ["2025-08-01", "2026-07-31"];
  return plcSessions.filter((session) => session.date >= start && session.date <= end);
}

function WorkspaceStatus({ label, tone = "red" }: { label: string; tone?: "red" | "green" | "gray" }) {
  const colors = {
    red: { dot: "#B30000", text: "#B30000", bg: "#FFF5F5", border: "#F0CACA" },
    green: { dot: "#2D6A4F", text: "#1F5A3D", bg: "#F0FAF4", border: "#B9DEC7" },
    gray: { dot: "#666666", text: "#444444", bg: "#F4F4F4", border: "#D8D8D8" },
  }[tone];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] border" style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
      {label}
    </span>
  );
}

function CurrentYearWorkspace({ onNavigate }: { onNavigate: (view: MainView) => void }) {
  const resources: { title: string; description: string; view: MainView; icon: React.ReactNode; color: string }[] = [
    { title: "Department Home", description: "Department priorities, leadership information, and shared science-team updates.", view: "our-dept", icon: <Users size={20} />, color: "#B30000" },
    { title: "Teacher Directory", description: "Science Department staff information and a quick reference for collaboration.", view: "teachers", icon: <GraduationCap size={20} />, color: "#1A1A1A" },
    { title: "Course Pathway", description: "2026–27 course offerings and the science learning pathway for students and families.", view: "pathway", icon: <BookMarked size={20} />, color: "#1A1A1A" },
    { title: "Lab Safety", description: "Core safety expectations, procedures, and resources for science instruction.", view: "lab-safety", icon: <Shield size={20} />, color: "#1A1A1A" },
  ];
  const currentYearPLCs = sessionsForSchoolYear("2026-27");

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="px-5 md:px-8 py-8 md:py-11 border-b" style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "#B30000" }}>
            <span>New Bedford High School · Science Department</span><span style={{ color: "#999" }}>•</span><span style={{ color: "#555" }}>School Year 2026–27</span>
          </div>
          <WorkspaceStatus label="Current" tone="red" />
        </div>
        <h1 className="text-[26px] md:text-[32px] font-bold leading-tight mb-3" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A", letterSpacing: "-0.02em" }}>
          Science Department Hub
        </h1>
        <p className="max-w-3xl text-[14px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>
          This is the central home for Science Department information, instructional resources, course planning, and laboratory safety. Use the sections below to access the department resources that support your work throughout the school year.
        </p>
      </div>

      <div className="px-5 md:px-8 py-7 md:py-9 max-w-6xl">
        <section className="mb-8 border" style={{ borderColor: "#E0E0E0" }}>
          <div className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 border-b" style={{ borderColor: "#E0E0E0", backgroundColor: "#1A1A1A" }}>
            <div className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "#FFFFFF" }}>2026–27 Instructional Priorities</div>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.14em]" style={{ color: "#FFFFFF" }}><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#B30000" }} />Current Direction</span>
          </div>
          <div className="grid md:grid-cols-2">
            <article className="p-5 md:p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: "#E0E0E0" }}>
              <div className="text-[11px] font-black uppercase tracking-[0.14em] mb-2" style={{ color: "#B30000" }}>Language and Literacy</div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#444" }}>New Bedford High School will strengthen explicit language instruction in every content area using the WIDA 2020 Standards Framework as a guide. Science teachers will intentionally plan for the language students need to access grade-level content, engage in academic discourse, explain their thinking, read complex texts, and produce high-quality writing within the discipline.</p>
            </article>
            <article className="p-5 md:p-6">
              <div className="text-[11px] font-black uppercase tracking-[0.14em] mb-2" style={{ color: "#B30000" }}>Coaching and Feedback</div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#444" }}>New Bedford High School will accelerate student growth by strengthening feedback throughout the school. Leaders will coach teachers with clear, actionable feedback that improves instruction, while teachers provide students timely, specific feedback that supports them as learners. Consistent cycles of coaching, reflection, and improvement will help students meet or exceed grade-level standards across multiple measures.</p>
            </article>
          </div>
        </section>
        <div className="flex items-center justify-between gap-3 mb-4"><div className="flex items-center gap-3"><span className="h-px w-8" style={{ backgroundColor: "#B30000" }} /><div className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: "#555" }}>Department Resources</div></div><WorkspaceStatus label="Current" tone="red" /></div>
        <div className="grid md:grid-cols-2 border border-b-0" style={{ borderColor: "#E0E0E0" }}>
          {resources.map((resource) => (
            <button key={resource.title} onClick={() => onNavigate(resource.view)} className="text-left p-5 md:p-6 border-b md:border-r transition-colors hover:bg-[#FAFAFA]" style={{ borderColor: "#E0E0E0" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: resource.color, color: "#FFFFFF" }}>{resource.icon}</div>
                <div>
                  <h2 className="text-[17px] font-black mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>{resource.title}</h2>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#666" }}>{resource.description}</p>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: resource.color }}>Open resource →</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <section className="mt-7 border" style={{ borderColor: "#E0E0E0" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 md:p-6" style={{ backgroundColor: "#FAFAFA" }}>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2"><div className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "#B30000" }}>District Professional Learning · Thursday, August 27, 2026</div><WorkspaceStatus label="Today" tone="red" /></div>
              <h2 className="text-[19px] font-black leading-snug mb-2" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>Instructional Coherence, Consistency, and Planning for Learning</h2>
              <p className="max-w-3xl text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>Science educators will use the three levers of consistency and the Planning for Learning Crosswalk to prepare standards-aligned learning for the opening weeks of school.</p>
            </div>
            <button onClick={() => onNavigate("dept-pd")} className="flex-shrink-0 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#B30000" }}>View Session Details</button>
          </div>
        </section>

        <section className="mt-7 border" style={{ borderColor: "#E0E0E0" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 md:px-6 py-4 border-b" style={{ borderColor: "#E0E0E0", backgroundColor: "#1A1A1A" }}>
            <div className="flex items-center gap-3"><span className="h-px w-8" style={{ backgroundColor: "#B30000" }} /><div className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "#FFFFFF" }}>Upcoming PLC Series</div></div>
            <WorkspaceStatus label="Current" tone="red" />
          </div>
          <div className="grid md:grid-cols-3" style={{ borderColor: "#E0E0E0" }}>
            {currentYearPLCs.map((session, index) => (
              <button key={session.id} onClick={() => onNavigate("plc")} className="text-left p-5 md:p-6 border-b md:border-b-0 md:border-r transition-colors hover:bg-[#FFF5F5]" style={{ borderColor: "#E0E0E0" }}>
                <div className="flex items-center justify-between gap-2 mb-3"><div className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: "#B30000" }}>{session.displayDate}</div><WorkspaceStatus label={index === 0 ? "Next" : "Scheduled"} tone={index === 0 ? "red" : "gray"} /></div>
                <h2 className="text-[16px] font-black leading-snug mb-2" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>{session.title}</h2>
                <p className="text-[12px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#666" }}>{session.subtitle}</p>
                <div className="mt-4 flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#555" }}>{session.duration}</span><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#B30000" }}>View PLC →</span></div>
              </button>
            ))}
          </div>
          <div className="px-5 md:px-6 py-3 flex items-center justify-between gap-3" style={{ backgroundColor: "#FAFAFA" }}><p className="text-[12px]" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>All three sessions use the same Lesson Internalization Tool and build one upcoming lesson plan across the week.</p><button onClick={() => onNavigate("plc")} className="flex-shrink-0 text-[10px] font-black uppercase tracking-widest" style={{ color: "#B30000" }}>Open PLC Series →</button></div>
        </section>

        <section className="mt-7 p-5 md:p-6 border-l-4" style={{ borderColor: "#1A1A1A", backgroundColor: "#F4F4F4" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1"><WorkspaceStatus label="Preserved" tone="gray" /><div className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: "#1A1A1A" }}>2025–26 Reference Record</div></div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>The complete 2025–26 PLC, PD, newsletter, curriculum, assessment, and internship record is preserved separately for reference.</p>
            </div>
            <button onClick={() => onNavigate("archive-overview")} className="flex-shrink-0 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#1A1A1A" }}>Access Preserved Archive</button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArchiveOverview({ onNavigate }: { onNavigate: (view: MainView) => void }) {
  const archivedDepartmentPDs = departmentPDs.filter((pd) => pd.date >= "2025-08-01" && pd.date <= "2026-07-31");
  const archiveAreas: { title: string; detail: string; view: MainView; icon: React.ReactNode }[] = [
    { title: "PLC Sessions", detail: `${plcSessions.length} preserved sessions, including decks, agendas, facilitator notes, and session resources.`, view: "plc", icon: <ClipboardList size={18} /> },
    { title: "Department PD", detail: `${archivedDepartmentPDs.length} preserved professional-development sessions and associated materials.`, view: "dept-pd", icon: <Layers size={18} /> },
    { title: "Weekly Newsletters", detail: "All 2025–26 weekly newsletter PDFs, organized by semester.", view: "newsletters", icon: <FileText size={18} /> },
    { title: "Curriculum & Pacing", detail: "2025–26 OpenSciEd materials, Biology pacing, and reference documents.", view: "curriculum", icon: <BookOpen size={18} /> },
    { title: "MCAS & Assessment", detail: "Prior-year assessment resources, benchmark analysis, and MCAS reference materials.", view: "mcas-prep", icon: <GraduationCap size={18} /> },
    { title: "Internship Materials", detail: "2025–26 workforce and internship opportunity materials retained for reference.", view: "internship", icon: <FlaskConical size={18} /> },
  ];

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="px-5 md:px-8 py-7 md:py-10 border-b" style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3"><div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#555" }}>Reference Archive</div><WorkspaceStatus label="Preserved" tone="gray" /></div>
        <h1 className="text-[26px] md:text-[34px] font-black leading-tight mb-2" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>2025–26 School Year Archive</h1>
        <p className="max-w-3xl text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#555" }}>
          Preserved department reference materials. Open an archive section to access the original PLC and PD materials, deck downloads, newsletters, pacing resources, assessment references, and internship materials without mixing them into the active 2026–27 workspace.
        </p>
      </div>
      <div className="px-5 md:px-8 py-6 md:py-8 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-b-0" style={{ borderColor: "#E0E0E0" }}>
          {archiveAreas.map((area) => (
            <button key={area.view} onClick={() => onNavigate(area.view)} className="text-left p-5 border-b md:border-r transition-colors hover:bg-[#FFF5F5]" style={{ borderColor: "#E0E0E0" }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: "#B30000" }}>{area.icon}<span className="text-[14px] font-black" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>{area.title}</span></div>
              <p className="text-[12px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#666" }}>{area.detail}</p>
              <div className="mt-4 flex items-center justify-between gap-2"><WorkspaceStatus label="Archived" tone="gray" /><div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#B30000" }}>Open →</div></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  const config = {
    completed: { label: "Completed", bg: "#2D6A4F", color: "#FFFFFF" },
    upcoming: { label: "Upcoming", bg: "#B30000", color: "#FFFFFF" },
    today: { label: "Today", bg: "#D4A017", color: "#FFFFFF" },
  }[status];
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

function SessionCard({
  session,
  isSelected,
  onClick,
}: {
  session: PLCSession;
  isSelected: boolean;
  onClick: () => void;
}) {
  // Holiday sessions: visually distinct, muted, non-interactive appearance
  if (session.isHoliday) {
    return (
      <div
        className="w-full text-left px-4 py-3 border-b"
        style={{
          borderColor: "oklch(0.22 0.005 285)",
          backgroundColor: "oklch(0.16 0.005 285)",
          opacity: 0.6,
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.45 0.005 65)" }}
          >
            {session.displayDate}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-[2px] px-2 py-0.5 border"
            style={{ borderColor: "oklch(0.30 0.005 285)", color: "oklch(0.45 0.005 65)", backgroundColor: "transparent" }}
          >
            No School
          </span>
        </div>
        <div
          className="text-[12px] leading-snug"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            color: "oklch(0.42 0.005 65)",
            fontStyle: "italic",
          }}
        >
          School Holiday — No PLC
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-4 border-b transition-all duration-150"
      style={{
        borderColor: "oklch(0.25 0.005 285)",
        backgroundColor: isSelected ? "oklch(0.38 0.18 25)" : "transparent",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "oklch(0.55 0.12 25)" }}
        >
          {session.displayDate}
        </span>
        <StatusBadge status={getSessionStatus(session.date)} />
      </div>
      <div
        className="text-[13px] font-semibold leading-snug mb-1"
        style={{
          fontFamily: "'Work Sans', sans-serif",
          color: isSelected ? "#FFFFFF" : "oklch(0.92 0.005 65)",
        }}
      >
        {session.title.length > 55 ? session.title.slice(0, 55) + "\u2026" : session.title}
      </div>
      <div
        className="text-[11px]"
        style={{ color: isSelected ? "rgba(255,255,255,0.6)" : "oklch(0.60 0.005 65)" }}
      >
        {session.subtitle}
      </div>
      {isSelected && (
        <div className="flex items-center gap-1 mt-2">
          <ChevronRight size={12} color="rgba(255,255,255,0.7)" />
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>
            Viewing details
          </span>
        </div>
      )}
    </button>
  );
}

function AgendaTab({ session }: { session: PLCSession }) {
  return (
    <div>
      {session.agendaPdf && (
        <a
          href={session.agendaPdf.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 flex items-center gap-3 p-4 border-2 transition-all hover:shadow-sm"
          style={{ borderColor: "#B30000", backgroundColor: "#FFF8F8", textDecoration: "none" }}
        >
          <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#B30000" }}>
            <FileText size={21} color="#FFFFFF" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#B30000" }}>Session Agenda</div>
            <div className="text-[14px] font-bold leading-snug" style={{ color: "#1A1A1A" }}>{session.agendaPdf.label}</div>
            <div className="mt-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#B30000" }}>Open or download PDF</div>
          </div>
          <Download size={18} className="flex-shrink-0" style={{ color: "#B30000" }} />
        </a>
      )}
      {/* Objectives */}
      <div className="mb-6 p-4 border-l-4" style={{ borderColor: "#B30000", backgroundColor: "#FDF5F5" }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#B30000" }}>
          Session Objectives
        </div>
        {session.objectives.map((obj, i) => (
          <div key={i} className="flex items-start gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#B30000" }} />
            <span className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#333" }}>
              {obj}
            </span>
          </div>
        ))}
      </div>

      {/* What to Bring */}
      <div className="mb-6 p-4 border border-dashed" style={{ borderColor: "#CCC" }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#555" }}>
          What to Bring
        </div>
        {session.whatToBring.map((item, i) => (
          <div key={i} className="flex items-start gap-2 mb-1">
            <div className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ backgroundColor: "#888" }} />
            <span className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Agenda Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ backgroundColor: "#1A1A1A" }}>
              <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white w-16">Time</th>
              <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white w-14">Min</th>
              <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white">Activity</th>
              <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white w-20">Slides</th>
            </tr>
          </thead>
          <tbody>
            {session.agenda.map((item, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #EBEBEB", backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}
              >
                <td className="px-3 py-3 text-[12px] font-bold" style={{ color: "#B30000" }}>
                  {item.time}
                </td>
                <td className="px-3 py-3 text-[12px] font-semibold" style={{ color: "#888" }}>
                  {item.duration}
                </td>
                <td className="px-3 py-3">
                  <div className="text-[13px] font-bold mb-0.5" style={{ color: "#1A1A1A" }}>
                    {item.activity}
                  </div>
                  <div className="text-[12px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#666" }}>
                    {item.description}
                  </div>
                </td>
                <td className="px-3 py-3 text-[12px]" style={{ color: "#888" }}>
                  {item.slides}
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: "#1A1A1A" }}>
              <td colSpan={2} className="px-3 py-2 text-[12px] font-bold text-white">Total</td>
              <td colSpan={2} className="px-3 py-2 text-[12px] font-bold text-white">
                {session.duration} · Aligned to {session.alignment}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FacilitatorTab({ session }: { session: PLCSession }) {
  const info = session.sessionInfo;
  return (
    <div className="pb-6">
      {info ? (
        <div className="space-y-6">
          {/* Session Overview */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#B30000", letterSpacing: "0.12em" }}>Session Overview</div>
            {info.overview.split("\n\n").map((para, i) => (
              <p key={i} className="text-[14px] leading-relaxed mb-3" style={{ fontFamily: "'Merriweather', serif", color: "#222" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Why It Matters */}
          <div className="p-4" style={{ backgroundColor: "#FFF8F8", borderLeft: "3px solid #B30000" }}>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#B30000", letterSpacing: "0.12em" }}>Why It Matters</div>
            <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#333" }}>
              {info.whyItMatters}
            </p>
          </div>

          {/* Learning Arc */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#555", letterSpacing: "0.12em" }}>Where This Fits in the PLC Arc</div>
            <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
              {info.learningArc}
            </p>
          </div>

          {/* Teacher Takeaways */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#555", letterSpacing: "0.12em" }}>What Teachers Will Leave With</div>
            <div className="space-y-2">
              {info.teacherTakeaways.map((t, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-[11px] font-bold mt-0.5" style={{ backgroundColor: "#B30000", color: "#FFF" }}>{i + 1}</div>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#333" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Fallback: show facilitator notes if no sessionInfo
        <div>
          <div className="mb-4 p-3" style={{ backgroundColor: "#F4F4F4" }}>
            <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
              At-a-glance facilitator guide for <strong>{session.displayDate}</strong>. Key notes for each section of the session.
            </p>
          </div>
          <div className="space-y-3">
            {session.facilitatorNotes.map((note, i) => (
              <div key={i} className="flex gap-3 p-3 border" style={{ borderColor: "#E8E8E8" }}>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "#888" }}>
                    {note.slide}
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#333" }}>
                    {note.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DownloadRow({ item }: { item: SlideDownload }) {
  const isPdf = item.type === "pdf";
  const ext = isPdf ? ".pdf" : ".pptx";
  const extLabel = isPdf ? "PDF" : "PowerPoint (.pptx)";
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 border transition-all hover:border-gray-400"
      style={{ borderColor: "#DDDDDD", textDecoration: "none" }}
    >
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1A1A1A" }}>
        <Download size={20} color="#FFFFFF" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold leading-snug" style={{ color: "#1A1A1A" }}>{item.label}</div>
        <div className="text-[12px] mt-0.5" style={{ color: "#888" }}>Download {extLabel}</div>
      </div>
      <Download size={16} className="flex-shrink-0" style={{ color: "#888" }} />
    </a>
  );
}

function SlidesTab({ session }: { session: PLCSession }) {
  const downloads: SlideDownload[] = session.slidesDownloads ?? (
    session.slidesDownloadUrl
      ? [{
          label: "Download Slides",
          filename: session.title,
          url: session.slidesDownloadUrl,
          type: session.slidesDownloadUrl.endsWith(".pdf") ? "pdf" : "pptx",
        }]
      : []
  );
  const isProtocol = downloads.some((d) => d.type === "pdf");
  if (downloads.length === 0) {
    return (
      <div className="pb-6">
        <div className="mb-4 p-3" style={{ backgroundColor: "#F4F4F4" }}>
          <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
            Slides for <strong>{session.displayDate}</strong> are not yet available. Check back closer to the session date.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="pb-6">
      <div className="mb-4 p-3" style={{ backgroundColor: "#F4F4F4" }}>
        <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
          {isProtocol
            ? <>Download the protocol for <strong>{session.displayDate}</strong>. Use the version that matches your curriculum.</>  
            : <>Download the slide deck for <strong>{session.displayDate}</strong>. Use the version that matches your curriculum.</>}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {downloads.map((item, i) => (
          <DownloadRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function ResourcesTab({ session }: { session: PLCSession }) {
  const resources = session.resources || [];
  return (
    <div>
      <div className="mb-4 p-3" style={{ backgroundColor: "#F4F4F4" }}>
        <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#444" }}>
          Download the reference materials for this session. Bring these to the PLC or share with your co-teacher.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {resources.map((resource, i) => {
          const isSlides = resource.type === "slides";
          const downloadLabel = isSlides ? "Download PowerPoint (.pptx)" : "Download PDF";
          const bgColor = isSlides ? "#1A1A1A" : "#B30000";
          const borderColor = isSlides ? "#555555" : "#B30000";
          return (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border-2 transition-all"
              style={{ borderColor, textDecoration: "none" }}
            >
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: bgColor }}>
                {isSlides ? <Presentation size={20} color="#FFFFFF" /> : <FileText size={20} color="#FFFFFF" />}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold mb-1" style={{ color: "#1A1A1A" }}>{resource.title}</div>
                <div className="text-[12px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#666" }}>{resource.description}</div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: bgColor }}>{downloadLabel}</div>
              </div>
              <Download size={16} className="flex-shrink-0 mt-1" style={{ color: bgColor }} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function SessionDetail({ session }: { session: PLCSession }) {
  const [activeTab, setActiveTab] = useState<TabType>("agenda");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "agenda", label: "Agenda", icon: <ClipboardList size={14} /> },
    { id: "facilitator", label: "Session Info", icon: <FileText size={14} /> },
    { id: "slides", label: "Slides", icon: <Presentation size={14} /> },
    ...(session.resources && session.resources.length > 0
      ? [{ id: "resources" as TabType, label: "Resources", icon: <FolderOpen size={14} /> }]
      : []),
  ];

  if (session.isHoliday) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16" style={{ minHeight: "100%" }}>
        <div
          className="w-14 h-14 flex items-center justify-center mb-5"
          style={{ backgroundColor: "#F4F4F4" }}
        >
          <Calendar size={26} style={{ color: "#B30000" }} />
        </div>
        <div
          className="text-[11px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "#B30000" }}
        >
          School Holiday
        </div>
        <h2
          className="text-[22px] font-black text-center mb-2"
          style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
        >
          No PLC — School Holiday
        </h2>
        <p
          className="text-[13px] text-center max-w-xs"
          style={{ fontFamily: "'Merriweather', serif", color: "#666", lineHeight: 1.6 }}
        >
          {session.displayDate} is a school holiday. There is no PLC session scheduled for this date.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: "100%" }}>
      {/* Session Header */}
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-4 border-b" style={{ borderColor: "#E8E8E8" }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={getSessionStatus(session.date)} />
              {session.agendaVersion !== "Both" && (
                <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#888" }}>
                  {session.agendaVersion === "OSE" ? "OpenSciEd Version" : "Gen-Ed Version"}
                </span>
              )}
            </div>
            <h2
              className="text-[20px] font-black leading-tight mb-1"
              style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
            >
              {session.title}
            </h2>
            <p className="text-[13px]" style={{ color: "#888" }}>{session.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {[
            { icon: <Calendar size={13} />, text: session.displayDate },
            { icon: <Clock size={13} />, text: session.duration },
            { icon: <Users size={13} />, text: session.audience },
            { icon: <BookOpen size={13} />, text: session.alignment },
          ].map((meta, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span style={{ color: "#B30000" }}>{meta.icon}</span>
              <span className="text-[12px] font-medium" style={{ color: "#555" }}>{meta.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b" style={{ borderColor: "#E8E8E8" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-3 md:px-5 py-3 text-[11px] md:text-[12px] font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap"
            style={{
              borderBottomColor: activeTab === tab.id ? "#B30000" : "transparent",
              color: activeTab === tab.id ? "#B30000" : "#888",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-4 md:px-6 py-4 md:py-5">
        {activeTab === "agenda" && <AgendaTab session={session} />}
        {activeTab === "facilitator" && <FacilitatorTab session={session} />}
        {activeTab === "slides" && <SlidesTab session={session} />}
        {activeTab === "resources" && <ResourcesTab session={session} />}
      </div>
    </div>
  );
}

export default function Home() {
  const [schoolYear, setSchoolYear] = useState<SchoolYear>("2026-27");
  const [selectedId, setSelectedId] = useState<string>("plc-2026-08-31-purpose-mastery");
  const [mainView, setMainView] = useState<MainView>("current-year");
  const activeYearSessions = sessionsForSchoolYear(schoolYear);
  const selectedSession = activeYearSessions.find((s) => s.id === selectedId) ?? activeYearSessions[0] ?? plcSessions[0];

  // Mobile PLC drill-down state
  const [mobilePLCStep, setMobilePLCStep] = useState<MobilePLCStep>("dates");
  const [mobileSelectedDate, setMobileSelectedDate] = useState<string | null>(null);

  // When switching nav on mobile, reset PLC drill-down
  const handleMobileNavChange = (view: MainView) => {
    setMainView(view);
    if (view !== "plc") {
      setMobilePLCStep("dates");
      setMobileSelectedDate(null);
    }
  };

  const handleYearChange = (year: SchoolYear) => {
    setSchoolYear(year);
    setMainView(year === "2026-27" ? "current-year" : "archive-overview");
    setSelectedId(sessionsForSchoolYear(year)[0]?.id ?? plcSessions[0].id);
    setMobilePLCStep("dates");
    setMobileSelectedDate(null);
  };

  // Group sessions by date, sorted chronologically
  const sessionsByDate = Object.fromEntries(
    Object.entries(
      activeYearSessions.reduce<Record<string, PLCSession[]>>((acc, session) => {
        if (!acc[session.date]) acc[session.date] = [];
        acc[session.date].push(session);
        return acc;
      }, {})
    ).sort(([a], [b]) => a.localeCompare(b))
  );

  const currentYearNavItems: { id: MainView; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: "current-year", label: "2026–27 Department Hub", shortLabel: "2026–27", icon: <Calendar size={15} /> },
    { id: "plc", label: "PLC Sessions", shortLabel: "PLC", icon: <ClipboardList size={15} /> },
    { id: "our-dept", label: "Department Home", shortLabel: "Home", icon: <Users size={15} /> },
    { id: "teachers", label: "Teacher Directory", shortLabel: "Teachers", icon: <GraduationCap size={15} /> },
    { id: "pathway", label: "Course Pathway", shortLabel: "Courses", icon: <BookMarked size={15} /> },
    { id: "dept-pd", label: "Department PD", shortLabel: "PD", icon: <Layers size={15} /> },
    { id: "lab-safety", label: "Lab Safety", shortLabel: "Safety", icon: <Shield size={15} /> },
  ];

  const archiveNavItems: { id: MainView; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: "archive-overview", label: "2025–26 Archive", shortLabel: "Archive", icon: <FolderOpen size={15} /> },
    { id: "plc", label: "PLC Sessions", shortLabel: "PLC", icon: <ClipboardList size={15} /> },
    { id: "dept-pd", label: "Department PD", shortLabel: "PD", icon: <Layers size={15} /> },
    { id: "newsletters", label: "Newsletters", shortLabel: "News", icon: <FileText size={15} /> },
    { id: "curriculum", label: "Curriculum & Pacing", shortLabel: "Curriculum", icon: <BookOpen size={15} /> },
    { id: "mcas-prep", label: "MCAS & Assessment", shortLabel: "MCAS", icon: <GraduationCap size={15} /> },
    { id: "internship", label: "Internship Materials", shortLabel: "Internships", icon: <FlaskConical size={15} /> },
  ];

  const navItems = schoolYear === "2026-27" ? currentYearNavItems : archiveNavItems;

  return (
    <div className="flex flex-col md:flex-row" style={{ fontFamily: "'Work Sans', sans-serif", minHeight: "100dvh" }}>
      {/* Sidebar — hidden on mobile, visible on md+ */}
      {/* Outer sidebar: sticky, full viewport height, no overflow — acts as the fixed frame */}
      <div
        className="hidden md:flex flex-col flex-shrink-0"
        style={{ width: "300px", height: "100vh", backgroundColor: "#1A1A1A", borderRight: "1px solid oklch(0.25 0.005 285)", position: "sticky", top: 0, alignSelf: "flex-start", overflow: "hidden" }}
      >
        {/* Sidebar Header — always visible */}
        <div className="flex-shrink-0 px-4 py-5 border-b" style={{ borderColor: "oklch(0.25 0.005 285)", backgroundColor: "#B30000" }}>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.72)" }}>New Bedford High School</div>
          <div className="text-[18px] font-black uppercase tracking-[-0.02em] text-white leading-none">Science <span className="font-medium">Department</span></div>
          <div className="flex items-center gap-2 mt-3"><span className="h-px w-7" style={{ backgroundColor: "rgba(255,255,255,0.65)" }} /><div className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.82)" }}>{schoolYear === "2026-27" ? "2026–27 Department Hub" : "2025–26 Reference Archive"}</div></div>
        </div>

        {/* School-year selector — the primary guardrail against mixing archived and current materials */}
        <div className="flex-shrink-0 px-4 py-3 border-b" style={{ borderColor: "oklch(0.25 0.005 285)" }}>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.50 0.005 65)" }}>School Year</div>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: "2026-27" as SchoolYear, label: "2026–27", sublabel: "Current" },
              { id: "2025-26" as SchoolYear, label: "2025–26", sublabel: "Archive" },
            ]).map((year) => {
              const active = schoolYear === year.id;
              return (
                <button key={year.id} onClick={() => handleYearChange(year.id)} className="px-2 py-2 text-left border transition-all" style={{ backgroundColor: active ? "#B30000" : "oklch(0.22 0.005 285)", borderColor: active ? "#B30000" : "oklch(0.30 0.005 285)", color: active ? "#FFFFFF" : "oklch(0.75 0.005 65)" }}>
                  <div className="text-[11px] font-black leading-none">{year.label}</div>
                  <div className="text-[9px] uppercase tracking-widest mt-1" style={{ color: active ? "rgba(255,255,255,0.72)" : "oklch(0.52 0.005 65)" }}>{year.sublabel}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Navigation — always visible, never scrolls away */}
        <div className="flex-shrink-0 flex flex-col border-b" style={{ borderColor: "oklch(0.25 0.005 285)" }}>
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => setMainView(item.id)}
                className="flex items-center gap-2.5 px-4 py-3 text-left transition-all w-full"
                style={{
                  backgroundColor: mainView === item.id ? "#B30000" : "transparent",
                  color: mainView === item.id ? "#FFFFFF" : "oklch(0.65 0.005 65)",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: mainView === item.id ? "700" : "500",
                  borderLeft: mainView === item.id ? "3px solid rgba(255,255,255,0.5)" : "3px solid transparent",
                }}
              >
                {item.icon}
                {item.label}
              </button>

            </div>
          ))}
        </div>

        {/* Session List — scrolls independently below the nav */}
        {mainView === "plc" && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-4 pt-4 pb-2">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.50 0.005 65)" }}>
                Sessions by Date
              </div>
              {/* Date jump pills */}
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(sessionsByDate).map(([date, sessions]) => {
                  const isActive = sessions.some((s) => s.id === selectedId);
                  const shortDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedId(sessions[0].id)}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 transition-all"
                      style={{
                        backgroundColor: isActive ? "#B30000" : "oklch(0.22 0.005 285)",
                        color: isActive ? "#FFFFFF" : "oklch(0.65 0.005 65)",
                        border: isActive ? "1px solid #B30000" : "1px solid oklch(0.30 0.005 285)",
                      }}
                    >
                      {shortDate}
                    </button>
                  );
                })}
              </div>
            </div>
            {Object.entries(sessionsByDate).map(([date, sessions]) => (
              <div key={date}>
                <div
                  className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.55 0.12 25)", borderBottom: "1px solid oklch(0.22 0.005 285)" }}
                >
                  {sessions[0].displayDate}
                </div>
                {sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    isSelected={selectedId === session.id}
                    onClick={() => setSelectedId(session.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {mainView !== "plc" && <div className="flex-1" />}

        {/* Sidebar Footer — always visible */}
        <div className="flex-shrink-0 px-4 py-3 border-t" style={{ borderColor: "oklch(0.25 0.005 285)" }}>
          <div className="text-[10px] mb-2" style={{ color: "oklch(0.45 0.005 65)" }}>
            {schoolYear === "2025-26" ? `${activeYearSessions.length} archived PLC sessions` : `${activeYearSessions.length} current PLC sessions`}
          </div>
        </div>
      </div>

      {/* Mobile Layout: top header nav + content */}
      <div className="flex-1 md:hidden flex flex-col" style={{ height: "100dvh", overflow: "hidden" }}>
        {/* Mobile Top Header */}
        <div
          className="border-b"
          style={{ backgroundColor: "#1A1A1A", borderColor: "oklch(0.25 0.005 285)" }}
        >
          {/* Brand bar */}
          <div className="px-4 py-2" style={{ backgroundColor: "#B30000" }}>
            <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>New Bedford High School</div>
            <div className="text-[13px] font-black text-white leading-tight">Science Department · {schoolYear === "2026-27" ? "2026–27" : "2025–26 Archive"}</div>
          </div>
          <div className="grid grid-cols-2 gap-px p-2" style={{ backgroundColor: "#1A1A1A" }}>
            {([
              { id: "2026-27" as SchoolYear, label: "2026–27 Current" },
              { id: "2025-26" as SchoolYear, label: "2025–26 Archive" },
            ]).map((year) => (
              <button key={year.id} onClick={() => handleYearChange(year.id)} className="py-2 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: schoolYear === year.id ? "#B30000" : "oklch(0.22 0.005 285)", color: schoolYear === year.id ? "#FFFFFF" : "oklch(0.65 0.005 65)" }}>{year.label}</button>
            ))}
          </div>
          {/* Nav tabs */}
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavChange(item.id)}
                className="flex flex-col items-center justify-center px-3 py-2 gap-0.5 flex-shrink-0 transition-all border-b-2"
                style={{
                  borderBottomColor: mainView === item.id ? "#B30000" : "transparent",
                  backgroundColor: "transparent",
                  color: mainView === item.id ? "#FFFFFF" : "oklch(0.55 0.005 65)",
                }}
              >
                {item.icon}
                <span className="text-[9px] font-bold uppercase tracking-wide whitespace-nowrap">{item.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white min-h-0 overflow-y-auto">
          {/* PLC: 3-step drill-down */}
          {mainView === "plc" && mobilePLCStep === "dates" && (
            <div>
              <div className="px-4 pt-5 pb-3 border-b" style={{ borderColor: "#E8E8E8" }}>
                <h2 className="text-[20px] font-black mb-1" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>PLC Sessions</h2>
                <p className="text-[13px]" style={{ color: "#888" }}>Select a date to view sessions</p>
              </div>
              <div className="divide-y" style={{ borderColor: "#F0F0F0" }}>
                {Object.entries(sessionsByDate).map(([date, sessions]) => {
                  const status = getSessionStatus(date);
                  const statusConfig = {
                    completed: { label: "Completed", bg: "#2D6A4F", color: "#FFFFFF" },
                    upcoming: { label: "Upcoming", bg: "#B30000", color: "#FFFFFF" },
                    today: { label: "Today", bg: "#D4A017", color: "#FFFFFF" },
                  }[status];
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setMobileSelectedDate(date);
                        setMobilePLCStep("sessions");
                      }}
                      className="w-full text-left px-4 py-4 flex items-center justify-between gap-3 transition-all active:bg-gray-50"
                      style={{ borderBottom: "1px solid #F0F0F0" }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
                            style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="text-[15px] font-bold" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                          {sessions[0].displayDate}
                        </div>
                        <div className="text-[12px] mt-0.5" style={{ color: "#888" }}>
                          {sessions.length === 1 ? sessions[0].title.slice(0, 50) + (sessions[0].title.length > 50 ? "…" : "") : `${sessions.length} sessions`}
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: "#B30000", flexShrink: 0 }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PLC: Step 2 — sessions for selected date */}
          {mainView === "plc" && mobilePLCStep === "sessions" && mobileSelectedDate && (() => {
            const dateSessions = sessionsByDate[mobileSelectedDate] ?? [];
            return (
              <div>
                <div className="px-4 pt-4 pb-3 border-b flex items-center gap-3" style={{ borderColor: "#E8E8E8" }}>
                  <button
                    onClick={() => setMobilePLCStep("dates")}
                    className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider"
                    style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}
                  >
                    <ChevronLeft size={14} /> All Dates
                  </button>
                  <span style={{ color: "#DDD" }}>|</span>
                  <span className="text-[13px] font-bold" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                    {dateSessions[0]?.displayDate}
                  </span>
                </div>
                <div>
                  {dateSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        setSelectedId(session.id);
                        setMobilePLCStep("detail");
                      }}
                      className="w-full text-left px-4 py-4 flex items-start justify-between gap-3 transition-all active:bg-gray-50"
                      style={{ borderBottom: "1px solid #F0F0F0" }}
                    >
                      <div className="flex-1">
                        <div className="mb-1.5">
                          <StatusBadge status={getSessionStatus(session.date)} />
                          {session.agendaVersion !== "Both" && (
                            <span className="ml-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#888" }}>
                              {session.agendaVersion === "OSE" ? "OpenSciEd" : "Gen-Ed"}
                            </span>
                          )}
                        </div>
                        <div className="text-[14px] font-bold leading-snug mb-0.5" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                          {session.title}
                        </div>
                        <div className="text-[12px]" style={{ color: "#888" }}>{session.subtitle}</div>
                        <div className="flex gap-3 mt-2">
                          <span className="text-[11px]" style={{ color: "#B30000" }}>{session.duration}</span>
                          <span className="text-[11px]" style={{ color: "#888" }}>{session.audience}</span>
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: "#B30000", flexShrink: 0, marginTop: 4 }} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* PLC: Step 3 — session detail */}
          {mainView === "plc" && mobilePLCStep === "detail" && (
            <div>
              <div className="px-4 pt-4 pb-2 border-b flex items-center gap-3" style={{ borderColor: "#E8E8E8" }}>
                <button
                  onClick={() => setMobilePLCStep("sessions")}
                  className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider"
                  style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
              </div>
              <SessionDetail key={selectedId} session={selectedSession} />
            </div>
          )}

          {mainView === "current-year" && <CurrentYearWorkspace onNavigate={handleMobileNavChange} />}
          {mainView === "archive-overview" && <ArchiveOverview onNavigate={handleMobileNavChange} />}
          {mainView === "our-dept" && <OurDepartment />}
          {mainView === "teachers" && <TeacherDirectory />}
          {mainView === "pathway" && <CoursePathway />}
          {mainView === "dept-pd" && <DepartmentPDPage key={schoolYear} schoolYear={schoolYear} />}
          {mainView === "newsletters" && <Newsletters />}
          {mainView === "curriculum" && <Curriculum />}
           {mainView === "lab-safety" && <LabSafety />}
          {mainView === "mcas-prep" && <MCASPrep />}
          {mainView === "internship" && <Internship onBioConnect={() => setMainView("bioconnect")} />}
          {mainView === "bioconnect" && <BioConnect />}
        </div>
      </div>
      {/* Desktop Main Content */}
      <div className="hidden md:flex flex-col flex-1 bg-white">
        {mainView === "current-year" && <CurrentYearWorkspace onNavigate={setMainView} />}
        {mainView === "archive-overview" && <ArchiveOverview onNavigate={setMainView} />}
        {mainView === "our-dept" && <OurDepartment />}
        {mainView === "plc" && (
          <div className="flex flex-col" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Date button bar */}
            <div className="flex-shrink-0 border-b px-6 py-3" style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA", maxHeight: "110px", overflowY: "auto" }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#999" }}>Jump to Date</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(sessionsByDate).map(([date, sessions]) => {
                  const isActive = sessions.some((s) => s.id === selectedId);
                  const status = getSessionStatus(date);
                  const shortDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
                  const bgColor = isActive ? "#B30000" : status === "completed" ? "#2D6A4F" : status === "today" ? "#D4A017" : "#444";
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedId(sessions[0].id)}
                      className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 transition-all"
                      style={{
                        backgroundColor: isActive ? "#B30000" : "#F0F0F0",
                        color: isActive ? "#FFFFFF" : "#333",
                        border: isActive ? "2px solid #B30000" : "2px solid #E0E0E0",
                        outline: status === "today" && !isActive ? "2px solid #D4A017" : "none",
                      }}
                    >
                      {shortDate}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Session detail */}
            <div className="flex-1 overflow-y-auto">
              <SessionDetail key={selectedId} session={selectedSession} />
            </div>
          </div>
        )}
        {mainView === "teachers" && <TeacherDirectory />}
        {mainView === "pathway" && <CoursePathway />}
        {mainView === "dept-pd" && <DepartmentPDPage key={schoolYear} schoolYear={schoolYear} />}
        {mainView === "newsletters" && <Newsletters />}
        {mainView === "curriculum" && <Curriculum />}
        {mainView === "lab-safety" && <LabSafety />}
        {mainView === "mcas-prep" && <MCASPrep />}
        {mainView === "internship" && <Internship onBioConnect={() => setMainView("bioconnect")} />}
        {mainView === "bioconnect" && <BioConnect />}
      </div>
    </div>
  );
}
