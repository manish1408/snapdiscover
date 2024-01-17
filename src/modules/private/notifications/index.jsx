import React, { useEffect, useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { ScrollView, View } from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';
import Typography from '@/shared/components/typography';

import { styles } from './styles';
import Notification from './components/notification';
import Header from './components/header';
import { getDocument } from '@/shared/helpers/firebaseHelper';

export default function Notifications() {
	const sections = [
		{
			id: 1,
			date: 'Today',
			notifications: [
				{
					description: 'Congratulation, you have successfully buy a plants  $25. Enjoy the services',
					title: 'Payment Success',
					state: 'payment',
				},
				{
					description: 'You can buy plants easily and we have a credit simulation to make the buying process easier.',
					title: 'New Service Available',
					state: 'new_service',
				},
			],
		},
		{
			id: 2,
			date: 'Yesterday',
			notifications: [
				{
					description: 'Your add new payment is successful, you can experience our service',
					title: 'Add Payment Complate',
					state: 'wallet',
				},
				{
					description: 'We a recommend a 5% discount for All Plant. ',
					title: 'Discount Available',
					state: 'promo',
				},
			],
		},
	];

	useEffect(() => {
		getNotifications();
	}, []);

	const [notificationData, setNotificationData] = useState(null);

	const getNotifications = async () => {
		try {
			const resp = await getDocument("notifications");
			setNotificationData(resp);
			// // console.log("Notification Data 🚨", resp)

		} catch (error) {
			// console.log(error);
		}
	}

	return (
		<Wrapper>
			<ScrollView style={styles.container}>
				{/* <HeaderWithIcon title={'general.notifications'} /> */}
				<Header title="Notifications" />
				<View style={styles.body}>

					{notificationData?.length > 0 && notificationData.map((notification) => (
						<Notification key={notification._id} notification={notification.data} />
					))}

				</View>
			</ScrollView>
		</Wrapper>
	);
}
