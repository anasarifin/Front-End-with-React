import React from "react";

export default class HistoryList extends React.Component {
	render() {
		const list = [];
		if (this.props.data.length > 0) {
			this.props.data.map((data, x) => {
				list.push(
					<ul className="table">
						<div className="invoice">Invoice</div>
						<div className="cashier">{data.username}</div>
						<div className="product">{data.name}</div>
						<div className="quantity">{data.quantity}</div>
						<div className="price">{data.price}</div>
						<div className="totalPrice">{data.price * data.quantity}</div>
						<div className="purchased">{data.purchased_date}</div>
					</ul>,
				);
			});
		}
		return (
			<div id="history-list">
				<div className="topTable">
					<div className="invoice">Invoice</div>
					<div className="cashier">Cashier</div>
					<div className="product">Product</div>
					<div className="quantity">Quantity</div>
					<div className="price">Price</div>
					<div className="totalPrice">Total Price</div>
					<div className="purchased">Purchased at</div>
				</div>
				{list}
			</div>
		);
	}
}
