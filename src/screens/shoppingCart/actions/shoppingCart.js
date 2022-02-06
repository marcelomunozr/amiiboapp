import {SET_CART} from './types';

const setCart = (cart) => ({
	type: SET_CART,
	cart,
});

export {setCart};
