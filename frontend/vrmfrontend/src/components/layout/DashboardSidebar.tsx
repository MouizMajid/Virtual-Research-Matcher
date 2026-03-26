import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Search, FileText, FolderOpen, User, Settings, LogOut, FlaskConical,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const studentLinks = [
  { to: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/browse", label: "Browse Projects", icon: Search },
  { to: "/dashboard/my-applications", label: "My Applications", icon: FileText },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

const researcherLinks = [
  { to: "/dashboard/researcher", label: "Dashboard", icon: LayoutDashboard },
  { to: "/browse", label: "Browse Projects", icon: Search },
  { to: "/dashboard/my-postings", label: "My Postings", icon: FolderOpen },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  role?: "student" | "researcher";
}

export function DashboardSidebar() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const links = role === "researcher" ? researcherLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <FlaskConical className="h-5 w-5 text-primary" />
        <span className="text-lg font-bold gradient-text">VRMM</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
