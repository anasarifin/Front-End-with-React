import Axios from "axios";

export const product = () => {
	return {
		type: "GET_PRODUCT",
		payload: Axios.get("http://100.24.32.116:8888/api/v1/products"),
	};
};
