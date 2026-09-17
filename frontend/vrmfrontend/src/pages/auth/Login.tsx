import { useAuth } from "../../context/AuthContext";
import { AuthCard } from "./AuthPages";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function Login() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/dashboard/profile", { replace: true });
  }

  const handleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/cas/login`;
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in with your Western University account to continue"
    >
      <Button className="w-full" onClick={handleSignIn}>
        Sign in with Western
      </Button>
    </AuthCard>
  );
}
