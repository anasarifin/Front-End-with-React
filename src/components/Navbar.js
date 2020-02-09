import React from "react";

export default class Navbar extends React.Component {
	render() {
		return (
			<div>
				<img alt="Home" value="<Main />" onClick={this.props.event} />
				<img alt="Edit" value="<Edit />" onClick={this.props.event} />
				<img alt="History" value="<History />" onClick={this.props.event} />
			</div>
		);
	}
}
