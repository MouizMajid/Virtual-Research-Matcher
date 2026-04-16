import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Plus, Eye, Users, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

interface Posting {
  id: number;
  title: string;
  applicationDeadline: string;
}

function getStatus(deadline: string): "open" | "closed" {
  return new Date(deadline) >= new Date() ? "open" : "closed";
}

export default function MyPostings() {
  const { data: postings = [], isLoading } = useQuery<Posting[]>({
    queryKey: ["my-postings"],
    queryFn: () => api.get("/postings/my").then((r) => r.data),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Postings</h1>
          <p className="text-sm text-muted-foreground">Manage your research project postings.</p>
        </div>
        <Link
          to="/dashboard/create-posting"
          className="gradient-bg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Create New Posting
        </Link>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Project Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : postings.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No postings yet. Create your first one!</td></tr>
              ) : (
                [...postings].sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()).map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3"><StatusBadge status={getStatus(p.applicationDeadline)} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{p.applicationDeadline}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/posting/${p.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          to={`/dashboard/applicants/${p.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                          title="View Applicants"
                        >
                          <Users className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          to={`/dashboard/edit-posting/${p.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                          title="Edit Posting"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                      </div>
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
