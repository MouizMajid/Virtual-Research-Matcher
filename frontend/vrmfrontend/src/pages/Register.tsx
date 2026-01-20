import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Briefcase, GraduationCap, Users } from "lucide-react";
import Header from "../components/Header";

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
    useEffect(() => {
    document.title = "Register - ResearchConnect";
  }, []);
    const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<"researcher" | "student">(searchParams.get("role") === "student" ? "student" : "researcher");
    useEffect(() => {
    const newRole = searchParams.get("role") === "student" ? "student" : "researcher";
    setRole(newRole);
  }, [searchParams]);
    
  
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
    navigate(`/login?role=${role}`);
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

          <form onSubmit={handleSubmit(onSubmit)} className="stack">
            {/* Email */}
            <div className="stack gap-1">
              <label className="label">Email</label>
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
                placeholder="professor@edu.com"
                className="input"
              />
              <p className="error min-h-[.8rem]">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div className="stack gap-1">
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="text"
                placeholder="••••••"
                className="input"
              />
              <p className="error min-h-[.8rem]">{errors.password?.message}</p>
            </div>
            {/* Confirm Password */}
            <div className="stack gap-1">
              <label className="label">Confirm Password</label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                type="text"
                placeholder="••••••"
                className="input"
              />
              <p className="error min-h-[.8rem]">{errors.confirmPassword?.message}</p>
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
