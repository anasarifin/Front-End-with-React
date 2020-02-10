import React, { Component } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
<<<<<<< HEAD
=======

>>>>>>> 15fcef24a2252c0e84a5af3e258c065498ca9e83
// import { Link } from "react-router-dom";
// import logo from "./logo.svg";
// prop-types
import "./App.css";

// export const contextApp = React.createContext({
// 	number: 1,
// });

class Example extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: <Main />,
		};
		this.changePage = this.changePage.bind(this);
		this.changeMain = this.changeMain.bind(this);
		this.changeEdit = this.changeEdit.bind(this);
		this.changeHistory = this.changeHistory.bind(this);
	}
	static defaultProps = {
		batch: 1,
		city: "Jakarta",
	};

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({
				date: "This state has been changed",
			});
		}, 2000);
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
		this.setState({
			currentPage: event.currentTarget.dataset.page,
		});
	}
	changeMain() {
		this.setState({
			currentPage: <Main />,
		});
	}
	changeEdit() {
		this.setState({
			currentPage: <Edit />,
		});
	}
	changeHistory() {
		this.setState({
			currentPage: <Edit />,
		});
	}

	render() {
		return (
			<div id="main-con">
				<Navbar event={[this.changeMain, this.changeEdit, this.changeHistory]} />
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