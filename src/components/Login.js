import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7150/api/Users/login', {
                username,
                password
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '/dashboard';
        } catch (error) {
            alert('Ошибка при входе: ' + error.response?.data || 'Неизвестная ошибка');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}

export default Login;
