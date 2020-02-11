import React from "react";
import "../style/Navbar.css";

export default class Navbar extends React.Component {
	logout() {
		localStorage.removeItem("token");
		window.location.href = "/login";
	}

	render() {
		return (
			<div id="navbar-con">
				<div id="navbar">
					<img alt="Home" onClick={this.props.event[0]} />
					<img alt="Edit" onClick={this.props.event[1]} />
					<img alt="History" onClick={this.props.event[2]} />
					<img alt="Logout" onClick={this.logout} />
				</div>
			</div>
		);
	}
}
