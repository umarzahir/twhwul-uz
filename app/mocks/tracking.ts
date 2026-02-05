export type TrackingRow = {
  id: string;
  control: string;
  perspective: string;
  status: "On track" | "At risk" | "Blocked" | "Done";
  progress: number; // 0..100
  owner: string;
  due: string;
  evidence: number;
  notes: string;
};

export const trackingData = {
  title: "Evidence Tracking",
  subtitle: "Control-level progress and evidence status",
  filters: ["All", "At risk", "Blocked", "Due soon"],
  summary: [
    { label: "Due in 7 days", value: 8, tone: "amber" as const },
    { label: "Blocked items", value: 3, tone: "red" as const },
    { label: "Awaiting review", value: 5, tone: "purple" as const },
    { label: "Completed today", value: 2, tone: "green" as const },
  ],
  rows: [
    {
      id: "CTRL-AC-01",
      control: "Access review cadence documented",
      perspective: "Risk & Compliance",
      status: "At risk",
      progress: 45,
      owner: "GRC",
      due: "Feb 09",
      evidence: 1,
      notes: "Waiting for HR roster export",
    },
    {
      id: "CTRL-GOV-03",
      control: "Governance committee minutes",
      perspective: "Governance",
      status: "On track",
      progress: 70,
      owner: "PMO",
      due: "Feb 12",
      evidence: 3,
      notes: "Draft minutes uploaded",
    },
    {
      id: "CTRL-TECH-07",
      control: "Network segmentation policy",
      perspective: "Technology",
      status: "Done",
      progress: 100,
      owner: "IT Security",
      due: "Feb 02",
      evidence: 2,
      notes: "Approved by CISO",
    },
    {
      id: "CTRL-OPS-02",
      control: "BCP recovery test evidence",
      perspective: "Operations",
      status: "Blocked",
      progress: 20,
      owner: "IT Ops",
      due: "Feb 15",
      evidence: 0,
      notes: "Test window not confirmed",
    },
    {
      id: "CTRL-TECH-02",
      control: "Patch management metrics",
      perspective: "Technology",
      status: "On track",
      progress: 58,
      owner: "IT Ops",
      due: "Feb 13",
      evidence: 2,
      notes: "Monthly report pending sign-off",
    },
    {
      id: "CTRL-GOV-01",
      control: "Transformation roadmap approved",
      perspective: "Governance",
      status: "On track",
      progress: 78,
      owner: "PMO",
      due: "Feb 10",
      evidence: 4,
      notes: "Final alignment with Finance",
    },
  ] satisfies TrackingRow[],
  sidePanel: {
    readiness: 71,
    keyRisks: [
      "Evidence approvals delayed (committee cadence)",
      "Dependencies on HR exports and vendor docs",
      "Test window clashes with change freeze",
    ],
    nextActions: [
      "Confirm recovery test date with IT Ops",
      "Upload access review roster export",
      "Schedule evidence review session (GRC)",
    ],
  },
};

