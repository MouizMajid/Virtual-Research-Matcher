import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../../lib/api";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "RESEARCHER";
  password: string;
  confirmPassword: string;
};

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

export default function Register() {
  const { isLoggedIn } = useAuth();
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: {
      role: "STUDENT"
    }
  });
  const navigate = useNavigate();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isLoggedIn) {
    navigate("/dashboard/profile", { replace: true });
  }

  const onSubmit: SubmitHandler<FormFields> = async (formdata) => {
    try {
      await api.post("/auth/register", {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        role: formdata.role,
        password: formdata.password
      });
      navigate("/email-verification", {
        state: { email: formdata.email, fromAuth: true },
        replace: true
      });
    } catch (error: any) {
      const message = error?.response?.data;
      if (typeof message === "string" && message.toLowerCase().includes("email")) {
        setError("email", { message });
      } else {
        setError("root", { message: "Failed to create account" });
      }
    }
  };

  const getPasswordStrength = () => {
    if (!password) return null;
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    return { hasMinLength, hasUpperCase, hasSymbol };
  };

  const strength = getPasswordStrength();

  return (
    <AuthCard
      title="Create account"
      subtitle="Join VRMM to start your research journey"
      cardClassName="mt-10"
      footer={<>Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block mb-1.5">First Name</Label>
            <Input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              placeholder="Alex"
              className="rounded-xl bg-card px-4"
            />
            {errors.firstName && <p className="ml-1 text-xs text-destructive mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label className="block mb-1.5">Last Name</Label>
            <Input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              placeholder="Johnson"
              className="rounded-xl bg-card px-4"
            />
            {errors.lastName && <p className="ml-1 text-xs text-destructive mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

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
          <Label className="block mb-1.5">Role</Label>
          <select
            {...register("role")}
            className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="STUDENT">Student</option>
            <option value="RESEARCHER">Researcher</option>
          </select>
        </div>

        <div>
          <Label className="block mb-1.5">Password</Label>
          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  PASSWORD_REGEX.test(value) ||
                  "Password must meet all requirements"
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
        </div>

        <div>
          <Label className="block mb-1.5">Confirm Password</Label>
          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="rounded-xl bg-card px-4 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="ml-1 text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className={`flex items-center gap-2 ${strength?.hasMinLength ? "text-green-600" : "text-muted-foreground"}`}>
            <span>{strength?.hasMinLength ? "✓" : "○"} At least 6 characters</span>
          </div>
          <div className={`flex items-center gap-2 ${strength?.hasUpperCase ? "text-green-600" : "text-muted-foreground"}`}>
            <span>{strength?.hasUpperCase ? "✓" : "○"} One uppercase letter (A-Z)</span>
          </div>
          <div className={`flex items-center gap-2 ${strength?.hasSymbol ? "text-green-600" : "text-muted-foreground"}`}>
            <span>{strength?.hasSymbol ? "✓" : "○"} One symbol (!@#$%^&*)</span>
          </div>
        </div>

        {errors.password && <p className="ml-1 text-xs text-destructive mt-1">{errors.password.message}</p>}
        {errors.root && <p className="ml-1 text-xs text-destructive mt-1">{errors.root.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-bg flex w-full items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </AuthCard>
  );
}
