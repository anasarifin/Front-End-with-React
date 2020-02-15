export const add = object => {
	return {
		type: "CART_ADD", //string yg mendeskripsikan perintah
		payload: object, // variable yg dibawa ke reducer
	};
};
