import React from "react";
import Axios from "axios";
import { Button } from "reactstrap";
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
		Axios.delete(url, { data: { id: this.props.product.product_id, qty: 1 }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
			console.log(resolve);
		});
	}

	addStock() {
		if (this.state.stock > 0) {
			this.setState({
				order: this.state.order + 1,
				stock: this.state.stock - 1,
			});
			Axios.patch(url, { id: this.props.product.product_id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
				console.log(resolve);
			});
		}
	}

	componentDidMount() {
		this.setState({
			order: this.props.product.quantity,
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
							<img></img>
						</div>
						<div>
							<span className="name">{this.props.product.name}</span>
							<br />
							<Button color="primary" onClick={this.reduceStock}>
								-
							</Button>
							<span className="order">{this.state.order}</span>
							<Button color="primary" onClick={this.addStock}>
								+
							</Button>
							<br />
							<span className="stock">Stock Available: {this.state.stock}</span>
							<br />
							<span className="price">Price: {this.props.product.price * this.state.order}</span>
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
