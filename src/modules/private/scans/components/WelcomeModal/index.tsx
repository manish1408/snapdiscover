import React, { useState } from 'react';
import Hero from '@/modules/auth/welcome/components/hero';
import { View, Image, Modal, TouchableOpacity, Text } from 'react-native';
import { Button, ButtonOutline } from '@/shared/components/buttons';
import { _styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import useDarkMode from '@/shared/hooks/useDarkMode';
import Typography from '@/shared/components/typography';
import Wrapper from '@/shared/components/wrapper';

export default function WelcomeModal() {
	const [modal, setModal] = useState(true);

	const navigation = useNavigation<NavigationProps>();
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);

	function navigateTo() {
		setModal(false);
		navigation.navigate('tab');
	}
	return (
		<Modal visible={modal} animationType="slide" transparent={true}>
			<View style={styles.container}>
				<View style={styles.body}>
					<View style={styles.contentWrapper}>
						<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/camera.png')} />
						<Typography style={styles.text} translate={false}>
							Snap a pic of any beer, wine or spirit with the snapDiscover.
						</Typography>
					</View>
					<View style={styles.contentWrapper}>
						<View style={styles.starWrapper}>
							<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/star-yellow-filled.png')} />
							<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/star-yellow-filled.png')} />
							<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/star-yellow-filled.png')} />
							<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/star-yellow-filled.png')} />
							<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/star-yellow.png')} />
						</View>
						<Typography style={styles.text} translate={false}>
							We'll quickly serve up ratings, reviews and insights.
						</Typography>
					</View>
					<View style={styles.contentWrapper}>
						<Image style={styles.icon} resizeMode="contain" source={require('@/shared/assets/icons-8/trophy.png')} />
						<Typography style={styles.text} translate={false}>
							Earn points with every snap!
						</Typography>
					</View>
					<TouchableOpacity style={styles.continueWrapper} onPress={() => navigateTo()}>
						<Text style={styles.continueBtn}>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
