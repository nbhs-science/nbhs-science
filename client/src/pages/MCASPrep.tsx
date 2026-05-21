/*
 * MCAS Biology Page
 * Tab 1: Question Bank (MCASViewer)
 * Tab 2: Results Analysis (4-year MCAS item-by-item data with charts)
 * Tab 3: Benchmark 2025-26 (BOY/Q1/Q2 benchmark analysis vs MCAS historical data)
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, BarController, LineElement, LineController, PointElement, Tooltip, Legend);
import { FileText, ExternalLink, ChevronDown, ChevronUp, Link2, Key, BarChart2, BookOpen, AlertTriangle, TrendingDown, TrendingUp, Info, Activity, Target, Zap, Calendar, Download, GraduationCap, FlaskConical, Dna, Leaf, Atom } from "lucide-react";
import MCASViewer from "@/components/MCASViewer";
import MCASPracticeViewer from "@/components/MCASPracticeViewer";
import { MCAS_PRACTICE_STRANDS } from "@/lib/mcasPracticeData";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

const YEAR_GROUPS = [
  {
    year: "2024",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fde68a",
    items: [
      { label: "MCAS Biology Test", url: `${CDN}/BIOLOGYMCAS2024_446232ff.pdf`, type: "test" },
      { label: "Released Items & Answer Key", url: `${CDN}/MCAS_2024_STE_released-items_epat_Bio_update(1)_18d33487.pdf`, type: "key" },
    ],
  },
  {
    year: "2025",
    color: "#047857",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    items: [
      { label: "MCAS Biology Test", url: `${CDN}/BiologyMCAS2025_edb6c374.pdf`, type: "test" },
      { label: "Answer Key", url: `${CDN}/2025-Bio-PBT-Practice-Test-answer-key_ADA_f9f961bc.pdf`, type: "key" },
    ],
  },
  {
    year: "2026 Practice",
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    items: [
      { label: "Practice Test", url: `${CDN}/BIOLOGYMCASDESEPRACTICETEST2026_1396fc75.pdf`, type: "test" },
      { label: "Answer Key", url: `${CDN}/2025-Bio-PBT-Practice-Test-answer-key_ADA_36771a86.pdf`, type: "key" },
    ],
  },
];

const CANVA_DECK = {
  title: "MCAS Biology Bootcamp Deck",
  description: "Student review slide deck covering all four reporting categories with practice questions and key vocabulary.",
  url: "https://www.canva.com/design/DAFiqK-ycWM/x38kkyBXwh-ZsB5K2x_jPQ/edit",
  color: "#7c3aed",
  bg: "#f5f3ff",
  border: "#ddd6fe",
};

// ── Results Analysis Data ────────────────────────────────────────────────────

const ENROLLMENT = [
  { year: "2022", nbhs: 559 },
  { year: "2023", nbhs: 661 },
  { year: "2024", nbhs: 641 },
  { year: "2025", nbhs: 559 },
];

// Priority standards: avg NBHS % across items in that standard, vs state avg
const PRIORITY_STANDARDS = [
  {
    code: "HS.LS.1.5 / 1.7",
    topic: "Cellular Respiration & Photosynthesis",
    category: "MO",
    nbhs2022: 12, nbhs2023: 21, nbhs2024: 15, nbhs2025: 16,
    state2022: 30, state2023: 44, state2024: 37, state2025: 34,
    trend: "down",
  },
  {
    code: "HS.LS.1.6",
    topic: "Organic Macromolecules",
    category: "MO",
    nbhs2022: 27, nbhs2023: 22, nbhs2024: 21, nbhs2025: 28,
    state2022: 53, state2023: 37, state2024: 42, state2025: 48,
    trend: "flat",
  },
  {
    code: "HS.LS.1.1",
    topic: "Protein Synthesis & Transcription",
    category: "MO",
    nbhs2022: 15, nbhs2023: 44, nbhs2024: 24, nbhs2025: 25,
    state2022: 35, state2023: 59, state2024: 38, state2025: 52,
    trend: "down",
  },
  {
    code: "HS.LS.3.1–3.3",
    topic: "Heredity: Meiosis, Punnett Squares, Pedigrees",
    category: "HE",
    nbhs2022: 28, nbhs2023: 29, nbhs2024: 26, nbhs2025: 24,
    state2022: 47, state2023: 52, state2024: 45, state2025: 43,
    trend: "down",
  },
  {
    code: "HS.LS.4.2",
    topic: "Evolution: Allele Frequencies & Natural Selection",
    category: "EV",
    nbhs2022: 24, nbhs2023: 19, nbhs2024: 32, nbhs2025: 22,
    state2022: 47, state2023: 41, state2024: 43, state2025: 42,
    trend: "flat",
  },
  {
    code: "CR Items (all)",
    topic: "Multi-Point Constructed Response",
    category: "CR",
    nbhs2022: 21, nbhs2023: 18, nbhs2024: 22, nbhs2025: 19,
    state2022: 43, state2023: 40, state2024: 46, state2025: 41,
    trend: "down",
  },
];

const STRENGTHS = [
  { topic: "Ecology: Symbiotic Relationships & Mutualism", code: "HS.LS.2.1/2.7", nbhs: "56–74%", state: "64–84%" },
  { topic: "Genetics: Identifying Genetic vs. Environmental Factors", code: "HS.LS.3.4", nbhs: "55–80%", state: "62–88%" },
  { topic: "Body Systems: Mutations Affecting Organ Systems", code: "HS.LS.1.2", nbhs: "57–63%", state: "70–79%" },
  { topic: "Ecology: Carrying Capacity & Population Changes", code: "HS.LS.2.1", nbhs: "44–64%", state: "52–84%" },
];

const CATEGORY_COLORS: Record<string, string> = {
  MO: "#1d4ed8",
  HE: "#7c3aed",
  EV: "#047857",
  EC: "#b45309",
  CR: "#dc2626",
};

// Bar chart component using canvas
function BarChart({ data }: {
  data: { label: string; nbhs: number; state: number; color: string }[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const padL = 160, padR = 20, padT = 20, padB = 30;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const barH = Math.min(18, (chartH / data.length / 2) - 4);
    const gap = (chartH / data.length);

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    [0, 25, 50, 75, 100].forEach(v => {
      const x = padL + (v / 100) * chartW;
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + chartH);
      ctx.stroke();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${v}%`, x, padT + chartH + 16);
    });

    data.forEach((d, i) => {
      const y = padT + i * gap + gap / 2;

      // Label
      ctx.fillStyle = "#1e293b";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "right";
      const labelLines = d.label.split("\n");
      labelLines.forEach((line, li) => {
        ctx.fillText(line, padL - 8, y - (labelLines.length - 1) * 7 + li * 14 - barH / 2 + 6);
      });

      // State bar (background)
      const stateW = (d.state / 100) * chartW;
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.roundRect(padL, y - barH - 2, stateW, barH, 3);
      ctx.fill();

      // NBHS bar
      const nbhW = (d.nbhs / 100) * chartW;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.roundRect(padL, y + 2, nbhW, barH, 3);
      ctx.fill();

      // Value labels
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${d.state}%`, padL + stateW + 4, y - 2);
      ctx.fillStyle = d.color;
       ctx.fillText(`${d.nbhs}%`, padL + nbhW + 4, y + barH + 2);
    });

    // Legend
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(padL, padT - 14, 12, 8);
    ctx.fillStyle = "#64748b";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("State avg", padL + 16, padT - 6);

    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(padL + 80, padT - 14, 12, 8);
    ctx.fillStyle = "#64748b";
    ctx.fillText("NBHS avg", padL + 96, padT - 6);

  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: `${Math.max(220, data.length * 52 + 60)}px`, display: "block" }} />;
}

// Trend sparkline
function TrendLine({ values, color }: { values: number[]; color: string }) {
  const min = Math.min(...values) - 5;
  const max = Math.max(...values) + 5;
  const range = max - min || 1;
  const w = 60, h = 28;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (w - 8) + 4;
    const y = h - 4 - ((v - min) / range) * (h - 8);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * (w - 8) + 4;
        const y = h - 4 - ((v - min) / range) * (h - 8);
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

function ResultsAnalysis() {
  const chartData2025 = PRIORITY_STANDARDS.map(s => ({
    label: s.topic.length > 28 ? s.topic.substring(0, 26) + "…" : s.topic,
    nbhs: s.nbhs2025,
    state: s.state2025,
    color: CATEGORY_COLORS[s.category] || "#1d4ed8",
  }));

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header banner ─────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap gap-4 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-900">MCAS Biology Results — New Bedford High School</h2>
          <p className="text-sm text-slate-500 mt-0.5">Item-by-item analysis across 2023, 2024, and 2025 · Source: DESE Massachusetts School and District Profiles</p>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full sm:w-auto sm:flex sm:gap-4 sm:shrink-0">
          {ENROLLMENT.map(e => (
            <div key={e.year} className="text-center">
              <div className="text-base sm:text-lg font-bold text-slate-800">{e.nbhs}</div>
              <div className="text-xs text-slate-500">{e.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CR Alert ──────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex gap-3 items-start">
        <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-red-800">Highest-Leverage Gap: Constructed Response Items</div>
          <p className="text-sm text-red-700 mt-0.5">
            NBHS students score <strong>10–25 points below the state average</strong> on all multi-point CR items across every year. 
            CR items carry the most points per question (3–4 pts each). Improving evidence-based written explanations is the single highest-leverage area for score growth.
          </p>
        </div>
      </div>

      {/* ── Two columns: chart + strengths ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Priority Standards Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={16} className="text-red-500" />
            <h3 className="text-sm font-bold text-slate-800">Priority Standards — 2025 Performance</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">NBHS (colored) vs. State average (gray) · 2025 data · Percent of possible points earned</p>
          <BarChart data={chartData2025} />
        </div>

        {/* Strengths */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-emerald-600" />
            <h3 className="text-sm font-bold text-emerald-900">Relative Strengths (Consistent 2023–2025)</h3>
          </div>
          <div className="space-y-3">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-white rounded-lg border border-emerald-100 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-800 leading-tight">{s.topic}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.code}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-emerald-700">{s.nbhs}</div>
                    <div className="text-xs text-slate-400">NBHS range</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4-Year Trend Table ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <BarChart2 size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">4-Year Trend: Priority Standards (2022–2025)</h3>
          <span className="text-xs text-slate-400 ml-1">NBHS % of possible points · State avg in parentheses</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">2022</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">2023</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">2024</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">2025</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PRIORITY_STANDARDS.map((s, i) => {
                const catColor = CATEGORY_COLORS[s.category] || "#1d4ed8";
                const gap2025 = s.state2025 - s.nbhs2025;
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <span
                        className="inline-block text-xs font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: catColor + "18", color: catColor }}
                      >
                        {s.code}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-700 max-w-[180px]">{s.topic}</td>
                    <td className="px-3 py-3 text-center">
                      <div className="text-sm font-bold" style={{ color: catColor }}>{s.nbhs2022}%</div>
                      <div className="text-xs text-slate-400">({s.state2022}%)</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="text-sm font-bold" style={{ color: catColor }}>{s.nbhs2023}%</div>
                      <div className="text-xs text-slate-400">({s.state2023}%)</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="text-sm font-bold" style={{ color: catColor }}>{s.nbhs2024}%</div>
                      <div className="text-xs text-slate-400">({s.state2024}%)</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="text-sm font-bold" style={{ color: catColor }}>{s.nbhs2025}%</div>
                      <div className="text-xs text-slate-400">({s.state2025}%)</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TrendLine
                          values={[s.nbhs2022, s.nbhs2023, s.nbhs2024, s.nbhs2025]}
                          color={gap2025 > 20 ? "#dc2626" : gap2025 > 10 ? "#d97706" : "#16a34a"}
                        />
                        <span className="text-xs font-semibold" style={{ color: gap2025 > 20 ? "#dc2626" : gap2025 > 10 ? "#d97706" : "#16a34a" }}>
                          −{gap2025} pts vs state
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Category breakdown ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Reporting Category Key</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { code: "MO", label: "Molecules & Organisms", desc: "Cell processes, body systems, macromolecules, photosynthesis, respiration" },
            { code: "HE", label: "Heredity", desc: "Meiosis, Punnett squares, pedigrees, mutations, inheritance patterns" },
            { code: "EC", label: "Ecosystems", desc: "Food webs, population dynamics, carbon cycle, invasive species, symbiosis" },
            { code: "EV", label: "Evolution", desc: "Natural selection, allele frequencies, speciation, cladograms, adaptations" },
          ].map(cat => (
            <div key={cat.code} className="rounded-lg border border-slate-100 p-3">
              <div
                className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2"
                style={{ backgroundColor: CATEGORY_COLORS[cat.code] + "18", color: CATEGORY_COLORS[cat.code] }}
              >
                {cat.code}
              </div>
              <div className="text-xs font-semibold text-slate-800 mb-1">{cat.label}</div>
              <div className="text-xs text-slate-500 leading-snug">{cat.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Benchmark 2025-26 Data ──────────────────────────────────────────────────

// Overall school performance across 3 checkpoints
const BENCHMARK_OVERVIEW = [
  { checkpoint: "BOY", label: "Beginning of Year", date: "Sep 2025", assigned: 1162, submitted: 993, pct: 85, avgScore: 35, color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { checkpoint: "Q1",  label: "Quarter 1",         date: "Dec 2025", assigned: 1159, submitted: 955, pct: 82, avgScore: 37, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { checkpoint: "Q2",  label: "Quarter 2",         date: "Mar 2026", assigned: 1142, submitted: 858, pct: 75, avgScore: 44, color: "#047857", bg: "#ecfdf5", border: "#a7f3d0" },
  { checkpoint: "Q3",  label: "Quarter 3",         date: "Apr 2026", assigned: 868,  submitted: 573, pct: 66, avgScore: 49, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
];

// Standard-by-standard benchmark scores vs MCAS historical avg
// mcasAvg = average NBHS % across 2022-2025 MCAS for that standard
const BENCHMARK_STANDARDS = [
  {
    code: "HS-LS1-1",
    topic: "Protein Synthesis & Transcription",
    category: "MO",
    boy: 37, q1: 21, q2: 25, q3: 33,
    mcasAvg: 27,
    mcas2025: 25,
    priority: "critical",
    note: "Still the lowest standard at Q3 (33%). Q10 scored 17% — students consistently struggle with nucleotide-to-amino acid coding.",
  },
  {
    code: "HS-LS1-4",
    topic: "Cell Division & Photosynthesis/Respiration",
    category: "MO",
    boy: 26, q1: 34, q2: 39, q3: 40,
    mcasAvg: 21,
    mcas2025: 16,
    priority: "critical",
    note: "Slight Q3 gain to 40% but multiple questions (Q4, Q18, Q22) still below 42%. Cell division application remains weak.",
  },
  {
    code: "HS-LS4-5",
    topic: "Evolution: Biodiversity & Adaptation",
    category: "EV",
    boy: 23, q1: 24, q2: 27, q3: 33,
    mcasAvg: 24,
    mcas2025: 22,
    priority: "critical",
    note: "Q3 shows improvement to 33% (+6 pts from Q2) but still critical. Q26 (speciation) scored only 32%.",
  },
  {
    code: "HS-LS1-7",
    topic: "Cellular Respiration (Energy)",
    category: "MO",
    boy: 41, q1: 41, q2: 52, q3: 38,
    mcasAvg: 21,
    mcas2025: 16,
    priority: "watch",
    note: "Q3 dropped to 38% from Q2's 52% — regression. Q1 (ATP/energy, 36%) and Q31 (glycogen, 54%) show split understanding.",
  },
  {
    code: "HS-LS3-1",
    topic: "Heredity: DNA, Genes & Chromosomes",
    category: "HE",
    boy: 34, q1: 51, q2: 55, q3: 50,
    mcasAvg: 29,
    mcas2025: 24,
    priority: "watch",
    note: "Q3 at 50% — slight dip from Q2. Q2 (karyotype/chromosome) scored 55% while Q11 (meiosis distribution) scored 42%.",
  },
  {
    code: "HS-LS3-2",
    topic: "Heredity: Meiosis & Genetic Variation",
    category: "HE",
    boy: 34, q1: 37, q2: 42, q3: 48,
    mcasAvg: 29,
    mcas2025: 24,
    priority: "watch",
    note: "Q3 growth to 48% (+6 pts). Q14 (crossing over, 55%) stronger than Q24 (meiosis variation, 33%).",
  },
  {
    code: "HS-LS4-4",
    topic: "Natural Selection & Adaptation",
    category: "EV",
    boy: null, q1: null, q2: null, q3: 45,
    mcasAvg: 25,
    mcas2025: 22,
    priority: "watch",
    note: "Q3 data: Q6 (bacterial adaptation) 56%, Q25 (antibiotic resistance) 34%. Mixed performance — application items are weaker.",
  },
  {
    code: "HS-LS4-1",
    topic: "Evolution: Natural Selection Evidence",
    category: "EV",
    boy: 43, q1: 43, q2: 54, q3: 60,
    mcasAvg: 25,
    mcas2025: 22,
    priority: "strength",
    note: "Best standard in Q3 at 60%. Q17 (evolutionary relationships, 60%) and Q35 (giant panda evidence, 69%) are strong.",
  },
  {
    code: "HS-LS1-2",
    topic: "Cell Structure & Transport",
    category: "MO",
    boy: 34, q1: 41, q2: 50, q3: 54,
    mcasAvg: 60,
    mcas2025: 60,
    priority: "strength",
    note: "Q3 at 54% — strong growth trajectory. Q15 (digestive system drag & drop) scored 72%, the highest question on the assessment.",
  },
  {
    code: "HS-LS1-3",
    topic: "Cell Organization & Matter/Energy",
    category: "MO",
    boy: 46, q1: 46, q2: 53, q3: 58,
    mcasAvg: 57,
    mcas2025: 57,
    priority: "strength",
    note: "Q3 at 58% — approaching MCAS historical avg. Q13 (diffusion & cell membrane, 61%) is a consistent strength.",
  },
  {
    code: "HS-LS2-1",
    topic: "Ecosystem Dynamics & Energy Flow",
    category: "EC",
    boy: 31, q1: 34, q2: 43, q3: 47,
    mcasAvg: 65,
    mcas2025: 65,
    priority: "strength",
    note: "Q3 at 47% — steady growth but still 18 pts below MCAS historical avg. Q20 (ecosystem energy flow) scored 47%.",
  },
  {
    code: "HS-LS2-4",
    topic: "Social Behaviors & Ecosystem Interactions",
    category: "EC",
    boy: null, q1: null, q2: null, q3: 51,
    mcasAvg: 40,
    mcas2025: 40,
    priority: "strength",
    note: "Q3 data only: 51% avg. Q5 (energy pyramid, 40%) and Q7 (carbon cycle, 61%) show strong ecosystem understanding.",
  },
  {
    code: "HS-LS2-6",
    topic: "Ecosystem Disruption & Biodiversity",
    category: "EC",
    boy: null, q1: null, q2: null, q3: 56,
    mcasAvg: 45,
    mcas2025: 45,
    priority: "strength",
    note: "Q3 data only: Q27 (invasive species/kudzu) scored 56%. Students demonstrate solid understanding of ecosystem disruption.",
  },
];

// All 36 benchmark questions with standards, answers, and per-question performance
// Performance data sourced from QuestionPerformanceAnalysisReportbySchools CSVs
const BENCHMARK_QUESTIONS = [
  // Q# | Standard | Type | Answer | BOY% | Q1% | Q2% | Topic
  { q: 1,  std: "HS-LS1-7",     type: "MC", answer: "A",                topic: "ATP & Cellular Energy",              boy: 30, q1: 41, q2: 52 },
  { q: 2,  std: "HS-LS3-1",     type: "TEI", answer: "diploid; body cells", topic: "Karyotype & Chromosome Number",     boy: 60, q1: 59, q2: 62 },
  { q: 3,  std: "HS-LS1-1",     type: "TEI", answer: "thymine→uracil",      topic: "DNA to mRNA Transcription",         boy: 17, q1: 17, q2: 23 },
  { q: 4,  std: "HS-LS1-4",     type: "TEI", answer: "See key",             topic: "Cell Cycle Phases (Drag & Drop)",    boy: 35, q1: 39, q2: 42 },
  { q: 5,  std: "HS-LS2-3/2-4", type: "MC2", answer: "C; B,C",             topic: "Energy Pyramid & Trophic Efficiency",boy: 31, q1: 36, q2: 39 },
  { q: 6,  std: "HS-LS4-4",     type: "MC",  answer: "B",                  topic: "Bacterial Adaptation & Rapid Reproduction", boy: 49, q1: 50, q2: 58 },
  { q: 7,  std: "HS-LS2-3/2-5", type: "TEI", answer: "See key",            topic: "Carbon Cycle: Releases vs Stores",   boy: 49, q1: 53, q2: 60 },
  { q: 8,  std: "HS-LS1-2",     type: "MC",  answer: "D",                  topic: "Gas Exchange in Alveoli",           boy: 24, q1: 25, q2: 33 },
  { q: 9,  std: "HS-LS3-4",     type: "MC",  answer: "C",                  topic: "Gene-Environment Interaction (Siamese cat)", boy: 30, q1: 33, q2: 37 },
  { q: 10, std: "HS-LS1-1",     type: "MC",  answer: "D",                  topic: "Nucleotides Coding for Amino Acids", boy: 9,  q1: 16, q2: 22 },
  { q: 11, std: "HS-LS3-1",     type: "MC",  answer: "B",                  topic: "Meiosis: Chromosome Distribution",  boy: 31, q1: 35, q2: 39 },
  { q: 12, std: "HS-LS1-3",     type: "MC",  answer: "C",                  topic: "Feedback Loop & Homeostasis",        boy: 40, q1: 38, q2: 46 },
  { q: 13, std: "HS-LS1-3",     type: "TEI", answer: "across cell membranes; to be used by", topic: "Diffusion & Cell Membrane", boy: 51, q1: 49, q2: 56 },
  { q: 14, std: "HS-LS3-2",     type: "TEI", answer: "increases; exchange genetic material", topic: "Crossing Over & Genetic Variability", boy: 41, q1: 41, q2: 48 },
  { q: 15, std: "HS-LS1-2",     type: "TEI", answer: "See key",            topic: "Digestive System Functions (Drag & Drop)", boy: 54, q1: 54, q2: 63 },
  { q: 16, std: "HS-LS1-2",     type: "MC",  answer: "D",                  topic: "Kidney Function & Nitrogenous Waste", boy: 26, q1: 27, q2: 37 },
  { q: 17, std: "HS-LS4-1",     type: "TEI", answer: "See key",            topic: "Evolutionary Relationships (Drag & Drop)", boy: 48, q1: 46, q2: 55 },
  { q: 18, std: "HS-LS1-4",     type: "MC",  answer: "B",                  topic: "DNA Base Pairing (Chargaff's Rule)", boy: 32, q1: 33, q2: 40 },
  { q: 19, std: "HS-LS4-1",     type: "MC",  answer: "D",                  topic: "Elephant Population & Natural Selection", boy: 36, q1: 36, q2: 47 },
  { q: 20, std: "HS-LS2-1",     type: "MC",  answer: "D",                  topic: "Ecosystem Energy Flow",             boy: 31, q1: 34, q2: 43 },
  { q: 21, std: "HS-LS1-2",     type: "TEI", answer: "See key",            topic: "Body Systems Interaction",          boy: 30, q1: 30, q2: 37 },
  { q: 22, std: "HS-LS1-4",     type: "MC",  answer: "D",                  topic: "Photosynthesis Products",           boy: 17, q1: 19, q2: 29 },
  { q: 23, std: "HS-LS1-1",     type: "MC",  answer: "D",                  topic: "Protein Synthesis: Gene Expression", boy: 24, q1: 25, q2: 32 },
  { q: 24, std: "HS-LS3-2",     type: "MC",  answer: "B",                  topic: "Meiosis & Genetic Variation",       boy: 26, q1: 28, q2: 30 },
  { q: 25, std: "HS-LS4-4",     type: "MC",  answer: "A",                  topic: "Antibiotic Resistance & Natural Selection", boy: 24, q1: 28, q2: 33 },
  { q: 26, std: "HS-LS4-5",     type: "MC2", answer: "D; C",              topic: "Snake Population Divergence & Speciation", boy: 23, q1: 24, q2: 27 },
  { q: 27, std: "HS-LS2-6",     type: "MC3", answer: "D, I, F",           topic: "Invasive Species Competition (Kudzu)", boy: 32, q1: 39, q2: 43 },
  { q: 28, std: "HS-LS3-3",     type: "MC",  answer: "B",                  topic: "Narcolepsy Inheritance (Recessive Trait)", boy: 34, q1: 31, q2: 39 },
  { q: 29, std: "B.I.2.2",      type: "MC",  answer: "D",                  topic: "Prokaryote vs Eukaryote (Bacterial Cell)", boy: 22, q1: 23, q2: 36 },
  { q: 30, std: "HS-LS1-4",     type: "MC",  answer: "D",                  topic: "Cell Cycle Stages & Mitosis Order",  boy: 26, q1: 29, q2: 37 },
  { q: 31, std: "HS-LS1-7",     type: "MC",  answer: "C",                  topic: "Glycogen Breakdown & Cellular Energy", boy: 41, q1: 37, q2: 49 },
  { q: 32, std: "HS-LS1-5",     type: "MC",  answer: "B",                  topic: "Photosynthesis Reactants (Light Energy)", boy: 34, q1: 34, q2: 47 },
  { q: 33, std: "B.I.2.4",      type: "MC",  answer: "A",                  topic: "Cellular Respiration (Snails & CO₂)", boy: 27, q1: 27, q2: 41 },
  { q: 34, std: "HS-LS1-1",     type: "MC",  answer: "C",                  topic: "DNA Substitution Mutation Effect",   boy: 32, q1: 27, q2: 36 },
  { q: 35, std: "HS-LS4-1",     type: "MC",  answer: "C",                  topic: "Evolutionary Evidence: Giant Panda", boy: 46, q1: 47, q2: 60 },
  { q: 36, std: "HS-LS1-1",     type: "MC",  answer: "B",                  topic: "Central Dogma: Microtubule Proteins", boy: 36, q1: 34, q2: 44 },
];

// Lowest performing questions across checkpoints (Q3 data added from Apr 2026 CSV)
const LOWEST_QUESTIONS = [
  { q: "Q10", std: "HS-LS1-1", topic: "Protein Synthesis",      boy: 9,  q1: 16, q2: 22, q3: 17, delta: "+8" },
  { q: "Q23", std: "HS-LS1-1", topic: "Gene Expression",        boy: 24, q1: 25, q2: 32, q3: 31, delta: "+7" },
  { q: "Q26", std: "HS-LS4-5", topic: "Evolution/Speciation",   boy: 23, q1: 24, q2: 27, q3: 32, delta: "+9" },
  { q: "Q8",  std: "HS-LS1-2", topic: "Cell Transport",         boy: 24, q1: 25, q2: 33, q3: 32, delta: "+8" },
  { q: "Q22", std: "HS-LS1-4", topic: "Photosynthesis/Resp.",   boy: 17, q1: 19, q2: 29, q3: 32, delta: "+15" },
  { q: "Q24", std: "HS-LS3-2", topic: "Meiosis Variation",      boy: 26, q1: 28, q2: 30, q3: 33, delta: "+7" },
];

function BenchmarkMiniBar({ value, max = 100, color }: { value: number | null; max?: number; color: string }) {
  if (value === null) return <span className="text-xs text-slate-300">—</span>;
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{value}%</span>
    </div>
  );
}

// ── Chemistry Benchmark Data ───────────────────────────────────────────────

const CHEM_OVERVIEW = [
  { checkpoint: "BOY", label: "Beginning of Year", date: "Sep 2025", assigned: 159, submitted: 147, pct: 92, avgScore: 29, color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { checkpoint: "Q1",  label: "Quarter 1",         date: "Dec 2025", assigned: 164, submitted: 140, pct: 85, avgScore: 32, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { checkpoint: "Q2",  label: "Quarter 2",         date: "Mar 2026", assigned: 83,  submitted: 77,  pct: 93, avgScore: 36, color: "#047857", bg: "#ecfdf5", border: "#a7f3d0" },
  { checkpoint: "Q3",  label: "Quarter 3",         date: "Apr 2026", assigned: 163, submitted: 123, pct: 75, avgScore: 40, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
];

const CHEM_STANDARDS = [
  { code: "HS-PS1-1", topic: "Atomic Structure & Periodic Table",      boy: null, q1: null, q2: null, q3: 42, priority: "watch",    note: "Q3: 42% school avg. Periodic trends and atomic structure questions show moderate performance." },
  { code: "HS-PS1-2", topic: "Chemical Reactions & Bonding",           boy: null, q1: null, q2: null, q3: 42, priority: "watch",    note: "Q3: 42%. Chemical bonding and reaction types need reinforcement." },
  { code: "HS-PS1-3", topic: "Nuclear Processes",                      boy: null, q1: null, q2: null, q3: 42, priority: "watch",    note: "Q3: 42%. Nuclear chemistry concepts at school average." },
  { code: "HS-PS1-4", topic: "Thermodynamics & Energy in Reactions",   boy: null, q1: null, q2: null, q3: 41, priority: "watch",    note: "Q3: 41%. Endothermic/exothermic reaction understanding needs work." },
  { code: "HS-PS1-5", topic: "Reaction Rates & Equilibrium",           boy: null, q1: null, q2: null, q3: 42, priority: "watch",    note: "Q3: 42%. Le Chatelier's principle and equilibrium concepts at average." },
  { code: "HS-PS1-6", topic: "Solutions & Concentration",              boy: null, q1: null, q2: null, q3: 44, priority: "strength", note: "Q3: 44% — above standard average. Molarity and solution chemistry are relative strengths." },
  { code: "HS-PS1-7", topic: "Stoichiometry & Molar Relationships",    boy: null, q1: null, q2: null, q3: 38, priority: "critical", note: "Q3: 38% — lowest standard. Mole calculations and stoichiometry ratios are the biggest challenge." },
  { code: "HS-PS1-8", topic: "Properties of Matter & Phase Changes",   boy: null, q1: null, q2: null, q3: 42, priority: "watch",    note: "Q3: 42%. Phase diagrams and physical vs. chemical changes at average." },
  { code: "HS-PS2-6", topic: "Forces & Motion in Chemical Contexts",   boy: null, q1: null, q2: null, q3: 35, priority: "critical", note: "Q3: 35% — below average. Electrostatic forces and intermolecular forces need focus." },
  { code: "HS-PS3-2", topic: "Energy Storage & Transfer",              boy: null, q1: null, q2: null, q3: 57, priority: "strength", note: "Q3: 57% — highest standard. Energy storage concepts are a clear strength." },
  { code: "HS-PS4-1", topic: "Wave Properties & Electromagnetic Spectrum", boy: null, q1: null, q2: null, q3: 43, priority: "watch", note: "Q3: 43%. Wave behavior and EM spectrum at school average." },
  { code: "HS-PS4-3", topic: "Wave Interactions & Technology",         boy: null, q1: null, q2: null, q3: 43, priority: "watch",    note: "Q3: 43%. Wave-matter interactions and technology applications at average." },
  { code: "HS-PS4-5", topic: "Information Technologies & Waves",       boy: null, q1: null, q2: null, q3: 43, priority: "watch",    note: "Q3: 43%. Digital information and wave encoding at school average." },
];

const CHEM_LOWEST_QUESTIONS = [
  { q: "Q22", std: "HS-PS1-7", topic: "Stoichiometry",          q3: 0  },
  { q: "Q13", std: "HS-PS1-10",topic: "Chemical Nomenclature",  q3: 15 },
  { q: "Q18", std: "HS-PS1-7", topic: "Molar Mass Calculations", q3: 19 },
  { q: "Q17", std: "HS-PS1-1", topic: "Periodic Trends",         q3: 25 },
  { q: "Q7",  std: "HS-PS1-3", topic: "Nuclear Reactions",       q3: 25 },
  { q: "Q14", std: "HS-PS1-11",topic: "Reaction Prediction",     q3: 29 },
  { q: "Q25", std: "HS-PS1-7", topic: "Limiting Reagents",       q3: 30 },
  { q: "Q23", std: "HS-PS1-4", topic: "Enthalpy Changes",        q3: 34 },
  { q: "Q11", std: "HS-PS2-6", topic: "Intermolecular Forces",   q3: 36 },
  { q: "Q5",  std: "HS-PS1-2", topic: "Chemical Bonding",        q3: 37 },
];

const CHEM_HIGHEST_QUESTIONS = [
  { q: "Q3",  std: "HS-PS1-7", topic: "Mole Concept",            q3: 63 },
  { q: "Q6",  std: "HS-PS1-3", topic: "Radioactive Decay",       q3: 63 },
  { q: "Q9",  std: "HS-PS1-6", topic: "Solution Concentration",  q3: 58 },
  { q: "Q24", std: "HS-PS3-2", topic: "Energy Transfer",         q3: 56 },
  { q: "Q20", std: "HS-PS1-7", topic: "Stoichiometry Application",q3: 56 },
  { q: "Q1",  std: "HS-PS1-1", topic: "Electron Configuration",  q3: 52 },
  { q: "Q2",  std: "HS-PS1-1", topic: "Atomic Number & Mass",    q3: 47 },
  { q: "Q8",  std: "HS-PS1-5", topic: "Reaction Rates",          q3: 47 },
  { q: "Q4",  std: "HS-PS1-2", topic: "Lewis Structures",        q3: 46 },
  { q: "Q16", std: "HS-PS1-1", topic: "Periodic Table Trends",   q3: 43 },
];

const CHEM_BANDS_Q3 = [
  { band: "Exceeding Expectations",        count: 6,  pct: 5,  color: "#16a34a", bg: "#f0fdf4" },
  { band: "Meeting Expectations",          count: 5,  pct: 4,  color: "#2563eb", bg: "#eff6ff" },
  { band: "Partially Meeting Expectations",count: 78, pct: 63, color: "#d97706", bg: "#fffbeb" },
  { band: "Not Meeting Expectations",      count: 34, pct: 28, color: "#dc2626", bg: "#fef2f2" },
];

function ChemistryBenchmark() {
  const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: "#fef2f2", text: "#dc2626", label: "Critical Focus" },
    watch:    { bg: "#fffbeb", text: "#b45309", label: "Watch" },
    strength: { bg: "#f0fdf4", text: "#16a34a", label: "Strength" },
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">Chemistry Benchmark Assessment — 2025–26</h2>
        <p className="text-sm text-slate-500 mt-0.5">Four checkpoints (BOY, Q1, Q2, Q3) · Q3: 123 of 163 students submitted (75%) · Standards: HS-PS1 through HS-PS4</p>
      </div>

      {/* 4 Checkpoint Cards */}
      <div className="grid grid-cols-4 gap-4">
        {CHEM_OVERVIEW.map((b) => (
          <div key={b.checkpoint} className="rounded-xl border p-4" style={{ borderColor: b.border, backgroundColor: b.bg }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: b.color, color: "#fff" }}>{b.checkpoint}</span>
              <span className="text-xs text-slate-500">{b.date}</span>
            </div>
            <div className="text-3xl font-black" style={{ color: b.color }}>{b.avgScore}%</div>
            <div className="text-xs text-slate-600 mt-0.5">avg school score</div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: b.border }}>
              <div className="text-xs text-slate-500">{b.submitted} / {b.assigned} submitted</div>
              <div className="text-xs font-semibold" style={{ color: b.color }}>{b.pct}% participation</div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Alert */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 flex gap-3 items-start">
        <Zap size={18} className="text-purple-500 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-purple-800">Q3 Update: +11 Points from BOY to Q3 · 40% School Average</div>
          <p className="text-sm text-purple-700 mt-0.5">
            School average rose from <strong>29% (BOY)</strong> → <strong>32% (Q1)</strong> → <strong>36% (Q2)</strong> → <strong>40% (Q3)</strong>.
            123 of 163 assigned students submitted (75%). <strong>63% of students are Partially Meeting Expectations</strong> — the largest group.
            Critical focus: <strong>HS-PS1-7 Stoichiometry (38%)</strong> and <strong>HS-PS2-6 Intermolecular Forces (35%)</strong> are the lowest standards.
            Strength: <strong>HS-PS3-2 Energy Storage (57%)</strong> is the highest-performing standard.
          </p>
        </div>
      </div>

      {/* Performance Bands */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Q3 Performance Band Summary</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHEM_BANDS_Q3.map((b) => (
            <div key={b.band} className="rounded-lg border p-4" style={{ borderColor: b.color + "40", backgroundColor: b.bg }}>
              <div className="text-2xl font-black" style={{ color: b.color }}>{b.count}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: b.color }}>{b.pct}%</div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">{b.band}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Standards Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <Target size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Standard-by-Standard: Q3 Performance</h3>
          <span className="text-xs text-slate-400 ml-1">Chemistry standards — Q3 April 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide" style={{color:"#7c3aed",fontWeight:700}}>Q3 ★</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CHEM_STANDARDS.map((s, i) => {
                const pc = priorityColors[s.priority];
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">{s.code}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-semibold text-slate-800 leading-tight">{s.topic}</div>
                    </td>
                    <td className="px-3 py-3 text-center" style={{background:"#faf5ff"}}>
                      <BenchmarkMiniBar value={s.q3} color="#7c3aed" />
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: pc.bg, color: pc.text }}>{pc.label}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-500 max-w-[240px] leading-snug">{s.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 10 / Bottom 10 Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-red-100 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h3 className="text-sm font-bold text-slate-800">Bottom 10 Questions — Q3</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500">Q#</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Standard</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Topic</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500">Q3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CHEM_LOWEST_QUESTIONS.map((q, i) => (
                <tr key={i} className="hover:bg-red-50/30">
                  <td className="px-4 py-2.5"><span className="text-xs font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">{q.q}</span></td>
                  <td className="px-3 py-2.5 text-xs font-mono text-slate-600">{q.std}</td>
                  <td className="px-3 py-2.5 text-xs text-slate-700">{q.topic}</td>
                  <td className="px-3 py-2.5 text-center"><span className="text-sm font-bold text-red-600">{q.q3}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-emerald-100 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-800">Top 10 Questions — Q3</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500">Q#</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Standard</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Topic</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500">Q3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CHEM_HIGHEST_QUESTIONS.map((q, i) => (
                <tr key={i} className="hover:bg-emerald-50/30">
                  <td className="px-4 py-2.5"><span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">{q.q}</span></td>
                  <td className="px-3 py-2.5 text-xs font-mono text-slate-600">{q.std}</td>
                  <td className="px-3 py-2.5 text-xs text-slate-700">{q.topic}</td>
                  <td className="px-3 py-2.5 text-center"><span className="text-sm font-bold text-emerald-600">{q.q3}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructional Implications */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Instructional Implications for Q3 Chemistry</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-red-100 bg-red-50 p-4">
            <div className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">🔴 Critical Focus</div>
            <ul className="space-y-1.5 text-xs text-red-800">
              <li><strong>HS-PS1-7 Stoichiometry (38%):</strong> Re-teach mole calculations, limiting reagents, and percent yield using step-by-step scaffolded problems</li>
              <li><strong>HS-PS2-6 Intermolecular Forces (35%):</strong> Use molecular models and diagrams to connect polarity to IMF types</li>
              <li><strong>Q22 (0%):</strong> Review this question — zero percent suggests a possible assessment issue or universal misconception to address</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">🟡 Watch &amp; Reinforce</div>
            <ul className="space-y-1.5 text-xs text-amber-800">
              <li><strong>HS-PS1-1 through PS1-5 (41–42%):</strong> Atomic structure, bonding, and thermodynamics are all near average — targeted practice with MCAS-style questions needed</li>
              <li><strong>HS-PS4 Wave Standards (43%):</strong> Wave properties and EM spectrum — use real-world applications to deepen understanding</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">🟢 Leverage Strengths</div>
            <ul className="space-y-1.5 text-xs text-emerald-800">
              <li><strong>HS-PS3-2 Energy Storage (57%):</strong> Use this as a bridge concept to connect to weaker thermodynamics standards</li>
              <li><strong>HS-PS1-6 Solutions (44%):</strong> Build on solution chemistry to scaffold stoichiometry in solution contexts</li>
              <li><strong>Q3, Q6 (63%):</strong> Mole concept and radioactive decay are strengths — use as confidence builders before harder topics</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

function BenchmarkAnalysis() {
  const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: "#fef2f2", text: "#dc2626", label: "Critical Focus" },
    watch:    { bg: "#fffbeb", text: "#b45309", label: "Watch" },
    strength: { bg: "#f0fdf4", text: "#16a34a", label: "Strength" },
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">Biology Benchmark Assessment — 2025–26</h2>
        <p className="text-sm text-slate-500 mt-0.5">Four checkpoints (BOY, Q1, Q2, Q3) · Q3: 573 students · Scores cross-referenced against 2022–2025 MCAS item-by-item data</p>
      </div>

      {/* ── 4 Checkpoint Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {BENCHMARK_OVERVIEW.map((b) => (
          <div key={b.checkpoint} className="rounded-xl border p-4" style={{ borderColor: b.border, backgroundColor: b.bg }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: b.color, color: "#fff" }}>{b.checkpoint}</span>
              <span className="text-xs text-slate-500">{b.date}</span>
            </div>
            <div className="text-3xl font-black" style={{ color: b.color }}>{b.avgScore}%</div>
            <div className="text-xs text-slate-600 mt-0.5">avg school score</div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: b.border }}>
              <div className="text-xs text-slate-500">{b.submitted.toLocaleString()} / {b.assigned.toLocaleString()} submitted</div>
              <div className="text-xs font-semibold" style={{ color: b.color }}>{b.pct}% participation</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Score Growth Alert ──────────────────────────────────────────── */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 flex gap-3 items-start">
        <Zap size={18} className="text-purple-500 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-purple-800">Q3 Update: +14 Points from BOY to Q3 · 49% School Average</div>
          <p className="text-sm text-purple-700 mt-0.5">
            School average rose from <strong>35% (BOY)</strong> → <strong>37% (Q1)</strong> → <strong>44% (Q2)</strong> → <strong>49% (Q3)</strong>.
            573 of 868 assigned students submitted (66%). <strong>57% of students are Partially Meeting Expectations</strong> — the largest group and the highest-leverage target for MCAS.
            Critical focus: <strong>HS-LS1-1 (33%)</strong> and <strong>HS-LS4-5 (33%)</strong> remain the lowest standards. HS-LS1-7 regressed from 52% (Q2) to 38% (Q3).
          </p>
        </div>
      </div>

      {/* ── Standard-by-Standard Analysis ──────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <Target size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Standard-by-Standard: Benchmark vs. MCAS Historical</h3>
          <span className="text-xs text-slate-400 ml-1">Benchmark scores (BOY/Q1/Q2/Q3) compared to 2022–2025 MCAS avg for same standard</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">BOY</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q1</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q2</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide" style={{color:"#7c3aed",fontWeight:700}}>Q3 ★</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">MCAS Hist. Avg</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">MCAS Gap</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BENCHMARK_STANDARDS.map((s, i) => {
                const catColor = CATEGORY_COLORS[s.category] || "#1d4ed8";
                const gap = (s as any).q3 !== null && (s as any).q3 !== undefined ? s.mcasAvg - (s as any).q3 : (s.q2 !== null ? s.mcasAvg - s.q2 : null);
                const pc = priorityColors[s.priority];
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-block text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: catColor + "18", color: catColor }}>
                        {s.code}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-semibold text-slate-800 leading-tight">{s.topic}</div>
                      <div className="text-xs text-slate-400 mt-0.5 max-w-[200px] leading-snug">{s.note}</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <BenchmarkMiniBar value={s.boy} color="#b45309" />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <BenchmarkMiniBar value={s.q1} color="#1d4ed8" />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <BenchmarkMiniBar value={s.q2} color="#047857" />
                    </td>
                    <td className="px-3 py-3 text-center" style={{background:"#faf5ff"}}>
                      <BenchmarkMiniBar value={(s as any).q3 ?? null} color="#7c3aed" />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="text-sm font-bold text-slate-600">{s.mcasAvg}%</div>
                      <div className="text-xs text-slate-400">2022–25 avg</div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {gap !== null ? (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${gap > 15 ? "bg-red-100 text-red-700" : gap > 5 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {gap > 0 ? `−${gap} pts` : `+${Math.abs(gap)} pts`}
                        </span>
                      ) : <span className="text-xs text-slate-300">—</span>}
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: pc.bg, color: pc.text }}>
                        {pc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Lowest Performing Questions ─────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-slate-800">Persistently Lowest-Scoring Questions (All 4 Checkpoints)</h3>
          <span className="text-xs text-slate-400 ml-1">Items where NBHS students scored below 35% on every benchmark — highest MCAS prep priority</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Question</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">BOY</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q1</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q2</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide" style={{color:"#7c3aed",fontWeight:700}}>Q3 ★</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOWEST_QUESTIONS.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">{q.q}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs font-mono text-slate-600">{q.std}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-700">{q.topic}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold text-red-600">{q.boy}%</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold text-blue-600">{q.q1}%</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold text-emerald-600">{q.q2}%</span>
                  </td>
                  <td className="px-3 py-3 text-center" style={{background:"#faf5ff"}}>
                    <span className="text-sm font-bold" style={{color:"#7c3aed"}}>{(q as any).q3}%</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">{q.delta}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Instructional Implications ──────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Instructional Implications for MCAS Prep</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-red-100 bg-red-50 p-4">
            <div className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">🔴 Critical Focus (Before MCAS)</div>
            <ul className="space-y-1.5 text-xs text-red-800">
              <li><strong>HS-LS1-1:</strong> Re-teach protein synthesis using visual models; practice transcription/translation diagrams</li>
              <li><strong>HS-LS1-4:</strong> Use CER frames for photosynthesis/respiration explanations; connect to real-world contexts</li>
              <li><strong>HS-LS4-5:</strong> Biodiversity and evolution — use case studies, phylogenetic trees, and species comparison tasks</li>
              <li><strong>CR Items:</strong> Weekly claim-evidence-reasoning practice; score student responses using MCAS rubrics</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">🟡 Watch & Reinforce</div>
            <ul className="space-y-1.5 text-xs text-amber-800">
              <li><strong>HS-LS3-1/3-2:</strong> Benchmark scores are improving but MCAS performance has been declining — reinforce meiosis and pedigree analysis</li>
              <li><strong>HS-LS1-7:</strong> Benchmark improving but MCAS historically very low — connect energy concepts across photosynthesis and respiration</li>
              <li><strong>HS-LS4-1:</strong> Good benchmark growth but MCAS still below 30% — use MCAS-style natural selection questions for practice</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">🟢 Maintain Strengths</div>
            <ul className="space-y-1.5 text-xs text-emerald-800">
              <li><strong>HS-LS1-2/1-3:</strong> Cell transport and mitosis are strong on both benchmark and MCAS — use as confidence builders in review</li>
              <li><strong>Ecology (HS-LS2):</strong> MCAS strength area — maintain with brief review; use as entry points for harder concepts</li>
              <li><strong>Genetics (HS-LS3-4):</strong> Identifying genetic vs. environmental factors — consistent strength; use peer teaching opportunities</li>
            </ul>
          </div>
        </div>
      </div>


      {/* ── All Questions Table ────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-slate-500" />
            <h3 className="text-sm font-bold text-slate-800">All 36 Benchmark Questions — Performance by Checkpoint</h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>BOY (Sep 2025)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>Q1 (Dec 2025)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>Q2 (Mar 2026)</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide w-10">#</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Answer</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">BOY</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q1</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Q2</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Δ BOY→Q2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BENCHMARK_QUESTIONS.map((q) => {
                const delta = q.q2 - q.boy;
                const isLow = q.q2 < 35;
                const catColor = CATEGORY_COLORS[
                  q.std.startsWith("HS-LS1") ? "MO" :
                  q.std.startsWith("HS-LS2") ? "EC" :
                  q.std.startsWith("HS-LS3") ? "HE" :
                  q.std.startsWith("HS-LS4") ? "EV" : "MO"
                ] || "#64748b";
                return (
                  <tr key={q.q} className={`hover:bg-slate-50 transition-colors ${isLow ? "bg-red-50/30" : ""}`}>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`inline-block text-xs font-bold px-1.5 py-0.5 rounded ${isLow ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"}`}>
                        Q{q.q}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-mono font-semibold" style={{ color: catColor }}>{q.std}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700 max-w-[200px] leading-snug">{q.topic}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        q.type === "MC" ? "bg-slate-100 text-slate-600" :
                        q.type === "TEI" ? "bg-purple-100 text-purple-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{q.type}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs font-mono text-slate-600 max-w-[120px] leading-snug">{q.answer}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-xs font-bold ${q.boy < 30 ? "text-red-600" : q.boy < 45 ? "text-amber-600" : "text-emerald-600"}`}>
                        {q.boy}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-xs font-bold ${q.q1 < 30 ? "text-red-600" : q.q1 < 45 ? "text-amber-600" : "text-emerald-600"}`}>
                        {q.q1}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-xs font-bold ${q.q2 < 30 ? "text-red-600" : q.q2 < 45 ? "text-amber-600" : "text-emerald-600"}`}>
                        {q.q2}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        delta >= 10 ? "bg-emerald-100 text-emerald-700" :
                        delta >= 0 ? "bg-blue-50 text-blue-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {delta >= 0 ? `+${delta}` : delta}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex gap-4 text-xs text-slate-500">
          <span><strong className="text-red-600">Red</strong> = below 30% (critical)</span>
          <span><strong className="text-amber-600">Amber</strong> = 30–44% (needs attention)</span>
          <span><strong className="text-emerald-600">Green</strong> = 45%+ (on track)</span>
          <span className="ml-auto">MC = Multiple Choice · TEI = Technology Enhanced Item · MC2/MC3 = Multi-part</span>
        </div>
      </div>

      {/* ── Grade 9 vs Grade 10 vs Pre-AP Chart ──────────────────────────── */}
      <GradeLevelChart />
    </div>
  );
}


// ── CSV parsing helpers ──────────────────────────────────────────────────────
function parseBenchmarkCSV(text: string): { grade9: number; grade10: number; preAP: number; schoolAvg: number; n9: number; n10: number; nAP: number } | null {
  const rows = text.split("\n").map((l: string) => l.trim()).filter(Boolean);
  let headerIdx = -1;
  for (let i = 0; i < Math.min(rows.length, 5); i++) {
    if (rows[i].includes("Student (Score%)") || rows[i].includes("Class Grade")) {
      headerIdx = i; break;
    }
  }
  if (headerIdx === -1) return null;
  const headers = rows[headerIdx].split(",").map((h: string) => h.replace(/"/g, "").trim());
  const gradeIdx = headers.indexOf("Class Grade");
  const scoreIdx = headers.indexOf("Student (Score%)");
  const classIdx = headers.indexOf("Class Name");
  if (gradeIdx === -1 || scoreIdx === -1) return null;

  const parseScore = (val: string): number | null => {
    val = val.replace(/"/g, "").trim();
    if (!val || val === "Absent") return null;
    const frac = val.match(/([\d.]+)\s*\/\s*([\d.]+)/);
    if (frac) { const d = parseFloat(frac[2]); return d > 0 ? Math.round(parseFloat(frac[1]) / d * 1000) / 10 : null; }
    const pct = val.match(/([\d.]+)%/);
    if (pct) return parseFloat(pct[1]);
    return null;
  };

  const classify = (grade: string, className: string): "Grade 9" | "Grade 10" | "Pre-AP" | null => {
    if (/Pre.?AP/i.test(className)) return "Pre-AP";
    const g = grade.replace(/"/g, "").trim();
    if (g === "9") return "Grade 9";
    if (g === "10") return "Grade 10";
    return null;
  };

  const buckets: Record<string, number[]> = { "Grade 9": [], "Grade 10": [], "Pre-AP": [] };
  const allScores: number[] = [];

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const cols: string[] = [];
    let cur = "", inQ = false;
    for (const ch of rows[i] + ",") {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { cols.push(cur); cur = ""; }
      else cur += ch;
    }
    const grade = (cols[gradeIdx] || "").replace(/"/g, "").trim();
    const className = classIdx >= 0 ? (cols[classIdx] || "") : "";
    const score = parseScore(cols[scoreIdx] || "");
    if (score === null) continue;
    const group = classify(grade, className);
    if (group) { buckets[group].push(score); allScores.push(score); }
  }

  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a: number, b: number) => a + b, 0) / arr.length * 10) / 10 : 0;
  return {
    grade9: avg(buckets["Grade 9"]),
    grade10: avg(buckets["Grade 10"]),
    preAP: avg(buckets["Pre-AP"]),
    schoolAvg: avg(allScores),
    n9: buckets["Grade 9"].length,
    n10: buckets["Grade 10"].length,
    nAP: buckets["Pre-AP"].length,
  };
}

const STORAGE_KEY = "nbhs_benchmark_extra_checkpoints";

type CheckpointData = { label: string; grade9: number; grade10: number; preAP: number; schoolAvg: number; n9: number; n10: number; nAP: number };

const STATIC_CHECKPOINTS: CheckpointData[] = [
  { label: "BOY (Sep 2025)", grade9: 32.2, grade10: 36.4, preAP: 43.4, schoolAvg: 35.5, n9: 318, n10: 335, nAP: 170 },
  { label: "Q1 (Dec 2025)",  grade9: 35.2, grade10: 38.1, preAP: 42.4, schoolAvg: 37.0, n9: 282, n10: 291, nAP: 173 },
  { label: "Q2 (Mar 2026)",  grade9: 44.9, grade10: 42.2, preAP: 50.7, schoolAvg: 44.2, n9: 310, n10: 223, nAP: 120 },
  { label: "Q3 (Apr 2026)",  grade9: 45.2, grade10: 47.2, preAP: 60.3, schoolAvg: 49.0, n9: 215, n10: 252, nAP: 93  },
];

function GradeLevelChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadExtra = (): CheckpointData[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  };

  const [extraCheckpoints, setExtraCheckpoints] = useState<CheckpointData[]>(loadExtra);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [pendingLabel, setPendingLabel] = useState("Q3 (Jun 2026)");

  const allCheckpoints = [...STATIC_CHECKPOINTS, ...extraCheckpoints];

  const buildChart = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) chartRef.current.destroy();
    const labels = allCheckpoints.map((c: CheckpointData) => c.label);
    // Compute growth deltas for tooltip context
    const nData = {
      "Grade 9":  allCheckpoints.map((c: CheckpointData) => c.n9),
      "Grade 10": allCheckpoints.map((c: CheckpointData) => c.n10),
      "Pre-AP":   allCheckpoints.map((c: CheckpointData) => c.nAP),
    } as Record<string, number[]>;

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Grade 9",
            data: allCheckpoints.map((c: CheckpointData) => c.grade9),
            backgroundColor: allCheckpoints.map((_: CheckpointData, i: number) =>
              i === allCheckpoints.length - 1 ? "rgba(59,130,246,1)" : "rgba(59,130,246,0.65)"),
            borderColor: "#3b82f6", borderWidth: 1.5, borderRadius: 5,
            hoverBackgroundColor: "rgba(59,130,246,1)", hoverBorderWidth: 2,
          },
          {
            label: "Grade 10",
            data: allCheckpoints.map((c: CheckpointData) => c.grade10),
            backgroundColor: allCheckpoints.map((_: CheckpointData, i: number) =>
              i === allCheckpoints.length - 1 ? "rgba(245,158,11,1)" : "rgba(245,158,11,0.65)"),
            borderColor: "#f59e0b", borderWidth: 1.5, borderRadius: 5,
            hoverBackgroundColor: "rgba(245,158,11,1)", hoverBorderWidth: 2,
          },
          {
            label: "Pre-AP",
            data: allCheckpoints.map((c: CheckpointData) => c.preAP),
            backgroundColor: allCheckpoints.map((_: CheckpointData, i: number) =>
              i === allCheckpoints.length - 1 ? "rgba(16,185,129,1)" : "rgba(16,185,129,0.65)"),
            borderColor: "#10b981", borderWidth: 1.5, borderRadius: 5,
            hoverBackgroundColor: "rgba(16,185,129,1)", hoverBorderWidth: 2,
          },
          {
            label: "School Avg",
            data: allCheckpoints.map((c: CheckpointData) => c.schoolAvg),
            type: "line" as any,
            borderColor: "#94a3b8", borderWidth: 2.5, borderDash: [6, 4],
            pointBackgroundColor: "#94a3b8", pointRadius: 5, pointHoverRadius: 7,
            pointHoverBackgroundColor: "#475569", pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            fill: false, tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 900,
          easing: "easeOutQuart" as any,
          delay: (ctx: any) => {
            if (ctx.type === "data" && ctx.mode === "default") {
              return ctx.dataIndex * 80 + ctx.datasetIndex * 30;
            }
            return 0;
          },
        },
        interaction: { mode: "index" as const, intersect: false },
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 12, weight: "500" as any }, boxWidth: 14, padding: 18, usePointStyle: true, pointStyleWidth: 10 },
          },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.92)",
            titleColor: "#f1f5f9",
            bodyColor: "#cbd5e1",
            borderColor: "rgba(148,163,184,0.3)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { size: 12, weight: "bold" as any },
            bodyFont: { size: 12 },
            callbacks: {
              title: (items: TooltipItem<"bar">[]) => items[0]?.label ?? "",
              label: (item: TooltipItem<"bar">) => {
                const label = item.dataset.label ?? "";
                const val = item.parsed.y as number;
                const idx = item.dataIndex;
                const prevData = item.datasetIndex < 3 ? [
                  allCheckpoints.map((c: CheckpointData) => c.grade9),
                  allCheckpoints.map((c: CheckpointData) => c.grade10),
                  allCheckpoints.map((c: CheckpointData) => c.preAP),
                ][item.datasetIndex] : null;
                const prev = prevData && idx > 0 ? prevData[idx - 1] : null;
                const delta = prev !== null ? (val - prev).toFixed(1) : null;
                const deltaStr = delta !== null ? (parseFloat(delta) >= 0 ? ` (+${delta} pts)` : ` (${delta} pts)`) : "";
                const nArr = nData[label];
                const nStr = nArr ? `  n=${nArr[idx]}` : "";
                return ` ${label}: ${val}%${deltaStr}${nStr}`;
              },
              afterBody: (items: TooltipItem<"bar">[]) => {
                const idx = items[0]?.dataIndex;
                if (idx === undefined) return [];
                const cp = allCheckpoints[idx];
                const schoolAvg = cp?.schoolAvg;
                return schoolAvg !== undefined ? ["", `  School Avg: ${schoolAvg}%`] : [];
              },
            },
          },
          datalabels: false as any,
        },
        scales: {
          y: {
            min: 0, max: 70,
            ticks: { callback: (v: any) => `${v}%`, font: { size: 11 }, stepSize: 10 },
            grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
            border: { dash: [4, 4] },
          },
          x: {
            ticks: { font: { size: 11, weight: "600" as any }, padding: 6 },
            grid: { display: false },
          },
        },
        hover: { mode: "index" as const, intersect: false },
      },
    });
  };

  useEffect(() => {
    buildChart();
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [extraCheckpoints]);

  const handleFile = (file: File) => {
    setUploading(true); setUploadError(null); setUploadSuccess(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const result = parseBenchmarkCSV(text);
      if (!result) {
        setUploadError("Could not parse file. Make sure it is a 'performance-by-students' CSV from the benchmark platform.");
        setUploading(false); return;
      }
      const newCP: CheckpointData = { label: pendingLabel, ...result };
      const updated = [...extraCheckpoints.filter((c: CheckpointData) => c.label !== pendingLabel), newCP];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setExtraCheckpoints(updated);
      setUploadSuccess(`✓ ${pendingLabel} data loaded — Grade 9: ${result.grade9}%, Grade 10: ${result.grade10}%, Pre-AP: ${result.preAP}%`);
      setUploading(false); setShowUpload(false);
    };
    reader.onerror = () => { setUploadError("File read error. Please try again."); setUploading(false); };
    reader.readAsText(file);
  };

  const removeExtra = (label: string) => {
    const updated = extraCheckpoints.filter((c: CheckpointData) => c.label !== label);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setExtraCheckpoints(updated);
  };

  const lastCP = allCheckpoints[allCheckpoints.length - 1];

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-5 pt-4 pb-2 flex flex-wrap gap-3 items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Grade-Level Performance: Grade 9 vs Grade 10 vs Pre-AP</h3>
          <p className="text-xs text-slate-500 mt-0.5">Average score % across benchmark checkpoints · Excludes absent students · Source: Benchmark platform student-level data</p>
        </div>
        <button
          onClick={() => { setShowUpload((v: boolean) => !v); setUploadError(null); setUploadSuccess(null); }}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload New Checkpoint
        </button>
      </div>

      {showUpload && (
        <div className="mx-5 mb-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-semibold text-blue-800 mb-2">Upload a new benchmark checkpoint</p>
          <p className="text-xs text-blue-600 mb-3">Upload the <strong>performance-by-students</strong> CSV exported from the benchmark platform. The chart will update automatically.</p>
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <label className="text-xs text-slate-600 font-medium">Checkpoint label:</label>
            <input
              type="text"
              value={pendingLabel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPendingLabel(e.target.value)}
              className="text-xs border border-slate-300 rounded px-2 py-1 w-36 bg-white"
              placeholder="e.g. Q3 (Jun 2026)"
            />
          </div>
          <div
            className="border-2 border-dashed border-blue-300 rounded-lg p-5 text-center cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e: React.DragEvent) => e.preventDefault()}
            onDrop={(e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          >
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            {uploading
              ? <p className="text-xs text-blue-600">Parsing CSV...</p>
              : <p className="text-xs text-blue-600"><strong>Click to browse</strong> or drag &amp; drop the CSV file here</p>
            }
          </div>
          {uploadError && <p className="mt-2 text-xs text-red-600 font-medium">{uploadError}</p>}
        </div>
      )}

      {uploadSuccess && (
        <div className="mx-5 mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 flex items-center justify-between">
          <p className="text-xs text-emerald-700 font-medium">{uploadSuccess}</p>
          <button onClick={() => setUploadSuccess(null)} className="text-emerald-400 hover:text-emerald-600 text-sm ml-3">&times;</button>
        </div>
      )}

      <div className="px-5 pb-5" style={{ height: 340 }}>
        <canvas ref={canvasRef} />
      </div>

      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ background: "#3b82f6" }} />
            <span className="text-slate-600"><strong>Grade 9</strong> &mdash; n&asymp;{lastCP.n9} &middot; Latest: {lastCP.grade9}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ background: "#f59e0b" }} />
            <span className="text-slate-600"><strong>Grade 10</strong> &mdash; n&asymp;{lastCP.n10} &middot; Latest: {lastCP.grade10}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ background: "#10b981" }} />
            <span className="text-slate-600"><strong>Pre-AP</strong> &mdash; n&asymp;{lastCP.nAP} &middot; Latest: {lastCP.preAP}%</span>
          </div>
        </div>
        {extraCheckpoints.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-400">Uploaded checkpoints:</span>
            {extraCheckpoints.map((c: CheckpointData) => (
              <span key={c.label} className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {c.label}
                <button onClick={() => removeExtra(c.label)} className="ml-0.5 text-blue-400 hover:text-blue-700">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pre-AP Chemistry Data ─────────────────────────────────────────────────────

const PREAP_CHEM_OVERVIEW = [
  { checkpoint: "BOY", label: "Beginning of Year", date: "Sep 2025", assigned: 130, submitted: 122, pct: 94, avgScore: 33, color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { checkpoint: "Q1",  label: "Quarter 1",         date: "Dec 2025", assigned: 127, submitted: 110, pct: 87, avgScore: 40, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { checkpoint: "Q3",  label: "Quarter 3",         date: "Apr 2026", assigned: 127, submitted: 110, pct: 87, avgScore: 57, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
];

const PREAP_CHEM_STANDARDS = [
  { code: "MS-PS1-1–6", topic: "Middle School PS1 Foundations",        q3: 90, priority: "strength", note: "Q3: 90% — MS foundations are a clear strength for Pre-AP students." },
  { code: "HS-PS1-1",   topic: "Atomic Structure & Periodic Table",    q3: 67, priority: "watch",    note: "Q3: 67%. Periodic trends and electron configuration at moderate level." },
  { code: "HS-PS1-2",   topic: "Chemical Reactions & Bonding",         q3: 67, priority: "watch",    note: "Q3: 67%. Chemical bonding and reaction types need reinforcement." },
  { code: "HS-PS1-3",   topic: "Nuclear Processes",                    q3: 69, priority: "watch",    note: "Q3: 69%. Nuclear chemistry at moderate performance level." },
  { code: "HS-PS1-4",   topic: "Thermodynamics & Energy in Reactions", q3: 69, priority: "watch",    note: "Q3: 69%. Endothermic/exothermic reactions at average." },
  { code: "HS-PS1-5",   topic: "Reaction Rates & Equilibrium",         q3: 68, priority: "watch",    note: "Q3: 68%. Equilibrium and Le Chatelier's principle need attention." },
  { code: "HS-PS1-6",   topic: "Solutions & Concentration",            q3: 69, priority: "watch",    note: "Q3: 69%. Molarity and solution chemistry at average." },
  { code: "HS-PS1-7",   topic: "Stoichiometry & Molar Relationships",  q3: 51, priority: "critical", note: "Q3: 51% — lowest HS standard. Mole calculations and stoichiometry ratios are the biggest challenge." },
  { code: "HS-PS1-8",   topic: "Properties of Matter & Phase Changes", q3: 69, priority: "watch",    note: "Q3: 69%. Phase diagrams and physical vs. chemical changes at average." },
  { code: "HS-PS3-2",   topic: "Energy Storage & Transfer",            q3: 58, priority: "watch",    note: "Q3: 58%. Energy storage concepts at moderate level." },
  { code: "HS-PS3-4",   topic: "Energy in Chemical Reactions",         q3: 58, priority: "watch",    note: "Q3: 58%. Thermochemistry and Hess's law at average." },
  { code: "HS-PS4-1",   topic: "Wave Properties & EM Spectrum",        q3: 66, priority: "watch",    note: "Q3: 66%. Wave behavior and EM spectrum at moderate level." },
  { code: "HS-PS4-3",   topic: "Wave Interactions & Technology",       q3: 66, priority: "watch",    note: "Q3: 66%. Wave-matter interactions at average." },
  { code: "HS-PS4-5",   topic: "Information Technologies & Waves",     q3: 66, priority: "watch",    note: "Q3: 66%. Digital information and wave encoding at average." },
  { code: "SEP 4/5",    topic: "Science & Engineering Practices",      q3: 57, priority: "watch",    note: "Q3: 57%. Analyzing data and using mathematics practices need continued focus." },
];

const PREAP_CHEM_LOWEST_QUESTIONS = [
  { q: "Q25", std: "HS-PS1-7",  topic: "Stoichiometry",              q3: 4  },
  { q: "Q29", std: "HS-PS1-10", topic: "Chemical Nomenclature",      q3: 11 },
  { q: "Q8",  std: "HS-PS1-1",  topic: "Periodic Trends",            q3: 22 },
  { q: "Q30", std: "HS-PS1-7",  topic: "Molar Mass Calculations",    q3: 27 },
  { q: "Q13", std: "HS-PS1-7",  topic: "Limiting Reagents",          q3: 29 },
  { q: "Q28", std: "HS-PS1-9",  topic: "Reaction Prediction",        q3: 29 },
  { q: "Q23", std: "HS-PS3-4a", topic: "Enthalpy Changes",           q3: 32 },
  { q: "Q24b",std: "HS-PS3-2",  topic: "Energy Storage (Part B)",    q3: 36 },
  { q: "Q12", std: "HS-PS1-7",  topic: "Stoichiometry Application",  q3: 42 },
  { q: "Q15", std: "—",         topic: "Mixed Concepts",             q3: 47 },
];

const PREAP_CHEM_HIGHEST_QUESTIONS = [
  { q: "Q14", std: "MS-PS1",    topic: "MS Foundations Review",      q3: 90 },
  { q: "Q7",  std: "HS-PS1-1",  topic: "Periodic Table Trends",      q3: 87 },
  { q: "Q3",  std: "HS-PS1-1+", topic: "Multi-standard Review",      q3: 87 },
  { q: "Q2",  std: "HS-PS1-1",  topic: "Atomic Number & Mass",       q3: 87 },
  { q: "Q11", std: "HS-PS3-2",  topic: "Energy Transfer",            q3: 85 },
  { q: "Q18", std: "—",         topic: "Mixed Concepts",             q3: 85 },
  { q: "Q21", std: "HS-PS3-4a", topic: "Energy in Reactions",        q3: 78 },
  { q: "Q6",  std: "HS-PS1-11", topic: "Reaction Types",             q3: 78 },
  { q: "Q5",  std: "HS-PS1-3",  topic: "Nuclear Reactions",          q3: 74 },
  { q: "Q27", std: "HS-PS1-7",  topic: "Mole Concept",               q3: 70 },
];

const PREAP_CHEM_BANDS_Q3 = [
  { band: "Exceeding Expectations",         count: 22, pct: 20, color: "#16a34a", bg: "#f0fdf4" },
  { band: "Meeting Expectations",           count: 31, pct: 28, color: "#2563eb", bg: "#eff6ff" },
  { band: "Partially Meeting Expectations", count: 41, pct: 37, color: "#d97706", bg: "#fffbeb" },
  { band: "Not Meeting Expectations",       count: 16, pct: 15, color: "#dc2626", bg: "#fef2f2" },
];

function PreAPChemistryBenchmark() {
  const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: "#fef2f2", text: "#dc2626", label: "Critical Focus" },
    watch:    { bg: "#fffbeb", text: "#b45309", label: "Watch" },
    strength: { bg: "#f0fdf4", text: "#16a34a", label: "Strength" },
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">Pre-AP Chemistry Benchmark Assessment — 2025–26</h2>
        <p className="text-sm text-slate-500 mt-0.5">Three checkpoints (BOY, Q1, Q3 — no Q2 data) · Q3: 110 of 127 students submitted (87%) · Teachers: Jayni Gryss, Samantha Roche · Standards: HS-PS1 through HS-PS4 + SEP</p>
      </div>

      {/* 3 Checkpoint Cards */}
      <div className="grid grid-cols-3 gap-4">
        {PREAP_CHEM_OVERVIEW.map((b) => (
          <div key={b.checkpoint} className="rounded-xl border p-4" style={{ borderColor: b.border, backgroundColor: b.bg }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: b.color, color: "#fff" }}>{b.checkpoint}</span>
              <span className="text-xs text-slate-500">{b.date}</span>
            </div>
            <div className="text-3xl font-black" style={{ color: b.color }}>{b.avgScore}%</div>
            <div className="text-xs text-slate-600 mt-0.5">avg school score</div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: b.border }}>
              <div className="text-xs text-slate-500">{b.submitted} / {b.assigned} submitted</div>
              <div className="text-xs font-semibold" style={{ color: b.color }}>{b.pct}% participation</div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Alert */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 flex gap-3 items-start">
        <Zap size={18} className="text-purple-500 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-purple-800">Q3 Update: +24 Points from BOY to Q3 · 57% School Average</div>
          <p className="text-sm text-purple-700 mt-0.5">
            School average rose from <strong>33% (BOY)</strong> → <strong>40% (Q1)</strong> → <strong>57% (Q3)</strong> — a strong +24 point gain.
            110 of 127 assigned students submitted (87%). <strong>37% of students are Partially Meeting Expectations</strong>.
            Critical focus: <strong>HS-PS1-7 Stoichiometry (51%)</strong> is the lowest HS standard.
            Strength: <strong>MS-PS1 Foundations (90%)</strong> shows Pre-AP students have strong foundational knowledge.
            Note: No Q2 data available for this course.
          </p>
        </div>
      </div>

      {/* Performance Bands */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Q3 Performance Band Summary</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PREAP_CHEM_BANDS_Q3.map((b) => (
            <div key={b.band} className="rounded-lg border p-4" style={{ borderColor: b.color + "40", backgroundColor: b.bg }}>
              <div className="text-2xl font-black" style={{ color: b.color }}>{b.count}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: b.color }}>{b.pct}%</div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">{b.band}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Standards Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <Target size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Standard-by-Standard: Q3 Performance</h3>
          <span className="text-xs text-slate-400 ml-1">Pre-AP Chemistry standards — Q3 April 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standard</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide" style={{color:"#7c3aed",fontWeight:700}}>Q3 ★</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PREAP_CHEM_STANDARDS.map((s, i) => {
                const pc = priorityColors[s.priority];
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">{s.code}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-semibold text-slate-800 leading-tight">{s.topic}</div>
                    </td>
                    <td className="px-3 py-3 text-center" style={{background:"#faf5ff"}}>
                      <BenchmarkMiniBar value={s.q3} color="#7c3aed" />
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: pc.bg, color: pc.text }}>{pc.label}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-500 max-w-[240px] leading-snug">{s.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 10 / Bottom 10 Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-red-100 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h3 className="text-sm font-bold text-slate-800">Bottom 10 Questions — Q3</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500">Q#</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Standard</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Topic</th>
                <th className="text-center px-3 py-2 text-xs font-semibold" style={{color:"#dc2626"}}>Q3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PREAP_CHEM_LOWEST_QUESTIONS.map((q, i) => (
                <tr key={i} className="hover:bg-red-50">
                  <td className="px-4 py-2.5"><span className="text-xs font-bold text-slate-700">{q.q}</span></td>
                  <td className="px-3 py-2.5"><span className="text-xs text-slate-500">{q.std}</span></td>
                  <td className="px-3 py-2.5 text-xs text-slate-700">{q.topic}</td>
                  <td className="px-3 py-2.5 text-center"><span className="text-xs font-bold" style={{color:"#dc2626"}}>{q.q3}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-green-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-green-100 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <h3 className="text-sm font-bold text-slate-800">Top 10 Questions — Q3</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500">Q#</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Standard</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500">Topic</th>
                <th className="text-center px-3 py-2 text-xs font-semibold" style={{color:"#16a34a"}}>Q3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PREAP_CHEM_HIGHEST_QUESTIONS.map((q, i) => (
                <tr key={i} className="hover:bg-green-50">
                  <td className="px-4 py-2.5"><span className="text-xs font-bold text-slate-700">{q.q}</span></td>
                  <td className="px-3 py-2.5"><span className="text-xs text-slate-500">{q.std}</span></td>
                  <td className="px-3 py-2.5 text-xs text-slate-700">{q.topic}</td>
                  <td className="px-3 py-2.5 text-center"><span className="text-xs font-bold" style={{color:"#16a34a"}}>{q.q3}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructional Implications */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-slate-500" />
          <h3 className="text-sm font-bold text-slate-800">Instructional Implications for Q3 Pre-AP Chemistry</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-red-50 border border-red-100 p-4">
            <div className="text-xs font-bold text-red-700 mb-2">🎯 Critical Focus</div>
            <p className="text-xs text-red-800 leading-relaxed">HS-PS1-7 Stoichiometry (51%) is the lowest HS standard. Q25 (4%) and Q29 (11%) are the two hardest questions. Prioritize mole calculations, limiting reagents, and stoichiometry ratios before MCAS.</p>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">
            <div className="text-xs font-bold text-amber-700 mb-2">⚠️ Watch Areas</div>
            <p className="text-xs text-amber-800 leading-relaxed">SEP 4/5 Science Practices (57%) and HS-PS3 Energy standards (58%) need continued attention. Q8 Periodic Trends (22%) and Q30 Molar Mass (27%) are recurring weak spots across students.</p>
          </div>
          <div className="rounded-lg bg-green-50 border border-green-100 p-4">
            <div className="text-xs font-bold text-green-700 mb-2">✅ Strengths to Leverage</div>
            <p className="text-xs text-green-800 leading-relaxed">MS-PS1 Foundations (90%) shows Pre-AP students have strong prior knowledge. Q14 MS Review (90%), Q7 Periodic Table (87%), and Q2/Q3 Atomic Structure (87%) are consistent strengths to build from.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function BenchmarkSubjectWrapper() {
  const [subject, setSubject] = useState<"biology" | "chemistry" | "preap_chemistry">("biology");
  const subjects = [
    { id: "biology" as const,        label: "Biology",          color: "#16a34a" },
    { id: "chemistry" as const,      label: "Chemistry",        color: "#1d4ed8" },
    { id: "preap_chemistry" as const, label: "Pre-AP Chemistry", color: "#7c3aed" },
  ];
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Subject selector bar */}
      <div className="px-6 pt-3 pb-0 border-b border-slate-100 bg-white shrink-0 flex items-center gap-1">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubject(s.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
              subject === s.id
                ? "border-current text-current bg-slate-50"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
            style={subject === s.id ? { color: s.color, borderColor: s.color } : {}}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-2 text-xs text-slate-400 italic">More subjects coming soon…</span>
      </div>
      {/* Subject content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {subject === "biology" && <BenchmarkAnalysis />}
        {subject === "chemistry" && <ChemistryBenchmark />}
        {subject === "preap_chemistry" && <PreAPChemistryBenchmark />}
      </div>
    </div>
  );
}

export default function MCASPrep() {
  const [tab, setTab] = useState<"bank" | "analysis" | "benchmark" | "practice">("bank");
  const [showResources, setShowResources] = useState(false);

  return (
    <div className="flex flex-col h-full min-h-0 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-0 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-end gap-0">
          <button
            onClick={() => setTab("bank")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === "bank"
                ? "border-red-600 text-red-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <BookOpen size={14} />
            Question Bank
          </button>
          <button
            onClick={() => setTab("analysis")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === "analysis"
                ? "border-red-600 text-red-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <BarChart2 size={14} />
            MCAS Results
          </button>
          <button
            onClick={() => setTab("benchmark")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === "benchmark"
                ? "border-red-600 text-red-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Activity size={14} />
            Benchmark 2025–26
          </button>
          <button
            onClick={() => setTab("practice")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === "practice"
                ? "border-red-600 text-red-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <GraduationCap size={14} />
            Pre-MCAS Practice
          </button>
        </div>
      </div>

      {/* ── Question Bank Tab ─────────────────────────────────────────────── */}
      {tab === "bank" && (
        <div className="flex flex-col flex-1 min-h-0">
          {/* Sub-header */}
          <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-white shrink-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">MCAS Biology Question Bank</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  126 released items · 2024 · 2025 · 2026 Practice · All answers verified against official DESE answer keys
                </p>
              </div>
              <button
                onClick={() => setShowResources(o => !o)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
              >
                <FileText size={13} />
                Resources &amp; PDFs
                {showResources ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            </div>

            {showResources && (
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={CANVA_DECK.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border hover:shadow-sm transition-all group"
                  style={{ backgroundColor: CANVA_DECK.bg, borderColor: CANVA_DECK.border }}
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: CANVA_DECK.color + "22" }}>
                    <Link2 size={16} style={{ color: CANVA_DECK.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: CANVA_DECK.color }}>{CANVA_DECK.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: CANVA_DECK.color }}>Canva</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug mt-0.5">{CANVA_DECK.description}</p>
                  </div>
                  <ExternalLink size={13} className="shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {YEAR_GROUPS.map(group => (
                    <div key={group.year} className="rounded-xl border overflow-hidden" style={{ borderColor: group.border }}>
                      <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: group.color }}>
                        <span className="text-sm font-bold text-white">{group.year}</span>
                        <span className="text-xs text-white/70">MCAS Biology</span>
                      </div>
                      <div className="divide-y" style={{ borderColor: group.border, backgroundColor: group.bg }}>
                        {group.items.map(item => (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-4 py-2.5 hover:brightness-95 transition-all group"
                            style={{ backgroundColor: group.bg }}
                          >
                            {item.type === "key" ? (
                              <Key size={13} style={{ color: group.color }} className="shrink-0" />
                            ) : (
                              <FileText size={13} style={{ color: group.color }} className="shrink-0" />
                            )}
                            <span className="text-xs font-medium text-slate-700 flex-1 leading-tight">{item.label}</span>
                            <ExternalLink size={11} className="shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <MCASViewer />
          </div>
        </div>
      )}

      {/* ── Results Analysis Tab ──────────────────────────────────────────── */}
      {tab === "analysis" && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <ResultsAnalysis />
        </div>
      )}

      {/* ── Benchmark 2025-26 Tab ─────────────────────────────────────────── */}
      {tab === "benchmark" && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <BenchmarkSubjectWrapper />
        </div>
      )}

      {/* ── Pre-MCAS Practice Tab ─────────────────────────────────────────── */}
      {tab === "practice" && <PreMCASPracticeTab />}
    </div>
  );
}

// PRACTICE_STRANDS now imported from mcasPracticeData.ts
const _PRACTICE_STRANDS_LEGACY = [
  {
    id: "ls1_cell",
    strand: "LS1 \u2014 Molecules to Organisms",
    std: "HS-LS1-1, LS1-4, LS1-6, LS1-7",
    topic: "Cell Transport, Body Systems & Photosynthesis",
    color: "#1565C0",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    keyDates: "May 5\u20138 & May 11\u201315",
    studentUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls1_cell_Student_6922213d.pdf",
    keyUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls1_cell_AnswerKey_6d235f55.pdf",
    highlights: ["Osmosis & plasmolysis (onion lab)", "Active vs. passive transport", "Body systems & gas exchange", "Photosynthesis & ATP"],
  },
  {
    id: "ls2_ecosystems",
    strand: "LS2 \u2014 Ecosystems",
    std: "HS-LS2-1, LS2-2, LS2-4, LS2-6",
    topic: "Food Webs, Energy Flow, Carbon Cycle & Population Dynamics",
    color: "#B5600A",
    bg: "#FFF7ED",
    border: "#FED7AA",
    keyDates: "June 1",
    studentUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls2_ecosystems_Student_f2ffffbe.pdf",
    keyUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls2_ecosystems_AnswerKey_91d3a2c6.pdf",
    highlights: ["Food webs & energy pyramids", "Carbon cycle & photosynthesis", "Population dynamics", "Invasive species & competition"],
  },
  {
    id: "ls3_heredity",
    strand: "LS3 \u2014 Heredity & Genetics",
    std: "HS-LS3-1, LS3-2, LS3-3",
    topic: "Inheritance Patterns, Mutations & Protein Synthesis",
    color: "#6A1B9A",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    keyDates: "May 19\u201322",
    studentUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls3_heredity_Student_94d35328.pdf",
    keyUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls3_heredity_AnswerKey_153417ea.pdf",
    highlights: ["Dominant/recessive inheritance", "Carrier status & pedigrees", "Mutations & gene function", "Meiosis & gamete formation"],
  },
  {
    id: "ls4_evolution",
    strand: "LS4 \u2014 Evolution & Natural Selection",
    std: "HS-LS4-1, LS4-2, LS4-4",
    topic: "Natural Selection, Adaptation, Speciation & Evidence for Evolution",
    color: "#2E7D32",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    keyDates: "May 26\u201329",
    studentUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls4_evolution_Student_cd950186.pdf",
    keyUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/MCAS_Practice_ls4_evolution_AnswerKey_04c4478a.pdf",
    highlights: ["Rock pocket mice & natural selection", "Antibiotic resistance", "Vestigial structures & ancestry", "Reproductive isolation & speciation"],
  },
];

// PdfViewerModal replaced by MCASPracticeViewer (interactive HTML viewer)

function PreMCASPracticeTab() {
  const [viewerState, setViewerState] = React.useState<{ strandId: string; mode: "student" | "key" } | null>(null);
  const [pdfViewerUrl, setPdfViewerUrl] = React.useState<{ url: string; title: string } | null>(null);

  const activeStrand = viewerState ? MCAS_PRACTICE_STRANDS.find(s => s.id === viewerState.strandId) : null;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Interactive Practice Viewer */}
      {activeStrand && viewerState && (
        <MCASPracticeViewer
          strand={activeStrand}
          mode={viewerState.mode}
          onClose={() => setViewerState(null)}
        />
      )}

      {/* PDF Viewer for pacing calendar */}
      {pdfViewerUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          onClick={() => setPdfViewerUrl(null)}
        >
          <div
            className="relative flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{ width: "min(92vw, 900px)", height: "min(92vh, 800px)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
              <span className="text-sm font-semibold text-slate-800 truncate">{pdfViewerUrl.title}</span>
              <div className="flex items-center gap-2 shrink-0">
                <a href={pdfViewerUrl.url} download className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors">
                  <Download size={12} /> Download PDF
                </a>
                <button onClick={() => setPdfViewerUrl(null)} className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors text-lg font-bold">×</button>
              </div>
            </div>
            <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfViewerUrl.url)}&embedded=true`} className="flex-1 w-full border-0" title={pdfViewerUrl.title} />
          </div>
        </div>
      )}

      {/* Header banner */}
      <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex flex-wrap gap-4 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-900">Pre-MCAS Biology Practice — June 2026</h2>
          <p className="text-sm text-slate-500 mt-0.5">MCAS exam: June 2–3, 2026 · 18 instructional days remaining · All documents aligned to Massachusetts Biology standards</p>
        </div>
        <button
          onClick={() => setPdfViewerUrl({ url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/PreMCAS_Biology_Visual_Timeline_v4_bf093ef4.pdf", title: "Pre-MCAS Biology Pacing Calendar — June 2026" })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800 transition-colors shrink-0"
        >
          <Calendar size={14} />
          View Pacing Calendar
        </button>
      </div>

      {/* Strand cards */}
      {MCAS_PRACTICE_STRANDS.map(strand => (
        <div key={strand.id} className="rounded-xl border overflow-hidden" style={{ borderColor: strand.border }}>
          {/* Strand header */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: strand.color }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white">{strand.strand}</span>
                <span className="text-xs text-white/70 font-mono">{strand.std}</span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">{strand.topic}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-xs text-white/60">Pacing window</div>
              <div className="text-sm font-bold text-white">{strand.keyDates}</div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-4 flex flex-wrap gap-4 items-start" style={{ backgroundColor: strand.bg }}>
            {/* Key topics */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Key Topics</div>
              <div className="flex flex-wrap gap-1.5">
                {strand.highlights.map(h => (
                  <span key={h} className="text-xs px-2.5 py-1 rounded-full border font-medium"
                    style={{ borderColor: strand.border, color: strand.color, backgroundColor: "white" }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>

              {/* Action buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              {/* Student Practice — View (interactive) + Download PDF */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setViewerState({ strandId: strand.id, mode: "student" })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: strand.color }}
                >
                  <FileText size={12} />
                  View Practice
                </button>
                <a
                  href={strand.studentUrl}
                  download
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border hover:opacity-80 transition-opacity"
                  style={{ borderColor: strand.color, color: strand.color, backgroundColor: "white" }}
                >
                  <Download size={12} />
                  PDF
                </a>
              </div>
              {/* Teacher Answer Key — View (interactive) + Download PDF */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setViewerState({ strandId: strand.id, mode: "key" })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border hover:opacity-80 transition-opacity"
                  style={{ borderColor: strand.border, color: strand.color, backgroundColor: "white" }}
                >
                  <Key size={12} />
                  Answer Key
                </button>
                <a
                  href={strand.keyUrl}
                  download
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border hover:opacity-80 transition-opacity"
                  style={{ borderColor: strand.border, color: strand.color, backgroundColor: "white" }}
                >
                  <Download size={12} />
                  PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Open Response tip */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex gap-3 items-start">
        <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-amber-900">Open Response Practice — Priority Focus</div>
          <p className="text-sm text-amber-800 mt-1 leading-relaxed">
            NBHS students have consistently scored below the state average on constructed response items (NBHS avg 19–22% vs. state avg 40–46%). Each practice document includes one 4-point open response question with a reading passage. Use the teacher answer key rubric to score student responses and provide targeted feedback before the June 2–3 exam.
          </p>
        </div>
      </div>

    </div>
  );
}
