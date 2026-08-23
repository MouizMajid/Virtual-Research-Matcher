import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { toast } from "sonner";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";

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
      toast.success("Application submitted", {
        description: "Your application has been sent to the researcher.",
      });
      navigate("/dashboard/my-applications");
    },
    onError: () => {
      toast.error("Failed to submit application", {
        description: "Something went wrong. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ postingId: Number(id), coverLetter, why, experience });
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link to={`/posting/${id}`} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Project
      </Link>

      <div className="vrmm-card p-8">
        <h1 className="text-2xl font-bold">Apply to Project</h1>
        <p className="mt-1 text-muted-foreground">{posting?.title ?? "Loading..."}</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label>Cover Letter</Label>
            <Textarea
              required
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the researcher why you're a great fit for this project..."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Why are you interested in this research?</Label>
            <Textarea
              required
              rows={3}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="Briefly describe your motivation..."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Relevant Experience</Label>
            <Textarea
              required
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe any relevant coursework, projects, or research..."
            />
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
