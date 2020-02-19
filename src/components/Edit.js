import React from "react";
import EditCard from "./EditCard";
import Header from "./Header";
import Axios from "axios";
import Modal from "./Modal";
import "../style/Main.css";

const url = "http://localhost:9999/api/v1/products?page=";

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			id: 1,
			name: "&",
			type: "",
			sort: "",
			show: "",
		};
		this.moveToCart = this.moveToCart.bind(this);
		this.filterName = this.filterName.bind(this);
		this.filterType = this.filterType.bind(this);
		this.filterSort = this.filterSort.bind(this);
		this.showModal = this.showModal.bind(this);
		this.getProduct = this.getProduct.bind(this);
	}
	getProduct() {
		Axios.get(url + 1).then(resolve => {
			this.setState({
				productList: resolve.data,
			});
		});
	}

	moveToCart(event) {
		this.setState({
			id: event.currentTarget.dataset.name,
		});
	}

	containerSize() {
		document.getElementById("main-card-con").style.width = window.innerWidth - 50 + "px";
	}

	filterName(event) {
		const name = "&name=" + event.target.value;
		Axios.get(url + 1 + name + this.state.type + this.state.sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				name: name,
			});
		});
	}

	filterType(event) {
		const type = event.target.value === "all" ? "" : "&type=" + event.target.value;
		Axios.get(url + 1 + this.state.name + type + this.state.sort).then(resolve => {
			console.log(resolve.data);
			this.setState({
				productList: resolve.data,
				type: type,
			});
		});
	}

	filterSort(event) {
		const sort = "&sort=" + event.target.value;
		Axios.get(url + 1 + this.state.name + this.state.type + sort).then(resolve => {
			this.setState({
				productList: resolve.data,
				sort: sort,
			});
		});
	}

	componentDidMount() {
		this.getProduct();
		this.containerSize();
		window.addEventListener("resize", this.containerSize);
	}

	// fillModal() {
	// 	document.getElementById("product-con").addEventListener("click", event => {
	// 		if (event.target.className == "product") {
	// 			document.getElementById("xName").value = event.target;
	// 		}
	// 	});
	// }

	showModal() {
		document.getElementById("modal").classList.add("show");
		document.getElementById("blackLayer").classList.add("show");
	}

	render() {
		const products = [];
		if (this.state.productList.length > 0) {
			this.state.productList.map((data, x) => {
				products.push(<EditCard key={x} product={data} />);
			});
		}
		return (
			<div id="main">
				<Header eventSearch={this.filterName} eventType={this.filterType} eventSort={this.filterSort} cartIcon={false} />
				<div className="flex-con" id="main-card-con">
					{products}
				</div>
				<Modal refresh={this.getProduct} product={this.state.modal} show={this.state.show} />
				<div className="addButton" onClick={this.showModal}>
					+
				</div>
				<div id="blackLayer"></div>
			</div>
		);
	}
}
