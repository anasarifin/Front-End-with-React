import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import close from "../img/close.png";

const url = "http://localhost:9999/api/v1/products";

class Modal extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {
				name: "",
				stock: "",
				description: "",
				price: "",
			},
			image: null,
			category: [],
		};
		this.postData = this.postData.bind(this);
		this.deleteData = this.deleteData.bind(this);
	}

	// getData() {
	// 	Axios.get(urls + "?name=" + this.props.name).then(resolve => {
	// 		this.setState({
	// 			data: resolve.data[0],
	// 		});
	// 	});
	// }
	handleChange(e) {
		console.log(e.target.files[0]);
		this.setState({
			image: e.target.files[0],
		});
	}
	postData() {
		const image = this.state.image;
		const formData = new FormData();
		formData.append("name", document.getElementById("xName").value);
		formData.append("description", document.getElementById("xDesc").value);
		formData.append("price", document.getElementById("xPrice").value);
		formData.append("stock", document.getElementById("xStock").value);
		formData.append("image", image);
		formData.append("category_id", document.getElementById("xCategory").value);
		const id = document.getElementById("xHidden").value;

		if (image.type == "image/jpeg" || image.type == "image/png" || image.type == "image/jpg" || image.type == "image/gif") {
			if (image.size <= 200000) {
				if (!id) {
					Axios.post(url, formData, {
						headers: {
							usertoken: localStorage.getItem("token"),
						},
					})
						.then(() => {
							this.hideCart();
							this.props.refresh();
						})
						.catch(reject => {
							console.log(reject);
							this.hideCart();
							this.props.refresh();
						});
				} else {
					Axios.patch(url + "/" + id, formData, {
						headers: {
							usertoken: localStorage.getItem("token"),
						},
					})
						.then(() => {
							this.hideCart();
							this.props.refresh();
						})
						.catch(reject => {
							console.log(reject);
							this.hideCart();
							this.props.refresh();
						});
				}
			} else {
				return alert("Maximum file size is 200kb!");
			}
		} else {
			return alert("File is not image type!");
		}
	}

	deleteData() {
		const id = document.getElementById("xHidden").value;
		Axios.delete(url + "/" + id, {
			headers: {
				usertoken: localStorage.getItem("token"),
			},
		})
			.then(() => {
				this.hideCart();
				this.props.refresh();
			})
			.catch(reject => {
				console.log(reject);
				this.hideCart();
				this.props.refresh();
			});
	}

	// getCategory() {
	// 	Axios.get(urlCat).then(resolve => {
	// 		this.setState({
	// 			category: resolve.data,
	// 		});
	// 	});
	// }

	hideCart() {
		document.getElementById("xName").value = null;
		document.getElementById("xStock").value = null;
		document.getElementById("xPrice").value = null;
		document.getElementById("xCategory").value = null;
		document.getElementById("xDesc").value = null;
		document.getElementById("xHidden").value = null;
		document.getElementById("modal").classList.remove("show");
		document.getElementById("blackLayer").classList.remove("show");
	}

	// componentDidMount() {
	// 	this.getCategory();
	// }

	render() {
		const categoryList = [];
		this.props.category.categoryList.map((data, x) => {
			categoryList.push(
				<option key={x} value={data.id}>
					{data.name}
				</option>,
			);
		});

		return (
			<div id="modal" className={this.props.show}>
				<Form>
					<FormGroup row>
						<Label for="name" sm={2}>
							Name
						</Label>
						<Col sm={10}>
							<Input type="text" name="name" id="xName" pattern="[A-Za-z0-9]{4,}" required />
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
								{categoryList}
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
							<Input type="file" name="image" id="xImage" onChange={e => this.handleChange(e)} required />
							<FormText color="muted"></FormText>
						</Col>
					</FormGroup>
					<Button onClick={this.postData} className="modal-button" color="primary">
						Submit
					</Button>
					<Button onClick={this.deleteData} color="danger">
						Delete
					</Button>
				</Form>
				<input type="hidden" id="xHidden"></input>
				<img src={close} alt="close" onClick={this.hideCart} />
			</div>
		);
	}
}

Modal.propTypes = {
	refresh: PropTypes,
	show: PropTypes,
	category: PropTypes,
};

const mapStateToProps = state => {
	return {
		category: state.category,
	};
};

export default connect(mapStateToProps)(Modal);

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

// {
// 	name: document.getElementById("xName").value,
// 	description: document.getElementById("xDesc").value,
// 	price: document.getElementById("xPrice").value,
// 	stock: document.getElementById("xStock").value,
// 	image: formData,
// 	category_id: document.getElementById("xCategory").value,
// }
