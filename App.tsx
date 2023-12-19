import React from 'react';
import useEffectOnce from '@/shared/hooks/useEffectOnce';
import { storage } from '@/shared/helpers';
import i18n from 'i18next';

import AppStack from '@/shared/navigation/AppStack';
import AuthStack from '@/shared/navigation/AuthStack';
import { useAuth } from '@/shared/hooks/useAuth';
import useFirebaseCloudMessaging from '@/shared/hooks/useFirebaseCloudMessaging';
import messaging from '@react-native-firebase/messaging';
import useSplashScreen from '@/shared/hooks/useSplashScreen';

// Push Notification background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage);
});

function App(): JSX.Element {
	// Push Notification hook
	useFirebaseCloudMessaging();
	// Splash Screen
	useSplashScreen();

	const { user } = useAuth();

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

	return user ? <AppStack /> : <AuthStack />;
}

export default App;
