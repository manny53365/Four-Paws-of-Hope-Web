import { JSX } from "react";
import "./index.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/dashboard";
import Navbar from "./components/Navbar";
import Donation from "./pages/donation/donation";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//I have changed the routing logic because I couldn't register 
//The next person should change it back later on to prevent non-authenticated users from accessing protected routes.
//I also added tailwind styling to login and register pages but did not change the logic of them.
//also check the navbar for changes.

function App(): JSX.Element {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <div>Home</div> : <Navigate to="/login" replace />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" replace /> : <Login />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" replace />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/donation"
                element={user ? <Donation /> : <Navigate to="/login" replace />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
