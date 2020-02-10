import React from "react";
import "../style/Login.css";

export default class Login extends React.Component {
	render() {
		return (
			<form method="post" id="login">
				<label>Username</label>
				<input type="text"></input>
				<label>Password</label>
				<input type="password"></input>
				<button type="submit">Login</button>
			</form>
		);
	}
}
