import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { getUser } from '../auth/authStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

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


				const resp = await AsyncStorage.getItem("user");
				if (resp) {
					
					const user = JSON.parse(resp)
					if (!user.notificationKey) {
						console.log("Updating Notification Key")
						const token = await messaging().getToken();
						console.log('FCM Token :', token);
						await firestore().collection('users').doc(user.uid).update({
							notificationKey:token
						});
						const res = await firestore().collection('users').doc(user.uid).get();
						await AsyncStorage.setItem("user",JSON.stringify(res.data()))
					}

				}

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
