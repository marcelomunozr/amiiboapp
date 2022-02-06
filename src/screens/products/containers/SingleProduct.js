import React, {memo} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {
	Image,
	Text,
	Box,
	Stack,
	Heading,
	Container,
	View,
	Center,
	Button,
} from 'native-base';
import moment from 'moment';
import 'moment/locale/es';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import AppBar from '../../../commons/components/AppBar';
import {setCart} from '../../shoppingCart/actions/shoppingCart';
import { colors } from '../../../commons/utils/utils';

moment.locale('es');

const SingleProduct = ({navigation, route: {params}}) => {
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	const {
		amiiboSeries,
		character,
		gameSeries,
		image,
		name,
		release,
		tail,
		type,
		price,
	} = params.item;

	const addToCart = () => {
		try {
			const arrToCart = [...shoppingCart, tail];
			dispatch(setCart(arrToCart));
		} catch (error) {
			console.log(error);
		}
	};

	const removeToCart = () => {
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

	const renderButtonRemove = () => {
		const filterItems = shoppingCart.filter((item) => item === tail);
		if (filterItems.length) {
			return (
				<Button
					colorScheme="red"
					_text={{
						color: 'white',
					}}
					onPress={removeToCart}>
					{`Quitar uno (${filterItems.length.toString()})`}
				</Button>
			);
		}
	};

	return (
		<SafeAreaView
			style={{minWidth: '100%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar navigation={navigation} title={character} />
			<Container
				style={{
					backgroundColor: isDarkMode ? colors.black : colors.white,
					maxWidth: '100%',
					minHeight: '100%',
				}}>
				<StatusBar
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					backgroundColor={colors.primary}
				/>
				<View
					style={{
						minWidth: '100%',
					}}>
					<Center>
						<Box
							bg="white"
							maxWidth="100%"
							minWidth="100%"
							mb={4}
							key={tail}
							padding={4}>
							<Image
								source={{
									uri: image,
								}}
								alt="image base"
								resizeMode="cover"
								roundedTop="md"
								style={{height: 360, width: 'auto'}}
								mb={4}
							/>
							<Stack mb={4}>
								<Text color="dark.300" mb={2}>
									{`Nombre: ${name}`}
								</Text>
								<Text color="dark.300" mb={2}>
									{`Juego: ${gameSeries}`}
								</Text>
								<Text color="dark.300" mb={2}>
									{`Serie: ${amiiboSeries}`}
								</Text>
								<Text
									color="dark.300"
									mb={2}>{`Tipo: ${type}`}</Text>
								<Text color="dark.300" mb={2}>
									{`Fecha de lanzamiento: ${moment(
										release.au,
									).format('L')}`}
								</Text>
								<Text color="dark.300" mb={2}>{`Precio: $${price
									.toString()
									.replace(
										/\B(?=(\d{3})+(?!\d))/g,
										'.',
									)}`}</Text>
							</Stack>
							<Button
								colorScheme="emerald"
								onPress={addToCart}
								mb={4}>
								Agregar uno
							</Button>
							{renderButtonRemove()}
						</Box>
					</Center>
				</View>
			</Container>
		</SafeAreaView>
	);
};

export default connect()(memo(SingleProduct));
