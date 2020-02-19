import React from "react";
import Statistic from "./Statistic";
import HistoryList from "./HistoryList";
import Axios from "axios";
import "../style/History.css";
import menu from "../img/menu.png";

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
				<div id="header-history">
					<div>
						<img src={menu} alt="menu" onClick={this.showMenu} />
					</div>
					<span>History</span>
				</div>
				<Statistic data={this.state.data} />
				<div id="history-list">
					<div className="topTable">
						<div className="invoices">Invoices</div>
						<div className="cashier">Cashier</div>
						<div className="orders">Orders</div>
						<div className="amount">Amount</div>
						<div className="date">Date</div>
					</div>
					{history}
				</div>
				<div id="main-card-con" />
			</div>
		);
	}
}
