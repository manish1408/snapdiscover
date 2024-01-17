import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchCollectionDetails = (collectionId: string, collection: string) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const productDoc = await firestore().collection(collection).doc(collectionId).get();

				if (productDoc.exists) {
					setData({
						id: productDoc.id,
						...productDoc.data(),
					});
				} else {
					// console.log(`Data not found with ID:`, collectionId);
				}
			} catch (error) {
				console.error(`Error fetching ${collection} details:`, error);
			} finally {
				setLoading(false);
			}
		};

		if (collectionId) {
			fetchDetails();
		}
	}, [collectionId]);

	return { data, loading };
};

export default useFetchCollectionDetails;
