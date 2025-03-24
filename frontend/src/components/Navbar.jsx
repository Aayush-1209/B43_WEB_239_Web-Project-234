import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 w-auto"
                src="..\image\TripSage.png"
                alt="Travel Explorer Logo"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-indigo-100 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation links - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white font-medium hover:text-indigo-100 transition duration-150">
              Home
            </Link>
            <Link to="/destinations" className="text-white font-medium hover:text-indigo-100 transition duration-150">
              Destinations
            </Link>
            {user && user.role === "admin" && (
              <Link to="/admin" className="text-white font-medium hover:text-indigo-100 transition duration-150">
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center text-white hover:text-indigo-100 transition"
                >
                  <span className="mr-2">Profile</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </Link>
                <button 
                  onClick={logout} 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-indigo-100 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800 rounded-b-lg shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            {user && user.role === "admin" && (
              <Link 
                to="/admin" 
                className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 text-white font-medium hover:bg-indigo-600 rounded-md bg-indigo-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;