import React from "react";
import Axios from "axios";
import "../style/Header.css";

const urlCat = "http://localhost:9999/api/v1/category";

export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			category: [],
		};
	}

	getCategory() {
		Axios.get(urlCat).then(resolve => {
			this.setState({
				category: resolve.data,
			});
		});
	}

	showValue(event) {
		document.getElementById("bb1").innerHTML = event.target.value;
	}
	componentDidMount() {
		this.getCategory();
	}

	render() {
		console.log(this.state.category);
		const categoryList = [];
		if (this.state.category.length > 0) {
			this.state.category.map((data, x) => {
				categoryList.push(
					<option key={x} value={data.id}>
						{data.name}
					</option>,
				);
			});
		}

		return (
			<div id="header">
				<label>Filter by : </label>
				<select onChange={this.props.eventType}>{categoryList}</select>
				<label>Sort by : </label>
				<select onChange={this.props.eventSort}>
					<option value="name">Name</option>
					<option value="stock">Stock</option>
					<option value="price">Price</option>
					<option value="updated_at">Update at</option>
					<option value="created_at">Create at</option>
					<option value="name&dir=1">Name DESC</option>
					<option value="stock&dir=1">Stock DESC</option>
					<option value="price&dir=1">Price DESC</option>
					<option value="updated_at&dir=1">Update at DESC</option>
					<option value="created_at&dir=1">Create at DESC</option>
				</select>
				<input type="text" id="header-search" onChange={this.props.eventSearch} placeholder="Search product here..." />
			</div>
		);
	}
}
