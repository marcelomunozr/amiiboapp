import React, {useState, useEffect, memo} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Center, Container, Heading, Spinner} from 'native-base';
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	StatusBar,
	useColorScheme,
	View,
} from 'react-native';
import {getProductsThunk} from '../actions/products';
import Product from '../components/Product';
import AppBar from '../../../commons/components/AppBar';
import {
	isAndroid,
	colors,
} from '../../../commons/utils/utils';

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

	return (
		<SafeAreaView
			style={{minWidth: '100%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar title="Productos" withSearch />
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
				{renderContent()}
			</Container>
		</SafeAreaView>
	);
};

export default connect()(memo(AllProducts));
