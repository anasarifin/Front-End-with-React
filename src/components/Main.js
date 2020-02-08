import React from "react";
import MainCard from "./MainCard";
import Cart from "./Cart";
import Header from "./Header";
import Axios from "axios";

const productUrl = "http://localhost:9999/api/v1/products";

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			cart: [],
		};
		this.moveToCart = this.moveToCart.bind(this);
		this.searchFilter = this.searchFilter.bind(this);
		this.sortFilter = this.sortFilter.bind(this);
	}

	moveToCart(event) {
		console.log(event);
		this.setState({
			cart: [...this.state.cart, event.target.textContent],
		});
	}

	getProduct() {
		Axios.get(productUrl).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	searchFilter(event) {
		const name = event.target.value;
		console.log(name);
		Axios.get(productUrl + "?name=" + name + "?type=" + this.state.type).then(resolve => {
			this.setState({
				productList: resolve.data,
				name: name,
			});
		});
	}

	sortFilter(event) {
		const type = event.target.value;
		console.log(type);
		Axios.get(productUrl + "?type=" + type + "?name=" + this.state.name || "").then(resolve => {
			console.log(resolve.data);
			this.setState({
				productList: resolve.data,
				type: type,
			});
		});
	}

	componentDidMount() {
		this.getProduct();
	}

	render() {
		const products = [];
		if (this.state.productList.length > 0) {
			console.log(this.state.productList);
			this.state.productList.map((data, x) => {
				products.push(<MainCard key={x} event={this.moveToCart} product={data} />);
			});
		}
		return (
			<div id="main">
				<Header eventSearch={this.searchFilter} eventSort={this.sortFilter} />
				{products}
				<Cart list={this.state.cart} />
			</div>
		);
	}
}
