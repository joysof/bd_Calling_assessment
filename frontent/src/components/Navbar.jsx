import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          MyApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 transition">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-purple-600 transition">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-600 transition">Profile</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
