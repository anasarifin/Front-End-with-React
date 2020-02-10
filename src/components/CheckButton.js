import React from "react";

export default class CheckButton extends React.Component {
	render() {
		console.log(document.getElementsByClassName("totalPrice")[0]);
		return (
			<div>
				<span>Total Price: {this.props.totalPrice}</span>
				<br />
				<button>Checkout</button>
			</div>
		);
	}
}
