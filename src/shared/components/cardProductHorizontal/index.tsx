import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Typography from '@/shared/components/typography';
import { currencyType } from '@/shared/constants/global';
import { _styles } from './styles';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import Counter from '@/shared/components/counter';
import Icon from '@/shared/components/icon';
import { trash } from '@/shared/assets/icons';
import moment from 'moment';
export default function CardProductHorizontal({ product, actions = true, favourite = false }: any) {
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);
	const [cant, setCant] = useState(1);
	const navigation = useNavigation<NavigationProps>();

	function navigateTo() {
		navigation.navigate('detailProduct', { id: product.id });
	}
	return (
		<TouchableOpacity onPress={navigateTo} style={styles.container}>
			{product.images && product.images.length > 0 && (
				<View style={styles.containerImage}>
					<Image style={styles.image} resizeMode="contain" source={{ uri: product.images[0] }} />
					{favourite && <Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/heart-pink-filled.png')} />}
				</View>
			)}
			<View style={styles.containerInfo}>
				<View style={styles.actions}>
					<Typography style={styles.name} translate={false}>
						{product.title}
					</Typography>
				</View>

				{/* <Typography style={styles.category} translate={false}>
					Points: {product?.points}
				</Typography>
				<Typography style={styles.category} translate={false}>
					{moment(product?.date).format('YYYY-DD-MM')}
				</Typography>
				{!favourite && (
					<Typography style={styles.category} translate={false}>
						<Typography style={product.isVerified ? styles.verified : styles.notVerified} translate={false}>
							{product.isVerified ? 'Verified' : 'Not verified'}
						</Typography>
					</Typography>
				)} */}
			</View>
		</TouchableOpacity>
	);
}
