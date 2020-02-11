import React from "react";
import Axios from "axios";
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from "reactstrap";

const url = "http://localhost:9999/api/v1/cart";

export default class MainCard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
		this.fillModal = this.fillModal.bind(this);
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
			id: this.props.product_id,
		});
	}

	fillModal() {
		document.getElementById("xName").value = this.props.product.name;
		document.getElementById("xStock").value = this.props.product.stock;
		document.getElementById("xPrice").value = this.props.product.price;
		document.getElementById("xCategory").value = this.props.product.category_id;
		document.getElementById("xDesc").value = this.props.product.description;
		document.getElementById("modal").classList.add("show");
		document.getElementById("blackLayer").classList.add("show");
	}

	// addToCart() {
	// 	const id = this.props.productId;
	// 	Axios.patch(url, { id: id }).then(resolve => {
	// 		console.log(resolve);
	// 	});
	// }

	render() {
		return (
			<Card onClick={this.fillModal}>
				<CardImg top width="100%" src={this.props.product.image} alt={this.props.product.name} />
				<CardBody>
					<CardTitle className="xName">
						<b>{this.props.product.name}</b>
					</CardTitle>
					<CardText className="xDesc">{this.props.product.description}</CardText>
					<CardText>
						<small className="text-muted xStock">Stock: {this.props.product.stock}</small> <small> | </small> <small className="text-muted xPrice">Price: {this.props.product.price}</small>
					</CardText>
				</CardBody>
			</Card>
		);
	}
}

{
	/* <div></div>; */
}
