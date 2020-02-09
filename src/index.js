import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Profile from "./components/Profile";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

class AppWithRouter extends React.Component {
	render() {
		return (
			<Router>
				<Route path="/" exact component={App} />
				<Route path="/profile" component={Profile} />
			</Router>
		);
	}
}

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
