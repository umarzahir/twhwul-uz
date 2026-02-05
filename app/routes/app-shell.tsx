import { Outlet } from "react-router";
import { AppShell } from "~/ui/app-shell/AppShell";

export default function AppShellRoute() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

