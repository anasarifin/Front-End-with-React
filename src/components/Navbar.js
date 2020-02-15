import React from "react";
import "../style/Navbar.css";
import PropTypes from "prop-types";

export default class Navbar extends React.Component {
	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		window.location.href = "/login";
	}

	render() {
		return (
			<div id="navbar">
				<img alt="Home" src="http://localhost:9999/public/img/home.png" onClick={this.props.event[0]} />
				<img alt="Edit" src="http://localhost:9999/public/img/edit.png" onClick={this.props.event[1]} />
				<img alt="History" src="http://localhost:9999/public/img/history.png" onClick={this.props.event[2]} />
				<img alt="Logout" src="http://localhost:9999/public/img/logout.png" onClick={this.logout} />
			</div>
		);
	}
}

Navbar.propTypes = {
	event: PropTypes,
};
