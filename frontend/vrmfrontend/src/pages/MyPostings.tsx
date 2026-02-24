import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { mockProjects } from "../data/mockData";
import { Plus, Eye, Edit, Users } from "lucide-react";

export default function MyPostings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Postings</h1>
          <p className="text-sm text-muted-foreground">Manage your research project postings.</p>
        </div>
        <button className="gradient-bg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
          <Plus className="h-4 w-4" /> Create New Posting
        </button>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Project Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Applicants</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.slice(0, 4).map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{p.applicants}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.deadline}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/posting/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors" title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors" title="Edit">
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <Link to={`/dashboard/applicants/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors" title="View Applicants">
                        <Users className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
