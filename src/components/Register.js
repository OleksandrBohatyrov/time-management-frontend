import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'User' });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('https://localhost:7150/api/Users/register', formData);
            alert('Registreerimine edukas! Nüüd saate sisse logida.');
            navigate('/login'); 
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registreerimine ebaõnnestus!');
        }
    };

    return (
        <div>
            <h1>Registreeri</h1>
            <input
                type="text"
                placeholder="Kasutajanimi"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="E-post"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Salasõna"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button onClick={handleRegister}>Registreeri</button>
            <button onClick={() => navigate('/login')}>Mine sisselogimisele</button>
        </div>
    );
}

export default Register;
