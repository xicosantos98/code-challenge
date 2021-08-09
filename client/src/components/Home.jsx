import React from "react";
import assetUrl from "./assets/check-box.svg";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
	PlusOutlined,
	EditOutlined,
	EyeFilled,
	DeleteOutlined,
	DeleteFilled,
	CheckSquareFilled,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { USER } from "../utils/prop-types";
import { Col, Row, Button, Popover } from "antd";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	& h1 {
		margin: 0px;
		font-weight: bold;
		color: #004e89;
	}
`;

const LabelContainer = styled.div`
	margin-top: 20px;
	& .row {
		margin: 20px 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
		& .column {
			display: flex;
			width: 150px;
			align-items: center;
		}
		& .label {
			margin-left: 5px;
			font-weight: bold;
		}
	}
`;
const EditIcon = styled(EditOutlined)`
	& svg {
		fill: #ff9f1c;
		font-size: 32px;
	}
`;

const DetailsIcon = styled(EyeFilled)`
	& svg {
		fill: #799235;
		font-size: 32px;
	}
`;

const DeleteIcon = styled(DeleteOutlined)`
	& svg {
		fill: #bc3908;
		font-size: 32px;
	}
`;

const DeleteIconFilled = styled(DeleteFilled)`
	& svg {
		fill: #bc3908;
		font-size: 32px;
	}
`;

const CheckBoxIcon = styled(CheckSquareFilled)`
	& svg {
		fill: #004E89;
		font-size: 32px;
	}
`;

const Home = ({ user }) => {
	return (
		<Wrapper>
			<h1>Welcome {user.name}</h1>
			<Row justif="center" style={{ margin: "50px" }}>
				<Col style={{ textAlign: "center" }}>
					<img width="50%" src={assetUrl} />
				</Col>
			</Row>
			<Popover
				placement="bottom"
				content={
					<div style={{ width: "400px" }}>
						<h3>
							With TaskManager your ideas can come to life! You
							can organize your projects and all the tasks you
							need to conclude them successfully.
						</h3>
						<LabelContainer>
							<div className="row">
								<div className="column">
									<Button
										type="primary"
										shape="circle"
										icon={<PlusOutlined />}
									/>
									<span className="label">Add project</span>
								</div>
								<div className="column">
									<EditIcon />
									<span className="label">Edit task</span>
								</div>
							</div>
							<div className="row">
								<div className="column">
									<DetailsIcon />
									<span className="label">Edit project</span>
								</div>
								<div className="column">
									<DeleteIcon />
									<span className="label">Remove task</span>
								</div>
							</div>
							<div className="row">
								<div className="column">
									<DeleteIconFilled />
									<span className="label">
										Remove project
									</span>
								</div>
								<div className="column">
									<CheckBoxIcon />
									<span className="label">Complete task</span>
								</div>
							</div>
						</LabelContainer>
					</div>
				}
				trigger="click"
			>
				<Button size="large" type="primary">
					<b>How to use TaskManager</b>
				</Button>
			</Popover>
		</Wrapper>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});

Home.propTypes = {
	user: PropTypes.shape(USER),
};

Home.defaultProps = {
	user: null,
};

export default connect(mapStateToProps, null)(Home);
