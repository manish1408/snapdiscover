import React, { useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import Typography from '@/shared/components/typography';
import Input from '@/shared/components/input';
import { Pressable, Text, View } from 'react-native';
import { Button } from '@/shared/components/buttons';
import { styles } from './styles';
import TitleAuth from '@/shared/components/titleAuth';
import Icon from '@/shared/components/icon';
import { lock, mail, user } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import { isValidEmail } from '@/shared/helpers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { eyeOff, eye } from '@/shared/assets/icons-8';
export default function CreateAccount() {
	const navigation = useNavigation<NavigationProps>();
	function navigateTo() {
		navigation.navigate('login');
	}
	const [fullName, setFullName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const handleSignUp = async (): Promise<void> => {
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
			const userData = {
				uid: userCredentials.user.uid,
				email: userCredentials.user.email,
				fullName,
			};
			const userDocRef = firestore().collection('users').doc(userCredentials.user.uid);
			await userDocRef.set(userData);
			setFullName('');
			setEmail('');
			setPassword('');
			setErrorMsg(' ');
			setIsLoading(false);
			navigateTo();
		} catch (err) {
			setIsLoading(false);
			let cleanedErrorMessage = err.message.replace(/\[.*?\]/g, '').trim();
			setErrorMsg(cleanedErrorMessage);
			console.log(cleanedErrorMessage);
		}
	};
	const togglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<Wrapper loading={isLoading}>
			<View style={styles.container}>
				<TitleAuth title={'auth.create_account.title'} />

				<View style={styles.form}>
					<View style={styles.formControl}>
						<Input
							leftIcon={<Icon icon={user} />}
							label="general.full_name"
							placeholder="general.typing_name"
							value={fullName}
							onChangeText={(text) => setFullName(text)}
						/>
					</View>
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
							rightIcon={<Icon icon={isPasswordVisible ? eye : eyeOff} onIconPress={togglePassword} />}
							secureTextEntry={!isPasswordVisible}
							label="general.password"
							placeholder="general.typing_password"
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
				</View>
				<Text style={styles.error}>{errorMsg}</Text>
				<View style={styles.formControl}>
					<Button onPress={() => handleSignUp()} title={'auth.sign_up'} />
				</View>
				<View style={styles.containerLink}>
					<Typography style={styles.alreadyAccount}>{'auth.create_account.already_account'}</Typography>
					<Pressable onPress={navigateTo}>
						<Typography style={styles.link}>{'auth.sign_in'}</Typography>
					</Pressable>
				</View>
			</View>
		</Wrapper>
	);
}
