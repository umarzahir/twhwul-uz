import type { Route } from "./+types/dashboard";
import { dashboardData } from "~/mocks/dashboard";
import { Card, CardBody, CardHeader } from "~/ui/primitives/Card";
import StatCard from "~/ui/primitives/StatCard";
import { GaugeSemi } from "~/ui/charts/GaugeSemi";
import { Bars12Month } from "~/ui/charts/Bars12Month";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard • Audit Platform" },
    {
      name: "description",
      content: "Dashboard showing readiness, progress, and recent activities.",
    },
  ];
}

function dotTone(t: "not_started" | "in_progress" | "completed" | "partially_uploaded" | "fully_uploaded" | "delayed") {
  switch (t) {
    case "completed":
      return "bg-emerald-500";
    case "in_progress":
      return "bg-amber-500";
    case "not_started":
      return "bg-slate-300";
    case "partially_uploaded":
      return "bg-[var(--color-brand-blue)]";
    case "fully_uploaded":
      return "bg-sky-500";
    case "delayed":
      return "bg-red-500";
  }
}

function milestoneDot(status: "done" | "delayed") {
  return status === "done" ? "bg-white" : "bg-red-500";
}

export default function DashboardRoute() {
  const data = dashboardData;

  const statsCardData =  [
            {
              icon: "/hugeicons_chart-bar-line.svg",
              value: <>{data.overallProgress.toFixed(2)}%</>,
              label: "Overall Progress",
              bodyClass: "py-0 relative",
              imgClass: "absolute right-3 top-5 w-6 h-6",
              valueClass: "text-2xl",
            },
            {
              icon: "/hugeicons_folder-01.svg",
              value: <>{data.totalCriteria}</>,
              label: "Total Criteria",
              bodyClass: "py-0 relative",
            },
            {
              icon: "/hugeicons_folder-check.svg",
              value: <>{data.completedCriteria}</>,
              label: "Completed Criteria",
            },
            {
              icon: "/hugeicons_file-security.svg",
              value: <>{data.evidenceDocs.total}</>,
              label: "Evidence Documents",
            },
            {
              icon: "/hugeicons_file-verified.svg",
              value: <>{data.evidenceCompleted}</>,
              label: "Evidence (Completed)",
            },
            {
              icon: "/hugeicons_file-upload.svg",
              value: <>{data.uploadedToDga}</>,
              label: "Uploaded To DGA",
            },
          ] as const

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between px-5 py-2">
          <div className="text-sm font-semibold text-slate-900">Project Timeline</div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-slate-600">
            2026
            <svg viewBox="0 0 24 24" className="size-4 text-slate-400" aria-hidden="true">
              <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
            </svg>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="rounded-lg bg-white px-4 py-4 mb-6">
            <div className="relative">
              <div className="h-3 w-full rounded-full bg-slate-100" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full h-3 bg-emerald-500"
                style={{ width: `${Math.round(data.overallProgress)}%` }}
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
                {data.timelineMilestones.map((m, idx) => {
                  const pct = Math.round((idx / (data.timelineMilestones.length - 1)) * 90);
                  return (
                    <div
                      key={m.label}
                      className="absolute flex flex-col items-center"
                      style={{ left: `${pct}%`, transform: 'translate(-50%, -0%)' }}
                    >
                      <div className="relative">
                        <span
                          className={["absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block rounded-full", milestoneDot(m.status)].join(" ")}
                          style={{ width: 10, height: 10 }}
                        />
                      </div>
                      <div className="mt-3 text-[10px] ml-15  font-semibold text-slate-400">{m.date}</div>
                      <div className="mt-0.5 ml-15 text-[10px] font-semibold text-slate-600 text-center max-w-[140px]">{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {
         statsCardData.map((s) => (
          <StatCard key={String(s.label)} icon={s.icon} value={s.value} label={s.label} bodyClass={s.bodyClass} imgClass={s.imgClass} valueClass={s.valueClass} />
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-semibold text-slate-900">Progress Status</div>
          <div className="flex flex-wrap items-center gap-3">
            {data.progressLegend.map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <span className="size-2 rounded-full" style={{ backgroundColor: l.color }} aria-hidden="true" />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <CardBody>
          <div className="-mx-2 overflow-x-auto px-2">
                <div className="grid min-w-[1100px] grid-cols-10 gap-3">
              {data.progressStatusColumns.map((col) => (
                <div key={col.title} className="flex flex-col rounded-xl overflow-hidden">
                  <div className="rounded-xl text-center bg-[var(--color-brand-navy)] px-1 py-4 text-white">
                    <div className="text-xs font-semibold leading-tight">{col.title}</div>
                    <div className="mt-3 inline-block rounded-full text-base bg-white/10 px-4 py-1.5 font-semibold tabular-nums">{col.percent.toFixed(2)}%</div>
                  </div>
                  <div className="flex flex-col gap-3 pt-3 flex-1">
                    {col.items.map((it) => (
                      <div key={it.name} className="flex-1 flex flex-col items-center  rounded-xl border border-[var(--color-border)] bg-white px-3 py-4">
                        <div className="text-xs font-medium text-slate-600 text-center mb-3">{it.name}</div>
                        <div className="flex flex-wrap mt-auto mb-auto justify-center gap-2">
                          {it.dots.map((d, idx) => (
                            <span
                              key={idx}
                              className={[
                                "inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white",
                                dotTone(d),
                              ].join(" ")}
                            >
                              {idx + 1}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card>
          <CardHeader title="Overall Compliance Score" />
          <CardBody className="pt-2">
            <GaugeSemi value={data.overallCompliance} tone="red" label="Basic Standards 2025" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Top Performing Perspective Leaders" />
          <CardBody>
            <ul className="space-y-3">
              {data.topLeaders.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-200" aria-hidden="true" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{l.name}</div>
                      <div className="truncate text-xs text-slate-500">{l.perspective}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums text-slate-900">{l.score}%</div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Activities" />
          <CardBody>
            <ul className="space-y-3">
              {data.recentActivitiesV2.map((a) => (
                <li key={a.title} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{a.subtitle}</div>
                  </div>
                  <div className="shrink-0 text-[11px] font-medium text-slate-400">{a.ago}</div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader title="12-Month Performance" />
          <CardBody>
            <Bars12Month
              values={data.performance12Month.values}
              labels={data.performance12Month.labels}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Audit Readiness" />
          <CardBody className="pt-2">
            <GaugeSemi
              value={data.auditReadiness}
              tone="green"
              label="Readiness Level"
              footerLeft={{ label: "Overdue Stdts", value: "12" }}
              footerRight={{ label: "Missing Evidence", value: "5" }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

