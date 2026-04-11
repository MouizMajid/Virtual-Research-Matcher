import { Github, Linkedin, MapPin, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  beginDate: string;
  endDate: string;
  description: string;
}

interface UserInfoResponse {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio: string;
  location: string;
  university: string;
  department: string;
  skills: string[];
  experiences: ExperienceItem[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
}

function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return "https://" + url;
}

export default function Profile() {
  const { data: profile, isLoading } = useQuery<UserInfoResponse>({
    queryKey: ["my-profile"],
    queryFn: () => api.get("/users/me/profile").then((r) => r.data),
  });

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading profile...</div>;
  }

  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`
    : "?";

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-card overflow-hidden">
        <div className="h-32 gradient-bg" />
        <div className="relative px-8 pb-6">
          <div className="-mt-12 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground">
                {initials}
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <p className="text-sm text-muted-foreground">{profile?.headline}</p>
              </div>
            </div>
            <Link to="/dashboard/edit-profile" className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {profile?.bio && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {profile?.skills && profile.skills.length > 0 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile?.experiences && profile.experiences.length > 0 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold">Experience</h2>
              <div className="mt-3 space-y-3">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <p className="text-sm font-medium">{exp.title}</p>
                    <p className="text-xs text-muted-foreground">{exp.company} · {exp.beginDate} - {exp.endDate}</p>
                    {exp.description && <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold">Details</h3>
            <dl className="mt-3 space-y-3 text-sm">
              {profile?.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {profile.location}
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {profile.email}
                </div>
              )}
            </dl>
          </div>

          {(profile?.university || profile?.department) && (
            <div className="glass-card p-6">
              <h3 className="font-semibold">University</h3>
              {profile.university && <p className="mt-2 text-sm text-muted-foreground">{profile.university}</p>}
              {profile.department && <p className="text-xs text-muted-foreground">{profile.department}</p>}
            </div>
          )}

          {(profile?.githubUrl || profile?.linkedinUrl || profile?.websiteUrl) && (
            <div className="glass-card p-6">
              <h3 className="font-semibold">Links</h3>
              <div className="mt-3 space-y-2">
                {profile.githubUrl && (
                  <a href={normalizeUrl(profile.githubUrl)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a href={normalizeUrl(profile.linkedinUrl)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                )}
                {profile.websiteUrl && (
                  <a href={normalizeUrl(profile.websiteUrl)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="h-4 w-4" /> Website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
