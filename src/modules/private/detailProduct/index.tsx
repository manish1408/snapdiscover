import React, { useEffect, useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import { Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { _styles } from './styles';
import Header from './components/header';
import useDarkMode from '@/shared/hooks/useDarkMode';
import Typography from '@/shared/components/typography';
import Icon from '@/shared/components/icon';
import { star, shippingCart, shoppingBag } from '@/shared/assets/icons';
import { comment, share, starYellowFilled } from '@/shared/assets/icons-8';
import Counter from '@/shared/components/counter';
import { currencyType } from '@/shared/constants/global';
import { Button } from '@/shared/components/buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';
import RelatedProduct from './components/relatedProduct';
import { ProductCarousel } from './components/productCarousel';
import Share from 'react-native-share';
import { MOCKUP_PRODUCTS } from '@/db';
import firestore from '@react-native-firebase/firestore';
import useFetchCollectionDetails from '@/shared/hooks/useFetchCollectionDetails';
import { normalize } from '@/shared/helpers';
import AddCommentSection from './components/addCommentSection';

export default function DetailProduct() {
	const { navigate } = useNavigation<NavigationProps>();
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);
	const route = useRoute();

	const productId = route?.params?.id;
	const { data: product, loading } = useFetchCollectionDetails(productId, 'products');
	const [deepLink, setDeepLink] = useState({});

	useEffect(() => {
		createDeepLink();
	}, []);

	function createDeepLink() {
		setDeepLink(`https://www.snapztest.com/detailProduct/${productId}`);
	}
	async function shareOnSocial(platform) {
		try {
			const shareOptions = {
				url: deepLink,
				social: Share.Social[platform],
			};
			console.log(shareOptions);
			await Share.shareSingle(shareOptions);
		} catch (error) {
			console.error(error);
		}
	}

	const shareOnInstagram = async () => {
		try {
			const isInstagramInstalledAndroid = await Share.isPackageInstalled('com.instagram.android');
			const isInstagramInstalledIOS = await Linking.canOpenURL('instagram://user?username=instagram');
			if (isInstagramInstalledAndroid.isInstalled || isInstagramInstalledIOS) {
				const shareOptions = {
					url: deepLink,
					social: Share.Social.INSTAGRAM,
					type: 'text/plain',
				};

				const shareResult = await Share.shareSingle(shareOptions);
				console.log(shareResult);
			} else {
				const instagramAppUrl =
					Platform.OS === 'android'
						? 'https://play.google.com/store/apps/details?id=com.instagram.android'
						: 'https://apps.apple.com/us/app/instagram/id389801252';

				await Linking.openURL(instagramAppUrl);
			}
		} catch (error) {
			console.error(error);
		}
	};

	async function onShare() {
		try {
			const shareResponse = await Share.open({ title: product.name, message: product.description, url: deepLink });
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Wrapper loading={loading}>
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				<Header title={product?.title} />
				<View style={styles.containerImage}>
					{/* <Image resizeMode="contain" style={styles.image} source={product?.image} /> */}
					<ProductCarousel images={product?.images} />
				</View>
				<View style={styles.containerName}>
					<Typography style={styles.name} translate={false}>
						{product?.title}
					</Typography>
					<TouchableOpacity onPress={() => onShare()}>
						<Icon icon={share} />
					</TouchableOpacity>
				</View>
				<View style={styles.containerCantSold}>
					<View style={styles.sold}>
						<Typography translate={false}>{product?.additionalInfo?.breweryInfo?.name}</Typography>
						<View style={styles.space} />
					</View>
					<View style={styles.separator} />
					{/*
					<View style={styles.row}>
						<Icon customStyles={styles.sizeStar} icon={starYellowFilled} />
						<View style={styles.space} />
						<View style={styles.space} />
						<Typography translate={false}>{product?.rating}</Typography>
						<View style={styles.space} />
						<Typography translate={false}> ({product?.totalRatings}</Typography>
						<View style={styles.space} />
						<Typography> Ratings)</Typography>
					</View> */}
					<TouchableOpacity style={styles.row} onPress={() => navigate('reviews', { productId })}>
						<Icon customStyles={styles.sizeStar} icon={comment} />
						<View style={styles.space} />
						<View style={styles.space} />
						<Typography> Comment</Typography>
						<View style={styles.space} />
					</TouchableOpacity>
				</View>
				{/* {renderRatings(product?.ratings)} */}

				{product?.ratings && Object.keys(product?.ratings).length > 0 && (
					<View style={styles.containerDescription}>
						<Typography style={styles.descriptionTitle}>Ratings</Typography>
						{Object.keys(product?.ratings).map((source) => {
							const data = product?.ratings[source];
							return (
								<View key={source} style={styles.containerName}>
									<View style={{ flex: 1 }}>
										<Typography style={styles.source}>{source}</Typography>
									</View>
									<View style={{ flex: 1 }}>
										<Typography style={styles.rating} translate={false}>
											{data.averageRating}/5
										</Typography>
										<Typography style={styles.rating} translate={false}>
											{data.totalRatings} ratings
										</Typography>
									</View>
								</View>
							);
						})}
					</View>
				)}
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Taste Profile</Typography>
					<View style={styles.containerName}>
						<View>
							<Typography translate={false}>Bitterness</Typography>
							<Typography style={styles.valueVariant} translate={false}>
								{product?.tasteProfile?.bitterness}/5
							</Typography>
						</View>
						<View>
							<Typography translate={false}>Sweetness</Typography>
							<Typography style={styles.valueVariant} translate={false}>
								{product?.tasteProfile?.sweetness}/5
							</Typography>
						</View>
						<View>
							<Typography translate={false}>Citrus</Typography>
							<Typography style={styles.valueVariant} translate={false}>
								{product?.tasteProfile?.citrus}/5
							</Typography>
						</View>
					</View>

					<View style={styles.containerName}>
						<View style={{ flex: 1 }}>
							<Typography>Flavour Notes</Typography>
						</View>
						<Typography style={styles.flavour} translate={false}>
							{product?.tasteProfile?.flavourNotes}
						</Typography>
						{/* <View style={{ flex: 1 }}>
							{product?.flavourNotes?.map((chunk, idx) => (
								<Typography key={idx} style={styles.flavour} translate={false}>
									{chunk}
								</Typography>
							))}
						</View> */}
					</View>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>{'general.description'}</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.about}
					</Typography>
				</View>

				<View style={styles.containerName}>
					<View>
						<Typography translate={false}>ABV</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.beerDetails?.abv}%
						</Typography>
					</View>
					<View>
						<Typography translate={false}>IBU</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.beerDetails?.ibu}%
						</Typography>
					</View>
					<View>
						<Typography translate={false}>Ingredients</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.beerDetails?.ingredients?.join(', ')}
						</Typography>
						{/* <Typography style={styles.valueVariant} translate={false}>
							{product?.ingredients?.join(', ')}
						</Typography> */}
					</View>
				</View>
				{/* <View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>User Reviews</Typography>
					{product?.reviews?.map((chunk, idx) => (
						<Typography key={idx} style={styles.review} translate={false}>
							"{chunk.comment}" - {chunk.user}
						</Typography>
					))}
				</View> */}
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Food Pairing</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.additionalInfo?.foodPairing?.join(', ')}
					</Typography>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Servings Suggestions</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.additionalInfo?.servingSuggestions}
					</Typography>
				</View>
				{/* <View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Related Products</Typography>
					<RelatedProduct />
				</View> */}

				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Share this with friends</Typography>
					<View style={styles.containerSocial}>
						<TouchableOpacity onPress={() => shareOnSocial('FACEBOOK')}>
							<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/facebook.png')} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => shareOnSocial('WHATSAPP')}>
							<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/whatsapp.png')} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => shareOnInstagram()}>
							<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/insta.png')} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => shareOnSocial('TWITTER')}>
							<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/twitter.png')} />
						</TouchableOpacity>
					</View>
				</View>

				{product?.additionalInfo?.breweryInfo && Object.keys(product?.additionalInfo?.breweryInfo).length > 0 && (
					<View style={styles.containerDescription}>
						<Typography style={styles.descriptionTitle}>Visit Brewery</Typography>

						<View style={styles.containerAddress}>
							<View style={{ width: '50%' }}>
								<Typography style={styles.source}>Address</Typography>
								<Typography style={styles.description} translate={false}>
									{product?.additionalInfo?.breweryInfo?.location}
								</Typography>
							</View>
							<View style={{ width: '50%' }}>
								<Typography style={styles.source}>Website</Typography>
								<Typography style={styles.description} translate={false}>
									{product?.additionalInfo?.breweryInfo?.websiteLink}
								</Typography>
							</View>
						</View>
					</View>
				)}
			</ScrollView>
		</Wrapper>
	);
}
