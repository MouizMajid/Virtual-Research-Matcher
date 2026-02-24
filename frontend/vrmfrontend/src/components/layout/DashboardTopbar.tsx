import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface DashboardTopbarProps {
  title?: string;
}

export function DashboardTopbar({ title }: DashboardTopbarProps) {
  return (
    <header className="glass-navbar sticky top-0 z-40 flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-input bg-secondary pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <ThemeToggle />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          AJ
        </div>
      </div>
    </header>
  );
}
