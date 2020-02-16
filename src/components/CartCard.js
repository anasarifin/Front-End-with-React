import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";

const url = "http://localhost:9999/api/v1/cart";

export default class CartCard extends React.Component {
	constructor() {
		super();
		this.state = {
			order: 1,
			stock: 1,
		};
		this.reduceStock = this.reduceStock.bind(this);
		this.addStock = this.addStock.bind(this);
	}

	reduceStock() {
		this.setState({
			order: this.state.order - 1,
			stock: this.state.stock + 1,
		});
		// Axios.delete(url, { data: { id: this.props.product.product_id, qty: 1 }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
		// 	console.log(resolve);
		// });
	}

	addStock() {
		if (this.state.stock > 0) {
			this.setState({
				order: this.state.order + 1,
				stock: this.state.stock - 1,
			});
			// Axios.patch(url, { id: this.props.product.product_id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
			// 	console.log(resolve);
			// });
		}
	}

	componentDidMount() {
		this.setState({
			stock: this.props.product.stock - 1,
		});
	}
	// componentDidUpdate() {
	// 	this.setState({
	// 		order: this.props.product.quantity,
	// 		stock: this.props.product.stock,
	// 	});
	// }

	// getData() {
	// 	Axios.get(url + "?id=" + this.props.id).then(resolve => {
	// 		this.setState({
	// 			name: resolve.data[0].name,
	// 			stock: resolve.data[0].stock,
	// 			price: resolve.data[0].price,
	// 		});
	// 	});
	// }

	// componentDidMount() {
	// 	this.getData();
	// }

	render() {
		return (
			<div>
				{this.state.order !== 0 ? (
					<div className="cart_card">
						<div>
							<img src={this.props.product.image}></img>
						</div>
						<div>
							<span className="name">
								<b>{this.props.product.name}</b>
							</span>
							<br />
							<button color="primary" onClick={this.reduceStock}>
								-
							</button>
							<span className="order">{this.state.order}</span>
							<button color="primary" onClick={this.addStock}>
								+
							</button>
							<br />
							<span className="price">Price: {this.props.product.price}</span>
							<input type="hidden" className="totalPrice" data-price={this.props.product.price * this.state.order}></input>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

CartCard.propTypes = {
	product: PropTypes,
};
