import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const useUserFavorites = (userId) => {
	const [favoriteProducts, setFavoriteProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userRef = firestore().collection('users').doc(userId);

		const unsubscribe = userRef.onSnapshot((userSnapshot) => {
			if (userSnapshot.exists) {
				const productIds = userSnapshot.data().favorites || [];

				const productPromises = productIds.map(async (productId) => {
					const productRef = firestore().collection('products').doc(productId);
					const productDoc = await productRef.get();
					return { ...productDoc.data(), id: productId };
				});

				Promise.all(productPromises)
					.then((products) => {
						setFavoriteProducts(products);
						setLoading(false);
					})
					.catch((error) => {
						console.error('Error fetching user favorites:', error);
						setLoading(false);
					});
			} else {
				console.error('User document not found');
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, [userId]);

	return { favoriteProducts, loading };
};
