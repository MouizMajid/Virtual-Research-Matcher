import { AuthCard } from "./AuthPages";
import { Link } from "react-router-dom";


export default function ForgotPassword() {
  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={<Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input type="email" placeholder="you@university.edu" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="gradient-bg w-full rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
          Send Reset Link
        </button>
      </form>
    </AuthCard>
  );
}
