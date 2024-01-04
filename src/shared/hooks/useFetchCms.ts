import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchCms = () => {
	const [cmsList, setCmsList] = useState([]);

	useEffect(() => {
		const cmsRef = firestore().collection('cms');

		const unsubscribe = cmsRef.onSnapshot((snapshot) => {
			const updatedCmsList = snapshot.docs
				.filter((doc) => doc.data().publish === true)
				.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
			console.log(updatedCmsList.length);
			setCmsList(updatedCmsList);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return cmsList;
};

export default useFetchCms;
