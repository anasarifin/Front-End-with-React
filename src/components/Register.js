import React from "react";
import Axios from "axios";

const url = "http://18.212.147.11:2200/api/v1/register";

export default class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			warning: "",
		};
		this.registerUser = this.registerUser.bind(this);
	}

	registerUser() {
		const username = document.getElementById("regUsername").value;
		const password = document.getElementById("regPassword").value;
		const rePassword = document.getElementById("regRePassword").value;

		if (!username) {
			this.setState({
				warning: "Username cannot be empty !",
			});
		} else if (!password) {
			this.setState({
				warning: "Username cannot be empty !",
			});
		} else if (password !== rePassword) {
			this.setState({
				warning: "Re-type password is not match !",
			});
		} else {
			Axios.post(url, {
				username: username,
				password: password,
			}).then((resolve) => {
				if (resolve.data.warning) {
					this.setState({
						warning: resolve.data.warning,
					});
				}
				if (resolve.data.insertId) {
					window.location.href = "/login";
				}
			});
		}
	}

	render() {
		return (
			<div id="login">
				<input type="text" placeholder="Username" id="regUsername" autoComplete="off" />
				{/* <input type="text" placeholder="Full Name" id="regFullname" /> */}
				<input type="password" placeholder="Password" id="regPassword" />
				<input type="password" placeholder="Re-type Password" id="regRePassword" />
				<button type="submit" id="regSubmit" onClick={this.registerUser}>
					Register
				</button>
				<span className="warning">{this.state.warning}</span>
			</div>
		);
	}
}
