import React from "react";
import Axios from "axios";

const url = "http://localhost:9999/api/v1/cart";

export default class CheckButton extends React.Component {
	resetCart() {
		Axios.delete(url, { data: { id: "all" } }).then(resolve => {
			console.log(resolve);
		});
	}

	render() {
		return (
			<div>
				<span>Total Price: {this.props.totalPrice}</span>
				<br />
				<button>Checkout</button>
				<br />
				<button onClick={this.resetCart}>Reset cart</button>
			</div>
		);
	}
}
