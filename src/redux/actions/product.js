import Axios from "axios";

export const product = () => {
	return {
		type: "GET_PRODUCT",
		payload: Axios.get("http://3.82.66.63:2200/api/v1/products"),
	};
};
