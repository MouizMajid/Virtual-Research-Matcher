import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "../../context/AuthContext";

interface DashboardTopbarProps {
  title?: string;
}

export function DashboardTopbar({ title }: DashboardTopbarProps) {
  const { user } = useAuth();
  const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {initials}
        </div>
      </div>
    </header>
  );
}
