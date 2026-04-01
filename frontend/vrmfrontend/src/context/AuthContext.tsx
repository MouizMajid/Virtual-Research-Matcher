import { createContext, useContext, useState, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode";  // npm install jwt-decode

// 1. Define the shape of your auth data
type Role = "student" | "researcher" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  isLoggedIn: boolean;
  login: (token: string) => void;   // call this after successful login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 3. The Provider — wraps your app and holds the actual state
export function AuthProvider({ children }: { children: ReactNode }) {
  const decodeToken = (token: string): User => {
    const decoded = jwtDecode<User & { role: string }>(token);
    return { ...decoded, role: decoded.role?.toLowerCase() as Role };
  };

  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return decodeToken(token);
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(decodeToken(token));
  };

  const logout = () => {
    localStorage.removeItem("token");  
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    role: user?.role ?? null,
    isLoggedIn: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. The custom hook — this is what every component will use
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

