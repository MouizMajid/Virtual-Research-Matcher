import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Calendar, MapPin, Upload } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label.tsx";
import { Button } from "../components/ui/button";

export default function CreatePosting() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/dashboard/my-postings"), 1500);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass-card p-10 text-center space-y-3 animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Posting Published!</h2>
          <p className="text-sm text-muted-foreground">Your research posting is now live and visible to students.</p>
        </div>
      </div>
    );
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input id="title" placeholder="e.g. Machine Learning for Climate Prediction" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the research project, goals, and what the student will work on..."
              className="min-h-[140px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select category</option>
                <option value="ml">Machine Learning</option>
                <option value="nlp">Natural Language Processing</option>
                <option value="cv">Computer Vision</option>
                <option value="data">Data Science</option>
                <option value="robotics">Robotics</option>
                <option value="bio">Bioinformatics</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="positions">Open Positions *</Label>
              <Input id="positions" type="number" min={1} max={20} placeholder="e.g. 3" required />
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
              <Input id="deadline" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Location *
              </Label>
              <select
                id="location"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select location type</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" placeholder="e.g. 6 months, 1 semester" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compensation">Compensation (optional)</Label>
            <Input id="compensation" placeholder="e.g. $2,000/month stipend, Unpaid, Course credit" />
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
            />
          </div>

          <div className="space-y-2">
            <Label>Attachment (optional)</Label>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="space-y-1">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop a file or click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX up to 10 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="gradient-bg text-primary-foreground">
            Publish Posting
          </Button>
        </div>
      </form>
    </div>
  );
}
