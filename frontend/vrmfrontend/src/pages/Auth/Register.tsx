import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Briefcase, GraduationCap, Users, EyeClosed, Eye } from "lucide-react";
import Header from "../../components/Header";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
    useEffect(() => {
    document.title = "Register - ResearchConnect";
  }, []);
  const navigate = useNavigate();
  const [role, setRole] = useState<"researcher" | "student">("researcher");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


 
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting},
  } = useForm<FormFields>();

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Registering", data);
    } catch (error) {
      setError("root", {
        message: "Something went wrong while creating your account",
      });
      console.error("Register error:", error);
    }   
    navigate(`/verify`);
  };

  return (
    <div className="page">
      {/* Header */}
      <Header/>

      {/* Register Form */}
      <main
        className="auth-shell"
        style={{ minHeight: "calc(100vh - 65px)" }}
      >
        <div className="auth-card stack">
          <div className="stack gap-1 text-center">
            <h1 className="h2">Create an Account</h1>
            <p className="muted">Register as a {role}</p>
          </div>
          {/* Role Tabs */}
          <div className="tabs">
            <button
              type="button"
              onClick={() => setRole("researcher")}
              className={`tab  flex items-center gap-2 ${role === "researcher" ? "tab-active" : ""}`}
            > 
              
              <Users className="h-4 w-4" />
              Researcher
            </button>
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`tab flex items-center gap-2 ${role === "student" ? "tab-active" : ""}`}
            >
              <GraduationCap className="h-4 w-4" />
              Student
            </button>
          </div>
          {/* first name */}
          <form onSubmit={handleSubmit(onSubmit)} className="stack">
            <div className="stack gap-1">
              <label className="label ml-1">First Name</label>
              <input 
                {...register("firstName", {
                    required: "First Name is required"})}
                    type="text" 
                    placeholder="John" 
                    className="input" />
              <p className="error min-h-[.2rem]">{errors.firstName?.message}</p>
            </div>
            {/* last name */}
            <div className="stack gap-1">
              <label className="label ml-1">Last Name</label>
              <input 
                {...register("lastName", {
                    required: "Last Name is required"})}
                    type="text" 
                    placeholder="Doe" 
                    className="input" />
              <p className="error min-h-[.2rem]">{errors.lastName?.message}</p>
            </div>
            {/* Email */}
            <div className="stack gap-1">
              <label className="label ml-1 ">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                placeholder={`${role}@edu.com`}
                className="input"
              />
              <p className="error min-h-[.2rem]">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div className="stack gap-1">
              <label className="label ml-1">Password</label>
              <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: { 
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/, 
                    message: "Password must contain at least one uppercase letter, one number, and one special character",
                   },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="input"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:brightness-50">
                {!showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button >
              </div>
              <p className="error min-h-[.2rem]">{errors.password?.message}</p>
            </div>
            {/* Confirm Password */}
            <div className="stack gap-1">
              <label className="label ml-1">Confirm Password</label>
              <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••"
                className="input"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:brightness-50">
                {!showConfirmPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button >
              </div>
              <p className="error min-h-[.2rem]">{errors.confirmPassword?.message}</p>
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-full"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="error text-center">{errors.root?.message}</p>
          </form>

          <p className="help text-center">
            <span className="underline cursor-pointer font-bold">
              <Link to={`/login?role=${role}`}>
              Back to Login
              </Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
