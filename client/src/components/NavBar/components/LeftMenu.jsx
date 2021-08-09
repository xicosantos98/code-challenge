import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Grid } from "antd";


const { useBreakpoint } = Grid;

const LeftMenu = () => {
	const [selectedItem, setSelectedItem] = useState(["/"]);
	const location = useLocation();
	useEffect(() => {
		setSelectedItem([location.pathname]);
	}, [location]);
	const { xs } = useBreakpoint();
	return (
		<Menu selectedKeys={selectedItem} mode={xs ? "inline" : "horizontal"}>
			<Menu.Item key="/">
				<Link to="/"><b>Home</b></Link>
			</Menu.Item>
			<Menu.Item key="/projects">
				<Link to="/projects"><b>Projects</b></Link>
			</Menu.Item>
		</Menu>
	);
};

export default LeftMenu;
