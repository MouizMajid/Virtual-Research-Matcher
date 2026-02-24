import { FileText, CheckCircle, Clock, Bookmark } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { mockApplications, mockActivities } from "../data/mockData";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track your applications and discover opportunities.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total Applications" value={5} icon={FileText} trend="+2 this week" trendUp />
        <MetricCard label="Accepted" value={2} icon={CheckCircle} trend="+1 this week" trendUp />
        <MetricCard label="Pending" value={2} icon={Clock} />
        <MetricCard label="Saved Projects" value={8} icon={Bookmark} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="glass-card">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold">Recent Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Researcher</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockApplications.map((app) => (
                    <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{app.project}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.researcher}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.appliedDate}</td>
                      <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="border-b border-border p-4">
            <h2 className="font-semibold">Activity Feed</h2>
          </div>
          <div className="p-4 space-y-4">
            {mockActivities.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  a.type === "success" ? "bg-emerald-500" : a.type === "error" ? "bg-red-500" : "bg-primary"
                }`} />
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
