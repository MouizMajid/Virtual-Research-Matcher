import { Github, Linkedin, MapPin, ExternalLink, Mail } from "lucide-react";

const skills = ["Machine Learning", "Python", "TensorFlow", "Data Analysis", "NLP", "Computer Vision", "R", "Statistics"];

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-card overflow-hidden">
        <div className="h-32 gradient-bg" />
        <div className="relative px-8 pb-6">
          <div className="-mt-12 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground">
                AJ
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold">Alex Johnson</h1>
                <p className="text-sm text-muted-foreground">PhD Student · Computer Science</p>
              </div>
            </div>
            <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              PhD student specializing in machine learning and natural language processing at MIT. 
              Passionate about applying AI to solve real-world problems in healthcare and climate science. 
              Looking for collaborative research opportunities with experienced faculty and industry partners.
            </p>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              {[
                "Applied to ML for Climate Prediction project",
                "Updated profile skills",
                "Accepted to NLP for Medical Records project",
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold">Details</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Cambridge, MA
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> alex@mit.edu
              </div>
            </dl>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold">University</h3>
            <p className="mt-2 text-sm text-muted-foreground">Massachusetts Institute of Technology</p>
            <p className="text-xs text-muted-foreground">Department of Computer Science</p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold">Links</h3>
            <div className="mt-3 space-y-2">
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4" /> github.com/alexjohnson
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" /> linkedin.com/in/alexjohnson
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> alexjohnson.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
