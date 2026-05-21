/**
 * MCASViewer — Interactive MCAS Biology Question Browser
 *
 * Design: Dark navy top bar + clean white question area. Academic, professional.
 * Features:
 *  - Filter by category (4 reporting categories), standard (HS-LS codes), year
 *  - Full-resolution question image (CDN, no compression)
 *  - Click-to-reveal answer: SR shows correct letter(s), CR shows full scoring guide + exemplar
 *  - Keyboard navigation (← → arrows, Space to reveal)
 *  - Progress bar + dot indicators
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Filter, X, BookOpen, CheckCircle2, FileText } from "lucide-react";
import { mcasQuestions as MCAS_QUESTIONS, type MCASQuestion } from "@/lib/mcasData";

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { code: string; color: string; bg: string; border: string }> = {
  "Molecules to Organisms": { code: "LS1", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  "Heredity":               { code: "LS3", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  "Evolution":              { code: "LS4", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  "Ecology":                { code: "LS2", color: "#047857", bg: "#ecfdf5", border: "#a7f3d0" },
};

const ALL_CATEGORIES = ["Molecules to Organisms", "Heredity", "Evolution", "Ecology"] as const;
const ALL_YEARS = ["2024", "2025", "2026"] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStandardsForCategory(cat: string): string[] {
  const stds = new Set<string>();
  MCAS_QUESTIONS.filter(q => q.category === cat).forEach(q => stds.add(q.standard));
  return Array.from(stds).sort();
}

function countFor(cat: string, std: string | null, years: string[]): number {
  return MCAS_QUESTIONS.filter(q =>
    q.category === cat &&
    (std === null || q.standard === std) &&
    years.includes(q.year)
  ).length;
}

// ─── Answer display ───────────────────────────────────────────────────────────

function SRAnswer({ answer, description, meta }: {
  answer: string;
  description: string;
  meta: { color: string; bg: string; border: string };
}) {
  // Check if this is a multi-part SR question (e.g. "Part A: B, Part B: C" or "Part A: C, Part B: B, Part C: B")
  const isTwoPart = /Part [A-Z]:/i.test(answer);

  if (isTwoPart) {
    // Parse each "Part X: letter(s)" segment using lookahead to stop at next "Part [A-Z]:" boundary
    const segments: { label: string; letters: string[] }[] = [];
    const segRegex = /Part\s+([A-Z]):\s*(.*?)(?=\s*Part\s+[A-Z]:|$)/gi;
    let m: RegExpExecArray | null;
    while ((m = segRegex.exec(answer)) !== null) {
      // Extract only single A-D letters (answer choices), ignoring words like "Part"
      const letters = (m[2].match(/\b[A-D]\b/g) || []) as string[];
      if (letters.length > 0) {
        segments.push({
          label: `Part ${m[1].toUpperCase()}`,
          letters,
        });
      }
    }
    return (
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: meta.bg, borderColor: meta.border }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} style={{ color: meta.color }} className="shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: meta.color }}>
              Correct Answers
            </p>
            <div className="flex flex-col gap-3">
              {segments.map(seg => (
                <div key={seg.label} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 w-14 shrink-0">{seg.label}</span>
                  <div className="flex items-center gap-2">
                    {seg.letters.map((letter: string) => (
                      <span
                        key={letter}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg shadow-sm"
                        style={{ backgroundColor: meta.color }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard single or multi-select answer
  const parts = answer.split(/[;,]/).map(s => s.trim()).filter(Boolean);
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ backgroundColor: meta.bg, borderColor: meta.border }}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 size={20} style={{ color: meta.color }} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: meta.color }}>
            {parts.length > 1 ? "Correct Answers" : "Correct Answer"}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {parts.map(p => (
              <span
                key={p}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: meta.color }}
              >
                {p}
              </span>
            ))}
            {description && (
              <span className="text-sm text-slate-600 leading-snug">{description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CRAnswer({ crData, meta }: {
  crData: MCASQuestion["cr_data"];
  meta: { color: string; bg: string; border: string };
}) {
  if (!crData) {
    return (
      <div className="rounded-xl p-4 border border-amber-200 bg-amber-50">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">See the official DESE answer key for the scoring guide.</p>
        </div>
      </div>
    );
  }

  const parts = crData.parts || [];

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: meta.border }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: meta.color }}>
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-white shrink-0" />
          <span className="text-sm font-bold text-white uppercase tracking-wide">Open Response — Model Answers</span>
        </div>
        <span className="text-xs text-white/80">{crData.scoring_guide}</span>
      </div>

      {/* Parts with model answers */}
      <div className="divide-y" style={{ borderColor: meta.border }}>
        {parts.map((p) => (
          <div key={p.part} className="p-4" style={{ backgroundColor: meta.bg }}>
            {/* Part label + question */}
            <div className="flex gap-3 mb-3">
              <span
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: meta.color, color: "white" }}
              >
                {p.part}
              </span>
              <p className="text-sm font-semibold text-slate-700 leading-snug pt-0.5">{p.question}</p>
            </div>
            {/* Model answer */}
            <div className="ml-10 rounded-lg bg-white border p-3" style={{ borderColor: meta.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: meta.color }}>
                Model Answer
              </p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{p.model_answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Filters {
  category: string;
  standard: string | null;
  years: string[];
}

export default function MCASViewer() {
  const [filters, setFilters] = useState<Filters>({
    category: "Molecules to Organisms",
    standard: null,
    years: ["2024", "2025", "2026"],
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filtered question list
  const questions: MCASQuestion[] = MCAS_QUESTIONS.filter(q =>
    q.category === filters.category &&
    (filters.standard === null || q.standard === filters.standard) &&
    filters.years.includes(q.year)
  );

  const current: MCASQuestion | undefined = questions[questionIndex];
  const meta = CATEGORY_META[filters.category] ?? CATEGORY_META["Molecules to Organisms"];

  // Reset index when filters change
  useEffect(() => {
    setQuestionIndex(0);
    setAnswerVisible(false);
    setImgLoaded(false);
  }, [filters]);

  // Reset answer when question changes
  useEffect(() => {
    setAnswerVisible(false);
    setImgLoaded(false);
  }, [questionIndex]);

  const goNext = useCallback(() => {
    if (questionIndex < questions.length - 1) setQuestionIndex(i => i + 1);
  }, [questionIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (questionIndex > 0) setQuestionIndex(i => i - 1);
  }, [questionIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") { e.preventDefault(); setAnswerVisible(v => !v); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const standards = getStandardsForCategory(filters.category);

  const toggleYear = (yr: string) => {
    setFilters(f => {
      const next = f.years.includes(yr) ? f.years.filter(y => y !== yr) : [...f.years, yr];
      return next.length === 0 ? f : { ...f, years: next };
    });
  };

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <BookOpen size={40} className="mb-3 opacity-40" />
        <p className="text-lg font-medium">No questions match the selected filters.</p>
        <button
          onClick={() => setFilters({ category: filters.category, standard: null, years: ["2024", "2025", "2026"] })}
          className="mt-4 text-sm underline"
          style={{ color: meta.color }}
        >
          Reset filters
        </button>
      </div>
    );
  }

  const isCR = current.type?.includes("CR");

  return (
    <div className="flex flex-col h-full min-h-0" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 text-white shrink-0">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
            style={{ backgroundColor: meta.color, color: "white" }}
          >
            {CATEGORY_META[filters.category]?.code ?? "LS"}
          </span>
          <span className="font-semibold text-sm truncate max-w-[180px] sm:max-w-none">
            {filters.category}
          </span>
          {filters.standard && (
            <span className="text-xs text-slate-300 hidden sm:inline">· {filters.standard}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{questionIndex + 1} / {questions.length}</span>
          <button
            onClick={() => setFilterOpen(o => !o)}
            className="flex items-center gap-1.5 text-xs bg-slate-700 hover:bg-slate-600 transition-colors px-3 py-1.5 rounded-md"
          >
            <Filter size={13} />
            Filters
          </button>
        </div>
      </div>

      {/* ── Filter panel ─────────────────────────────────────────────────── */}
      {filterOpen && (
        <div className="bg-slate-800 text-white px-5 py-4 border-b border-slate-700 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Filter Questions</p>
            <button onClick={() => setFilterOpen(false)} className="text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </div>

          {/* Category */}
          <div className="mb-3">
            <p className="text-xs text-slate-400 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map(cat => {
                const m = CATEGORY_META[cat];
                const active = filters.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilters(f => ({ ...f, category: cat, standard: null }))}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                    style={active
                      ? { backgroundColor: m.color, color: "white" }
                      : { backgroundColor: "#334155", color: "#94a3b8" }
                    }
                  >
                    {cat} ({countFor(cat, null, filters.years)})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standard */}
          <div className="mb-3">
            <p className="text-xs text-slate-400 mb-2">Standard</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters(f => ({ ...f, standard: null }))}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={filters.standard === null
                  ? { backgroundColor: meta.color, color: "white" }
                  : { backgroundColor: "#334155", color: "#94a3b8" }
                }
              >
                All ({countFor(filters.category, null, filters.years)})
              </button>
              {standards.map(std => (
                <button
                  key={std}
                  onClick={() => setFilters(f => ({ ...f, standard: std }))}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                  style={filters.standard === std
                    ? { backgroundColor: meta.color, color: "white" }
                    : { backgroundColor: "#334155", color: "#94a3b8" }
                  }
                >
                  {std} ({countFor(filters.category, std, filters.years)})
                </button>
              ))}
            </div>
          </div>

          {/* Year */}
          <div>
            <p className="text-xs text-slate-400 mb-2">Year</p>
            <div className="flex gap-2">
              {ALL_YEARS.map(yr => (
                <button
                  key={yr}
                  onClick={() => toggleYear(yr)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                  style={filters.years.includes(yr)
                    ? { backgroundColor: meta.color, color: "white" }
                    : { backgroundColor: "#334155", color: "#94a3b8" }
                  }
                >
                  {yr === "2026" ? "2026 Practice" : yr}
                </button>
              ))}
            </div>
          </div>
          {/* Done button — closes filter on mobile */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setFilterOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ backgroundColor: meta.color }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="h-1 bg-slate-200 shrink-0">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / questions.length) * 100}%`, backgroundColor: meta.color }}
        />
      </div>

      {/* ── Question metadata strip ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border-b border-slate-200 shrink-0 flex-wrap">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-md"
          style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
        >
          {current.standard}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {current.year === "2026" ? "2026 Practice" : current.year} · Item {current.item}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            isCR ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
          }`}>
            {isCR ? "Open Response" : "Selected Response"}
          </span>
        </div>
      </div>

      {/* ── Main scrollable content ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto px-4 pt-5 pb-6 space-y-5">

          {/* Question image with overlay nav arrows */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              </div>
            )}
            <img
              key={`${current.year}_${current.item}`}
              src={current.image_url}
              alt={`MCAS ${current.year} Item ${current.item}`}
              className="w-full"
              style={{ display: imgLoaded ? "block" : "block", opacity: imgLoaded ? 1 : 0 }}
              onLoad={() => setImgLoaded(true)}
            />
            {/* Left overlay arrow — always visible on mobile */}
            {questionIndex > 0 && (
              <button
                onClick={goPrev}
                aria-label="Previous question"
                className="absolute left-0 top-0 h-full flex items-center justify-start pl-2 pr-4 z-20"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.18), transparent)", minWidth: "56px" }}
              >
                <div
                  className="flex items-center justify-center rounded-full shadow-lg"
                  style={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.92)", color: meta.color }}
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </div>
              </button>
            )}
            {/* Right overlay arrow — always visible on mobile */}
            {questionIndex < questions.length - 1 && (
              <button
                onClick={goNext}
                aria-label="Next question"
                className="absolute right-0 top-0 h-full flex items-center justify-end pr-2 pl-4 z-20"
                style={{ background: "linear-gradient(to left, rgba(0,0,0,0.18), transparent)", minWidth: "56px" }}
              >
                <div
                  className="flex items-center justify-center rounded-full shadow-lg"
                  style={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.92)", color: meta.color }}
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </div>
              </button>
            )}
          </div>

          {/* Answer section */}
          {!answerVisible ? (
            <button
              onClick={() => setAnswerVisible(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: meta.color, color: "white" }}
            >
              <Eye size={16} />
              Reveal Answer
              <span className="text-xs opacity-70 ml-1">(Space)</span>
            </button>
          ) : (
            <div className="space-y-3">
              {isCR ? (
                <CRAnswer crData={current.cr_data} meta={meta} />
              ) : (
                <SRAnswer answer={current.answer} description={""} meta={meta} />
              )}
              <button
                onClick={() => setAnswerVisible(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <EyeOff size={14} />
                Hide Answer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation footer ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-200 shrink-0" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <button
          onClick={goPrev}
          disabled={questionIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={questionIndex > 0 ? { backgroundColor: meta.bg, color: meta.color } : {}}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Dot indicators (window of 15) */}
        <div className="flex items-center gap-1 overflow-hidden max-w-[200px]">
          {questions.slice(Math.max(0, questionIndex - 7), questionIndex + 8).map((_, i) => {
            const realIdx = Math.max(0, questionIndex - 7) + i;
            return (
              <button
                key={realIdx}
                onClick={() => setQuestionIndex(realIdx)}
                className="rounded-full transition-all shrink-0"
                style={{
                  width: realIdx === questionIndex ? "10px" : "7px",
                  height: realIdx === questionIndex ? "10px" : "7px",
                  backgroundColor: realIdx === questionIndex ? meta.color : "#cbd5e1",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={goNext}
          disabled={questionIndex === questions.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={questionIndex < questions.length - 1 ? { backgroundColor: meta.bg, color: meta.color } : {}}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Hint bar — desktop only */}
      <div className="hidden sm:block text-center py-1.5 bg-slate-900 text-slate-500 text-xs shrink-0 select-none">
        <span className="hidden sm:inline">← → navigate &nbsp;·&nbsp; Space to reveal answer</span>
        <span className="sm:hidden">Swipe left / right to navigate</span>
      </div>
    </div>
  );
}
