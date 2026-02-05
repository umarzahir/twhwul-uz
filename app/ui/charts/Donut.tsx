import * as React from "react";

export function Donut({
  value,
  size = 96,
  label,
  sublabel,
  tone = "slate",
}: {
  value: number; // 0..100
  size?: number;
  label?: string;
  sublabel?: string;
  tone?: "slate" | "blue" | "green" | "amber" | "red" | "purple";
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

  const toneColor =
    tone === "blue"
      ? "#2563eb"
      : tone === "green"
        ? "#059669"
        : tone === "amber"
          ? "#d97706"
          : tone === "red"
            ? "#e11d48"
            : tone === "purple"
              ? "#7c3aed"
              : "#0f172a";

  const ringStyle: React.CSSProperties = {
    width: size,
    height: size,
    background: `conic-gradient(${toneColor} ${v}%, #e2e8f0 0)`,
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative grid place-items-center rounded-full"
        style={ringStyle}
        role="img"
        aria-label={label ? `${label}: ${v}%` : `${v}%`}
      >
        <div
          className="grid place-items-center rounded-full bg-white"
          style={{ width: size * 0.72, height: size * 0.72 }}
          aria-hidden="true"
        >
          <div className="text-center">
            <div className="text-sm font-semibold tabular-nums text-slate-900">
              {v}%
            </div>
            {sublabel ? (
              <div className="mt-0.5 text-[11px] text-slate-500">{sublabel}</div>
            ) : null}
          </div>
        </div>
      </div>
      {label ? (
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">
            {label}
          </div>
          {sublabel ? (
            <div className="truncate text-xs text-slate-500">{sublabel}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

