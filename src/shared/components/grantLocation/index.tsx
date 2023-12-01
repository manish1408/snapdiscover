import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Typography from '../typography';
import { styles } from './styles';
export const GrantLocation = ({ handleRetryPermission }) => {
	return (
		<View style={styles.container}>
			<Typography style={styles.text}>Please grant location permission to continue</Typography>
			<TouchableOpacity style={styles.grantBtnWrapper} onPress={handleRetryPermission}>
				<Text style={styles.grantBtn}>Grant Permission</Text>
			</TouchableOpacity>
		</View>
	);
};
