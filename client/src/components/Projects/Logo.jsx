import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Circle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #FF9F1C;
	color: white;
	font-weight: bold;
	border-radius: 50%;
	width: 30px;
	height: 30px;
`;

const Logo = ({ project }) => {
	return <Circle>{project.charAt(0)}</Circle>;
};

Circle.propTypes = {
	project: PropTypes.string.isRequired,
};
export default Logo;
