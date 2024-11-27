import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7150/api/Users/login', { username, password }, { withCredentials: true });
            console.log("Ответ от сервера:", response);

            const { username: returnedUsername, role } = response.data;
            localStorage.setItem('user', JSON.stringify({ username: returnedUsername, role }));

            if (role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Ошибка при входе:", error);
            alert('Ошибка при входе');
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
