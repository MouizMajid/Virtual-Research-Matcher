import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Trash2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "sonner";

interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  beginDate: string;
  endDate: string;
  description: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => api.get("/users/me/profile").then((r) => r.data),
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName ?? "");
      setLastName(profile.lastName ?? "");
      setHeadline(profile.headline ?? "");
      setLocation(profile.location ?? "");
      setBio(profile.bio ?? "");
      setUniversity(profile.university ?? "");
      setDepartment(profile.department ?? "");
      setGithubUrl(profile.githubUrl ?? "");
      setLinkedinUrl(profile.linkedinUrl ?? "");
      setWebsiteUrl(profile.websiteUrl ?? "");
      setSkills(profile.skills ?? []);
      setExperiences(
        (profile.experiences ?? []).map((e: { id: number; title: string; company: string; beginDate: string; endDate: string; description: string }) => ({
          id: String(e.id),
          title: e.title,
          company: e.company,
          beginDate: e.beginDate,
          endDate: e.endDate,
          description: e.description ?? "",
        }))
      );
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: (data: object) => api.put("/users/me/profile", data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated", {
        description: "Your changes have been saved.",
      });
      navigate("/dashboard/profile");
    },
    onError: () => {
      toast.error("Failed to save profile", {
        description: "Something went wrong. Please try again.",
      });
    },
  });

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const addExperience = () =>
    setExperiences([...experiences, { id: Date.now().toString(), title: "", company: "", beginDate: "", endDate: "", description: "" }]);

  const removeExperience = (id: string) => setExperiences(experiences.filter((e) => e.id !== id));

  const updateExperience = (id: string, field: string, value: string) =>
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      firstName,
      lastName,
      headline,
      bio,
      location,
      university,
      department,
      githubUrl,
      linkedinUrl,
      websiteUrl,
      skills,
      experiences: experiences.map(({ title, company, beginDate, endDate, description }) => ({ title, company, beginDate, endDate, description })),
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Profile
      </button>

      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Update your personal information and preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Personal Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Research Assistant at MIT" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. MIT" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" />
          </div>
        </div>

        {/* About */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">About</h2>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[120px]"
              placeholder="Tell researchers about yourself..."
            />
          </div>
        </div>

        {/* Skills */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Skills</h2>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="Add a skill and press Enter"
            />
            <Button type="button" variant="outline" onClick={addSkill} className="shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="tag-chip gap-1">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="vrmm-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Experience</h2>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>

          {experiences.map((exp) => (
            <div key={exp.id} className="vrmm-card p-4 space-y-3 relative">
              <button type="button" onClick={() => removeExperience(exp.id)} className="absolute right-3 top-3 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="space-y-2">
                <Label>Role / Title</Label>
                <Input value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} placeholder="e.g. Research Assistant" />
              </div>
              <div className="space-y-2">
                <Label>Company / Organization</Label>
                <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="e.g. MIT CSAIL" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input value={exp.beginDate} onChange={(e) => updateExperience(exp.id, "beginDate", e.target.value)} placeholder="e.g. Sept 2023" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="e.g. Present" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Describe your role and responsibilities..." className="min-h-[80px]" />
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="vrmm-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="github.com/username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="linkedin.com/in/username" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input id="website" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="yoursite.com" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
