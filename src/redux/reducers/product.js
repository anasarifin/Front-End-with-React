const initialValue = {
	productList: [],
	isPending: false,
	isRejected: false,
	isFulfilled: false,
};

const getProduct = (state = initialValue, action) => {
	switch (action.type) {
		case "GET_PRODUCT_PENDING":
			return {
				...state,
				isPending: true,
			};
		case "GET_PRODUCT_REJECTED":
			return {
				...state,
				isRejected: true,
			};
		case "GET_PRODUCT_FULFILLED":
			return {
				...state,
				isFulfilled: true,
				productList: action.payload.data,
			};
		default:
			return state;
	}
};

export default getProduct;
