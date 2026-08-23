import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/public/Landing";
import About from "./pages/public/About";
import FAQ from "./pages/public/FAQ";
import Support from "./pages/public/Support";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import TermsOfService from "./pages/public/TermsOfService";
import Documentation from "./pages/public/Documentation";

import BrowseProjects from "./pages/dashboard/shared/BrowseProjects";
import ViewPosting from "./pages/dashboard/shared/ViewPosting";
import Profile from "./pages/dashboard/shared/Profile";
import EditProfile from "./pages/dashboard/shared/EditProfile";
import PublicProfile from "./pages/dashboard/shared/PublicProfile";
import SettingsPage from "./pages/dashboard/shared/SettingsPage";

import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import MyApplications from "./pages/dashboard/student/MyApplications";
import ViewApplication from "./pages/dashboard/student/ViewApplication";
import ApplicationPage from "./pages/dashboard/student/ApplicationPage";

import ResearcherDashboard from "./pages/dashboard/researcher/ResearcherDashboard";
import MyPostings from "./pages/dashboard/researcher/MyPostings";
import CreatePosting from "./pages/dashboard/researcher/CreatePosting";
import EditPosting from "./pages/dashboard/researcher/EditPosting";
import ViewApplicants from "./pages/dashboard/researcher/ViewApplicants";
import ResearcherViewApplication from "./pages/dashboard/researcher/ResearcherViewApplication";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { useTheme } from "./hooks/useTheme";

const queryClient = new QueryClient();

const App = () => {
  useTheme();
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/public-browse" element={<BrowseProjects />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/docs" element={<Documentation />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Logged-in users (any role) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/posting/:id" element={<ViewPosting />} />
              <Route path="/browse" element={<BrowseProjects />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/edit-profile" element={<EditProfile />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
            </Route>
          </Route>
          
          {/* Student Dashboard */}
          <Route element={<ProtectedRoute roles={["student"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/my-applications" element={<MyApplications />} />
              <Route path="/dashboard/applications/:id" element={<ViewApplication />} />
              <Route path="/application/:id" element={<ApplicationPage />} />
            </Route>
          </Route>

          {/* Researcher Dashboard */}
          <Route element={<ProtectedRoute roles={["researcher"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
              <Route path="/dashboard/my-postings" element={<MyPostings />} />
              <Route path="/dashboard/create-posting" element={<CreatePosting />} />
              <Route path="/dashboard/applicants/:id" element={<ViewApplicants />} />
              <Route path="/dashboard/researcher/applications/:id" element={<ResearcherViewApplication />} />
              <Route path="/dashboard/edit-posting/:id" element={<EditPosting />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
  </QueryClientProvider>
  )
};

export default App;
