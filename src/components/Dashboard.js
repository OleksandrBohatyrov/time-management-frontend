import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel';
axios.defaults.withCredentials = true;
function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        if (loggedInUser) {
            fetchTasksAndProjects();
        }
    }, []);

    const fetchTasksAndProjects = async () => {
        try {
            const tasksResponse = await axios.get('https://localhost:7150/api/Tasks/userTasks');
            setTasks(tasksResponse.data);
        } catch (error) {
            console.error('Ошибка при получении задач и проектов:', error);
        }
    };

    return (
        <div>
            <h2>Добро пожаловать, {user?.username}</h2>

            {user?.role === 'Admin' && <AdminPanel fetchTasksAndProjects={fetchTasksAndProjects} />}

            <div>
                <h3>Список задач</h3>
                {tasks.map((task) => (
                    <div key={task.id} style={{ backgroundColor: task.isCompleted ? 'lightgreen' : 'white' }}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
