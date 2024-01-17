import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchCollections = (collection: any) => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await firestore().collection(collection).get();

				if (!querySnapshot.empty) {
					const productsData = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));

					setData(productsData);
				} else {
					// console.log(`No documents found in the ${collection} collection.`);
				}
			} catch (error) {
				console.error(`Error fetching ${collection}  data:`, error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading };
};

export default useFetchCollections;
