import React from "react";

export default class MainCard extends React.Component {
	constructor() {
		super();
		this.state = {
			data: "",
		};
	}

	componentDidMount() {
		this.setState({
			data: this.props.product,
		});
	}

	render() {
		return <div onClick={this.props.event}>{this.props.product.name}</div>;
	}
}
