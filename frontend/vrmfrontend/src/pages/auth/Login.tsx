import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../../lib/api";


type FormFields = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const { login } = useAuth();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (formdata) => {
    try {
      const { data } = await api.post("/auth/login", {email: formdata.email, password: formdata.password});
      login(data.token);
      navigate("/dashboard/profile");
    } catch (error) {
      setError("root", { message: "Invalid email or password" });
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={<>Don't have an account? <Link to="/register" className=" font-medium text-primary hover:underline">Register</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            placeholder="you@university.edu"
            className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.email && <p className="ml-1 text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long"
              }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-10 w-full rounded-xl border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
           <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="ml-1 text-xs text-red-500 mt-1">{errors.password.message}</p>}
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

        {errors.root && <p className="ml-1 text-xs text-red-500 mt-1">{errors.root.message}</p>}

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