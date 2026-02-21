import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Briefcase, GraduationCap, Users } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";
import Header from "../../components/Header";

type FormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Login - ResearchConnect";
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Submitting", data);
    } catch (error) {
      setError("root", {
        message: "We did not recognize this email/password combination",
      });
      console.error("Login error:", error);
    }
    navigate("/researcher");
  };

  return (
    <div className="page">
      {/* Header */}
      <Header/>

      {/* Login Form */}
      <main
        className="auth-shell"
        style={{ minHeight: "calc(100vh - 65px)" }}
      >
        <div className="auth-card stack">
          <div className="stack gap-1 text-center">
            <h1 className="h2">Welcome!</h1>
            <p className="muted">Sign into your account</p>
          </div>

          {/* Role Tabs */}
          {/* <div className="tabs">
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
          </div> */}

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
                placeholder="user@edu.com"
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
                type="password"
                placeholder="••••••"
                className="input"
              />
              <p className="error min-h-[.8rem]">{errors.password?.message}</p>
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-full"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <p className="error text-center">{errors.root?.message}</p>
          </form>

          <p className="help text-center">
            Don&apos;t have an account?{" "}
            <span className="underline cursor-pointer font-bold">
              <Link to={`/register`}>
              Create One!
              </Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
