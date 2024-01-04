import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/shared/components/icon';
import { arrowBack, like } from '@/shared/assets/icons';
import { heart, heartPink, heartPinkFilled } from '@/shared/assets/icons-8';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import { NavigationProps } from '@/shared/interfaces/route-types';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '@/shared/hooks/userContext';
export default function Header({ title, productId }) {
	const { isDarkMode } = useDarkMode();
	const navigation = useNavigation<NavigationProps>();
	const { user, updateUser } = useUser();
	console.log('user', user);
	function navigateTo() {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.replace('tab');
		}
	}
	async function addToFavorites() {
		try {
			const userRef = firestore().collection('users').doc(user.uid);
			const userDoc = await userRef.get();
			if (userDoc.exists) {
				const currentFavorites = userDoc?.data().favorites || [];

				const isProductInFavorites = currentFavorites.includes(productId);
				if (isProductInFavorites) {
					const updatedFavorites = currentFavorites.filter((id) => id !== productId);
					await userRef.update({ favorites: updatedFavorites });
					updateUser({ ...userDoc.data(), favorites: updatedFavorites });
				} else {
					const updatedFavorites = [...currentFavorites, productId];
					await userRef.update({ favorites: updatedFavorites });
					updateUser({ ...userDoc.data(), favorites: updatedFavorites });
				}
			} else {
				console.error('User document not found');
			}
		} catch (error) {
			console.error('Error adding to favorites:', error);

			throw error;
		}
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigateTo()}>
				<Icon customStyles={{ tintColor: isDarkMode ? semantic.background.white.w500 : semantic.background.dark.d500 }} icon={arrowBack} />
			</TouchableOpacity>

			<Typography style={styles.title} translate={false}>
				{title}
			</Typography>

			<TouchableOpacity onPress={() => addToFavorites()}>
				<Icon icon={user?.favorites && user?.favorites.includes(productId) ? heartPinkFilled : heartPink} />
			</TouchableOpacity>
		</View>
	);
}
