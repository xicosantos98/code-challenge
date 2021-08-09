import { createSlice } from "@reduxjs/toolkit";

const defaultState = null;

const user = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state, action) => action.payload || null,
	},
});

export const { actions } = user;

export default user.reducer;
