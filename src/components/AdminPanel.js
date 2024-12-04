import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/AdminPanel.css'

function AdminPanel() {
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

	return (
		<div className='admin-panel'>
			<h1>Admin Panel</h1>

			{/* Add Task */}
			<div>
				<h3>Add Task</h3>
				<input type='text' placeholder='Title' value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
				<input type='text' placeholder='Description' value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
				<input type='text' placeholder='Project ID' value={newTask.projectId} onChange={e => setNewTask({ ...newTask, projectId: e.target.value })} />
				<input type='text' placeholder='User ID' value={newTask.userId} onChange={e => setNewTask({ ...newTask, userId: e.target.value })} />
				<label>
					Start Time:
					<input type='datetime-local' value={newTask.startTime} onChange={e => setNewTask({ ...newTask, startTime: e.target.value })} />
				</label>
				<label>
					End Time:
					<input type='datetime-local' value={newTask.endTime} onChange={e => setNewTask({ ...newTask, endTime: e.target.value })} />
				</label>
				<label>
					Is Completed:
					<input type='checkbox' checked={newTask.isCompleted} onChange={e => setNewTask({ ...newTask, isCompleted: e.target.checked })} />
				</label>
				<label>
					Is Confirmed:
					<input type='checkbox' checked={newTask.isConfirmed} onChange={e => setNewTask({ ...newTask, isConfirmed: e.target.checked })} />
				</label>
				<button onClick={handleAddTask}>Add Task</button>
			</div>

			{/* Task List */}
			<div>
				<h3>Task List</h3>
				{tasks.map(task => (
					<div className='task-card' key={task.id}>
						<p>
							<b>Title:</b> {task.title}
						</p>
						<p>
							<b>Description:</b> {task.description}
						</p>
						<button onClick={() => setTaskDetails(task)}>View Details</button>
					</div>
				))}
			</div>

			{/* Task Details Modal */}
			{taskDetails && (
				<>
					<div className='modal-overlay' onClick={() => setTaskDetails(null)}></div>
					<div className='details-modal'>
						<h3>Task Details</h3>
						<p>
							<b>Title:</b> {taskDetails.title}
						</p>
						<p>
							<b>Description:</b> {taskDetails.description}
						</p>
						<p>
							<b>Project ID:</b> {taskDetails.projectId}
						</p>
						<p>
							<b>User ID:</b> {taskDetails.userId}
						</p>
						<p>
							<b>Start Time:</b> {taskDetails.startTime}
						</p>
						<p>
							<b>End Time:</b> {taskDetails.endTime}
						</p>
						<p>
							<b>Is Completed:</b> {taskDetails.isCompleted ? 'Yes' : 'No'}
						</p>
						<p>
							<b>Is Confirmed:</b> {taskDetails.isConfirmed ? 'Yes' : 'No'}
						</p>
						<button onClick={() => setTaskDetails(null)}>Close</button>
					</div>
				</>
			)}

			{/* Add Project */}
			<div>
				<h3>Add Project</h3>
				<input type='text' placeholder='Name' value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
				<input type='text' placeholder='Description' value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
				<button>Add Project</button>
			</div>

			{/* User List */}
			<div>
				<h3>User List</h3>
				<button onClick={fetchUsers}>Load Users</button>
				{users.map(user => (
					<div key={user.id}>
						<p>
							<b>ID:</b> {user.id}
						</p>
						<p>
							<b>Username:</b> {user.userName}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminPanel
