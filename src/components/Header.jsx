import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Menu, X } from "lucide-react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <School className="h-10 w-10 text-indigo-600" />
            <span className="text-3xl font-extrabold text-gray-900">
              StudyConnect
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild><Link to="/">Home</Link></Button>
            <Button variant="ghost" asChild><Link to="/about">About</Link></Button>
            <Button variant="ghost" asChild><Link to="/departments">Departments</Link></Button>
            <Button variant="ghost" asChild><Link to="/faculty">Faculty</Link></Button>
            <Button variant="ghost" asChild><Link to="/contact">Contact</Link></Button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-8 w-8 text-indigo-700" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          {/* Dark overlay behind menu */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-screen w-[80vw] max-w-xs bg-white z-50 shadow-lg animate-slide-in-left flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div className="flex items-center gap-2">
                <School className="h-7 w-7 text-indigo-600" />
                <span className="font-bold text-lg">StudyConnect</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Drawer Links */}
            <nav className="flex flex-col p-4 gap-2 bg-white flex-grow">
              <NavLink
                to="/"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/departments"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Departments
              </NavLink>
              <NavLink
                to="/faculty"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Faculty
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Drawer Footer */}
            <div className="p-6 text-center text-xs text-gray-400 bg-white border-t">
              &copy; 2024 StudyConnect
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease forwards;
        }
      `}</style>
    </header>
  );
}
