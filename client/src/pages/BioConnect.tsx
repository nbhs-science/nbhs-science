/**
 * BioConnect — NBHS Biotech Program Alumni Network
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Colors: Sidebar #1A1A1A, Accent #C8102E, Background #FFFFFF, Gray #F4F4F4
 */

const MLSC_GROUP = "/manus-storage/nbhs_mlsc_group_ff1bdfcc.webp";
const NOLAN_LAB = "/manus-storage/nolan_fox_lab_1f6e652e.webp";
const NOLAN_LAB_WIDE = "/manus-storage/nolan_fox_lab_wide_1bc7ff72.webp";
const LAB_STUDENTS = "/manus-storage/nbhs_lab_students_writing_65295750.webp";

const officers = [
  { initial: "N", name: "Nolan Fox", role: "President", year: "2025", isPresident: true },
  { initial: "X", name: "Xander Faria", role: "Vice President", year: "2025", isPresident: false },
  { initial: "M", name: "Madalena Morris", role: "Secretary", year: "2025", isPresident: false },
  { initial: "L", name: "Lana Jones", role: "External Affairs", year: "2026", isPresident: false },
];

const advisors = [
  { initial: "M", name: "Mason Ferbert" },
  { initial: "K", name: "Kailey Sousa" },
];

export default function BioConnect() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: "#1A1A1A", minHeight: 220 }}>
        <img
          src={MLSC_GROUP}
          alt="NBHS Biotech students at Massachusetts Life Sciences Center 2025"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.22 }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: "#C8102E" }} />
        <div className="relative px-8 py-10 md:px-14">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1"
              style={{ background: "#C8102E", color: "#fff" }}
            >
              NBHS Biotech Program
            </span>
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1"
              style={{ background: "#2A2A2A", color: "#AAA", border: "1px solid #444" }}
            >
              Massachusetts Life Sciences Center (MLSC)
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            BioConnect
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "#AAAAAA" }}>
            The official alumni network for graduates of the New Bedford High School Biotech Program — connecting alumni for career advancement, mentorship, and lifelong community.
          </p>
        </div>
      </div>

      {/* Red rule */}
      <div style={{ height: 4, background: "#C8102E" }} />

      {/* Main Content */}
      <div className="px-8 py-10 md:px-14 max-w-5xl">

        {/* Mission */}
        <div className="mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>Our Mission</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
            Where NBHS Biotech Alumni Connect
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#333" }}>
            BioConnect bridges the gap between high school science and real-world careers in biotechnology, research, healthcare, and beyond. Graduates of the NBHS Biotech Program — in partnership with the Massachusetts Life Sciences Center (MLSC) — join a growing network of scientists, researchers, and healthcare professionals who share a common foundation and a commitment to lifting up the next generation of NBHS students.
          </p>
          <p className="text-base leading-relaxed font-semibold" style={{ color: "#1A1A1A" }}>
            Whether you are a recent graduate or a program alum from years past, BioConnect is your community.
          </p>
        </div>

        {/* What BioConnect Offers */}
        <div className="mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>What BioConnect Offers</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Alumni Directory", desc: "Find and connect with fellow NBHS Biotech graduates. See where they are now and reach out for advice or collaboration." },
              { title: "Mentorship Program", desc: "Connect with alumni working in biotech, research, medicine, and science education. Get real career advice from people who started where you are." },
              { title: "Career Opportunities", desc: "Internships, research positions, and job openings shared by alumni and partners in the biotech and science fields." },
            ].map((item) => (
              <div key={item.title} className="p-5" style={{ background: "#F4F4F4", borderTop: "3px solid #C8102E" }}>
                <div className="text-base font-bold mb-2" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#555" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>The Program in Action</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img src={NOLAN_LAB_WIDE} alt="Nolan Fox, BioConnect President, in the research lab at UMass-Dartmouth" className="w-full h-full object-cover" style={{ objectPosition: "center top" }} />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img src={LAB_STUDENTS} alt="NBHS Biotech students recording experimental data in Dr. Tracie Ferreira's Laboratory at UMass-Dartmouth" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "#999" }}>
            Left: Nolan Fox (Class of 2025, BioConnect President) during his research internship. Right: Students in Dr. Tracie Ferreira's Laboratory, UMass-Dartmouth.
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C8102E" }}>Network Leadership</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {officers.map((o) => (
              <div
                key={o.name}
                className="p-4 text-center"
                style={{
                  background: "#fff",
                  border: "1px solid #E5E5E5",
                  position: "relative",
                  paddingTop: 20,
                }}
              >
                {/* Top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: o.isPresident ? "#C8102E" : "#1A1A1A" }} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg mx-auto mb-2"
                  style={{
                    background: o.isPresident ? "linear-gradient(135deg, #C8102E 0%, #8B0000 100%)" : "linear-gradient(135deg, #1A1A1A 0%, #3D3D5C 100%)",
                    fontFamily: "'Work Sans', sans-serif",
                    boxShadow: o.isPresident ? "0 3px 12px rgba(200,16,46,0.30)" : "0 3px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  {o.initial}
                </div>
                {o.isPresident && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ background: "#C8102E", color: "#fff" }}
                  >
                    <svg width="9" height="9" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    President
                  </span>
                )}
                {!o.isPresident && (
                  <span
                    className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ background: "#1A1A1A", color: "#fff" }}
                  >
                    {o.role}
                  </span>
                )}
                <div className="text-sm font-bold mt-1" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>{o.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#888" }}>Class of {o.year}</div>
              </div>
            ))}
          </div>

          {/* Honorary Advisors */}
          <div className="pt-5" style={{ borderTop: "1px dashed #DDD" }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#888" }}>Honorary Advisors</div>
            <div className="flex flex-col sm:flex-row gap-3">
              {advisors.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 px-4 py-3 flex-1"
                  style={{ background: "#F9F9F9", border: "1px dashed #DDD" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: "#AAAAAA" }}
                  >
                    {a.initial}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>{a.name}</div>
                    <div className="text-xs" style={{ color: "#999" }}>Honorary Advisor</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6"
          style={{ background: "#1A1A1A", borderLeft: "4px solid #C8102E" }}
        >
          <div>
            <div className="text-base font-bold mb-1 text-white" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Are you an NBHS Biotech Graduate?
            </div>
            <div className="text-sm" style={{ color: "#AAAAAA" }}>
              Register to join the BioConnect network — share your career path, volunteer as a mentor, and help the next generation of NBHS scientists find their way.
            </div>
          </div>
          <a
            href="https://nbhs-bioconnect.manus.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white flex-shrink-0"
            style={{ background: "#C8102E", textDecoration: "none" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Visit BioConnect →
          </a>
        </div>

      </div>
    </div>
  );
}
