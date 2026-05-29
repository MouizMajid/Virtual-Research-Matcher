import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { FlaskConical } from "lucide-react";

export function PublicNavbar() {
  const location = useLocation();
  const links = [
    { to: "/public-browse", label: "Browse Projects" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <FlaskConical className="h-5 w-5 text-primary" />
          VRMM
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-border" />
          <Link to="/login" className="rounded px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            Login
          </Link>
          <Link to="/register" className="ml-1 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Register
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
