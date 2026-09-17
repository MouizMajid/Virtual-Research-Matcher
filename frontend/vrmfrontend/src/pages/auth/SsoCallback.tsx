import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";

const ERROR_MESSAGES: Record<string, string> = {
  "validation-failed": "We couldn't verify your Western sign-in. Please try again.",
  "unrecognized-role": "Your account's affiliation isn't recognized by VRMM yet. Please contact support.",
  unknown: "Something went wrong signing you in. Please try again.",
};

export default function SsoCallback() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = searchParams.get("token");
    const errorCode = searchParams.get("error");

    if (token) {
      login(token, true);
      navigate("/dashboard/profile", { replace: true });
      return;
    }

    setError(ERROR_MESSAGES[errorCode ?? "unknown"] ?? ERROR_MESSAGES.unknown);
  }, [searchParams, login, navigate]);

  return (
    <AuthCard title={error ? "Sign-in failed" : "Signing you in..."}>
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Please wait while we complete your sign-in.</p>
      )}
    </AuthCard>
  );
}
