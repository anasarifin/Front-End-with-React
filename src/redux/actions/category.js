import Axios from "axios";

export const category = () => {
	return {
		type: "GET_CATEGORY",
		payload: Axios.get("http://100.24.32.116:8888/api/v1/category"),
	};
};
