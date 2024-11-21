import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://localhost:7150/api/Projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Ошибка загрузки проектов:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Проекты</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Projects;
