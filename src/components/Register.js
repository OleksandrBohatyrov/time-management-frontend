import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const handleRegister = async () => {
        try {
            await axios.post('https://localhost:7150/api/Users/register', {
                username,
                email,
                password,
                role
            });
            alert('Регистрация прошла успешно');
            window.location.href = '/login';
        } catch (error) {
            alert('Ошибка при регистрации: ' + error.response?.data || 'Неизвестная ошибка');
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
            <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}

export default Register;
