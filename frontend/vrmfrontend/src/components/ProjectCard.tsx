import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  researcher: string;
  university: string;
  tags: string[];
  deadline: string;
  location: string;
  applicants: number;
}

export function ProjectCard({ id, title, description, researcher, university, tags, deadline, location, applicants }: ProjectCardProps) {
  return (
    <Link to={`/posting/${id}`} className="block">
      <div className="glass-card p-6 hover-lift group cursor-pointer">
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{researcher} · {university}</p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{deadline}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{applicants} applicants</span>
        </div>
      </div>
    </Link>
  );
}
