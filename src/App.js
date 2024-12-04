import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
            setIsLoggedIn(true);
        } else {
            setRole(null);
            setIsLoggedIn(false);
        }
    }, []);

    console.log('App Render: ', { isLoggedIn, role });

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/login"
                    element={<Login setRole={setRole} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/admin"
                    element={role === 'Admin' ? <AdminPanel /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
