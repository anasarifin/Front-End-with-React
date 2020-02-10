import React from "react";

export default class Confirm extends React.Component {
	render() {
		let cart = "";
		if (this.props.cartList) {
			this.props.cartList.map((data, x) => {
				cart += (
					<div key={x}>
						<span>{data.name}</span>
					</div>
				);
			});
		}
		return (
			<div id="confirmCheckout" className={this.props.show}>
				{cart}
			</div>
		);
	}
}
