import { AuthCard } from "./AuthPages";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import api from "../../lib/api";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type FormFields = {
  email: string;
};

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (formdata) => {
    setNotVerified(false);
    try {
      await api.post("/auth/forgot-password", { email: formdata.email });
      setSubmitted(true);
    } catch (error: any) {
      const message = error?.response?.data;
      if (typeof message === "string" && message.toLowerCase().includes("not verified")) {
        setNotVerified(true);
        return;
      }
      // All other errors (email not found, server error) show generic success — don't reveal if email is registered
      setSubmitted(true);
    }
  };

  const handleResend = async () => {
    setResendStatus("sending");
    const email = getValues("email");
    try {
      await api.post(`/auth/resend?email=${encodeURIComponent(email)}`);
      setResendStatus("sent");
      setTimeout(() => {
        navigate("/email-verification", { state: { email, fromAuth: true } });
      }, 1000);
    } catch {
      setResendStatus("error");
    }
  };

  if (submitted) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="If an account with that email exists, we've sent a reset link"
        footer={<Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>}
      >
        <p className="text-center text-sm text-muted-foreground">
          The link expires in 15 minutes. If you don't see it, check your spam folder.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={<Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label className="block mb-1.5">Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            placeholder="you@university.edu"
            className="rounded-xl bg-card px-4"
          />
          {errors.email && <p className="ml-1 text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>

        {notVerified && (
          <div className="space-y-2">
            <p className="text-sm text-destructive">Your account hasn't been verified yet.</p>
            <button
              type="button"
              disabled={resendStatus === "sending" || resendStatus === "sent"}
              onClick={handleResend}
              className="w-full text-sm font-medium text-primary hover:underline disabled:opacity-50"
            >
              {resendStatus === "sending" && "Sending..."}
              {resendStatus === "sent" && "Email sent! Redirecting..."}
              {resendStatus === "error" && "Failed to resend — try again"}
              {resendStatus === "idle" && "Resend verification email"}
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-bg w-full rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </AuthCard>
  );
}
