import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X, Calendar, MapPin } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label.tsx";
import { Button } from "../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../lib/api.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type FormFields = {
  projectTitle: string;
  type: "PROJECT" | "POSITION";
  description: string;
  openPositions: number;
  date: string;
  location: string;
  duration: string;
  compensation: number;
  requirements: string;
};

interface PostingDetail {
  id: number;
  title: string;
  type: "PROJECT" | "POSITION";
  description: string;
  openPositions: number;
  applicationDeadline: string;
  location: string;
  duration: string;
  stipend: number;
  requirements: string;
  tags: string[];
}

export default function EditPosting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, reset } = useForm<FormFields>();

  const { data: posting, isLoading } = useQuery<PostingDetail>({
    queryKey: ["posting", id],
    queryFn: () => api.get(`/postings/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (!posting) return;
    reset({
      projectTitle: posting.title,
      type: posting.type,
      description: posting.description,
      openPositions: posting.openPositions,
      date: posting.applicationDeadline,
      location: posting.location,
      duration: posting.duration,
      compensation: posting.stipend,
      requirements: posting.requirements ?? "",
    });
    setTags(posting.tags ?? []);
  }, [posting, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: object) => api.put(`/postings/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-postings"] });
      queryClient.invalidateQueries({ queryKey: ["posting", id] });
      navigate("/dashboard/my-postings");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/postings/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-postings"] });
      navigate("/dashboard/my-postings");
    },
  });

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const onSubmit: SubmitHandler<FormFields> = (formdata) => {
    updateMutation.mutate({
      type: formdata.type,
      title: formdata.projectTitle,
      description: formdata.description,
      location: formdata.location,
      duration: formdata.duration,
      openPositions: formdata.openPositions,
      requirements: formdata.requirements,
      stipend: formdata.compensation,
      applicationDeadline: formdata.date,
      tags: tags,
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this posting? This cannot be undone.")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading posting...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div>
        <h1 className="text-2xl font-bold">Edit Posting</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update your research opportunity details below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input id="title" placeholder="e.g. Machine Learning for Climate Prediction" {...register("projectTitle", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Posting Type *</Label>
              <select
                id="type"
                {...register("type", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select type</option>
                <option value="PROJECT">Project</option>
                <option value="POSITION">Position</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the research project, goals, and what the student will work on..."
              className="min-h-[140px]"
              {...register("description", { required: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            

            <div className="space-y-2">
              <Label htmlFor="positions">Open Positions *</Label>
              <Input id="positions" type="number" min={1} max={20} placeholder="e.g. 3" {...register("openPositions", { required: true, valueAsNumber: true })} />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Project Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Application Deadline *
              </Label>
              <Input id="deadline" type="date" {...register("date", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Location *
              </Label>
              <select
                id="location"
                {...register("location", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select location type</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" placeholder="e.g. 6 months, 1 semester" {...register("duration")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compensation">Compensation (optional)</Label>
            <Input id="compensation" type="number" placeholder="e.g. 2000" {...register("compensation", { valueAsNumber: true })} />
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Tech Stack & Requirements</h2>

          <div className="space-y-2">
            <Label>Tags / Tech Stack</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Type a tag and press Enter"
              />
              <Button type="button" variant="outline" onClick={addTag} className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements / Qualifications</Label>
            <Textarea
              id="requirements"
              placeholder="List any required skills, coursework, or experience..."
              className="min-h-[100px]"
              {...register("requirements")}
            />
          </div>
        </div>

        {/* Actions */}
        {updateMutation.isError && (
          <p className="text-sm text-destructive text-right">
            {(updateMutation.error as AxiosError<string>).response?.data ?? "Something went wrong. Please try again."}
          </p>
        )}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-xl border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Posting"}
          </button>

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending} className="gradient-bg text-primary-foreground">
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
