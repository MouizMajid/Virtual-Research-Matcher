import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";


export default function ResetPassword() {
  return (
    <AuthCard title="Reset password" subtitle="Enter your new password below">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium mb-1.5">New Password</label>
          <input type="password" placeholder="••••••••" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
          <input type="password" placeholder="••••••••" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Link to="/login" className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
          Reset Password
        </Link>
      </form>
    </AuthCard>
  );
}
