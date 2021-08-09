import React from "react";
import styled from "styled-components";

import {
	Button,
	Input,
	Form,
} from "antd";

import {
	addProjectAction,
} from "../../store/modules/project/actions";

const AddProjectContainer = styled.div`
	width: 400px;

	& .btns {
		text-align: end;
	}
`;

const CreateProject = ({ dispatch }) => {
    const [form] = Form.useForm();
	return (
		<AddProjectContainer>
			<Form
				form={form}
				name="normal_login"
				className="login-form"
				onFinish={(data) => {
					const split = data.name.split(" ");
					const key =
						split.length >= 2
							? `${split[0][0]}${split[1][0]}`
							: split[0].charAt(0);
					form.resetFields();
					return dispatch(addProjectAction({ ...data, key }));
				}}
			>
				<Form.Item
					name="name"
					rules={[
						{
							required: true,
							message: "Name cannot be empty",
						},
					]}
				>
					<Input placeholder="Project name" />
				</Form.Item>
				<Form.Item
					name="description"
					rules={[
						{
							required: true,
							message: "Description cannot be empty",
						},
					]}
				>
					<Input.TextArea
						rows={3}
						placeholder="Project description"
					/>
				</Form.Item>
				<div className="btns">
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Create project
						</Button>
					</Form.Item>
				</div>
			</Form>
		</AddProjectContainer>
	);
};

export default CreateProject;
