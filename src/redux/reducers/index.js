import { combineReducers } from "redux";
import getProduct from "./product";
import moveToCart from "./cart";
import getCategory from "./category";

const reducers = combineReducers({
	product: getProduct,
	cart: moveToCart,
	category: getCategory,
});

export default reducers;
