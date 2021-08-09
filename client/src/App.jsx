import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
import ProjectList from "./components/Projects/ProjectList";

import { getUserByToken } from "./store/modules/user/actions";
import { setToken } from "./utils/axios";
import { USER } from "./utils/prop-types";

const Wrapper = styled.div`
	padding: 20px 10px;
	flex: 1;
`;

const App = ({ user }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = sessionStorage.getItem("_t");
		if (token) {
			setToken(token);
			dispatch(getUserByToken());
		}
	}, []);
	return (
		<BrowserRouter basename="/">
			<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
				{user && (
					<div style={{ height: "80px" }}>
						<NavBar />
					</div>
				)}
				<Wrapper>
					<Switch>
						<Route component={Login} path="/signin" exact />
						<Route component={SignUp} path="/signup" exact />
						<PrivateRoute component={Home} path="/" exact />
						<PrivateRoute
							component={ProjectList}
							path="/projects"
							exact
						/>
					</Switch>
				</Wrapper>
			</div>
		</BrowserRouter>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

App.propTypes = {
	user: PropTypes.shape(USER),
};

App.defaultProps = {
	user: null,
};

export default connect(mapStateToProps, null)(App);
