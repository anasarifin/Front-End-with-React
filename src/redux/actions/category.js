import Axios from "axios";

export const category = () => {
	return {
		type: "GET_CATEGORY",
		payload: Axios.get("http://localhost:9999/api/v1/category"),
	};
};
