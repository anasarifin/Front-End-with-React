import React from "react";
import CartCard from "./CartCard";
import CheckButton from "./CheckButton";
import Axios from "axios";
import "../style/Cart.css";

const url = "http://localhost:9999/api/v1/cart";

export default class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			cartList: [],
			totalPrice: 10,
		};
		// this.getTotalPrice = this.getTotalPrice.bind(this);
	}

	// getTotalPrice(sum) {
	// 	console.log(sum);
	// 	this.setState({
	// 		totalPrice: this.state.totalPrice + sum,
	// 	});
	// }

	getCart() {
		Axios.get(url).then(resolve => {
			this.setState({
				cartList: resolve.data,
				totalPrice: resolve.data.reduce((sum, product) => {
					return (sum += product.quantity * product.price);
				}, 0),
			});
		});
	}

	// componentDidMount() {
	// 	this.setState({
	// 		list: this.props.list,
	// 	});
	// }

	// componentDidMount() {
	// 	this.getCart();
	// }
	componentDidUpdate() {
		this.getCart();
	}

	render() {
		const cart = [];
		if (this.state.cartList.length > 0) {
			this.state.cartList.map((data, x) => {
				cart.push(<CartCard key={x} product={data} />);
			});
		}
		return (
			<div id="cart">
				{cart}
				<CheckButton totalPrice={this.state.totalPrice} />
			</div>
		);
	}
}
