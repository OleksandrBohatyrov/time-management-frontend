import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/AdminPanel.css'
import '../css/Modal.css'

function AdminPanel() {
    const [projectDetails, setProjectDetails] = useState(null);
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		projectId: '',
		userId: '',
		startTime: '',
		endTime: '',
		isCompleted: false,
		isConfirmed: false,
	})
	const [newProject, setNewProject] = useState({ name: '', description: '' })
	const [tasks, setTasks] = useState([])
	const [projects, setProjects] = useState([])
	const [users, setUsers] = useState([])
	const [taskDetails, setTaskDetails] = useState(null)
	const [editingTask, setEditingTask] = useState(null)
	const [editingProject, setEditingProject] = useState(null)

	useEffect(() => {
		fetchTasksAndProjects()
	}, [])

	const fetchTasksAndProjects = async () => {
		try {
			const tasksResponse = await axios.get('https://localhost:7150/api/Tasks')
			setTasks(tasksResponse.data)
			const projectsResponse = await axios.get('https://localhost:7150/api/Projects')
			setProjects(projectsResponse.data)
		} catch (error) {
			console.error('Error fetching tasks and projects:', error)
		}
	}

	const fetchUsers = async () => {
		try {
			const usersResponse = await axios.get('https://localhost:7150/api/Users/allUsers')
			setUsers(usersResponse.data)
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const handleAddTask = async () => {
		try {
			await axios.post('https://localhost:7150/api/Tasks/addTask', newTask)
			alert('Task added successfully!')
			fetchTasksAndProjects()
			setNewTask({
				title: '',
				description: '',
				projectId: '',
				userId: '',
				startTime: '',
				endTime: '',
				isCompleted: false,
				isConfirmed: false,
			})
		} catch (error) {
			console.error('Error adding task:', error)
		}
	}

	const handleAddProject = async () => {
		try {
			await axios.post('https://localhost:7150/api/Projects', newProject)
			alert('Project added successfully!')
			fetchTasksAndProjects()
			setNewProject({ name: '', description: '' })
		} catch (error) {
			console.error('Error adding project:', error.response || error)
			alert('Failed to add project.')
		}
	}

	const handleDeleteTask = async taskId => {
		try {
			await axios.delete(`https://localhost:7150/api/Tasks/${taskId}`)
			alert('Task deleted successfully!')
			fetchTasksAndProjects()
		} catch (error) {
			console.error('Error deleting task:', error)
		}
	}

	const handleDeleteProject = async projectId => {
		try {
			await axios.delete(`https://localhost:7150/api/Projects/${projectId}`)
			alert('Project deleted successfully!')
			fetchTasksAndProjects()
		} catch (error) {
			console.error('Error deleting project:', error)
		}
	}
	const handleUpdateTask = async () => {
		try {
			await axios.put(`https://localhost:7150/api/Tasks/${editingTask.id}`, editingTask)
			alert('Task updated successfully!')
			fetchTasksAndProjects()
			setEditingTask(null)
		} catch (error) {
			console.error('Error updating task:', error)
		}
	}

	const handleUpdateProject = async () => {
		try {
			await axios.put(`https://localhost:7150/api/Projects/${editingProject.id}`, editingProject)
			alert('Project updated successfully!')
			fetchTasksAndProjects()
			setEditingProject(null)
		} catch (error) {
			console.error('Error updating project:', error)
		}
	}

	return (
		<div className='admin-panel'>
			<h1>Administraatori paneel</h1>

			{/* Add Task */}
			<div>
				<h3>Lisa ülesanne</h3>
				<input type='text' placeholder='Title' value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
				<input type='text' placeholder='Description' value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
				<input type='text' placeholder='Project ID' value={newTask.projectId} onChange={e => setNewTask({ ...newTask, projectId: e.target.value })} />
				<input type='text' placeholder='User ID' value={newTask.userId} onChange={e => setNewTask({ ...newTask, userId: e.target.value })} />
				<label>
                Algusaeg:
					<input type='datetime-local' value={newTask.startTime} onChange={e => setNewTask({ ...newTask, startTime: e.target.value })} />
				</label>
				<label>
                Lõpuaeg:
					<input type='datetime-local' value={newTask.endTime} onChange={e => setNewTask({ ...newTask, endTime: e.target.value })} />
				</label>
				<label>
                On lõpetatud:
					<input type='checkbox' checked={newTask.isCompleted} onChange={e => setNewTask({ ...newTask, isCompleted: e.target.checked })} />
				</label>
				<label>
                On kinnitatud:
					<input type='checkbox' checked={newTask.isConfirmed} onChange={e => setNewTask({ ...newTask, isConfirmed: e.target.checked })} />
				</label>
				<button onClick={handleAddTask}>Add Task</button>
			</div>

			{/* Task List */}
			<div>
				<h3>Ülesannete nimekiri</h3>
				{tasks.map(task => (
					<div className='task-card' key={task.id}>
						<p>
							<b>Pealkiri:</b> {task.title}
						</p>
						<p>
							<b>Kirjeldus:</b> {task.description}
						</p>
						<button onClick={() => setTaskDetails(task)}>Vaata detaile</button>
						<button onClick={() => setEditingTask(task)}>Muuda</button>
						<button onClick={() => handleDeleteTask(task.id)}>Kustuta</button>
					</div>
				))}
			</div>
			{/* Edit Task Modal */}
			{editingTask && (
				<>
					<div className='modal-overlay' onClick={() => setEditingTask(null)}></div>
					<div className='details-modal'>
						<h3>Muuda ülesanne</h3>
						<label>
                        Pealkiri:
							<input type='text' value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} />
						</label>
						<label>
                        Kirjeldus:
							<input type='text' value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} />
						</label>
						<label>
                        Projekti ID:
							<input type='text' value={editingTask.projectId} onChange={e => setEditingTask({ ...editingTask, projectId: e.target.value })} />
						</label>
						<label>
                        Kasutaja ID:
							<input type='text' value={editingTask.userId} onChange={e => setEditingTask({ ...editingTask, userId: e.target.value })} />
						</label>
						<label>
                        Algusaeg:
							<input type='datetime-local' value={editingTask.startTime} onChange={e => setEditingTask({ ...editingTask, startTime: e.target.value })} />
						</label>
						<label>
                        Lõpuaeg:
							<input type='datetime-local' value={editingTask.endTime} onChange={e => setEditingTask({ ...editingTask, endTime: e.target.value })} />
						</label>
						<label>
                        On lõpetatud:
							<input type='checkbox' checked={editingTask.isCompleted} onChange={e => setEditingTask({ ...editingTask, isCompleted: e.target.checked })} />
						</label>
						<label>
                        On kinnitatud:
							<input type='checkbox' checked={editingTask.isConfirmed} onChange={e => setEditingTask({ ...editingTask, isConfirmed: e.target.checked })} />
						</label>
						<button onClick={handleUpdateTask}>Salvesta</button>
						<button onClick={() => setEditingTask(null)}>Tühista</button>
					</div>
				</>
			)}

			{/* Task Details Modal */}
			{taskDetails && (
				<>
					<div className='modal-overlay' onClick={() => setTaskDetails(null)}></div>
					<div className='details-modal'>
						<h3>Ülesande üksikasjad</h3>
						<p>
							<b>Pealkiri:</b> {taskDetails.title}
						</p>
						<p>
							<b>Kirjeldus:</b> {taskDetails.description}
						</p>
						<button onClick={() => setTaskDetails(null)}>Close</button>
					</div>
				</>
			)}

			{/* Add Project */}
			<div>
				<h3>Projekti lisamine</h3>
				<input type='text' placeholder='Name' value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
				<input type='text' placeholder='Description' value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
				<button onClick={handleAddProject}>Lisa projekt</button>
			</div>

			{/* Project List */}
			<div>
				<h3>Projekti nimekiri</h3>
				{projects.map(project => (
					<div className='project-card' key={project.id}>
						<p>
							<b>Name:</b> {project.name}
						</p>
						<button onClick={() => setProjectDetails(project)}>Vaata üksikasju</button>
                        <button onClick={() => setEditingProject(project)}>Muuda</button>
						<button onClick={() => handleDeleteProject(project.id)}>Kustuta</button>
					</div>
				))}
			</div>
             {/* Edit Project Modal */}
             {editingProject && (
                <>
                    <div className="modal-overlay" onClick={() => setEditingProject(null)}></div>
                    <div className="details-modal">
                        <h3>Muuda projekt</h3>
                        <label>
                            Nimi:
                            <input
                                type="text"
                                value={editingProject.name}
                                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Kirjeldus:
                            <input
                                type="text"
                                value={editingProject.description}
                                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            />
                        </label>
                        <button onClick={handleUpdateProject}>Salvesta</button>
                        <button onClick={() => setEditingProject(null)}>Tühista</button>
                    </div>
                </>
            )}

			{/* Project Details Modal */}
			{projectDetails && (
				<>
					<div className='modal-overlay' onClick={() => setProjectDetails(null)}></div>
					<div className='details-modal'>
						<h3>Projekti üksikasjad</h3>
						<p>
							<b>Nimi:</b> {projectDetails.name}
						</p>
						<p>
							<b>Kirjeldus:</b> {projectDetails.description}
						</p>
						<p>
							<b>Id:</b> {projectDetails.id}
						</p>
						<button onClick={() => setProjectDetails(null)}>Sulge</button>
					</div>
				</>
			)}

			{/* User List */}
			<div>
				<h3>Kasutajate nimekiri</h3>
				<button onClick={fetchUsers}>Laadige kasutajad</button>
				{users.map(user => (
					<div key={user.id}>
						<p>
							<b>ID:</b> {user.id}
						</p>
						<p>
							<b>Kasutajanimi:</b> {user.userName}
						</p>
						<p>
							<b>Roll:</b> {user.role}
						</p>
						<hr />
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminPanel
