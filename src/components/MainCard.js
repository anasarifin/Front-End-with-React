import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { add, addPrice } from "../redux/actions/cart";
import edit from "../img/edit.png";
import checklist from "../img/checklist.png";

const imgUrl = "http://3.82.66.63:2200/public/img/";

class MainCard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
		this.addToCart = this.addToCart.bind(this);
		this.fillModal = this.fillModal.bind(this);
	}

	toRupiah(number) {
		let number_string = number.toString();
		let leftover = number_string.length % 3;
		let rupiah = number_string.substr(0, leftover);
		let thousand = number_string.substr(leftover).match(/\d{3}/g);
		if (thousand) {
			let separator = leftover ? "." : "";
			rupiah += separator + thousand.join(".");
		}
		return rupiah;
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
			id: this.props.product.id,
		});
	}

	checkClicked() {
		this.props.cart.cartList.some((x) => x.id === this.props.product.id);
	}

	addToCart(e) {
		if (this.props.product.stock > 0) {
			if (e.target.parentElement.querySelector("div").className != "show" && e.target.className != "edit") {
				e.target.parentElement.querySelector("div").classList.add("show");
				this.props.dispatch(add(this.props.product));
				this.props.dispatch(addPrice(this.props.product.price));
				// Axios.patch(url, { id: id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
				// 	console.log(resolve);
				// });
			}
		} else {
			alert("Out of stock!");
		}
	}

	fillModal() {
		document.getElementById("xName").value = this.props.product.name;
		document.getElementById("xStock").value = this.props.product.stock;
		document.getElementById("xPrice").value = this.props.product.price;
		document.getElementById("xCategory").value = this.props.product.category_id;
		document.getElementById("xDesc").value = this.props.product.description;
		document.getElementById("xHidden").value = this.props.product.id;
		document.getElementById("modal").classList.add("show");
		document.getElementById("blackLayer").classList.add("show");
	}

	render() {
		console.log(imgUrl + this.props.product.image);
		let clicked = <div>clicked</div>;
		if (this.props.cart.cartList.some((x) => x.id === this.props.product.id)) {
			clicked = (
				<div className="show">
					<img alt="clicked" src={checklist} className="clicked" />
				</div>
			);
		}
		return (
			<div className="flex" onClick={this.addToCart}>
				<span>
					<img src={imgUrl + this.props.product.image} alt={this.props.product.name} />
				</span>
				{clicked}
				<span>{this.props.product.name}</span>
				<span>Rp. {this.toRupiah(this.props.product.price)}</span>
				{/* <span>Stock: {this.props.product.stock}</span> */}
				<img alt="edit" src={edit} className="edit" onClick={this.fillModal} />
			</div>
		);
	}
}

MainCard.propTypes = {
	product: PropTypes,
	cart: PropTypes,
	dispatch: PropTypes,
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(MainCard);

{
	/* <div className="product" onClick={this.addToCart}>
	<img src={this.props.product.image}></img>
	<span className="name">{this.props.product.name}</span>
	<span className="desc">{this.props.product.description}</span>
	<span className="stock">Stock: {this.props.product.stock}</span>
	<span className="price">{this.props.product.price}</span>
</div>; */
}
