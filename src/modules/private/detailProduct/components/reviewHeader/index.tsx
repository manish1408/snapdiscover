import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/shared/components/icon';
import { arrowBack, like } from '@/shared/assets/icons';
import { heartPinkFilled } from '@/shared/assets/icons-8';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import { NavigationProps } from '@/shared/interfaces/route-types';

export default function ReviewHeader({ title, commentsLength }) {
	const { isDarkMode } = useDarkMode();
	const navigation = useNavigation<NavigationProps>();

	function navigateTo() {
		navigation.goBack();
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigateTo()}>
				<Icon customStyles={{ tintColor: isDarkMode ? semantic.background.white.w500 : semantic.background.dark.d500 }} icon={arrowBack} />
			</TouchableOpacity>

			<Typography style={styles.title} translate={false}>
				{commentsLength}
			</Typography>
			<Typography style={styles.title} translate={false}>
				{title}
			</Typography>
		</View>
	);
}
