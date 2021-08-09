import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
	tasks: {},
	isLoading: true,
};

const task = createSlice({
	name: "task",
	initialState: defaultState,
	reducers: {
		setLoading: (state, action) => ({
			...state,
			isLoading: action.payload,
		}),
		setTasks: (state, action) => {
			if (action.payload) {
				const { tasks } = action.payload;
				state.tasks = tasks;
			}
			return state;
		},
		editTask: (state, action) => {
			if (action.payload) {
                const taskId = action.payload?._id;
				return {
                    ...state,
                    tasks: state.tasks.map(t => t._id === taskId ? action.payload : t)
                }
			}
			return state;
		},
		createTask: (state, action) => ({
			...state,
			tasks: [...state.tasks, action.payload],
		}),
		deleteTask: (state, action) => {
			const idx = state.tasks.findIndex(
				(t) => t._id === action.payload.taskId
			);
			state.tasks.splice(idx, 1);
			return state;
		},
		deleteAllTasks: (state, action) => {
			return {
				...state,
				tasks: []
			}
		}
	},
});

export const { actions } = task;

export default task.reducer;
