import {
	Platform,
} from 'react-native';

const isAndroid = Platform.OS === 'android';
const colors = {
    primary: '#3fae7f',
    secondary: '#ba151a',
    black: '#000000',
    white: '#ffffff',
};

export {
    isAndroid,
    colors,
};