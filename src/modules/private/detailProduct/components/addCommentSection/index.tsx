import React, { useState } from 'react';
import { styles } from './styles';
import { Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import Input from '@/shared/components/input';
import { send } from '@/shared/assets/icons';
import Icon from '@/shared/components/icon';
import firestore from '@react-native-firebase/firestore'; // Assuming you're using @react-native-firebase
import auth from '@react-native-firebase/auth';
import { Comment, PostedBy } from '@/shared/interfaces/comments-interface';

const AddCommentSection = ({ productId, onAddComment }) => {
	const [comment, setComment] = useState<string>('');

	return (
		<View style={styles.footer}>
			<View style={styles.containerInput}>
				<Input placeholder="Type comment here..." value={comment} onChangeText={(text) => setComment(text)} />
			</View>
			<TouchableOpacity
				style={styles.containerIcon}
				onPress={() => {
					onAddComment(comment);
					setComment('');
				}}
			>
				<Icon customStyles={styles.icon} icon={send} />
			</TouchableOpacity>
		</View>
	);
};

export default AddCommentSection;
