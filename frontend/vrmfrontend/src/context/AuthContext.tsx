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

// 2. Create the context (null is just the initial empty value)
const AuthContext = createContext<AuthContextType | null>(null);

// 3. The Provider — wraps your app and holds the actual state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return jwtDecode<User>(token);  // rehydrate user from existing token
    } catch {
      localStorage.removeItem("token");  // token was malformed, clean it up
      return null;
    }
  });
    
  const login = (token: string) => {
    localStorage.setItem("token", token);       // 1. persist the raw token
    const decoded = jwtDecode<User>(token);     // 2. decode to get user info
    setUser(decoded);                           // 3. save into context state
  };

  const logout = () => {
    localStorage.removeItem("token");  // 👈 clear the token
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

