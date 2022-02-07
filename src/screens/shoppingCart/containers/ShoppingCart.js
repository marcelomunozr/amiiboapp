import React, {memo} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, useColorScheme, ScrollView} from 'react-native';
import {
	Container,
	View,
	StatusBar,
	Text,
	Image,
	Button,
} from 'native-base';
import AppBar from '../../../commons/components/AppBar';
import { colors } from '../../../commons/utils/utils';
import ControlsItem from '../../../commons/components/ControlsItem';

const ShoppingCart = () => {
	const {products} = useSelector((state) => state.products);
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';

	const renderItem = (item) => {
		const { quantity } = shoppingCart.find(prod => prod.tail === item.tail);
		const {
			price,
			character,
			gameSeries,
			tail,
			image,
		} = products.find(prod => prod.tail === item.tail);
		const valor = quantity > 0 ? price * quantity : price;
		const productName = `${character} - ${gameSeries}`;
		return (
			<View
				key={tail}
				style={{
					flexDirection: 'row',
					marginBottom: 16,
					minWidth: '100%',
					paddingBottom: 8,
					borderBottomColor: colors.gray,
					borderBottomWidth: 1,
				}}>
				<View>
					<Image
						source={{
							uri: image,
						}}
						alt={productName}
						resizeMode="cover"
						roundedTop="md"
						style={{height: 80, width: 54}}
						mr={3}
					/>
				</View>
				<View style={{flexGrow: 1}}>
					<Text>{productName}</Text>
					<Text>
						{' $'}
						{valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
					</Text>
				</View>
				<View style={{justifyContent: 'center', flexDirection: 'row', flexGrow: 1}}>
					<ControlsItem
						shoppingCart={shoppingCart}
						tail={item.tail}
						dispatch={dispatch}
						contentStyle={{marginBottom: 16, minWidth: 100}}
						buttonSize={32}
					/>
				</View>
			</View>
		);
	};

	const renderShoppingCart = () => {
		let price = 0;
		shoppingCart.forEach(({quantity, tail}) => {
			const product = products.find(product => product.tail === tail);
			const calculatePrice = product.price * quantity;
			price = price + calculatePrice;
		});
		return (
			<View padding={4} pt={0}>
				<View>
					{shoppingCart.map(item => renderItem(item))}
				</View>
				<Text>
					Total a pagar:{' $'}
					{price
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
				</Text>
				<Button mt={4} bgColor={colors.primary} onPress={() => console.log('Ir al pago')}>Ir al pago</Button>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={{minWidth: '100%', minHeight: '110%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar title="Carro de compras" />
			<ScrollView>
				<Container
					pt={4}
					style={{
						backgroundColor: isDarkMode ? colors.black : colors.white,
						maxWidth: '100%',
						minHeight: '100%',
						flex: 1,
						flexDirection: 'column',
						paddingBottom: '30%',
					}}>
					<StatusBar
						barStyle={isDarkMode ? 'light-content' : 'dark-content'}
						backgroundColor={colors.primary}
					/>
					{renderShoppingCart()}
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default connect()(memo(ShoppingCart));
