import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { semantic } from '@/shared/constants/colors';

export const _styles = (isDarkMode: boolean) =>
	StyleSheet.create({
		//
		wrapper: {
			width: '100%',
			alignItems: 'center',
		},
		imgWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
		image: {
			height: normalize(325),
			width: normalize(100),
			borderRadius: normalize(12),
		},
		paginationContainer: {
			width: 5,
			marginTop: -10,
		},
		paginationDot: {
			width: 8,
			height: 8,
			borderRadius: 8,
		},
	});
