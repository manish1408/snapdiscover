import React, { useState } from 'react';
import { styles } from './styles';
import { Image, TouchableOpacity, View } from 'react-native';
import Input from '@/shared/components/input';
import { send } from '@/shared/assets/icons';
import Icon from '@/shared/components/icon';
import { useUser } from '@/shared/hooks/userContext';

const AddReplySection = ({ onAddReply }) => {
	const [replyText, setReplyText] = useState<string>('');
	const { user } = useUser();

	return (
		<View style={styles.footer}>
			<Image style={styles.avatar} source={{ uri: user?.photoURL ? user?.photoURL : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }} />
			<View style={styles.containerInput}>
				<Input placeholder="Add reply here..." value={replyText} onChangeText={(text) => setReplyText(text)} />
			</View>
			<TouchableOpacity
				style={styles.containerIcon}
				onPress={() => {
					onAddReply(replyText);
					setReplyText('');
				}}
			>
				<Icon customStyles={styles.icon} icon={send} />
			</TouchableOpacity>
		</View>
	);
};

export default AddReplySection;
