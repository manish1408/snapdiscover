import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';

const useFirebaseCloudMessaging = () => {
	useEffect(() => {
		const initializeFCM = async () => {
			try {
				// Request permission to receive push notifications
				// IOS
				await messaging().requestPermission();
				// Android
				PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
				await messaging().registerDeviceForRemoteMessages();
				const token = await messaging().getToken();
				console.log('FCM Token :', token);

				// Background and Quit Push Handler
				backQuitePushHandler();
			} catch (error) {
				console.error('Error getting FCM token:', error);
			}
		};

		initializeFCM();
	}, []);

	// Foreground Push Handler
	useEffect(() => {
		const handleFCMMessage = async () => {
			const unsubscribe = messaging().onMessage(async (remoteMessage) => {
				Alert.alert('Notification Foreground state', JSON.stringify(remoteMessage));
			});

			return unsubscribe;
		};

		handleFCMMessage();
	}, []);

	// Background and Quit Push
	function backQuitePushHandler() {
		messaging().onNotificationOpenedApp((remoteMessage) => {
			console.log('Notification Background state:', remoteMessage);
		});

		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					console.log('Notification Quit state:', remoteMessage);
				}
			});
	}

	return null;
};

export default useFirebaseCloudMessaging;
