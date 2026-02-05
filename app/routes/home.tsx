import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Audit Dashboard" },
    { name: "description", content: "Audit readiness and compliance tracking" },
  ];
}

export function loader() {
  return redirect("/dashboard");
}

export default function Home() {
  return null;
}
