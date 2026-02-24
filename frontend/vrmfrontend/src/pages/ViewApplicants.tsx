import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { mockApplicants, mockProjects } from "../data/mockData";

export default function ViewApplicants() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <div className="space-y-6">
      <Link to="/dashboard/my-postings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to My Postings
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-sm text-muted-foreground">Reviewing applicants for: {project.title}</p>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockApplicants.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.appliedDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                      Review
                    </button>
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
