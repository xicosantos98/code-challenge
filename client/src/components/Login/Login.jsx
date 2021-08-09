import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { connect, useDispatch } from "react-redux";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import "./Login.scss";
import { login } from "../../store/modules/user/actions";
import { USER } from "../../utils/prop-types";

import loginAsset from "./assets/login.svg";

const Container = styled.div`
	height: 100%;
`;

const Wrapper = styled.div`
	& .login-title {
		font-weight: bold;
		color: #004e89;
	}
	& .login-title > span {
		font-weight: bold;
		color: #ff9f1c;
	}
`;

const Login = ({ user }) => {
	if (user !== null) return <Redirect to="/" />;

	const dispatch = useDispatch();
	const onFinish = async (values) => {
		const { payload } = await dispatch(login(values));
		if (!payload) {
			message.error("Incorrect username or password.");
		}
	};

	return (
		<Container>
			<Row justify="center" style={{ height: "100%" }}>
				<Col xs={24} md={12} lg={4}>
					<Wrapper>
						<h1 className="login-title">
							Sign in to <span>TaskManager</span>
						</h1>
						<Row justify="center" style={{ padding: "20px" }}>
							<img width="70%" src={loginAsset} />
						</Row>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
						>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "Please input your Username!",
									},
								]}
							>
								<Input
									prefix={
										<UserOutlined className="site-form-item-icon" />
									}
									placeholder="Username"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your Password!",
									},
								]}
							>
								<Input
									prefix={
										<LockOutlined className="site-form-item-icon" />
									}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
								>
									Log in
								</Button>
								<div
									style={{
										textAlign: "center",
										marginTop: "2px",
									}}
								>
									New user?{" "}
									<Link to="/signup">Create an account</Link>
								</div>
							</Form.Item>
						</Form>
					</Wrapper>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

Login.propTypes = {
	user: PropTypes.shape(USER),
};

Login.defaultProps = {
	user: null,
};

export default connect(mapStateToProps, null)(Login);
