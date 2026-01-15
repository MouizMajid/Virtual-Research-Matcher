import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Search, 
  FileCheck, 
  Clock,
  CheckCircle,
  LogOut
} from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">ResearchConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Alex Johnson
            </span>
            <Link to="/">
              <button className="border-2">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Find opportunities and track your applications
            </p>
          </div>
          <button className="shadow-sm">
            <Search className="mr-2 h-4 w-4" />
            Browse Jobs
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">My Applications</h2>
          <div className="space-y-4">
            {[
              { title: "Machine Learning Research Assistant", researcher: "Dr. Jane Smith", status: "Interview" },
              { title: "Bioinformatics Intern", researcher: "Prof. Michael Chen", status: "Under Review" },
              { title: "Quantum Computing Research", researcher: "Dr. Sarah Lee", status: "Under Review" },
              { title: "Environmental Data Analyst", researcher: "Prof. David Park", status: "Applied" },
            ].map((application, index) => (
              <div 
                key={index}
                className="flex items-center justify-between border-2 border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <h3 className="font-medium">{application.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {application.researcher}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`border border-border px-2 py-1 text-xs font-medium ${
                    application.status === "Interview" 
                      ? "bg-foreground text-background" 
                      : "bg-secondary"
                  }`}>
                    {application.status}
                  </span>
                  <button  className="border-2">
                    Details
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

export default StudentDashboard;
