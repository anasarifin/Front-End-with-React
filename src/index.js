import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Modal from "./components/Modal";
import AddProduct from "./components/AddProduct";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class AppWithRouter extends React.Component {
	render() {
		return (
			<Router>
				<Route path="/" exact component={App} />
				<Route path="/profile" component={Profile} />
				<Route path="/login" component={Login} />
				<Route path="/add" component={AddProduct} />
			</Router>
		);
	}
}

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
