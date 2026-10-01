import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";

// Mirrors the error codes CasAuthenticationController.callback() can redirect here with.
const ERROR_MESSAGES: Record<string, string> = {
  "validation-failed": "We couldn't verify your Western sign-in. Please try again.",
  "unrecognized-role": "Your account's affiliation isn't recognized by VRMM yet. Please contact support.",
  unknown: "Something went wrong signing you in. Please try again.",
};

// Landing point for the CAS round trip: Login.tsx sent the browser off to CAS,
// CAS sent it to our backend, and the backend's last redirect lands here with
// either ?token=<jwt> (success) or ?error=<code> (failure) in the URL.
export default function SsoCallback() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // React 18 StrictMode double-invokes effects in dev, and login()/navigate() aren't
  // idempotent (double-logging-in would double-write storage) - this guards against that.
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = searchParams.get("token");
    const errorCode = searchParams.get("error");

    if (token) {
      // Same login() as the old password form used - AuthContext doesn't know or
      // care that this JWT came from CAS instead of a login form.
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
