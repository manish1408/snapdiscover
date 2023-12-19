import { arrowBack, dots, eyeFilled, notification, order, security, vocher, walletFilled } from '@/shared/assets/icons';
import { user, terms, privacy, help, location, language, edit, arrowRight, userFIlled, logout } from '@/shared/assets/icons-8';
import Icon from '@/shared/components/icon';
import Typography from '@/shared/components/typography';
import Wrapper from '@/shared/components/wrapper';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import Section from './components/section';
import Toggle from '@/shared/components/toggle';

import { styles } from './styles';
import { normalize } from '@/shared/helpers';
import { NavigationProps } from '@/shared/routes/stack';
import { useNavigation } from '@react-navigation/native';
import ButtonSheet from '@/shared/components/buttonSheet';
import ListOptionCard, { OptionCardOptions } from '@/shared/components/ListOptionCard';
import { Button } from '@/shared/components/buttons';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { getToken, removeToken } from '@/shared/auth/authStorage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
	const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
	const { navigate } = useNavigation<NavigationProps>();

	const [openModal, setOpenModal] = useState(false);
	const [addressSelected, setAddressSelected] = useState<OptionCardOptions>();
	const { isDarkMode, changeColorScheme } = useDarkMode();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [user, setUser] = useState(null);

	useEffect(() => {
		// fetchUserData();
	}, []);

	const fetchUserData = async () => {
		setIsLoading(true);
		const token = await getToken();

		if (token) {
			try {
				const userDoc = await firestore().collection('users').doc(token).get();
				console.log(userDoc);
				if (userDoc.exists) {
					const userData = userDoc.data();
					setUser(userData);
				} else {
					console.warn('User document not found in Firestore');
				}
			} catch (err) {}
		} else {
			setUser(null);
		}
		setIsLoading(false);
	};
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
			// await removeToken();
			// navigate('welcome');
			auth()
				.signOut()
				.then(() => console.log('User signed out!'));
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};
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
						{/* <Image style={styles.image} source={{ uri: user?.photo ? user?.photo : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }} /> */}
						<View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
							{/* <Typography style={{ fontWeight: '700', fontSize: 16 }}>{user?.fullName || user?.name}</Typography> */}
							{/* <Typography style={{ fontWeight: '500', fontSize: 14 }}>{user?.email}</Typography> */}
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
							name: 'profile.address',
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
					elements={[
						{
							name: 'profile.help_center',
							leftIcon: <Icon icon={help} />,
							onPress: () => navigate('chats'),
						},
						{
							name: 'Terms of Service',
							leftIcon: <Icon icon={terms} />,
							onPress: () => navigate('terms'),
						},
						{
							name: 'Privacy',
							leftIcon: <Icon icon={privacy} />,
							onPress: () => navigate('privacy'),
						},
					]}
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
								{'general.address'}
							</Typography>
						</TouchableOpacity>

						<ListOptionCard
							value={addressSelected}
							onChange={onSelectAddress}
							options={[
								{
									id: '1',
									icon: location,
									title: 'Home',
									description: 'Snow Street, San Francisco, California 42343',
									active: false,
								},
								{
									id: '2',
									icon: location,
									title: 'Parent House',
									description: 'Snow Street, San Francisco, California 423433123',
									active: false,
								},
							]}
						/>

						<Button onPress={navigateToNewAddress} title="Add New Address" />
					</View>
				</ButtonSheet>
			</View>
		</Wrapper>
	);
};

export default Profile;
