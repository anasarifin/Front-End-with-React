const initialValue = {
	number: 0,
	isPending: false,
	isRejected: false,
	isFulfilled: false,
};

const countReducer = (state = initialValue, action) => {
	// if (action.type === "COUNT_ADD") {
	// 	return {
	//         ...state,
	//         number: state.number += action.payLoad;
	//     }
	// }
	switch (action.type) {
		case "COUNT_ADD":
			return {
				...state,
				number: state.number + action.payload,
			};
		case "COUNT_REDUCE":
			return {
				...state,
				number: state.number - action.payload,
			};
		default:
			return state;
	}
};

export default countReducer;

//pending
//rejected
//fulfilled
