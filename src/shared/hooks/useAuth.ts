import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

export function useAuth() {
	const [user, setUser] = useState();

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((user) => {
			if (user) {
				console.log('user', user);
				setUser(user);
			} else {
				setUser(undefined);
			}
		});

		return unsubscribe;
	}, []);

	return {
		user,
	};
}
