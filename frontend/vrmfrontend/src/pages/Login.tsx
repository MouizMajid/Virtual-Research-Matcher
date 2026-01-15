import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Briefcase, Users, GraduationCap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleResearcherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to researcher dashboard
    navigate("/researcher");
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to student dashboard
    navigate("/student");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-background">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">ResearchConnect</span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="w-full max-w-md border-2 border-border bg-card p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Sign in to your account
          </p>

          {/* <Tabs defaultValue="researcher" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 border-2 border-border bg-secondary p-0">
              <TabsTrigger 
                value="researcher" 
                className="flex items-center gap-2 border-r border-border data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                <Users className="h-4 w-4" />
                Researcher
              </TabsTrigger>
              <TabsTrigger 
                value="student"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
            </TabsList>

            <TabsContent value="researcher" className="mt-6">
              <form onSubmit={handleResearcherLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="researcher-email">Email</Label>
                  <Input
                    id="researcher-email"
                    type="email"
                    placeholder="researcher@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="researcher-password">Password</Label>
                  <Input
                    id="researcher-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2"
                  />
                </div>
                <Button type="submit" className="w-full shadow-sm">
                  Sign in as Researcher
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="student" className="mt-6">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2"
                  />
                </div>
                <Button type="submit" className="w-full shadow-sm">
                  Sign in as Student
                </Button>
              </form>
            </TabsContent>
          </Tabs> */}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span className="font-medium text-foreground underline underline-offset-4 cursor-pointer">
              Contact your institution
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
