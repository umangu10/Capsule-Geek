import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Labs from './pages/Labs';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';
import Quiz from './pages/Quiz';
import PentestingLab from './pages/PentestingLab';
import CTF from './pages/CTF';
import CTFChallenge from './pages/CTFChallenge';
import './styles/base/variables.css';
import './styles/base/reset.css';
import './styles/base/global.css';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/plans" element={<Plans />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses/:courseId/week/:weekId/quiz" element={<Quiz />} />
            <Route path="/labs/pentesting/:id" element={<PentestingLab />} />
            <Route path="/ctf" element={<CTF />} />
            <Route path="/ctf/challenge/:id" element={<CTFChallenge />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
    