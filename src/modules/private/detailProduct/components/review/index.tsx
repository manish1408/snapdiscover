import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, Text, View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import Icon from '@/shared/components/icon';
import { send, star } from '@/shared/assets/icons';
import { like, dislike, reply } from '@/shared/assets/icons-8';
import { normalize } from '@/shared/helpers';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '@/shared/components/input';
import { useUser } from '@/shared/hooks/userContext';
import { PostedBy, Reply } from '@/shared/interfaces/comments-interface';
import firestore from '@react-native-firebase/firestore';
import ReplySection from '../replySection';

export default function Review({ comment }) {
	console.log('Hello', comment);
	const [replyModal, setReplyModal] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [replyText, setReplyText] = useState<string>('');
	const { user } = useUser();
	async function onReply() {
		if (replyText.trim() == '') {
			setReplyModal(false);
			return;
		}
		try {
			const postedBy: PostedBy = {
				userName: user?.fullName || '',
				userId: user?.uid || '',
				photo: user?.photoURL || null,
				postedDate: new Date(),
			};

			const replyData: Reply = {
				reply: replyText,
				postedBy,
			};
			console.log(replyData);

			await firestore()
				.collection('comments')
				.doc(comment.id)
				.update({
					replies: firestore.FieldValue.arrayUnion(replyData),
				});
		} catch (error) {
			console.error('Error adding comment:', error);
		}
		setReplyModal(false);
	}
	return (
		<>
			<View style={{ marginBottom: normalize(24), position: 'relative' }}>
				<View style={styles.header}>
					<View style={styles.row}>
						<Image
							style={styles.avatar}
							source={{ uri: comment?.postedBy?.photo ? comment?.postedBy?.photo : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }}
						/>

						<View>
							<Typography style={styles.name} translate={false}>
								{comment.postedBy?.userName}
							</Typography>
							<Typography style={styles.date} translate={false}>
								{moment(comment.postedDate?.toDate()).fromNow()}
							</Typography>
						</View>
					</View>

					{/* <View>
					<View style={styles.valueReview}>
						<Icon icon={star} />
						<Typography style={styles.textReview}>5.0</Typography>
					</View>
				</View> */}
				</View>

				<View style={{ marginTop: normalize(12) }}>
					<Typography style={styles.description} translate={false}>
						{comment.comment}
					</Typography>
				</View>
				{showReplies &&
					comment.replies &&
					comment.replies.length > 0 &&
					comment.replies.map((chunk, idx) => <ReplySection key={idx} replyText={chunk} />)}

				<View style={styles.row}>
					<View style={styles.row}>
						<Icon icon={like} />
						<Typography style={styles.valueLike} translate={false}>
							{comment.likes}
						</Typography>
					</View>
					<View style={{ width: 10 }} />
					<View style={styles.row}>
						<Icon icon={dislike} />
						<Typography style={styles.valueLike} translate={false}>
							{comment.dislikes}
						</Typography>
					</View>
					<View style={{ width: 10 }} />
					<View style={styles.row}>
						<Pressable onPress={() => setReplyModal(!replyModal)}>
							<Icon icon={reply} />
						</Pressable>
						<Typography style={styles.valueLike} translate={false}>
							{comment.replies.length}
						</Typography>
					</View>
					<View style={{ width: 10 }} />
					{comment.replies && comment.replies.length > 0 && (
						<View style={styles.row}>
							<TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
								<Typography style={styles.valueLike} translate={false}>
									Show replies
								</Typography>
							</TouchableOpacity>
						</View>
					)}
				</View>
				{replyModal && (
					<SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
							style={{ height: '100%', flex: 1 }}
							keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : normalize(22)}
						>
							<Modal
								animationType="slide"
								transparent={true}
								visible={replyModal}
								onRequestClose={() => {
									setReplyModal(!replyModal);
								}}
							>
								<View style={styles.centeredView}>
									<View style={styles.modalView}>
										<View style={styles.containerInput}>
											<Input placeholder="Type reply here..." value={replyText} onChangeText={(text) => setReplyText(text)} />
										</View>
										<Pressable style={styles.containerIcon} onPress={() => onReply()}>
											<Icon customStyles={styles.icon} icon={send} />
										</Pressable>
										<Pressable style={styles.containerIcon} onPress={() => setReplyModal(!replyModal)}>
											<Text>Cancel</Text>
										</Pressable>
									</View>
								</View>
							</Modal>
						</KeyboardAvoidingView>
					</SafeAreaView>
				)}
			</View>
		</>
	);
}
