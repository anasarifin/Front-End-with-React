import React, { Component } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
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
			date: "This is state",
		};
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

	goToHome = () => {
		this.props.history.push("/profile");
		console.log(this.props.history);
	};

	render() {
		return (
			<div className="main">
				<br />
				<br />
				<div>Hello world!</div>
				<div>{this.state.date}</div>
				<div>
					{this.props.batch} - {this.props.city}
				</div>
				<br />
				<br />
				<button onClick={this.goToHome}>Profile</button>
				<br />
				<br />
				<br />
				<Main />
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

export default Example;
