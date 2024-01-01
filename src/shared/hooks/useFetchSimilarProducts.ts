import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchSimilarProducts = (similarProducts: string[]) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsCollection = await Promise.all(
					similarProducts.map(async (productId: any) => {
						const productDoc = await firestore().collection('products').doc(productId).get();
						return { ...productDoc.data(), id: productId };
					}),
				);
				setProducts(productsCollection);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
	}, [similarProducts]);

	return products;
};

export default useFetchSimilarProducts;
