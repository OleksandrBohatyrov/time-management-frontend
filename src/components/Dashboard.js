import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchProjectsAndTasks();
    }, []);

    const fetchProjectsAndTasks = async () => {
        try {
            const projectsResponse = await axios.get('https://localhost:7150/api/Projects');
            setProjects(projectsResponse.data);

            const tasksResponse = await axios.get('https://localhost:7150/api/Tasks');
            setTasks(tasksResponse.data);
        } catch (error) {
            console.error('Error fetching projects and tasks:', error);
        }
    };

    const markTaskAsDone = async (taskId) => {
        try {
            const taskToUpdate = tasks.find((task) => task.id === taskId);
            if (taskToUpdate) {
                await axios.put(`https://localhost:7150/api/Tasks/${taskId}`, {
                    ...taskToUpdate,
                    isCompleted: true, // Mark as completed
                });
                alert('Task marked as Done!');
                fetchProjectsAndTasks(); // Refresh tasks
            }
        } catch (error) {
            console.error('Error marking task as done:', error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Armatuurlaud</h1>
            {projects.map((project) => (
                <div className="project-card" key={project.id}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <h4>Tasks:</h4>
                    {tasks
                        .filter((task) => task.projectId === project.id)
                        .map((task) => (
                            <div
                                className={`task-card ${task.userId === userId ? 'user-task' : ''}`}
                                key={task.id}
                            >
                                <p>
                                    <b>Pealkiri:</b> {task.title}
                                </p>
                                <p>
                                    <b>Kirjeldus:</b> {task.description}
                                </p>
                                <p>
                                    <b>Algusaeg:</b> {new Date(task.startTime).toLocaleString()}
                                </p>
                                <p>
                                    <b>Lõpuaeg:</b> {new Date(task.endTime).toLocaleString()}
                                </p>
                                <p>
                                    <b>Staatus:</b>{' '}
                                    {task.isCompleted ? 'Completed' : 'In Progress'}
                                </p>
                                {task.userId === userId && !task.isCompleted && (
                                    <button
                                        className="mark-done-button"
                                        onClick={() => markTaskAsDone(task.id)}
                                    >
                                        Valmis
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
