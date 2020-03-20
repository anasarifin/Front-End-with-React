import React from "react";
import PropTypes from "prop-types";
import "../style/Header.css";
import { connect } from "react-redux";
import { category } from "../redux/actions/category";
import menu from "../img/menu.png";

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			category: [],
		};
	}

	async getCategory() {
		// Axios.get(urlCat).then(resolve => {
		// 	this.setState({
		// 		category: resolve.data,
		// 	});
		// });
		await this.props.dispatch(category());
		this.setState({
			category: this.props.category.categoryList,
		});
	}

	showValue(event) {
		document.getElementById("bb1").innerHTML = event.target.value;
	}

	showSearch() {
		document.getElementById("header-sub").classList.toggle("show");
	}

	showCart() {
		document.getElementById("cart").classList.toggle("show");
	}

	componentDidMount() {
		this.getCategory();
	}

	render() {
		const categoryList = [];
		if (this.state.category.length > 0) {
			this.state.category.map((data, x) => {
				categoryList.push(
					<option key={x} value={data.id}>
						{data.name}
					</option>,
				);
			});
		}

		return (
			<div id="header">
				<div>
					<img src={menu} alt="menu" />
				</div>
				<div id="header-small" onClick={this.showSearch}>
					Search
				</div>
				<div id="header-sub">
					<label>Filter</label>
					<select onChange={this.props.eventType}>
						<option value="all">All</option>
						{categoryList}
					</select>
					<label>Sort</label>
					<select onChange={this.props.eventSort}>
						<option value="name">Name A-Z</option>
						<option value="nameX">Name Z-A</option>
						<option value="stockX">Stock +</option>
						<option value="stock">Stock -</option>
						<option value="priceX">Price +</option>
						<option value="price">Price -</option>
						<option value="updatedX">Updated New</option>
						<option value="updated">Updated Old</option>
						<option value="createdX">Created New</option>
						<option value="created">Created Old</option>
					</select>
					<input type="text" id="header-search" onChange={this.props.eventSearch} placeholder="Search product here..." />
				</div>
				{this.props.cartIcon ? (
					<div id="cart-logo">
						<span onClick={this.showCart}>
							Cart <span>{this.props.cart.cartList.length}</span>
						</span>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

Header.propTypes = {
	eventSearch: PropTypes,
	eventType: PropTypes,
	eventSort: PropTypes,
	category: PropTypes,
	dispatch: PropTypes,
	cart: PropTypes,
	cartIcon: PropTypes,
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
		category: state.category,
	};
};

export default connect(mapStateToProps)(Header);
