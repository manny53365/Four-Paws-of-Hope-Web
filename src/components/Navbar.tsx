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
  // const usePathname = window.location.pathname;

  return (
    <div className="navbar">
      <ul>
        {(
          <li className="logo">
            <img src={logo} alt="Logo" />
            {/* <span>Four Paws Of Hope</span> */}
          </li>
        )}

        {!user && (
          <>
            <li>
              <Button><Link to="/dashboard">Dashboard</Link></Button>
            </li>
            <li>
              <Button><Link to="/donation">Donation</Link></Button>
            </li>
            <li>
              <Button><Link to="/login">Login</Link></Button>
            </li>
            <li>
              <Button><Link to="/signup">Sign Up</Link></Button>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Button><Link to="/login" onClick={logout}>Logout</Link></Button>
            </li>
            <li>
              <Button><Link to="/donation">Donation</Link></Button>
            </li>
          </>
        )}
        </ul>
      </div>
  );
}
