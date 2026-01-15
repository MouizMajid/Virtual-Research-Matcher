import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Plus, 
  FileText, 
  Users, 
  Clock,
  LogOut
} from "lucide-react";

const ResearcherDashboard = () => {
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
              Dr. Jane Smith
            </span>
            <Link to="/">
              <button  className="border-2">
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
              Manage your job postings and applications
            </p>
          </div>
          <button className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            New Posting
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Active Postings</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Postings */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Recent Postings</h2>
          <div className="space-y-4">
            {[
              { title: "Machine Learning Research Assistant", applicants: 12, status: "Active" },
              { title: "Data Analysis Intern", applicants: 7, status: "Active" },
              { title: "Lab Technician", applicants: 4, status: "Active" },
            ].map((posting, index) => (
              <div 
                key={index}
                className="flex items-center justify-between border-2 border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <h3 className="font-medium">{posting.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {posting.applicants} applicants
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="border border-border bg-secondary px-2 py-1 text-xs font-medium">
                    {posting.status}
                  </span>
                  <button className="border-2">
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
