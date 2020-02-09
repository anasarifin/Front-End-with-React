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
			name: "?",
			type: "",
			sort: "",
		};
		this.moveToCart = this.moveToCart.bind(this);
		this.filterName = this.filterName.bind(this);
		this.filterType = this.filterType.bind(this);
		this.filterSort = this.filterSort.bind(this);
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

	filterName(event) {
		const name = "?name=" + event.target.value;
		Axios.get(productUrl + name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				name: name,
			});
		});
	}

	filterType(event) {
		const type = event.target.value == "all" ? "" : "&type=" + event.target.value;
		Axios.get(productUrl + this.state.name + type + this.state.sort).then(resolve => {
			console.log(resolve.data);
			this.setState({
				productList: resolve.data,
				type: type,
			});
		});
	}

	filterSort(event) {
		const sort = "&sort=" + event.target.value;
		Axios.get(productUrl + this.state.name + this.state.type + sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				sort: sort,
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
				<Header eventSearch={this.filterName} eventType={this.filterType} eventSort={this.filterSort} />
				{products}
				<Cart list={this.state.cart} />
			</div>
		);
	}
}
