import React from "react";
import Axios from "axios";

const url = "http://localhost:9999/api/v1/cart";

export default class CheckButton extends React.Component {
	checkout() {
		console.log(localStorage.getItem("username"));
		Axios.post(url, { username: localStorage.getItem("username") });
	}
	resetCart() {
		Axios.delete(url, { data: { id: "all" } }).then(resolve => {
			console.log(resolve);
		});
	}

	render() {
		return (
			<div id="checkButton">
				<span>Total Price: {this.props.totalPrice}</span>
				<br />
				<Button className="button" color="primary">
					Checkout
				</Button>
				<br />
				<Button onClick={this.resetCart} color="danger">
					Reset cart
				</Button>
			</div>
		);
	}
}
