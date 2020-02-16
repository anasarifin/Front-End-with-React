export const add = object => {
	return {
		type: "CART_ADD", //string yg mendeskripsikan perintah
		payload: object, // variable yg dibawa ke reducer
	};
};
export const reset = () => {
	return {
		type: "CART_RESET", //string yg mendeskripsikan perintah
		payload: [], // variable yg dibawa ke reducer
	};
};
