import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext"; 
//I have changed the navbar logic but left the original code commented out for the next person to review.
//I have said where I made changes in the App.tsx file.

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const usePathname = window.location.pathname;

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-blue-600 tracking-tight">
            Four Paws of Hope
          </span>
        </Link>

        <ul className="flex items-center space-x-6">
          {/login/.test(usePathname) && (
          // {!user && (}
            <>
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {!/login/.test(usePathname) && (
          // {user && ()}
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition"
                >
                  Dashboard
                </Link>
              </li>
                            <li>
                <Link
                  to="/donation"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition"
                >
                  Donation
                </Link>
              </li>
              <li>
                {!isPending ? (
                  <button
                    onClick={logout}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-100 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed font-medium"
                  >
                    Logging out...
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
