import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "../style/Header.css";
import { connect } from "react-redux";

const urlCat = "http://localhost:9999/api/v1/category";

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			category: [],
		};
	}

	getCategory() {
		Axios.get(urlCat).then(resolve => {
			this.setState({
				category: resolve.data,
			});
		});
	}

	showValue(event) {
		document.getElementById("bb1").innerHTML = event.target.value;
	}

	showMenu() {
		document.getElementById("navbar").classList.toggle("show");
	}

	showCart() {
		document.getElementById("cart").classList.toggle("show");
	}

	componentDidMount() {
		this.getCategory();
	}

	render() {
		console.log(this.state.category);
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
				<img src="http://localhost:9999/public/img/menu.png" alt="menu" onClick={this.showMenu} />
				<label>Filter by : </label>
				<select onChange={this.props.eventType}>
					<option value="all">All</option>
					{categoryList}
				</select>
				<label>Sort by : </label>
				<select onChange={this.props.eventSort}>
					<option value="name">Name</option>
					<option value="stock">Stock</option>
					<option value="price">Price</option>
					<option value="updated_at">Update at</option>
					<option value="created_at">Create at</option>
					<option value="name&dir=1">Name DESC</option>
					<option value="stock&dir=1">Stock DESC</option>
					<option value="price&dir=1">Price DESC</option>
					<option value="updated_at&dir=1">Update at DESC</option>
					<option value="created_at&dir=1">Create at DESC</option>
				</select>
				<input type="text" id="header-search" onChange={this.props.eventSearch} placeholder="Search product here..." />
				<div id="cart-logo">
					<span onClick={this.showCart}>Cart {this.props.cart.cartList.length}</span>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	eventSearch: PropTypes,
	eventType: PropTypes,
	eventSort: PropTypes,
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Header);
