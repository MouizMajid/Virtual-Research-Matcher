import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

interface Posting {
  id: number;
  title: string;
}

export default function ApplicationPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [why, setWhy] = useState("");
  const [experience, setExperience] = useState("");

  const { data: posting } = useQuery<Posting>({
    queryKey: ["posting", id],
    queryFn: () => api.get(`/postings/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: object) => api.post("/applications", data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      navigate("/dashboard/my-applications")
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      postingId: Number(id),
      coverLetter,
      why,
      experience,
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link to={`/posting/${id}`} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Project
      </Link>

      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold">Apply to Project</h1>
        <p className="mt-1 text-muted-foreground">{posting?.title ?? "Loading..."}</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium mb-1.5">Cover Letter</label>
            <textarea
              required
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the researcher why you're a great fit for this project..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Why are you interested in this research?</label>
            <textarea
              required
              rows={3}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="Briefly describe your motivation..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Relevant Experience</label>
            <textarea
              required
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe any relevant coursework, projects, or research..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {mutation.isError && (
            <p className="text-sm text-destructive">Failed to submit application. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="gradient-bg w-full rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            {mutation.isPending ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
