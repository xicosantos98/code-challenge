import { actions } from "./index";
import { fetchTasks, updateTask, updateTaskStatus, addTask, removeTask, removeAllTasks } from "../../../services/tasks";

export const getTasksAction = (projectId) => async (dispatch) => {
	const { setTasks, setLoading } = actions;
	dispatch(setLoading(true));
	const response = (await fetchTasks(projectId)) || [];
	dispatch(setTasks(response));
	dispatch(setLoading(false));
};

export const editTaskAction = (taskId, data) => async (dispatch) => {
	const { editTask } = actions;
	const { task } = (await updateTask(taskId, data)) || {};
    const { payload } = await dispatch(editTask(task));
    return payload;
};

export const editTaskStatusAction = (taskId) => async (dispatch) => {
	const { editTask } = actions;
	const { task } = (await updateTaskStatus(taskId)) || {};
    const { payload } = await dispatch(editTask(task));
    return payload;
}

export const createTaskAction = (projectId, data) => async (dispatch) => {
	const { createTask } = actions;
	const { task } = (await addTask(projectId, data)) || {};
	const { payload } = await dispatch(createTask(task));
	return payload;
}

export const deleteTaskAction = (taskId) => async (dispatch) => {
	const { deleteTask } = actions;
	await removeTask(taskId);
	dispatch(deleteTask({ taskId }));
}

export const deleteAllTasksAction = (projectId) => async (dispatch) => {
	const { deleteAllTasks } = actions;
	const res = await removeAllTasks(projectId);
	dispatch(deleteAllTasks());
	return res.error;
}
