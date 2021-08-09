import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
	Popconfirm,
	Tooltip,
	List,
	Checkbox,
	Typography,
	message,
	Form,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TASK } from "../../utils/prop-types";
import {
	editTaskAction,
	editTaskStatusAction,
	deleteTaskAction
} from "../../store/modules/task/actions";
import { getProjectsAction } from "../../store/modules/project/actions";

const { Text } = Typography;

const DeleteIcon = styled(DeleteOutlined)`
	& svg {
		fill: #bc3908;
		font-size: 18px;
	}
`;

const EditIcon = styled(EditOutlined)`
	& svg {
		fill: #ff9f1c;
		font-size: 18px;
	}
`;

const Task = ({ task, dispatch }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableTask, setEditableTask] = useState(task);

	const updateName = async (newName) => {
		const updatedTask = { ...editableTask };
		updatedTask.name = newName;

		const task = await dispatch(
			editTaskAction(updatedTask._id, {
				name: newName,
			})
		);
		if (task) {
			message.success("Task name updated successfully.");
		} else {
			message.error("Error updating task name");
		}
		return setEditableTask(task);
	};

	const updateStatus = async (checked) => {
		const updatedTask = { ...editableTask };
		updatedTask.endDate = checked ? new Date().toLocaleString() : null;
		const task = await dispatch(editTaskStatusAction(updatedTask._id));
		if (task) {
			message.success(
				`Task marked as ${updatedTask.endDate ? "DONE" : "TO DO"}`
			);
		} else {
			message.error("Error updating task status");
		}
		setEditableTask(updatedTask);
	};

	return (
		<>
			<List.Item
				actions={[
					<a key="list-loadmore-more">
						<EditIcon onClick={() => setIsEditing(true)} />
					</a>,
					<Popconfirm
						title="Are you sure to delete this task?"
						icon={null}
						onConfirm={async() => {
							await dispatch(deleteTaskAction(editableTask._id))
							dispatch(getProjectsAction(editableTask.projectId))
						}}
						onCancel={() => {}}
						okText="Yes"
						cancelText="No"
						okButtonProps={{
							danger: true,
						}}
					>
						<a key="list-loadmore-more">
							<DeleteIcon />
						</a>
					</Popconfirm>,
				]}
			>
				<List.Item.Meta
					avatar={
						<Checkbox
							checked={editableTask.endDate}
							onChange={(e) => updateStatus(e.target.checked)}
						/>
					}
					title={
						<Text
							editable={{
								icon: <></>,
								editing: isEditing,
								onChange: async (newValue) =>
									updateName(newValue),
								onEnd: () => setIsEditing(false),
								onCancel: () => setIsEditing(false),
							}}
							delete={editableTask.endDate}
						>
							{editableTask.name}
						</Text>
					}
					description={
						editableTask.endDate
							? `Completed on ${new Date(
									editableTask.endDate
							  ).toLocaleString()}`
							: "Not completed"
					}
				/>
			</List.Item>
		</>
	);
};

Task.propTypes = {
	task: PropTypes.shape(TASK).isRequired,
};

export default Task;
