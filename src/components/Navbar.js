import React from "react";
import Main from "./Main";
import Edit from "./Edit";
import "../style/Navbar.css";

export default class Navbar extends React.Component {
	render() {
		return (
			<div id="navbar">
				<img alt="Home" onClick={this.props.event[0]} />
				<img alt="Edit" onClick={this.props.event[1]} />
				<img alt="History" onClick={this.props.event[2]} />
			</div>
		);
	}
}
