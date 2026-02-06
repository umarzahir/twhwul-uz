import * as React from "react";

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 8,
  className = "",
  colorClass = "text-emerald-500",
}: {
  value: number; // 0..100
  size?: number;
  strokeWidth?: number;
  className?: string;
  colorClass?: string;
}) {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - v / 100);

  return (
    <div className={["relative inline-block", className].join(" ")}
         style={{ width: size, height: size }}
         role="img"
         aria-label={`Progress ${v}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          stroke="rgba(15, 23, 42, 0.06)"
          fill="none"
        />
        <g className={colorClass} style={{ transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          <svg>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth={strokeWidth}
              stroke="currentColor"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              fill="none"
            />
          </svg>
        </g>
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-sm font-semibold tabular-nums text-slate-900">{v}%</div>
      </div>
    </div>
  );
}

export default CircularProgress;
