import React from "react";
import "../style/Header.css";

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
				<label>Filter by : </label>
				<select onChange={this.props.eventType}>
					<option value="all">All</option>
					<option value="0">Food</option>
					<option value="1">Drink</option>
				</select>
				<label>Sort by : </label>
				<select onChange={this.props.eventSort}>
					<option value="name">Name</option>
					<option value="stock">Stock</option>
					<option value="price">Price</option>
					<option value="updated_at">Update at</option>
					<option value="created_at">Create at</option>
				</select>
				<input type="text" id="header-search" onChange={this.props.eventSearch} placeholder="Search product here..." />
			</div>
		);
	}
}
