import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";



function Header() {
    return (
        <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="row font-semibold text-lg">
            <Briefcase className="h-5 w-5" />
            <span>ResearchConnect</span>
          </Link>

          <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-red-500   px-3 py-2 shadow-sm hover:bg-accent hover:ring-2 hover:ring-[hsl(var(--ring))] hover:ring-offset-2 ">
            Sign Out
            </button>
            </Link>
            </div>
        </div>
      </header>
    )
}

export default Header;