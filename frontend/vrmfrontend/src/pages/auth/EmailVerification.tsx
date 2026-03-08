import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { FlaskConical } from "lucide-react";



export default function EmailVerification() {
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