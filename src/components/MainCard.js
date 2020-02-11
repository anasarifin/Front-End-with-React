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
		this.addToCart = this.addToCart.bind(this);
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
			id: this.props.product.id,
		});
	}

	addToCart() {
		const id = this.props.product.id;
		Axios.patch(url, { id: id }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
			console.log(resolve);
		});
	}

	render() {
		return (
			<div>
				<Card onClick={this.addToCart}>
					<CardImg top width="100%" src={this.props.product.image} alt={this.props.product.name} />
					<CardBody>
						<CardTitle className="xName">{this.props.product.name}</CardTitle>
						<CardText className="xDesc">{this.props.product.description}</CardText>
						<CardText>
							<small className="text-muted xStock">Stock: {this.props.product.stock}</small>
							<br />
							<small className="text-muted xPrice">Price: {this.props.product.price}</small>
						</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}
}

{
	/* <div className="product" onClick={this.addToCart}>
	<img src={this.props.product.image}></img>
	<span className="name">{this.props.product.name}</span>
	<span className="desc">{this.props.product.description}</span>
	<span className="stock">Stock: {this.props.product.stock}</span>
	<span className="price">{this.props.product.price}</span>
</div>; */
}
