import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero-bg px-6">
      <div className="w-full max-w-md fade-in">
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
        {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}

export function Login() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={<>Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input type="email" placeholder="you@university.edu" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input type="password" placeholder="••••••••" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Link to="/dashboard/student" className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
          Sign In
        </Link>
      </form>
    </AuthCard>
  );
}

export function Register() {
  return (
    <AuthCard
      title="Create account"
      subtitle="Join VRMM to start your research journey"
      footer={<>Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">First Name</label>
            <input type="text" placeholder="Alex" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Last Name</label>
            <input type="text" placeholder="Johnson" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input type="email" placeholder="you@university.edu" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Role</label>
          <select className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="student">Student</option>
            <option value="researcher">Researcher</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input type="password" placeholder="••••••••" className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Link to="/email-verification" className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
          Create Account
        </Link>
      </form>
    </AuthCard>
  );
}

export function EmailVerification() {
  return (
    <AuthCard title="Check your email" subtitle="We've sent a verification link to your email address">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <FlaskConical className="h-8 w-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Click the link in your email to verify your account. If you don't see it, check your spam folder.
        </p>
        <button className="text-sm font-medium text-primary hover:underline">Resend verification email</button>
      </div>
    </AuthCard>
  );
}

export function ForgotPassword() {
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

export function ResetPassword() {
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
