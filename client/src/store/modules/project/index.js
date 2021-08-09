import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    projects: [],
    isLoading: false
};

const project = createSlice({
	name: "project",
	initialState: defaultState,
	reducers: {
        setLoading: (state, action) => ({ ...state, isLoading: action.payload }),
		setProjects: (state, action) => ({...state, projects: action.payload || []}),
        addProject: (state, action) => ({ ...state, projects: [...state.projects, action.payload] }),
        editProject: (state, action) => {
            let editedProject = state.projects.find(p => p._id === action.payload?._id);
            if (editedProject) {
                editedProject = action.payload;
            }
        },
        deleteProject: (state, action) => {
            const idx = state.projects.findIndex(p => p._id === action.payload.projectId);
            state.projects.splice(idx, 1);
            return state;
        }
	},
});

export const { actions } = project;

export default project.reducer;