import React, { useState, useEffect } from 'react';
import List from '@/shared/components/list';
import { View } from 'react-native';
import CardProduct from '@/shared/components/cardProduct';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { MOCKUP_RELATED_PRODUCTS } from '@/db';

export default function RelatedProduct() {
	function renderItem(item: any, key: number) {
		return <CardProduct product={item} key={key} />;
	}
	return (
		<View>
			<List between data={MOCKUP_RELATED_PRODUCTS} rows={2} renderItem={renderItem} />
		</View>
	);
}
