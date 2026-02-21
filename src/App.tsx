import { JSX } from "react";
import "./index.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/dashboard";
import Navbar from "./components/Navbar";
import Donation from "./pages/donation/donation";
import Report from "./pages/report/Report";
import PetDetailPage from "./pages/pet-detail/PetDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App(): JSX.Element {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
          <BrowserRouter>
            <div className="container">
              <Navbar />
              <Routes>
                <Route path="/" element={user ? <Dashboard/> : <Login />}>
                </Route>
                <Route path="/login" element={user ? <Navigate to='/' replace /> : <Login />}>
                </Route>
                <Route path="/signup" element={ user ? <Navigate to='/' replace /> : <Signup/>}>
                </Route>
                <Route path="/donation" element={ user ? <Donation /> : <Login />}>
                </Route>
                <Route path="/report" element={ user ? <Report /> : <Login />}></Route>
              </Routes>
              <Routes>
                <Route path="/pets/:id" element={<PetDetailPage />} />
              </Routes>
            </div>
          </BrowserRouter>
      )}
    </div>
  );
}

export default App;
