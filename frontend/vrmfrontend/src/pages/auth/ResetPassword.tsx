import { AuthCard } from "./AuthPages";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/api";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type FormFields = {
  newPassword: string;
  confirmPassword: string;
};

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
  const newPassword = watch("newPassword");

  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onSubmit: SubmitHandler<FormFields> = async (formdata) => {
    try {
      await api.post("/auth/reset-password", { token, newPassword: formdata.newPassword });
      navigate("/login", { replace: true });
    } catch (error: any) {
      const message = error?.response?.data;
      setError("root", { message: typeof message === "string" ? message : "Failed to reset password. The link may have expired." });
    }
  };

  return (
    <AuthCard
      title="Reset password"
      subtitle="Enter your new password below"
      footer={<Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label className="block mb-1.5">New Password</Label>
          <div className="relative">
            <Input
              {...register("newPassword", {
                required: "Password is required",
                validate: (value) => PASSWORD_REGEX.test(value) || "Password must meet all requirements"
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
          {errors.newPassword && <p className="ml-1 text-xs text-destructive mt-1">{errors.newPassword.message}</p>}
        </div>

        <div>
          <Label className="block mb-1.5">Confirm Password</Label>
          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match"
              })}
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="rounded-xl bg-card px-4 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="ml-1 text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {errors.root && <p className="ml-1 text-xs text-destructive mt-1">{errors.root.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthCard>
  );
}
