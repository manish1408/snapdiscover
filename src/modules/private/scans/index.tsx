import React, { useEffect, useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { ScrollView, View } from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';
import { shoppingBag } from '@/shared/assets/icons';
import { scan, scanFilled } from '@/shared/assets/icons-8';
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
import WelcomeModal from './components/WelcomeModal';

import useFetchCollections from '@/shared/hooks/useFetchCollections';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Scans() {
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
				<CardProductHorizontal onRemoveCart={removeFormCart} product={item} />
			</View>
		);
	}

	// Firebase
	const { data: products, loading } = useFetchCollections('products');

	const [modalOpened,setModalOpened] = useState(false);

	useEffect(() => {
		getModalState();
	},[]);

	const getModalState = async () =>{
		const _modalOpened = await AsyncStorage.getItem("welcome-modal-opened");
		if( !_modalOpened){
			setModalOpened(true);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<Wrapper loading={loading}>
				{modalOpened && <WelcomeModal />}
				<View style={{ flex: 1, paddingHorizontal: normalize(24) }}>
					<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
						<HeaderWithIcon icon={scanFilled} title="scans.title" />
						<View style={{ height: normalize(32) }} />
						<List between data={products} rows={1} renderItem={renderItem} />
					</ScrollView>
				</View>
			</Wrapper>
		</View>
	);
}
