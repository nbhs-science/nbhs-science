/**
 * Curriculum Page
 * Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
 * Shows OpenSciEd Biology, Chemistry, Physics units + Department Instructional Materials
 */

import { useState } from "react";
import { ExternalLink, BookOpen, FolderOpen, FlaskConical, Microscope, Zap, Download, Dna } from "lucide-react";
import BiologyPacingMap from "./BiologyPacingMap";

type Subject = "biology" | "chemistry" | "physics" | "pre-ap-bio" | "pre-ap-chem";

interface Unit {
  code: string;
  title: string;
  question: string;
  url: string;
}

const units: Record<Subject, Unit[]> = {
  "pre-ap-bio": [],
  "pre-ap-chem": [],
  biology: [
    {
      code: "B.1",
      title: "Ecosystem Interactions & Dynamics",
      question: "How do ecosystems work, and how can understanding them help us protect them?",
      url: "https://openscied.org/instructional-materials/b-1/",
    },
    {
      code: "B.2",
      title: "Ecosystems: Matter & Energy",
      question: "What causes fires in ecosystems to burn, and how should we manage them?",
      url: "https://openscied.org/instructional-materials/b-2/",
    },
    {
      code: "B.3",
      title: "Inheritance & Variation of Traits",
      question: "Who gets cancer and why? What can we do about it?",
      url: "https://openscied.org/instructional-materials/b-3/",
    },
    {
      code: "B.4",
      title: "Natural Selection & Evolution of Populations",
      question: "How does urbanization affect nonhuman populations, and how do populations adapt?",
      url: "https://openscied.org/instructional-materials/b-4/",
    },
    {
      code: "B.5",
      title: "Common Ancestry & Speciation",
      question: "What will happen to Arctic bear populations as their environment changes?",
      url: "https://openscied.org/instructional-materials/b-5/",
    },
  ],
  chemistry: [
    {
      code: "C.1",
      title: "Thermodynamics in Earth's Systems",
      question: "How can we slow the flow of energy on Earth to protect vulnerable communities?",
      url: "https://openscied.org/instructional-materials/c-1/",
    },
    {
      code: "C.2",
      title: "Structure & Properties of Matter",
      question: "What causes lightning and why are some places safer than others when it strikes?",
      url: "https://openscied.org/instructional-materials/c-2/",
    },
    {
      code: "C.3",
      title: "Molecular Processes in Earth Systems",
      question: "How can we find, make, and recycle the substances we need to live?",
      url: "https://openscied.org/instructional-materials/c-3/",
    },
    {
      code: "C.4",
      title: "Chemical Reactions in our World",
      question: "Why are oysters dying, and how can we use chemistry to protect them?",
      url: "https://openscied.org/instructional-materials/c-4/",
    },
    {
      code: "C.5",
      title: "Energy from Chemical & Nuclear Processes",
      question: "How can chemistry help us evaluate fuels and transportation options?",
      url: "https://openscied.org/instructional-materials/c-5/",
    },
  ],
  physics: [
    {
      code: "P.1",
      title: "Energy Flow from Earth's Systems",
      question: "How can we design more reliable systems to meet our communities' energy needs?",
      url: "https://openscied.org/instructional-materials/p-1/",
    },
    {
      code: "P.2",
      title: "Energy, Forces, & Earth's Crust",
      question: "How do forces in Earth's interior determine what will happen to the surface?",
      url: "https://openscied.org/instructional-materials/p-2/",
    },
    {
      code: "P.3",
      title: "Collisions & Momentum",
      question: "What can we do to make driving safer for everyone?",
      url: "https://openscied.org/instructional-materials/p-3/",
    },
    {
      code: "P.4",
      title: "Meteors, Orbits, & Gravity",
      question: "How have collisions with objects from space changed Earth in the past, and what can we do about future impacts?",
      url: "https://openscied.org/instructional-materials/p-4/",
    },
    {
      code: "P.5",
      title: "Electromagnetic Radiation",
      question: "How do we use radiation in our lives, and is it safe for humans?",
      url: "https://openscied.org/instructional-materials/p-5/",
    },
    {
      code: "P.6",
      title: "Stars & the Big Bang",
      question: "Why do stars shine and will they shine forever?",
      url: "https://openscied.org/instructional-materials/p-6/",
    },
  ],
};

const PRE_AP_BIO_GUIDE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Pre-APBioCourseGuide_24482b3c.pdf";
const PRE_AP_CHEM_GUIDE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/pre-ap-chemistry-cg-wr_cd39334f.pdf";

const subjectConfig: Record<Subject, { label: string; icon: React.ReactNode; color: string; oseUrl: string }> = {
  biology: {
    label: "Biology",
    icon: <Microscope size={16} />,
    color: "#2D6A4F",
    oseUrl: "https://openscied.org/curriculum/high-school/high-school-instructional-materials/",
  },
  chemistry: {
    label: "Chemistry",
    icon: <FlaskConical size={16} />,
    color: "#1A4E8A",
    oseUrl: "https://openscied.org/curriculum/high-school/high-school-instructional-materials/",
  },
  physics: {
    label: "Physics",
    icon: <Zap size={16} />,
    color: "#7B2D8B",
    oseUrl: "https://openscied.org/curriculum/high-school/high-school-instructional-materials/",
  },
  "pre-ap-bio": {
    label: "Pre-AP Biology",
    icon: <Dna size={16} />,
    color: "#B30000",
    oseUrl: "",
  },
  "pre-ap-chem": {
    label: "Pre-AP Chemistry",
    icon: <FlaskConical size={16} />,
    color: "#C47A00",
    oseUrl: "",
  },
};

export default function Curriculum() {
  const [activeSubject, setActiveSubject] = useState<Subject>("biology");
  const config = subjectConfig[activeSubject];
  const subjectUnits = units[activeSubject as Exclude<Subject, "lab-safety">] ?? [];

  return (
    <div className="flex flex-col bg-white">
      {/* Page Header */}
      <div
        className="px-5 py-5 border-b flex-shrink-0"
        style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
      >
        <div className="flex items-center gap-3 mb-1">
          <BookOpen size={18} style={{ color: "#B30000" }} />
          <h1
            className="text-[20px] font-black leading-tight"
            style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
          >
            Curriculum
          </h1>
        </div>
        <p className="text-[13px] ml-7" style={{ fontFamily: "'Merriweather', serif", color: "#666" }}>
          OpenSciEd High School Instructional Materials · 2025–26
        </p>
      </div>

      {/* Subject Tabs */}
      <div
        className="flex border-b flex-shrink-0 overflow-x-auto"
        style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA", scrollbarWidth: "none" }}
      >
        {(Object.keys(subjectConfig) as Subject[]).map((subj) => {
          const isActive = activeSubject === subj;
          return (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className="flex items-center gap-1.5 px-3 md:px-5 py-2.5 text-[11px] md:text-[13px] font-bold uppercase tracking-wider transition-all border-b-2 flex-shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                borderBottomColor: isActive ? subjectConfig[subj].color : "transparent",
                color: isActive ? subjectConfig[subj].color : "#888",
                backgroundColor: "transparent",
              }}
            >
              {subjectConfig[subj].icon}
              {subjectConfig[subj].label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-2xl pt-5 px-4 md:px-6">

          {/* Pre-AP Chemistry content */}
          {activeSubject === "pre-ap-chem" && (
            <div className="mb-6">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#888" }}
              >
                Course Materials
              </div>
              <a
                href={PRE_AP_CHEM_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border-2 transition-all"
                style={{ borderColor: "#C47A00", textDecoration: "none", backgroundColor: "#FFFBF0" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#C47A00" }}
                >
                  <Download size={18} color="#FFFFFF" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[14px] font-bold"
                    style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
                  >
                    Pre-AP Chemistry Course Guide
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "#555" }}>
                    College Board · PDF
                  </div>
                </div>
                <ExternalLink size={15} style={{ color: "#C47A00", flexShrink: 0 }} />
              </a>
              <div
                className="mt-6 p-4 border"
                style={{ borderColor: "#E0E0E0", backgroundColor: "#FAFAFA" }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#888" }}
                >
                  About Pre-AP Chemistry
                </div>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "'Merriweather', serif", color: "#444" }}
                >
                  Pre-AP Chemistry is a College Board course that builds the foundational chemistry knowledge and science practices students need to succeed in AP Chemistry and college-level science. It focuses on atomic structure, chemical bonding, reactions, and quantitative reasoning.
                </p>
              </div>
            </div>
          )}

          {/* Pre-AP Biology content */}
          {activeSubject === "pre-ap-bio" && (
            <div className="mb-6">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#888" }}
              >
                Course Materials
              </div>
              <a
                href={PRE_AP_BIO_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border-2 transition-all"
                style={{ borderColor: "#B30000", textDecoration: "none", backgroundColor: "#FFF5F5" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#B30000" }}
                >
                  <Download size={18} color="#FFFFFF" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[14px] font-bold"
                    style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
                  >
                    Pre-AP Biology Course Guide
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "#555" }}>
                    College Board · PDF
                  </div>
                </div>
                <ExternalLink size={15} style={{ color: "#B30000", flexShrink: 0 }} />
              </a>
              <div
                className="mt-6 p-4 border"
                style={{ borderColor: "#E0E0E0", backgroundColor: "#FAFAFA" }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#888" }}
                >
                  About Pre-AP Biology
                </div>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "'Merriweather', serif", color: "#444" }}
                >
                  Pre-AP Biology is a College Board course designed to prepare students for AP Biology and college-level science. It emphasizes science practices, disciplinary core ideas, and cross-cutting concepts aligned with the Next Generation Science Standards (NGSS).
                </p>
              </div>
            </div>
          )}

          {/* Biology Pacing Map — shown inside Biology tab */}
          {activeSubject === "biology" && (
            <div className="mb-6">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#888" }}
              >
                Pacing Map
              </div>
              <BiologyPacingMap />
            </div>
          )}

          {/* Department Instructional Materials — Biology only */}
          {activeSubject === "biology" && (
            <div className="mb-6">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#888" }}
              >
                Department Resources
              </div>
              <a
                href="https://drive.google.com/drive/folders/1kUKMvEtaoZbBvZtZzHv7rEwlBz5XVqaC?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border-2 transition-all"
                style={{ borderColor: "#2D6A4F", textDecoration: "none", backgroundColor: "#F0FAF4" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#2D6A4F" }}
                >
                  <FolderOpen size={18} color="#FFFFFF" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[14px] font-bold"
                    style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
                  >
                    Department Instructional Materials — Biology
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "#555" }}>
                    NBHS Science Department · Google Drive
                  </div>
                </div>
                <ExternalLink size={15} style={{ color: "#2D6A4F", flexShrink: 0 }} />
              </a>
            </div>
          )}

          {/* OpenSciEd Units */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "#888" }}
              >
                OpenSciEd Units · {config.label}
              </div>
              <a
                href={config.oseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: config.color, textDecoration: "none" }}
              >
                View All on OpenSciEd
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {subjectUnits.map((unit) => (
                <a
                  key={unit.code}
                  href={unit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 border transition-all hover:border-gray-400"
                  style={{ borderColor: "#E0E0E0", textDecoration: "none", backgroundColor: "#FFFFFF" }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-[12px] font-black"
                    style={{ backgroundColor: config.color, color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {unit.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[13px] font-bold leading-tight"
                      style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}
                    >
                      {unit.title}
                    </div>
                    <div
                      className="text-[12px] mt-1 leading-relaxed"
                      style={{ fontFamily: "'Merriweather', serif", color: "#666" }}
                    >
                      {unit.question}
                    </div>
                  </div>
                  <ExternalLink size={14} style={{ color: "#BBBBBB", flexShrink: 0, marginTop: 2 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
