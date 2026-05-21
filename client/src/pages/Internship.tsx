/**
 * Internship Programs — Biotech Apprenticeship + SMAST Marine Science
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Colors: Sidebar #1A1A1A, Accent #C8102E, Background #FFFFFF, Gray #F4F4F4
 */

import { useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

type ProgramId = "mlsc" | "smast";

export default function Internship({ onBioConnect }: { onBioConnect?: () => void }) {
  const [activeProgram, setActiveProgram] = useState<ProgramId>("mlsc");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: "#1A1A1A", minHeight: 200 }}>
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: "#C8102E" }} />
        <div className="px-8 py-10 md:px-14">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1"
              style={{ background: "#C8102E", color: "#fff" }}
            >
              Science Internship Programs
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            Student Research Internships
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "#AAAAAA" }}>
            NBHS Science partners with leading institutions to give students real paid research experience — in the lab and on the water.
          </p>
          <div className="mt-3">
            <span className="text-xs font-semibold tracking-widest uppercase px-2 py-1" style={{ background: "#2A2A2A", color: "#888", border: "1px solid #444" }}>2025–26 Program Year</span>
          </div>
        </div>
      </div>

      {/* Red rule */}
      <div style={{ height: 4, background: "#C8102E" }} />

      {/* Program Tabs */}
      <div className="flex border-b" style={{ borderColor: "#E5E5E5" }}>
        {([
          { id: "mlsc" as ProgramId, label: "Biotech Apprenticeship Program", sub: "After-school · Spring" },
          { id: "smast" as ProgramId, label: "SMAST Marine Science Internship", sub: "Paid summer · UMass-Dartmouth" },
        ] as { id: ProgramId; label: string; sub: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProgram(tab.id)}
            className="flex flex-col items-start px-6 py-4 text-left transition-colors"
            style={{
              borderBottom: activeProgram === tab.id ? "3px solid #C8102E" : "3px solid transparent",
              background: activeProgram === tab.id ? "#fff" : "#F4F4F4",
              color: activeProgram === tab.id ? "#1A1A1A" : "#666",
              minWidth: 0,
              flex: 1,
            }}
          >
            <span className="text-sm font-bold leading-tight" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              {tab.label}
            </span>
            <span className="text-xs mt-0.5" style={{ color: activeProgram === tab.id ? "#C8102E" : "#999" }}>
              {tab.sub}
            </span>
          </button>
        ))}
      </div>

      {/* Program Content */}
      <div className="px-8 py-10 md:px-14 max-w-5xl">
        {activeProgram === "mlsc" && <MLSCProgram onBioConnect={onBioConnect} />}
        {activeProgram === "smast" && <SMASTProgram />}
      </div>
    </div>
  );
}

/* ─── Biotech Apprenticeship Program ─────────────────────────────────────── */
function MLSCProgram({ onBioConnect }: { onBioConnect?: () => void }) {
  const PHOTOS = [
    { url: `${CDN}/IMG_41352_e03d62b0.jpg`, alt: "NBHS students working in the biotech lab with pipettes and lab equipment" },
    { url: `${CDN}/IMG_3943_4b1e729c.jpg`, alt: "NBHS students collaborating on a pipetting experiment" },
    { url: `${CDN}/IMG_41452_59aee076.jpg`, alt: "NBHS student performing gel electrophoresis" },
  ];
  const PDF_URL = `${CDN}/NBHSBiotech-ApprenticeshipChallenge2026_21e392be.pdf`;

  return (
    <>
      {/* Photo Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {PHOTOS.map((photo, i) => (
          <div key={i} className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>About the Program</div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
          NBHS Biotech — Apprenticeship Challenge
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "#333" }}>
          The High School Biotech Apprenticeship Challenge is an innovative
          after-school program that provides students with laboratory training to successfully compete for
          lab-based summer internships. Over the past four years, students have gone on to work at renowned
          research institutions like UMASS Dartmouth Biotechnology Labs and local life sciences companies.
        </p>
        <p className="text-base leading-relaxed font-semibold" style={{ color: "#1A1A1A" }}>
          All students completing the training are expected to apply for paid summer research positions.
        </p>
      </div>

      {/* BioConnect Alumni Callout */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5" style={{ background: "#FFF5F5", borderLeft: "4px solid #C8102E" }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" fill="none" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="text-sm font-bold" style={{ color: "#C8102E" }}>Biotech Program Graduate?</span>
          </div>
          <p className="text-sm" style={{ color: "#555" }}>Join <strong>BioConnect</strong> — the alumni network for graduates of the NBHS Biotech Program. Connect with peers, find mentors, and access career opportunities in biotech and research.</p>
        </div>
        <button
          onClick={onBioConnect}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white flex-shrink-0"
          style={{ background: "#C8102E" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Learn About BioConnect →
        </button>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Schedule", title: "11-Week Program", body: "Mid-to-late March through end of May\nTuesdays, Thursdays & Fridays\n3:00 – 4:30 PM" },
          { label: "Stipend", title: "$500 Earned", body: "Students who successfully complete the program earn a $500 stipend. Students are responsible for their own transportation." },
          { label: "Eligibility", title: "Sophomores, Juniors & Seniors", body: "Must be 16 or older by July 1, 2024. Underrepresented and economically disadvantaged students especially encouraged to apply." },
        ].map((d) => (
          <div key={d.label} style={{ borderTop: "3px solid #C8102E", paddingTop: 16 }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#C8102E" }}>{d.label}</div>
            <div className="text-base font-semibold mb-1" style={{ color: "#1A1A1A" }}>{d.title}</div>
            <div className="text-sm whitespace-pre-line" style={{ color: "#555" }}>{d.body}</div>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>Program Goals</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Content Knowledge", desc: "Gain familiarity with terms and details of science and bioengineering through an authentic research project." },
            { title: "Laboratory Techniques", desc: "Perform experiments to train hands and minds to work productively and safely in a lab — molecular cloning, PCR, gel electrophoresis, and more." },
            { title: "Professional Skills", desc: "Improve skills essential in any work environment: collaboration, communication, resume building, and constructive feedback." },
          ].map((g) => (
            <div key={g.title} className="p-5" style={{ background: "#F4F4F4" }}>
              <div className="text-base font-bold mb-2" style={{ color: "#1A1A1A" }}>{g.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: "#555" }}>{g.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>Sample Skills &amp; Techniques</div>
        <div className="p-5" style={{ background: "#1A1A1A" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#CCCCCC" }}>
            Molecular cloning · PCR · Pipetting · Gel electrophoresis · Buffer and solution preparation · Lab calculations · DNA mini-preps · Bacterial transformations · Aseptic technique · Professional workplace skills
          </p>
        </div>
      </div>

      {/* How to Apply */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>How to Apply</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ol className="space-y-4">
            {[
              "Submit an online application. The application includes questions intended to evaluate math and English-language skills.",
              "Ask your current or former science teacher if they will serve as a reference for you.",
              "Contact Mr. Kolbeck or Dr. Ho for application details and deadlines.",
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-sm font-bold text-white" style={{ background: "#C8102E" }}>{i + 1}</span>
                <span className="text-sm leading-relaxed" style={{ color: "#333" }}>{step}</span>
              </li>
            ))}
          </ol>
          <div className="space-y-4">
            <div style={{ borderTop: "3px solid #1A1A1A", paddingTop: 16 }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#888" }}>Contact — Mr. Kolbeck</div>
              <div className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>Science Teacher · Room B-354</div>
              <a href="mailto:rkolbeck@newbedfordschools.org" className="text-sm" style={{ color: "#C8102E" }}>rkolbeck@newbedfordschools.org</a>
              <div className="text-xs mt-1" style={{ color: "#888" }}>or through Teams chat</div>
            </div>
            <div style={{ borderTop: "3px solid #1A1A1A", paddingTop: 16 }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#888" }}>Contact — Dr. Ho</div>
              <div className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>Science Instructional Leader · Room B-371</div>
              <a href="mailto:cho@newbedfordschools.org" className="text-sm" style={{ color: "#C8102E" }}>cho@newbedfordschools.org</a>
              <div className="text-xs mt-1" style={{ color: "#888" }}>or through Teams chat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6" style={{ background: "#F4F4F4", borderLeft: "4px solid #C8102E" }}>
        <div>
          <div className="text-base font-bold mb-1" style={{ color: "#1A1A1A" }}>Program Flyer — NBHS Biotech Apprenticeship Challenge 2026</div>
          <div className="text-sm" style={{ color: "#555" }}>Download and share with interested students. Underrepresented and economically disadvantaged students especially encouraged to apply.</div>
        </div>
        <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white flex-shrink-0" style={{ background: "#C8102E" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Flyer (PDF)
        </a>
      </div>

      <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E5E5E5" }}>
        <p className="text-xs" style={{ color: "#999" }}>Biotech Apprenticeship Challenge · "The capital of scientific revolution."</p>
      </div>
    </>
  );
}

/* ─── SMAST Marine Science Internship ──────────────────────────────────────── */
function SMASTProgram() {
  const PHOTO_URL = `${CDN}/IMG_2298_ef73b0f0.jpg`;
  const PDF_URL = `${CDN}/SMASTInternshipinformationpackage2026_e48254d2.pdf`;

  const researchLabs = [
    { name: "Fisheries Science", pi: "Prof. Steven Cadrin", topics: "Biology of spawning cod · Fishery management approaches · Fishery stock assessment" },
    { name: "Fish Behavior", pi: "Prof. Lauran Brewster", topics: "Lab experiments on temperature preferences of fishes · Video footage analysis and machine learning using animal-borne tags" },
    { name: "Marine Fisheries Field Research Group", pi: "Dean Kevin Stokesbury", topics: "Video analysis of optical fishery surveys · Growth and maturity of whelks" },
    { name: "Conservation Engineering", pi: "Prof. Pingguo He", topics: "Fish behavior observations in relation to light and application in pot fishing" },
    { name: "Quantitative Ecosystem-Based Management", pi: "Prof. Gavin Fay", topics: "Marine data science and fisheries visualization · Offshore wind effects on fisheries monitoring · Science communication" },
    { name: "Aquatic Microbiomes & Biodegradability", pi: "Prof. Chris Ward", topics: "Coastal ocean microbial community diversity · Harmful algal blooms and water quality · Biodegradation of natural polymers and novel bioplastics" },
    { name: "Seawater Lab", pi: "William Kennedy", topics: "Water quality monitoring and fish husbandry · Seining" },
  ];

  return (
    <>
      {/* Photo + Overview side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-start">
        <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src={PHOTO_URL} alt="NBHS students working at the SMAST seawater lab tank" className="w-full h-full object-cover" style={{ display: "block" }} />
        </div>
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>About the Program</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
            UMass-Dartmouth SMAST<br />Marine Science Internship 2026
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#333" }}>
            The University of Massachusetts Dartmouth School for Marine Science and Technology (SMAST) hosts a paid summer marine science internship for high school students. Interns work in real research laboratories alongside graduate student mentors and faculty supervisors, gaining hands-on experience in one of the nation's leading marine science institutions — located right here in New Bedford's South End.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
            New Bedford is the nation's #1 fishing port by value and a hub for the emerging offshore wind energy industry. SMAST research spans fisheries science, oceanography, coastal restoration, marine physics, and renewable energy — giving interns exposure to the full breadth of marine science careers.
          </p>
        </div>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Pay & Schedule", title: "$17/hour · 37.5 hrs/week", body: "July 6 – August 7, 2026\nMonday–Friday, 9:00 AM – 5:00 PM\n836 South Rodney French Blvd, New Bedford" },
          { label: "Eligibility", title: "Rising Juniors & Seniors", body: "NBPS bus available to Sea Lab (71 Portland Street, 8-min walk from SMAST) at 8:30–11:30 AM. Carpool options available at end of day." },
          { label: "Application Deadline", title: "Friday, April 10, 2026", body: "Selection decisions made by May 1. Contact Lauran Brewster at SMAST with questions." },
        ].map((d) => (
          <div key={d.label} style={{ borderTop: "3px solid #C8102E", paddingTop: 16 }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#C8102E" }}>{d.label}</div>
            <div className="text-base font-semibold mb-1" style={{ color: "#1A1A1A" }}>{d.title}</div>
            <div className="text-sm whitespace-pre-line" style={{ color: "#555" }}>{d.body}</div>
          </div>
        ))}
      </div>

      {/* Student Commitments */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>What Students Do</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { week: "July 6–10", title: "Orientation", desc: "Tour all research labs, meet faculty and graduate mentors, and get matched to a research topic. Lunch provided." },
            { week: "Mondays: July 13, 20, 27 & Aug 3", title: "Weekly Field Trips", desc: "Hands-on marine science experiences off-campus. Lunch and transport provided." },
            { week: "Tues–Fri: July 14 – Aug 6", title: "Research Lab Work", desc: "Work alongside graduate student mentors in a selected research lab on an ongoing study." },
            { week: "August 7", title: "Research Symposium", desc: "Present your research findings to faculty, staff, and guests. Lunch provided. Families welcome." },
          ].map((item) => (
            <div key={item.title} className="p-5" style={{ background: "#F4F4F4" }}>
              <div className="text-xs font-bold mb-1" style={{ color: "#C8102E" }}>{item.week}</div>
              <div className="text-base font-bold mb-1" style={{ color: "#1A1A1A" }}>{item.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: "#555" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Labs */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>Research Labs &amp; Topics</div>
        <div className="space-y-3">
          {researchLabs.map((lab) => (
            <div key={lab.name} className="flex gap-4 items-start py-3" style={{ borderBottom: "1px solid #E5E5E5" }}>
              <div className="flex-shrink-0 w-1.5 self-stretch" style={{ background: "#C8102E", minHeight: 20 }} />
              <div>
                <div className="text-sm font-bold" style={{ color: "#1A1A1A" }}>{lab.name} <span className="font-normal" style={{ color: "#888" }}>— {lab.pi}</span></div>
                <div className="text-sm mt-0.5" style={{ color: "#555" }}>{lab.topics}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Apply */}
      <div className="mb-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>How to Apply</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm mb-4" style={{ color: "#333" }}>
              Interested students should fill out the online application form, which includes short essay responses to three questions:
            </p>
            <div className="space-y-3">
              {[
                "Why are you interested in marine science?",
                "How do you think you could benefit from this internship?",
                "How would your involvement in the internship promote diversity in marine science?",
              ].map((q, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold text-white" style={{ background: "#C8102E" }}>{i + 1}</span>
                  <span className="text-sm italic leading-relaxed" style={{ color: "#333" }}>"{q}"</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "3px solid #1A1A1A", paddingTop: 16 }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#888" }}>Contact — SMAST Internship Coordinator</div>
            <div className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>Lauran Brewster</div>
            <a href="mailto:lbrewster@umassd.edu" className="text-sm" style={{ color: "#C8102E" }}>lbrewster@umassd.edu</a>
            <div className="mt-4 text-xs leading-relaxed p-3" style={{ background: "#FFF3F3", borderLeft: "3px solid #C8102E", color: "#555" }}>
              <strong style={{ color: "#C8102E" }}>Important:</strong> Only apply if you can commit to the entire program — July 6 through August 7. Accepting the internship is a commitment to the University.
            </div>
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6" style={{ background: "#F4F4F4", borderLeft: "4px solid #C8102E" }}>
        <div>
          <div className="text-base font-bold mb-1" style={{ color: "#1A1A1A" }}>Information Package — SMAST Marine Science Internship 2026</div>
          <div className="text-sm" style={{ color: "#555" }}>Full program details, research lab descriptions, student commitment expectations, and application instructions.</div>
        </div>
        <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white flex-shrink-0" style={{ background: "#C8102E" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Info Package (PDF)
        </a>
      </div>

      <div className="mt-8 pt-6" style={{ borderTop: "1px solid #E5E5E5" }}>
        <p className="text-xs" style={{ color: "#999" }}>In partnership with UMass-Dartmouth School for Marine Science and Technology (SMAST) · 836 South Rodney French Blvd, New Bedford, MA</p>
      </div>

      {/* BioConnect Alumni Callout */}
      <div className="mt-8 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: "#FFF3F3", border: "1px solid rgba(200,16,46,0.25)", borderLeft: "4px solid #C8102E" }}>
        <div className="flex items-start gap-3">
          <svg width="20" height="20" fill="none" stroke="#C8102E" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <div>
            <div className="text-sm font-bold mb-0.5" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>Biotech Program Graduate?</div>
            <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
              Join <strong style={{ color: "#C8102E" }}>BioConnect</strong> — the official alumni network for graduates of the NBHS Biotech Program. Connect with peers, find mentors, and access career opportunities in biotech, research, and health sciences.
            </p>
          </div>
        </div>
        <a
          href="https://nbhs-bioconnect.manus.space"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white flex-shrink-0"
          style={{ background: "#C8102E", textDecoration: "none" }}
        >
          Join BioConnect →
        </a>
      </div>
    </>
  );
}

