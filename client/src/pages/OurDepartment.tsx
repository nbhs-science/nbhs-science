/**
 * Our Department Page
 * Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar
 * Showcases the NBHS Science Department intro, priority statement, stats, and classroom photos
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

const PHOTOS = [
  {
    url: `${CDN}/img-000_cf6ea7af.jpg`,
    caption: "Science teachers collaborating during a PLC session on questioning strategies.",
    alt: "Teachers in PLC session",
  },
  {
    url: `${CDN}/img-001_e7a6aeaa.jpg`,
    caption: "Department-wide professional learning — building shared instructional practices.",
    alt: "PLC session wide view",
  },
  {
    url: `${CDN}/check_nl_1_30_26_img-001_53317643.jpg`,
    caption: "Student science notebook showing density data from a lab investigation.",
    alt: "Student science notebook",
  },
  {
    url: `${CDN}/check_nl_3_6_26_img-002_d3823ba7.jpg`,
    caption: "Students building hands-on chromosome models — HQIM investigations in action.",
    alt: "Students building chromosome models",
  },
  {
    url: `${CDN}/check_nl_3_13_26_img-000_a57bfd74.jpg`,
    caption: "A teacher's lesson screen showing NGSS-aligned objectives and a Do Now prompt.",
    alt: "Teacher lesson screen with NGSS objectives",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/1_23_26_img-000_d268d073.jpg",
    caption: "Students explore planetary motion and orbital mechanics during a planetarium visit — connecting classroom science to the cosmos.",
    alt: "Planetarium dome showing solar system projection",
  },
];

const STATS = [
  { value: "9–12", label: "Grade Levels" },
];

export default function OurDepartment() {
  return (
    <div className="min-h-screen" style={{ background: "#F5F5F5", fontFamily: "'Work Sans', sans-serif" }}>

      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: "#1A1A1A", minHeight: 340 }}>
        <img
          src={PHOTOS[0].url}
          alt={PHOTOS[0].alt}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ background: "#B30000", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 2 }}>
              NEW BEDFORD HIGH SCHOOL
            </span>
          </div>
          <h1 style={{ fontFamily: "'Merriweather', serif", color: "#FFFFFF", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            NBHS Science Department
          </h1>
          <p style={{ color: "#D4D4D4", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600 }}>
            Grades 9–12 · Science Department
          </p>
        </div>
      </div>

      <div className="px-4 py-8 md:px-10 md:py-10 max-w-5xl mx-auto">

        {/* Welcome Message */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'Merriweather', serif", color: "#1A1A1A", fontSize: "1.35rem", fontWeight: 700, marginBottom: 14, borderLeft: "4px solid #B30000", paddingLeft: 14 }}>
            Welcome to the Department Hub
          </h2>
          <div style={{ color: "#333", fontSize: "0.97rem", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 14 }}>
              Welcome to the NBHS Science Department dashboard — the shared space where our team plans together, tracks our professional learning, and keeps our collective work visible. Whether you are preparing for a PLC session, looking for instructional resources, or checking in on our department's progress, this is your home base.
            </p>
            <p style={{ marginBottom: 14 }}>
              Our department serves students in grades 9 through 12 across a wide range of science courses. We are a team committed to high-quality science instruction grounded in the NGSS and Massachusetts state standards — and to the belief that when teachers learn together, students learn more deeply.
            </p>
            <p>
              This year, our PLC work is centered on building the instructional practices that make the biggest difference for our students: rigorous questioning, structured academic discourse, evidence-based writing, and hands-on investigations of real scientific phenomena. The sessions in this dashboard reflect that arc — each one building on the last.
            </p>
          </div>
        </div>

        {/* Department Priority */}
        <div className="mb-10" style={{ background: "#1A1A1A", padding: "28px 28px 24px", borderLeft: "5px solid #B30000" }}>
          <div style={{ color: "#B30000", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
            2025–26 Department Priority
          </div>
          <p style={{ color: "#F0F0F0", fontSize: "0.97rem", lineHeight: 1.85, margin: 0 }}>
            Throughout the school year, science teachers will administer quarterly standards-based benchmark assessments and consistently use high-quality instructional materials (HQIM) in lessons aligned to the NGSS and Massachusetts state science standards. By June 2026, at least <strong style={{ color: "#fff" }}>65% of students will demonstrate proficiency</strong>, with an average growth of <strong style={{ color: "#fff" }}>10% across benchmarks</strong>, as measured by standards-based assessments. To achieve this, science teachers will intentionally plan and facilitate academic discourse, evidence-based writing, and investigations of grade-level scientific phenomena so that <strong style={{ color: "#fff" }}>multilingual learners within the WIDA proficiency band of 2.5–3.5</strong> demonstrate a deeper understanding of scientific concepts.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'Merriweather', serif", color: "#1A1A1A", fontSize: "1.2rem", fontWeight: 700, marginBottom: 16, borderLeft: "4px solid #B30000", paddingLeft: 14 }}>
            Our Work in Action
          </h2>

          {/* Hero photo full width */}
          <div className="mb-4">
            <img
              src={PHOTOS[1].url}
              alt={PHOTOS[1].alt}
              className="w-full object-cover"
              style={{ height: 280, objectPosition: "center 40%", display: "block" }}
            />
            <p style={{ fontSize: "0.78rem", color: "#777", marginTop: 6, fontStyle: "italic" }}>{PHOTOS[1].caption}</p>
          </div>

          {/* 3-column grid for remaining photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHOTOS.slice(2).map((photo) => (
              <div key={photo.url}>
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full object-cover"
                  style={{ height: 200, display: "block" }}
                />
                <p style={{ fontSize: "0.75rem", color: "#777", marginTop: 6, fontStyle: "italic", lineHeight: 1.5 }}>{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PLC Arc Overview */}
        <div className="mb-8">
          <h2 style={{ fontFamily: "'Merriweather', serif", color: "#1A1A1A", fontSize: "1.2rem", fontWeight: 700, marginBottom: 14, borderLeft: "4px solid #B30000", paddingLeft: 14 }}>
            Our PLC Learning Arc — Spring 2026
          </h2>
          <p style={{ color: "#444", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 16 }}>
            This semester's PLC sessions follow a deliberate instructional arc — each session builds directly on the one before it. We start with the practices that drive student thinking, then examine the evidence those practices produce, and finally use that evidence to plan better lessons together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { date: "Mar 26–27", title: "Questioning Strategies & Academic Discourse", desc: "Building the talk moves and questioning techniques that push student thinking deeper." },
              { date: "Mar 27", title: "Lesson Internalization Protocol", desc: "Practicing the OSE and DESE LIT frameworks to plan lessons with student thinking in mind." },
              { date: "Mar 31 – Apr 1", title: "Student Work Analysis", desc: "Examining real student work to identify patterns, misconceptions, and next instructional steps." },
              { date: "Apr 3", title: "Co-Planning with Discourse in Mind", desc: "Using evidence from student work to plan the next lesson together as course-alike teams." },
            ].map((item) => (
              <div key={item.date} style={{ background: "#fff", border: "1px solid #E5E5E5", padding: "14px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 90, flexShrink: 0, color: "#B30000", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", paddingTop: 3, whiteSpace: "nowrap" }}>{item.date}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1A1A1A", fontSize: "0.9rem", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
