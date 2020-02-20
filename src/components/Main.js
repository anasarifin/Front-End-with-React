import React from "react";
import query from "query-string";
import MainCard from "./MainCard";
import Cart from "./Cart";
import Header from "./Header";
import Axios from "axios";
import Modal from "./Modal";
import "../style/Main.css";

const url = "http://localhost:9999/api/v1/products?page=";
const urlNoPage = "http://localhost:9999/api/v1/products?";

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			cart: [],
			name: "",
			type: "",
			sort: "",
			show: true,
			totalPage: 1,
			currentPage: 1,
		};
		this.filterName = this.filterName.bind(this);
		this.filterType = this.filterType.bind(this);
		this.filterSort = this.filterSort.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.changePage = this.changePage.bind(this);
		this.getProduct = this.getProduct.bind(this);
	}

	getProduct() {
		Axios.get(url + this.state.currentPage).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	getPagination() {
		Axios.get(urlNoPage + this.state.name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				totalPage: Math.ceil(resolve.data.length / 8),
			});
		});
	}

	nextPage() {
		this.setState({
			currentPage: this.state.currentPage + 1,
		});
		Axios.get(url + (this.state.currentPage + 1) + this.state.name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	prevPage() {
		this.setState({
			currentPage: this.state.currentPage - 1,
		});
		Axios.get(url + (this.state.currentPage - 1) + this.state.name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	changePage(x) {
		this.setState({
			currentPage: parseFloat(x.target.textContent),
		});
		Axios.get(url + parseFloat(x.target.textContent) + this.state.name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	containerSize() {
		let size = 400;
		if (document.getElementById("main-card-con").offsetHeight + 50 > window.innerHeight) {
			size = 416;
		}
		document.getElementById("main-card-con").style.width = window.innerWidth - size + "px";
	}

	filterName(event) {
		const name = "&name=" + event.target.value;
		Axios.get(url + 1 + name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				name: name,
				currentPage: 1,
			});
		});
	}

	filterType(event) {
		const type = event.target.value == "all" ? "" : "&type=" + event.target.value;
		Axios.get(url + 1 + this.state.name + type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				type: type,
				currentPage: 1,
			});
		});
	}

	filterSort(event) {
		const sort = "&sort=" + event.target.value;
		Axios.get(url + 1 + this.state.name + this.state.type + sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				sort: sort,
				currentPage: 1,
			});
		});
	}

	// showCart() {
	// 	document.getElementById("cart").classList.toggle("show");
	// }
	hideCart() {
		document.getElementById("cart").classList.remove("show");
	}

	componentDidMount() {
		this.getPagination();
		window.addEventListener("resize", this.containerSize);
		if (query.parse(window.location.search).page) {
			this.setState({
				currentPage: parseFloat(query.parse(window.location.search).page),
			});
		}
		if (query.parse(window.location.search).search) {
			this.setState({
				name: query.parse(window.location.search).name,
			});
		}

		this.getProduct();
		// document.addEventListener("click", event => {
		// 	if (event.target.className != "product-con" || event.target.id != "cart" || event.target.className != "cart-icon") {
		// 		this.hideCart();
		// 	}
		// });
	}
	componentDidUpdate() {
		// this.getProduct();
		this.containerSize();
		this.getPagination();
	}

	render() {
		const products = [];
		if (this.state.productList.length > 0) {
			this.state.productList.map((data, x) => {
				products.push(<MainCard key={x} product={data} productId={data.id} />);
			});
		}
		const page = [];
		for (let x = 1; x <= this.state.totalPage; x++) {
			page.push(<span onClick={this.changePage}>{x}</span>);
		}
		return (
			<div id="main">
				<Header eventSearch={this.filterName} eventType={this.filterType} eventSort={this.filterSort} cartIcon={true} />
				<div className="flex-con" id="main-card-con">
					{products}
					<div className="pagination">
						<span onClick={this.state.currentPage > 1 ? this.prevPage : null}> &lt; </span>
						{page}
						<span onClick={this.state.currentPage < this.state.totalPage ? this.nextPage : null}> &gt; </span>
					</div>
				</div>
				<Cart list={this.state.cart} show={this.state.show} />
				<Modal refresh={this.getProduct} product={this.state.modal} show={this.state.show} />
				<div id="blackLayer"></div>
			</div>
		);
	}
}
