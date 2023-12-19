import { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';

const useSplashScreen = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
};

export default useSplashScreen;
