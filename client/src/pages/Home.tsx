/**
 * NBHS Science Department PLC Dashboard
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Typography: Work Sans (headings/UI) + Merriweather (body/notes)
 * Colors: Sidebar #1A1A1A, Accent #B30000, Background #FFFFFF, Gray #F4F4F4
 */

import { useState } from "react";
import { plcSessions, getSessionStatus, type PLCSession, type SessionStatus, type SlideDownload } from "@/lib/plcData";
import Newsletters from "./Newsletters";
import Curriculum from "./Curriculum";
import { Calendar, Clock, Users, BookOpen, Download, ExternalLink, ChevronRight, ChevronLeft, FileText, Presentation, ClipboardList, FolderOpen, GraduationCap, BookMarked, Layers, Shield, FlaskConical } from "lucide-react";
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

type MainView = "plc" | "teachers" | "pathway" | "dept-pd" | "newsletters" | "curriculum" | "our-dept" | "lab-safety" | "mcas-prep" | "internship" | "bioconnect";

type TabType = "agenda" | "facilitator" | "slides" | "resources";

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
  const [selectedId, setSelectedId] = useState<string>(plcSessions[0].id);
  const [mainView, setMainView] = useState<MainView>("our-dept");
  const selectedSession = plcSessions.find((s) => s.id === selectedId) ?? plcSessions[0];

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

  // Group sessions by date, sorted chronologically
  const sessionsByDate = Object.fromEntries(
    Object.entries(
      plcSessions.reduce<Record<string, PLCSession[]>>((acc, session) => {
        if (!acc[session.date]) acc[session.date] = [];
        acc[session.date].push(session);
        return acc;
      }, {})
    ).sort(([a], [b]) => a.localeCompare(b))
  );

  const navItems: { id: MainView; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: "our-dept", label: "Department Home", shortLabel: "Home", icon: <Users size={15} /> },
    { id: "plc", label: "PLC Sessions", shortLabel: "PLC", icon: <ClipboardList size={15} /> },
    { id: "teachers", label: "Teacher Directory", shortLabel: "Teachers", icon: <GraduationCap size={15} /> },
    { id: "pathway", label: "Course Pathway", shortLabel: "Courses", icon: <BookMarked size={15} /> },
    { id: "dept-pd", label: "Department PD", shortLabel: "PD", icon: <Layers size={15} /> },
    { id: "newsletters", label: "Newsletters", shortLabel: "News", icon: <FileText size={15} /> },
    { id: "curriculum", label: "Curriculum", shortLabel: "Curriculum", icon: <BookOpen size={15} /> },
    { id: "lab-safety", label: "Lab Safety", shortLabel: "Safety", icon: <Shield size={15} /> },
    { id: "mcas-prep", label: "MCAS", shortLabel: "MCAS", icon: <GraduationCap size={15} /> },
    { id: "internship", label: "Science Internships", shortLabel: "Internships", icon: <FlaskConical size={15} /> },
  ];

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
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
            New Bedford High School
          </div>
          <div className="text-[16px] font-black text-white leading-tight">
            Science Department
          </div>
          <div className="text-[12px] font-semibold mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>
            Department Dashboard
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
              {/* BioConnect sub-item under Science Internships */}
              {item.id === "internship" && (
                <button
                  onClick={() => setMainView("bioconnect")}
                  className="flex items-center gap-2 pl-9 pr-4 py-2 text-left transition-all w-full"
                  style={{
                    backgroundColor: mainView === "bioconnect" ? "#B30000" : "oklch(0.14 0.005 285)",
                    color: mainView === "bioconnect" ? "#FFFFFF" : "oklch(0.55 0.005 65)",
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: mainView === "bioconnect" ? "700" : "500",
                    borderLeft: mainView === "bioconnect" ? "3px solid rgba(255,255,255,0.5)" : "3px solid #B30000",
                  }}
                >
                  <Users size={12} />
                  BioConnect Alumni
                </button>
              )}
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
            {plcSessions.length} sessions · 2025–26 School Year
          </div>
          {/* BioConnect Alumni Network Link */}
          <a
            href="https://nbhs-bioconnect.manus.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-left transition-all"
            style={{ backgroundColor: "rgba(179,0,0,0.15)", border: "1px solid rgba(179,0,0,0.4)", textDecoration: "none" }}
          >
            <svg width="13" height="13" fill="none" stroke="#B30000" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <div>
              <div className="text-[10px] font-bold" style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}>BioConnect</div>
              <div className="text-[9px]" style={{ color: "oklch(0.50 0.005 65)" }}>Alumni Network →</div>
            </div>
          </a>
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
            <div className="text-[13px] font-black text-white leading-tight">Science Department Dashboard</div>
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

          {mainView === "our-dept" && <OurDepartment />}
          {mainView === "teachers" && <TeacherDirectory />}
          {mainView === "pathway" && <CoursePathway />}
          {mainView === "dept-pd" && <DepartmentPDPage />}
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
        {mainView === "our-dept" && <OurDepartment />}
        {mainView === "plc" && (
          <div className="flex flex-col" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Date button bar */}
            <div className="flex-shrink-0 border-b px-6 py-3" style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}>
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
        {mainView === "dept-pd" && <DepartmentPDPage />}
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
