import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import PropTypes from "prop-types";

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
			id: this.props.product.id,
		});
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

	fillModal() {
		document.getElementById("xName").value = this.props.product.name;
		document.getElementById("xStock").value = this.props.product.stock;
		document.getElementById("xPrice").value = this.props.product.price;
		document.getElementById("xCategory").value = this.props.product.category_id;
		document.getElementById("xDesc").value = this.props.product.description;
		document.getElementById("xHidden").value = this.props.product.id;
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
			<div className="flex" onClick={this.fillModal}>
				<span>
					<img src={this.props.product.image} alt={this.props.product.name} />
				</span>
				<span>{this.props.product.name}</span>
				<span>Rp. {this.toRupiah(this.props.product.price)}</span>
				<span>Stock: {this.props.product.stock}</span>
			</div>
		);
	}
}

MainCard.propTypes = {
	product: PropTypes,
};
