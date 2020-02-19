import React, { Component } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import History from "./components/History";
import Axios from "axios";
// import { Link } from "react-router-dom";
// import logo from "./logo.svg";
// prop-types
// import "./App.css";

// export const contextApp = React.createContext({
// 	number: 1,
// });

const url = "http://localhost:9999/api/v1/cart";

class Example extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: <Main />,
		};
		this.changePage = this.changePage.bind(this);
		this.changeMain = this.changeMain.bind(this);
		// this.changeEdit = this.changeEdit.bind(this);
		this.changeHistory = this.changeHistory.bind(this);
	}
	static defaultProps = {
		batch: 1,
		city: "Jakarta",
	};

	resetCart() {
		Axios.delete(url, { data: { id: "all" } }).then(resolve => {});
	}

	componentDidMount = () => {
		if (!localStorage.getItem("token")) {
			window.location.href = "/login";
		}
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
				{this.state.currentPage}
			</div>
		);
	}
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// Example.defaultProps = {
// 	batch: 1,
// 	city: "Jakarta",
// };
{
	/* <button onClick={this.goToHome}>Profile</button> */
}

export default Example;
