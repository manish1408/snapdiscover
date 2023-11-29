import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

export default function LocationPermission() {
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
			} else {
				console.log("You don't have access for the location");
			}
		} catch (err) {
			console.warn(err);
		}
	}

	return null;
}
