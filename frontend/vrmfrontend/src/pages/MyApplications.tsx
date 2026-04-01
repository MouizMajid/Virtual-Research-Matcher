import { StatusBadge } from "../components/StatusBadge";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

interface ApplicationResponse {
  id: number;
  postingTitle: string;
  applicantEmail: string;
  createdAt: string;
  status: string;
  postingId: number;
}

export default function MyApplications() {
  const { data: applications = [], isLoading } = useQuery<ApplicationResponse[]>({
    queryKey: ["my-applications"],
    queryFn: () => api.get("/applications/my").then((r) => r.data),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-sm text-muted-foreground">Track and manage your research applications.</p>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Applied Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No applications yet.</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{app.postingTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status.toLowerCase() as "pending" | "accepted" | "rejected"} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {applications.length > 0 && (
          <div className="border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">Showing {applications.length} application{applications.length !== 1 ? "s" : ""}</p>
          </div>
        )}
      </div>
    </div>
  );
}
