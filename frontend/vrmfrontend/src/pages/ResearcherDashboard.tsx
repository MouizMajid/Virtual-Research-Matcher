import { Link } from "react-router-dom";
import { FolderOpen, Users, Archive, Clock, Plus } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { useQuery, useQueries } from "@tanstack/react-query";
import api from "../lib/api";

interface Posting {
  id: number;
  title: string;
  applicationDeadline: string;
}

interface ApplicationResponse {
  id: number;
  applicantFirstName: string;
  applicantLastName: string;
  postingTitle: string;
  createdAt: string;
  status: string;
}

function isOpen(deadline: string) {
  return new Date(deadline) >= new Date();
}

export default function ResearcherDashboard() {
  const { data: postings = [], isLoading: postingsLoading } = useQuery<Posting[]>({
    queryKey: ["my-postings"],
    queryFn: () => api.get("/postings/my").then((r) => r.data),
  });

  const applicationQueries = useQueries({
    queries: postings.map((p) => ({
      queryKey: ["posting-applications", String(p.id)],
      queryFn: () => api.get(`/applications/${p.id}/applications`).then((r) => r.data as ApplicationResponse[]),
      enabled: postings.length > 0,
    })),
  });

  const allApplications = applicationQueries.flatMap((q) => q.data ?? []);
  const activePostings = postings.filter((p) => isOpen(p.applicationDeadline)).length;
  const closedPostings = postings.filter((p) => !isOpen(p.applicationDeadline)).length;
  const pendingReviews = allApplications.filter((a) => a.status === "PENDING").length;
  const recentApplicants = [...allApplications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Researcher Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your postings and review applicants.</p>
        </div>
        <Link
          to="/dashboard/create-posting"
          className="gradient-bg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Create New Posting
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Active Postings" value={activePostings} icon={FolderOpen} />
        <MetricCard label="Total Applicants" value={allApplications.length} icon={Users} />
        <MetricCard label="Closed Postings" value={closedPostings} icon={Archive} />
        <MetricCard label="Pending Reviews" value={pendingReviews} icon={Clock} />
      </div>

      <div className="glass-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold">Recent Applicants</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {postingsLoading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : recentApplicants.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No applicants yet.</td></tr>
              ) : (
                recentApplicants.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{a.applicantFirstName} {a.applicantLastName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.postingTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status.toLowerCase() as "pending" | "accepted" | "rejected"} />
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
