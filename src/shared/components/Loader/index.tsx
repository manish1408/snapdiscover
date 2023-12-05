import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Typography from '../typography';
import { styles } from './styles';
export const Loader = () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator />
		</View>
	);
};
