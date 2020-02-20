import React from "react";
import PropTypes from "prop-types";

// const url = "http://localhost:9999/api/v1/history";

export default class HistoryList extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
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
	// getData() {
	// 	Axios.get(url).then(resolve => {
	// 		this.setState({
	// 			data: resolve.data.sold_item_list,
	// 		});
	// 	});
	// }

	render() {
		return (
			<ul className="table">
				<li className="invoices">{this.props.paymentData.purchased_date.slice(0, 19).replace(/[-T:]/g, "")}</li>
				<li className="cashier">{this.props.paymentData.username}</li>
				<li className="product">{this.props.paymentData.name}</li>
				<li className="totalPrice">Rp. {this.toRupiah(this.props.paymentData.price * this.props.paymentData.quantity)}</li>
				<li className="purchased">{this.props.paymentData.purchased_date.slice(0, 19).replace("T", " ")}</li>
			</ul>
		);
	}
}

HistoryList.propTypes = {
	product: PropTypes,
	paymentData: PropTypes,
};
