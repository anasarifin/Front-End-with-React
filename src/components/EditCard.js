import React from "react";
import Axios from "axios";

const url = "http://localhost:9999/api/v1/cart";

export default class MainCard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
			id: this.props.product_id,
		});
	}

	// addToCart() {
	// 	const id = this.props.productId;
	// 	Axios.patch(url, { id: id }).then(resolve => {
	// 		console.log(resolve);
	// 	});
	// }

	render() {
		return (
			<div className="product" onClick={this.props.event} data-product={this.props.data}>
				<img src={this.props.product.image}></img>
				<span className="name">{this.props.product.name}</span>
				<span className="desc">{this.props.product.description}</span>
				<span className="stock">Stock: {this.props.product.stock}</span>
				<span className="price">{this.props.product.price}</span>
			</div>
		);
	}
}
