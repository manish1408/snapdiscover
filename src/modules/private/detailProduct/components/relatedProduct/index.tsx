import React from 'react';
import List from '@/shared/components/list';
import { View } from 'react-native';
import CardProduct from '@/shared/components/cardProduct';
import useFetchSimilarProducts from '@/shared/hooks/useFetchSimilarProducts';

export default function RelatedProduct({ similarProducts }) {
	const products = useFetchSimilarProducts(similarProducts);

	function renderItem(item: any, key: number) {
		return <CardProduct product={item} key={key} />;
	}
	return (
		<View>
			<List between data={products} rows={2} renderItem={renderItem} />
		</View>
	);
}
