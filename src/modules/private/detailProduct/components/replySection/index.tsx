import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import { getAgoDate, normalize } from '@/shared/helpers';
import moment from 'moment';
import AddReplySection from '../addReplySection';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '@/shared/hooks/userContext';
import { PostedBy, Reply } from '@/shared/interfaces/comments-interface';
export default function ReplySection({ commentId }) {
	const [comment, setComment] = useState({});

	useEffect(() => {
		const commentRef = firestore().collection('comments').doc(commentId);
		const unsubscribe = commentRef.onSnapshot((querySnapshot) => {
			const commentData = querySnapshot.data();
			setComment(commentData);
		});

		return () => {
			unsubscribe();
		};
	}, [commentId]);
	const { user } = useUser();

	async function handleAddReply(replyText: any) {
		if (replyText.trim() == '') {
			return;
		}
		try {
			const postedBy: PostedBy = {
				userName: user?.fullName || 'Anonymous',
				userId: user?.uid || '',
				photo: user?.photoURL || null,
				postedDate: firestore.Timestamp.now(),
			};

			const replyData: Reply = {
				reply: replyText,
				postedBy,
			};
			console.log(replyData);

			await firestore()
				.collection('comments')
				.doc(commentId)
				.update({
					replies: firestore.FieldValue.arrayUnion(replyData),
				});
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	}
	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginVertical: normalize(24) }}>
					<View style={styles.header}>
						<View style={styles.row}>
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
										{getAgoDate(comment?.postedBy?.postedDate)}
									</Typography>
								</View>
								<View style={{ marginTop: normalize(4) }}>
									<Typography style={styles.description} translate={false}>
										{comment.comment}
									</Typography>
								</View>
							</View>
						</View>
					</View>

					<View style={{ marginVertical: normalize(24), paddingHorizontal: normalize(24) }}>
						{comment?.replies &&
							comment?.replies.length > 0 &&
							comment?.replies.map((chunk, idx) => (
								<View key={chunk + idx}>
									<View style={styles.header}>
										<View style={styles.row}>
											<Image
												style={styles.replyAvatar}
												source={{ uri: chunk?.postedBy?.photo ? chunk?.postedBy?.photo : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }}
											/>

											<View style={{ marginRight: normalize(50) }}>
												<View style={[styles.row, styles.commentRow]}>
													<Typography style={styles.name} translate={false}>
														{chunk.postedBy?.userName ? chunk.postedBy?.userName : 'Anonymous'}
													</Typography>
													<Typography style={styles.date} translate={false}>
														{getAgoDate(chunk?.postedBy?.postedDate)}
													</Typography>
												</View>
												<View style={{ marginVertical: normalize(8) }}>
													<Typography style={styles.description} translate={false}>
														{chunk.reply}
													</Typography>
												</View>
											</View>
										</View>
									</View>
								</View>
							))}
					</View>
				</View>
			</ScrollView>
			<View style={styles.replyWrapper}>
				<AddReplySection onAddReply={handleAddReply} />
			</View>
		</>
	);
}
