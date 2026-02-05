import * as React from "react";

export function ProgressBar({
  value,
  label,
}: {
  value: number; // 0..100
  label?: string;
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium">{label}</span>
          <span className="tabular-nums">{v}%</span>
        </div>
      ) : null}
      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-slate-900"
          style={{ width: `${v}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

