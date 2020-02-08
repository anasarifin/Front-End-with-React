import React from "react";

export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	showValue(event) {
		document.getElementById("bb1").innerHTML = event.target.value;
	}

	render() {
		return (
			<div id="header">
				<input type="text" id="header-search" onChange={this.props.eventSearch} />
				<br />
				<select onChange={this.props.eventSort}>
					<option value="">All</option>
					<option value="0">Food</option>
					<option value="1">Drink</option>
				</select>
				<br />
				<br />
			</div>
		);
	}
}
