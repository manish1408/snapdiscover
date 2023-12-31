import { StyleSheet } from 'react-native';
import { normalize } from '@/shared/helpers';
import { semantic } from '@/shared/constants/colors';

export const _styles = (isDarkMode: boolean) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: normalize(24),
			flex: 1,
		},
		containerImage: {
			width: '100%',
			height: normalize(325),
			marginTop: normalize(20),
			marginBottom: normalize(20),
		},
		image: {
			width: '100%',
			height: normalize(325),
		},
		containerName: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: normalize(24),
		},
		commentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
		name: {
			fontSize: normalize(24),
			fontWeight: '700',
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		containerCantSold: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: normalize(20),
			justifyContent: 'space-between',
		},
		sold: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: isDarkMode ? semantic.fill.f01 : semantic.fill.f04,
			paddingHorizontal: normalize(12),
			paddingVertical: normalize(4),
			borderRadius: normalize(4),
		},
		separator: {
			width: normalize(12),
		},
		space: {
			width: normalize(2),
		},
		sizeStar: {
			width: normalize(15),
			height: normalize(15),
		},
		containerDescription: {
			marginTop: normalize(40),
		},
		descriptionTitle: {
			fontSize: normalize(18),
			fontWeight: '700',
		},
		description: {
			lineHeight: 16,
			marginTop: normalize(10),
		},
		quantity: {
			fontWeight: '700',
			fontSize: normalize(18),
		},
		valueVariant: {
			marginTop: normalize(18),
			fontWeight: '700',
		},
		price: {
			fontSize: normalize(18),
			fontWeight: '700',
		},
		total: {
			fontSize: normalize(24),
			fontWeight: '700',
			marginTop: normalize(12),
		},
		review: {
			lineHeight: 16,
			marginTop: normalize(10),
			fontStyle: 'italic',
		},
		source: {
			fontSize: normalize(16),
			fontWeight: '700',
		},
		rating: {
			fontSize: normalize(16),
			fontWeight: '500',
		},
		flavour: {
			fontWeight: '700',
		},
		containerSocial: {
			marginTop: normalize(10),
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		socialImage: {
			width: 60,
			height: 60,
		},
		containerAddress: {
			marginTop: normalize(10),
			marginBottom: normalize(20),
			flexDirection: 'row',
			// alignItems: 'center',
			// justifyContent: 'space-between',
			// gap: 10,
		},

		// body: {
		// 	flex: 1,
		// 	paddingHorizontal: normalize(10),
		// },
	});
