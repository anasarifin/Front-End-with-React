import Axios from "axios";

export const product = () => {
	return {
		type: "GET_PRODUCT",
		payload: Axios.get("http://18.212.147.11:2200/api/v1/products"),
	};
};
