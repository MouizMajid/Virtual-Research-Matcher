import { createContext, useContext, useState, type ReactNode } from "react";

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
  login: (userData: User) => void;   // call this after successful login
  logout: () => void;
}

// 2. Create the context (null is just the initial empty value)
const AuthContext = createContext<AuthContextType | null>(null);

// 3. The Provider — wraps your app and holds the actual state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
  id: "123",
  name: "Test Student",
  email: "test@student.com",
  role: "student" // Force the role here
        });
    
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const value: AuthContextType = {
    user,
    role: user?.role ?? null,   // if no user, role is null
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