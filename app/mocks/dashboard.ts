export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
  tone: "slate" | "blue" | "green" | "amber" | "red" | "purple";
  spark: number[];
};

export type PerspectiveStatus = {
  name: string;
  progress: number; 
  openItems: number;
  tone: "slate" | "blue" | "green" | "amber" | "red" | "purple";
};

export type TimelineItem = {
  date: string;
  title: string;
  status: "done" | "in_progress" | "upcoming";
  owner: string;
};

export type Activity = {
  at: string;
  text: string;
  by: string;
  tone: "slate" | "blue" | "green" | "amber" | "red" | "purple";
};

export const dashboardData = {
  orgName: "Tahwul Transformation Program",
  quarter: "Q1 2026",
  overallReadiness: 74,
  overallCompliance: 65,
  auditReadiness: 80,
  uploadedToDga: 258,
  totalCriteria: 95,
  completedCriteria: 52,
  evidenceDocs: { total: 1136, uploaded: 159 },
  evidenceCompleted: 302,
  overallProgress: 28.65,
  stats: [
    {
      label: "Controls mapped",
      value: "128",
      delta: "+12 this week",
      tone: "blue",
      spark: [40, 52, 48, 60, 66, 70, 78, 84],
    },
    {
      label: "Evidence items",
      value: "312",
      delta: "+28 this week",
      tone: "purple",
      spark: [22, 30, 28, 36, 44, 52, 58, 64],
    },
    {
      label: "Open findings",
      value: "19",
      delta: "-4 this week",
      tone: "amber",
      spark: [56, 50, 46, 44, 38, 32, 28, 24],
    },
    {
      label: "Audit readiness",
      value: "74%",
      delta: "+6% this month",
      tone: "green",
      spark: [52, 54, 56, 58, 62, 66, 70, 74],
    },
  ] satisfies DashboardStat[],
  perspectives: [
    { name: "Governance", progress: 82, openItems: 4, tone: "blue" },
    { name: "Risk & Compliance", progress: 68, openItems: 9, tone: "amber" },
    { name: "Technology", progress: 74, openItems: 6, tone: "purple" },
    { name: "Operations", progress: 61, openItems: 11, tone: "red" },
  ] satisfies PerspectiveStatus[],
  timeline: [
    {
      date: "Feb 02",
      title: "Scope sign-off (Strategic Planning)",
      status: "done",
      owner: "A. Saleh",
    },
    {
      date: "Feb 06",
      title: "Evidence request pack shared",
      status: "in_progress",
      owner: "R. Nasser",
    },
    {
      date: "Feb 12",
      title: "Management review session",
      status: "upcoming",
      owner: "S. Alharthi",
    },
    {
      date: "Feb 18",
      title: "Readiness checkpoint #2",
      status: "upcoming",
      owner: "PMO",
    },
  ] satisfies TimelineItem[],
  activities: [
    {
      at: "Today, 09:12",
      text: "Uploaded evidence: Network segmentation policy",
      by: "F. Ibrahim",
      tone: "green",
    },
    {
      at: "Yesterday, 17:05",
      text: "Finding status changed: Access review gap → In progress",
      by: "M. Khan",
      tone: "amber",
    },
    {
      at: "Yesterday, 14:20",
      text: "New control mapped: BCM-04 (Recovery testing)",
      by: "A. Saleh",
      tone: "blue",
    },
    {
      at: "Mon, 11:03",
      text: "Evidence request sent to IT Ops (12 items)",
      by: "R. Nasser",
      tone: "purple",
    },
  ] satisfies Activity[],
  readinessWidgets: [
    { label: "Evidence completeness", value: 71, tone: "blue" as const },
    { label: "Policy coverage", value: 78, tone: "green" as const },
    { label: "Control design", value: 65, tone: "amber" as const },
    { label: "Operating effectiveness", value: 58, tone: "red" as const },
  ],

  timelineMilestones: [
    { date: "Mar 17", label: "Kickoff Workshop", status: "done" as const },
    { date: "March 18", label: "Data Collection", status: "done" as const },
    { date: "May 8", label: "Initial Phase", status: "delayed" as const },
    { date: "May 9–July 12", label: "Verification", status: "delayed" as const },
    { date: "July 13", label: "Completion Reviews", status: "delayed" as const },
    { date: "August 21", label: "Cycle Conclusion", status: "delayed" as const },
  ],

  progressLegend: [
    { label: "Not Started", color: "#9aa7b4" },
    { label: "In Progress", color: "#f59e0b" },
    { label: "Completed", color: "#22c55e" },
    { label: "Partially Uploaded", color: "#1f5eff" },
    { label: "Fully Uploaded", color: "#0ea5e9" },
    { label: "Delayed", color: "#ef4444" },
  ],

  progressStatusColumns: [
    {
      title: "Strategy And Planning",
      percent: 97.78,
      items: [
        { name: "Digital Transformation", dots: ["completed", "completed", "completed"] as const },
        { name: "Digital Governance", dots: ["completed", "completed", "in_progress"] as const },
        { name: "Enterprise Architecture", dots: ["completed", "completed", "completed", "completed"] as const },
      ],
    },
    {
      title: "Organization And Culture",
      percent: 70.83,
      items: [
        { name: "Digital Culture And Environment", dots: ["completed", "in_progress", "completed"] as const },
        { name: "Leadership Development", dots: ["completed", "completed", "completed", "in_progress"] as const },
        { name: "Skills & Capacity Building", dots: ["in_progress", "in_progress", "in_progress"] as const },
      ],
    },
    {
      title: "Operations And Execution",
      percent: 80.0,
      items: [{ name: "Business Processes", dots: ["in_progress", "completed"] as const }],
    },
    {
      title: "Business Continuity",
      percent: 90.95,
      items: [
        { name: "Risk Management", dots: ["completed", "completed", "completed", "completed", "completed"] as const },
        { name: "Business Continuity", dots: ["completed", "partially_uploaded", "not_started", "not_started", "not_started", "not_started", "not_started"] as const },
      ],
    },
    {
      title: "Information Technology",
      percent: 75.0,
      items: [
        { name: "Support Systems", dots: ["completed", "partially_uploaded", "completed", "completed", "completed"] as const },
        { name: "IT Infrastructure", dots: ["completed", "completed", "completed", "completed", "partially_uploaded", "completed", "completed"] as const },
        { name: "Cloud Infrastructure", dots: ["completed", "completed", "fully_uploaded"] as const },
      ],
    },
    {
      title: "Comprehensive Governance",
      percent: 64.44,
      items: [
        { name: "Governance Platforms", dots: ["completed", "completed"] as const },
        { name: "Stakeholder engagement", dots: ["completed", "completed", "completed", "completed"] as const },
        { name: "Digital Governance", dots: ["completed", "completed", "completed"] as const },
      ],
    },
    {
      title: "Channels And Services",
      percent: 100,
      items: [
        { name: "Service Quality", dots: ["completed", "completed"] as const },
        { name: "Digital Channels", dots: ["completed", "completed", "completed", "completed"] as const },
      ],
    },
    {
      title: "Beneficiary Centralization",
      percent: 60.0,
      items: [
        { name: "User Engagement", dots: ["completed", "in_progress", "in_progress"] as const },
        { name: "User Relationship", dots: ["completed", "in_progress", "completed"] as const },
        { name: "Trust Experience", dots: ["in_progress", "completed", "completed", "in_progress", "completed"] as const },
      ],
    },
    {
      title: "Government Data",
      percent: 87.5,
      items: [
        { name: "Data Governance", dots: ["completed", "in_progress", "completed", "completed"] as const },
        { name: "Data Usage & Availability", dots: ["completed", "in_progress", "completed", "in_progress"] as const },
        { name: "Open Data", dots: ["in_progress", "delayed"] as const },
      ],
    },
    {
      title: "Research And Innovation",
      percent: 17.65,
      items: [
        { name: "Innovation", dots: ["delayed", "delayed", "delayed", "delayed"] as const },
        { name: "Creative Solutions", dots: ["in_progress", "delayed"] as const },
      ],
    },
  ],

  topLeaders: [
    { name: "Ahmed Al-Ali", perspective: "Strategy Perspective", score: 96 },
    { name: "Sarah Al-Khaled", perspective: "Beneficiary Perspective", score: 94 },
    { name: "Mohammad Al-Mansour", perspective: "IT Perspective", score: 92 },
  ],

  recentActivitiesV2: [
    {
      title: 'Document "Strategy_Review.Pdf"',
      subtitle: "Was Uploaded By Ahmed Khaled",
      ago: "5 Mins Ago",
    },
    {
      title: 'Task "Review Compliance Files"',
      subtitle: "Was Assigned To Mona Hamed",
      ago: "20 Mins Ago",
    },
    {
      title: 'New Criterion "5.3 Digital Identity"',
      subtitle: "Was Created By Admin",
      ago: "1 Hour Ago",
    },
  ],

  performance12Month: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    values: [88, 72, 80, 90, 76, 52, 86, 78, 54, 88, 92, 76],
  },
};

