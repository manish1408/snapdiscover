import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { semantic } from '@/shared/constants/colors';

export const _styles = (isDarkMode: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		body: {
			justifyContent: 'center',
			flex: 1,
			paddingHorizontal: normalize(14),
			backgroundColor: isDarkMode ? semantic.background.dark.d500 : semantic.background.white.w500,
			gap: 60,
		},
		contentWrapper: {
			justifyContent: 'center',
			alignItems: 'center',
			// flex: 1,
			gap: 5,
		},
		icon: {
			width: 30,
			height: 30,
		},

		text: {
			fontWeight: '600',
			fontSize: normalize(30),
			color: semantic.text.black,
			marginVertical: normalize(8),
			paddingHorizontal: normalize(50),
			alignItems: 'center',
			textAlign: 'center',
		},

		starWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			gap: 5,
		},
		crossIconBtn: {
			position: 'absolute',
			width: 30,
			height: 30,
			top: 30,
			right: 16,
		},
	});
