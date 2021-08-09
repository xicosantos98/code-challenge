import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../store/modules/user/actions";
import signupAsset from "./assets/add_user.svg";

const Container = styled.div`
	height: 100%;
`;

const SignUp = ({ user }) => {
	if (user !== null) return <Redirect to="/" />;

	const dispatch = useDispatch();
	const onFinish = async (values) => {
		const res = await dispatch(signup(values));
		console.log(res);
		if (res.error) {
			message.error(res.message);
		}
	};

	return (
		<Container>
			<Row justify="center" style={{ height: "100%" }}>
				<Col xs={24} md={12} lg={4}>
					<div>
						<h1 style={{ fontWeight: "bold", color: "#004E89" }}>
							Signup
						</h1>
						<Row justify="center" style={{ padding: "20px" }}>
							<img width="70%" src={signupAsset} />
						</Row>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							autoComplete="off"
						>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: "Please input your Name!",
									},
								]}
							>
								<Input
									prefix={
										<UserOutlined className="site-form-item-icon" />
									}
									autoComplete="off"
									placeholder="Name"
								/>
							</Form.Item>
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
									autoComplete="off"
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
									{
										min: 6,
										message:
											"Please choose a password with 6 or more characters",
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
									Sign Up
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

SignUp.propTypes = {
	user: PropTypes.shape(PropTypes.object),
};

SignUp.defaultProps = {
	user: null,
};

export default connect(mapStateToProps, null)(SignUp);
