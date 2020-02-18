import React from "react";
import Axios from "axios";

const url = "http://localhost:9999/api/v1/register";

export default class Register extends React.Component {
	registerUser() {
		Axios.post(url, {
			username: document.getElementById("regUsername").value,
			fullname: document.getElementById("regFullname").value,
			password: document.getElementById("regPassword").value,
		});
	}

	render() {
		return (
			<form id="login">
				<input type="text" placeholder="Username" id="regUsername" />
				<input type="text" placeholder="Full Name" id="regFullname" />
				<input type="password" placeholder="Password" id="regPassword" />
				<input type="password" placeholder="Re-type Password" id="regRePassword" />
				<button type="submit" onClick={this.registerUser}>
					Register
				</button>
			</form>
		);
	}
}
