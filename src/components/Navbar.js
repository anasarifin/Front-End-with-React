import React from "react";
import Main from "./Main";
import Edit from "./Edit";
import "../style/Navbar.css";

export default class Navbar extends React.Component {
	render() {
		return (
			<div id="navbar">
				<img alt="Home" data-page={<Main />} onClick={this.props.event[0]} />
				<img alt="Edit" data-page={<Edit />} onClick={this.props.event[1]} />
				<img alt="History" data-page={<Edit />} onClick={this.props.event[2]} />
			</div>
		);
	}
}
