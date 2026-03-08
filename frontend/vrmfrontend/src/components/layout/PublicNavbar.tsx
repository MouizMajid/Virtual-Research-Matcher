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
    <nav className="glass-navbar sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <FlaskConical className="h-6 w-6 text-primary" />
          <span className="gradient-text">VRMM</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-border" />
          <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            Login
          </Link>
          <Link to="/register" className="gradient-bg rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90">
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
