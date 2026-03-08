import { Link } from "react-router-dom";
import { FolderOpen, Users, Archive, Clock, Plus } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { mockApplicants } from "../data/mockData";

export default function ResearcherDashboard() {
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
        <MetricCard label="Active Postings" value={3} icon={FolderOpen} trend="+1 this week" trendUp />
        <MetricCard label="Total Applicants" value={45} icon={Users} trend="+12 this week" trendUp />
        <MetricCard label="Closed Projects" value={2} icon={Archive} />
        <MetricCard label="Pending Reviews" value={8} icon={Clock} />
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
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockApplicants.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.project}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.appliedDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <button className="text-sm font-medium text-primary hover:underline">Review</button>
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
