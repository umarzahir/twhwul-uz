import * as React from "react";
import { NavLink, useSearchParams } from "react-router";
import type { Route } from "./+types/details";
import { detailsData } from "~/mocks/details";
import { Badge } from "~/ui/primitives/Badge";
import { Card, CardBody, CardHeader } from "~/ui/primitives/Card";
import CircularProgress from "~/ui/primitives/CircularProgress";

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
  const detailsCardData = [
            { icon: "/hugeicons_file-security.svg", value: data.evidenceSummary.total, label: "Total Evidence" },
            { icon: "/hugeicons_file-security.svg", value: data.evidenceSummary.inProgress, label: "In Progress" },
            { icon: "/hugeicons_file-security.svg", value: data.evidenceSummary.underReview, label: "Under Review" },
            { icon: "/hugeicons_file-security.svg", value: data.evidenceSummary.completed, label: "Completed" },
          ]
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

  const overviewSections = [
    {
      id: "objective",
      title: "Objective",
      content: (
        <p className="mt-2 text-sm text-slate-700">{data.overview.objective}</p>
      ),
    },
    {
      id: "requirements",
      title: "Implementation Requirements",
      content: (
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {data.overview.requirements.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "evidence-docs",
      title: "Evidence Documents",
      content: (
        <div className="mt-2 text-sm text-slate-700">Refer to the Evidence tab for full document list and details.</div>
      ),
    },
    {
      id: "references",
      title: "Related Regulations",
      content: (
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {data.overview.references.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose-500" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "scope",
      title: "Scope",
      content: (
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {data.overview.scope.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-600" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ] as const;

  return (
    <div className="space-y-6">
        <Card>
      <div className=" px-4 py-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex px-2 py-1 max-w-34 rounded-full bg-slate-100 flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{data.category}</span>
          </div>
          <h1 className="mt-1 text-1xl font-semibold tracking-tight text-slate-900">
            {data.title}
          </h1>
          <p className="mt-1 max-w-4xl text-sm text-slate-500">
            {data.description}
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center justify-end">
            <CircularProgress value={data.progress} size={85} strokeWidth={8} className="mr-2" />
          </div>
        </div>

      </div>
        </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {
          detailsCardData.map((s) => (
            <Card key={s.label}>
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full text-white">
                    <img src={s.icon} alt={s.label} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">{s.value}</div>
                    <div className="text-xs font-medium text-slate-500">{s.label}</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        }
      </div>

      <>
        <div className=" px-5">
          <div className="flex">
            <div className="rounded-full bg-slate-100 p-1 inline-flex gap-1">
              <button
                type="button"
                onClick={() => setTab("overview")}
                className={
                  tab === "overview"
                    ? "px-4 py-1 rounded-full bg-white text-slate-900 shadow-sm text-sm font-semibold"
                    : "px-4 py-1 rounded-full text-slate-500 text-sm font-semibold"
                }
              >
                Overview
              </button>

              <button
                type="button"
                onClick={() => setTab("evidence")}
                className={
                  tab === "evidence"
                    ? "px-4 py-1 rounded-full bg-white text-slate-900 shadow-sm text-sm font-semibold"
                    : "px-4 py-1 rounded-full text-slate-500 text-sm font-semibold"
                }
              >
                Evidence
              </button>
            </div>
          </div>
        </div>

        <CardBody>
          {tab === "overview" ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[200px_1fr]">
              <div className="space-y-3">
                {overviewSections.map((s) => (
                  <div key={s.id} className="px-2">
                    <a href={`#${s.id}`} className="block rounded-lg border border-slate-200 bg-gray-50 px-4 py-3 text-sm text-slate-600 hover:shadow">{s.title}</a>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {overviewSections.map((s) => (
                  <section id={s.id} key={s.id} className="rounded-2xl border border-slate-200 bg-gray-50 px-4 py-4">
                    <div className="text-xs font-semibold text-slate-500">{s.title}</div>
                    {s.content}
                  </section>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="flex items-start justify-between">
                      <div className="text-sm font-semibold text-slate-900">Comments</div>
                    </div>

                    <ul className="mt-4 space-y-4">
                      <li className="flex gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-slate-300 text-xs font-semibold text-white">SI</div>
                        <div className="min-w-0">
                          <div className="flex min-w-['100%'] items-center justify-between">
                            <div className="truncate text-sm font-semibold text-slate-900">Sara Ibrahim</div>
                            <div className="text-xs text-slate-400 ml-auto">2025-08-05</div>
                          </div>
                          <div className="mt-2 text-sm text-slate-700">Ensure The Plan Includes A Clear Governance Model.</div>
                        </div>
                      </li>

                      <li className="flex gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-slate-300 text-xs font-semibold text-white">MH</div>
                        <div className="min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="truncate text-sm font-semibold text-slate-900">Mona Hamed</div>
                            <div className="text-xs text-slate-400">2025-08-05</div>
                          </div>
                          <div className="mt-2 text-sm text-slate-700">Ensure The Plan Includes A Clear Governance Model.</div>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-4">
                      <textarea rows={3} className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700" placeholder="Write a comment..." />
                      <div className="mt-3 flex justify-start">
                        <button className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white">Post Comment</button>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="md:col-span-1">
                  <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">Recent Activities</div>
                    <ul className="mt-3 space-y-3 text-sm text-slate-700">
                      <li className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                          <div>
                            <div className="font-semibold text-slate-900">Roadmap_Version1.Docx</div>
                            <div className="text-xs text-slate-500">Uploaded By Rami AlSharif</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">5 Mins Ago</div>
                      </li>

                      <li className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                          <div>
                            <div className="font-semibold text-slate-900">KPI_Framework.Xlsx</div>
                            <div className="text-xs text-slate-500">Uploaded By Mona Hamed</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">20 Mins Ago</div>
                      </li>

                      <li className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                          <div>
                            <div className="font-semibold text-slate-900">Digital_Transformation_Plan.Pdf</div>
                            <div className="text-xs text-slate-500">Approved By Advisory Team</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">1 Hour Ago</div>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          )}
        </CardBody>

       {tab === "overview" &&  <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">Leaders</div>
                  <ul className=" flex mt-4 space-y-3">
                    {data.leaders.map((l) => (
                      <li key={l.name} className="flex min-w-[220px] items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">{initials(l.name)}</div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{l.name}</div>
                          <div className="truncate text-xs text-slate-500">{l.role} • {l.org}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>}
      </>
    </div>
  );
}

