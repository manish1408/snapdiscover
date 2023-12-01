import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { semantic } from '@/shared/constants/colors';

export const styles = StyleSheet.create({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		padding: normalize(20),
	},
	text: {
		fontWeight: '500',
		fontSize: normalize(22),
		marginBottom: normalize(10),
	},
	grantBtnWrapper: {
		borderColor: '#EEEEEE',
		borderWidth: 1,
		paddingHorizontal: normalize(20),
		paddingVertical: normalize(12),
		backgroundColor: '#EEEEEE',
		borderRadius: normalize(20),
	},
	grantBtn: { color: '#000000' },
});
