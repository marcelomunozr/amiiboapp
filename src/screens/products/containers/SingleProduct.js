import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {
	Image,
	Text,
	Box,
	Stack,
	Container,
	View,
	Center,
} from 'native-base';
import moment from 'moment';
import 'moment/locale/es';
import {
	Dimensions,
	SafeAreaView,
	StatusBar,
	useColorScheme,
} from 'react-native';
import AppBar from '../../../commons/components/AppBar';
import {
	colors,
} from '../../../commons/utils/utils';
import ControlsItem from '../../../commons/components/ControlsItem';

moment.locale('es');

const SingleProduct = ({navigation, route: {params}}) => {
	const {shoppingCart} = useSelector((state) => state.shoppingCart);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	const win = Dimensions.get('window');
	const ratio = win.width/500;
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

	return (
		<SafeAreaView
			style={{minWidth: '100%', minHeight: '110%', flex: 0.5, backgroundColor: colors.primary}}>
			<AppBar navigation={navigation} title="Detalle producto" />
			<ScrollView>
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
						<Center padding={4}>
							<Box
								bg="white"
								shadow={4}
								rounded="xl"
								maxWidth="100%"
								minWidth="100%"
								key={tail}
								padding={4}>
								<Text
									fontSize="2xl"
									mb={4}
									letterSpacing={2}
									bold
									textAlign="center"
									color={colors.primary}
								>
									{name.toUpperCase()}
								</Text>
								<Image
									source={{
										uri: image,
									}}
									alt={name}
									resizeMode="contain"
									roundedTop="md"
									style={{width: win.width, height: 280 * ratio}}
									mb={4}
								/>
								<View style={{justifyContent: 'center', flexDirection: 'row', flexGrow: 1}}>
									<ControlsItem
										shoppingCart={shoppingCart}
										tail={tail}
										dispatch={dispatch}
										contentStyle={{marginBottom: 16, minWidth: 200}}
										buttonSize={62}
									/>
								</View>
								<Stack mb={4}>
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
							</Box>
						</Center>
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default connect()(memo(SingleProduct));
