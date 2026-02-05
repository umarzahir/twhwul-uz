import * as React from "react";

export function MiniBarChart({
  values,
  max = 100,
  tone = "slate",
}: {
  values: number[];
  max?: number;
  tone?: "slate" | "blue" | "green" | "amber" | "red" | "purple";
}) {
  const safeMax = max > 0 ? max : 1;
  const barColor =
    tone === "blue"
      ? "bg-blue-600"
      : tone === "green"
        ? "bg-emerald-600"
        : tone === "amber"
          ? "bg-amber-600"
          : tone === "red"
            ? "bg-rose-600"
            : tone === "purple"
              ? "bg-violet-600"
              : "bg-slate-900";

  return (
    <div className="flex h-10 items-end gap-1">
      {values.map((v, idx) => {
        const h = Math.min(100, Math.max(0, (v / safeMax) * 100));
        return (
          <div key={idx} className="flex-1 rounded-sm bg-slate-100">
            <div
              className={["w-full rounded-sm", barColor].join(" ")}
              style={{ height: `${h}%` }}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}

