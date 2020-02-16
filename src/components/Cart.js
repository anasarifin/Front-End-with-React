import React from "react";
import CartCard from "./CartCard";
import Axios from "axios";
import "../style/Cart.css";
import { connect } from "react-redux";
import { reset } from "../redux/actions/cart";

const url = "http://localhost:9999/api/v1/cart";

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			cartList: [],
			totalPrice: 10,
			modal: "",
		};
		this.resetCart = this.resetCart.bind(this);
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
		// Axios.delete(url, { data: { id: "all" }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
		// 	console.log(resolve);
		// });
		this.props.dispatch(reset());
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
			cart = <img src="http://localhost:9999/public/img/empty.jpg" alt="empty" />;
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
						<button onClick={this.checkout}>Checkout</button>
						<br />
						<button onClick={this.resetCart}>Reset cart</button>
					</div>
				)}

				{/* <Confirm show={this.state.modal} cartList={this.state.cartList.sold_item_list} /> */}
				<div className={this.state.modal ? "layer show" : "layer"}></div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Cart);
