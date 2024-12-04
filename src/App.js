import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                 {/* Дефолтная страница - Register */}
                 <Route path="/" element={<Navigate to="/register" />} />
                 <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/dashboard" element={<Dashboard />} />
        
            </Routes>
        </Router>
    );
}

export default App;
