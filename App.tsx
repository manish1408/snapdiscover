/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RoutesStack, { RootStackParamList } from '@/shared/routes/stack';
import RoutesTab from '@/shared/routes/tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { palette, semantic } from '@/shared/constants/colors';
import Icon from '@/shared/components/icon';
import useDarkMode from '@/shared/hooks/useDarkMode';
import useEffectOnce from '@/shared/hooks/useEffectOnce';
import { normalize, storage } from '@/shared/helpers';
import i18n from 'i18next';
import { PermissionsAndroid, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Button } from '@/shared/components/buttons';
import Typography from '@/shared/components/typography';
import { request, PERMISSIONS, requestMultiple, RESULTS, checkMultiple } from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import { ResultMap } from 'react-native-permissions/dist/typescript/results';
import { GrantPermission } from '@/shared/components/grantPermission';

import { NavigationProps } from '@/shared/routes/stack';
import { Loader } from '@/shared/components/Loader';
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
							// const iconStyle =
							// 	route.name === 'camera'
							// 		? { tintColor: focused ? palette.main.p500 : semantic.text.grey, width: 30, height: 30 }
							// 		: { tintColor: focused ? palette.main.p500 : semantic.text.grey };
							const iconStyle = route.name === 'camera' ? { width: 30, height: 30 } : {};
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
									<Icon customStyles={iconStyle} icon={focused ? route.activeIcon : route.icon} />
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
	const navigationRef = useRef(null);
	useEffect(() => {
		SplashScreen.hide();
	}, []);
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
	const [loading, setLoading] = useState(true);
	const [locationPermission, setLocationPermission] = useState<typeof ResultMap | null>(null);

	useEffect(() => {
		checkPermissionStatus();
	}, []);

	function checkPermissionStatus() {
		const locationPermissionsPlatform = Platform.select({
			ios: [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
			android: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
		});

		requestMultiple(locationPermissionsPlatform)
			.then((result) => {
				if (
					(Platform.OS === 'ios' &&
						(result[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED || result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED)) ||
					(Platform.OS === 'android' &&
						result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED &&
						result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED)
				) {
					console.log('Location permissions granted');
					setLocationPermission(RESULTS.GRANTED);
				} else if (
					(Platform.OS === 'ios' &&
						(result[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.BLOCKED || result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED)) ||
					(Platform.OS === 'android' &&
						(result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.BLOCKED ||
							result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.BLOCKED))
				) {
					console.log('Location permissions blocked');
					setLocationPermission(RESULTS.BLOCKED);
				} else {
					console.log('Location permissions denied');
					setLocationPermission(RESULTS.DENIED);
				}
			})
			.catch((error) => {
				console.error('Permission request error:', error);
			});
		setLoading(false);
	}

	function handleRetryPermission() {
		if (locationPermission === RESULTS.BLOCKED) {
			Alert.alert('Permission Blocked', 'Location permissions are blocked. Please go to the app settings and enable location permissions.', [
				{ text: 'OK', onPress: () => Linking.openSettings() },
			]);
		} else {
			setLocationPermission(null);
			checkPermissionStatus();
		}
	}

	const config = {
		screens: {
			detailProduct: 'detailProduct/:id',
		},
	};

	const linking = {
		prefixes: ['https://www.snapztest.com/', 'snapztest://'],
		config,
	};

	return locationPermission === RESULTS.GRANTED ? (
		<NavigationContainer linking={linking} fallback={<Loader />}>
			<Stack.Navigator initialRouteName={'tab'} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="tab" component={TabNavigation} />
				{RoutesStack.map((route) => {
					return <Stack.Screen key={route.path} name={route.path} component={route.component} />;
				})}
			</Stack.Navigator>
		</NavigationContainer>
	) : locationPermission === RESULTS.BLOCKED || locationPermission === RESULTS.DENIED ? (
		<GrantPermission desc="Please grant location permission to continue" handleRetryPermission={handleRetryPermission} />
	) : (
		<Loader />
	);
}

export default App;
