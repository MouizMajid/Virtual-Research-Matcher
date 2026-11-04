import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { clearSessionExpiredNotice, wasSessionExpired } from "../../lib/session";

// Replaces the old email/password form entirely - CAS is now the only way in.
// This page itself never talks to the backend via Axios; signing in is a plain
// full-page redirect (see handleSignIn), because CAS needs to own the browser's
// address bar to do its thing (login page, Duo MFA, etc). The round trip ends at
// SsoCallback.tsx, which is where the resulting JWT actually gets picked up.
export default function Login() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [sessionExpired] = useState(wasSessionExpired);

  // Show the notice once, not every time this page is visited.
  useEffect(() => {
    clearSessionExpiredNotice();
  }, []);

  if (isLoggedIn) {
    navigate("/dashboard/profile", { replace: true });
  }

  const handleSignIn = () => {
    // Full page navigation (not an Axios call) to CasAuthenticationController's
    // /auth/cas/login, which 302-redirects on to Western's actual CAS login page.
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/cas/login`;
  };

  return (
    <AuthCard
      title={sessionExpired ? "Your session has expired" : "Welcome back"}
      subtitle={
        sessionExpired
          ? "For your security, you're signed out after 4 hours. Sign in again to pick up where you left off."
          : "Sign in with your Western University account to continue"
      }
    >
      <Button className="w-full" onClick={handleSignIn}>
        Sign in with Western
      </Button>
    </AuthCard>
  );
}
