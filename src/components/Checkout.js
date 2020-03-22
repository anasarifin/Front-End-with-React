import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { reset, resetPrice } from "../redux/actions/cart";
import PropTypes from "prop-types";

const url = "http://100.24.32.116:8888/api/v1/cart";

class Checkout extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.checkout = this.checkout.bind(this);
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

	cancelCheckout() {
		document.getElementById("checkout-con").classList.remove("show");
		document.getElementById("blackLayer2").classList.remove("show");
		document.getElementById("blackLayer").classList.remove("show");
	}

	resetCart() {
		this.props.dispatch(reset());
		this.props.dispatch(resetPrice());
		this.cancelCheckout();
	}

	checkout() {
		console.log(this.props.cart.cartList);
		const data = this.props.cart.cartList;
		const final = [];
		const order = document.getElementsByClassName("order");
		for (let x = 0; x < order.length; x++) {
			final.push(parseFloat(order[x].textContent));
		}

		Axios.post(
			url,
			{ data: data, order: final },
			{
				headers: {
					usertoken: localStorage.getItem("token"),
				},
			},
		).then(resolve => {
			console.log(resolve);
			this.resetCart();
		});
	}

	render() {
		let cart = [];
		if (this.props.cart.cartList.length > 0 && document.getElementsByClassName("order")[0]) {
			this.props.cart.cartList.map((data, x) => {
				cart.push(
					<div key={x}>
						<span>
							{data.name} {document.getElementsByClassName("order")[x].textContent}x
						</span>
						<span className="co-price">Rp. {this.toRupiah(data.price * document.getElementsByClassName("order")[x].textContent)}</span>
					</div>,
				);
			});
			cart.push(
				<div>
					<span>PPN 10%</span>
					<span className="co-price">Rp. {this.toRupiah(this.props.cart.totalPrice / 10)}</span>
				</div>,
			);
			cart.push(
				<div id="payment">
					<span>Payment: Cash</span>
					<span className="co-price">Total: Rp. {this.toRupiah(this.props.cart.totalPrice + this.props.cart.totalPrice / 10)}</span>
				</div>,
			);
		}

		return (
			<div id="checkout">
				<span>Checkout</span>
				<span>Receipt no: #{new Date().toISOString}</span>
				<span>Cashier: {localStorage.getItem("username")}</span>
				{cart}
				<button className="print" onClick={this.checkout}>
					Print
				</button>
				<button className="cancel" onClick={this.cancelCheckout}>
					Cancel
				</button>
			</div>
		);
	}
}

Checkout.propTypes = {
	cart: PropTypes,
	dispatch: PropTypes,
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Checkout);
