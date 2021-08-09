import React from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../../store/modules/user/actions";

import { Menu, Grid, Avatar, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, CaretDownFilled } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const RightMenu = ({ user }) => {
	const dispatch = useDispatch();
	const { md } = useBreakpoint();
	const { name } = user || {};
	return (
		<Menu mode={md ? "horizontal" : "inline"}>
			{user === null ? (
				<Menu.Item key="game">
					<Link to="/signin">Signin</Link>
				</Menu.Item>
			) : (
				<Dropdown
					trigger={["click"]}
					overlay={
						<Menu
							onClick={(e) => {
								if (e.key === "signout") {
									dispatch(logout());
								}
							}}
						>
							<Menu.Item key="signout">Sign out</Menu.Item>
						</Menu>
					}
				>
					<div style={{ cursor: "pointer", textAlign: "right" }}>
						<Avatar icon={<UserOutlined />} style={{ backgroundColor: "#FF9F1C" }} />
					</div>
				</Dropdown>
			)}
		</Menu>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

RightMenu.propTypes = {
	user: PropTypes.shape({}),
};

RightMenu.defaultProps = {
	user: null,
};

export default connect(mapStateToProps, null)(RightMenu);
