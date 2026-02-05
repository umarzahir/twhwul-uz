import * as React from "react";
import { Card, CardBody } from "./Card";

export type StatCardProps = {
  icon: string;
  value: React.ReactNode;
  label: string;
  bodyClass?: string;
  imgClass?: string;
  valueClass?: string;
};

export function StatCard({ icon, value, label, bodyClass = "py-3 relative", imgClass = "absolute right-3 top-5 w-6 h-6", valueClass = "text-2xl" }: StatCardProps) {
  return (
    <Card>
      <CardBody className={bodyClass}>
        <img src={icon} alt={label} className={imgClass} />
        <div className={[valueClass, "font-semibold tabular-nums text-slate-900"].join(" ")}>{value}</div>
        <div className="mt-0.5 text-[11px] font-medium text-slate-400">{label}</div>
      </CardBody>
    </Card>
  );
}

export default StatCard;
