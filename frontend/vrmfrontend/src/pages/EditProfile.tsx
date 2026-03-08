import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload, Trash2 } from "lucide-react";
import { Input } from "../components/ui/input"; 
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const initialSkills = ["Machine Learning", "Python", "TensorFlow", "Data Analysis", "NLP", "Computer Vision", "R", "Statistics"];

const initialEducation = [
  { id: "1", degree: "PhD in Computer Science", institution: "Massachusetts Institute of Technology", year: "2022 – Present" },
  { id: "2", degree: "BSc in Computer Science", institution: "Stanford University", year: "2018 – 2022" },
];

export default function EditProfile() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [skillInput, setSkillInput] = useState("");
  const [education, setEducation] = useState(initialEducation);
  const [saved, setSaved] = useState(false);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const addEducation = () =>
    setEducation([...education, { id: Date.now().toString(), degree: "", institution: "", year: "" }]);

  const removeEducation = (id: string) => setEducation(education.filter((e) => e.id !== id));

  const updateEducation = (id: string, field: string, value: string) =>
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate("/dashboard/profile"), 1500);
  };

  if (saved) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass-card p-10 text-center space-y-3 animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">✓</div>
          <h2 className="text-xl font-bold">Profile Updated!</h2>
          <p className="text-sm text-muted-foreground">Your changes have been saved successfully.</p>
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
        <ArrowLeft className="h-4 w-4" /> Back to Profile
      </button>

      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Update your personal information and preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar & Banner */}
        <div className="glass-card overflow-hidden">
          <div className="h-28 gradient-bg relative">
            <button
              type="button"
              className="absolute right-3 top-3 rounded-lg bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium hover:bg-background transition-colors"
            >
              Change Banner
            </button>
          </div>
          <div className="relative px-6 pb-6">
            <div className="-mt-10 flex items-end gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-primary text-xl font-bold text-primary-foreground">
                  AJ
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="pb-1 text-sm text-muted-foreground">JPG, PNG. Max 2 MB.</p>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Personal Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" defaultValue="Alex" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" defaultValue="Johnson" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" defaultValue="PhD Student · Computer Science" placeholder="e.g. Research Assistant at MIT" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" defaultValue="alex@mit.edu" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Cambridge, MA" placeholder="City, State" />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">About</h2>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue="PhD student specializing in machine learning and natural language processing at MIT. Passionate about applying AI to solve real-world problems in healthcare and climate science. Looking for collaborative research opportunities with experienced faculty and industry partners."
              className="min-h-[120px]"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-6 space-y-5">
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
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Education */}
        <div className="glass-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Education</h2>
            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>

          {education.map((edu) => (
            <div key={edu.id} className="rounded-xl border border-border p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="space-y-2">
                <Label>Degree / Program</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="e.g. PhD in Computer Science"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="e.g. MIT"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    placeholder="e.g. 2022 – Present"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-semibold text-lg">Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" defaultValue="github.com/alexjohnson" placeholder="github.com/username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" defaultValue="linkedin.com/in/alexjohnson" placeholder="linkedin.com/in/username" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input id="website" defaultValue="alexjohnson.dev" placeholder="yoursite.com" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="gradient-bg text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
