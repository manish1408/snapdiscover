import React, { useEffect, useState } from 'react';
import Review from '@/modules/private/detailProduct/components/review';
import { normalize } from '@/shared/helpers';
import { Platform, ScrollView, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AddCommentSection from '../../components/addCommentSection';
import { useRoute } from '@react-navigation/native';
import { Comment, PostedBy } from '@/shared/interfaces/comments-interface';
import firestore from '@react-native-firebase/firestore';

import ReviewHeader from '../../components/reviewHeader';
import { useUser } from '@/shared/hooks/userContext';
export default function Reviews() {
	const route = useRoute();
	const { productId } = route?.params;
	const [comments, setComments] = useState<Comment[]>([]);

	const { user } = useUser();

	useEffect(() => {
		const productDocRef = firestore().collection('products').doc(productId);
		const commentsRef = firestore().collection('comments');

		const unsubscribeProduct = productDocRef.onSnapshot((productSnapshot) => {
			const commentIds = productSnapshot.data()?.userComments || [];
			if (commentIds.length === 0) {
				setComments([]);
				return;
			}

			const unsubscribeComments = commentsRef.where(firestore.FieldPath.documentId(), 'in', commentIds).onSnapshot((commentsSnapshot) => {
				const updatedComments = commentsSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setComments(updatedComments);
			});

			return () => unsubscribeComments();
		});

		return () => unsubscribeProduct();
	}, [productId]);

	const handleAddComment = async (comment) => {
		if (comment.trim() === '') {
			return;
		}

		try {
			const postedBy: PostedBy = {
				userName: user?.fullName || '',
				userId: user?.uid || '',
				photo: user?.photoURL || null,
				postedDate: firestore.Timestamp.now(),
			};

			const commentData: Comment = {
				comment: comment,
				postedBy,
				likes: 0,
				dislikes: 0,
				replies: [],
			};
			console.log(commentData);

			const commentRef = await firestore().collection('comments').add(commentData);
			const commentId = commentRef.id;

			await firestore()
				.collection('products')
				.doc(productId)
				.update({
					userComments: firestore.FieldValue.arrayUnion(commentId),
				});
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};

	return (
		<SafeAreaView style={{ backgroundColor: 'white', paddingTop: 50, flex: 1 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%' }}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : normalize(22)}
			>
				<ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: normalize(24) }}>
					<ReviewHeader title="Comments" commentsLength={comments.length} />
					<View style={{ height: '100%', marginBottom: normalize(16) }}>
						{comments && comments.length > 0 && comments.map((comment, idx) => <Review key={comment.id} comment={comment} />)}
					</View>
				</ScrollView>
				<View>
					<AddCommentSection productId={productId} onAddComment={handleAddComment} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
