import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, Text, View, KeyboardAvoidingView, SafeAreaView, Platform, ScrollView } from 'react-native';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import Icon from '@/shared/components/icon';
import { arrowBack, send, star } from '@/shared/assets/icons';
import { like, dislike, reply } from '@/shared/assets/icons-8';
import { normalize } from '@/shared/helpers';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import ReplySection from '../replySection';

export default function Review({ comment }) {
	const [openModal, setOpenModal] = useState(false);
	const [selectedComment, setSelectedComment] = useState(null);
	function toggleModal(comment = null) {
		setOpenModal(!openModal);
		if (!comment) {
			setSelectedComment(null);
		} else {
			setSelectedComment(comment);
		}
	}

	useEffect(() => {
		const commentRef = firestore().collection('comments').doc(comment.id);

		const unsubscribe = commentRef.onSnapshot((snapshot) => {
			const data = snapshot.data();
			const likes = data?.likes || 0;
			const dislikes = data?.dislikes || 0;
			// console.log('Likes:', likes, 'Dislikes:', dislikes);
		});

		return () => {
			unsubscribe();
		};
	}, [comment.id]);

	const handleReaction = async (reactionType: any) => {
		const commentRef = firestore().collection('comments').doc(comment.id);
		await commentRef.update({
			[reactionType === 'like' ? 'likes' : 'dislikes']: firestore.FieldValue.increment(1),
		});
	};

	return (
		<>
			<View style={{ marginTop: normalize(24) }}>
				<View style={styles.header}>
					<View style={[styles.row]}>
						<Image
							style={styles.avatar}
							source={{ uri: comment?.postedBy?.photo ? comment?.postedBy?.photo : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }}
						/>
						<View>
							<View style={[styles.row, styles.commentRow]}>
								<Typography style={styles.name} translate={false}>
									{comment.postedBy?.userName}
								</Typography>
								<Typography style={styles.date} translate={false}>
									{moment(comment?.postedDate).format('MMM DD, YYYY')}
								</Typography>
							</View>
							<View style={{ marginTop: normalize(4) }}>
								<Typography style={styles.description} translate={false}>
									{comment.comment}
								</Typography>
							</View>

							<View style={styles.row}>
								<TouchableOpacity onPress={() => handleReaction('like')}>
									<View style={styles.row}>
										<Icon icon={like} />
										<Typography style={styles.valueLike} translate={false}>
											{comment.likes}
										</Typography>
									</View>
								</TouchableOpacity>
								<View style={{ width: 10 }} />
								<TouchableOpacity onPress={() => handleReaction('dislike')}>
									<View style={styles.row}>
										<Icon icon={dislike} />
										<Typography style={styles.valueLike} translate={false}>
											{comment.dislikes}
										</Typography>
									</View>
								</TouchableOpacity>
								<View style={{ width: 10 }} />
								<View style={styles.row}>
									<Pressable onPress={() => toggleModal(comment)}>
										<Icon icon={reply} />
									</Pressable>
									<Typography style={styles.valueLike} translate={false}>
										{comment.replies.length > 0 && comment.replies.length}
									</Typography>
								</View>
								<View style={{ width: 10 }} />
								{comment.replies && comment.replies.length > 0 && (
									<View style={styles.row}>
										<TouchableOpacity onPress={() => toggleModal(comment)}>
											<Typography style={styles.valueLike} translate={false}>
												Show replies
											</Typography>
										</TouchableOpacity>
									</View>
								)}
							</View>
						</View>
					</View>
				</View>

				<Modal animationType="slide" transparent={true} visible={openModal}>
					<SafeAreaView style={{ backgroundColor: 'white' }}>
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
							style={{ height: '100%' }}
							keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : normalize(22)}
						>
							<View style={{ padding: normalize(24), flex: 1 }}>
								<Pressable onPress={() => toggleModal()} style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Icon icon={arrowBack} />
									<Typography
										style={{
											fontWeight: '700',
											fontSize: normalize(24),
											marginLeft: normalize(10),
										}}
									>
										Replies
									</Typography>
								</Pressable>

								<ReplySection commentId={selectedComment?.id} />
							</View>
						</KeyboardAvoidingView>
					</SafeAreaView>
				</Modal>
			</View>
		</>
	);
}
