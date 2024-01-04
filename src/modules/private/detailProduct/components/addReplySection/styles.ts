import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { palette, semantic } from '@/shared/constants/colors';
import { normalize } from '@/shared/helpers';

export const styles = StyleSheet.create({
	footer: {
		padding: normalize(16),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	containerInput: {
		flex: 0.98,
	},
	containerIcon: {
		width: normalize(48),
		height: normalize(48),
		backgroundColor: '#F4F4F4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 150,
	},
	icon: {
		tintColor: 'rgba(156, 166, 169, 1)',
	},
	avatar: {
		width: normalize(50),
		height: normalize(50),
		marginRight: normalize(12),
		borderRadius: normalize(100),
	},
});
