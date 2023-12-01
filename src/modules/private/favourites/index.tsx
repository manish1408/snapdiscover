import React, { useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { ScrollView, View } from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';

import { heartFilled } from '@/shared/assets/icons-8';
import CardProductHorizontal from '@/shared/components/cardProductHorizontal';
import List from '@/shared/components/list';
import { Button, ButtonOutline } from '@/shared/components/buttons';
import { normalize } from '@/shared/helpers';
import ButtonSheet from '@/shared/components/buttonSheet';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import { MOCKUP_PRODUCTS } from '@/db/index';

export default function Favourites() {
	const { isDarkMode } = useDarkMode();
	const { navigate } = useNavigation<NavigationProps>();
	const [openDeleteItem, setOpenDeleteItem] = useState(false);
	const [selectedProductToRemove, setSelectedProductToRemove] = useState({});
	function toggleOpenDeleteItem() {
		setOpenDeleteItem(!openDeleteItem);
	}

	function removeFormCart(product: any) {
		setSelectedProductToRemove(product);
		toggleOpenDeleteItem();
	}
	function renderItem(item: any, key: number) {
		return (
			<View style={{ marginBottom: 20, flex: 1 }} key={key}>
				<CardProductHorizontal favourite={true} product={item} />
			</View>
		);
	}
	return (
		<View style={{ flex: 1 }}>
			<Wrapper>
				<View style={{ flex: 1, paddingHorizontal: normalize(24) }}>
					<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
						<HeaderWithIcon icon={heartFilled} title="favourites.title" />
						<View style={{ height: normalize(32) }} />
						<List between data={MOCKUP_PRODUCTS} rows={1} renderItem={renderItem} />
					</ScrollView>
				</View>
			</Wrapper>
		</View>
	);
}
