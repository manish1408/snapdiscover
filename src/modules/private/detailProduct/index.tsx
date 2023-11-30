import React from 'react';
import Wrapper from '@/shared/components/wrapper';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { _styles } from './styles';
import Header from './components/header';
import useDarkMode from '@/shared/hooks/useDarkMode';
import Typography from '@/shared/components/typography';
import Icon from '@/shared/components/icon';
import { star, shippingCart, shoppingBag } from '@/shared/assets/icons';
import { share, starFilled } from '@/shared/assets/icons-8';
import Counter from '@/shared/components/counter';
import { currencyType } from '@/shared/constants/global';
import { Button } from '@/shared/components/buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '@/shared/routes/stack';

export default function DetailProduct() {
	const { navigate } = useNavigation<NavigationProps>();
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);
	const route = useRoute();
	console.log(route.params);
	const product = { ...route.params };

	return (
		<Wrapper>
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				<Header title={product?.name} />
				<View style={styles.containerImage}>
					<Image resizeMode="contain" style={styles.image} source={product?.image} />
				</View>

				<View style={styles.containerName}>
					<Typography style={styles.name} translate={false}>
						{product?.name}
					</Typography>
					<TouchableOpacity>
						<Icon icon={share} />
					</TouchableOpacity>
				</View>

				<View style={styles.containerCantSold}>
					<View style={styles.sold}>
						<Typography translate={false}>{product?.soldBy}</Typography>
						<View style={styles.space} />
						{/* <Typography>Sold</Typography> */}
					</View>
					<View style={styles.separator} />
					<TouchableOpacity onPress={() => navigate('reviews')} style={styles.row}>
						<Icon customStyles={styles.sizeStar} icon={starFilled} />
						<View style={styles.space} />
						<View style={styles.space} />
						<Typography translate={false}>{product?.rating}</Typography>
						<View style={styles.space} />
						<Typography translate={false}> ({product?.totalRatings}</Typography>
						<View style={styles.space} />
						<Typography> Ratings)</Typography>
					</TouchableOpacity>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Ratings</Typography>
					{product?.ratingSource?.map((chunk, idx) => (
						<View key={idx} style={styles.containerName}>
							<View style={{ flex: 1 }}>
								<Typography style={styles.source}>{chunk.source}</Typography>
							</View>
							<View style={{ flex: 1 }}>
								<Typography style={styles.rating} translate={false}>
									{chunk.rating}/5
								</Typography>
								<Typography style={styles.rating} translate={false}>
									{chunk.totalRatings} ratings
								</Typography>
							</View>
						</View>
					))}
				</View>
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

						<View style={{ flex: 1 }}>
							{product?.flavourNotes?.map((chunk, idx) => (
								<Typography key={idx} style={styles.flavour} translate={false}>
									{chunk}
								</Typography>
							))}
						</View>
					</View>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>{'general.description'}</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.description}
					</Typography>
				</View>

				<View style={styles.containerName}>
					<View>
						<Typography translate={false}>ABV</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.abv}%
						</Typography>
					</View>
					<View>
						<Typography translate={false}>IBU</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.ibu}%
						</Typography>
					</View>
					<View>
						<Typography translate={false}>Ingredients</Typography>
						<Typography style={styles.valueVariant} translate={false}>
							{product?.ingredients?.join(', ')}
						</Typography>
					</View>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>User Reviews</Typography>
					{product?.reviews?.map((chunk, idx) => (
						<Typography key={idx} style={styles.review} translate={false}>
							"{chunk.comment}" - {chunk.user}
						</Typography>
					))}
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Food Pairing</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.foodPairing?.join(', ')}
					</Typography>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Servings Suggestions</Typography>

					<Typography style={styles.description} translate={false}>
						{product?.servingsSuggestions}
					</Typography>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Share this with friends</Typography>

					<View style={styles.containerSocial}>
						<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/facebook.png')} />
						<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/whatsapp.png')} />
						<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/insta.png')} />
						<Image resizeMode="contain" style={styles.socialImage} source={require('@/shared/assets/icons-8/twitter.png')} />
					</View>
				</View>
				<View style={styles.containerDescription}>
					<Typography style={styles.descriptionTitle}>Visit Brewery</Typography>

					<View style={styles.containerAddress}>
						<View style={{ width: '50%' }}>
							<Typography style={styles.source}>Address</Typography>
							<Typography style={styles.description} translate={false}>
								{product?.address}
							</Typography>
						</View>
						<View style={{ width: '50%' }}>
							<Typography style={styles.source}>Website</Typography>
							<Typography style={styles.description} translate={false}>
								{product?.website}
							</Typography>
						</View>
					</View>
				</View>

				{/* <View style={styles.containerName}>
					<View style={{ flex: 1 }}>
						<Typography style={styles.price}>{'general.price'}</Typography>
						<Typography style={styles.total} translate={false}>
							{currencyType} 20.00
						</Typography>
					</View>
					<View style={{ flex: 1 }}>
						<Button leftIcon={<Icon customStyles={{ tintColor: 'white' }} icon={shoppingBag} />} title={'general.buy_now'} />
					</View>
				</View> */}
			</ScrollView>
		</Wrapper>
	);
}
