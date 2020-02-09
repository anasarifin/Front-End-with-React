import React, { Component } from "react";

// export default class Header extends Component {
// 	render() {
// 		return <h1>This is {this.props.title}</h1>;
// 	}
// }

// export default Header;

export default function Header(props) {
	return <h1>This is {props.title}</h1>;
}
