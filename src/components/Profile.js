import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { add, reduce } from "../redux/actions/count";

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			number: 0,
		};
		this.changeNumber = this.changeNumber.bind(this);
		this.addNumber = this.addNumber.bind(this);
	}
	changeNumber(e) {
		let number = parseFloat(e.target.value) || 0;
		this.setState({
			number: number,
		});
	}
	addNumber() {
		this.props.dispatch(add(this.state.number));
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		const { count } = this.props;
		return (
			<div>
				<h1>{count.number}</h1>
				<input type="number" onChange={this.changeNumber}></input>
				<button onClick={this.reduceNumber}>Reduce</button>
				<button onClick={this.addNumber}>Add</button>
				<Link to="/">
					<h4>Home</h4>
				</Link>
			</div>
		);
	}
}

// mapstate to props
// mapdispatch to props

const mapStateToProps = state => {
	return {
		count: state.count,
	};
};

export default connect(mapStateToProps)(Profile);

// export default Header;

// , {
//     headers: {
//         username: ""
//     },
//     body: {
//         token: ""
//     }
