import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  cardClassName?: string;
}

export function AuthCard({ title, subtitle, children, footer, cardClassName }: AuthCardProps) {
  return (
    <div className=" flex min-h-screen items-center justify-center gradient-hero-bg px-6">
      <div className={`w-full max-w-md fade-in ${cardClassName}`}>
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="gradient-text">VRMM</span>
          </Link>
        </div>
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-4 mb-4 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}


