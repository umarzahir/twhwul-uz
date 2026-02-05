import * as React from "react";
import type { Route } from "./+types/tracking";
import { trackingData, type TrackingRow } from "~/mocks/tracking";
import { Donut } from "~/ui/charts/Donut";
import { Badge } from "~/ui/primitives/Badge";
import { Card, CardBody, CardHeader } from "~/ui/primitives/Card";
import { ProgressBar } from "~/ui/primitives/ProgressBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tracking • Audit Platform" },
    {
      name: "description",
      content: "Tracking screen for evidence and control-level progress.",
    },
  ];
}

function statusTone(status: TrackingRow["status"]) {
  switch (status) {
    case "Done":
      return "green" as const;
    case "On track":
      return "blue" as const;
    case "At risk":
      return "amber" as const;
    case "Blocked":
      return "red" as const;
  }
}

function matchesFilter(row: TrackingRow, filter: string) {
  if (filter === "All") return true;
  if (filter === "At risk") return row.status === "At risk";
  if (filter === "Blocked") return row.status === "Blocked";
  if (filter === "Due soon") return ["Feb 09", "Feb 10", "Feb 12"].includes(row.due);
  return true;
}

export default function TrackingRoute() {
  const data = trackingData;
  const [filter, setFilter] = React.useState<string>(data.filters[0] ?? "All");

  const rows = React.useMemo(
    () => data.rows.filter((r) => matchesFilter(r, filter)),
    [data.rows, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-500">{data.subtitle}</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {data.title}
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Filter and review control items, evidence counts, and blockers. This uses
            mocked static data (no backend).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "rounded-full px-3 py-2 text-xs font-semibold ring-1 ring-inset transition",
                filter === f
                  ? "bg-slate-900 text-white ring-slate-900"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Control items"
            subtitle={`Showing ${rows.length} of ${data.rows.length} items`}
            right={<Badge tone="slate">Filter: {filter}</Badge>}
          />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
                    <th className="px-4 py-3">Control</th>
                    <th className="px-4 py-3">Perspective</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Due</th>
                    <th className="px-4 py-3">Evidence</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <div className="text-xs font-semibold text-slate-500">{r.id}</div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">
                          {r.control}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{r.notes}</div>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <div className="text-sm text-slate-700">{r.perspective}</div>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <div className="text-sm text-slate-700">{r.owner}</div>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <div className="text-sm text-slate-700">{r.due}</div>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <Badge tone="slate">{r.evidence} items</Badge>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 align-top">
                        <div className="w-[220px]">
                          <ProgressBar value={r.progress} />
                          <div className="mt-2 text-xs tabular-nums text-slate-500">
                            {r.progress}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {data.summary.map((s) => (
              <Card key={s.label}>
                <CardBody>
                  <div className="text-xs font-semibold text-slate-500">{s.label}</div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                    {s.value}
                  </div>
                  <Badge className="mt-2" tone={s.tone}>
                    Summary
                  </Badge>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader
              title="Readiness snapshot"
              subtitle="Fast health indicators for tracking"
              right={<Badge tone="green">{data.sidePanel.readiness}%</Badge>}
            />
            <CardBody className="space-y-4">
              <Donut
                value={data.sidePanel.readiness}
                label="Readiness"
                sublabel="Tracking score"
                tone="green"
              />

              <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">Key risks</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {data.sidePanel.keyRisks.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose-600" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">Next actions</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {data.sidePanel.nextActions.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

