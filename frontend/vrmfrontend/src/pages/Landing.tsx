import { Link } from "react-router-dom";
import { Briefcase, Users, GraduationCap, ArrowRight } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import Header from "../components/Header";
import { useEffect } from "react";

const Landing = () => {

  useEffect(() => {
    document.title = "ResearchConnect - Connect Research. Build Futures.";
  }, []);

  return (
    <div className="page">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative">
        <div className="container-page py-24 text-center">
          <div className="stack items-center gap-6">
            <h1 className="h1 max-w-2xl">
              Connect Research.
              <br />
              <span className="text-[hsl(var(--accent))]">Build Futures.</span>
            </h1>

            <p className="muted max-w-xl">
              The platform bridging researchers and students for groundbreaking
              opportunities in academia and industry.
            </p>

            <Link to="/login">
              <button className="btn btn-primary">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[hsl(var(--muted))] py-20">
        <div className="container-page stack gap-12">
          <h2 className="h2 text-center">How It Works</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* For Researchers */}
            <div className="card card-pad stack">
              <div className="row">
                <Users className="h-6 w-6 text-[hsl(var(--accent))]" />
                <h3 className="h3">For Researchers</h3>
              </div>

              <p className="muted">
                Post research opportunities and find talented students to join
                your projects. Manage applications and build your team.
              </p>

              <ul className="stack gap-2">
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Create job postings
                </li>
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Review applications
                </li>
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Manage your team
                </li>
              </ul>
            </div>

            {/* For Students */}
            <div className="card card-pad stack">
              <div className="row">
                <GraduationCap className="h-6 w-6 text-[hsl(var(--accent))]" />
                <h3 className="h3">For Students</h3>
              </div>

              <p className="muted">
                Discover research positions that match your skills and interests.
                Apply with ease and track your applications.
              </p>

              <ul className="stack gap-2">
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Browse opportunities
                </li>
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Easy application process
                </li>
                <li className="row">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  Track your progress
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-page">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="stack gap-1">
              <p className="text-3xl font-semibold">500+</p>
              <p className="muted">Active Researchers</p>
            </div>
            <div className="stack gap-1">
              <p className="text-3xl font-semibold">2,000+</p>
              <p className="muted">Students Connected</p>
            </div>
            <div className="stack gap-1">
              <p className="text-3xl font-semibold">1,200+</p>
              <p className="muted">Positions Filled</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[hsl(var(--muted))] py-24">
        <div className="container-page text-center stack gap-6">
          <h2 className="h2">Ready to Get Started?</h2>

          <p className="muted max-w-xl mx-auto">
            Join thousands of researchers and students already using
            ResearchConnect to build meaningful connections.
          </p>

          <Link to="/login">
            <button className="btn btn-primary">
              Login Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container-page text-center muted">
          © 2026 ResearchConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}; 

export default Landing;
