import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/shared/components/icon';
import { arrowBack, homeNotifications } from '@/shared/assets/icons';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import { NavigationProps } from '@/shared/interfaces/route-types';
import { bell } from '@/shared/assets/icons-8';

interface HeaderBackProps {
	title?: string;
	icon?: React.ReactNode | undefined;
}
export default function HeaderWithIcon({ title, icon }: HeaderBackProps) {
	const { navigate } = useNavigation<NavigationProps>();
	const { isDarkMode } = useDarkMode();
	const stylesIcon = {
		// tintColor: isDarkMode ? semantic.background.white.w500 : semantic.text.grey
	};
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Icon customStyles={stylesIcon} icon={icon ? icon : arrowBack} />

				{title && <Typography style={styles.title}>{title}</Typography>}
			</View>
			<View style={styles.row}>
				<TouchableOpacity onPress={() => navigate('notifications')}>
					<Icon customStyles={styles.iconSize} icon={bell} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
