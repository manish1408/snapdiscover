import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Typography from '../typography';
import { styles } from './styles';
export const GrantPermission = ({ desc, handleRetryPermission }) => {
	return (
		<View style={styles.container}>
			<Typography style={styles.text}>{desc}</Typography>
			<TouchableOpacity style={styles.grantBtnWrapper} onPress={handleRetryPermission}>
				<Text style={styles.grantBtn}>Grant Permission</Text>
			</TouchableOpacity>
		</View>
	);
};
