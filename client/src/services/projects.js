import axios from "../utils/axios";

// Constants
import apiUrls from "../utils/constants";

export const fetchProjects = async () => {
	try {
		const { data = null } = await axios.get(apiUrls.getProjects);
		return data?.projects || [];
	} catch (error) {
		return null;
	}
};

export const updateProject = async (id, project) => {
	try {
		const { data = null } = await axios.put(
			apiUrls.updatedProject(id),
			project
		);
		return data?.project;
	} catch (error) {
		return null;
	}
};

export const createProject = async (project) => {
	try {
		const { data = null } = await axios.post(apiUrls.getProjects, project);
		return data?.project;
	} catch (error) {
		return null;
	}
};

export const removeProject = async (id) => {
	try {
		const { data = null } = await axios.delete(apiUrls.updatedProject(id));
		return data;
	} catch (error) {
		return null;
	}
};
