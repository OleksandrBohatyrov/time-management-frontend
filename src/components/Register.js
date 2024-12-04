import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'User' });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('https://localhost:7150/api/Users/register', formData);
            alert('Registration successful! You can now log in.');
            navigate('/login'); // Переход на страницу логина после регистрации
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed!');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
    );
}

export default Register;
