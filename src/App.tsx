import { JSX } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App(): JSX.Element {

  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
          <BrowserRouter>
            <div className="container">
              <Navbar />
              <Routes>
                <Route path="/" element={user ? <div>Home</div> : <Navigate to="/login" replace />}>
                </Route>
                <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />}>
                </Route>
                <Route path="/signup" element={ !user ? <Signup /> : <Navigate to='/login' replace/>}>
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
      )}
    </div>
  );
}

export default App;
