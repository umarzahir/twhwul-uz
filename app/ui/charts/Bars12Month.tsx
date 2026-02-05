import * as React from "react";

export function Bars12Month({
  values,
  labels,
}: {
  values: number[]; // 0..100
  labels: string[];
}) {
  const max = 100;
  const ticks = [100, 80, 60, 40, 20, 0];
  const containerHeight = 176; // px - consistent chart height

  return (
    <div className="w-full">
      <div className="flex items-stretch gap-4">
        <div className="w-12 flex flex-col items-end pr-2 text-sm text-slate-400">
          {ticks.map((t) => (
            <div key={t} className="h-8 flex items-center">
              {t}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          <div className="relative" style={{ height: `${containerHeight}px` }}>
            {/* horizontal grid lines */}
            {ticks.map((_, idx) => (
              <div
                key={idx}
                className="absolute left-0 right-0 border-t border-slate-100"
                style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
              />
            ))}

            <div className="absolute inset-0 flex items-end gap-3 px-2">
              {values.slice(0, 12).map((v, idx) => {
                const h = Math.min(100, Math.max(0, (v / max) * 100));
                const heightPx = Math.round((h / 100) * containerHeight);
                return (
                  <div key={idx} className="flex-1 flex items-end">
                    <div className="w-full flex items-end">
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${heightPx}px`,
                          background:
                            "linear-gradient(180deg, rgba(31,94,255,0.95) 0%, rgba(31,94,255,0.08) 100%)",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-3 text-[11px] font-medium text-slate-400">
            {labels.slice(0, 12).map((m) => (
              <div key={m} className="text-center">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

