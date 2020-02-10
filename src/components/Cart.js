import React from "react";
import CartCard from "./CartCard";
import CheckButton from "./CheckButton";
import "../style/Cart.css";

export default class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			cart: [],
			totalPrice: 10
		};
		this.getTotalPrice = this.getTotalPrice.bind(this);
	}

	getTotalPrice(sum) {
		console.log(sum);
		this.setState({
			totalPrice: this.state.totalPrice + sum
		});
	}

	// componentDidMount() {
	// 	this.setState({
	// 		list: this.props.list,
	// 	});
	// }

	render() {
		const products = [];
		this.props.list.map((data, x) => {
			products.push(<CartCard key={x} id={data} event={this.getTotalPrice} />);
		});
		return (
			<div id="cart">
				{products}
				<CheckButton totalPrice={this.state.totalPrice} />
			</div>
		);
	}
}
