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
		return (
			<div className="product" onClick={this.props.event} data-name={this.props.product.name}>
				<img src={this.props.product.image}></img>
				<span className="name">{this.props.product.name}</span>
				<span className="desc">{this.props.product.description}</span>
				<span className="stock">Stock: {this.props.product.stock}</span>
				<span className="price">{this.props.product.price}</span>
			</div>
		);
	}
}
