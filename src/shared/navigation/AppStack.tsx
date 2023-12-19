import React, { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import { GrantPermission } from '@/shared/components/grantPermission';
import { Loader } from '@/shared/components/Loader';
import TabNavigation from '@/shared/navigation/TabNavigation';
import AppRoutes from '../routes/AppRoutes';
import { RootStackParamList } from '../interfaces/route-types';

const Stack = createStackNavigator<RootStackParamList>();

function AppStack() {
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
				{AppRoutes.map((route) => {
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

export default AppStack;
