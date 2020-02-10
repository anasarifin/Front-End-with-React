import React from "react";
import Axios from "axios";

const url = "http://localhost:9999/api/v1/history";

export default class HistoryList extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
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
				<li className="invoice">Invoice</li>
				<li className="cashier">{this.props.paymentData.username}</li>
				<li className="product">{this.props.paymentData.name}</li>
				<li className="quantity">{this.props.paymentData.quantity}</li>
				<li className="price">{this.props.paymentData.price}</li>
				<li className="totalPrice">{this.props.paymentData.price * this.props.paymentData.quantity}</li>
				<li className="purchased">{this.props.paymentData.purchased_date}</li>
			</ul>
		);
	}
}
