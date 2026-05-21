/**
 * NBHS Science Department - Biology OSE Pacing Map
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Typography: Work Sans (headings/UI) + Merriweather (body/notes)
 * Colors: Sidebar #1A1A1A, Accent #B30000, Background #FFFFFF, Gray #F4F4F4
 *
 * Pacing based on:
 * - 2025-26 NBPS District Calendar
 * - OpenSciEd Biology: 5 units, 55 lessons total
 * - MCAS Biology: June 2-3, 2026 → last lesson by May 22
 * - 155 instructional days available
 */

import { useState } from "react";
import { ChevronDown, ChevronRight, Calendar, AlertCircle } from "lucide-react";

// ── Unit definitions ─────────────────────────────────────────────────────────
const UNITS = [
  {
    id: "B1",
    name: "B.1 Ecosystem Interactions & Dynamics",
    shortName: "B.1 Ecosystems",
    drivingQ: "How do ecosystems work, and how can understanding them help us protect them?",
    lessons: 11,
    color: "#1A6B3C",
    lightColor: "#E8F5EE",
    textColor: "#FFFFFF",
  },
  {
    id: "B2",
    name: "B.2 Ecosystems Matter & Energy",
    shortName: "B.2 Matter & Energy",
    drivingQ: "What causes fires in ecosystems to burn and how should we manage them?",
    lessons: 12,
    color: "#1A3A5C",
    lightColor: "#E8F0F8",
    textColor: "#FFFFFF",
  },
  {
    id: "B3",
    name: "B.3 Inheritance & Variation of Traits",
    shortName: "B.3 Inheritance",
    drivingQ: "Who gets cancer and why?",
    lessons: 12,
    color: "#6B1A5C",
    lightColor: "#F5E8F3",
    textColor: "#FFFFFF",
  },
  {
    id: "B4",
    name: "B.4 Natural Selection & Evolution",
    shortName: "B.4 Evolution",
    drivingQ: "How does urbanization affect nonhuman populations, and how can we minimize harmful effects?",
    lessons: 11,
    color: "#B5451B",
    lightColor: "#FBF0EC",
    textColor: "#FFFFFF",
  },
  {
    id: "B5",
    name: "B.5 Common Ancestry & Speciation",
    shortName: "B.5 Speciation",
    drivingQ: "What will happen to Arctic bear populations as their environment changes?",
    lessons: 9,
    color: "#5C4A1A",
    lightColor: "#F5F0E8",
    textColor: "#FFFFFF",
  },
];

// ── Lesson titles — aligned with OpenSciEd Biology & MCAS standards ──────────
// B.2 L11: swapped from body systems → Energy Flow & the 10% Rule (HS-LS2-4, Q5 scored 40%)
// B.3 L11: swapped from body systems → DNA/Amino Acid Sequences & Species Relatedness (HS-LS1-1/LS4-1, Q10 scored 17%)
const LESSON_TITLES: Record<string, Record<number, { title: string; std: string; mcasFlag?: boolean }>> = {
  B1: {
    1:  { title: "Ecosystem Roles: Producers, Consumers & Decomposers", std: "HS-LS2-1" },
    2:  { title: "Food Webs & Trophic Levels", std: "HS-LS2-1" },
    3:  { title: "Symbiotic Relationships: Mutualism, Commensalism, Parasitism", std: "HS-LS2-1", mcasFlag: true },
    4:  { title: "Population Dynamics & Carrying Capacity", std: "HS-LS2-1", mcasFlag: true },
    5:  { title: "Predator-Prey Relationships & Trophic Cascades", std: "HS-LS2-6" },
    6:  { title: "Abiotic & Biotic Factors Shaping Ecosystems", std: "HS-LS2-2" },
    7:  { title: "Invasive Species & Competition for Resources", std: "HS-LS2-6", mcasFlag: true },
    8:  { title: "Ecosystem Disruption & Biodiversity Loss", std: "HS-LS2-6" },
    9:  { title: "Human Impacts on Ecosystems", std: "HS-LS2-7" },
    10: { title: "Ecosystem Stability & Resilience", std: "HS-LS2-2" },
    11: { title: "Unit B.1 Synthesis & Assessment", std: "HS-LS2-1/2/6" },
  },
  B2: {
    1:  { title: "Matter & Energy in Living Systems", std: "HS-LS1-7" },
    2:  { title: "Photosynthesis: Capturing Solar Energy", std: "HS-LS1-5", mcasFlag: true },
    3:  { title: "Cellular Respiration: Releasing Chemical Energy (ATP)", std: "HS-LS1-7", mcasFlag: true },
    4:  { title: "Comparing Photosynthesis & Cellular Respiration", std: "HS-LS1-5/1-7", mcasFlag: true },
    5:  { title: "Organic Macromolecules: Carbohydrates, Lipids, Proteins", std: "HS-LS1-6", mcasFlag: true },
    6:  { title: "Macromolecule Functions & Nutrient Cycling", std: "HS-LS1-6" },
    7:  { title: "Carbon Cycle: Photosynthesis, Respiration & Decomposition", std: "HS-LS2-3", mcasFlag: true },
    8:  { title: "Nitrogen & Phosphorus Cycles", std: "HS-LS2-3" },
    9:  { title: "Fire Ecology: Matter & Energy in Combustion", std: "HS-LS2-3" },
    10: { title: "Energy Pyramids & Biomass Across Trophic Levels", std: "HS-LS2-4", mcasFlag: true },
    11: { title: "Energy Flow & the 10% Rule ★ MCAS Priority", std: "HS-LS2-4", mcasFlag: true },
    12: { title: "Unit B.2 Synthesis & Assessment", std: "HS-LS2-3/2-4" },
  },
  B3: {
    1:  { title: "DNA Structure: Nucleotides, Base Pairing & the Double Helix", std: "HS-LS3-1", mcasFlag: true },
    2:  { title: "DNA Replication & Cell Division", std: "HS-LS1-4", mcasFlag: true },
    3:  { title: "Transcription: DNA → mRNA", std: "HS-LS1-1", mcasFlag: true },
    4:  { title: "Translation: mRNA → Protein Using the Codon Chart", std: "HS-LS1-1", mcasFlag: true },
    5:  { title: "Mutations: Types, Causes & Effects on Proteins", std: "HS-LS3-2", mcasFlag: true },
    6:  { title: "Dominant & Recessive Inheritance: Punnett Squares", std: "HS-LS3-3", mcasFlag: true },
    7:  { title: "Complex Inheritance: Incomplete Dominance & Codominance", std: "HS-LS3-3" },
    8:  { title: "Pedigree Analysis & Carrier Status", std: "HS-LS3-3", mcasFlag: true },
    9:  { title: "Meiosis: Chromosome Separation & Genetic Variation", std: "HS-LS3-2", mcasFlag: true },
    10: { title: "Crossing Over, Independent Assortment & Genetic Diversity", std: "HS-LS3-2" },
    11: { title: "Comparing DNA & Amino Acid Sequences to Determine Species Relatedness ★ MCAS Priority", std: "HS-LS1-1 / HS-LS4-1", mcasFlag: true },
    12: { title: "Unit B.3 Synthesis & Assessment", std: "HS-LS3-1/2/3" },
  },
  B4: {
    1:  { title: "Variation in Populations: Heritable vs. Environmental Traits", std: "HS-LS3-4", mcasFlag: true },
    2:  { title: "Natural Selection: Four Conditions", std: "HS-LS4-4", mcasFlag: true },
    3:  { title: "Rock Pocket Mice: A Case Study in Natural Selection", std: "HS-LS4-4", mcasFlag: true },
    4:  { title: "Antibiotic Resistance: Natural Selection in Real Time", std: "HS-LS4-4", mcasFlag: true },
    5:  { title: "Allele Frequencies & Hardy-Weinberg Equilibrium", std: "HS-LS4-2", mcasFlag: true },
    6:  { title: "Directional, Stabilizing & Disruptive Selection", std: "HS-LS4-2" },
    7:  { title: "Adaptations: Structural, Behavioral & Physiological", std: "HS-LS4-4" },
    8:  { title: "Genetic Drift, Bottleneck & Founder Effect", std: "HS-LS4-2" },
    9:  { title: "Geographic Isolation & Allopatric Speciation", std: "HS-LS4-5", mcasFlag: true },
    10: { title: "Reproductive Isolation & Speciation Mechanisms", std: "HS-LS4-5", mcasFlag: true },
    11: { title: "Unit B.4 Synthesis & Assessment", std: "HS-LS4-2/4/5" },
  },
  B5: {
    1:  { title: "Evidence for Evolution: Fossil Record & Comparative Anatomy", std: "HS-LS4-1", mcasFlag: true },
    2:  { title: "Vestigial Structures & Homologous Structures", std: "HS-LS4-1", mcasFlag: true },
    3:  { title: "Molecular Evidence: DNA & Protein Sequence Comparisons Across Species", std: "HS-LS4-1", mcasFlag: true },
    4:  { title: "Cladograms & Phylogenetic Trees: Reading Evolutionary Relationships", std: "HS-LS4-1", mcasFlag: true },
    5:  { title: "Common Ancestry & Divergent Evolution", std: "HS-LS4-1" },
    6:  { title: "Arctic Bears: Applying Evolution to Conservation", std: "HS-LS4-5" },
    7:  { title: "MCAS Review: LS1 — Molecules, Cells & Protein Synthesis", std: "HS-LS1-1/4/6/7", mcasFlag: true },
    8:  { title: "MCAS Review: LS2 & LS3 — Ecosystems, Heredity & Genetics", std: "HS-LS2/LS3", mcasFlag: true },
    9:  { title: "MCAS Review: LS4 — Evolution, Natural Selection & Evidence", std: "HS-LS4-1/2/4/5", mcasFlag: true },
  },
};

// ── Full lesson-to-date mapping (computed from pacing_calc.py) ────────────────
const LESSONS: { unit: string; lesson: number; start: string; end: string; days: number }[] = [
  // B.1 — 11 lessons × 3 days = 33 days (Aug 27 – Oct 14)
  { unit: "B1", lesson: 1,  start: "2025-08-27", end: "2025-08-29", days: 3 },
  { unit: "B1", lesson: 2,  start: "2025-09-02", end: "2025-09-04", days: 3 },
  { unit: "B1", lesson: 3,  start: "2025-09-05", end: "2025-09-09", days: 3 },
  { unit: "B1", lesson: 4,  start: "2025-09-10", end: "2025-09-12", days: 3 },
  { unit: "B1", lesson: 5,  start: "2025-09-15", end: "2025-09-17", days: 3 },
  { unit: "B1", lesson: 6,  start: "2025-09-18", end: "2025-09-22", days: 3 },
  { unit: "B1", lesson: 7,  start: "2025-09-23", end: "2025-09-25", days: 3 },
  { unit: "B1", lesson: 8,  start: "2025-09-26", end: "2025-09-30", days: 3 },
  { unit: "B1", lesson: 9,  start: "2025-10-01", end: "2025-10-03", days: 3 },
  { unit: "B1", lesson: 10, start: "2025-10-06", end: "2025-10-08", days: 3 },
  { unit: "B1", lesson: 11, start: "2025-10-09", end: "2025-10-14", days: 3 },
  // B.2 — 12 lessons × 3 days = 36 days (Oct 15 – Dec 11)
  { unit: "B2", lesson: 1,  start: "2025-10-15", end: "2025-10-17", days: 3 },
  { unit: "B2", lesson: 2,  start: "2025-10-20", end: "2025-10-23", days: 3 },
  { unit: "B2", lesson: 3,  start: "2025-10-24", end: "2025-10-28", days: 3 },
  { unit: "B2", lesson: 4,  start: "2025-10-29", end: "2025-10-31", days: 3 },
  { unit: "B2", lesson: 5,  start: "2025-11-03", end: "2025-11-06", days: 3 },
  { unit: "B2", lesson: 6,  start: "2025-11-07", end: "2025-11-12", days: 3 },
  { unit: "B2", lesson: 7,  start: "2025-11-13", end: "2025-11-17", days: 3 },
  { unit: "B2", lesson: 8,  start: "2025-11-18", end: "2025-11-20", days: 3 },
  { unit: "B2", lesson: 9,  start: "2025-11-21", end: "2025-11-25", days: 3 },
  { unit: "B2", lesson: 10, start: "2025-12-01", end: "2025-12-03", days: 3 },
  { unit: "B2", lesson: 11, start: "2025-12-04", end: "2025-12-08", days: 3 },
  { unit: "B2", lesson: 12, start: "2025-12-09", end: "2025-12-11", days: 3 },
  // B.3 — 12 lessons × 3 days = 36 days (Dec 12 – Mar 4, spanning winter break & snow days)
  { unit: "B3", lesson: 1,  start: "2025-12-12", end: "2025-12-16", days: 3 },
  { unit: "B3", lesson: 2,  start: "2025-12-17", end: "2025-12-19", days: 3 },
  { unit: "B3", lesson: 3,  start: "2026-01-05", end: "2026-01-07", days: 3 },
  { unit: "B3", lesson: 4,  start: "2026-01-08", end: "2026-01-12", days: 3 },
  { unit: "B3", lesson: 5,  start: "2026-01-13", end: "2026-01-15", days: 3 },
  { unit: "B3", lesson: 6,  start: "2026-01-16", end: "2026-01-21", days: 3 },
  { unit: "B3", lesson: 7,  start: "2026-01-22", end: "2026-01-28", days: 3 },
  { unit: "B3", lesson: 8,  start: "2026-01-29", end: "2026-02-02", days: 3 },
  { unit: "B3", lesson: 9,  start: "2026-02-03", end: "2026-02-05", days: 3 },
  { unit: "B3", lesson: 10, start: "2026-02-06", end: "2026-02-10", days: 3 },
  { unit: "B3", lesson: 11, start: "2026-02-11", end: "2026-02-13", days: 3 },
  { unit: "B3", lesson: 12, start: "2026-03-02", end: "2026-03-04", days: 3 },
  // B.4 — 11 lessons × 3 days = 33 days (Mar 5 – Apr 29)
  { unit: "B4", lesson: 1,  start: "2026-03-05", end: "2026-03-10", days: 3 },
  { unit: "B4", lesson: 2,  start: "2026-03-11", end: "2026-03-13", days: 3 },
  { unit: "B4", lesson: 3,  start: "2026-03-16", end: "2026-03-18", days: 3 },
  { unit: "B4", lesson: 4,  start: "2026-03-19", end: "2026-03-23", days: 3 },
  { unit: "B4", lesson: 5,  start: "2026-03-24", end: "2026-03-26", days: 3 },
  { unit: "B4", lesson: 6,  start: "2026-03-27", end: "2026-03-31", days: 3 },
  { unit: "B4", lesson: 7,  start: "2026-04-01", end: "2026-04-06", days: 3 },
  { unit: "B4", lesson: 8,  start: "2026-04-07", end: "2026-04-09", days: 3 },
  { unit: "B4", lesson: 9,  start: "2026-04-10", end: "2026-04-14", days: 3 },
  { unit: "B4", lesson: 10, start: "2026-04-15", end: "2026-04-17", days: 3 },
  { unit: "B4", lesson: 11, start: "2026-04-27", end: "2026-04-29", days: 3 },
  // B.5 — 9 lessons, mixed 2-3 days = 23 days (Apr 30 – May 22)
  { unit: "B5", lesson: 1,  start: "2026-04-30", end: "2026-05-04", days: 3 },
  { unit: "B5", lesson: 2,  start: "2026-05-05", end: "2026-05-06", days: 2 },
  { unit: "B5", lesson: 3,  start: "2026-05-07", end: "2026-05-11", days: 3 },
  { unit: "B5", lesson: 4,  start: "2026-05-12", end: "2026-05-13", days: 2 },
  { unit: "B5", lesson: 5,  start: "2026-05-14", end: "2026-05-18", days: 3 },
  { unit: "B5", lesson: 6,  start: "2026-05-19", end: "2026-05-20", days: 2 },
  { unit: "B5", lesson: 7,  start: "2026-05-21", end: "2026-05-22", days: 2 },
];

// ── Month groups for the visual calendar ─────────────────────────────────────
const MONTHS = [
  { key: "2025-08", label: "Aug", year: "2025", short: "Aug '25" },
  { key: "2025-09", label: "Sep", year: "2025", short: "Sep '25" },
  { key: "2025-10", label: "Oct", year: "2025", short: "Oct '25" },
  { key: "2025-11", label: "Nov", year: "2025", short: "Nov '25" },
  { key: "2025-12", label: "Dec", year: "2025", short: "Dec '25" },
  { key: "2026-01", label: "Jan", year: "2026", short: "Jan '26" },
  { key: "2026-02", label: "Feb", year: "2026", short: "Feb '26" },
  { key: "2026-03", label: "Mar", year: "2026", short: "Mar '26" },
  { key: "2026-04", label: "Apr", year: "2026", short: "Apr '26" },
  { key: "2026-05", label: "May", year: "2026", short: "May '26" },
];

// ── Holidays/breaks to show on the timeline (from 2025-26 NBPS District Calendar) ──
const BREAKS: { label: string; month: string; start: string; end: string; type: "holiday" | "break" }[] = [
  { label: "Labor Day",          month: "2025-09", start: "2025-09-01", end: "2025-09-01", type: "holiday" },
  { label: "Columbus Day",       month: "2025-10", start: "2025-10-13", end: "2025-10-13", type: "holiday" },
  { label: "Thanksgiving Break", month: "2025-11", start: "2025-11-27", end: "2025-11-28", type: "break" },
  { label: "Winter Break",       month: "2025-12", start: "2025-12-22", end: "2025-12-31", type: "break" },
  { label: "New Year / Winter Break", month: "2026-01", start: "2026-01-01", end: "2026-01-02", type: "break" },
  { label: "MLK Day",            month: "2026-01", start: "2026-01-19", end: "2026-01-19", type: "holiday" },
  { label: "Snow Days",          month: "2026-01", start: "2026-01-26", end: "2026-01-27", type: "holiday" },
  { label: "February Break",     month: "2026-02", start: "2026-02-16", end: "2026-02-20", type: "break" },
  { label: "Snow Days",          month: "2026-02", start: "2026-02-23", end: "2026-02-27", type: "holiday" },
  { label: "Staff PD Day",       month: "2026-03", start: "2026-03-09", end: "2026-03-09", type: "holiday" },
  { label: "April 3 Holiday",    month: "2026-04", start: "2026-04-03", end: "2026-04-03", type: "holiday" },
  { label: "Spring Break",       month: "2026-04", start: "2026-04-20", end: "2026-04-24", type: "break" },
  { label: "Memorial Day",       month: "2026-05", start: "2026-05-25", end: "2026-05-25", type: "holiday" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getMonthKey(dateStr: string) {
  return dateStr.substring(0, 7);
}

export default function BiologyPacingMap() {
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set(["2025-08", "2025-09"]));
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleUnit = (id: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Group lessons by month (by start date)
  const lessonsByMonth: Record<string, typeof LESSONS> = {};
  for (const l of LESSONS) {
    const mk = getMonthKey(l.start);
    if (!lessonsByMonth[mk]) lessonsByMonth[mk] = [];
    lessonsByMonth[mk].push(l);
  }

  // Compute unit day totals for the year-at-a-glance bar
  const totalDays = 155;
  const unitDays: Record<string, number> = { B1: 33, B2: 36, B3: 36, B4: 33, B5: 17 };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-4 border-b" style={{ borderColor: "#E8E8E8" }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-[22px] font-black mb-1" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>
              Biology OSE Pacing Map
            </h2>
            <p className="text-[13px]" style={{ color: "#888", fontFamily: "'Merriweather', serif" }}>
              2025–26 · OpenSciEd Biology · 5 Units · 55 Lessons · 155 Instructional Days
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold" style={{ backgroundColor: "#FFF5F5", color: "#B30000", border: "1px solid #FFCCCC", fontFamily: "'Work Sans', sans-serif" }}>
            <AlertCircle size={12} />
            MCAS Bio: Jun 2–3 · Last lesson by May 22
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-5">

        {/* ── Year-at-a-Glance Bar ─────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>
            Year at a Glance
          </div>
          <div className="flex w-full overflow-hidden" style={{ height: "44px", borderRadius: "2px" }}>
            {UNITS.map((u) => {
              const pct = ((unitDays[u.id] || 0) / totalDays) * 100;
              return (
                <div
                  key={u.id}
                  className="flex items-center justify-center overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                  style={{ width: `${pct}%`, backgroundColor: u.color, minWidth: "30px" }}
                  title={`${u.shortName} — ${u.lessons} lessons`}
                  onClick={() => toggleUnit(u.id)}
                >
                  <span className="text-[10px] font-black px-1 text-center leading-tight hidden sm:block" style={{ color: u.textColor, fontFamily: "'Work Sans', sans-serif" }}>
                    {u.id}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Month labels under bar */}
          <div className="flex w-full mt-1">
            {MONTHS.map((m) => (
              <div key={m.key} className="flex-1 text-center text-[9px] font-bold uppercase tracking-wide" style={{ color: "#AAA", fontFamily: "'Work Sans', sans-serif" }}>
                {m.label}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-3">
            {UNITS.map((u) => (
              <div key={u.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: u.color }} />
                <span className="text-[11px] font-semibold" style={{ color: "#555", fontFamily: "'Work Sans', sans-serif" }}>
                  {u.shortName} <span style={{ color: "#AAA" }}>({u.lessons} lessons)</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Unit Summary Cards ───────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>
            Unit Overview
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {UNITS.map((u) => {
              const unitLessons = LESSONS.filter((l) => l.unit === u.id);
              const firstLesson = unitLessons[0];
              const lastLesson = unitLessons[unitLessons.length - 1];
              return (
                <div
                  key={u.id}
                  className="p-3 cursor-pointer transition-all hover:shadow-sm"
                  style={{ backgroundColor: u.lightColor, borderLeft: `4px solid ${u.color}` }}
                  onClick={() => toggleUnit(u.id)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: u.color, fontFamily: "'Work Sans', sans-serif" }}>
                      {u.id}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: u.color, fontFamily: "'Work Sans', sans-serif" }}>
                      {u.lessons} lessons
                    </span>
                  </div>
                  <div className="text-[12px] font-bold mb-1 leading-tight" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                    {u.name.replace(u.id + " ", "")}
                  </div>
                  <div className="text-[11px] italic mb-2 leading-snug" style={{ color: "#666", fontFamily: "'Merriweather', serif" }}>
                    "{u.drivingQ}"
                  </div>
                  {firstLesson && lastLesson && (
                    <div className="text-[10px] font-semibold" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>
                      {formatDate(firstLesson.start)} – {formatDate(lastLesson.end)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Month-by-Month Lesson Map ────────────────────────────────────── */}
        <div>
          <div className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>
            Month-by-Month Lesson Map
          </div>

          <div className="space-y-1">
            {MONTHS.map((m) => {
              const monthLessons = lessonsByMonth[m.key] || [];
              if (monthLessons.length === 0) return null;
              const isExpanded = expandedMonths.has(m.key);
              const monthBreaks = BREAKS.filter((b) => b.month === m.key);

              // Get unique units in this month for color strip
              const unitsInMonth = Array.from(new Set(monthLessons.map((l) => l.unit)));

              return (
                <div key={m.key} style={{ border: "1px solid #E8E8E8" }}>
                  {/* Month header row */}
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    onClick={() => toggleMonth(m.key)}
                  >
                    {/* Color strip showing which units are in this month */}
                    <div className="flex gap-0.5 flex-shrink-0">
                      {unitsInMonth.map((uid) => {
                        const u = UNITS.find((x) => x.id === uid);
                        return u ? (
                          <div key={uid} className="w-2 h-6" style={{ backgroundColor: u.color }} title={u.shortName} />
                        ) : null;
                      })}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-black" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                          {m.label} {m.year}
                        </span>
                        <span className="text-[11px] font-semibold" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>
                          {monthLessons.length} lesson{monthLessons.length !== 1 ? "s" : ""}
                        </span>
                        {monthBreaks.length > 0 && (
                          <span className="text-[10px] font-semibold italic" style={{ color: "#AAA", fontFamily: "'Merriweather', serif" }}>
                            incl. {monthBreaks.map((b) => b.label).join(", ")}
                          </span>
                        )}
                      </div>
                      {/* Mini unit summary for this month */}
                      <div className="text-[10px] mt-0.5" style={{ color: "#AAA", fontFamily: "'Work Sans', sans-serif" }}>
                        {unitsInMonth.map((uid) => {
                          const u = UNITS.find((x) => x.id === uid);
                          const count = monthLessons.filter((l) => l.unit === uid).length;
                          return u ? `${u.id} (${count}L)` : "";
                        }).join(" · ")}
                      </div>
                    </div>

                    <div className="flex-shrink-0" style={{ color: "#AAA" }}>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </button>

                  {/* Expanded lesson rows */}
                  {isExpanded && (
                    <div style={{ borderTop: "1px solid #E8E8E8" }}>
                      {/* School break separator rows */}
                      {monthBreaks.map((b) => {
                        const isSingleDay = b.start === b.end;
                        const bgColor = b.type === "break" ? "#FFF3E0" : "#FFF8F0";
                        const borderColor = b.type === "break" ? "#FFD180" : "#FFE0B2";
                        const accentColor = b.type === "break" ? "#E65100" : "#BF6000";
                        const dotColor = b.type === "break" ? "#FF6D00" : "#F0A500";
                        return (
                          <div
                            key={`${b.label}-${b.start}`}
                            className="flex items-center gap-3 px-4 py-2.5"
                            style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderColor}` }}
                          >
                            <div className="w-2.5 h-2.5 flex-shrink-0" style={{ backgroundColor: dotColor, borderRadius: "2px" }} />
                            <div
                              className="flex-shrink-0 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                              style={{ backgroundColor: dotColor, color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif", minWidth: "52px", textAlign: "center" }}
                            >
                              {b.type === "break" ? "BREAK" : "HOLIDAY"}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar size={11} style={{ color: accentColor }} />
                              <span className="text-[12px] font-bold" style={{ color: accentColor, fontFamily: "'Work Sans', sans-serif" }}>
                                {isSingleDay ? formatDate(b.start) : `${formatDate(b.start)} – ${formatDate(b.end)}`}
                              </span>
                            </div>
                            <div className="flex-1 text-[12px] font-semibold" style={{ color: accentColor, fontFamily: "'Work Sans', sans-serif" }}>
                              {b.label}
                            </div>
                            <div className="text-[10px] italic flex-shrink-0" style={{ color: "#BBA070", fontFamily: "'Merriweather', serif" }}>
                              No school
                            </div>
                          </div>
                        );
                      })}
                      {monthLessons.map((l, idx) => {
                        const u = UNITS.find((x) => x.id === l.unit)!;
                        const lessonInfo = LESSON_TITLES[l.unit]?.[l.lesson];
                        const isMcasPriority = lessonInfo?.mcasFlag;
                        return (
                          <div
                            key={`${l.unit}-${l.lesson}`}
                            className="flex items-center gap-3 px-4 py-2.5"
                            style={{
                              backgroundColor: isMcasPriority
                                ? (idx % 2 === 0 ? "#FFFDF0" : "#FFFBEB")
                                : (idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF"),
                              borderTop: "1px solid #F0F0F0",
                            }}
                          >
                            {/* Unit color dot */}
                            <div className="w-2.5 h-2.5 flex-shrink-0" style={{ backgroundColor: u.color }} />

                            {/* Unit + Lesson badge */}
                            <div
                              className="flex-shrink-0 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                              style={{ backgroundColor: u.color, color: u.textColor, fontFamily: "'Work Sans', sans-serif", minWidth: "52px", textAlign: "center" }}
                            >
                              {u.id} L{l.lesson}
                            </div>

                            {/* Dates */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar size={11} style={{ color: "#AAA" }} />
                              <span className="text-[12px] font-semibold" style={{ color: "#555", fontFamily: "'Work Sans', sans-serif" }}>
                                {formatDate(l.start)}
                                {l.start !== l.end ? ` – ${formatDate(l.end)}` : ""}
                              </span>
                            </div>

                            {/* Days */}
                            <div className="text-[10px] font-bold flex-shrink-0" style={{ color: "#AAA", fontFamily: "'Work Sans', sans-serif" }}>
                              {l.days}d
                            </div>

                            {/* Lesson title */}
                            <div className="flex-1 min-w-0">
                              {lessonInfo ? (
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[12px] font-semibold leading-snug" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                                    {lessonInfo.title}
                                  </span>
                                  <span className="text-[10px] font-mono flex-shrink-0" style={{ color: "#AAA" }}>
                                    {lessonInfo.std}
                                  </span>
                                  {isMcasPriority && (
                                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0" style={{ backgroundColor: "#B30000", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
                                      MCAS
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-[11px]" style={{ color: "#888", fontFamily: "'Merriweather', serif" }}>
                                  {u.name}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer note ─────────────────────────────────────────────────── */}
        <div className="mt-6 p-3 border-l-4" style={{ borderColor: "#B30000", backgroundColor: "#FFF5F5" }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}>
            Pacing Notes
          </div>
          <div className="text-[12px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color: "#555" }}>
            This pacing guide is based on the <strong>2025–26 NBPS District Calendar</strong> with <strong>155 instructional days</strong> (Aug 27 – May 22). All 5 OpenSciEd Biology units are paced at approximately <strong>3 days per lesson</strong> for Units B.1–B.4; Unit B.5 uses a compressed 2–3 day schedule to meet the MCAS deadline. Lessons marked <strong style={{ color: "#B30000" }}>MCAS</strong> are directly tested on the Massachusetts Biology MCAS. <strong>B.2 L11</strong> (Energy Flow &amp; the 10% Rule) and <strong>B.3 L11</strong> (DNA/Amino Acid Sequence Comparisons) replace non-MCAS body system content based on 2025–26 benchmark data. Dates are estimates — adjust for snow days, assemblies, and flex days as needed.
          </div>
        </div>

      </div>
    </div>
  );
}
