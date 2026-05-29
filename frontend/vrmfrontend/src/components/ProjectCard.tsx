import { Link } from "react-router-dom";
import { Calendar, MapPin, BriefcaseBusiness, Presentation } from "lucide-react";

interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  researcher: string;
  university?: string;
  tags: string[];
  deadline: string;
  location: string;
  type: string;
}

export function ProjectCard({ id, title, description, researcher, university, tags, deadline, location, type }: ProjectCardProps) {
  return (
    <Link to={`/posting/${id}`} className="block">
      <div className="vrmm-card p-6 group cursor-pointer transition-colors hover:border-primary/40">
        <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {researcher}{university ? ` · ${university}` : ""}
        </p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(tags || []).slice(0, 4).map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{deadline}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          {type === "POSITION"
            ? <span className="flex items-center gap-1"><BriefcaseBusiness className="h-3.5 w-3.5" /> Position</span>
            : <span className="flex items-center gap-1"><Presentation className="h-3.5 w-3.5" /> Project</span>}
        </div>
      </div>
    </Link>
  );
}
