import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCart, colors, removeToCart } from '../utils/utils';

const ControlsItem = ({
    shoppingCart,
    tail,
    dispatch,
    contentStyle,
    buttonSize,
}) => {
	const [quantityInCart, setQuantityInCart] = useState(0);

    const quantityOfProduct = () => {
        if (shoppingCart.length) {
            const quantityOfThisProduct = shoppingCart.filter(product => product === tail);
            setQuantityInCart(quantityOfThisProduct.length)
        } else {
            setQuantityInCart(0)
        }
    };

    useEffect(() => {
        quantityOfProduct();
    }, [shoppingCart]);

    return (
        <View
            mt={2}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...contentStyle,
            }}
        >
            <TouchableOpacity activeOpacity={0.8} onPress={addToCart(shoppingCart, tail, dispatch)}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    size={buttonSize || 40}
                    color={colors.primary}
                />
            </TouchableOpacity>
            <Text
                ml={2}
                mr={2}
                textAlign="center"
                fontSize={18}
                bold
                flexGrow={1}
            >
                {quantityInCart}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={removeToCart(shoppingCart, tail, dispatch)}>
                <MaterialCommunityIcons
                    name="minus-circle"
                    size={buttonSize || 40}
                    color={quantityInCart > 0 ? colors.red : colors.gray}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ControlsItem;
