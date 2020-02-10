import React from "react";

export default class CheckButton extends React.Component {
	render() {
		return (
			<div>
				<span>Total Price: {this.props.totalPrice}</span>
				<br />
				<button>Checkout</button>
			</div>
		);
	}
}
