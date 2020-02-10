import React from "react";
import Axios from "axios";

const productUrl = "http://localhost:9999/api/v1/products";

export default class CartCard extends React.Component {
	constructor() {
		super();
		this.state = {
			order: 1
		};
	}

	reduceStock = () => {
		this.setState({
			order: this.state.order - 1,
			stock: this.state.stock + 1
		});
	};

	addStock = () => {
		if (this.state.stock > 0) {
			this.setState({
				order: this.state.order + 1,
				stock: this.state.stock - 1
			});
		}
	};

	getData() {
		Axios.get(productUrl + "?name=" + this.props.name).then(resolve => {
			this.setState({
				stock: resolve.data[0].stock,
				price: resolve.data[0].price
			});
		});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			<div>
				{this.state.order !== 0 ? (
					<div className="cart_card">
						<div>
							<img></img>
						</div>
						<div>
							<span className="name">{this.props.name}</span>
							<br />
							<button className="reduce" onClick={this.reduceStock}>
								-
							</button>
							<span className="order">{this.state.order}</span>
							<button className={this.state.stock !== 0 ? "add" : "add out"} onClick={this.addStock}>
								+
							</button>
							<br />
							<span className="stock">Stock Available: {this.state.stock}</span>
							<br />
							<span className="price">Price: {this.state.price * this.state.order}</span>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}
