import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function MetricCard({ label, value, icon: Icon, trend, trendUp }: MetricCardProps) {
  return (
    <div className="glass-card p-6 hover-lift">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
