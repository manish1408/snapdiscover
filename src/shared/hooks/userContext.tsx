import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextProps {
	user: any;
	updateUser: (updatedUser: any) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<any | null>(null);

	const updateUser = (updatedUser: any) => {
		setUser(updatedUser);
	};

	// Load user data from AsyncStorage on component mount
	useEffect(() => {
		const loadUserData = async () => {
			try {
				const userDataString = await AsyncStorage.getItem('user');
				if (userDataString) {
					const userData = JSON.parse(userDataString);
					setUser(userData);
				}
			} catch (error) {
				console.error('Error loading user data from AsyncStorage:', error);
			}
		};

		loadUserData();
	}, []);

	// Save user data to AsyncStorage whenever the user changes
	useEffect(() => {
		const saveUserData = async () => {
			try {
				await AsyncStorage.setItem('user', JSON.stringify(user));
			} catch (error) {
				console.error('Error saving user data to AsyncStorage:', error);
			}
		};

		saveUserData();
	}, [user]);

	return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export { UserProvider, useUser };
