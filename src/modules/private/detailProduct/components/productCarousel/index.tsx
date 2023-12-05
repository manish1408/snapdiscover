import React, { useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { _styles } from './styles';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { semantic } from '@/shared/constants/colors';
import Typography from '@/shared/components/typography';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { normalize } from '@/shared/helpers';
export const ProductCarousel = ({ images = [] }) => {
	const { isDarkMode } = useDarkMode();
	const styles = _styles(isDarkMode);
	const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
	const sliderWidth = Dimensions.get('window').width + 80;
	const itemWidth = Math.round(sliderWidth * 0.7);
	const isCarousel = useRef(null);
	// const images = [require('@/shared/assets/images/merlot-reserve.png'), require('@/shared/assets/images/budweiser.png')];

	const renderItem = ({ item, index }) => {
		return (
			<View style={styles.imgWrapper}>
				<Image style={styles.image} source={item} />
			</View>
		);
	};
	// const width = Dimensions.get('window').width;
	return (
		<View style={styles.wrapper}>
			<Carousel
				layout={'default'}
				ref={isCarousel}
				data={images}
				renderItem={renderItem}
				sliderWidth={sliderWidth}
				itemWidth={itemWidth}
				onSnapToItem={(index) => setSlider1ActiveSlide(index)}
				loop={true}
			/>
			<Pagination
				dotsLength={images.length}
				activeDotIndex={slider1ActiveSlide}
				containerStyle={styles.paginationContainer}
				dotColor={semantic.fill.f02}
				dotStyle={styles.paginationDot}
				inactiveDotColor={semantic.fill.f02}
				inactiveDotOpacity={0.5}
				inactiveDotScale={1}
				carouselRef={isCarousel}
				tappableDots={!!isCarousel}
			/>
		</View>
	);
};
