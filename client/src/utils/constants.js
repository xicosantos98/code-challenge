const API_URL = "http://localhost:5000/api";

const apiUrls = {
	signin: `${API_URL}/user/login`,
	signup: `${API_URL}/user/register`,
	getUser: `${API_URL}/user`,
	getProjects: `${API_URL}/project`,
	updatedProject: id => `${API_URL}/project/${id}`,
	getTasks: projectId => `${API_URL}/task/${projectId}`,
	updateTask: taskId => `${API_URL}/task/${taskId}`,
	updateTaskStatus: taskId => `${API_URL}/task/${taskId}/status`,
	createTask: projectId => `${API_URL}/task/${projectId}`,
	deleteTask: taskId => `${API_URL}/task/${taskId}`,
	deleteAllTasks: projectId => `${API_URL}/task/${projectId}/all`,
};

export default apiUrls;
