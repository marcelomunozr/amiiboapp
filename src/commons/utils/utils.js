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
        const arrToCart = [...shoppingCart];
        const exist = arrToCart.find(prod => tail === prod.tail);
        if (exist) {
            exist.quantity ++;
        } else {
            arrToCart.push({
                tail,
                quantity: 1,
            })
        }
        dispatch(setCart(arrToCart));
    } catch (error) {
        console.log(error);
    }
};

const removeToCart = (shoppingCart, tail, dispatch) => () => {
    try {
        let arrToCart = [...shoppingCart];
        const exist = arrToCart.find(prod => tail === prod.tail);
        if (exist) {
            if (exist.quantity === 1) {
                arrToCart = shoppingCart.filter(prod => tail !== prod.tail );
            } else {
                exist.quantity--;
            }
        }
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