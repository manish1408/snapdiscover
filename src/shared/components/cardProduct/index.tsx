import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Typography from '@/shared/components/typography';
import { currencyType } from '@/shared/constants/global';
import { _styles } from './styles';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { normalize } from '@/shared/helpers';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';

export default function CardProduct({ product }: any) {
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);
	const navigation = useNavigation<NavigationProps>();

	function navigateTo() {
		navigation.navigate('detailProduct', { id: product.id });
	}
	return (
		<TouchableOpacity onPress={navigateTo} style={styles.container}>
			<View style={styles.containerImage}>
				<Image style={styles.image} resizeMode="contain" source={{ uri: product?.images[0] }} />
			</View>

			<View style={{ marginTop: normalize(12) }}>
				<Typography style={styles.title} translate={false}>
					{product.title}
				</Typography>
			</View>
		</TouchableOpacity>
	);
}
