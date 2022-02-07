import {
	Platform,
} from 'react-native';
import {setCart} from '../../screens/shoppingCart/actions/shoppingCart';

// utils const

const isAndroid = Platform.OS === 'android';
const colors = {
    primary: '#3fae7f',
    secondary: '#ba151a',
    black: '#000000',
    white: '#ffffff',
    red: '#ef4444',
    gray: '#d6d3d1',
};


// utils methods

const addToCart = (shoppingCart, tail, dispatch) => () => {
    try {
        const arrToCart = [...shoppingCart, tail];
        dispatch(setCart(arrToCart));
    } catch (error) {
        console.log(error);
    }
};
const removeToCart = (shoppingCart, tail, dispatch) => () => {
    const itemsOfProduct = shoppingCart.filter((item) => item === tail);
    const otherItems = shoppingCart.filter((item) => item !== tail);
    itemsOfProduct.splice(-1);
    try {
        const arrToCart = [...otherItems, ...itemsOfProduct];
        dispatch(setCart(arrToCart));
    } catch (error) {
        console.log(error);
    }
};

export {
    isAndroid,
    colors,

    addToCart,
    removeToCart,
};