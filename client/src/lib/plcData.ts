// NBHS Science Department PLC Dashboard
// Design: Command Center Dashboard — Work Sans + Merriweather, NBHS Red (#B30000), Dark sidebar

export type Role = "me" | "gilbert" | "mccauley" | "gagnon" | "gifford" | "all";

export interface AgendaItem {
  time: string;
  duration: string;
  activity: string;
  description: string;
  lead: Role;
  slides?: string;
}

export interface FacilitatorNote {
  slide: string;
  role: Role;
  note: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: "pdf" | "slides" | "doc";
}

export type SessionStatus = "completed" | "upcoming" | "today";

export function getSessionStatus(dateStr: string): SessionStatus {
  const today = new Date();
  const sessionDate = new Date(dateStr + "T00:00:00");
  const todayStr = today.toISOString().slice(0, 10);
  if (dateStr === todayStr) return "today";
  if (sessionDate < today) return "completed";
  return "upcoming";
}

export interface SlideDownload {
  label: string;       // e.g. "OpenSciEd Version" or "Standard Version"
  filename: string;    // display filename
  url: string;
  type: "pptx" | "pdf";
}

export interface PLCSession {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  subtitle: string;
  duration: string;
  audience: string;
  alignment: string;
  objectives: string[];
  whatToBring: string[];
  agenda: AgendaItem[];
  facilitatorNotes: FacilitatorNote[];
  slidesUrl: string;
  slidesDownloadUrl: string;
  slidesDownloads?: SlideDownload[];  // optional multi-download override
  agendaVersion: string;
  resources?: Resource[];
  isHoliday?: boolean;
  sessionInfo?: {
    overview: string;           // 2-3 paragraph intro for the science department
    whyItMatters: string;       // 1 paragraph on the rationale
    learningArc: string;        // how this session fits in the broader PLC arc
    teacherTakeaways: string[]; // 3-4 bullet points of what teachers will leave with
  };
}

export const plcSessions: PLCSession[] = [
  // ─── SESSION 1: Thursday March 26 — Full PLC Session ──────────────────────
  {
    id: "review-both-presentations",
    date: "2026-03-26",
    displayDate: "Thursday, March 26, 2026",
    title: "Questioning Strategies & Structuring Academic Discourse in Science",
    subtitle: "Full PLC Session — Full Science Department",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol & DESE LIT (2025–26)",
    objectives: [
      "Understand how the type of question a teacher asks determines the type of thinking students do.",
      "Learn and practice the Before/During/After arc for structuring academic discourse in science.",
      "Identify one questioning strategy and one discourse structure to implement before the next PLC.",
    ],
    whatToBring: [
      "Your OpenSciEd Teacher Edition or upcoming lesson plan",
      "A specific lesson moment where you want to improve student discourse",
      "Pen and sticky notes for reflection",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Framing",
        description: "Introduce the session purpose: today we deliver both presentations — Questioning Strategies and Structuring Academic Discourse — and connect them to tomorrow's Lesson Internalization Protocol.",
        lead: "me",
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "2 min",
        activity: "Agenda & Norms",
        description: "Walk through the session agenda and review 2–3 shared norms.",
        lead: "me",
        slides: "Slides 2–3",
      },
      {
        time: "5:00",
        duration: "20 min",
        activity: "Presentation 1: Questioning Strategies",
        description: "Full delivery of the Questioning Strategies presentation. Covers three levels of questioning, five talk moves, and collaborative planning of a questioning sequence.",
        lead: "me",
        slides: "Questioning Strategies Deck",
      },
      {
        time: "25:00",
        duration: "20 min",
        activity: "Presentation 2: Structuring Academic Discourse",
        description: "Full delivery of the Structuring Academic Discourse presentation. Covers the Before/During/After arc, equity moves, and collaborative planning of a discourse sequence.",
        lead: "me",
        slides: "Structuring Discourse Deck",
      },
      {
        time: "45:00",
        duration: "3 min",
        activity: "Reflection & Close",
        description: "Each teacher writes one questioning strategy and one discourse structure they will try before 3/27. Preview tomorrow's Lesson Internalization Protocol session.",
        lead: "me",
        slides: "—",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Session Purpose",
        role: "me",
        note: "This session delivers both presentations in full to the whole science department. Part 1 covers Questioning Strategies; Part 2 covers Structuring Academic Discourse. Teachers leave with two concrete commitments to try before tomorrow's Lesson Internalization Protocol session on 3/27.",
      },
      {
        slide: "Presentation 1: Questioning Strategies (OSE & Gen-Ed)",
        role: "me",
        note: "Both versions of the Questioning Strategies presentation share the same core framework: the type of question a teacher asks determines the type of thinking students do. The session moves through three levels of questioning — recall, application, and analysis — and introduces five high-leverage talk moves: Wait Time (5–10 seconds), Revoicing, Pressing for Reasoning ('Why? What's your evidence?'), Building On ('Who can add to that?'), and Redirecting. Pause at the Levels of Questioning slide and ask: Which level do you use most in your lessons? Which do you tend to avoid?",
      },
      {
        slide: "Presentation 2: Structuring Academic Discourse (OSE & Gen-Ed)",
        role: "me",
        note: "Both versions of the Structuring Academic Discourse presentation are built around the Before / During / After arc for planning student talk. Before: launch with a high-demand question, use structured entry points (independent write before anyone speaks). During: use strategic cold-calling rather than only raised hands, press for reasoning, revoice student ideas. After: prompt student-led synthesis — resist summarizing for students. The OSE version connects this arc to OSE Step 2 (planning the discussion) and Step 3 (scaffolds for all learners). The Gen-Ed version connects to DESE LIT Step 4. Key pitfalls to highlight: accepting the first correct answer, teacher summarizing instead of students, and skipping the 'After' entirely.",
      },
      {
        slide: "Equity in Discourse",
        role: "me",
        note: "Both presentations include an equity section focused on three moves: (1) Structured Entry Points — everyone writes before anyone speaks, giving processing time to students who need it; (2) Sentence Frames — provide academic language structure so students can focus on science content, critical for Multilingual Learners and students with IEPs (e.g., 'I agree with ___ because the data shows…'); (3) Strategic Cold-Calling — warm, supportive cold-calling ensures equitable participation beyond students who raise their hands fastest.",
      },
      {
        slide: "Reflection & Commitment",
        role: "all",
        note: "Teachers write two commitments before leaving: (1) one questioning strategy they will try before 3/27, and (2) one discourse structure from the Before/During/After arc they will try. Circulate and listen — note strong commitments to reference tomorrow during the Lesson Internalization Protocol work time. Remind everyone to bring their annotated lesson plan to 3/27.",
      },
      {
        slide: "References",
        role: "me",
        note: "Both presentations are grounded in: OSE Lesson Internalization Protocol (NBHS, 2025–26); DESE Lesson Internalization Tool (2025–26); Michaels & O'Connor, Talk Science Primer (2012); Chapin, O'Connor & Anderson, Classroom Discussions (2009); Hammond, Culturally Responsive Teaching and The Brain (2015).",
      },
    ],
    slidesUrl: "https://manus.im/slides/T4sL2CRXwDfbYZweaU2i5E",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/StructureAcademicDiscourseinScience_de2da9a8.pptx",
    slidesDownloads: [
      {
        label: "OpenSciEd Version",
        filename: "Structuring Academic Discourse in Science (OSE).pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/StructureAcademicDiscourseinScience_de2da9a8.pptx",
        type: "pptx",
      },
      {
        label: "Standard Version",
        filename: "Structuring Academic Discourse in Science (Standard).pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Structuring_Academic_Discourse_in_Science_From_Questions_to_Conversation_2c213941.pptx",
        type: "pptx",
      },
    ],
    agendaVersion: "Both",
    sessionInfo: {
      overview: "This session opens the spring PLC cycle for the NBHS Science Department with two connected presentations: Questioning Strategies in Science and Structuring Academic Discourse. Together, they address one of the most powerful levers in science teaching — the quality of the questions we ask and the structures we put in place for students to talk to each other about science ideas.\n\nThe first presentation examines how the type of question a teacher asks shapes the type of thinking students do. We explore three levels of questioning — recall, reasoning, and sense-making — and five talk moves that shift the intellectual work from the teacher to the students. The second presentation introduces the Before/During/After arc for structuring academic discourse: how to set up a productive discussion before students engage with a task, how to sustain it while they work, and how to close it in a way that consolidates learning.\n\nTeachers will leave with a concrete plan: one questioning strategy and one discourse structure to try in an upcoming lesson before the next PLC. These commitments become the evidence we examine in the March 31 and April 1 sessions.",
      whyItMatters: "Research consistently shows that the questions teachers ask — and the structures they use to facilitate student talk — are among the highest-leverage instructional moves available. In science, where students need to construct explanations, argue from evidence, and revise their thinking, discourse is not a supplement to learning: it is the mechanism through which learning happens. This session gives every teacher in the department a shared vocabulary and a shared set of moves to make student discourse more intentional, more equitable, and more connected to the science ideas we want students to understand.",
      learningArc: "This is Session 1 of a 5-session arc. The questioning strategies and discourse structures introduced today are the foundation for everything that follows. On March 27, teachers will apply these moves directly to an upcoming lesson using the Lesson Internalization Protocol. On March 31 and April 1, we will examine student work to see whether the moves produced the thinking we intended. On April 3, course-alike teams will co-plan a lesson with discourse built in from the start — using the protocols, the evidence, and the moves from this session as the planning frame.",
      teacherTakeaways: [
        "A working understanding of three levels of questioning and how each type shapes student thinking differently.",
        "Five talk moves you can use immediately in any lesson to shift intellectual work to students.",
        "A Before/During/After framework for planning and facilitating productive academic discourse.",
        "One specific commitment: a questioning strategy and a discourse structure to implement before the next PLC, tied to a real lesson moment.",
      ],
    },
  },

  // ─── SESSION 2: Friday March 27 — Lesson Internalization Protocol ─────────
  {
    id: "lesson-internalization-protocol",
    date: "2026-03-27",
    displayDate: "Friday, March 27, 2026",
    title: "Lesson Internalization Protocol: Applying Questioning & Discourse Strategies",
    subtitle: "Practice Session — Full Science Department",
    duration: "48 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol & DESE LIT Step 4 (2025–26)",
    objectives: [
      "Apply the Lesson Internalization Protocol to an upcoming lesson with a focus on questioning and discourse.",
      "Understand and apply the Money Question framework: craft one question that is Singular, Precise, and Possibility-Focused.",
      "Plan a complete facilitation sequence (Money Question to independent write to Turn & Talk to share out to synthesis) for a real lesson moment.",
      "Identify supports for all learners (MLLs, students with disabilities, co-teaching partners).",
    ],
    whatToBring: [
      "Your annotated lesson plan (OpenSciEd Teacher Edition or standard lesson plan)",
      "Notes or commitments from yesterday's 3/26 preview session",
      "OSE Lesson Internalization Protocol or DESE LIT Step 4 reference sheet",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "5 min",
        activity: "Reconnect: What Did We Try?",
        description: "Pair share: what questioning strategy or discourse structure did you try since 3/26? What did you notice? What are you bringing to your lesson today?",
        lead: "me",
        slides: "Slide 3",
      },
      {
        time: "5:00",
        duration: "8 min",
        activity: "The Discourse Arc: Before, During, After",
        description: "Review the Before/During/After framework for structuring academic discourse: launch question, independent write, strategic cold-calling, press for reasoning, student-led synthesis.",
        lead: "me",
        slides: "Slide 4",
      },
      {
        time: "13:00",
        duration: "5 min",
        activity: "Structures That Make Discourse Work",
        description: "Four high-leverage discourse structures: Turn & Talk to Share Out, Fishbowl Discussion, Structured Academic Controversy, Structured Consensus Discussion.",
        lead: "me",
        slides: "Slide 5",
      },
      {
        time: "18:00",
        duration: "3 min",
        activity: "The Money Question: One Question That Does the Work",
        description: "Introduces the Money Question concept. Shows the questioning cascade (11 questions in under 2 minutes) and defines the three criteria: Singular, Precise, Possibility-Focused.",
        lead: "me",
        slides: "Slide 6",
      },
      {
        time: "21:00",
        duration: "4 min",
        activity: "From Cascade to Money Question: See the Difference",
        description: "Side-by-side comparison using Biology examples (genes/alleles, mitosis/meiosis). The cascade vs. one Money Question that opens up all of that thinking.",
        lead: "me",
        slides: "Slide 7",
      },
      {
        time: "25:00",
        duration: "8 min",
        activity: "Common Pitfalls, DESE LIT Step 4 & Equity in Discourse",
        description: "Five pitfalls that shut discourse down; the four-step LIT planning sequence; three equity moves: Structured Entry Points, Sentence Frames, Strategic Cold-Calling.",
        lead: "me",
        slides: "Slides 8-10",
      },
      {
        time: "33:00",
        duration: "5 min",
        activity: "Classroom Scenario: Spot the Cascade",
        description: "Small groups analyze Mr. Torres's 9-question cascade in a genetics lesson, then rewrite it as one Money Question using the three criteria.",
        lead: "all",
        slides: "Slide 11",
      },
      {
        time: "38:00",
        duration: "7 min",
        activity: "Collaborative Planning Work Time",
        description: "Course-alike groups use the LIP to plan an upcoming lesson. Three deliverables: (1) one Money Question, (2) facilitation sequence, (3) sentence frames for MLLs and students with IEPs.",
        lead: "all",
        slides: "Slide 12",
      },
      {
        time: "45:00",
        duration: "3 min",
        activity: "Closing & Commitments",
        description: "Each teacher writes one specific commitment: the lesson, the moment, the Money Question. Preview March 31 (Reading the Evidence) and April 1 (Responding to the Evidence).",
        lead: "me",
        slides: "Slide 13",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Session Purpose",
        role: "me",
        note: "This updated session adds the Money Question activity at the 18-minute mark (Slides 6–7), inserted right before the collaborative planning work time. The full 12-minute planning block is preserved. Teachers learn to identify the questioning cascade pattern, understand the three criteria for a Money Question (Singular, Precise, Possibility-Focused), and apply the framework to their own lesson in the planning work time. Reference commitments teachers made on 3/26 to build continuity.",
      },
      {
        slide: "Protocol Overview: OSE Steps 2 & 3 and DESE LIT Step 4",
        role: "me",
        note: "The OSE Lesson Internalization Protocol has four steps. Today focuses on Steps 2 and 3. Step 2 (Planning the Details, 45 min): Complete the student work for the lesson; annotate the Teacher Edition for facilitation; identify the purpose of each activity; anticipate misconceptions; determine what instructional strategies will engage all learners; create any exemplars needed. Step 3 (Considerations for ALL Learners, 10 min): What supports do students with disabilities need to access the lesson? What supports do Multilingual Learners need? What resources does the co-teacher need? The DESE LIT Step 4 guiding question is: 'What instructional strategies will engage all learners at the critical thinking moment?' Both protocols ask teachers to: identify the key moment of critical thinking, plan the facilitation sequence (think time → partner talk → share out → synthesize), anticipate student responses, and plan specific probing questions for each.",
      },
      {
        slide: "Lesson Internalization Work Time",
        role: "all",
        note: "Course-alike groups and co-teachers work together. Push each group to be specific: not 'I'll ask a higher-order question' but 'After students read the data table, I'll ask: What pattern do you notice and what might explain it?' Each group should produce three deliverables: (1) a written launch question using a high-demand framework from 3/26; (2) a planned facilitation sequence (e.g., 60s independent write → 2 min Turn & Talk → Whole Group Share); (3) 1–2 sentence frames to support MLLs and students with IEPs during the share-out (e.g., 'I agree with ___ because the data shows…').",
      },
      {
        slide: "Group Share Out",
        role: "me",
        note: "Each group shares one planned question and one talk move. Use the 'I notice… / I wonder…' protocol to keep feedback constructive and forward-looking. Highlight strong examples of Level 3 questions (analysis/evaluation) and specific talk move language. Name the equity moves you hear — structured entry points, sentence frames, strategic cold-calling.",
      },
      {
        slide: "Commitments & Close",
        role: "me",
        note: "Each teacher writes one specific commitment for their next lesson. Commitments should be concrete: name the lesson, the moment, the question or talk move, and the support for all learners. Collect commitments or ask teachers to photograph and share — this becomes data for the March 31 and April 1 PLC sessions. Preview March 31 (Reading the Evidence) and April 1 (Responding to the Evidence) as the next step in this learning arc.",
      },
      {
        slide: "Protocol References",
        role: "me",
        note: "OSE Lesson Internalization Protocol (NBHS, 2025–26) — Steps 1–4 with guiding questions for planning questions, supporting all learners, and anticipating student responses. DESE Lesson Internalization Tool (2025–26) — Step 4: Planning for Access and Engagement. Both documents are available in the Resources tab for this session.",
      },
    ],
    slidesUrl: "https://manus.im/slides/U9xBexLkZQBJqAqTjPTeZg",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Lesson_Internalization_Protocol__Applying_Questioning___Discourse_Strategies_d0fcd40c.pptx",
    slidesDownloads: [
      {
        label: "Updated Deck (with Money Question)",
        filename: "Mar27_LIP_Updated_MoneyQuestion.pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Lesson_Internalization_Protocol__Applying_Questioning___Discourse_Strategies_d0fcd40c.pptx",
        type: "pptx",
      },
    ],
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OpenSciEd Lesson Internalization Protocol for NBHS — Steps 1–4 with guiding questions for planning questions, supporting all learners, and anticipating student responses.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_37ecffac.pdf",
        type: "pdf",
      },
      {
        title: "DESE Lesson Internalization Tool (2025–26)",
        description: "DESE Lesson Internalization Tool — Step 4: Planning for Access and Engagement. Use this to plan facilitation moves, anticipate student responses, and identify supports for MLLs and students with disabilities.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_5e213b39.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session takes the questioning strategies and discourse structures from March 26 and puts them directly into practice using the Lesson Internalization Protocol. The protocol is a structured planning tool that asks teachers to slow down and think carefully about a specific lesson before they teach it — not as a compliance exercise, but as a way to make the lesson's most important thinking moments more intentional and more accessible to every student.\n\nTeachers will work through the protocol with an upcoming lesson in hand, focusing specifically on the moments where students are expected to talk, argue, or explain their thinking. The goal is to plan the questions you will ask, the talk moves you will use, and the supports you will put in place — before you walk into the room.\n\nOSE teachers will use the NBHS OSE Lesson Internalization Protocol (Steps 1–4), with a particular focus on Step 2 (Planning the Details) and Step 3 (Planning for All Learners). Gen-Ed teachers will use the DESE Lesson Internalization Tool (2025–26), focusing on Step 4 (Planning for Access and Engagement). Both versions are available for download in the Resources tab.",
      whyItMatters: "The gap between a lesson plan and a well-taught lesson is almost always in the details: the quality of the questions, the structure of the discussion, and the supports for students who need them most. The Lesson Internalization Protocol closes that gap by making teachers think through those details in advance — with colleagues, using a shared frame. When teachers internalize a lesson before they teach it, they are more responsive in the moment, more equitable in their facilitation, and more likely to produce the student thinking the lesson was designed to generate.",
      learningArc: "This is Session 2 of a 5-session arc. Yesterday's session gave teachers the moves; today's session puts those moves into a lesson. The commitments teachers make at the end of this session — the specific lesson, the specific moment, the specific question or talk move — become the evidence we examine in the March 31 and April 1 sessions. On April 3, course-alike teams will use the protocol again as a co-planning frame, building on what the student work analysis revealed.",
      teacherTakeaways: [
        "A completed internalization of one upcoming lesson, with a Money Question, planned facilitation sequence, and sentence frames built in.",
        "Fluency with the Money Question framework: Singular, Precise, Possibility-Focused — and the ability to distinguish it from a questioning cascade.",
        "Specific supports identified for MLLs, students with disabilities, and co-teaching partners in that lesson.",
        "A concrete written commitment: the lesson, the moment, the Money Question, and the facilitation sequence you will use before the next PLC.",
      ],
    },
  },


  // ─── SESSION 5: Tuesday March 31 — Reading the Evidence ─────────────────────
  {
    id: "student-work-analysis-ose",
    date: "2026-03-31",
    displayDate: "Tuesday, March 31, 2026",
    title: "Reading the Evidence: What Did Students Actually Produce?",
    subtitle: "Full Science Department",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "Lesson Internalization Tool — After the Lesson: Reflection and Forward Planning | OSE Step 2: Planning the Details",
    objectives: [
      "Examine student work samples carefully to identify who met mastery, who didn't, and what the most common misconceptions were.",
      "Use a collaborative protocol to look at patterns across course-alike student work and surface what the evidence is telling us.",
      "Name one key finding per course-alike group that will drive the instructional response in the next session.",
      "OSE teachers: compare student work to the exemplar created in Step 2 and identify whether anticipated misconceptions appeared.",
    ],
    whatToBring: [
      "2–3 student work samples from a recent lesson (unit test, model, notebook writing, lab report, or discussion notes)",
      "Your lesson plan for the lesson the work came from",
      "OSE teachers: your Teacher Edition and the Step 2 exemplar (if available)",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Framing",
        description: "Introduce the session purpose: today we read the evidence. We examine what students actually produced and name what it tells us — we are not yet planning our response (that is April 1). Today is about looking carefully.",
        lead: "me",
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "2 min",
        activity: "Agenda & Norms",
        description: "Walk through the session agenda and review 2–3 shared norms. Emphasize: describe before you interpret, and interpret before you plan.",
        lead: "me",
        slides: "Slide 2",
      },
      {
        time: "5:00",
        duration: "8 min",
        activity: "The Evidence Lens: Closing the Loop on March 26/27",
        description: "Connect today's work to the March 26/27 internalization sessions. Every teacher planned a lesson and anticipated student thinking — today we check: did what students produced match what we anticipated? All teachers use the LIT 'After the Lesson' questions as a lens. OSE teachers: this is specifically about Step 2 — did students produce the exemplar you created?",
        lead: "me",
        slides: "Slide 3",
      },
      {
        time: "13:00",
        duration: "5 min",
        activity: "What Counts as Evidence?",
        description: "Review all valid evidence types: unit tests, models, notebook writing, lab reports, sense-making activities, and discussion notes. Every teacher has evidence — it does not have to be a formal assessment. OSE teachers: model revisions and written explanations from OSE activities are especially rich.",
        lead: "me",
        slides: "Slide 4",
      },
      {
        time: "18:00",
        duration: "15 min",
        activity: "Collaborative Work Examination",
        description: "Course-alike groups examine student work using a 4-step protocol: (1) Who met mastery? (2) What misconceptions does this work reveal? (3) What patterns appear across the class? (4) What is the one key finding this work is telling us? OSE teachers: compare student work to your Step 2 exemplar and check whether your anticipated misconceptions appeared.",
        lead: "all",
        slides: "Slide 5",
      },
      {
        time: "33:00",
        duration: "12 min",
        activity: "Key Findings — Whole Group Share-Out",
        description: "Each course-alike group shares their one key finding: what did the student work tell you? We capture strengths, misconceptions, and patterns across the department. No solutions yet — just findings. OSE teachers: share whether students reached the thinking you anticipated in Step 2.",
        lead: "me",
        slides: "Slide 6",
      },
      {
        time: "45:00",
        duration: "3 min",
        activity: "Closing & Preview of April 1",
        description: "Each teacher writes their one key finding on a sticky note or index card to bring to April 1. Preview: on April 1 we will use these findings to plan our instructional response.",
        lead: "me",
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Slides 1–2",
        role: "me",
        note: "Be explicit that today is about reading the evidence, not planning the response. The two-session structure is intentional: rushing to solutions before teachers have really looked at the work is the most common failure mode of student work analysis. Today we slow down and look carefully.",
      },
      {
        slide: "Slide 3",
        role: "me",
        note: "For all teachers, the lens is: 'Did what students produced match what you anticipated when you planned?' For Gen-Ed teachers, connect to LIT 'After the Lesson': who met mastery, who didn't, what were the misconceptions? For OSE teachers: did students produce the exemplar you created in Step 2? Were the misconceptions you anticipated the ones that appeared?",
      },
      {
        slide: "Slide 4",
        role: "me",
        note: "Some teachers may feel they don't have 'real' evidence. Validate everything: a notebook entry, a model, a discussion note. The goal is to look at student thinking, not to have a formal assessment. OSE teachers: sense-making activities and model revisions are especially rich because they show student reasoning, not just recall.",
      },
      {
        slide: "Slide 5",
        role: "all",
        note: "Keep groups focused on describing and interpreting, not planning. If a group jumps to 're-teaching,' redirect: 'What does the work show you first? What is the pattern?' For OSE teachers, the Step 2 exemplar is the comparison point: 'Does this match what you expected students to produce?'",
      },
      {
        slide: "Slide 6",
        role: "me",
        note: "Capture findings on a shared doc or whiteboard visible to all. Look for department-level patterns — if multiple courses show the same misconception, name it explicitly. This sets up April 1's planning work. For OSE teachers: push them to name whether the misconception was on their Step 2 list or a surprise.",
      },
      {
        slide: "Slide 7",
        role: "me",
        note: "The sticky note / index card is important: it creates a physical artifact that teachers bring to April 1. It also signals that today's work is not finished — it is the first half of a two-session arc.",
      },
    ],
    slidesDownloads: [
      {
        label: "Reading the Evidence — Session Deck",
        filename: "ReadingTheEvidence_Mar31.pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Reading_the_Evidence__What_Did_Students_Actually_Produce_62dbbe3b.pptx",
        type: "pptx",
      },
    ],
    slidesUrl: "manus-slides://hWxacQua6McbBi7A4K3Yau",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Reading_the_Evidence__What_Did_Students_Actually_Produce_464eeabb.pptx",
    agendaVersion: "Both",
    resources: [
      {
        title: "DESE Lesson Internalization Tool — Steps 3 and 4",
        description: "OSE teachers: Step 2 (Planning the Details) is the direct connection to today's student work examination. Use this to guide your exemplar comparison and misconception review.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: use the 'After the Lesson: Reflection and Forward Planning' section and the Student Work Review Tool as your examination framework today.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session is the first of a two-part evidence cycle. Teachers arrive with student work in hand — unit tests, models, notebook writing, lab reports, sense-making activities, or discussion notes — and spend the session examining it carefully together. The goal is not to jump to solutions, but to read the evidence first: to look at what students actually produced, name the patterns, and surface the most important finding before deciding how to respond.\n\nUsing a structured 4-step collaborative examination protocol, course-alike groups work through their student work samples together. The protocol asks four questions: Who met mastery? What misconceptions does this work reveal? What patterns appear across the class? And what is the one key finding this work is telling us? OSE teachers compare student work to the exemplar created in Step 2 of the internalization protocol and check whether the misconceptions they anticipated actually appeared. Gen-Ed teachers use the DESE LIT 'After the Lesson: Reflection and Forward Planning' section as their examination frame.\n\nThe session closes with a whole-group share-out: each course-alike group names their one key finding. These findings are not judgments — they are data. They become the starting point for the April 1 session, where teachers turn each finding into a concrete instructional response.",
      whyItMatters: "Teachers make dozens of instructional decisions every day, but rarely have structured time to look carefully at what students actually produced and ask: what is this telling me? Student work is the most direct evidence available of whether our instructional moves are working — but only if we examine it with intention. This session creates that time and that structure. By looking at student work together, course-alike teams build a shared picture of where students are, reduce the isolation of individual teachers making sense of their classes alone, and surface patterns that no single teacher would see on their own.",
      learningArc: "This is Session 3 of a 5-session arc, and the first session in the evidence cycle. The student work teachers bring today comes directly from the lesson they internalized on March 27 — the lesson where they tried a questioning strategy or discourse structure from March 26. Today we ask: did it work? What did students actually do? The findings from this session drive the April 1 session (planning the instructional response) and the April 3 session (co-planning the next lesson with discourse built in from the start).",
      teacherTakeaways: [
        "A careful, protocol-guided examination of student work from a recent lesson, completed with course-alike colleagues.",
        "One key finding per course-alike group: what the student work is telling you about student understanding, misconceptions, and patterns.",
        "OSE teachers: a comparison of student work to your Step 2 exemplar and a check on whether anticipated misconceptions appeared.",
        "A clear starting point for April 1: the specific finding you will turn into an instructional response.",
      ],
    },
  },

  // ─── SESSION 6: Wednesday April 1 — Responding to the Evidence ──────────────
  {
    id: "student-work-analysis-gened",
    date: "2026-04-01",
    displayDate: "Wednesday, April 1, 2026",
    title: "Responding to the Evidence: Planning Our Next Instructional Move",
    subtitle: "Full Science Department",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "Lesson Internalization Tool — Steps 3 & 4: Planning for Access and Engagement | OSE Steps 2 & 3",
    objectives: [
      "Use the key finding from March 31 to identify a specific, concrete instructional response for the next lesson.",
      "Apply the internalization protocol to plan how to re-teach, adjust scaffolds, or support all learners based on student work evidence.",
      "Collaborate in course-alike groups to co-plan one lesson adjustment that addresses the most common misconception identified on March 31.",
      "OSE teachers: update Step 2 (revise exemplar and misconception list) and Step 3 (adjust supports for students with disabilities and MLLs).",
    ],
    whatToBring: [
      "Your key finding from March 31 (sticky note or index card)",
      "Your lesson plan for the upcoming lesson you will adjust",
      "OSE teachers: your Teacher Edition and updated Step 2 notes from March 31",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Reconnect",
        description: "Reconnect to March 31: today we move from reading the evidence to responding to it. Each teacher has a key finding — today we turn that finding into a concrete instructional plan.",
        lead: "me",
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "2 min",
        activity: "Agenda & Norms",
        description: "Walk through the session agenda. Norm: every plan must be specific and actionable, not a general intention.",
        lead: "me",
        slides: "Slide 2",
      },
      {
        time: "5:00",
        duration: "5 min",
        activity: "From Finding to Response: The Planning Frame",
        description: "Introduce the planning frame for all teachers: (1) What did the evidence tell me? (2) What is my specific instructional response? (3) How will I support all learners? Gen-Ed teachers: connect to LIT Steps 3 & 4. OSE teachers: connect to Steps 2 & 3.",
        lead: "me",
        slides: "Slide 3",
      },
      {
        time: "10:00",
        duration: "5 min",
        activity: "Individual Planning",
        description: "Each teacher uses the planning template to draft their instructional response based on their March 31 key finding. OSE teachers: begin by updating your Step 2 exemplar and misconception list before moving to the response.",
        lead: "all",
        slides: "Slide 4",
      },
      {
        time: "15:00",
        duration: "20 min",
        activity: "Course-Alike Co-Planning",
        description: "Course-alike groups share their individual plans and co-plan one shared instructional adjustment. Groups focus on: the re-teach or extension strategy, the scaffold or support to add, and how to reach students who did not meet mastery. OSE teachers: also update Step 3 supports together.",
        lead: "all",
        slides: "Slide 5",
      },
      {
        time: "35:00",
        duration: "8 min",
        activity: "Share-Out: What Is Our Response?",
        description: "Each course-alike group shares their co-planned adjustment. We capture the department's collective response to the evidence from March 31.",
        lead: "me",
        slides: "Slide 6",
      },
      {
        time: "43:00",
        duration: "3 min",
        activity: "Commitments, Preview of April 3 & Close",
        description: "Each teacher writes one commitment: 'I will ___ before April 3 because my student work showed me ___.' Preview April 3: we will use the co-planning work from today in a longer co-planning session with discourse built in.",
        lead: "me",
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Slides 1–2",
        role: "me",
        note: "Explicitly connect to March 31: 'Last time we looked carefully at the evidence. Today we act on it.' The two-session arc is intentional — teachers who examined their work carefully on March 31 are now ready to plan a real response. Check that everyone has their key finding from March 31 before starting.",
      },
      {
        slide: "Slide 3",
        role: "me",
        note: "The planning frame is the same for all teachers, but the protocol language differs. For Gen-Ed teachers: LIT Step 3 (Consider Your Students — misconceptions, identities, bias) and Step 4 (Planning for Access and Engagement — facilitation moves, scaffolds for MLLs and students with disabilities). For OSE teachers: Step 2 (update exemplar and misconception list) and Step 3 (adjust supports for students with disabilities and MLLs).",
      },
      {
        slide: "Slide 4",
        role: "all",
        note: "Give teachers quiet individual time before the group work. Teachers who skip individual planning tend to defer to the loudest voice in the group. For OSE teachers: the first step is to update the Step 2 exemplar — what should students produce now that you have seen what they actually produced?",
      },
      {
        slide: "Slide 5",
        role: "all",
        note: "Push groups to be specific: not 're-teach the concept' but 'add a sentence frame for the model explanation and re-do the sense-making activity with a different phenomenon.' For OSE teachers: Step 3 updates should name specific students or student groups, not just 'MLLs' in general.",
      },
      {
        slide: "Slide 6",
        role: "me",
        note: "Capture the department's collective response on a shared doc. This becomes the record of how the department responded to the evidence — it is a powerful artifact for future PLCs and for your own reflection.",
      },
      {
        slide: "Slide 7",
        role: "me",
        note: "Preview April 3 explicitly: it is a longer session (41 min) focused on co-planning with discourse built in. Teachers who have a clear instructional response from today will be ready to plan a full lesson on April 3. Commitments should be specific enough to bring to April 3.",
      },
    ],
    slidesDownloads: [
      {
        label: "Responding to the Evidence — Session Deck",
        filename: "RespondingToEvidence_Apr1.pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Responding_to_the_Evidence__Planning_Our_Next_Instructional_Move_8eae7de0.pptx",
        type: "pptx",
      },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "",
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OSE teachers: Steps 2 & 3 are the direct connection to today's response planning. Use Step 2 to update your exemplar and misconception list, and Step 3 to adjust supports for students with disabilities and MLLs.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: Steps 3 & 4 are the direct connection to today's response planning. Use Step 3 to consider your students and Step 4 to plan facilitation moves, scaffolds, and access supports.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session picks up exactly where March 31 left off. Every teacher arrives with a key finding in hand — the one thing their student work told them about where students are and what they need next. The session is structured around turning that finding into a concrete instructional response: a specific re-teach, a scaffold adjustment, a discourse move, or a support for students who did not yet reach mastery.\n\nCourse-alike groups work through the response planning together, using the internalization protocol as the frame. The protocol asks: what is the instructional adjustment, how will you scaffold it for all learners, and how does it connect to the lesson you are planning next? OSE teachers update Step 2 (revise the exemplar and misconception list based on what the student work revealed) and Step 3 (adjust supports for students with disabilities and MLLs). Gen-Ed teachers work through LIT Steps 3 and 4, planning the facilitation moves and access supports for the adjusted lesson.\n\nThe session closes with a written commitment: the specific lesson, the specific adjustment, and the specific support. These commitments are the planning documents teachers bring to the April 3 co-planning session, where course-alike teams will build the next lesson together from the ground up.",
      whyItMatters: "Examining student work is only valuable if it changes what happens next in the classroom. The most common failure mode of student work analysis is that teachers look at the evidence, name the problem, and then return to their classrooms and teach the next lesson the same way. This session is designed to prevent that. By turning the key finding into a concrete instructional plan — with colleagues, using a shared protocol — teachers leave with something they can actually use. The response is not generic; it is specific to the students, the lesson, and the misconception the work revealed.",
      learningArc: "This is Session 4 of a 5-session arc, and the second session in the evidence cycle. The key finding from March 31 is the input; the instructional response plan is the output. On April 3, course-alike teams will use that response plan as the starting point for co-planning the next lesson together — with discourse structures built in from the start, and the internalization protocol as the planning frame. The arc closes with a lesson that was planned collaboratively, grounded in student evidence, and designed to produce the student thinking we want to see.",
      teacherTakeaways: [
        "A concrete instructional response to the key finding from March 31: a specific re-teach, scaffold adjustment, or discourse move.",
        "OSE teachers: an updated Step 2 (revised exemplar and misconception list) and Step 3 (adjusted supports) for the next lesson.",
        "Gen-Ed teachers: a completed LIT Steps 3 & 4 plan for the adjusted lesson, with facilitation moves and access supports.",
        "A written commitment to bring to April 3: the lesson, the adjustment, and the support you will build into the co-planned lesson.",
      ],
    },
  },

  // ─── SESSION 7: Friday April 3 — SCHOOL HOLIDAY (No PLC) ───────────────────────
  {
    id: "school-holiday-apr3",
    date: "2026-04-03",
    displayDate: "Friday, April 3, 2026",
    title: "No PLC — School Holiday",
    subtitle: "School Holiday",
    duration: "48 Minutes",
    isHoliday: true,
    audience: "Grades 9–12 Science Teachers",
    alignment: "—",
    objectives: [],
    whatToBring: [],
    agenda: [],
    facilitatorNotes: [],
    slidesUrl: "",
    slidesDownloadUrl: "",
    agendaVersion: "Both",
  },

  // ─── SESSION 8: Tuesday April 7 — Co-Planning with Discourse Built In (moved from Apr 3) ───
  {
    id: "co-planning-discourse-apr7",
    date: "2026-04-07",
    displayDate: "Tuesday, April 7, 2026",
    title: "From Evidence to Lesson: Co-Planning with Discourse in Mind",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "Lesson Internalization Tool — Steps 2–4 | OSE Steps 2 & 3 | Academic Discourse Structures (March 26/27)",
    objectives: [
      "Co-plan an upcoming lesson with course-alike partners, using the internalization protocol as the planning frame.",
      "Build discourse structures (talk moves, questioning sequences) into the lesson from the start — not added on afterward.",
      "Connect the lesson plan to the instructional response identified on April 1, ensuring the plan addresses the misconceptions surfaced in student work.",
      "OSE teachers: complete a full Step 2 plan for the upcoming lesson, including exemplar, misconception list, and Step 3 supports.",
    ],
    whatToBring: [
      "Your commitment and instructional response plan from April 1",
      "Your lesson plan or unit materials for the upcoming lesson you will co-plan",
      "OSE teachers: your Teacher Edition for the upcoming lesson",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Framing",
        description: "Connect today's session to the full arc: we questioned (March 26/27), we examined evidence (March 31), we planned our response (April 1), and today we co-plan a lesson that puts it all together.",
        lead: "me",
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "3 min",
        activity: "The Co-Planning Frame",
        description: "Introduce the co-planning structure: use the internalization protocol as the planning frame. Discourse structures get planned in — not added on. LIT Steps 2–4 for all teachers; OSE Steps 1–3.",
        lead: "me",
        slides: "Slide 2",
      },
      {
        time: "6:00",
        duration: "30 min",
        activity: "Course-Alike Co-Planning Work Session",
        description: "Course-alike pairs or trios co-plan an upcoming lesson together. Step 1: agree on the key science idea. Step 2: anticipate student thinking and plan the discourse moment. Step 3: choose 1–2 talk moves from March 26/27. Step 4: plan supports for all learners. OSE teachers: complete a full Step 2 plan including exemplar and misconception list.",
        lead: "all",
        slides: "Slides 3–5",
      },
      {
        time: "36:00",
        duration: "7 min",
        activity: "Share-Out: What Did We Plan?",
        description: "Each course-alike group shares: the lesson objective, the discourse move they built in, and one support they planned for students who need it. Department discourse bank built live.",
        lead: "me",
        slides: "Slide 6",
      },
      {
        time: "43:00",
        duration: "3 min",
        activity: "Commitments & Close",
        description: "Each teacher writes one commitment: 'I will teach ___ on ___ and bring back student work to the next PLC.' Sets up the next student work analysis cycle.",
        lead: "me",
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Slide 1",
        role: "me",
        note: "Name the full arc explicitly for teachers: questioning (March 26/27) → internalization (March 26/27) → student work analysis (March 31) → response planning (April 1) → co-planning (today). This is the instructional improvement cycle in action. Teachers should feel the coherence of the sequence.",
      },
      {
        slide: "Slide 2",
        role: "me",
        note: "The co-planning frame is the internalization protocol. For Gen-Ed teachers: LIT Steps 2 (lesson purpose and goals), 3 (consider your students), and 4 (access and engagement). For OSE teachers: Steps 1 (lesson purpose), 2 (planning the details — exemplar, misconceptions, strategies), and 3 (all learners). The key addition today: discourse structures from March 26/27 get planned into Step 2/4, not added on afterward.",
      },
      {
        slide: "Slides 3–5",
        role: "all",
        note: "Circulate and push groups to be specific about the discourse moment: not 'we will have a discussion' but 'we will use a think-pair-share at minute 12 with the question: What do you notice about the model? Then we will use a revoicing move to connect student ideas.' For OSE teachers: the exemplar should show what students will produce at the discourse moment, not just at the end of the lesson.",
      },
      {
        slide: "Slide 6",
        role: "me",
        note: "Capture lesson titles and discourse moves on a shared doc. This becomes a department resource. If time allows, ask one group to show their plan and get feedback from the room.",
      },
      {
        slide: "Slide 7",
        role: "me",
        note: "The commitment to bring back student work is critical — it sets up the next student work analysis cycle and signals that the PLC is a continuous improvement loop, not a series of one-off sessions.",
      },
    ],
    slidesDownloads: [
      {
        label: "Co-Planning with Discourse Built In — Session Deck",
        filename: "From_Evidence_to_Lesson_Co-Planning_with_Discourse_in_Mind.pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/From_Evidence_to_Lesson__Co-Planning_with_Discourse_in_Mind_7e87616b.pptx",
        type: "pptx",
      },
    ],
    slidesUrl: "manus-slides://hGDsPKMKSplPmHWMkQCrXy",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/From_Evidence_to_Lesson__Co-Planning_with_Discourse_in_Mind_7e87616b.pptx",
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OSE teachers: use Steps 1–3 as your co-planning frame today. Step 2 (Planning the Details) is the core of the session — complete the exemplar, misconception list, and instructional strategies for the upcoming lesson.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: use LIT Steps 2–4 as your co-planning frame today. Step 4 (Planning for Access and Engagement) is where you build discourse structures and supports into the lesson.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This is the session where everything comes together. Teachers arrive with their instructional response plan from April 1 — the specific lesson adjustment they identified based on student work evidence — and spend the session co-planning the next lesson with course-alike partners. The internalization protocol serves as the planning frame, and the discourse structures from March 26 and 27 are built into the lesson from the start, not added on afterward.\n\nThe session is structured as a supported co-planning work session. Course-alike pairs or trios sit down with a real upcoming lesson and work through it together: reading the lesson, identifying the key science idea, planning the questions and talk moves for the core discussion moment, and building in supports for all learners. The April 1 instructional response is the starting point — the lesson plan should reflect what the student work told us and address the misconception or gap we identified.\n\nOSE teachers complete a full Step 2 plan for the upcoming lesson, including the exemplar, the misconception list, and the instructional strategies. They also complete Step 3, identifying supports for students with disabilities and MLLs. Gen-Ed teachers work through LIT Steps 2–4, using the protocol to plan the lesson's discussion structure, facilitation moves, and access supports. The session closes with each teacher naming the lesson they will teach and the one discourse structure they built in.",
      whyItMatters: "Co-planning is one of the most powerful things a PLC can do — but only when it is grounded in real evidence and structured around a shared protocol. When teachers plan lessons together, they catch each other's blind spots, share strategies that work for specific students, and build a shared understanding of what the lesson is supposed to produce. This session brings together everything from the previous four sessions: the questioning strategies, the discourse structures, the internalization protocol, and the student work evidence. The result is a lesson that was not just planned, but planned well — with colleagues, for real students, based on real data.",
      learningArc: "This is Session 5 of a 5-session arc, and the closing session of the spring PLC cycle. The arc began with questioning strategies and discourse structures (March 26), moved through lesson internalization (March 27), examined student evidence (March 31), planned the instructional response (April 1), and closes here with co-planning the next lesson. The lesson teachers plan today becomes the evidence for the next cycle — and the pattern of examine, respond, and plan together becomes the ongoing work of the department.",
      teacherTakeaways: [
        "A co-planned lesson with discourse structures built in from the start, grounded in the student work evidence from March 31.",
        "OSE teachers: a completed Step 2 plan (exemplar, misconception list, instructional strategies) and Step 3 supports for the upcoming lesson.",
        "Gen-Ed teachers: a completed LIT Steps 2–4 plan with planned questions, talk moves, facilitation moves, and access supports.",
        "A shared planning document with your course-alike partner(s) that you can both use when you teach the lesson.",
      ],
    },
  },

  // ─── SESSION 9: Wednesday April 8 — What Does a Good Discussion Look Like? ──
  {
    id: "plc-2026-04-08",
    date: "2026-04-08",
    displayDate: "Wednesday, April 8, 2026",
    title: "What Does a Good Discussion Look Like?",
    subtitle: "Full PLC Session — Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "NBHS Science Department Discussion Criteria Development",
    objectives: [
      "Watch two short video clips and identify what makes student discussion productive.",
      "Draft 3–5 criteria for a high-quality science discussion based on observation evidence.",
      "Negotiate a shared set of department-wide criteria through structured consensus-building.",
      "Equity-check the criteria to ensure they serve all learners, including multilingual learners and students with IEPs.",
    ],
    whatToBring: [
      "Your current lesson plan or unit map for the next two weeks",
      "Pen and sticky notes for the criteria-drafting activity",
      "An open mind — we are building something together from scratch",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "5 min",
        activity: "Welcome & Framing",
        description: "Introduce the session purpose: today we build shared criteria for what a high-quality discussion looks like in our classrooms. These criteria will anchor the PD session later today and the April 10 co-planning session.",
        lead: "me" as Role,
        slides: "Slide 1",
      },
      {
        time: "5:00",
        duration: "5 min",
        activity: "Agenda & Session Arc",
        description: "Walk through the session agenda. Explain how today's criteria connect to the April 8 PD (designing a structured discussion) and April 10 co-planning (applying criteria to an upcoming lesson).",
        lead: "me" as Role,
        slides: "Slide 2",
      },
      {
        time: "10:00",
        duration: "10 min",
        activity: "First Watch: What Do You Notice?",
        description: "Watch the first video clip (2–3 min). Teachers write independently: What do you notice about how students are talking? What makes this feel like a productive discussion — or not? No discussion yet — just observation.",
        lead: "me" as Role,
        slides: "Slide 3",
      },
      {
        time: "20:00",
        duration: "10 min",
        activity: "Second Watch: Criteria Drafting",
        description: "Watch the second video clip (2–3 min). Teachers draft 3–5 criteria for a high-quality science discussion on sticky notes — one criterion per note. Prompt: If a discussion is going well, what would you see? What would you hear?",
        lead: "me" as Role,
        slides: "Slide 4",
      },
      {
        time: "30:00",
        duration: "15 min",
        activity: "Negotiating Shared Criteria",
        description: "Post sticky notes on the board. As a department, sort, merge, and negotiate until we have 5–7 shared criteria. Each criterion must be observable and specific. Facilitator records the final list.",
        lead: "me" as Role,
        slides: "Slide 5",
      },
      {
        time: "45:00",
        duration: "10 min",
        activity: "Equity Check",
        description: "Review the criteria list through an equity lens: Do these criteria assume all students can participate in the same way? Which criteria might need scaffolds for multilingual learners or students with IEPs? Add equity notes to each criterion.",
        lead: "me" as Role,
        slides: "Slide 6",
      },
      {
        time: "55:00",
        duration: "5 min",
        activity: "Commitment & Close",
        description: "Each teacher identifies one criterion they will focus on in their next discussion. Preview the April 8 PD (Designing a Structured Discussion) and April 10 co-planning session.",
        lead: "me" as Role,
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Session Purpose",
        role: "me" as Role,
        note: "This session launches a two-part arc: today we build shared criteria for what a good discussion looks like; the April 8 PD session uses those criteria to design a structured discussion; and April 10 is the co-planning session where teachers apply the criteria to an upcoming lesson. The criteria we build today are the anchor for everything that follows.",
      },
      {
        slide: "First Watch",
        role: "me" as Role,
        note: "Play the first video clip without pausing. Ask teachers to write silently — no talking during the clip. The goal is independent observation before group discussion. After the clip, give 2 minutes of silent writing time before anyone shares.",
      },
      {
        slide: "Criteria Drafting",
        role: "me" as Role,
        note: "Each teacher should produce at least 3 sticky notes. Push for specificity: 'Students are engaged' is too vague. 'Students build on each other's ideas using evidence' is observable and specific. Circulate and push for observable language.",
      },
      {
        slide: "Negotiating Shared Criteria",
        role: "me" as Role,
        note: "This is the most important part of the session. The goal is not to list every criterion — it is to negotiate a shared set that everyone can use. Aim for 5–7 criteria. If there is disagreement, ask: Can we observe this? Can a student demonstrate this? That usually resolves the debate.",
      },
      {
        slide: "Equity Check",
        role: "me" as Role,
        note: "The equity check is not optional. For each criterion, ask: What does this look like for a student who is still developing academic English? What does this look like for a student with an IEP? The goal is not to lower the bar — it is to identify where we need scaffolds so all students can meet the criteria.",
      },
    ],
    slidesUrl: "manus-slides://L5tKeHLIexpfjnR35AxxBZ",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr8_PLC_v5_016f222e.pptx",
    agendaVersion: "Both",
    sessionInfo: {
      overview: "This session opens a three-part arc focused on student discussion. The department begins by watching two short video clips of student discussions and building shared criteria for what a high-quality science discussion looks like — from the ground up, in their own words.\n\nThe criteria-building process is intentionally collaborative: teachers observe, draft independently, and then negotiate as a department until they reach a shared list of 5–7 observable criteria. These criteria become the department's shared standard — the benchmark against which every discussion will be measured going forward.\n\nThe session closes with an equity check: reviewing each criterion through the lens of multilingual learners and students with IEPs, and identifying where scaffolds are needed so all students can participate meaningfully.",
      whyItMatters: "Discussion is not a soft skill — it is the mechanism through which students construct scientific understanding. But without shared criteria, 'good discussion' means something different to every teacher in the building. This session gives the department a common language and a common standard, so that when we say a discussion is going well, we all mean the same thing. That shared standard is the foundation for everything that follows in the spring arc.",
      learningArc: "This is Session 9 in the spring PLC arc. The arc began with questioning strategies and discourse structures (March 26), moved through lesson internalization (March 27), examined student evidence (March 31), planned the instructional response (April 1–3), and now shifts to criteria-building (April 8). The criteria built today anchor the April 8 PD session (Designing a Structured Discussion) and the April 10 co-planning session (applying criteria to an upcoming lesson).",
      teacherTakeaways: [
        "A shared department-wide set of 5–7 observable criteria for a high-quality science discussion.",
        "Equity notes for each criterion identifying scaffolds for multilingual learners and students with IEPs.",
        "One personal focus criterion to apply in the next discussion.",
        "A clear connection to the April 8 PD session and April 10 co-planning session.",
      ],
    },
  },

  // ─── SESSION 10: Friday April 10 — Co-Planning: Applying Discussion Criteria ─
  {
    id: "plc-2026-04-10",
    date: "2026-04-10",
    displayDate: "Friday, April 10, 2026",
    title: "Co-Planning: Designing a Discussion for an Upcoming Lesson",
    subtitle: "Co-Planning Session — Course-Alike Teams",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "NBHS Science Department Discussion Criteria (April 8)",
    objectives: [
      "Apply the department's shared discussion criteria to an upcoming lesson.",
      "Co-plan a structured discussion with your course-alike partner(s) using the criteria as a design guide.",
      "Identify one criterion that will be hardest to meet in your lesson and plan a specific scaffold for it.",
      "Leave with a ready-to-use discussion plan for a lesson in the next two weeks.",
    ],
    whatToBring: [
      "Your lesson plan or unit map for the next two weeks",
      "The department's shared discussion criteria from April 8",
      "Your course-alike partner's lesson plan (coordinate before the session)",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "5 min",
        activity: "Re-Anchor to the Criteria",
        description: "Briefly revisit the department's shared discussion criteria from April 8. Remind teachers that today's co-planning work is anchored to these criteria — every design decision should connect back to at least one criterion.",
        lead: "me" as Role,
        slides: "Slide 1",
      },
      {
        time: "5:00",
        duration: "5 min",
        activity: "Choose Your Discussion Format",
        description: "Each course-alike team selects a discussion format for an upcoming lesson: Science Talk, Think-Pair-Share, Structured Academic Controversy, or Fishbowl. Teams briefly explain their choice to the group.",
        lead: "me" as Role,
        slides: "Slide 2",
      },
      {
        time: "10:00",
        duration: "10 min",
        activity: "Write Your Launch Question",
        description: "Each teacher independently drafts a launch question for their chosen lesson. The question must be open-ended, connected to a science idea, and designed to generate student-to-student talk — not just student-to-teacher responses.",
        lead: "me" as Role,
        slides: "Slide 3",
      },
      {
        time: "20:00",
        duration: "10 min",
        activity: "Course-Alike Feedback Protocol",
        description: "In course-alike pairs or trios: share your launch question and receive one 'I notice' and one 'I wonder' from your partner(s), anchored to the shared criteria. Revise your question based on the feedback.",
        lead: "me" as Role,
        slides: "Slide 4",
      },
      {
        time: "30:00",
        duration: "10 min",
        activity: "Plan the Scaffolds",
        description: "For each criterion, identify one scaffold that will help multilingual learners and students with IEPs meet the criterion. Add the scaffolds to your discussion plan.",
        lead: "me" as Role,
        slides: "Slide 5",
      },
      {
        time: "40:00",
        duration: "5 min",
        activity: "Share-Out & Department Question Bank",
        description: "Each course team shares: their discussion format, their launch question, and the criterion that was hardest to design for. Facilitator records all questions in the department question bank.",
        lead: "me" as Role,
        slides: "Slide 6",
      },
      {
        time: "45:00",
        duration: "3 min",
        activity: "Commitment & Close",
        description: "Each teacher commits to a date when they will run the discussion. Preview the next PLC session where we will bring back student evidence from these discussions.",
        lead: "me" as Role,
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Session Purpose",
        role: "me" as Role,
        note: "This session is the application session in the arc. Teachers built the criteria on April 8 and learned design frameworks in the April 8 PD. Today they apply both to an actual upcoming lesson. The goal is for every teacher to leave with a ready-to-use discussion plan — not a draft, not an idea, but a plan they can teach from.",
      },
      {
        slide: "Choose Your Discussion Format",
        role: "me" as Role,
        note: "The four formats (Science Talk, Think-Pair-Share, Structured Academic Controversy, Fishbowl) were introduced in the April 8 PD. If teachers are unsure which to choose, suggest: Think-Pair-Share for a lesson where students need to process a new idea; Science Talk for a lesson where students are comparing data or claims; Structured Academic Controversy for a lesson with a genuine scientific debate; Fishbowl for a lesson where you want to model discussion before students try it.",
      },
      {
        slide: "Write Your Launch Question",
        role: "me" as Role,
        note: "The most common mistake is writing a question that has one correct answer. Push teachers to write questions that have multiple defensible answers grounded in evidence. A good test: if a student can answer the question with one word, it is not a launch question.",
      },
      {
        slide: "Course-Alike Feedback Protocol",
        role: "me" as Role,
        note: "Keep the feedback anchored to the criteria. If a teacher says 'I think the question is too hard,' redirect: Which criterion does that connect to? The criteria are the shared standard — feedback that is not anchored to a criterion is just opinion.",
      },
      {
        slide: "Share-Out",
        role: "me" as Role,
        note: "Record every launch question in a shared document. This becomes the department's question bank — a resource every teacher can draw from in future lessons. The question bank is also evidence of the department's collective capacity to design for discussion.",
      },
    ],
    slidesUrl: "manus-slides://rMXeSmkhJrOijVlJkxmZcu",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr10_PLC_v6_5a0e3f38.pptx",
    agendaVersion: "Both",
    sessionInfo: {
      overview: "This co-planning session is the third and final session in the April discussion arc. Teachers arrive with the shared criteria built on April 8 and the design frameworks from the April 8 PD, and use both to plan a structured discussion for an actual upcoming lesson.\n\nThe session is organized around course-alike teams. Each team chooses a discussion format, writes a launch question, and gives and receives criteria-anchored feedback before finalizing their plan. The session closes with a whole-group share-out that builds a department-wide question bank.\n\nEvery teacher leaves with a ready-to-use discussion plan — a launch question, a format, and a set of scaffolds — for a lesson in the next two weeks.",
      whyItMatters: "The best professional development produces something teachers can use on Monday. This session is designed to do exactly that: every teacher leaves with a complete discussion plan for an upcoming lesson, co-designed with their course-alike partner and stress-tested against the department's shared criteria. The question bank built in the share-out becomes a lasting resource the department can draw from across the year.",
      learningArc: "This is Session 10 in the spring PLC arc and the closing session of the April discussion arc. The arc began with criteria-building (April 8 PLC), moved through design frameworks (April 8 PD), and closes here with application to a real lesson (April 10). The discussion plans teachers build today become the evidence for the next cycle — when we bring back student data from these discussions and examine what worked.",
      teacherTakeaways: [
        "A complete, ready-to-use discussion plan for an upcoming lesson: format, launch question, and scaffolds.",
        "Criteria-anchored feedback from your course-alike partner on your launch question.",
        "A contribution to the department's shared question bank.",
        "A committed date for running the discussion and bringing back student evidence.",
      ],
    },
  },

  // ─── SESSION 10: Tuesday April 14 — Reading Like a Scientist ──────────────────
  {
    id: "plc-2026-04-14",
    date: "2026-04-14",
    displayDate: "Tuesday, April 14, 2026",
    title: "Reading Like a Scientist",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "LIT Step 1 (Content & Language Objectives) | LIT Step 3 (Diverse Learners) | OSE Step 2 (Text & Lab Purpose)",
    objectives: [
      "Practice annotating a science text for evidence and claims — the same strategy students need for MCAS constructed response.",
      "Identify one upcoming lesson where annotating for evidence and claims can be built into student reading.",
      "OSE teachers: connect the annotation strategy to the text or lab in an upcoming OSE lesson (OSE Step 2).",
    ],
    whatToBring: [
      "Your lesson plan or unit materials for the next 1–2 weeks",
      "OSE teachers: your Teacher Edition for the upcoming lesson",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Framing",
        description: "Connect today's session to the arc: we've built discourse structures into our lessons — now we focus on the reading and writing skills that let students carry that thinking onto paper. Today: reading like a scientist.",
        lead: "me" as Role,
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "5 min",
        activity: "The Challenge: What Do Students Do with a Science Text?",
        description: "Brief whole-group discussion: when students read a science passage or data set, what do they typically do? What do we want them to do instead? Surface the gap between passive reading and strategic reading for evidence and claims.",
        lead: "me" as Role,
        slides: "Slide 2",
      },
      {
        time: "8:00",
        duration: "8 min",
        activity: "Model: Annotating for Evidence and Claims",
        description: "Facilitator models the annotation strategy using a real MCAS Biology passage. Show three annotation moves: (1) underline the claim, (2) bracket the evidence, (3) write a margin note connecting evidence to the claim. Teachers observe and take notes on the moves.",
        lead: "me" as Role,
        slides: "Slide 3",
      },
      {
        time: "16:00",
        duration: "12 min",
        activity: "Teacher Practice: Annotate a Science Passage",
        description: "Teachers annotate a second MCAS-style passage independently using the three moves. Then share with a partner: What claim did you identify? What evidence supports it? What was hard about this for you — and what might be hard for students?",
        lead: "me" as Role,
        slides: "Slide 4",
      },
      {
        time: "28:00",
        duration: "10 min",
        activity: "Course-Alike Planning: Where Does This Fit in Your Lesson?",
        description: "Course-alike groups identify one upcoming lesson where students read a science text or examine data. Plan how to build the annotation strategy in: What is the text or data set? What claim should students be looking for? What evidence will they annotate? OSE teachers: connect to OSE Step 2 — how does the text or lab help students understand the lesson objective?",
        lead: "me" as Role,
        slides: "Slide 5",
      },
      {
        time: "38:00",
        duration: "5 min",
        activity: "Share-Out",
        description: "Each course-alike group shares: the lesson, the text or data set, and the claim students will annotate for. Department builds a shared list of upcoming annotation opportunities.",
        lead: "me" as Role,
        slides: "Slide 6",
      },
      {
        time: "43:00",
        duration: "3 min",
        activity: "Commitment & Bridge to April 15",
        description: "Each teacher writes: 'I will use annotating for evidence and claims in [lesson] on [date].' Preview April 15: we will focus on the writing side — how students turn their annotations into a constructed response.",
        lead: "me" as Role,
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Framing",
        role: "me" as Role,
        note: "The connection to discourse is important: students have been talking through evidence in class — today we help them read for it and eventually write it. This is the same cognitive move, just on paper.",
      },
      {
        slide: "Model",
        role: "me" as Role,
        note: "Use a real MCAS Biology passage — ideally one from a standard where benchmark scores were low (e.g., HS-LS1-1 or HS-LS2-1). This makes the practice immediately relevant to MCAS prep.",
      },
      {
        slide: "OSE Guidance",
        role: "me" as Role,
        note: "OSE teachers should connect this to OSE Step 2: 'How does the text and/or lab help students understand the objective of the lesson?' The annotation strategy is a direct tool for answering that question with students.",
      },
    ],
    slidesUrl: "manus-slides://K6fKiWgXEEtDeoddRQOgXu",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Reading_Like_a_Scientist_fde9b3b0.pptx",
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OSE teachers: Step 2 is the direct connection — use the annotation strategy to help students engage with the text or lab in your upcoming lesson.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: Step 1 (content and language objectives) and Step 3 (diverse learners) are the direct connections — plan how the annotation strategy supports all learners in accessing the text.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session opens the final instructional arc of the year: reading and writing in science. After weeks of building discourse structures into lessons, the department now turns to the skills students need to carry their thinking onto paper — the exact skills tested in MCAS constructed response items.\n\nThe session is built around one anchor strategy: annotating for evidence and claims. Teachers first watch a model using a real MCAS Biology passage, then practice the strategy themselves, then plan where to use it in an upcoming lesson. The session closes with a written commitment and a preview of April 15, where the focus shifts to the writing side: turning annotations into a constructed response.",
      whyItMatters: "MCAS Biology constructed response items require students to read a passage or data set, identify a claim, and support it with specific evidence. Most students approach science reading passively — they read for information, not for argument. Annotating for evidence and claims is the bridge: it trains students to read like scientists, looking for what the text is arguing and what supports that argument. This is a skill teachers can build in one lesson, and the payoff shows up directly in constructed response performance.",
      learningArc: "This is Session 1 of a 3-session reading and writing arc (April 14, 15, 17). Session 1 focuses on reading strategies. Session 2 (April 15) focuses on writing — specifically the CER (Claim, Evidence, Reasoning) format for constructed response. Session 3 (April 17) brings both together in a co-planned lesson that integrates reading and writing, connected to a low-performing benchmark standard.",
      teacherTakeaways: [
        "A clear understanding of the annotating for evidence and claims strategy and how to model it for students.",
        "A specific plan for where to use the annotation strategy in an upcoming lesson, with the text or data set identified.",
        "OSE teachers: a connection between the annotation strategy and OSE Step 2 for the upcoming lesson.",
        "A written commitment to use the strategy before April 17.",
      ],
    },
  },
  // ─── SESSION 11: Wednesday April 15 — Writing Like a Scientist ─────────────────
  {
    id: "plc-2026-04-15",
    date: "2026-04-15",
    displayDate: "Wednesday, April 15, 2026",
    title: "Writing Like a Scientist",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "LIT Step 3 (Diverse Learners) | LIT Step 4 (Access & Engagement) | OSE Step 3 (Supports for All Learners)",
    objectives: [
      "Examine real student constructed response samples to identify what strong science writing looks like — and what is missing in typical responses.",
      "Build a simple CER (Claim, Evidence, Reasoning) scaffold or sentence frame that teachers can give students for an upcoming lesson.",
      "OSE teachers: adapt the scaffold for students with disabilities and MLLs (OSE Step 3).",
    ],
    whatToBring: [
      "Your commitment from April 14 (the lesson where you planned to use annotation)",
      "Any student work samples from a recent lesson if available",
      "OSE teachers: your Teacher Edition for the upcoming lesson",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Connection to April 14",
        description: "Brief check-in: how did the annotation strategy go or how are you planning to use it? Connect today's focus: if reading is about finding the evidence, writing is about using it. Today we build the scaffold students need to write like scientists.",
        lead: "me" as Role,
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "8 min",
        activity: "What Does Strong Science Writing Look Like?",
        description: "Examine 2–3 student constructed response samples from past MCAS Biology items (anonymized). In pairs: What did this student do well? What is missing? What would make this response stronger? Whole-group share: surface the pattern — most responses have a claim but lack specific evidence and reasoning.",
        lead: "me" as Role,
        slides: "Slide 2",
      },
      {
        time: "11:00",
        duration: "7 min",
        activity: "Introducing the CER Frame",
        description: "Introduce the Claim–Evidence–Reasoning (CER) framework as the structure for science constructed response. Show how it maps directly to MCAS item demands. Model a complete CER response using the same passage from April 14. Highlight: the claim answers the question, the evidence is specific and from the text or data, the reasoning explains the connection.",
        lead: "me" as Role,
        slides: "Slide 3",
      },
      {
        time: "18:00",
        duration: "10 min",
        activity: "Build Your Scaffold",
        description: "Each teacher drafts a CER sentence frame scaffold for an upcoming lesson. The scaffold should have three sentence starters: 'My claim is ___.' / 'Evidence from [source] shows ___.' / 'This supports my claim because ___.' Teachers work individually, then share with a course-alike partner for feedback.",
        lead: "me" as Role,
        slides: "Slide 4",
      },
      {
        time: "28:00",
        duration: "10 min",
        activity: "Differentiate for All Learners",
        description: "Course-alike groups discuss: How do we adapt this scaffold for students who need more support? OSE teachers: use OSE Step 3 — what supports do students with disabilities and MLLs need to access this writing task? Gen-Ed teachers: use LIT Step 4 — what scaffolds or supports will you build in for students who need them? Groups produce one adapted version of the scaffold.",
        lead: "me" as Role,
        slides: "Slide 5",
      },
      {
        time: "38:00",
        duration: "5 min",
        activity: "Share-Out: Department Scaffold Bank",
        description: "Each group shares their CER scaffold and one adaptation. Department builds a shared scaffold bank — one document with CER frames and adaptations across all courses.",
        lead: "me" as Role,
        slides: "Slide 6",
      },
      {
        time: "43:00",
        duration: "3 min",
        activity: "Commitment & Bridge to April 17",
        description: "Each teacher writes: 'I will use the CER scaffold in [lesson] on [date].' Preview April 17: we will co-plan one lesson that integrates both the annotation strategy and the CER scaffold, connected to a low-performing benchmark standard.",
        lead: "me" as Role,
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Student Samples",
        role: "me" as Role,
        note: "Use real MCAS constructed response samples if available — the DESE released items include student work at different score levels. Focus on a Biology item connected to a low-performing standard (e.g., HS-LS1-1 or HS-LS2-1) to keep the practice relevant.",
      },
      {
        slide: "CER Frame",
        role: "me" as Role,
        note: "Some teachers may already use CER in their courses. Acknowledge this and ask them to share their version — peer expertise is valuable here. The goal is a shared departmental frame, not a new framework imposed from outside.",
      },
      {
        slide: "OSE Guidance",
        role: "me" as Role,
        note: "OSE Step 3 asks: what supports do students with disabilities and MLLs need to access the lesson? For writing, this means: sentence frames with more scaffolding, word banks, graphic organizers, or a partially completed CER template. OSE teachers should produce one adapted scaffold for their students.",
      },
    ],
    slidesUrl: "manus-slides://kSCmPCE3jFq59PcBnYMwZT",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Writing_Like_a_Scientist_e0244042.pptx",
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OSE teachers: Step 3 is the direct connection — use the scaffold-building activity to plan supports for students with disabilities and MLLs in the upcoming writing task.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: Steps 3 & 4 are the direct connections — consider diverse learners and plan the facilitation moves and access supports for the CER writing task.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session is the writing counterpart to April 14's reading focus. Having built a strategy for reading science texts strategically, the department now turns to the writing side: how do students use what they read to construct a coherent, evidence-based response?\n\nThe session centers on the CER (Claim, Evidence, Reasoning) framework — the structure that underlies every MCAS constructed response item. Teachers examine real student work samples to surface what strong science writing looks like and what is typically missing. They then build a CER scaffold tailored to an upcoming lesson, and differentiate it for all learners. The session closes with a department scaffold bank and a preview of April 17, where both reading and writing strategies come together in a co-planned lesson.",
      whyItMatters: "The single most common failure mode in MCAS constructed response is not that students lack knowledge — it is that they do not know how to organize and express what they know. The CER framework gives students a structure for doing exactly that. When teachers build the scaffold into the lesson from the start — not as a test-prep add-on, but as the way students communicate their thinking — it becomes a genuine learning tool, not just a test strategy.",
      learningArc: "This is Session 2 of the 3-session reading and writing arc. Session 1 (April 14) built the reading strategy — annotating for evidence and claims. Session 2 builds the writing structure — CER. Session 3 (April 17) brings both together in a co-planned lesson connected to a low-performing benchmark standard, ready to teach in the final weeks before MCAS.",
      teacherTakeaways: [
        "A clear understanding of the CER framework and how it maps to MCAS constructed response demands.",
        "A CER sentence frame scaffold tailored to an upcoming lesson, with at least one adaptation for students who need more support.",
        "OSE teachers: an adapted scaffold aligned to OSE Step 3 supports for students with disabilities and MLLs.",
        "A written commitment to use the CER scaffold before April 17, and a contribution to the department scaffold bank.",
      ],
    },
  },
  // ─── SESSION 12: Friday April 17 — Putting It Together ──────────────────────────
  {
    id: "plc-2026-04-17",
    date: "2026-04-17",
    displayDate: "Friday, April 17, 2026",
    title: "Putting It Together: A Lesson That Builds Both",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "LIT Steps 1–4 (Full Internalization) | OSE Steps 1–3 | LIT Team Deep Dive Steps 2–5",
    objectives: [
      "Co-plan one lesson that integrates the annotation strategy (April 14) and the CER scaffold (April 15), connected to a low-performing benchmark standard.",
      "Use the full lesson internalization protocol as the planning frame: purpose, student thinking, facilitation moves, and supports for all learners.",
      "Leave with a ready-to-teach lesson for the following week.",
    ],
    whatToBring: [
      "Your commitments from April 14 and April 15 (annotation plan + CER scaffold)",
      "Your lesson plan or unit materials for the upcoming lesson you will co-plan",
      "OSE teachers: your Teacher Edition for the upcoming lesson",
    ],
    agenda: [
      {
        time: "0:00",
        duration: "3 min",
        activity: "Welcome & Arc Recap",
        description: "Connect the three sessions: we read for evidence (April 14), we built the writing structure (April 15), and today we put both into one lesson. The goal: a lesson that is ready to teach next week, with reading and writing built in from the start.",
        lead: "me" as Role,
        slides: "Slide 1",
      },
      {
        time: "3:00",
        duration: "5 min",
        activity: "Choose Your Lesson & Standard",
        description: "Each course-alike group selects the lesson they will co-plan. The lesson should connect to one of the low-performing benchmark standards (HS-LS1-1, HS-LS2-1, HS-LS3-2, or HS-LS4-1). Groups confirm: What is the lesson? What is the standard? What is the key science idea students need to understand?",
        lead: "me" as Role,
        slides: "Slide 2",
      },
      {
        time: "8:00",
        duration: "25 min",
        activity: "Co-Planning Work Session",
        description: "Course-alike groups co-plan the lesson using the internalization protocol as the frame. Step 1: What are students learning and why? Write the content objective and language objective. Step 2: Where does the annotation strategy fit? What text or data will students annotate, and what claim are they looking for? Step 3: Where does the CER scaffold fit? When do students write their response, and what supports do they have? Step 4: Plan the facilitation moves — how will you launch the annotation, monitor the writing, and close with a share-out? OSE teachers: complete a full Step 2 plan including exemplar and misconception list.",
        lead: "me" as Role,
        slides: "Slides 3–5",
      },
      {
        time: "33:00",
        duration: "8 min",
        activity: "Share-Out: What Did We Plan?",
        description: "Each group shares: the lesson, the standard, the annotation moment, and the CER scaffold they built in. Department notes any shared patterns — are multiple groups targeting the same standard? Are there scaffolds that could be shared across courses?",
        lead: "me" as Role,
        slides: "Slide 6",
      },
      {
        time: "41:00",
        duration: "5 min",
        activity: "Commitment & Close",
        description: "Each teacher writes: 'I will teach [lesson] on [date] and bring back student CER responses to the next PLC.' This sets up the next student work analysis cycle. Close with appreciation for the work of the arc.",
        lead: "me" as Role,
        slides: "Slide 7",
      },
    ],
    facilitatorNotes: [
      {
        slide: "Standard Selection",
        role: "me" as Role,
        note: "Steer groups toward the low-performing benchmark standards: HS-LS1-1 (Cell Function & Homeostasis, Q2: 38%), HS-LS2-1 (Ecosystem Dynamics, Q2: 37%), HS-LS3-2 (Meiosis & Genetic Variation, Q2: 42%), HS-LS4-1 (Natural Selection, Q2: 43%). These are the standards where a strong reading and writing lesson will have the most MCAS impact.",
      },
      {
        slide: "Co-Planning Frame",
        role: "me" as Role,
        note: "The four co-planning steps map directly to the LIT and OSE protocols. For Gen-Ed teachers: Steps 1, 3, and 4 of the LIT. For OSE teachers: Steps 1, 2, and 3 of the OSE protocol. The language should feel familiar — this is the same frame they have been using since March.",
      },
      {
        slide: "Commitment",
        role: "me" as Role,
        note: "The commitment to bring back student CER responses is important — it closes the loop and sets up the next evidence cycle. If there is a PLC in late April or May, that student work becomes the input for the next session.",
      },
    ],
    slidesUrl: "manus-slides://ePViv92BvzN97KRb41laEA",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Putting_It_Together__A_Lesson_That_Builds_Both_99c7a6d8.pptx",
    agendaVersion: "Both",
    resources: [
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OSE teachers: use Steps 1–3 as the co-planning frame today. Step 1 (lesson purpose), Step 2 (planning the details — complete the student work, annotate the text, identify misconceptions), Step 3 (supports for students with disabilities and MLLs).",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_ce0a2e3d.pdf",
        type: "pdf",
      },
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "Gen-Ed teachers: use the Team Deep Dive steps as the co-planning frame. Steps 2–4 are the direct connections: align on lesson purpose, consider your students, and plan for access and engagement.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_8cfeb8bf.pdf",
        type: "pdf",
      },
    ],
    sessionInfo: {
      overview: "This session is the culmination of the three-session reading and writing arc. Teachers arrive with two tools in hand: the annotation strategy from April 14 and the CER scaffold from April 15. Today, they put both into one lesson — a lesson they will teach the following week.\n\nThe co-planning work session uses the full lesson internalization protocol as the frame. Teachers work in course-alike groups to identify the lesson, the standard, and the key science idea; plan where the annotation strategy fits; build the CER scaffold into the writing moment; and plan the facilitation moves that will support all learners. OSE teachers complete a full Step 2 plan including exemplar and misconception list. The session closes with a written commitment to teach the lesson and bring back student CER responses — setting up the next evidence cycle.",
      whyItMatters: "The most powerful professional learning happens when teachers leave a session with something they can use immediately. This session is designed to produce exactly that: a ready-to-teach lesson, co-planned with colleagues, grounded in student data, and designed to build the reading and writing skills students need for MCAS. The lesson is not a test-prep exercise — it is a genuine science lesson where students read for evidence and write to explain their thinking. That is the kind of instruction that builds lasting understanding.",
      learningArc: "This is Session 3 of the 3-session reading and writing arc, and the final session before MCAS. The arc has moved from reading strategy (April 14) to writing structure (April 15) to integrated lesson design (April 17). The student CER responses teachers bring back from this lesson become the input for the next student work analysis cycle — continuing the evidence-based planning loop the department has built all year.",
      teacherTakeaways: [
        "A complete, ready-to-teach lesson that integrates the annotation strategy and the CER scaffold, connected to a low-performing benchmark standard.",
        "OSE teachers: a full Step 2 plan for the lesson, including exemplar, misconception list, and Step 3 supports.",
        "A written commitment to teach the lesson and bring back student CER responses to the next PLC.",
        "A contribution to the department's shared lesson and scaffold bank.",
      ],
    },
  },
  // ─── SESSION: APRIL 28 — BENCHMARK DATA ANALYSIS ───────────────────────────
  {
    id: "plc-2026-04-28",
    date: "2026-04-28",
    displayDate: "Tuesday, April 28, 2026",
    title: "Benchmark Data Analysis",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "DESE Lesson Internalization Tool — Anchor in Vision & Data",
    objectives: [
      "Examine benchmark assessment data across classes using a structured protocol.",
      "Identify patterns in student performance — where thinking is strong and where it breaks down.",
      "Name one key finding using the evidence sentence frame to bring to April 29.",
    ],
    whatToBring: [
      "Benchmark assessment data or student score summaries for your classes.",
      "Any student work samples that connect to the benchmark.",
    ],
    agenda: [
      { time: "0:00", duration: "3 min", activity: "Welcome & Framing", description: "Set the purpose: today we read the benchmark data — we are not yet planning our response.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "3:00", duration: "5 min", activity: "Norms for Looking at Data", description: "Three norms: describe first, interpret second, stay curious.", lead: "me" as Role, slides: "Slide 3" },
      { time: "8:00", duration: "5 min", activity: "Individual Data Review", description: "Each teacher silently reviews their own class benchmark results. Where is thinking visible? Where is it missing?", lead: "all" as Role, slides: "Slide 4" },
      { time: "13:00", duration: "15 min", activity: "Group Data Analysis", description: "Share observations across the group. Identify patterns: who met the benchmark? Where did thinking break down?", lead: "all" as Role, slides: "Slide 5" },
      { time: "28:00", duration: "10 min", activity: "Name Your Key Finding", description: "Each group names one key finding — the most important thing the benchmark data is telling us.", lead: "all" as Role, slides: "Slide 6" },
      { time: "38:00", duration: "5 min", activity: "Share-Out", description: "Each group shares their key finding with the full department.", lead: "all" as Role, slides: "Slide 6" },
      { time: "43:00", duration: "3 min", activity: "Commitments & Preview of April 29", description: "Write your key finding. Preview: April 29 we examine student writing samples.", lead: "me" as Role, slides: "Slide 7" },
    ],
    facilitatorNotes: [
      { slide: "Welcome & Framing", role: "me" as Role, note: "Emphasize that today is about reading the data, not fixing it. The two-session structure (data → writing) is intentional — looking carefully first makes the co-planning on May 1 more precise." },
      { slide: "Norms", role: "me" as Role, note: "Read each norm aloud. Emphasize 'describe first' — the most common mistake is jumping to interpretation before naming what you actually see in the numbers." },
      { slide: "Individual Data Review", role: "all" as Role, note: "Give teachers 5 minutes of silent time. Circulate and encourage them to write specific numbers and observations, not general impressions." },
      { slide: "Group Analysis", role: "all" as Role, note: "Facilitate the three-step protocol: describe → pattern → interpret. Keep groups from jumping to 'what we should do' — redirect to 'what does the data show?'" },
      { slide: "Key Finding", role: "all" as Role, note: "Groups use the sentence frame: 'The data shows that students [specific observation]. This suggests that [interpretation].' One finding per group — the single most important thing." },
      { slide: "Closing", role: "me" as Role, note: "Remind teachers to write their key finding on a sticky note or index card and bring it to April 29. Preview: next session we examine the writing samples that explain the benchmark patterns." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr28_Benchmark_Data_Analysis_v2_1f812e75.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — Apr 28: Benchmark Data Analysis", description: "PowerPoint slide deck for the April 28 PLC session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr28_Benchmark_Data_Analysis_v2_1f812e75.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — use this to anchor data analysis in lesson-level evidence.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol for lesson internalization — reference during group data analysis.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session focuses on reading the benchmark assessment data carefully before planning any instructional response. Teachers bring their class benchmark results and examine them through a structured three-step protocol: describe what you see, identify patterns across students, and interpret what those patterns suggest about student understanding.",
      whyItMatters: "The benchmark data gives us the quantitative picture of where students are. But data alone does not tell us what to do next — it tells us where to look. By examining the numbers carefully and naming a specific key finding, teachers build the precise lens they need for the writing sample analysis on April 29 and the co-planning session on May 1.",
      learningArc: "This is Session 1 of a 3-session data analysis arc (Apr 28 → Apr 29 → May 1). The arc moves from reading quantitative data (today) to reading qualitative writing evidence (Apr 29) to co-planning an instructional response (May 1). Each session builds on the previous one.",
      teacherTakeaways: [
        "A clear, specific key finding written in the evidence sentence frame.",
        "Shared understanding of patterns in student benchmark performance across the department.",
        "A lens for examining student writing samples on April 29.",
        "Readiness to co-plan a targeted instructional adjustment on May 1.",
      ],
    },
  },

  // ─── SESSION: APRIL 29 — ANALYZING STUDENT WRITING SAMPLES ─────────────────
  {
    id: "plc-2026-04-29",
    date: "2026-04-29",
    displayDate: "Wednesday, April 29, 2026",
    title: "Analyzing Student Writing Samples",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "DESE Lesson Internalization Tool — Align on Purpose & Consider Your Students",
    objectives: [
      "Examine 2–3 student writing samples through a structured protocol.",
      "Connect writing evidence to the benchmark key finding from April 28.",
      "Name one key writing finding using the evidence sentence frame to bring to May 1.",
    ],
    whatToBring: [
      "2–3 student writing samples from your classes (any science writing task).",
      "Your key finding from April 28 (written on a sticky note or index card).",
    ],
    agenda: [
      { time: "0:00", duration: "3 min", activity: "Welcome & Framing", description: "Connect to April 28: today we read the writing — we are not yet planning our response.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "3:00", duration: "5 min", activity: "Reconnect to Key Findings", description: "Share your key finding from April 28. What did the benchmark data tell you?", lead: "all" as Role, slides: "Slide 3" },
      { time: "8:00", duration: "5 min", activity: "Individual Writing Review", description: "Silently examine your 2–3 student writing samples. Where is thinking visible? Where is it missing?", lead: "all" as Role, slides: "Slide 4" },
      { time: "13:00", duration: "15 min", activity: "Group Analysis of Writing", description: "Share observations. Identify patterns across writing samples: what do students know? Where does thinking break down?", lead: "all" as Role, slides: "Slide 5" },
      { time: "28:00", duration: "10 min", activity: "Name Your Writing Finding", description: "Each group names one key finding from the writing samples — using the sentence frame.", lead: "all" as Role, slides: "Slide 6" },
      { time: "38:00", duration: "5 min", activity: "Share-Out", description: "Each group shares their writing finding with the full department.", lead: "all" as Role, slides: "Slide 6" },
      { time: "43:00", duration: "3 min", activity: "Commitments & Preview of May 1", description: "Write your writing finding. Preview: May 1 we co-plan based on both data sources.", lead: "me" as Role, slides: "Slide 7" },
    ],
    facilitatorNotes: [
      { slide: "Welcome & Framing", role: "me" as Role, note: "Connect explicitly to April 28. The benchmark gave us the numbers; today the writing gives us the thinking behind those numbers. Both together will power the co-planning on May 1." },
      { slide: "Reconnect", role: "all" as Role, note: "Have teachers read their April 28 key finding aloud to their group. This activates the lens they will use to look at the writing samples." },
      { slide: "Individual Writing Review", role: "all" as Role, note: "5 minutes of silent work. Encourage teachers to use the two lenses: who met the writing goal? Where did thinking break down? Ask them to jot specific observations — what students wrote, not what it means." },
      { slide: "Group Analysis", role: "all" as Role, note: "Same three-step protocol as April 28: describe → pattern → interpret. Keep the group from planning. Redirect: 'What does the writing show? What pattern do multiple students share?'" },
      { slide: "Writing Finding", role: "all" as Role, note: "Groups use the sentence frame: 'The evidence shows that students [specific observation]. This suggests that [interpretation].' Then ask: does this confirm or complicate your April 28 finding?" },
      { slide: "Closing", role: "me" as Role, note: "Remind teachers to bring BOTH findings (benchmark + writing) to May 1. Preview: on May 1 we use both findings together to co-plan one specific instructional adjustment." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr29_Analyzing_Student_Writing_Samples_v2_a4ea96fc.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — Apr 29: Analyzing Student Writing Samples", description: "PowerPoint slide deck for the April 29 PLC session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr29_Analyzing_Student_Writing_Samples_v2_a4ea96fc.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — use this to anchor writing sample analysis in lesson-level evidence.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol for lesson internalization — reference during writing sample analysis.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session examines the qualitative evidence — what students actually wrote — to complement the quantitative benchmark data from April 28. Teachers bring 2–3 student writing samples and examine them through the same structured three-step protocol: describe, pattern, interpret. The goal is to name one key writing finding that, together with the benchmark finding, will drive the co-planning on May 1.",
      whyItMatters: "Numbers tell us where students scored; writing tells us how students think. The writing samples reveal the reasoning behind the benchmark results — where thinking is visible, where it is missing, and what kind of instructional support would make the biggest difference. This qualitative lens makes the co-planning on May 1 more targeted and more useful.",
      learningArc: "This is Session 2 of a 3-session data analysis arc (Apr 28 → Apr 29 → May 1). Today we add the qualitative layer to the quantitative picture from April 28. Together, the two findings become the planning inputs for May 1.",
      teacherTakeaways: [
        "A clear, specific writing finding written in the evidence sentence frame.",
        "Understanding of how the writing evidence connects to (or complicates) the benchmark finding.",
        "Two key findings — benchmark and writing — ready to bring to May 1 co-planning.",
        "Shared departmental picture of where student thinking is strong and where it breaks down in writing.",
      ],
    },
  },

  // ─── SESSION: MAY 1 — CO-PLANNING BASED ON DATA ─────────────────────────────
  {
    id: "plc-2026-05-01",
    date: "2026-05-01",
    displayDate: "Friday, May 1, 2026",
    title: "Co-Planning Based on Data",
    subtitle: "Full Science Department",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "DESE Lesson Internalization Tool — Plan for Access, Engagement & Next Steps",
    objectives: [
      "Use benchmark and writing findings together to identify one instructional move.",
      "Co-plan a specific lesson adjustment with your course-alike group.",
      "Leave with a written instructional commitment to try before the next PLC.",
    ],
    whatToBring: [
      "Your benchmark key finding from April 28.",
      "Your writing key finding from April 29.",
    ],
    agenda: [
      { time: "0:00", duration: "3 min", activity: "Welcome & Framing", description: "Connect to April 28 & 29: today we act on what we found — we move from reading to responding.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "3:00", duration: "5 min", activity: "Share Your Two Findings", description: "Each teacher shares their benchmark finding and writing finding. What do both sources tell you together?", lead: "all" as Role, slides: "Slide 3" },
      { time: "8:00", duration: "10 min", activity: "Identify the Instructional Move", description: "Using the Lesson Internalization Tool: what is the one most important adjustment? Re-teach, scaffold, new question, or new support?", lead: "all" as Role, slides: "Slide 4" },
      { time: "18:00", duration: "15 min", activity: "Co-Plan the Lesson Adjustment", description: "Course-alike groups co-plan one specific lesson adjustment using the planning sentence frame.", lead: "all" as Role, slides: "Slide 5" },
      { time: "33:00", duration: "5 min", activity: "Share-Out", description: "Each group shares their instructional commitment with the full department.", lead: "all" as Role, slides: "Slide 5" },
      { time: "38:00", duration: "3 min", activity: "Commitments & Close", description: "Write your commitment. Preview: next PLC we check in on how the adjustment went.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Welcome & Framing", role: "me" as Role, note: "This is the payoff session. We have done the careful reading work on April 28 and 29 — today we act. Emphasize that the planning sentence frame keeps the adjustment grounded in the evidence." },
      { slide: "Share Findings", role: "all" as Role, note: "Have each teacher read both findings aloud. Ask: do they confirm each other? Do they add new information? Together, what do both tell you about what students need?" },
      { slide: "Identify the Move", role: "all" as Role, note: "Present the four options: re-teach, scaffold, new question, new support. Groups discuss which move their data calls for. They must agree on one before planning begins." },
      { slide: "Co-Plan", role: "all" as Role, note: "Groups use the planning sentence frame: 'Because the data shows [finding], we will adjust [lesson element] by doing [specific action].' Walk through the four Lesson Internalization Tool steps: anchor in data, name the adjustment, plan the details, consider all learners." },
      { slide: "Share-Out", role: "all" as Role, note: "Each group shares their commitment. Listen for specificity — name the lesson, the day, and what they will do differently. Vague commitments ('I'll re-teach it') are not enough." },
      { slide: "Closing", role: "me" as Role, note: "The cycle continues: try the adjustment, notice what students produce, bring 2–3 student work samples to the next PLC. We will read the new evidence together." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May1_Co_Planning_Based_on_Data_v2_b01270f2.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — May 1: Co-Planning Based on Data", description: "PowerPoint slide deck for the May 1 PLC session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May1_Co_Planning_Based_on_Data_v2_b01270f2.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — use this to structure your co-planning and instructional adjustment.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol — reference during co-planning to ensure alignment with lesson internalization.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This co-planning session is the culmination of the three-session data analysis arc. Teachers bring their two key findings — from the benchmark data (April 28) and the student writing samples (April 29) — and use them together to identify and plan one specific instructional adjustment. Working in course-alike groups, teachers co-plan using the Lesson Internalization Tool structure and leave with a written commitment to try before the next PLC.",
      whyItMatters: "Reading data carefully is only valuable if it leads to action. This session closes the loop: we read the numbers, we read the writing, and now we plan a response that is grounded in both. The co-planning structure ensures that the adjustment is specific, evidence-based, and feasible to try in the next week.",
      learningArc: "This is Session 3 of a 3-session data analysis arc (Apr 28 → Apr 29 → May 1). The arc is complete: we read the quantitative evidence, read the qualitative evidence, and now we act on both. The cycle continues at the next PLC when we check in on how the adjustment went.",
      teacherTakeaways: [
        "A specific, written instructional commitment grounded in both the benchmark and writing findings.",
        "A co-planned lesson adjustment developed with course-alike colleagues.",
        "A clear next step: try the adjustment and bring student work samples to the next PLC.",
        "Experience with the full data-to-action cycle of the Lesson Internalization Tool.",
      ],
    },
  },

  // ─── SESSION: MAY 5 — LESSON MAPPING ────────────────────────────────────────
  {
    id: "plc-2026-05-05",
    date: "2026-05-05",
    displayDate: "Tuesday, May 5, 2026",
    title: "Lesson Mapping: Standards, Pacing & Purpose",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "DESE Lesson Internalization Tool — Step 1: Anchor in Vision & Data",
    objectives: [
      "Map upcoming lessons for the next 2–3 weeks: standards, objectives, mastery indicators, and pacing.",
      "Anchor the lesson map in Q3 benchmark data by identifying 2–3 priority standards.",
      "Flag one lesson for deep internalization on Thursday.",
    ],
    whatToBring: [
      "Q3 benchmark results by standard",
      "Pacing calendar or lesson sequence for the next 2–3 weeks",
      "Teacher edition or lesson materials",
    ],
    agenda: [
      { time: "0:00", duration: "3 min", activity: "Framing & Protocol Overview", description: "Introduce the week's guiding question. Walk through the DESE Lesson Internalization Tool as the shared framework for all teachers.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "3:00", duration: "10 min", activity: "Data Anchor", description: "Review Q3 benchmark results by standard. Identify 2–3 priority standards below 65% that must be protected in the pacing calendar.", lead: "all" as Role, slides: "Slide 3" },
      { time: "13:00", duration: "22 min", activity: "Lesson Mapping Activity", description: "Map upcoming lessons for the next 2–3 weeks. For each lesson: name the standard, state the content and language objectives, identify the mastery indicator, and note pacing.", lead: "all" as Role, slides: "Slide 4" },
      { time: "35:00", duration: "8 min", activity: "Team Share-Out", description: "Each team shares one confident lesson, one flagged for internalization, and one pacing decision.", lead: "all" as Role, slides: "Slide 5" },
      { time: "43:00", duration: "3 min", activity: "Closing & Preview", description: "Identify the lesson to bring to Thursday. Confirm you'll bring the teacher edition and student materials.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Framing", role: "me" as Role, note: "Open with the guiding question: How do we use what we know about our students, our standards, and our remaining instructional time to map and internalize the lessons ahead? Emphasize that the DESE Lesson Internalization Tool is the shared framework for all teachers this week. OSE teachers also use the OSE Protocol as their curriculum-specific guide." },
      { slide: "Data Anchor", role: "all" as Role, note: "Teachers review their Q3 data silently first, then share with their group. Push for specificity: name the standard and the percentage. A standard is HIGH PRIORITY if performance is below 65%, if it appears in upcoming lessons requiring complex facilitation, or if significant misconceptions were visible." },
      { slide: "Lesson Mapping", role: "all" as Role, note: "OSE teachers use 'Unit Phenomena / Driving Question' for unit connection. Non-OSE teachers use 'Unit Essential Question / Big Idea.' All teachers answer the same four questions for each lesson: What standard? Why does it matter? What are the objectives? How will students show mastery?" },
      { slide: "Share-Out", role: "all" as Role, note: "Each team shares three things: one confident lesson, one flagged for Thursday's internalization, and one pacing decision. Capture key decisions on a shared chart." },
      { slide: "Closing", role: "me" as Role, note: "Before leaving: each teacher names the lesson they are bringing to Thursday, confirms they have the teacher edition and student materials, and states one question they are bringing to Thursday's session." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May5_Lesson_Mapping_v1_bc17815c.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — May 5: Lesson Mapping", description: "PowerPoint slide deck for the May 5 PLC session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May5_Lesson_Mapping_v1_bc17815c.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — shared framework for all teachers this week.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol — for OpenSciEd Biology teachers.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session opens a new three-session arc focused on lesson mapping and internalization. Teachers anchor in Q3 benchmark data to identify priority standards, then build a lesson map for the next 2–3 weeks — naming the standard, objectives, mastery indicator, and pacing for each lesson. The DESE Lesson Internalization Tool is the shared framework for all teachers; OSE teachers also use the OSE Protocol as their curriculum-specific guide.",
      whyItMatters: "You cannot internalize a lesson well without first knowing where it sits in the sequence, what standard it addresses, and why it matters for students. The lesson map built today becomes the foundation for Thursday's deep internalization work and Friday's co-planning — ensuring that all three sessions are grounded in a shared, evidence-based picture of what's coming.",
      learningArc: "This is Session 1 of a 3-session lesson mapping and internalization arc (May 5 → May 6 → May 8). Today we build the map. Thursday we internalize the priority lesson. Friday we co-plan with our co-teacher.",
      teacherTakeaways: [
        "A completed lesson map for the next 2–3 weeks, anchored in Q3 data.",
        "2–3 priority standards identified for focused instruction.",
        "One lesson flagged for deep internalization on Thursday.",
        "Readiness to bring the teacher edition and student materials to Thursday's session.",
      ],
    },
  },

  // ─── SESSION: MAY 6 — DEEP LESSON INTERNALIZATION ───────────────────────────
  {
    id: "plc-2026-05-06",
    date: "2026-05-06",
    displayDate: "Thursday, May 6, 2026",
    title: "Deep Lesson Internalization",
    subtitle: "Full Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "DESE Lesson Internalization Tool — Steps 2–4: Do the Work, Plan Facilitation & Plan for Access",
    objectives: [
      "Complete the key task or exit ticket from the priority lesson as a student would.",
      "Annotate the teacher edition with facilitation moves for the key moment of critical thinking.",
      "Plan access and equity supports for students with disabilities and multilingual learners.",
    ],
    whatToBring: [
      "Teacher edition for the priority lesson flagged on Tuesday",
      "Student-facing materials for that lesson",
      "Tuesday's lesson map",
    ],
    agenda: [
      { time: "0:00", duration: "3 min", activity: "Reconnect", description: "Confirm today's lesson. Revisit its purpose and mastery indicator from Tuesday's map.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "3:00", duration: "13 min", activity: "Do the Student Work", description: "Complete the key task or exit ticket exactly as a student would. Draft a shared exemplar response.", lead: "all" as Role, slides: "Slide 3" },
      { time: "16:00", duration: "15 min", activity: "Lesson Annotation & Facilitation Planning", description: "Annotate the teacher edition. Plan facilitation moves for the key moment of critical thinking. Plan responses to correct, partially correct, and incorrect student answers.", lead: "all" as Role, slides: "Slide 4" },
      { time: "31:00", duration: "8 min", activity: "Access & Equity Planning", description: "Identify supports for students with disabilities (IEP accommodations) and multilingual learners (ELD scaffolds). Plan cultural relevance connections.", lead: "all" as Role, slides: "Slide 5" },
      { time: "39:00", duration: "5 min", activity: "Pacing Check", description: "Confirm timing for each activity. Identify what to cut if the lesson runs long. Complete a materials list.", lead: "all" as Role, slides: "Slide 5" },
      { time: "44:00", duration: "2 min", activity: "Prep for Co-Planning", description: "Confirm what you're bringing to Friday: annotated lesson, exemplar, materials list, differentiation notes.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Reconnect", role: "me" as Role, note: "Start by having each teacher state their lesson and its mastery indicator from Tuesday's map. This grounds the session in a specific lesson — not a general discussion." },
      { slide: "Do the Student Work", role: "all" as Role, note: "This step is non-negotiable for all teachers regardless of curriculum. Teachers complete the task as students would — no reading ahead, no planning yet. Then compare responses, draft a shared exemplar, name 2–3 partially correct responses, and identify the most common misconception." },
      { slide: "Facilitation Planning", role: "all" as Role, note: "Four questions: What is the purpose of each activity? What strategies ensure every student engages in critical thinking? What does a partially correct response look like and what will you say? What data-informed scaffolds do specific students need?" },
      { slide: "Access & Equity", role: "all" as Role, note: "OSE teachers: use the Learning Plan Snapshot for timing. Non-OSE teachers: use the pacing calendar and lesson plan. All teachers review IEP accommodations and ELD levels for this specific lesson." },
      { slide: "Closing", role: "me" as Role, note: "Before leaving: each teacher confirms they have an annotated teacher edition, student-facing materials, a materials list, and differentiation notes ready for Friday's co-planning." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May6_Lesson_Internalization_v1_63f0e134.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — May 6: Deep Lesson Internalization", description: "PowerPoint slide deck for the May 6 PLC session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May6_Lesson_Internalization_v1_63f0e134.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — Steps 2–4 are the focus of today's session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol — for OpenSciEd Biology teachers.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session is the heart of the week's three-session arc. Teachers internalize the priority lesson they flagged on Tuesday — completing the student work, annotating the teacher edition, planning facilitation moves, and building out access and equity supports. The DESE Lesson Internalization Tool Steps 2–4 structure the work; OSE teachers also use the OSE Protocol.",
      whyItMatters: "Teachers who complete the student work themselves consistently make better facilitation decisions. By doing the task, drafting an exemplar, and planning for partially correct responses before the lesson is taught, teachers are prepared for the actual range of student thinking they will encounter — not just the ideal response.",
      learningArc: "This is Session 2 of a 3-session arc (May 5 → May 6 → May 8). Tuesday we built the map. Today we internalize the priority lesson. Friday we co-plan with our co-teacher.",
      teacherTakeaways: [
        "A completed student work exemplar for the priority lesson.",
        "An annotated teacher edition with facilitation moves for the key moment of critical thinking.",
        "Specific access and equity supports for students with disabilities and multilingual learners.",
        "A materials list and pacing plan ready for Friday's co-planning.",
      ],
    },
  },

  // ─── SESSION: MAY 8 — CO-PLANNING ───────────────────────────────────────────
  {
    id: "plc-2026-05-08",
    date: "2026-05-08",
    displayDate: "Friday, May 8, 2026",
    title: "Co-Planning: Building the Lesson Together",
    subtitle: "Co-Planning Session — Classroom Teachers & Co-Teachers",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers & Co-Teachers",
    alignment: "DESE Lesson Internalization Tool — Full Cycle: Translate Internalization into a Shared Plan",
    objectives: [
      "Align classroom teacher and co-teacher on lesson objectives, mastery indicators, and the exemplar response.",
      "Divide roles for each phase of the lesson so both educators actively facilitate critical thinking.",
      "Finalize differentiation supports and complete a pacing walkthrough together.",
    ],
    whatToBring: [
      "Annotated teacher edition from Thursday",
      "Student-facing materials and materials list",
      "Differentiation notes (IEP accommodations, ELD scaffolds)",
      "Tuesday's lesson map",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Sync on Lesson Purpose & Map", description: "Classroom teacher walks co-teacher through the lesson map entry and annotated lesson. Align on objectives, mastery indicator, and exemplar response.", lead: "all" as Role, slides: "Slide 1–3" },
      { time: "5:00", duration: "10 min", activity: "Co-Teacher Role Planning", description: "Divide roles for each phase: Opening, Key Moment of Critical Thinking, Group Work, Closing. Both educators plan active facilitation roles.", lead: "all" as Role, slides: "Slide 4" },
      { time: "15:00", duration: "10 min", activity: "Differentiation & Access", description: "Review IEP accommodations and ELD levels. Finalize materials list. Build in language scaffolds and cultural relevance connections.", lead: "all" as Role, slides: "Slide 5" },
      { time: "25:00", duration: "10 min", activity: "Pacing Walkthrough", description: "Walk through the lesson timeline together. Confirm transitions, timing, and each person's role at every moment. Agree on what to cut if the lesson runs long.", lead: "all" as Role, slides: "Slide 5" },
      { time: "35:00", duration: "6 min", activity: "Commitments & Forward Planning", description: "Each pair states one commitment. Preview the next lesson on the map and flag for the next PLC cycle.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Sync", role: "me" as Role, note: "The classroom teacher leads the sync — walking the co-teacher through the lesson map entry, the annotated lesson, and the exemplar response from Thursday. The co-teacher asks clarifying questions. Both should be able to state the content objective, language objective, and mastery indicator before moving on." },
      { slide: "Role Planning", role: "all" as Role, note: "Key question: How will the co-teacher support the key moment of critical thinking — not just manage behavior, but actively facilitate grade-level thinking alongside the classroom teacher? Document the role plan in writing. Both educators should be able to describe their responsibilities for each phase without referring to notes." },
      { slide: "Differentiation", role: "all" as Role, note: "Review each student's IEP accommodations for this specific lesson. Identify language scaffolds for each ELD level. Finalize the materials list and confirm any advance preparation needed for labs or activities." },
      { slide: "Pacing Walkthrough", role: "all" as Role, note: "Walk through the lesson together out loud. Confirm the minimum time required for the key moment of critical thinking — this is the last thing to cut. Agree on the contingency plan if the lesson runs long." },
      { slide: "Commitments", role: "all" as Role, note: "Each pair states one specific commitment: How will we implement this lesson differently — for every student — based on the planning work we did this week? Write it down. After the lesson is taught, reflect on what worked, what could be improved, and who met the bar for mastery." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May8_Co_Planning_v1_cc959785.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Session Slides — May 8: Co-Planning", description: "PowerPoint slide deck for the May 8 co-planning session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/May8_Co_Planning_v1_cc959785.pptx", type: "slides" },
      { title: "Lesson Internalization Tool (2025–26)", description: "DESE Lesson Internalization Tool — the full cycle is completed in today's co-planning session.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool(2025-26)_9c747204.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "NBHS-specific OSE protocol — for OpenSciEd Biology teachers.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol(NBHS)_5e89e582.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This co-planning session is the culmination of the week's three-session arc. Classroom teachers and co-teachers sync on the lesson internalization work from Tuesday and Thursday, divide roles for each phase of the lesson, finalize differentiation supports, and complete a pacing walkthrough together. Both educators leave with a shared, executable plan.",
      whyItMatters: "Co-planning is only as good as the preparation that precedes it. Because teachers have already mapped the lessons (Tuesday) and internalized the priority lesson (Thursday), today's co-planning is grounded in a shared understanding of the lesson's purpose, demands, and student needs — not starting from scratch.",
      learningArc: "This is Session 3 of a 3-session arc (May 5 → May 6 → May 8). The arc is complete: we mapped the lessons, internalized the priority lesson, and now we co-plan. The cycle continues at the next PLC when we check in on how the lesson went.",
      teacherTakeaways: [
        "A shared, executable lesson plan with clearly divided roles for both educators.",
        "Finalized differentiation supports for students with disabilities and multilingual learners.",
        "A completed pacing walkthrough with a contingency plan.",
        "One specific written commitment for how this lesson will be implemented differently for every student.",
      ],
    },
  },
  // ─── SESSION: Tuesday May 12 — Data Look ─────────────────────────────────
  {
    id: "plc-may12-data-look",
    date: "2026-05-12",
    displayDate: "Tuesday, May 12, 2026",
    title: "What Does the Data Tell Us About Student Writing?",
    subtitle: "PLC Session — Grades 9–12 Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Anticipate Student Thinking",
    objectives: [
      "Examine benchmark results strand by strand and identify where students lose points on written responses.",
      "Distinguish between content knowledge gaps and writing quality gaps in student performance data.",
      "Identify 1–2 strands where writing quality — not content knowledge — is the primary barrier.",
    ],
    whatToBring: [
      "Benchmark results for your course (strand-by-strand breakdown)",
      "Your gradebook or recent assessment data",
      "A sense of which students are struggling most with written responses",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Welcome & Framing", description: "Introduce the three-session arc: today we look at the data, Wednesday morning we analyze student work, Wednesday afternoon we plan the instructional move.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "15 min", activity: "Strand-by-Strand Data Look", description: "Each teacher examines their benchmark results by strand. Identify the 2–3 strands with the lowest scores. Ask: Is this a content knowledge gap or a writing quality gap?", lead: "all" as Role, slides: "Slide 3" },
      { time: "20:00", duration: "15 min", activity: "Course Team Discussion", description: "Course teams compare strand results. Identify patterns: Which strands show writing gaps across multiple teachers? What does a strong written response look like in this strand?", lead: "all" as Role, slides: "Slide 4" },
      { time: "35:00", duration: "8 min", activity: "Whole-Group Share-Out", description: "Each course team shares the top 1–2 writing gap strands. Facilitator records. The group identifies the 2–3 strands with the most consistent writing gaps across the department.", lead: "me" as Role, slides: "Slide 5" },
      { time: "43:00", duration: "3 min", activity: "Commitments & Preview", description: "Each teacher identifies the strand they will focus on for Wednesday. Preview: bring 2–3 anonymous student constructed response samples from that strand to Wednesday's PLC.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Data Look", role: "me" as Role, note: "Key distinction to surface: a student can know the content but still write a weak response. Look for cases where a student answered the multiple choice correctly but wrote a poor constructed response on the same concept — that's a writing gap, not a content gap." },
      { slide: "Course Team Discussion", role: "all" as Role, note: "Push teams to be specific: not 'students can't write' but 'students don't connect their evidence back to the claim' or 'students use vague language instead of science vocabulary.' The more specific the diagnosis, the more targeted the instructional move." },
      { slide: "Commitments", role: "me" as Role, note: "Each teacher should leave with one strand identified and a commitment to bring 2–3 anonymous student constructed response samples from that strand to Wednesday's PLC. These samples will anchor the student work analysis." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/What_Does_the_Data_Tell_Us_About_Student_Writing_0746d27b.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This PLC session opens the three-session writing arc for the week. Teachers examine benchmark results strand by strand, distinguishing between content knowledge gaps and writing quality gaps. The goal is to identify the 1–2 strands where writing quality — not content knowledge — is the primary barrier to student success.",
      whyItMatters: "Data-driven instruction starts with reading the data carefully. Before teachers can plan an effective writing move, they need to know exactly where and why students are struggling with written responses. This session builds that shared understanding across the department.",
      learningArc: "This is Session 1 of a 4-session arc (May 12 → May 13 PLC → May 13 PD → May 15 Co-Planning). The arc builds from data to student work to instructional planning to lesson co-planning.",
      teacherTakeaways: [
        "A clear identification of 1–2 strands where writing quality is the primary gap.",
        "A shared department-level picture of where written response performance is weakest.",
        "2–3 anonymous student constructed response samples ready for Wednesday's PLC.",
        "A commitment to a specific strand to focus on for the rest of the arc.",
      ],
    },
  },
  // ─── SESSION: Wednesday May 13 — Student Work Analysis ───────────────────
  {
    id: "plc-may13-student-work",
    date: "2026-05-13",
    displayDate: "Wednesday, May 13, 2026",
    title: "What Does Strong Student Writing Actually Look Like?",
    subtitle: "PLC Session — Grades 9–12 Science Department",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Anticipate Student Thinking & Identify Misconceptions",
    objectives: [
      "Analyze anonymous student constructed responses using a three-round reading protocol.",
      "Build a shared department checklist of 3–5 criteria for a strong constructed response.",
      "Leave with the checklist ready to anchor this afternoon's Department PD.",
    ],
    whatToBring: [
      "2–3 anonymous student constructed response samples from your identified strand",
      "Benchmark data from Tuesday's session",
      "Pen for annotation",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Welcome & Framing", description: "Recap Tuesday's data look. Preview today's protocol: three-round student work analysis followed by building the shared checklist. The checklist goes to this afternoon's PD.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "15 min", activity: "Reading Student Work", description: "Three-round protocol: (1) Read silently, (2) Annotate for strengths, (3) Identify what's missing. Teams read 2–3 anonymous responses from the strand identified Tuesday.", lead: "all" as Role, slides: "Slide 3" },
      { time: "20:00", duration: "15 min", activity: "Building the Shared Checklist", description: "Using C-E-R as the anchor framework, each team drafts 3–5 criteria for a strong constructed response. What must a student do to earn full credit in your course?", lead: "all" as Role, slides: "Slide 4" },
      { time: "35:00", duration: "8 min", activity: "Whole-Group Calibration", description: "Each team shares one criterion. Facilitator records. The group votes to agree on 3–5 department-wide criteria. The final checklist is the output of this session.", lead: "me" as Role, slides: "Slide 5" },
      { time: "43:00", duration: "3 min", activity: "Commitments & Preview of PD", description: "Each teacher commits to bringing the checklist to this afternoon's PD. Preview: the checklist will anchor the instructional writing move each teacher selects.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Reading Student Work", role: "me" as Role, note: "The three-round protocol is designed to slow teachers down. Round 1 is purely impressionistic — no marking. Round 2 focuses on what the strong response does well. Round 3 focuses on what the weaker responses consistently leave out. The goal is to surface patterns, not evaluate individual students." },
      { slide: "Building the Checklist", role: "all" as Role, note: "Push teams to use the C-E-R framework as the anchor. The criteria should be specific enough that a student could use the checklist to self-assess their own response. Avoid vague criteria like 'good writing' — push for 'makes a claim that directly answers the question.'" },
      { slide: "Calibration", role: "me" as Role, note: "The calibration protocol is designed to build consensus, not debate. If two teams have similar criteria, ask them to agree on the language together. The final checklist should have 3–5 items that every teacher in the department can use and explain to students." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/What_Does_Strong_Student_Writing_Actually_Look_Like_298dba30.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This PLC session is the second in the writing arc. Teachers bring anonymous student constructed response samples from the strand identified on Tuesday and analyze them using a three-round reading protocol. The session culminates in building a shared department checklist of 3–5 criteria for a strong constructed response — the anchor for this afternoon's Department PD.",
      whyItMatters: "Looking at actual student work grounds the conversation in evidence rather than assumptions. The shared checklist built in this session gives every teacher in the department a common language for what strong writing looks like — making the afternoon PD immediately actionable.",
      learningArc: "This is Session 2 of a 4-session arc (May 12 → May 13 PLC → May 13 PD → May 15 Co-Planning). The checklist built today directly anchors the instructional move planning in this afternoon's Department PD.",
      teacherTakeaways: [
        "A shared department checklist of 3–5 criteria for a strong constructed response.",
        "A clear understanding of what the strongest student responses do that the weaker ones don't.",
        "The checklist ready to use in this afternoon's Department PD.",
        "A commitment to selecting one writing move at the afternoon PD.",
      ],
    },
  },
  // ─── SESSION: Friday May 15 — Co-Planning ────────────────────────────────
  {
    id: "plc-may15-coplanning",
    date: "2026-05-15",
    displayDate: "Friday, May 15, 2026",
    title: "Embedding the Writing Move into Your Lesson",
    subtitle: "Co-Planning Session — Grades 9–12 Science Department",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Translate Internalization into a Shared Plan",
    objectives: [
      "Confirm the writing move committed to at Wednesday's PD and connect it to the shared checklist.",
      "Embed the writing move into an upcoming lesson using a four-step lesson mapping protocol.",
      "Leave with a lesson plan that includes the writing move, the student output, and a feedback strategy.",
    ],
    whatToBring: [
      "The writing move you committed to at Wednesday's PD",
      "The shared checklist from Wednesday's PLC",
      "An upcoming lesson plan or unit map",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Welcome & Norms", description: "Quick recap of the week: data look, student work analysis, and writing move commitments from Wednesday's PD. Set the purpose for today: leave with a lesson plan ready to teach.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "7 min", activity: "Review the Writing Move", description: "Confirm the writing move each teacher committed to. Use the shared checklist as the anchor. Which criterion does your writing move address most directly?", lead: "all" as Role, slides: "Slide 3" },
      { time: "12:00", duration: "16 min", activity: "Lesson Mapping", description: "Four-step protocol: (1) Identify the lesson, (2) Identify the student output, (3) Plan the mini-lesson, (4) Plan the feedback. Work with your course team.", lead: "all" as Role, slides: "Slide 4" },
      { time: "28:00", duration: "10 min", activity: "Team Share-Out", description: "Each course team shares the lesson and writing move. 2 minutes per team. Facilitator records the lesson name and writing move for each course.", lead: "me" as Role, slides: "Slide 5" },
      { time: "38:00", duration: "3 min", activity: "Commitments & Next Steps", description: "Each teacher states the lesson they will teach next week with the writing move embedded. Preview: bring student work from after the writing move to the next PLC.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Review the Writing Move", role: "me" as Role, note: "Some teachers may have changed their mind about the writing move since Wednesday. That's fine — but push them to connect the move they choose to a specific criterion on the shared checklist. The checklist is the anchor; the writing move is the instructional response." },
      { slide: "Lesson Mapping", role: "all" as Role, note: "The four-step protocol is designed to be concrete and fast. Teachers should be able to complete all four steps in 16 minutes if they have a lesson in mind. If a teacher is stuck on Step 1 (identifying the lesson), help them look at their unit map and find the next lesson with a written student output." },
      { slide: "Share-Out", role: "me" as Role, note: "The share-out is accountability, not evaluation. The goal is for every teacher to hear what every other teacher is planning — building a shared picture of the department's writing instruction for the next two weeks. Record the lesson name and writing move for each course on a shared chart." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Embedding_the_Writing_Move_into_Your_Lesson_7407cf67.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This co-planning session is the culmination of the week's writing arc. Teachers confirm the writing move they committed to at Wednesday's PD, embed it into an upcoming lesson using a four-step lesson mapping protocol, and leave with a concrete lesson plan ready to teach. The session closes with each teacher stating the specific lesson and writing move they will implement next week.",
      whyItMatters: "The best professional development is only as good as what happens in the classroom on Monday. This session ensures that every teacher leaves with a specific, executable plan — not just an intention — to teach the writing move next week.",
      learningArc: "This is Session 4 of a 4-session arc (May 12 → May 13 PLC → May 13 PD → May 15 Co-Planning). The arc is complete: we analyzed the data, examined student work, planned the instructional move, and now we embed it into a lesson. The cycle continues at the next PLC when teachers bring student work from after the writing move.",
      teacherTakeaways: [
        "A specific lesson plan with the writing move embedded and a student output defined.",
        "A 5–10 minute mini-lesson plan for teaching the writing move.",
        "A feedback strategy for giving students feedback on the writing move.",
        "A commitment to bring student work from this lesson to the next PLC.",
      ],
    },
  },
  {
    id: "plc-may22-benchmark-data",
    date: "2026-05-22",
    displayDate: "Friday, May 22, 2026",
    title: "From Writing Data to Targeted Action: Co-Planning for Intervention",
    subtitle: "Data Analysis & Co-Planning · Friday, 46 Min",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "Benchmark Writing Data Review — Student Tiering & Intervention Co-Planning",
    objectives: [
      "Analyze department-wide benchmark CER writing data to identify common strengths and gaps.",
      "Sort students into three tiers (On Track, Approaching, Needs Intervention) using benchmark data.",
      "Co-plan one targeted instructional move per tier and map it to an upcoming lesson.",
    ],
    whatToBring: [
      "Benchmark writing data or student CER writing samples from your current unit",
      "Class roster or grade book to support student tiering",
      "Upcoming lesson plan or unit map",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Norm-Setting & Context", description: "Review norms. Connect to the writing arc from May 12–15. Frame today's purpose: use benchmark data to identify who needs what and plan targeted moves.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "10 min", activity: "Benchmark Writing Data Overview", description: "Review department-wide CER writing benchmark patterns. Identify common strengths (students can state a claim) and persistent gaps (vague evidence, absent reasoning, no transitions).", lead: "me" as Role, slides: "Slide 3" },
      { time: "15:00", duration: "12 min", activity: "Data Sort: Who Needs What?", description: "Using benchmark data or student writing samples, sort students into three tiers: On Track (CER complete), Approaching (partial CER), Needs Intervention (claim only or no CER structure). Record names on the tier chart.", lead: "all" as Role, slides: "Slide 4" },
      { time: "27:00", duration: "14 min", activity: "Co-Planning: Targeted Instructional Moves", description: "For each tier, identify one specific instructional move and map it to an upcoming lesson. Tier 1: extend with complex phenomena. Tier 2: sentence stem scaffolds. Tier 3: re-teach CER using color-coding and modeled writing.", lead: "all" as Role, slides: "Slide 5" },
      { time: "41:00", duration: "5 min", activity: "Share Out & Commitments", description: "Each teacher names one student target, one move to try before May 26, and one piece of student work to bring to the May 26 PLC.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Benchmark Writing Data Overview", role: "me" as Role, note: "Anchor the data discussion in specific patterns — not general impressions. If department-wide data is available, show it. If not, ask teachers to share what they are seeing in their own classes before generalizing." },
      { slide: "Data Sort: Who Needs What?", role: "all" as Role, note: "The tier sort should be quick and practical — not a lengthy debate. If teachers are unsure about a student, place them in the higher-support tier. The goal is to identify who needs the most urgent attention before May 26." },
      { slide: "Co-Planning: Targeted Instructional Moves", role: "all" as Role, note: "Push teachers to be specific: not 'I will scaffold the writing' but 'I will provide the sentence stem: This evidence shows that ___ because ___.' Vague plans don't transfer to classrooms." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/From_Writing_Data_to_Targeted_Action__Co-Planning_for_Intervention_194c12eb.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session bridges the May 12–15 writing arc and the May 26–29 CER annotation arc. Teachers analyze department-wide benchmark CER writing data, sort students into three tiers, and co-plan one targeted instructional move per tier. The session closes with each teacher committing to a specific student target, a move to try, and a piece of student work to bring to May 26.",
      whyItMatters: "Benchmark data is only useful if it drives instructional decisions. This session ensures that every teacher leaves with a specific, actionable plan — not just awareness of the data — so that targeted support reaches students before the next PLC.",
      learningArc: "Bridge session: May 12–15 Writing Arc → May 22 (Benchmark Data & Intervention Co-Planning) → May 26–29 CER Annotation Arc. Teachers bring student work from their targeted move to May 26 for follow-up examination.",
      teacherTakeaways: [
        "A completed student tier sort using benchmark CER writing data.",
        "One specific instructional move per tier, mapped to an upcoming lesson.",
        "A commitment to bring student work from the targeted move to the May 26 PLC.",
      ],
    },
  },
  {
    id: "plc-may26-cer-intro",
    date: "2026-05-26",
    displayDate: "Monday, May 26, 2026",
    title: "Reading Like a Scientist: Color-Coded CER Annotation",
    subtitle: "PLC Session 1 of 3 — Introduction & Modeling · Monday, 46 Min",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Step 1: Read and Annotate the Lesson",
    objectives: [
      "Understand the four-color CER annotation system: pink (claim), green (evidence), blue (reasoning), orange (transitions).",
      "Practice annotating a science text using the four-color system as a team.",
      "Identify where students will struggle with distinguishing evidence from reasoning.",
    ],
    whatToBring: [
      "Highlighters or colored pencils in pink, green, blue, and orange",
      "A short science reading or student handout from your current unit",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Welcome & Norms", description: "Introduce the CER annotation arc: three sessions building toward co-planning a lesson with the writing move embedded. Set norms for collaborative annotation.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "10 min", activity: "Introducing the Four-Color System", description: "Present the four components: Claim (pink), Evidence (green), Reasoning (blue), Transitions (orange). Model annotating one paragraph together as a whole group.", lead: "me" as Role, slides: "Slide 3" },
      { time: "15:00", duration: "15 min", activity: "Team Annotation Practice", description: "Teachers annotate a short science passage using the four colors. Work in course teams. Facilitator circulates and notes where disagreements arise.", lead: "all" as Role, slides: "Slide 4" },
      { time: "30:00", duration: "12 min", activity: "Debrief & Discussion", description: "Where did the team agree? Where did they disagree? What does this tell us about what students will struggle with? Focus on the evidence/reasoning distinction.", lead: "me" as Role, slides: "Slide 5" },
      { time: "42:00", duration: "4 min", activity: "Preview & Commitments", description: "Preview May 27: bring 2–3 anonymous student constructed responses from your current unit. State one thing you noticed about the evidence/reasoning distinction.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Introducing the Four-Color System", role: "me" as Role, note: "The hardest distinction for teachers and students alike is evidence vs. reasoning. Evidence is the data or observation; reasoning is the scientific explanation connecting it to the claim. Model this explicitly with a concrete example before the team practice." },
      { slide: "Team Annotation Practice", role: "all" as Role, note: "Expect disagreement — that's the point. If teachers disagree about whether a sentence is evidence or reasoning, that's a productive conversation to surface. Don't resolve it too quickly; let the team work through it." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Reading_Like_a_Scientist__Color-Coded_CER_Annotation_241bf6f8.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "This session introduces the four-color CER annotation system as a shared instructional tool for the Science Department. Teachers practice annotating a science text together, surface disagreements about the evidence/reasoning distinction, and build a shared understanding of what strong student writing looks like. The session sets up May 27's student work analysis.",
      whyItMatters: "Students consistently struggle to distinguish evidence from reasoning in constructed responses. By experiencing the annotation process themselves, teachers develop the pedagogical knowledge needed to teach this distinction explicitly.",
      learningArc: "Session 1 of 3: May 26 (Introduction & Modeling) → May 27 (Student Work Analysis) → May 29 (Co-Planning).",
      teacherTakeaways: [
        "A shared understanding of the four-color CER annotation system.",
        "Awareness of where students will struggle with the evidence/reasoning distinction.",
        "2–3 anonymous student constructed responses to bring to May 27.",
      ],
    },
  },
  {
    id: "plc-may27-cer-student-work",
    date: "2026-05-27",
    displayDate: "Tuesday, May 27, 2026",
    title: "Reading Like a Scientist: Applying CER to Student Work",
    subtitle: "PLC Session 2 of 3 — Student Work Analysis · Tuesday, 46 Min",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Step 2: Anticipate Student Thinking",
    objectives: [
      "Apply the four-color CER annotation system to real student constructed responses.",
      "Identify the most common writing gaps across courses using the annotation evidence.",
      "Build a shared department-wide CER checklist of 4–5 criteria for strong student writing.",
    ],
    whatToBring: [
      "2–3 anonymous student constructed responses from your current unit (strong, developing, struggling)",
      "Highlighters or colored pencils in pink, green, blue, and orange",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Welcome & Norms", description: "Quick recap of May 19: what did we notice about the evidence/reasoning distinction? Set the purpose for today: use student work to build a shared checklist.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "15 min", activity: "Annotate Student Work", description: "Each teacher annotates 2–3 student responses using the four-color system. Work in course teams. Facilitator circulates and notes patterns across courses.", lead: "all" as Role, slides: "Slide 3" },
      { time: "20:00", duration: "12 min", activity: "Identify Writing Gaps", description: "What does the strong response do that the others don't? What are the most common gaps? Record on a shared chart: missing claim, weak evidence, no reasoning, no transitions.", lead: "me" as Role, slides: "Slide 4" },
      { time: "32:00", duration: "10 min", activity: "Build the Shared Checklist", description: "Synthesize the gaps into a 4–5 item checklist for strong CER writing. This checklist becomes the shared reference for all science courses.", lead: "all" as Role, slides: "Slide 5" },
      { time: "42:00", duration: "4 min", activity: "Preview & Commitments", description: "Preview May 29: bring the lesson you will embed the writing move into. State which checklist criterion your writing move addresses.", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Annotate Student Work", role: "all" as Role, note: "Push teachers to annotate silently first before discussing. The goal is to see what each teacher notices independently before the group conversation shapes their thinking." },
      { slide: "Build the Shared Checklist", role: "me" as Role, note: "The checklist should be specific enough to be actionable but broad enough to apply across all science courses. Aim for 4–5 items. Avoid vague language like 'good evidence' — push for specific observable behaviors like 'uses specific data or measurements from the investigation.'" },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Reading_Like_a_Scientist__Applying_CER_to_Student_Work_471f30ea.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "Building on May 19's introduction to the four-color system, this session applies the annotation tool to real student constructed responses. Teachers identify the most common writing gaps across courses and build a shared department-wide CER checklist that will anchor the May 22 co-planning session.",
      whyItMatters: "Student work is the most powerful evidence for instructional decision-making. By examining real responses together, teachers build a shared picture of where students are and what instructional moves will have the most impact.",
      learningArc: "Session 2 of 3: May 26 (Introduction & Modeling) → May 27 (Student Work Analysis) → May 29 (Co-Planning).",
      teacherTakeaways: [
        "A completed annotation of 2–3 student responses using the four-color system.",
        "A shared department-wide CER checklist of 4–5 criteria.",
        "A specific writing gap to address in the May 22 co-planning session.",
      ],
    },
  },
  {
    id: "plc-may29-cer-coplanning",
    date: "2026-05-29",
    displayDate: "Friday, May 29, 2026",
    title: "Embedding the Writing Move: Co-Planning for CER",
    subtitle: "PLC Session 3 of 3 — Co-Planning (Arc Complete) · Friday, 41 Min",
    duration: "41 Minutes",
    audience: "Grades 9–12 Science Teachers",
    alignment: "OSE Lesson Internalization Protocol — Step 4: Plan Facilitation Moves",
    objectives: [
      "Use the shared CER checklist from May 20 to identify the specific writing gap each teacher is targeting.",
      "Map the writing move onto an upcoming lesson using the lesson internalization protocol.",
      "Leave with a co-planned lesson that includes the writing prompt, sentence frames, and scaffolds.",
    ],
    whatToBring: [
      "The shared CER checklist from May 20",
      "An upcoming lesson plan or unit map",
      "Highlighters or colored pencils in pink, green, blue, and orange",
    ],
    agenda: [
      { time: "0:00", duration: "5 min", activity: "Warm-Up & Norms", description: "Quick review of the shared CER checklist from May 20. Each teacher states which gap they are targeting.", lead: "me" as Role, slides: "Slide 1–2" },
      { time: "5:00", duration: "10 min", activity: "Review the Shared Checklist", description: "Confirm the 4–5 item checklist and identify which gap each teacher is targeting. Connect the gap to the lesson they will embed the writing move into.", lead: "all" as Role, slides: "Slide 3" },
      { time: "15:00", duration: "15 min", activity: "Lesson Mapping", description: "Identify where the writing move fits naturally in an upcoming lesson. Use the Lesson Internalization Protocol Step 3: identify the learning target and the key student task.", lead: "all" as Role, slides: "Slide 4" },
      { time: "30:00", duration: "8 min", activity: "Co-Plan the Writing Move", description: "Draft the writing prompt, sentence frames, and scaffolds for the identified lesson. Use the four-color system as a student reference.", lead: "all" as Role, slides: "Slide 5" },
      { time: "38:00", duration: "3 min", activity: "Commitments & Closing", description: "Each teacher states when they will teach the lesson. Closing reflection: what is one thing you will do differently as a result of this arc?", lead: "me" as Role, slides: "Slide 6" },
    ],
    facilitatorNotes: [
      { slide: "Lesson Mapping", role: "all" as Role, note: "If a teacher is stuck on identifying a lesson, help them look at their unit map and find the next lesson with a written student output. The writing move should fit naturally — not be forced into a lesson where it doesn't belong." },
      { slide: "Co-Plan the Writing Move", role: "all" as Role, note: "The writing prompt should be open enough to require reasoning, not just recall. Push teachers to write a prompt that cannot be answered with a single sentence — it should require a claim, evidence, reasoning, and a transition." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Embedding_the_Writing_Move__Co-Planning_for_CER_85762046.pptx",
    agendaVersion: "Both",
    resources: [
      { title: "Lesson Internalization Tool (2025–26)", description: "NBHS four-step lesson internalization tool for the 2025–26 school year.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf", type: "pdf" },
      { title: "OSE Lesson Internalization Protocol (NBHS)", description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf", type: "pdf" },
    ],
    sessionInfo: {
      overview: "The final session of the CER annotation arc. Teachers use the shared checklist from May 20 to identify the specific writing gap they are targeting, map the writing move onto an upcoming lesson, and co-plan the writing prompt, sentence frames, and scaffolds. The arc is complete: May 19 (Introduction), May 20 (Student Work), May 22 (Co-Planning).",
      whyItMatters: "The CER arc is only as effective as the lessons that result from it. This session ensures every teacher leaves with a concrete, executable plan — a specific lesson with a writing prompt, scaffolds, and a student output defined.",
      learningArc: "Session 3 of 3 — Arc Complete: May 26 (Introduction & Modeling) → May 27 (Student Work Analysis) → May 29 (Co-Planning).",
      teacherTakeaways: [
        "A co-planned lesson with the CER writing move embedded.",
        "A writing prompt, sentence frames, and scaffolds ready to use in class.",
        "A commitment to bring student work from this lesson to the next PLC.",
      ],
    },
  },
];

export const roleConfig: Record<Role, { label: string; color: string; bg: string }> = {
  me: { label: "Me", color: "#FFFFFF", bg: "#B30000" },
  gilbert: { label: "Mr. Gilbert", color: "#FFFFFF", bg: "#1A1A1A" },
  mccauley: { label: "Mr. McCauley", color: "#FFFFFF", bg: "#555555" },
  gagnon: { label: "Ms. Gagnon", color: "#FFFFFF", bg: "#1A1A1A" },
  gifford: { label: "Ms. Gifford", color: "#FFFFFF", bg: "#555555" },
  all: { label: "All", color: "#FFFFFF", bg: "#2D6A4F" },
};

export interface DepartmentPD {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  description: string;
  status: "completed" | "upcoming" | "today";
  slidesUrl?: string;
  slidesDownloadUrl?: string;
  slidesDownloads?: SlideDownload[];
  resources?: Resource[];
}

export const departmentPDs: DepartmentPD[] = [
  {
    id: "pd-unit-unpacking-part1",
    date: "2025-08-26",
    displayDate: "Tuesday, August 26, 2025",
    title: "From Plan to Practice: Mastering the Unit Unpacking & Lesson Internalization Protocol (Part 1)",
    description: "This PD session guides New Bedford High School science teachers in strengthening instructional planning and delivery. The session focuses primarily on the Unit Unpacking Protocol, helping teachers clarify goals, align instruction with standards, and anticipate student needs while affirming student identities. Teachers also engage with the Lesson Internalization Protocol to prepare lessons with clarity, address misconceptions, and promote deeper learning. Emphasizing collaboration, equity, and student-centered practices, the session concludes with teachers applying the protocols to their own upcoming lessons to ensure clarity, rigor, and meaningful learning experiences.",
    status: "completed",
  },
  {
    id: "pd-unit-unpacking-part2",
    date: "2025-08-27",
    displayDate: "Wednesday, August 27, 2025",
    title: "From Plan to Practice: Mastering the Unit Unpacking & Lesson Internalization Protocol (Part 2)",
    description: "This PD session guides science teachers in strengthening their instructional planning and lesson preparation. The session focuses primarily on the Lesson Internalization Protocol, supporting teachers in anticipating student thinking, addressing misconceptions, and planning clear, rigorous instruction. Teachers engage in collaborative analysis of lessons to ensure alignment with standards, equity, and student-centered practices. While Unit Unpacking is referenced as background knowledge, the emphasis is on applying the Lesson Internalization Protocol to upcoming lessons so teachers leave with a concrete plan that fosters clarity, rigor, and meaningful learning experiences for all students.",
    status: "completed",
  },
  {
    id: "pd-wida-internalization-tech",
    date: "2025-11-04",
    displayDate: "Tuesday, November 4, 2025",
    title: "Strengthening Science Instruction Through WIDA, Lesson Internalization, and Technology",
    description: "This professional learning day engages the Science Department in a series of connected sessions designed to strengthen instructional quality and deepen student understanding. Teachers begin by exploring how to leverage WIDA frameworks to better support multilingual learners and students on the Prioritization Plan, ensuring equitable access to rigorous scientific content and discourse. Participants analyze real classroom examples, collaborate on adapting instructional materials, and develop strategies to build both content knowledge and academic language. Teachers then use the Lesson Internalization Protocol to plan focused, high-quality lessons, followed by an afternoon centered on technology integration highlighting digital tools that increase engagement and provide real-time insight into student thinking.",
    status: "completed",
  },
  {
    id: "pd-student-work-analysis",
    date: "2025-12-03",
    displayDate: "Wednesday, December 3, 2025",
    title: "Looking at Student Work Through a Standards-Aligned Lens",
    description: "This PD session engages teachers in collaboratively analyzing student evidence using the TNTP Student Work Analysis Protocol to deepen understanding of how well student work reflects mastery of NGSS-aligned learning goals. Participants examine authentic student samples to identify what students know, where misconceptions remain, and how effectively the task elicits three-dimensional learning — disciplinary core ideas, science and engineering practices, and crosscutting concepts. Through structured discussion, teachers evaluate the alignment between instruction, assessment, and standards, using student reasoning as evidence to inform next instructional steps that promote equitable, phenomena-based learning.",
    status: "completed",
  },
  {
    id: "pd-anchoring-lessons",
    date: "2026-02-11",
    displayDate: "Wednesday, February 11, 2026",
    title: "Anchoring Lessons in Purpose: Standards, Phenomena, and the Driving Question",
    description: "This professional development session focuses on using student assessment data to drive intentional instructional planning by anchoring lessons in priority standards, meaningful phenomena, and a clear driving question. Science teachers analyze benchmark and classroom assessment results to identify patterns in student understanding and gaps in learning. Participants then use these insights to design or refine lesson openings that connect to student experience, spark curiosity, and establish a clear purpose for learning — ensuring that every lesson begins with a compelling reason for students to engage with the content.",
    status: "completed",
  },
  {
    id: "pd-planning-instructional-moves",
    date: "2026-02-25",
    displayDate: "Wednesday, February 25, 2026",
    title: "Planning Instructional Moves to Support All Learners",
    description: "This professional development session focuses on helping science teachers intentionally plan instructional moves that respond to evidence of student learning and support all learners. Participants examine classroom and assessment data to anticipate student thinking, identify common misconceptions, and select targeted instructional strategies. Teachers engage in collaborative planning using the Lesson Internalization Protocol to design lessons that are both rigorous and accessible, ensuring that every student — including multilingual learners, students with disabilities, and those on the Prioritization Plan — has meaningful access to grade-level science content and discourse.",
    status: "completed",
  },
  {
    id: "pd-data-to-writing",
    date: "2026-05-13",
    displayDate: "Wednesday, May 13, 2026",
    title: "From Data to Writing: Using Benchmark Results to Strengthen Student Constructed Responses",
    description: "This one-hour department PD anchors instructional planning in student benchmark data. Teachers begin by examining strand-level results to identify where students struggle most with written responses, then collaboratively analyze anonymous student constructed response samples to build a shared checklist for strong writing. Using the data as a guide, each teacher identifies one writing move — such as the CER framework, vocabulary from the question, or sentence frames — to teach explicitly in the next two weeks. The session closes with a collaborative mini-lesson planning block and individual commitments, with student work brought back to the next PLC for follow-up analysis.",
    status: "upcoming",
    slidesUrl: "manus-slides://exsbFH7ttPXxmRwQ9VhWPF",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/From_Data_to_Writing__Using_Benchmark_Results_to_Strengthen_Student_Constructed_Responses_a1aa8cc1.pptx",
    slidesDownloads: [
      {
        label: "Download Slides",
        filename: "May13_From_Data_to_Writing.pptx",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/From_Data_to_Writing__Using_Benchmark_Results_to_Strengthen_Student_Constructed_Responses_a1aa8cc1.pptx",
        type: "pptx",
      },
    ],
    resources: [
      {
        title: "Lesson Internalization Tool (2025–26)",
        description: "NBHS four-step lesson internalization tool for the 2025–26 school year.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/LessonInternalizationTool_2025-26_402a3e80.pdf",
        type: "pdf",
      },
      {
        title: "OSE Lesson Internalization Protocol (NBHS)",
        description: "OpenSciEd lesson internalization protocol adapted for New Bedford High School.",
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/OSELessonInternalizationProtocol_NBHS_c0062ed0.pdf",
        type: "pdf",
      },
    ],
  },
  {
    id: "pd-designing-structured-discussion",
    date: "2026-04-08",
    displayDate: "Wednesday, April 8, 2026",
    title: "Designing a Structured Discussion: From Criteria to Launch Question",
    description: "This professional development session builds directly on the department's shared criteria for a high-quality discussion, developed in the April 8 PLC. Teachers re-anchor to the six criteria, then move into the design phase: choosing a discussion format (Science Talk, Think-Pair-Share, Structured Academic Controversy, or Fishbowl), writing a launch question for an upcoming lesson, and stress-testing that question against the criteria. Using a course-alike feedback protocol, teachers give and receive criteria-anchored feedback — one 'I notice' and one 'I wonder' — before revising their question. The session closes with a whole-group share-out where each course team reports their format, question, and the criterion that was hardest to design for, building a shared department question bank in the process.",
    status: "upcoming",
    slidesUrl: "manus-slides://tTr85Xyt4UP56sz20NNzuk",
    slidesDownloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm/Apr8_PD_v4_6665a705.pptx",
  },
];
