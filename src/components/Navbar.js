import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar({ isLoggedIn, setIsLoggedIn, role }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="navbar-logo">Time Manager</div>
            <div className="navbar-links">
                <Link to="/dashboard">Armatuurlaud</Link>
                {role === 'Admin' && <Link to="/admin">Administraatori paneel</Link>}
            </div>
            <div className="navbar-buttons">
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Välja</button>
                ) : (
                    <>
                        <Link to="/login">
                            <button>Logi sisse</button>
                        </Link>
                        <Link to="/register">
                            <button>Registreeri</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
