// Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
// Page: Department PD — displays all department-wide PD sessions organized chronologically

import { departmentPDs, DepartmentPD } from "@/lib/plcData";
import { Calendar, CheckCircle, Clock, ChevronLeft, Download } from "lucide-react";
import { useState } from "react";

function computeStatus(dateStr: string): DepartmentPD["status"] {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const sessionDate = new Date(dateStr + "T00:00:00");
  if (dateStr === todayStr) return "today";
  if (sessionDate < today) return "completed";
  return "upcoming";
}

function StatusBadge({ status }: { status: DepartmentPD["status"] }) {
  if (status === "completed") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ backgroundColor: "#D4EDDA", color: "#155724" }}
      >
        <CheckCircle size={10} /> Completed
      </span>
    );
  }
  if (status === "today") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ backgroundColor: "#FFF3CD", color: "#856404" }}
      >
        <Clock size={10} /> Today
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
      style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
    >
      <Clock size={10} /> Upcoming
    </span>
  );
}

export default function DepartmentPDPage() {
  const [selected, setSelected] = useState<string | null>(departmentPDs[departmentPDs.length - 1].id);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  const sorted = [...departmentPDs].sort((a, b) => a.date.localeCompare(b.date));
  const selectedPD = sorted.find((pd) => pd.id === selected) || null;

  const handleSelect = (id: string) => {
    setSelected(id);
    setMobileView("detail");
  };

  return (
    <div className="flex flex-col md:flex-row" style={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>

      {/* ── List Panel ── */}
      <div
        className={`${mobileView === "list" ? "flex" : "hidden"} md:flex flex-col shrink-0 bg-white border-r w-full md:w-72`}
        style={{ borderColor: "#E8E8E8" }}
      >
        {/* Panel header */}
        <div className="px-4 md:px-5 pt-4 md:pt-6 pb-3 border-b" style={{ borderColor: "#E8E8E8" }}>
          <h2
            className="text-[22px] font-black mb-1"
            style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
          >
            Department PD
          </h2>
          <p className="text-[13px]" style={{ color: "#888" }}>
            2025–26 School Year · {sorted.length} sessions
          </p>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto">
          {sorted.map((pd) => (
            <button
              key={pd.id}
              onClick={() => handleSelect(pd.id)}
              className="w-full text-left px-4 md:px-5 py-4 border-b transition-all"
              style={{
                borderColor: "#F0F0F0",
                borderLeft: selected === pd.id ? "3px solid #B30000" : "3px solid transparent",
                backgroundColor: selected === pd.id ? "#FFF5F5" : "transparent",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <StatusBadge status={computeStatus(pd.date)} />
              </div>
              <p className="text-[11px] font-medium mb-1" style={{ color: "#999" }}>
                {pd.displayDate}
              </p>
              <p
                className="text-[13px] font-semibold leading-snug"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  color: selected === pd.id ? "#B30000" : "#1A1A1A",
                }}
              >
                {pd.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div
        className={`${mobileView === "detail" ? "flex" : "hidden"} md:flex flex-col flex-1`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Mobile back button */}
        <div className="md:hidden px-4 pt-4 pb-2 border-b" style={{ borderColor: "#E8E8E8" }}>
          <button
            onClick={() => setMobileView("list")}
            className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider"
            style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}
          >
            <ChevronLeft size={14} /> All Sessions
          </button>
        </div>

        {selectedPD ? (
          <div className="flex-1 px-5 md:px-8 py-6 md:py-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={computeStatus(selectedPD.date)} />
              </div>
              <h1
                className="text-[22px] md:text-[28px] font-bold leading-tight mb-3"
                style={{ fontFamily: "'Merriweather', serif", color: "#1A1A1A" }}
              >
                {selectedPD.title}
              </h1>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "#888" }}>
                <Calendar size={13} style={{ color: "#B30000" }} />
                <span>{selectedPD.displayDate}</span>
              </div>
            </div>

            {/* Red accent bar */}
            <div className="h-1 w-12 mb-6" style={{ backgroundColor: "#B30000" }} />

            {/* Description */}
            <div className="p-5 md:p-7 border" style={{ borderColor: "#E8E8E8", backgroundColor: "#FFFFFF" }}>
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}
              >
                Session Overview
              </div>
              <p
                className="text-[14px] leading-relaxed"
                style={{ fontFamily: "'Merriweather', serif", color: "#444" }}
              >
                {selectedPD.description}
              </p>
            </div>

            {/* Slides download */}
            {(selectedPD.slidesDownloadUrl || selectedPD.slidesUrl) && (
              <div className="mt-6 flex gap-3 flex-wrap">
                {selectedPD.slidesDownloadUrl && (
                  <a
                    href={selectedPD.slidesDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#B30000", fontFamily: "'Work Sans', sans-serif" }}
                  >
                    <Download size={14} />
                    Download Session Slides (.pptx)
                  </a>
                )}

              </div>
            )}

            {/* Resource documents */}
            {selectedPD.resources && selectedPD.resources.length > 0 && (
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "#B30000", fontFamily: "'Work Sans', sans-serif" }}>Resource Documents</p>
                <div className="flex flex-col gap-2">
                  {selectedPD.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ fontFamily: "'Work Sans', sans-serif" }}
                    >
                      <Download size={13} style={{ color: "#B30000", flexShrink: 0 }} />
                      <div>
                        <div className="text-[13px] font-semibold" style={{ color: "#1A1A1A" }}>{res.title}</div>
                        {res.description && (
                          <div className="text-[11px]" style={{ color: "#888888" }}>{res.description}</div>
                        )}
                      </div>
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-wider" style={{ color: "#AAAAAA" }}>{res.type}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination hint */}
            <p className="text-[11px] text-center mt-5" style={{ color: "#BBBBBB" }}>
              {sorted.indexOf(selectedPD) + 1} of {sorted.length} Department PD Sessions
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[13px]" style={{ color: "#BBBBBB" }}>
            Select a PD session to view details
          </div>
        )}
      </div>


    </div>
  );
}
