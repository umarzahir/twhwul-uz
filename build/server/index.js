import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLocation, NavLink, redirect, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details2 = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details2 = error.status === 404 ? "The requested page could not be found." : error.statusText || details2;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details2
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-18v7h7V2h-7Z"
      }
    ) })
  },
  {
    to: "/details",
    label: "Perspectives",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M11 2a9 9 0 1 0 9 9h2A11 11 0 1 1 11 0v2Zm2 0v2.07A7 7 0 0 1 20.93 11H19a5 5 0 0 0-6-6Z"
      }
    ) })
  },
  {
    to: "/details?tab=evidence",
    label: "Documents",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L13 3.5ZM8 12h8v-2H8v2Zm0 4h8v-2H8v2Zm0 4h6v-2H8v2Z"
      }
    ) })
  }
];
function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navCollapsed, setNavCollapsed] = React.useState(false);
  const location = useLocation();
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  const gridColsClass = navCollapsed ? "lg:grid-cols-[64px_1fr]" : "lg:grid-cols-[260px_1fr]";
  return /* @__PURE__ */ jsx("div", { className: "min-h-dvh bg-[var(--color-app-bg)] text-slate-900", children: /* @__PURE__ */ jsxs("div", { className: ["grid min-h-dvh grid-cols-1", gridColsClass].join(" "), children: [
    /* @__PURE__ */ jsx("aside", { className: "relative overflow-visible hidden bg-[var(--color-brand-navy)] text-slate-100 lg:sticky lg:top-0 lg:block lg:h-dvh", children: /* @__PURE__ */ jsxs("div", { className: "flex h-dvh flex-col px-4 py-5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": navCollapsed ? "Expand sidebar" : "Collapse sidebar",
          onClick: () => setNavCollapsed((s) => !s),
          className: "absolute -right-4 top-4 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-slate-700 shadow-lg lg:inline-flex",
          children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: navCollapsed ? /* @__PURE__ */ jsx("path", { fill: "white", d: "M9 6l6 6-6 6V6z" }) : /* @__PURE__ */ jsx("path", { fill: "white", d: "M15 6l-6 6 6 6V6z" }) })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-2", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("span", { className: "inline-block size-2.5 rotate-45 bg-rose-500", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold tracking-wide", children: "TAHWUL" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "mt-6 flex-1", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: item.to, className: "block", children: ({ isActive }) => {
        const base = [
          "flex items-center gap-3 rounded-lg py-2.5 text-sm transition",
          isActive ? "bg-[var(--color-brand-navy-2)] text-white" : "text-slate-200 hover:bg-white/5 hover:text-white"
        ];
        if (navCollapsed) base.push("justify-center px-2");
        else base.push("px-3");
        return /* @__PURE__ */ jsxs("div", { className: base.join(" "), children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-200", children: item.icon }),
          !navCollapsed && /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.label })
        ] });
      } }) }, item.to)) }) })
    ] }) }),
    mobileOpen ? /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-40 lg:hidden", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0 bg-slate-950/30",
          "aria-label": "Close navigation menu",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-[var(--color-brand-navy)] text-slate-100 shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block size-2.5 rotate-45 bg-rose-500", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold tracking-wide", children: "TAHWUL" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "inline-flex size-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 active:bg-white/20",
              "aria-label": "Close navigation menu",
              onClick: () => setMobileOpen(false),
              children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "px-3 pb-4", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: item.to, className: "block", children: ({ isActive }) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: [
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
              isActive ? "bg-[var(--color-brand-navy-2)] text-white" : "text-slate-200 hover:bg-white/5 hover:text-white"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: [
                    "inline-flex size-9 items-center justify-center rounded-lg",
                    isActive ? "bg-white/10 text-white" : "bg-white/5 text-slate-200"
                  ].join(" "),
                  children: item.icon
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-semibold", children: item.label }) })
            ]
          }
        ) }) }, item.to)) }) })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b border-[var(--color-border)] bg-white", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 lg:px-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "inline-flex size-10 items-center justify-center rounded-lg bg-white text-slate-700 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50 lg:hidden",
            "aria-label": "Open navigation menu",
            "aria-expanded": mobileOpen,
            onClick: () => setMobileOpen(true),
            children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
              "path",
              {
                fill: "currentColor",
                d: "M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden text-sm font-semibold text-slate-600 lg:block" }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[320px]", children: [
            /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-4", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
              "path",
              {
                fill: "currentColor",
                d: "M10 2a8 8 0 1 0 5.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
              }
            ) }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search",
                className: "w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-[var(--color-brand-blue)]"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "inline-flex size-10 items-center justify-center rounded-lg text-slate-600 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50",
              "aria-label": "Notifications",
              children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z"
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50",
              children: [
                /* @__PURE__ */ jsx("span", { className: "inline-flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700", children: "M" }),
                /* @__PURE__ */ jsx("span", { className: "hidden md:block", children: "Mohamed" }),
                /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "size-4 text-slate-500", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M7 10l5 5 5-5H7Z" }) })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "min-w-0 px-4 py-5 lg:px-6 lg:py-6 bg-[var(--color-surface)]", children })
    ] })
  ] }) });
}
const appShell = UNSAFE_withComponentProps(function AppShellRoute() {
  return /* @__PURE__ */ jsx(AppShell, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: appShell
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Audit Dashboard"
  }, {
    name: "description",
    content: "Audit readiness and compliance tracking"
  }];
}
function loader() {
  return redirect("/dashboard");
}
const home = UNSAFE_withComponentProps(function Home() {
  return null;
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const dashboardData = {
  overallCompliance: 65,
  auditReadiness: 80,
  uploadedToDga: 258,
  totalCriteria: 95,
  completedCriteria: 52,
  evidenceDocs: { total: 1136 },
  evidenceCompleted: 302,
  overallProgress: 28.65,
  timelineMilestones: [
    { date: "Mar 17", label: "Kickoff Workshop", status: "done" },
    { date: "March 18", label: "Data Collection", status: "done" },
    { date: "May 8", label: "Initial Phase", status: "delayed" },
    { date: "May 9–July 12", label: "Verification", status: "delayed" },
    { date: "July 13", label: "Completion Reviews", status: "delayed" },
    { date: "August 21", label: "Cycle Conclusion", status: "delayed" }
  ],
  progressLegend: [
    { label: "Not Started", color: "#9aa7b4" },
    { label: "In Progress", color: "#f59e0b" },
    { label: "Completed", color: "#22c55e" },
    { label: "Partially Uploaded", color: "#1f5eff" },
    { label: "Fully Uploaded", color: "#0ea5e9" },
    { label: "Delayed", color: "#ef4444" }
  ],
  progressStatusColumns: [
    {
      title: "Strategy And Planning",
      percent: 97.78,
      items: [
        { name: "Digital Transformation", dots: ["completed", "completed", "completed"] },
        { name: "Digital Governance", dots: ["completed", "completed", "in_progress"] },
        { name: "Enterprise Architecture", dots: ["completed", "completed", "completed", "completed"] }
      ]
    },
    {
      title: "Organization And Culture",
      percent: 70.83,
      items: [
        { name: "Digital Culture And Environment", dots: ["completed", "in_progress", "completed"] },
        { name: "Leadership Development", dots: ["completed", "completed", "completed", "in_progress"] },
        { name: "Skills & Capacity Building", dots: ["in_progress", "in_progress", "in_progress"] }
      ]
    },
    {
      title: "Operations And Execution",
      percent: 80,
      items: [{ name: "Business Processes", dots: ["in_progress", "completed"] }]
    },
    {
      title: "Business Continuity",
      percent: 90.95,
      items: [
        { name: "Risk Management", dots: ["completed", "completed", "completed", "completed", "completed"] },
        { name: "Business Continuity", dots: ["completed", "partially_uploaded", "not_started", "not_started", "not_started", "not_started", "not_started"] }
      ]
    },
    {
      title: "Information Technology",
      percent: 75,
      items: [
        { name: "Support Systems", dots: ["completed", "partially_uploaded", "completed", "completed", "completed"] },
        { name: "IT Infrastructure", dots: ["completed", "completed", "completed", "completed", "partially_uploaded", "completed", "completed"] },
        { name: "Cloud Infrastructure", dots: ["completed", "completed", "fully_uploaded"] }
      ]
    },
    {
      title: "Comprehensive Governance",
      percent: 64.44,
      items: [
        { name: "Governance Platforms", dots: ["completed", "completed"] },
        { name: "Stakeholder engagement", dots: ["completed", "completed", "completed", "completed"] },
        { name: "Digital Governance", dots: ["completed", "completed", "completed"] }
      ]
    },
    {
      title: "Channels And Services",
      percent: 100,
      items: [
        { name: "Service Quality", dots: ["completed", "completed"] },
        { name: "Digital Channels", dots: ["completed", "completed", "completed", "completed"] }
      ]
    },
    {
      title: "Beneficiary Centralization",
      percent: 60,
      items: [
        { name: "User Engagement", dots: ["completed", "in_progress", "in_progress"] },
        { name: "User Relationship", dots: ["completed", "in_progress", "completed"] },
        { name: "Trust Experience", dots: ["in_progress", "completed", "completed", "in_progress", "completed"] }
      ]
    },
    {
      title: "Government Data",
      percent: 87.5,
      items: [
        { name: "Data Governance", dots: ["completed", "in_progress", "completed", "completed"] },
        { name: "Data Usage & Availability", dots: ["completed", "in_progress", "completed", "in_progress"] },
        { name: "Open Data", dots: ["in_progress", "delayed"] }
      ]
    },
    {
      title: "Research And Innovation",
      percent: 17.65,
      items: [
        { name: "Innovation", dots: ["delayed", "delayed", "delayed", "delayed"] },
        { name: "Creative Solutions", dots: ["in_progress", "delayed"] }
      ]
    }
  ],
  topLeaders: [
    { name: "Ahmed Al-Ali", perspective: "Strategy Perspective", score: 96 },
    { name: "Sarah Al-Khaled", perspective: "Beneficiary Perspective", score: 94 },
    { name: "Mohammad Al-Mansour", perspective: "IT Perspective", score: 92 }
  ],
  recentActivitiesV2: [
    {
      title: 'Document "Strategy_Review.Pdf"',
      subtitle: "Was Uploaded By Ahmed Khaled",
      ago: "5 Mins Ago"
    },
    {
      title: 'Task "Review Compliance Files"',
      subtitle: "Was Assigned To Mona Hamed",
      ago: "20 Mins Ago"
    },
    {
      title: 'New Criterion "5.3 Digital Identity"',
      subtitle: "Was Created By Admin",
      ago: "1 Hour Ago"
    }
  ],
  performance12Month: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    values: [88, 72, 80, 90, 76, 52, 86, 78, 54, 88, 92, 76]
  }
};
function Card({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: [
        "rounded-md border border border-[var(--color-border)] bg-[var(--color-surface)]",
        className
      ].join(" "),
      children
    }
  );
}
function CardHeader({
  title,
  subtitle,
  right
}) {
  return /* @__PURE__ */ jsxs("header", { className: "flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-semibold text-slate-900", children: title }),
      subtitle ? /* @__PURE__ */ jsx("div", { className: "mt-1 line-clamp-2 text-xs text-slate-500", children: subtitle }) : null
    ] }),
    right ? /* @__PURE__ */ jsx("div", { className: "shrink-0", children: right }) : null
  ] });
}
function CardBody({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx("div", { className: ["px-5 py-4", className].join(" "), children });
}
function StatCard({ icon, value, label, bodyClass = "py-3 relative", imgClass = "absolute right-3 top-5 w-6 h-6", valueClass = "text-2xl" }) {
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardBody, { className: bodyClass, children: [
    /* @__PURE__ */ jsx("img", { src: icon, alt: label, className: imgClass }),
    /* @__PURE__ */ jsx("div", { className: [valueClass, "font-semibold tabular-nums text-slate-900"].join(" "), children: value }),
    /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-[11px] font-medium text-slate-400", children: label })
  ] }) });
}
function GaugeSemi({
  value,
  tone = "green",
  label,
  footerLeft,
  footerRight
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const color = tone === "red" ? "#dc2626" : tone === "blue" ? "#1f5eff" : "#16a34a";
  const radius = 90;
  const pathLen = Math.PI * radius;
  const dashOffset = pathLen * (1 - v / 100);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-[320px]", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 200 100", className: "w-full h-auto", preserveAspectRatio: "xMidYMid meet", "aria-hidden": true, children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: `M 10 100 A ${radius} ${radius} 0 0 1 190 100`,
            fill: "none",
            stroke: "#e9eff7",
            strokeWidth: 10,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: `M 10 100 A ${radius} ${radius} 0 0 1 190 100`,
            fill: "none",
            stroke: color,
            strokeWidth: 10,
            strokeLinecap: "round",
            strokeDasharray: pathLen,
            strokeDashoffset: dashOffset,
            pathLength: pathLen
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2", children: /* @__PURE__ */ jsxs("div", { className: "text-[35px] font-bold tabular-nums text-slate-900", children: [
          v,
          "%"
        ] }) }),
        label ? /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-slate-400", children: label }) : null
      ] })
    ] }) }),
    footerLeft || footerRight ? /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-border)] bg-white px-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold text-slate-500", children: footerLeft?.label ?? "" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-semibold text-slate-900", children: footerLeft?.value ?? "" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-border)] bg-white px-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold text-slate-500", children: footerRight?.label ?? "" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-semibold text-slate-900", children: footerRight?.value ?? "" })
      ] })
    ] }) : null
  ] });
}
function Bars12Month({
  values,
  labels
}) {
  const max = 100;
  const ticks = [100, 80, 60, 40, 20, 0];
  const containerHeight = 176;
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 flex flex-col items-end pr-2 text-sm text-slate-400", children: ticks.map((t) => /* @__PURE__ */ jsx("div", { className: "h-8 flex items-center", children: t }, t)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", style: { height: `${containerHeight}px` }, children: [
        ticks.map((_, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute left-0 right-0 border-t border-slate-100",
            style: { top: `${idx / (ticks.length - 1) * 100}%` }
          },
          idx
        )),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-end gap-3 px-2", children: values.slice(0, 12).map((v, idx) => {
          const h = Math.min(100, Math.max(0, v / max * 100));
          const heightPx = Math.round(h / 100 * containerHeight);
          return /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-end", children: /* @__PURE__ */ jsx("div", { className: "w-full flex items-end", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-full rounded-t-lg",
              style: {
                height: `${heightPx}px`,
                background: "linear-gradient(180deg, rgba(31,94,255,0.95) 0%, rgba(31,94,255,0.08) 100%)"
              },
              "aria-hidden": "true"
            }
          ) }) }, idx);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-12 gap-3 text-[11px] font-medium text-slate-400", children: labels.slice(0, 12).map((m) => /* @__PURE__ */ jsx("div", { className: "text-center", children: m }, m)) })
    ] })
  ] }) });
}
function meta$1({}) {
  return [{
    title: "Dashboard • Audit Platform"
  }, {
    name: "description",
    content: "Dashboard showing readiness, progress, and recent activities."
  }];
}
function dotTone(t) {
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
function milestoneDot(status) {
  return status === "done" ? "bg-white" : "bg-red-500";
}
const dashboard = UNSAFE_withComponentProps(function DashboardRoute() {
  const data = dashboardData;
  const statsCardData = [{
    icon: "/hugeicons_chart-bar-line.svg",
    value: /* @__PURE__ */ jsxs(Fragment, {
      children: [data.overallProgress.toFixed(2), "%"]
    }),
    label: "Overall Progress",
    bodyClass: "py-0 relative",
    imgClass: "absolute right-3 top-5 w-6 h-6",
    valueClass: "text-2xl"
  }, {
    icon: "/hugeicons_folder-01.svg",
    value: /* @__PURE__ */ jsx(Fragment, {
      children: data.totalCriteria
    }),
    label: "Total Criteria",
    bodyClass: "py-0 relative"
  }, {
    icon: "/hugeicons_folder-check.svg",
    value: /* @__PURE__ */ jsx(Fragment, {
      children: data.completedCriteria
    }),
    label: "Completed Criteria"
  }, {
    icon: "/hugeicons_file-security.svg",
    value: /* @__PURE__ */ jsx(Fragment, {
      children: data.evidenceDocs.total
    }),
    label: "Evidence Documents"
  }, {
    icon: "/hugeicons_file-verified.svg",
    value: /* @__PURE__ */ jsx(Fragment, {
      children: data.evidenceCompleted
    }),
    label: "Evidence (Completed)"
  }, {
    icon: "/hugeicons_file-upload.svg",
    value: /* @__PURE__ */ jsx(Fragment, {
      children: data.uploadedToDga
    }),
    label: "Uploaded To DGA"
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-4",
    children: [/* @__PURE__ */ jsxs(Card, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between px-5 py-2",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-sm font-semibold text-slate-900",
          children: "Project Timeline"
        }), /* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-slate-600",
          children: ["2026", /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 24 24",
            className: "size-4 text-slate-400",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("path", {
              fill: "currentColor",
              d: "M7 10l5 5 5-5H7Z"
            })
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "px-5 pb-5",
        children: /* @__PURE__ */ jsx("div", {
          className: "rounded-lg bg-white px-4 py-4 mb-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx("div", {
              className: "h-3 w-full rounded-full bg-slate-100"
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute left-0 top-1/2 -translate-y-1/2 rounded-full h-3 bg-emerald-500",
              style: {
                width: `${Math.round(data.overallProgress)}%`
              },
              "aria-hidden": "true"
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none",
              children: data.timelineMilestones.map((m, idx) => {
                const pct = Math.round(idx / (data.timelineMilestones.length - 1) * 90);
                return /* @__PURE__ */ jsxs("div", {
                  className: "absolute flex flex-col items-center",
                  style: {
                    left: `${pct}%`,
                    transform: "translate(-50%, -0%)"
                  },
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "relative",
                    children: /* @__PURE__ */ jsx("span", {
                      className: ["absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block rounded-full", milestoneDot(m.status)].join(" "),
                      style: {
                        width: 10,
                        height: 10
                      }
                    })
                  }), /* @__PURE__ */ jsx("div", {
                    className: "mt-3 text-[10px] ml-15  font-semibold text-slate-400",
                    children: m.date
                  }), /* @__PURE__ */ jsx("div", {
                    className: "mt-0.5 ml-15 text-[10px] font-semibold text-slate-600 text-center max-w-[140px]",
                    children: m.label
                  })]
                }, m.label);
              })
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
      children: statsCardData.map((s) => /* @__PURE__ */ jsx(StatCard, {
        icon: s.icon,
        value: s.value,
        label: s.label,
        bodyClass: s.bodyClass,
        imgClass: s.imgClass,
        valueClass: s.valueClass
      }, String(s.label)))
    }), /* @__PURE__ */ jsxs(Card, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-3 border-b border-[var(--color-border)] px-5 py-4 md:flex-row md:items-center md:justify-between",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-sm font-semibold text-slate-900",
          children: "Progress Status"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-wrap items-center gap-3",
          children: data.progressLegend.map((l) => /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 text-[11px] font-medium text-slate-500",
            children: [/* @__PURE__ */ jsx("span", {
              className: "size-2 rounded-full",
              style: {
                backgroundColor: l.color
              },
              "aria-hidden": "true"
            }), /* @__PURE__ */ jsx("span", {
              children: l.label
            })]
          }, l.label))
        })]
      }), /* @__PURE__ */ jsx(CardBody, {
        children: /* @__PURE__ */ jsx("div", {
          className: "-mx-2 overflow-x-auto px-2",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid min-w-[1100px] grid-cols-10 gap-3",
            children: data.progressStatusColumns.map((col) => /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col rounded-xl overflow-hidden",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "rounded-xl text-center bg-[var(--color-brand-navy)] px-1 py-4 text-white",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-xs font-semibold leading-tight",
                  children: col.title
                }), /* @__PURE__ */ jsxs("div", {
                  className: "mt-3 inline-block rounded-full text-base bg-white/10 px-4 py-1.5 font-semibold tabular-nums",
                  children: [col.percent.toFixed(2), "%"]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-col gap-3 pt-3 flex-1",
                children: col.items.map((it) => /* @__PURE__ */ jsxs("div", {
                  className: "flex-1 flex flex-col items-center  rounded-xl border border-[var(--color-border)] bg-white px-3 py-4",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-xs font-medium text-slate-600 text-center mb-3",
                    children: it.name
                  }), /* @__PURE__ */ jsx("div", {
                    className: "flex flex-wrap mt-auto mb-auto justify-center gap-2",
                    children: it.dots.map((d, idx) => /* @__PURE__ */ jsx("span", {
                      className: ["inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white", dotTone(d)].join(" "),
                      children: idx + 1
                    }, idx))
                  })]
                }, it.name))
              })]
            }, col.title))
          })
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 gap-3 lg:grid-cols-3",
      children: [/* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          title: "Overall Compliance Score"
        }), /* @__PURE__ */ jsx(CardBody, {
          className: "pt-2",
          children: /* @__PURE__ */ jsx(GaugeSemi, {
            value: data.overallCompliance,
            tone: "red",
            label: "Basic Standards 2025"
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          title: "Top Performing Perspective Leaders"
        }), /* @__PURE__ */ jsx(CardBody, {
          children: /* @__PURE__ */ jsx("ul", {
            className: "space-y-3",
            children: data.topLeaders.map((l) => /* @__PURE__ */ jsxs("li", {
              className: "flex items-center justify-between gap-3",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "size-10 rounded-full bg-slate-200",
                  "aria-hidden": "true"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "min-w-0",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "truncate text-sm font-semibold text-slate-900",
                    children: l.name
                  }), /* @__PURE__ */ jsx("div", {
                    className: "truncate text-xs text-slate-500",
                    children: l.perspective
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-sm font-semibold tabular-nums text-slate-900",
                children: [l.score, "%"]
              })]
            }, l.name))
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          title: "Recent Activities"
        }), /* @__PURE__ */ jsx(CardBody, {
          children: /* @__PURE__ */ jsx("ul", {
            className: "space-y-3",
            children: data.recentActivitiesV2.map((a) => /* @__PURE__ */ jsxs("li", {
              className: "flex items-start justify-between gap-3",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "min-w-0",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-sm font-semibold text-slate-900",
                  children: a.title
                }), /* @__PURE__ */ jsx("div", {
                  className: "mt-1 text-xs text-slate-500",
                  children: a.subtitle
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "shrink-0 text-[11px] font-medium text-slate-400",
                children: a.ago
              })]
            }, a.title))
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]",
      children: [/* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          title: "12-Month Performance"
        }), /* @__PURE__ */ jsx(CardBody, {
          children: /* @__PURE__ */ jsx(Bars12Month, {
            values: data.performance12Month.values,
            labels: data.performance12Month.labels
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          title: "Audit Readiness"
        }), /* @__PURE__ */ jsx(CardBody, {
          className: "pt-2",
          children: /* @__PURE__ */ jsx(GaugeSemi, {
            value: data.auditReadiness,
            tone: "green",
            label: "Readiness Level",
            footerLeft: {
              label: "Overdue Stdts",
              value: "12"
            },
            footerRight: {
              label: "Missing Evidence",
              value: "5"
            }
          })
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const detailsData = {
  title: "Digital Transformation Strategic Planning",
  category: "Strategy & Planning",
  progress: 100,
  description: "Define objectives, scope, governance, and evidence required for strategic planning controls.",
  evidenceSummary: {
    total: 24,
    inProgress: 9,
    underReview: 5,
    completed: 7
  },
  overview: {
    objective: "Ensure strategic planning activities are documented, aligned to business priorities, and measurable through a defined governance model.",
    requirements: [
      "Approved transformation roadmap with milestones",
      "Stakeholder RACI and governance cadence",
      "Risk assessment and compliance considerations",
      "Defined KPIs and measurement approach"
    ],
    scope: [
      "Strategy & portfolio planning",
      "Program governance",
      "Benefits tracking",
      "Risk & compliance alignment"
    ],
    references: [
      "ISO 27001: A.5 / A.6",
      "NCA ECC (Saudi) – Governance & Compliance",
      "Internal policy: DT-STRAT-001"
    ]
  },
  leaders: [
    { name: "A. Saleh", role: "Program Owner", org: "PMO" },
    { name: "R. Nasser", role: "Compliance Lead", org: "GRC" },
    { name: "S. Alharthi", role: "IT Lead", org: "Technology" }
  ],
  evidence: [
    {
      id: "EV-001",
      title: "Approved transformation roadmap (Q1–Q4)",
      owner: "PMO",
      due: "Feb 10",
      status: "Under review",
      tag: "Roadmap"
    },
    {
      id: "EV-002",
      title: "Governance charter and meeting cadence",
      owner: "GRC",
      due: "Feb 08",
      status: "Completed",
      tag: "Governance"
    },
    {
      id: "EV-003",
      title: "Strategic KPIs & measurement plan",
      owner: "PMO",
      due: "Feb 14",
      status: "In progress",
      tag: "KPI"
    },
    {
      id: "EV-004",
      title: "Risk assessment summary (DT initiatives)",
      owner: "GRC",
      due: "Feb 16",
      status: "Not started",
      tag: "Risk"
    },
    {
      id: "EV-005",
      title: "Stakeholder RACI matrix",
      owner: "PMO",
      due: "Feb 12",
      status: "In progress",
      tag: "RACI"
    },
    {
      id: "EV-006",
      title: "Scope statement and exclusions",
      owner: "PMO",
      due: "Feb 06",
      status: "Completed",
      tag: "Scope"
    }
  ]
};
const toneClasses = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  purple: "bg-violet-50 text-violet-700 ring-violet-200"
};
function Badge({
  children,
  tone = "slate",
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: [
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        toneClasses[tone],
        className
      ].join(" "),
      children
    }
  );
}
function CircularProgress({
  value,
  size = 80,
  strokeWidth = 8,
  className = "",
  colorClass = "text-emerald-500"
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - v / 100);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: ["relative inline-block", className].join(" "),
      style: { width: size, height: size },
      role: "img",
      "aria-label": `Progress ${v}%`,
      children: [
        /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, className: "block", children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx,
              cy,
              r,
              strokeWidth,
              stroke: "rgba(15, 23, 42, 0.06)",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsx("g", { className: colorClass, style: { transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }, children: /* @__PURE__ */ jsx("svg", { children: /* @__PURE__ */ jsx(
            "circle",
            {
              cx,
              cy,
              r,
              strokeWidth,
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              fill: "none"
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold tabular-nums text-slate-900", children: [
          v,
          "%"
        ] }) })
      ]
    }
  );
}
function meta({}) {
  return [{
    title: "Details • Audit Platform"
  }, {
    name: "description",
    content: "Detail view for a strategic planning control area."
  }];
}
function statusTone(status) {
  switch (status) {
    case "Completed":
      return "green";
    case "Under review":
      return "purple";
    case "In progress":
      return "amber";
    case "Not started":
      return "slate";
  }
}
function initials(name) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}
const details = UNSAFE_withComponentProps(function DetailsRoute() {
  const data = detailsData;
  const detailsCardData = [{
    icon: "/hugeicons_file-security.svg",
    value: data.evidenceSummary.total,
    label: "Total Evidence"
  }, {
    icon: "/hugeicons_file-security.svg",
    value: data.evidenceSummary.inProgress,
    label: "In Progress"
  }, {
    icon: "/hugeicons_file-security.svg",
    value: data.evidenceSummary.underReview,
    label: "Under Review"
  }, {
    icon: "/hugeicons_file-security.svg",
    value: data.evidenceSummary.completed,
    label: "Completed"
  }];
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "evidence" ? "evidence" : "overview";
  const setTab = React.useCallback((next) => {
    const sp = new URLSearchParams(searchParams);
    if (next === "overview") sp.delete("tab");
    else sp.set("tab", "evidence");
    setSearchParams(sp, {
      replace: true
    });
  }, [searchParams, setSearchParams]);
  const overviewSections = [{
    id: "objective",
    title: "Objective",
    content: /* @__PURE__ */ jsx("p", {
      className: "mt-2 text-sm text-slate-700",
      children: data.overview.objective
    })
  }, {
    id: "requirements",
    title: "Implementation Requirements",
    content: /* @__PURE__ */ jsx("ul", {
      className: "mt-2 space-y-2 text-sm text-slate-700",
      children: data.overview.requirements.map((r) => /* @__PURE__ */ jsxs("li", {
        className: "flex gap-2",
        children: [/* @__PURE__ */ jsx("span", {
          className: "mt-1 size-1.5 shrink-0 rounded-full bg-slate-900"
        }), /* @__PURE__ */ jsx("span", {
          children: r
        })]
      }, r))
    })
  }, {
    id: "evidence-docs",
    title: "Evidence Documents",
    content: /* @__PURE__ */ jsx("div", {
      className: "mt-2 text-sm text-slate-700",
      children: "Refer to the Evidence tab for full document list and details."
    })
  }, {
    id: "references",
    title: "Related Regulations",
    content: /* @__PURE__ */ jsx("ul", {
      className: "mt-2 space-y-2 text-sm text-slate-700",
      children: data.overview.references.map((r) => /* @__PURE__ */ jsxs("li", {
        className: "flex gap-2",
        children: [/* @__PURE__ */ jsx("span", {
          className: "mt-1 size-1.5 shrink-0 rounded-full bg-rose-500"
        }), /* @__PURE__ */ jsx("span", {
          children: r
        })]
      }, r))
    })
  }, {
    id: "scope",
    title: "Scope",
    content: /* @__PURE__ */ jsx("ul", {
      className: "mt-2 space-y-2 text-sm text-slate-700",
      children: data.overview.scope.map((s) => /* @__PURE__ */ jsxs("li", {
        className: "flex gap-2",
        children: [/* @__PURE__ */ jsx("span", {
          className: "mt-1 size-1.5 shrink-0 rounded-full bg-emerald-600"
        }), /* @__PURE__ */ jsx("span", {
          children: s
        })]
      }, s))
    })
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [/* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs("div", {
        className: " px-4 py-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "min-w-0",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex px-2 py-1 max-w-34 rounded-full bg-slate-100 flex-wrap items-center gap-2 text-xs font-semibold text-slate-500",
            children: /* @__PURE__ */ jsx("span", {
              children: data.category
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: "mt-1 text-1xl font-semibold tracking-tight text-slate-900",
            children: data.title
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-1 max-w-4xl text-sm text-slate-500",
            children: data.description
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-end",
            children: /* @__PURE__ */ jsx(CircularProgress, {
              value: data.progress,
              size: 85,
              strokeWidth: 8,
              className: "mr-2"
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
      children: detailsCardData.map((s) => /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsx(CardBody, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "grid size-10 place-items-center rounded-full text-white",
              children: /* @__PURE__ */ jsx("img", {
                src: s.icon,
                alt: s.label,
                className: "w-4 h-4"
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "min-w-0",
              children: [/* @__PURE__ */ jsx("div", {
                className: "mt-1 text-2xl font-semibold tabular-nums text-slate-900",
                children: s.value
              }), /* @__PURE__ */ jsx("div", {
                className: "text-xs font-medium text-slate-500",
                children: s.label
              })]
            })]
          })
        })
      }, s.label))
    }), /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx("div", {
        className: " px-5",
        children: /* @__PURE__ */ jsx("div", {
          className: "flex",
          children: /* @__PURE__ */ jsxs("div", {
            className: "rounded-full bg-slate-100 p-1 inline-flex gap-1",
            children: [/* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setTab("overview"),
              className: tab === "overview" ? "px-4 py-1 rounded-full bg-white text-slate-900 shadow-sm text-sm font-semibold" : "px-4 py-1 rounded-full text-slate-500 text-sm font-semibold",
              children: "Overview"
            }), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setTab("evidence"),
              className: tab === "evidence" ? "px-4 py-1 rounded-full bg-white text-slate-900 shadow-sm text-sm font-semibold" : "px-4 py-1 rounded-full text-slate-500 text-sm font-semibold",
              children: "Evidence"
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CardBody, {
        children: tab === "overview" ? /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-6 xl:grid-cols-[200px_1fr]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "space-y-3",
            children: overviewSections.map((s) => /* @__PURE__ */ jsx("div", {
              className: "px-2",
              children: /* @__PURE__ */ jsx("a", {
                href: `#${s.id}`,
                className: "block rounded-lg border border-slate-200 bg-gray-50 px-4 py-3 text-sm text-slate-600 hover:shadow",
                children: s.title
              })
            }, s.id))
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-4",
            children: overviewSections.map((s) => /* @__PURE__ */ jsxs("section", {
              id: s.id,
              className: "rounded-2xl border border-slate-200 bg-gray-50 px-4 py-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-xs font-semibold text-slate-500",
                children: s.title
              }), s.content]
            }, s.id))
          })]
        }) : /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          }), /* @__PURE__ */ jsxs("div", {
            className: "overflow-hidden rounded-2xl border border-slate-200",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "hidden grid-cols-[120px_1.4fr_140px_120px_140px] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500 md:grid",
              children: [/* @__PURE__ */ jsx("div", {
                children: "ID"
              }), /* @__PURE__ */ jsx("div", {
                children: "Evidence"
              }), /* @__PURE__ */ jsx("div", {
                children: "Owner"
              }), /* @__PURE__ */ jsx("div", {
                children: "Due"
              }), /* @__PURE__ */ jsx("div", {
                children: "Status"
              })]
            }), /* @__PURE__ */ jsx("ul", {
              className: "divide-y divide-slate-200",
              children: data.evidence.map((e) => /* @__PURE__ */ jsx("li", {
                className: "px-4 py-3",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-1 gap-2 md:grid-cols-[120px_1.4fr_140px_120px_140px] md:items-center",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-xs font-semibold text-slate-500",
                    children: e.id
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "min-w-0",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "truncate text-sm font-semibold text-slate-900",
                      children: e.title
                    }), /* @__PURE__ */ jsx("div", {
                      className: "mt-1 flex flex-wrap gap-2",
                      children: /* @__PURE__ */ jsx(Badge, {
                        tone: "slate",
                        children: e.tag
                      })
                    })]
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-sm text-slate-700",
                    children: e.owner
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-sm text-slate-700",
                    children: e.due
                  }), /* @__PURE__ */ jsx("div", {
                    children: /* @__PURE__ */ jsx(Badge, {
                      tone: statusTone(e.status),
                      children: e.status
                    })
                  })]
                })
              }, e.id))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 gap-4 md:grid-cols-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "md:col-span-2",
              children: /* @__PURE__ */ jsxs("section", {
                className: "rounded-2xl border border-slate-200 bg-white px-4 py-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex items-start justify-between",
                  children: /* @__PURE__ */ jsx("div", {
                    className: "text-sm font-semibold text-slate-900",
                    children: "Comments"
                  })
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "mt-4 space-y-4",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "flex gap-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "grid size-10 place-items-center rounded-full bg-slate-300 text-xs font-semibold text-white",
                      children: "SI"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "min-w-0",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "flex min-w-['100%'] items-center justify-between",
                        children: [/* @__PURE__ */ jsx("div", {
                          className: "truncate text-sm font-semibold text-slate-900",
                          children: "Sara Ibrahim"
                        }), /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-slate-400 ml-auto",
                          children: "2025-08-05"
                        })]
                      }), /* @__PURE__ */ jsx("div", {
                        className: "mt-2 text-sm text-slate-700",
                        children: "Ensure The Plan Includes A Clear Governance Model."
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "flex gap-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "grid size-10 place-items-center rounded-full bg-slate-300 text-xs font-semibold text-white",
                      children: "MH"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "min-w-0",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [/* @__PURE__ */ jsx("div", {
                          className: "truncate text-sm font-semibold text-slate-900",
                          children: "Mona Hamed"
                        }), /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-slate-400",
                          children: "2025-08-05"
                        })]
                      }), /* @__PURE__ */ jsx("div", {
                        className: "mt-2 text-sm text-slate-700",
                        children: "Ensure The Plan Includes A Clear Governance Model."
                      })]
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "mt-4",
                  children: [/* @__PURE__ */ jsx("textarea", {
                    rows: 3,
                    className: "w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700",
                    placeholder: "Write a comment..."
                  }), /* @__PURE__ */ jsx("div", {
                    className: "mt-3 flex justify-start",
                    children: /* @__PURE__ */ jsx("button", {
                      className: "rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white",
                      children: "Post Comment"
                    })
                  })]
                })]
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "md:col-span-1",
              children: /* @__PURE__ */ jsxs("section", {
                className: "rounded-2xl border border-slate-200 bg-white px-4 py-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-sm font-semibold text-slate-900",
                  children: "Recent Activities"
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "mt-3 space-y-3 text-sm text-slate-700",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "flex items-start justify-between gap-2",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-start gap-2",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "mt-1 h-2 w-2 rounded-full bg-rose-500"
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-slate-900",
                          children: "Roadmap_Version1.Docx"
                        }), /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-slate-500",
                          children: "Uploaded By Rami AlSharif"
                        })]
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      className: "text-xs text-slate-400",
                      children: "5 Mins Ago"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "flex items-start justify-between gap-2",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-start gap-2",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "mt-1 h-2 w-2 rounded-full bg-rose-500"
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-slate-900",
                          children: "KPI_Framework.Xlsx"
                        }), /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-slate-500",
                          children: "Uploaded By Mona Hamed"
                        })]
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      className: "text-xs text-slate-400",
                      children: "20 Mins Ago"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "flex items-start justify-between gap-2",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-start gap-2",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "mt-1 h-2 w-2 rounded-full bg-rose-500"
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-slate-900",
                          children: "Digital_Transformation_Plan.Pdf"
                        }), /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-slate-500",
                          children: "Approved By Advisory Team"
                        })]
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      className: "text-xs text-slate-400",
                      children: "1 Hour Ago"
                    })]
                  })]
                })]
              })
            })]
          })]
        })
      }), tab === "overview" && /* @__PURE__ */ jsxs("section", {
        className: "rounded-2xl border border-slate-200 bg-white px-4 py-4",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-sm font-semibold text-slate-900",
          children: "Leaders"
        }), /* @__PURE__ */ jsx("ul", {
          className: " flex mt-4 space-y-3",
          children: data.leaders.map((l) => /* @__PURE__ */ jsxs("li", {
            className: "flex min-w-[220px] items-center gap-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "grid size-10 place-items-center rounded-2xl bg-slate-900 text-xs font-semibold text-white",
              children: initials(l.name)
            }), /* @__PURE__ */ jsxs("div", {
              className: "min-w-0",
              children: [/* @__PURE__ */ jsx("div", {
                className: "truncate text-sm font-semibold text-slate-900",
                children: l.name
              }), /* @__PURE__ */ jsxs("div", {
                className: "truncate text-xs text-slate-500",
                children: [l.role, " • ", l.org]
              })]
            })]
          }, l.name))
        })]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: details,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/twhwul-uz/assets/entry.client-CzA2rTrB.js", "imports": ["/twhwul-uz/assets/jsx-runtime-u17CrQMm.js", "/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/twhwul-uz/assets/root-B5C_h4E5.js", "imports": ["/twhwul-uz/assets/jsx-runtime-u17CrQMm.js", "/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js"], "css": ["/twhwul-uz/assets/root-CpHTQTXd.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app-shell": { "id": "routes/app-shell", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/twhwul-uz/assets/app-shell-65XINFcf.js", "imports": ["/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js", "/twhwul-uz/assets/jsx-runtime-u17CrQMm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "routes/app-shell", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/twhwul-uz/assets/home-BNmUjrDD.js", "imports": ["/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "routes/app-shell", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/twhwul-uz/assets/dashboard-DkVc-Kku.js", "imports": ["/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js", "/twhwul-uz/assets/jsx-runtime-u17CrQMm.js", "/twhwul-uz/assets/Card-89nNMZMy.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/details": { "id": "routes/details", "parentId": "routes/app-shell", "path": "details", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/twhwul-uz/assets/details-B84TCTny.js", "imports": ["/twhwul-uz/assets/chunk-EPOLDU6W-CHiQwsCZ.js", "/twhwul-uz/assets/jsx-runtime-u17CrQMm.js", "/twhwul-uz/assets/Card-89nNMZMy.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/twhwul-uz/assets/manifest-c4a9e606.js", "version": "c4a9e606", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/twhwul-uz/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/app-shell": {
    id: "routes/app-shell",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "routes/app-shell",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "routes/app-shell",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/details": {
    id: "routes/details",
    parentId: "routes/app-shell",
    path: "details",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
