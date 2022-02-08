import React, {useState, useEffect, memo} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Box, Center, Container, Input, Spinner} from 'native-base';
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	useColorScheme,
	View,
	Animated,
} from 'react-native';
import {getProductsThunk} from '../actions/products';
import Product from '../components/Product';
import AppBar from '../../../commons/components/AppBar';
import {
	colors,
} from '../../../commons/utils/utils';
import { marginBottom } from 'styled-system';

const AllProducts = ({navigation}) => {
	const [arrItems, seArrItems] = useState([]);
	const {products} = useSelector((state) => state.products);
	const {isLoadingProducts} = useSelector((state) => state.products);
	const isDarkMode = useColorScheme() === 'dark';
	const dispatch = useDispatch();

	/**
	 * Ejecuta método que setea las zapatillas en storage con redux
	 */
	const initData = async () => {
		if (!arrItems.length) {
			dispatch(getProductsThunk());
		}
	};

	useEffect(() => {
		initData();
	}, []);

	useEffect(() => {
		seArrItems(products);
	}, [products]);

	const loading = () => (
		<Center flex={0.8} minWidth="100%">
			<Spinner accessibilityLabel="cargando" color="emerald.400" />
		</Center>
	);

	const renderItem = (item) => (
		<Product data={item} key={item.index} navigation={navigation} />
	);

	const renderContent = () => {
		if (!arrItems?.length || isLoadingProducts) {
			return loading();
		}
		// Se ordenan los productos de manera aleatoria
		arrItems.sort((a, b) => 0.5 - Math.random());
		return (
			arrItems.length && (
				<View>
					<FlatList
						data={arrItems}
						renderItem={renderItem}
						keyExtractor={(item, index) => 'item' + index}
						contentContainerStyle={{
							padding: 16,
							maxWidth: '100%'
						}}
						numColumns={2}
					/>
				</View>
			)
		);
	};


	let opacity = new Animated.Value(0);

	const animate = easing => {
		opacity.setValue(0);
		Animated.timing(opacity, {
			toValue: 1,
			duration: 600,
			easing
		}).start();
	};
	const size = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 80]
	});

	const animatedStyles = [
		{
			opacity,
			width: '100%',
			height: size,
			padding: 0,
		}
	];

	return (
		<SafeAreaView
			style={{minWidth: '100%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar title="Productos" withSearch animate={animate} />
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
				{/* <Animated.View style={animatedStyles}>
					<Box alignItems="center" minWidth="100%" flexGrow={1} pl={4} pr={4}>
						<Input size="lg" mt="4" placeholder="Buscar" minWidth="100%" maxWidth="300px" color />
					</Box>
				</Animated.View> */}
				{renderContent()}
			</Container>
		</SafeAreaView>
	);
};

export default connect()(memo(AllProducts));
