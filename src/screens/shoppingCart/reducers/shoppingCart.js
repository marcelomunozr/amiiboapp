import {combineReducers} from 'redux';
import {SET_CART} from '../actions/types';

const cartReducers = (state = [], action) => {
	switch (action.type) {
		case SET_CART:
			return action.cart;
		default:
			return state;
	}
};

export default combineReducers({
	shoppingCart: cartReducers,
});
