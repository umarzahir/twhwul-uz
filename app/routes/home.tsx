import type { Route } from "./+types/home";
import { Navigate } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Audit Dashboard" },
    {
      name: "description",
      content: "Audit readiness and compliance tracking",
    },
  ];
}

export default function Home() {
  return <Navigate to="/dashboard" replace />;
}
