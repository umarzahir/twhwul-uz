export type EvidenceItem = {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: "Not started" | "In progress" | "Under review" | "Completed";
  tag: string;
};

export const detailsData = {
  title: "Strategic Planning",
  category: "Digital Transformation",
  progress: 62,
  description:
    "Define objectives, scope, governance, and evidence required for strategic planning controls.",
  evidenceSummary: {
    total: 24,
    inProgress: 9,
    underReview: 5,
    completed: 7,
    notStarted: 3,
  },
  overview: {
    objective:
      "Ensure strategic planning activities are documented, aligned to business priorities, and measurable through a defined governance model.",
    requirements: [
      "Approved transformation roadmap with milestones",
      "Stakeholder RACI and governance cadence",
      "Risk assessment and compliance considerations",
      "Defined KPIs and measurement approach",
    ],
    scope: [
      "Strategy & portfolio planning",
      "Program governance",
      "Benefits tracking",
      "Risk & compliance alignment",
    ],
    exclusions: ["Vendor due diligence", "Penetration testing execution"],
    references: [
      "ISO 27001: A.5 / A.6",
      "NCA ECC (Saudi) – Governance & Compliance",
      "Internal policy: DT-STRAT-001",
    ],
  },
  leaders: [
    { name: "A. Saleh", role: "Program Owner", org: "PMO" },
    { name: "R. Nasser", role: "Compliance Lead", org: "GRC" },
    { name: "S. Alharthi", role: "IT Lead", org: "Technology" },
  ],
  evidence: [
    {
      id: "EV-001",
      title: "Approved transformation roadmap (Q1–Q4)",
      owner: "PMO",
      due: "Feb 10",
      status: "Under review",
      tag: "Roadmap",
    },
    {
      id: "EV-002",
      title: "Governance charter and meeting cadence",
      owner: "GRC",
      due: "Feb 08",
      status: "Completed",
      tag: "Governance",
    },
    {
      id: "EV-003",
      title: "Strategic KPIs & measurement plan",
      owner: "PMO",
      due: "Feb 14",
      status: "In progress",
      tag: "KPI",
    },
    {
      id: "EV-004",
      title: "Risk assessment summary (DT initiatives)",
      owner: "GRC",
      due: "Feb 16",
      status: "Not started",
      tag: "Risk",
    },
    {
      id: "EV-005",
      title: "Stakeholder RACI matrix",
      owner: "PMO",
      due: "Feb 12",
      status: "In progress",
      tag: "RACI",
    },
    {
      id: "EV-006",
      title: "Scope statement and exclusions",
      owner: "PMO",
      due: "Feb 06",
      status: "Completed",
      tag: "Scope",
    },
  ] satisfies EvidenceItem[],
};

