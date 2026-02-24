import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowLeft, ExternalLink } from "lucide-react";
import { mockProjects } from "../data/mockData";
import { StatusBadge } from "../components/StatusBadge";

export default function ViewPosting() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link to="/browse" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-start justify-between">
              <div>
                <StatusBadge status={project.status} />
                <h1 className="mt-3 text-2xl font-bold">{project.title}</h1>
                <p className="mt-1 text-muted-foreground">
                  <Link to={`/dashboard/profile`} className="text-primary hover:underline">{project.researcher}</Link>
                  {" · "}{project.university}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Deadline: {project.deadline}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {project.location}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {project.applicants} applicants</span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Project Description</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                This project offers an exciting opportunity to work at the intersection of cutting-edge technology and academic research. 
                The selected candidate will have the chance to contribute to publications and present at conferences. 
                We are looking for motivated individuals with strong analytical skills and a passion for innovation.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Tech Stack</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4 sticky top-24 self-start">
          <div className="glass-card p-6">
            <Link
              to={`/application/${project.id}`}
              className="gradient-bg flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Apply Now <ExternalLink className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {project.applicants} people have already applied
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold">About the Researcher</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {project.researcher.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium">{project.researcher}</p>
                <p className="text-xs text-muted-foreground">{project.university}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold">Key Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Posted</dt>
                <dd>{project.posted}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Deadline</dt>
                <dd>{project.deadline}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd><StatusBadge status={project.status} /></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
