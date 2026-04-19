import {  Navigate, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthCard } from "./AuthPages";
import {  Loader2 } from "lucide-react";
import api from "../../lib/api";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../components/ui/input";

type VerificationForm = {
  code: string;
};

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const fromAuth = location.state?.fromAuth;

  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerificationForm>();

  if (!fromAuth || !email) {
    return <Navigate replace to="/register" />;
  }

  const onSubmit: SubmitHandler<VerificationForm> = async (formdata) => {
    try {
      await api.post("/auth/verify", { email: email, verificationCode: formdata.code });
      navigate("/login", { replace: true });
    }catch (error) {
      setError("code", { message: "Failed to verify email" });
    }
  };

  const handleResend = async () => {
    setResendStatus("sending");
    try {
      await api.post(`/auth/resend?email=${encodeURIComponent(email)}`);
      setResendStatus("sent");
    } catch {
      setResendStatus("error");
    }
  };

  return (
    <AuthCard title="Check your email" subtitle="We've sent a verification link to your email address">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-4">
        <div className="space-y-2">
            <Input
              {...register("code", {
                required: "Verification code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit code",
                },
              })}
              placeholder="000000"
              className={`text-center text-2xl font-bold tracking-[0.5em]${errors.code ? " border-destructive" : ""}`}
              maxLength={6}
            />
            {errors.code && (
              <p className="text-xs text-destructive">{errors.code.message}</p>
            )}

          </div>
        <p className="text-sm text-muted-foreground">
          Click the link in your email to verify your account. If you don't see it, check your spam folder.
        </p>
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Account
          </button>
          
          <div className="text-center">
            <button
              type="button"
              disabled={resendStatus === "sending" || resendStatus === "sent"}
              className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
              onClick={handleResend}
            >
              {resendStatus === "sending" && "Sending..."}
              {resendStatus === "sent" && "Email sent!"}
              {resendStatus === "error" && "Failed to resend — try again"}
              {resendStatus === "idle" && "Resend verification email"}
            </button>
          </div>
        </div>
      </div>
      </form>
    </AuthCard>
  );
}