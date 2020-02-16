import { combineReducers } from "redux";
import countReducer from "./count";
import moveToCart from "./cart";

const reducers = combineReducers({
	count: countReducer,
	cart: moveToCart,
});

export default reducers;
