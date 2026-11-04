import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Calendar, MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label.tsx";
import { Button } from "../../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../lib/api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
import { getApiErrorMessage, isSessionExpiredError } from "../../../lib/apiErrors";
import { clearPostingDraft, loadPostingDraft, postingDraftKey, savePostingDraft } from "../../../lib/postingDraft";
import { POSTING_LIMITS } from "../../../lib/postingLimits";

type FormFields = {
  projectTitle: string;
  type: "PROJECT" | "POSITION";
  description: string;
  openPositions: number;
  date: string;
  location: string;
  duration: string;
  compensation?: number;
  requirements: string;
};

export default function CreatePosting() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const draftKey = postingDraftKey(user?.id);
  // Whatever they were submitting when their session expired, if anything.
  const [restoredDraft] = useState(() => loadPostingDraft<FormFields>(draftKey));
  const [tags, setTags] = useState<string[]>(restoredDraft?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: restoredDraft?.values,
  });

  useEffect(() => {
    if (restoredDraft) {
      clearPostingDraft(draftKey);
      toast.info("We restored your posting", {
        description: "Your session expired before it was published. Review it and publish again.",
      });
    }
  }, [restoredDraft, draftKey]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed.length > POSTING_LIMITS.tagLength) {
      toast.error(`Each tag must be ${POSTING_LIMITS.tagLength} characters or fewer`);
      return;
    }
    if (tags.length >= POSTING_LIMITS.tagCount) {
      toast.error(`A posting can have at most ${POSTING_LIMITS.tagCount} tags`);
      return;
    }
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));


  const createPostingMutation = useMutation({
    mutationFn: (data: object) => api.post("/postings", data).then((r) => r.data),
    onSuccess: () => {
      clearPostingDraft(draftKey);
      queryClient.invalidateQueries({ queryKey: ["my-postings"] });
      queryClient.invalidateQueries({ queryKey: ["postings"] });
      toast.success("Posting published", {
        description: "Your research opportunity is now live.",
      });
      navigate("/dashboard/my-postings");
    },
    onError: (error) => {
      // Any other failure leaves them on this page with the form intact, so the saved
      // copy isn't needed. An expired session sends them away, so that's when it's kept.
      if (!isSessionExpiredError(error)) {
        clearPostingDraft(draftKey);
      }
      toast.error("Failed to publish posting", {
        description: getApiErrorMessage(error),
      });
    },
  })

  const onSubmit: SubmitHandler<FormFields> = (formdata) => {
    savePostingDraft(draftKey, { values: formdata, tags });
    createPostingMutation.mutate({
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
    }
    )     
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
        <h1 className="text-2xl font-bold">Create New Posting</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below to publish a new research opportunity.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input id="title" placeholder="e.g. Machine Learning for Climate Prediction" {...register("projectTitle", {
                required: "Project title is required",
                maxLength: { value: POSTING_LIMITS.title, message: `Project title must be ${POSTING_LIMITS.title} characters or fewer` },
              })} />
              {errors.projectTitle && <p className="text-xs text-destructive mt-1">{errors.projectTitle.message}</p>}
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
              {...register("description", {
                required: "Description is required",
                maxLength: { value: POSTING_LIMITS.description, message: "Description must be 20,000 characters or fewer" },
              })}
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
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
            <Input id="duration" placeholder="e.g. 6 months, 1 semester" {...register("duration", {
              maxLength: { value: POSTING_LIMITS.duration, message: `Duration must be ${POSTING_LIMITS.duration} characters or fewer` },
            })} />
            {errors.duration && <p className="text-xs text-destructive mt-1">{errors.duration.message}</p>}
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
              {...register("requirements", {
                maxLength: { value: POSTING_LIMITS.requirements, message: "Requirements must be 20,000 characters or fewer" },
              })}
            />
            {errors.requirements && <p className="text-xs text-destructive mt-1">{errors.requirements.message}</p>}
          </div>


        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={createPostingMutation.isPending}>
            {createPostingMutation.isPending ? "Publishing..." : "Publish Posting"}
          </Button>
        </div>
      </form>
    </div>
  );
}
