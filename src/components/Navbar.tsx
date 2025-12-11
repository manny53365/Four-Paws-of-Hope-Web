import { Link } from 'react-router-dom';
// import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import './Navbar.css'
import { Button } from '@mui/material';
import logo from '../assets/fpohLogo.png'

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const usePathname = window.location.pathname;

  return (
    <div className="navbar">
      <ul>
        {(
          <li className="logo">
            <img src={logo} alt="Logo" />
            <span>Four Paws Of Hope</span>
          </li>
        )}

        {!user && (
          <>
            <li>
              <Button><Link to="/login">Login</Link></Button>
            </li>
            <li>
              <Button><Link to="/signup">Sign Up</Link></Button>
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
