const initialValue = {
	categoryList: [],
	isPending: false,
	isRejected: false,
	isFulfilled: false,
};

const getCategory = (state = initialValue, action) => {
	switch (action.type) {
		case "GET_CATEGORY_PENDING":
			return {
				...state,
				isPending: true,
			};
		case "GET_CATEGORY_REJECTED":
			return {
				...state,
				isRejected: true,
			};
		case "GET_CATEGORY_FULFILLED":
			return {
				...state,
				isFulfilled: true,
				categoryList: action.payload.data,
			};
		default:
			return state;
	}
};

export default getCategory;
