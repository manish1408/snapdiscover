import { arrowBack, dots, eyeFilled, notification, order, security, vocher, walletFilled } from '@/shared/assets/icons';
import { user, terms, privacy, help, location, language, edit, arrowRight, userFIlled, logout } from '@/shared/assets/icons-8';
import Icon from '@/shared/components/icon';
import Typography from '@/shared/components/typography';
import Wrapper from '@/shared/components/wrapper';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Alert, Text } from 'react-native';
import Section from './components/section';
import Toggle from '@/shared/components/toggle';

import { styles } from './styles';
import { normalize } from '@/shared/helpers';
import { NavigationProps } from '@/shared/routes/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonSheet from '@/shared/components/buttonSheet';
import ListOptionCard, { OptionCardOptions } from '@/shared/components/ListOptionCard';
import { Button } from '@/shared/components/buttons';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { getUser, removeUser } from '@/shared/auth/authStorage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '@/shared/hooks/userContext';
import useFetchCms from '@/shared/hooks/useFetchCms';
import NewAddress from './sections/newAddress';
import Input from '@/shared/components/input';
import showToast from '@/shared/helpers/showToast';

const Profile = () => {
	const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
	const { navigate } = useNavigation<NavigationProps>();
	const route = useRoute();
	const [openModal, setOpenModal] = useState(false);
	const [addressSelected, setAddressSelected] = useState<OptionCardOptions>();
	const { isDarkMode, changeColorScheme } = useDarkMode();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { user, clearUser, updateUser } = useUser();
	const cmsList = useFetchCms();
	const [country, setCountry] = useState(user?.location && user?.location?.country ? user.location.country : '');
	const [region, setRegion] = useState(user?.location && user?.location?.region ? user.location.region : '');
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [loading, setLoading] = useState(false);

	function onSelectAddress(option: OptionCardOptions) {
		setAddressSelected(option);
	}
	function toggleModal() {
		setOpenModal(!openModal);
	}

	function navigateToNewAddress() {
		toggleModal();
		navigate('addNewAddress');
	}

	const onSignOutPress = () => {
		Alert.alert(
			'Sign Out',
			'Are you sure you want to sign out?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Sign Out',
					onPress: () => signOut(),
					style: 'destructive',
				},
			],
			{ cancelable: true },
		);
	};
	const signOut = async () => {
		try {
			clearUser();
			await auth().signOut();
			// console.log('User signed out!');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};
	const cmsElement = cmsList.map((cms) => {
		return {
			name: cms?.pageTitle,
			leftIcon: <Icon icon={terms} />,
			onPress: () => navigateToCMS(cms),
		};
	});
	function navigateToCMS(data: any) {
		navigate('cms', { data });
	}
	async function onAddLocation() {
		try {
			if (country.trim() === '') {
				setErrorMsg('Country is required');
				setLoading(false);
				return;
			}
			if (region.trim() === '') {
				setErrorMsg('Region is required');
				setLoading(false);
				return;
			}
			setLoading(true);
			setErrorMsg('');
			const userRef = firestore().collection('users').doc(user.uid);

			const userDoc = await userRef.get();
			if (!userDoc.exists) {
				throw new Error('User not found');
			}
			// Update the user object with country and region
			const updatedUser = {
				...userDoc.data(),
				location: {
					country: country,
					region: region,
				},
			};
			await userRef.update(updatedUser);
			updateUser(updatedUser);
			toggleModal();
			showToast('Success', { type: 'success' });
		} catch (error) {
			console.error('Error:', error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Wrapper loading={isLoading}>
			<View style={styles.container}>
				<View style={styles.profileText}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon icon={userFIlled} />
						<Typography
							style={{
								fontWeight: '700',
								fontSize: 24,
								marginLeft: normalize(10),
							}}
						>
							{'profile.title'}
						</Typography>
					</View>
				</View>

				<View style={styles.profileInfo}>
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<Image style={styles.image} source={{ uri: user?.photoURL ? user?.photoURL : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }} />
						<View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
							<Typography style={{ fontWeight: '700', fontSize: 16 }}>{user?.fullName || user?.name}</Typography>
							<Typography style={{ fontWeight: '500', fontSize: 14 }}>{user?.email}</Typography>
						</View>
					</View>
					<TouchableOpacity onPress={() => navigate('editProfile')}>
						<Icon icon={edit} />
					</TouchableOpacity>
				</View>

				{/* <Section
					title="profile.general"
					elements={[
						{
							name: 'profile.voucher',
							leftIcon: <Icon icon={vocher} />,
							onPress: () => navigate('vouchers'),
						},
					]}
				/> */}

				<Section
					title="profile.account_settings"
					elements={[
						{
							name: 'Location',
							leftIcon: <Icon icon={location} />,
							onPress: () => toggleModal(),
						},
						// {
						// 	name: 'profile.payment_method',
						// 	leftIcon: <Icon icon={walletFilled} />,
						// 	onPress: () => navigate('payments'),
						// },
						// {
						// 	name: 'profile.dark_mode',
						// 	leftIcon: <Icon icon={eyeFilled} />,
						// 	rightElement: (
						// 		<Toggle
						// 			isEnabled={toggleDarkMode || isDarkMode}
						// 			setIsEnabled={(newValue) => {
						// 				setToggleDarkMode(newValue);
						// 				changeColorScheme().catch();
						// 			}}
						// 		/>
						// 	),
						// },
						{
							name: 'profile.logout',
							leftIcon: <Icon icon={logout} />,
							onPress: () => {
								onSignOutPress();
							},
						},
					]}
				/>

				<Section
					title="profile.app_settings"
					elements={[
						{
							name: 'general.language',
							leftIcon: <Icon icon={language} />,
							onPress: () => navigate('language'),
						},
					]}
				/>

				<Section
					title="profile.support"
					elements={cmsElement}
					// elements={[
					// 	{
					// 		name: 'profile.help_center',
					// 		leftIcon: <Icon icon={help} />,
					// 		onPress: () => navigate('chats'),
					// 	},
					// 	{
					// 		name: 'Terms of Service',
					// 		leftIcon: <Icon icon={terms} />,
					// 		onPress: () => navigateToCMS({ cms: 'terms' }),
					// 	},
					// 	{
					// 		name: 'Privacy',
					// 		leftIcon: <Icon icon={privacy} />,
					// 		onPress: () => navigate('privacy'),
					// 	},
					// ]}
				/>

				<ButtonSheet dispatch={openModal}>
					<View style={{ padding: normalize(24) }}>
						<TouchableOpacity onPress={toggleModal} style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon icon={arrowBack} />
							<Typography
								style={{
									fontWeight: '700',
									fontSize: normalize(24),
									marginLeft: normalize(10),
								}}
							>
								Location
							</Typography>
						</TouchableOpacity>
						<View style={{ marginTop: normalize(24) }}>
							<View>
								<View style={{ marginBottom: normalize(24) }}>
									<Input label="Country" placeholder="Add country" value={country} onChangeText={setCountry} />
								</View>
								<View style={{ marginBottom: normalize(24) }}>
									<Input label="Region" placeholder="Add region" rightIcon={<Icon icon={location} />} value={region} onChangeText={setRegion} />
								</View>
							</View>
							<Text style={styles.error}>{errorMsg}</Text>
							<Button title="Add" onPress={() => onAddLocation()} disabled={loading} loading={loading} />
						</View>
					</View>
				</ButtonSheet>
			</View>
		</Wrapper>
	);
};

export default Profile;
