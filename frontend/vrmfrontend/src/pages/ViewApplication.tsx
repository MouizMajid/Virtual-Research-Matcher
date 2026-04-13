import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusBadge } from "../components/StatusBadge";
import api from "../lib/api";

interface ApplicationDetail {
  id: number;
  postingId: number;
  postingTitle: string;
  status: string;
  coverLetter: string;
  why: string;
  experience: string;
  createdAt: string;
}

export default function ViewApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: application, isLoading, isError } = useQuery<ApplicationDetail>({
    queryKey: ["application", id],
    queryFn: () => api.get(`/applications/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const withdrawMutation = useMutation({
    mutationFn: () => api.patch(`/applications/${id}/withdraw`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      navigate("/dashboard/student");
    },
  });

  const handleWithdraw = () => {
    if (window.confirm("Are you sure you want to withdraw this application? This cannot be undone.")) {
      withdrawMutation.mutate();
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading application...</div>;
  }

  if (isError || !application) {
    return <div className="py-20 text-center text-muted-foreground">Application not found.</div>;
  }

  const isWithdrawn = application.status === "WITHDRAWN";

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
          <h1 className="text-2xl font-bold">Application Details</h1>
          <Link
            to={`/posting/${application.postingId}`}
            className="mt-1 text-sm text-primary hover:underline"
          >
            {application.postingTitle}
          </Link>
        </div>
        <StatusBadge status={application.status.toLowerCase() as "pending" | "accepted" | "rejected" | "withdrawn"} />
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

        <div className="border-t border-border pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Submitted {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "—"}</span>
        </div>
      </div>

      {!isWithdrawn && (
        <div className="flex justify-end">
          <button
            onClick={handleWithdraw}
            disabled={withdrawMutation.isPending}
            className="rounded-xl border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
          >
            {withdrawMutation.isPending ? "Withdrawing..." : "Withdraw Application"}
          </button>
        </div>
      )}

      {withdrawMutation.isError && (
        <p className="text-sm text-destructive text-right">Failed to withdraw. Please try again. {withdrawMutation.error.message}</p>
      )}
    </div>
  );
}
