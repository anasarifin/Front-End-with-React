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
	}

	// componentDidMount() {
	// 	this.setState({
	// 		list: this.props.list,
	// 	});
	// }

	render() {
		const products = [];
		this.props.list.map((data, x) => {
			products.push(<CartCard key={x} name={data} />);
		});
		return (
			<div id="cart">
				{products}
				<CheckButton totalPrice={this.state.totalPrice} />
			</div>
		);
	}
}
