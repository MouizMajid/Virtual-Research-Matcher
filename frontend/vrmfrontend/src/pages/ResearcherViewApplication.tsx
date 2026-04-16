import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusBadge } from "../components/StatusBadge";
import api from "../lib/api";
import { toast } from "sonner";

interface ApplicationDetail {
  id: number;
  postingId: number;
  postingTitle: string;
  status: string;
  coverLetter: string;
  why: string;
  experience: string;
  createdAt: string;
  applicantId: number;
  applicantFirstName: string;
  applicantLastName: string;
  applicantEmail: string;
}

export default function ResearcherViewApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: application, isLoading, isError } = useQuery<ApplicationDetail>({
    queryKey: ["researcher-application", id],
    queryFn: () => api.get(`/applications/${id}/researcher-view`).then((r) => r.data),
    enabled: !!id,
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) =>
      api.patch(`/applications/${id}/status`, { status }).then((r) => r.data),
    onSuccess: (_data, status) => {
      queryClient.invalidateQueries({ queryKey: ["researcher-application", id] });
      queryClient.invalidateQueries({ queryKey: ["posting-applications"] });
      const messages: Record<string, string> = {
        ACCEPTED: "Application accepted",
        REJECTED: "Application rejected",
        PENDING: "Application reset to pending",
      };
      toast.success(messages[status] ?? "Status updated");
    },
    onError: () => {
      toast.error("Failed to update status", {
        description: "Something went wrong. Please try again.",
      });
    },
  });

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading application...</div>;
  }

  if (isError || !application) {
    return <div className="py-20 text-center text-muted-foreground">Application not found or access denied.</div>;
  }

  const isPending = application.status === "PENDING";
  const isAccepted = application.status === "ACCEPTED";
  const isRejected = application.status === "REJECTED";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-start justify-between">
        <div>
          <Link to={`/profile/${application.applicantId}`} className="text-2xl font-bold hover:text-primary hover:underline">
            {application.applicantFirstName} {application.applicantLastName}
          </Link>
          <p className="mt-0.5 text-sm text-muted-foreground">{application.applicantEmail}</p>
          <Link
            to={`/posting/${application.postingId}`}
            className="mt-1 text-sm text-primary hover:underline"
          >
            {application.postingTitle}
          </Link>
        </div>
        <StatusBadge status={application.status.toLowerCase() as "pending" | "accepted" | "rejected"} />
      </div>

      <div className="glass-card p-6 space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cover Letter</h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{application.coverLetter}</p>
        </div>

        <div className="border-t border-border" />

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why are you interested?</h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{application.why}</p>
        </div>

        <div className="border-t border-border" />

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Relevant Experience</h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{application.experience}</p>
        </div>

        <div className="border-t border-border pt-2 text-xs text-muted-foreground">
          Submitted {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "—"}
        </div>
      </div>

      {application.status !== "WITHDRAWN" && (
        <div className="flex items-center justify-end gap-3">
          {!isAccepted && (
            <button
              onClick={() => statusMutation.mutate("ACCEPTED")}
              disabled={statusMutation.isPending}
              className="rounded-xl bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              {statusMutation.isPending ? "Saving..." : "Accept"}
            </button>
          )}
          {!isRejected && (
            <button
              onClick={() => statusMutation.mutate("REJECTED")}
              disabled={statusMutation.isPending}
              className="rounded-xl bg-red-500/10 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              {statusMutation.isPending ? "Saving..." : "Reject"}
            </button>
          )}
          {(isAccepted || isRejected) && (
            <button
              onClick={() => statusMutation.mutate("PENDING")}
              disabled={statusMutation.isPending}
              className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              {statusMutation.isPending ? "Saving..." : "Reset to Pending"}
            </button>
          )}
        </div>
      )}

    </div>
  );
}
