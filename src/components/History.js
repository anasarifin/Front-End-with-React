import React from "react";
import Statistic from "./Statistic";
import HistoryList from "./HistoryList";
import Axios from "axios";

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
		return (
			<div>
				<Statistic data={this.state.data} />
				<HistoryList data={this.state.data.sold_item_list} />
			</div>
		);
	}
}
