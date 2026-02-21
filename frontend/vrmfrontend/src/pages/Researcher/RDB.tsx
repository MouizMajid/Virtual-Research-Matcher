import { Link } from "react-router-dom";
import {
  Briefcase,
  Plus,
  FileText,
  Users,
  Clock,
  LogOut,
} from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";
import Header from "../../components/Header";
import UserHeader from "../../components/UserHeader";
import { useEffect } from "react";

const ResearcherDashboard = () => {
  useEffect (() => {
    document.title = "Researcher Dashboard - ResearchConnect";
  }, []);
  
  return (
    <div className="page">
      {/* Header */}
      <UserHeader />

      {/* Main Content */}
      <main className="container-page py-8 stack gap-10">
        {/* Top Row */}
        <div className="row justify-between">
          <div className="stack gap-1">
            <h1 className="h2">Dashboard</h1>
            <p className="muted">
              Manage your job postings and applications
            </p>
          </div>
          <Link to="/researcher/new-posting">
          <button className="btn btn-primary">
            <Plus className="h-4 w-4" />
            New Posting
          </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Active Postings */}
          <Link to="/researcher/postings">
          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <FileText className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">5</p>
                <p className="muted">Active Postings</p>
              </div>
            </div>
          </div>
          </Link>

          {/* Total Applicants */}
          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <Users className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">23</p>
                <p className="muted">Total Applicants</p>
              </div>
            </div>
          </div>

          {/* Pending Review */}
          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <Clock className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">8</p>
                <p className="muted">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Postings */}
        <div className="stack gap-4">
          <h2 className="h3">Recent Postings</h2>

          <div className="card divide-y">
            {[
              {
                title: "Machine Learning Research Assistant",
                applicants: 12,
                status: "Active",
              },
              {
                title: "Data Analysis Intern",
                applicants: 7,
                status: "Active",
              },
              {
                title: "Lab Technician",
                applicants: 4,
                status: "Active",
              },
            ].map((posting, index) => (
              <div
                key={index}
                className="row justify-between px-5 py-4"
              >
                <div className="stack gap-1">
                  <h3 className="font-medium">{posting.title}</h3>
                  <p className="muted text-sm">
                    {posting.applicants} applicants
                  </p>
                </div>

                <div className="row gap-4">
                  <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium">
                    {posting.status}
                  </span>
                  <button className="btn btn-ghost">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearcherDashboard;
