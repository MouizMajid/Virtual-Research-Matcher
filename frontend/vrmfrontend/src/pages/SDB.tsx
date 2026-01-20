import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  FileCheck,
  Clock,
  CheckCircle,
  LogOut,
} from "lucide-react";
import Header from "../components/Header";
import UserHeader from "../components/UserHeader";
import { useEffect } from "react";

const StudentDashboard = () => {

  useEffect (() => {
    document.title = "Student Dashboard - ResearchConnect";
  }, []);
  return (
    <div className="page">
      {/* Header */}
      <UserHeader />

      {/* Main Content */}
      <main className="container-page py-8 stack gap-10">
        <div className="row justify-between">
          <div className="stack gap-1">
            <h1 className="h2">Dashboard</h1>
            <p className="muted">Find opportunities and track your applications</p>
          </div>

          <button className="btn btn-primary">
            <Search className="h-4 w-4" />
            Browse Jobs
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <FileCheck className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">4</p>
                <p className="muted">Applications Sent</p>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <Clock className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">2</p>
                <p className="muted">Under Review</p>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="row gap-4">
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="stack gap-0">
                <p className="text-2xl font-semibold">1</p>
                <p className="muted">Interviews Scheduled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="stack gap-4">
          <h2 className="h3">My Applications</h2>

          <div className="card divide-y">
            {[
              {
                title: "Machine Learning Research Assistant",
                researcher: "Dr. Jane Smith",
                status: "Interview",
              },
              {
                title: "Bioinformatics Intern",
                researcher: "Prof. Michael Chen",
                status: "Under Review",
              },
              {
                title: "Quantum Computing Research",
                researcher: "Dr. Sarah Lee",
                status: "Under Review",
              },
              {
                title: "Environmental Data Analyst",
                researcher: "Prof. David Park",
                status: "Applied",
              },
            ].map((application, index) => (
              <div key={index} className="row justify-between px-5 py-4">
                <div className="stack gap-1">
                  <h3 className="font-medium">{application.title}</h3>
                  <p className="muted text-sm">{application.researcher}</p>
                </div>

                <div className="row gap-4">
                  <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium">
                    {application.status}
                  </span>
                  <button className="btn btn-ghost">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
