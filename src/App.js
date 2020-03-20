import React, { Component } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import History from "./components/History";
import Axios from "axios";
import { connect } from "react-redux";
import { product } from "./redux/actions/product";

const url = "http://100.24.32.116:9999/api/v1/cart";

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: <Main />,
		};
		this.changePage = this.changePage.bind(this);
		this.changeMain = this.changeMain.bind(this);
		this.changeHistory = this.changeHistory.bind(this);
	}

	resetCart() {
		Axios.delete(url, { data: { id: "all" } }).then(resolve => {});
	}

	componentDidMount = () => {
		if (!localStorage.getItem("token")) {
			window.location.href = "/login";
		}
		this.props.dispatch(product());
		this.resetCart();
	};

	componentDidUpdate = (prevProps, prevState) => {
		// console.log("props", prevProps);
		// console.log("state", prevState);
	};

	goToHome() {
		this.props.history.push("/profile");
		console.log(this.props.history);
	}

	changePage(event) {
		console.log(event.currentTarget.dataset.page);
		this.setState({
			currentPage: event.currentTarget.dataset.page,
		});
	}
	changeMain() {
		this.setState({
			currentPage: <Main />,
		});
	}
	// changeEdit() {
	// 	this.setState({
	// 		currentPage: <Edit />,
	// 	});
	// }
	changeHistory() {
		this.setState({
			currentPage: <History />,
		});
	}

	render() {
		return (
			<div id="main-con">
				<Navbar event={[this.changeMain, this.changeHistory]} />
				{this.props.product.productList ? this.state.currentPage : <div>Loading</div>}
				<Modal />
				<div id="blackLayer"></div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		product: state.product,
	};
};

export default connect(mapStateToProps)(App);
