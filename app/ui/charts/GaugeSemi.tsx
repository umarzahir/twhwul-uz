import * as React from "react";

export function GaugeSemi({
  value,
  tone = "green",
  label,
  footerLeft,
  footerRight,
}: {
  value: number; 
  tone?: "green" | "red" | "blue";
  label?: string;
  footerLeft?: { label: string; value: string };
  footerRight?: { label: string; value: string };
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const color =
    tone === "red" ? "#dc2626" : tone === "blue" ? "#1f5eff" : "#16a34a";
  const radius = 90; // px
  const pathLen = Math.PI * radius; // semicircle length ~ pi * r
  const dashOffset = pathLen * (1 - v / 100);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[320px]">
        <div className="relative">
          <svg viewBox="0 0 200 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <path
              d={`M 10 100 A ${radius} ${radius} 0 0 1 190 100`}
              fill="none"
              stroke="#e9eff7"
              strokeWidth={10}
              strokeLinecap="round"
            />

            <path
              d={`M 10 100 A ${radius} ${radius} 0 0 1 190 100`}
              fill="none"
              stroke={color}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={pathLen}
              strokeDashoffset={dashOffset}
              pathLength={pathLen}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2">
              <div className="text-[35px] font-bold tabular-nums text-slate-900">{v}%</div>
            </div>
            {label ? <div className="mt-2 text-xs text-slate-400">{label}</div> : null}
          </div>
        </div>
      </div>

      {footerLeft || footerRight ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
            <div className="text-[11px] font-semibold text-slate-500">
              {footerLeft?.label ?? ""}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {footerLeft?.value ?? ""}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
            <div className="text-[11px] font-semibold text-slate-500">
              {footerRight?.label ?? ""}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {footerRight?.value ?? ""}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

