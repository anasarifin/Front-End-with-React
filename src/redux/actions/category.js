import Axios from "axios";

export const category = () => {
	return {
		type: "GET_CATEGORY",
		payload: Axios.get("http://18.212.147.11:2200/api/v1/category"),
	};
};
