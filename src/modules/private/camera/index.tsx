import React, { useEffect, useState, useRef, useCallback } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';
import { shoppingBag } from '@/shared/assets/icons';
import { scan, arrowBack } from '@/shared/assets/icons-8';
import CardProductHorizontal from '@/shared/components/cardProductHorizontal';
import List from '@/shared/components/list';
import { Button, ButtonOutline } from '@/shared/components/buttons';
import { normalize } from '@/shared/helpers';
import ButtonSheet from '@/shared/components/buttonSheet';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import { MOCKUP_PRODUCTS } from '@/db/index';
import { Camera, CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';
import Icon from '@/shared/components/icon';
import { GrantPermission } from '@/shared/components/grantPermission';

export default function CameraScreen() {
	const [openModal, setOpenModal] = useState(false);
	const [found, setFound] = useState(false);
	const [upload, setUpload] = useState(false);
	const [photo, setPhoto] = useState<string | null>(null);
	const camera = useRef<Camera>(null);
	const device = useCameraDevice('back') || null;
	useEffect(() => {
		// getPermission();
		requestCameraPermission();
		setPhoto(null);
	}, []);
	async function getPermission() {
		const cameraPermission = await Camera.requestCameraPermission();
		const microphonePermission = await Camera.requestCameraPermission();
		console.log(cameraPermission);
	}
	async function takePicture() {
		const img = await camera?.current?.takePhoto({ enableShutterSound: false });

		setPhoto(img?.path || null);
	}
	function toggleModal() {
		setOpenModal(!openModal);
	}

	function uploadPhoto() {
		setOpenModal(true);
		setUpload(true);
		setTimeout(() => {
			setUpload(false);
			let isFound = true;
			if (isFound) {
				setFound(isFound);
				navigateTo();
			}
		}, 2000);
	}

	const navigation = useNavigation<NavigationProps>();

	function navigateTo() {
		const product = MOCKUP_PRODUCTS[0];
		console.log(product);
		navigation.navigate('detailProduct', { ...product });
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

	return cameraPermissionStatus === 'granted' ? (
		<View style={{ flex: 1 }}>
			{photo ? (
				<>
					<Image source={{ uri: 'file://' + photo }} style={{ width: '100%', height: '100%' }} />
					<View style={styles.imgBtnWrapper}>
						<TouchableOpacity style={styles.imgBtn} onPress={() => uploadPhoto()}>
							<Text style={{ color: '#000000' }}>Upload Photo</Text>
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
							<TouchableOpacity onPress={toggleModal} style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon icon={arrowBack} />
								<Typography
									style={{
										fontWeight: '700',
										fontSize: normalize(24),
										marginLeft: normalize(10),
									}}
								>
									Upload Photo
								</Typography>
							</TouchableOpacity>

							{upload && (
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
							{!found && !upload && (
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
										We were not able to identify it. Ensure that the corners of the product is in the picture and keep and eye on the lightning.
									</Typography>

									<TouchableOpacity style={styles.imgBtn} onPress={() => uploadPhoto()}>
										<Text style={{ color: '#000000' }}>Upload Photo</Text>
									</TouchableOpacity>
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
							{found && !upload && (
								<View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
									<Typography
										style={{
											fontWeight: '700',
											fontSize: 24,
											alignItems: 'center',
											textAlign: 'center',
										}}
									>
										Bingo.
									</Typography>
									<Typography
										style={{
											fontWeight: '700',
											fontSize: 16,
											alignItems: 'center',
											textAlign: 'center',
										}}
									>
										We found a match redirecting you for the insights.
									</Typography>
								</View>
							)}
						</View>
					</ButtonSheet>
				</>
			) : (
				<>
					<Camera ref={camera} device={device} isActive={true} photo={true} style={StyleSheet.absoluteFill} />
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
