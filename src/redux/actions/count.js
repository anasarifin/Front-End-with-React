export const add = num => {
	return {
		type: "COUNT_ADD", //string yg mendeskripsikan perintah
		payload: num, // variable yg dibawa ke reducer
	};
};

export const reduce = num => {
	return {
		type: "COUNT_REDUCE", //string yg mendeskripsikan perintah
		payload: num, // variable yg dibawa ke reducer
	};
};
