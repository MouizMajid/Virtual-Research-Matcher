
import { BrowserRouter, Routes, Route, createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Landing from "./pages/Main/Landing";
import Login from "./pages/Auth/Login";
import ResearcherDashboard from "./pages/Researcher/RDB";
import StudentDashboard from "./pages/Student/SDB";
import NotFound from "./pages/Main/NotFound";
import Register from "./pages/Auth/Register";
import Verify from "./pages/Auth/Verify";
import NewPosting from "./pages/Researcher/NewPosting";

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
    path: "/register",
    element: <Register />,
  },{

    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/researcher/new-posting",
    element: <NewPosting />,
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
