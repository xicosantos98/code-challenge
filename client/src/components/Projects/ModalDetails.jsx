import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
	Modal,
	Typography,
	message,
	Empty,
	Button,
	Dropdown,
	Menu,
	List,
	Checkbox,
	Form,
	Input,
	Select,
} from "antd";
import {
	PlusOutlined,
	EditFilled,
	DeleteOutlined,
	FunnelPlotOutlined,
	CloseOutlined
} from "@ant-design/icons";
import { PROJECT } from "../../utils/prop-types";
import {
	updateProjectAction,
	getProjectsAction,
} from "../../store/modules/project/actions";
import {
	getTasksAction,
	createTaskAction,
	deleteAllTasksAction,
} from "../../store/modules/task/actions";

import Loading from "../Loading";
import Task from "../Task/Task";

const { Text } = Typography;

const TasksContainer = styled.div`
	height: 100%;
`;

const LoadingContainer = styled.div`
	margin-top: 15px;
`;

const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	& span {
		flex: 1;
	}
	& .actions {
		width: 200px;
		text-align: end;
	}
`;

const AddForm = ({ cancelForm, dispatch, projectId }) => {
	const [form] = Form.useForm();
	return (
		<div style={{ width: "100%" }}>
			<Form
				form={form}
				name="normal_login"
				className="login-form"
				onFinish={async (data) => {
					await dispatch(createTaskAction(projectId, data));
					form.resetFields();
				}}
				style={{ width: "100%" }}
			>
				<List.Item
					actions={[
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Save
							</Button>
						</Form.Item>
					]}
				>
					<List.Item.Meta
						title={
							<div style={{ width: "100%" }}>
								<Form.Item
									name="name"
									rules={[
										{
											required: true,
											message:
												"Task definition cannot be empty",
										},
									]}
								>
									<Input placeholder="Task definition" />
								</Form.Item>
							</div>
						}
					/>
				</List.Item>
			</Form>
		</div>
	);
};

const FiltersForm = ({ filters, setFilters }) => {
	return (
		<div style={{ width: "100%" }}>
			<Form
				layout="inline"
				onFinish={() => console.log("oiii")}
				style={{ width: "100%" }}
			>
				<Form.Item name="search" style={{ flex: 1 }}>
					<Input placeholder="Task name" value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} />
				</Form.Item>
				<Form.Item name="status" style={{ width: "150px" }}>
					<Select defaultValue="all" value={filters.status} onChange={e => setFilters({ ...filters, status: e })} >
						<Option value="all">All</Option>
						<Option value="completed">Completed</Option>
						<Option value="todo">To Do</Option>
					</Select>
				</Form.Item>
			</Form>
		</div>
	);
};

const ModalDetails = ({
	isModalVisible,
	closeModal,
	project,
	isLoadingTasks,
	tasks,
}) => {
	const [editableProject, setProject] = useState(project);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isFilteringTasks, setIsFilteringTasks] = useState(false);
	const [filters, setFilters] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		return dispatch(getTasksAction(project._id));
	}, []);

	const updateField = async (field, newValue) => {
		const updatedProject = { ...editableProject };
		updatedProject[field] = newValue;
		const { payload } = await dispatch(
			updateProjectAction(updatedProject._id, {
				[field]: newValue,
			})
		);
		if (payload) {
			message.success(`Project ${field} update successfully.`);
			dispatch(getProjectsAction());
		} else {
			message.error(`Error updating project ${name}.`);
		}
		return setProject(updatedProject);
	};

	const getFilteredTasks = () => {
		if (!Object.keys(filters).length) {
			return tasks;
		}
		return tasks.filter(t => {
			const { search, status } = filters;
			if (search?.length) {
				return t.name.includes(search);
			}
			if (status) {
				switch (status) {
					case "completed": return t.endDate;
					case "todo": return !t.endDate;
					case "all": return t;
					default: return t;
				}
			}
			return t;
		})
	}

	const renderTasks = () => (
		<TasksContainer>
			{isLoadingTasks && (
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
			)}
			{!isLoadingTasks && tasks?.length === 0 && (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<span>No tasks associated</span>}
				/>
			)}
			{!isLoadingTasks && tasks?.length > 0 && (
				<List
					itemLayout="horizontal"
					dataSource={getFilteredTasks()}
					renderItem={(item) => (
						<Task key={item._id} task={item} dispatch={dispatch} />
					)}
				/>
			)}
		</TasksContainer>
	);

	return (
		<Modal
			title={
				<Text
					editable={{
						icon: <EditFilled />,
						tooltip: "Click to edit the project name",
						onChange: async (text) => updateField("name", text),
					}}
					style={{
						fontSize: "20px",
					}}
				>
					{editableProject.name}
				</Text>
			}
			visible={isModalVisible}
			footer={null}
			onCancel={closeModal}
			width={800}
			keyboard={false}
			bodyStyle={{
				height: "700px",
				overflowY: "scroll",
			}}
		>
			<div style={{ padding: "5px" }}>
				<Text strong>Description</Text>
				<br />
				<Text
					editable={{
						icon: <EditFilled />,
						tooltip: "Click to edit the project description",
						maxLength: 150,
						autoSize: { maxRows: 5, minRows: 3 },
						onChange: async (text) =>
							updateField("description", text),
					}}
					style={{ marginTop: "3px" }}
				>
					{editableProject.description}
				</Text>
			</div>
			<div style={{ padding: "30px 5px" }}>
				<SectionTitle>
					<Text strong>
						Tasks{" "}
						<span>
							(
							{tasks?.length > 0
								? tasks.filter((t) => t.endDate).length
								: 0}
						</span>
						{"/"}
						<span>{tasks?.length})</span>
					</Text>

					<div className="actions">
						<Dropdown.Button
							onClick={() => {
								setIsFilteringTasks(false);
								setIsAddingTask(true);
							}}
							overlay={
								<Menu
									onClick={async ({ key }) => {
										if (key === "1") {
											const res = await dispatch(
												deleteAllTasksAction(
													editableProject._id
												)
											);
											if (!res) {
												message.success(
													"Tasks deleted successfully."
												);
											} else {
												message.error(
													"Error deleting tasks"
												);
											}
										} else {
											setIsFilteringTasks(true);
											setIsAddingTask(false);
										}
									}}
								>
									<Menu.Item
										key="1"
										icon={<DeleteOutlined />}
										style={{ color: "#BC3908" }}
									>
										Delete all
									</Menu.Item>
									<Menu.Item
										icon={<FunnelPlotOutlined />}
										style={{ color: "#003049" }}
									>
										Filters
									</Menu.Item>
								</Menu>
							}
						>
							<PlusOutlined /> Add task
						</Dropdown.Button>
					</div>
				</SectionTitle>
				<br />
				{isFilteringTasks && <FiltersForm dispatch={dispatch} filters={filters} setFilters={setFilters}/>}
				{isAddingTask && (
					<AddForm
						projectId={editableProject._id}
						dispatch={dispatch}
						cancelForm={() => setIsAddingTask(false)}
					/>
				)}
				{renderTasks()}
			</div>
		</Modal>
	);
};

ModalDetails.propTypes = {
	isModalVisible: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	project: PropTypes.shape(PROJECT).isRequired,
};

ModalDetails.defaultProps = {};

const mapStateToProps = ({ project: { projects }, task }, props) => {
	return {
		projects,
		isLoadingTasks: task.isLoading,
		tasks: task.tasks,
	};
};

export default connect(mapStateToProps, null)(ModalDetails);
