import { FileText, CheckCircle, Clock } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

interface ApplicationResponse {
  id: number;
  postingTitle: string;
  createdAt: string;
  status: string;
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { data: applications = [], isLoading } = useQuery<ApplicationResponse[]>({
    queryKey: ["my-applications"],
    queryFn: () => api.get("/applications/my").then((r) => r.data),
  });

  const total = applications.length;
  const accepted = applications.filter((a) => a.status === "ACCEPTED").length;
  const pending = applications.filter((a) => a.status === "PENDING").length;
  const recent = applications.slice(-5).reverse();


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track your applications and discover opportunities.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Total Applications" value={total} icon={FileText} />
        <MetricCard label="Accepted" value={accepted} icon={CheckCircle} />
        <MetricCard label="Pending" value={pending} icon={Clock} />
      </div>

      <div className="vrmm-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-semibold">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Project</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : recent.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No applications yet.</td></tr>
              ) : (
                recent.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/dashboard/applications/${app.id}`)}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium">{app.postingTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status.toLowerCase() as "pending" | "accepted" | "rejected" | "withdrawn"} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
