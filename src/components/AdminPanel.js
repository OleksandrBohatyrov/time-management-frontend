import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function AdminPanel() {
    const [newTask, setNewTask] = useState({ title: '', description: '', projectId: '', userId: '', startTime: '', endTime: '', isCompleted: false, isConfirmed: false });
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [projectToUpdate, setProjectToUpdate] = useState(null);

    useEffect(() => {
        fetchTasksAndProjects();
    }, []);

    const fetchTasksAndProjects = async () => {
        try {
            const tasksResponse = await axios.get('https://localhost:7150/api/Tasks', { withCredentials: true });
            setTasks(tasksResponse.data);
            const projectsResponse = await axios.get('https://localhost:7150/api/Projects', { withCredentials: true });
            setProjects(projectsResponse.data);
        } catch (error) {
            alert('Ошибка при загрузке задач и проектов');
        }
    };

    const fetchUsers = async () => {
        try {
            const usersResponse = await axios.get('https://localhost:7150/api/Users', { withCredentials: true });
            setUsers(usersResponse.data);
        } catch (error) {
            alert('Ошибка при загрузке пользователей');
        }
    };

    // Методы для задач
    const handleAddTask = async () => {
        try {
            await axios.post('https://localhost:7150/api/Tasks', newTask, { withCredentials: true });
            alert('Задача добавлена успешно');
            fetchTasksAndProjects();
        } catch (error) {
            alert('Ошибка при добавлении задачи');
        }
    };

    const handleEditTask = (task) => {
        setTaskToUpdate(task);
    };

    const handleUpdateTask = async () => {
        if (taskToUpdate) {
            try {
                await axios.put(`https://localhost:7150/api/Tasks/${taskToUpdate.id}`, taskToUpdate, { withCredentials: true });
                alert('Задача обновлена успешно');
                setTaskToUpdate(null);
                fetchTasksAndProjects();
            } catch (error) {
                alert('Ошибка при обновлении задачи');
            }
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://localhost:7150/api/Tasks/${taskId}`, { withCredentials: true });
            alert('Задача удалена успешно');
            fetchTasksAndProjects();
        } catch (error) {
            alert('Ошибка при удалении задачи');
        }
    };

    // Методы для проектов
    const handleAddProject = async () => {
        try {
            await axios.post('https://localhost:7150/api/Projects', newProject, { withCredentials: true });
            alert('Проект добавлен успешно');
            fetchTasksAndProjects();
        } catch (error) {
            alert('Ошибка при добавлении проекта');
        }
    };

    const handleEditProject = (project) => {
        setProjectToUpdate(project);
    };

    const handleUpdateProject = async () => {
        if (projectToUpdate) {
            try {
                await axios.put(`https://localhost:7150/api/Projects/${projectToUpdate.id}`, projectToUpdate, { withCredentials: true });
                alert('Проект обновлен успешно');
                setProjectToUpdate(null);
                fetchTasksAndProjects();
            } catch (error) {
                alert('Ошибка при обновлении проекта');
            }
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`https://localhost:7150/api/Projects/${projectId}`, { withCredentials: true });
            alert('Проект удален успешно');
            fetchTasksAndProjects();
        } catch (error) {
            alert('Ошибка при удалении проекта');
        }
    };

    return (
        <div>
            <h3>Панель Администратора</h3>

            {/* Добавление задачи */}
            <div>
                <h4>Добавить задачу</h4>
                <input type="text" placeholder="Название задачи" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                <input type="text" placeholder="Описание задачи" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                <input type="text" placeholder="ID проекта" value={newTask.projectId} onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })} />
                <input type="text" placeholder="ID пользователя" value={newTask.userId} onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })} />
                <input type="datetime-local" placeholder="Время начала" value={newTask.startTime} onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })} />
                <input type="datetime-local" placeholder="Время окончания" value={newTask.endTime} onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })} />
                <label>
                    Завершено:
                    <input type="checkbox" checked={newTask.isCompleted} onChange={(e) => setNewTask({ ...newTask, isCompleted: e.target.checked })} />
                </label>
                <label>
                    Подтверждено:
                    <input type="checkbox" checked={newTask.isConfirmed} onChange={(e) => setNewTask({ ...newTask, isConfirmed: e.target.checked })} />
                </label>
                <button onClick={handleAddTask}>Добавить задачу</button>
            </div>

            {/* Добавление проекта */}
            <div>
                <h4>Добавить проект</h4>
                <input type="text" placeholder="Название проекта" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                <input type="text" placeholder="Описание проекта" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                <button onClick={handleAddProject}>Добавить проект</button>
            </div>

            {/* Редактирование проекта */}
            {projectToUpdate && (
                <div>
                    <h4>Редактировать проект</h4>
                    <input type="text" placeholder="Название проекта" value={projectToUpdate.name} onChange={(e) => setProjectToUpdate({ ...projectToUpdate, name: e.target.value })} />
                    <input type="text" placeholder="Описание проекта" value={projectToUpdate.description} onChange={(e) => setProjectToUpdate({ ...projectToUpdate, description: e.target.value })} />
                    <button onClick={handleUpdateProject}>Обновить проект</button>
                </div>
            )}

            {/* Список проектов */}
            <div>
                <h4>Список проектов</h4>
                {projects.map((project) => (
                    <div key={project.id}>
                        <p><b>Проект ID:</b> {project.id}</p>
                        <p><b>Название проекта:</b> {project.name}</p>
                        <p><b>Описание проекта:</b> {project.description}</p>
                        <button onClick={() => handleEditProject(project)}>Редактировать</button>
                        <button onClick={() => handleDeleteProject(project.id)}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Список задач */}
            <div>
                <h4>Список задач</h4>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <p><b>Задача:</b> {task.title}</p>
                        <p><b>Описание:</b> {task.description}</p>
                        <button onClick={() => handleEditTask(task)}>Редактировать</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Кнопка и список пользователей */}
            <div>
                <h4>Список пользователей</h4>
                <button onClick={fetchUsers}>Показать пользователей</button>
                {users.map((user) => (
                    <div key={user.id}>
                        <p><b>ID пользователя:</b> {user.id}</p>
                        <p><b>Имя пользователя:</b> {user.username}</p>
                        <p><b>Email:</b> {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
