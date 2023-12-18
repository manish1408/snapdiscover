import AsyncStorage from '@react-native-async-storage/async-storage';

// Store the authentication token
const storeToken = async (token: string): Promise<void> => {
	try {
		await AsyncStorage.setItem('userToken', token);
	} catch (error) {
		console.error('Error storing token:', error);
	}
};

// Get the stored authentication token
const getToken = async (): Promise<string | null> => {
	try {
		const token = await AsyncStorage.getItem('userToken');
		return token;
	} catch (error) {
		console.error('Error getting token:', error);
		return null;
	}
};

// Remove the stored authentication token
const removeToken = async (): Promise<void> => {
	try {
		await AsyncStorage.removeItem('userToken');
	} catch (error) {
		console.error('Error removing token:', error);
	}
};

export { storeToken, getToken, removeToken };
