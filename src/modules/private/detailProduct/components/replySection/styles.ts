import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { semantic } from '@/shared/constants/colors';

export const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	row: {
		flexDirection: 'row',
		// alignItems: 'center',
	},
	avatar: {
		width: normalize(50),
		height: normalize(50),
		marginRight: normalize(12),
		borderRadius: normalize(100),
	},
	replyAvatar: {
		width: normalize(35),
		height: normalize(35),
		marginRight: normalize(12),
		borderRadius: normalize(100),
	},
	name: {
		fontSize: normalize(14),
		fontWeight: '700',
	},
	date: {
		color: semantic.text.grey,
		fontSize: normalize(12),
		marginTop: normalize(8),
	},
	valueReview: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: normalize(18),
		paddingHorizontal: normalize(20),
		paddingVertical: normalize(6),
		marginHorizontal: normalize(8),
		backgroundColor: semantic.fill.f04,
	},
	textReview: {
		fontSize: normalize(18),
		fontWeight: '700',
		marginLeft: normalize(4),
	},
	description: {
		color: semantic.text.grey,
		marginBottom: normalize(12),
	},
	valueLike: {
		color: semantic.text.grey,
		fontSize: normalize(16),
		marginLeft: normalize(6),
		fontWeight: '500',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		paddingHorizontal: normalize(24),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
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
	commentRow: {
		alignItems: 'center',
		gap: 10,
	},
	replyWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0 },
});
