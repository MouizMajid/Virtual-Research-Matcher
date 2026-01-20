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
          <ThemeToggle />
        </div>
      </header>
    )
}

export default Header;