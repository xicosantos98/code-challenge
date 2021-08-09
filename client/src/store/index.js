import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./modules/user";
import project from "./modules/project";
import task from "./modules/task";

const reducer = combineReducers({
	user,
	project,
	task
});
const store = configureStore({
	reducer,
	project,
	task
});
export default store;
