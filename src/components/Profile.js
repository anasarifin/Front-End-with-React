import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const urlGet = "http://localhost:9999/api/v1/products";
const login = "http://localhost:9999/api/v1/login";

export default class Header extends React.Component {
	getUser = () => {
		Axios.get(urlGet)
			.then(response => {
				console.log(response);
			})
			.catch(reject => {
				console.log(reject);
			});
	};
	postUser = () => {
		Axios.post(
			login,
			{
				username: "john",
				password: "john123",
			},
			{
				"Content-Type": "application/x-www-form-urlencoded",
			},
		)
			.then(response => {
				console.log(response);
			})
			.catch(reject => {
				console.log(reject);
			});
	};

	render() {
		return (
			<div>
				<h1>This is profile component</h1>
				<button onClick={this.getUser}>Get User</button>
				<button onClick={this.postUser}>Post User</button>
				<Link to="/">
					<h4>Home</h4>
				</Link>
			</div>
		);
	}
}

// export default Header;

// , {
//     headers: {
//         username: ""
//     },
//     body: {
//         token: ""
//     }
