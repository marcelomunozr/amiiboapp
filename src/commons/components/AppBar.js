import React, {memo, useEffect, useState} from 'react';
import { TouchableOpacity, Easing } from 'react-native';
import { connect, useSelector } from 'react-redux';
import {
	HStack,
	Badge,
	Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/utils';

const AppBar = ({
	title,
	withSearch,
	animate,
}) => {
	const navigation = useNavigation();
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const [shoppingCartItems, setShoppingCartItems] = useState(
		shoppingCart.length,
	);

	useEffect(() => {
		setShoppingCartItems(shoppingCart.length);
	}, [shoppingCart]);

	const renderLeft = () => withSearch ? (
		null
		// <TouchableOpacity activeOpacity={0.8} onPress={() => animate(Easing.bounce)}>
		// 	<MaterialCommunityIcons name="magnify" size={28} color="white" />
		// </TouchableOpacity>
		) : (
		<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
			<MaterialCommunityIcons name="chevron-left" size={28} color="white" />	
		</TouchableOpacity>
	);

	const renderNotifications = () => shoppingCartItems > 0 && (
		<Badge
			bg="red.400"
			colorScheme="danger"
			rounded="full"
			zIndex={1}
			variant="solid"
			alignSelf="flex-end"
			top={-16}
			_text={{
				fontSize: 12
			}}
			style={{ position: 'absolute' }}
		>
			{shoppingCartItems?.toString()}
		</Badge>
	);

	const renderRight = () => {
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Carrito')}>
				{renderNotifications()}
				<MaterialCommunityIcons
					name="cart-outline"
					size={28}
					color={colors.white}
					style={{marginRight: 16 }}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<>
			<HStack
				bg={colors.primary}
				p={4}
				justifyContent="space-between"
				alignItems="center">
				<HStack space={4} alignItems="center">
					{renderLeft()}
					<Text color="white" fontSize={20} fontWeight="bold">
						{title}
					</Text>
				</HStack>
				<HStack space={4}>
					{renderRight()}
				</HStack>
			</HStack>
		</>
	);
};

export default connect()(memo(AppBar));
