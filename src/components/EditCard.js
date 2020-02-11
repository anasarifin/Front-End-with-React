import React from "react";
import Axios from "axios";

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
		console.log(this.props.product);
		return (
			<div className="product" onClick={this.fillModal}>
				<div className="product-div">
					<span className="name">{this.props.product.name}</span>
					<span className="desc">{this.props.product.description}</span>
					<span className="stock">Stock: {this.props.product.stock}</span>
					<span className="price">{this.props.product.price}</span>
				</div>
			</div>
		);
	}
}
