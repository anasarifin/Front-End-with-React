import Axios from "axios";

export const category = () => {
	return {
		type: "GET_CATEGORY",
		payload: Axios.get("http://3.82.66.63:2200/api/v1/category"),
	};
};
