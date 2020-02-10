import React from "react";
import "../style/Statistic.css";

export default class Statistic extends React.Component {
	render() {
		return (
			<div id="statistic">
				<div>Transaction Count: {this.props.data.total_transaction_count}</div>
				<div>Product Sold: {this.props.data.total_item_sold}</div>
				<div>Total Income: {this.props.data.total_income}</div>
			</div>
		);
	}
}
