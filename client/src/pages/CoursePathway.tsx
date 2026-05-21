/**
 * NBHS Science Department - Course Pathway Guide
 * Design: Professional swim-lane grid — grade columns × interest-based track rows
 * Pre-AP shown as an accelerated option WITHIN each track (not a separate row)
 * Tracks: Life & Health Sciences | Environmental & Earth Sciences | Physical Sciences & Engineering
 *
 * Environmental & Earth Sciences track shows TWO pathways:
 *   Standard:    Biology → Environmental Science → Marine Science / Earth & Space electives
 *   AP Fast Track: Pre-AP Biology → Pre-AP Chemistry → AP Environmental Science
 */

import React, { useState } from "react";
import { Search } from "lucide-react";

interface CourseCard {
  name: string;
  sublabel: string;
  bg: string;
  text: string;
  ap?: boolean;
  mcas?: boolean;
  credits?: string;
  prereq?: string;
  description?: string;
  preap?: boolean; // marks this as a Pre-AP accelerated option
  orAlso?: boolean; // marks this card as an "or also" alternative (shown with divider)
  fastTrack?: boolean; // marks this card as part of the AP Fast Track pathway
}

// ─── Grade Columns ────────────────────────────────────────────────────────────

const GRADE_COLS = [
  { id: "g9",   label: "Grade 9",          headerBg: "#D6EAF8", headerText: "#1A3A5C" },
  { id: "g10",  label: "Grade 10",         headerBg: "#FADBD8", headerText: "#6E2C00" },
  { id: "g11",  label: "Grade 11 / 12",    headerBg: "#D5F5E3", headerText: "#1E5631" },
  { id: "elec", label: "Science Electives", headerBg: "#FEF9E7", headerText: "#7D6608" },
];

// Grid template shared by header row and data rows
const GRID_TEMPLATE = "180px repeat(3, minmax(160px, 1fr)) minmax(260px, 1.4fr)";

// ─── Tracks ───────────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: "life",
    label: "Life & Health Sciences",
    icon: "🔬",
    rowBg: "#EBF5FB",
    accentColor: "#2471A3",
    careers: "Medicine · Nursing · Biotechnology · Research",
    description: "For students interested in living systems, human health, and biomedical sciences. Leads to AP Biology in Grade 11.",
  },
  {
    id: "env",
    label: "Environmental & Earth Sciences",
    icon: "🌿",
    rowBg: "#EAFAF1",
    accentColor: "#1E8449",
    careers: "Environmental Science · Ecology · Marine Biology · Climate",
    description: "For students interested in ecosystems, climate, and the natural world. Two pathways: Standard (Env Science) and AP Fast Track (Pre-AP Chem → AP Env Science).",
  },
  {
    id: "phys",
    label: "Physical Sciences & Engineering",
    icon: "⚡",
    rowBg: "#F5EEF8",
    accentColor: "#6C3483",
    careers: "Engineering · Physics · Technology · Architecture",
    description: "For students interested in forces, energy, and how things work. Leads to AP Physics in Grade 12.",
  },
];

// ─── Course Grid ──────────────────────────────────────────────────────────────
// Each cell can have a "standard" array and an optional "preap" array
// When preap exists, a divider "⚡ or Pre-AP option:" is shown between them

interface GridCell {
  standard: CourseCard[];
  preap?: CourseCard[];
  extra?: CourseCard[]; // renders after the preap section, for special-case cards like fast-track options
}

const GRID: Record<string, Record<string, GridCell>> = {
  life: {
    g9: {
      standard: [{
        name: "Biology", sublabel: "Grade 9 · Required", bg: "#AED6F1", text: "#1A3A5C",
        mcas: true, credits: "1.0 credit",
        prereq: "Required for all Grade 9 students",
        description: "Comprehensive exploration of living organisms — from biochemistry and cell biology to genetics, evolution, and ecosystems. Aligned to MA state standards and NGSS. Prepares students for the Biology MCAS.",
      }],
      preap: [{
        name: "Pre-AP Biology", sublabel: "Grade 9 · Accelerated", bg: "#2471A3", text: "#fff",
        mcas: true, credits: "1.0 credit", preap: true,
        prereq: "Teacher recommendation",
        description: "Follows the College Board Pre-AP Biology curriculum. Emphasizes foundational biology knowledge and skills for college and career readiness. Prepares students for the Biology MCAS and AP-level science in Grades 11–12.",
      }],
    },
    g10: {
      standard: [{
        name: "Chemistry", sublabel: "Grade 10 · Required", bg: "#F5B7B1", text: "#6E2C00",
        credits: "1.0 credit",
        prereq: "Biology or Pre-AP Biology, and Algebra I (passed)",
        description: "Inquiry-based exploration of matter's properties, atomic structure, chemical reactions, solutions, acids, and bases. Hands-on laboratory work throughout. Prerequisite: Biology or Pre-AP Biology, and Algebra I.",
      }],
      preap: [{
        name: "Pre-AP Chemistry", sublabel: "Grade 10 · Accelerated", bg: "#A93226", text: "#fff",
        credits: "1.0 credit", preap: true,
        prereq: "Pre-AP Biology or Biology, and Algebra I (passed)",
        description: "Follows the College Board Pre-AP Chemistry curriculum. Covers foundational chemistry at the atomic scale with emphasis on college and career readiness. Prerequisite: Pre-AP Biology or Biology, and Algebra I.",
      }],
    },
    g11: {
      standard: [
        {
          name: "AP Biology*", sublabel: "Gr 11–12 · AP", bg: "#1A5276", text: "#fff",
          ap: true, credits: "1.0 credit",
          prereq: "Biology and Chemistry (passed); teacher approval",
          description: "*Students may take AP Biology in Grade 11 and AP Chemistry in Grade 12, or reverse the order based on interest and counselor guidance. Both AP courses are available in Grades 11–12. College Board AP course mirroring a college-level introductory biology course. Emphasizes higher-level biological principles, critical thinking, and real-world application over memorization. AP Exam participation required.",
        },
        {
          name: "AP Chemistry*", sublabel: "Gr 11–12 · AP", bg: "#6E2C00", text: "#fff",
          ap: true, credits: "1.0 credit", orAlso: true,
          prereq: "Prior Chemistry course (passed)",
          description: "*Students may take AP Chemistry in Grade 12 and AP Biology in Grade 11, or reverse the order based on interest and counselor guidance. Both AP courses are available in Grades 11–12. College Board AP course providing a college-level foundation in chemistry. Covers atomic structure, bonding, kinetics, thermodynamics, and equilibrium through inquiry-based investigations. AP Exam participation required.",
        },
      ],
    },
    elec: { standard: [] },
    g12: { standard: [] },
  },
  env: {
    g9: {
      // Standard track: Biology | AP Fast Track: Pre-AP Biology
      standard: [{
        name: "Biology", sublabel: "Grade 9 · Required", bg: "#AED6F1", text: "#1A3A5C",
        mcas: true, credits: "1.0 credit",
        prereq: "Required for all Grade 9 students",
        description: "Standard Environmental Track: Biology is the foundation for all science pathways. After Biology, students in this track take Environmental Science in Grade 10 or 11. Prepares students for the Biology MCAS.",
      }],
      preap: [{
        name: "Pre-AP Biology", sublabel: "Grade 9 \u00b7 AP Fast Track", bg: "#2471A3", text: "#fff",
        credits: "1.0 credit", preap: true,
        prereq: "Teacher recommendation",
        description: "AP Fast Track: Students who complete Pre-AP Biology can take Pre-AP Chemistry in Grade 10 and reach AP Environmental Science in Grade 11–12. Follows the College Board Pre-AP Biology curriculum. Prepares students for the Biology MCAS.",
      }],
    },
    g10: {
      // Standard track: Environmental Science | AP Fast Track: Pre-AP Chemistry
      standard: [{
        name: "Environmental Science", sublabel: "Gr 10–11 · Standard", bg: "#1E8449", text: "#fff",
        credits: "1.0 credit",
        prereq: "Biology or Pre-AP Biology (passed)",
        description: "Standard Environmental Track: Grade 10 placement for students who want to begin the environmental science sequence early. Comprehensive examination of ecosystems, energy cycling, climate change, pollution, and environmental policy. Prerequisite: Biology or Pre-AP Biology. No Chemistry required.",
      }],
      preap: [{
        name: "Pre-AP Chemistry", sublabel: "Grade 10 \u00b7 AP Fast Track", bg: "#A93226", text: "#fff",
        credits: "1.0 credit", preap: true, fastTrack: true,
        prereq: "Pre-AP Biology or Biology, and Algebra I (passed)",
        description: "AP Fast Track: Students who completed Pre-AP Biology take Pre-AP Chemistry in Grade 10 to prepare for AP Environmental Science. Follows the College Board Pre-AP Chemistry curriculum. Prerequisite: Pre-AP Biology or Biology, and Algebra I.",
      }],
    },
    g11: {
      // Standard track: Marine Science / Marine Science Honors (Gr 10+ with Biology) | AP Fast Track: AP Env Science
      standard: [
        {
          name: "Marine Science", sublabel: "Gr 10–12 · Elective", bg: "#0E6655", text: "#fff",
          credits: "1.0 credit",
          prereq: "Biology or Pre-AP Biology (passed) — Grade 10 students who successfully complete Biology may take this course",
          description: "Comprehensive exploration of ocean physical structure, chemistry, marine life diversity, and ecology. Inquiry-based with laboratory activities. Prerequisite: Biology or Pre-AP Biology. No Chemistry required. Open to Grade 10 students who have passed Biology.",
        },
        {
          name: "Marine Science Honors", sublabel: "Gr 10–12 · Honors", bg: "#0A3D2E", text: "#fff",
          credits: "1.0 credit",
          prereq: "Biology or Pre-AP Biology (passed) + teacher approval — Grade 10 students who successfully complete Biology may take this course",
          description: "Accelerated marine science with enrichment activities and independent research. Inquiry-based with fieldwork and data analysis. Prerequisite: Biology or Pre-AP Biology + teacher approval. No Chemistry required. Open to Grade 10 students who have passed Biology.",
        },
      ],
      preap: [{
        name: "AP Env Science", sublabel: "Gr 11 \u00b7 AP Fast Track", bg: "#145A32", text: "#fff",
        ap: true, credits: "1.0 credit", fastTrack: true,
        prereq: "Pre-AP Biology and Pre-AP Chemistry (passed)",
        description: "AP Fast Track: Students who completed Pre-AP Biology \u2192 Pre-AP Chemistry take AP Environmental Science in Grade 11. College Board AP course covering scientific principles, environmental issues, and interdisciplinary connections. AP Exam participation required.",
      }],
    },
    elec: { standard: [] },
    g12: { standard: [] },
  },
  phys: {
    g9: {
      standard: [{
        name: "Biology", sublabel: "Grade 9 · Required", bg: "#AED6F1", text: "#1A3A5C",
        mcas: true, credits: "1.0 credit",
        prereq: "Required for all Grade 9 students",
        description: "Comprehensive exploration of living organisms — from biochemistry and cell biology to genetics, evolution, and ecosystems. Aligned to MA state standards and NGSS. Prepares students for the Biology MCAS.",
      }],
      preap: [{
        name: "Pre-AP Biology", sublabel: "Grade 9 · Accelerated", bg: "#2471A3", text: "#fff",
        mcas: true, credits: "1.0 credit", preap: true,
        prereq: "Teacher recommendation",
        description: "Follows the College Board Pre-AP Biology curriculum. Available to students in any track by teacher recommendation. Prepares students for the Biology MCAS and AP-level science.",
      }],
    },
    g10: {
      standard: [{
        name: "Chemistry", sublabel: "Grade 10 · Required", bg: "#F5B7B1", text: "#6E2C00",
        credits: "1.0 credit",
        prereq: "Biology or Pre-AP Biology, and Algebra I (passed)",
        description: "Inquiry-based exploration of matter's properties, atomic structure, chemical reactions, solutions, acids, and bases. Hands-on laboratory work throughout. Prerequisite: Biology or Pre-AP Biology, and Algebra I.",
      }],
      preap: [{
        name: "Pre-AP Chemistry", sublabel: "Grade 10 · Accelerated", bg: "#A93226", text: "#fff",
        credits: "1.0 credit", preap: true,
        prereq: "Pre-AP Biology or Biology, and Algebra I (passed)",
        description: "Follows the College Board Pre-AP Chemistry curriculum. Available to students in any track by teacher recommendation. Prerequisite: Pre-AP Biology or Biology, and Algebra I.",
      }],
    },
    g11: {
      standard: [
        {
          name: "Physics", sublabel: "Gr 11–12", bg: "#4A235A", text: "#fff",
          credits: "1.0 credit",
          prereq: "None specified",
          description: "Covers electricity, motion, forces, energy, and more through real-world applications. Hands-on explorations using math and technology. Includes experimental design and data analysis.",
        },
        {
          name: "AP Physics I", sublabel: "Gr 11–12 · AP", bg: "#1B2A4A", text: "#fff",
          ap: true, credits: "1.0 credit", orAlso: true,
          prereq: "Physics and Algebra II (passed)",
          description: "College Board AP Physics 1. Algebra-based introductory physics covering Newtonian mechanics, fluid mechanics, waves, electricity, and magnetism. AP Exam participation required. Prerequisite: Physics and Algebra II.",
        },
      ],
    },
    elec: { standard: [] },
    g12: { standard: [] },
  },
};

// ─── Electives ────────────────────────────────────────────────────────────────

// Electives grouped by track relevance for the unified column
const LIFE_ELECTIVE_PAIRS: [CourseCard | null, CourseCard | null][] = [
  [
    { name: "Zoology", sublabel: "Gr 11–12 · Elective", bg: "#B7770D", text: "#fff", credits: "0.5 credit", prereq: "Biology or Pre-AP Biology (passed)", description: "Scientific study of animal behavior, structure, physiology, classification, and distribution. Includes simulations, case studies, and hands-on labs focused on wildlife research. No Chemistry required." },
    { name: "Genetics", sublabel: "Gr 11–12 · Elective", bg: "#B7770D", text: "#fff", credits: "0.5 credit", prereq: "Biology and Chemistry (passed)", description: "Explores gene action from molecular to population levels, including Mendelian genetics, DNA technology, genomics, and forensic applications. Addresses legal and ethical dimensions of genetic technology." },
  ],
  [
    { name: "Anatomy & Physiology Hon.", sublabel: "Gr 11–12 · Honors", bg: "#6D4C41", text: "#fff", credits: "1.0 credit", prereq: "Biology, Chemistry, and Algebra I (passed)", description: "Comprehensive introduction to human body structure and function at cellular and organismic levels. Covers all major body systems including cardiovascular, respiratory, nervous, and endocrine. Prerequisite: Biology, Chemistry, and Algebra I." },
    { name: "Sports Medicine", sublabel: "Gr 11–12 · Elective", bg: "#1565C0", text: "#fff", credits: "1.0 credit", prereq: "None specified", description: "Covers injury prevention, first aid, taping techniques, and sports nutrition. Connects science to health and medical careers." },
  ],
  [
    { name: "Foundations in Biotech", sublabel: "Gr 11–12 · Elective", bg: "#BF360C", text: "#fff", credits: "0.5 credit", prereq: "Biology and Chemistry (passed)", description: "Introduces biotechnology lab techniques including gel electrophoresis, restriction enzyme digestion, and scientific record-keeping. Explores ethical issues in applied biotech. Prerequisite: Biology and Chemistry." },
    { name: "Forensic Science", sublabel: "Gr 11–12 · Elective", bg: "#4A0E2E", text: "#fff", credits: "0.5 credit", prereq: "Biology and Chemistry (passed)", description: "Laboratory-oriented course applying genetics, chemistry, and forensic DNA science to criminal problem-solving. Explores modern ethical issues in academic and practical science. Prerequisite: Biology and Chemistry." },
  ],
];

const ENV_ELECTIVE_PAIRS: [CourseCard | null, CourseCard | null][] = [
  [
    { name: "Marine Science", sublabel: "Gr 10–12 · Elective", bg: "#0E6655", text: "#fff", credits: "1.0 credit", prereq: "Biology or Pre-AP Biology (passed)", description: "Comprehensive exploration of ocean physical structure, chemistry, marine life diversity, and ecology. Inquiry-based with laboratory activities. Prerequisite: Biology or Pre-AP Biology. No Chemistry required." },
    { name: "Marine Science Honors", sublabel: "Gr 10–12 · Honors", bg: "#0A3D2E", text: "#fff", credits: "1.0 credit", prereq: "Biology or Pre-AP Biology (passed); teacher approval", description: "Accelerated marine science with enrichment activities and independent research. Inquiry-based with fieldwork and data analysis. Prerequisite: Biology or Pre-AP Biology. No Chemistry required." },
  ],
];

const PHYS_ELECTIVE_PAIRS: [CourseCard | null, CourseCard | null][] = [
  [
    { name: "Earth & Space", sublabel: "Gr 11–12 · Elective", bg: "#784212", text: "#fff", credits: "0.5 credit", prereq: "Biology or Pre-AP Biology (passed)", description: "Focuses on exoplanets, the Solar System, and astronomy through virtual labs and hands-on activities. Aligned with McGraw Hill Exploration curriculum. Prerequisite: Biology or Pre-AP Biology. No Chemistry required." },
    null,
  ],
];

// Combined for mobile/search use
const ELECTIVE_PAIRS: [CourseCard | null, CourseCard | null][] = [
  ...LIFE_ELECTIVE_PAIRS,
  ...ENV_ELECTIVE_PAIRS,
  ...PHYS_ELECTIVE_PAIRS,
];

const LEGEND = [
  { bg: "#AED6F1", label: "Biology", text: "#1A3A5C" },
  { bg: "#2471A3", label: "Pre-AP Biology" },
  { bg: "#F5B7B1", label: "Chemistry", text: "#6E2C00" },
  { bg: "#A93226", label: "Pre-AP Chemistry" },
  { bg: "#6E2C00", label: "AP Chemistry" },
  { bg: "#1E8449", label: "Environmental Science" },
  { bg: "#0B5345", label: "Env AP Fast Track" },
  { bg: "#145A32", label: "AP Env Science" },
  { bg: "#784212", label: "Earth & Space" },
  { bg: "#4A235A", label: "Physics" },
  { bg: "#1B2A4A", label: "AP Physics" },
  { bg: "#1A5276", label: "AP Biology" },
  { bg: "#B7770D", label: "Zoology / Genetics" },
  { bg: "#0E6655", label: "Marine Science" },
  { bg: "#BF360C", label: "Foundations in Biotech" },
  { bg: "#4A0E2E", label: "Forensic Science" },
  { bg: "#6D4C41", label: "Anatomy & Physiology Honors" },
  { bg: "#1565C0", label: "Sports Medicine" },
  { bg: "#717D7E", label: "Biology NC / Env Science NC" },
];

// ─── Card Component ───────────────────────────────────────────────────────────

function CardDetail({ course }: { course: CourseCard }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="rounded-lg px-3 py-2.5 relative w-full cursor-pointer select-none"
        style={{ background: course.bg, color: course.text, boxShadow: open ? "0 4px 16px rgba(0,0,0,0.28)" : "0 2px 8px rgba(0,0,0,0.15)", minHeight: 60, transition: "box-shadow 0.15s" }}
        onClick={() => setOpen(v => !v)}
      >
        {/* Badges top-right */}
        <div className="absolute top-1.5 right-1.5 flex flex-col items-end gap-0.5">
          {course.ap && (
            <span className="font-bold rounded px-1.5 py-0.5" style={{ background: "#F1C40F", color: "#1A3A5C", fontSize: 9, lineHeight: "14px" }}>★ AP</span>
          )}
          {course.preap && !course.ap && (
            <span className="font-bold rounded px-1.5 py-0.5" style={{ background: "#F39C12", color: "#fff", fontSize: 9, lineHeight: "14px" }}>⚡ Pre-AP</span>
          )}
          {course.mcas && (
            <span className="font-bold rounded px-1.5 py-0.5" style={{ background: "#C8102E", color: "#fff", fontSize: 9, lineHeight: "14px" }}>MCAS</span>
          )}
        </div>
        {/* Course name */}
        <div className="font-bold leading-tight pr-10" style={{ fontSize: 13 }}>{course.name}</div>
        {/* Sublabel */}
        <div className="italic mt-0.5 leading-tight" style={{ fontSize: 10.5, opacity: 0.85 }}>{course.sublabel}</div>
        {/* Prereq summary on card face */}
        {course.prereq && (
          <div className="mt-1 leading-snug" style={{ fontSize: 9.5, opacity: 0.80 }}>
            <span style={{ fontWeight: 600 }}>Prereq:</span> {course.prereq.length > 50 ? course.prereq.slice(0, 50) + "…" : course.prereq}
          </div>
        )}
        {/* Credits */}
        {course.credits && <div className="mt-1 leading-tight" style={{ fontSize: 9, opacity: 0.65 }}>{course.credits}</div>}
        {/* Expand hint */}
        <div className="absolute bottom-1 left-2 opacity-30" style={{ fontSize: 9 }}>{open ? "▲" : "▼"}</div>
      </div>
      {open && (
        <div
          className="rounded-b-lg px-3 py-2.5 border-t-0 border-2 w-full"
          style={{ background: "#fff", borderColor: course.bg, borderTopWidth: 0 }}
        >
          <div className="font-bold text-xs mb-1.5" style={{ color: "#1A3A5C", fontSize: 12 }}>{course.name}</div>
          {course.description && <p className="mb-2 leading-relaxed" style={{ color: "#444", fontSize: 11 }}>{course.description}</p>}
          {course.prereq && (
            <div className="rounded px-2 py-1.5 mb-1" style={{ background: "#FEF9E7", color: "#555", fontSize: 11, border: "1px solid #F39C12" }}>
              <span className="font-bold" style={{ color: "#C8102E" }}>Prerequisite: </span>{course.prereq}
            </div>
          )}
          {course.credits && <div style={{ color: "#888", fontSize: 10 }}>Credits: {course.credits}</div>}
        </div>
      )}
    </div>
  );
}

function Arrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: 24 }}>
      <svg width="20" height="10" viewBox="0 0 20 10">
        <line x1="0" y1="5" x2="14" y2="5" stroke={color} strokeWidth="2" strokeOpacity="0.6"/>
        <polygon points="13,1 20,5 13,9" fill={color} fillOpacity="0.6"/>
      </svg>
    </div>
  );
}

// EnvPathwayPanel removed — pathway info is shown directly in the main grid

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CoursePathway() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const matchesSearch = (name: string) =>
    search.trim() === "" || name.toLowerCase().includes(search.toLowerCase());

  return (
    <div style={{ background: "#F8F9FA", minHeight: "100vh", fontFamily: "'Inter','Lato',system-ui,sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#1A3A5C" }} className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#AED6F1" }}>
            New Bedford High School
          </div>
          <h1 className="text-3xl font-black text-white mb-1">Science Department</h1>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#AED6F1" }}>Course Pathway Guide</h2>
          <p className="text-sm" style={{ color: "#D6EAF8" }}>2026–27 School Year</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Quick Stats */}
        <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
          {[
            { value: "19", label: "Total Courses",  color: "#1A3A5C" },
            { value: "4",  label: "AP Courses",     color: "#C8102E" },
            { value: "9",  label: "Electives",      color: "#B7770D" },
            { value: "3",  label: "Science Tracks", color: "#1E8449" },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl px-4 py-3 text-center" style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: `2px solid ${stat.color}22` }}>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: "#666" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How to read + Legend */}
        <div className="rounded-xl px-4 py-3 mb-4" style={{ background: "#fff", border: "1.5px solid #D5D8DC", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: "#1A3A5C" }}>How to Read This Chart</div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "#555" }}>
            All students begin with <strong>Biology</strong> in Grade 9. Choose a track based on interests and career goals.
            Each row = one science track. Each column = a grade level. <strong>Click any card</strong> to see full course description and prerequisites.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5">
              <span className="font-bold rounded px-2 py-0.5 text-xs" style={{ background: "#F1C40F", color: "#1A3A5C" }}>★ AP</span>
              <span className="text-xs" style={{ color: "#555" }}>Advanced Placement — AP exam in May</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold rounded px-2 py-0.5 text-xs" style={{ background: "#F39C12", color: "#fff" }}>⚡ Pre-AP</span>
              <span className="text-xs" style={{ color: "#555" }}>Accelerated — teacher recommendation required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold rounded px-2 py-0.5 text-xs" style={{ background: "#C8102E", color: "#fff" }}>MCAS</span>
              <span className="text-xs" style={{ color: "#555" }}>MCAS-tested content</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "#888" }}>* Flexible ordering — consult counselor</span>
            </div>
          </div>
        </div>

        {/* Search + Track Filter */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border pl-7 pr-3 py-2 text-xs"
              style={{ borderColor: "#D5D8DC", background: "#fff", color: "#333" }}
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              className="text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition-all"
              style={{ background: activeTrack === null ? "#1A3A5C" : "#fff", color: activeTrack === null ? "#fff" : "#1A3A5C", borderColor: "#1A3A5C", fontSize: 11 }}
              onClick={() => setActiveTrack(null)}
            >All</button>
            {TRACKS.map(t => (
              <button
                key={t.id}
                className="text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition-all"
                style={{ background: activeTrack === t.id ? t.accentColor : "#fff", color: activeTrack === t.id ? "#fff" : t.accentColor, borderColor: t.accentColor, fontSize: 11 }}
                onClick={() => setActiveTrack(v => v === t.id ? null : t.id)}
              >{t.icon} {t.label.split(" & ")[0]}</button>
            ))}
          </div>
        </div>

        {/* Mobile View — hidden on desktop */}
        <div className="md:hidden space-y-3">
          {TRACKS.map(track => {
            const show = activeTrack === null || activeTrack === track.id;
            if (!show) return null;
            const rowData = GRID[track.id];

            // Build grade groups for mobile display
            const gradeCourseGroups = GRADE_COLS.filter(c => c.id !== "elec").map(col => {
              const cell = rowData[col.id] || { standard: [] };
              return {
                gradeLabel: col.label,
                standard: cell.standard || [],
                preap: cell.preap || [],
                extra: cell.extra || [],
              };
            });

            return (
              <div key={track.id} className="rounded-xl overflow-hidden border" style={{ borderColor: track.accentColor, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: track.accentColor }}>
                  <span style={{ fontSize: 18 }}>{track.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-white">{track.label}</div>
                    <div className="text-xs text-white opacity-80">{track.careers}</div>
                  </div>
                </div>
                <div className="p-3" style={{ background: track.rowBg }}>
                  {gradeCourseGroups.every(g => g.standard.length === 0 && g.preap.length === 0) ? (
                    <span className="text-xs italic" style={{ color: "#AAA" }}>No required courses — see electives below</span>
                  ) : (
                    gradeCourseGroups.map((group) => (
                      <div key={group.gradeLabel}>
                        {/* Grade label */}
                        <div className="text-xs font-semibold mb-1 mt-1" style={{ color: track.accentColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{group.gradeLabel}</div>
                        {/* Standard courses */}
                        {group.standard.map(card => (
                          <div key={card.name} className="mb-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15 }}>
                            <CardDetail course={card} />
                          </div>
                        ))}
                        {/* OR divider + Pre-AP option */}
                        {group.preap.length > 0 && (
                          <>
                            <div className="flex items-center gap-2 my-1">
                              <div className="flex-1 border-t" style={{ borderColor: track.id === "env" ? "#0B5345" : "#F39C12", borderStyle: "dashed" }} />
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: track.id === "env" ? "#E8F8F5" : "#FEF9E7", color: track.id === "env" ? "#0B5345" : "#B7770D", border: `1px solid ${track.id === "env" ? "#0B5345" : "#F39C12"}` }}>{track.id === "env" ? "⚡ AP Fast Track" : "— OR Pre-AP ⚡ —"}</span>
                              <div className="flex-1 border-t" style={{ borderColor: track.id === "env" ? "#0B5345" : "#F39C12", borderStyle: "dashed" }} />
                            </div>
                            {group.preap.map(card => (
                              <div key={card.name} className="mb-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15 }}>
                                <CardDetail course={card} />
                              </div>
                            ))}
                          </>
                        )}
                        {/* Mobile env track: show standard note for Gr11/Gr12 when standard is empty */}
                        {track.id === "env" && group.standard.length === 0 && group.preap.length === 0 && (group.gradeLabel === "Grade 11" || group.gradeLabel === "Grade 12 AP / Advanced") && (
                          <div className="mt-1 px-2 py-2 rounded-lg" style={{ background: "#F0FFF4", border: "1px dashed #52BE80" }}>
                            <div className="text-xs font-semibold mb-1" style={{ color: "#1E8449", fontSize: 10 }}>🌿 Science Electives</div>
                            {group.gradeLabel === "Grade 11" ? (
                              <div className="flex flex-col gap-1">
                                <span className="inline-block text-xs px-2 py-0.5 rounded-full" style={{ background: "#D5F5E3", color: "#1A5E35", fontSize: 10 }}>Marine Science</span>
                                <span className="inline-block text-xs px-2 py-0.5 rounded-full" style={{ background: "#D5F5E3", color: "#1A5E35", fontSize: 10 }}>Marine Science Honors</span>
                              </div>
                            ) : (
                              <div className="text-xs italic" style={{ color: "#555", fontSize: 10 }}>Open to any science elective based on interest</div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  <div className="mt-1 text-xs italic" style={{ color: "#888" }}>+ Electives open to all tracks (see below)</div>
                </div>
              </div>
            );
          })}
          {/* Mobile Electives */}
          <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: "#B7770D", background: "#FEF9E7" }}>
            <div className="px-4 py-3" style={{ background: "#B7770D" }}>
              <div className="font-bold text-sm text-white">Science Electives</div>
              <div className="text-xs text-white opacity-80">Open to all tracks · Grades 11–12</div>
            </div>
            <div className="p-3">
              {/* Life & Health */}
              <div className="text-xs font-semibold mb-1" style={{ color: "#1A5276", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>🔬 Life &amp; Health Sciences</div>
              <div className="flex flex-col gap-1.5 mb-3">
                {LIFE_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15 }}><CardDetail course={c} /></div>
                ) : null)}
              </div>
              <div className="border-t border-dashed mb-2" style={{ borderColor: "#D4AC0D" }} />
              {/* Environmental */}
              <div className="text-xs font-semibold mb-1" style={{ color: "#1E8449", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>🌿 Environmental &amp; Earth</div>
              <div className="flex flex-col gap-1.5 mb-3">
                {ENV_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15 }}><CardDetail course={c} /></div>
                ) : null)}
              </div>
              <div className="border-t border-dashed mb-2" style={{ borderColor: "#D4AC0D" }} />
              {/* Physical Sciences */}
              <div className="text-xs font-semibold mb-1" style={{ color: "#6C3483", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>⚡ Physical Sciences</div>
              <div className="flex flex-col gap-1.5">
                {PHYS_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15 }}><CardDetail course={c} /></div>
                ) : null)}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Grid — hidden on mobile */}
        <div className="hidden md:block rounded-xl border" style={{ borderColor: "#D5D8DC", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "visible", position: "relative", zIndex: 0 }}>

          {/* Column Headers */}
          <div style={{ display: "grid", gridTemplateColumns: GRID_TEMPLATE }}>
            <div className="py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ background: "#1A3A5C", color: "#AED6F1" }}>
              Interest Area
            </div>
            {GRADE_COLS.map(col => (
              <div key={col.id} className="py-3 px-3 text-center font-bold text-sm border-l" style={{ background: col.headerBg, color: col.headerText, borderColor: "#D5D8DC" }}>
                {col.label}
              </div>
            ))}
          </div>

          {/* Unified Track Grid — single CSS grid so electives column can span all 3 rows */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: GRID_TEMPLATE,
              gridTemplateRows: "auto auto auto",
              alignItems: "stretch",
              borderTop: "1px solid #D5D8DC",
            }}
          >
            {/* Electives column — spans all 3 track rows */}
            <div
              style={{
                gridColumn: 5,
                gridRow: "1 / 4",
                background: "#FFFDE7",
                borderLeft: "1px solid #D5D8DC",
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
                overflowY: "visible",
              }}
            >
              <div className="text-sm font-bold mb-3 text-center" style={{ color: "#7D6608" }}>🌟 Open to All Tracks</div>

              {/* Life & Health Sciences electives */}
              <div className="text-xs font-semibold mb-1 mt-1 px-1" style={{ color: "#1A5276", fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase" }}>🔬 Life &amp; Health</div>
              <div className="flex flex-col gap-2 mb-2">
                {LIFE_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                    <CardDetail course={c} />
                  </div>
                ) : null)}
              </div>

              {/* Divider */}
              <div className="border-t border-dashed my-2" style={{ borderColor: "#D4AC0D" }} />

              {/* Environmental & Earth Sciences electives */}
              <div className="text-xs font-semibold mb-1 px-1" style={{ color: "#1E8449", fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase" }}>🌿 Environmental &amp; Earth</div>
              <div className="flex flex-col gap-2 mb-2">
                {ENV_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                    <CardDetail course={c} />
                  </div>
                ) : null)}
              </div>

              {/* Divider */}
              <div className="border-t border-dashed my-2" style={{ borderColor: "#D4AC0D" }} />

              {/* Physical Sciences electives */}
              <div className="text-xs font-semibold mb-1 px-1" style={{ color: "#6C3483", fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase" }}>⚡ Physical Sciences</div>
              <div className="flex flex-col gap-2">
                {PHYS_ELECTIVE_PAIRS.flat().filter(Boolean).map((c) => c ? (
                  <div key={c.name} style={{ opacity: matchesSearch(c.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                    <CardDetail course={c} />
                  </div>
                ) : null)}
              </div>
            </div>

          {TRACKS.map((track, trackIdx) => {
            const show = activeTrack === null || activeTrack === track.id;
            const rowData = GRID[track.id];
            const gridRow = trackIdx + 1;

            return (
              <React.Fragment key={track.id}>
                {/* Track Label */}
                <div
                  className="flex flex-col justify-center px-4 py-5 border-r border-t transition-all"
                  style={{ borderColor: "#D5D8DC", background: track.rowBg, opacity: show ? 1 : 0.18, gridColumn: 1, gridRow }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span style={{ fontSize: 18 }}>{track.icon}</span>
                    <div className="font-bold text-sm leading-tight" style={{ color: track.accentColor }}>{track.label}</div>
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#666", lineHeight: 1.5 }}>
                    {track.careers.split(" \u00b7 ").map((c, i) => <div key={i}>{c}</div>)}
                  </div>
                </div>
                {/* Grade Cells (columns 2-5, skip elec column 6) */}
                {GRADE_COLS.filter(col => col.id !== "elec").map((col, colIdx) => {
                  const colNum = colIdx + 2; // grid columns 2-5
                  // skip elec col
                  if (col.id === "elec") return null;

                  const cell = rowData[col.id] || { standard: [] };
                  const standardCards = cell.standard || [];
                  const preapCards = cell.preap || [];
                  const extraCards = cell.extra || [];
                  const hasPreap = preapCards.length > 0;
                  const hasExtra = extraCards.length > 0;
                  const nextColWithCards = GRADE_COLS.slice(colIdx + 1).find(nc => nc.id !== "elec" && ((rowData[nc.id]?.standard?.length ?? 0) > 0));

                  // For env track: show "Standard" / "AP Fast Track" labels
                  const isEnvTrack = track.id === "env";

                  return (
                    <div
                      key={col.id}
                      className={`border-l border-t p-3 flex flex-col gap-2 ${isEnvTrack ? "justify-between" : "justify-start"}`}
                      style={{ borderColor: "#D5D8DC", minHeight: 120, gridColumn: colNum, gridRow, background: track.rowBg, opacity: show ? 1 : 0.18, overflow: "hidden", minWidth: 0 }}
                    >
                      {isEnvTrack ? (
                        // ── ENV TRACK: two-section layout so divider always aligns ──
                        <>
                          {/* TOP SECTION: standard content */}
                          <div className="flex flex-col gap-1.5">
                            {standardCards.length > 0 && (
                              <div className="text-xs font-semibold px-1" style={{ color: "#1E8449", fontSize: 9, letterSpacing: "0.04em" }}>📗 Standard</div>
                            )}
                            {standardCards.map((card, idx) => (
                              <div key={card.name} className="flex items-center gap-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                <div className="flex-1"><CardDetail course={card} /></div>
                                {idx === standardCards.length - 1 && nextColWithCards && <Arrow color={card.bg} />}
                              </div>
                            ))}
                            {standardCards.length === 0 && (col.id === "g11" || col.id === "g12") && (
                              <div className="rounded-lg px-2 py-2 w-full" style={{ background: "#F0FFF4", border: "1px dashed #52BE80", overflow: "hidden" }}>
                                <div className="text-xs font-semibold mb-1" style={{ color: "#1E8449", fontSize: 9 }}>🌿 Science Electives</div>
                                {col.id === "g11" ? (
                                  <div className="text-xs leading-snug" style={{ color: "#1A5E35", fontSize: 9 }}>
                                    Students who took Env Science in Gr 10 may take Marine Science or Marine Science Honors
                                  </div>
                                ) : (
                                  <div className="text-xs italic" style={{ color: "#555", fontSize: 9 }}>Take science electives if interested</div>
                                )}
                              </div>
                            )}
                            {standardCards.length === 0 && col.id !== "g11" && col.id !== "g12" && (
                              <span className="text-xs" style={{ color: "#CCC" }}>—</span>
                            )}
                          </div>
                          {/* BOTTOM SECTION: AP Fast Track divider + preap card — only for g9, g10, g11 */}
                          {col.id !== "g12" && (
                            <div className="flex flex-col gap-1.5 mt-auto">
                              <div className="flex items-center gap-1">
                                <div className="flex-1 border-t border-dashed" style={{ borderColor: "#0B5345" }}></div>
                                <span className="text-xs font-semibold px-1 rounded" style={{ color: "#0B5345", background: "#E8F8F5", fontSize: 9, whiteSpace: "nowrap" }}>⚡ AP Fast Track</span>
                                <div className="flex-1 border-t border-dashed" style={{ borderColor: "#0B5345" }}></div>
                              </div>
                              {preapCards.length > 0 ? (
                                preapCards.map((card, idx) => (
                                  <div key={card.name} className="flex items-center gap-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                    <div className="flex-1"><CardDetail course={card} /></div>
                                    {idx === preapCards.length - 1 && nextColWithCards && <Arrow color={card.bg} />}
                                  </div>
                                ))
                              ) : col.id === "g11" ? (
                                <div style={{ opacity: matchesSearch("AP Env Science") ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                  <CardDetail course={{ name: "AP Env Science", sublabel: "Gr 11 \u00b7 AP Fast Track", bg: "#145A32", text: "#fff", ap: true, credits: "1.0 credit", prereq: "Pre-AP Biology and Pre-AP Chemistry (passed)", description: "AP Fast Track: Students who completed Pre-AP Biology \u2192 Pre-AP Chemistry take AP Environmental Science in Grade 11. College Board AP course. AP Exam participation required." }} />
                                </div>
                              ) : (
                                <span className="text-xs text-center" style={{ color: "#AAA" }}>—</span>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        // ── OTHER TRACKS: original layout ──
                        <>
                          {standardCards.length === 0 && !hasPreap ? (
                            <span className="text-xs text-center" style={{ color: "#CCC" }}>—</span>
                          ) : (
                            <>
                              {standardCards.map((card, idx) => (
                                <React.Fragment key={`std-${card.name}-${idx}`}>
                                  {card.orAlso && (
                                    <div className="flex items-center gap-1 my-0.5">
                                      <div className="flex-1 border-t border-dashed" style={{ borderColor: "#1A5276" }}></div>
                                      <span className="text-xs font-semibold px-1 rounded" style={{ color: "#1A5276", background: "#EBF5FB", fontSize: 9, whiteSpace: "nowrap" }}>— or also —</span>
                                      <div className="flex-1 border-t border-dashed" style={{ borderColor: "#1A5276" }}></div>
                                    </div>
                                  )}
                                <div className="flex items-center gap-1 min-w-0" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                    <div className="flex-1 min-w-0"><CardDetail course={card} /></div>
                                    {idx === standardCards.length - 1 && nextColWithCards && <Arrow color={card.bg} />}
                                  </div>
                                </React.Fragment>
                              ))}
                              {hasPreap && (
                                <>
                                  <div className="flex items-center gap-1 my-0.5">
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "#F39C12" }}></div>
                                    <span className="text-xs font-semibold px-1 rounded" style={{ color: "#B7770D", background: "#FEF9E7", fontSize: 9, whiteSpace: "nowrap" }}>⚡ or Pre-AP</span>
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "#F39C12" }}></div>
                                  </div>
                                  {preapCards.map((card, idx) => (
                                    <div key={card.name} className="flex items-center gap-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                      <div className="flex-1"><CardDetail course={card} /></div>
                                      {idx === preapCards.length - 1 && !hasExtra && nextColWithCards && <Arrow color={card.bg} />}
                                    </div>
                                  ))}
                                </>
                              )}
                              {hasExtra && (
                                <>
                                  <div className="flex items-center gap-1 my-0.5">
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "#1A5276" }}></div>
                                    <span className="text-xs font-semibold px-1 rounded" style={{ color: "#1A5276", background: "#EBF5FB", fontSize: 9, whiteSpace: "nowrap" }}>— or also —</span>
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "#1A5276" }}></div>
                                  </div>
                                  {extraCards.map((card) => (
                                    <div key={card.name} className="flex items-center gap-1" style={{ opacity: matchesSearch(card.name) ? 1 : 0.15, transition: "opacity 0.2s" }}>
                                      <div className="flex-1"><CardDetail course={card} /></div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
          </div>
        </div>

        {/* Badge Legend removed — moved to top */}

        {/* Entry Pathway Panel */}
        <div className="mt-6 rounded-xl overflow-hidden" style={{ border: "2px solid #2471A3", boxShadow: "0 4px 16px rgba(36,113,163,0.10)" }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#1A3A5C" }}>
            <span style={{ fontSize: 20 }}>🌐</span>
            <div>
              <div className="font-bold text-white text-sm">Entry Pathway: Biology NC &amp; Environmental Science NC</div>
              <div className="text-xs" style={{ color: "#AED6F1" }}>For students new to English</div>
            </div>
          </div>
          <div className="px-5 py-4" style={{ background: "#EBF5FB" }}>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#1A3A5C" }}>
              Students who are new to English begin with <strong>Biology NC</strong> — the same core science content as Biology, taught with language supports and scaffolds. This course is available at any grade level (9–12).
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#1A3A5C" }}>
              After Biology NC, students may continue with <strong>Environmental Science NC</strong> or transition directly into any of the three science tracks above — Life &amp; Health Sciences, Environmental &amp; Earth Sciences, or Physical Sciences &amp; Engineering — based on their readiness and interests.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: "#fff", border: "1.5px solid #2471A3", color: "#2471A3" }}>
                🔬 Biology NC → Life &amp; Health Sciences
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: "#fff", border: "1.5px solid #1E8449", color: "#1E8449" }}>
                🌿 Biology NC → Environmental &amp; Earth Sciences
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: "#fff", border: "1.5px solid #6C3483", color: "#6C3483" }}>
                ⚡ Biology NC → Physical Sciences &amp; Engineering
              </div>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: "#555" }}>Transition into any track is determined collaboratively by the student, teacher, and counselor based on readiness and goals.</p>
          </div>
        </div>



        {/* Color Legend */}
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1A3A5C" }}>Course Color Legend</h3>
          <div className="flex flex-wrap gap-2">
            {LEGEND.map(item => (
              <div key={item.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: item.bg, color: (item as any).text || "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs py-4 border-t" style={{ color: "#888", borderColor: "#D5D8DC" }}>
          New Bedford High School — Science Department &nbsp;|&nbsp; 2026–27 &nbsp;|&nbsp;
          For questions, contact the Science Department Chair or your school counselor.
        </div>
      </div>
    </div>
  );
}
