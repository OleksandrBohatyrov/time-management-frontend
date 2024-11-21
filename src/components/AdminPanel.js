import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel({ fetchTasksAndProjects }) {
    const [newTask, setNewTask] = useState({ title: '', description: '', userId: '' });
    const [newProject, setNewProject] = useState({ title: '', description: '' });
    const [taskToUpdate, setTaskToUpdate] = useState({ id: '', title: '', description: '', userId: '' });
    const [projectToUpdate, setProjectToUpdate] = useState({ id: '', title: '', description: '' });

    const handleAddTask = async () => {
        try {
            await axios.post('https://localhost:7150/api/Tasks', newTask);
            alert('Задача добавлена успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при добавлении задачи: ' + error.response?.data || 'Неизвестная ошибка');
        }
    };

    const handleAddProject = async () => {
        try {
            await axios.post('https://localhost:7150/api/Projects', newProject);
            alert('Проект добавлен успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при добавлении проекта: ' + error.response?.data || 'Неизвестная ошибка');
        }
    };

    const handleUpdateTask = async () => {
        try {
            await axios.put(`https://localhost:7150/api/Tasks/${taskToUpdate.id}`, taskToUpdate);
            alert('Задача обновлена успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при обновлении задачи');
        }
    };

    const handleUpdateProject = async () => {
        try {
            await axios.put(`https://localhost:7150/api/Projects/${projectToUpdate.id}`, projectToUpdate);
            alert('Проект обновлен успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при обновлении проекта');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://localhost:7150/api/Tasks/${taskId}`);
            alert('Задача удалена успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при удалении задачи');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`https://localhost:7150/api/Projects/${projectId}`);
            alert('Проект удален успешно');
            setTimeout(() => fetchTasksAndProjects(), 500);
        } catch (error) {
            alert('Ошибка при удалении проекта');
        }
    };

    return (
        <div>
            <h3>Панель Администратора</h3>

            <div>
                <h4>Добавить проект</h4>
                <input type="text" placeholder="Название проекта" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                <input type="text" placeholder="Описание проекта" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                <button onClick={handleAddProject}>Добавить проект</button>
            </div>

            <div>
                <h4>Добавить задачу</h4>
                <input type="text" placeholder="Название задачи" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                <input type="text" placeholder="Описание задачи" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                <button onClick={handleAddTask}>Добавить задачу</button>
            </div>

            <div>
                <h4>Обновить задачу</h4>
                <input type="text" placeholder="ID задачи" value={taskToUpdate.id} onChange={(e) => setTaskToUpdate({ ...taskToUpdate, id: e.target.value })} />
                <input type="text" placeholder="Название задачи" value={taskToUpdate.title} onChange={(e) => setTaskToUpdate({ ...taskToUpdate, title: e.target.value })} />
                <input type="text" placeholder="Описание задачи" value={taskToUpdate.description} onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })} />
                <button onClick={handleUpdateTask}>Обновить задачу</button>
            </div>

            <div>
                <h4>Обновить проект</h4>
                <input type="text" placeholder="ID проекта" value={projectToUpdate.id} onChange={(e) => setProjectToUpdate({ ...projectToUpdate, id: e.target.value })} />
                <input type="text" placeholder="Название проекта" value={projectToUpdate.title} onChange={(e) => setProjectToUpdate({ ...projectToUpdate, title: e.target.value })} />
                <input type="text" placeholder="Описание проекта" value={projectToUpdate.description} onChange={(e) => setProjectToUpdate({ ...projectToUpdate, description: e.target.value })} />
                <button onClick={handleUpdateProject}>Обновить проект</button>
            </div>

            <div>
                <h4>Удалить задачу или проект</h4>
                <input type="text" placeholder="ID задачи для удаления" onChange={(e) => handleDeleteTask(e.target.value)} />
                <input type="text" placeholder="ID проекта для удаления" onChange={(e) => handleDeleteProject(e.target.value)} />
            </div>
        </div>
    );
}

export default AdminPanel;
