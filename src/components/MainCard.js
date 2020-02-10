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
<<<<<<< HEAD
		return (
			<div className="product" onClick={this.props.event} data-name={this.props.product.name}>
				<img src={this.props.product.image}></img>
				<span className="name">{this.props.product.name}</span>
				<span className="desc">{this.props.product.description}</span>
				<span className="stock">Stock: {this.props.product.stock}</span>
				<span className="price">{this.props.product.price}</span>
			</div>
		);
=======
		return <div onClick={this.props.event}>{this.props.product.name}</div>;
>>>>>>> 58b2e33f0bf80389da02a53491546ba81500e7d5
	}
}
