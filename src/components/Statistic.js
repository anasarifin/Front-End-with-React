import React from "react";
import PropTypes from "prop-types";

export default class Statistic extends React.Component {
	constructor() {
		super();
		this.state = {};
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

	render() {
		const totalIncome = parseFloat(this.props.data.total_income);
		return (
			<div id="statistic">
				<div>{this.props.data.total_transaction_count}</div>
				<div>Product Sold: {this.props.data.total_item_sold}</div>
				<div>Rp. {this.toRupiah(totalIncome)}</div>
			</div>
		);
	}
}

Statistic.propTypes = {
	data: PropTypes,
};
