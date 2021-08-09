import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Popconfirm, Tooltip, List } from "antd";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { PROJECT } from "../../utils/prop-types";

import { deleteProjectAction } from "../../store/modules/project/actions";

import Logo from "./Logo";

const DeleteIcon = styled(DeleteFilled)`
	& svg {
		fill: #bc3908;
		font-size: 20px;
	}
`;

const DetailsIcon = styled(EyeFilled)`
	& svg {
		fill: #799235;
		font-size: 20px;
	}
`;

const Project = ({ project, openDetails, dispatch }) => {
	return (
		<List.Item
			actions={[
				<Popconfirm
					title="Are you sure to delete this project?"
					icon={null}
					onConfirm={() => dispatch(deleteProjectAction(project._id))}
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
				<Tooltip title="More details">
					<a
						key="list-loadmore-more"
						onClick={() => openDetails()}
					>
						<DetailsIcon />
					</a>
				</Tooltip>,
			]}
		>
			<List.Item.Meta
				avatar={<Logo project={project.name} />}
				title={<p>{project.name}</p>}
				description={project.description}
			/>
		</List.Item>
	);
};

Project.propTypes = {
	project: PropTypes.shape(PROJECT).isRequired,
	openDetails: PropTypes.func.isRequired,
};

export default Project;
