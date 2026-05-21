/**
 * NBHS Science Department - Teacher Directory
 * Design: Command Center — dark sidebar, white content panel, NBHS red accents
 * Typography: Work Sans (headings/UI) + Merriweather (body/notes)
 * Colors: Sidebar #1A1A1A, Accent #B30000, Background #FFFFFF, Gray #F4F4F4
 */

import { useState, useMemo } from "react";
import { Search, Phone, MapPin } from "lucide-react";

interface Teacher {
  lastName: string;
  firstName: string;
  room: string;
  ext: string;
  courses: string[];
}

const TEACHERS: Teacher[] = [
  { lastName: "Barrett", firstName: "Cassidy", room: "B-371", ext: "25371", courses: ["Biology"] },
  { lastName: "Bonner", firstName: "Heather", room: "3-319", ext: "23319", courses: ["Biology (Grade 10)", "Environmental Science"] },
  { lastName: "Viveiros", firstName: "Kaelyn", room: "B-332", ext: "25332", courses: ["Marine Science", "Genetics"] },
  { lastName: "Oriole", firstName: "Victoria", room: "B-210", ext: "25371", courses: ["Biology (Grade 10)"] },
  { lastName: "McCauley", firstName: "Brian", room: "3-304", ext: "23304", courses: ["Biology (Grade 9)", "Design for Manufacturing / 3D Solid Modeling"] },
  { lastName: "Flynn", firstName: "Kevin", room: "B-311", ext: "25311", courses: ["Pre-AP Biology", "Biology (Grade 9)"] },
  { lastName: "Gagnon", firstName: "Ava", room: "B-320", ext: "25320", courses: ["Pre-AP Biology", "AP Biology"] },
  { lastName: "Gifford", firstName: "Patricia", room: "B-318", ext: "25318", courses: ["AP Environmental Science", "Honors Marine Science"] },
  { lastName: "Gryss", firstName: "Jayni", room: "B-369", ext: "25369", courses: ["Pre-AP Chemistry", "AP Chemistry"] },
  { lastName: "Gilbert", firstName: "Tyler", room: "B-356", ext: "25356", courses: ["Biology (Grade 10)"] },
  { lastName: "Jupin", firstName: "Abigail", room: "B-330", ext: "25330", courses: ["Environmental Science", "Biology (Grade 10)"] },
  { lastName: "Kolbeck", firstName: "Robert", room: "B-354", ext: "25354", courses: ["Pre-AP Biology", "Foundations in Biotech", "Forensics Lab"] },
  { lastName: "LeBlanc", firstName: "Nicholas", room: "3-318", ext: "23318", courses: ["Biology (Grade 9)", "Earth and Space"] },
  { lastName: "Miksch", firstName: "Joseph", room: "B-342", ext: "25342", courses: ["Chemistry", "Biology (Grade 10)"] },
  { lastName: "Richard", firstName: "Lisa", room: "1-319", ext: "21319", courses: ["Environmental Science"] },
  { lastName: "Roche", firstName: "Samantha", room: "B-367", ext: "25367", courses: ["Chemistry", "Pre-AP Chemistry"] },
  { lastName: "Stephenson", firstName: "Grace", room: "3-303", ext: "23303", courses: ["Biology (Grade 10)", "Pre-AP Biology"] },
  { lastName: "Tveit", firstName: "Seannine", room: "B-309", ext: "25309", courses: ["Biology NC"] },
  { lastName: "Walker", firstName: "Nathaniel", room: "B-313", ext: "25313", courses: ["Biology (Grade 9)"] },
  { lastName: "Way", firstName: "Jonathan", room: "B-312", ext: "25312", courses: ["Environmental Science", "Zoology"] },
  { lastName: "Winderlick", firstName: "Michael", room: "B-344", ext: "25344", courses: ["Biology (Grade 9)"] },
];

function getCourseBadgeStyle(course: string): { bg: string; color: string } {
  const c = course.toLowerCase();
  if (c.includes("ap ") || c.includes("pre-ap")) return { bg: "#D4EDDA", color: "#155724" };
  if (c.includes("nc") || c.includes("slife") || c.includes("ell")) return { bg: "#E2D9F3", color: "#4A235A" };
  if (c.includes("marine") || c.includes("environmental") || c.includes("earth") || c.includes("zoology")) return { bg: "#D1ECF1", color: "#0C5460" };
  if (c.includes("chemistry")) return { bg: "#FFF3CD", color: "#856404" };
  if (c.includes("design") || c.includes("biotech") || c.includes("forensics") || c.includes("3d")) return { bg: "#F3E5F5", color: "#4A235A" };
  return { bg: "#F4F4F4", color: "#333" };
}

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = ["#B30000", "#1A3A5C", "#2D6A4F", "#6B3A7D", "#B5451B", "#1B5E20", "#0D47A1"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function TeacherDirectory() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TEACHERS.filter(
      (t) =>
        t.firstName.toLowerCase().includes(q) ||
        t.lastName.toLowerCase().includes(q) ||
        t.room.toLowerCase().includes(q) ||
        t.courses.some((c) => c.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-4 border-b" style={{ borderColor: "#E8E8E8" }}>
        <h2 className="text-[22px] font-black mb-1" style={{ fontFamily: "'Work Sans', sans-serif", color: "#1A1A1A" }}>
          Teacher Directory
        </h2>
        <p className="text-[13px] mb-4" style={{ color: "#888" }}>
          2025–26 Science Department — {TEACHERS.length} teachers
        </p>
        <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: "#DDDDDD", backgroundColor: "#FAFAFA" }}>
          <Search size={14} style={{ color: "#888" }} />
          <input
            type="text"
            placeholder="Search by name, room, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-6 py-4 md:py-5">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {filtered.map((t) => (
            <div
              key={`${t.lastName}-${t.firstName}`}
              className="p-4 border"
              style={{ borderColor: "#E8E8E8", backgroundColor: "#FFFFFF" }}
            >
              {/* Teacher Info */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-[14px] font-black"
                  style={{ backgroundColor: getAvatarColor(t.lastName), color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}
                >
                  {getInitials(t.firstName, t.lastName)}
                </div>
                <div>
                  <div className="text-[14px] font-bold leading-tight" style={{ color: "#1A1A1A", fontFamily: "'Work Sans', sans-serif" }}>
                    {t.firstName} {t.lastName}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: "#888" }}>
                      <MapPin size={10} /> {t.room}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: "#888" }}>
                      <Phone size={10} /> Ext. {t.ext}
                    </span>
                  </div>
                </div>
              </div>

              {/* Courses Taught */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#B30000" }}>
                  Courses Teaching
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.courses.map((course, i) => {
                    const { bg, color } = getCourseBadgeStyle(course);
                    return (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: bg, color, fontFamily: "'Work Sans', sans-serif" }}
                      >
                        {course}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t flex flex-wrap gap-3 items-center" style={{ borderColor: "#E8E8E8" }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mr-2" style={{ color: "#888", fontFamily: "'Work Sans', sans-serif" }}>Legend:</div>
          {[
            { label: "AP / Pre-AP", bg: "#D4EDDA", color: "#155724" },
            { label: "Environmental / Marine / Earth", bg: "#D1ECF1", color: "#0C5460" },
            { label: "Chemistry", bg: "#FFF3CD", color: "#856404" },
            { label: "Elective / CTE", bg: "#F3E5F5", color: "#4A235A" },
            { label: "NC / ELL / SLIFE", bg: "#E2D9F3", color: "#4A235A" },
            { label: "Regular Course", bg: "#F4F4F4", color: "#333" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold" style={{ backgroundColor: l.bg, color: l.color }}>
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
