import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setRole, setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7150/api/Users/login', {
                username,
                password,
            });

            if (response.status === 200 && response.data.role) {
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('userId', response.data.userId);
                setRole(response.data.role);
                setIsLoggedIn(true);

                console.log('Login successful:', response.data);

                if (response.data.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                alert('Login failed: Invalid credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed: Please check your username and password.');
        }
    };

    return (
        <div>
            <h2>Logi sisse</h2>
            <input
                type="text"
                placeholder="Kasutajanimi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Salasõna"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Logi sisse</button>
        </div>
    );
}

export default Login;
