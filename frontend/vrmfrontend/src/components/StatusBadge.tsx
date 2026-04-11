interface StatusBadgeProps {
  status: "pending" | "accepted" | "rejected" | "open" | "closed" | "withdrawn";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const classMap: Record<string, string> = {
    pending: "status-badge status-pending",
    accepted: "status-badge status-accepted",
    rejected: "status-badge status-rejected",
    open: "status-badge status-open",
    closed: "status-badge status-closed",
    withdrawn: "status-badge status-rejected",
  };

  return <span className={classMap[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}
