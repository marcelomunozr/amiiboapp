import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './store';
import ProductsScreen from './src/screens/products/containers/AllProducts';
import SingleProductScreen from './src/screens/products/containers/SingleProduct';
import ShoppingCartScreen from './src/screens/shoppingCart/containers/ShoppingCart';

// const store = configureStore();
const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Productos"
						screenOptions={{
							headerShown: false,
						}}>
						<Stack.Screen
							name="Productos"
							component={ProductsScreen}
						/>
						<Stack.Screen
							name="Detalle Producto"
							component={SingleProductScreen}
						/>
						<Stack.Screen
							name="Carrito"
							component={ShoppingCartScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</NativeBaseProvider>
		</Provider>
	);
};

export default App;
