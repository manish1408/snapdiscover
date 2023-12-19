import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: normalize(22),
		fontWeight: '700',
		marginLeft: normalize(6),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSize: {
		width: normalize(24),
		height: normalize(24),
	},
});
