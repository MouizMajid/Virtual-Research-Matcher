import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X, Calendar, MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label.tsx";
import { Button } from "../../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../lib/api.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();

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
      toast.success("Success", {
        description: "Posting updated successfully.",
      });
      navigate("/dashboard/my-postings");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to publish posting", {
        description: error.response?.data?.message ?? "Something went wrong. Please try again.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/postings/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-postings"] });
      toast.success("Posting deleted", {
        description: "Your posting has been permanently removed.",
      });
      navigate("/dashboard/my-postings");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to delete posting", {
        description: error.response?.data?.message ?? "Something went wrong. Please try again.",
      });
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

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteMutation.mutate();
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
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input id="title" placeholder="e.g. Machine Learning for Climate Prediction" {...register("projectTitle", { required: true })} />
              {errors.projectTitle && <p className="text-xs text-destructive mt-1">Project title is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Posting Type *</Label>
              <select
                id="type"
                {...register("type", { required: true })}
                className="h-10 w-full rounded border border-border bg-card px-3 text-sm text-foreground transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
              >
                <option value="">Select type</option>
                <option value="PROJECT">Project</option>
                <option value="POSITION">Position</option>
              </select>
              {errors.type && <p className="text-xs text-destructive mt-1">Posting type is required</p>}
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
            {errors.description && <p className="text-xs text-destructive mt-1">Description is required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="positions">Open Positions *</Label>
              <Input id="positions" type="number" min={1} max={20} placeholder="e.g. 3" {...register("openPositions", { required: true, valueAsNumber: true })} />
              {errors.openPositions && <p className="text-xs text-destructive mt-1">Number of positions is required</p>}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Project Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Application Deadline *
              </Label>
              <Input id="deadline" type="date" {...register("date", { required: true })} />
              {errors.date && <p className="text-xs text-destructive mt-1">Application deadline is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Location *
              </Label>
              <select
                id="location"
                {...register("location", { required: true })}
                className="h-10 w-full rounded border border-border bg-card px-3 text-sm text-foreground transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
              >
                <option value="">Select location type</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.location && <p className="text-xs text-destructive mt-1">Location is required</p>}
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
        <div className="vrmm-card p-6 space-y-5">
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
                    className="tag-chip gap-1"
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
        <div className="flex items-center justify-between">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => setConfirmDelete(false)} className="text-muted-foreground">
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Delete Posting
            </Button>
          )}

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
