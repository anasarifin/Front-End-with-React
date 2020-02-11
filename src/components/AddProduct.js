import React from "react";
import Axios from "axios";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const url = "http://localhost:9999/api/v1/products";
// {this.props.show}
export default class Modal extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	handleFile() {
		alert(123);
	}
	postData() {
		Axios.post(url, {
			name: document.getElementById("xName").value,
			description: document.getElementById("xDesc").value,
			price: document.getElementById("xPrice").value,
			stock: document.getElementById("xStock").value,
			image: document.getElementById("xImage").value,
			category_id: document.getElementById("xCategory").value,
		})
			.then(resolve => {
				console.log(resolve);
			})
			.catch(reject => {
				console.log(reject);
			});
	}

	render() {
		return (
			<div id="addProduct">
				<Form>
					<FormGroup row>
						<Label for="name" sm={2}>
							Name
						</Label>
						<Col sm={10}>
							<Input type="text" name="name" id="xName" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="stock" sm={2}>
							Stock
						</Label>
						<Col sm={10}>
							<Input type="number" name="stock" id="xStock" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="price" sm={2}>
							Price
						</Label>
						<Col sm={10}>
							<Input type="number" name="price" id="xPrice" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="category" sm={2}>
							Category
						</Label>
						<Col sm={10}>
							<Input type="select" name="category" id="xCategory">
								<option value="0">Food</option>
								<option value="1">Drink</option>
							</Input>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="desc" sm={2}>
							Description
						</Label>
						<Col sm={10}>
							<Input type="textarea" name="desc" id="xDesc" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="image" sm={2}>
							Image
						</Label>
						<Col sm={10}>
							<Input type="file" name="image" id="xImage" onChange={alert(123)} />
							<FormText color="muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</FormText>
						</Col>
					</FormGroup>
					<Button onClick={this.postData}>Submit</Button>
				</Form>
			</div>
		);
	}
}
{
	/* <div id="modal">
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
</div>; */
}
