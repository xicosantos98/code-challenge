import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import {
	Col,
	Row,
	List,
	Button,
	Popover,
} from "antd";

import Project from "./Project";

import { getProjectsAction } from "../../store/modules/project/actions";
import Loading from "../Loading";
import ModalDetails from "./ModalDetails";
import { PROJECT } from "../../utils/prop-types";
import CreateProject from "./CreateProject";

/* const EditIcon = styled(EditFilled)`
	& svg {
		fill: #ffb937;
		font-size: 20px;
	}
`; */

const AddContainer = styled.div`
	position: absolute;
	right: 30px;
	bottom: 30px;
	& button {
		width: 60px !important;
		height: 60px !important;
	}
`;

export const ProjectList = ({ projects, isLoadingProjects }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProjectsAction());
	}, []);

	const [selectedProject, setProject] = useState(null);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Row justify="center">
				<Col span={12}>
					{isLoadingProjects && (
						<div style={{ textAlign: "center" }}>
							<Loading />
						</div>
					)}
					{!isLoadingProjects && projects && (
						<List
							itemLayout="horizontal"
							dataSource={projects}
							renderItem={(item) => (
								<Project
									project={item}
									dispatch={dispatch}
									openDetails={() => setProject(item)}
								/>
							)}
						/>
					)}
				</Col>
			</Row>
			{selectedProject && (
				<ModalDetails
					isModalVisible={!!selectedProject}
					closeModal={() => setProject(null)}
					project={selectedProject}
					dispatch={dispatch}
				/>
			)}
			<AddContainer>
				<Popover
					placement="topRight"
					content={<CreateProject dispatch={dispatch} />}
					trigger="click"
				>
					<Button
						type="primary"
						shape="circle"
						icon={<PlusOutlined />}
						size="large"
					/>
				</Popover>
			</AddContainer>
		</div>
	);
};

const mapStateToProps = ({ project: { projects, isLoading } }) => ({
	projects,
	isLoadingProjects: isLoading,
});

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape(PROJECT)),
	isLoadingProjects: PropTypes.bool,
};

ProjectList.defaultProps = {
	projects: [],
	isLoadingProjects: false,
};

export default connect(mapStateToProps, null)(ProjectList);
