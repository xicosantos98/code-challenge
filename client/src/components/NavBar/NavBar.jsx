import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";

import "./NavBar.scss";

const NavBar = () => {
	const [visible, setVisible] = useState(false);

	/* const [drawer, setDrawer] = useState(false);
  const showDrawer = () => {
    setDrawer(true);
  };
  const onClose = () => {
    setDrawer(false);
  }; */

	const showMenu = () => {
		setVisible(true);
	};

	const closeMenu = () => {
		setVisible(false);
	};

	return (
		<>
			<nav className="menuBar">
				<div className="logo">
					<Link to="/"><b>TaskManager</b></Link>
				</div>
				<div className="menuCon">
					<div className="leftMenu">
						<LeftMenu />
					</div>
					<div className="rightMenu">
						<RightMenu />
					</div>
					<Button
						className="barsMenu"
						type="primary"
						onClick={showMenu}
					>
						<span className="barsBtn" />
					</Button>
					<Drawer
						title="Basic Drawer"
						placement="right"
						closable={false}
						onClose={closeMenu}
						visible={visible}
					>
						<LeftMenu />
						<RightMenu />
					</Drawer>
				</div>
			</nav>
			{/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={drawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
  </Drawer> */}
		</>
	);
};

export default NavBar;
