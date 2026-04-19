import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../../lib/api";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type FormFields = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm<FormFields>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (isLoggedIn) {
    navigate("/dashboard/profile", { replace: true });
  }

  const onSubmit: SubmitHandler<FormFields> = async (formdata) => {
    setShowResend(false);
    setResendStatus("idle");
    try {
      const { data } = await api.post("/auth/login", { email: formdata.email, password: formdata.password });
      login(data.token, formdata.rememberMe);
      toast.success("Success", {
        description: "You have been logged in successfully."
      });
      navigate("/dashboard/profile");
    } catch (error: any) {
      const data = error?.response?.data;
      const message = typeof data === "string" ? data : (data?.message ?? "Invalid email or password.");
      if (message.toLowerCase().includes("not verified")) {
        setError("root", { message: "Your account hasn't been verified yet." });
        setShowResend(true);
      } else if (message.toLowerCase().includes("email")) {
        setError("email", { message });
      } else if (message.toLowerCase().includes("bad credentials")) {
        setError("password", { message: "Invalid email or password." });
      } else {
        setError("root", { message });
      }
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

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={<>Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link></>}
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

        <div>
          <Label className="block mb-1.5">Password</Label>
          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="rounded-xl bg-card px-4 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="ml-1 text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>

        {errors.root && <p className="ml-1 text-xs text-destructive mt-1">{errors.root.message}</p>}
        {showResend && (
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
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}
