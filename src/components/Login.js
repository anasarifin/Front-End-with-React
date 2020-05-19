import React from "react";
import "../style/Login.css";
import Register from "./Register";
import Axios from "axios";
import barLogo from "../img/bar-logo.png";

const url = "http://18.212.147.11:2200/api/v1/login";

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			token: "Login first",
			register: false,
		};
		this.postLogin = this.postLogin.bind(this);
		this.switchPage = this.switchPage.bind(this);
	}

	postLogin(event) {
		const username = document.getElementById("loginUsername").value;
		const password = document.getElementById("loginPassword").value;

		if (!username) {
			this.setState({
				warning: "Username is empty !",
			});
		} else if (!password) {
			this.setState({
				warning: "Password is empty !",
			});
		} else {
			Axios.post(url, {
				username: username,
				password: password,
			}).then((resolve) => {
				console.log(resolve);
				if (resolve.data.token) {
					localStorage.setItem("token", resolve.data.token);
					localStorage.setItem("username", document.getElementById("loginUsername").value);
					window.location.href = "/";
				} else {
					this.setState({
						warning: resolve.data.warning,
					});
				}
			});
		}
	}

	switchPage() {
		this.setState({
			register: this.state.register ? false : true,
		});
	}

	componentDidMount() {
		if (localStorage.getItem("token")) {
			window.location.href = "/";
		}
	}

	render() {
		return (
			<div id="login-con">
				<div>
					<img alt="logo" src={barLogo} />
					<span onClick={this.switchPage}>{!this.state.register ? "Register?" : "Back to login..."}</span>
				</div>
				{!this.state.register ? (
					<div id="login">
						<input type="text" id="loginUsername" autoComplete="off" placeholder="Username"></input>
						<input type="password" id="loginPassword" placeholder="Password"></input>
						<button onClick={this.postLogin} type="submit">
							Login
						</button>
						<span className="warning">{this.state.warning}</span>
					</div>
				) : (
					<Register />
				)}
			</div>
		);
	}
}
