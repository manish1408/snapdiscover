import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import TitleAuth from '@/shared/components/titleAuth';
import Input from '@/shared/components/input';
import Icon from '@/shared/components/icon';
import { lock, mail } from '@/shared/assets/icons';
import { eyeOff, eye } from '@/shared/assets/icons-8';
import { Button } from '@/shared/components/buttons';
import Typography from '@/shared/components/typography';
import Wrapper from '@/shared/components/wrapper';
import CheckBox from '@/shared/components/checkbox';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { isValidEmail } from '@/shared/helpers';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { storeToken } from '@/shared/auth/authStorage';
import { NavigationProps } from '@/shared/interfaces/route-types';
import ShowHidePassword from '@/shared/components/showHidePassword';

export default function Login() {
	const navigation = useNavigation<NavigationProps>();
	console.log(navigation.navigate);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [isSigninInProgress, setIsSigninInProgress] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: '125902216495-aog8qqgos716iv4hkbrsaec245h38kps.apps.googleusercontent.com',
		});
	}, []);
	const signInWithEmail = async (): Promise<void> => {
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
			const userCredentials = await auth().signInWithEmailAndPassword(email, password);
			console.log(userCredentials);
			const userDocRef = firestore().collection('users').doc(userCredentials.user.uid);

			const userDocSnapshot = await userDocRef.get();

			if (userDocSnapshot.exists) {
				const loggedinUser = userDocSnapshot.data();
				console.log('Logged in User', loggedinUser);
			} else {
				console.log('User does not exist');
			}
			await storeToken(userCredentials.user.uid);
			// navigation.navigate('scan');
			setEmail('');
			setPassword('');
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			let cleanedErrorMessage = err.message.replace(/\[.*?\]/g, '').trim();
			setErrorMsg(cleanedErrorMessage);
			console.log(cleanedErrorMessage);
		}
	};
	const googleSignIn = async () => {
		setIsLoading(true);
		try {
			await GoogleSignin.hasPlayServices();
			await GoogleSignin.signOut();
			const userInfo = await GoogleSignin.signIn();
			// const { idToken } = await GoogleSignin.signIn();

			// Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

			// Sign-in the user with the credential
			auth().signInWithCredential(googleCredential);

			const userDocRef = firestore().collection('users').doc(userInfo.user.id);
			const userData = {
				uid: userInfo.user.id,
				...userInfo.user,
			};
			await userDocRef.set(userData);
			await storeToken(userInfo.user.id);
			// navigation.navigate('scan');
			setIsLoading(false);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
				setIsSigninInProgress(true);
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			}
			setIsLoading(false);
		}
	};
	const togglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	return (
		<Wrapper loading={isLoading}>
			<View style={styles.container}>
				<TitleAuth title={'auth.login.title'} />

				<View style={styles.form}>
					<View style={styles.formControl}>
						<Input
							leftIcon={<Icon icon={mail} />}
							label="general.email"
							placeholder="dev@soadtech.io"
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<Input
							leftIcon={<Icon icon={lock} />}
							rightIcon={<ShowHidePassword icon={isPasswordVisible ? eye : eyeOff} onIconPress={togglePassword} />}
							secureTextEntry={!isPasswordVisible}
							label="general.password"
							placeholder="general.typing_password"
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>

					<View style={styles.formControl}>
						<View style={styles.containerRemember}>
							<View style={styles.containerCheckbox}>
								<CheckBox onChange={() => {}} value={true} />
								<Typography style={styles.textRemember}>{'general.remember'}</Typography>
							</View>
							<TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
								<Typography style={styles.forgot}>{'auth.login.forgot_password'}</Typography>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<Text style={styles.error}>{errorMsg}</Text>
				<View style={styles.formControl}>
					<Button onPress={signInWithEmail} title={'auth.sign_in'} />
				</View>
				<View style={styles.formControl}>
					<Text style={styles.orText}>- OR -</Text>
					<GoogleSigninButton
						size={GoogleSigninButton.Size.Wide}
						color={GoogleSigninButton.Color.Dark}
						onPress={googleSignIn}
						disabled={isSigninInProgress}
						style={styles.googleBtnWrapper}
					/>
				</View>
			</View>
		</Wrapper>
	);
}
