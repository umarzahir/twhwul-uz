import * as React from "react";
import { NavLink, useLocation } from "react-router";

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-18v7h7V2h-7Z"
        />
      </svg>
    ),
  },
  {
    to: "/details",
    label: "Perspectives",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M11 2a9 9 0 1 0 9 9h2A11 11 0 1 1 11 0v2Zm2 0v2.07A7 7 0 0 1 20.93 11H19a5 5 0 0 0-6-6Z"
        />
      </svg>
    ),
  },
  {
    to: "/tracking",
    label: "Tasks",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 16H5V5h14v14ZM7 12h10v2H7v-2Zm0-4h10v2H7V8Zm0 8h6v2H7v-2Z"
        />
      </svg>
    ),
  },
  {
    to: "/details?tab=evidence",
    label: "Documents",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L13 3.5ZM8 12h8v-2H8v2Zm0 4h8v-2H8v2Zm0 4h6v-2H8v2Z"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard",
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 20V4h2v14h14v2H4Zm4-4V8h2v8H8Zm4 0V6h2v10h-2Zm4 0v-6h2v6h-2Z"
        />
      </svg>
    ),
  },
  {
    to: "/tracking",
    label: "Users & Roles",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        />
      </svg>
    ),
  },
];

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/details")) return "Strategic Planning";
  if (pathname.startsWith("/tracking")) return "Evidence Tracking";
  return "Audit Platform";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-[var(--color-app-bg)] text-slate-900">
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar (navy) */}
        <aside className="hidden bg-[var(--color-brand-navy)] text-slate-100 lg:sticky lg:top-0 lg:block lg:h-dvh">
          <div className="flex h-dvh flex-col px-4 py-5">
            <div className="flex items-center gap-2 px-2">
              <div className="relative">
                <span className="inline-block size-2.5 rotate-45 bg-rose-500" aria-hidden="true" />
              </div>
              <div className="text-sm font-semibold tracking-wide">TAHWUL</div>
            </div>

            <nav className="mt-6 flex-1">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className="block">
                      {({ isActive }) => (
                        <div
                          className={[
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                            isActive
                              ? "bg-[var(--color-brand-navy-2)] text-white"
                              : "text-slate-200 hover:bg-white/5 hover:text-white",
                          ].join(" ")}
                        >
                          <span className="text-slate-200">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-2 text-xs text-slate-300/90">
              Static UI demo • 2026
            </div>
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/30"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-[var(--color-brand-navy)] text-slate-100 shadow-xl">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2.5 rotate-45 bg-rose-500" aria-hidden="true" />
                  <div className="text-sm font-semibold tracking-wide">TAHWUL</div>
                </div>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z"
                    />
                  </svg>
                </button>
              </div>
              <nav className="px-3 pb-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink to={item.to} className="block">
                        {({ isActive }) => (
                          <div
                            className={[
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                              isActive
                                ? "bg-[var(--color-brand-navy-2)] text-white"
                                : "text-slate-200 hover:bg-white/5 hover:text-white",
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "inline-flex size-9 items-center justify-center rounded-lg",
                                isActive ? "bg-white/10 text-white" : "bg-white/5 text-slate-200",
                              ].join(" ")}
                            >
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold">
                                {item.label}
                              </div>
                            </div>
                          </div>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        ) : null}

        {/* Main column */}
        <div className="min-w-0">
          {/* Top bar (matches screenshot) */}
            <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white">
            <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-lg bg-white text-slate-700 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50 lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"
                  />
                </svg>
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="hidden text-sm font-semibold text-slate-600 lg:block">
                  {/* {getPageTitle(location.pathname)} */}
                </div>
                <div className="relative w-full max-w-[320px]">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M10 2a8 8 0 1 0 5.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                      />
                    </svg>
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-[var(--color-brand-blue)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-lg text-slate-600 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50"
                  aria-label="Notifications"
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-[var(--color-border)] hover:bg-slate-50"
                >
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                    M
                  </span>
                  <span className="hidden md:block">Mohamed</span>
                  <svg viewBox="0 0 24 24" className="size-4 text-slate-500" aria-hidden="true">
                    <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <main className="min-w-0 px-4 py-5 lg:px-6 lg:py-6 bg-[var(--color-surface)]">{children}</main>
        </div>
      </div>
    </div>
  );
}

