import React from "react";
import CartCard from "./CartCard";
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
		Axios.get(url, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
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
		Axios.delete(url, { data: { id: "all" }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
			console.log(resolve);
		});
	}
	paymentConfirm() {
		this.state.modal ? this.setState({ modal: "" }) : this.setState({ modal: "show" });
	}
	checkout() {
		Axios.post(
			url,
			{ username: localStorage.getItem("username") },
			{
				headers: {
					usertoken: localStorage.getItem("token"),
				},
			},
		).then(resolve => {
			alert("Transaction success!");
		});
	}
	componentDidUpdate() {
		this.getCart();
	}

	render() {
		let cart = [];
		if (this.state.cartList.length > 1) {
			this.state.cartList.map((data, x) => {
				cart.push(<CartCard key={x} product={data} />);
			});
		} else if (this.state.cartList.length === 1) {
			cart = <CartCard product={this.state.cartList[0]} />;
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
				{/* <Confirm show={this.state.modal} cartList={this.state.cartList.sold_item_list} /> */}
				<div className={this.state.modal ? "layer show" : "layer"}></div>
			</div>
		);
	}
}
