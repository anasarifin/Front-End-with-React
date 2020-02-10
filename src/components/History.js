import React from "react";
import Statistic from "./Statistic";
import HistoryList from "./HistoryList";
import Axios from "axios";
import "../style/History.css";

const url = "http://localhost:9999/api/v1/history";

export default class History extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
	}

	getData() {
		Axios.get(url).then(resolve => {
			this.setState({
				data: resolve.data,
			});
		});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const history = [];
		if (this.state.data) {
			this.state.data.sold_item_list.map((data, x) => {
				history.push(<HistoryList key={x} paymentData={data} />);
			});
		}

		return (
			<div id="history">
				<Statistic data={this.state.data} />
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
					{history}
				</div>
			</div>
		);
	}
}
