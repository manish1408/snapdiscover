import AsyncStorage from '@react-native-async-storage/async-storage';

// Store the authentication user
const storeUser = async (user: any): Promise<void> => {
	try {
		await AsyncStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		console.error('Error storing user:', error);
	}
};

// Get the stored authentication user
const getUser = async (): Promise<any | null> => {
	try {
		const userString = await AsyncStorage.getItem('user');
		if (userString) {
			const user = JSON.parse(userString);
			return user;
		} else {
			console.warn('No user data found in AsyncStorage');
			return null;
		}
	} catch (error) {
		console.error('Error getting user:', error);
		return null;
	}
};

// Remove the stored authentication user
const removeUser = async (): Promise<void> => {
	try {
		await AsyncStorage.removeItem('user');
	} catch (error) {
		console.error('Error removing user:', error);
	}
};

export { storeUser, getUser, removeUser };
