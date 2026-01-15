import { Link } from "react-router-dom";
import { Briefcase, Users, GraduationCap, ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">ResearchConnect</span>
          </div>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-border">
        <div 
          className="absolute inset-0 bg-cover bg-center"
        //   style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Connect Research.<br />
              <span className="text-muted-foreground">Build Futures.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              The platform bridging researchers and students for groundbreaking 
              opportunities in academia and industry.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/login">
                <button className="w-full shadow-md sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b-2 border-border py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* For Researchers */}
            <div className="border-2 border-border bg-card p-8 shadow-md transition-all hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">For Researchers</h3>
              <p className="mt-2 text-muted-foreground">
                Post research opportunities and find talented students to join 
                your projects. Manage applications and build your team.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Create job postings
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Review applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Manage your team
                </li>
              </ul>
            </div>

            {/* For Students */}
            <div className="border-2 border-border bg-card p-8 shadow-md transition-all hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">For Students</h3>
              <p className="mt-2 text-muted-foreground">
                Discover research positions that match your skills and interests. 
                Apply with ease and track your applications.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Browse opportunities
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Easy application process
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-foreground" />
                  Track your progress
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b-2 border-border bg-secondary py-16">
        <div className="container">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold md:text-5xl">500+</p>
              <p className="mt-2 text-muted-foreground">Active Researchers</p>
            </div>
            <div>
              <p className="text-4xl font-bold md:text-5xl">2,000+</p>
              <p className="mt-2 text-muted-foreground">Students Connected</p>
            </div>
            <div>
              <p className="text-4xl font-bold md:text-5xl">1,200+</p>
              <p className="mt-2 text-muted-foreground">Positions Filled</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of researchers and students already using 
            ResearchConnect to build meaningful connections.
          </p>
          <Link to="/login" className="mt-8 inline-block">
            <button  className="shadow-md">
              Login Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-secondary py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 ResearchConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
