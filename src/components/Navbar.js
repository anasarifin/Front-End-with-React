import React from "react";
<<<<<<< HEAD
import Main from "./Main";
import Edit from "./Edit";
import "../style/Navbar.css";
=======
>>>>>>> 58b2e33f0bf80389da02a53491546ba81500e7d5

export default class Navbar extends React.Component {
	render() {
		return (
<<<<<<< HEAD
			<div id="navbar">
				<img alt="Home" data-page={<Main />} onClick={this.props.event[0]} />
				<img alt="Edit" data-page={<Edit />} onClick={this.props.event[1]} />
				<img alt="History" data-page={<Edit />} onClick={this.props.event[2]} />
=======
			<div>
				<img alt="Home" value="<Main />" onClick={this.props.event} />
				<img alt="Edit" value="<Edit />" onClick={this.props.event} />
				<img alt="History" value="<History />" onClick={this.props.event} />
>>>>>>> 58b2e33f0bf80389da02a53491546ba81500e7d5
			</div>
		);
	}
}
