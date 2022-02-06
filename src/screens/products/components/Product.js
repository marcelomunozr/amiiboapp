import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Col, Image, Text, Box, Stack, Heading} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const Product = ({data}) => {
	const postionProd = data.index + 1;
	const esPar = postionProd%2 === 0;
	const navigation = useNavigation();

	const {image, name, character, gameSeries, price} = data.item;
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
				alt="image base"
				resizeMode="cover"
				roundedTop="md"
				style={{height: 220, width: 'auto'}}
				mb={4}
			/>
				<Text
					color="gray.500"
					mb={2}>{`${character} - ${gameSeries}`}</Text>
				<Heading size={['md']}>
					${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
				</Heading>
			</Box>
		</TouchableOpacity>
	);
};

export default Product;
