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
				<div className="income">
					<div className="stat-con">
						<span>Transaction</span>
						<span>{this.props.data.total_transaction_count}</span>
					</div>
				</div>
				<div className="orders">
					<div className="stat-con">
						<span>Orders</span>
						<span>{this.props.data.total_item_sold}</span>
					</div>
				</div>
				<div className="income-year">
					<div className="stat-con">
						<span>Income</span>
						<span>Rp. {this.toRupiah(totalIncome)}</span>
					</div>
				</div>
			</div>
		);
	}
}

Statistic.propTypes = {
	data: PropTypes,
};
