import { actions } from "./index";
import {
	fetchProjects,
	updateProject,
	createProject,
	removeProject,
} from "../../../services/projects";

export const getProjectsAction = () => async (dispatch) => {
	const { setProjects, setLoading } = actions;
	dispatch(setLoading(true));
	const projects = (await fetchProjects()) || [];
	dispatch(setProjects(projects));
	dispatch(setLoading(false));
};

export const updateProjectAction = (id, project) => async (dispatch) => {
	const { editProject } = actions;
	const updatedProject = await updateProject(id, project);
	return dispatch(editProject(updatedProject));
};

export const addProjectAction = (project) => async (dispatch) => {
	const { addProject } = actions;
	const newProject = await createProject(project);
	dispatch(addProject(newProject));
	return newProject;
};

export const deleteProjectAction = (id) => async (dispatch) => {
	const { deleteProject } = actions;
	const res = await removeProject(id);
	dispatch(deleteProject({ projectId: id }));
	return res.error;
};
