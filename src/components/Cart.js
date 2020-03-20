import React from "react";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import Axios from "axios";
import "../style/Cart.css";
import { connect } from "react-redux";
import { reset, resetPrice } from "../redux/actions/cart";
import empty from "../img/empty.jpg";
import PropTypes from "prop-types";

const url = "http://100.24.32.116:9999/api/v1/cart";

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			cartList: [],
			totalPrice: 10,
			modal: "",
		};
		this.resetCart = this.resetCart.bind(this);
		this.checkout = this.checkout.bind(this);
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

	resetCart() {
		// Axios.delete(url, { data: { id: "all" }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
		// 	console.log(resolve);
		// });
		this.props.dispatch(reset());
		this.props.dispatch(resetPrice());
	}

	paymentConfirm() {
		this.state.modal ? this.setState({ modal: "" }) : this.setState({ modal: "show" });
	}

	showCheckout() {
		document.getElementById("checkout-con").classList.add("show");
		document.getElementById("blackLayer2").classList.add("show");
		document.getElementById("blackLayer").classList.remove("show");
	}

	checkout() {
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
	// componentDidMount() {
	// 	console.log(this.props);
	// }
	componentDidUpdate() {
		this.getCart();
	}

	render() {
		let cart = [];
		if (this.props.cart.cartList.length > 1) {
			this.props.cart.cartList.map((data, x) => {
				cart.push(<CartCard key={x} product={data} />);
			});
		} else if (this.props.cart.cartList.length === 1) {
			cart = <CartCard product={this.props.cart.cartList[0]} />;
		} else if (this.props.cart.cartList.length === 0) {
			cart = <img src={empty} alt="empty" className="empty" />;
		}

		return (
			<div id="cart">
				<div id="cart-list">
					{cart}
					<br />
				</div>

				{this.props.cart.cartList.length === 0 ? (
					""
				) : (
					<div id="checkButton">
						<span>Total:</span>
						<span>Rp. {this.toRupiah(this.props.cart.totalPrice)}*</span>
						<span>*PPN is not included</span>
						<button onClick={this.showCheckout}>Checkout</button>
						<br />
						<button onClick={this.resetCart}>Cancel</button>
					</div>
				)}
				<div id="checkout-con">
					<Checkout />
				</div>
				<div id="blackLayer2"></div>
				{/* <Confirm show={this.state.modal} cartList={this.state.cartList.sold_item_list} /> */}
				{/* <div className={this.state.modal ? "layer show" : "layer"}></div> */}
			</div>
		);
	}
}

Cart.propTypes = {
	cart: PropTypes,
	dispatch: PropTypes,
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Cart);
