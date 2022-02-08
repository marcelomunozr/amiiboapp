import React, {memo} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, useColorScheme, ScrollView, LogBox} from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
import {
	Container,
	View,
	StatusBar,
	Text,
	Image,
	Button,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppBar from '../../../commons/components/AppBar';
import { colors } from '../../../commons/utils/utils';
import ControlsItem from '../../../commons/components/ControlsItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShoppingCart = () => {
	const {products} = useSelector((state) => state.products);
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	const navigation = useNavigation();

	const renderItem = (item) => {
		const { quantity } = shoppingCart.find(prod => prod.tail === item.tail);
		const productitem = products.find(prod => prod.tail === item.tail);
		const {
			price,
			character,
			gameSeries,
			tail,
			image,
		} = productitem;
		const valor = quantity > 0 ? price * quantity : price;
		const productName = `${gameSeries}`;
		const goProduct = () => navigation.navigate('Detalle Producto', {
			item: productitem,
		});
		return (
				<View
					key={tail}
					style={{
						flexDirection: 'row',
						marginBottom: 16,
						maxWidth: '100%',
						minWidth: '100%',
						paddingBottom: 8,
						borderBottomColor: colors.gray,
						borderBottomWidth: 1,
					}}>
					<View>
						<TouchableOpacity onPress={goProduct}>
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
						</TouchableOpacity>
					</View>
					<View style={{flexGrow: 1}}>
						<TouchableOpacity onPress={goProduct}>
							<Text>{productName}</Text>
							<Text>
								{' $'}
								{valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{justifyContent: 'center', flexDirection: 'row'}}>
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

	const getTotal = () => {
		let total = 0;
		shoppingCart.forEach(({quantity, tail}) => {
			const product = products.find(product => product.tail === tail);
			const calculatePrice = product.price * quantity;
			total = total + calculatePrice;
		});
		return total;
	};

	const renderShoppingCart = () => {
		const total = getTotal();
		if (total === 0) {
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					minWidth: '100%',
					flexGrow: 1,
					paddingLeft: 24,
					paddingRight: 24,
				}}>
					<Fontisto
						name="shopping-basket"
						size={120}
						color={colors.primary}
					/>
					<Text fontSize="2xl" mt={4} mb={4} bold color={colors.primary}>¡SIN PRODUCTOS!</Text>
					<Text color="light.500" textAlign="center" mb={4}>
						Tu carro se encuentra vacío. Todavía no agregas productos al carro de compra
					</Text>
					<Button
						size="lg"
						bgColor={colors.primary}
						style={{color: colors.white}}
						onPress={() =>
							navigation.navigate('Productos')
						}
					>
						VER PRODUCTOS
					</Button>
				</View>
			)
		}
		return (
			<View padding={4} pt={4}>
				<View>
					{shoppingCart.map(item => renderItem(item))}
				</View>
				<Button
					mt={6}
					size="lg"
					bgColor={colors.primary}
					style={{color: colors.white}}
					onPress={() => console.log('Ir al pago')}
				>
					{`PAGAR: $${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
				</Button>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={{minWidth: '100%', minHeight: '110%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar title="Carro de compras" />
			<ScrollView>
				<Container
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
