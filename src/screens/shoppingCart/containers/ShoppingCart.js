import React, {memo, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {SafeAreaView, View, useColorScheme, FlatList} from 'react-native';
import {Container, StatusBar, Text, Image} from 'native-base';
import AppBar from '../../../commons/components/AppBar';
import { colors } from '../../../commons/utils/utils';

const ShoppingCart = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const {products} = useSelector((state) => state.products);
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const isDarkMode = useColorScheme() === 'dark';
	let total = 0;
	/**
	 * TODO:
	 * - listado de productos carrito
	 * - filtrar cantidad por poducto y mostrar unificado
	 * - sumar total
	 */
	const renderItem = ({item}) => {
		const valor =
			item.quantity > 0 ? item.price * item.quantity : item.price;
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					marginBottom: 16,
					minWidth: '100%',
					paddingBottom: 8,
					borderBottomColor: '#e4e4e7',
					borderBottomWidth: 1,
				}}>
				<View>
					<Image
						source={{
							uri: item.image,
						}}
						alt="image base"
						resizeMode="cover"
						roundedTop="md"
						style={{height: 54, width: 54}}
						mr={3}
					/>
				</View>
				<View style={{flexGrow: 1}}>
					<Text>{`${item.character} - ${item.gameSeries}`}</Text>
					<Text>x{item.quantity}</Text>
					<Text>
						{' $'}
						{valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
					</Text>
				</View>
			</View>
		);
	};

	const renderShoppingCart = () => {
		const filterQuantity = shoppingCart
			.reduce((acc, element) => {
				if (acc.length && acc[acc.length - 1].key === element) {
					acc[acc.length - 1].count++;
				} else {
					acc.push({key: element, count: 1});
				}

				return acc;
			}, [])
			.map((element) => {
				return {
					tailProd: element.key,
					quantity: element.count,
				};
			});
		const groupItems = filterQuantity.map((item) => {
			const descProd = products.find(
				(prod) => prod.tail === item.tailProd,
			);
			return {
				...descProd,
				quantity: item.quantity,
			};
		});
		return (
			<FlatList
				data={groupItems}
				renderItem={renderItem}
				keyExtractor={(item, index) => 'item' + index}
				contentContainerStyle={{
					maxWidth: '100%',
					padding: 16,
				}}
			/>
		);
	};

	return (
		<SafeAreaView
			style={{minWidth: '100%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar title="Carrito" />
			<Container
				pt={4}
				style={{
					backgroundColor: isDarkMode ? colors.black : colors.white,
					maxWidth: '100%',
					minHeight: '100%',
				}}>
				<StatusBar
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					backgroundColor={colors.primary}
				/>
				<View>{renderShoppingCart()}</View>
				<Text>
					Total a pagar:{' $'}
					{totalPrice
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
				</Text>
			</Container>
		</SafeAreaView>
	);
};

export default connect()(memo(ShoppingCart));
