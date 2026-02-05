import * as React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-md border border border-[var(--color-border)] bg-[var(--color-surface)]",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-900">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-1 line-clamp-2 text-xs text-slate-500">
            {subtitle}
          </div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </header>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["px-5 py-4", className].join(" ")}>{children}</div>;
}

