import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on navigation by default - clicking a
// footer/nav link while scrolled down just renders the new page already scrolled down.
// Rendered once inside BrowserRouter so it applies to every route, not just the footer.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
