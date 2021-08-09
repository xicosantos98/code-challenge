import axios from "../utils/axios";

// Constants
import apiUrls from "../utils/constants";

export const fetchTasks = async (projectId) => {
	try {
		const { data = null } = await axios.get(apiUrls.getTasks(projectId));
		return data;
	} catch (error) {
		return null;
	}
};

export const updateTask = async (taskId, body) => {
	try {
		const { data = null } = await axios.put(
			apiUrls.updateTask(taskId),
			body
		);
		return data;
	} catch (error) {
		return null;
	}
};

export const updateTaskStatus = async (taskId) => {
	try {
		const { data = null } = await axios.put(apiUrls.updateTaskStatus(taskId));
		return data;
	} catch (error) {
		return null;
	}
};

export const addTask = async (projectId, body) => {
	try {
		const { data = null } = await axios.post(apiUrls.createTask(projectId), body);
		return data;
	} catch (error) {
		return null;
	}
}

export const removeTask = async (taskId) => {
	try {
		const { data = null } = await axios.delete(apiUrls.deleteTask(taskId));
		return data;
	} catch (error) {
		return null;
	}
}

export const removeAllTasks = async (projectId) => {
	try {
		const { data = null } = await axios.delete(apiUrls.deleteAllTasks(projectId));
		return data;
	} catch (error) {
		return null;
	}
}