import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { mockProjects } from "../data/mockData";

export default function ApplicationPage() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link to={`/posting/${project.id}`} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Project
      </Link>

      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold">Apply to Project</h1>
        <p className="mt-1 text-muted-foreground">{project.title}</p>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1.5">Resume / CV</label>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 px-6 py-10 cursor-pointer hover:bg-muted transition-colors">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Cover Letter</label>
            <textarea
              rows={6}
              placeholder="Tell the researcher why you're a great fit for this project..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Why are you interested in this research?</label>
            <textarea
              rows={3}
              placeholder="Briefly describe your motivation..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Relevant Experience</label>
            <textarea
              rows={3}
              placeholder="Describe any relevant coursework, projects, or research..."
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <button
            type="submit"
            className="gradient-bg w-full rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
