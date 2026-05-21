// NBHS Science Department — Lab Safety Page
// Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
// Responsive: mobile-first, stacks on phone, side-by-side on laptop

import { ExternalLink, AlertTriangle, FileText, Shield } from "lucide-react";

interface SafetyRule {
  number: number;
  title: string;
  body: string;
  badge?: string;
  badgeColor?: string;
  links?: { label: string; url: string; type: "doc" | "pdf" | "form" | "external" }[];
}

const SAFETY_RULES: SafetyRule[] = [
  {
    number: 1,
    title: "Storage and Documentation of Hazardous Chemicals",
    badge: "Room B370",
    badgeColor: "#1A1A1A",
    body: "Hazardous chemicals at NBHS are securely stored and locked in Room B370. A comprehensive Material Safety Data Sheet (MSDS) binder is maintained to document all chemicals (physical copy available for review). Science teachers may access these chemicals for classroom experiments with prior notice, and unused hazardous chemicals must be returned to Room B370 after use.",
  },
  {
    number: 2,
    title: "Storage of Food-Grade Materials",
    badge: "Prep Room",
    badgeColor: "#1A1A1A",
    body: "Non-hazardous, food-grade materials such as baking soda, sodium chloride, dextrose, and low-concentration acetic acid (vinegar) are stored and locked in the classroom preparation room. MSDS binders are required in all science classrooms housing these chemicals.",
    links: [
      {
        label: "Instructions for Teachers — How to Create an MSDS Binder",
        url: "https://docs.google.com/document/d/1mq1JNg3iW9wkhmdh2gOACKDlpMT72OG9Kk2AN33rfNM/edit",
        type: "doc",
      },
    ],
  },
  {
    number: 3,
    title: "Online Chemical Tracking Log",
    badge: "Required",
    badgeColor: "#B30000",
    body: "Teachers must complete the online chemicals tracking log every time chemicals are retrieved from or returned to Room B370. This log is mandatory and must be completed before removing any chemical from storage.",
    links: [
      {
        label: "Online Chemicals Tracking Log",
        url: "https://docs.google.com/document/d/1XFMkenhQ1lZLGD_tjChWi5wgAsPeIOLVVxf8cTobiSw/edit?usp=sharing",
        type: "form",
      },
    ],
  },
  {
    number: 4,
    title: "Laboratory Safety Agreement",
    badge: "Signature Required",
    badgeColor: "#B30000",
    body: "The Lab Safety Agreement must be signed by parents/guardians and students before participating in any science experiments involving chemicals and/or biomaterials. Signed agreements must be on file before any lab activity begins.",
    links: [
      {
        label: "Lab Safety Agreement — Google Drive Folder",
        url: "https://drive.google.com/drive/folders/1pIiYvRTpJLq_Mvwp6dFmgqqEcXSzyJl-?usp=sharing",
        type: "doc",
      },
    ],
  },
  {
    number: 5,
    title: "Dissection Safety and Protocol",
    badge: "DESE Aligned",
    badgeColor: "#1A1A1A",
    body: "All teachers and students must adhere to DESE dissection guidelines and NSTA safety rules. Sharp objects such as dissection scalpels must be securely stored and locked in the science preparation room at all times when not in active use.",
    links: [
      {
        label: "DESE Dissection Guidelines (Appendix XII)",
        url: "https://www.doe.mass.edu/frameworks/scitech/2016-04/AppendixXII.pdf",
        type: "pdf",
      },
      {
        label: "NSTA — Responsible Use of Live Animals and Dissection",
        url: "https://www.nsta.org/nstas-official-positions/responsible-use-live-animals-and-dissection-science-classroom",
        type: "external",
      },
    ],
  },
  {
    number: 6,
    title: "Safety Rule Review",
    badge: "Annual",
    badgeColor: "#555555",
    body: "Teachers are required to review lab safety rules with students at the beginning of each school year. This review must be documented and the signed Lab Safety Agreement must be collected before any laboratory activity takes place.",
  },
  {
    number: 7,
    title: "Incident Reporting",
    badge: "Immediate",
    badgeColor: "#B30000",
    body: "Any suspicious activities occurring in science laboratories or damaged chemical storage containers must be promptly reported to school administrators. Do not attempt to handle damaged containers — report immediately and secure the area.",
  },
];

const LINK_TYPE_LABELS: Record<string, string> = {
  doc: "Google Doc",
  pdf: "PDF",
  form: "Google Form",
  external: "External Link",
};

export default function LabSafety() {
  return (
    <div className="flex flex-col bg-white min-h-screen" style={{ fontFamily: "'Work Sans', sans-serif" }}>

      {/* Page Header */}
      <div className="bg-[#1A1A1A] px-4 md:px-8 py-5 md:py-7">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#B30000] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[#B30000] text-[10px] font-black tracking-[3px] uppercase mb-1">
              NBHS Science Department
            </div>
            <h1 className="text-white text-xl md:text-3xl font-black leading-tight">
              Laboratory Safety Guidelines
            </h1>
            <p className="text-[#AAAAAA] text-xs md:text-sm font-medium mt-2 leading-relaxed" style={{ fontFamily: "'Merriweather', serif" }}>
              The NBHS Science Department is committed to ensuring the safety of all students and staff during laboratory activities involving chemical and biological materials. Our safety protocol adheres to the guidelines outlined in the DESE's Safety &amp; Practices and Legal Requirements document.
            </p>
          </div>
        </div>
      </div>

      {/* Reference Standards */}
      <div className="bg-[#F4F4F4] border-b border-[#E0E0E0] px-4 md:px-8 py-4">
        <div className="text-[10px] font-black tracking-[3px] uppercase text-[#888888] mb-3">
          Governing Standards &amp; References
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <a
            href="https://www.doe.mass.edu/frameworks/scitech/2016-04/AppendixXI.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 bg-white border border-[#E0E0E0] px-3 py-2.5 hover:border-[#B30000] hover:bg-[#FFF5F5] transition-colors group flex-1"
          >
            <FileText className="w-4 h-4 text-[#B30000] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-xs md:text-sm font-black text-[#1A1A1A] group-hover:text-[#B30000] leading-tight">
                DESE Safety &amp; Practices — Appendix XI
              </div>
              <div className="text-[11px] text-[#888888] mt-0.5 leading-tight">
                MA DESE Science Framework · PDF
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-[#CCCCCC] group-hover:text-[#B30000] flex-shrink-0 mt-1 ml-auto" />
          </a>
          <a
            href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1450"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 bg-white border border-[#E0E0E0] px-3 py-2.5 hover:border-[#B30000] hover:bg-[#FFF5F5] transition-colors group flex-1"
          >
            <FileText className="w-4 h-4 text-[#B30000] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-xs md:text-sm font-black text-[#1A1A1A] group-hover:text-[#B30000] leading-tight">
                OSHA Laboratory Standard — 29 CFR 1910.1450
              </div>
              <div className="text-[11px] text-[#888888] mt-0.5 leading-tight">
                Federal OSHA Hazardous Chemicals Standard
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-[#CCCCCC] group-hover:text-[#B30000] flex-shrink-0 mt-1 ml-auto" />
          </a>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#FFF8F0] border-b-2 border-[#B30000] px-4 md:px-8 py-3 flex items-start gap-2 md:gap-3">
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-[#B30000] flex-shrink-0 mt-0.5" />
        <p className="text-xs md:text-sm font-bold text-[#1A1A1A] leading-snug">
          All lab activities require a signed Lab Safety Agreement on file before students may participate. See Rule 4 below.
        </p>
      </div>

      {/* Rules List */}
      <div className="px-4 md:px-8 py-5 md:py-6">
        <div className="text-[10px] font-black tracking-[3px] uppercase text-[#888888] mb-4">
          Safety Rules &amp; Protocols — 7 Items
        </div>
        <div className="space-y-3 md:space-y-4">
          {SAFETY_RULES.map((rule) => (
            <div
              key={rule.number}
              className="bg-white border border-[#E8E8E8] border-l-4"
              style={{ borderLeftColor: "#B30000" }}
            >
              <div className="flex items-start gap-3 md:gap-5 p-4 md:p-6">
                {/* Number badge */}
                <div
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 text-white font-black text-base md:text-lg"
                  style={{ backgroundColor: "#B30000" }}
                >
                  {rule.number}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3
                      className="text-sm md:text-base font-black text-[#1A1A1A] leading-tight"
                      style={{ fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {rule.title}
                    </h3>
                    {rule.badge && (
                      <span
                        className="text-[9px] md:text-[10px] font-black tracking-[2px] uppercase px-2 py-0.5 text-white flex-shrink-0"
                        style={{ backgroundColor: rule.badgeColor || "#1A1A1A" }}
                      >
                        {rule.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs md:text-sm text-[#444444] leading-relaxed mb-3"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {rule.body}
                  </p>
                  {rule.links && rule.links.length > 0 && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      {rule.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#F4F4F4] hover:bg-[#1A1A1A] px-3 py-2 text-xs font-black text-[#1A1A1A] hover:text-white transition-colors group"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="leading-tight">{link.label}</span>
                          <span className="text-[10px] font-normal text-[#888888] group-hover:text-[#AAAAAA] ml-0.5 flex-shrink-0">
                            [{LINK_TYPE_LABELS[link.type]}]
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 md:px-8 pb-8">
        <div className="bg-[#1A1A1A] px-4 md:px-6 py-4 flex items-start gap-3">
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#B30000] flex-shrink-0 mt-0.5" />
          <p className="text-[#AAAAAA] text-xs md:text-sm leading-relaxed" style={{ fontFamily: "'Merriweather', serif" }}>
            <span className="text-white font-black">Source: </span>
            These guidelines are drawn from the{" "}
            <a
              href="https://docs.google.com/document/d/17RdCjK9Lenm3Fcw72cqG17DQlVFkZRV7VLERBGGuX8M/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B30000] hover:underline font-bold"
            >
              NBHS Science Department Lab Safety Rules
            </a>{" "}
            document. For questions or updates, contact the Science Department Head.
          </p>
        </div>
      </div>
    </div>
  );
}
