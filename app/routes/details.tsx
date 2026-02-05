import * as React from "react";
import { NavLink, useSearchParams } from "react-router";
import type { Route } from "./+types/details";
import { detailsData } from "~/mocks/details";
import { Badge } from "~/ui/primitives/Badge";
import { Card, CardBody, CardHeader } from "~/ui/primitives/Card";
import { ProgressBar } from "~/ui/primitives/ProgressBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details • Audit Platform" },
    {
      name: "description",
      content: "Detail view for a strategic planning control area.",
    },
  ];
}

function statusTone(status: (typeof detailsData.evidence)[number]["status"]) {
  switch (status) {
    case "Completed":
      return "green" as const;
    case "Under review":
      return "purple" as const;
    case "In progress":
      return "amber" as const;
    case "Not started":
      return "slate" as const;
  }
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function DetailsRoute() {
  const data = detailsData;
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "evidence" ? "evidence" : "overview";

  const setTab = React.useCallback(
    (next: "overview" | "evidence") => {
      const sp = new URLSearchParams(searchParams);
      if (next === "overview") sp.delete("tab");
      else sp.set("tab", "evidence");
      setSearchParams(sp, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{data.category}</span>
            <span aria-hidden="true">•</span>
            <span>Control area</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {data.title}
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            {data.description}
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-medium">Progress</span>
            <span className="tabular-nums font-semibold">{data.progress}%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={data.progress} />
          </div>
        </div>
      </div>

      {/* Evidence summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardBody>
            <div className="text-xs font-semibold text-slate-500">Total</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {data.evidenceSummary.total}
            </div>
            <div className="mt-2 text-xs text-slate-500">Evidence items</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs font-semibold text-slate-500">In progress</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {data.evidenceSummary.inProgress}
            </div>
            <Badge tone="amber" className="mt-2">
              Active work
            </Badge>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs font-semibold text-slate-500">Under review</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {data.evidenceSummary.underReview}
            </div>
            <Badge tone="purple" className="mt-2">
              Pending approval
            </Badge>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs font-semibold text-slate-500">Completed</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {data.evidenceSummary.completed}
            </div>
            <Badge tone="green" className="mt-2">
              Accepted
            </Badge>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs font-semibold text-slate-500">Not started</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {data.evidenceSummary.notStarted}
            </div>
            <Badge tone="slate" className="mt-2">
              Backlog
            </Badge>
          </CardBody>
        </Card>
      </div>

      {/* Tabs + content */}
      <Card>
        <CardHeader
          title="Details"
          subtitle="Overview content and evidence tracking"
          right={<Badge tone="slate">Static data</Badge>}
        />
        <div className="border-b border-slate-200 px-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab("overview")}
              className={[
                "relative -mb-px border-b-2 px-3 py-3 text-sm font-semibold",
                tab === "overview"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setTab("evidence")}
              className={[
                "relative -mb-px border-b-2 px-3 py-3 text-sm font-semibold",
                tab === "evidence"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              Evidence
            </button>
          </div>
        </div>

        <CardBody>
          {tab === "overview" ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
              <div className="space-y-5">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="text-xs font-semibold text-slate-500">
                    Objective
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{data.overview.objective}</p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-xs font-semibold text-slate-500">
                    Requirements
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {data.overview.requirements.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-slate-900" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-xs font-semibold text-slate-500">
                      Scope
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {data.overview.scope.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-xs font-semibold text-slate-500">
                      Exclusions
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {data.overview.exclusions.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose-600" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-xs font-semibold text-slate-500">
                    References
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.overview.references.map((ref) => (
                      <Badge key={ref} tone="slate">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">
                      Leaders / owners
                    </div>
                    <Badge tone="blue">{data.leaders.length} leads</Badge>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {data.leaders.map((l) => (
                      <li key={l.name} className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
                          {initials(l.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">
                            {l.name}
                          </div>
                          <div className="truncate text-xs text-slate-500">
                            {l.role} • {l.org}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="text-xs font-semibold text-slate-500">
                    Quick links
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <NavLink to="/dashboard" className="block text-slate-900 hover:underline">
                      Back to dashboard
                    </NavLink>
                    <NavLink to="/tracking" className="block text-slate-900 hover:underline">
                      Evidence tracking
                    </NavLink>
                  </div>
                </section>
              </aside>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Evidence items
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="slate">Filter: All</Badge>
                  <Badge tone="slate">Sort: Due date</Badge>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="hidden grid-cols-[120px_1.4fr_140px_120px_140px] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500 md:grid">
                  <div>ID</div>
                  <div>Evidence</div>
                  <div>Owner</div>
                  <div>Due</div>
                  <div>Status</div>
                </div>

                <ul className="divide-y divide-slate-200">
                  {data.evidence.map((e) => (
                    <li key={e.id} className="px-4 py-3">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-[120px_1.4fr_140px_120px_140px] md:items-center">
                        <div className="text-xs font-semibold text-slate-500">
                          {e.id}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">
                            {e.title}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <Badge tone="slate">{e.tag}</Badge>
                          </div>
                        </div>
                        <div className="text-sm text-slate-700">{e.owner}</div>
                        <div className="text-sm text-slate-700">{e.due}</div>
                        <div>
                          <Badge tone={statusTone(e.status)}>{e.status}</Badge>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

