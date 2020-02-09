import React from "react";
import Axios from "axios";

const urls = "http://localhost:9999/api/v1/products";
const url = "http://localhost:9999/api/v1/product/";

export default class Modal extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {
				name: "",
				stock: "",
				description: "",
				price: "",
			},
		};
	}

	getData() {
		Axios.get(urls + "?name=" + this.props.name).then(resolve => {
			this.setState({
				data: resolve.data[0],
			});
		});
	}

	postData() {
		console.log(document.getElementById("editDesc").value);
		Axios.patch(url + 20, {
			name: document.getElementById("editName").value,
			description: document.getElementById("editDesc").value,
			price: document.getElementById("editPrice").value,
			stock: document.getElementById("editStock").value,
			image: "empty",
			category_id: document.getElementById("editCategory").value,
		})
			.then(resolve => {
				alert(resolve);
			})
			.catch(reject => {
				console.log(reject);
			});
	}

	componentDidUpdate() {
		this.getData();
	}

	render() {
		return (
			<div id="modal">
				<label>Name</label>
				<input id="editName" type="text"></input>
				<label>Stock</label>
				<input id="editStock" type="text"></input>
				<label>Description</label>
				<input id="editDesc" type="text"></input>
				<label>Price</label>
				<input id="editPrice" type="text"></input>
				<label>Category</label>
				<select id="editCategory">
					<option value="0">Food</option>
					<option value="1">Drink</option>
				</select>
				<button id="editButton" onClick={this.postData}>
					Submit
				</button>
			</div>
		);
	}
}
