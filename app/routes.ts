import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/app-shell.tsx", [
    index("routes/home.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("details", "routes/details.tsx"),
    route("tracking", "routes/tracking.tsx"),
  ]),
] satisfies RouteConfig;
