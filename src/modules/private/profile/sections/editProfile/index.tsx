import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Wrapper from '@/shared/components/wrapper';
import HeaderWithIcon from '@/shared/components/headerBack';
import Icon from '@/shared/components/icon';
import { edit } from '@/shared/assets/icons';
import Input from '@/shared/components/input';
import { Button } from '@/shared/components/buttons';
import { _styles } from './styles';
import Header from '../../components/header';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import { normalize } from '@/shared/helpers';

import { useUser } from '@/shared/hooks/userContext';
import showToast from '@/shared/helpers/showToast';
const EditProfile = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [photoURL, setPhotoURL] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [gender, setGender] = useState('');
	const [about, setAbout] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [source, setSource] = useState(null);
	const { user, updateUser } = useUser();
	useEffect(() => {
		setCurrentUser(user);
		setFullName(user?.fullName || '');
		setPhone(user?.phone || '');
		setEmail(user?.email || '');
		setGender(user?.gender || '');
		setAbout(user?.about || '');
		setPhotoURL(user?.photoURL);
	}, []);

	const uploadImage = async () => {
		try {
			const options = {
				title: 'Select Image',
			};

			launchImageLibrary(options, async (res) => {
				if (!res.didCancel && !res.error) {
					const imgSource = res.assets[0];
					setSource(imgSource);
					setPhotoURL(imgSource.uri);
				}
			});
		} catch (error) {
			console.error('Error selecting/uploading image:', error);
		}
	};
	const handleSubmit = async () => {
		try {
			if (fullName.trim() === '') {
				setErrorMsg('Full name is required');
				setLoading(false);
				return;
			}

			if (phone === '') {
				setErrorMsg('Phone is required');
				setLoading(false);
				return;
			}
			if (gender === '') {
				setErrorMsg('Gender is required');
				setLoading(false);
				return;
			}
			if (about === '') {
				setErrorMsg('About is required');
				setLoading(false);
				return;
			}
			setErrorMsg('');
			setLoading(true);
			let reqObj: any = {
				fullName,
				email,
				phone,
				gender,
				about,
			};
			if (source) {
				const { uri, type, fileSize } = source;

				if (type !== 'image/jpeg' && type !== 'image/png') {
					console.log('Invalid image format');
					return;
				}

				// Validate image size allow images up to 5MB)
				const maxSizeInBytes = 5 * 1024 * 1024;
				if (fileSize > maxSizeInBytes) {
					console.log('Image size exceeds the limit');
					return;
				}

				const timestamp = Date.now();
				const randomSuffix = Math.floor(Math.random() * 10000);
				const extension = type === 'image/jpeg' ? 'jpg' : 'png';
				const randomFilename = `image_${timestamp}_${randomSuffix}.${extension}`;

				const referencePath = `profile/${randomFilename}`;
				const reference = storage().ref(referencePath);
				const task = reference.putFile(uri);
				task.on('state_changed', (snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);
				});

				task.then(async () => {
					console.log('Image uploaded to the bucket!');
				});

				await task;
				const imageUrl = await reference.getDownloadURL();
				reqObj.photoURL = imageUrl;
			}
			await firestore().collection('users').doc(currentUser.uid).update(reqObj);
			const res = await firestore().collection('users').doc(currentUser.uid).get();
			updateUser(res.data());
			showToast('Profile saved', { type: 'success' });
			setLoading(false);
		} catch (error) {
			console.error('Error updating profile:', error.message);

			setLoading(false);
		}
	};

	return (
		<Wrapper>
			<View style={_styles.container}>
				<Header title="Edit Profile" />
				<View style={_styles.imageContainer}>
					<Image style={_styles.image} source={{ uri: photoURL ? photoURL : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }} />
					<TouchableOpacity style={_styles.editImage} onPress={() => uploadImage()}>
						<Icon icon={edit} />
					</TouchableOpacity>
				</View>
				<View style={_styles.formContainer}>
					<Input label="Full Name" value={fullName} onChangeText={setFullName} />
					<Input label="Email" value={email} onChangeText={setEmail} editable={false} />
					<Input label="Phone" value={phone} onChangeText={setPhone} />
					<Input label="Gender" value={gender} onChangeText={setGender} />
					<Input label="About" value={about} onChangeText={setAbout} />
				</View>
				<Text style={_styles.error}>{errorMsg}</Text>
				<Button disabled={loading} loading={loading} title="Submit" onPress={() => handleSubmit()} style={{ paddingBottom: normalize(16) }} />
			</View>
		</Wrapper>
	);
};

export default EditProfile;
