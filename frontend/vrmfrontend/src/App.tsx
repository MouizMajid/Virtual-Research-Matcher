import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import BrowseProjects from "./pages/BrowseProjects";
import ViewPosting from "./pages/ViewPosting";
import ApplicationPage from "./pages/ApplicationPage";
import StudentDashboard from "./pages/StudentDashboard";
import ResearcherDashboard from "./pages/ResearcherDashboard";
import MyApplications from "./pages/MyApplications";
import MyPostings from "./pages/MyPostings"; 
import ViewApplicants from "./pages/ViewApplicants";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import { Login, Register, EmailVerification, ForgotPassword, ResetPassword } from "./pages/AuthPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/browse" element={<BrowseProjects />} />
            <Route path="/posting/:id" element={<ViewPosting />} />
            <Route path="/application/:id" element={<ApplicationPage />} />
            <Route path="/about" element={<Landing />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Student Dashboard */}
          <Route element={<DashboardLayout role="student" />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/my-applications" element={<MyApplications />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Route>

          {/* Researcher Dashboard */}
          <Route element={<DashboardLayout role="researcher" />}>
            <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
            <Route path="/dashboard/my-postings" element={<MyPostings />} />
            <Route path="/dashboard/applicants/:id" element={<ViewApplicants />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
