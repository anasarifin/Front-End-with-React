import React from "react";
import "../style/Navbar.css";
import PropTypes from "prop-types";
import add from "../img/add.png";
import home from "../img/home.png";
import history from "../img/history.png";
import logout from "../img/logout.png";

export default class Navbar extends React.Component {
	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		window.location.href = "/login";
	}

	showModal() {
		document.getElementById("modal").classList.add("show");
		document.getElementById("blackLayer").classList.add("show");
	}

	render() {
		return (
			<div id="navbar">
				<img alt="Home" src={home} onClick={this.props.event[0]} />
				{/* <img alt="Edit" src="http://localhost:8888/public/img/edit.png" onClick={this.props.event[1]} /> */}
				<img alt="History" src={history} onClick={this.props.event[1]} />
				<img alt="Add" src={add} onClick={this.showModal} />
				<img alt="Logout" src={logout} onClick={this.logout} />
			</div>
		);
	}
}

Navbar.propTypes = {
	event: PropTypes,
};
