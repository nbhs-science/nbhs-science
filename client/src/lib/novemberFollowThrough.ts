import type { PLCSession, Resource } from "./plcData";

// Same resources on both published sites; only their hosting paths differ.
const asset = (filename: string, storagePath: string) =>
  import.meta.env.BASE_URL === "/nbhs-science/" ? `assets/plc/${filename}` : storagePath;

const cycleResources: Resource[] = [
  {
    title: "November 23, 24 & 30 — PowerPoints and Agendas ZIP",
    description: "Six files organized by PLC day: one editable PowerPoint and one printable agenda for each session.",
    url: asset("Science_PLC_Nov23_Nov24_Nov30_PowerPoints_and_Agendas.zip", "/manus-storage/Science_PLC_Nov23_Nov24_Nov30_PowerPoints_and_Agendas_4e904f31.zip"),
    type: "archive",
  },
  {
    title: "Lesson Internalization Tool (2026–27)",
    description: "Connect learning criteria, student assets and language demands, anticipated responses, access, feedback, pacing, and after-lesson reflection.",
    url: asset("LessonInternalizationTool_2026-27.pdf", "/manus-storage/LessonInternalizationTool_2026-27_377e44bf.pdf"),
    type: "pdf",
  },
];
const preLesson: Resource = {
  title: "Pre-Lesson Sharing Guide",
  description: "Share the teaching and learning focus; colleagues examine the task and anticipated responses before the teacher chooses one feasible change.",
  url: asset("PLC_Pre_Lesson_Sharing.pdf", "/manus-storage/PLC_Pre_Lesson_Sharing_dc352c2e.pdf"),
  type: "pdf",
};
const postLesson: Resource = {
  title: "Post-Lesson Sharing Guide",
  description: "What Happened → What Does the Evidence Tell Us → What’s Next. Describe actual student work before choosing a response.",
  url: asset("PLC_Post_Lesson_Sharing.pdf", "/manus-storage/PLC_Post_Lesson_Sharing_1d0305bc.pdf"),
  type: "pdf",
};

export const novemberFollowThroughSessions: PLCSession[] = [
  {
    id: "plc-2026-11-23-success-criteria",
    date: "2026-11-23",
    displayDate: "Monday, November 23, 2026",
    title: "Make Success Criteria Useful to Students",
    subtitle: "From Feedback to Independent Scientific Thinking — Student Self-Check",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers — All Science Courses (OSE + non-OSE)",
    alignment: "Lesson Internalization Tool: After the Lesson → Deep Dive 1; Every Day Q1–Q2; Deep Dive 2–3; pre-lesson teaching and learning focus",
    objectives: [
      "Carry forward a learning need and the selected November 20 next step, if that evidence is available.",
      "Select one scientific-reasoning criterion and a targeted language demand students can locate in their own work.",
      "Embed a student self-check and revision opportunity while preserving required access supports.",
      "Set a realistic teaching date and a plan to collect initial and revised student responses.",
    ],
    whatToBring: [
      "An existing upcoming lesson and its student task, exemplar, and success criteria",
      "Actual November 20 evidence and the selected next step, if available",
      "The existing lesson planning tool or notes; no additional paperwork is required",
    ],
    agenda: [
      { time: "0:00", duration: "4 min", activity: "Reconnect to the Next Step", description: "Use actual November 20 evidence and the selected adjustment, if available. Identify the lesson and evidence source; name the learning need being carried forward.", lead: "all" },
      { time: "4:00", duration: "6 min", activity: "Choose One Useful Criterion", description: "Select one content or scientific-reasoning criterion and targeted language demand. Name relevant student assets, prior knowledge or home-language resources, and an access need.", lead: "all" },
      { time: "10:00", duration: "18 min", activity: "Pre-Lesson Sharing: Strengthen the Plan", description: "Pairs take two 9-minute turns: teaching/learning focus (2), peer examination of the task, exemplar, and self-check (4), teacher selection of one change (3). Triads take three 6-minute turns: share (1), questions (3), decision (2).", lead: "all" },
      { time: "28:00", duration: "12 min", activity: "Write and Rehearse the Student Self-Check", description: "Students find evidence of the criterion in their response, model, or calculation; name what is present or missing; revise one part; and explain why the revision better meets the criterion. Choose an access support without giving away the reasoning and protect thinking and revision time.", lead: "all" },
      { time: "40:00", duration: "6 min", activity: "Commit and Carry the Same Plan to Tuesday", description: "Record the change, teaching date before or after recess, criterion, and collection plan for 3–5 students’ actual initial and revised samples with support-use notes. Keep the same plan, task, exemplar, and self-check for Tuesday.", lead: "all" },
    ],
    facilitatorNotes: [
      { slide: "Reconnect and choose the criterion", role: "all", note: "Use confirmed evidence rather than assume November 20 outcomes. Ask: Can a student locate this criterion in their own work? Does the self-check reveal scientific reasoning or only completion?" },
      { slide: "Pre-lesson sharing and rehearsal", role: "all", note: "The teacher chooses one feasible change. Ask which access support preserves the grade-level demand. Independent means student reasoning, not unsupported work; retain accommodations, language supports, modeling, relevant prior knowledge, and laboratory safety." },
      { slide: "Commitment", role: "all", note: "Record the teaching date and evidence plan in the existing lesson/tool. This is preparation, not a claim of completed learning gains. Carry the same focus into November 24." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: asset("2026-11-23_Make_Success_Criteria_Useful_to_Students.pptx", "/manus-storage/2026-11-23_Make_Success_Criteria_Useful_to_Students_9c421bf0.pptx"),
    slidesDownloads: [{ label: "November 23 PLC — Editable PowerPoint", filename: "2026-11-23_Make_Success_Criteria_Useful_to_Students.pptx", url: asset("2026-11-23_Make_Success_Criteria_Useful_to_Students.pptx", "/manus-storage/2026-11-23_Make_Success_Criteria_Useful_to_Students_9c421bf0.pptx"), type: "pptx" }],
    agendaPdf: { label: "November 23 PLC — Printable Agenda", filename: "2026-11-23_PLC_Agenda_Make_Success_Criteria_Useful.pdf", url: asset("2026-11-23_PLC_Agenda_Make_Success_Criteria_Useful.pdf", "/manus-storage/2026-11-23_PLC_Agenda_Make_Success_Criteria_Useful_347f17c7.pdf"), type: "pdf" },
    agendaVersion: "Both",
    resources: [...cycleResources, preLesson],
    sessionInfo: {
      overview: "This session continues the November 16–20 lesson-improvement cycle by making one success criterion useful to students. Teachers use an existing lesson to plan a self-check that asks students to find evidence in their work, revise one part, and explain the improvement.\n\nPeer examination helps refine the task and access supports. Teachers leave with one feasible change and an evidence plan, then carry the same lesson into Tuesday’s feedback rehearsal.",
      whyItMatters: "A visible criterion becomes useful when students apply it to their own scientific reasoning, not simply check that work is complete.",
      learningArc: "November 23: criterion and student self-check → November 24: feedback, revision, and a new comparable check → November 30: review actual evidence and choose a next action. No PLC is scheduled during Thanksgiving recess, November 25–27.",
      teacherTakeaways: ["One student-facing self-check tied to scientific reasoning.", "An access support that preserves rigor.", "One revision to an existing lesson.", "A teaching date and plan for initial and revised samples."],
    },
  },
  {
    id: "plc-2026-11-24-feedback-revision-check",
    date: "2026-11-24",
    displayDate: "Tuesday, November 24, 2026",
    title: "Plan Feedback, Revision, and an Independent Check",
    subtitle: "From Feedback to Independent Scientific Thinking — Rehearse and Plan",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers — All Science Courses (OSE + non-OSE)",
    alignment: "Lesson Internalization Tool: Every Day Q3–Q4; Deep Dive 4–5; pre-lesson teaching and learning focus",
    objectives: [
      "Rehearse concise feedback that returns the reasoning to students and leads to a specific revision.",
      "Prepare a short new comparable task that checks the same criterion without copying the previous answer.",
      "Finalize access supports, pacing, materials, and collection timing in the same lesson sequence.",
      "Set a realistic teaching and evidence-review plan around Thanksgiving recess.",
    ],
    whatToBring: ["Monday’s revised lesson plan and student task", "The same learning criterion, exemplar, and student self-check", "An actual response if the lesson has already been taught"],
    agenda: [
      { time: "0:00", duration: "4 min", activity: "Keep Monday’s Focus", description: "Return to the same criterion and self-check. If the lesson was taught before this PLC, use an actual response to plan the next opportunity.", lead: "all" },
      { time: "4:00", duration: "6 min", activity: "Specify Revision and a Fresh Task", description: "Name what students will revise after feedback. Draft a short fresh task with changed data, model, or context that checks the same reasoning at the same demand—not a more difficult new topic.", lead: "all" },
      { time: "10:00", duration: "18 min", activity: "Rehearse Feedback That Returns the Thinking", description: "Pairs take two 9-minute turns: explain the initial response/task (2), partner plays a student while the teacher rehearses feedback and self-check (4), revise the plan (3). Triads take three 6-minute turns: context (1), rehearsal (3), revision (2).", lead: "all" },
      { time: "28:00", duration: "12 min", activity: "Finalize the Individual Check and Access Plan", description: "Prepare the fresh check, exemplar, and criterion. Students apply the criterion individually without an additional corrective teacher prompt. Retain required supports; decide pacing, materials/setup, and collection timing. Protect student thinking and revision time.", lead: "all" },
      { time: "40:00", duration: "6 min", activity: "Set a Realistic Teaching and Evidence Plan", description: "Record a teaching date before or after recess. For November 30, bring the task/criterion, 3–5 students’ de-identified initial, revised, and new-check responses if available, plus notes on supports and prompts actually used. No PLC during Thanksgiving recess, November 25–27.", lead: "all" },
    ],
    facilitatorNotes: [
      { slide: "Keep the same criterion", role: "all", note: "Ask: What will students actually revise after feedback? The new task should reveal the same reasoning at the same demand, not introduce a harder topic." },
      { slide: "Feedback rehearsal", role: "all", note: "Rehearse accurate, partial, or mistaken responses. Ask: What prompt returns reasoning to the student? Keep feedback concise and leave space for the student to act." },
      { slide: "Independent check and implementation", role: "all", note: "Independent reasoning does not mean removing access. Retain accommodations, language supports, prior-knowledge/home-language resources, modeling, and safety. Record an honest date; if teaching occurs after recess, set a later evidence review rather than imply November 30 evidence exists." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: asset("2026-11-24_Plan_Feedback_Revision_Independent_Check.pptx", "/manus-storage/2026-11-24_Plan_Feedback_Revision_Independent_Check_98c1a15a.pptx"),
    slidesDownloads: [{ label: "November 24 PLC — Editable PowerPoint", filename: "2026-11-24_Plan_Feedback_Revision_Independent_Check.pptx", url: asset("2026-11-24_Plan_Feedback_Revision_Independent_Check.pptx", "/manus-storage/2026-11-24_Plan_Feedback_Revision_Independent_Check_98c1a15a.pptx"), type: "pptx" }],
    agendaPdf: { label: "November 24 PLC — Printable Agenda", filename: "2026-11-24_PLC_Agenda_Plan_Feedback_and_Independent_Check.pdf", url: asset("2026-11-24_PLC_Agenda_Plan_Feedback_and_Independent_Check.pdf", "/manus-storage/2026-11-24_PLC_Agenda_Plan_Feedback_and_Independent_Check_0bad0aa9.pdf"), type: "pdf" },
    agendaVersion: "Both",
    resources: [...cycleResources, preLesson],
    sessionInfo: {
      overview: "Teachers return to Monday’s lesson and rehearse the feedback-to-revision routine with a colleague. They then design a short new comparable task that checks whether students can apply the same reasoning individually, with required supports retained.\n\nThe session closes with a realistic teaching date and plan for initial, revised, and new-check responses. Existing lesson plans and working tools are sufficient.",
      whyItMatters: "A revised answer shows how students used feedback. A new comparable task provides a separate opportunity to examine whether they can apply the same reasoning without an additional corrective prompt.",
      learningArc: "The November 23 self-check becomes a rehearsed feedback, revision, and individual-check routine on November 24. Actual work is reviewed November 30 if available; Thanksgiving recess is November 25–27.",
      teacherTakeaways: ["A rehearsed feedback prompt and student revision action.", "A fresh comparable individual check.", "An access, pacing, and materials plan.", "A realistic teaching date and evidence collection plan."],
    },
  },
  {
    id: "plc-2026-11-30-independent-reasoning",
    date: "2026-11-30",
    displayDate: "Monday, November 30, 2026",
    title: "Review What Students Can Explain Independently",
    subtitle: "From Feedback to Independent Scientific Thinking — Evidence and Next Action",
    duration: "46 Minutes",
    audience: "Grades 9–12 Science Teachers — All Science Courses (OSE + non-OSE)",
    alignment: "Lesson Internalization Tool: After the Lesson, p. 4; Every Day Q1, Q3–Q4; post-lesson sharing; Deep Dive 4–5 for forward planning",
    objectives: [
      "Distinguish the planned routine from actual implementation and name supports and prompts used.",
      "Read initial, revised, and new-check responses against the same criterion before interpreting.",
      "State an evidence-based conclusion and its limits without equating completion or revision with independent transfer.",
      "Choose one next adjustment, a follow-up check, and a revisit date.",
    ],
    whatToBring: ["The actual task and learning criterion", "3–5 students’ de-identified initial, revised, and independent-check responses, if available", "Notes on the actual teaching date and supports or prompts used"],
    agenda: [
      { time: "0:00", duration: "4 min", activity: "Identify the Actual Implementation", description: "Name the teaching date/task, same criterion, and supports or prompts actually used. Distinguish the planned routine from what was taught.", lead: "all" },
      { time: "4:00", duration: "6 min", activity: "Read Evidence Before Interpreting", description: "Silently read initial, revised, and new-check work, as available, against the criterion. Locate specific scientific reasoning and language use; note gaps in the evidence set.", lead: "all" },
      { time: "10:00", duration: "18 min", activity: "Post-Lesson Sharing: Evidence, Then Response", description: "Pairs take two 9-minute turns: What Happened (2), What Does the Evidence Tell Us—sample-specific strength, pattern, and question (4), What’s Next—teacher chooses a response (3). Triads take three 6-minute turns: context (1), evidence (3), next step (2).", lead: "all" },
      { time: "28:00", duration: "12 min", activity: "Revise the Next Lesson", description: "Keep a useful support. Choose targeted re-engagement, an access adjustment, or extension tied to the evidence. Preserve required accommodations, language supports, prior-knowledge/home-language resources, modeling, and safety; plan a follow-up check of the same learning need.", lead: "all" },
      { time: "40:00", duration: "6 min", activity: "Commit to a Next Action and Revisit", description: "Record one chosen action, when it will occur, what evidence will check its effect, and a revisit date. State what the samples support and what remains uncertain about independent application.", lead: "all" },
    ],
    facilitatorNotes: [
      { slide: "Actual implementation and evidence", role: "all", note: "If implementation evidence is insufficient after the short week, use actual recent work to refine the plan, mark the new routine untested, and set a later evidence review. Do not treat recent work as proof of an untaught change." },
      { slide: "Post-lesson sharing", role: "all", note: "Describe before interpreting. Engagement and completion are not mastery; revision is not independent transfer; 3–5 samples do not establish class-wide mastery. Cite the sample supporting each conclusion." },
      { slide: "Next action", role: "all", note: "The teacher chooses one feasible next move, with a date, evidence check, and revisit date. Independent means student reasoning with required supports, not unsupported work." },
    ],
    slidesUrl: "",
    slidesDownloadUrl: asset("2026-11-30_Review_Independent_Reasoning.pptx", "/manus-storage/2026-11-30_Review_Independent_Reasoning_cd371b24.pptx"),
    slidesDownloads: [{ label: "November 30 PLC — Editable PowerPoint", filename: "2026-11-30_Review_Independent_Reasoning.pptx", url: asset("2026-11-30_Review_Independent_Reasoning.pptx", "/manus-storage/2026-11-30_Review_Independent_Reasoning_cd371b24.pptx"), type: "pptx" }],
    agendaPdf: { label: "November 30 PLC — Printable Agenda", filename: "2026-11-30_PLC_Agenda_Review_Independent_Reasoning.pdf", url: asset("2026-11-30_PLC_Agenda_Review_Independent_Reasoning.pdf", "/manus-storage/2026-11-30_PLC_Agenda_Review_Independent_Reasoning_95600786.pdf"), type: "pdf" },
    agendaVersion: "Both",
    resources: [...cycleResources, postLesson],
    sessionInfo: {
      overview: "Teachers examine actual work from the planned feedback, revision, and individual-check routine where that evidence is available. Silent reading against the same criterion precedes the post-lesson conversation and selection of a next response.\n\nIf the routine was not taught or evidence is incomplete after the short week, use actual recent work to refine the plan, identify the routine as untested, and set a realistic later review. No outcomes are assumed.",
      whyItMatters: "Comparing initial, revised, and new-check responses helps distinguish changes after feedback from independent application. Conclusions must reflect the evidence collected and the supports actually used.",
      learningArc: "This session closes the November 23/24/30 planning cycle and begins the next evidence-based adjustment. It also prepares teachers to connect source analysis, scientific explanation, and meaningful discussion with the December 2 close-reading PD.",
      teacherTakeaways: ["A sample-grounded finding and a clear statement of its limits.", "One targeted next instructional action.", "A follow-up check and revisit date.", "A later implementation/review plan if the new routine remains untested."],
    },
  },
];

// Preserve the facilitator slide references used on the prior published records.
novemberFollowThroughSessions.forEach((session) => {
  const slideReferences = session.date === "2026-11-30"
    ? ["Slides 1–2", "Slide 3", "Slides 4–5", "Slide 6", "Slide 6"]
    : ["Slides 1–2", "Slide 3", "Slide 4", "Slide 5", "Slide 6"];
  session.agenda.forEach((item, index) => {
    item.slides = slideReferences[index];
  });
});
