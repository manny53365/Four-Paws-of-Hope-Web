import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        {(
          <li className="logo">
            <span>Project Validation</span>
          </li>
        )}

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending ? (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="btn" disabled>
                Logging out
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}