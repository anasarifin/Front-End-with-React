import React from "react";
import Axios from "axios";

const url = "http://100.24.32.116:9999/api/v1/register";

export default class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			warning: "",
		};
		this.registerUser = this.registerUser.bind(this);
	}
	registerUser() {
		Axios.post(url, {
			username: document.getElementById("regUsername").value,
			fullname: document.getElementById("regFullname").value,
			password: document.getElementById("regPassword").value,
		}).then(resolve => {
			console.log(resolve);
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

	checkPassword() {
		if (document.getElementById("regRePassword").value != document.getElementById("regPassword").value) {
			document.getElementById("regRePassword").style.border = "solid 1.5px #ff4242";
			document.getElementById("regSubmit").disabled = true;
		} else {
			document.getElementById("regRePassword").style.border = null;
			document.getElementById("regSubmit").disabled = false;
		}
	}

	render() {
		return (
			<div id="login">
				<input type="text" placeholder="Username" id="regUsername" autoComplete="off" />
				<input type="text" placeholder="Full Name" id="regFullname" />
				<input type="password" placeholder="Password" id="regPassword" />
				<input type="password" placeholder="Re-type Password" id="regRePassword" onChange={this.checkPassword} />
				<button type="submit" id="regSubmit" onClick={this.registerUser}>
					Register
				</button>
				<span className="warning">{this.state.warning}</span>
			</div>
		);
	}
}
