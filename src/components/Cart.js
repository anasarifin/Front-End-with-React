import React from "react";
import CartCard from "./CartCard";
import Confirm from "./Confirm";
import Axios from "axios";
import "../style/Cart.css";
import { Button } from "reactstrap";

const url = "http://localhost:9999/api/v1/cart";

export default class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			cartList: [],
			totalPrice: 10,
			modal: "",
		};
		this.paymentConfirm = this.paymentConfirm.bind(this);
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
				cartCount: resolve.data.length,
			});
		});
	}
	resetCart() {
		Axios.delete(url, { data: { id: "all" } }).then(resolve => {
			console.log(resolve);
		});
	}
	paymentConfirm() {
		this.state.modal ? this.setState({ modal: "" }) : this.setState({ modal: "show" });
	}
	checkout() {
		Axios.post(url).then(resolve => {
			alert(resolve);
		});
	}
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
				<div id="cart-list">
					{cart}
					<br />
				</div>
				<div id="checkButton">
					<span>Total Price: {this.state.totalPrice}</span>
					<br />
					<Button onClick={this.checkout} className="button" color="primary">
						Checkout
					</Button>
					<br />
					<Button onClick={this.resetCart} color="danger">
						Reset cart
					</Button>
				</div>
				<Confirm show={this.state.modal} cartList={this.state.cartList.sold_item_list} />
				<div className={this.state.modal ? "layer show" : "layer"}></div>
			</div>
		);
	}
}
