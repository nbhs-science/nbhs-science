/**
 * MCASPracticeViewer
 * Interactive web-based MCAS practice viewer — renders all questions natively in HTML.
 * No PDF required. Teachers and students can read, select answers, and see explanations.
 */

import React, { useState } from "react";
import { Download, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Eye, EyeOff, BookOpen, FileText } from "lucide-react";
import type { MCASStrand } from "@/lib/mcasPracticeData";

interface Props {
  strand: MCASStrand;
  mode: "student" | "key";
  onClose: () => void;
}

export default function MCASPracticeViewer({ strand, mode, onClose }: Props) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [page, setPage] = useState<"reading" | "questions" | "cr">("reading");

  const isKey = mode === "key";

  const handleSelect = (qNum: number, label: string) => {
    if (isKey) return; // key mode — no selection
    setSelected(prev => ({ ...prev, [qNum]: label }));
  };

  const toggleReveal = (qNum: number) => {
    setRevealed(prev => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const allAnswered = strand.questions.every(q => selected[q.num]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{ width: "min(96vw, 860px)", height: "min(94vh, 820px)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ backgroundColor: strand.color }}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate">{strand.strand}</div>
            <div className="text-xs text-white/70 truncate">{strand.topic}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {isKey && (
              <button
                onClick={() => setShowAllAnswers(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors"
              >
                {showAllAnswers ? <EyeOff size={12} /> : <Eye size={12} />}
                {showAllAnswers ? "Hide Answers" : "Show All Answers"}
              </button>
            )}
            <a
              href={isKey ? strand.keyUrl : strand.studentUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors"
            >
              <Download size={12} />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          {(["reading", "questions", "cr"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setPage(tab)}
              className={`px-5 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                page === tab
                  ? "border-current text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={page === tab ? { borderColor: strand.color, color: strand.color } : {}}
            >
              {tab === "reading" && "📖 Reading Passage"}
              {tab === "questions" && `📝 Multiple Choice (${strand.questions.length} questions)`}
              {tab === "cr" && "✏️ Open Response"}
            </button>
          ))}
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5" style={{ fontFamily: "'Georgia', serif" }}>

          {/* READING PASSAGE */}
          {page === "reading" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} style={{ color: strand.color }} />
                <h2 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {strand.readingTitle}
                </h2>
              </div>
              <div
                className="rounded-xl border p-5 space-y-4"
                style={{ borderColor: strand.border, backgroundColor: strand.bg }}
              >
                {strand.readingPassage.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setPage("questions")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: strand.color, fontFamily: "'Inter', sans-serif" }}
                >
                  Go to Questions <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* MULTIPLE CHOICE */}
          {page === "questions" && (
            <div className="space-y-6">
              <div
                className="rounded-lg border px-4 py-2 text-xs font-medium"
                style={{ borderColor: strand.border, backgroundColor: strand.bg, color: strand.color, fontFamily: "'Inter', sans-serif" }}
              >
                {isKey
                  ? "Teacher Answer Key — correct answers are highlighted in green with explanations."
                  : "Select the best answer for each question. Click 'Reveal' to check your answer after selecting."}
              </div>

              {strand.questions.map(q => {
                const sel = selected[q.num];
                const isRevealed = isKey || showAllAnswers || revealed[q.num];

                return (
                  <div key={q.num} className="border border-slate-200 rounded-xl overflow-hidden">
                    {/* Question header */}
                    <div className="flex items-start gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
                      <div
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                        style={{ backgroundColor: strand.color }}
                      >
                        {q.num}
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed flex-1">{q.text}</p>
                    </div>

                    {/* Choices */}
                    <div className="px-5 py-3 space-y-2">
                      {q.choices.map(choice => {
                        const isCorrect = choice.label === q.correct;
                        const isSelected = sel === choice.label;
                        const wasWrong = isSelected && !isCorrect && isRevealed;

                        let bgColor = "bg-white";
                        let borderColor = "border-slate-200";
                        let textColor = "text-slate-700";
                        let circleStyle: React.CSSProperties = { borderColor: "#cbd5e1", color: "#64748b" };

                        if (isRevealed && isCorrect) {
                          bgColor = "bg-green-50";
                          borderColor = "border-green-400";
                          textColor = "text-green-900";
                          circleStyle = { backgroundColor: "#16a34a", borderColor: "#16a34a", color: "white" };
                        } else if (wasWrong) {
                          bgColor = "bg-red-50";
                          borderColor = "border-red-300";
                          textColor = "text-red-800";
                          circleStyle = { backgroundColor: "#dc2626", borderColor: "#dc2626", color: "white" };
                        } else if (isSelected && !isRevealed) {
                          borderColor = "border-blue-400";
                          bgColor = "bg-blue-50";
                          textColor = "text-blue-900";
                          circleStyle = { backgroundColor: strand.color, borderColor: strand.color, color: "white" };
                        }

                        return (
                          <button
                            key={choice.label}
                            onClick={() => handleSelect(q.num, choice.label)}
                            disabled={isKey}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border text-left transition-all ${bgColor} ${borderColor} ${isKey ? "cursor-default" : "hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`}
                          >
                            <div
                              className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                              style={circleStyle}
                            >
                              {choice.label}
                            </div>
                            <span className={`text-sm leading-snug ${textColor}`} style={{ fontFamily: "'Georgia', serif" }}>
                              {choice.text}
                            </span>
                            {isRevealed && isCorrect && (
                              <CheckCircle2 size={16} className="shrink-0 text-green-600 mt-0.5 ml-auto" />
                            )}
                            {wasWrong && (
                              <XCircle size={16} className="shrink-0 text-red-500 mt-0.5 ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Reveal / Explanation */}
                    {!isKey && (
                      <div className="px-5 pb-3">
                        <button
                          onClick={() => toggleReveal(q.num)}
                          disabled={!sel}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            sel
                              ? "text-white hover:opacity-90"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                          style={sel ? { backgroundColor: strand.color, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
                        >
                          {revealed[q.num] ? "Hide Explanation" : "Reveal Answer"}
                        </button>
                      </div>
                    )}

                    {isRevealed && (
                      <div
                        className="mx-5 mb-4 rounded-lg border px-4 py-3"
                        style={{ borderColor: strand.border, backgroundColor: strand.bg }}
                      >
                        <div className="text-xs font-bold mb-1" style={{ color: strand.color, fontFamily: "'Inter', sans-serif" }}>
                          Correct Answer: {q.correct} — Explanation
                        </div>
                        <p className="text-xs leading-relaxed text-slate-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Score summary */}
              {!isKey && allAnswered && (
                <div
                  className="rounded-xl border px-5 py-4 text-center"
                  style={{ borderColor: strand.border, backgroundColor: strand.bg, fontFamily: "'Inter', sans-serif" }}
                >
                  <div className="text-sm font-bold text-slate-800 mb-1">All questions answered!</div>
                  <button
                    onClick={() => setShowAllAnswers(true)}
                    className="text-xs font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90"
                    style={{ backgroundColor: strand.color }}
                  >
                    Show All Answers & Explanations
                  </button>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setPage("cr")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: strand.color, fontFamily: "'Inter', sans-serif" }}
                >
                  Open Response <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* CONSTRUCTED RESPONSE */}
          {page === "cr" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <FileText size={16} style={{ color: strand.color }} />
                <h2 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Open Response Question (4 points)
                </h2>
              </div>

              {/* Prompt */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: strand.border, backgroundColor: strand.bg }}
              >
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: strand.color, fontFamily: "'Inter', sans-serif" }}>
                  Question
                </div>
                <p className="text-sm leading-relaxed text-slate-800">{strand.crPrompt}</p>
              </div>

              {/* Writing lines (student mode) */}
              {!isKey && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Write your response below:
                  </div>
                  <div className="space-y-0">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="border-b border-slate-300"
                        style={{ height: "32px" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Model answer + rubric (key mode or revealed) */}
              {isKey && (
                <>
                  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <div className="text-xs font-bold text-green-800 uppercase tracking-wide mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Model Answer
                    </div>
                    <p className="text-sm leading-relaxed text-green-900">{strand.crModelAnswer}</p>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Scoring Rubric
                    </div>
                    <div className="space-y-2">
                      {strand.crRubric.map(r => (
                        <div
                          key={r.points}
                          className="flex gap-3 items-start rounded-lg border px-4 py-3"
                          style={{ borderColor: strand.border, backgroundColor: strand.bg }}
                        >
                          <div
                            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: strand.color }}
                          >
                            {r.points}
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700">{r.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-start pt-2">
                <button
                  onClick={() => setPage("questions")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ borderColor: strand.color, color: strand.color, fontFamily: "'Inter', sans-serif" }}
                >
                  <ChevronLeft size={14} /> Back to Questions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
