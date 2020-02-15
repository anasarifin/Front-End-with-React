import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

const url = "http://localhost:9999/api/v1/cart";

export default class MainCard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
		this.addToCart = this.addToCart.bind(this);
	}

	toRupiah(number) {
		let number_string = number.toString();
		let leftover = number_string.length % 3;
		let rupiah = number_string.substr(0, leftover);
		let thousand = number_string.substr(leftover).match(/\d{3}/g);
		if (thousand) {
			let separator = leftover ? "." : "";
			rupiah += separator + thousand.join(".");
		}
		return rupiah;
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
			id: this.props.product.id,
		});
	}

	addToCart() {
		const id = this.props.product.id;
		if (this.props.product.stock > 0) {
			Axios.patch(url, { id: id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
				console.log(resolve);
			});
		} else {
			alert("Out of stock!");
		}
	}

	render() {
		return (
			<div className="flex" onClick={this.addToCart}>
				<img src={this.props.product.image} alt={this.props.product.name} />
				<span>
					<b>{this.props.product.name}</b>
				</span>
				<br />
				<span>
					Rp. {this.toRupiah(this.props.product.price)} | Stock: {this.props.product.stock}
				</span>
			</div>
		);
	}
}

MainCard.propTypes = {
	product: PropTypes,
};

{
	/* <div className="product" onClick={this.addToCart}>
	<img src={this.props.product.image}></img>
	<span className="name">{this.props.product.name}</span>
	<span className="desc">{this.props.product.description}</span>
	<span className="stock">Stock: {this.props.product.stock}</span>
	<span className="price">{this.props.product.price}</span>
</div>; */
}
