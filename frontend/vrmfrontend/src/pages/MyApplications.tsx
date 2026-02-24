import { StatusBadge } from "../components/StatusBadge";
import { mockApplications } from "../data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MyApplications() {
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
                <th className="px-4 py-3 font-medium">Researcher</th>
                <th className="px-4 py-3 font-medium">Applied Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockApplications.map((app) => (
                <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{app.project}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.researcher}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.appliedDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-3">
                    <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing 1-5 of 5 results</p>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-medium">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
