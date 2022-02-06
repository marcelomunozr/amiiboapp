import {combineReducers} from 'redux';
import {
	SET_PRODUCTS,
	SET_IS_LOADING_PRODUCTS,
	SET_ERROR_PRODUCTS,
	CLEAR_ERROR_PRODUCTS,
	CLEAR_ALL_PRODUCTS,
} from '../actions/types';

const productsReducers = (state = null, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		case CLEAR_ERROR_PRODUCTS:
			return null;
		case CLEAR_ALL_PRODUCTS:
			return null;
		default:
			return state;
	}
};

const isLoadingProductsReducers = (state = true, action) => {
	switch (action.type) {
		case SET_IS_LOADING_PRODUCTS:
			return action.isLoadingProducts;
		case CLEAR_ALL_PRODUCTS:
			return true;
		default:
			return state;
	}
};

const errorProductsReducers = (state = false, action) => {
	switch (action.type) {
		case SET_ERROR_PRODUCTS:
			return action.errorProducts;
		case CLEAR_ERROR_PRODUCTS:
			return false;
		case CLEAR_ALL_PRODUCTS:
			return false;
		default:
			return state;
	}
};

export default combineReducers({
	products: productsReducers,
	isLoadingProducts: isLoadingProductsReducers,
	errorProducts: errorProductsReducers,
});
