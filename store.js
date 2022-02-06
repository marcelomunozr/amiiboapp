import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import products from './src/screens/products/reducers/products';
import shoppingCart from './src/screens/shoppingCart/reducers/shoppingCart';

export default configureStore({
	reducer: {products, shoppingCart},
	middleware: [thunk],
});
