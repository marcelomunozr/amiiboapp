import React, { memo } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
	Image,
	Text,
	Box,
	Heading,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import ControlsItem from '../../../commons/components/ControlsItem';

moment.locale('es');

const Product = ({data}) => {
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch();
	const postionProd = data.index + 1;
	const esPar = postionProd%2 === 0;
	const navigation = useNavigation();

	const {
		image,
		name,
		character,
		gameSeries,
		price,
		tail,
	} = data.item;

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Detalle Producto', {
					item: data.item,
				})
			}
			style={{
				maxWidth: (Dimensions.get('window').width / 2) - 32,
				marginLeft: esPar ? 32 : 0,
			}}
		>
			<Box
				bg="white"
				shadow={4}
				rounded="xl"
				maxWidth="100%"
				minWidth="100%"
				mb={6}
				key={data.index}
				padding={4}>
				<Image
					source={{
						uri: image,
					}}
					alt={name}
					resizeMode="cover"
					roundedTop="md"
					style={{height: 160, width: 'auto'}}
					mb={4}
				/>
				<Heading size={['md']} mb={2}>
					${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
				</Heading>
				<Text
					color="gray.500"
					mb={2}
				>
					{`${character} - ${gameSeries}`}
				</Text>
				<ControlsItem
					shoppingCart={shoppingCart}
					tail={tail}
					dispatch={dispatch}
				/>
			</Box>
		</TouchableOpacity>
	);
};

export default connect()(memo(Product));
