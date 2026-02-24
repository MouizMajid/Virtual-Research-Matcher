import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

interface DashboardLayoutProps {
  role?: "student" | "researcher";
}

export function DashboardLayout({ role = "student" }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
