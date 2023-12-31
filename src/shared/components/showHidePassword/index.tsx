import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { _styles } from './styles';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import useDarkMode from '@/shared/hooks/useDarkMode';

interface IconProps {
	icon: ImageSourcePropType;
	width?: number | undefined;
	height?: number | undefined;
	customStyles?: StyleProp<ImageStyle> | undefined;
	onIconPress?: () => void;
}

export default function ShowHidePassword({ icon, width, height, customStyles, onIconPress }: IconProps) {
	const { isDarkMode } = useDarkMode();
	const styles = _styles({ width, height, isDarkMode });

	return (
		<TouchableOpacity onPress={() => onIconPress()}>
			<Image style={[styles.icon, customStyles]} source={icon} />
		</TouchableOpacity>
	);
}
