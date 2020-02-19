import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import "./fonts/OpenSans-Regular.ttf";

class AppWithRouter extends React.Component {
	render() {
		return (
			<Router>
				<Route path="/" exact component={App} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/profile" component={Profile} />
				<Route path="/checkout" component={Checkout} />
			</Router>
		);
	}
}

const AppWithRedux = () => {
	return (
		<Provider store={store}>
			<AppWithRouter />
		</Provider>
	);
};

ReactDOM.render(<AppWithRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
