import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "sonner";

interface Posting {
  id: number;
  title: string;
}

interface ApplicationResponse {
  id: number;
  applicantFirstName: string;
  applicantLastName: string;
  applicantEmail: string;
  createdAt: string;
  status: string;
}

export default function ViewApplicants() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: posting } = useQuery<Posting>({
    queryKey: ["posting", id],
    queryFn: () => api.get(`/postings/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const { data: applicants = [], isLoading } = useQuery<ApplicationResponse[]>({
    queryKey: ["posting-applications", id],
    queryFn: () => api.get(`/applications/${id}/applications`).then((r) => r.data),
    enabled: !!id,
  });

  const statusMutation = useMutation({
    mutationFn: ({ appId, status }: { appId: number; status: string }) =>
      api.patch(`/applications/${appId}/status`, { status }).then((r) => r.data),
    onSuccess: (_data, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["posting-applications", id] });
      toast.success(status === "ACCEPTED" ? "Application accepted" : "Application rejected");
    },
    onError: () => {
      toast.error("Failed to update status", {
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return (
    <div className="space-y-6">
      <Link to="/dashboard/my-postings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to My Postings
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-sm text-muted-foreground">
          Reviewing applicants for: {posting?.title ?? "Loading..."}
        </p>
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
              {isLoading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : applicants.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No applicants yet.</td></tr>
              ) : (
                applicants.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => navigate(`/dashboard/researcher/applications/${a.id}`)}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium">{a.applicantFirstName} {a.applicantLastName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.applicantEmail}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status.toLowerCase() as "pending" | "accepted" | "rejected"} />
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {a.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => statusMutation.mutate({ appId: a.id, status: "ACCEPTED" })}
                              disabled={statusMutation.isPending}
                              className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => statusMutation.mutate({ appId: a.id, status: "REJECTED" })}
                              disabled={statusMutation.isPending}
                              className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {a.status !== "PENDING" && (
                          <span className="text-xs text-muted-foreground">Reviewed</span>
                        )}
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
