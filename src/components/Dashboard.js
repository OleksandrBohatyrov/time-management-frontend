import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (!role) {
            navigate('/login');
        } else {
            fetchProjects();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('https://localhost:7150/api/Projects');
            setProjects(response.data);
        } catch (error) {
            alert('Failed to load projects');
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {projects.map((project) => (
                <div key={project.id}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
