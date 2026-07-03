import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowLeft, ExternalLink, Presentation, BriefcaseBusiness } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { isOpen } from "../lib/postingUtils";

interface Posting {
  id: number;
  title: string;
  description: string;
  location: string;
  openPositions: number;
  stipend: number;
  duration: string;
  applicationDeadline: string;
  requirements: string;
  tags: string[];
  createdByUser: string;
  createdById: number;
  type: string;
}

interface Application {
  postingId: number;
}


export default function ViewPosting() {
  const { id } = useParams();
  const { role } = useAuth();

  const { data: posting, isLoading } = useQuery<Posting>({
    queryKey: ["posting", id],
    queryFn: () => api.get(`/postings/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const { data: myApplications = [] } = useQuery<Application[]>({
    queryKey: ["my-applications"],
    queryFn: () => api.get(`/applications/my`).then((r) => r.data),
    enabled: !!id && role === "student",
  });

  const alreadyApplied = myApplications.some((a) => a.postingId === Number(id));

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Loading...</div>;
  }

  if (!posting) {
    return <div className="py-20 text-center text-muted-foreground">Posting not found.</div>;
  }

  const status = isOpen(posting.applicationDeadline) ? "open" : "closed";
  const initials = `${posting.createdByUser.split(' ')[0]?.charAt(0) ?? ''}${posting.createdByUser.split(' ')[1]?.charAt(0) ?? ''}`.toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link to="/browse" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <div className="vrmm-card p-8">
            <div className="flex items-start justify-between">
              <div>
                <StatusBadge status={status} />
                <h1 className="mt-3 text-2xl font-bold">{posting.title}</h1>
                <p className="mt-1 text-muted-foreground">{posting.createdByUser}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Deadline: {posting.applicationDeadline}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {posting.location}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {posting.openPositions} positions</span>
              {posting.type === "POSITION" ? (
                <span className="flex items-center gap-1.5"><BriefcaseBusiness className="h-4 w-4" />Position</span>
              ) : (
                <span className="flex items-center gap-1.5"><Presentation className="h-4 w-4" />Project</span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{posting.description}</p>
            </div>

            {posting.requirements && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Requirements</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{posting.requirements}</p>
              </div>
            )}

            {posting.tags && posting.tags.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Tags</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {posting.tags.map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4 sticky top-24 self-start">
          {role === "student" && (
            <div className="vrmm-card p-6">
              {status === "open" && !alreadyApplied ? (
                <Button asChild className="w-full">
                  <Link to={`/application/${posting.id}`}>
                    Apply Now <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  {alreadyApplied ? "Already Applied" : "Applications Closed"}
                </Button>
              )}
            </div>
          )}

          <div className="vrmm-card p-6">
            <h3 className="font-semibold">About the Researcher</h3>
            <Link to={`/profile/${posting.createdById}`} className="mt-3 flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium hover:text-primary hover:underline">{posting.createdByUser}</p>
              </div>
            </Link>
          </div>

          <div className="vrmm-card p-6">
            <h3 className="font-semibold">Key Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Deadline</dt>
                <dd>{posting.applicationDeadline}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location</dt>
                <dd>{posting.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Duration</dt>
                <dd>{posting.duration}</dd>
              </div>
              {posting.stipend > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stipend</dt>
                  <dd>${posting.stipend}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd><StatusBadge status={status} /></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
