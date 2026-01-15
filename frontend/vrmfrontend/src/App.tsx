
import { BrowserRouter, Routes, Route, createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ResearcherDashboard from "./pages/RDB";
import StudentDashboard from "./pages/SDB";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/researcher",
    element: <ResearcherDashboard />,
  },
  {
    path: "/student",
    element: <StudentDashboard />,
  },
  {
    path: "*",
    element: <NotFound />
  }
])

const App = () => (
  <RouterProvider router={router} />
);

export default App;
