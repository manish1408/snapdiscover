import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { palette, semantic } from '@/shared/constants/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: normalize(24),
	},
	form: {
		marginTop: normalize(32),
	},
	formControl: {
		marginBottom: normalize(24),
	},
	containerLink: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	alreadyAccount: {
		fontSize: normalize(16),
	},
	link: {
		marginLeft: normalize(6),
		color: palette.main.p500,
		fontWeight: '700',
		fontSize: normalize(16),
	},
	error: {
		marginTop: 10,
		marginBottom: 10,
		color: semantic.text.red,
	},
	// Age
	selectedAge: {
		fontSize: 18,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	ageContainer: {
		height: 200,
		textAlign: 'center',
		borderRadius: 10,
		backgroundColor: 'white',
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ageWrapper: { alignItems: 'center', borderBottomWidth: 1, borderBottomColor: semantic.fill.f04 },
	ageItem: {
		fontSize: normalize(16),
		padding: normalize(10),
	},
});
