import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import Typography from '@/shared/components/typography';
import Input from '@/shared/components/input';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/shared/components/buttons';
import { styles } from './styles';
import TitleAuth from '@/shared/components/titleAuth';
import Icon from '@/shared/components/icon';
import { lock, mail, user } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import { isValidEmail, normalize } from '@/shared/helpers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { eyeOff, eye, Globe, userFIlled, Envelope, Lock } from '@/shared/assets/icons-8';
import ShowHidePassword from '@/shared/components/showHidePassword';
import { useUser } from '@/shared/hooks/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDocument } from '@/shared/helpers/firebaseHelper';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { semantic } from '@/shared/constants/colors';
import RNPickerSelect from 'react-native-picker-select';
import * as RNLocalize from 'react-native-localize';
const dataSource = Array.from({ length: 43 }, (_, i) => (i + 18).toString());
export default function CreateAccount() {
	const { navigate } = useNavigation<NavigationProps>();

	const [fullName, setFullName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('');
	const [age, setAge] = useState(18);
	const { updateUser } = useUser();

	useEffect(() => {
		const getCountry = async () => {
			try {
				const localeCountry = RNLocalize.getCountry();
				console.log('localeCountry', localeCountry);
				setCountry(localeCountry);
			} catch (error) {
				console.error('Error detecting country:', error);
			}
		};

		getCountry();
	}, []);
	const handleSignUp = async (): Promise<void> => {
		console.log(age, gender, country);
		if (fullName.trim() === '') {
			setErrorMsg('Full name is required');
			setIsLoading(false);
			return;
		}
		if (email.trim() === '') {
			setErrorMsg('Email is required');
			setIsLoading(false);
			return;
		}
		if (!isValidEmail(email)) {
			setErrorMsg('Invalid email address');
			setIsLoading(false);
			return;
		}
		if (password === '') {
			setErrorMsg('Password is required');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		try {
			const userCredentials = await auth().createUserWithEmailAndPassword(email, password);

			const fcmtoken = (await AsyncStorage.getItem('fcmtoken')) ?? '';

			const userData = {
				uid: userCredentials.user.uid,
				email: userCredentials.user.email,
				fullName,
				age,
				gender,
				country,
				notificationKey: fcmtoken,
			};
			const userDocRef = firestore().collection('users').doc(userCredentials.user.uid);
			await userDocRef.set(userData);
			updateUser(userData);
			setFullName('');
			setEmail('');
			setPassword('');
			setErrorMsg(' ');
			setIsLoading(false);
			const resp = await deleteDocument('unregisteredUsers', fcmtoken);
		} catch (err: any) {
			setIsLoading(false);
			let cleanedErrorMessage = err.message.replace(/\[.*?\]/g, '').trim();
			setErrorMsg(cleanedErrorMessage);
			// console.log(cleanedErrorMessage);
		}
	};
	const togglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const ref = useRef();

	return (
		<Wrapper loading={isLoading}>
			<View style={styles.container}>
				<TitleAuth title={'auth.create_account.title'} />

				<View style={styles.form}>
					<View style={styles.formControl}>
						<Input
							leftIcon={<Icon icon={userFIlled} />}
							label="general.full_name"
							placeholder=""
							value={fullName}
							onChangeText={(text) => setFullName(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<Input leftIcon={<Icon icon={Envelope} />} label="general.email" placeholder="" value={email} onChangeText={(text) => setEmail(text)} />
					</View>
					<View style={styles.formControl}>
						<Input
							leftIcon={<Icon icon={Lock} />}
							rightIcon={<ShowHidePassword icon={isPasswordVisible ? eye : eyeOff} onIconPress={togglePassword} />}
							secureTextEntry={!isPasswordVisible}
							label="general.password"
							placeholder=""
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<Text
							style={{
								fontSize: normalize(16),
								fontWeight: '300',
								color: semantic.text.black,
								marginBottom: normalize(8),
							}}
						>
							Age
						</Text>
						<ScrollPicker
							ref={ref}
							dataSource={dataSource}
							selectedIndex={age}
							wrapperHeight={120}
							wrapperBackground={semantic.fill.f04}
							itemHeight={40}
							highlightColor={semantic.fill.f03}
							highlightBorderWidth={1}
							onValueChange={(value, index) => setAge(value)}
						/>
					</View>
					<View style={styles.formControl}>
						<Text
							style={{
								fontSize: normalize(16),
								fontWeight: '300',
								color: semantic.text.black,
								marginBottom: normalize(8),
							}}
						>
							Gender
						</Text>
						<RNPickerSelect
							onValueChange={(value) => setGender(value)}
							placeholder={{
								label: 'Select your gender',
								value: null,
								color: '#9EA0A4',
							}}
							items={[
								{ label: 'Male', value: 'male' },
								{ label: 'Female', value: 'female' },
								{ label: 'Wish not to respond', value: 'wishNotToRespond' },
							]}
							style={{
								inputIOS: {
									fontSize: normalize(16),
									paddingVertical: 12,
									paddingHorizontal: 10,
									borderWidth: 1,
									borderColor: 'gray',
									borderRadius: 4,
									color: semantic.text.black,
									paddingRight: 30,
								},
								inputAndroid: {
									fontSize: normalize(16),
									paddingHorizontal: 10,
									paddingVertical: 8,
									borderWidth: 0.5,
									borderColor: 'purple',
									borderRadius: 8,
									color: semantic.text.black,
									paddingRight: 30,
								},
								viewContainer: { backgroundColor: semantic.fill.f04, borderRadius: normalize(8) },
							}}
						/>
					</View>
					<View style={styles.formControl}>
						<Input leftIcon={<Icon icon={Globe} />} label="Country" placeholder="" value={country} editable={false} />
					</View>
				</View>
				<Text style={styles.error}>{errorMsg}</Text>
				<View style={styles.formControl}>
					<Button onPress={() => handleSignUp()} title={'auth.sign_up'} />
				</View>
				<View style={styles.containerLink}>
					<Typography style={styles.alreadyAccount}>{'auth.create_account.already_account'}</Typography>
					<Pressable onPress={() => navigate('login')}>
						<Typography style={styles.link}>{'auth.sign_in'}</Typography>
					</Pressable>
				</View>
			</View>
		</Wrapper>
	);
}
