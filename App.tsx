/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RoutesStack, { RootStackParamList } from '@/shared/routes/stack';
import RoutesTab from '@/shared/routes/tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { palette, semantic } from '@/shared/constants/colors';
import Icon from '@/shared/components/icon';
import useDarkMode from '@/shared/hooks/useDarkMode';
import useEffectOnce from '@/shared/hooks/useEffectOnce';
import { normalize, storage } from '@/shared/helpers';
import i18n from 'i18next';
import { PermissionsAndroid, Text, TouchableOpacity } from 'react-native';
import { Button } from '@/shared/components/buttons';
import Typography from '@/shared/components/typography';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigation() {
	const { isDarkMode } = useDarkMode();
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			{RoutesTab.map((route) => (
				<Tab.Screen
					key={route.name}
					name={route.name}
					component={route.component}
					options={{
						tabBarStyle: {
							backgroundColor: isDarkMode ? semantic.background.dark.d500 : semantic.background.white.w500,
						},
						tabBarIcon: ({ focused }) => {
							const iconStyle =
								route.name === 'camera'
									? { tintColor: focused ? palette.main.p500 : semantic.text.grey, width: 30, height: 30 }
									: { tintColor: focused ? palette.main.p500 : semantic.text.grey };
							const wrapStyle =
								route.name === 'camera'
									? {
											borderRadius: 100,
											borderWidth: 1,
											borderColor: semantic.fill.f04,
											height: 70,
											width: 70,
											alignItems: 'center',
											backgroundColor: semantic.fill.f04,
											alignSelf: 'center',
											justifyContent: 'center',
											padding: normalize(20),
											marginBottom: normalize(30),
									  }
									: {};

							return (
								<View style={wrapStyle}>
									<Icon customStyles={iconStyle} icon={route.icon} />
								</View>
							);
						},
						tabBarLabel: ({ focused }) => {
							return null;
						},
					}}
				/>
			))}
		</Tab.Navigator>
	);
}

function App(): JSX.Element {
	async function getTranslate() {
		const ing = await storage.get('language');
		console.log('ing', ing);
		if (ing) {
			await i18n.changeLanguage(ing);
			return;
		}
		await i18n.changeLanguage('en');
	}
	useEffectOnce(() => {
		getTranslate().catch();
	}, []);

	const [isLocationPermissionGranted, setLocationPermissionGranted] = useState(false);

	useEffect(() => {
		requestLocationPermission();
	}, []);

	async function requestLocationPermission() {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
				title: 'Snap Discover Permission',
				message: 'Snap Discover needs access to your location ',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You've access for the location");
				setLocationPermissionGranted(true);
			} else {
				console.log("You don't have access for the location");
				setLocationPermissionGranted(false);
			}
		} catch (err) {
			console.warn(err);
		}
	}

	return (
		<NavigationContainer>
			{isLocationPermissionGranted ? (
				<Stack.Navigator initialRouteName={'welcome'} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="tab" component={TabNavigation} />
					{RoutesStack.map((route) => {
						return <Stack.Screen key={route.path} name={route.path} component={route.component} />;
					})}
				</Stack.Navigator>
			) : (
				<View
					style={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
						padding: normalize(20),
					}}
				>
					<Typography
						style={{
							fontWeight: '500',
							fontSize: normalize(22),
							marginBottom: normalize(10),
						}}
					>
						Please grant location permission to continue
					</Typography>
					<TouchableOpacity
						style={{
							borderColor: '#EEEEEE',
							borderWidth: 1,
							paddingHorizontal: normalize(20),
							paddingVertical: normalize(12),
							backgroundColor: '#EEEEEE',
							borderRadius: normalize(20),
						}}
						onPress={requestLocationPermission}
					>
						<Text style={{ color: '#000000' }}>Grant Permission</Text>
					</TouchableOpacity>
				</View>
			)}
		</NavigationContainer>
	);
}

export default App;
