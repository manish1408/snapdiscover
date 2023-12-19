import React, { useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { View } from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';
import RadioButtons from '@/shared/components/radioButtons';
import Typography from '@/shared/components/typography';
import { normalize, storage } from '@/shared/helpers';
import i18n from 'i18next';
import useEffectOnce from '@/shared/hooks/useEffectOnce';
import { semantic } from '@/shared/constants/colors';
import Header from '../components/header';

const defaultOptions = [
	{
		CustomLabel: <Typography style={{ flex: 1, marginVertical: 10 }}>English</Typography>,
		id: 'en',
		active: true,
	},
	{
		CustomLabel: <Typography style={{ flex: 1, marginVertical: 10 }}>Spanish</Typography>,
		id: 'es',
		active: false,
	},
];
export default function Terms() {
	const [languageActive, setLanguageActive] = useState<any>([]);
	async function changeLanguage(ing: string) {
		await storage.create('language', ing);
		await i18n.changeLanguage(ing);
	}

	async function getTranslate() {
		const ing = await storage.get('language');
		if (ing) {
			setLanguageActive([
				{
					CustomLabel: <Typography style={{ flex: 1, marginVertical: 10 }}>English</Typography>,
					id: 'en',
					active: ing === 'en',
				},
				{
					CustomLabel: <Typography style={{ flex: 1, marginVertical: 10 }}>Spanish</Typography>,
					id: 'es',
					active: ing === 'es',
				},
			]);
			return;
		}
		setLanguageActive(defaultOptions);
	}
	useEffectOnce(() => {
		getTranslate().catch();
	}, []);

	if (languageActive.length === 0) {
		return <View />;
	}

	return (
		<Wrapper>
			<View style={{ paddingHorizontal: normalize(24) }}>
				<Header title="Terms of Service" />

				{[1, 2, 3].map((chunk, idx) => (
					<View key={idx} style={{ marginTop: normalize(20) }}>
						<Typography
							style={{
								fontWeight: '600',
								fontSize: normalize(24),
								color: semantic.text.black,
							}}
						>
							What is Lorem Ipsum?
						</Typography>
						<Typography
							style={{
								fontWeight: '400',
								fontSize: normalize(16),
								color: semantic.text.black,
							}}
						>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
							five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
							including versions of Lorem Ipsum.
						</Typography>
					</View>
				))}
			</View>
		</Wrapper>
	);
}
