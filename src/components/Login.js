import React from "react";
import "../style/Login.css";
import Axios from "axios";
import barLogo from "../img/bar-logo.png";

const url = "http://localhost:9999/api/v1/login";

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			token: "Login first",
		};
		this.postLogin = this.postLogin.bind(this);
	}

	postLogin() {
		Axios.post(url, {
			username: document.getElementById("loginUsername").value,
			password: document.getElementById("loginPassword").value,
		}).then(resolve => {
			if (resolve.data.token) {
				localStorage.setItem("token", resolve.data.token);
				localStorage.setItem("username", document.getElementById("loginUsername").value);
				window.location.href = "/";
			} else {
				alert(resolve.data.warning);
			}
		});
	}

	render() {
		return (
			<div id="login-con">
				<div>
					<img alt="logo" src={barLogo} />
				</div>
				<form id="login">
					<input type="text" id="loginUsername" autoComplete="off" placeholder="Username"></input>
					<input type="password" id="loginPassword" placeholder="Password"></input>
					<button onClick={this.postLogin} type="submit">
						Login
					</button>
				</form>
			</div>
		);
	}
}
