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
		case "COUNT_ADD_PENDING":
			return {
				...state,
				isPending: true,
			};
		case "COUNT_ADD_REJECTED":
			return {
				...state,
				isRejected: true,
			};
		case "COUNT_ADD":
			return {
				...state,
				number: state.number + action.payload,
			};
		case "COUNT_REDUCE":
			return {
				...state,
				isFulfilled: true,
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
