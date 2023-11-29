import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { palette, semantic } from '@/shared/constants/colors';
export const styles = StyleSheet.create({
	titleButtonSheet: {
		marginVertical: normalize(24),
		textAlign: 'center',
		fontSize: normalize(18),
		fontWeight: '700',
	},
	bodyButtonSheet: {
		padding: normalize(24),
	},
	containerProduct: {
		marginVertical: normalize(24),
	},
	footerButtonSheet: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: normalize(24),
	},
	capture: {
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 6,
		borderColor: 'white',
		position: 'absolute',
		bottom: 50,
		alignSelf: 'center',
	},
	imgBtnWrapper: {
		position: 'absolute',
		bottom: 50,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		gap: 10,
	},
	imgBtn: {
		borderColor: '#EEEEEE',
		borderWidth: 1,
		paddingHorizontal: normalize(20),
		paddingVertical: normalize(12),
		backgroundColor: '#EEEEEE',
		borderRadius: normalize(20),
	},
});
