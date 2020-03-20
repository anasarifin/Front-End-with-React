import React from "react";
import query from "query-string";
import MainCard from "./MainCard";
import Cart from "./Cart";
import Header from "./Header";
import Axios from "axios";
import Modal from "./Modal";
import "../style/Main.css";
import { connect } from "react-redux";

const url = "http://100.24.32.116:9999/api/v1/products?page=";
const urlNoPage = "http://100.24.32.116:9999/api/v1/products?";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			cart: [],
			name: "",
			type: "",
			sort: "",
			show: true,
			currentPage: 1,
		};
		this.filterName = this.filterName.bind(this);
		this.filterType = this.filterType.bind(this);
		this.filterSort = this.filterSort.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.changePage = this.changePage.bind(this);
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
			currentPage: parseFloat(x),
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
		const name = new RegExp(event.target.value, "i");

		this.setState({
			currentPage: 1,
			productList: this.props.product.productList.filter(x => {
				return x.name.match(name);
			}),
		});
	}

	filterType(event) {
		this.setState({
			currentPage: 1,
			productList: this.props.product.productList.filter(x => {
				return parseFloat(x.category_id) === parseFloat(event.target.value);
			}),
		});
	}

	filterSort(event) {
		this.setState({
			currentPage: 1,
			productList: this.props.product.productList.sort((a, b) => {
				let sort = "";
				switch (event.target.value) {
					case "name":
						sort = a.name.charCodeAt(0) - b.name.charCodeAt(0);
						break;
					case "nameX":
						sort = b.name.charCodeAt(0) - a.name.charCodeAt(0);
						break;
					case "price":
						sort = a.price - b.price;
						break;
					case "priceX":
						sort = b.price - a.price;
						break;
					case "stock":
						sort = a.stock - b.stock;
						break;
					case "stockX":
						sort = b.stock - a.stock;
						break;
					case "updated":
						sort = parseFloat(a.updated_at.replace(/-/g, "")) - parseFloat(b.updated_at.replace(/-/g, ""));
						break;
					case "updatedX":
						sort = parseFloat(b.updated_at.replace(/-/g, "")) - parseFloat(a.updated_at.replace(/-/g, ""));
						break;
					case "created":
						sort = parseFloat(a.created_at.replace(/-/g, "")) - parseFloat(b.created_at.replace(/-/g, ""));
						break;
					case "createdX":
						sort = parseFloat(b.created_at.replace(/-/g, "")) - parseFloat(a.created_at.replace(/-/g, ""));
						break;
					default:
						break;
				}

				console.log(sort);
				return sort;
			}),
		});
	}

	// showCart() {
	// 	document.getElementById("cart").classList.toggle("show");
	// }
	hideCart() {
		document.getElementById("cart").classList.remove("show");
	}

	componentDidMount() {
		this.setState({
			productList: this.props.product.productList,
		});

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
	}
	componentDidUpdate() {
		// this.getProduct();
		this.containerSize();
	}

	render() {
		const products = [];
		if (this.state.productList.length > 0) {
			this.state.productList.map((data, x) => {
				if (x >= 0 + (9 * this.state.currentPage - 9) && x < 9 * this.state.currentPage) {
					products.push(<MainCard key={x} product={data} productId={data.id} />);
				}
			});
		}
		const page = [];
		for (let x = 1; x <= Math.ceil(this.state.productList.length / 8); x++) {
			page.push(
				<span
					onClick={() => {
						this.changePage(x);
					}}
				>
					{x}
				</span>,
			);
		}
		return (
			<div id="main">
				<Header eventSearch={this.filterName} eventType={this.filterType} eventSort={this.filterSort} cartIcon={true} />
				<div className="flex-con" id="main-card-con">
					{products}
					<div className="pagination">
						<span
							onClick={() => {
								if (this.state.currentPage > 1) {
									this.setState({
										currentPage: this.state.currentPage - 1,
									});
								}
							}}
						>
							{" "}
							&lt;{" "}
						</span>
						{page}
						<span
							onClick={() => {
								if (this.state.currentPage < Math.ceil(this.state.productList.length / 8)) {
									this.setState({
										currentPage: this.state.currentPage + 1,
									});
								}
							}}
						>
							{" "}
							&gt;{" "}
						</span>
					</div>
				</div>
				<Cart list={this.state.cart} show={this.state.show} />
				<Modal refresh={this.getProduct} product={this.state.modal} show={this.state.show} />
				<div id="blackLayer"></div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
		product: state.product,
	};
};

export default connect(mapStateToProps)(Main);
