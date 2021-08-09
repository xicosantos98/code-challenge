import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { USER } from "../utils/prop-types";

const PrivateRoute = ({ component: Component, location, user, ...rest }) => {
	const token = sessionStorage.getItem('_t') || null;
	return (
		<Route
			{...rest}
			render={(props) =>
				user !== null ? (
					<Component {...props} />
				) : !token && (
					<Redirect
						to={{
							pathname: "/signin",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

const mapStateToProps = (state) => ({
	user: state.user,
});

PrivateRoute.propTypes = {
	user: PropTypes.shape(USER),
	component: PropTypes.elementType,
	location: PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
	user: null,
	component: null,
	location: null,
};

export default connect(mapStateToProps, null)(PrivateRoute);
