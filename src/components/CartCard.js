import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reducePrice, addPrice } from "../redux/actions/cart";

// const url = "http://localhost:9999/api/v1/cart";

class CartCard extends React.Component {
	constructor() {
		super();
		this.state = {
			order: 1,
			stock: 1,
		};
		this.reduceStock = this.reduceStock.bind(this);
		this.addStock = this.addStock.bind(this);
	}

	reduceStock() {
		if (this.state.order > 1) {
			this.setState({
				order: this.state.order - 1,
				stock: this.state.stock + 1,
			});
			this.props.dispatch(reducePrice(this.props.product.price));
		}

		// Axios.delete(url, { data: { id: this.props.product.product_id, qty: 1 }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
		// 	console.log(resolve);
		// });
	}

	addStock() {
		if (this.state.stock > 0) {
			this.setState({
				order: this.state.order + 1,
				stock: this.state.stock - 1,
			});
			this.props.dispatch(addPrice(this.props.product.price));
			// Axios.patch(url, { id: this.props.product.product_id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
			// 	console.log(resolve);
			// });
		} else {
			alert("Out of stock!");
		}
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
			stock: this.props.product.stock - 1,
		});
	}
	// componentDidUpdate() {
	// 	this.setState({
	// 		order: this.props.product.quantity,
	// 		stock: this.props.product.stock,
	// 	});
	// }

	// getData() {
	// 	Axios.get(url + "?id=" + this.props.id).then(resolve => {
	// 		this.setState({
	// 			name: resolve.data[0].name,
	// 			stock: resolve.data[0].stock,
	// 			price: resolve.data[0].price,
	// 		});
	// 	});
	// }

	// componentDidMount() {
	// 	this.getData();
	// }

	render() {
		return (
			<div className="cart_card">
				<div>
					<img src={this.props.product.image}></img>
				</div>
				<div>
					<span className="name">
						<b>{this.props.product.name}</b>
					</span>
					<br />
					<button onClick={this.reduceStock}>-</button>
					<span className="order">{this.state.order}</span>
					<button onClick={this.addStock}>+</button>
					<br />
					<span className="price">Rp. {this.toRupiah(this.props.product.price * this.state.order)}</span>
					<input type="hidden" className="totalPrice" data-price={this.props.product.price * this.state.order}></input>
				</div>
			</div>
		);
	}
}

CartCard.propTypes = {
	product: PropTypes,
	dispatch: PropTypes,
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(CartCard);
