import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { arrowBack } from '@/shared/assets/icons-8';
import { normalize } from '@/shared/helpers';
import ButtonSheet from '@/shared/components/buttonSheet';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import { Camera, CameraPermissionStatus, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import Icon from '@/shared/components/icon';
import { GrantPermission } from '@/shared/components/grantPermission';
import storage from '@react-native-firebase/storage';
import useFetchCollections from '@/shared/hooks/useFetchCollections';
import firestore from '@react-native-firebase/firestore';
import { createDocument, updateDocument } from '@/shared/helpers/firebaseHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/shared/hooks/userContext';
import { use } from 'i18next';
import { useAppState } from '@react-native-community/hooks';
import { useIsForeground } from '@/shared/hooks/useIsForeground';

export default function CameraScreen() {
	const [openModal, setOpenModal] = useState(false);
	const [found, setFound] = useState(false);
	const [ocrInProgress, setOCRInProgress] = useState(false);
	const { user, updateUser } = useUser();

	const [photo, setPhoto] = useState<any>('');
	const camera = useRef<Camera>(null);
	const device = useCameraDevice('back');

	useEffect(() => {
		requestCameraPermission();
	}, []);

	// Firebase
	const { data: keywords, loading } = useFetchCollections('searchKeywords');

	async function takePicture() {
		const img = await camera?.current?.takePhoto({ enableShutterSound: false });
		const uriPath = img?.path;
		console.log(uriPath);
		setPhoto(uriPath);
	}
	function toggleModal() {
		setOpenModal(!openModal);
	}

	const uploadImageToBucket = async () => {
		const timestamp = Date.now();
		const randomSuffix = Math.floor(Math.random() * 10000);
		const randomFilename = `image_${timestamp}_${randomSuffix}.jpg`;

		const referencePath = `ocr/${randomFilename}`;
		const reference = storage().ref(referencePath);
		const task = reference.putFile(photo);
		task.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		});

		setOpenModal(true);
		setOCRInProgress(true);
		task.then(async () => {
			console.log('Image uploaded to the bucket!');
		});

		await task;

		const imageUrl = await reference.getDownloadURL();

		processOCR(imageUrl);
	};

	const processOCR = async (imageUrl: any) => {
		console.log(imageUrl);
		fetch('https://api.edenai.run/v2/ocr/ocr', {
			method: 'POST',
			mode: 'same-origin',
			body: JSON.stringify({
				providers: 'google',
				file_url: imageUrl,
			}),
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjQ2YjkyMzctYTRlNy00YjI0LTkzMzEtZDFmYzllYWY4ZmI1IiwidHlwZSI6ImFwaV90b2tlbiJ9.juwh59zTrzcpEaJzAyleZ8gfXIcEXDW3sokxAiPbHBI',
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((ocrResult: any) => {
				if (ocrResult && ocrResult.google) {
					searchForProducts(ocrResult.google.text, imageUrl);
				} else {
					setFound(false);
				}
			});
	};

	const getData = async (item: any) => {
		try {
			console.log(item);
			let searchQuery = item.toLowerCase();
			const result = await firestore().collection('products').where('keyword1', '==', searchQuery).get();
			return result;
		} catch (err) {
			throw err;
		}
	};
	const searchForProducts = async (inputFromOCR: string, imageUrl: string) => {
		console.log('searching for products', inputFromOCR);
		const qualifiedKeywords: any[] = [];
		keywords.forEach((element) => {
			if (inputFromOCR.toLowerCase().includes(element.key.toLowerCase())) {
				if (element.key !== '' && element.key.length > 1) {
					qualifiedKeywords.push(element.key);
				}
			}
		});

		console.log('qualifiedKeywords', qualifiedKeywords);

		const outputList: any[] = [];
		const promises = [];

		for (var i = 0; i < qualifiedKeywords.length; i++) {
			const element = qualifiedKeywords[i];
			promises.push(getData(element));
		}

		const result = await Promise.all(promises);
		result.forEach((r) => {
			if (r.empty) {
				setFound(false);
			} else {
				r.forEach((doc) => {
					outputList.push(doc.data());
				});
				if (outputList.length > 0) {
					setFound(true);
					setOCRInProgress(false);
					setOpenModal(false);

					console.log('Product us matched ', outputList);
					navigateTo(outputList);

					// delete the already found file
					const reference = storage().refFromURL(imageUrl);
					reference.delete();
				} else {
					setFound(false);
				}
			}
		});

		console.log('Found value is ', found);

		if (!found) {
			setOCRInProgress(false);
			setOpenModal(true);
			insertNotFoundtoDB(inputFromOCR, imageUrl);
		}
	};

	const insertNotFoundtoDB = async (inputFromOCR: string, cameraImage: string) => {
		const data = {
			inputFromOCR: inputFromOCR,
			cameraImage: cameraImage,
			isReviewed: false,
		};
		await createDocument('unidentifiedScans', data);
	};

	const navigation = useNavigation<NavigationProps>();

	async function navigateTo(foundProducts: any) {
		console.log('foundProducts', foundProducts);
		const product = foundProducts[0];

		setPhoto(null);
		navigation.navigate('detailProduct', { id: product.id });

		// push the result to users scan list
		const userString = (await AsyncStorage.getItem('user')) ?? '';
		const user = JSON.parse(userString);

		const userRef = firestore().collection('users').doc(user.uid);
		const userDoc = await userRef.get();
		if (userDoc.exists) {
			const currentScans = userDoc?.data().userScans || [];

			const isProductInScans = currentScans.includes(product.id);
			if (isProductInScans) {
				const updatedScans = currentScans.filter((id) => id !== product.id);
				await userRef.update({ userScans: updatedScans });
				updateUser({ ...userDoc.data(), userScans: updatedScans });
			} else {
				const updatedScans = [...currentScans, product.id];
				await userRef.update({ userScans: updatedScans });
				updateUser({ ...userDoc.data(), userScans: updatedScans });
			}
		} else {
			console.error('User document not found');
		}
	}

	const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
	const [display, setDisplay] = useState<boolean | null>(null);

	const requestCameraPermission = async () => {
		console.log('Requesting camera permission...');
		const permission = await Camera.requestCameraPermission();
		console.log(`Camera permission status: ${permission}`);

		if (permission === 'denied') await Linking.openSettings();
		setCameraPermissionStatus(permission);
	};

	useEffect(() => {
		if (cameraPermissionStatus === 'granted') {
			setDisplay(true);
		} else {
			setDisplay(false);
		}
	}, [cameraPermissionStatus]);

	const onCameraInitialized = useCallback(() => console.log('camera initialized'), []);
	const isFocused = useIsFocused();
	const isForeground = useIsForeground();
	const cameraActive = isFocused && isForeground;

	return cameraPermissionStatus === 'granted' ? (
		<View style={{ flex: 1 }}>
			{photo ? (
				<>
					<Image source={{ uri: 'file://' + photo }} style={{ width: '100%', height: '100%' }} />
					<View style={styles.imgBtnWrapper}>
						<TouchableOpacity style={styles.imgBtn} onPress={() => uploadImageToBucket()}>
							<Text style={{ color: '#000000' }}>Confirm</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.imgBtn}
							onPress={() => {
								setPhoto(null);
							}}
						>
							<Text style={{ color: '#000000' }}>Retake Photo</Text>
						</TouchableOpacity>
					</View>
					<ButtonSheet dispatch={openModal}>
						<View style={{ padding: normalize(24), height: '70%' }}>
							<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Typography
									style={{
										fontWeight: '700',
										fontSize: normalize(24),
										marginLeft: normalize(10),
									}}
								>
									Scan result
								</Typography>
							</TouchableOpacity>

							{!found && !ocrInProgress && (
								<View
									style={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										alignSelf: 'center',
										gap: 20,
									}}
								>
									<Typography
										style={{
											fontWeight: '700',
											fontSize: 16,
											alignItems: 'center',
											textAlign: 'center',
										}}
									>
										We were not able to identify the product. Ensure that the corners of the product is in the picture and keep and eye on the
										lightning.
									</Typography>

									<TouchableOpacity
										style={styles.imgBtn}
										onPress={() => {
											toggleModal();
											setPhoto(null);
										}}
									>
										<Text style={{ color: '#000000' }}>Retake Photo</Text>
									</TouchableOpacity>
								</View>
							)}

							{ocrInProgress && (
								<>
									<View
										style={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											alignSelf: 'center',
										}}
									>
										<Typography
											style={{
												fontWeight: '700',
												fontSize: 16,
												marginLeft: normalize(10),
											}}
										>
											Just a moment!
										</Typography>
										<Typography
											style={{
												fontWeight: '700',
												fontSize: 16,
												marginLeft: normalize(10),
											}}
										>
											Fetching from all our products
										</Typography>
									</View>
									<ActivityIndicator />
								</>
							)}
						</View>
					</ButtonSheet>
				</>
			) : (
				<>
					<Camera
						ref={camera}
						device={device}
						isActive={cameraActive}
						photo={true}
						style={StyleSheet.absoluteFill}
						onInitialized={onCameraInitialized}
					/>
					<TouchableOpacity
						style={styles.capture}
						onPress={() => {
							takePicture();
						}}
					></TouchableOpacity>
				</>
			)}
		</View>
	) : cameraPermissionStatus === 'denied' || cameraPermissionStatus === 'restricted' ? (
		<GrantPermission desc="Please grant camera permission to continue" handleRetryPermission={requestCameraPermission} />
	) : (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator />
		</View>
	);
}
