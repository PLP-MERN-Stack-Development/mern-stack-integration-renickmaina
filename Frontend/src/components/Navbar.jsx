import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { cn } from "../lib/utils.js";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className={cn("flex justify-between items-center p-4 bg-gray-800 text-white")}>
      <Link to="/" className="font-bold text-xl">MyBlog</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-200">Hello, {user.name}</span>
            <button
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
            <Link
              to="/posts/create"
              className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
            >
              New Post
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-indigo-500 rounded hover:bg-indigo-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
